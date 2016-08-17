import { registerCommand } from "./command-registry";
import { ActiveMapTool } from "../components/map-viewer-base";
import * as Constants from "../constants";
import * as ol from "openlayers";

//TODO: Command label/tooltips should be part of the referencing toolbar element

export function initDefaultCommands() {
    //Select Tool
    registerCommand("Select", {
        icon: "select.png",
        tooltip: "Select",
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
    registerCommand("Pan", {
        icon: "pan.png",
        tooltip: "Pan",
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
    registerCommand("Zoom", {
        icon: "zoom-in.png",
        tooltip: "Zoom",
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
    registerCommand("MapTip", {
        icon: "maptip.png",
        label: "Feature Tooltips",
        tooltip: "Feature Tooltips",
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
    registerCommand("ZoomIn", {
        icon: "zoom-in-fixed.png",
        label: "Zoom In",
        tooltip: "Zoom In",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.zoomDelta(1);
        } 
    });
    //Zoom Out
    registerCommand("ZoomOut", {
        icon: "zoom-out-fixed.png",
        label: "Zoom Out",
        tooltip: "Zoom Out",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.zoomDelta(-1);
        } 
    });
    //Select Radius
    registerCommand("SelectRadius", {
        icon: "select-radius.png",
        label: "Select Radius",
        tooltip: "Select Radius",
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
    registerCommand("SelectPolygon", {
        icon: "select-polygon.png",
        label: "Select Polygon",
        tooltip: "Select Polygon",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.digitizePolygon(geom => {
                viewer.selectByGeometry(geom);
            });
        }
    });
    //Zoom Extents
    registerCommand("ZoomExtents", {
        icon: "zoom-full.png",
        label: "Zoom Extents",
        tooltip: "Zoom Extents",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.initialView();
        }
    });
    //Clear Selection
    registerCommand("ClearSelection", {
        icon: "select-clear.png",
        label: "Clear Selection",
        tooltip: "Clear Selection",
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, viewer) => {
            viewer.clearSelection();
        }
    })
}