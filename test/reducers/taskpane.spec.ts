import { describe, it, expect } from "vitest";
import { taskPaneReducer, TASK_PANE_INITIAL_STATE } from "../../src/reducers/taskpane";
import { ActionType } from "../../src/constants/actions";

describe("reducers/taskpane", () => {
    it("returns initial state by default", () => {
        expect(taskPaneReducer(undefined, { type: "UNKNOWN" } as any)).toEqual(TASK_PANE_INITIAL_STATE);
    });
    it("handles INIT_APP", () => {
        const action = { type: ActionType.INIT_APP, payload: { initialUrl: "foo" } };
        const state = taskPaneReducer(TASK_PANE_INITIAL_STATE, action as any);
        expect(state.initialUrl).toBe("foo");
        expect(state.navigation[0]).toBe("foo");
        expect(state.navIndex).toBe(0);
    });
    it("handles TASK_PANE_HOME", () => {
        const state = { ...TASK_PANE_INITIAL_STATE, initialUrl: "bar", navIndex: 1, navigation: ["foo", "bar"] };
        const action = { type: ActionType.TASK_PANE_HOME };
        const newState = taskPaneReducer(state, action as any);
        expect(newState.navigation.includes("bar")).toBe(true);
    });
    it("handles TASK_PANE_BACK and FORWARD", () => {
        const state = { ...TASK_PANE_INITIAL_STATE, navIndex: 1, navigation: ["foo", "bar"] };
        const back = taskPaneReducer(state, { type: ActionType.TASK_PANE_BACK } as any);
        expect(back.navIndex).toBe(0);
        const fwd = taskPaneReducer(state, { type: ActionType.TASK_PANE_FORWARD } as any);
        expect(fwd.navIndex).toBe(2);
    });
    it("handles TASK_PANE_PUSH_URL", () => {
        const state = { ...TASK_PANE_INITIAL_STATE, navIndex: 0, navigation: ["foo"] };
        const action = { type: ActionType.TASK_PANE_PUSH_URL, payload: { url: "bar" } };
        const newState = taskPaneReducer(state, action as any);
        expect(newState.navigation[1]).toBe("bar");
        expect(newState.lastUrlPushed).toBe(true);
    });
});
