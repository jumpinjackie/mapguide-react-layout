import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
    current: null,
    mouse: null,
    history: []
};

export function viewReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.UPDATE_MOUSE_COORDINATES:
            {
                return assign({}, state, { mouse: action.payload });
            }
        case Constants.MAP_SET_SCALE: 
            {
                let view = state.current;
                if (typeof view === 'object') {
                    view = assign({}, view, { scale: action.payload });
                }
                const newState = assign({}, state, {
                    current: view
                });
                newState.history.push({
                    x: view.x,
                    y: view.y,
                    scale: view.scale
                });
                return newState;
            }
        case Constants.MAP_SET_VIEW:
            {
                const newState = assign({}, state, {
                    current: action.payload
                });
                newState.history.push(action.payload);
                return newState;
            }
    }
    return state;
}