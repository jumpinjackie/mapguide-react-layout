import { ResultColumnSet } from "./contracts/weblayout";
import { RuntimeMap } from "./contracts/runtime-map";
import { FeatureSet, QueryMapFeaturesResponse } from "./contracts/query";
import { IQueryMapFeaturesOptions } from './request-builder';

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
    enabled: (state: IApplicationState) => boolean;
    selected: (state: IApplicationState) => boolean;
    invoke: DispatcherFunc;
}

export type InvokeUrlCommandTarget = "TaskPane" | "NewWindow";

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

export enum ActiveMapTool {
    Zoom,
    Select,
    Pan,
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
     * @param {DigitizerCallback<ol.geom.Point>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizePoint(handler: DigitizerCallback<ol.geom.Point>, prompt?: string): void;
    /**
     * Starts the digitization process for a line
     * 
     * @param {DigitizerCallback<ol.geom.LineString>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizeLine(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a line string
     * 
     * @param {DigitizerCallback<ol.geom.LineString>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a circle
     * 
     * @param {DigitizerCallback<ol.geom.Circle>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>, prompt?: string): void;
    /**
     * Starts the digitization process for a rectangle
     * 
     * @param {DigitizerCallback<ol.geom.Polygon>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void;
    /**
     * Starts the digitization process for a polygon
     * 
     * @param {DigitizerCallback<ol.geom.Polygon>} handler
     * @param {string} [prompt]
     * 
     * @memberOf IMapViewer
     */
    digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void;
    /**
     * Performs a map selection by the given geometry
     * 
     * @param {ol.geom.Geometry} geom
     * 
     * @memberOf IMapViewer
     */
    selectByGeometry(geom: ol.geom.Geometry): void;
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
     * Adds a layer to the map
     * 
     * @template T
     * @param {string} name
     * @param {T} layer
     * @returns {T}
     * 
     * @memberOf IMapViewer
     */    
    addLayer<T extends ol.layer.Base>(name: string, layer: T): T;
    /**
     * Removes a layer by the given name
     * 
     * @param {string} name
     * @returns {(ol.layer.Base | undefined)}
     * 
     * @memberOf IMapViewer
     */
    removeLayer(name: string): ol.layer.Base | undefined;
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
    getLayer<T extends ol.layer.Base>(name: string, factory: () => T): T;
    /**
     * Adds an OpenLayers interaction
     * 
     * @template T
     * @param {T} interaction
     * @returns {T}
     * 
     * @memberOf IMapViewer
     */
    addInteraction<T extends ol.interaction.Interaction>(interaction: T): T;
    /**
     * Removes the given OpenLayers interaction
     * 
     * @template T
     * @param {T} interaction
     * 
     * @memberOf IMapViewer
     */
    removeInteraction<T extends ol.interaction.Interaction>(interaction: T): void;
    /**
     * Adds an OpenLayers overlay
     * 
     * @param {ol.Overlay} overlay
     * 
     * @memberOf IMapViewer
     */
    addOverlay(overlay: ol.Overlay): void;
    /**
     * Removes the given OpenLayers overlay
     * 
     * @param {ol.Overlay} overlay
     * 
     * @memberOf IMapViewer
     */
    removeOverlay(overlay: ol.Overlay): void;
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

export type DigitizerCallback<T extends ol.geom.Geometry> = (geom: T) => void;

export type ImageFormat = "PNG" | "PNG8" | "JPG" | "GIF";

/**
 * The type of client
 */
export type ClientKind = "mapagent" | "mapguide-rest";

export interface IViewReducerState {
    current: IMapView | null;
    initial: IMapView | null;
    history: IMapView[];
    mouse: Coordinate | null;
    historyIndex: number;
}

export type IToolbarReducerState = any;

/*
export interface IToolbarReducerState {

}
*/

export interface ITaskPaneReducerState {
    navIndex: number;
    navigation: string[];
    initialUrl: string | null;
    lastUrlPushed: boolean;
}

export interface ISelectionReducerState {
    selectionSet: QueryMapFeaturesResponse | null,
    layerIndex: number,
    featureIndex: number
}

export type IModalReducerState = any;

/*
export interface IModalReducerState {

}
*/

export interface IMapViewerReducerState {
    busyCount: number,
    tool: ActiveMapTool,
    featureTooltipsEnabled: boolean,
    layerGroupVisibility: {
        showLayers: string[],
        showGroups: string[],
        hideLayers: string[],
        hideGroups: string[]
    }
}

export interface IMapReducerState {
    state: RuntimeMap | null;
    viewer: IMapViewerReducerState;
}

export interface ILegendReducerState {
    selectableLayers: any;
    expandedGroups: any;
}

export interface ICoordinateConfiguration {
    decimals: number;
}

export interface IViewerCapabilities {
    hasTaskPane: boolean;
    hasTaskBar: boolean;
    hasStatusBar: boolean;
    hasNavigator: boolean;
    hasSelectionPanel: boolean;
    hasLegend: boolean;
    hasToolbar: boolean;
}

export interface IMapViewerConfiguration {
    imageFormat: ImageFormat;
    selectionImageFormat: ImageFormat;
    selectionColor: string;
    pointSelectionBuffer: number;
}

export interface IConfigurationReducerState {
    agentUri: string|null,
    agentKind: ClientKind|null,
    locale: string,
    viewer: IMapViewerConfiguration;
    externalBaseLayers: IExternalBaseLayer[],
    coordinates: ICoordinateConfiguration;
    capabilities: IViewerCapabilities;
}

export interface IInitErrorReducerState {
    error: Error | undefined;
    options: any;
    includeStack: boolean;
}

export interface IApplicationState {
    initError: IInitErrorReducerState;
    config: IConfigurationReducerState;
    map: IMapReducerState;
    legend: ILegendReducerState;
    toolbar: IToolbarReducerState;
    view: IViewReducerState;
    selection: ISelectionReducerState;
    taskpane: ITaskPaneReducerState;
    modal: IModalReducerState;
    lastaction: any;
}

// Redux typedefs to tighten up our redux code
export interface ReduxAction {
    type: string;
    payload?: any;
}

export interface ReduxStore {
    getState(): IApplicationState;
}

export type ReduxThunkedAction = (dispatch: ReduxDispatch, getState: () => IApplicationState) => any;

export type ReduxActionCreator = ReduxAction | ReduxThunkedAction;

export type ReduxDispatch = (action: ReduxActionCreator) => void;

export function NOOP() { }
export function ALWAYS_FALSE() { return false; }
export function ALWAYS_TRUE() { return true; }

export interface IDOMElementMetrics {
    posX: number;
    posY: number;
    width: number;
    height: number;
}