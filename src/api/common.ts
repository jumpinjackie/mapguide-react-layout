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

import { IOLFactory } from "./ol-factory";
import { Dispatch, Action } from "redux";

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
     * @memberof IMapView
     */
    x: number;
    /**
     * The Y coordinate
     *
     * @type {number}
     * @memberof IMapView
     */
    y: number;
    /**
     * The scale
     *
     * @type {number}
     * @memberof IMapView
     */
    scale: number;
}

/**
 * Describes a function that is called when a command is invoked
 */
export type DispatcherFunc = (dispatch: ReduxDispatch, getState: () => Readonly<IApplicationState>, viewer?: IMapViewer, parameters?: any) => any;

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
     * @memberof ICommand
     */
    icon?: string;
    iconClass?: string;
    //tooltip?: string;
    //label?: string;
    /**
     * Indicates if this command is enabled based on the given application state
     *
     *
     * @memberof ICommand
     */
    enabled: (state: Readonly<IApplicationState>, parameters?: any) => boolean;
    /**
     * Indicates if this command is enabled based on the given application state
     *
     *
     * @memberof ICommand
     */
    selected: (state: Readonly<IApplicationState>) => boolean;
    /**
     * Invokes the command
     *
     * @type {DispatcherFunc}
     * @memberof ICommand
     */
    invoke: DispatcherFunc;
}

/**
 * Valid command targets for an InvokeURL command
 */
export type CommandTarget = "TaskPane" | "NewWindow" | "SpecifiedFrame";

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
     * @memberof IInvokeUrlCommandParameter
     */
    name: string;
    /**
     * The value of the parameter
     *
     * @type {string}
     * @memberof IInvokeUrlCommandParameter
     */
    value: string;
}

/**
 * Describes a command that will run in a pre-defined target frame or window
 *
 * @export
 * @interface ITargetedCommand
 */
export interface ITargetedCommand {
    /**
     * Specifies the target which the URL should be invoked in
     *
     * @type {CommandTarget}
     * @memberof IInvokeUrlCommand
     */
    target: CommandTarget;
    /**
     * The name of the frame to run this command in. Only applies if the target is
     * "SpecifiedFrame"
     */
    targetFrame?: string;
}

/**
 * Describes a command that invokes a URL into a specified target
 *
 * @export
 * @interface IInvokeUrlCommand
 */
export interface IInvokeUrlCommand extends ITargetedCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     * @memberof IInvokeUrlCommand
     */
    icon?: string;
    iconClass?: string;
    /**
     * The URL to invoke
     *
     * @type {string}
     * @memberof IInvokeUrlCommand
     */
    url: string;
    /**
     * Indicates whether to disable this command if there is no map selection
     *
     * @type {boolean}
     * @memberof IInvokeUrlCommand
     */
    disableIfSelectionEmpty?: boolean;
    /**
     * Additional command parameters
     * @memberof IInvokeUrlCommand
     */
    parameters: IInvokeUrlCommandParameter[];
}

/**
 * Describes a search command
 *
 * @export
 * @interface ISearchCommand
 */
