import * as Constants from "../constants";
import { IInitErrorReducerState } from "../api/common";
import { AnyAction } from "redux";
import uniq = require("lodash.uniq");
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const INIT_ERROR_INITIAL_STATE: IInitErrorReducerState = {
    options: {},
    error: undefined,
    includeStack: true,
    warnings: []
};

export function initErrorReducer(state = INIT_ERROR_INITIAL_STATE, action: ViewerAction): IInitErrorReducerState {
    switch (action.type) {
        case ActionType.INIT_ACKNOWLEDGE_WARNINGS:
            {
                return { ...state, ...{ warnings: [] } };
            }
        case ActionType.INIT_APP:
            {
                return { ...state, ...{ warnings: uniq(action.payload.warnings) } }
            }
        case ActionType.INIT_ERROR:
            {
                const { payload } = action;
                const error = payload.error;
                const options = payload.options;
                let includeStack: boolean | undefined = payload.includeStack;
                if (typeof(includeStack) == 'undefined') {
                    includeStack = true;
                }
                return { error: error, options: options, includeStack: includeStack, warnings: [] };
            }
    }
    return state;
}