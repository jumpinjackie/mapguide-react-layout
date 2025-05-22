import { describe, it, expect } from "vitest";
import { goBack, goForward, pushUrl } from "../../src/actions/taskpane";
import { ActionType } from "../../src/constants/actions";

describe("actions/taskpane", () => {
    it("goBack creates correct action", () => {
        const action = goBack();
        expect(action.type).toBe(ActionType.TASK_PANE_BACK);
    });
    it("goForward creates correct action", () => {
        const action = goForward();
        expect(action.type).toBe(ActionType.TASK_PANE_FORWARD);
    });
    it("pushUrl creates correct action", () => {
        const action = pushUrl("http://example.com");
        expect(action.type).toBe(ActionType.TASK_PANE_PUSH_URL);
        expect(action.payload.url).toBe("http://example.com");
    });
});
