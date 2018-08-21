import { ITaskPaneReducerState } from "../api/common";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const TASK_PANE_INITIAL_STATE: ITaskPaneReducerState = {
    navIndex: -1,
    navigation: [],
    initialUrl: undefined,
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

export function taskPaneReducer(state = TASK_PANE_INITIAL_STATE, action: ViewerAction) {
    switch (action.type) {
        case ActionType.INIT_APP:
            {
                const { payload } = action;
                const newState = {
                    initialUrl: payload.initialUrl,
                    navIndex: 0,
                    navigation: [ payload.initialUrl ]
                };
                return { ...state, ...newState };
            }
        case ActionType.TASK_PANE_HOME:
            {
                if (state.initialUrl != null) {
                    return mergeNavigatedUrl(state, state.initialUrl);
                }
                return state;
            }
        case ActionType.TASK_PANE_BACK:
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
        case ActionType.TASK_PANE_FORWARD:
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
        case ActionType.TASK_PANE_PUSH_URL:
            {
                const { payload } = action;
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
        case ActionType.TASK_INVOKE_URL:
            {
                return mergeNavigatedUrl(state, action.payload.url);
            }
    }
    return state;
}