import { describe, it, expect } from "vitest";
import { lastAction, NULL_ACTION } from "../../src/reducers/last-action";
import { ActionType } from "../../src/constants/actions";

describe("reducers/last-action", () => {
    it("returns NULL_ACTION by default", () => {
        expect(lastAction(undefined, { type: "UNKNOWN" } as any)).toBe(NULL_ACTION);
    });
    it("returns action for handled types", () => {
        const action = { type: ActionType.MAP_SET_BUSY_COUNT, payload: {} };
        expect(lastAction(undefined, action as any)).toBe(action);
    });
    it("returns NULL_ACTION for unhandled types", () => {
        const action = { type: "SOMETHING_ELSE", payload: {} };
        expect(lastAction(undefined, action as any)).toBe(NULL_ACTION);
    });
});
