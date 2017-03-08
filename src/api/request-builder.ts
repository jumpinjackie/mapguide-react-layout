import * as Contracts from "./contracts";

/**
 * Describes a request that takes either a session or username/password pair
 *
 * @export
 * @interface IAuthenticatedRequest
 */
export interface IAuthenticatedRequest {
    /**
     * The session id
     *
     * @type {string}
     * @memberOf IAuthenticatedRequest
     */
    session?: string;
    /**
     * The username
     *
     * @type {string}
     * @memberOf IAuthenticatedRequest
     */
    username?: string;
    /**
     * The password
     *
     * @type {string}
     * @memberOf IAuthenticatedRequest
     */
    password?: string;
}

/**
 * Bitmask describing what data to return when creating a runtime map
 *
 * @export
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
 * @export
 * @interface ICreateRuntimeMapOptions
 * @extends {IAuthenticatedRequest}
 */
export interface ICreateRuntimeMapOptions extends IAuthenticatedRequest {
    /**
     * The map definition id
     *
     * @type {Contracts.Common.ResourceIdentifier}
     * @memberOf ICreateRuntimeMapOptions
     */
    mapDefinition: Contracts.Common.ResourceIdentifier;
    /**
     * A bitmask indicating what data to return
     *
     * @type {(number | RuntimeMapFeatureFlags)}
     * @memberOf ICreateRuntimeMapOptions
     */
    requestedFeatures: number | RuntimeMapFeatureFlags;
    /**
     * If requesting icons, the number of icons per scale range
     *
     * @type {number}
     * @memberOf ICreateRuntimeMapOptions
     */
    iconsPerScaleRange?: number;
    /**
     * The image format for requested icons
     *
     * @type {("PNG" | "PNG8" | "GIF" | "JPG")}
     * @memberOf ICreateRuntimeMapOptions
     */
    iconFormat?: "PNG" | "PNG8" | "GIF" | "JPG";
    /**
     * The width of requested icons
     *
     * @type {number}
     * @memberOf ICreateRuntimeMapOptions
     */
    iconWidth?: number;
    /**
     * The height of requested icons
     *
     * @type {number}
     * @memberOf ICreateRuntimeMapOptions
     */
    iconHeight?: number;
    /**
     * The target map name to assign. Otherwise the map name will be computed from the map definition id
     *
     * @type {string}
     * @memberOf ICreateRuntimeMapOptions
     */
    targetMapName?: string;
}

/**
 * Describes operations requiring a session id
 *
 * @export
 * @interface ISessionBasedRequest
 */
export interface ISessionBasedRequest {
    /**
     * The session id
     *
     * @type {string}
     * @memberOf ISessionBasedRequest
     */
    session: string;
}

/**
 * Describes operations against a runtime map
 *
 * @export
 * @interface IRuntimeMapRequest
 * @extends {ISessionBasedRequest}
 */
export interface IRuntimeMapRequest extends ISessionBasedRequest {
    /**
     * The name of the runtime map
     *
     * @type {string}
     * @memberOf IRuntimeMapRequest
     */
    mapname: string;
}

/**
 * A bitmask indicating what to return when querying map features
 *
 * @export
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
 * @export
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
     * @type {("INTERSECTS" | "TOUCHES" | "WITHIN" | "ENVELOPEINTERSECTS")}
     */
    selectionvariant?: "INTERSECTS" | "TOUCHES" | "WITHIN" | "ENVELOPEINTERSECTS";
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
 * @export
 * @interface IDescribeRuntimeMapOptions
 * @extends {IRuntimeMapRequest}
 */
