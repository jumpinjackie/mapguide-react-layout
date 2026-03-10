import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { BpDrawer } from "../../../../../src/components/elements/providers/blueprint/drawer";

describe("components/elements/providers/blueprint/drawer", () => {
    describe("BpDrawer", () => {
        it("renders when closed (isOpen=false)", () => {
            const { container } = render(
                React.createElement(BpDrawer, {
                    isOpen: false,
                    title: "Test Drawer",
                    onClose: () => {}
                })
            );
            expect(container).toBeDefined();
        });

        it("renders when open (isOpen=true)", () => {
            const { container } = render(
                React.createElement(BpDrawer, {
                    isOpen: true,
                    title: "Open Drawer",
                    onClose: () => {}
                })
            );
            expect(container).toBeDefined();
        });

        it("renders with an icon", () => {
            const { container } = render(
                React.createElement(BpDrawer, {
                    isOpen: false,
                    title: "Drawer with Icon",
                    icon: "layers",
                    onClose: () => {}
                })
            );
            expect(container).toBeDefined();
        });

        it("renders children", () => {
            const { getByText } = render(
                React.createElement(BpDrawer, {
                    isOpen: true,
                    title: "Drawer",
                    onClose: () => {}
                }, React.createElement("div", {}, "Content here"))
            );
            expect(getByText("Content here")).toBeDefined();
        });
    });
});
