import { createInitialState } from "../../test-data";
import { initErrorReducer } from "../../src/reducers/init-error";
import { ActionType } from '../../src/constants/actions';
import { IInitErrorAction } from '../../src/actions/defs';

describe("reducers/init-error", () => {
    it("INIT_ERROR", () => {
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
        if (state.error) { //HACK: TS strict null check workaround
            expect(state.error.message).toBe("Uh-oh");
            expect(state.error.stack).toHaveLength(2);
        }
    });
});