import * as Request from '../request-builder';
import * as Contracts from '../contracts';
import { MgError } from '../error';
import assign = require("object-assign");
import { deArrayify } from './deArrayify';

const MG_MAPAGENT_ERROR_CODE = 559;

export class MapAgentRequestBuilder extends Request.RequestBuilder {
    private locale: string;
    constructor(agentUri: string, locale: string = "en") {
        super(agentUri);
        this.locale = locale;
    }

    private isErrorResponse(response: Response): boolean {
        return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
    }

    private get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: "GET"
            })
            .then(response => {
                if (this.isErrorResponse(response)) {
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

    private serialize(data) {
        return Object.keys(data).map((keyName) => {
            return encodeURIComponent(keyName.toUpperCase()) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
    };

    private post<T>(url: string, data: any): Promise<T> {
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
                },
                method: "POST",
                body: this.serialize(data) //form
            })
            .then(response => {
                if (this.isErrorResponse(response)) {
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

    public getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): Request.IPromise<T> {
        const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId: resourceId });
        return this.get<T>(url);
    }
    
    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        const url = this.stringifyGetUrl(assign(options, { operation: "CREATERUNTIMEMAP", version: "3.0.0" }));
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }
    
    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): Request.IPromise<Contracts.Query.QueryMapFeaturesResponse> {
        return this.post<Contracts.Query.QueryMapFeaturesResponse>(this.agentUri, assign(options, { operation: "QUERYMAPFEATURES", version: "2.6.0" }));
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        const url = this.stringifyGetUrl(assign(options, { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" }));
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        const urlTemplate = `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
        return urlTemplate;
    }
}