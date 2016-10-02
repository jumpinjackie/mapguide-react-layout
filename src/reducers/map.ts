import * as Constants from "../constants";
import { ActiveMapTool } from "../api/common";
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
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.MAP_REFRESH:
        case Constants.INIT_APP:
            {
                const newState = assign({}, state, { "state": payload.map });
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
                let showGroups: string[] = state.viewer.layerGroupVisibility.showGroups;
                let hideGroups: string[] = state.viewer.layerGroupVisibility.hideGroups;
                if (payload.value === true) { //Show it
                    showGroups.push(payload.id);
                    showGroups = uniq(showGroups);
                    hideGroups = hideGroups.filter(g => g != payload.id);
                } else { //Hide it
                    hideGroups.push(payload.id);
                    hideGroups = uniq(hideGroups);
                    showGroups = showGroups.filter(g => g != payload.id);
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
                let showLayers: string[] = state.viewer.layerGroupVisibility.showLayers;
                let hideLayers: string[] = state.viewer.layerGroupVisibility.hideLayers;
                if (payload.value === true) { //Show it
                    showLayers.push(payload.id);
                    showLayers = uniq(showLayers);
                    hideLayers = hideLayers.filter(g => g != payload.id);
                } else { //Hide it
                    hideLayers.push(payload.id);
                    hideLayers = uniq(hideLayers);
                    showLayers = showLayers.filter(g => g != payload.id);
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