import * as Constants from "../constants";
import { ActiveMapTool } from "../components/map-viewer-base";
import uniq = require("lodash.uniq");
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
        case Constants.MAP_REFRESH:
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
        case Constants.LEGEND_SET_GROUP_VISIBILITY:
            {
                let showGroups = state.viewer.layerGroupVisibility.showGroups;
                let hideGroups = state.viewer.layerGroupVisibility.hideGroups;
                if (action.payload.visible === true) { //Show it
                    showGroups.push(action.payload.groupId);
                    showGroups = uniq(showGroups);
                    hideGroups = hideGroups.filter(g => g != action.payload.groupId);
                } else { //Hide it
                    hideGroups.push(action.payload.groupId);
                    hideGroups = uniq(hideGroups);
                    showGroups = showGroups.filter(g => g != action.payload.groupId);
                }
                const newState = assign({}, state, {
                    viewer: {
                        busyCount: state.viewer.busyCount,
                        tool: state.viewer.tool,
                        featureTooltipsEnabled: state.viewer.featureTooltipsEnabled,
                        layerGroupVisibility: {
                            showLayers: state.viewer.layerGroupVisibility.showLayers,
                            showGroups: showGroups,
                            hideLayers: state.viewer.layerGroupVisibility.hideLayers,
                            hideGroups: hideGroups
                        }
                    }
                });
                return newState;
            }
        case Constants.LEGEND_SET_LAYER_VISIBILITY:
            {
                let showLayers = state.viewer.layerGroupVisibility.showLayers;
                let hideLayers = state.viewer.layerGroupVisibility.hideLayers;
                if (action.payload.visible === true) { //Show it
                    showLayers.push(action.payload.layerId);
                    showLayers = uniq(showLayers);
                    hideLayers = hideLayers.filter(g => g != action.payload.layerId);
                } else { //Hide it
                    hideLayers.push(action.payload.layerId);
                    hideLayers = uniq(hideLayers);
                    showLayers = showLayers.filter(g => g != action.payload.layerId);
                }
                const newState = assign({}, state, {
                    viewer: {
                        busyCount: state.viewer.busyCount,
                        tool: state.viewer.tool,
                        featureTooltipsEnabled: state.viewer.featureTooltipsEnabled,
                        layerGroupVisibility: {
                            showLayers: showLayers,
                            showGroups: state.viewer.layerGroupVisibility.showGroups,
                            hideLayers: hideLayers,
                            hideGroups: state.viewer.layerGroupVisibility.hideGroups
                        }
                    }
                });
                return newState;
            }
    }
    return state;
}