import {
    registerCommand,
    DefaultCommands,
    CommandConditions,
    openUrlInTarget
} from "./registry/command";
import {
    IMapViewer,
    ActiveMapTool,
    RefreshMode,
    ReduxDispatch,
    getInitialView,
    getSelectionSet,
    getRuntimeMap,
    getCurrentView,
    ITargetedCommand,
    IConfigurationReducerState,
    DEFAULT_MODAL_SIZE,
    Bounds
} from "./common";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import * as ModalActions from "../actions/modal";
import * as TemplateActions from "../actions/template";
import { tr } from "../api/i18n";
import { DefaultComponentNames } from "../api/registry/component";
import { getFusionRoot } from "../api/runtime";
import { enableRedlineMessagePrompt } from "../containers/viewer-shim";
import {
    SPRITE_SELECT,
    SPRITE_PAN,
    SPRITE_ZOOM_IN,
    SPRITE_MAPTIP,
    SPRITE_ZOOM_IN_FIXED,
    SPRITE_ZOOM_OUT_FIXED,
    SPRITE_PAN_WEST,
    SPRITE_PAN_EAST,
    SPRITE_PAN_NORTH,
    SPRITE_PAN_SOUTH,
    SPRITE_ABOUT,
    SPRITE_HELP,
    SPRITE_MEASURE,
    SPRITE_PRINT,
    SPRITE_OPTIONS,
    SPRITE_SELECT_RADIUS,
    SPRITE_SELECT_POLYGON,
    SPRITE_INITIAL_CENTER,
    SPRITE_ZOOM_FULL,
    SPRITE_SELECT_CLEAR,
    SPRITE_ICON_ZOOMSELECT,
    SPRITE_VIEW_BACK,
    SPRITE_ICON_REFRESHMAP,
    SPRITE_VIEW_FORWARD,
    SPRITE_GEOLOCATION,
    SPRITE_BUFFER,
    SPRITE_SELECT_FEATURES,
    SPRITE_REDLINE,
    SPRITE_FEATURE_INFO,
    SPRITE_QUERY,
    SPRITE_THEME,
    SPRITE_INVOKE_SCRIPT,
    SPRITE_COORDINATE_TRACKER,
    SPRITE_LAYER_ADD,
    SPRITE_SELECT_CENTRE
} from "../constants/assets";
import * as olExtent from "ol/extent";
import { ensureParameters } from "../utils/url";

function panMap(dispatch: ReduxDispatch, viewer: IMapViewer, value: "right" | "left" | "up" | "down") {
    const settings: any = {
        "right": [2, 1],
        "left": [0, 1],
        "down": [0, 1],
        "up": [0, 3]
    };

    const view = viewer.getCurrentView();
    const current_center = [view.x, view.y];
    const currentExtent = viewer.getCurrentExtent();
    let newPos: number[];

    const direction = settings[value];

    if (value == "right" || value == "left") {
        newPos = [
            currentExtent[direction[0]],
            current_center[direction[1]]
        ];

    } else {
        newPos = [
            current_center[direction[0]],
            currentExtent[direction[1]]
        ];
    }

    dispatch(MapActions.setCurrentView({ x: newPos[0], y: newPos[1], scale: view.scale }));
}

function buildTargetedCommand(config: Readonly<IConfigurationReducerState>, parameters: any): ITargetedCommand {
    const cmdTarget = (parameters || {}).Target;
    const cmdDef: ITargetedCommand = {
        target: cmdTarget || "NewWindow"
    };
    if (config.capabilities.hasTaskPane && cmdTarget == "TaskPane") {
        cmdDef.target = "TaskPane";
    }
    if (cmdTarget == "SpecifiedFrame") {
        cmdDef.target = cmdTarget;
        cmdDef.targetFrame = (parameters || {}).TargetFrame;
    }
    return cmdDef;
}

/**
 * Registers the default set of commands into the command registry. This is automatically called by the default viewer
 * bundle. If creating your own viewer bundle, be sure to call this function in your entry point, or individually register
 * the commands you want to make available in your custom viewer bundle
 *
 * @export
 */
