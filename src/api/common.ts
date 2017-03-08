import { ResultColumnSet } from "./contracts/weblayout";
import { RuntimeMap } from "./contracts/runtime-map";
import { FeatureSet, QueryMapFeaturesResponse } from "./contracts/query";
import { IQueryMapFeaturesOptions } from './request-builder';

import olPoint from "ol/geom/point";
import olLineString from "ol/geom/linestring";
import olCircle from "ol/geom/circle";
import olPolygon from "ol/geom/polygon";
import olGeometry from "ol/geom/geometry";

import olLayerBase from "ol/layer/base";
import olInteraction from "ol/interaction/interaction";
import olOverlay from "ol/overlay";

/**
 * Describes a map view
 * @export
 * @interface IMapView
 */
export interface IMapView {
    /**
     * The x coordinate
     *
     * @type {number}
     * @memberOf IMapView
     */
    x: number;
    /**
     * The Y coordinate
     *
     * @type {number}
     * @memberOf IMapView
     */
    y: number;
    /**
     * The scale
     *
     * @type {number}
     * @memberOf IMapView
     */
    scale: number;
}

/**
 * Describes a function that is called when a command is invoked
 */
export type DispatcherFunc = (dispatch: ReduxDispatch, getState: () => IApplicationState, viewer?: IMapViewer) => any;

/**
 * Describes a viewer command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
    /**
     * The icon for this command
     *
     * @type {string}
     * @memberOf ICommand
     */
    icon: string;
    //tooltip?: string;
    //label?: string;
    /**
     * Indicates if this command is enabled based on the given application state
     *
     *
     * @memberOf ICommand
     */
    enabled: (state: IApplicationState) => boolean;
    /**
     * Indicates if this command is selected based on the given application state
     *
     *
     * @memberOf ICommand
     */
    selected: (state: IApplicationState) => boolean;
    /**
     * Invokes the command
     *
     * @type {DispatcherFunc}
     * @memberOf ICommand
     */
    invoke: DispatcherFunc;
}

/**
 * Valid command targets for an InvokeURL command
 */
export type InvokeUrlCommandTarget = "TaskPane" | "NewWindow";

/**
 * An InvokeURL command parameter
 *
 * @export
 * @interface IInvokeUrlCommandParameter
 */
export interface IInvokeUrlCommandParameter {
    /**
     * The name of the parameter
     *
     * @type {string}
     * @memberOf IInvokeUrlCommandParameter
     */
    name: string;
    /**
     * The value of the parameter
     *
     * @type {string}
     * @memberOf IInvokeUrlCommandParameter
     */
    value: string;
}

/**
 * Describes a command that invokes a URL into a specified target
 *
 * @export
 * @interface IInvokeUrlCommand
 */
export interface IInvokeUrlCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     * @memberOf IInvokeUrlCommand
     */
    icon?: string;
    /**
     * The URL to invoke
     *
     * @type {string}
     * @memberOf IInvokeUrlCommand
     */
    url: string;
    /**
     * Indicates whether to disable this command if there is no map selection
     *
     * @type {boolean}
     * @memberOf IInvokeUrlCommand
     */
    disableIfSelectionEmpty?: boolean;
    /**
     * Specifies the target which the URL should be invoked in
     *
     * @type {InvokeUrlCommandTarget}
     * @memberOf IInvokeUrlCommand
     */
    target: InvokeUrlCommandTarget;
    /**
     * Additional command parameters
     * @memberOf IInvokeUrlCommand
     */
    parameters: IInvokeUrlCommandParameter[];
}

/**
 * Describes a search command
 *
 * @export
 * @interface ISearchCommand
 */
