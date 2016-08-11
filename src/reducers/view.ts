import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
    current: null,
    history: []
};

export function viewReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.MAP_SET_VIEW:
            const newState = assign({}, state, {
                current: action.payload
            });
            newState.history.push(action.payload);
            return newState;
    }
    return state;
}