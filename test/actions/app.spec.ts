import { describe, it, expect } from "vitest";
import { setAppSetting } from "../../src/actions/app";
import { ActionType } from "../../src/constants/actions";

describe("actions/app", () => {
    it("setAppSetting creates correct action", () => {
        const action = setAppSetting("FOO", "BAR");
        expect(action.type).toBe(ActionType.SET_APP_SETTING);
        expect(action.payload).toEqual({ key: "FOO", value: "BAR" });
    });
});
