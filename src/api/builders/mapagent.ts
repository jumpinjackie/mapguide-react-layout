import * as Request from '../request-builder';
import * as Common from "../contracts/common";
import * as RtMap from '../contracts/runtime-map';
import * as Query from "../contracts/query";
import { MgError } from '../error';
import { deArrayify } from './deArrayify';
import { DEFAULT_LOCALE } from "../i18n";

const MG_MAPAGENT_ERROR_CODE = 559;

/**
 * Indicates if the given response is an error response
 *
 * @export
 * @param {Response} response
 * @returns {boolean}
 */
export function isErrorResponse(response: Response): boolean {
    return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
}

/**
 * Encodes the given object for a POST submission
 *
 * @export
 * @param {*} data
 * @returns {string}
 */
export function serialize(data: any, uppercase: boolean = true): string {
    return Object.keys(data).map((keyName) => {
        return encodeURIComponent(uppercase ? keyName.toUpperCase() : keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}

/**
 * The mapagent client
 *
 * @export
 * @class MapAgentRequestBuilder
 * @extends {Request.RequestBuilder}
 */
export class MapAgentRequestBuilder extends Request.RequestBuilder {
    private locale: string;
    constructor(agentUri: string, locale: string = DEFAULT_LOCALE) {
        super(agentUri);
        this.locale = locale;
    }

    public async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            const json = await response.json();
            return deArrayify(json) as T;
        }
    }

    public async post<T>(url: string, data: any): Promise<T> {
        if (!data.format) {
            data.format = "application/json";
        }
        //const form = new FormData();
        //for (const key in data) {
        //    form.append(key.toUpperCase(), data[key]);
        //}
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: "POST",
            body: serialize(data) //form
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            const json = await response.json();
            return deArrayify(json) as T;
        }
    }

    private stringifyGetUrl(options: any): string {
        if (!options.version) {
            options.version = "1.0.0";
        }
        if (!options.locale) {
            options.locale = this.locale;
        }
        if (!options.format) {
            options.format = "application/json";
        }
        let url = this.agentUri;
        let bFirst = true;
        for (const key in options) {
            if (bFirst) {
                url += `?${key.toUpperCase()}=${options[key]}`;
                bFirst = false;
            } else {
                url += `&${key.toUpperCase()}=${options[key]}`;
            }
        }
        return url;
    }

    public async createSession(username: string, password: string): Promise<string> {
        const url = this.agentUri;
        const data = { operation: "CREATESESSION", version: "1.0.0", USERNAME: username, PASSWORD: password };
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: "POST",
            body: serialize(data) //form
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            return await response.text();
        }
    }

    public async getServerSessionTimeout(session: string): Promise<number> {
        const url = this.agentUri;
        const data = { operation: "GETSESSIONTIMEOUT", version: "1.0.0", SESSION: session };
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: "POST",
            body: serialize(data) //form
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            const val = await response.text();
            return parseInt(val, 10);
        }
    }

    public getResource<T extends Common.ResourceBase>(resourceId: Common.ResourceIdentifier, args?: any): Promise<T> {
        if (args != null) {
            const p1 = { operation: "GETRESOURCECONTENT", resourceId: resourceId };
            const url = this.stringifyGetUrl({ ...args, ...p1 });
            return this.get<T>(url);
        } else {
            const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId: resourceId });
            return this.get<T>(url);
        }
    }

    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): Promise<RtMap.RuntimeMap> {
        const p1 = { operation: "CREATERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<RtMap.RuntimeMap>(url);
    }

    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): Promise<Query.QueryMapFeaturesResponse> {
        const p1 = { operation: "QUERYMAPFEATURES", version: "2.6.0" };
        return this.post<Query.QueryMapFeaturesResponse>(this.agentUri, { ...options, ...p1 });
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): Promise<RtMap.RuntimeMap> {
        const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<RtMap.RuntimeMap>(url);
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        const urlTemplate = `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
        return urlTemplate;
    }
}