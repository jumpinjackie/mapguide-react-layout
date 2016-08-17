import * as Constants from "../constants";
import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";

export function setGroupVisibility(options: { groupId: string, visible: boolean }) {
    return {
        type: Constants.LEGEND_SET_GROUP_VISIBILITY,
        payload: options
    };
}

export function setLayerVisibility(options: { groupId: string, visible: boolean }) {
    return {
        type: Constants.LEGEND_SET_LAYER_VISIBILITY,
        payload: options
    };
}

export function refresh() {
    return (dispatch, getState) => {
        const args = getState().config;
        const map = getState().map.state;
        const client = new Client(args.agentUri, args.agentKind);
        client.describeRuntimeMap({
            mapname: map.Name,
            session: map.SessionId,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
        }).then(res => {
            dispatch({
                type: Constants.LEGEND_REFRESH,
                payload: {
                    map: res
                }
            });
        });
    };
}