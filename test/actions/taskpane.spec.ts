import { describe, it, expect, vi } from "vitest";
import { goBack, goForward, pushUrl, goHome } from "../../src/actions/taskpane";
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
    it("pushUrl with silent flag creates correct action", () => {
        const action = pushUrl("http://example.com/silent", true);
        expect(action.type).toBe(ActionType.TASK_PANE_PUSH_URL);
        expect(action.payload.url).toBe("http://example.com/silent");
        expect(action.payload.silent).toBe(true);
    });
    it("goHome dispatches TASK_PANE_HOME when initialUrl is set", () => {
        const thunk = goHome();
        const dispatch = vi.fn();
        const getState = vi.fn().mockReturnValue({
            taskpane: { initialUrl: "http://example.com/home" }
        });
        thunk(dispatch, getState as any);
        expect(dispatch).toHaveBeenCalledWith({ type: ActionType.TASK_PANE_HOME });
    });
    it("goHome throws when initialUrl is not set", () => {
        const thunk = goHome();
        const dispatch = vi.fn();
        const getState = vi.fn().mockReturnValue({
            taskpane: { initialUrl: null }
        });
        expect(() => thunk(dispatch, getState as any)).toThrow();
    });
});
