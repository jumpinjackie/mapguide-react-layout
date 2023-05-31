/**
 * template.ts
 *
 * Actions to support fusion templates
 */
import { ActionType } from '../constants/actions';
import { IElementState, ITemplateSetElementStateAction, ITemplateSetTaskPaneVisibilityAction, ITemplateSetSelectionPanelVisibility, ITemplateSetLegendVisibility, ITemplateSetCustomDataAction } from './defs';

export function setElementStates(states: IElementState): ITemplateSetElementStateAction {
    return {
        type: ActionType.FUSION_SET_ELEMENT_STATE,
        payload: states
    };
}

export function setTaskPaneVisibility(visible: boolean): ITemplateSetTaskPaneVisibilityAction {
    return {
        type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY,
        payload: visible
    };
}

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

export function setLegendVisibility(visible: boolean): ITemplateSetLegendVisibility {
    return {
        type: ActionType.FUSION_SET_LEGEND_VISIBILITY,
        payload: visible
    };
}

/**
 * 
 * @param name 
 * @param value 
 * @returns 
 * 
 * @since 0.14.8
 */
export function setTemplateCustomData(name: string, value: any): ITemplateSetCustomDataAction {
    return {
        type: ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA,
        payload: {
            name,
            value
        }
    }
}