import * as Constants from "../constants";
import { MgError } from "../api/error";
import queryString = require("query-string");
const parse = require("url-parse");

export function goHome() {
    return (dispatch, getState) => {
        const initUrl = getState().taskpane.initialUrl;
        if (initUrl != null) {
            dispatch({
                type: Constants.TASK_PANE_HOME
            });
        } else {
            throw new MgError("Case not handled yet: Home action when no initial task URL set");
        }
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

export function ensureParameters(url: string, mapName: string, session: string, locale?: string, uppercase = true): string {
    if (url == null)
        return null;
    //If this is a component URL, let it be
    if (url.indexOf("component://") >= 0) {
        return url;
    }
    const parsed = parse(url);
    const params: any = parsed.query != null ? queryString.parse(parsed.query) : {};
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
    parsed.query = queryString.stringify(params);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0 || url.indexOf("/") == 0) {
        return result;
    }
    //HACK: Workaround bug in url-parse that auto-appends http:// for relative urls
    return result.substring(parsed.protocol.length + 2);
}