/**
 * template.ts
 *
 * Actions to support fusion templates
 */
import * as Constants from "../constants";
import { ReduxAction } from "../api/common";

export function setTaskPaneVisibility(visible: boolean): ReduxAction {
    return {
        type: Constants.FUSION_SET_TASK_PANE_VISIBILITY,
        payload: visible
    };
}

export function setSelectionPanelVisibility(visible: boolean): ReduxAction {
    return {
        type: Constants.FUSION_SET_SELECTION_PANEL_VISIBILITY,
        payload: visible
    };
}

/*
export function setOverviewMapVisibility(visible: boolean): ReduxAction {
    return {
        type: Constants.FUSION_SET_OVERVIEW_MAP_VISIBILITY,
        payload: visible
    };
}
*/

export function setLegendVisibility(visible: boolean): ReduxAction {
    return {
        type: Constants.FUSION_SET_LEGEND_VISIBILITY,
        payload: visible
    };
}