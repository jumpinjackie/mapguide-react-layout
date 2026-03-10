import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { BpSpinner } from "../../../../../src/components/elements/providers/blueprint/spinner";

describe("components/elements/providers/blueprint/spinner", () => {
    describe("BpSpinner", () => {
        it("renders without throwing", () => {
            const { container } = render(React.createElement(BpSpinner, {}));
            expect(container).toBeDefined();
        });

        it("renders with primary variant", () => {
            const { container } = render(React.createElement(BpSpinner, { variant: "primary" }));
            expect(container).toBeDefined();
        });

        it("renders with warning variant", () => {
            const { container } = render(React.createElement(BpSpinner, { variant: "warning" }));
            expect(container).toBeDefined();
        });

        it("renders with small size preset", () => {
            const { container } = render(React.createElement(BpSpinner, { sizePreset: "small" }));
            expect(container).toBeDefined();
        });

        it("renders with standard size preset", () => {
            const { container } = render(React.createElement(BpSpinner, { sizePreset: "standard" }));
            expect(container).toBeDefined();
        });

        it("renders with large size preset", () => {
            const { container } = render(React.createElement(BpSpinner, { sizePreset: "large" }));
            expect(container).toBeDefined();
        });
    });
});
