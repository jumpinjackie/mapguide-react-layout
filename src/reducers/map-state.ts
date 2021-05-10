import {
    IBranchedMapState,
    IBranchedMapSubState,
    IExternalBaseLayer,
    ILayerInfo
} from "../api/common";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { isMapView } from "../utils/type-guards";
import { makeUnique } from "../utils/array";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { debug } from '../utils/logger';

export const MAP_STATE_INITIAL_STATE: IBranchedMapState = {

};

export const MAP_STATE_INITIAL_SUB_STATE: IBranchedMapSubState = {
    currentView: undefined,
    initialView: undefined,
    history: [],
    historyIndex: -1,
    selectionSet: undefined,
    layerIndex: -1,
    featureIndex: -1,
    layerTransparency: {},
    selectableLayers: {},
    expandedGroups: {},
    runtimeMap: undefined,
    showLayers: [],
    showGroups: [],
    hideLayers: [],
    hideGroups: [],
    externalBaseLayers: [],
    activeSelectedFeature: undefined,
    layers: []
};

function setLayerAction<K extends keyof ILayerInfo>(state: IBranchedMapState, mapName: string, layerName: string, selector: (current: ILayerInfo) => Pick<ILayerInfo, K>): IBranchedMapState {
    const subState = state[mapName];
    if (subState) {
        const layers = subState.layers.map(l => {
            if (l.name == layerName) {
                return {
                    ...l,
                    ...(selector(l))
                } as ILayerInfo;
            } else {
                return l;
            }
        });
        const state1: Partial<IBranchedMapSubState> = {
            layers
        };
        return mergeSubState(state, mapName, { ...subState, ...state1 });
    }
    return state;
}

function mergeSubState(state: IBranchedMapState, mapName: string, subState: Partial<IBranchedMapSubState>): IBranchedMapState {
    const state1: Partial<IBranchedMapState> = {};
    state1[mapName] = { ...state[mapName], ...subState };
    return { ...state, ...state1 } as IBranchedMapState;
}

