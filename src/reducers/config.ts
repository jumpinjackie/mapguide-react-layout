import * as Constants from "../constants";
import {
    IConfigurationReducerState,
    IExternalBaseLayer,
    ICoordinateConfiguration,
    INameValuePair,
    IViewerCapabilities,
    UnitOfMeasure
} from "../api/common";
import { AnyAction } from "redux";
import { DEFAULT_LOCALE } from "../api/i18n";

export const CONFIG_INITIAL_STATE: IConfigurationReducerState = {
    agentUri: undefined,
    agentKind: "mapagent",
    locale: DEFAULT_LOCALE,
    activeMapName: undefined,
    availableMaps: undefined,
    viewRotation: 0,
    viewRotationEnabled: true,
    viewSizeUnits: UnitOfMeasure.Meters,
    coordinates: {
        decimals: 6
    } as ICoordinateConfiguration,
    viewer: {
        imageFormat: "PNG",
        selectionImageFormat: "PNG8",
        selectionColor: "0x0000FFAA", //Blue
        activeSelectedFeatureColor: "0xFF0000AA", //Red
        pointSelectionBuffer: 2,
        loadIndicatorPositioning: "top",
        loadIndicatorColor: "rgba(34, 153, 221, 0.9)",
    },
    capabilities: {
        hasTaskPane: false,
        hasTaskBar: false,
        hasStatusBar: false,
        hasNavigator: false,
        hasSelectionPanel: false,
        hasLegend: false,
        hasToolbar: false,
        hasViewSize: false
    } as IViewerCapabilities
};

export function configReducer(state = CONFIG_INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
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
                    locale: payload.locale || DEFAULT_LOCALE,
                    capabilities: payload.capabilities,
                    activeMapName: payload.activeMapName,
                    availableMaps: availableMaps
                };
                const newState: Partial<IConfigurationReducerState> = { ...state, ...state1 };
                if (payload.config != null && Object.keys(payload.config).length > 0) {
                    const coordConfig = { ...state.coordinates };
                    const viewerConfig = { ...state.viewer };
                    if (payload.config.imageFormat != null) {
                        viewerConfig.imageFormat = payload.config.imageFormat;
                    }
                    if (payload.config.selectionImageFormat != null) {
                        viewerConfig.selectionImageFormat = payload.config.selectionImageFormat;
                    }
                    if (payload.config.selectionColor != null) {
                        viewerConfig.selectionColor = payload.config.selectionColor;
                    }
                    if (payload.config.pointSelectionBuffer != null) {
                        viewerConfig.pointSelectionBuffer = payload.config.pointSelectionBuffer;
                    }
                    if (payload.config.coordinateProjection != null) {
                        coordConfig.projection = payload.config.coordinateProjection;
                    }
                    if (payload.config.coordinateDecimals != null) {
                        coordConfig.decimals = payload.config.coordinateDecimals;
                    }
                    if (payload.config.coordinateDisplayFormat != null) {
                        coordConfig.format = payload.config.coordinateDisplayFormat;
                    }
                    const state2: Partial<IConfigurationReducerState> = { viewer: viewerConfig, coordinates: coordConfig };
                    if (payload.config.viewSizeUnits != null) {
                        state2.viewSizeUnits = payload.config.viewSizeUnits;
                    }
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
        case Constants.MAP_SET_VIEW_SIZE_UNITS:
            {
                return { ...state, ...{ viewSizeUnits: action.payload } };
            }
    }
    return state;
}