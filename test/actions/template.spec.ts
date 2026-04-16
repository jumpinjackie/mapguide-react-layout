import { describe, it, expect } from "vitest";
import { setElementStates, setTaskPaneVisibility, setSelectionPanelVisibility, setLegendVisibility, setTemplateCustomData } from "../../src/actions/template";
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
    it("setTemplateCustomData creates correct action", () => {
        const action = setTemplateCustomData("theme", "dark");
        expect(action.type).toBe(ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA);
        expect(action.payload).toEqual({ name: "theme", value: "dark" });
    });
    it("setTemplateCustomData works with object value", () => {
        const value = { key: "value", count: 5 };
        const action = setTemplateCustomData("settings", value);
        expect(action.type).toBe(ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA);
        expect(action.payload.name).toBe("settings");
        expect(action.payload.value).toBe(value);
    });
});
