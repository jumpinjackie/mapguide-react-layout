import { ResultColumnSet } from "./contracts/weblayout";
import { RuntimeMap } from "./contracts/runtime-map";
import { FeatureSet, LayerMetadata, QueryMapFeaturesResponse, SelectedFeature } from "./contracts/query";
import { IQueryMapFeaturesOptions } from './request-builder';

import olPoint from "ol/geom/Point";
import olLineString from "ol/geom/LineString";
import olCircle from "ol/geom/Circle";
import olPolygon from "ol/geom/Polygon";
import olGeometry from "ol/geom/Geometry";

import olLayerBase from "ol/layer/Base";
import olInteraction from "ol/interaction/Interaction";
import olOverlay from "ol/Overlay";

import { IOLFactory } from "./ol-factory";
import { ViewerAction, IGenericSubjectMapLayer, IInitialExternalLayer, ISelectedFeaturePopupTemplateConfiguration } from '../actions/defs';
import { ProjectionLike } from 'ol/proj';
import { IParsedFeatures } from './layer-manager/parsed-features';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import { ISubscriberProps } from '../containers/subscriber';
import Geometry from 'ol/geom/Geometry';
import { IBasicPointCircleStyle, IPointIconStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IVectorLayerStyle, IClusterSettings, ClusterClickAction, IHeatmapSettings } from './ol-style-contracts';
import { IToolbarAppState } from './registry/command';
import { ClientSelectionSet } from "./contracts/common";

// Event boilerplate
export type GenericEvent = any;

export type GenericEventHandler = (e: GenericEvent) => void;

/**
 * Defines a size
 */
export type Size = { w: number, h: number };

/**
 * The default blank size
 */
export const BLANK_SIZE: Size = { w: 1, h: 1 } as const;

/**
 * @deprecated Use UnitOfMeasure enum instead
 */
export type UnitName = 'Unknown' | 'Inches' | 'Feet' | 'Yards' | 'Miles' | 'Nautical Miles'
    | 'Millimeters' | 'Centimeters' | 'Meters' | 'Kilometers'
    | 'Degrees' | 'Decimal Degrees' | 'Degrees Minutes Seconds' | 'Pixels';
export enum UnitOfMeasure {
    /**
     * An unknown unit
     */
    Unknown = 0,
    /**
     * Inch unit
     */
    Inches = 1,
    /**
     * Feet unit
     */
    Feet = 2,
    /**
     * Yard unit
     */
    Yards = 3,
    /**
     * Mile unit
     */
    Miles = 4,
    /**
     * Nautical Mile unit
     */
    NauticalMiles = 5,
    /**
     * Millimeter unit
     */
    Millimeters = 6,
    /**
     * Centimeter unit
     */
    Centimeters = 7,
    /**
     * Meter unit
     */
    Meters = 8,
    /**
     * Kilometer unit
     */
    Kilometers = 9,
    /**
     * Degree unit
     */
    Degrees = 10,
    /**
     * Decimal Degree unit
     */
    DecimalDegrees = 11,
    /**
     * DMS unit
     */
    DMS = 12,
    /**
     * Pixel unit
     */
    Pixels = 13,
}

export interface UnitInfo {
    unitsPerMeter: number;
    metersPerUnit: number;
    name: UnitName;
    /**
     * @since 0.12.2
     */
    localizedName: (locale?: string) => string;
    abbreviation: (locale?: string) => string;
}

/**
 * Describes a map view
 * 
 * @interface IMapView
 */
export interface IMapView {
    /**
     * The x coordinate
     *
     * @type {number}
     *
     */
    x: number;
    /**
     * The Y coordinate
     *
     * @type {number}
     *
     */
    y: number;
    /**
     * The scale
     *
     * @type {number}
     *
     */
    scale: number;
    /**
     * The view resolution
     * 
     * @type {number | undefined}
     *
     */
    resolution?: number;
}

/**
 * Describes a function that is called when a command is invoked
 * 
 * @since 0.15 stronger-typed parameters
 */
export type DispatcherFunc = (dispatch: ReduxDispatch, getState: () => Readonly<IApplicationState>, viewer?: IMapViewer, parameters?: Record<string, unknown>) => any;

/**
 * Describes a viewer command
 *
 * @interface ICommand
 */
