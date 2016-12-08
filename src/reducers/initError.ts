import * as Constants from "../constants";
import { IInitErrorReducerState } from "../api/common";

const INITIAL_STATE: IInitErrorReducerState = {
    options: {},
    error: undefined,
    includeStack: true
};

export function initErrorReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
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
                        return { error: error, options: options, includeStack: includeStack };
                    }
                }
            }
    }
    return state;
}