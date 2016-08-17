import { IMapViewer } from "../components/map-viewer-base";

export class DefaultCommands {
    public static get Select(): string { return "Select"; }
    public static get Pan(): string { return "Pan"; }
    public static get Zoom(): string { return "Zoom"; }
    public static get MapTip(): string { return "MapTip"; }
    public static get ZoomIn(): string { return "ZoomIn"; }
    public static get ZoomOut(): string { return "ZoomOut"; }
    public static get ZoomExtents(): string { return "ZoomExtents"; }
    public static get SelectRadius(): string { return "SelectRadius"; }
    public static get SelectPolygon(): string { return "SelectPolygon"; }
    public static get ClearSelection(): string { return "ClearSelection"; }
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

type Dictionary<T> = { [key: string]: T };

const commands: Dictionary<ICommand> = {};

export function registerCommand(name: string, cmdDef: ICommand) {
    commands[name] = cmdDef;
}

export function getCommand(name: string): ICommand {
    return commands[name];
}