import * as Constants from "../constants";
const assign = require("object-assign");

export const INITIAL_STATE = {
    agentUri: null,
    agentKind: null,
    locale: "en",
    imageFormat: "PNG",
    selectionColor: "0x0000FFAA",
    externalBaseLayers: [],
    coordinates: {
        decimals: 6
    }
};

export function configReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP: 
            {
                const newState = assign({}, state, {
                    externalBaseLayers: action.payload.externalBaseLayers
                });
                return newState;
            }
        case Constants.MAP_SET_BASE_LAYER:
            {
                const baseLayers = state.externalBaseLayers.map(layer => {
                    layer.visible = false;
                    if (layer.name == action.payload) {
                        layer.visible = true;
                    }
                    return layer;
                });
                const newState = assign({}, state, {
                    externalBaseLayers: baseLayers
                });
                return newState;
            }
    }
    return state;
}