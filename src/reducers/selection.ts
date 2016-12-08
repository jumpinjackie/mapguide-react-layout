import * as Constants from "../constants";
import { ISelectionReducerState } from "../api/common";

const INITIAL_STATE: ISelectionReducerState = {
    selectionSet: null,
    layerIndex: -1,
    featureIndex: -1
};

export function selectionReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.MAP_SET_SELECTION:
            {
                const state1 = {
                    selectionSet: action.payload,
                    layerIndex: -1,
                    featureIndex: -1
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}