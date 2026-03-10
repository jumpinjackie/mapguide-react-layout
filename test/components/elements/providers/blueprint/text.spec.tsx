import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { BpText } from "../../../../../src/components/elements/providers/blueprint/text";

describe("components/elements/providers/blueprint/text", () => {
    describe("BpText", () => {
        it("renders as a span by default", () => {
            const { container } = render(React.createElement(BpText, {}, "Hello"));
            const el = container.querySelector("span.mrl-text");
            expect(el).not.toBeNull();
            expect(el?.textContent).toBe("Hello");
        });

        it("renders as a p element when component is 'p'", () => {
            const { container } = render(React.createElement(BpText, { component: "p" }, "Paragraph"));
            const el = container.querySelector("p.mrl-text");
            expect(el).not.toBeNull();
            expect(el?.textContent).toBe("Paragraph");
        });

        it("renders as a div element when component is 'div'", () => {
            const { container } = render(React.createElement(BpText, { component: "div" }, "Division"));
            const el = container.querySelector("div.mrl-text");
            expect(el).not.toBeNull();
            expect(el?.textContent).toBe("Division");
        });

        it("applies className prop", () => {
            const { container } = render(React.createElement(BpText, { className: "my-class" }, "Text"));
            const el = container.querySelector("span.mrl-text.my-class");
            expect(el).not.toBeNull();
        });

        it("applies style prop", () => {
            const { container } = render(React.createElement(BpText, { style: { color: "red" } }, "Styled"));
            const el = container.querySelector("span.mrl-text") as HTMLElement;
            expect(el?.style.color).toBe("red");
        });
    });
});
