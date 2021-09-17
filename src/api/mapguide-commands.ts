import { DefaultCommands, registerCommand, openUrlInTarget, CommandConditions } from './registry/command';
import { SPRITE_MAPTIP, SPRITE_PRINT, SPRITE_OPTIONS, SPRITE_SELECT_RADIUS, SPRITE_SELECT_POLYGON, SPRITE_SELECT_CLEAR, SPRITE_ICON_ZOOMSELECT, SPRITE_BUFFER, SPRITE_SELECT_FEATURES, SPRITE_REDLINE, SPRITE_FEATURE_INFO, SPRITE_QUERY, SPRITE_THEME, SPRITE_SELECT_CENTRE } from '../constants/assets';
import { setFeatureTooltipsEnabled, setCurrentView, clearClientSelection } from '../actions/map';
import { ensureParameters } from '../utils/url';
import { getRuntimeMap, getSelectionSet, Bounds } from './common';
import { getFusionRoot } from './runtime';
import { tr } from './i18n';
import { buildTargetedCommand } from './default-commands';
import { enableRedlineMessagePrompt } from '../containers/viewer-shim';
import * as olExtent from "ol/extent";
import { CompositeSelection } from './composite-selection';

export function initMapGuideCommands() {
    //Feature Tooltips
    registerCommand(DefaultCommands.MapTip, {
        iconClass: SPRITE_MAPTIP,
        selected: (state) => {
            return state.featureTooltipsEnabled === true;
        },
        enabled: state => !state.stateless,
        invoke: (dispatch, getState) => {
            const enabled = getState().viewer.featureTooltipsEnabled;
            return dispatch(setFeatureTooltipsEnabled(!enabled));
        }
    });
    //Quick Plot
    registerCommand(DefaultCommands.QuickPlot, {
        iconClass: SPRITE_PRINT,
        selected: () => false,
        enabled: state => !state.stateless,
        invoke: (dispatch, getState, _viewer, parameters) => {
            const config = getState().config;
            const url = "component://QuickPlot";
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.QuickPlot, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
        }
    });
    //Viewer Options
    registerCommand(DefaultCommands.ViewerOptions, {
        iconClass: SPRITE_OPTIONS,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, _viewer, parameters) => {
            const config = getState().config;
            const url = "component://ViewerOptions";
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.ViewerOptions, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("VIEWER_OPTIONS", config.locale));
        }
    });
    //Select Radius
    registerCommand(DefaultCommands.SelectRadius, {
        iconClass: SPRITE_SELECT_RADIUS,
        selected: () => false,
        enabled: state => !state.stateless,
        invoke: (_dispatch, _getState, viewer, parameters) => {
            if (viewer) {
                const selMethod = parameters.SelectionType || "INTERSECTS";
                viewer.digitizeCircle(circle => {
                    const fact = viewer.getOLFactory();
                    const geom = fact.createGeomPolygonFromCircle(circle);
                    viewer.mapguideSupport()?.selectByGeometry(geom, selMethod);
                });
            }
        }
    });
    //Select Polygon
    registerCommand(DefaultCommands.SelectPolygon, {
        iconClass: SPRITE_SELECT_POLYGON,
        selected: () => false,
        enabled: state => !state.stateless,
        invoke: (_dispatch, _getState, viewer, parameters) => {
            if (viewer) {
                const selMethod = parameters.SelectionType || "INTERSECTS";
                viewer.digitizePolygon(geom => {
                    viewer.mapguideSupport()?.selectByGeometry(geom, selMethod);
                });
            }
        }
    });
    //Clear Selection
    registerCommand(DefaultCommands.ClearSelection, {
        iconClass: SPRITE_SELECT_CLEAR,
        selected: () => false,
        enabled: state => CommandConditions.hasSelection(state) || CommandConditions.hasClientSelection(state),
        invoke: (dispatch, getState, viewer) => {
            const st = getState();
            if (st.config.activeMapName) {
                dispatch(clearClientSelection(st.config.activeMapName));
            }
            viewer?.mapguideSupport()?.clearSelection();
        }
    });
    //Zoom to Selection
    registerCommand(DefaultCommands.ZoomToSelection, {
        iconClass: SPRITE_ICON_ZOOMSELECT,
        selected: () => false,
        enabled: state => CommandConditions.hasSelection(state) || CommandConditions.hasClientSelection(state),
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                const fact = viewer.getOLFactory();
                const st = getState();
                const selection = getSelectionSet(st);
                let cs;
                if (st.config.activeMapName) {
                    cs = st.mapState[st.config.activeMapName].clientSelection;
                }
                const compSel = new CompositeSelection(selection?.SelectedFeatures, cs);
                const bounds = compSel.getBounds();
                if (bounds) {
                    const view = viewer.getViewForExtent(bounds);
                    dispatch(setCurrentView(view));
                }
            }
        }
    });
    //Buffer
    registerCommand(DefaultCommands.Buffer, {
        iconClass: SPRITE_BUFFER,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.hasSelection(state),
        invoke: (dispatch, getState, _viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                let url = ensureParameters(`${getFusionRoot()}/widgets/BufferPanel/BufferPanel.php`, map.Name, map.SessionId, config.locale, false);
                url += "&popup=false&us=0";
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.Buffer, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Select Within
    registerCommand(DefaultCommands.SelectWithin, {
        iconClass: SPRITE_SELECT_FEATURES,
        selected: () => false,
        enabled: (state, parameters) => !state.stateless && !CommandConditions.disabledIfEmptySelection(state, parameters),
        invoke: (dispatch, getState, _viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                let url = ensureParameters(`${getFusionRoot()}/widgets/SelectWithin/SelectWithinPanel.php`, map.Name, map.SessionId, config.locale, false);
                url += "&popup=false";
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.SelectWithin, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Redline
    registerCommand(DefaultCommands.Redline, {
        iconClass: SPRITE_REDLINE,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.isNotBusy(state),
        invoke: (dispatch, getState, viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                let bUseAdvancedStylization = true;
                let defaultDataStoreFormat = null;
                let defaultRedlineGeometryType = 0;
                let bCreateOnStartup = false;
                if (parameters.AutogenerateLayerNames)

                if (parameters.StylizationType)
                    bUseAdvancedStylization = (parameters.StylizationType == "advanced");
                
                if (parameters.DataStoreFormat && parameters.RedlineGeometryFormat) {
                    if (parameters.DataStoreFormat == "SDF" ||
                        parameters.DataStoreFormat == "SHP" ||
                        parameters.DataStoreFormat == "SQLite") {
                        
                        var geomTypes = parseInt(parameters.RedlineGeometryFormat);
                        if (parameters.DataStoreFormat == "SHP") {
                            //Only accept if geometry type is singular
                            if (geomTypes == 1 || geomTypes == 2 || geomTypes == 4) {
                                defaultDataStoreFormat = parameters.DataStoreFormat;
                                defaultRedlineGeometryType = geomTypes;
                                if (parameters.AutoCreateOnStartup)
                                    bCreateOnStartup = (parameters.AutoCreateOnStartup == "true");
                            }
                        } else {
                            defaultDataStoreFormat = parameters.DataStoreFormat;
                            defaultRedlineGeometryType = geomTypes;
                            if (parameters.AutoCreateOnStartup)
                                bCreateOnStartup = (parameters.AutoCreateOnStartup == "true");
                        }
                    }
                }

                enableRedlineMessagePrompt(parameters.UseMapMessage == "true");
                let url = ensureParameters(`${getFusionRoot()}/widgets/Redline/markupmain.php`, map.Name, map.SessionId, config.locale, true);
                url += "&POPUP=false";
                if (defaultDataStoreFormat != null && defaultRedlineGeometryType > 0) {
                    url += `&REDLINEFORMAT=${defaultDataStoreFormat}`;
                    url += `&REDLINEGEOMTYPE=${defaultRedlineGeometryType}`;
                    url += `&AUTOCREATE=${bCreateOnStartup ? "1" : "0"}`;
                }
                url += `&REDLINESTYLIZATION=${bUseAdvancedStylization ? "ADVANCED" : "BASIC"}`;
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.Redline, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Feature Info
    registerCommand(DefaultCommands.FeatureInfo, {
        iconClass: SPRITE_FEATURE_INFO,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.isNotBusy(state),
        invoke: (dispatch, getState, _viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                const url = ensureParameters(`${getFusionRoot()}/widgets/FeatureInfo/featureinfomain.php`, map.Name, map.SessionId, config.locale, true);
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.FeatureInfo, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Query
    registerCommand(DefaultCommands.Query, {
        iconClass: SPRITE_QUERY,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.isNotBusy(state),
        invoke: (dispatch, getState, _viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                const url = ensureParameters(`${getFusionRoot()}/widgets/Query/querymain.php`, map.Name, map.SessionId, config.locale, true);
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.Query, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Theme
    registerCommand(DefaultCommands.Theme, {
        iconClass: SPRITE_THEME,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.isNotBusy(state),
        invoke: (dispatch, getState, _viewer, parameters) => {
            const state = getState();
            const map = getRuntimeMap(state);
            const config = state.config;
            if (map) {
                const url = ensureParameters(`${getFusionRoot()}/widgets/Theme/thememain.php`, map.Name, map.SessionId, config.locale, true);
                const cmdDef = buildTargetedCommand(config, parameters);
                openUrlInTarget(DefaultCommands.Theme, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
            }
        }
    });
    //Center Selection
    registerCommand(DefaultCommands.CenterSelection, {
        iconClass: SPRITE_SELECT_CENTRE,
        selected: () => false,
        enabled: state => !state.stateless && CommandConditions.hasSelection(state),
        invoke: (dispatch, getState, viewer) => {
            const state = getState();
            const mapName = state.config.activeMapName;
            if (mapName && viewer) {
                const mapState = state.mapState[mapName];
                const sf = mapState?.mapguide?.selectionSet?.SelectedFeatures;
                if (sf) {
                    let bbox;
                    for (const layer of sf.SelectedLayer) {
                        for (const f of layer.Feature.filter(f => f.Bounds != null)) {
                            const b: any = f.Bounds!.split(" ").map(s => parseFloat(s));
                            if (!bbox) {
                                bbox = b;
                            } else {
                                bbox = olExtent.extend(bbox, b);
                            }
                        }
                    }
                    if (bbox) {
                        const view = viewer.getViewForExtent(bbox);
                        dispatch(setCurrentView(view));
                    }
                }
            }
        }
    });
}