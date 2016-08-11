import * as Constants from "../constants";
import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";

function getDefaultCommandSet() {
    return [
        { command: "Select" },
        { command: "Pan" },
        { command: "Zoom" },
        { command: "ZoomIn" },
        { command: "ZoomOut" },
        { command: "MapTip" },
        { command: "SelectRadius" },
        { command: "SelectPolygon" },
        { command: "ZoomExtents" },
        { command: "ClearSelection" },
        { command: "Buffer" },
        { command: "Measure" },
        { command: "QuickPlot" }
    ];
}

export function initApp(options) {
    return (dispatch, getState) => {
        const args = getState().config;
        const client = new Client(args.agentUri, args.agentKind);
        client.createRuntimeMap({
            mapDefinition: options.resourceId,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            username: "Anonymous"
        }).then(res => {
            dispatch({
                type: Constants.INIT_APP,
                payload: {
                    map: res,
                    commands: getDefaultCommandSet()
                }
            });
        });
    };
}