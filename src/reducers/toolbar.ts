import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {

};

export function toolbarReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP:
            return assign({}, state, action.payload.toolbars);
    }
    return state;
}