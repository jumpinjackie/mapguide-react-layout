import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = { };

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
                const newState = assign({}, state, newData);
                return newState;
            }
        case Constants.MODAL_SHOW_URL:
            {
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: action.payload.modal,
                    url: action.payload.url
                };
                const newState = assign({}, state, newData);
                return newState;
            }
        case Constants.MODAL_CLOSE:
            {
                let newState = assign({}, state);
                delete newState[action.payload];
                return newState;
            }
    }
    return state;
}