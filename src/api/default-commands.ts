import { registerCommand, DefaultCommands, CommandConditions } from "./registry/command";
import { IMapViewer, ActiveMapTool } from "../components/map-viewer-base";
import { QueryMapFeaturesResponse } from "./contracts/query";
import { RefreshMode } from "../components/map-viewer-base";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import { tr } from "../api/i18n";
import * as Constants from "../constants";
import * as ol from "openlayers";
import { ensureParameters } from "../actions/taskpane";
import { DefaultComponentNames } from "../api/registry/component";

function panMap(dispatch, viewer: IMapViewer, value: "right" | "left" | "up" | "down") {
    const settings = {
        "right": [2, 1],
        "left": [0, 1],
        "down": [0, 1],
        "up": [0, 3]
    };
    
    const view = viewer.getCurrentView();
    const current_center = [ view.x, view.y ];
    const currentExtent = viewer.getCurrentExtent();
    let newPos: number[];

    var direction = settings[value];
    
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

export function initDefaultCommands() {
    //Select Tool
    registerCommand(DefaultCommands.Select, {
        icon: "select.png",
        selected: (state) => {
            return state.map.viewer.tool === ActiveMapTool.Select;
        },
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            return dispatch({
                type: Constants.MAP_SET_ACTIVE_TOOL,
                payload: ActiveMapTool.Select
            });
        }
    });
    //Pan Tool
    registerCommand(DefaultCommands.Pan, {
        icon: "pan.png",
        selected: (state) => {
            return state.map.viewer.tool === ActiveMapTool.Pan;
        },
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            return dispatch({
                type: Constants.MAP_SET_ACTIVE_TOOL,
                payload: ActiveMapTool.Pan
            });
        }
    });
    //Zoom Tool
    registerCommand(DefaultCommands.Zoom, {
        icon: "zoom-in.png",
        selected: (state) => {
            return state.map.viewer.tool === ActiveMapTool.Zoom;
        },
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            return dispatch({
                type: Constants.MAP_SET_ACTIVE_TOOL,
                payload: ActiveMapTool.Zoom
            });
        }
    });
    //Feature Tooltips
    registerCommand(DefaultCommands.MapTip, {
        icon: "maptip.png",
        selected: (state) => {
            return state.map.viewer.featureTooltipsEnabled === true;
        },
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            const enabled = getState().map.viewer.featureTooltipsEnabled;
            return dispatch({
                type: Constants.MAP_SET_MAPTIP,
                payload: !enabled
            });
        }
    });
    //Zoom in
    registerCommand(DefaultCommands.ZoomIn, {
        icon: "zoom-in-fixed.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.zoomDelta(1);
        }
    });
    //Zoom Out
    registerCommand(DefaultCommands.ZoomOut, {
        icon: "zoom-out-fixed.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.zoomDelta(-1);
        }
    });
    //Pan Left
    registerCommand(DefaultCommands.PanLeft, {
        icon: "pan-west.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            panMap(dispatch, viewer, "left");
        }
    });
    //Pan Right
    registerCommand(DefaultCommands.PanRight, {
        icon: "pan-east.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            panMap(dispatch, viewer, "right");
        }
    });
    //Pan Up
    registerCommand(DefaultCommands.PanUp, {
        icon: "pan-north.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            panMap(dispatch, viewer, "up");
        }
    });
    //Pan Down
    registerCommand(DefaultCommands.PanDown, {
        icon: "pan-south.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            panMap(dispatch, viewer, "down");
        }
    });
    //About
    registerCommand(DefaultCommands.About, {
        icon: "about.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            dispatch({
                type: Constants.MODAL_SHOW_COMPONENT,
                payload: {
                    modal: {
                        title: tr("About"),
                        backdrop: true
                    },
                    name: DefaultComponentNames.About,
                    component: DefaultComponentNames.About
                }
            });
        }
    });
    //Help
    registerCommand(DefaultCommands.Help, {
        icon: "help.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            dispatch({
                type: Constants.MODAL_SHOW_URL,
                payload: {
                    modal: {
                        title: tr("Help"),
                        backdrop: true,
                        size: [ 300, 500 ]
                    },
                    name: DefaultCommands.Help,
                    url: "help/index.html"
                }
            });
        }
    });
    //Measure
    registerCommand(DefaultCommands.Measure, {
        icon: "measure.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            dispatch({
                type: Constants.TASK_INVOKE_URL,
                payload: {
                    url: "component://Measure"
                }
            })
        }
    });
    //Select Radius
    registerCommand(DefaultCommands.SelectRadius, {
        icon: "select-radius.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.digitizeCircle(circle => {
                const geom = ol.geom.Polygon.fromCircle(circle);
                viewer.selectByGeometry(geom);
            });
        }
    });
    //Select Radius
    registerCommand(DefaultCommands.SelectPolygon, {
        icon: "select-polygon.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.digitizePolygon(geom => {
                viewer.selectByGeometry(geom);
            });
        }
    });
    //Initial Center and scale
    registerCommand(DefaultCommands.RestoreView, {
        icon: "initial-center.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            const view = getState().view.initial;
            if (view != null) {
                viewer.zoomToView(view.x, view.y, view.scale);
            } else {
                viewer.initialView();
            }
        }
    })
    //Zoom Extents
    registerCommand(DefaultCommands.ZoomExtents, {
        icon: "zoom-full.png",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.initialView();
        }
    });
    //Clear Selection
    registerCommand(DefaultCommands.ClearSelection, {
        icon: "select-clear.png",
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            viewer.clearSelection();
        }
    });
    //Zoom to Selection
    registerCommand(DefaultCommands.ZoomToSelection, {
        icon: "icon_zoomselect.gif",
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            const selection: QueryMapFeaturesResponse = getState().selection.selectionSet;
            let bounds: ol.Extent = null;
            if (selection != null && selection.SelectedFeatures != null) {
                selection.SelectedFeatures.SelectedLayer.forEach(layer => {
                    layer.Feature.forEach(feat => {
                        const b: any = feat.Bounds.split(" ").map(s => parseFloat(s));
                        if (bounds == null) {
                            bounds = b;
                        } else {
                            bounds = ol.extent.extend(bounds, b);
                        }
                    })
                });
            }
            if (bounds != null) {
                const view = viewer.getViewForExtent(bounds);
                dispatch(MapActions.setCurrentView(view));
            }
        }
    });
    //Refresh Map
    registerCommand(DefaultCommands.RefreshMap, {
        icon: "icon_refreshmap.gif",
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer) => {
            viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
            dispatch(LegendActions.refresh());
        }
    });
    //Previous View
    registerCommand(DefaultCommands.PreviousView, {
        icon: "view-back.png",
        selected: () => false,
        enabled: CommandConditions.hasPreviousView,
        invoke: (dispatch, getState, viewer) => {
            dispatch(MapActions.previousView());
        }
    });
    //Next View
    registerCommand(DefaultCommands.NextView, {
        icon: "view-forward.png",
        selected: () => false,
        enabled: CommandConditions.hasNextView,
        invoke: (dispatch, getState, viewer) => {
            dispatch(MapActions.nextView());
        }
    });
    //Buffer
    registerCommand("Buffer", {
        icon: "buffer.png",
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            const { map, config } = getState();
            let url = ensureParameters("server/Buffer/BufferPanel.php", map.state.Name, map.state.SessionId, config.locale);
            url += "&POPUP=false&US=0";
            dispatch({
                type: Constants.TASK_INVOKE_URL,
                payload: {
                    url: url
                }
            });
        }
    });
    //Select Within
    registerCommand("SelectWithin", {
        icon: "select-features.png",
        selected: () => false,
        enabled: CommandConditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            const { map, config } = getState();
            let url = ensureParameters("server/SelectWithin/SelectWithinPanel.php", map.state.Name, map.state.SessionId, config.locale);
            url += "&POPUP=false";
            dispatch({
                type: Constants.TASK_INVOKE_URL,
                payload: {
                    url: url
                }
            });
        }
    });
    //Redline
    registerCommand("Redline", {
        icon: "redline.png",
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer) => {
            const { map, config } = getState();
            let url = ensureParameters("server/Redline/markupmain.php", map.state.Name, map.state.SessionId, config.locale);
            url += "&POPUP=false&REDLINESTYLIZATION=ADVANCED";
            dispatch({
                type: Constants.TASK_INVOKE_URL,
                payload: {
                    url: url
                }
            });
        }
    });

    registerCommand("FeatureInfo", { icon: "feature-info.png", url: "server/FeatureInfo/featureinfomain.php", target: "TaskPane" });
    registerCommand("Query", { icon: "query.png", url: "server/Query/querymain.php", target: "TaskPane" });
    registerCommand("Theme", { icon: "theme.png", url: "server/Theme/thememain.php", target: "TaskPane" });
}