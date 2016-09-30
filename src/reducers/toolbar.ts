import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {

};

export function toolbarReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            return assign({}, state, payload.toolbars);
    }
    return state;
}