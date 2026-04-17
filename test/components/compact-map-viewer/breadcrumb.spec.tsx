import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Breadcrumb } from "../../../src/components/compact-map-viewer/breadcrumb";

describe("components/compact-map-viewer/breadcrumb", () => {
    it("renders a hidden span with data-map-component attribute", () => {
        const { container } = render(<Breadcrumb component="TestComponent" />);
        const span = container.querySelector("span");
        expect(span).toBeDefined();
        expect(span?.getAttribute("data-map-component")).toBe("TestComponent");
        expect(span?.style.display).toBe("none");
    });

    it("renders with different component names", () => {
        const { container } = render(<Breadcrumb component="AnotherComponent" />);
        const span = container.querySelector("span");
        expect(span?.getAttribute("data-map-component")).toBe("AnotherComponent");
    });
});
