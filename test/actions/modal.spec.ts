import { describe, it, expect } from "vitest";
import { showModalComponent, showModalUrl } from "../../src/actions/modal";
import { ActionType } from "../../src/constants/actions";

describe("actions/modal", () => {
    it("showModalComponent creates correct action", () => {
        const options = { component: "Foo", name: "bar" };
        const action = showModalComponent(options as any);
        expect(action.type).toBe(ActionType.MODAL_SHOW_COMPONENT);
        expect(action.payload).toMatchObject(options);
    });
    it("showModalUrl creates correct action", () => {
        const options = { url: "http://example.com", name: "bar" };
        const action = showModalUrl(options as any);
        expect(action.type).toBe(ActionType.MODAL_SHOW_URL);
        expect(action.payload).toMatchObject(options);
    });
});
