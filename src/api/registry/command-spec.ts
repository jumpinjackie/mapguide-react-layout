import { ApplicationDefinition, ContainerItem, UIWidget, Widget } from '../contracts/fusion';
import { DefaultCommands, isSupportedCommandInStatelessMode } from './command';
import { DefaultComponentNames } from './component';
import { tr } from '../i18n';
import { CommandTarget, Dictionary, ICommand, IInvokeUrlCommand, ISearchCommand } from '../common';
import { assertNever } from '../../utils/never';
import { strIsNullOrEmpty } from '../../utils/string';
import { warn } from '../../utils/logger';
import { UIItem, CommandDef, isCommandItem, isTargetedCommand, isBasicCommand, isSeparatorItem, isFlyoutItem, WebLayout, isInvokeURLCommand, isSearchCommand } from '../contracts/weblayout';
import { isStateless } from '../../actions/init-command';
import { SPRITE_INVOKE_SCRIPT, SPRITE_INVOKE_URL } from '../../constants/assets';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU } from '../../constants';
import { ScopedId } from '../../utils/scoped-id';

const scopedId = new ScopedId();

function isCommandSpec(cmd: ICommandSpec | IUnknownCommandSpec): cmd is ICommandSpec {
    return !strIsNullOrEmpty((cmd as any).command);
}

export function isUIWidget(widget: any): widget is UIWidget {
    return widget.WidgetType === "UiWidgetType";
}

/**
 *
 */
export interface ToolbarConf {
    items: (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[];
}

/**
 *
 */
export interface PreparedSubMenuSet {
    toolbars: Dictionary<ToolbarConf>;
    flyouts: Dictionary<IFlyoutSpec>;
}

/**
 * @hidden
 */
export function isFlyoutSpec(item: any): item is IFlyoutSpec {
    return typeof (item.children) != 'undefined';
}

/**
 *
 */
export interface IFlyoutSpec {
    label?: string;
    tooltip?: string;
    icon?: string;
    spriteClass?: string;
    children: (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[];
}

/**
 *
 */
export interface ISeparatorSpec {
    isSeparator: boolean;
}

/**
 *
 */
export interface IUnknownCommandSpec {
    error: string;
}

/**
 *
 */
export interface ICommandSpec {
    icon: string;
    spriteClass: string;
    label: string | null;
    tooltip: string;
    parameters: any;
    command?: string;
    componentName?: string;
    flyoutId?: string;
}

function makeCommand(widget: UIWidget, noToolbarLabels: boolean, cmdType: DefaultCommands): ICommandSpec {
    return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: cmdType, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
}

function convertWidget(widget: UIWidget, locale: string, noToolbarLabels: boolean): ICommandSpec | IUnknownCommandSpec {
    switch (widget.Type) {
        case "Select":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Select);
        case "Pan":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Pan);
        //case "PanQuery":
        //case "PanOnClick":
        case "Zoom":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Zoom);
        case "ZoomOnClick": //Covers in and out. Look at Factor parameter
            {
                const factor = parseFloat(widget.Extension.Factor);
                if (factor >= 1.0) {
                    return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomIn);
                } else {
                    return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomOut);
                }
            }
        case "InitialMapView":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomExtents);
        case "ZoomToSelection":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomToSelection);
        case "ExtentHistory": //Covers prev and next. Look at Direction parameter
            {
                if (widget.Extension.Direction == "previous") {
                    return makeCommand(widget, noToolbarLabels, DefaultCommands.PreviousView);
                } else {
                    return makeCommand(widget, noToolbarLabels, DefaultCommands.NextView);
                }
            }
        case "CenterSelection":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.CenterSelection);
        case "About":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.About);
        case "BufferPanel":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Buffer);
        case "ClearSelection":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.ClearSelection);
        //case "ColorPicker":
        case "CoordinateTracker":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.CoordinateTracker);
        case "FeatureInfo":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.FeatureInfo);
        case "Geolocation":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Geolocation);
        //case "GoogleStreetViewer":
        case "Help":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Help);
        case "Maptip":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.MapTip);
        case "MapMenu":
            return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, componentName: DefaultComponentNames.MapMenu, flyoutId: `${DefaultComponentNames.MapMenu}_${scopedId.next()}`, parameters: widget.Extension };
        case "Query":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Query);
        case "QuickPlot":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.QuickPlot);
        case "Redline":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Redline);
        case "RefreshMap":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.RefreshMap);
        //case "SaveMap":
        case "InvokeURL": //Commands with this name would've been registered beforehand
        case "Search":
            return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
        case "SelectPolygon":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectPolygon);
        case "SelectRadius":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectRadius);
        //case "SelectRadiusValue":
        case "SelectWithin":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectWithin);
        case "Theme":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Theme);
        case "ViewOptions":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.ViewerOptions);
        case "Measure":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Measure);
        case "Print":
            return makeCommand(widget, noToolbarLabels, DefaultCommands.Print);
        case "BasemapSwitcher":
            return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, componentName: DefaultComponentNames.BaseMapSwitcher, flyoutId: `${DefaultComponentNames.BaseMapSwitcher}_${scopedId.next()}`, parameters: widget.Extension };
        case "InvokeScript":
            return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
        default:
            return { error: tr("UNKNOWN_WIDGET", locale, { widget: widget.Type }) }
    }
}

