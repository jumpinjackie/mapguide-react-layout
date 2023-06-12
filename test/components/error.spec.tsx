import * as React from "react";
import { render } from "@testing-library/react";
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
        const { container } = render(<Error error={err} />);
        const head = container.querySelectorAll(".error-header");
        expect(head).toHaveLength(1);
        expect(head[0].innerHTML).toBe(err.message);
        const stack = container.querySelectorAll(".error-stack");
        expect(stack).toHaveLength(1);
    });
    it("renders a string without a stack", () => {
        const err = "Uh oh!";
        const { container } = render(<Error error={err} />);
        const head = container.querySelectorAll(".error-header");
        expect(head).toHaveLength(1);
        expect(head[0].innerHTML).toBe(err);
        const stack = container.querySelectorAll(".error-stack");
        expect(stack).toHaveLength(0);
    });
});