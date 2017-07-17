import * as Constants from "../constants";
import { IToolbarReducerState } from "../api/common";
import { AnyAction } from "redux";
import update = require("react-addons-update");

export const INITIAL_STATE: IToolbarReducerState = {
    toolbars: {},
    flyouts: {}
};

export function toolbarReducer(state = INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
    const payload: any = action.payload || {};
    switch (action.type) {
        case Constants.INIT_APP:
            {
                return { ...state, ...payload.toolbars };
            }
        case Constants.COMPONENT_OPEN:
            {
                let flyoutId = payload.flyoutId;
                if (flyoutId) {
                    const updateSpec: any = {
                        flyouts: {}
                    };
                    updateSpec.flyouts[flyoutId] = {
                        "$set": { //Need to use $set instead of $merge as the tree won't have component flyout info initially
                            open: true,
                            metrics: payload.metrics,
                            componentName: payload.name,
                            componentProps: payload.props
                        }
                    };
                    const newState = update(state, updateSpec);
                    return newState;
                }
            }
        case Constants.COMPONENT_CLOSE:
            {
                let flyoutId = payload.flyoutId;
                if (flyoutId) {
                    const updateSpec: any = {
                        flyouts: {}
                    };
                    updateSpec.flyouts[flyoutId] = {
                        "$set": { //Need to use $set instead of $merge as the tree won't have component flyout info initially
                            open: false,
                            metrics: null,
                            componentName: null,
                            componentProps: null
                        }
                    };
                    const newState = update(state, updateSpec);
                    return newState;
                }
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