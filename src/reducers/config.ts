import * as Constants from "../constants";
import { IConfigurationReducerState, IExternalBaseLayer } from "../api/common";

export const INITIAL_STATE: IConfigurationReducerState = {
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
                const payload: any = action.payload || {};
                const state1 = {
                    locale: payload.locale || "en",
                    externalBaseLayers: payload.externalBaseLayers,
                    capabilities: payload.capabilities
                };
                const newState = { ...state, ...state1 };
                if (payload.config != null && Object.keys(payload.config).length > 0) {
                    const config: any = { ...state.viewer };
                    if (payload.config.imageFormat != null) {
                        config.imageFormat = payload.config.imageFormat;
                    }
                    if (payload.config.selectionImageFormat != null) {
                        config.selectionImageFormat = payload.config.selectionImageFormat;
                    }
                    if (payload.config.selectionColor != null) {
                        config.selectionColor = payload.config.selectionColor;
                    }
                    if (payload.config.pointSelectionBuffer != null) {
                        config.pointSelectionBuffer = payload.config.pointSelectionBuffer;
                    }
                    const state2 = { viewer: config };
                    return { ...newState, ...state2 };
                } else {
                    return newState;
                }
            }
        case Constants.MAP_SET_BASE_LAYER:
            {
                const layers: IExternalBaseLayer[] = (state.externalBaseLayers || []);
                const baseLayers = layers.map(layer => {
                    layer.visible = false;
                    if (layer.name == action.payload) {
                        layer.visible = true;
                    }
                    return layer;
                });
                const state1 = {
                    externalBaseLayers: baseLayers
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}