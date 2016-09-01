import * as Constants from "../constants";
import { Client } from "../api/client";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import { registerCommand, DefaultCommands } from "../api/registry/command";
import { ensureParameters } from "../actions/taskpane";
import {
    WebLayout,
    CommandDef,
    isBasicCommand,
    isSeparatorItem,
    isFlyoutItem,
    isCommandItem,
    isInvokeURLCommand,
    UIItem 
} from "../api/contracts/weblayout";
import * as logger from "../utils/logger";

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
        { isSeparator: true },
        {
            label: "Tools",
            children: [
                {
                    command: "Buffer",
                    label: "Buffer",
                    tooltip: "Buffer"
                },
                {
                    command: "FeatureInfo",
                    label: "Feature Information",
                    tooltip: "Feature Information" 
                },
                { 
                    command: "Query",
                    label: "Query",
                    tooltip: "Query" 
                },
                { 
                    command: "Redline",
                    label: "Redline",
                    tooltip: "Redline" 
                },
                { 
                    command: "SelectWithin",
                    label: "Select Within",
                    tooltip: "Select Within" 
                },
                { 
                    command: "Theme",
                    label: "Theme",
                    tooltip: "Theme" 
                }
            ]
        },
        { isSeparator: true },
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
            command: "SelectWithin",
            //label: "Select Within",
            tooltip: "Select Within" 
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

function convertUIItems(items: UIItem[], cmdsByKey: any, noToolbarLabels = true, canSupportFlyouts = true): any[] {
    return items.map(item => {
        if (isCommandItem(item)) {
            const cmdDef: CommandDef = cmdsByKey[item.Command];
            if (!cmdDef) {
                logger.warn(`Invalid reference to command: ${item.Command}`);
            } else {
                if (isBasicCommand(cmdDef)) {
                    let action: string = cmdDef.Action;
                    if (action == "FitToWindow") {
                        action = DefaultCommands.ZoomExtents
                    }
                    return { command: action, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                } else {
                    return { command: cmdDef.Name, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                }
            }
        } else if (isSeparatorItem(item)) {
            return { isSeparator: true };
        } else if (isFlyoutItem(item)) {
            return { 
                label: item.Label,
                tooltip: item.Tooltip,
                children: convertUIItems(item.SubItem, cmdsByKey, false, false) 
            };
        }

        return null;
    }).filter(item => item != null);
}

export function initWebLayout(options) {
    return (dispatch, getState) => {
        const args = getState().config;
        const client = new Client(args.agentUri, args.agentKind);
        client.createSession("Anonymous", "").then(session => {
            client.getResource<WebLayout>(options.resourceId, { SESSION: session }).then(wl => {
                return Promise.all([
                    wl, 
                    client.createRuntimeMap({
                        mapDefinition: wl.Map.ResourceId,
                        requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                        session: session
                    })
                ]);
            }).then(res => {
                const webLayout = res[0];
                const map = res[1];

                const cmdsByKey: any = {};
                //Register any InvokeURL commands
                for (const cmd of webLayout.CommandSet.Command) {
                    if (isInvokeURLCommand(cmd)) {
                        registerCommand(cmd.Name, { url: cmd.URL, disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty });
                    }
                    cmdsByKey[cmd.Name] = cmd;
                }
                const mainToolbar = (webLayout.ToolBar.Visible
                                   ? convertUIItems(webLayout.ToolBar.Button, cmdsByKey)
                                   : []);
                const taskBar = (webLayout.TaskPane.TaskBar.Visible
                               ? convertUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, false)
                               : []);
                dispatch({
                    type: Constants.INIT_APP,
                    payload: {
                        initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", map.Name, map.SessionId, args.locale),
                        map: map,
                        externalBaseLayers: options.externalBaseLayers,
                        capabilities: {
                            hasTaskPane: webLayout.TaskPane.Visible,
                            hasTaskBar: webLayout.TaskPane.TaskBar.Visible,
                            hasStatusBar: webLayout.StatusBar.Visible,
                            hasNavigator: webLayout.ZoomControl.Visible,
                            hasSelectionPanel: webLayout.InformationPane.Visible && webLayout.InformationPane.PropertiesVisible,
                            hasLegend: webLayout.InformationPane.Visible && webLayout.InformationPane.LegendVisible,
                            hasToolbar: webLayout.ToolBar.Visible
                        },
                        toolbars: {
                            "main": {
                                items: mainToolbar
                            },
                            "taskpane": {
                                items: taskBar
                            }
                        }
                    }
                });
            });
        });
    };
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

            registerCommand("Overview", { url: "/mapguide/phpviewersample/overview/overviewmain.php" });
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