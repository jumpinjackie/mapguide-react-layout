import { expect } from 'chai';
import * as Constants from "../src/constants";
import { IView } from "../src/api/contracts/common";
import { IApplicationState } from "../src/api/common";
import { RuntimeMap } from "../src/api/contracts/runtime-map";
import thunk from 'redux-thunk';
import { createMap, createInitAction, createInitialState } from "./test-data";
import { initErrorReducer } from "../src/reducers/initError";

describe("reducers/initError", () => {
    it("INIT_ERROR", () => {
        const initialState = createInitialState();
        const action = {
            type: Constants.INIT_ERROR,
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
        const state = initErrorReducer(initialState.initError, action as any);
        expect(state).to.not.be.null;
        expect(state.includeStack).to.be.true;
        expect(state.options).to.not.be.null;
        expect(state.options.foo).to.be.equal("bar");
        expect(state.error).to.not.be.null;
        expect(state.error.message).to.be.equal("Uh-oh");
        expect(state.error.stack).to.have.length(2);
    });
});