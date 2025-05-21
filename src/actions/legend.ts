import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import {
    ReduxThunkedAction,
    getRuntimeMap
} from "../api/common";
import { ActionType } from '../constants/actions';
import { ILegendSetGroupVisibilityAction, ILegendSetGroupExpandedAction, ILegendSetLayerVisibilityAction, ILegendSetGroupSelectableAction } from './defs';

/**
 * Sets the visibility for the given map group
 *
 * @param {string} mapName
 * @param {{ id: string, value: boolean }} options
 * @returns
 */
export function setGroupVisibility(mapName: string, options: { id: string, value: boolean }): ILegendSetGroupVisibilityAction {
    return {
        type: ActionType.LEGEND_SET_GROUP_VISIBILITY,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

/**
 * Sets the visibility for the given map layer
 *
 * @param {string} mapName
 * @param {{ id: string, value: boolean }} options
 * @returns
 */
export function setLayerVisibility(mapName: string, options: { id: string, value: boolean }): ILegendSetLayerVisibilityAction {
    return {
        type: ActionType.LEGEND_SET_LAYER_VISIBILITY,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

/**
 * Sets the expanded/collapsed state of the given group
 *
 * @param {string} mapName
 * @param {{ id: string, value: boolean }} options
 * @returns
 */
export function setGroupExpanded(mapName: string, options: { id: string, value: boolean }): ILegendSetGroupExpandedAction {
    return {
        type: ActionType.LEGEND_SET_GROUP_EXPANDABLE,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

/**
 * Sets the selectability state for the given map layer
 *
 * @param {string} mapName
 * @param {{ id: string, value: boolean }} options
 * @returns
 */
export function setLayerSelectable(mapName: string, options: { id: string, value: boolean }): ILegendSetGroupSelectableAction {
    return {
        type: ActionType.LEGEND_SET_LAYER_SELECTABLE,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

/**
 * Perform a full refresh with a re-query of the layer/group structure
 *
 * @returns {ReduxThunkedAction}
 */
export function refresh(): ReduxThunkedAction {
    return (dispatch, getState) => {
        const state = getState();
        const args = state.config;
        if (!args.viewer.isStateless) {
            const map = getRuntimeMap(state);
            if (map && args.agentUri && args.agentKind) {
                const client = new Client(args.agentUri, args.agentKind);
                client.describeRuntimeMap({
                    mapname: map.Name,
                    session: map.SessionId,
                    requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
                }).then(res => {
                    if (args.activeMapName) {
                        dispatch({
                            type: ActionType.MAP_REFRESH,
                            payload: {
                                mapName: args.activeMapName,
                                map: res
                            }
                        });
                    }
                });
            }
        }
    };
}