export interface ISearchCommand extends ITargetedCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     * @memberof ISearchCommand
     */
    icon?: string;
    iconClass?: string;
    /**
     * The name of the map layer this commmand applies to
     *
     * @type {string}
     * @memberof ISearchCommand
     */
    layer: string;
    /**
     * The prompt to display in the search command UI
     *
     * @type {string}
     * @memberof ISearchCommand
     */
    prompt: string;
    /**
     * The title to display in the search command UI
     *
     * @type {string}
     * @memberof ISearchCommand
     */
    title: string;
    /**
     * The set of feature properties to show in the search results
     *
     * @type {ResultColumnSet}
     * @memberof ISearchCommand
     */
    resultColumns: ResultColumnSet;
    /**
     * The search filter to apply based on user input
     *
     * @type {string}
     * @memberof ISearchCommand
     */
    filter?: string;
    /**
     * The maximum number of results to return
     *
     * @type {number}
     * @memberof ISearchCommand
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
     * @memberof IExternalBaseLayer
     */
    name: string;
    /**
     * The kind of external base layer
     *
     * @type {string}
     * @memberof IExternalBaseLayer
     */
    kind: string;
    /**
     * Indicates if this external base layer is visible
     *
     * @type {boolean}
     * @memberof IExternalBaseLayer
     */
    visible?: boolean;
    /**
     * Additional options for initializing the external base layer
     *
     * @type {*}
     * @memberof IExternalBaseLayer
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
     * @memberof IMapMenuEntry
     */
    mapName: string;
    /**
     * The menu entry label
     *
     * @type {string}
     * @memberof IMapMenuEntry
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
     * @memberof IMapViewer
     */
    getProjection(): ol.ProjectionLike;
    /**
     * Gets the view for the given extent
     *
     * @param {Bounds} extent
     * @returns {IMapView}
     *
     * @memberof IMapViewer
     */
    getViewForExtent(extent: Bounds): IMapView;
    /**
     * Gets the current extent
     *
     * @returns {Bounds}
     *
     * @memberof IMapViewer
     */
    getCurrentExtent(): Bounds;
    /**
     * Gets the current map view
     *
     * @returns {IMapView}
     *
     * @memberof IMapViewer
     */
    getCurrentView(): IMapView;
    /**
     * Gets the current size of the map
     *
     * @returns {[number, number]}
     *
     * @memberof IMapViewer
     */
    getSize(): [number, number];
    /**
     * Zooms to the specified map view
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     *
     * @memberof IMapViewer
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
     * @memberof IMapViewer
     */
    setSelectionXml(xml: string, queryOpts?: Partial<IQueryMapFeaturesOptions>, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Refreshes the map
     *
     * @param {RefreshMode} [mode]
     *
     * @memberof IMapViewer
     */
    refreshMap(mode?: RefreshMode): void;
    /**
     * Gets the meters per unit value
     *
     * @returns {number}
     *
     * @memberof IMapViewer
     */
    getMetersPerUnit(): number;
    /**
     * Sets the active tool
     *
     * @param {ActiveMapTool} tool
     *
     * @memberof IMapViewer
     */
    setActiveTool(tool: ActiveMapTool): void;
    /**
     * Gets the active tool
     *
     * @returns {ActiveMapTool}
     *
     * @memberof IMapViewer
     */
    getActiveTool(): ActiveMapTool;
    /**
     * Sets the initial map view
     *
     *
     * @memberof IMapViewer
     */
    initialView(): void;
    /**
     * Clears the map selection
     *
     *
     * @memberof IMapViewer
     */
    clearSelection(): void;
    /**
     * Zooms in or out by the specified delta
     *
     * @param {number} delta
     *
     * @memberof IMapViewer
     */
    zoomDelta(delta: number): void;
    /**
     * Gets whether the viewer is currently in the state of digitizing
     *
     * @returns {boolean}
     *
     * @memberof IMapViewer
     */
    isDigitizing(): boolean;
    /**
     * Cancels active digitization
     *
     * @memberof IMapViewer
     */
    cancelDigitization(): void;
    /**
     * Starts the digitization process for a point
     *
     * @param {DigitizerCallback<olPoint>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizePoint(handler: DigitizerCallback<olPoint>, prompt?: string): void;
    /**
     * Starts the digitization process for a line
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizeLine(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a line string
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizeLineString(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a circle
     *
     * @param {DigitizerCallback<olCircle>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizeCircle(handler: DigitizerCallback<olCircle>, prompt?: string): void;
    /**
     * Starts the digitization process for a rectangle
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizeRectangle(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Starts the digitization process for a polygon
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     * @memberof IMapViewer
     */
    digitizePolygon(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Performs a map selection by the given geometry
     *
     * @param {olGeometry} geom
     *
     * @memberof IMapViewer
     */
    selectByGeometry(geom: olGeometry): void;
    /**
     * Performs a map selection by the given query options
     *
     * @param {IQueryMapFeaturesOptions} options
     * @param {(res: QueryMapFeaturesResponse) => void} [success]
     * @param {(err: Error) => void} [failure]
     *
     * @memberof IMapViewer
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Zooms to the specified extent
     *
     * @param {Bounds} extent
     *
     * @memberof IMapViewer
     */
    zoomToExtent(extent: Bounds): void;
    /**
     * Gets whether feature tooltips are enabled
     *
     * @returns {boolean}
     *
     * @memberof IMapViewer
     */
    isFeatureTooltipEnabled(): boolean;
    /**
     * Enables/disables feature tooltips
     *
     * @param {boolean} enabled
     *
     * @memberof IMapViewer
     */
    setFeatureTooltipEnabled(enabled: boolean): void;
    /**
     * Gets the current selection model
     *
     * @returns {QueryMapFeaturesResponse}
     *
     * @memberof IMapViewer
     */
    getSelection(): QueryMapFeaturesResponse | null;
    /**
     * Gets the current selection model as a selection XML string
     *
     * @param {FeatureSet} selection
     * @param {string[]} [layerIds]
     * @returns {string}
     *
     * @memberof IMapViewer
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
     * @memberof IMapViewer
     */
    addLayer<T extends olLayerBase>(name: string, layer: T): T;
    /**
     * Removes a layer by the given name
     *
     * @param {string} name
     * @returns {(olLayerBase | undefined)}
     *
     * @memberof IMapViewer
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
     * @memberof IMapViewer
     */
    getLayer<T extends olLayerBase>(name: string, factory: () => T): T;
    /**
     * Adds an OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     * @returns {T}
     *
     * @memberof IMapViewer
     */
    addInteraction<T extends olInteraction>(interaction: T): T;
    /**
     * Removes the given OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     *
     * @memberof IMapViewer
     */
    removeInteraction<T extends olInteraction>(interaction: T): void;
    /**
     * Adds an OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     * @memberof IMapViewer
     */
    addOverlay(overlay: olOverlay): void;
    /**
     * Removes the given OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     * @memberof IMapViewer
     */
    removeOverlay(overlay: olOverlay): void;
    /**
     * Adds an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     * @memberof IMapViewer
     */
    addHandler(eventName: string, handler: Function): void;
    /**
     * Removes an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     * @memberof IMapViewer
     */
    removeHandler(eventName: string, handler: Function): void;
    /**
     * Gets the OL object factory
     */
    getOLFactory(): IOLFactory;
    /**
     * Gets the view resolution
     *
     * @returns {number}
     *
     * @memberof IMapViewer
     */
    getResolution(): number;
    /**
     * Gets the resolution for the given scale
     *
     * @returns {number}
     *
     * @memberof IMapViewer
     */
    scaleToResolution(scale: number): number;
    /**
     * Gets the name of the current runtime map
     * 
     * @returns {string} 
     * @memberof IMapViewer
     */
    getMapName(): string;
    /**
     * Gets the current session id
     * 
     * @returns {string}
     * @memberof IMapViewer
     */
    getSessionId(): string;
    /**
     * Sets the current view rotation
     * 
     * @param {number} rotation 
     * @memberof IMapViewer
     */
    setViewRotation(rotation: number): void;
    /**
     * Gets the current view rotation
     * 
     * @returns {number} 
     * @memberof IMapViewer
     */
    getViewRotation(): number;
    /**
     * Gets whether view rotation is enabled
     * 
     * @returns {boolean} 
     * @memberof IMapViewer
     */
    isViewRotationEnabled(): boolean;
    /**
     * Sets whether view rotation is enabled or not
     * 
     * @param {boolean} enabled 
     * @memberof IMapViewer
     */
    setViewRotationEnabled(enabled: boolean): void;
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

export interface IModalParameters {
    title: string;
    backdrop: boolean;
    size: [number, number];
    overflowYScroll?: boolean;
}

/**
 * The default modal dialog size
 */
export const DEFAULT_MODAL_SIZE: [number, number] = [ 300, 500 ];

/**
 * Base modal display options
 *
 * @export
 * @interface IModalDisplayOptionsBase
 */
export interface IModalDisplayOptionsBase {
    modal: IModalParameters;
    name: string;
}

/**
 * Modal display options for URL content
 *
 * @export
 * @interface IModalDisplayOptions
 * @extends {IModalDisplayOptionsBase}
 */
export interface IModalDisplayOptions extends IModalDisplayOptionsBase {
    /**
     * The URL of the content to load in the modal dialog
     *
     * @type {string}
     * @memberof IModalDisplayOptions
     */
    url: string;
}

export interface IModalComponentDisplayOptions extends IModalDisplayOptionsBase {
    /**
     * The id of the component to display
     *
     * @type {string}
     * @memberof IModalComponentDisplayOptions
     */
    component: string;
    /**
     * Component properties
     *
     * @type {*}
     * @memberof IModalComponentDisplayOptions
     */
    componentProps?: any;
}

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
     * @memberof ITaskPaneReducerState
     */
    navIndex: number;
    /**
     * The current navigation history stack
     *
     * @type {string[]}
     * @memberof ITaskPaneReducerState
     */
    navigation: string[];
    /**
     * The initial URL
     *
     * @type {(string | undefined)}
     * @memberof ITaskPaneReducerState
     */
    initialUrl: string | undefined;
    /**
     * The last pushed URL
     *
     * @type {boolean}
     * @memberof ITaskPaneReducerState
     */
    lastUrlPushed: boolean;
}

export type IModalReducerState = {
    /**
     * Gets the modal parameters for the given key
     */
    [key: string]: IModalDisplayOptions | IModalComponentDisplayOptions;
};

/*
export interface IModalReducerState {

}
*/

export type LayerTransparencySet = { [layerName: string]: number };

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
     * @memberof IBranchedMapSubState
     */
    externalBaseLayers: IExternalBaseLayer[];
    /**
     * The current map view
     *
     * @type {(IMapView | undefined)}
     * @memberof IBranchedMapSubState
     */
    currentView: IMapView | undefined;
    /**
     * The initial map view
     *
     * @type {(IMapView | undefined)}
     * @memberof IBranchedMapSubState
     */
    initialView: IMapView | undefined;
    /**
     * The view navigation history stack
     *
     * @type {IMapView[]}
     * @memberof IBranchedMapSubState
     */
    history: IMapView[];
    /**
     * The current position in the view navigation history stack
     *
     * @type {number}
     * @memberof IBranchedMapSubState
     */
    historyIndex: number;
    /**
     * The runtime map state
     *
     * @type {(RuntimeMap | undefined)}
     * @memberof IBranchedMapSubState
     */
    runtimeMap: RuntimeMap | undefined;
    /**
     * A set of selectable layer ids
     *
     * @type {*}
     * @memberof IBranchedMapSubState
     */
    selectableLayers: any;
    /**
     * A set of expanded group ids
     *
     * @type {*}
     * @memberof IBranchedMapSubState
     */
    expandedGroups: any;
    /**
     * The current selection state
     *
     * @type {(QueryMapFeaturesResponse | undefined)}
     * @memberof IBranchedMapSubState
     */
    selectionSet: QueryMapFeaturesResponse | undefined;
    /**
     * The current selected layer index
     *
     * @type {number}
     * @memberof IBranchedMapSubState
     */
    layerIndex: number;
    /**
     * The current selected feature index
     *
     * @type {number}
     * @memberof IBranchedMapSubState
     */
    featureIndex: number;
    /**
     * The array of ids of layers to show
     *
     * @type {string[]}
     * @memberof IBranchedMapSubState
     */
    showLayers: string[];
    /**
     * The array of ids of groups to show
     *
     * @type {string[]}
     * @memberof IBranchedMapSubState
     */
    showGroups: string[];
    /**
     * The array of ids of layers to hide
     *
     * @type {string[]}
     * @memberof IBranchedMapSubState
     */
    hideLayers: string[];
    /**
     * The array of ids of groups to hide
     *
     * @type {string[]}
     * @memberof IBranchedMapSubState
     */
    hideGroups: string[];
    /**
     * Layer transparency settings
     * 
     * @type {{ [layerName: string]: number }}
     * @memberof IBranchedMapSubState
     */
    layerTransparency: LayerTransparencySet;
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
     * @memberof ICoordinateConfiguration
     */
    decimals: number;
    /**
     * The display projection for these coordinates
     * 
     * @type {string}
     * @memberof ICoordinateConfiguration
     */
    projection: string;
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
     * @memberof IViewerCapabilities
     */
    hasTaskPane: boolean;
    /**
     * Indicates if the Task Pane on this viewer has a Task Bar
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
     */
    hasTaskBar: boolean;
    /**
     * Indicates if this viewer has a status bar
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
     */
    hasStatusBar: boolean;
    /**
     * Indicates if this viewer has a zoom slider
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
     */
    hasNavigator: boolean;
    /**
     * Indicates if this viewer has a selection panel component mounted
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
     */
    hasSelectionPanel: boolean;
    /**
     * Indicates if this viewer has a legend component mounted
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
     */
    hasLegend: boolean;
    /**
     * Indicates if this viewer has a primary toolbar mounted
     *
     * @type {boolean}
     * @memberof IViewerCapabilities
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
     * @memberof INameValuePair
     */
    name: string;
    /**
     * The value
     *
     * @type {string}
     * @memberof INameValuePair
     */
    value: string;
}

