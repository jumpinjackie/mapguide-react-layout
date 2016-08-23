import * as Constants from "../constants";
import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import { registerCommand } from "../api/command-registry";
import { ensureParameters } from "../actions/taskpane";

function getDefaultCommandSet() {
    return [
        { 
            command: "Select",
            tooltip: "Select"
        },
        { 
            command: "Pan",
            tooltip: "Pan",
        },
        { 
            command: "Zoom",
            tooltip: "Zoom" 
        },
        { isSeparator: true },
        {
            label: "Zoom",
            children: [
                {
                    command: "ZoomIn",
                    label: "Zoom In",
                    tooltip: "Zoom In"
                },
                {
                    command: "ZoomOut",
                    label: "Zoom Out",
                    tooltip: "Zoom Out" 
                },
                { 
                    command: "ZoomExtents",
                    label: "Zoom Extents",
                    tooltip: "Zoom Extents" 
                }
            ]
        },
        { isSeparator: true },
        { 
            command: "MapTip",
            label: "Feature Tooltips",
            tooltip: "Feature Tooltips" 
        },
        { 
            command: "SelectRadius",
            //label: "Select Radius",
            tooltip: "Select Radius" 
        },
        {
            command: "SelectPolygon",
            //label: "Select Polygon",
            tooltip: "Select Polygon" 
        },
        { 
            command: "ZoomToSelection",
            //label: "Zoom to Selection",
            tooltip: "Zoom to Selection"
        },
        { isSeparator: true },
        {
            command: "PreviousView",
            //label: "Previous View",
            tooltip: "Previous View" 
        },
        {
            command: "NextView",
            //label: "Next View",
            tooltip: "Next View" 
        },
        { isSeparator: true },
        {
            command: "ClearSelection",
            //label: "Clear Selection",
            tooltip: "Clear Selection"
        },
        {
            command: "RefreshMap",
            //label: "Refresh Map",
            tooltip: "Refresh Map"
        }
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

            const initUrl = "/mapguide/phpsamples/index.php"

            registerCommand("Buffer", { url: "/mapguide/mapviewernet/buffer.aspx" });
            registerCommand("Query", { url: "/mapguide/phpviewersample/query/querymain.php" });
            registerCommand("Overview", { url: "/mapguide/phpviewersample/overview/overviewmain.php" });
            registerCommand("Theme", { url: "/mapguide/phpviewersample/theme/thememain.php" });
            registerCommand("Plot", { url: "/mapguide/phpviewersample/plot/plotmain.php" });
            registerCommand("FindAddress", { url: "/mapguide/phpviewersample/findaddress/findaddressmain.php" });

            dispatch({
                type: Constants.INIT_APP,
                payload: {
                    initialUrl: ensureParameters(initUrl, res.Name, res.SessionId, args.locale),
                    map: res,
                    externalBaseLayers: options.externalBaseLayers,
                    toolbars: {
                        "main": {
                            items: getDefaultCommandSet()
                        },
                        "taskpane": {
                            items: [
                                { command: "Overview", label: "Overview" },
                                { command: "Query", label: "Query" },
                                { command: "Theme", label: "Theme" },
                                { command: "FindAddress", label: "Find Address" },
                                { command: "Plot", label: "Plot" },
                                { isSeparator: true },
                                { command: "Buffer", label: "Buffer" }
                            ]
                        }
                    }
                }
            });
        });
    };
}