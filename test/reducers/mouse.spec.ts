import { setMouseCoordinates } from "../../src/actions/map";
import { ActionType } from "../../src/constants/actions";
import { mouseReducer } from "../../src/reducers/mouse";
import { createInitialState } from "../../test-data";

describe("reducers/mouse", () => {
    describe(ActionType.UPDATE_MOUSE_COORDINATES, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = setMouseCoordinates("Foo", [123, 456]);
            const state = mouseReducer(initialState.mouse, action);
            expect(state.coords).not.toBeUndefined();
            expect(state.coords![0]).toBe(action.payload.coord[0]);
            expect(state.coords![1]).toBe(action.payload.coord[1]);
        })
    })
});