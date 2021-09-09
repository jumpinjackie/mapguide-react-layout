import {
    registerCommand,
    DefaultCommands,
    CommandConditions,
    openUrlInTarget
} from "./registry/command";
import {
    IMapViewer,
    ActiveMapTool,
    RefreshMode,
    ReduxDispatch,
    getInitialView,
    getRuntimeMap,
    getCurrentView,
    ITargetedCommand,
    IConfigurationReducerState,
    DEFAULT_MODAL_SIZE
} from "./common";
import { tr } from "../api/i18n";
import { DefaultComponentNames } from "../api/registry/component";
import {
    SPRITE_SELECT,
    SPRITE_PAN,
    SPRITE_ZOOM_IN,
    SPRITE_ZOOM_IN_FIXED,
    SPRITE_ZOOM_OUT_FIXED,
    SPRITE_PAN_WEST,
    SPRITE_PAN_EAST,
    SPRITE_PAN_NORTH,
    SPRITE_PAN_SOUTH,
    SPRITE_ABOUT,
    SPRITE_HELP,
    SPRITE_MEASURE,
    SPRITE_INITIAL_CENTER,
    SPRITE_ZOOM_FULL,
    SPRITE_VIEW_BACK,
    SPRITE_ICON_REFRESHMAP,
    SPRITE_VIEW_FORWARD,
    SPRITE_GEOLOCATION,
    SPRITE_INVOKE_SCRIPT,
    SPRITE_COORDINATE_TRACKER,
    SPRITE_LAYER_ADD
} from "../constants/assets";
import { setCurrentView, setActiveTool, previousView, nextView } from '../actions/map';
import { showModalComponent, showModalUrl } from '../actions/modal';
import { refresh } from '../actions/legend';
import { setTaskPaneVisibility, setLegendVisibility, setSelectionPanelVisibility } from '../actions/template';

function panMap(dispatch: ReduxDispatch, viewer: IMapViewer, value: "right" | "left" | "up" | "down") {
    const settings: any = {
        "right": [2, 1],
        "left": [0, 1],
        "down": [0, 1],
        "up": [0, 3]
    };

    const view = viewer.getCurrentView();
    const current_center = [view.x, view.y];
    const currentExtent = viewer.getCurrentExtent();
    let newPos: number[];

    const direction = settings[value];

    if (value == "right" || value == "left") {
        newPos = [
            currentExtent[direction[0]],
            current_center[direction[1]]
        ];

    } else {
        newPos = [
            current_center[direction[0]],
            currentExtent[direction[1]]
        ];
    }

    dispatch(setCurrentView({ x: newPos[0], y: newPos[1], scale: view.scale }));
}

export function buildTargetedCommand(config: Readonly<IConfigurationReducerState>, parameters: any): ITargetedCommand {
    const cmdTarget = (parameters || {}).Target;
    const cmdDef: ITargetedCommand = {
        target: cmdTarget || "NewWindow"
    };
    if (config.capabilities.hasTaskPane && cmdTarget == "TaskPane") {
        cmdDef.target = "TaskPane";
    }
    if (cmdTarget == "SpecifiedFrame") {
        cmdDef.target = cmdTarget;
        cmdDef.targetFrame = (parameters || {}).TargetFrame;
    }
    return cmdDef;
}

/**
 * Registers the default set of commands into the command registry. This is automatically called by the default viewer
 * bundle. If creating your own viewer bundle, be sure to call this function in your entry point, or individually register
 * the commands you want to make available in your custom viewer bundle
 *
 * @export
 */
