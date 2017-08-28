import * as Constants from "../constants";
import { MgError } from "../api/error";
import {
    ReduxThunkedAction
} from "../api/common";

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