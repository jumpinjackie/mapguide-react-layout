import { describe, it, expect } from "vitest";
import { openContextMenu, closeContextMenu } from "../../src/actions/flyout";
import { ActionType } from "../../src/constants/actions";

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
});
