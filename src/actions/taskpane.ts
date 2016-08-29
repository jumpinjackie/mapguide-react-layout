import * as Constants from "../constants";
import queryString = require("query-string");
const parse = require("url-parse");

export function goHome() {
    return {
        type: Constants.TASK_PANE_HOME
    };
}

export function goBack() {
    return {
        type: Constants.TASK_PANE_BACK
    };
}

export function goForward() {
    return {
        type: Constants.TASK_PANE_FORWARD
    };
}

export function pushUrl(url: string, silent?: boolean) {
    return {
        type: Constants.TASK_PANE_PUSH_URL,
        payload: { 
            url: url,
            silent: silent
        }
    };
}

export function ensureParameters(url: string, mapName: string, session: string, locale?: string): string {
    if (url == null)
        return null;
    const parsed = parse(url);
    const params = queryString.parse(parsed.query);
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
        params.MAPNAME = mapName;
    }
    if (bNeedSession) {
        params.SESSION = session;
    }
    if (bNeedLocale) {
        params.LOCALE = locale;
    }
    parsed.query = queryString.stringify(params);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0) {
        return result;
    }
    //HACK: Workaround bug in url-parse that auto-appends http:// for relative urls
    return result.substring(parsed.protocol.length + 2);
}