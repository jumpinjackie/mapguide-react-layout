/**
 * template.ts
 *
 * Actions to support fusion templates
 */
import { ActionType } from '../constants/actions';
import { IElementState, ITemplateSetElementStateAction, ITemplateSetTaskPaneVisibilityAction, ITemplateSetSelectionPanelVisibility, ITemplateSetLegendVisibility } from './defs';

/**
 * Sets the element visibility states of the current template
 *
 * @export
 * @param {IElementState} states
 * @returns {ITemplateSetElementStateAction}
 * 
 * @browserapi MapGuide.Actions.Template
 */
export function setElementStates(states: IElementState): ITemplateSetElementStateAction {
    return {
        type: ActionType.FUSION_SET_ELEMENT_STATE,
        payload: states
    };
}

/**
 * Sets the visibility of the task pane
 *
 * @export
 * @param {boolean} visible
 * @returns {ITemplateSetTaskPaneVisibilityAction}
 * 
 * @browserapi MapGuide.Actions.Template
 */
export function setTaskPaneVisibility(visible: boolean): ITemplateSetTaskPaneVisibilityAction {
    return {
        type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY,
        payload: visible
    };
}

/**
 * Sets the visibility of the selection panel
 *
 * @export
 * @param {boolean} visible
 * @returns {ITemplateSetSelectionPanelVisibility}
 * 
 * @browserapi MapGuide.Actions.Template
 */
export function setSelectionPanelVisibility(visible: boolean): ITemplateSetSelectionPanelVisibility {
    return {
        type: ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY,
        payload: visible
    };
}

/*
export function setOverviewMapVisibility(visible: boolean): ReduxAction {
    return {
        type: ActionType.FUSION_SET_OVERVIEW_MAP_VISIBILITY,
        payload: visible
    };
}
*/

/**
 * Sets the visibility of the legend
 *
 * @export
 * @param {boolean} visible
 * @returns {ITemplateSetLegendVisibility}
 * @browserapi MapGuide.Actions.Template
 */
export function setLegendVisibility(visible: boolean): ITemplateSetLegendVisibility {
    return {
        type: ActionType.FUSION_SET_LEGEND_VISIBILITY,
        payload: visible
    };
}