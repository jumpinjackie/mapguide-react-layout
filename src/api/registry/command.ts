import {
    IMapView,
    IMapViewer,
    ICommand,
    CommandTarget,
    Dictionary,
    IInvokeUrlCommand,
    ISearchCommand,
    ITargetedCommand,
    IApplicationState,
    ReduxDispatch,
    ReduxStore,
    getSelectionSet,
    getRuntimeMap,
    DEFAULT_MODAL_SIZE,
    NOOP,
    ALWAYS_FALSE,
    ALWAYS_TRUE
} from "../../api/common";
import * as ModalActions from "../../actions/modal";
import { getFusionRoot } from "../../api/runtime";
import { QueryMapFeaturesResponse } from "../contracts/query";
import { ResultColumnSet } from "../contracts/weblayout";
import { IItem, IInlineMenu, IFlyoutMenu, IComponentFlyoutItem } from "../../components/toolbar";
import * as Constants from "../../constants";
import { tr } from "../i18n";
import { getAssetRoot } from "../../utils/asset";
import {
    STD_CSS_SPRITE_RELPATH,
    SPRITE_ICON_ERROR
} from "../../constants/assets";
import { assertNever } from "../../utils/never";
import * as logger from "../../utils/logger";
import { ensureParameters } from "../../utils/url";

const FUSION_ICON_REGEX = /images\/icons\/[a-zA-Z\-]*.png/

function fixIconPath(path: string): string {
    if (FUSION_ICON_REGEX.test(path)) {
        return `${getAssetRoot()}/${path}`.replace(/\/\//g, "/");
    }
    return path;
}

function fusionFixSpriteClass(tb: any, cmd?: ICommand): string | undefined {
    const url = tb.icon || (cmd || {} as any).icon;
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
export function mapToolbarReference(tb: any, store: ReduxStore, commandInvoker: (cmd: ICommand, parameters?: any) => void): IItem|IInlineMenu|IFlyoutMenu|IComponentFlyoutItem|null {
    const state = store.getState();
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
            childItems: childItems.map(tb => mapToolbarReference(tb, store, commandInvoker)).filter(tb => tb != null)
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
     * @param {Readonly<IApplicationState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static isNotBusy(state: Readonly<IApplicationState>, parameters?: any): boolean {
        return state.viewer.busyCount == 0;
    }
    /**
     * The viewer has a selection set
     *
     * @static
     * @param {Readonly<IApplicationState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasSelection(state: Readonly<IApplicationState>): boolean {
        const selection = getSelectionSet(state);
        return (selection != null && selection.SelectedFeatures != null);
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
    public static disabledIfEmptySelection(state: Readonly<IApplicationState>, parameters?: any): boolean {
        if (!CommandConditions.hasSelection(state)) {
            return (parameters != null && (parameters.DisableIfSelectionEmpty == "true" || parameters.DisableIfSelectionEmpty == true));
        } else
            return false;
    }
    /**
     * The viewer has a previous view in the view navigation stack
     *
     * @static
     * @param {Readonly<IApplicationState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasPreviousView(state: Readonly<IApplicationState>): boolean {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].historyIndex > 0;
        }
        return false;
    }
    /**
     * The viewer has a next view in the view navigation stack
     *
     * @static
     * @param {Readonly<IApplicationState>} state
     * @returns {boolean}
     *
     * @memberof CommandConditions
     */
    public static hasNextView(state: Readonly<IApplicationState>): boolean {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].historyIndex < state.mapState[state.config.activeMapName].history.length - 1;
        }
        return false;
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
    AddManageLayers = "AddManageLayers"
}

const commands: Dictionary<ICommand> = {};

function isInvokeUrlCommand(cmdDef: any): cmdDef is IInvokeUrlCommand {
    return typeof cmdDef.url !== 'undefined';
}

function isSearchCommand(cmdDef: any): cmdDef is ISearchCommand {
    return typeof cmdDef.layer !== 'undefined';
}

function openModalUrl(name: string, dispatch: ReduxDispatch, url: string, modalTitle?: string) {
    dispatch(ModalActions.showModalUrl({
        modal: {
            title: modalTitle || tr(name as any),
            backdrop: false,
            size: DEFAULT_MODAL_SIZE,
            overflowYScroll: true
        },
        name: name,
        url: url
    }));
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
                type: Constants.TASK_INVOKE_URL,
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
                logger.error(`Frame not found: ${cmdDef.targetFrame}`);
            }
        } else {
            logger.error(`Command ${name} has a target of "SpecifiedFrame", but does not specify a target frame`);
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
            enabled: (state) => {
                if (cmdDef.disableIfSelectionEmpty === true) {
                    return CommandConditions.hasSelection(state);
                }
                return true;
            },
            selected: (state) => false,
            invoke: (dispatch: ReduxDispatch, getState: () => IApplicationState, viewer: IMapViewer) => {
                const state = getState();
                const config = state.config;
                const map = getRuntimeMap(state);
                const target = cmdDef.target;
                if (map) {
                    const url = ensureParameters(cmdDef.url, map.Name, map.SessionId, config.locale, true, cmdDef.parameters);
                    openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
                }
            }
        };
    } else if (isSearchCommand(cmdDef)) {
        cmd = {
            icon: cmdDef.icon,
            iconClass: cmdDef.iconClass,
            enabled: (state) => true,
            selected: (state) => false,
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
                    openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
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