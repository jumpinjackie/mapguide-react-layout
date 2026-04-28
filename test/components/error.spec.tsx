import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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

        expect(screen.getByText(err.message)).toBeInTheDocument();

        const stack = container.querySelectorAll(".error-stack");
        expect(stack).toHaveLength(1);
    });
    it("renders a string without a stack", () => {
        const err = "Uh oh!";
        const { container } = render(<Error error={err} />);

        expect(screen.getByText(err)).toBeInTheDocument();

        const stack = container.querySelectorAll(".error-stack");
        expect(stack).toHaveLength(0);
    });
});