export interface ICommand {
    /**
     * The icon for this command
     *
     * @type {string}
     *
     */
    icon?: string;
    iconClass?: string;
    //tooltip?: string;
    /**
     * @since 0.12.8
     */
    title?: string;
    /**
     * Indicates if this command is enabled based on the given application state
     *
     *
     *
     */
    enabled: (state: Readonly<IToolbarAppState>, parameters?: any) => boolean;
    /**
     * Indicates if this command is enabled based on the given application state
     *
     *
     *
     */
    selected: (state: Readonly<IToolbarAppState>) => boolean;
    /**
     * Invokes the command
     *
     * @type {DispatcherFunc}
     *
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
 * @interface IInvokeUrlCommandParameter
 */
export interface IInvokeUrlCommandParameter {
    /**
     * The name of the parameter
     *
     * @type {string}
     *Parameter
     */
    name: string;
    /**
     * The value of the parameter
     *
     * @type {string}
     *Parameter
     */
    value: string;
}

/**
 * Describes a command that will run in a pre-defined target frame or window
 *
 * @interface ITargetedCommand
 */
export interface ITargetedCommand {
    /**
     * Specifies the target which the URL should be invoked in
     *
     * @type {CommandTarget}
     *
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
 * @interface IInvokeUrlCommand
 */
export interface IInvokeUrlCommand extends ITargetedCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     *
     */
    icon?: string;
    iconClass?: string;
    /**
     * @since 0.12.8
     */
    title?: string;
    /**
     * The URL to invoke
     *
     * @type {string}
     *
     */
    url: string;
    /**
     * Indicates whether to disable this command if there is no map selection
     *
     * @type {boolean}
     *
     */
    disableIfSelectionEmpty?: boolean;
    /**
     * Additional command parameters
     *
     */
    parameters: IInvokeUrlCommandParameter[];
}

/**
 * Describes a search command
 *
 * @interface ISearchCommand
 */
export interface ISearchCommand extends ITargetedCommand {
    /**
     * The icon for this command
     *
     * @type {string}
     *
     */
    icon?: string;
    iconClass?: string;
    /**
     * The name of the map layer this commmand applies to
     *
     * @type {string}
     *
     */
    layer: string;
    /**
     * The prompt to display in the search command UI
     *
     * @type {string}
     *
     */
    prompt: string;
    /**
     * The title to display in the search command UI
     *
     * @type {string}
     *
     */
    title: string;
    /**
     * The set of feature properties to show in the search results
     *
     * @type {ResultColumnSet}
     *
     */
    resultColumns: ResultColumnSet;
    /**
     * The search filter to apply based on user input
     *
     * @type {string}
     *
     */
    filter?: string;
    /**
     * The maximum number of results to return
     *
     * @type {number}
     *
     */
    matchLimit: number;
}

/**
 * Type alias for a dictionary-like structure
 */
export type Dictionary<T> = { [key: string]: T };

/**
 * A 2d coordinate (renamed to Coordinate2D from Coordinate in 0.13)
 */
export type Coordinate2D = [number, number];

/**
 * A size quantity
 * @since 0.13
 */
export type Size2 = [number, number];

/**
 * A bounding box array
 */
export type Bounds = [number, number, number, number];

/**
 * An active map viewer tool
 *
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
 * @interface IExternalBaseLayer
 */
export interface IExternalBaseLayer {
    /**
     * The name of the external base layer
     *
     * @type {string}
     *
     */
    name: string;
    /**
     * The kind of external base layer
     *
     * @type {string}
     *
     */
    kind: string;
    /**
     * Indicates if this external base layer is visible
     *
     * @type {boolean}
     *
     */
    visible?: boolean;
    /**
     * Additional options for initializing the external base layer
     *
     * @type {*}
     *
     */
    options?: any;
}


/**
 * Describes a menu entry on the Map Menu component
 * 
 * @interface IMapMenuEntry
 */
export interface IMapMenuEntry {
    /**
     * The runtime map name
     *
     * @type {string}
     *
     */
    mapName: string;
    /**
     * The menu entry label
     *
     * @type {string}
     *
     */
    label: string;
}

/**
 * A bit mask indicating how a map viewer should refresh
 *
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
 * The spatial operator to use for selection operations
 */
export type SelectionVariant = "INTERSECTS" | "TOUCHES" | "WITHIN" | "ENVELOPEINTERSECTS";

/**
 * MapGuide-specific viewer functionality
 *
 * @interface IMapGuideViewerSupport
 * @since 0.14
 */
export interface IMapGuideViewerSupport {
    /**
     * Sets the selection XML
     *
     * @param {string} xml
     * @param {IQueryMapFeaturesOptions} [queryOpts]
     * @param {(res: QueryMapFeaturesResponse) => void} [success]
     * @param {(err: Error) => void} [failure]
     *
     *er
     */
    setSelectionXml(xml: string, queryOpts?: Partial<IQueryMapFeaturesOptions>, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Clears the map selection
     *
     *
     *er
     */
    clearSelection(): void;
    /**
     * Performs a map selection by the given geometry
     *
     * @param {olGeometry} geom The geometry to select with
     * @param {SelectionVariant} selectionMethod The selection method
     *er
     */
    selectByGeometry(geom: olGeometry, selectionMethod?: SelectionVariant): void;
    /**
     * Performs a map selection by the given query options
     *
     * @param {IQueryMapFeaturesOptions} options
     * @param {(res: QueryMapFeaturesResponse) => void} [success]
     * @param {(err: Error) => void} [failure]
     *
     *er
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void;
    /**
     * Gets the current selection model
     *
     * @returns {QueryMapFeaturesResponse}
     *
     *er
     */
    getSelection(): QueryMapFeaturesResponse | null;
    /**
     * Gets the current selection model as a selection XML string
     *
     * @param {FeatureSet} selection
     * @param {string[]} [layerIds]
     * @returns {string}
     *
     *er
     */
    getSelectionXml(selection: FeatureSet, layerIds?: string[]): string;
    /**
     * Gets the current session id
     * 
     * @returns {string}
     *er
     */
    getSessionId(): string;
    /**
     * Gets whether feature tooltips are enabled
     *
     * @returns {boolean}
     *
     *er
     */
    isFeatureTooltipEnabled(): boolean;
    /**
     * Enables/disables feature tooltips
     *
     * @param {boolean} enabled
     *
     *er
     */
    setFeatureTooltipEnabled(enabled: boolean): void;
}

/**
 * Map image export options
 *
 * @interface IMapImageExportOptions
 * @since 0.14
 */
export interface IMapImageExportOptions {
    /**
     * The size of the image to export. If not specified, it will use the map's current size
     *
     * @type {Size2}
     *
     */
    size?: Size2;
    /**
     * The type to export the mime type as. If not specified, it will default to PNG (image/png)
     *
     * @type {string}
     *
     */
    exportMimeType?: string;
    /**
     * The callback that will receive the content of the exported map image
     *
     *
     */
    callback: (imageBase64: string) => void;
}

/**
 * Describes the API for interacting with the map viewer
 *
 * @interface IMapViewer
 */
export interface IMapViewer {
    /**
     * Gets MapGuide-specific viewer functionality. If this viewer was not set up with MapGuide support, this is undefined
     *
     * @returns {(IMapGuideViewerSupport | undefined)}
     *er
     * @since 0.14
     */
    mapguideSupport(): IMapGuideViewerSupport | undefined;
    /**
     * Gets the projection of the map
     *
     * @returns {ol.ProjectionLike}
     *
     *er
     */
    getProjection(): ProjectionLike;
    /**
     * Gets the view for the given extent
     *
     * @param {Bounds} extent
     * @returns {IMapView}
     *
     *er
     * @since 0.14 If given an extent with zero-width or zero-height, the view will be computed off of an "inflated" version of this extent. If inflation is required, it will be inflated by 30 meters
     */
    getViewForExtent(extent: Bounds): IMapView;
    /**
     * Gets the current extent
     *
     * @returns {Bounds}
     *
     *er
     */
    getCurrentExtent(): Bounds;
    /**
     * Gets the current map view
     *
     * @returns {IMapView}
     *
     *er
     */
    getCurrentView(): IMapView;
    /**
     * Gets the current physical size of the map
     *
     * @returns {[number, number]}
     *
     *er
     */
    getSize(): [number, number];
    /**
     * Zooms to the specified map view
     *
     * @param {number} x
     * @param {number} y
     * @param {number} scale
     *
     *er
     */
    zoomToView(x: number, y: number, scale: number): void;
    /**
     * Refreshes the map
     *
     * @param {RefreshMode} [mode]
     *
     *er
     */
    refreshMap(mode?: RefreshMode): void;
    /**
     * Gets the meters per unit value
     *
     * @returns {number}
     *
     *er
     */
    getMetersPerUnit(): number;
    /**
     * Sets the active tool
     *
     * @param {ActiveMapTool} tool
     *
     *er
     */
    setActiveTool(tool: ActiveMapTool): void;
    /**
     * Gets the active tool
     *
     * @returns {ActiveMapTool}
     *
     *er
     */
    getActiveTool(): ActiveMapTool;
    /**
     * Sets the initial map view
     *
     *
     *er
     */
    initialView(): void;
    /**
     * Zooms in or out by the specified delta
     *
     * @param {number} delta
     *
     *er
     */
    zoomDelta(delta: number): void;
    /**
     * Gets whether the viewer is currently in the state of digitizing
     *
     * @returns {boolean}
     *
     *er
     */
    isDigitizing(): boolean;
    /**
     * Cancels active digitization
     *
     *er
     */
    cancelDigitization(): void;
    /**
     * Starts the digitization process for a point
     *
     * @param {DigitizerCallback<olPoint>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizePoint(handler: DigitizerCallback<olPoint>, prompt?: string): void;
    /**
     * Starts the digitization process for a line
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizeLine(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a line string
     *
     * @param {DigitizerCallback<olLineString>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizeLineString(handler: DigitizerCallback<olLineString>, prompt?: string): void;
    /**
     * Starts the digitization process for a circle
     *
     * @param {DigitizerCallback<olCircle>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizeCircle(handler: DigitizerCallback<olCircle>, prompt?: string): void;
    /**
     * Starts the digitization process for a rectangle
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizeRectangle(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Starts the digitization process for a polygon
     *
     * @param {DigitizerCallback<olPolygon>} handler
     * @param {string} [prompt]
     *
     *er
     */
    digitizePolygon(handler: DigitizerCallback<olPolygon>, prompt?: string): void;
    /**
     * Zooms to the specified extent
     *
     * @param {Bounds} extent
     *
     *er
     */
    zoomToExtent(extent: Bounds): void;
    /**
     * Gets the layer manager for the given map. If map name is not specifed
     * it will get the layer manager for the currently active map.
     *
     * @param {string} [mapName]
     * @returns {ILayerManager}
     *er
     * @since 0.12
     */
    getLayerManager(mapName?: string): ILayerManager;
    /**
     * Adds an OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     * @returns {T}
     *
     *er
     */
    addInteraction<T extends olInteraction>(interaction: T): T;
    /**
     * Removes the given OpenLayers interaction
     *
     * @template T
     * @param {T} interaction
     *
     *er
     */
    removeInteraction<T extends olInteraction>(interaction: T): void;
    /**
     * Adds an OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     *er
     */
    addOverlay(overlay: olOverlay): void;
    /**
     * Removes the given OpenLayers overlay
     *
     * @param {olOverlay} overlay
     *
     *er
     */
    removeOverlay(overlay: olOverlay): void;
    /**
     * Adds an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     *er
     */
    addHandler(eventName: string, handler: Function): void;
    /**
     * Removes an event handler for the specified event
     *
     * @param {string} eventName
     * @param {Function} handler
     *
     *er
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
     *er
     */
    getResolution(): number | undefined;
    /**
     * Gets the resolution for the given scale
     *
     * @returns {number}
     *
     *er
     */
    scaleToResolution(scale: number): number;
    /**
     * Gets the name of the current runtime map
     * 
     * @returns {string} 
     *er
     */
    getMapName(): string;
    /**
     * Sets the current view rotation
     * 
     * @param {number} rotation 
     *er
     */
    setViewRotation(rotation: number): void;
    /**
     * Gets the current view rotation
     * 
     * @returns {number} 
     *er
     */
    getViewRotation(): number;
    /**
     * Gets whether view rotation is enabled
     * 
     * @returns {boolean} 
     *er
     */
    isViewRotationEnabled(): boolean;
    /**
     * Sets whether view rotation is enabled or not
     * 
     * @param {boolean} enabled 
     *er
     */
    setViewRotationEnabled(enabled: boolean): void;
    /**
     * 
     * @since 0.11
     * @param {number} x 
     * @param {number} y 
     * @returns {[number, number]} 
     *er
     */
    screenToMapUnits(x: number, y: number): [number, number];