/**
 * Describes a redux reducer function
 */
export type ReducerFunction<TState> = (state: TState, action: ReduxAction) => TState;

/**
 * Describes the reducer state branch for the current viewer template
 *
 * @export
 * @interface ITemplateReducerState
 */
export interface ITemplateReducerState {
    /**
     * Indicates if the task pane is visible
     *
     * @type {boolean}
     * @memberof ITemplateReducerState
     */
    taskPaneVisible: boolean;
    /**
     * Indicates if the legend is visible
     *
     * @type {boolean}
     * @memberof ITemplateReducerState
     */
    legendVisible: boolean;
    /**
     * Indicates if the selection panel is visible
     *
     * @type {boolean}
     * @memberof ITemplateReducerState
     */
    selectionPanelVisible: boolean;
}

export type MapLoadIndicatorPositioning = "top" | "bottom";

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
     * @memberof IConfigurationReducerState
     */
    agentUri: string | undefined;
    /**
     * The type of agent
     *
     * @type {ClientKind}
     * @memberof IConfigurationReducerState
     */
    agentKind: ClientKind;
    /**
     * The current locale
     *
     * @type {string}
     * @memberof IConfigurationReducerState
     */
    locale: string;
    /**
     * The current active map name
     *
     * @type {(string | undefined)}
     * @memberof IConfigurationReducerState
     */
    activeMapName: string | undefined;
    /**
     * The array of available runtime maps
     *
     * @type {(INameValuePair[] | undefined)}
     * @memberof IConfigurationReducerState
     */
    availableMaps: INameValuePair[] | undefined;
    /**
     * Coordinate display configuration
     *
     * @type {ICoordinateConfiguration}
     * @memberof IConfigurationReducerState
     */
    coordinates: ICoordinateConfiguration;
    /**
     * Viewer capabilities
     *
     * @type {IViewerCapabilities}
     * @memberof IConfigurationReducerState
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
     * @memberof IConfigurationReducerState
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
        /**
         * The position of the map loading indicator
         * 
         * @type {MapLoadIndicatorPositioning}
         */
        loadIndicatorPositioning: MapLoadIndicatorPositioning;
        /**
         * The color of the map loading indicator. This is an valid CSS color expression
         * 
         * @type {string}
         */
        loadIndicatorColor: string;
    },
    /**
     * Indicates if view rotation is enabled
     * 
     * @type {boolean}
     * @memberof IConfigurationReducerState
     */
    viewRotationEnabled: boolean;
    /**
     * The current view rotation
     * 
     * @type {number}
     * @memberof IConfigurationReducerState
     */
    viewRotation: number;
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
     * @memberof InitError
     */
    message: string;
    /**
     * The error stack trace
     *
     * @type {string[]}
     * @memberof InitError
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
     * @memberof IInitErrorReducerState
     */
    error: InitError | undefined;
    /**
     * The initialization options
     *
     * @type {*}
     * @memberof IInitErrorReducerState
     */
    options: any;
    /**
     * Indicates if the stack trace should be shown
     *
     * @type {boolean}
     * @memberof IInitErrorReducerState
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
     * @memberof IViewerReducerState
     */
    busyCount: number,
    /**
     * The active map tool
     *
     * @type {ActiveMapTool}
     * @memberof IViewerReducerState
     */
    tool: ActiveMapTool,
    /**
     * Indicates if feature tooltips are enabled
     *
     * @type {boolean}
     * @memberof IViewerReducerState
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
     * @memberof IMouseReducerState
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
     * @type {Readonly<IInitErrorReducerState>}
     * @memberof IApplicationState
     */
    initError: Readonly<IInitErrorReducerState>;
    /**
     * Viewer configuration
     *
     * @type {Readonly<IConfigurationReducerState>}
     * @memberof IApplicationState
     */
    config: Readonly<IConfigurationReducerState>;
    /**
     * Current template state
     *
     * @type {Readonly<ITemplateReducerState>}
     * @memberof IApplicationState
     */
    template: Readonly<ITemplateReducerState>;
    /**
     * Viewer state
     *
     * @type {Readonly<IViewerReducerState>}
     * @memberof IApplicationState
     */
    viewer: Readonly<IViewerReducerState>;
    /**
     * Runtime map state
     *
     * @type {Readonly<IBranchedMapState>}
     * @memberof IApplicationState
     */
    mapState: Readonly<IBranchedMapState>;
    /**
     * Toolbar state
     *
     * @type {Readonly<IToolbarReducerState>}
     * @memberof IApplicationState
     */
    toolbar: Readonly<IToolbarReducerState>;
    /**
     * Task Pane component state
     *
     * @type {Readonly<ITaskPaneReducerState>}
     * @memberof IApplicationState
     */
    taskpane: Readonly<ITaskPaneReducerState>;
    /**
     * Modal dialog state
     *
     * @type {Readonly<IModalReducerState>}
     * @memberof IApplicationState
     */
    modal: Readonly<IModalReducerState>;
    /**
     * Tracked mouse coordinate state
     *
     * @type {Readonly<IMouseReducerState>}
     * @memberof IApplicationState
     */
    mouse: Readonly<IMouseReducerState>;
    /**
     * Tracks the last dispatched action
     *
     * @type {*}
     * @memberof IApplicationState
     */
    lastaction: any;
}

