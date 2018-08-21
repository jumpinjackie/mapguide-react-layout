import {
    IMouseReducerState
} from "../api/common";
import { isCoordinate } from "../utils/type-guards";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const MOUSE_INITIAL_STATE: IMouseReducerState = {
    coords: undefined
};

export function mouseReducer(state = MOUSE_INITIAL_STATE, action: ViewerAction) {
    switch (action.type) {
        case ActionType.UPDATE_MOUSE_COORDINATES:
            {
                const data = action.payload.coord;
                if (isCoordinate(data)) {
                    const state1: Partial<IMouseReducerState> = { coords: data };
                    return { ...state, ...state1 };
                }
            }
    }
    return state;
}