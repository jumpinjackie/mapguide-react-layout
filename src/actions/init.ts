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
                const contextMenu = (webLayout.ContextMenu.Visible
                                  ? convertUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, false)
                                  : []);
                const config: any = {};
                if (webLayout.SelectionColor != null) {
                    config.selectionColor = webLayout.SelectionColor;
                }
                if (webLayout.MapImageFormat != null) {
                    config.imageFormat = webLayout.MapImageFormat;
                }
                if (webLayout.PointSelectionBuffer != null) {
                    config.pointSelectionBuffer = webLayout.PointSelectionBuffer;
                }
                let initialView = null;
                if (webLayout.Map.InitialView != null) {
                    initialView = {
                        x: webLayout.Map.InitialView.CenterX,
                        y: webLayout.Map.InitialView.CenterY,
                        scale: webLayout.Map.InitialView.Scale
                    };
                }
                dispatch({
                    type: Constants.INIT_APP,
                    payload: {
                        initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", map.Name, map.SessionId, args.locale),
                        map: map,
                        externalBaseLayers: options.externalBaseLayers,
                        config: config,
                        initialView: initialView,
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
                            },
                            "contextmenu": {
                                items: contextMenu
                            }
                        }
                    }
                });
            });
        });
    };
}