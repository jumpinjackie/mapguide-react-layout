import * as Constants from "../constants";
const assign = require("object-assign");

export const INITIAL_STATE = {
    agentUri: null,
    agentKind: null,
    locale: "en",
    viewer: {
        imageFormat: "PNG",
        selectionColor: "0x0000FFAA",
        pointSelectionBuffer: 2
    },
    externalBaseLayers: [],
    coordinates: {
        decimals: 6
    },
    capabilities: {
        hasTaskPane: false,
        hasTaskBar: false,
        hasStatusBar: false,
        hasNavigator: false,
        hasSelectionPanel: false,
        hasLegend: false,
        hasToolbar: false
    }
};

export function configReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP: 
            {
                const newState = assign({}, state, {
                    externalBaseLayers: action.payload.externalBaseLayers,
                    viewer: action.payload.config,
                    capabilities: action.payload.capabilities
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