import { describe, it, expect } from "vitest";
import { hideModal, showModalComponent, showModalUrl, updateModal } from "../../src/actions/modal";
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
                    size: [400, 500],
                    position: [100, 100]
                }
            });
            const state = modalReducer(initialState.modal, action);
            expect(state["Google"]).not.toBeUndefined();
            expect(state["Google"].name).toBe("Google");
            expect(state["Google"].modal.title).toBe("Google");
            expect(state["Google"].modal.backdrop).toBe(true);
            expect(state["Google"].modal.size?.[0]).toBe(400);
            expect(state["Google"].modal.size?.[1]).toBe(500);

            //Change modal size/position
            const action2 = updateModal("Google", {
                x: 120,
                y: 140,
                width: 800,
                height: 600
            });
            const state2 = modalReducer(state, action2);
            const st2 = state2["Google"];
            expect(st2).not.toBeUndefined();
            expect(st2.name).toBe("Google");
            expect(st2.modal.title).toBe("Google");
            expect(st2.modal.backdrop).toBe(true);
            expect(st2.modal.size?.[0]).toBe(800);
            expect(st2.modal.size?.[1]).toBe(600);
            expect(st2.modal.position?.[0]).toBe(120);
            expect(st2.modal.position?.[1]).toBe(140);

            //Now close it
            const action3 = hideModal("Google");
            const state3 = modalReducer(state2, action3);
            expect(state3["Google"].name).toBeUndefined();
            expect(state3["Google"].modal.backdrop).toBeUndefined();
            expect(state3["Google"].modal.overflowYScroll).toBeUndefined();
            expect(state3["Google"].modal.title).toBeUndefined();
            expect(state3["Google"].modal.position).not.toBeUndefined();
            expect(state3["Google"].modal.size).not.toBeUndefined();

            //Now show again under the same name, should reuse last size/position
            const action4 = showModalUrl({
                url: "https://www.google.com",
                name: "Google",
                modal: {
                    title: "Google",
                    backdrop: true
                }
            });
            const state4 = modalReducer(state3, action4);
            const st4 = state4["Google"];
            expect(st4).not.toBeUndefined();
            expect(st4.name).toBe("Google");
            expect(st4.modal.title).toBe("Google");
            expect(st4.modal.backdrop).toBe(true);
            // Same pos/size
            expect(st4.modal.size?.[0]).toBe(800);
            expect(st4.modal.size?.[1]).toBe(600);
            expect(st4.modal.position?.[0]).toBe(120);
            expect(st4.modal.position?.[1]).toBe(140);
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
                    size: [400, 500],
                    position: [100, 100]
                }
            });

            const state = modalReducer(initialState.modal, action);
            const st = state["Google"];
            expect(st).not.toBeUndefined();
            expect((st as any).component).toBe("GoogComponent");
            expect((st as any).componentProps?.foo).toBe("bar");
            expect(st.modal.title).toBe("Google");
            expect(st.modal.backdrop).toBe(true);
            expect(st.modal.size?.[0]).toBe(400);
            expect(st.modal.size?.[1]).toBe(500);

            //Change modal size/position
            const action2 = updateModal("Google", {
                x: 120,
                y: 140,
                width: 800,
                height: 600
            });
            const state2 = modalReducer(state, action2);
            const st2 = state2["Google"];
            expect(st2).not.toBeUndefined();
            expect((st2 as any).component).toBe("GoogComponent");
            expect((st2 as any).componentProps?.foo).toBe("bar");
            expect(st2.modal.title).toBe("Google");
            expect(st2.modal.backdrop).toBe(true);
            expect(st2.modal.size?.[0]).toBe(800);
            expect(st2.modal.size?.[1]).toBe(600);
            expect(st2.modal.position?.[0]).toBe(120);
            expect(st2.modal.position?.[1]).toBe(140);

            //Now close it
            const action3 = hideModal("Google");
            const state3 = modalReducer(state2, action3);
            expect(state3["Google"].name).toBeUndefined();
            expect(state3["Google"].modal.backdrop).toBeUndefined();
            expect(state3["Google"].modal.overflowYScroll).toBeUndefined();
            expect(state3["Google"].modal.title).toBeUndefined();
            expect(state3["Google"].modal.position).not.toBeUndefined();
            expect(state3["Google"].modal.size).not.toBeUndefined();

            //Now show again under the same name, should reuse last size/position
            const action4 = showModalUrl({
                url: "https://www.google.com",
                name: "Google",
                modal: {
                    title: "Google",
                    backdrop: true
                }
            });
            const state4 = modalReducer(state3, action4);
            const st4 = state4["Google"];
            expect(st4).not.toBeUndefined();
            expect(st4.name).toBe("Google");
            expect(st4.modal.title).toBe("Google");
            expect(st4.modal.backdrop).toBe(true);
            // Same pos/size
            expect(st4.modal.size?.[0]).toBe(800);
            expect(st4.modal.size?.[1]).toBe(600);
            expect(st4.modal.position?.[0]).toBe(120);
            expect(st4.modal.position?.[1]).toBe(140);
        });
    });
});