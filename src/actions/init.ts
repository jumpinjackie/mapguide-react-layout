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
    isSearchCommand,
    UIItem 
} from "../api/contracts/weblayout";
import {
    ReduxThunkedAction
} from "../api/common";
import { IView } from "../api/contracts/common";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as logger from "../utils/logger";
import queryString = require("query-string");
const parse = require("url-parse");
const assign = require("object-assign");

function convertUIItems(items: UIItem[] | null | undefined, cmdsByKey: any, noToolbarLabels = true, canSupportFlyouts = true): any[] {
    return (items || []).map(item => {
        if (isCommandItem(item)) {
            const cmdDef: CommandDef = cmdsByKey[item.Command];
            if (!cmdDef) {
                logger.warn(`Invalid reference to command: ${item.Command}`);
            } else if (cmdDef.TargetViewer != "Dwf") {
                if (isBasicCommand(cmdDef)) {
                    let action: string = cmdDef.Action;
                    if (action == "ZoomRectangle") {
                        action = DefaultCommands.Zoom;
                    } else if (action == "FitToWindow") {
                        action = DefaultCommands.ZoomExtents;
                    } else if (action == "Refresh") {
                        action = DefaultCommands.RefreshMap;
                    }
                    return { command: action, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                } else {
                    switch (cmdDef["@xsi:type"]) {
                        case "ViewOptionsCommandType":
                            return { command: DefaultCommands.ViewerOptions, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        case "MeasureCommandType":
                            return { command: DefaultCommands.Measure, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        case "HelpCommandType":
                            return { command: DefaultCommands.Help, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        case "BufferCommandType":
                            return { command: DefaultCommands.Buffer, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        case "SelectWithinCommandType":
                            return { command: DefaultCommands.SelectWithin, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        case "GetPrintablePageCommandType":
                            return { command: DefaultCommands.QuickPlot, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                        default:
                            return { command: cmdDef.Name, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip };
                    }
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

function isNotTargeted(target: "TaskPane" | "NewWindow" | "SpecifiedFrame"): target is "TaskPane" | "NewWindow" {
    return target != "SpecifiedFrame";
}

export function initLayout(options: any): ReduxThunkedAction {
    const parsed = parse(window.location.href);
    const query = queryString.parse(parsed.query);
    const opts = assign({}, options, {
        resourceId: query.resource,
        locale: query.locale || "en",
        session: query.session
    });
    return (dispatch, getState) => {
        const args = getState().config;
        if (args.agentUri && args.agentKind) {
            const client = new Client(args.agentUri, args.agentKind);
            const onWebLayoutAndRuntimeMapReceived = (res: [WebLayout, RuntimeMap]) => {
                const webLayout = res[0];
                const map = res[1];

                const cmdsByKey: any = {};
                //Register any InvokeURL and Search commands
                for (const cmd of webLayout.CommandSet.Command) {
                    if (isInvokeURLCommand(cmd)) {
                        let cmdTarget = cmd.Target;
                        if (isNotTargeted(cmdTarget)) {
                            registerCommand(cmd.Name, { url: cmd.URL, disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty, target: cmdTarget });
                        } else {
                            logger.warn(`Command ${cmd.Name} targets a specific frame which is not supported`);
                        }
                    } else if (isSearchCommand(cmd)) {
                        registerCommand(cmd.Name, { layer: cmd.Layer, prompt: cmd.Prompt, resultColumns: cmd.ResultColumns, filter: cmd.Filter, matchLimit: cmd.MatchLimit, title: cmd.Label });
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
                if (webLayout.SelectionImageFormat != null) {
                    config.selectionImageFormat = webLayout.SelectionImageFormat;
                }
                if (webLayout.PointSelectionBuffer != null) {
                    config.pointSelectionBuffer = webLayout.PointSelectionBuffer;
                }
                let initialView: IView | null = null;
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
                        locale: opts.locale,
                        externalBaseLayers: opts.externalBaseLayers,
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
            };
            const onSessionAcquired = (session: string) => {
                client.getResource<WebLayout>(opts.resourceId, { SESSION: session }).then(wl => {
                    return Promise.all([
                        wl, 
                        client.createRuntimeMap({
                            mapDefinition: wl.Map.ResourceId,
                            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                            session: session
                        })
                    ]);
                }).then(onWebLayoutAndRuntimeMapReceived);
            }
            if (opts.session) {
                onSessionAcquired(opts.session);
            } else {
                client.createSession("Anonymous", "").then(onSessionAcquired);
            }
        }
    };
}