export interface ISearchCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     * @memberOf ISearchCommand
     */
    icon?: string;
    /**
     * The name of the map layer this commmand applies to
     *
     * @type {string}
     * @memberOf ISearchCommand
     */
    layer: string;
    /**
     * The prompt to display in the search command UI
     *
     * @type {string}
     * @memberOf ISearchCommand
     */
    prompt: string;
    /**
     * The title to display in the search command UI
     *
     * @type {string}
     * @memberOf ISearchCommand
     */
    title: string;
    /**
     * The set of feature properties to show in the search results
     *
     * @type {ResultColumnSet}
     * @memberOf ISearchCommand
     */
    resultColumns: ResultColumnSet;
    /**
     * The search filter to apply based on user input
     *
     * @type {string}
     * @memberOf ISearchCommand
     */
    filter?: string;
    /**
     * The maximum number of results to return
     *
     * @type {number}
     * @memberOf ISearchCommand
     */
    matchLimit: number;
}

/**
 * Type alias for a dictionary-like structure
 */
export type Dictionary<T> = { [key: string]: T };

/**
 * A 2d coordinate
 */
export type Coordinate = [number, number];

/**
 * A bounding box array
 */
export type Bounds = [number, number, number, number];

/**
 * An active map viewer tool
 *
 * @export
 * @enum {number}
 */
export enum ActiveMapTool {
    /**
     * Zoom tool
     */
    Zoom,
    /**
     * Selection tool
     */
    Select,
    /**
     * Pan tool
     */
    Pan,
    /**
     * None
     */
    None
}

/**
 * Describes an external base layer
 *
 * @export
 * @interface IExternalBaseLayer
 */
export interface IExternalBaseLayer {
    /**
     * The name of the external base layer
     *
     * @type {string}
     * @memberOf IExternalBaseLayer
     */
    name: string;
    /**
     * The kind of external base layer
     *
     * @type {string}
     * @memberOf IExternalBaseLayer
     */
    kind: string;
    /**
     * Indicates if this external base layer is visible
     *
     * @type {boolean}
     * @memberOf IExternalBaseLayer
     */
    visible?: boolean;
    /**
     * Additional options for initializing the external base layer
     *
     * @type {*}
     * @memberOf IExternalBaseLayer
     */
    options?: any;
}


/**
 * Describes a menu entry on the Map Menu component
 *
 * @export
 * @interface IMapMenuEntry
 */
export interface IMapMenuEntry {
    /**
     * The runtime map name
     *
     * @type {string}
     * @memberOf IMapMenuEntry
     */
    mapName: string;
    /**
     * The menu entry label
     *
     * @type {string}
     * @memberOf IMapMenuEntry
     */
    label: string;
}

/**
 * A bit mask indicating how a map viewer should refresh
 *
 * @export
 * @enum {number}
 */
export enum RefreshMode {
    /**
     * Refresh only the layers
     */
    LayersOnly = 1,
    /**
     * Refresh only the selection
     */
    SelectionOnly = 2
}

/**
 * Describes the API for interacting with the map viewer
 *
 * @export
 * @interface IMapViewer
 */
