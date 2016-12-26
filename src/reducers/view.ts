import * as Constants from "../constants";
import { IMapView, IViewReducerState } from "../api/common";
import { isMapView } from "../utils/type-guards";

export const INITIAL_STATE: IViewReducerState = {
    current: null,
    initial: null,
    mouse: null,
    history: [],
    historyIndex: -1
};

export function viewReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            {
                const state1 = {
                    initial: payload.initialView
                };
                return { ...state, ...state1 };
            }
        case Constants.MAP_PREVIOUS_VIEW:
            {
                const index = state.historyIndex - 1;
                const state1 = {
                    historyIndex: index,
                    current: state.history[index]
                };
                return { ...state, ...state1 };
            }
        case Constants.MAP_NEXT_VIEW:
            {
                const index = state.historyIndex + 1;
                const state1 = {
                    historyIndex: index,
                    current: state.history[index]
                };
                return { ...state, ...state1 };
            }
        case Constants.UPDATE_MOUSE_COORDINATES:
            {
                const state1 = { mouse: action.payload };
                return { ...state, ...state1 };
            }
        case Constants.MAP_SET_SCALE: 
            {
                let view = state.current;
                if (typeof view === 'object' && typeof payload === 'number') {
                    const state1 = { scale: payload };
                    view = { ...view, ...state1 };
                }
                const state2 = {
                    current: view
                };
                const newState = { ...state, ...state2 };
                if (view) {
                    newState.history.push({
                        x: view.x,
                        y: view.y,
                        scale: view.scale
                    });
                    return newState;
                }
            }
        case Constants.MAP_SET_VIEW:
            {
                if (isMapView(payload)) {
                    const state1 = {
                        current: payload
                    };
                    const newState = { ...state, ...state1 };
                    newState.historyIndex++;
                    newState.history[newState.historyIndex] = payload;
                    //If we slotted at a position that is not the end of the array
                    //remove everything after it
                    if (newState.history.length > newState.historyIndex + 1) {
                        newState.history.splice(newState.historyIndex + 1);
                    }
                    return newState;
                }
            }
    }
    return state;
}