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
        const wrapper = shallow(<Error error={err} />);
        expect(wrapper.find(".bp3-callout")).toHaveLength(1);
        expect(wrapper.find(".bp3-callout .error-header")).toHaveLength(1);
        expect(wrapper.find(".bp3-callout .error-header").text()).toBe(err.message);
        expect(wrapper.find(".bp3-callout .error-stack")).toHaveLength(1);
    });
    it("renders a string without a stack", () => {
        const err = "Uh oh!";
        const wrapper = shallow(<Error error={err} />);
        expect(wrapper.find(".bp3-callout")).toHaveLength(1);
        expect(wrapper.find(".bp3-callout .error-header")).toHaveLength(1);
        expect(wrapper.find(".bp3-callout .error-header").text()).toBe(err);
        expect(wrapper.find(".bp3-callout .error-stack")).toHaveLength(0);
    });
});