import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
    selectableLayers: {},
    expandedGroups: {}
};

export function legendReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.LEGEND_SET_LAYER_SELECTABLE:
            {
                const layers = state.selectableLayers;
                layers[action.payload.id] = action.payload.value;
                const newState = assign({}, state, {
                    selectableLayers: layers
                });
                return newState;
            }
        case Constants.LEGEND_SET_GROUP_EXPANDABLE:
            {
                const groups = state.expandedGroups;
                groups[action.payload.id] = action.payload.value;
                const newState = assign({}, state, {
                    expandedGroups: groups
                });
                return newState;
            }
    }
    return state;
}