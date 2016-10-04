import * as Constants from "../constants";
import { IInitErrorReducerState } from "../api/common";
const assign = require("object-assign");

const INITIAL_STATE: IInitErrorReducerState = {
    options: {},
    error: undefined
};

export function initErrorReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Constants.INIT_ERROR:
            {
                const payload: any | null = action.payload;
                if (payload) {
                    const error = payload.error;
                    const options = payload.options;
                    if (error instanceof Error) {
                        return { error: error, options: options };
                    }
                }
            }
    }
    return state;
}