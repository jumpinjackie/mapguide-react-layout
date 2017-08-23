import * as Constants from "../constants";
import { IInitErrorReducerState } from "../api/common";
import { AnyAction } from "redux";
import uniq = require("lodash.uniq");

export const INITIAL_STATE: IInitErrorReducerState = {
    options: {},
    error: undefined,
    includeStack: true,
    warnings: []
};

export function initErrorReducer(state = INITIAL_STATE, action: AnyAction = { type: '', payload: null }): IInitErrorReducerState {
    switch (action.type) {
        case Constants.INIT_ACKNOWLEDGE_WARNINGS:
            {
                return { ...state, ...{ warnings: [] } };
            }
        case Constants.INIT_APP:
            {
                return { ...state, ...{ warnings: uniq(action.payload.warnings) } }
            }
        case Constants.INIT_ERROR:
            {
                const payload: any | null = action.payload;
                if (payload) {
                    const error = payload.error;
                    const options = payload.options;
                    let includeStack: boolean | undefined = payload.includeStack;
                    if (typeof(includeStack) == 'undefined') {
                        includeStack = true;
                    }
                    if (error) {
                        return { error: error, options: options, includeStack: includeStack, warnings: [] };
                    }
                }
            }
    }
    return state;
}