import { IToolbarReducerState } from "../api/common";
import update = require("react-addons-update");
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const TOOLBAR_INITIAL_STATE: IToolbarReducerState = {
    toolbars: {},
    flyouts: {}
};

export function toolbarReducer(state = TOOLBAR_INITIAL_STATE, action: ViewerAction) {
    switch (action.type) {
        case ActionType.INIT_APP:
            {
                return { ...state, ...action.payload.toolbars };
            }
        case ActionType.COMPONENT_OPEN:
            {
                const payload = action.payload;
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
                    //Close others
                    for (const key in state.flyouts) {
                        if (key != flyoutId) {
                            updateSpec.flyouts[key] = {
                                "$merge": {
                                    open: false
                                }
                            };
                        }
                    }
                    const newState = update(state, updateSpec);
                    return newState;
                }
                return state;
            }
        case ActionType.COMPONENT_CLOSE:
            {
                let flyoutId = action.payload.flyoutId;
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
                return state;
            }
        case ActionType.FLYOUT_OPEN:
            {
                let flyoutId = action.payload.flyoutId;
                if (flyoutId) {
                    const updateSpec: any = {
                        flyouts: {}
                    };
                    updateSpec.flyouts[flyoutId] = {
                        "$merge": {
                            open: true,
                            metrics: action.payload.metrics
                        }
                    };
                    //Close others
                    for (const key in state.flyouts) {
                        if (key != flyoutId) {
                            updateSpec.flyouts[key] = {
                                "$merge": {
                                    open: false
                                }
                            };
                        }
                    }
                    const newState = update(state, updateSpec);
                    return newState;
                }
                return state;
            }
        case ActionType.FLYOUT_CLOSE:
            {
                let flyoutId = action.payload.flyoutId;
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