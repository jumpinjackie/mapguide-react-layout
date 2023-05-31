import {
    IMapViewer,
    ICommand,
    Dictionary,
    IInvokeUrlCommand,
    ISearchCommand,
    ITargetedCommand,
    IApplicationState,
    ReduxDispatch,
    getSelectionSet,
    getRuntimeMap,
    NOOP,
    ALWAYS_FALSE,
    IInvokeUrlCommandParameter,
    ActiveMapTool} from "../../api/common";
import { getFusionRoot } from "../../api/runtime";
import { IItem, IInlineMenu, IFlyoutMenu, IComponentFlyoutItem } from "../../components/toolbar";
import { tr } from "../i18n";
import { getAssetRoot } from "../../utils/asset";
import {
    SPRITE_ICON_ERROR
} from "../../constants/assets";
import { assertNever } from "../../utils/never";
import { ensureParameters } from "../../utils/url";
import { ActionType } from '../../constants/actions';
import { showModalUrl } from '../../actions/modal';
import { error } from '../../utils/logger';

const FUSION_ICON_REGEX = /images\/icons\/[a-zA-Z\-]*.png/

function fixIconPath(path: string): string {
    if (FUSION_ICON_REGEX.test(path)) {
        return `${getAssetRoot()}/${path}`.replace(/\/\//g, "/");
    }
    return path;
}

function fusionFixSpriteClass(tb: any, cmd?: ICommand): string | undefined {
    if (tb.spriteClass) {
        return tb.spriteClass;
    }
    if (cmd && cmd.iconClass) {
        return cmd.iconClass;
    }
    return undefined;
}

/**
 * @hidden
 */
export function mergeInvokeUrlParameters(currentParameters: IInvokeUrlCommandParameter[], extraParameters?: any) {
    const currentP = currentParameters.reduce<any>((prev, current, i, arr) => {
        prev[current.name] = current.value;
        return prev;
    }, {});
    if (extraParameters) {
        const keys = Object.keys(extraParameters);
        for (const k of keys) {
            currentP[k] = extraParameters[k];
        }
    }
    const merged: IInvokeUrlCommandParameter[] = [];
    const mkeys = Object.keys(currentP);
    for (const k of mkeys) {
        merged.push({ name: k, value: currentP[k] });
    }
    return merged;
}

function fixChildItems(childItems: any[], state: IToolbarAppState, commandInvoker: (cmd: ICommand, parameters?: any) => void): IItem[] {
    return childItems
        .map(tb => mapToolbarReference(tb, state, commandInvoker))
        .filter(tb => tb != null) as IItem[];
}

//TODO: This function should be its own react hook that layers on top of the
//useDispatch() and useSelector() hooks provided by react-redux
/**
 * @hidden
 */
export function mapToolbarReference(tb: any, state: IToolbarAppState, commandInvoker: (cmd: ICommand, parameters?: any) => void): IItem | IInlineMenu | IFlyoutMenu | IComponentFlyoutItem | null {
    if (tb.error) {
        const cmdItem: IItem = {
            iconClass: SPRITE_ICON_ERROR,
            tooltip: tb.error,
            label: tr("ERROR"),
            selected: ALWAYS_FALSE,
            enabled: ALWAYS_FALSE,
            invoke: NOOP
        };
        return cmdItem;
    } else if (tb.componentName) {
        return {
            icon: tb.icon,
            iconClass: fusionFixSpriteClass(tb),
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
                icon: fixIconPath(tb.icon || cmd.icon),
                iconClass: fusionFixSpriteClass(tb, cmd),
                tooltip: tb.tooltip,
                label: tb.label,
                selected: () => cmd.selected(state),
                enabled: () => cmd.enabled(state, tb.parameters),
                invoke: () => commandInvoker(cmd, tb.parameters)
            };
            return cmdItem;
        }
    } else if (tb.children) {
        const childItems: any[] = tb.children;
        return {
            icon: fixIconPath(tb.icon),
            iconClass: fusionFixSpriteClass(tb),
            label: tb.label,
            tooltip: tb.tooltip,
            childItems: fixChildItems(childItems, state, commandInvoker)
        };
    } else if (tb.label && tb.flyoutId) {
        return {
            icon: fixIconPath(tb.icon),
            iconClass: fusionFixSpriteClass(tb),
            label: tb.label,
            tooltip: tb.tooltip,
            flyoutId: tb.flyoutId
        }
    }
    return null;
}

/**
 * A subset of IApplicationState that's only relevant for toolbar items
 * @since 0.13
 */
export interface IToolbarAppState {
    /**
     * @since 0.14
     */
    stateless: boolean;
    visibleAndSelectableWmsLayerCount: number;
    busyWorkerCount: number;
    hasSelection: boolean;
    /**
     * @since 0.14
     */
    hasClientSelection: boolean;
    hasPreviousView: boolean;
    hasNextView: boolean;
    featureTooltipsEnabled: boolean;
    activeTool: ActiveMapTool;
}

/**
 * Helper function to reduce full application state to state relevant for toolbar items
 * 
 * @param state The full application state
 * @since 0.13
 */
