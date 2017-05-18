import * as Constants from "../constants";
import {
    ReducerFunction,
    ITemplateReducerState
} from "../api/common";
import { isCoordinate } from "../utils/type-guards";
import { IElementState } from "../actions/template";

export const INITIAL_STATE: ITemplateReducerState = {
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

export function templateReducer(state = INITIAL_STATE, action = { type: '', payload: undefined }) {
    if (typeof(_ovReducer) == 'function') {
        return _ovReducer(state, action);
    }
    return state;
}