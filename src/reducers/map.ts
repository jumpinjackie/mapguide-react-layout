import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
    state: null
};

export function runtimeMapReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_APP:
            const newState = assign({}, state, { "state": action.payload.map });
            return newState;
    }
    return state;
}