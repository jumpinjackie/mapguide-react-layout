import { MgError } from './error';
import { MapAgentRequestBuilder, isErrorResponse, serialize } from './builders/mapagent';
import { ClientKind } from './common';
import { createRequestBuilder } from './builders/factory';
import { ResourceBase, ResourceIdentifier, SiteVersionResponse } from './contracts/common';
import { ICreateRuntimeMapOptions, IMapGuideClient, RequestBuilder, IDescribeRuntimeMapOptions, IQueryMapFeaturesOptions } from './request-builder';
import { RuntimeMap } from './contracts/runtime-map';
import { QueryMapFeaturesResponse } from './contracts/query';

/**
 * The MapGuide HTTP client
 *
 * @class Client
 */
export class Client implements IMapGuideClient {
    private builder: RequestBuilder;
    constructor(agentUri: string, kind: ClientKind) {
        this.builder = createRequestBuilder(agentUri, kind);
    }
    public async getText(url: string): Promise<string> {
        const r = await fetch(url);
        if (!r.ok)
            throw new MgError(r.statusText);
        const text = await r.text();
        return text;
    }

    /**
     * Performs a generic GET request at the specified URL
     *
     * @template T The type of the object you are expecting to receive
     * @param {string} url The url to make the request to
     * @returns {Promise<T>} A promise for the value of the requested type
     *
     *
     */
    public get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } as any,
                method: "GET"
            })
            .then(response => {
                if (isErrorResponse(response)) {
                    throw new MgError(response.statusText);
                } else {
                    resolve(response.json());
                }
            })
            .catch(reject);
        });
    }

    /**
     * Performs a generic POST request at the specified URL
     *
     * @template T The type of the object you are expecting to receive
     * @param {string} url The url to make the request to
     * @param {*} data The POST form data
     * @returns {Promise<T>} A promise for the value of the requested type
     *
     *
     */
    public post<T>(url: string, data: any): Promise<T> {
        if (!data.format) {
            data.format = "application/json";
        }
        //const form = new FormData();
        //for (const key in data) {
        //    form.append(key.toUpperCase(), data[key]);
        //}
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                } as any,
                method: "POST",
                body: serialize(data) //form
            })
            .then(response => {
                if (isErrorResponse(response)) {
                    throw new MgError(response.statusText);
                } else {
                    resolve(response.json());
                }
            })
            .catch(reject);
        });
    }

    /**
     * Creates a new MapGuide session
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>}
     *
     *
     */
    public createSession(username: string, password: string): Promise<string> {
        return this.builder.createSession(username, password);
    }

    /**
     * Gets the server session timeout for the given session id
     *
     * @param {string} session
     * @returns {Promise<number>}
     *
     *
     */
    public getServerSessionTimeout(session: string): Promise<number> {
        return this.builder.getServerSessionTimeout(session);
    }

    /**
     * gets the MapGuide Server version
     * 
     * @since 0.14
     */
    public getSiteVersion(): Promise<SiteVersionResponse> {
        return this.builder.getSiteVersion();
    }

    /**
     * Retrieves the requested resource
     *
     * @template T
     * @param {ResourceIdentifier} resourceId
     * @param {*} [args]
     * @returns {Promise<T>}
     *
     *
     */
    public getResource<T extends ResourceBase>(resourceId: ResourceIdentifier, args?: any): Promise<T> {
        return this.builder.getResource<T>(resourceId, args);
    }

    /**
     * Creates a runtime map from the specified map definition. Issues a v3.0.0 request
     *
     * @param {ICreateRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     *
     */
    public createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.createRuntimeMap(options);
    }

    /**
     * Creates a runtime map from the specified map definition. Issues a v4.0.0 request
     *
     * @param {ICreateRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     *
     * @since 0.14.8
     */
    public createRuntimeMap_v4(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.createRuntimeMap_v4(options);
    }

    /**
     * Describes a runtime map. Issues a v3.0.0 request
     *
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     *
     */
    public describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.describeRuntimeMap(options);
    }

    /**
     * Describes a runtime map. Issues a v4.0.0 request
     *
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     *
     * @since 0.14.8
     */
    public describeRuntimeMap_v4(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.describeRuntimeMap_v4(options);
    }

    /**
     * Performs a map selection query on the current map
     *
     * @param {IQueryMapFeaturesOptions} options
     * @returns {Promise<QueryMapFeaturesResponse>}
     *
     *
     */
    public queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        return this.builder.queryMapFeatures(options);
    }

    /**
     * Performs a map selection query on the current map. Only applicable for use in MapGuide Open Source
     * 4.0 and higher
     *
     * @param {IQueryMapFeaturesOptions} options
     * @returns {Promise<QueryMapFeaturesResponse>}
     *
     *
     */
    public queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        return this.builder.queryMapFeatures_v4(options);
    }

    /**
     * Gets the tile template URL used by the viewer to send tile requests
     *
     * @param {string} resourceId
     * @param {string} groupName
     * @param {string} xPlaceholder
     * @param {string} yPlaceholder
     * @param {string} zPlaceholder
     * @returns {string}
     *
     *
     * @since 0.14.8 added isXYZ parameter
     */
    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string, isXYZ: boolean): string {
        return this.builder.getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder, isXYZ);
    }
}