import { registerCommand, DefaultCommands } from "./command-registry";
import { IMapViewer, ActiveMapTool } from "../components/map-viewer-base";
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
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.clearSelection();
        }
    })
}