import * as Constants from "../constants";
import {
    ReducerFunction,
    ITemplateReducerState
} from "../api/common";
import { isCoordinate } from "../utils/type-guards";
import { IElementState } from "../actions/template";
import { AnyAction } from "redux";

export const TEMPLATE_INITIAL_STATE: ITemplateReducerState = {
    initialInfoPaneWidth: 250,
    initialTaskPaneWidth: 250,
    taskPaneVisible: true,
    selectionPanelVisible: true,
    legendVisible: true
};

/**
 * Checks if the given payload is an element state
 *
 * @export
 * @param {*} args
 * @returns {args is IElementState}
 */
export function isElementState(args: any): args is IElementState {
    return args != null
        && typeof(args.legendVisible) != 'undefined'
        && typeof(args.selectionPanelVisible) != 'undefined'
        && typeof(args.taskPaneVisible) != 'undefined';
}

let _ovReducer: ReducerFunction<ITemplateReducerState>;

/**
 * Installs a custom template reducer function. This is generally used by viewer templates
 * which need to respond to template-related actions in a way that is unique to the template
 *
 * @export
 * @param {ReducerFunction<ITemplateReducerState>} func
 */
export function setCustomTemplateReducer(func: ReducerFunction<ITemplateReducerState>): void {
    _ovReducer = func;
}

export function templateReducer(state = TEMPLATE_INITIAL_STATE, action: AnyAction = { type: '', payload: undefined }) {
    if (typeof(_ovReducer) == 'function') {
        return _ovReducer(state, action);
    } else {
        //If no template present (they would've overridden this reducer), at least service the actions we know affect this
        //particular state branch
        switch (action.type) {
            case Constants.FUSION_SET_ELEMENT_STATE:
                {
                    if (isElementState(action.payload)) {
                        return { ...state, ...action.payload };
                    }
                }
            case Constants.INIT_APP:
                {
                    let state1: Partial<ITemplateReducerState> = {};
                    if (action.payload.initialTaskPaneWidth) {
                        state1.initialTaskPaneWidth = action.payload.initialTaskPaneWidth;
                    }
                    if (action.payload.initialInfoPaneWidth) {
                        state1.initialInfoPaneWidth = action.payload.initialInfoPaneWidth;
                    }
                    return { ...state, ...state1 };
                }
        }
    }
    return state;
}