    toastSuccess(icon: string, message: string | JSX.Element): string | undefined;
    toastWarning(icon: string, message: string | JSX.Element): string | undefined;
    toastError(icon: string, message: string | JSX.Element): string | undefined;
    toastPrimary(icon: string, message: string | JSX.Element): string | undefined;
    dismissToast(key: string): void;
    updateSize(): void;

    /**
     * Returns the collection of selected client-side vector features. This collection
     * is observable, so you may hold onto a reference to this collection and subscribe
     * to events on this collection for when new features are added or removed from this collection
     * 
     * @returns {Collection<Feature>}
     *er
     * @since 0.13
     * @since 0.14 - The return value may be undefined if called when the map viewer is detached/disposed/destroyed
     */
    getSelectedFeatures(): Collection<Feature<Geometry>> | undefined;

    /**
     * INTERNAL API. Not for public use
     * @hidden
     */
    addImageLoading(): void;
    /**
     * INTERNAL API. Not for public use
     * @hidden
     */
    addImageLoaded(): void;
    /**
     * EXPERIMENTAL:
     * Adds the given application state subscribers
     * 
     * NOTE: Calling this method will trigger a re-render of the component. Due to this quirk, 
     * calling this method again while a re-render is taking place may cause the subscriber to
     * not actually be registered. Calling this method multiple times in succession is therefore
     * not advised. If you need to add multiple subscribers, pass an array of the subscribers to
     * register in a single method call.
     * 
     * @param props 
     * @since 0.13
     */
    addSubscribers(props: ISubscriberProps[]): string[];
    /**
     * EXPERIMENTAL:
     * Removes application state subscribers of the given names
     * 
     * @param names
     * @since 0.13
     */
    removeSubscribers(names: string[]): boolean;
    /**
     * EXPERIMENTAL:
     * Gets all application state subscriber names
     * 
     * @since 0.13
     */
    getSubscribers(): string[];
    /**
     * Dispatches the given action
     * 
     * @remarks Usage outside of the react component context (eg. Plain HTML Task Pane content) should be used sparingly. In particular
     * you should avoid trying to call this method multiple times in succession. You should call this method once in response to a DOM element
     * event (eg. A button click)
     * @alpha
     * @since 0.13
     */
    dispatch(action: any): void;

    /**
     * Gets the default point circle style
     * @since 0.13
     */
    getDefaultPointCircleStyle(): IBasicPointCircleStyle;

    /**
     * Gets the default point icon style
     * @since 0.13
     */
    getDefaultPointIconStyle(): IPointIconStyle;

    /**
     * Gets the default line style
     * @since 0.13
     */
    getDefaultLineStyle(): IBasicVectorLineStyle;

    /**
     * Gets the default polygon style
     * @since 0.13
     */
    getDefaultPolygonStyle(): IBasicVectorPolygonStyle;

