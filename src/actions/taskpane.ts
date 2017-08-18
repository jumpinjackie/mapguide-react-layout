import * as Constants from "../constants";
import { MgError } from "../api/error";
import { IInvokeUrlCommandParameter } from "../api/common";
import {
    ReduxThunkedAction
} from "../api/common";
import queryString = require("query-string");
import { isComponentUri } from "../utils/url";
const parse = require("url-parse");

/**
 * Go back to the initial task URL
 *
 * @export
 * @returns {ReduxThunkedAction}
 */
export function goHome(): ReduxThunkedAction {
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

/**
 * Go back one entry in the task pane navigation history
 *
 * @export
 * @returns
 */
export function goBack() {
    return {
        type: Constants.TASK_PANE_BACK
    };
}

/**
 * Go forward one entry in the task pane navigation history
 *
 * @export
 * @returns
 */
export function goForward() {
    return {
        type: Constants.TASK_PANE_FORWARD
    };
}

/**
 * Pushes the given URL to the task pane navigation history stack
 *
 * @export
 * @param {string} url
 * @param {boolean} [silent]
 * @returns
 */
export function pushUrl(url: string, silent?: boolean) {
    return {
        type: Constants.TASK_PANE_PUSH_URL,
        payload: {
            url: url,
            silent: silent
        }
    };
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

    for (const p of extraParameters) {
        params[p.name] = p.value;
    }

    parsed.query = queryString.stringify(params);
    const result = parsed.toString();

    if (url.indexOf(parsed.protocol) >= 0 || url.indexOf("/") == 0) {
        return result;
    }

    return result;
}