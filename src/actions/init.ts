import { Client } from "../api/client";
import { ReduxDispatch, Dictionary, IMapView, CommandTarget, ActiveMapTool } from "../api/common";
import { registerCommand, DefaultCommands } from "../api/registry/command";
import {
    WebLayout,
    CommandDef,
    isBasicCommand,
    isTargetedCommand,
    isSeparatorItem,
    isFlyoutItem,
    isCommandItem,
    isInvokeURLCommand,
    isSearchCommand,
    UIItem
} from "../api/contracts/weblayout";
import {
    ApplicationDefinition,
    Widget,
    UIWidget,
    ContainerItem
} from "../api/contracts/fusion";
import {
    IExternalBaseLayer,
    ReduxThunkedAction,
    IMapViewer
} from "../api/common";
import { strEndsWith } from "../utils/string";
import { IView } from "../api/contracts/common";
import { tr } from "../api/i18n";
import { MgError } from "../api/error";
import * as shortid from "shortid";
import { registerStringBundle, DEFAULT_LOCALE } from "../api/i18n";
import { assertNever } from "../utils/never";
import { makeUnique } from "../utils/array";
import { ensureParameters } from "../utils/url";
import { strIsNullOrEmpty } from "../utils/string";
import { convertWidget, isFlyoutSpec, ToolbarConf, PreparedSubMenuSet } from '../api/registry/command-spec';
import {
    IFlyoutSpec,
    ISeparatorSpec,
    IUnknownCommandSpec,
    ICommandSpec
} from "../api/registry/command-spec";
import { IInitAppActionPayload, IAcknowledgeStartupWarningsAction, IRestoredSelectionSets } from './defs';
import { ActionType } from '../constants/actions';
import { getSelectionSet, clearSessionStore } from '../api/session-store';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU, WEBLAYOUT_TOOLBAR, SPRITE_INVOKE_URL, SPRITE_INVOKE_SCRIPT } from '../constants';
import { info, warn } from '../utils/logger';
import { getViewer } from '../api/runtime';
import { createRuntimeMapsAsync, getMapDefinitionsFromFlexLayout, setupMaps } from './init-mapguide';

function tryTranslateImageUrlToSpriteClass(imageUrl: string): string | undefined {
    switch (imageUrl) {
        case "../stdicons/icon_invokeurl.gif":
            return SPRITE_INVOKE_URL;
        case "../stdicons/icon_invokescript.gif":
            return SPRITE_INVOKE_SCRIPT;
    }
}

function isUIWidget(widget: any): widget is UIWidget {
    return widget.WidgetType === "UiWidgetType";
}

function convertFlexLayoutUIItems(items: ContainerItem[], widgetsByKey: Dictionary<Widget>, locale: string, noToolbarLabels = false): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
    const converted = items.map(item => {
        switch (item.Function) {
            case "Widget":
                {
                    const widget = widgetsByKey[item.Widget];
                    if (widget && isUIWidget(widget)) {
                        return convertWidget(widget, locale, noToolbarLabels);
                    }
                }
            case "Separator":
                return { isSeparator: true } as ISeparatorSpec;
            case "Flyout":
                return {
                    label: item.Label,
                    tooltip: item.Tooltip,
                    icon: item.ImageUrl,
                    spriteClass: item.ImageClass,
                    children: convertFlexLayoutUIItems(item.Item, widgetsByKey, locale)
                } as IFlyoutSpec;
            default:
                assertNever(item);
        }
        return null;
    })
    .filter(i => i != null)
    .map(i => i as (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec));
    return converted;
}

