import {
    IMapView,
    IMapViewer,
    ICommand,
    Dictionary,
    IInvokeUrlCommand,
    ISearchCommand,
    ReduxDispatch,
    ReduxStore,
    NOOP,
    ALWAYS_FALSE,
    ALWAYS_TRUE
} from "../../api/common";
import { QueryMapFeaturesResponse } from "../contracts/query";
import { ResultColumnSet } from "../contracts/weblayout";
import { IItem, IInlineMenu, IFlyoutMenu, IComponentFlyoutItem, getIcon } from "../../components/toolbar";
import * as Constants from "../../constants";
import { ensureParameters } from "../../actions/taskpane";
import { tr } from "../i18n";

export function mapToolbarReference(tb: any, store: ReduxStore, commandInvoker: (cmd: ICommand) => void): IItem|IInlineMenu|IFlyoutMenu|IComponentFlyoutItem|null {
    const state = store.getState();
    if (tb.error) {
        const cmdItem: IItem = {
            icon: "error.png",
            tooltip: tb.error,
            label: "Error",
            selected: ALWAYS_FALSE,
            enabled: ALWAYS_FALSE,
            invoke: NOOP
        };
        return cmdItem;
    } else if (tb.componentName) {
        return {
            flyoutId: tb.flyoutId,
            tooltip: tb.tooltip,
            label: tb.label,
            componentName: tb.componentName,
            componentProps: tb.componentProps
        };
    } else if (tb.isSeparator === true) {
        return { isSeparator: true };
    } else if (tb.command) {
        const cmd = getCommand(tb.command);
        if (cmd != null) {
            const cmdItem: IItem = {
                icon: cmd.icon,
                tooltip: tb.tooltip,
                label: tb.label,
                selected: () => cmd.selected(state),
                enabled: () => cmd.enabled(state),
                invoke: () => commandInvoker(cmd)
            };
            return cmdItem;
        }
    } else if (tb.children) {
        const childItems: any[] = tb.children;
        return {
            label: tb.label,
            tooltip: tb.tooltip,
            childItems: childItems.map(tb => mapToolbarReference(tb, store, commandInvoker)).filter(tb => tb != null)
        };
    } else if (tb.label && tb.flyoutId) {
        return {
            label: tb.label,
            tooltip: tb.tooltip,
            flyoutId: tb.flyoutId
        }
    }
    return null;
}

export class CommandConditions {
    public static isNotBusy(state: any): boolean {
        return state.map.viewer.busyCount == 0;
    }
    public static hasSelection(state: any): boolean {
        const selection: QueryMapFeaturesResponse = state.selection.selectionSet;
        return (selection != null && selection.SelectedFeatures != null);
    }
    public static hasPreviousView(state: any): boolean {
        return state.view.historyIndex > 0;
    }
    public static hasNextView(state: any): boolean {
        return state.view.historyIndex < state.view.history.length - 1;
    }
}

export class DefaultCommands {
    public static get Select(): string { return "Select"; }
    public static get Pan(): string { return "Pan"; }
    public static get Zoom(): string { return "Zoom"; }
    public static get MapTip(): string { return "MapTip"; }
    public static get ZoomIn(): string { return "ZoomIn"; }
    public static get ZoomOut(): string { return "ZoomOut"; }
    public static get RestoreView(): string { return "RestoreView"; }
    public static get ZoomExtents(): string { return "ZoomExtents"; }
    public static get SelectRadius(): string { return "SelectRadius"; }
    public static get SelectPolygon(): string { return "SelectPolygon"; }
    public static get ClearSelection(): string { return "ClearSelection"; }
    public static get ZoomToSelection(): string { return "ZoomToSelection"; }
    public static get PanLeft(): string { return "PanLeft"; }
    public static get PanRight(): string { return "PanRight"; }
    public static get PanUp(): string { return "PanUp"; }
    public static get PanDown(): string { return "PanDown"; }
    public static get RefreshMap(): string { return "RefreshMap"; }
    public static get PreviousView(): string { return "PreviousView"; }
    public static get NextView(): string { return "NextView"; }
    public static get About(): string { return "About"; }
    public static get Help(): string { return "Help"; }
    public static get Measure(): string { return "Measure"; }
    public static get ViewerOptions(): string { return "ViewerOptions"; }
    public static get Buffer(): string { return "Buffer"; }
    public static get SelectWithin(): string { return "SelectWithin"; }
    public static get QuickPlot(): string { return "QuickPlot"; }
    public static get Redline(): string { return "Redline"; }
    public static get FeatureInfo(): string { return "FeatureInfo"; }
    public static get Theme(): string { return "Theme"; }
    public static get Query(): string { return "Query"; }
    public static get Geolocation(): string { return "Geolocation"; }
}

