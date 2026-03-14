import { describe, it, expect } from "vitest";
import { configureStore } from "../../src/store/configure-store";
import { ActionType } from "../../src/constants/actions";
import type { ViewerAction } from "../../src/actions/defs";

describe("store/configure-store", () => {
    it("creates a store with default root reducers", () => {
        const store = configureStore({});
        const state = store.getState();

        expect(state).not.toBeNull();
        expect(state.initError).not.toBeUndefined();
        expect(state.config).not.toBeUndefined();
        expect(state.template).not.toBeUndefined();
        expect(state.mapState).not.toBeUndefined();
        expect(state.viewer).not.toBeUndefined();
        expect(state.toolbar).not.toBeUndefined();
        expect(state.taskpane).not.toBeUndefined();
        expect(state.modal).not.toBeUndefined();
        expect(state.mouse).not.toBeUndefined();
        expect(state.lastaction).not.toBeUndefined();
    });

    it("creates a store with extra reducers when provided", () => {
        const customReducer = (state = { value: 42 }, _action: ViewerAction) => state;
        const store = configureStore({}, { custom: customReducer });
        const state = store.getState() as ReturnType<typeof store.getState> & { custom: { value: number } };

        expect(state.custom).not.toBeUndefined();
        expect(state.custom.value).toBe(42);
    });

    it("dispatches actions that are processed by the root reducers", () => {
        const store = configureStore({});
        const initialBusyCount = store.getState().viewer.busyCount;
        expect(initialBusyCount).toBe(0);

        const action: ViewerAction = {
            type: ActionType.MAP_SET_BUSY_COUNT,
            payload: 3
        };
        store.dispatch(action);

        expect(store.getState().viewer.busyCount).toBe(3);
    });

    it("uses provided initial state", () => {
        const initialState = {
            viewer: {
                busyCount: 5,
                size: undefined,
                tool: 0,
                featureTooltipsEnabled: false
            }
        };
        const store = configureStore(initialState);
        expect(store.getState().viewer.busyCount).toBe(5);
        expect(store.getState().viewer.featureTooltipsEnabled).toBe(false);
    });
});
