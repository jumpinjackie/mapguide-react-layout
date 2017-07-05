import * as Constants from "../constants";
import { IModalReducerState, ReduxAction } from "../api/common";

export const INITIAL_STATE = { };

export function modalReducer(state = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
        case Constants.MODAL_SHOW_COMPONENT:
            {
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: action.payload.modal,
                    component: action.payload.component,
                    componentProps: action.payload.props
                };
                return { ...state, ...newData };
            }
        case Constants.MODAL_SHOW_URL:
            {
                const newData: any = {};
                newData[action.payload.name] = { ...action.payload };
                return { ...state, ...newData };
            }
        case Constants.MODAL_CLOSE:
            {
                let newState: any = { ...state };
                delete newState[action.payload];
                return newState;
            }
    }
    return state;
}