export function reduceAppToToolbarState(state: Readonly<IApplicationState>): Readonly<IToolbarAppState> {
    let hasSelection = false;
    let hasClientSelection = false;
    let hasPreviousView = false;
    let hasNextView = false;
    let visibleWmsLayerCount = 0;
    const selection = getSelectionSet(state);
    hasSelection = (selection != null && selection.SelectedFeatures != null);
    if (state.config.activeMapName) {
        hasClientSelection = state.mapState[state.config.activeMapName].clientSelection != null;
        hasPreviousView = state.mapState[state.config.activeMapName].historyIndex > 0;
        hasNextView = state.mapState[state.config.activeMapName].historyIndex < state.mapState[state.config.activeMapName].history.length - 1;
        visibleWmsLayerCount = (state.mapState[state.config.activeMapName].layers ?? []).filter(l => l.visible && l.selectable && l.type == "WMS").length;
    }
    return {
        stateless: state.config.viewer.isStateless,
        visibleAndSelectableWmsLayerCount: visibleWmsLayerCount,
        busyWorkerCount: state.viewer.busyCount,
        hasSelection,
        hasClientSelection,
        hasPreviousView,
        hasNextView,
        activeTool: state.viewer.tool,
        featureTooltipsEnabled: state.viewer.featureTooltipsEnabled
    }
}

/**
 * Common command condition evaluators
 *
 * @export
 * @class CommandConditions
 */
