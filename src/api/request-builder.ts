import { SelectionVariant } from './common';
import { ResourceIdentifier, ResourceBase, SiteVersionResponse } from './contracts/common';
import { RuntimeMap } from './contracts/runtime-map';
import { QueryMapFeaturesResponse } from './contracts/query';

/**
 * Describes a request that takes either a session or username/password pair
 *
 *
 * @interface IAuthenticatedRequest
 */
export interface IAuthenticatedRequest {
    /**
     * The session id
     *
     * @type {string}
     *
     */
    session?: string;
    /**
     * The username
     *
     * @type {string}
     *
     */
    username?: string;
    /**
     * The password
     *
     * @type {string}
     *
     */
    password?: string;
}

/**
 * Bitmask describing what data to return when creating a runtime map
 *
 *
 * @enum {number}
 */
export enum RuntimeMapFeatureFlags {
    /**
     * Include data about layers and groups
     */
    LayersAndGroups = 1,
    /**
     * Include layer icons
     */
    LayerIcons = 2,
    /**
     * Include data about layer feature sources
     */
    LayerFeatureSources = 4
}

/**
 * Describes options for creating a runtime map
 *
 *
 * @interface ICreateRuntimeMapOptions
 * @extends {IAuthenticatedRequest}
 */
export interface ICreateRuntimeMapOptions extends IAuthenticatedRequest {
    /**
     * The map definition id
     *
     * @type {ResourceIdentifier}
     *
     */
    mapDefinition: ResourceIdentifier;
    /**
     * A bitmask indicating what data to return
     *
     * @type {(number | RuntimeMapFeatureFlags)}
     *
     */
    requestedFeatures: number | RuntimeMapFeatureFlags;
    /**
     * If requesting icons, the number of icons per scale range
     *
     * @type {number}
     *
     */
    iconsPerScaleRange?: number;
    /**
     * The image format for requested icons
     *
     * @type {("PNG" | "PNG8" | "GIF" | "JPG")}
     *
     */
    iconFormat?: "PNG" | "PNG8" | "GIF" | "JPG";
    /**
     * The width of requested icons
     *
     * @type {number}
     *
     */
    iconWidth?: number;
    /**
     * The height of requested icons
     *
     * @type {number}
     *
     */
    iconHeight?: number;
    /**
     * The target map name to assign. Otherwise the map name will be computed from the map definition id
     *
     * @type {string}
     *
     */
    targetMapName?: string;
}

/**
 * Describes operations requiring a session id
 *
 *
 * @interface ISessionBasedRequest
 */
export interface ISessionBasedRequest {
    /**
     * The session id
     *
     * @type {string}
     */
    session: string;
}

/**
 * Describes operations against a runtime map
 *
 *
 * @interface IRuntimeMapRequest
 * @extends {ISessionBasedRequest}
 */
export interface IRuntimeMapRequest extends ISessionBasedRequest {
    /**
     * The name of the runtime map
     *
     * @type {string}
     */
    mapname: string;
}

/**
 * A bitmask indicating what to return when querying map features
 *
 *
 * @enum {number}
 */
export enum QueryFeaturesSet {
    /**
     * Include attributes of selected features
     */
    Attributes = 1,
    /**
     * Include an inline image of the selected features
     */
    InlineSelection = 2,
    /**
     * Include tooltips for the first matching feature
     */
    Tooltip = 4,
    /**
     * Include hyperlink for the first matching feature
     */
    Hyperlink = 8
}



/**
 * Options for querying map features
 *
 *
 * @interface IQueryMapFeaturesOptions
 * @extends {IRuntimeMapRequest}
 */
export interface IQueryMapFeaturesOptions extends IRuntimeMapRequest {
    /**
     * A comma-seperated list of layer name to restrict the query on. Omit to
     * cover all selectable layers
     *
     * @type {string}
     */
    layernames?: string;
    /**
     * The WKT of the query geometry
     *
     * @type {string}
     */
    geometry?: string;
    /**
     * The spatial query operator to use with the input geometry
     *
     * @type {SelectionVariant}
     */
    selectionvariant?: SelectionVariant;
    /**
     * A bitmask containing what features to ask for
     *
     * @type {QueryFeaturesSet}
     */
    requestdata?: QueryFeaturesSet;
    /**
     * The color of the selection
     *
     * @type {string}
     */
    selectioncolor?: string;
    /**
     * The image format of the requested selection image
     *
     * @type {("PNG" | "JPG" | "GIF" | "PNG8")}
     */
    selectionformat?: "PNG" | "JPG" | "GIF" | "PNG8";
    /**
     * The maximum number of features to select. Use -1 for no limit.
     *
     * @type {number}
     */
    maxfeatures?: number;
    /**
     * 1 = Persist the query selection changes to the current selection set
     * 0 = The query selection does not modify the current selection set
     *
     * @type {number}
     */
    persist?: number;
    /**
     * An optional selection XML string. If specified, the rendering/query will be based off of
     * a selection initialized with this selection XML
     */
    featurefilter?: string;
    layerattributefilter?: number;
}

