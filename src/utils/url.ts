import queryString = require("query-string");
const parse = require("url-parse");

function arraysEqual(a: string[]|null, b: string[]|null): boolean {
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

export function areUrlsSame(url1: string, url2: string): boolean {
    const parsed1 = parse(url1);
    const parsed2 = parse(url2);
    const params1 = queryString.parse(parsed1.query);
    const params2 = queryString.parse(parsed2.query);

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