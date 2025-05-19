import { describe, it, expect } from "vitest";
import { createInitAction, createInitialState, createMap } from "../../test-data";
import { initErrorReducer } from "../../src/reducers/init-error";
import { ActionType } from '../../src/constants/actions';
import { IInitErrorAction } from '../../src/actions/defs';
import { acknowledgeInitWarnings } from "../../src/actions/init";
import { IMapView } from "../../src/api/common";

describe("reducers/init-error", () => {
    describe(ActionType.INIT_ERROR, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action: IInitErrorAction = {
                type: ActionType.INIT_ERROR,
                payload: {
                    error: {
                        message: "Uh-oh",
                        stack: [
                            "Foo.js:32",
                            "Bar.js:234"
                        ]
                    },
                    includeStack: true,
                    options: {
                        foo: "bar"
                    }
                }
            };
            const state = initErrorReducer(initialState.initError, action);
            expect(state).not.toBeUndefined();
            expect(state.includeStack).toBe(true);
            expect(state.options).not.toBeUndefined();
            expect(state.options.foo).toBe("bar");
            expect(state.error).not.toBeUndefined();
            expect(state.error!.message).toBe("Uh-oh");
            expect(state.error!.stack).toHaveLength(2);
        });
    });
    describe(ActionType.INIT_ACKNOWLEDGE_WARNINGS, () => {
        it("updates", () => {
            const initialState = JSON.parse(JSON.stringify(createInitialState()));
            initialState.initError.warnings = [
                "foo",
                "bar"
            ];
            const action = acknowledgeInitWarnings();
            const state = initErrorReducer(initialState.initError, action);
            expect(state.warnings).toHaveLength(0);
        });
    });
    describe(ActionType.INIT_APP, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            action.payload.warnings = [
                "Uh-Oh",
                "Uh-Oh",
                "Oh noes!"
            ];
            const state = initErrorReducer(initialState.initError, action);
            expect(state.warnings).toHaveLength(2);
            expect(state.warnings).toContain("Uh-Oh");
            expect(state.warnings).toContain("Oh noes!");
        });
    });
});