import * as Constants from "../constants";
const assign = require("object-assign");
import { areUrlsSame } from "../utils/url";

const INITIAL_STATE = {
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
    return assign({}, state, {
        navIndex: index,
        navigation: nav,
        lastUrlPushed: false
    });
}

export function taskPaneReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP:
            {
                return assign({}, state, {
                    initialUrl: action.payload.initialUrl,
                    navIndex: 0,
                    navigation: [ action.payload.initialUrl ]
                });
            }
        case Constants.TASK_PANE_HOME:
            {
                return mergeNavigatedUrl(state, state.initialUrl);
            }
        case Constants.TASK_PANE_BACK:
            {
                let index = state.navIndex;
                const nav = state.navigation;
                index--;
                return assign({}, state, {
                    navIndex: index,
                    navigation: nav,
                    lastUrlPushed: false
                });
            }
        case Constants.TASK_PANE_FORWARD:
            {
                let index = state.navIndex;
                const nav = state.navigation;
                index++;
                return assign({}, state, {
                    navIndex: index,
                    navigation: nav,
                    lastUrlPushed: false
                });
            }
        case Constants.TASK_PANE_PUSH_URL:
            {
                const index = state.navIndex;
                const nav: string[] = state.navigation;
                //if (areUrlsSame(nav[index], action.payload.url)) {
                //    return state;
                //}
                nav[index + 1] = action.payload.url
                //If we slotted at a position that is not the end of the array
                //remove everything after it
                if (nav.length > index + 2) {
                    nav.splice(index + 2);
                }
                if (action.payload.silent === true) {
                    return assign({}, state, {
                        navigation: nav
                    });
                } else {
                    return assign({}, state, {
                        navIndex: index + 1,
                        navigation: nav,
                        lastUrlPushed: true
                    });
                }
            }
        case Constants.CMD_INVOKE_URL:
            {
                //TODO: If/When we support invoke URL targets, then obviously we only want
                //to state transition if target is TaskPane
                return mergeNavigatedUrl(state, action.payload.url);
            }
    }
    return state;
}