function convertWebLayoutUIItems(items: UIItem[] | undefined, cmdsByKey: Dictionary<CommandDef>, locale: string, noToolbarLabels = true): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
    const converted = (items || []).map(item => {
        if (isCommandItem(item)) {
            const cmdDef: CommandDef = cmdsByKey[item.Command];
            if (!cmdDef) {
                warn(`Invalid reference to command: ${item.Command}`);
                return { error: tr("UNKNOWN_COMMAND_REFERENCE", locale, { command: item.Command }) } as IUnknownCommandSpec;
            } else if (cmdDef.TargetViewer != "Dwf") {
                let icon: Partial<Pick<ICommandSpec, "icon" | "spriteClass">> = {};
                if (cmdDef.ImageURL) {
                    icon.spriteClass = tryTranslateImageUrlToSpriteClass(cmdDef.ImageURL);
                    if (!icon.spriteClass) {
                        icon.icon = cmdDef.ImageURL;
                    }
                }
                const commonParams: any = {};
                if (isTargetedCommand(cmdDef)) {
                    commonParams.Target = cmdDef.Target;
                    commonParams.TargetFrame = cmdDef.TargetFrame;
                }
                if (isBasicCommand(cmdDef)) {
                    let action: string = cmdDef.Action;
                    if (action == "ZoomRectangle") {
                        action = DefaultCommands.Zoom;
                    } else if (action == "FitToWindow") {
                        action = DefaultCommands.ZoomExtents;
                    } else if (action == "Refresh") {
                        action = DefaultCommands.RefreshMap;
                    }
                    return { command: action, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams, ...icon };
                } else {
                    switch (cmdDef["@xsi:type"]) {
                        case "ViewOptionsCommandType":
                            return { command: DefaultCommands.ViewerOptions, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "MeasureCommandType":
                            return { command: DefaultCommands.Measure, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "HelpCommandType":
                            return { command: DefaultCommands.Help, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "BufferCommandType":
                            return { command: DefaultCommands.Buffer, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "SelectWithinCommandType":
                            return { command: DefaultCommands.SelectWithin, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "GetPrintablePageCommandType":
                            return { command: DefaultCommands.QuickPlot, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        default:
                            return { command: cmdDef.Name, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams, ...icon };
                    }
                }
            }
        } else if (isSeparatorItem(item)) {
            return { isSeparator: true } as ISeparatorSpec;
        } else if (isFlyoutItem(item)) {
            return {
                label: item.Label,
                tooltip: item.Tooltip,
                children: convertWebLayoutUIItems(item.SubItem, cmdsByKey, locale, false)
            } as IFlyoutSpec;
        } else {
            assertNever(item);
        }
        return null;
    })
    .filter(i => i != null)
    .map(i => i as (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec));
    return converted;
}

function convertToCommandTarget(fusionCmdTarget: string): CommandTarget {
    //Treat empty/undefined target as new window
    if (strIsNullOrEmpty(fusionCmdTarget)) {
        return "NewWindow";
    }
    switch (fusionCmdTarget) {
        case "SearchWindow":
        case "InvokeUrlWindow":
            return "NewWindow";
        case "TaskPane":
            return "TaskPane";
        default:
            return "SpecifiedFrame";
    }
}

function prepareSubMenus(tbConf: Dictionary<ToolbarConf>): [PreparedSubMenuSet, boolean] {
    const prepared: PreparedSubMenuSet = {
        toolbars: {},
        flyouts: {}
    };
    let bFoundContextMenu = false;
    for (const key in tbConf) {
        if (key == WEBLAYOUT_CONTEXTMENU) {
            bFoundContextMenu = true;
        }

        //Special cases: Task pane and Context Menu. Transfer all to flyout
        if (key == WEBLAYOUT_TASKMENU || key == WEBLAYOUT_CONTEXTMENU) {
            const flyoutId = key;
            prepared.flyouts[flyoutId] = {
                children: tbConf[key].items
            }
        } else {
            prepared.toolbars[key] = {
                items: []
            };
            for (const item of tbConf[key].items) {
                //Special case: contextmenu is all inline
                if (isFlyoutSpec(item) && key != WEBLAYOUT_CONTEXTMENU) {
                    const flyoutId = `${item.label}_${shortid.generate()}`;
                    prepared.toolbars[key].items.push({
                        label: item.label,
                        tooltip: item.tooltip,
                        icon: item.icon,
                        spriteClass: item.spriteClass,
                        flyoutId: flyoutId
                    } as ICommandSpec);
                    prepared.flyouts[flyoutId] = {
                        children: item.children
                    }
                } else {
                    prepared.toolbars[key].items.push(item);
                }
            }
        }
    }
    return [prepared, bFoundContextMenu]
}

function getDesiredTargetMapName(mapDef: string) {
    const lastSlash = mapDef.lastIndexOf("/");
    const lastDot = mapDef.lastIndexOf(".");
    if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) {
        return `${mapDef.substring(lastSlash + 1, lastDot)}`;
    } else {
        return `Map_${shortid.generate()}`;
    }
}

function getExtraProjectionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
    //The only widget we care about is the coordinate tracker
    const epsgs: string[] = [];
    for (const ws of appDef.WidgetSet) {
        for (const w of ws.Widget) {
            if (w.Type == "CoordinateTracker") {
                const ps = w.Extension.Projection || [];
                for (const p of ps) {
                    epsgs.push(p.split(':')[1]);
                }
            } else if (w.Type == "CursorPosition") {
                const dp = w.Extension.DisplayProjection;
                if (dp) {
                    epsgs.push(dp.split(':')[1]);
                }
            }
        }
    }
    return makeUnique(epsgs);
}

function processAndDispatchInitError(error: Error, includeStack: boolean, dispatch: ReduxDispatch, opts: IInitAsyncOptions): void {
    if (error.stack) {
        dispatch({
            type: ActionType.INIT_ERROR,
            payload: {
                error: {
                    message: error.message,
                    stack: (error.stack || "").split("\n")
                },
                includeStack: includeStack,
                options: opts
            }
        });
    } else {
        dispatch({
            type: ActionType.INIT_ERROR,
            payload: {
                error: {
                    message: error.message,
                    stack: []
                },
                includeStack: includeStack,
                options: opts
            }
        });
    }
}

export interface IInitAppLayout {
    locale: string;
    resourceId: string | (() => Promise<ApplicationDefinition>);
    externalBaseLayers?: IExternalBaseLayer[];
    session?: string;
    initialView?: IMapView;
    /**
     * 
     * @since 0.11
     * @type {string}
     * @memberof IInitAppLayout
     */
    initialActiveMap?: string;
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialShowLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialShowGroups?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialHideLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialHideGroups?: string[];
    onInit?: (viewer: IMapViewer) => void;
    /**
     * Sets whether feature tooltips should be initially enabled
     * 
     * @since 0.13
     */
    featureTooltipsEnabled?: boolean;
}

export interface IInitAsyncOptions extends IInitAppLayout {
    locale: string;
}

async function initFromWebLayoutAsync(webLayout: WebLayout, opts: IInitAsyncOptions, session: string, client: Client, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    const [mapsByName, warnings] = await createRuntimeMapsAsync(client, session, opts, webLayout, wl => [ { name: getDesiredTargetMapName(wl.Map.ResourceId), mapDef: wl.Map.ResourceId } ], () => [], sessionWasReused);
    const cmdsByKey: any = {};
    //Register any InvokeURL and Search commands
    for (const cmd of webLayout.CommandSet.Command) {
        if (isInvokeURLCommand(cmd)) {
            registerCommand(cmd.Name, {
                url: cmd.URL,
                disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
                target: cmd.Target,
                targetFrame: cmd.TargetFrame,
                parameters: (cmd.AdditionalParameter || []).map(p => {
                    return { name: p.Key, value: p.Value };
                }),
                title: cmd.Label
            });
        } else if (isSearchCommand(cmd)) {
            registerCommand(cmd.Name, {
                layer: cmd.Layer,
                prompt: cmd.Prompt,
                target: cmd.Target,
                targetFrame: cmd.TargetFrame,
                resultColumns: cmd.ResultColumns,
                filter: cmd.Filter,
                matchLimit: cmd.MatchLimit,
                title: cmd.Label
            });
        }
        cmdsByKey[cmd.Name] = cmd;
    }
    const mainToolbar = (webLayout.ToolBar.Visible
                        ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, opts.locale)
                        : []);
    const taskBar = (webLayout.TaskPane.TaskBar.Visible
                    ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, opts.locale, false)
                    : []);
    const contextMenu = (webLayout.ContextMenu.Visible
                        ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, opts.locale, false)
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

    if (webLayout.Title != "") {
        document.title = webLayout.Title || document.title;
    }

    const maps: any = {};
    let firstMapName = "";
    let firstSessionId = "";
    for (const mapName in mapsByName) {
        if (!firstMapName && !firstSessionId) {
            const map = mapsByName[mapName];
            firstMapName = map.Name;
            firstSessionId = map.SessionId;
            maps[firstMapName] = {
                mapGroupId: map.Name,
                map: map,
                externalBaseLayers: opts.externalBaseLayers,
                initialView: initialView
            };
            break;
        }
    }

    const menus: Dictionary<ToolbarConf> = {};
    menus[WEBLAYOUT_TOOLBAR] = {
        items: mainToolbar
    };
    menus[WEBLAYOUT_TASKMENU] = {
        items: taskBar
    };
    menus[WEBLAYOUT_CONTEXTMENU] = {
        items: contextMenu
    };
    
    const tb = prepareSubMenus(menus)[0];
    return {
        activeMapName: firstMapName,
        featureTooltipsEnabled: opts.featureTooltipsEnabled,
        initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", firstMapName, firstSessionId, opts.locale),
        initialTaskPaneWidth: webLayout.TaskPane.Width,
        initialInfoPaneWidth: webLayout.InformationPane.Width,
        maps: maps,
        locale: opts.locale,
        config: config,
        capabilities: {
            hasTaskPane: webLayout.TaskPane.Visible,
            hasTaskBar: webLayout.TaskPane.TaskBar.Visible,
            hasStatusBar: webLayout.StatusBar.Visible,
            hasNavigator: webLayout.ZoomControl.Visible,
            hasSelectionPanel: webLayout.InformationPane.Visible && webLayout.InformationPane.PropertiesVisible,
            hasLegend: webLayout.InformationPane.Visible && webLayout.InformationPane.LegendVisible,
            hasToolbar: webLayout.ToolBar.Visible,
            hasViewSize: webLayout.StatusBar.Visible
        },
        toolbars: tb,
        warnings: warnings,
        initialActiveTool: ActiveMapTool.Pan
    };
}

async function initFromAppDefAsync(appDef: ApplicationDefinition, opts: IInitAsyncOptions, session: string, client: Client, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    const [mapsByName, warnings] = await createRuntimeMapsAsync(client, session, opts, appDef, fl => getMapDefinitionsFromFlexLayout(fl), fl => getExtraProjectionsFromFlexLayout(fl), sessionWasReused);
    let initialTask: string;
    let taskPane: Widget|undefined;
    let viewSize: Widget|undefined;
    let hasLegend = false;
    let hasStatus = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasTaskBar = false;
    const config: any = {};
    const tbConf: Dictionary<ToolbarConf> = {};
    const widgetsByKey: Dictionary<Widget> = {};
    //Register any InvokeURL and Search commands. Also set capabilities along the way
    for (const widgetSet of appDef.WidgetSet) {
        for (const widget of widgetSet.Widget) {
            const cmd = widget.Extension;
            switch (widget.Type) {
                case "TaskPane":
                    taskPane = widget;
                    break;
                case "ViewSize":
                    viewSize = widget;
                    break;
                case "Legend":
                    hasLegend = true;
                    break;
                case "SelectionPanel":
                    hasSelectionPanel = true;
                    break;
                case "CursorPosition":
                case "SelectionInfo":
                    hasStatus = true;
                    break;
                case "Navigator":
                    hasNavigator = true;
                    break;
                case "Search":
                    registerCommand(widget.Name, {
                        layer: cmd.Layer,
                        prompt: cmd.Prompt,
                        resultColumns: cmd.ResultColumns,
                        filter: cmd.Filter,
                        matchLimit: cmd.MatchLimit,
                        title: (cmd.Title || (isUIWidget(widget) ? widget.Label : undefined)),
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target
                    });
                    break;
                case "InvokeURL":
                    registerCommand(widget.Name, {
                        url: cmd.Url,
                        disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target,
                        parameters: (cmd.AdditionalParameter || []).map((p: any) => {
                            return { name: p.Key, value: p.Value };
                        }),
                        title: isUIWidget(widget) ? widget.Label : undefined
                    });
                    break;
            }
            widgetsByKey[widget.Name] = widget;
        }
    }
    //Now build toolbar layouts
    for (const widgetSet of appDef.WidgetSet) {
        for (const cont of widgetSet.Container) {
            let tbName = cont.Name;
            tbConf[tbName] = { items: convertFlexLayoutUIItems(cont.Item, widgetsByKey, opts.locale) };
        }
        for (const w of widgetSet.Widget) {
            if (w.Type == "CursorPosition") {
                config.coordinateProjection = w.Extension.DisplayProjection;
                config.coordinateDecimals = w.Extension.Precision;
                config.coordinateDisplayFormat = w.Extension.Template;
            }
        }
    }

    const maps = setupMaps(appDef, mapsByName, config, warnings);

    if (taskPane) {
        hasTaskBar = true; //Fusion flex layouts can't control the visiblity of this
        initialTask = taskPane.Extension.InitialTask || "server/TaskPane.html";
    } else {
        initialTask = "server/TaskPane.html";
    }

    if (appDef.Title) {
        document.title = appDef.Title || document.title;
    }

    let firstMapName = "";
    let firstSessionId = "";
    for (const mapName in mapsByName) {
        if (!firstMapName && !firstSessionId) {
            const map = mapsByName[mapName];
            firstMapName = map.Name;
            firstSessionId = map.SessionId;
            break;
        }
    }
    const [tb, bFoundContextMenu] = prepareSubMenus(tbConf);
    if (!bFoundContextMenu) {
        warnings.push(tr("INIT_WARNING_NO_CONTEXT_MENU", opts.locale, { containerName: WEBLAYOUT_CONTEXTMENU }));
    }
    return {
        activeMapName: firstMapName,
        initialUrl: ensureParameters(initialTask, firstMapName, firstSessionId, opts.locale),
        featureTooltipsEnabled: opts.featureTooltipsEnabled,
        locale: opts.locale,
        maps: maps,
        config: config,
        capabilities: {
            hasTaskPane: (taskPane != null),
            hasTaskBar: hasTaskBar,
            hasStatusBar: hasStatus,
            hasNavigator: hasNavigator,
            hasSelectionPanel: hasSelectionPanel,
            hasLegend: hasLegend,
            hasToolbar: (Object.keys(tbConf).length > 0),
            hasViewSize: (viewSize != null)
        },
        toolbars: tb,
        warnings: warnings,
        initialActiveTool: ActiveMapTool.Pan
    };
}

async function sessionAcquiredAsync(opts: IInitAsyncOptions, session: string, client: Client, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    if (!opts.resourceId) {
        throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", opts.locale));
    } else {
        if (typeof(opts.resourceId) == 'string') {
            if (strEndsWith(opts.resourceId, "WebLayout")) {
                const wl = await client.getResource<WebLayout>(opts.resourceId, { SESSION: session });
                return await initFromWebLayoutAsync(wl, opts, session, client, sessionWasReused);
            } else if (strEndsWith(opts.resourceId, "ApplicationDefinition")) {
                const fl = await client.getResource<ApplicationDefinition>(opts.resourceId, { SESSION: session });
                return await initFromAppDefAsync(fl, opts, session, client, sessionWasReused);
            } else {
                throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", opts.locale, { resourceId: opts.resourceId }));
            }
        } else {
            const fl = await opts.resourceId();
            return await initFromAppDefAsync(fl, opts, session, client, sessionWasReused);
        }
    }
} 

async function initAsync(options: IInitAsyncOptions, dispatch: ReduxDispatch, client: Client): Promise<IInitAppActionPayload> {
    //English strings are baked into this bundle. For non-en locales, we assume a strings/{locale}.json
    //exists for us to fetch
    if (options.locale != DEFAULT_LOCALE) {
        const r = await fetch(`strings/${options.locale}.json`);
        if (r.ok) {
            const res = await r.json();
            registerStringBundle(options.locale, res);
            // Dispatch the SET_LOCALE as it is safe to change UI strings at this point
            dispatch({
                type: ActionType.SET_LOCALE,
                payload: options.locale
            });
            info(`Registered string bundle for locale: ${options.locale}`);
        } else {
            //TODO: Push warning to init error/warning reducer when we implement it
            warn(`Failed to register string bundle for locale: ${options.locale}`);
        }
    }
    let session = options.session;
    let sessionWasReused = false;
    if (!session) {
        session = await client.createSession("Anonymous", "");
    } else {
        info(`Re-using session: ${session}`);
        sessionWasReused = true;
    }
    const payload = await sessionAcquiredAsync(options, session, client, sessionWasReused);
    if (sessionWasReused) {
        let initSelections: IRestoredSelectionSets = {};
        for (const mapName in payload.maps) {
            const sset = await getSelectionSet(session, mapName);
            if (sset) {
                initSelections[mapName] = sset;
            }
        }
        payload.initialSelections = initSelections;
        try {
            //In the interest of being a responsible citizen, clean up all selection-related stuff from
            //session store
            await clearSessionStore();
        } catch (e) {

        }
    }
    return payload;
}

/**
 * Initializes the viewer
 *
 * @export
 * @param {IInitAppLayout} options
 * @returns {ReduxThunkedAction}
 */
export function initLayout(options: IInitAppLayout): ReduxThunkedAction {
    const opts: IInitAsyncOptions = { ...options };
    return (dispatch, getState) => {
        const args = getState().config;
        //TODO: Fetch and init the string bundle earlier if "locale" is present
        //so the English init messages are seen only for a blink if requesting a
        //non-english string bundle
        if (args.agentUri && args.agentKind) {
            const client = new Client(args.agentUri, args.agentKind);
            initAsync(opts, dispatch, client).then(payload => {
                let initPayload = payload;
                if (opts.initialView) {
                    initPayload.initialView = {
                        ...opts.initialView
                    };
                }
                if (opts.initialActiveMap) {
                    initPayload.activeMapName = opts.initialActiveMap;
                }
                initPayload.initialHideGroups = opts.initialHideGroups;
                initPayload.initialHideLayers = opts.initialHideLayers;
                initPayload.initialShowGroups = opts.initialShowGroups;
                initPayload.initialShowLayers = opts.initialShowLayers;
                initPayload.featureTooltipsEnabled = opts.featureTooltipsEnabled;
                dispatch({
                    type: ActionType.INIT_APP,
                    payload
                });
                if (options.onInit) {
                    const viewer = getViewer();
                    if (viewer) {
                        options.onInit(viewer);
                    }
                }
            }).catch(err => {
                processAndDispatchInitError(err, false, dispatch, opts);
            })
        }
    };
}

export function acknowledgeInitWarnings(): IAcknowledgeStartupWarningsAction {
    return {
        type: ActionType.INIT_ACKNOWLEDGE_WARNINGS
    }
}