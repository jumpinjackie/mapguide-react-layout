import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
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
                const newState = assign({}, state, {
                    selectableLayers: layers
                });
                return newState;
            }
        case Constants.LEGEND_SET_GROUP_EXPANDABLE:
            {
                const groups = state.expandedGroups;
                groups[payload.id] = payload.value;
                const newState = assign({}, state, {
                    expandedGroups: groups
                });
                return newState;
            }
    }
    return state;
}