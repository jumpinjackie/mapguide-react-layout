import { describe, it, expect, beforeEach } from "vitest";
import { templateReducer, TEMPLATE_INITIAL_STATE, setCustomTemplateReducer, isElementState } from "../../src/reducers/template";
import { ActionType } from "../../src/constants/actions";

describe("reducers/template", () => {
    beforeEach(() => {
        // Reset custom reducer between tests
        setCustomTemplateReducer(undefined as any);
    });

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

    it("handles MAP_SET_SELECTION with SelectedFeatures to show selection panel", () => {
        const action = {
            type: ActionType.MAP_SET_SELECTION,
            payload: {
                mapName: "Map1",
                selection: {
                    SelectedFeatures: {
                        SelectedLayer: [{ "@id": "l1", "@name": "Roads", Feature: [] }]
                    }
                }
            }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.selectionPanelVisible).toBe(true);
        expect(state.legendVisible).toBe(false);
        expect(state.taskPaneVisible).toBe(false);
    });

    it("handles MAP_SET_SELECTION with empty SelectedLayer - does not change visibility", () => {
        const action = {
            type: ActionType.MAP_SET_SELECTION,
            payload: {
                mapName: "Map1",
                selection: {
                    SelectedFeatures: {
                        SelectedLayer: []
                    }
                }
            }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.selectionPanelVisible).toBe(TEMPLATE_INITIAL_STATE.selectionPanelVisible);
    });

    it("handles MAP_SET_SELECTION with no SelectedFeatures - does not change visibility", () => {
        const action = {
            type: ActionType.MAP_SET_SELECTION,
            payload: {
                mapName: "Map1",
                selection: { FeatureSet: { Layer: [] } }
            }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.selectionPanelVisible).toBe(TEMPLATE_INITIAL_STATE.selectionPanelVisible);
    });

    it("handles MAP_ADD_CLIENT_SELECTED_FEATURE with properties to show selection panel", () => {
        const action = {
            type: ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE,
            payload: {
                mapName: "Map1",
                layerName: "VectorLayer",
                feature: { properties: { color: "red" }, bounds: [0, 0, 1, 1] }
            }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.selectionPanelVisible).toBe(true);
        expect(state.legendVisible).toBe(false);
        expect(state.taskPaneVisible).toBe(false);
    });

    it("handles MAP_ADD_CLIENT_SELECTED_FEATURE with no properties - does not change visibility", () => {
        const action = {
            type: ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE,
            payload: {
                mapName: "Map1",
                layerName: "VectorLayer",
                feature: { bounds: [0, 0, 1, 1] }
            }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.selectionPanelVisible).toBe(TEMPLATE_INITIAL_STATE.selectionPanelVisible);
    });

    it("handles FUSION_SET_TEMPLATE_CUSTOM_DATA", () => {
        const action = {
            type: ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA,
            payload: { name: "theme", value: "dark" }
        };
        const state = templateReducer(TEMPLATE_INITIAL_STATE, action as any);
        expect(state.templateData["theme"]).toBe("dark");
    });

    describe("isElementState", () => {
        it("returns true for valid element state object", () => {
            expect(isElementState({ legendVisible: true, selectionPanelVisible: false, taskPaneVisible: true })).toBe(true);
        });
        it("returns false for null", () => {
            expect(isElementState(null)).toBe(false);
        });
        it("returns false for object missing taskPaneVisible", () => {
            expect(isElementState({ legendVisible: true, selectionPanelVisible: false })).toBe(false);
        });
    });
});