export interface IMapViewer {
    /**
     * Gets the projection of the map
     *
     * @returns {ol.ProjectionLike}
     *
     * @memberOf IMapViewer
     */
    getProjection(): ol.ProjectionLike;
    /**
     * Gets the view for the given extent
     *
     * @param {Bounds} extent
     * @returns {IMapView}
     *
     * @memberOf IMapViewer
     */
    getViewForExtent(extent: Bounds): IMapView;
    /**
     * Gets the current extent
     *
     * @returns {Bounds}
     *
     * @memberOf IMapViewer
     */
    getCurrentExtent(): Bounds;
    /**
     * Gets the current map view
     *
     * @returns {IMapView}
     *
     * @memberOf IMapViewer
     */
    getCurrentView(): IMapView;
    /**
     * Zooms to the specified map view
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     *
     * @memberOf IMapViewer
     */
    zoomToView(x: number, y: number, scale: number): void;
    /**
     * Sets the selection XML
     *
     * @param {string} xml
     * @param {IQueryMapFeaturesOptions} [queryOpts]
     * @param {(res: QueryMapFeaturesResponse) => void} [success]
     * @param {(err: Error) => void} [failure]
     *
     * @memberOf IMapViewer
     */
    setSelectionXml(xml: string, queryOpts?: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Refreshes the map
     *
     * @param {RefreshMode} [mode]
     *
     * @memberOf IMapViewer
     */
    refreshMap(mode?: RefreshMode): void;
    /**
     * Gets the meters per unit value
     *
     * @returns {number}
     *
     * @memberOf IMapViewer
     */
    getMetersPerUnit(): number;
    /**
     * Sets the active tool
     *
     * @param {ActiveMapTool} tool
     *
     * @memberOf IMapViewer
     */
    setActiveTool(tool: ActiveMapTool): void;
    /**
     * Gets the active tool
     *
     * @returns {ActiveMapTool}
     *
     * @memberOf IMapViewer
     */
    getActiveTool(): ActiveMapTool;
    /**
     * Sets the initial map view
     *
     *
     * @memberOf IMapViewer
     */
    initialView(): void;
    /**
     * Clears the map selection
     *
     *
     * @memberOf IMapViewer
     */
    clearSelection(): void;
    /**
     * Zooms in or out by the specified delta
     *
     * @param {number} delta
     *
     * @memberOf IMapViewer
     */
    zoomDelta(delta: number): void;
    /**
     * Gets whether the viewer is currently in the state of digitizing
     *
     * @returns {boolean}
     *
     * @memberOf IMapViewer
     */
    isDigitizing(): boolean;
    /**
     * Starts the digitization process for a point
     *
     * @param {DigitizerCallback<olPoint>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizePoint(handler: DigitizerCallback<olPoint>, prompt?: string): void;
    /**
     * Starts the digitization process for a line
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizeLine(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a line string
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizeLineString(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a circle
     *
     * @param {DigitizerCallback<olCircle>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizeCircle(handler: DigitizerCallback<olCircle>, prompt?: string): void;
    /**
     * Starts the digitization process for a rectangle
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizeRectangle(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Starts the digitization process for a polygon
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     * @memberOf IMapViewer
     */
    digitizePolygon(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Performs a map selection by the given geometry
     *
     * @param {olGeometry} geom
     *
     * @memberOf IMapViewer
     */
    selectByGeometry(geom: olGeometry): void;
    /**
     * Performs a map selection by the given query options
     *
     * @param {IQueryMapFeaturesOptions} options
     * @param {(res: QueryMapFeaturesResponse) => void} [success]
     * @param {(err: Error) => void} [failure]
     *
     * @memberOf IMapViewer
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Zooms to the specified extent
     *
     * @param {Bounds} extent
     *
     * @memberOf IMapViewer
     */
    zoomToExtent(extent: Bounds): void;
    /**
     * Gets whether feature tooltips are enabled
     *
     * @returns {boolean}
     *
     * @memberOf IMapViewer
     */
    isFeatureTooltipEnabled(): boolean;
    /**
     * Enables/disables feature tooltips
     *
     * @param {boolean} enabled
     *
     * @memberOf IMapViewer
     */
    setFeatureTooltipEnabled(enabled: boolean): void;
    /**
     * Gets the current selection model
     *
     * @returns {QueryMapFeaturesResponse}
     *
     * @memberOf IMapViewer
     */
    getSelection(): QueryMapFeaturesResponse | null;
    /**
     * Gets the current selection model as a selection XML string
     *
     * @param {FeatureSet} selection
     * @param {string[]} [layerIds]
     * @returns {string}
     *
     * @memberOf IMapViewer
     */
    getSelectionXml(selection: FeatureSet, layerIds?: string[]): string;
    /**
     * Gets whether the specified custom layer exists on the map
     */
    hasLayer(name: string): boolean;
    /**
     * Adds a layer to the map
     *
     * @template T
     * @param {string} name
     * @param {T} layer
     * @returns {T}
     *
     * @memberOf IMapViewer
     */
    addLayer<T extends olLayerBase>(name: string, layer: T): T;
    /**
     * Removes a layer by the given name
     *
     * @param {string} name
     * @returns {(olLayerBase | undefined)}
     *
     * @memberOf IMapViewer
     */
    removeLayer(name: string): olLayerBase | undefined;
    /**
     * Gets a layer by the given name
     *
     * @template T
     * @param {string} name
     * @param {() => T} factory
     * @returns {T}
     *
     * @memberOf IMapViewer
     */
    getLayer<T extends olLayerBase>(name: string, factory: () => T): T;
    /**
     * Adds an OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     * @returns {T}
     *
     * @memberOf IMapViewer
     */
    addInteraction<T extends olInteraction>(interaction: T): T;
    /**
     * Removes the given OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     *
     * @memberOf IMapViewer
     */
    removeInteraction<T extends olInteraction>(interaction: T): void;
    /**
     * Adds an OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     * @memberOf IMapViewer
     */
    addOverlay(overlay: olOverlay): void;
    /**
     * Removes the given OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     * @memberOf IMapViewer
     */
    removeOverlay(overlay: olOverlay): void;
    /**
     * Adds an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     * @memberOf IMapViewer
     */
    addHandler(eventName: string, handler: Function): void;
    /**
     * Removes an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     * @memberOf IMapViewer
     */
    removeHandler(eventName: string, handler: Function): void;
}

/**
 * Function signature for a digitization callback
 */
export type DigitizerCallback<T extends olGeometry> = (geom: T) => void;

/**
 * Valid image formats
 */
export type ImageFormat = "PNG" | "PNG8" | "JPG" | "GIF";

/**
 * The type of client
 */
export type ClientKind = "mapagent" | "mapguide-rest";

export type IToolbarReducerState = any;

/*
export interface IToolbarReducerState {

}
*/

/**
 * Describes the reducer state branch for Task Pane component
 *
 * @export
 * @interface ITaskPaneReducerState
 */
export interface ITaskPaneReducerState {
    /**
     * The current navigation index
     *
     * @type {number}
     * @memberOf ITaskPaneReducerState
     */
    navIndex: number;
    /**
     * The current navigation history stack
     *
     * @type {string[]}
     * @memberOf ITaskPaneReducerState
     */
    navigation: string[];
    /**
     * The initial URL
     *
     * @type {(string | undefined)}
     * @memberOf ITaskPaneReducerState
     */
    initialUrl: string | undefined;
    /**
     * The last pushed URL
     *
     * @type {boolean}
     * @memberOf ITaskPaneReducerState
     */
    lastUrlPushed: boolean;
}

export type IModalReducerState = any;

/*
export interface IModalReducerState {

}
*/

/**
 * Describes the reducer state branch for a runtime map
 *
 * @export
 * @interface IBranchedMapSubState
 */
export interface IBranchedMapSubState {
    /**
     * The external base layers for the runtime map
     *
     * @type {IExternalBaseLayer[]}
     * @memberOf IBranchedMapSubState
     */
    externalBaseLayers: IExternalBaseLayer[];
    /**
     * The current map view
     *
     * @type {(IMapView | undefined)}
     * @memberOf IBranchedMapSubState
     */
    currentView: IMapView | undefined;
    /**
     * The initial map view
     *
     * @type {(IMapView | undefined)}
     * @memberOf IBranchedMapSubState
     */
    initialView: IMapView | undefined;
    /**
     * The view navigation history stack
     *
     * @type {IMapView[]}
     * @memberOf IBranchedMapSubState
     */
    history: IMapView[];
    /**
     * The current position in the view navigation history stack
     *
     * @type {number}
     * @memberOf IBranchedMapSubState
     */
    historyIndex: number;
    /**
     * The runtime map state
     *
     * @type {(RuntimeMap | undefined)}
     * @memberOf IBranchedMapSubState
     */
    runtimeMap: RuntimeMap | undefined;
    /**
     * A set of selectable layer ids
     *
     * @type {*}
     * @memberOf IBranchedMapSubState
     */
    selectableLayers: any;
    /**
     * A set of expanded group ids
     *
     * @type {*}
     * @memberOf IBranchedMapSubState
     */
    expandedGroups: any;
    /**
     * The current selection state
     *
     * @type {(QueryMapFeaturesResponse | undefined)}
     * @memberOf IBranchedMapSubState
     */
    selectionSet: QueryMapFeaturesResponse | undefined;
    /**
     * The current selected layer index
     *
     * @type {number}
     * @memberOf IBranchedMapSubState
     */
    layerIndex: number;
    /**
     * The current selected feature index
     *
     * @type {number}
     * @memberOf IBranchedMapSubState
     */
    featureIndex: number;
    /**
     * The array of ids of layers to show
     *
     * @type {string[]}
     * @memberOf IBranchedMapSubState
     */
    showLayers: string[];
    /**
     * The array of ids of groups to show
     *
     * @type {string[]}
     * @memberOf IBranchedMapSubState
     */
    showGroups: string[];
    /**
     * The array of ids of layers to hide
     *
     * @type {string[]}
     * @memberOf IBranchedMapSubState
     */
    hideLayers: string[];
    /**
     * The array of ids of groups to hide
     *
     * @type {string[]}
     * @memberOf IBranchedMapSubState
     */
    hideGroups: string[];
}

/**
 * The reducer state branch for runtime map state. Map-specific state is keyed on
 * their respective runtime map name as sub-branches on this branch
 *
 * @export
 * @interface IBranchedMapState
 */
export interface IBranchedMapState {
    [mapName: string]: IBranchedMapSubState;
}

/**
 * Coordinate display configuration
 *
 * @export
 * @interface ICoordinateConfiguration
 */
export interface ICoordinateConfiguration {
    /**
     * The number of decimal places to show
     *
     * @type {number}
     * @memberOf ICoordinateConfiguration
     */
    decimals: number;
}

/**
 * Describes the capabilities of the current view
 *
 * @export
 * @interface IViewerCapabilities
 */
export interface IViewerCapabilities {
    /**
     * Indicates if this viewer as a Task Pane component mounted
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasTaskPane: boolean;
    /**
     * Indicates if the Task Pane on this viewer has a Task Bar
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasTaskBar: boolean;
    /**
     * Indicates if this viewer has a status bar
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasStatusBar: boolean;
    /**
     * Indicates if this viewer has a zoom slider
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasNavigator: boolean;
    /**
     * Indicates if this viewer has a selection panel component mounted
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasSelectionPanel: boolean;
    /**
     * Indicates if this viewer has a legend component mounted
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasLegend: boolean;
    /**
     * Indicates if this viewer has a primary toolbar mounted
     *
     * @type {boolean}
     * @memberOf IViewerCapabilities
     */
    hasToolbar: boolean;
}

/**
 * Describes a name/value pair
 *
 * @export
 * @interface INameValuePair
 */
export interface INameValuePair {
    /**
     * The name
     *
     * @type {string}
     * @memberOf INameValuePair
     */
    name: string;
    /**
     * The value
     *
     * @type {string}
     * @memberOf INameValuePair
     */
    value: string;
}

/**
 * Describes the reducer state branch for various configuration properties
 *
 * @export
 * @interface IConfigurationReducerState
 */
export interface IConfigurationReducerState {
    /**
     * The agent URI
     *
     * @type {(string | undefined)}
     * @memberOf IConfigurationReducerState
     */
    agentUri: string | undefined;
    /**
     * The type of agent
     *
     * @type {ClientKind}
     * @memberOf IConfigurationReducerState
     */
    agentKind: ClientKind;
    /**
     * The current locale
     *
     * @type {string}
     * @memberOf IConfigurationReducerState
     */
    locale: string;
    /**
     * The current active map name
     *
     * @type {(string | undefined)}
     * @memberOf IConfigurationReducerState
     */
    activeMapName: string | undefined;
    /**
     * The array of available runtime maps
     *
     * @type {(INameValuePair[] | undefined)}
     * @memberOf IConfigurationReducerState
     */
    availableMaps: INameValuePair[] | undefined;
    /**
     * Coordinate display configuration
     *
     * @type {ICoordinateConfiguration}
     * @memberOf IConfigurationReducerState
     */
    coordinates: ICoordinateConfiguration;
    /**
     * Viewer capabilities
     *
     * @type {IViewerCapabilities}
     * @memberOf IConfigurationReducerState
     */
    capabilities: IViewerCapabilities;
    /**
     * Viewer configuration
     *
     * @type {{
     *         imageFormat: ImageFormat;
     *         selectionImageFormat: ImageFormat;
     *         selectionColor: string;
     *         pointSelectionBuffer: number;
     *     }}
     * @memberOf IConfigurationReducerState
     */
    viewer: {
        /**
         * The current image format
         *
         * @type {ImageFormat}
         */
        imageFormat: ImageFormat;
        /**
         * The current selection image format
         *
         * @type {ImageFormat}
         */
        selectionImageFormat: ImageFormat;
        /**
         * The current selection color
         *
         * @type {string}
         */
        selectionColor: string;
        /**
         * The current point selection pixel tolerance
         *
         * @type {number}
         */
        pointSelectionBuffer: number;
    }
}

/**
 * Describes an error thrown during initialization
 *
 * @export
 * @interface InitError
 */
export interface InitError {
    /**
     * The error message
     *
     * @type {string}
     * @memberOf InitError
     */
    message: string;
    /**
     * The error stack trace
     *
     * @type {string[]}
     * @memberOf InitError
     */
    stack: string[];
}

/**
 * Describes the reducer state branch for initialization errors
 *
 * @export
 * @interface IInitErrorReducerState
 */
export interface IInitErrorReducerState {
    /**
     * The caught initialization error
     *
     * @type {(InitError | undefined)}
     * @memberOf IInitErrorReducerState
     */
    error: InitError | undefined;
    /**
     * The initialization options
     *
     * @type {*}
     * @memberOf IInitErrorReducerState
     */
    options: any;
    /**
     * Indicates if the stack trace should be shown
     *
     * @type {boolean}
     * @memberOf IInitErrorReducerState
     */
    includeStack: boolean;
}

/**
 * Describes the reducer state branch for viewer state
 *
 * @export
 * @interface IViewerReducerState
 */
export interface IViewerReducerState {
    /**
     * The number of active busy actions. Zero indicates no busy activity. One or more
     * indicates busy activity.
     *
     * @type {number}
     * @memberOf IViewerReducerState
     */
    busyCount: number,
    /**
     * The active map tool
     *
     * @type {ActiveMapTool}
     * @memberOf IViewerReducerState
     */
    tool: ActiveMapTool,
    /**
     * Indicates if feature tooltips are enabled
     *
     * @type {boolean}
     * @memberOf IViewerReducerState
     */
    featureTooltipsEnabled: boolean,
}

/**
 * Describes the reducer state branch for tracked mouse coordinates
 *
 * @export
 * @interface IMouseReducerState
 */
export interface IMouseReducerState {
    /**
     * The last tracked mouse coordinate
     *
     * @type {(Coordinate | undefined)}
     * @memberOf IMouseReducerState
     */
    coords: Coordinate | undefined;
}

/**
 * Describes the full application state tree. Redux-aware components can connect and subscribe to
 * various properties and branches of this tree and be automatically notified of any changes and
 * update and re-render themselves accordingly
 *
 * @export
 * @interface IApplicationState
 */
export interface IApplicationState {
    /**
     * Initialization errors
     *
     * @type {IInitErrorReducerState}
     * @memberOf IApplicationState
     */
    initError: IInitErrorReducerState;
    /**
     * Viewer configuration
     *
     * @type {IConfigurationReducerState}
     * @memberOf IApplicationState
     */
    config: IConfigurationReducerState;
    /**
     * Viewer state
     *
     * @type {IViewerReducerState}
     * @memberOf IApplicationState
     */
    viewer: IViewerReducerState;
    /**
     * Runtime map state
     *
     * @type {IBranchedMapState}
     * @memberOf IApplicationState
     */
    mapState: IBranchedMapState;
    /**
     * Toolbar state
     *
     * @type {IToolbarReducerState}
     * @memberOf IApplicationState
     */
    toolbar: IToolbarReducerState;
    /**
     * Task Pane component state
     *
     * @type {ITaskPaneReducerState}
     * @memberOf IApplicationState
     */
    taskpane: ITaskPaneReducerState;
    /**
     * Modal dialog state
     *
     * @type {IModalReducerState}
     * @memberOf IApplicationState
     */
    modal: IModalReducerState;
    /**
     * Tracked mouse coordinate state
     *
     * @type {IMouseReducerState}
     * @memberOf IApplicationState
     */
    mouse: IMouseReducerState;
    /**
     * Tracks the last dispatched action
     *
     * @type {*}
     * @memberOf IApplicationState
     */
    lastaction: any;
}

// Redux typedefs to tighten up our redux code
export interface ReduxAction {
    /**
     * The type of action
     *
     * @type {string}
     * @memberOf ReduxAction
     */
    type: string;
    /**
     * The action payload
     *
     * @type {*}
     * @memberOf ReduxAction
     */
    payload?: any;
}

/**
 * Describes the redux store
 *
 * @export
 * @interface ReduxStore
 */
export interface ReduxStore {
    /**
     * Gets the application state
     *
     * @returns {IApplicationState}
     *
     * @memberOf ReduxStore
     */
    getState(): IApplicationState;
}

export type ReduxThunkedAction = (dispatch: ReduxDispatch, getState: () => IApplicationState) => any;

export type ReduxActionCreator = ReduxAction | ReduxThunkedAction;

export type ReduxDispatch = (action: ReduxActionCreator) => void;

export function NOOP() { }
export function ALWAYS_FALSE() { return false; }
export function ALWAYS_TRUE() { return true; }

/**
 * Describe the size/dimensions of a DOM element in a toolbar or flyout menu
 *
 * @export
 * @interface IDOMElementMetrics
 */
export interface IDOMElementMetrics {
    /**
     * The X position of this element
     *
     * @type {number}
     * @memberOf IDOMElementMetrics
     */
    posX: number;
    /**
     * The Y position of this element
     *
     * @type {number}
     * @memberOf IDOMElementMetrics
     */
    posY: number;
    /**
     * The width of this element
     *
     * @type {number}
     * @memberOf IDOMElementMetrics
     */
    width: number;
    /**
     * The height of this element
     *
     * @type {number}
     * @memberOf IDOMElementMetrics
     */
    height: number;
    /**
     * Indicates of this toolbar is vertically-oriented
     *
     * @type {boolean}
     * @memberOf IDOMElementMetrics
     */
    vertical?: boolean;
}

/**
 * Helper function to get the initial map view from the application state
 *
 * @export
 * @param {IApplicationState} state
 * @returns {(IMapView | undefined)}
 */
export function getInitialView(state: IApplicationState): IMapView | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].initialView;
    }
    return undefined;
}

/**
 * Helper function to get the current selection set from the application state
 *
 * @export
 * @param {IApplicationState} state
 * @returns {(QueryMapFeaturesResponse | undefined)}
 */
export function getSelectionSet(state: IApplicationState): QueryMapFeaturesResponse | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].selectionSet;
    }
    return undefined;
}

/**
 * Helper function to get the current runtime map state from the application state
 *
 * @export
 * @param {IApplicationState} state
 * @returns {(RuntimeMap | undefined)}
 */
export function getRuntimeMap(state: IApplicationState): RuntimeMap | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].runtimeMap;
    }
    return undefined;
}

/**
 * Helper function to get the current view from the application state
 *
 * @export
 * @param {IApplicationState} state
 * @returns {(IMapView | undefined)}
 */
export function getCurrentView(state: IApplicationState): IMapView | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].currentView;
    }
    return undefined;
}

/**
 * Helper function to get the current set of available external base layers from the application state
 *
 * @export
 * @param {IApplicationState} state
 * @returns {(IExternalBaseLayer[] | undefined)}
 */
export function getExternalBaseLayers(state: IApplicationState): IExternalBaseLayer[] | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].externalBaseLayers;
    }
    return undefined;
}