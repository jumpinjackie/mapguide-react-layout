import { describe, it, expect } from "vitest";
import { applyInitialBaseLayerVisibility, acknowledgeInitWarnings, normalizeInitPayload } from "../../src/actions/init";
import { ActionType } from "../../src/constants/actions";
import { registerLayout } from "../../src/api/registry/layout";

describe("actions/init", () => {
    it("applyInitialBaseLayerVisibility sets first non-UTFGrid visible", () => {
        const layers = [
            { kind: "UTFGrid", visible: false },
            { kind: "OSM", visible: false },
            { kind: "UTFGrid", visible: false }
        ];
        applyInitialBaseLayerVisibility(layers as any);
        expect(layers[1].visible).toBe(true);
        expect(layers[0].visible).toBe(true);
        expect(layers[2].visible).toBe(true);
    });
    it("does nothing if no layers", () => {
        const layers: any[] = [];
        applyInitialBaseLayerVisibility(layers);
        expect(layers).toHaveLength(0);
    });
    it("applyInitialBaseLayerVisibility with only UTFGrid layers sets all visible", () => {
        const layers = [
            { kind: "UTFGrid", visible: false },
            { kind: "UTFGrid", visible: false }
        ];
        applyInitialBaseLayerVisibility(layers as any);
        expect(layers[0].visible).toBe(true);
        expect(layers[1].visible).toBe(true);
    });
    it("acknowledgeInitWarnings creates correct action", () => {
        const action = acknowledgeInitWarnings();
        expect(action.type).toBe(ActionType.INIT_ACKNOWLEDGE_WARNINGS);
    });
    it("normalizeInitPayload returns payload unchanged when layout is undefined", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, undefined);
        expect(result.capabilities.hasTaskPane).toBe(true);
    });
    it("normalizeInitPayload returns payload unchanged when layout is empty string", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "");
        expect(result.capabilities.hasTaskPane).toBe(true);
    });
    it("normalizeInitPayload overrides hasTaskPane when layout caps say no task pane", () => {
        // Each test uses a unique layout name to avoid cross-test state contamination in the module-level registry
        registerLayout("no-taskpane-layout-init-test", () => null as any, { hasTaskPane: false });
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "no-taskpane-layout-init-test");
        expect(result.capabilities.hasTaskPane).toBe(false);
    });
    it("normalizeInitPayload does not override hasTaskPane when layout caps say there is a task pane", () => {
        // Each test uses a unique layout name to avoid cross-test state contamination in the module-level registry
        registerLayout("with-taskpane-layout-init-test", () => null as any, { hasTaskPane: true });
        const payload: any = {
            capabilities: { hasTaskPane: false }
        };
        const result = normalizeInitPayload(payload, "with-taskpane-layout-init-test");
        // capabilities.hasTaskPane is only overridden to false, not to true
        expect(result.capabilities.hasTaskPane).toBe(false);
    });
    it("normalizeInitPayload returns payload unchanged when layout is not registered", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "unknown-layout");
        expect(result.capabilities.hasTaskPane).toBe(true);
    });
});
