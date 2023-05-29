import {
    IConfigurationReducerState,
    ICoordinateConfiguration,
    IViewerCapabilities,
    UnitOfMeasure,
    KC_ESCAPE,
    KC_U
} from "../api/common";
import { DEFAULT_LOCALE } from "../api/i18n";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { warn } from '../utils/logger';
import { tryParseArbitraryCs } from "../utils/units";
import { isRuntimeMap } from "../utils/type-guards";

export const CONFIG_INITIAL_STATE: IConfigurationReducerState = {
    agentUri: undefined,
    agentKind: "mapagent",
    locale: DEFAULT_LOCALE,
    activeMapName: undefined,
    availableMaps: undefined,
    viewRotation: 0,
    viewRotationEnabled: true,
    viewSizeUnits: UnitOfMeasure.Meters,
    manualFeatureTooltips: false,
    cancelDigitizationKey: KC_ESCAPE,
    undoLastPointKey: KC_U,
    selectCanDragPan: false,
    coordinates: {
        decimals: 6
    } as ICoordinateConfiguration,
    viewer: {
        isStateless: false,
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

export function configReducer(state = CONFIG_INITIAL_STATE, action: ViewerAction): IConfigurationReducerState {
    switch (action.type) {
        case ActionType.SET_LOCALE:
            {
                return {
                    ...state,
                    ...{ locale: action.payload }
                }
            }
        case ActionType.SET_APP_SETTING:
            {
                const settings = { ...(state.appSettings ?? {}) };
                settings[action.payload.key] = action.payload.value;
                return {
                    ...state,
                    ...{ appSettings: settings }
                };
            }
        case ActionType.INIT_APP:
            {
                const payload = action.payload ?? {};
                const maps = payload.maps;
                const availableMaps = [];
                let am = payload.activeMapName;
                const mapNames = Object.keys(maps);
                for (const mapName of mapNames) {
                    availableMaps.push({ name: maps[mapName].mapGroupId, value: mapName });
                }
                if (mapNames.indexOf(am) < 0) {
                    warn(`Invalid initial active map name: ${am}. Probably because we haven't properly implemented recovery of runtime maps on reload yet`);
                    am = mapNames[0];
                }
                const state1: Partial<IConfigurationReducerState> = {
                    appSettings: payload.appSettings,
                    locale: payload.locale || DEFAULT_LOCALE,
                    capabilities: payload.capabilities,
                    activeMapName: am,
                    availableMaps: availableMaps
                };
                const newState = { ...state, ...state1 };
                if (payload.config != null && Object.keys(payload.config).length > 0) {
                    const coordConfig = { ...state.coordinates };
                    const viewerConfig = { ...state.viewer };
                    if (payload.config.isStateless != null) {
                        viewerConfig.isStateless = payload.config.isStateless;
                    }
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
                    const mapKeys = Object.keys(payload.maps);
                    if (payload.config.viewSizeUnits != null) {
                        state2.viewSizeUnits = payload.config.viewSizeUnits;
                    } else if (mapKeys.length == 1) {
                        const m = payload.maps[mapKeys[0]].map;
                        if (m) {
                            let arbCs;
                            if (isRuntimeMap(m)) {
                                arbCs = tryParseArbitraryCs(m.CoordinateSystem.MentorCode);
                            } else {
                                arbCs = tryParseArbitraryCs(m?.meta?.projection);
                            }
                            // If arbitrary, infer units from it
                            if (arbCs) {
                                state2.viewSizeUnits = arbCs.units;
                            }
                        }
                    }
                    return { ...newState, ...state2 };
                } else {
                    return newState;
                }
            }
        case ActionType.MAP_ENABLE_SELECT_DRAGPAN:
            {
                return { ...state, ...{ selectCanDragPan: action.payload } };
            }
        case ActionType.MAP_SET_VIEW_ROTATION:
            {
                return { ...state, ...{ viewRotation: action.payload } };
            }
        case ActionType.MAP_SET_VIEW_ROTATION_ENABLED:
            {
                return { ...state, ...{ viewRotationEnabled: action.payload } };
            }
        case ActionType.MAP_SET_ACTIVE_MAP:
            {
                const data: any = action.payload;
                if (data) {
                    const state1: Partial<IConfigurationReducerState> = {
                        activeMapName: data
                    };
                    return { ...state, ...state1 };
                }
            }
        case ActionType.MAP_SET_VIEW_SIZE_UNITS:
            {
                //HACK: Huh? It's typed UnitOfMeasure on both ends, so where is the string coming from that causes
                //the RHS type to be string | UnitOfMeasure?
                const state1: Partial<IConfigurationReducerState> = { viewSizeUnits: action.payload as UnitOfMeasure };
                return { ...state, ...state1 };
            }
        case ActionType.MAP_SET_MANUAL_MAPTIP:
            {
                return { ...state, ...{ manualFeatureTooltips: action.payload } };
            }
    }
    return state;
}