// Redux typedefs to tighten up our redux code

/**
 * Defines a redux action payload
 *
 * @export
 * @interface ReduxAction
 */
export interface ReduxAction {
    /**
     * The type of action
     *
     * @type {string}
     * @memberof ReduxAction
     */
    type: string;
    /**
     * The action payload
     *
     * @type {*}
     * @memberof ReduxAction
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
     * @returns {Readonly<IApplicationState>}
     *
     * @memberof ReduxStore
     */
    getState(): Readonly<IApplicationState>;
}

/**
 * Describes a thunked redux action. Thunked redux actions are generally used for actions that push state
 * asynchronously (eg. In response to an AJAX request)
 */
export type ReduxThunkedAction = (dispatch: ReduxDispatch, getState: () => Readonly<IApplicationState>) => any;

/**
 * Describes a redux action creator
 */
export type ReduxActionCreator = ReduxAction | ReduxThunkedAction | Action;

/**
 * Describes a redux dispatcher function. A redux dispatch pushes new state to the redux store
 */
export type ReduxDispatch = Dispatch<any>;//(action: ReduxActionCreator) => void;

/**
 * A function that does nothing
 *
 * @export
 */
export function NOOP() { }

/**
 * A function that always returns false
 *
 * @export
 * @returns false
 */
