import React from "react";
import { describe, expect, it } from "vitest";
import { Error as ErrorComponent } from "../../../src/components/error";
import { PlaceholderComponent, getComponentFactory, registerComponentFactory } from "../../../src/api/registry/component";

describe("api/registry/component", () => {
    it("registers and resolves a component factory", () => {
        const componentId = "UnitTestComponent";
        const TestComponent: React.FC<{ value: string }> = ({ value }) => <span>{value}</span>;
        registerComponentFactory(componentId, (props) => <TestComponent {...props} />);

        const factory = getComponentFactory(componentId);
        expect(factory).toBeTypeOf("function");

        const el = factory ? factory({ value: "abc" }) : null;
        expect(React.isValidElement(el)).toBe(true);
        expect(el?.type).toBe(TestComponent);
        expect(el?.props.value).toBe("abc");
    });

    it("returns undefined for unknown component ids", () => {
        expect(getComponentFactory("DoesNotExist")).toBeUndefined();
    });

    it("PlaceholderComponent renders an error component for unknown ids", () => {
        const el = PlaceholderComponent({ id: "DefinitelyUnknown", locale: "en" });
        if (!el) {
            throw new Error("Expected placeholder component to return an element");
        }

        expect(React.isValidElement(el)).toBe(true);
        expect(el.type).toBe(ErrorComponent);
        expect(String(el.props.error)).toContain("DefinitelyUnknown");
    });
});