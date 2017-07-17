import * as Constants from "../constants";
import {
    ActiveMapTool,
    IBranchedMapState,
    IBranchedMapSubState,
    IExternalBaseLayer
} from "../api/common";
import { isMapView, isCoordinate } from "../utils/type-guards";
import { AnyAction } from "redux";
import uniq = require("lodash.uniq");

export const INITIAL_STATE: IBranchedMapState = {

};

export const INITIAL_SUB_STATE: IBranchedMapSubState = {
    currentView: undefined,
    initialView: undefined,
    history: [],
    historyIndex: -1,
    selectionSet: undefined,
    layerIndex: -1,
    featureIndex: -1,
    selectableLayers: {},
    expandedGroups: {},
    runtimeMap: undefined,
    showLayers: [],
    showGroups: [],
    hideLayers: [],
    hideGroups: [],
    externalBaseLayers: []
};

function mergeSubState(state: IBranchedMapState, mapName: string, subState: Partial<IBranchedMapSubState>) {
    const state1: Partial<IBranchedMapState> = {};
    state1[mapName] = { ...state[mapName], ...subState };
    return { ...state, ...state1 };
}

export function mapStateReducer(state = INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
    const payload: any = typeof(action.payload) != 'undefined' ? action.payload : {};
    switch (action.type) {
        case Constants.MAP_REFRESH:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const state1 = {
                        runtimeMap: payload.map
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.INIT_APP:
            {
                const maps = payload.maps;
                const newState: Partial<IBranchedMapState> = {};
                for (const mapName in maps) {
                    newState[mapName] = {
                        ...INITIAL_SUB_STATE,
                        ...{ runtimeMap: maps[mapName].map },
                        ...{ externalBaseLayers: maps[mapName].externalBaseLayers },
                        ...{ initialView: maps[mapName].initialView }
                    };
                }
                return { ...state, ...newState };
            }
        case Constants.MAP_PREVIOUS_VIEW:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const index = subState.historyIndex - 1;
                    const state1: Partial<IBranchedMapSubState> = {
                        historyIndex: index,
                        currentView: subState.history[index]
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.MAP_NEXT_VIEW:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const index = subState.historyIndex + 1;
                    const state1: Partial<IBranchedMapSubState> = {
                        historyIndex: index,
                        currentView: subState.history[index]
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.MAP_SET_SCALE:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    let view = subState.currentView;
                    const scale = payload.scale;
                    if (typeof view === 'object' && typeof scale === 'number') {
                        const view1 = { scale: scale };
                        view = { ...view, ...view1 };
                    }
                    const state1: Partial<IBranchedMapSubState> = {
                        currentView: view
                    };
                    const newSubState: Partial<IBranchedMapSubState> = { ...state1, ...{ historyIndex: subState.historyIndex } };
                    newSubState.history = [...subState.history];
                    if (view && newSubState.history && newSubState.historyIndex != null) {
                        newSubState.historyIndex++;
                        newSubState.history[newSubState.historyIndex] = view;
                        //If we slotted at a position that is not the end of the array
                        //remove everything after it
                        if (newSubState.history.length > newSubState.historyIndex + 1) {
                            newSubState.history.splice(newSubState.historyIndex + 1);
                        }
                    }
                    return mergeSubState(state, payload.mapName, newSubState);
                }
            }
        case Constants.MAP_SET_VIEW:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const data = payload.view;
                    if (isMapView(data)) {
                        const state1: Partial<IBranchedMapSubState> = {
                            currentView: data
                        };
                        const newSubState: Partial<IBranchedMapSubState> = { ...state1, ...{ historyIndex: subState.historyIndex } };
                        newSubState.history = [...subState.history];
                        if (newSubState.history && newSubState.historyIndex != null) {
                            newSubState.historyIndex++;
                            newSubState.history[newSubState.historyIndex] = data;
                            //If we slotted at a position that is not the end of the array
                            //remove everything after it
                            if (newSubState.history.length > newSubState.historyIndex + 1) {
                                newSubState.history.splice(newSubState.historyIndex + 1);
                            }
                        }
                        return mergeSubState(state, payload.mapName, newSubState);
                    }
                }
            }
        case Constants.LEGEND_SET_LAYER_SELECTABLE:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const layers = { ...subState.selectableLayers };
                    layers[payload.id] = payload.value;
                    const state1: Partial<IBranchedMapSubState> = {
                        selectableLayers: layers
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.LEGEND_SET_GROUP_EXPANDABLE:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const groups = { ...subState.expandedGroups };
                    groups[payload.id] = payload.value;
                    const state1: Partial<IBranchedMapSubState> = {
                        expandedGroups: groups
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.LEGEND_SET_GROUP_VISIBILITY:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    let showGroups: string[] = [...subState.showGroups];
                    let hideGroups: string[] = [...subState.hideGroups];
                    if (payload.value === true) { //Show it
                        showGroups.push(payload.id);
                        showGroups = uniq(showGroups);
                        hideGroups = hideGroups.filter(g => g != payload.id);
                    } else { //Hide it
                        hideGroups.push(payload.id);
                        hideGroups = uniq(hideGroups);
                        showGroups = showGroups.filter(g => g != payload.id);
                    }
                    const state1: Partial<IBranchedMapSubState> = {
                        showLayers: subState.showLayers,
                        showGroups: showGroups,
                        hideLayers: subState.hideLayers,
                        hideGroups: hideGroups
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.LEGEND_SET_LAYER_VISIBILITY:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    let showLayers: string[] = [...subState.showLayers];
                    let hideLayers: string[] = [...subState.hideLayers];
                    if (payload.value === true) { //Show it
                        showLayers.push(payload.id);
                        showLayers = uniq(showLayers);
                        hideLayers = hideLayers.filter(g => g != payload.id);
                    } else { //Hide it
                        hideLayers.push(payload.id);
                        hideLayers = uniq(hideLayers);
                        showLayers = showLayers.filter(g => g != payload.id);
                    }
                    const state1 = {
                        showLayers: showLayers,
                        showGroups: subState.showGroups,
                        hideLayers: hideLayers,
                        hideGroups: subState.hideGroups
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.MAP_SET_SELECTION:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const state1: Partial<IBranchedMapSubState> = {
                        selectionSet: payload.selection,
                        layerIndex: -1,
                        featureIndex: -1
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
        case Constants.MAP_SET_BASE_LAYER:
            {
                const subState = state[payload.mapName];
                if (subState) {
                    const layers: IExternalBaseLayer[] = (subState.externalBaseLayers || []);
                    const baseLayers = layers.map(layer => {
                        layer.visible = false;
                        if (layer.name == payload.layerName) {
                            layer.visible = true;
                        }
                        return layer;
                    });
                    const state1: Partial<IBranchedMapSubState> = {
                        externalBaseLayers: baseLayers
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
            }
    }
    return state;
}