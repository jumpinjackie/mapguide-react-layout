import * as Constants from "../constants";
import { IToolbarReducerState } from "../api/common";
const assign = require("object-assign");

const INITIAL_STATE: IToolbarReducerState = {

};

export function toolbarReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            return assign({}, state, payload.toolbars);
    }
    return state;
}