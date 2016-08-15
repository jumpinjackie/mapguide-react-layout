import * as Constants from "../constants";
import { ActiveMapTool } from "../components/map-viewer-base";
const assign = require("object-assign");

const INITIAL_STATE = {
    state: null,
    viewer: {
        busyCount: 0,
        tool: ActiveMapTool.None,
        featureTooltipsEnabled: false,
        layerGroupVisibility: {
            showLayers: [],
            showGroups: [],
            hideLayers: [],
            hideGroups: []
        }
    }
};

export function runtimeMapReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP:
            {
                const newState = assign({}, state, { "state": action.payload.map });
                return newState;
            }
        case Constants.MAP_SET_ACTIVE_TOOL:
            {
                const newState = assign({}, state, {
                    viewer: {
                        busyCount: state.viewer.busyCount,
                        tool: action.payload,
                        featureTooltipsEnabled: state.viewer.featureTooltipsEnabled,
                        layerGroupVisibility: state.viewer.layerGroupVisibility 
                    }
                });
                return newState;
            }
        case Constants.MAP_SET_MAPTIP:
            {
                const newState = assign({}, state, {
                    viewer: {
                        busyCount: state.viewer.busyCount,
                        tool: state.viewer.tool,
                        featureTooltipsEnabled: action.payload,
                        layerGroupVisibility: state.viewer.layerGroupVisibility 
                    }
                });
                return newState;
            }
        case Constants.MAP_SET_BUSY_COUNT:
            {
                const newState = assign({}, state, {
                    viewer: {
                        busyCount: action.payload,
                        tool: state.viewer.tool,
                        featureTooltipsEnabled: state.viewer.featureTooltipsEnabled,
                        layerGroupVisibility: state.viewer.layerGroupVisibility 
                    }
                });
                return newState;
            }
    }
    return state;
}