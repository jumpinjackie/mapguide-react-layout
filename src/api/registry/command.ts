import { IMapViewer } from "../../components/map-viewer-base";
import { QueryMapFeaturesResponse } from "../contracts/query";
import { IItem, IMenu } from "../../components/toolbar";
import * as Constants from "../../constants";
import { ensureParameters } from "../../actions/taskpane";
import { tr } from "../i18n";

export function mapToolbarReference(tb: any, store, commandInvoker: (cmd) => void): IItem|IMenu {
    const state = store.getState();
    if (tb.isSeparator === true) {
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
    } else if (tb.label && tb.children) {
        return {
            label: tb.label,
            childItems: tb.children.map(tb => mapToolbarReference(tb, store, commandInvoker)).filter(tb => tb != null)
        };
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
}

export interface ICommandRef {
    name: string;
}

export type DispatcherFunc = (dispatch, getState, viewer: IMapViewer) => any; 

export interface ICommand {
    icon: string;
    //tooltip?: string;
    //label?: string;
    enabled: (state) => boolean;
    selected: (state) => boolean;
    invoke: DispatcherFunc;
}

export interface IInvokeUrlCommand {
    icon?: string;
    url: string;
    disableIfSelectionEmpty?: boolean;
    target: "TaskPane" | "NewWindow";
}

type Dictionary<T> = { [key: string]: T };

const commands: Dictionary<ICommand> = {};

function isInvokeUrlCommand(cmdDef: any): cmdDef is IInvokeUrlCommand {
    return typeof cmdDef.url !== 'undefined';
}

export function registerCommand(name: string, cmdDef: ICommand | IInvokeUrlCommand) {
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
            invoke: (dispatch, getState, viewer: IMapViewer) => {
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
    } else {
        cmd = cmdDef;
    }
    commands[name] = cmd;
}

export function getCommand(name: string): ICommand {
    return commands[name];
}