export function mapStateReducer(state = MAP_STATE_INITIAL_STATE, action: ViewerAction) {
    switch (action.type) {
        case ActionType.MAP_REFRESH:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const state1 = {
                        runtimeMap: payload.map
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.INIT_APP:
            {
                const { payload } = action;
                const maps = payload.maps;
                const mapKeys = Object.keys(maps);
                const newState: Partial<IBranchedMapState> = {};
                let mapNameToApplyInitialState = payload.activeMapName;
                if (!mapNameToApplyInitialState && mapKeys.length == 1) {
                    mapNameToApplyInitialState = mapKeys[0];
                }
                for (const mapName of mapKeys) {
                    let cv: Partial<IBranchedMapSubState> | undefined;
                    if (payload.initialView && mapName == mapNameToApplyInitialState) {
                        cv = {
                            currentView: { ...payload.initialView }
                        };
                    }
                    let isel: Partial<IBranchedMapSubState> | undefined;
                    if (payload.initialSelections && payload.initialSelections[mapName]) {
                        isel = {
                            selectionSet: payload.initialSelections[mapName]
                        };
                        debug(`Restoring client-side selection set for: ${mapName}`);
                    }

                    const sl = [];
                    const sg = [];
                    const hl = [];
                    const hg = [];

                    if (mapName == mapNameToApplyInitialState) {
                        const rtm: RuntimeMap = maps[mapName].map;
                        const isl = payload.initialShowLayers || [];
                        const isg = payload.initialShowGroups || [];
                        const ihl = payload.initialHideLayers || [];
                        const ihg = payload.initialHideGroups || [];

                        //Only initally show what is initially hidden and vice versa
                        //NOTE: A map could have duplicate group/layer names, we make no attempt
                        //to pick out the "correct" one. It's first come first serve.
                        if (rtm.Layer) {
                            for (const l of rtm.Layer) {
                                if (isl.indexOf(l.Name) >= 0 && !l.Visible) {
                                    sl.push(l.ObjectId);
                                } else if (ihl.indexOf(l.Name) >= 0 && l.Visible) {
                                    hl.push(l.ObjectId);
                                }
                            }
                        }
                        if (rtm.Group) {
                            for (const g of rtm.Group) {
                                if (isg.indexOf(g.Name) >= 0 && !g.Visible) {
                                    sg.push(g.ObjectId);
                                } else if (ihg.indexOf(g.Name) >= 0 && g.Visible) {
                                    hg.push(g.ObjectId);
                                }
                            }
                        }
                        debug(`Initially showing layers: ${isl.join("|")}`);
                        debug(`Initially showing groups: ${isg.join("|")}`);
                        debug(`Initially hiding layers: ${ihl.join("|")}`);
                        debug(`Initially hiding groups: ${ihg.join("|")}`);

                        debug(`Initially showing layer ids: ${sl.join("|")}`);
                        debug(`Initially showing group ids: ${sg.join("|")}`);
                        debug(`Initially hiding layer ids: ${hl.join("|")}`);
                        debug(`Initially hiding group ids: ${hg.join("|")}`);
                    }
                    const newMapState = {
                        ...MAP_STATE_INITIAL_SUB_STATE,
                        ...{ runtimeMap: maps[mapName].map },
                        ...{ externalBaseLayers: maps[mapName].externalBaseLayers },
                        ...{ initialView: maps[mapName].initialView },
                        ...(cv || {}),
                        ...(isel || {}),
                        ...(sl.length > 0 ? { showLayers: [...sl] } : {}),
                        ...(sg.length > 0 ? { showGroups: [...sg] } : {}),
                        ...(hl.length > 0 ? { hideLayers: [...hl] } : {}),
                        ...(hg.length > 0 ? { hideGroups: [...hg] } : {})
                    };

                    // As INIT_APP does not establish a currentView, if a currentView was
                    // somehow established as part of the initial app state, we will keep
                    // it instead of it being discarded
                    if (state?.[mapName]?.currentView) {
                        newMapState.currentView = state[mapName].currentView;
                    }

                    newState[mapName] = newMapState;
                }

                return { ...state, ...newState };
            }
        case ActionType.MAP_PREVIOUS_VIEW:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const index = subState.historyIndex - 1;
                    const state1: Partial<IBranchedMapSubState> = {
                        historyIndex: index,
                        currentView: subState.history[index]
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.MAP_NEXT_VIEW:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const index = subState.historyIndex + 1;
                    const state1: Partial<IBranchedMapSubState> = {
                        historyIndex: index,
                        currentView: subState.history[index]
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.MAP_SET_SCALE:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    let view = subState.currentView;
                    const scale = payload.scale;
                    if (typeof view === 'object' && typeof scale === 'number') {
                        const view1 = { scale: scale, resolution: payload.resolution };
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
                return state;
            }
        case ActionType.MAP_SET_VIEW:
            {
                const { payload } = action;
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
                return state;
            }
        case ActionType.MAP_SET_LAYER_TRANSPARENCY:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const trans = { ...subState.layerTransparency };
                    trans[payload.layerName] = payload.opacity;
                    const state1: Partial<IBranchedMapSubState> = {
                        layerTransparency: trans
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.LEGEND_SET_LAYER_SELECTABLE:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const layers = { ...subState.selectableLayers };
                    layers[payload.id] = payload.value;
                    const state1: Partial<IBranchedMapSubState> = {
                        selectableLayers: layers
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.LEGEND_SET_GROUP_EXPANDABLE:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const groups = { ...subState.expandedGroups };
                    groups[payload.id] = payload.value;
                    const state1: Partial<IBranchedMapSubState> = {
                        expandedGroups: groups
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.LEGEND_SET_GROUP_VISIBILITY:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    let showGroups: string[] = [...subState.showGroups];
                    let hideGroups: string[] = [...subState.hideGroups];
                    if (payload.value === true) { //Show it
                        showGroups.push(payload.id);
                        showGroups = makeUnique(showGroups);
                        hideGroups = hideGroups.filter(g => g != payload.id);
                    } else { //Hide it
                        hideGroups.push(payload.id);
                        hideGroups = makeUnique(hideGroups);
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
                return state;
            }
        case ActionType.LEGEND_SET_LAYER_VISIBILITY:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    let showLayers: string[] = [...subState.showLayers];
                    let hideLayers: string[] = [...subState.hideLayers];
                    if (payload.value === true) { //Show it
                        showLayers.push(payload.id);
                        showLayers = makeUnique(showLayers);
                        hideLayers = hideLayers.filter(g => g != payload.id);
                    } else { //Hide it
                        hideLayers.push(payload.id);
                        hideLayers = makeUnique(hideLayers);
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
                return state;
            }
        case ActionType.MAP_SET_SELECTION:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const state1: Partial<IBranchedMapSubState> = {
                        selectionSet: payload.selection,
                        layerIndex: -1,
                        featureIndex: -1,
                        activeSelectedFeature: undefined
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.MAP_SHOW_SELECTED_FEATURE:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const state1: Partial<IBranchedMapSubState> = {
                        activeSelectedFeature: {
                            layerId: payload.layerId,
                            selectionKey: payload.selectionKey
                        }
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.MAP_SET_BASE_LAYER:
            {
                const { payload } = action;
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
                return state;
            }
        case ActionType.LAYER_ADDED:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const layers = [payload.layer, ...subState.layers];
                    const state1: Partial<IBranchedMapSubState> = {
                        layers
                    };
                    const ss = mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                    if (payload.defaultStyle) {
                        const ss1 = setLayerAction(ss, payload.mapName, payload.layer.name, () => ({ vectorStyle: payload.defaultStyle }));
                        return ss1;
                    }
                    return ss;
                }
                return state;
            }
        case ActionType.REMOVE_LAYER:
            {
                const { payload } = action;
                const subState = state[payload.mapName];
                if (subState) {
                    const layers = subState.layers.filter(l => l.name != action.payload.layerName);
                    const state1: Partial<IBranchedMapSubState> = {
                        layers
                    };
                    return mergeSubState(state, payload.mapName, { ...subState, ...state1 });
                }
                return state;
            }
        case ActionType.SET_LAYER_VISIBILITY:
            {
                const { mapName, layerName, visible } = action.payload;
                const state1 = setLayerAction(state, mapName, layerName, () => ({ visible: visible }));
                return state1;
            }
        case ActionType.SET_LAYER_OPACITY:
            {
                const { mapName, layerName, opacity } = action.payload;
                const state1 = setLayerAction(state, mapName, layerName, () => ({ opacity: opacity }));
                return state1;
            }
        case ActionType.SET_LAYER_INDEX:
            {
                const { mapName, index, layerName } = action.payload;
                const subState = state[mapName];
                if (subState) {
                    const layers = [...subState.layers];
                    let currentIdx = -1;
                    for (let i = 0; i < layers.length; i++) {
                        if (layers[i].name == layerName) {
                            currentIdx = i;
                            break;
                        }
                    }
                    if (currentIdx >= 0 && currentIdx != index && index < layers.length && index >= 0) {
                        const theLayer = layers[currentIdx];
                        layers.splice(currentIdx, 1);
                        layers.splice(index, 0, theLayer);
                        const state1: Partial<IBranchedMapSubState> = {
                            layers
                        };
                        return mergeSubState(state, mapName, { ...subState, ...state1 });
                    }
                }
                return state;
            }
        case ActionType.SET_LAYER_VECTOR_STYLE:
            {
                const { mapName, layerName, style } = action.payload;
                const state1 = setLayerAction(state, mapName, layerName, () => ({ vectorStyle: style }));
                return state1;
            }
        case ActionType.ADD_LAYER_BUSY_WORKER:
            {
                const { mapName, layerName } = action.payload;
                const state1 = setLayerAction(state, mapName, layerName, l => ({ busyWorkerCount: l.busyWorkerCount + 1 }));
                return state1;
            }
        case ActionType.REMOVE_LAYER_BUSY_WORKER:
            {
                const { mapName, layerName } = action.payload;
                const state1 = setLayerAction(state, mapName, layerName, l => ({ busyWorkerCount: l.busyWorkerCount - 1 }));
                return state1;
            }
    }
    return state;
}