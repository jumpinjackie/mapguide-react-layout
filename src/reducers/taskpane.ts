import * as Constants from "../constants";
import { ITaskPaneReducerState } from "../api/common";
import { areUrlsSame } from "../utils/url";

const INITIAL_STATE: ITaskPaneReducerState = {
    navIndex: -1,
    navigation: [],
    initialUrl: null,
    //Having this state sounds extremely hacky, but we need a way to signal to the "dumb" task pane that
    //the url its about to receive was pushed and should not be reloaded into the internal iframe
    lastUrlPushed: false  
};

function mergeNavigatedUrl(state: any, url: string): any {
    let index = state.navIndex;
    const nav: string[] = state.navigation;
    index++;
    nav[index] = url;
    //If we slotted at a position that is not the end of the array
    //remove everything after it
    if (nav.length > index + 1) {
        nav.splice(index + 1);
    }
    const newState = {
        navIndex: index,
        navigation: nav,
        lastUrlPushed: false
    };
    return { ...state, ...newState };
}

export function taskPaneReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            {
                const newState = {
                    initialUrl: payload.initialUrl,
                    navIndex: 0,
                    navigation: [ payload.initialUrl ]
                };
                return { ...state, ...newState };
            }
        case Constants.TASK_PANE_HOME:
            {
                if (state.initialUrl != null) {
                    return mergeNavigatedUrl(state, state.initialUrl);
                }
            }
        case Constants.TASK_PANE_BACK:
            {
                let index = state.navIndex;
                const nav = state.navigation;
                index--;
                const newState = {
                    navIndex: index,
                    navigation: nav,
                    lastUrlPushed: false
                };
                return { ...state, ...newState };
            }
        case Constants.TASK_PANE_FORWARD:
            {
                let index = state.navIndex;
                const nav = state.navigation;
                index++;
                const newState = {
                    navIndex: index,
                    navigation: nav,
                    lastUrlPushed: false
                };
                return { ...state, ...newState };
            }
        case Constants.TASK_PANE_PUSH_URL:
            {
                const index = state.navIndex;
                const nav: string[] = state.navigation;
                //if (areUrlsSame(nav[index], action.payload.url)) {
                //    return state;
                //}
                nav[index + 1] = payload.url
                //If we slotted at a position that is not the end of the array
                //remove everything after it
                if (nav.length > index + 2) {
                    nav.splice(index + 2);
                }
                if (payload.silent === true) {
                    const newState = {
                        navigation: nav
                    };
                    return { ...state, ...newState };
                } else {
                    const newState = {
                        navIndex: index + 1,
                        navigation: nav,
                        lastUrlPushed: true
                    };
                    return { ...state, ...newState };
                }
            }
        case Constants.TASK_INVOKE_URL:
            {
                return mergeNavigatedUrl(state, payload.url);
            }
    }
    return state;
}