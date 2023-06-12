import type { IInvokeUrlCommandParameter } from "../api/common";
import { strIsNullOrEmpty } from './string';

/**
 * Indicates if the given arrays are equal
 *
 * @param {(string[]|null)} a
 * @param {(string[]|null)} b
 * @returns {boolean}
 */
function arraysEqual(a: string[] | null, b: string[] | null): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Indicates if the given sets of parameterse are the same
 *
 * @param {URLSearchParams} params1
 * @param {URLSearchParams} params2
 * @returns {boolean}
 */
function areParamsEqual(params1: URLSearchParams, params2: URLSearchParams): boolean {
    //HACK: locale is an optional part of the mapname/session/locale triplet
    //For the purpose of the same url test, the presence (or lack thereof) of
    //this parameter should not break the url equality test
    const keys1 = Array.from(params1.keys());
    const keys2 = Array.from(params2.keys());
    const nKeys1 = keys1.filter(k => k.toLowerCase() != "locale").sort(); // Object.keys(params1).filter(k => k.toLowerCase() != "locale").sort();
    const nKeys2 = keys2.filter(k => k.toLowerCase() != "locale").sort(); // Object.keys(params2).filter(k => k.toLowerCase() != "locale").sort();

    if (arraysEqual(nKeys1, nKeys2)) {
        for (const key of keys1) {
            if (params1.get(key) != params2.get(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const FAKE_BASE = "https://fake-host";

/**
 * Indicates if the given URLs are the same
 *
 * @export
 * @param {string} url1
 * @param {string} url2
 * @returns {boolean}
 */
export function areUrlsSame(url1: string, url2: string): boolean {
    let parsed1: URL;
    let parsed2: URL;
    try {
        parsed1 = new URL(url1);
    } catch (e) { //HACK: Workaround lack of relative URL support (https://github.com/whatwg/url/issues/531)
        parsed1 = new URL(url1, FAKE_BASE);
    }
    try {
        parsed2 = new URL(url2);
    } catch (e) { //HACK: Workaround lack of relative URL support (https://github.com/whatwg/url/issues/531)
        parsed2 = new URL(url2, FAKE_BASE);
    }
    const params1 = new URLSearchParams(parsed1.search);
    const params2 = new URLSearchParams(parsed2.search);

    const same = parsed1.protocol == parsed2.protocol
        && parsed1.username == parsed2.username
        && parsed1.password == parsed2.password
        && parsed1.host == parsed2.host
        && parsed1.hostname == parsed2.hostname
        && parsed1.port == parsed2.port
        && parsed1.pathname == parsed2.pathname
        && parsed1.hash == parsed2.hash
        && parsed1.host == parsed2.host
        && areParamsEqual(params1, params2);

    return same;
}

/**
 * A parsed component URI
 * 
 * @export
 * @interface ParsedComponentUri
 */
export interface ParsedComponentUri {
    name: string;
    props: any;
}

/**
 * Indicates if the given URI is a component URI
 * 
 * @export
 * @param {string} uri 
 * @returns {boolean} 
 */
export function isComponentUri(uri: string): boolean {
    return uri.indexOf("component://") >= 0;
}

function searchParamsToObject(p: URLSearchParams) {
    const o: Record<string, string | string[]> = {};
    const keys = Array.from(p.keys());
    for (const k of keys) {
        const value = p.getAll(k);
        o[k] = value.length === 1 ? value[0] : value;
    }
    return o;
}

/**
 * Parses the given component URI. If it not a valid component URI returns undefined
 * 
 * @export
 * @param {string} uri 
 * @returns {(ParsedComponentUri | undefined)} 
 */
export function parseComponentUri(uri: string): ParsedComponentUri | undefined {
    if (isComponentUri(uri)) {
        const qi = uri.lastIndexOf("?");
        const name = qi < 0 ? uri.substring(12) : uri.substring(12, qi);
        const props = qi < 0 ? {} : searchParamsToObject(new URLSearchParams(uri.substring(qi)));
        return {
            name,
            props
        };
    }
}

/**
 * Normalizes the given URL to ensure it has the baseline set of required parameters for invoking any server-side script that uses the MapGuide Web API
 * 
 * @export
 * @param {string} url The url to normalize
 * @param {(string | undefined)} mapName The name of the current runtime map
 * @param {(string | undefined)} session The current session id
 * @param {string} [locale] An optional locale
 * @param {boolean} [uppercase=true] If true, will uppercase all parameter names
 * @param {IInvokeUrlCommandParameter[]} [extraParameters=[]] Any extra parameters to append to the URL
 * @returns {string} 
 */
export function ensureParameters(url: string, mapName: string | undefined, session: string | undefined, locale?: string, uppercase = true, extraParameters: IInvokeUrlCommandParameter[] = []): string {
    //If this is a component URL, let it be
    if (isComponentUri(url)) {
        return url;
    }
    const parsed = parseUrl(url);
    const params: any = parsed.query ?? {};
    let bNeedMapName = true;
    let bNeedSession = true;
    let bNeedLocale = true;
    for (const key in params) {
        const name = key.toLowerCase();
        switch (name) {
            case "session":
                bNeedSession = false;
                break;
            case "mapname":
                bNeedMapName = false;
                break;
            case "locale":
                bNeedLocale = false;
                break;
        }
    }
    if (bNeedMapName && !strIsNullOrEmpty(mapName)) {
        if (uppercase) {
            params.MAPNAME = mapName;
        } else {
            params.mapname = mapName;
        }
    }
    if (bNeedSession && !strIsNullOrEmpty(session)) {
        if (uppercase) {
            params.SESSION = session;
        } else {
            params.session = session;
        }
    }
    if (bNeedLocale) {
        if (uppercase) {
            params.LOCALE = locale;
        } else {
            params.locale = locale;
        }
    }

    for (const p of extraParameters) {
        params[p.name] = p.value;
    }

    /*
    parsed.query = queryString.stringify(params);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0 || url.indexOf("/") == 0) {
        return result;
    }

    return result;
    */
    //Don't uppercase the parameters here if true, uppercasing is only for filling in
    //missing parameters
    return appendParameters(url, params, true, false /*uppercase*/);
}

/**
 * Represents a parsed URL with query string separated
 *
 * @export
 * @interface IParsedUrl
 * @since 0.12
 */
export interface IParsedUrl {
    url: string;
    query: any;
}

/**
 * Parses the given URL and separates out the query string parameters
 *
 * @export
 * @param {string} url The URL to parse
 * @returns {IParsedUrl}
 * @since 0.12
 */
export function parseUrl(url: string): IParsedUrl {
    //return queryString.parseUrl(url);
    const qi = url.lastIndexOf("?");
    const parsedUrl = qi < 0 ? url : url.substring(0, qi);
    const query = qi < 0 ? {} : searchParamsToObject(new URLSearchParams(url.substring(qi)));
    return {
        url: parsedUrl,
        query
    };
}

/**
 * Converts the given object to a query string fragment
 *
 * @export
 * @param {*} parameters The object to stringify
 * @returns {string} The query string fragment
 */
export function stringifyQuery(parameters: any): string {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(parameters)) {
        if (Array.isArray(v)) {
            for (const vv of v) {
                p.append(k, `${vv}`);
            }
        } else {
            p.append(k, `${v}`);
        }
    }
    return p.toString();
}

/**
 * Appends the specified parameters to the given URL
 *
 * @export
 * @param {string} url The URL to append parameters to
 * @param {*} parameters The parameters to append
 * @param {boolean} [bOverwriteExisting=true] If true, will overwrite any existing parameters if the URL already has them
 * @param {boolean} [bConvertToUppercase=false] If true, will ensure all parameter names are uppercase
 * @param {boolean} [bDiscardExistingParams=false] If true, will discard existing query string params before appending
 * @since 0.12
 */
export function appendParameters(url: string, parameters: any, bOverwriteExisting: boolean = true, bConvertToUppercase: boolean = false, bDiscardExistingParams: boolean = false) {
    const parsed = new URL(url);
    let currentParams: any;
    if (!bDiscardExistingParams) {
        currentParams = searchParamsToObject(parsed.searchParams);
    } else {
        currentParams = {};
    }

    const paramNames: any = {};
    for (const key in currentParams) {
        paramNames[key.toUpperCase()] = key;
    }

    for (const name in parameters) {
        //See if this parameter name was normalized
        const key = paramNames[name.toUpperCase()] || name;
        //If it was and we've got an existing value there, skip if not overwriting
        if (key && currentParams[key] && !bOverwriteExisting) {
            continue;
        }
        //Put the parameter value
        currentParams[key] = parameters[name];
    }

    if (bConvertToUppercase) {
        let params2: any = {};
        for (const name in currentParams) {
            params2[name.toUpperCase()] = currentParams[name];
        }
        currentParams = params2;
    }

    parsed.search = stringifyQuery(currentParams);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0 || url.indexOf("/") == 0) {
        return result;
    }

    return result;
}

/**
 * Parses the query string section of the given URL and returns the parsed
 * parameters as an object
 * @param url The URL to parse
 * @since 0.13
 */
export function parseUrlParameters(url: string): any {
    const parsed = new URL(url);
    const currentParams: any = searchParamsToObject(parsed.searchParams);
    return currentParams;
}