const commands: Dictionary<ICommand> = {};

function isInvokeUrlCommand(cmdDef: any): cmdDef is IInvokeUrlCommand {
    return typeof cmdDef.url !== 'undefined';
}

function isSearchCommand(cmdDef: any): cmdDef is ISearchCommand {
    return typeof cmdDef.layer !== 'undefined';
}

export function registerCommand(name: string, cmdDef: ICommand | IInvokeUrlCommand | ISearchCommand) {
    let cmd: ICommand;
    if (isInvokeUrlCommand(cmdDef)) {
        cmd = {
            icon: cmdDef.icon || "invoke-url.png",
            enabled: (state) => {
                if (cmdDef.disableIfSelectionEmpty === true) {
                    return CommandConditions.hasSelection(state);
                }
                return true;
            },
            selected: (state) => false,
            invoke: (dispatch: ReduxDispatch, getState: () => any, viewer: IMapViewer) => {
                const { map, config } = getState();
                const target = cmdDef.target;
                if (target == "TaskPane") {
                    dispatch({
                        type: Constants.TASK_INVOKE_URL,
                        payload: {
                            url: ensureParameters(cmdDef.url, map.state.Name, map.state.SessionId, config.locale)
                        }
                    });
                } else {
                    dispatch({
                        type: Constants.MODAL_SHOW_URL,
                        payload: {
                            modal: {
                                title: tr(name),
                                backdrop: false,
                                size: [ 300, 500 ]
                            },
                            name: name,
                            url: ensureParameters(cmdDef.url, map.state.Name, map.state.SessionId, config.locale)
                        }
                    });
                }
            }
        };
    } else if (isSearchCommand(cmdDef)) {
        cmd = {
            icon: cmdDef.icon || "search.png",
            enabled: (state) => true,
            selected: (state) => false,
            invoke: (dispatch: ReduxDispatch, getState: () => any, viewer: IMapViewer) => {
                const { map, config } = getState();
                let url = ensureParameters("server/Search/SearchPrompt.php", map.state.Name, map.state.SessionId, config.locale, false)
                    + `&popup=0`
                    + `&target=TaskPane`
                    + `&title=${encodeURIComponent(cmdDef.title)}`
                    + `&prompt=${encodeURIComponent(cmdDef.prompt)}`
                    + `&layer=${encodeURIComponent(cmdDef.layer)}`
                    + (cmdDef.filter ? `&filter=${encodeURIComponent(cmdDef.filter)}` : '')
                    + `&limit=${cmdDef.matchLimit}`
                    + `&properties=${(cmdDef.resultColumns.Column || []).map(col => col.Property).join(",")}`
                    + `&propNames=${(cmdDef.resultColumns.Column || []).map(col => col.Name).join(",")}`;
                dispatch({
                    type: Constants.TASK_INVOKE_URL,
                    payload: {
                        url: url
                    }
                });
            }
        };
    } else {
        cmd = cmdDef;
    }
    commands[name] = cmd;
}

export function getCommand(name: string): ICommand | undefined {
    return commands[name];
}