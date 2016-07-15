import * as Request from '../request-builder';
import * as Contracts from '../contracts';
import { MgError } from '../error';
import assign = require("object-assign");
import { deArrayify } from './deArrayify';

export class MapAgentRequestBuilder extends Request.RequestBuilder {
    private locale: string;
    constructor(agentUri: string, locale: string = "en") {
        super(agentUri);
        this.locale = locale;
    }

    private get<T>(url: string): PromiseLike<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: "GET"
            })
            .then(response => {
                if (!response.ok) {
                    throw new MgError(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(json => {
                resolve(<T>deArrayify(json));
            })
            .catch(reject);
        });
    }

    private post<T>(url: string, data: any): PromiseLike<T> {
        const form = new FormData();
        for (const key of data) {
            form.append(key.toUpperCase(), data[key]);
        }
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: form
            })
            .then(response => {
                if (!response.ok) {
                    throw new MgError(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(json => {
                resolve(<T>deArrayify(json));
            })
            .catch(reject);
        });
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

    public getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): PromiseLike<T> {
        const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId: resourceId });
        return this.get<T>(url);
    }
    
    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap> {
        const url = this.stringifyGetUrl(assign(options, { operation: "CREATERUNTIMEMAP", version: "3.0.0" }));
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }
    
    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): PromiseLike<Contracts.Query.QueryMapFeaturesResponse> {
        return this.post<Contracts.Query.QueryMapFeaturesResponse>(this.agentUri, assign(options, { version: "2.6.0" }));
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap> {
        const url = this.stringifyGetUrl(assign(options, { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" }));
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }
}