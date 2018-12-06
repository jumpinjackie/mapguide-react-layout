import queryString = require("qs");
import { IInvokeUrlCommandParameter } from "../api/common";
const parse = require("url-parse");

const DEFAULT_PARSE_OPTIONS = { ignoreQueryPrefix: true };

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
 * @param {*} params1
 * @param {*} params2
 * @returns {boolean}
 */
function areParamsEqual(params1: any, params2: any): boolean {
    //HACK: locale is an optional part of the mapname/session/locale triplet
    //For the purpose of the same url test, the presence (or lack thereof) of
    //this parameter should not break the url equality test
    const keys1 = Object.keys(params1).filter(k => k.toLowerCase() != "locale").sort();
    const keys2 = Object.keys(params2).filter(k => k.toLowerCase() != "locale").sort();
    if (arraysEqual(keys1, keys2)) {
        for (const key of keys1) {
            if (params1[key] != params2[key]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Indicates if the given URLs are the same
 *
 * @export
 * @param {string} url1
 * @param {string} url2
 * @returns {boolean}
 */
export function areUrlsSame(url1: string, url2: string): boolean {
    const parsed1 = parse(url1);
    const parsed2 = parse(url2);
    const params1 = queryString.parse(parsed1.query, DEFAULT_PARSE_OPTIONS);
    const params2 = queryString.parse(parsed2.query, DEFAULT_PARSE_OPTIONS);

    const same = parsed1.protocol == parsed2.protocol
        && parsed1.slashes == parsed2.slashes
        && parsed1.auth == parsed2.auth
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
        const props = qi < 0 ? {} : queryString.parse(uri.substring(qi), DEFAULT_PARSE_OPTIONS);
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
 * @param {string} mapName The name of the current runtime map
 * @param {string} session The current session id
 * @param {string} [locale] An optional locale
 * @param {boolean} [uppercase=true] If true, will uppercase all parameter names
 * @param {IInvokeUrlCommandParameter[]} [extraParameters=[]] Any extra parameters to append to the URL
 * @returns {string} 
 */
export function ensureParameters(url: string, mapName: string, session: string, locale?: string, uppercase = true, extraParameters: IInvokeUrlCommandParameter[] = []): string {
    //If this is a component URL, let it be
    if (isComponentUri(url)) {
        return url;
    }
    const parsed = parseUrl(url);
    const params: any = parsed.query != null ? queryString.parse(parsed.query, DEFAULT_PARSE_OPTIONS) : {};
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
    if (bNeedMapName) {
        if (uppercase) {
            params.MAPNAME = mapName;
        } else {
            params.mapname = mapName;
        }
    }
    if (bNeedSession) {
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
    const query = qi < 0 ? {} : queryString.parse(url.substring(qi), DEFAULT_PARSE_OPTIONS);
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
    return queryString.stringify(parameters);
}

/**
 * Appends the specified parameters to the given URL
 *
 * @export
 * @param {string} url The URL to append parameters to
 * @param {*} parameters The parameters to append
 * @param {boolean} [bOverwriteExisting=true] If true, will overwrite any existing parameters if the URL already has them
 * @param {boolean} [bConvertToUppercase=true] If true, will ensure all parameter names are uppercase
 * @since 0.12
 */
export function appendParameters(url: string, parameters: any, bOverwriteExisting: boolean = true, bConvertToUppercase: boolean = false) {
    const parsed = parse(url);
    let currentParams: any = parsed.query != null ? queryString.parse(parsed.query, DEFAULT_PARSE_OPTIONS) : {};

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

    parsed.query = queryString.stringify(currentParams);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0 || url.indexOf("/") == 0) {
        return result;
    }

    return result;
}