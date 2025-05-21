import {
    ReducerFunction,
    ITemplateReducerState,
    TemplateReducerFunction
} from "../api/common";
import { ActionType } from '../constants/actions';
import { IElementState, ViewerAction } from '../actions/defs';

export const TEMPLATE_INITIAL_STATE: ITemplateReducerState = {
    initialInfoPaneWidth: 250,
    initialTaskPaneWidth: 300,
    taskPaneVisible: true,
    selectionPanelVisible: true,
    legendVisible: true,
    autoDisplaySelectionPanelOnSelection: true,
    templateData: {}
};

/**
 * Checks if the given payload is an element state
 *
 * @param {*} args
 * @returns {args is IElementState}
 */
export function isElementState(args: any): args is IElementState {
    return args != null
        && typeof (args.legendVisible) != 'undefined'
        && typeof (args.selectionPanelVisible) != 'undefined'
        && typeof (args.taskPaneVisible) != 'undefined';
}

let _ovReducer: TemplateReducerFunction;

/**
 * Installs a custom template reducer function. This is generally used by viewer templates
 * which need to respond to template-related actions in a way that is unique to the template
 *
 * @param {ReducerFunction<ITemplateReducerState>} func
 */
export function setCustomTemplateReducer(func: TemplateReducerFunction): void {
    _ovReducer = func;
}

export function templateReducer(origState = TEMPLATE_INITIAL_STATE, action: ViewerAction) {
    let state = origState;
    //Whether this reducer has been overridden or not, service the MAP_SET_SELECTION action and
    //if we get modified state, pass that down to the rest of the reducer
    if (action.type == ActionType.MAP_SET_SELECTION) {
        const { selection } = action.payload;
        if (selection && selection.SelectedFeatures) {
            if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) {
                state = {
                    ...origState,
                    // The majority of the templates provided have the SelectionPanel/Legend/TaskPane as
                    // a mutually exclusive visible set, so this new state would be applicable for them.
                    // For templates that do not, they can fix this state up "in post" against the same action
                    // in their overridden reducer
                    ...{ selectionPanelVisible: true, legendVisible: false, taskPaneVisible: false }
                }
            }
        }
    }
    if (action.type == ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE) {
        const { feature } = action.payload;
        if (feature?.properties) {
            state = {
                ...origState,
                // The majority of the templates provided have the SelectionPanel/Legend/TaskPane as
                // a mutually exclusive visible set, so this new state would be applicable for them.
                // For templates that do not, they can fix this state up "in post" against the same action
                // in their overridden reducer
                ...{ selectionPanelVisible: true, legendVisible: false, taskPaneVisible: false }
            }
        }
    }
    if (action.type == ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA) {
        const state1 = { ...state };
        state1.templateData[action.payload.name] = action.payload.value;
        return state1;
    }
    if (typeof (_ovReducer) == 'function') {
        return _ovReducer(origState, state, action);
    } else {
        //If no template present (they would've overridden this reducer), at least service the actions we know affect this
        //particular state branch
        switch (action.type) {
            case ActionType.FUSION_SET_ELEMENT_STATE:
                {
                    if (isElementState(action.payload)) {
                        return { ...state, ...action.payload };
                    }
                    return state;
                }
            case ActionType.INIT_APP:
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