    /**
     * Exports an image of the current map view
     *
     * @param {IMapImageExportOptions} options
     *er
     * @since 0.14
     */
    exportImage(options: IMapImageExportOptions): void;
}

/**
 * WMS layer extension data
 * 
 * @since 0.13
 */
export interface IWmsLayerExtensions {
    type: "WMS";
    getLegendUrl?: (resolution?: number) => string;
}

/**
 * Layer extension data
 * 
 * @since 0.13
 */
export type LayerExtensions = IWmsLayerExtensions;

export interface ILayerInfo {
    /**
     * The name of the layer
     * 
     * @type {string}
     *
    * */
    name: string;
    /**
     * The display name of this layer
     *
     * @type {string}
     *
     * @since 0.14
     */
    displayName: string;
    /**
     * The type of layer
     * 
     * @type {string}
     *
     */
    type: string;
    /**
     * An optional description for the layer
     *
     * @type {string}
     *
     * @since 0.14
     */
    description?: string;
    /**
     * Indicates if this layer is an external layer
     * 
     * @since 0.13
     */
    isExternal: boolean;
    /** 
     * Indicates if this layer is visible
     * 
     * @since 0.13
     */
    visible: boolean;
    /**
     * Indicates if this layer is selectable by the select tool
     * 
     * @since 0.13
     */
    selectable: boolean;
    /**
     * The opacity of this layer
     * 
     * @since 0.13
     * @type {number}
     *
     */
    opacity: number;
    /**
     * Extension data for this layer
     * 
     * @since 0.13
     */
    extensions?: LayerExtensions;
    /**
     * The vector style for this layer. Not applicable for raster layers.
     * 
     * @since 0.13
     * @since 0.14 Changed to IVectorLayerStyle
     */
    vectorStyle?: IVectorLayerStyle;
    /**
     * Cluster style settings
     * @since 0.14
     */
    cluster?: IClusterSettings;
    /**
     * Heatmap settings
     * @since 0.14
     */
    heatmap?: IHeatmapSettings;
    /**
     * The busy worker count of this layer. If greater than 0, the layer
     * is considered to be in the process of loading
     * 
     * @since 0.13
     */
    busyWorkerCount: number;
    /**
     * Metadata attached to the layer
     * 
     * @since 0.14
     *
     */
    metadata?: any;
}

/**
 * Point layer clustering options
 * 
 * @since 0.14
 */
export interface AddVectorLayerClusteringOptions {
    kind: "Cluster";
    /**
     * The distance to use for clustering. Setting this value will create a clustered layer.
     * 
     *  * If {@link clusterDistance} is set, but {@link clusterStyle} is not set, the {@link IAddLayerFromParsedFeaturesOptions.defaultStyle} will be used if set, otherwise the default vector style will be used
     */
    clusterDistance: number;
    /**
     * The style to use for this clustered layer. 
     * 
     *  * If {@link clusterDistance} is not set, this has no effect
     *  * If {@link clusterDistance} is set but this is not set, the {@link IAddLayerFromParsedFeaturesOptions.defaultStyle} will be used if set, otherwise the default vector style will be used
     */
    clusterStyle?: IVectorLayerStyle;
    /**
     * The action to perform when the cluster is clicked
     */
    onClusterClickAction?: ClusterClickAction;
}

/**
 * Theming options
 * @since 0.14
 */
export interface AddVectorLayerThemeOptions {
    kind: "Theme";
    /**
     * Generate a thematic ramp based on the given property
     */
    themeOnProperty: string;
    /**
     * The colorbrewer theme to apply
     */
    colorBrewerTheme: string;
}

/**
 * Heatmap options
 * @since 0.14
 */
export interface AddVectorLayerHeatmapOptions {
    kind: "Heatmap",
    /**
     * The weight property
     */
    weightProperty?: string;
}

export type AddVectorLayerExtraOptions = AddVectorLayerClusteringOptions | AddVectorLayerThemeOptions | AddVectorLayerHeatmapOptions;

/**
 * Options to add a new layer from parsed features
 *
 * @interface IAddLayerFromParsedFeaturesOptions
 * @since 0.13
 */
export interface IAddLayerFromParsedFeaturesOptions {
    /**
     * The projection to assign for this layer. If not specified, the map's projection
     * is assumed
     */
    projection?: ProjectionLike;
    /**
     * The parsed features to add the layer with
     */
    features: IParsedFeatures;
    /**
     * The style to use for this layer. If not specified, a default style will be assigned
     * to this layer
     * 
     * @since 0.13
     * @since 0.14 changed to IVectorLayerStyle
     */
    defaultStyle?: IVectorLayerStyle;
    /**
     * Extra options for the layer to be added
     * @since 0.14
     */
    extraOptions?: AddVectorLayerExtraOptions;
    /**
     * The property to use for labeling
     * @since 0.14
     */
    labelOnProperty?: string;
    /**
     * The popup template to use when features are selected on this layer
     * @since 0.14
     */
    selectedPopupTemplate?: ISelectedFeaturePopupTemplateConfiguration;
    /**
     * Metadata for this layer
     * @since 0.14
     */
    metadata?: any;
    /**
     * A definition to attach to this layer. This definition is application-defined and is primarily to
     * assist the application in implementing persistence/restoration of this layer on an application-defined
     * basis 
     * @since 0.14.3
     */
    defn?: any;
}

/**
 * Options for parsing features from a file
 *
 * @interface IParseFeaturesFromFileOptions
 * @since 0.13
 */
export interface IParseFeaturesFromFileOptions {
    file: File;
    name: string;
    locale: string;
}

/**
 * Manages custom layers for a map
 *
 * @interface ILayerManager
 */
export interface ILayerManager {
    /**
     * Get the active subject layer if present on the current map. In a MapGuide-specific context, subject layers do not exist
     * and this method will always return undefined in such cases
     *
     * @returns {olLayerBase}
     *
     * @since 0.14
     */
    tryGetSubjectLayer(): olLayerBase | undefined;
    /**
     * Gets all custom layers on this map, sorted by draw order (First item is top-most layer. Last item is bottom-most layer.)
     * 
     * @returns {ILayerInfo[]} 
     *
    * */
    getLayers(): ILayerInfo[];
    /**
     * Gets whether the specified custom layer exists on the map
     */
    hasLayer(name: string): boolean;
    /**
     * Adds a layer to the map
     * 
     * @template T 
     * @param {string} name The name of the layer
     * @param {T} layer The layer object
     * @param {boolean} [allowReplace] If false or not set, this method will throw an error if a layer of the specified name already exists. Otherwise that layer will be replaced with the given layer
     * @returns {T} The added layer
     *
     */
    addLayer<T extends olLayerBase>(name: string, layer: T, allowReplace?: boolean): ILayerInfo;
    /**
     * Removes a layer by the given name
     *
     * @param {string} name
     * @returns {(olLayerBase | undefined)}
     *
     *er
     */
    removeLayer(name: string): olLayerBase | undefined;
    /**
     * Gets a layer by the given name
     *
     * @template T
     * @param {string} name
     * @returns {T}
     *
     *er
     */
    getLayer<T extends olLayerBase>(name: string): T | undefined;

    /**
     * Attempts to parse features for the given input file. A failed attempt is when
     * calling hasFeatures() on the returned parsed features returns false.
     * 
     * @param {IParseFeaturesFromFileOptions} options
     * @returns {Promise<IParsedFeatures>}
     *
     * @since 0.13
     */
    parseFeaturesFromFile(options: IParseFeaturesFromFileOptions): Promise<IParsedFeatures>;

    /**
     * Adds the given parsed features as a new external layer
     * 
     * @param {IAddLayerFromParsedFeaturesOptions} options
     * @returns {Promise<ILayerInfo>}
     *
     * @since 0.13
     * @since 0.14 Styles for geometry types not found in the parsed features will be deleted
     */
    addLayerFromParsedFeatures(options: IAddLayerFromParsedFeaturesOptions): Promise<ILayerInfo>;

