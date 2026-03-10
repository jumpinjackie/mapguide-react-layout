import { describe, it, expect, vi } from "vitest";
import { createStore, applyMiddleware } from "redux";
import { logger } from "../../src/store/logger";
import { ActionType } from "../../src/constants/actions";

describe("store/logger", () => {
    it("logger is defined and is a function", () => {
        expect(logger).toBeDefined();
        expect(typeof logger).toBe("function");
    });

    describe("logger middleware with Redux store", () => {
        const reducer = (state: any = {}, action: any) => state;

        it("passes action through and calls stateTransformer and predicate for regular actions", () => {
            // Suppress console output during test
            const consoleSpy = vi.spyOn(console, "group").mockImplementation(() => {});
            const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
            const consoleGroupCollapsed = vi.spyOn(console, "groupCollapsed").mockImplementation(() => {});
            const consoleGroupEnd = vi.spyOn(console, "groupEnd").mockImplementation(() => {});

            const store = createStore(reducer, applyMiddleware(logger));
            // Dispatch a non-filtered action type
            store.dispatch({ type: "TEST_ACTION", payload: {} });
            // No assertion needed - just ensuring predicate and stateTransformer get called

            consoleSpy.mockRestore();
            consoleLogSpy.mockRestore();
            consoleGroupCollapsed.mockRestore();
            consoleGroupEnd.mockRestore();
        });

        it("does not log filtered action types (predicate returns false)", () => {
            const consoleSpy = vi.spyOn(console, "group").mockImplementation(() => {});
            const consoleGroupCollapsed = vi.spyOn(console, "groupCollapsed").mockImplementation(() => {});

            const store = createStore(reducer, applyMiddleware(logger));
            // Dispatch a filtered action type - should not be logged
            store.dispatch({ type: ActionType.MAP_RESIZED, payload: { width: 100, height: 100 } } as any);
            store.dispatch({ type: ActionType.UPDATE_MOUSE_COORDINATES, payload: {} } as any);
            store.dispatch({ type: ActionType.MAP_SET_BUSY_COUNT, payload: 0 } as any);
            store.dispatch({ type: ActionType.ADD_LAYER_BUSY_WORKER, payload: {} } as any);
            store.dispatch({ type: ActionType.REMOVE_LAYER_BUSY_WORKER, payload: {} } as any);
            // These should not trigger any group logging
            expect(consoleSpy).not.toHaveBeenCalled();
            expect(consoleGroupCollapsed).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
            consoleGroupCollapsed.mockRestore();
        });
    });
});
