import { describe, it, expect } from "vitest";
import { openContextMenu, closeContextMenu, openFlyout, closeFlyout, openComponent, closeComponent } from "../../src/actions/flyout";
import { ActionType } from "../../src/constants/actions";
import type { IDOMElementMetrics } from "../../src/api/common";

const SAMPLE_METRICS: IDOMElementMetrics = {
    posX: 10,
    posY: 20,
    width: 100,
    height: 50
};

describe("actions/flyout", () => {
    it("openContextMenu creates correct action", () => {
        const pos = { x: 10, y: 20 };
        const action = openContextMenu(pos);
        expect(action.type).toBe(ActionType.CONTEXT_MENU_OPEN);
        expect(action.payload).toMatchObject(pos);
    });
    it("closeContextMenu creates correct action", () => {
        const action = closeContextMenu();
        expect(action.type).toBe(ActionType.CONTEXT_MENU_CLOSE);
    });
    it("openFlyout creates correct action", () => {
        const action = openFlyout("myFlyout", SAMPLE_METRICS);
        expect(action.type).toBe(ActionType.FLYOUT_OPEN);
        expect(action.payload.flyoutId).toBe("myFlyout");
        expect(action.payload.metrics).toEqual(SAMPLE_METRICS);
    });
    it("closeFlyout creates correct action", () => {
        const action = closeFlyout("myFlyout");
        expect(action.type).toBe(ActionType.FLYOUT_CLOSE);
        expect(action.payload.flyoutId).toBe("myFlyout");
    });
    it("openComponent creates correct action", () => {
        const props = { foo: "bar" };
        const action = openComponent("myFlyout", SAMPLE_METRICS, "MyComponent", props);
        expect(action.type).toBe(ActionType.COMPONENT_OPEN);
        expect(action.payload.flyoutId).toBe("myFlyout");
        expect(action.payload.metrics).toEqual(SAMPLE_METRICS);
        expect(action.payload.name).toBe("MyComponent");
        expect(action.payload.props).toEqual(props);
    });
    it("closeComponent creates correct action", () => {
        const action = closeComponent("myFlyout");
        expect(action.type).toBe(ActionType.COMPONENT_CLOSE);
        expect(action.payload.flyoutId).toBe("myFlyout");
    });
});
