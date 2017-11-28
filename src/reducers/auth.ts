import * as Constants from "../constants";
import { AnyAction } from "redux";

export const AUTH_INITIAL_STATE: any = {
    isAuth: false,
}

export function authReducer(state = AUTH_INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
    return state;
}