export interface IDescribeRuntimeMapOptions extends IRuntimeMapRequest {
    /**
     * A bitmask of data to return about a runtime map
     *
     * @type {(number | RuntimeMapFeatureFlags)}
     * @memberOf IDescribeRuntimeMapOptions
     */
    requestedFeatures?: number | RuntimeMapFeatureFlags;
    /**
     * If requesting icons, the number of icons per scale range
     *
     * @type {number}
     * @memberOf IDescribeRuntimeMapOptions
     */
    iconsPerScaleRange?: number;
    /**
     * The image format for requested icons
     *
     * @type {("PNG" | "PNG8" | "GIF" | "JPG")}
     * @memberOf IDescribeRuntimeMapOptions
     */
    iconFormat?: "PNG" | "PNG8" | "GIF" | "JPG";
    /**
     * The width of requested icons
     *
     * @type {number}
     * @memberOf IDescribeRuntimeMapOptions
     */
    iconWidth?: number;
    /**
     * The height of requested icons
     *
     * @type {number}
     * @memberOf IDescribeRuntimeMapOptions
     */
    iconHeight?: number;
}

// Why does PromiseLike<T> not define catch() ?

/**
 * A promise-like interface
 */
export interface IPromise<T> {
    /**
     * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
     * Both callbacks have a single parameter , the fulfillment value or rejection reason.
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
     * If an error is thrown in the callback, the returned promise rejects with that error.
     *
     * @param onFulfilled called when/if "promise" resolves
     * @param onRejected called when/if "promise" rejects
     */
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): IPromise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): IPromise<U>;

    /**
     * Sugar for promise.then(undefined, onRejected)
     *
     * @param onRejected called when/if "promise" rejects
     */
    catch<U>(onRejected?: (error: any) => U | Thenable<U>): IPromise<U>;
}

/**
 * Provides client services for a MapGuide map viewer
 *
 * @export
 * @interface IMapGuideClient
 */
export interface IMapGuideClient {
    /**
     * Creates a new MapGuide session
     *
     * @param {string} username
     * @param {string} password
     * @returns {IPromise<string>}
     */
    createSession(username: string, password: string): IPromise<string>;

    /**
     * Retrieves the requested resource
     *
     * @abstract
     * @template T
     * @param {string} resourceId
     * @returns {PromiseLike<T>}
     */
    getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier, args?: any): IPromise<T>;

    /**
     * Creates a runtime map from the specified map definition
     *
     * @abstract
     * @param {ICreateRuntimeMapOptions} options
     * @returns {PromiseLike<RtMap.RuntimeMap>}
     */
    createRuntimeMap(options: ICreateRuntimeMapOptions): IPromise<Contracts.RtMap.RuntimeMap>;

    /**
     * Performs a map selection query on the current map
     *
     * @abstract
     * @param {IQueryMapFeaturesOptions} options
     * @returns {PromiseLike<Query.QueryMapFeaturesResponse>}
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions): IPromise<Contracts.Query.QueryMapFeaturesResponse>;

    /**
     * Describes a runtime map
     *
     * @abstract
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {PromiseLike<RtMap.RuntimeMap>}
     */
    describeRuntimeMap(options: IDescribeRuntimeMapOptions): IPromise<Contracts.RtMap.RuntimeMap>;

    /**
     * Gets the tile template URL used by the viewer to send tile requests
     *
     * @param {string} resourceId
     * @param {string} groupName
     * @param {string} xPlaceholder
     * @param {string} yPlaceholder
     * @param {string} zPlaceholder
     * @returns {string}
     */
    getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string;
}

export abstract class RequestBuilder implements IMapGuideClient {
    protected agentUri: string;
    constructor(agentUri: string) {
        this.agentUri = agentUri;
    }

    public abstract createSession(username: string, password: string): IPromise<string>;

    public abstract getServerSessionTimeout(session: string): IPromise<number>;

    public abstract getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier, args?: any): IPromise<T>;

    public abstract createRuntimeMap(options: ICreateRuntimeMapOptions): IPromise<Contracts.RtMap.RuntimeMap>;

    public abstract queryMapFeatures(options: IQueryMapFeaturesOptions): IPromise<Contracts.Query.QueryMapFeaturesResponse>;

    public abstract describeRuntimeMap(options: IDescribeRuntimeMapOptions): IPromise<Contracts.RtMap.RuntimeMap>;

    public abstract getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string;
}