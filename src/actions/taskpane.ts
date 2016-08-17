import * as Constants from "../constants";

export function goHome() {
    return {
        type: Constants.TASK_PANE_HOME
    };
}

export function gotoUrl(url: string, target?) {
    return {
        type: Constants.TASK_PANE_GOTO_URL,
        payload: url
    };
}