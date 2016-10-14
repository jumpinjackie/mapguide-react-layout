import * as Constants from "../constants";
import { IToolbarReducerState } from "../api/common";
const assign = require("object-assign");
import update = require("react-addons-update");

const INITIAL_STATE: IToolbarReducerState = {
    toolbars: {},
    flyouts: {}
};

export function toolbarReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            {
                return assign({}, state, payload.toolbars);
            }
        case Constants.FLYOUT_OPEN:
            {
                let flyoutId = payload.flyoutId;
                if (flyoutId) {
                    const updateSpec: any = {
                        flyouts: {}
                    };
                    updateSpec.flyouts[flyoutId] = {
                        "$merge": {
                            open: true,
                            metrics: payload.metrics
                        }
                    };
                    const newState = update(state, updateSpec);
                    return newState;
                }
            }
        case Constants.FLYOUT_CLOSE:
            {
                let flyoutId = payload.flyoutId;
                if (flyoutId) {
                    const updateSpec: any = {
                        flyouts: {}
                    };
                    updateSpec.flyouts[flyoutId] = {
                        "$merge": {
                            open: false,
                            metrics: null
                        }
                    };
                    const newState = update(state, updateSpec);
                    return newState;
                }
            }
    }
    return state;
}