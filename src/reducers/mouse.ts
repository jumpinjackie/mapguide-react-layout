import * as Constants from "../constants";
import {
    IMouseReducerState
} from "../api/common";
import { isCoordinate } from "../utils/type-guards";

export const INITIAL_STATE: IMouseReducerState = {
    coords: undefined
};

export function mouseReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = typeof(action.payload) != 'undefined' ? action.payload : {};
    switch (action.type) {
        case Constants.UPDATE_MOUSE_COORDINATES:
            {
                const data = payload.coord;
                if (isCoordinate(data)) {
                    const state1: Partial<IMouseReducerState> = { coords: data };
                    return { ...state, ...state1 };
                }
            }
    }
    return state;
}