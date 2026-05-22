import { MgError } from '../error';
import { DEFAULT_LOCALE } from "../i18n";
import { RequestBuilder, ICreateRuntimeMapOptions, IQueryMapFeaturesOptions, IDescribeRuntimeMapOptions } from '../request-builder';
import { RuntimeMap } from '../contracts/runtime-map';
import { QueryMapFeaturesResponse } from '../contracts/query';
import { ResourceIdentifier, ResourceBase, SiteVersionResponse } from '../contracts/common';
import { parseSiteVersion } from '../../utils/site-version';

const deArrayifyModulePromise = import('./deArrayify');

const MG_MAPAGENT_ERROR_CODE = 559;

/**
 * Indicates if the given response is an error response
 *
 * @param {Response} response
 * @returns {boolean}
 */
export function isErrorResponse(response: Response): boolean {
    return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
}

/**
 * Encodes the given object for a POST submission
 *

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
 * @class MapAgentRequestBuilder
 * @extends {RequestBuilder}
 */
export class MapAgentRequestBuilder extends RequestBuilder {
    private locale: string;
        private static siteVersionCache = new Map<string, Promise<SiteVersionResponse>>();
    constructor(agentUri: string, locale: string = DEFAULT_LOCALE) {
        super(agentUri);
        this.locale = locale;
    }

    private async getRawJson(url: string): Promise<any> {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } as any,
            method: "GET"
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        }
        return await response.json();
    }

    private extractCleanResourceJson(json: any): any {
        if (json?.ApplicationDefinition) {
            return json.ApplicationDefinition;
        }
        if (json?.WebLayout) {
            return json.WebLayout;
        }
        if (json?.MapDefinition) {
            return json.MapDefinition;
        }
        if (json?.TileSetDefinition) {
            return json.TileSetDefinition;
        }
        return json;
    }

        private extractCleanRuntimeMapJson(json: any): any {
            if (json?.RuntimeMap) {
                return json.RuntimeMap;
        }
            if (json?.Map) {
                return json.Map;
            }
            return json;
    }

    private async canUseCleanResourceContent(): Promise<boolean> {
            const sv = await this.getSiteVersion();
        const [major] = parseSiteVersion(sv.Version);
        return major >= 4;
    }

    public async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } as any,
            method: "GET"
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            const json = await response.json();
            const { deArrayify } = await deArrayifyModulePromise;
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
            } as any,
            method: "POST",
            body: serialize(data) //form
        });
        if (isErrorResponse(response)) {
            throw new MgError(response.statusText);
        } else {
            const json = await response.json();
            const { deArrayify } = await deArrayifyModulePromise;
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
            } as any,
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
            } as any,
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

    public async getResource<T extends ResourceBase>(resourceId: ResourceIdentifier, args?: any): Promise<T> {
        if (args != null) {
            const isAppDef = typeof resourceId === "string" && /applicationdefinition$/i.test(resourceId.trim());
            if (isAppDef && await this.canUseCleanResourceContent()) {
                const p1 = { operation: "GETRESOURCECONTENT", resourceId: resourceId, version: "4.0.0", clean: 1 };
                const url = this.stringifyGetUrl({ ...args, ...p1 });
                const json = await this.getRawJson(url);
                return this.extractCleanResourceJson(json) as T;
            }

            const p1 = { operation: "GETRESOURCECONTENT", resourceId: resourceId };
            const url = this.stringifyGetUrl({ ...args, ...p1 });
            return await this.get<T>(url);
        } else {
            const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId: resourceId });
            return await this.get<T>(url);
        }
    }

    public getSiteVersion(): Promise<SiteVersionResponse> {
            const cached = MapAgentRequestBuilder.siteVersionCache.get(this.agentUri);
            if (cached) {
                return cached;
            }

            const p1 = { operation: "GETSITEVERSION", version: "1.0.0", username: "Anonymous" };
            const url = this.stringifyGetUrl({ ...p1 });
            const pending = this.get<SiteVersionResponse>(url).catch((error) => {
                MapAgentRequestBuilder.siteVersionCache.delete(this.agentUri);
                throw error;
            });
            MapAgentRequestBuilder.siteVersionCache.set(this.agentUri, pending);
            return pending;
    }

    public createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        const p1 = { operation: "CREATERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<RuntimeMap>(url);
    }

    public async createRuntimeMap_v4(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        const p1 = { operation: "CREATERUNTIMEMAP", version: "4.0.0", clean: 1 };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        const json = await this.getRawJson(url);
        return this.extractCleanRuntimeMapJson(json) as RuntimeMap;
    }

    public queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        const p1 = { operation: "QUERYMAPFEATURES", version: "2.6.0" };
        return this.post<QueryMapFeaturesResponse>(this.agentUri, { ...options, ...p1 });
    }

    public queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        const p1 = { operation: "QUERYMAPFEATURES", version: "4.0.0" };
        return this.post<QueryMapFeaturesResponse>(this.agentUri, { ...options, ...p1 });
    }

    public describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<RuntimeMap>(url);
    }

    public async describeRuntimeMap_v4(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "4.0.0", clean: 1 };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        const json = await this.getRawJson(url);
        return this.extractCleanRuntimeMapJson(json) as RuntimeMap;
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string, isXYZ: boolean): string {
        if (isXYZ)
            return`${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${yPlaceholder}&TILEROW=${xPlaceholder}&SCALEINDEX=${zPlaceholder}`;
        else
            return`${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
    }
}