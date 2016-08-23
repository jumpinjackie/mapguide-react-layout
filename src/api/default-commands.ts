import { registerCommand, DefaultCommands } from "./command-registry";
import { IMapViewer, ActiveMapTool } from "../components/map-viewer-base";
import { QueryMapFeaturesResponse } from "./contracts/query";
import { RefreshMode } from "../components/map-viewer-base";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import * as Constants from "../constants";
import * as ol from "openlayers";

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

class Conditions {
    public static isNotBusy(state: any): boolean {
        return state.map.viewer.busyCount == 0;
    }
    public static hasSelection(state: any): boolean {
        const selection: QueryMapFeaturesResponse = state.selection.selectionSet;
        return (selection != null && selection.SelectedFeatures != null);
    }
    public static hasPreviousView(state: any): boolean {
        return state.view.historyIndex > 0;
    }
    public static hasNextView(state: any): boolean {
        return state.view.historyIndex < state.view.history.length - 1;
    }
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
        enabled: Conditions.hasSelection,
        invoke: (dispatch, getState, viewer) => {
            viewer.clearSelection();
        }
    });
    //Zoom to Selection
    registerCommand(DefaultCommands.ZoomToSelection, {
        icon: "icon_zoomselect.gif",
        selected: () => false,
        enabled: Conditions.hasSelection,
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
                dispatch(MapActions.setCurrentView(bounds));
            }
        }
    });
    //Refresh Map
    registerCommand(DefaultCommands.RefreshMap, {
        icon: "icon_refreshmap.gif",
        selected: () => false,
        enabled: Conditions.isNotBusy,
        invoke: (dispatch, getState, viewer) => {
            viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
            dispatch(LegendActions.refresh());
        }
    });
    //Previous View
    registerCommand(DefaultCommands.PreviousView, {
        icon: "view-back.png",
        selected: () => false,
        enabled: Conditions.hasPreviousView,
        invoke: (dispatch, getState, viewer) => {
            dispatch(MapActions.previousView());
        }
    });
    //Next View
    registerCommand(DefaultCommands.NextView, {
        icon: "view-forward.png",
        selected: () => false,
        enabled: Conditions.hasNextView,
        invoke: (dispatch, getState, viewer) => {
            dispatch(MapActions.nextView());
        }
    });
}