import * as Contracts from "./contracts";

export interface IAuthenticatedRequest {
    session?: string;
    username?: string;
    password?: string;
}

export enum CreateRuntimeMapFeatureFlags {
    LayersAndGroups = 1,
    LayerIcons = 2,
    LayerFeatureSources = 4
}

export interface ICreateRuntimeMapOptions extends IAuthenticatedRequest {
    mapDefinition: Contracts.Common.ResourceIdentifier;
    requestedFeatures: number | CreateRuntimeMapFeatureFlags;
    iconsPerScaleRange?: number;
    iconFormat?: "PNG" | "PNG8" | "GIF" | "JPG";
    iconWidth?: number;
    iconHeight?: number;
}

export interface ISessionBasedRequest {
    session: string;
}

export interface IRuntimeMapRequest extends ISessionBasedRequest {
    mapname: string;
}

export interface IQueryMapFeaturesOptions extends IRuntimeMapRequest {

}

export interface IDescribeRuntimeMapOptions extends IRuntimeMapRequest {

}

/**
 * Provides client services for a MapGuide map viewer 
 * 
 * @export
 * @interface IMapGuideClient
 */
export interface IMapGuideClient {
    /**
     * Retrieves the requested resource 
     * 
     * @abstract
     * @template T
     * @param {string} resourceId
     * @returns {PromiseLike<T>}
     */
    getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): PromiseLike<T>;

    /**
     * Creates a runtime map from the specified map definition
     * 
     * @abstract
     * @param {ICreateRuntimeMapOptions} options
     * @returns {PromiseLike<RtMap.RuntimeMap>}
     */
    createRuntimeMap(options: ICreateRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap>;

    /**
     * Performs a map selection query on the current map
     * 
     * @abstract
     * @param {IQueryMapFeaturesOptions} options
     * @returns {PromiseLike<Query.QueryMapFeaturesResponse>}
     */
    queryMapFeatures(options: IQueryMapFeaturesOptions): PromiseLike<Contracts.Query.QueryMapFeaturesResponse>;

    /**
     * Describes a runtime map 
     * 
     * @abstract
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {PromiseLike<RtMap.RuntimeMap>}
     */
    describeRuntimeMap(options: IDescribeRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap>;
}

export abstract class RequestBuilder implements IMapGuideClient {
    protected agentUri: string;
    constructor(agentUri: string) {
        this.agentUri = agentUri;
    }

    public abstract getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): PromiseLike<T>;

    public abstract createRuntimeMap(options: ICreateRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap>;

    public abstract queryMapFeatures(options: IQueryMapFeaturesOptions): PromiseLike<Contracts.Query.QueryMapFeaturesResponse>;

    public abstract describeRuntimeMap(options: IDescribeRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap>;
}