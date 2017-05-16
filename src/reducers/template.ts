import * as Constants from "../constants";
import {
    ITemplateReducerState
} from "../api/common";
import { isCoordinate } from "../utils/type-guards";

export const INITIAL_STATE: ITemplateReducerState = {
    taskPaneVisible: true,
    selectionPanelVisible: true,
    legendVisible: true
};

export function templateReducer(state = INITIAL_STATE, action = { type: '', payload: undefined }) {
    const data: boolean | undefined = action.payload;
    if (typeof(data) == "boolean") {
        switch (action.type) {
            case Constants.FUSION_SET_LEGEND_VISIBILITY:
                {
                    const state1: Partial<ITemplateReducerState> = { legendVisible: data };
                    return { ...state, ...state1 };
                }
            case Constants.FUSION_SET_SELECTION_PANEL_VISIBILITY:
                {
                    const state1: Partial<ITemplateReducerState> = { selectionPanelVisible: data };
                    return { ...state, ...state1 };
                }
            case Constants.FUSION_SET_TASK_PANE_VISIBILITY:
                {
                    const state1: Partial<ITemplateReducerState> = { taskPaneVisible: data };
                    return { ...state, ...state1 };
                }
        }
    }
    return state;
}