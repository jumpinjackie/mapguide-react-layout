import { IToolbarReducerState, IDOMElementMetrics } from "../api/common";
import update = require("react-addons-update");
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { isElementState } from './template';
import { WEBLAYOUT_TASKMENU, WEBLAYOUT_CONTEXTMENU } from '../constants';

function mergeFlyoutState(flyoutId: string, state: any, flyoutPayload: any, flyoutUpdateAction: "$set" | "$merge", closeOtherFlyouts: boolean = false) {
    const updateSpec: any = {
        flyouts: {}
    };
    const flyoutUpdateSpec: any = {};
    flyoutUpdateSpec[flyoutUpdateAction] = flyoutPayload;
    updateSpec.flyouts[flyoutId] = flyoutUpdateSpec;
    if (closeOtherFlyouts) {
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
    }
    const newState = update(state, updateSpec);
    return newState;
}

function mergeFlyoutCloseState(flyoutId: string, state: any) {
    return mergeFlyoutState(flyoutId, state, {
        open: false,
        metrics: null
    }, "$merge");
}

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
                    return mergeFlyoutState(flyoutId, state,
                        {
                            open: true,
                            metrics: payload.metrics,
                            componentName: payload.name,
                            componentProps: payload.props
                        },
                        "$set", //Need to use $set instead of $merge as the tree won't have component flyout info initially
                        true);
                }
                return state;
            }
        case ActionType.COMPONENT_CLOSE:
            {
                let flyoutId = action.payload.flyoutId;
                if (flyoutId) {
                    return mergeFlyoutState(flyoutId, state, {
                        open: false,
                        metrics: null,
                        componentName: null,
                        componentProps: null
                    }, "$set"); //Need to use $set instead of $merge as the tree won't have component flyout info initially
                }
                return state;
            }
        case ActionType.CONTEXT_MENU_OPEN:
            {
                return mergeFlyoutState(WEBLAYOUT_CONTEXTMENU, state, {
                    open: true,
                    metrics: {
                        posX: action.payload.x,
                        posY: action.payload.y
                    } as IDOMElementMetrics
                }, "$merge", true);
            }
        case ActionType.FLYOUT_OPEN:
            {
                let flyoutId = action.payload.flyoutId;
                if (flyoutId) {
                    return mergeFlyoutState(flyoutId, state, {
                        open: true,
                        metrics: action.payload.metrics
                    }, "$merge", true);
                }
                return state;
            }
        case ActionType.FUSION_SET_ELEMENT_STATE:
            {
                if (isElementState(action.payload) && !action.payload.taskPaneVisible) {
                    return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state);
                }
                return state;
            }
        case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
            {
                if (!action.payload) {
                    return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state);
                }
                return state;
            }
        case ActionType.FLYOUT_CLOSE:
            {
                let flyoutId = action.payload.flyoutId;
                if (flyoutId) {
                    return mergeFlyoutCloseState(flyoutId, state);
                }
            }
        case ActionType.CONTEXT_MENU_CLOSE:
            {
                return mergeFlyoutCloseState(WEBLAYOUT_CONTEXTMENU, state);
            }
    }
    return state;
}