import { describe, it, expect } from "vitest";
import { templateReducer, TEMPLATE_INITIAL_STATE, setCustomTemplateReducer } from "../../src/reducers/template";
import { ActionType } from "../../src/constants/actions";

describe("reducers/template", () => {
    it("returns initial state by default", () => {
        expect(templateReducer(undefined, { type: "UNKNOWN" } as any)).toEqual(TEMPLATE_INITIAL_STATE);
    });
    it("handles FUSION_SET_ELEMENT_STATE", () => {
        const action = { type: ActionType.FUSION_SET_ELEMENT_STATE, payload: { legendVisible: false, selectionPanelVisible: false, taskPaneVisible: false } };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.legendVisible).toBe(false);
        expect(state.selectionPanelVisible).toBe(false);
        expect(state.taskPaneVisible).toBe(false);
    });
    it("handles INIT_APP", () => {
        const action = { type: ActionType.INIT_APP, payload: { initialTaskPaneWidth: 123, initialInfoPaneWidth: 456 } };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.initialTaskPaneWidth).toBe(123);
        expect(state.initialInfoPaneWidth).toBe(456);
    });
    it("calls custom reducer if set", () => {
        setCustomTemplateReducer((orig, state, action) => ({ ...state, custom: true }));
        const action = { type: "ANY" };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect((state as any).custom).toBe(true);
    });
});