    /**
     * Applies draw order/opacity/visibility
     * @hidden
     */
    apply(layers: ILayerInfo[]): void;
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
    /**
     * @since 0.14.8 Now optional
     */
    size?: [number, number];
    overflowYScroll?: boolean;
    /**
     * @since 0.14.8
     */
    position?: [number, number];
}

/**
 * The default modal dialog size
 */
export const DEFAULT_MODAL_SIZE: [number, number] = [350, 500];

/**
 * The default modal dialog position
 * @since 0.14.8
 */
export const DEFAULT_MODAL_POSITION: [number, number] = [500, 80];

/**
 * Base modal display options
 *
 * @interface IModalDisplayOptionsBase
 */
export interface IModalDisplayOptionsBase {
    modal: IModalParameters;
    name: string;
}

/**
 * Modal display options for URL content
 *
 * @interface IModalDisplayOptions
 * @extends {IModalDisplayOptionsBase}
 */
export interface IModalDisplayOptions extends IModalDisplayOptionsBase {
    /**
     * The URL of the content to load in the modal dialog
     *
     * @type {string}
     */
    url: string;
}

export interface IModalComponentDisplayOptions extends IModalDisplayOptionsBase {
    /**
     * The id of the component to display
     *
     * @type {string}
     *
     */
    component: string;
    /**
     * Component properties
     *
     * @type {*}
     *
     */
    componentProps?: any;
}

export interface IToolbarReducerState {
    toolbars: any;
    flyouts: any;
}

/**
 * Describes the reducer state branch for Task Pane component
 *
 *
 * @interface ITaskPaneReducerState
 */
export interface ITaskPaneReducerState {
    /**
     * The current navigation index
     *
     * @type {number}
     *
     */
    navIndex: number;
    /**
     * The current navigation history stack
     *
     * @type {string[]}
     *
     */
    navigation: string[];
    /**
     * The initial URL
     *
     * @type {(string | undefined)}
     *
     */
    initialUrl: string | undefined;
    /**
     * The last pushed URL
     *
     * @type {boolean}
     *
     */
    lastUrlPushed: boolean;
}

export type IModalReducerState = {
    /**
     * Gets the modal parameters for the given key
     * 
     * @since 0.14.8 all modal sub-properties now optional
     */
    [key: string]: Omit<IModalDisplayOptions | IModalComponentDisplayOptions, "modal"> & {
        modal: Partial<IModalParameters>;
    }
};

/*
export interface IModalReducerState {

}
*/

/**
 * A set of layer transpareny values by layer name
 */
export type LayerTransparencySet = { [layerName: string]: number };

/**
 * Selection key of an active selected feature
 */
export interface ActiveSelectedFeature {
    /**
     * The selected layer id
     * 
     * @type {string}
     */
    layerId: string;
    /**
     * The selection key of the feature
     * 
     * @type {string}
     */
    selectionKey: string;
}

/**
 * Generic layer sub-state
 *
 *
 * @interface IGenericLayerSubState
 * @since 0.14
 */
export interface IGenericLayerSubState {
    /**
     * The subject layer
     *
     * @type {IGenericSubjectMapLayer}
     */
    subject: IGenericSubjectMapLayer;
}

/**
 * MapGuide-specific map sub-state
 *
 *
 * @interface IMapGuideSubState
 * @since 0.14
 */
export interface IMapGuideSubState {
    /**
     * The runtime map state
     *
     * @type {(RuntimeMap | undefined)}
     *
     */
    runtimeMap: RuntimeMap | undefined;
    /**
     * Indicates if this map is based on an arbitrary coordinate system
     * @since 0.14.3
     */
    isArbitraryCs: boolean;
    /**
     * A set of selectable layer ids
     *
     * @type {*}
     *
     */
    selectableLayers: any;
    /**
     * A set of expanded group ids
     *
     * @type {*}
     *
     */
    expandedGroups: any;
    /**
     * The current MapGuide selection state
     *
     * @type {(QueryMapFeaturesResponse | undefined)}
     *
     */
    selectionSet: QueryMapFeaturesResponse | undefined;
    /**
     * The array of ids of layers to show
     *
     * @type {string[]}
     *
     */
    showLayers: string[];
    /**
     * The array of ids of groups to show
     *
     * @type {string[]}
     *
     */
    showGroups: string[];
    /**
     * The array of ids of layers to hide
     *
     * @type {string[]}
     *
     */
    hideLayers: string[];
    /**
     * The array of ids of groups to hide
     *
     * @type {string[]}
     *
     */
    hideGroups: string[];
    /**
     * Layer transparency settings
     * 
     * @type {{ [layerName: string]: number }}
     *
     */
    layerTransparency: LayerTransparencySet;
    /**
     * The active selected feature to highlight
     * 
     * @type {(ActiveSelectedFeature | undefined)}
     *
     */
    activeSelectedFeature: ActiveSelectedFeature | undefined;
}

/**
 * Describes the reducer state branch for a particular map group
 *
 *
 * @interface IBranchedMapSubState
 */
export interface IBranchedMapSubState {
    /**
     * The external base layers for the map group
     *
     * @type {IExternalBaseLayer[]}
     *
     */
    externalBaseLayers: IExternalBaseLayer[];
    /**
     * Initial external layers. This does not reflect the current state of external layers added. This merely instructs what external layers
     * to pre-load on viewer startup.
     *
     * @type {IInitialExternalLayer[]}
     *
     * @since 0.14
     */
    initialExternalLayers: IInitialExternalLayer[];
    /**
     * The layers in this viewer. First item is top-most layer. Last item is bottom-most layer.
     * @since 0.13
     */
    layers: ILayerInfo[] | undefined;
    /**
     * The current map view
     *
     * @type {(IMapView | undefined)}
     *
     */
    currentView: IMapView | undefined;
    /**
     * The initial map view
     *
     * @type {(IMapView | undefined)}
     *
     */
    initialView: IMapView | undefined;
    /**
     * The view navigation history stack
     *
     * @type {IMapView[]}
     *
     */
    history: IMapView[];
    /**
     * The current position in the view navigation history stack
     *
     * @type {number}
     *
     */
    historyIndex: number;
    /**
     * MapGuide-specific sub-state
     *
     * @type {IMapGuideSubState}
     *
     * @since 0.14
     */
    mapguide: IMapGuideSubState | undefined;
    /**
     * The current client-side selection state
     * 
     * @since 0.14
     */
    clientSelection: ClientSelectionSet | undefined;
    /**
     * Generic layer sub-state
     *
     * @type {(IGenericLayerSubState | undefined)}
     *
     * @since 0.14
     */
    generic: IGenericLayerSubState | undefined;
}

/**
 * The reducer state branch for runtime map state. Map-specific state is keyed on
 * their respective runtime map name as sub-branches on this branch
 *
 *
 * @interface IBranchedMapState
 */
export interface IBranchedMapState {
    [mapName: string]: IBranchedMapSubState;
}

/**
 * Coordinate display configuration
 *
 *
 * @interface ICoordinateConfiguration
 */
export interface ICoordinateConfiguration {
    /**
     * The number of decimal places to show
     *
     * @type {number}
     *
     */
    decimals: number;
    /**
     * The display projection for these coordinates
     * 
     * @type {string}
     *
     */
    projection: string;
    /**
     * Display format string
     * 
     * @type {string}
     *
     */
    format?: string;
}

/**
 * Describes the capabilities of the current view
 *
 *
 * @interface IViewerCapabilities
 */
export interface IViewerCapabilities {
    /**
     * Indicates if this viewer as a Task Pane component mounted
     *
     * @type {boolean}
     *
     */
    hasTaskPane: boolean;
    /**
     * Indicates if the Task Pane on this viewer has a Task Bar
     *
     * @type {boolean}
     *
     */
    hasTaskBar: boolean;
    /**
     * Indicates if this viewer has a status bar
     *
     * @type {boolean}
     *
     */
    hasStatusBar: boolean;
    /**
     * Indicates if this viewer has a zoom slider
     *
     * @type {boolean}
     *
     */
    hasNavigator: boolean;
    /**
     * Indicates if this viewer has a selection panel component mounted
     *
     * @type {boolean}
     *
     */
    hasSelectionPanel: boolean;
    /**
     * Indicates if this viewer has a legend component mounted
     *
     * @type {boolean}
     *
     */
    hasLegend: boolean;
    /**
     * Indicates if this viewer has a primary toolbar mounted
     *
     * @type {boolean}
     *
     */
    hasToolbar: boolean;
    /**
     * Indicates if this viewer has the view size mounted
     * 
     * @type {boolean}
     *
     */
    hasViewSize: boolean;
}

/**
 * Describes a name/value pair
 *
 *
 * @interface INameValuePair
 */
export interface INameValuePair {
    /**
     * The name
     *
     * @type {string}
     *
     */
    name: string;
    /**
     * The value
     *
     * @type {string}
     *
     */
    value: string;
}

/**
 * Describes a redux reducer function
 */
export type ReducerFunction<TState> = (state: TState, action: ViewerAction) => TState;

/**
 * Describes the reducer state branch for the current viewer template
 *
 *
 * @interface ITemplateReducerState
 */
export interface ITemplateReducerState {
    /**
     * The initial width of the information pane. Only certain templates will recognise this setting
     * 
     * @type {number}
     *
     */
    initialInfoPaneWidth: number;
    /**
     * The initial width of the task pane. Only certain templates will recognise this setting
     * 
     * @type {number}
     *
     */
    initialTaskPaneWidth: number;
    /**
     * Indicates if the task pane is visible
     *
     * @type {boolean}
     *
     */
    taskPaneVisible: boolean;
    /**
     * Indicates if the legend is visible
     *
     * @type {boolean}
     *
     */
    legendVisible: boolean;
    /**
     * Indicates if the selection panel is visible
     *
     * @type {boolean}
     *
     */
    selectionPanelVisible: boolean;
    /**
     * If true, the selection panel will auto-display when a selection is made
     * and there are results to show
     * 
     * @since 0.13
     */
    autoDisplaySelectionPanelOnSelection: boolean;