export function initDefaultCommands() {
    //Select Tool
    registerCommand(DefaultCommands.Select, {
        iconClass: SPRITE_SELECT,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Select;
        },
        enabled: () => true,
        invoke: (dispatch) => {
            return dispatch(MapActions.setActiveTool(ActiveMapTool.Select));
        }
    });
    //WMS Query Tool
    registerCommand(DefaultCommands.WmsQuery, {
        iconClass: SPRITE_SELECT,
        selected: (state) => state.activeTool === ActiveMapTool.WmsQueryFeatures,
        enabled: (state) => state.visibleWmsLayerCount > 0,
        invoke: (dispatch) => dispatch(MapActions.setActiveTool(ActiveMapTool.WmsQueryFeatures))
    });
    //Pan Tool
    registerCommand(DefaultCommands.Pan, {
        iconClass: SPRITE_PAN,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Pan;
        },
        enabled: () => true,
        invoke: (dispatch) => {
            return dispatch(MapActions.setActiveTool(ActiveMapTool.Pan));
        }
    });
    //Zoom Tool
    registerCommand(DefaultCommands.Zoom, {
        iconClass: SPRITE_ZOOM_IN,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Zoom;
        },
        enabled: () => true,
        invoke: (dispatch) => {
            return dispatch(MapActions.setActiveTool(ActiveMapTool.Zoom));
        }
    });
    //Feature Tooltips
    registerCommand(DefaultCommands.MapTip, {
        iconClass: SPRITE_MAPTIP,
        selected: (state) => {
            return state.featureTooltipsEnabled === true;
        },
        enabled: () => true,
        invoke: (dispatch, getState) => {
            const enabled = getState().viewer.featureTooltipsEnabled;
            return dispatch(MapActions.setFeatureTooltipsEnabled(!enabled));
        }
    });
    //Zoom in
    registerCommand(DefaultCommands.ZoomIn, {
        iconClass: SPRITE_ZOOM_IN_FIXED,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                viewer.zoomDelta(1);
            }
        }
    });
    //Zoom Out
    registerCommand(DefaultCommands.ZoomOut, {
        iconClass: SPRITE_ZOOM_OUT_FIXED,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                viewer.zoomDelta(-1);
            }
        }
    });
    //Pan Left
    registerCommand(DefaultCommands.PanLeft, {
        iconClass: SPRITE_PAN_WEST,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "left");
            }
        }
    });
    //Pan Right
    registerCommand(DefaultCommands.PanRight, {
        iconClass: SPRITE_PAN_EAST,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "right");
            }
        }
    });
    //Pan Up
    registerCommand(DefaultCommands.PanUp, {
        iconClass: SPRITE_PAN_NORTH,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "up");
            }
        }
    });
    //Pan Down
    registerCommand(DefaultCommands.PanDown, {
        iconClass: SPRITE_PAN_SOUTH,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "down");
            }
        }
    });
    //About
    registerCommand(DefaultCommands.About, {
        iconClass: SPRITE_ABOUT,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState) => {
            dispatch(ModalActions.showModalComponent({
                modal: {
                    title: tr("ABOUT", getState().config.locale),
                    backdrop: true,
                    size: DEFAULT_MODAL_SIZE
                },
                name: DefaultComponentNames.About,
                component: DefaultComponentNames.About
            }));
        }
    });
    //Help
    registerCommand(DefaultCommands.Help, {
        iconClass: SPRITE_HELP,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState) => {
            dispatch(ModalActions.showModalUrl({
                modal: {
                    title: tr("HELP", getState().config.locale),
                    backdrop: true,
                    size: DEFAULT_MODAL_SIZE
                },
                name: DefaultCommands.Help,
                url: "help/index.html"
            }));
        }
    });
    //Measure
    registerCommand(DefaultCommands.Measure, {
        iconClass: SPRITE_MEASURE,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
            const config = getState().config;
            const url = "component://Measure";
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.Measure, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("MEASURE", config.locale));
        }
    });
    //Quick Plot
    registerCommand(DefaultCommands.QuickPlot, {
        iconClass: SPRITE_PRINT,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
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
        invoke: (dispatch, getState, viewer, parameters) => {
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
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
            if (viewer) {
                const selMethod = parameters.SelectionType || "INTERSECTS";
                viewer.digitizeCircle(circle => {
                    const fact = viewer.getOLFactory();
                    const geom = fact.createGeomPolygonFromCircle(circle);
                    viewer.selectByGeometry(geom, selMethod);
                });
            }
        }
    });
    //Select Polygon
    registerCommand(DefaultCommands.SelectPolygon, {
        iconClass: SPRITE_SELECT_POLYGON,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
            if (viewer) {
                const selMethod = parameters.SelectionType || "INTERSECTS";
                viewer.digitizePolygon(geom => {
                    viewer.selectByGeometry(geom, selMethod);
                });
            }
        }
    });
    //Initial Center and scale
    registerCommand(DefaultCommands.RestoreView, {
        iconClass: SPRITE_INITIAL_CENTER,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                const view = getInitialView(getState());
                if (view != null) {
                    viewer.zoomToView(view.x, view.y, view.scale);
                } else {
                    viewer.initialView();
                }
            }
        }
    })
    //Zoom Extents
    registerCommand(DefaultCommands.ZoomExtents, {
        iconClass: SPRITE_ZOOM_FULL,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                viewer.initialView();
            }
        }
    });
    //Clear Selection
    registerCommand(DefaultCommands.ClearSelection, {
        iconClass: SPRITE_SELECT_CLEAR,
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                viewer.clearSelection();
            }
        }
    });
    //Zoom to Selection
    registerCommand(DefaultCommands.ZoomToSelection, {
        iconClass: SPRITE_ICON_ZOOMSELECT,
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                const fact = viewer.getOLFactory();
                const selection = getSelectionSet(getState());
                let bounds: Bounds | null = null;
                if (selection != null && selection.SelectedFeatures != null) {
                    selection.SelectedFeatures.SelectedLayer.forEach(layer => {
                        layer.Feature.forEach(feat => {
                            const b: any = feat.Bounds.split(" ").map(s => parseFloat(s));
                            if (bounds == null) {
                                bounds = b;
                            } else {
                                bounds = fact.extendExtent(bounds, b);
                            }
                        })
                    });
                }
                if (bounds) {
                    const view = viewer.getViewForExtent(bounds);
                    dispatch(MapActions.setCurrentView(view));
                }
            }
        }
    });
    //Refresh Map
    registerCommand(DefaultCommands.RefreshMap, {
        iconClass: SPRITE_ICON_REFRESHMAP,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer) => {
            if (viewer) {
                viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
                dispatch(LegendActions.refresh());
            }
        }
    });
    //Previous View
    registerCommand(DefaultCommands.PreviousView, {
        iconClass: SPRITE_VIEW_BACK,
        selected: () => false,
        enabled: CommandConditions.hasPreviousView,
        invoke: (dispatch, getState) => {
            const mapName = getState().config.activeMapName;
            if (mapName) {
                dispatch(MapActions.previousView(mapName));
            }
        }
    });
    //Next View
    registerCommand(DefaultCommands.NextView, {
        iconClass: SPRITE_VIEW_FORWARD,
        selected: () => false,
        enabled: CommandConditions.hasNextView,
        invoke: (dispatch, getState) => {
            const mapName = getState().config.activeMapName;
            if (mapName) {
                dispatch(MapActions.nextView(mapName));
            }
        }
    });
    //Geolocation
    registerCommand(DefaultCommands.Geolocation, {
        iconClass: SPRITE_GEOLOCATION,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {
            const state = getState();
            const view = getCurrentView(state);
            const rtMap = getRuntimeMap(state);
            const locale = state.config.locale;
            if (viewer && view && rtMap) {
                const fact = viewer.getOLFactory();
                const geoOptions: Partial<PositionOptions> = {};
                let zoomScale = view.scale;
                if (parameters.ZoomLevel) {
                    zoomScale = parseInt(parameters.ZoomLevel, 10);
                }
                if (parameters.EnableHighAccuracy) {
                    geoOptions.enableHighAccuracy = (parameters.EnableHighAccuracy == "true");
                }
                if (parameters.Timeout) {
                    geoOptions.timeout = parseInt(parameters.Timeout, 10);
                }
                if (parameters.MaximumAge) {
                    geoOptions.maximumAge = parseInt(parameters.MaximumAge, 10);
                }
                navigator.geolocation.getCurrentPosition(pos => {
                    const proj = viewer.getProjection();
                    const txCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], proj);
                    const testCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], `EPSG:${rtMap.CoordinateSystem.EpsgCode}`);
                    viewer.zoomToView(txCoord[0], txCoord[1], zoomScale);
                    const extents: [number, number, number, number] = [
                        rtMap.Extents.LowerLeftCoordinate.X,
                        rtMap.Extents.LowerLeftCoordinate.Y,
                        rtMap.Extents.UpperRightCoordinate.X,
                        rtMap.Extents.UpperRightCoordinate.Y
                    ];
                    if (fact.extentContainsXY(extents, testCoord[0], testCoord[1])) {
                        viewer.toastSuccess("geolocation", tr("GEOLOCATION_SUCCESS", locale));
                        //getTopToaster().show({ icon: "geolocation", message: tr("GEOLOCATION_SUCCESS", locale), intent: Intent.SUCCESS });
                    } else {
                        viewer.toastWarning("warning-sign", tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale));
                        //getTopToaster().show({ icon: "warning-sign", message: tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale), intent: Intent.WARNING });
                    }
                }, err => {
                    viewer.toastError("error", tr("GEOLOCATION_ERROR", locale, { message: err.message, code: err.code }));
                    //getTopToaster().show({ icon: "error", message: tr("GEOLOCATION_ERROR", locale, { message: err.message, code: err.code }), intent: Intent.DANGER });
                }, geoOptions);
            }
        }
    });
    //Buffer
    registerCommand(DefaultCommands.Buffer, {
        iconClass: SPRITE_BUFFER,
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer, parameters) => {
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
        enabled: (state, parameters) => !CommandConditions.disabledIfEmptySelection(state, parameters),
        invoke: (dispatch, getState, viewer, parameters) => {
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
        enabled: CommandConditions.isNotBusy,
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
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {
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
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {
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
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {
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
    //Coordinate Tracker
    registerCommand(DefaultCommands.CoordinateTracker, {
        iconClass: SPRITE_COORDINATE_TRACKER,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
            const config = getState().config;
            const url = `component://CoordinateTracker?${(parameters.Projection || []).map((p: string) => "projections=" + p).join("&")}`;
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.CoordinateTracker, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("COORDTRACKER", config.locale));
        }
    });
    //Add WMS Layer
    registerCommand(DefaultCommands.AddManageLayers, {
        iconClass: SPRITE_LAYER_ADD,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer, parameters) => {
            const config = getState().config;
            const url = `component://${DefaultComponentNames.AddManageLayers}`;
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.AddManageLayers, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("ADD_MANAGE_LAYERS", config.locale));
        }
    });
    //Center Selection
    registerCommand(DefaultCommands.CenterSelection, {
        iconClass: SPRITE_SELECT_CENTRE,
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            const state = getState();
            const mapName = state.config.activeMapName;
            if (mapName && viewer) {
                const mapState = state.mapState[mapName];
                if (mapState.selectionSet && mapState.selectionSet.SelectedFeatures) {
                    let bbox;
                    for (const layer of mapState.selectionSet.SelectedFeatures.SelectedLayer) {
                        for (const f of layer.Feature) {
                            const b: any = f.Bounds.split(" ").map(s => parseFloat(s));
                            if (!bbox) {
                                bbox = b;
                            } else {
                                bbox = olExtent.extend(bbox, b);
                            }
                        }
                    }
                    if (bbox) {
                        const view = viewer.getViewForExtent(bbox);
                        dispatch(MapActions.setCurrentView(view));
                    }
                }
            }
        }
    });

    //Fusion template helper commands
    /*
    registerCommand("showOverview", {
        icon: "images/icons/invoke-script",
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {

        }
    });
    */
    registerCommand("showTaskPane", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState) => {
            dispatch(TemplateActions.setTaskPaneVisibility(true));
        }
    });
    registerCommand("showLegend", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState) => {
            dispatch(TemplateActions.setLegendVisibility(true));
        }
    });
    registerCommand("showSelectionPanel", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState) => {
            dispatch(TemplateActions.setSelectionPanelVisibility(true));
        }
    });
}