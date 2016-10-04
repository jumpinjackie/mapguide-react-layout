import * as Constants from "../constants";
import { Client } from "../api/client";
import { ReduxDispatch } from "../api/common";
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
    ApplicationDefinition,
    MapConfiguration
} from "../api/contracts/fusion";
import {
    ReduxThunkedAction
} from "../api/common";
import { IView } from "../api/contracts/common";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { tr } from "../api/i18n";
import { MgError } from "../api/error";
import * as logger from "../utils/logger";
import queryString = require("query-string");
const parse = require("url-parse");
const assign = require("object-assign");
const proj4 = require("proj4");

function convertWebLayoutUIItems(items: UIItem[] | null | undefined, cmdsByKey: any, noToolbarLabels = true, canSupportFlyouts = true): any[] {
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
                children: convertWebLayoutUIItems(item.SubItem, cmdsByKey, false, false) 
            };
        }

        return null;
    }).filter(item => item != null);
}

function isNotTargeted(target: "TaskPane" | "NewWindow" | "SpecifiedFrame"): target is "TaskPane" | "NewWindow" {
    return target != "SpecifiedFrame";
}

function makeFlexLayoutAndRuntimeMapReceived(dispatch: ReduxDispatch, opts: any): (res: [ApplicationDefinition, RuntimeMap]) => void {
    return (res: [ApplicationDefinition, RuntimeMap]) => {
        const appDef = res[0];
        const map = res[1];

        const cmdsByKey: any = {};
    };
}

function makeWebLayoutAndRuntimeMapReceived(dispatch: ReduxDispatch, opts: any): (res: [WebLayout, RuntimeMap]) => void {
    return (res: [WebLayout, RuntimeMap]) => {
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
                            ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey)
                            : []);
        const taskBar = (webLayout.TaskPane.TaskBar.Visible
                        ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, false)
                        : []);
        const contextMenu = (webLayout.ContextMenu.Visible
                            ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, false)
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
                initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", map.Name, map.SessionId, opts.locale),
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
}

function makeRuntimeMapSuccessHandler<T>(client: Client, session: string, opts: any, mapDefSelector: (res: T) => string): (res: T) => [T, RuntimeMap] | Thenable<[T, RuntimeMap]> {
    return (res) => {
        const mapDef = mapDefSelector(res);
        return client.createRuntimeMap({
            mapDefinition: mapDef,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            session: session
        }).then(map => {
            //Check the EPSG code here
            const epsg = map.CoordinateSystem.EpsgCode;

            //Must be non-zero
            if (epsg == "0") {
                throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", opts.locale || "en", { mapDefinition: mapDef }));
            }
            //Must be registered to proj4js if not 4326 or 3857
            //TODO: We should allow for online fallback (eg. Hit epsg.io for the proj4js definition)
            if (!proj4.defs[`EPSG:${epsg}`]) {
                throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", opts.locale || "en", { epsg: epsg, mapDefinition: mapDef }));
            }

            return Promise.all([
                res, 
                map
            ]);
        });
    };
}

function getMapGuideConfiguration(appDef: ApplicationDefinition): MapConfiguration[] {
    const configs = [] as MapConfiguration[];
    if (appDef.MapSet) {
        for (const mg of appDef.MapSet.MapGroup) {
            for (const map of mg.Map) {
                if (map.Type == "MapGuide") {
                    configs.push(map);
                }
            }
        }
    }
    return configs; 
}

function getMapDefinitionFromFlexLayout(appDef: ApplicationDefinition): string {
    const configs = getMapGuideConfiguration(appDef);
    if (configs.length > 0) {
        //TODO: As this is not multi-map capable at the moment, pray the first one is
        //the one we're interested in.
        return configs[0].Extension.ResourceId;
    }
    throw new MgError("No Map Definition found in Application Definition");
}

function makeSessionAcquired(client: Client, dispatch: ReduxDispatch, opts: any): (session: string) => void {
    return (session: string) => {
        if (opts.resourceId.endsWith("WebLayout")) {
            const onWebLayoutAndRuntimeMapReceived = makeWebLayoutAndRuntimeMapReceived(dispatch, opts);
            const handler = makeRuntimeMapSuccessHandler<WebLayout>(client, session, opts, wl => wl.Map.ResourceId);
            client.getResource<WebLayout>(opts.resourceId, { SESSION: session })
                .then(handler)
                .then(onWebLayoutAndRuntimeMapReceived)
                .catch(err => {
                dispatch({
                    type: Constants.INIT_ERROR,
                    payload: {
                        error: err,
                        options: opts
                    }
                });
            });
        } else if (opts.resourceId.endsWith("ApplicationDefinition")) {
            const onFlexLayoutAndRuntimeMapReceived = makeFlexLayoutAndRuntimeMapReceived(dispatch, opts);
            const handler = makeRuntimeMapSuccessHandler<ApplicationDefinition>(client, session, opts, fl => getMapDefinitionFromFlexLayout(fl));
            client.getResource<ApplicationDefinition>(opts.resourceId, { SESSION: session })
                .then(handler)
                .then(onFlexLayoutAndRuntimeMapReceived)
                .catch(err => {
                dispatch({
                    type: Constants.INIT_ERROR,
                    payload: {
                        error: err,
                        options: opts
                    }
                });
            });
        } else {
            throw new MgError(`Unsupported resource type for resource: ${opts.resourceId}`);
        }
    }
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
            const onSessionAcquired = makeSessionAcquired(client, dispatch, opts);
            if (opts.session) {
                onSessionAcquired(opts.session);
            } else {
                client.createSession("Anonymous", "")
                    .then(onSessionAcquired)
                    .catch(err => {
                        dispatch({
                            type: Constants.INIT_ERROR,
                            payload: {
                                error: err,
                                options: opts
                            }
                        });
                    });
            }
        }
    };
}