import * as Constants from "../constants";
const assign = require("object-assign");

export const INITIAL_STATE = {
    agentUri: null,
    agentKind: null,
    locale: "en",
    viewer: {
        imageFormat: "PNG",
        selectionImageFormat: "PNG8",
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
                    locale: action.payload.locale || "en",
                    externalBaseLayers: action.payload.externalBaseLayers,
                    capabilities: action.payload.capabilities
                });
                if (action.payload.config != null && Object.keys(action.payload.config).length > 0) {
                    const config: any = assign({}, state.viewer);
                    if (action.payload.config.imageFormat != null) {
                        config.imageFormat = action.payload.config.imageFormat;
                    }
                    if (action.payload.config.selectionImageFormat != null) {
                        config.selectionImageFormat = action.payload.config.selectionImageFormat;
                    }
                    if (action.payload.config.selectionColor != null) {
                        config.selectionColor = action.payload.config.selectionColor;
                    }
                    if (action.payload.config.pointSelectionBuffer != null) {
                        config.pointSelectionBuffer = action.payload.config.pointSelectionBuffer;
                    }
                    return assign(newState, { viewer: config });
                } else {
                    return newState;
                }
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