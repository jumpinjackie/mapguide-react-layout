import { hideModal, showModalComponent, showModalUrl } from "../../src/actions/modal";
import { ActionType } from "../../src/constants/actions";
import { modalReducer } from "../../src/reducers/modal";
import { createInitialState } from "../../test-data";

describe("reducers/modal", () => {
    describe(ActionType.MODAL_SHOW_URL, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = showModalUrl({
                url: "https://www.google.com",
                name: "Google",
                modal: {
                    title: "Google",
                    backdrop: true,
                    size: [400, 500]
                }
            });
            const state = modalReducer(initialState.modal, action);
            expect(state["Google"]).not.toBeUndefined();
            expect(state["Google"].name).toBe("Google");
            expect(state["Google"].modal.title).toBe("Google");
            expect(state["Google"].modal.backdrop).toBe(true);
            expect(state["Google"].modal.size[0]).toBe(400);
            expect(state["Google"].modal.size[1]).toBe(500);

            //Now close it
            const action2 = hideModal("Google");
            const state2 = modalReducer(state, action2);
            expect(state2["Google"]).toBeUndefined();
        });
    });
    describe(ActionType.MODAL_SHOW_COMPONENT, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = showModalComponent({
                name: "Google",
                component: "GoogComponent",
                componentProps: {
                    foo: "bar"
                },
                modal: {
                    title: "Google",
                    backdrop: true,
                    size: [400, 500]
                }
            });

            const state = modalReducer(initialState.modal, action);
            const st = state["Google"];
            expect(st).not.toBeUndefined();
            expect((st as any).component).toBe("GoogComponent");
            expect((st as any).componentProps?.foo).toBe("bar");
            expect(st.modal.title).toBe("Google");
            expect(st.modal.backdrop).toBe(true);
            expect(st.modal.size[0]).toBe(400);
            expect(st.modal.size[1]).toBe(500);

            //Now close it
            const action2 = hideModal("Google");
            const state2 = modalReducer(state, action2);
            expect(state2["Google"]).toBeUndefined();
        });
    });
});