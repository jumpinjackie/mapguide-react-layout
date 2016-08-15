import { registerCommand } from "./command-registry";
import { ActiveMapTool } from "../components/map-viewer-base";
import * as Constants from "../constants";

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
}