    /**
     * Template-specific data
     * @since 0.14.8
     */
    templateData: Dictionary<any>;
}

/**
 * Signature for a template state reducer function
 * 
 * @since 0.13
 */
export type TemplateReducerFunction = (origState: ITemplateReducerState, currentState: ITemplateReducerState, action: ViewerAction) => ITemplateReducerState;

/**
 * Keyboard code for ESCAPE
 */
export const KC_ESCAPE = 27;

/**
 * Keyboard code for the letter U
 */
export const KC_U = 85;

/**
 * The positioning of the map load indicator
 */
export type MapLoadIndicatorPositioning = "top" | "bottom";

/**
 * Describes the reducer state branch for various configuration properties
 *
 *
 * @interface IConfigurationReducerState
 */
export interface IConfigurationReducerState {
    /**
     * The agent URI
     *
     * @type {(string | undefined)}
     *
     */
    agentUri: string | undefined;
    /**
     * The type of agent
     *
     * @type {ClientKind}
     *
     */
    agentKind: ClientKind;
    /**
     * The current locale
     *
     * @type {string}
     *
     */
    locale: string;
    /**
     * The current active map name
     *
     * @type {(string | undefined)}
     *
     */
    activeMapName: string | undefined;
    /**
     * The array of available runtime maps
     *
     * @type {(INameValuePair[] | undefined)}
     *
     */
    availableMaps: INameValuePair[] | undefined;
    /**
     * Coordinate display configuration
     *
     * @type {ICoordinateConfiguration}
     *
     */
    coordinates: ICoordinateConfiguration;
    /**
     * Viewer capabilities
     *
     * @type {IViewerCapabilities}
     *
     */
    capabilities: IViewerCapabilities;
    /**
     * A dictionary of arbitrary app settings
     * 
     * @since 0.14
     */
    appSettings?: Dictionary<string>;
    /**
     * Viewer configuration
     * 
     *
     */
    viewer: {
        /**
         * Whether this viewer will use stateless MapGuide rendering operations
         * 
         * @since 0.14
         */
        isStateless: boolean;
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
         * The color to use for highlighting active selected features
         * 
         * @type {string}
         */
        activeSelectedFeatureColor: string;
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
     *
     */
    viewRotationEnabled: boolean;
    /**
     * The current view rotation
     * 
     * @type {number}
     *
     */
    viewRotation: number;
    /**
     * The unit to display view size in
     * 
     * @type {UnitOfMeasure}
     *
     */
    viewSizeUnits: UnitOfMeasure;
    /**
     * @since 0.14.2
     */
    selectCanDragPan: boolean;
    /**
     * If specified and true and the MapTip component is active, then feature tooltips are activated
     * by mouse click instead of idle mouse cursor at a given point on the map for a certain period of time. 
     * 
     * An active MapTip component with this setting enabled will override normal click-based selection.
     * 
     * @type {boolean}
     *
     */
    manualFeatureTooltips: boolean;
    /**
     * The key code to listen for cancelling an active digitization
     * 
     * @type {number}
     *
     */
    cancelDigitizationKey: number;
    /**
     * The key code to listen for undoing the last drawn point of an active digitization
     * 
     * @type {number}
     *
     */
    undoLastPointKey: number;
}

/**
 * Describes an error thrown during initialization
 *
 *
 * @interface InitError
 */
export interface InitError {
    /**
     * The error message
     *
     * @type {string}
     *
     */
    message: string;
    /**
     * The error stack trace
     *
     * @type {string[]}
     *
     */
    stack: string[];
}

/**
 * Describes the reducer state branch for initialization errors
 *
 *
 * @interface IInitErrorReducerState
 */
export interface IInitErrorReducerState {
    /**
     * The caught initialization error
     *
     * @type {(InitError | undefined)}
     *
     */
    error: InitError | undefined;
    /**
     * The initialization options
     *
     * @type {*}
     *
     */
    options: any;
    /**
     * Indicates if the stack trace should be shown
     *
     * @type {boolean}
     *
     */
    includeStack: boolean;
    /**
     * Any warnings that were encountered during initialization
     * 
     * @type {string[]}
     *
     */
    warnings: string[];
}

/**
 * Describes the reducer state branch for viewer state
 *
 *
 * @interface IViewerReducerState
 */
export interface IViewerReducerState {
    /**
     * The current size of the map viewport (in pixels)
     * 
     * @type {([number, number] | undefined)}
     *
     */
    size: [number, number] | undefined;
    /**
     * The number of active busy actions. Zero indicates no busy activity. One or more
     * indicates busy activity.
     *
     * @type {number}
     *
     */
    busyCount: number;
    /**
     * The active map tool
     *
     * @type {ActiveMapTool}
     *
     */
    tool: ActiveMapTool;
    /**
     * Indicates if feature tooltips are enabled
     *
     * @type {boolean}
     *
     */
    featureTooltipsEnabled: boolean;
}

/**
 * Describes the reducer state branch for tracked mouse coordinates
 *
 *
 * @interface IMouseReducerState
 */
export interface IMouseReducerState {
    /**
     * The last tracked mouse coordinate
     *
     * @type {(Coordinate2D | undefined)}
     */
    coords: Coordinate2D | undefined;
}

/**
 * Describes the full application state tree. Redux-aware components can connect and subscribe to
 * various properties and branches of this tree and be automatically notified of any changes and
 * update and re-render themselves accordingly
 *
 *
 * @interface IApplicationState
 */
export interface IApplicationState {
    /**
     * Initialization errors
     *
     * @type {Readonly<IInitErrorReducerState>}
     *
     */
    initError: Readonly<IInitErrorReducerState>;
    /**
     * Viewer configuration
     *
     * @type {Readonly<IConfigurationReducerState>}
     *
     */
    config: Readonly<IConfigurationReducerState>;
    /**
     * Current template state
     *
     * @type {Readonly<ITemplateReducerState>}
     *
     */
    template: Readonly<ITemplateReducerState>;
    /**
     * Viewer state
     *
     * @type {Readonly<IViewerReducerState>}
     *
     */
    viewer: Readonly<IViewerReducerState>;
    /**
     * Runtime map state
     *
     * @type {Readonly<IBranchedMapState>}
     *
     */
    mapState: Readonly<IBranchedMapState>;
    /**
     * Toolbar state
     *
     * @type {Readonly<IToolbarReducerState>}
     *
     */
    toolbar: Readonly<IToolbarReducerState>;
    /**
     * Task Pane component state
     *
     * @type {Readonly<ITaskPaneReducerState>}
     *
     */
    taskpane: Readonly<ITaskPaneReducerState>;
    /**
     * Modal dialog state
     *
     * @type {Readonly<IModalReducerState>}
     *
     */
    modal: Readonly<IModalReducerState>;
    /**
     * Tracked mouse coordinate state
     *
     * @type {Readonly<IMouseReducerState>}
     *
     */
    mouse: Readonly<IMouseReducerState>;
    /**
     * Tracks the last dispatched action
     *
     * @type {*}
     *
     */
    lastaction: any;
}

// Redux typedefs to tighten up our redux code

/**
 * Describes the redux store
 *
 *
 * @interface ReduxStore
 */
export interface ReduxStore {
    /**
     * Gets the application state
     *
     * @returns {Readonly<IApplicationState>}
     */
    getState(): Readonly<IApplicationState>;
}

/**
 * Describes a thunked redux action. Thunked redux actions are generally used for actions that push state
 * asynchronously (eg. In response to an AJAX request)
 */
export type ReduxThunkedAction = (dispatch: ReduxDispatch, getState: () => Readonly<IApplicationState>) => any;

/**
 * Describes a redux dispatcher function. A redux dispatch pushes new state to the redux store
 */
export type ReduxDispatch = (action: ViewerAction | ReduxThunkedAction) => void;

/**
 * A function that does nothing
 *
 *
 */
export function NOOP() { }

/**
 * A function that always returns false
 *
 *
 * @returns false
 */
export function ALWAYS_FALSE() { return false; }

/**
 * A function that always returns true
 *
 *
 * @returns true
 */
export function ALWAYS_TRUE() { return true; }

/**
 * Describe the size/dimensions of a DOM element in a toolbar or flyout menu
 *
 *
 * @interface IDOMElementMetrics
 */
export interface IDOMElementMetrics {
    /**
     * The X position of this element
     *
     * @type {number}
     *
     */
    posX: number;
    /**
     * The Y position of this element
     *
     * @type {number}
     *
     */
    posY: number;
    /**
     * The width of this element
     *
     * @type {number}
     *
     */
    width: number;
    /**
     * The height of this element
     *
     * @type {number}
     *
     */
    height: number;
    /**
     * Indicates of this toolbar is vertically-oriented
     *
     * @type {boolean}
     *
     */
    vertical?: boolean;
}

/**
 * Helper function to get the initial map view from the application state
 *
 *
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
 * Helper function to get the mapguide-specific sub state of the current map group
 *
 *
 * @param {Readonly<IApplicationState>} state
 * @returns {(IMapGuideSubState | undefined)}
 * @since 0.14
 */
export function getMapGuideSubState(state: Readonly<IApplicationState>): IMapGuideSubState | undefined {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName].mapguide;
    }
    return undefined;
}

/**
 * Helper function to get the current selection set from the application state
 *
 *
 * @param {Readonly<IApplicationState>} state
 * @returns {(QueryMapFeaturesResponse | undefined)}
 */
export function getSelectionSet(state: Readonly<IApplicationState>): QueryMapFeaturesResponse | undefined {
    return getMapGuideSubState(state)?.selectionSet;
}

/**
 * Helper function to get the current runtime map state from the application state
 *
 *
 * @param {Readonly<IApplicationState>} state
 * @returns {(RuntimeMap | undefined)}
 */
export function getRuntimeMap(state: Readonly<IApplicationState>): RuntimeMap | undefined {
    return getMapGuideSubState(state)?.runtimeMap;
}

/**
 * Helper function to get the current view from the application state
 *
 *
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
 * Determines if the given external base layer is one with a visual representation
 * 
 * @param layer 
 * @returns 
 * @since 0.14.9
 */
export function isVisualBaseLayer(layer: IExternalBaseLayer) {
    return layer.kind != "UTFGrid";
}

/**
 * Helper function to get the current set of available external base layers from the application state
 *
 * @remarks This does not include "non-visual" base layers such as UTFGrid tilesets
 * 
 *
 * @param {Readonly<IApplicationState>} state
 * @returns {(IExternalBaseLayer[] | undefined)}
 * 
 * @since 0.14.9 Removed includeNonVisual parameter
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

/**
 * Defines the capabilities of a WMS service
 * 
 * @since 0.11
 */
export interface WmsCapabilitiesDocument {
    /**
     * WMS service version
     * 
     * @type {string}
     *
     */
    version: string;
    Service: WMSServiceDescription;
    Capability: WMSServiceCapabilities;
}

/**
 * @since 0.11
 */
export interface WMSServiceCapabilities {
    Request: any;
    Exception: string[];
    Layer: WMSRootPublishedLayer;
}

/**
 * @since 0.12
 */
export interface WMSLayerBoundingBox {
    crs: string;
    extent: [number, number, number, number],
    res: [any, any]
}

/**
 * @since 0.11
 */
export interface WMSPublishedLayer {
    Name: string;
    Title: string;
    Abstract: string;
    KeywordList: string;
    CRS: string[];
    EX_GeographicBoundingBox: [number, number, number, number];
    BoundingBox: WMSLayerBoundingBox[];
    Style: WMSLayerStyle[];
    queryable: boolean;
    opaque: boolean;
    noSubsets: boolean;
}

/**
 * @since 0.11
 */
export interface WMSRootPublishedLayer extends WMSPublishedLayer {
    Layer: WMSPublishedLayer[];
}

/**
 * @since 0.12
 */
export interface WMSLegendURLDefinition {
    Format: string;
    OnlineResource: string;
    size: [number, number];
}

/**
 * @since 0.11
 */
export interface WMSLayerStyle {
    Name: string;
    Title: string;
    Abstract: string;
    LegendURL: WMSLegendURLDefinition[];
}

/**
 * @since 0.12
 */
export interface WMSContactAddress {
    AddressType: string,
    Address: string,
    City: string,
    StateOrProvince: string,
    PostCode: string,
    Country: string
}

/**
 * @since 0.12
 */
export interface WMSContact {
    ContactPerson: string;
    ContactOrganization: string;
}

/**
 * @since 0.12
 */
export interface WMSContactInformation {
    ContactPersonPrimary: WMSContact,
    ContactPosition: string,
    ContactAddress: WMSContactAddress,
    ContactVoiceTelephone: string,
    ContactFacsimileTelephone: string,
    ContactElectronicMailAddress: string
}

/**
 * @since 0.11
 */
export interface WMSServiceDescription {
    Name: string;
    Title: string;
    Abstract: string;
    KeywordList: string[];
    OnlineResource: string;
    ContactInformation: WMSContactInformation,
    Fees: string;
    AccessConstraints: string;
}

export interface IMapGuideImageSource {
    on(event: string, handler: Function): void;
    updateParams(params: any): void;
}

/**
 * Custom properties that can be attached to OpenLayers layer instances
 * 
 * @since 0.13
 */
export enum LayerProperty {
    LAYER_TYPE = "layer_type",
    LAYER_NAME = "name",
    /**
     * @since 0.14
     */
    LAYER_DISPLAY_NAME = "display_name",
    IS_GROUP = "is_group",
    IS_EXTERNAL = "is_external",
    IS_SELECTABLE = "is_selectable",
    /**
     * @since 0.14.5
     */
    DISABLE_HOVER = "disable_hover",
    IS_SCRATCH = "is_scratch",
    HAS_WMS_LEGEND = "has_wms_legend",
    VECTOR_STYLE = "vector_style",
    WGS84_BBOX = "wgs84_bbox",
    BUSY_WORKER_COUNT = "busy_worker_count",
    /**
     * @since 0.14
     */
    SELECTED_POPUP_CONFIGURATION = "popup_config",
    /**
     * @since 0.14
     */
    LAYER_DESCRIPTION = "layer_description",
    /**
     * @since 0.14
     */
    LAYER_METADATA = "layer_metadata",
    /**
     * @since 0.14
     */
    IS_HOVER_HIGHLIGHT = "is_hover_highlight",
    /**
     * @since 0.14
     */
    IS_MEASURE = "is_measure",
    /**
     * @since 0.14
     */
    IS_WMS_SELECTION_OVERLAY = "is_wms_selection_overlay",
    /**
     * @since 0.14
     */
    IS_HEATMAP = "is_heatmap",
    /**
     * A source definition to attach to the layer. This is to assist in persistence of this layer for easy
     * restoration on an application-defined basis
     * 
     * @since 0.14.3
     */
    LAYER_DEFN = "layer_defn"
}

/**
 * Custom properties that can be attached to OpenLayers image source instances
 * 
 * @since 0.13
 */
export enum SourceProperty {
    SUPPRESS_LOAD_EVENTS = "suppress_load_events"
}

/**
 * MapGuide layer types
 * 
 * @since 0.13
 */
export enum MgLayerType {
    Untiled = "MapGuide_Untiled",
    Tiled = "MapGuide_Tiled"
}

/**
 * The type name for a MapGuide layer
 * 
 * @since 0.13
 */
export const MG_LAYER_TYPE_NAME = "MapGuide";

/**
 * The default group name for MapGuide tiled layers. This value
 * is not meant for localized display
 * 
 * @since 0.13
 */
export const MG_BASE_LAYER_GROUP_NAME = "Base Tile Layers";

/**
 * Default names for MapGuide built-in layer types. These value
 * are not meant for localized display
 * 
 * @since 0.13
 */
export enum MgBuiltInLayers {
    Overlay = "MapGuide Dynamic Overlay",
    SelectionOverlay = "MapGuide Selection Overlay",
    ActiveFeatureSelectionOverlay = "MapGuide Active Feature Selection Overlay"
}

/**
 * A layer of a {@link ICompositeSelection}
 * 
 * @since 0.14
 */
export interface ICompositeSelectionLayer {
    /**
     * The id of this selection layer
     */
    getLayerId(): string | undefined;
    /**
     * The name of this layer
     */
    getName(): string;
    /**
     * The metadata of this layer
     */
    getLayerMetadata(): LayerMetadata | undefined;
    /**
     * Gets the feature at the given index
     */
    getFeatureAt(featureIndex: number): SelectedFeature;
    /**
     * Gets the total number of features in this layer
     */
    getFeatureCount(): number;
}

/**
 * A composition of a MapGuide selection set and a client-side vector feature selection
 * 
 * @since 0.14
 */
export interface ICompositeSelection {
    /**
     * Gets the number of layers in this selection set
     */
    getLayerCount(): number;
    /**
     * Gets the array of layers in this selection set
     */
    getLayers(): ICompositeSelectionLayer[];
    /**
     * Gets the layer at the specified index
     * 
     * @param layerIndex The selection layer index
     */
    getLayerAt(layerIndex: number): ICompositeSelectionLayer | undefined;
    /**
     * Gets the feature for the given layer at the specified indices
     * 
     * @param layerIndex The selection layer index
     * @param featureIndex The feature index
     */
    getFeatureAt(layerIndex: number, featureIndex: number): SelectedFeature | undefined;
}