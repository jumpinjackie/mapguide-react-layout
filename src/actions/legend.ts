import * as Constants from "../constants";
import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import {
    ReduxThunkedAction,
    getRuntimeMap
} from "../api/common";

export function setGroupVisibility(mapName: string, options: { id: string, value: boolean }) {
    return {
        type: Constants.LEGEND_SET_GROUP_VISIBILITY,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

export function setLayerVisibility(mapName: string, options: { id: string, value: boolean }) {
    return {
        type: Constants.LEGEND_SET_LAYER_VISIBILITY,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

export function setGroupExpanded(mapName: string, options: { id: string, value: boolean }) {
    return {
        type: Constants.LEGEND_SET_GROUP_EXPANDABLE,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

export function setLayerSelectable(mapName: string, options: { id: string, value: boolean }) {
    return {
        type: Constants.LEGEND_SET_LAYER_SELECTABLE,
        payload: { ...options, ...{ mapName: mapName } }
    };
}

export function refresh(): ReduxThunkedAction {
    return (dispatch, getState) => {
        const state = getState();
        const args = state.config;
        const map = getRuntimeMap(state);
        if (map && args.agentUri && args.agentKind) {
            const client = new Client(args.agentUri, args.agentKind);
            client.describeRuntimeMap({
                mapname: map.Name,
                session: map.SessionId,
                requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
            }).then(res => {
                dispatch({
                    type: Constants.MAP_REFRESH,
                    payload: {
                        mapName: args.activeMapName,
                        map: res
                    }
                });
            });
        }
    };
}