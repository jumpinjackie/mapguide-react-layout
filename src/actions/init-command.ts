import { IInitAsyncOptions } from './init';
import { ReduxDispatch, Dictionary, CommandTarget, IConfigurationReducerState } from '../api/common';
import { IInitAppActionPayload } from './defs';
import { IFlyoutSpec, ISeparatorSpec, IUnknownCommandSpec, ICommandSpec, convertWidget, ToolbarConf, PreparedSubMenuSet, isFlyoutSpec } from '../api/registry/command-spec';
import { makeUnique } from '../utils/array';
import { UIWidget, ContainerItem, Widget, ApplicationDefinition } from '../api/contracts/fusion';
import { assertNever } from '../utils/never';
import { strIsNullOrEmpty } from '../utils/string';
import { SPRITE_INVOKE_URL, SPRITE_INVOKE_SCRIPT } from '../constants/assets';
import { UIItem, CommandDef, isCommandItem, isTargetedCommand, isBasicCommand, isSeparatorItem, isFlyoutItem } from '../api/contracts/weblayout';
import { warn } from '../utils/logger';
import { DefaultCommands } from '../api/registry/command';
import { tr } from '../api/i18n';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU } from "../constants";
import * as shortid from 'shortid';
import { Client } from '../api/client';

export interface IViewerInitCommand {
    attachClient(client: Client): void;
    runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload>;
}

export abstract class ViewerInitCommand implements IViewerInitCommand {
    constructor(protected readonly dispatch: ReduxDispatch) { }
    public abstract attachClient(client: Client): void;
    public abstract runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload>;
    protected tryTranslateImageUrlToSpriteClass(imageUrl: string): string | undefined {
        switch (imageUrl) {
            case "../stdicons/icon_invokeurl.gif":
                return SPRITE_INVOKE_URL;
            case "../stdicons/icon_invokescript.gif":
                return SPRITE_INVOKE_SCRIPT;
        }
    }
    protected isUIWidget(widget: any): widget is UIWidget {
        return widget.WidgetType === "UiWidgetType";
    }
    protected convertFlexLayoutUIItems(items: ContainerItem[], widgetsByKey: Dictionary<Widget>, locale: string, noToolbarLabels = false): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
        const converted = items.map(item => {
            switch (item.Function) {
                case "Widget":
                    {
                        const widget = widgetsByKey[item.Widget];
                        if (widget && this.isUIWidget(widget)) {
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
                        children: this.convertFlexLayoutUIItems(item.Item, widgetsByKey, locale)
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

    protected convertToCommandTarget(fusionCmdTarget: string): CommandTarget {
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
    protected getExtraProjectionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
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
    protected convertWebLayoutUIItems(items: UIItem[] | undefined, cmdsByKey: Dictionary<CommandDef>, locale: string, noToolbarLabels = true): (IFlyoutSpec | ISeparatorSpec | IUnknownCommandSpec | ICommandSpec)[] {
        const converted = (items || []).map(item => {
            if (isCommandItem(item)) {
                const cmdDef: CommandDef = cmdsByKey[item.Command];
                if (!cmdDef) {
                    warn(`Invalid reference to command: ${item.Command}`);
                    return { error: tr("UNKNOWN_COMMAND_REFERENCE", locale, { command: item.Command }) } as IUnknownCommandSpec;
                } else if (cmdDef.TargetViewer != "Dwf") {
                    let icon: Partial<Pick<ICommandSpec, "icon" | "spriteClass">> = {};
                    if (cmdDef.ImageURL) {
                        icon.spriteClass = this.tryTranslateImageUrlToSpriteClass(cmdDef.ImageURL);
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
                    children: this.convertWebLayoutUIItems(item.SubItem, cmdsByKey, locale, false)
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
    protected prepareSubMenus(tbConf: Dictionary<ToolbarConf>): [PreparedSubMenuSet, boolean] {
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
}