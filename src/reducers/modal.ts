import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { IModalReducerState } from '../api/common';

export const MODAL_INITIAL_STATE: IModalReducerState = { };

export function modalReducer(state = MODAL_INITIAL_STATE, action: ViewerAction): IModalReducerState {
    switch (action.type) {
        case ActionType.MODAL_SHOW_COMPONENT:
            {
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: action.payload.modal,
                    component: action.payload.component,
                    componentProps: action.payload.componentProps
                };
                return { ...state, ...newData };
            }
        case ActionType.MODAL_SHOW_URL:
            {
                const newData: any = {};
                newData[action.payload.name] = { ...action.payload };
                return { ...state, ...newData };
            }
        case ActionType.MODAL_CLOSE:
            {
                let newState: any = { ...state };
                delete newState[action.payload];
                return newState;
            }
    }
    return state;
}