/**
 * Options for describing a runtime map
 *
 *
 * @interface IDescribeRuntimeMapOptions
 * @extends {IRuntimeMapRequest}
 */
export interface IDescribeRuntimeMapOptions extends IRuntimeMapRequest {
    /**
     * A bitmask of data to return about a runtime map
     *
     * @type {(number | RuntimeMapFeatureFlags)}
     *
     */
    requestedFeatures?: number | RuntimeMapFeatureFlags;
    /**
     * If requesting icons, the number of icons per scale range
     *
     * @type {number}
     *
     */
    iconsPerScaleRange?: number;
    /**
     * The image format for requested icons
     *
     * @type {("PNG" | "PNG8" | "GIF" | "JPG")}
     *
     */
    iconFormat?: "PNG" | "PNG8" | "GIF" | "JPG";
    /**
     * The width of requested icons
     *
     * @type {number}
     *
     */
    iconWidth?: number;
    /**
     * The height of requested icons
     *
     * @type {number}
     *
     */
    iconHeight?: number;
}

/**
 * Provides client services for a MapGuide map viewer
 *
 *
 * @interface IMapGuideClient
 */
export interface IMapGuideClient {
    /**
     * Creates a new MapGuide session
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>}
     */
    createSession(username: string, password: string): Promise<string>;

    /**
     * Retrieves the requested resource
     *
     * @abstract
     * @template T
     * @param {string} resourceId
     * @returns {PromiseLike<T>}
     */
    getResource<T extends ResourceBase>(resourceId: ResourceIdentifier, args?: any): Promise<T>;

    /**
     * Creates a runtime map from the specified map definition
     *
     * @abstract
     * @param {ICreateRuntimeMapOptions} options
     * @returns {PromiseLike<RuntimeMap>}
     */
    createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap>;

    /**
     * Performs a map selection query on the current map
     *
     * @abstract
     * @param {IQueryMapFeaturesOptions} options
     * @returns {PromiseLike<QueryMapFeaturesResponse>}
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse>;

    /**
     * Performs a map selection query on the current map. Only applicable for use with MapGuide
     * Open Source 4.0 and higher
     *
     * @abstract
     * @param {IQueryMapFeaturesOptions} options
     * @returns {PromiseLike<QueryMapFeaturesResponse>}
     */
    queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse>;

    /**
     * Describes a runtime map
     *
     * @abstract
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {PromiseLike<RuntimeMap>}
     */
    describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap>;

    /**
     * Gets the tile template URL used by the viewer to send tile requests
     *
     * @param {string} resourceId
     * @param {string} groupName
     * @param {string} xPlaceholder
     * @param {string} yPlaceholder
     * @param {string} zPlaceholder
     * @param {boolean} isXYZ
     * @returns {string}
     * 
     * @since 0.14.8 added isXYZ parameter
     */
    getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string, isXYZ: boolean): string;
}

/**
 * An abstract MapGuide service client
 *
 *
 * @abstract
 * @class RequestBuilder
 */
export abstract class RequestBuilder implements IMapGuideClient {
    protected agentUri: string;
    constructor(agentUri: string) {
        this.agentUri = agentUri;
    }

    public abstract createSession(username: string, password: string): Promise<string>;

    public abstract getServerSessionTimeout(session: string): Promise<number>;

    public abstract getResource<T extends ResourceBase>(resourceId: ResourceIdentifier, args?: any): Promise<T>;

    public abstract createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap>;

    public abstract createRuntimeMap_v4(options: ICreateRuntimeMapOptions): Promise<RuntimeMap>;

    public abstract queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse>;

    public abstract queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse>;

    public abstract describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap>;

    public abstract describeRuntimeMap_v4(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap>;

    public abstract getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string, isXYZ: boolean): string;

    public abstract getSiteVersion(): Promise<SiteVersionResponse>;
}