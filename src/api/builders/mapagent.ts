import * as Request from '../request-builder';
import * as Contracts from '../contracts';
import { MgError } from '../error';
import { deArrayify } from './deArrayify';

const MG_MAPAGENT_ERROR_CODE = 559;

export function isErrorResponse(response: Response): boolean {
    return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
}

export function serialize(data: any): string {
    return Object.keys(data).map((keyName) => {
        return encodeURIComponent(keyName.toUpperCase()) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}

export class MapAgentRequestBuilder extends Request.RequestBuilder {
    private locale: string;
    constructor(agentUri: string, locale: string = "en") {
        super(agentUri);
        this.locale = locale;
    }

    public get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: "GET"
            })
            .then(response => {
                if (isErrorResponse(response)) {
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
                },
                method: "POST",
                body: serialize(data) //form
            })
            .then(response => {
                if (isErrorResponse(response)) {
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

    public createSession(username: string, password: string): Request.IPromise<string> {
        const url = this.agentUri;
        const data = { operation: "CREATESESSION", version: "1.0.0", USERNAME: username, PASSWORD: password };
        return new Promise<string>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                method: "POST",
                body: serialize(data) //form
            })
            .then(response => {
                if (isErrorResponse(response)) {
                    throw new MgError(response.statusText);
                } else {
                    resolve(response.text());
                }
            })
            .catch(reject);
        });
    }

    public getServerSessionTimeout(session: string): Request.IPromise<number> {
        const url = this.agentUri;
        const data = { operation: "GETSESSIONTIMEOUT", version: "1.0.0", SESSION: session };
        return new Promise<number>((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                method: "POST",
                body: serialize(data) //form
            })
            .then(response => {
                if (isErrorResponse(response)) {
                    throw new MgError(response.statusText);
                } else {
                    response.text().then(val => {
                        resolve(parseInt(val, 10));
                    });
                }
            })
            .catch(reject);
        });
    }

    public getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier, args?: any): Request.IPromise<T> {
        if (args != null) {
            const p1 = { operation: "GETRESOURCECONTENT", resourceId: resourceId };
            const url = this.stringifyGetUrl({ ...args, ...p1 });
            return this.get<T>(url);
        } else {
            const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId: resourceId });
            return this.get<T>(url);
        }
    }
    
    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        const p1 = { operation: "CREATERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }
    
    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): Request.IPromise<Contracts.Query.QueryMapFeaturesResponse> {
        const p1 = { operation: "QUERYMAPFEATURES", version: "2.6.0" };
        return this.post<Contracts.Query.QueryMapFeaturesResponse>(this.agentUri, { ...options, ...p1 });
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" };
        const url = this.stringifyGetUrl({ ...options, ...p1 });
        return this.get<Contracts.RtMap.RuntimeMap>(url);
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        const urlTemplate = `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
        return urlTemplate;
    }
}