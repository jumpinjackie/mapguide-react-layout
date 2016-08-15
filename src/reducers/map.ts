import * as Constants from "../constants";
import { ActiveMapTool } from "../components/map-viewer-base";
const assign = require("object-assign");

const INITIAL_STATE = {
    state: null,
    viewer: {
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
                        tool: state.viewer.tool,
                        featureTooltipsEnabled: action.payload,
                        layerGroupVisibility: state.viewer.layerGroupVisibility 
                    }
                });
                return newState;
            }
    }
    return state;
}