import { MgError } from './error';
import { MapAgentRequestBuilder, isErrorResponse, serialize } from './builders/mapagent';
import { ClientKind } from './common';
import { IMapGuideClient, RequestBuilder, ICreateRuntimeMapOptions, IDescribeRuntimeMapOptions, IQueryMapFeaturesOptions } from './request-builder';
import { ResourceBase, ResourceIdentifier } from './contracts/common';
import { RuntimeMap } from './contracts/runtime-map';
import { QueryMapFeaturesResponse } from './contracts/query';

/**
 * The MapGuide HTTP client
 *
 * @export
 * @class Client
 * @implements {IMapGuideClient}
 */
export class Client implements IMapGuideClient {
    private builder: RequestBuilder;
    constructor(agentUri: string, kind: ClientKind) {
        switch (kind) {
            case "mapagent":
                this.builder = new MapAgentRequestBuilder(agentUri);
                break;
            default:
                throw new MgError(`Unknown or unsupported client kind: ${kind}`);
        }
    }
    public async getText(url: string): Promise<string> {
        const r = await fetch(url);
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
     * @memberOf Client
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
     * @memberOf Client
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
     * @memberOf Client
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
     * @memberOf Client
     */
    public getServerSessionTimeout(session: string): Promise<number> {
        return this.builder.getServerSessionTimeout(session);
    }

    /**
     * Retrieves the requested resource
     *
     * @template T
     * @param {ResourceIdentifier} resourceId
     * @param {*} [args]
     * @returns {Promise<T>}
     *
     * @memberOf Client
     */
    public getResource<T extends ResourceBase>(resourceId: ResourceIdentifier, args?: any): Promise<T> {
        return this.builder.getResource<T>(resourceId, args);
    }

    /**
     * Creates a runtime map from the specified map definition
     *
     * @param {ICreateRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     * @memberOf Client
     */
    public createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.createRuntimeMap(options);
    }

    /**
     * Describes a runtime map
     *
     * @param {IDescribeRuntimeMapOptions} options
     * @returns {Promise<RuntimeMap>}
     *
     * @memberOf Client
     */
    public describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        return this.builder.describeRuntimeMap(options);
    }

    /**
     * Performs a map selection query on the current map
     *
     * @param {IQueryMapFeaturesOptions} options
     * @returns {Promise<QueryMapFeaturesResponse>}
     *
     * @memberOf Client
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
     * @memberOf Client
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
     * @memberOf Client
     */
    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        return this.builder.getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder);
    }
}