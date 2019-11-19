import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { MgError } from "../../src/api/error";
import { Error } from "../../src/components/error";

function throwme() {
    throw new MgError("Uh oh!");
}

function captureError() {
    let err: any;
    try {
        throwme();
    } catch (e) {
        err = e;
    }
    return err;
}

describe("components/error", () => {
    it("renders a MgError with stack", () => {
        const err = captureError();
        const wrapper = render(<Error error={err} />);
        expect(wrapper.find(".error-header")).toHaveLength(1);
        expect(wrapper.find(".error-header").text()).toBe(err.message);
        expect(wrapper.find(".error-stack")).toHaveLength(1);
    });
    it("renders a string without a stack", () => {
        const err = "Uh oh!";
        const wrapper = render(<Error error={err} />);
        expect(wrapper.find(".error-header")).toHaveLength(1);
        expect(wrapper.find(".error-header").text()).toBe(err);
        expect(wrapper.find(".error-stack")).toHaveLength(0);
    });
});