export function ALWAYS_FALSE() { return false; }

/**
 * A function that always returns true
 *
 * @export
 * @returns true
 */
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
     * @memberof IDOMElementMetrics
     */
    posX: number;
    /**
     * The Y position of this element
     *
     * @type {number}
     * @memberof IDOMElementMetrics
     */
    posY: number;
    /**
     * The width of this element
     *
     * @type {number}
     * @memberof IDOMElementMetrics
     */
    width: number;
    /**
     * The height of this element
     *
     * @type {number}
     * @memberof IDOMElementMetrics
     */
    height: number;
    /**
     * Indicates of this toolbar is vertically-oriented
     *
     * @type {boolean}
     * @memberof IDOMElementMetrics
     */
    vertical?: boolean;
}

/**
 * Helper function to get the initial map view from the application state
 *
 * @export
 * @param {Readonly<IApplicationState>} state
 * @returns {(IMapView | undefined)}
 */
export function getInitialView(state: Readonly<IApplicationState>): IMapView | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].initialView;
    }
    return undefined;
}

/**
 * Helper function to get the current selection set from the application state
 *
 * @export
 * @param {Readonly<IApplicationState>} state
 * @returns {(QueryMapFeaturesResponse | undefined)}
 */
export function getSelectionSet(state: Readonly<IApplicationState>): QueryMapFeaturesResponse | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].selectionSet;
    }
    return undefined;
}

/**
 * Helper function to get the current runtime map state from the application state
 *
 * @export
 * @param {Readonly<IApplicationState>} state
 * @returns {(RuntimeMap | undefined)}
 */
export function getRuntimeMap(state: Readonly<IApplicationState>): RuntimeMap | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].runtimeMap;
    }
    return undefined;
}

/**
 * Helper function to get the current view from the application state
 *
 * @export
 * @param {Readonly<IApplicationState>} state
 * @returns {(IMapView | undefined)}
 */
export function getCurrentView(state: Readonly<IApplicationState>): IMapView | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].currentView;
    }
    return undefined;
}

/**
 * Helper function to get the current set of available external base layers from the application state
 *
 * @export
 * @param {Readonly<IApplicationState>} state
 * @returns {(IExternalBaseLayer[] | undefined)}
 */
export function getExternalBaseLayers(state: Readonly<IApplicationState>): IExternalBaseLayer[] | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].externalBaseLayers;
    }
    return undefined;
}

/**
 * Defines the visibility of flyout menus
 */
export type FlyoutVisibilitySet = { [flyoutId: string]: boolean | undefined };