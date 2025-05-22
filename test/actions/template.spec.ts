import { describe, it, expect } from "vitest";
import { setElementStates, setTaskPaneVisibility, setSelectionPanelVisibility, setLegendVisibility } from "../../src/actions/template";
import { ActionType } from "../../src/constants/actions";

describe("actions/template", () => {
    it("setElementStates creates correct action", () => {
        const states = { legendVisible: true, selectionPanelVisible: false, taskPaneVisible: true };
        const action = setElementStates(states as any);
        expect(action.type).toBe(ActionType.FUSION_SET_ELEMENT_STATE);
        expect(action.payload).toBe(states);
    });
    it("setTaskPaneVisibility creates correct action", () => {
        const action = setTaskPaneVisibility(true);
        expect(action.type).toBe(ActionType.FUSION_SET_TASK_PANE_VISIBILITY);
        expect(action.payload).toBe(true);
    });
    it("setSelectionPanelVisibility creates correct action", () => {
        const action = setSelectionPanelVisibility(false);
        expect(action.type).toBe(ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY);
        expect(action.payload).toBe(false);
    });
    it("setLegendVisibility creates correct action", () => {
        const action = setLegendVisibility(true);
        expect(action.type).toBe(ActionType.FUSION_SET_LEGEND_VISIBILITY);
        expect(action.payload).toBe(true);
    });
});