export class CommandConditions {
    /**
     * The viewer is not busy
     *
     * @static
     * @param {Readonly<IToolbarAppState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static isNotBusy(state: Readonly<IToolbarAppState>): boolean {
        return state.busyWorkerCount == 0;
    }
    /**
     * The viewer has a MapGuide selection set
     *
     * @static
     * @param {Readonly<IToolbarAppState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasSelection(state: Readonly<IToolbarAppState>): boolean {
        return state.hasSelection;
    }
    /**
     * The viewer has a client-side selection set
     *
     * @static
     * @param state 
     * @returns 
     * 
     * @since 0.14
     */
    public static hasClientSelection(state: Readonly<IToolbarAppState>): boolean {
        return state.hasClientSelection;
    }
    /**
     * The command is set to be disabled if selection is empty
     *
     * @static
     * @param {*} [parameters]
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static disabledIfEmptySelection(state: Readonly<IToolbarAppState>, parameters?: any): boolean {
        if (!state.hasSelection) {
            return (parameters != null && (parameters.DisableIfSelectionEmpty == "true" || parameters.DisableIfSelectionEmpty == true));
        } else
            return false;
    }
    /**
     * The viewer has a previous view in the view navigation stack
     *
     * @static
     * @param {Readonly<IToolbarAppState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasPreviousView(state: Readonly<IToolbarAppState>): boolean {
        return state.hasPreviousView;
    }
    /**
     * The viewer has a next view in the view navigation stack
     *
     * @static
     * @param {Readonly<IToolbarAppState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasNextView(state: Readonly<IToolbarAppState>): boolean {
        return state.hasNextView;
    }
}

/**
 * The set of default command names
 *
 * @export
 * @class DefaultCommands
 */
export enum DefaultCommands {
    Select = "Select",
    Pan = "Pan",
    Zoom = "Zoom",
    MapTip = "MapTip",
    ZoomIn = "ZoomIn",
    ZoomOut = "ZoomOut",
    RestoreView = "RestoreView",
    ZoomExtents = "ZoomExtents",
    SelectRadius = "SelectRadius",
    SelectPolygon = "SelectPolygon",
    ClearSelection = "ClearSelection",
    ZoomToSelection = "ZoomToSelection",
    PanLeft = "PanLeft",
    PanRight = "PanRight",
    PanUp = "PanUp",
    PanDown = "PanDown",
    RefreshMap = "RefreshMap",
    PreviousView = "PreviousView",
    NextView = "NextView",
    About = "About",
    Help = "Help",
    Measure = "Measure",
    ViewerOptions = "ViewerOptions",
    Buffer = "Buffer",
    SelectWithin = "SelectWithin",
    QuickPlot = "QuickPlot",
    Redline = "Redline",
    FeatureInfo = "FeatureInfo",
    Theme = "Theme",
    Query = "Query",
    Geolocation = "Geolocation",
    CoordinateTracker = "CoordinateTracker",
    /**
     * @since 0.11
     */
    AddManageLayers = "AddManageLayers",
    /**
     * @since 0.11
     */
    CenterSelection = "CenterSelection",
    /**
     * @since 0.14
     */
    Print = "Print"
}

const commands: Dictionary<ICommand> = {};

function isInvokeUrlCommand(cmdDef: any): cmdDef is IInvokeUrlCommand {
    return typeof cmdDef.url !== 'undefined';
}

function isSearchCommand(cmdDef: any): cmdDef is ISearchCommand {
    return typeof cmdDef.layer !== 'undefined';
}

function openModalUrl(name: string, dispatch: ReduxDispatch, url: string, modalTitle?: string) {
    dispatch(showModalUrl({
        modal: {
            title: modalTitle || tr(name as any),
            backdrop: false,
            overflowYScroll: true
        },
        name: name,
        url: url
    }));
}

export function isSupportedCommandInStatelessMode(name: string | undefined) {
    switch (name) {
        case DefaultCommands.MapTip:
        case DefaultCommands.QuickPlot:
        case DefaultCommands.SelectRadius:
        case DefaultCommands.SelectPolygon:
        case DefaultCommands.Buffer:
        case DefaultCommands.SelectWithin:
        case DefaultCommands.Redline:
        case DefaultCommands.FeatureInfo:
        case DefaultCommands.Query:
        case DefaultCommands.Theme:
        case DefaultCommands.CenterSelection:
            return false;
    }
    return true;
}

/**
 * Opens the given URL in the specified target
 *
 * @hidden
 * @param name
 * @param cmdDef
 * @param dispatch
 * @param url
 */
export function openUrlInTarget(name: string, cmdDef: ITargetedCommand, hasTaskPane: boolean, dispatch: ReduxDispatch, url: string, modalTitle?: string): void {
    const target = cmdDef.target;
    if (target == "TaskPane") {
        //If there's no actual task pane, fallback to modal dialog
        if (!hasTaskPane) {
            openModalUrl(name, dispatch, url, modalTitle);
        } else {
            dispatch({
                type: ActionType.TASK_INVOKE_URL,
                payload: {
                    url: url
                }
            });
        }
    } else if (target == "NewWindow") {
        openModalUrl(name, dispatch, url, modalTitle);
    } else if (target == "SpecifiedFrame") {
        if (cmdDef.targetFrame) {
            const frames = (window as any).frames as any[];
            let bInvoked = false;
            for (let i = 0; i < frames.length; i++) {
                if (frames[i].name == cmdDef.targetFrame) {
                    frames[i].location = url;
                    bInvoked = true;
                    break;
                }
            }
            if (!bInvoked) {
                error(`Frame not found: ${cmdDef.targetFrame}`);
            }
        } else {
            error(`Command ${name} has a target of "SpecifiedFrame", but does not specify a target frame`);
        }
    } else {
        assertNever(target);
    }
}

/**
 * Registers a viewer command
 *
 * @export
 * @param {string} name
 * @param {(ICommand | IInvokeUrlCommand | ISearchCommand)} cmdDef
 */
export function registerCommand(name: string, cmdDef: ICommand | IInvokeUrlCommand | ISearchCommand) {
    let cmd: ICommand;
    if (isInvokeUrlCommand(cmdDef)) {
        cmd = {
            icon: cmdDef.icon,
            iconClass: cmdDef.iconClass,
            title: cmdDef.title,
            enabled: (state) => {
                if (cmdDef.disableIfSelectionEmpty === true) {
                    return CommandConditions.hasSelection(state);
                }
                return true;
            },
            selected: () => false,
            invoke: (dispatch: ReduxDispatch, getState: () => IApplicationState, viewer: IMapViewer, parameters?: any) => {
                const state = getState();
                const config = state.config;
                const map = getRuntimeMap(state);
                const params = mergeInvokeUrlParameters(cmdDef.parameters, parameters);
                const url = ensureParameters(cmdDef.url, map?.Name, map?.SessionId, config.locale, true, params);
                openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url, cmd.title);
            }
        };
    } else if (isSearchCommand(cmdDef)) {
        cmd = {
            icon: cmdDef.icon,
            iconClass: cmdDef.iconClass,
            title: cmdDef.title,
            enabled: state => !state.stateless,
            selected: () => false,
            invoke: (dispatch: ReduxDispatch, getState: () => IApplicationState, viewer: IMapViewer, parameters?: any) => {
                const state = getState();
                const config = state.config;
                const map = getRuntimeMap(state);
                if (map) {
                    const url = ensureParameters(`${getFusionRoot()}/widgets/Search/SearchPrompt.php`, map.Name, map.SessionId, config.locale, false)
                        + `&popup=0`
                        + `&target=TaskPane`
                        + `&title=${encodeURIComponent(cmdDef.title)}`
                        + `&prompt=${encodeURIComponent(cmdDef.prompt)}`
                        + `&layer=${encodeURIComponent(cmdDef.layer)}`
                        + `&pointZoomLevel=${parameters.PointZoomLevel}`
                        + (cmdDef.filter ? `&filter=${encodeURIComponent(cmdDef.filter)}` : '')
                        + `&limit=${cmdDef.matchLimit}`
                        + `&properties=${(cmdDef.resultColumns.Column || []).map(col => col.Property).join(",")}`
                        + `&propNames=${(cmdDef.resultColumns.Column || []).map(col => col.Name).join(",")}`;
                    openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url, cmd.title);
                }
            }
        };
    } else {
        cmd = cmdDef;
    }
    commands[name] = cmd;
}

/**
 * Gets a registered viewer command by its name
 *
 * @export
 * @param {string} name
 * @returns {(ICommand | undefined)}
 */
export function getCommand(name: string): ICommand | undefined {
    return commands[name];
}