/**
 * @hidden
 * 
 * @param isStateless 
 * @param items 
 * @param widgetsByKey 
 * @param locale 
 * @param noToolbarLabels 
 * @returns 
 */
export function convertFlexLayoutUIItems(isStateless: boolean, items: ContainerItem[], widgetsByKey: Dictionary<Widget>, locale: string, noToolbarLabels = false): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
    const converted = items.map(item => {
        switch (item.Function) {
            case "Widget":
                {
                    const widget = widgetsByKey[item.Widget];
                    if (widget && isUIWidget(widget)) {
                        const cmd = convertWidget(widget, locale, noToolbarLabels);
                        if (isStateless && isCommandSpec(cmd) && !isSupportedCommandInStatelessMode(cmd.command)) {
                            console.warn(`The widget (${widget.Name}) references a command (${cmd.command}) that is not supported in stateless mode. This widget will always be disabled`);
                        }
                        return cmd;
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
                    children: convertFlexLayoutUIItems(isStateless, item.Item, widgetsByKey, locale)
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

function tryTranslateImageUrlToSpriteClass(imageUrl: string): string | undefined {
    switch (imageUrl) {
        case "../stdicons/icon_invokeurl.gif":
            return SPRITE_INVOKE_URL;
        case "../stdicons/icon_invokescript.gif":
            return SPRITE_INVOKE_SCRIPT;
    }
}

/**
 * @hidden
 * 
 * @param items 
 * @param cmdsByKey 
 * @param locale 
 * @param noToolbarLabels 
 * @returns 
 */
export function convertWebLayoutUIItems(items: UIItem[] | undefined, cmdsByKey: Dictionary<CommandDef>, locale: string, noToolbarLabels = true): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
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
export type CommandRegistrationFunc = (name: string, cmdDef: ICommand | IInvokeUrlCommand | ISearchCommand) => void;

export function parseWidgetsInAppDef(appDef: ApplicationDefinition, cmdRegister: CommandRegistrationFunc) {
    let taskPane: Widget | undefined;
    let viewSize: Widget | undefined;
    let hasLegend = false;
    let hasStatus = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasTaskBar = false;
    let initialTask: string;
    const isStatelessAppDef = isStateless(appDef);
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
                    cmdRegister(widget.Name, {
                        layer: cmd.Layer,
                        prompt: cmd.Prompt,
                        resultColumns: cmd.ResultColumns,
                        filter: cmd.Filter,
                        matchLimit: cmd.MatchLimit,
                        title: (cmd.Title || (isUIWidget(widget) ? widget.Label : undefined)),
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target
                    });
                    if (isStatelessAppDef) {
                        console.warn(`The search command (${widget.Name}) is not supported in stateless mode. This widget will always be disabled`);
                    }
                    break;
                case "InvokeURL":
                    cmdRegister(widget.Name, {
                        url: cmd.Url,
                        disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target,
                        parameters: (cmd.AdditionalParameter || []).map((p: any) => {
                            return { name: p.Key, value: p.Value };
                        }),
                        title: isUIWidget(widget) ? widget.Label : undefined
                    });/*
                        if (config.isStateless && !strStartsWith(cmd.Url, "component://")) {
                            console.warn(`The InvokeURL command (${widget.Name}) is not supported in stateless mode. This widget will always be disabled`);
                        }*/
                    break;
            }
            widgetsByKey[widget.Name] = widget;
        }
    }

    if (taskPane) {
        hasTaskBar = true; //Fusion flex layouts can't control the visiblity of this
        initialTask = taskPane.Extension.InitialTask || "server/TaskPane.html";
    } else {
        initialTask = "server/TaskPane.html";
    }

    return {
        taskPane,
        viewSize,
        initialTask,
        hasLegend,
        hasStatus,
        hasNavigator,
        hasSelectionPanel,
        hasTaskBar,
        isStateless: isStatelessAppDef,
        widgetsByKey
    };
}

export function parseCommandsInWebLayout(webLayout: WebLayout, cmdRegister: CommandRegistrationFunc) {
    const cmdsByKey: Dictionary<CommandDef> = {};
    //Register any InvokeURL and Search commands
    for (const cmd of webLayout.CommandSet.Command) {
        if (isInvokeURLCommand(cmd)) {
            cmdRegister(cmd.Name, {
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
            cmdRegister(cmd.Name, {
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
    return cmdsByKey;
}

/**
 * @hidden
 * 
 * @param tbConf 
 * @returns 
 */
export function prepareSubMenus(tbConf: Dictionary<ToolbarConf>): [PreparedSubMenuSet, boolean] {
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
                    const flyoutId = `${item.label}_${scopedId.next()}`;
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