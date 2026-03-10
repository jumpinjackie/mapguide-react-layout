import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { BpPopover } from "../../../../../src/components/elements/providers/blueprint/popover";

describe("components/elements/providers/blueprint/popover", () => {
    describe("BpPopover", () => {
        it("renders without throwing", () => {
            const { container } = render(
                React.createElement(BpPopover, {}, 
                    React.createElement("button", {}, "Trigger"),
                    React.createElement("div", {}, "Content")
                )
            );
            expect(container).toBeDefined();
        });

        it("renders with position and minimal props", () => {
            const { container } = render(
                React.createElement(BpPopover, { 
                    position: "bottom",
                    minimal: true
                },
                    React.createElement("button", {}, "Click me")
                )
            );
            expect(container).toBeDefined();
        });

        it("renders with usePortal=false", () => {
            const { container } = render(
                React.createElement(BpPopover, {
                    usePortal: false
                },
                    React.createElement("span", {}, "Target")
                )
            );
            expect(container).toBeDefined();
        });
    });
});
