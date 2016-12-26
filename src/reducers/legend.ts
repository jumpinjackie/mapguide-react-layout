import * as Constants from "../constants";
import { ILegendReducerState } from "../api/common";

export const INITIAL_STATE: ILegendReducerState = {
    selectableLayers: {},
    expandedGroups: {}
};

export function legendReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.LEGEND_SET_LAYER_SELECTABLE:
            {
                const layers = state.selectableLayers;
                layers[payload.id] = payload.value;
                const state1 = {
                    selectableLayers: layers
                };
                return { ...state, ...state1 };
            }
        case Constants.LEGEND_SET_GROUP_EXPANDABLE:
            {
                const groups = state.expandedGroups;
                groups[payload.id] = payload.value;
                const state1 = {
                    expandedGroups: groups
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}