export function initDefaultCommands() {
    //Select Tool
    registerCommand(DefaultCommands.Select, {
        iconClass: SPRITE_SELECT,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Select;
        },
        enabled: state => !state.stateless,
        invoke: (dispatch) => {
            return dispatch(setActiveTool(ActiveMapTool.Select));
        }
    });
    //WMS Query Tool
    registerCommand(DefaultCommands.WmsQuery, {
        iconClass: SPRITE_SELECT,
        selected: (state) => state.activeTool === ActiveMapTool.WmsQueryFeatures && state.visibleAndSelectableWmsLayerCount > 0,
        enabled: (state) => state.visibleAndSelectableWmsLayerCount > 0,
        invoke: (dispatch) => dispatch(setActiveTool(ActiveMapTool.WmsQueryFeatures))
    });
    //Pan Tool
    registerCommand(DefaultCommands.Pan, {
        iconClass: SPRITE_PAN,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Pan;
        },
        enabled: () => true,
        invoke: (dispatch) => {
            return dispatch(setActiveTool(ActiveMapTool.Pan));
        }
    });
    //Zoom Tool
    registerCommand(DefaultCommands.Zoom, {
        iconClass: SPRITE_ZOOM_IN,
        selected: (state) => {
            return state.activeTool === ActiveMapTool.Zoom;
        },
        enabled: () => true,
        invoke: (dispatch) => {
            return dispatch(setActiveTool(ActiveMapTool.Zoom));
        }
    });
    //Zoom in
    registerCommand(DefaultCommands.ZoomIn, {
        iconClass: SPRITE_ZOOM_IN_FIXED,
        selected: () => false,
        enabled: () => true,
        invoke: (_dispatch, _getState, viewer) => {
            if (viewer) {
                viewer.zoomDelta(1);
            }
        }
    });
    //Zoom Out
    registerCommand(DefaultCommands.ZoomOut, {
        iconClass: SPRITE_ZOOM_OUT_FIXED,
        selected: () => false,
        enabled: () => true,
        invoke: (_dispatch, _getState, viewer) => {
            if (viewer) {
                viewer.zoomDelta(-1);
            }
        }
    });
    //Pan Left
    registerCommand(DefaultCommands.PanLeft, {
        iconClass: SPRITE_PAN_WEST,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, _getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "left");
            }
        }
    });
    //Pan Right
    registerCommand(DefaultCommands.PanRight, {
        iconClass: SPRITE_PAN_EAST,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, _getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "right");
            }
        }
    });
    //Pan Up
    registerCommand(DefaultCommands.PanUp, {
        iconClass: SPRITE_PAN_NORTH,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, _getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "up");
            }
        }
    });
    //Pan Down
    registerCommand(DefaultCommands.PanDown, {
        iconClass: SPRITE_PAN_SOUTH,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, _getState, viewer) => {
            if (viewer) {
                panMap(dispatch, viewer, "down");
            }
        }
    });
    //About
    registerCommand(DefaultCommands.About, {
        iconClass: SPRITE_ABOUT,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState) => {
            dispatch(showModalComponent({
                modal: {
                    title: tr("ABOUT", getState().config.locale),
                    backdrop: true,
                    size: DEFAULT_MODAL_SIZE
                },
                name: DefaultComponentNames.About,
                component: DefaultComponentNames.About
            }));
        }
    });
    //Help
    registerCommand(DefaultCommands.Help, {
        iconClass: SPRITE_HELP,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState) => {
            dispatch(showModalUrl({
                modal: {
                    title: tr("HELP", getState().config.locale),
                    backdrop: true,
                    size: DEFAULT_MODAL_SIZE
                },
                name: DefaultCommands.Help,
                url: "help/index.html"
            }));
        }
    });
    //Measure
    registerCommand(DefaultCommands.Measure, {
        iconClass: SPRITE_MEASURE,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, _viewer, parameters) => {
            const config = getState().config;
            const url = "component://Measure";
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.Measure, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("MEASURE", config.locale));
        }
    });
    
    //Initial Center and scale
    registerCommand(DefaultCommands.RestoreView, {
        iconClass: SPRITE_INITIAL_CENTER,
        selected: () => false,
        enabled: () => true,
        invoke: (_dispatch, getState, viewer) => {
            if (viewer) {
                const view = getInitialView(getState());
                if (view != null) {
                    viewer.zoomToView(view.x, view.y, view.scale);
                } else {
                    viewer.initialView();
                }
            }
        }
    })
    //Zoom Extents
    registerCommand(DefaultCommands.ZoomExtents, {
        iconClass: SPRITE_ZOOM_FULL,
        selected: () => false,
        enabled: () => true,
        invoke: (_dispatch, _getState, viewer) => {
            if (viewer) {
                viewer.initialView();
            }
        }
    });
    //Refresh Map
    registerCommand(DefaultCommands.RefreshMap, {
        iconClass: SPRITE_ICON_REFRESHMAP,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, _getState, viewer) => {
            if (viewer) {
                viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
                dispatch(refresh());
            }
        }
    });
    //Previous View
    registerCommand(DefaultCommands.PreviousView, {
        iconClass: SPRITE_VIEW_BACK,
        selected: () => false,
        enabled: CommandConditions.hasPreviousView,
        invoke: (dispatch, getState) => {
            const mapName = getState().config.activeMapName;
            if (mapName) {
                dispatch(previousView(mapName));
            }
        }
    });
    //Next View
    registerCommand(DefaultCommands.NextView, {
        iconClass: SPRITE_VIEW_FORWARD,
        selected: () => false,
        enabled: CommandConditions.hasNextView,
        invoke: (dispatch, getState) => {
            const mapName = getState().config.activeMapName;
            if (mapName) {
                dispatch(nextView(mapName));
            }
        }
    });
    //Geolocation
    registerCommand(DefaultCommands.Geolocation, {
        iconClass: SPRITE_GEOLOCATION,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (_dispatch, getState, viewer, parameters) => {
            const state = getState();
            const view = getCurrentView(state);
            const rtMap = getRuntimeMap(state);
            const locale = state.config.locale;
            if (viewer && view && rtMap) {
                const fact = viewer.getOLFactory();
                const geoOptions: Partial<PositionOptions> = {};
                let zoomScale = view.scale;
                if (parameters.ZoomLevel) {
                    zoomScale = parseInt(parameters.ZoomLevel, 10);
                }
                if (parameters.EnableHighAccuracy) {
                    geoOptions.enableHighAccuracy = (parameters.EnableHighAccuracy == "true");
                }
                if (parameters.Timeout) {
                    geoOptions.timeout = parseInt(parameters.Timeout, 10);
                }
                if (parameters.MaximumAge) {
                    geoOptions.maximumAge = parseInt(parameters.MaximumAge, 10);
                }
                navigator.geolocation.getCurrentPosition(pos => {
                    const proj = viewer.getProjection();
                    const txCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], proj);
                    const testCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], `EPSG:${rtMap.CoordinateSystem.EpsgCode}`);
                    viewer.zoomToView(txCoord[0], txCoord[1], zoomScale);
                    const extents: [number, number, number, number] = [
                        rtMap.Extents.LowerLeftCoordinate.X,
                        rtMap.Extents.LowerLeftCoordinate.Y,
                        rtMap.Extents.UpperRightCoordinate.X,
                        rtMap.Extents.UpperRightCoordinate.Y
                    ];
                    if (fact.extentContainsXY(extents, testCoord[0], testCoord[1])) {
                        viewer.toastSuccess("geolocation", tr("GEOLOCATION_SUCCESS", locale));
                        //getTopToaster().show({ icon: "geolocation", message: tr("GEOLOCATION_SUCCESS", locale), intent: Intent.SUCCESS });
                    } else {
                        viewer.toastWarning("warning-sign", tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale));
                        //getTopToaster().show({ icon: "warning-sign", message: tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale), intent: Intent.WARNING });
                    }
                }, err => {
                    viewer.toastError("error", tr("GEOLOCATION_ERROR", locale, { message: err.message, code: err.code }));
                    //getTopToaster().show({ icon: "error", message: tr("GEOLOCATION_ERROR", locale, { message: err.message, code: err.code }), intent: Intent.DANGER });
                }, geoOptions);
            }
        }
    });
    //Coordinate Tracker
    registerCommand(DefaultCommands.CoordinateTracker, {
        iconClass: SPRITE_COORDINATE_TRACKER,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, _viewer, parameters) => {
            const config = getState().config;
            const url = `component://CoordinateTracker?${(parameters.Projection || []).map((p: string) => "projections=" + p).join("&")}`;
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.CoordinateTracker, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("COORDTRACKER", config.locale));
        }
    });
    //External Layer Manager
    registerCommand(DefaultCommands.AddManageLayers, {
        iconClass: SPRITE_LAYER_ADD,
        selected: () => false,
        enabled: () => true,
        invoke: (dispatch, getState, _viewer, parameters) => {
            const config = getState().config;
            const url = `component://${DefaultComponentNames.AddManageLayers}`;
            const cmdDef = buildTargetedCommand(config, parameters);
            openUrlInTarget(DefaultCommands.AddManageLayers, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("ADD_MANAGE_LAYERS", config.locale));
        }
    });
    //Fusion template helper commands
    /*
    registerCommand("showOverview", {
        icon: "images/icons/invoke-script",
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, getState, viewer, parameters) => {

        }
    });
    */
    registerCommand("showTaskPane", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, _getState) => {
            dispatch(setTaskPaneVisibility(true));
        }
    });
    registerCommand("showLegend", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, _getState) => {
            dispatch(setLegendVisibility(true));
        }
    });
    registerCommand("showSelectionPanel", {
        iconClass: SPRITE_INVOKE_SCRIPT,
        selected: () => false,
        enabled: CommandConditions.isNotBusy,
        invoke: (dispatch, _getState) => {
            dispatch(setSelectionPanelVisibility(true));
        }
    });
}