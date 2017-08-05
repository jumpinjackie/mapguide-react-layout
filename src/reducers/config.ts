import * as Constants from "../constants";
import {
    IConfigurationReducerState,
    IExternalBaseLayer,
    ICoordinateConfiguration,
    INameValuePair,
    IViewerCapabilities
} from "../api/common";
import { AnyAction } from "redux";

export const INITIAL_STATE: IConfigurationReducerState = {
    agentUri: undefined,
    agentKind: "mapagent",
    locale: "en",
    activeMapName: undefined,
    availableMaps: undefined,
    viewRotation: 0,
    viewRotationEnabled: true,
    coordinates: {
        decimals: 6
    } as ICoordinateConfiguration,
    viewer: {
        imageFormat: "PNG",
        selectionImageFormat: "PNG8",
        selectionColor: "0x0000FFAA",
        pointSelectionBuffer: 2
    },
    capabilities: {
        hasTaskPane: false,
        hasTaskBar: false,
        hasStatusBar: false,
        hasNavigator: false,
        hasSelectionPanel: false,
        hasLegend: false,
        hasToolbar: false
    } as IViewerCapabilities
};

export function configReducer(state = INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP:
            {
                const payload: any = action.payload || {};
                const maps = payload.maps;
                const availableMaps = [];
                for (const mapName in maps) {
                    availableMaps.push({ name: maps[mapName].mapGroupId, value: mapName });
                }
                const state1: Partial<IConfigurationReducerState> = {
                    locale: payload.locale || "en",
                    capabilities: payload.capabilities,
                    activeMapName: payload.activeMapName,
                    availableMaps: availableMaps
                };
                const newState: Partial<IConfigurationReducerState> = { ...state, ...state1 };
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
                    const state2: Partial<IConfigurationReducerState> = { viewer: config };
                    return { ...newState, ...state2 };
                } else {
                    return newState;
                }
            }
        case Constants.MAP_SET_VIEW_ROTATION:
            {
                return { ...state, ...{ viewRotation: action.payload } };
            }
        case Constants.MAP_SET_VIEW_ROTATION_ENABLED:
            {
                return { ...state, ...{ viewRotationEnabled: action.payload } };
            }
        case Constants.MAP_SET_ACTIVE_MAP:
            {
                const data: any = action.payload;
                if (data) {
                    const state1: Partial<IConfigurationReducerState> = {
                        activeMapName: data
                    };
                    return { ...state, ...state1 };
                }
            }
    }
    return state;
}