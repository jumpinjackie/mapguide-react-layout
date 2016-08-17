import { IMapViewer } from "../components/map-viewer-base";

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

type Dictionary<T> = { [key: string]: T };

const commands: Dictionary<ICommand> = {};

export function registerCommand(name: string, cmdDef: ICommand) {
    commands[name] = cmdDef;
}

export function getCommand(name: string): ICommand {
    return commands[name];
}