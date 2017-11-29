import * as Constants from "../constants";
import { AnyAction } from "redux";

export const AUTH_INITIAL_STATE: any = {
    isAuth: false,
    errorMessage: null,
    user: null,
}

export function authReducer(state = AUTH_INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.CHECK_AUTHENTIFICATED_SUCCESS:
            {
                const state1 = {
                    isAuth: action.payload.isAuth,
                    user: action.payload.user,
                };
                return { ...state, ...state1 };
            }
        case Constants.CHECK_AUTHENTIFICATED_FAILURE:
            {
                const state1 = {
                    errorMessage: action.payload
                };
                return { ...state, ...state1 };
            }
        case Constants.SIGN_IN_SUCCESS:
            {
                const state1 = {
                    isAuth: true,
                    user: action.payload.user,
                };
                return { ...state, ...state1 };
            }
        case Constants.SIGN_IN_FAILURE:
            {
                const state1 = {
                    errorMessage: action.payload
                };
                return { ...state, ...state1 };
            }
        case Constants.LOG_OUT_SUCCESS:
            {
                const state1 = {
                    isAuth: false
                };
                return { ...state, ...state1 };
            }
        case Constants.LOG_OUT_FAILURE:
            {
                const state1 = {
                    errorMessage: action.payload
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}