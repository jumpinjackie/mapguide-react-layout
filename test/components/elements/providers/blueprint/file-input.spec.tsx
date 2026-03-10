import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { BpFileInput } from "../../../../../src/components/elements/providers/blueprint/file-input";

describe("components/elements/providers/blueprint/file-input", () => {
    describe("BpFileInput", () => {
        it("renders without throwing", () => {
            const { container } = render(React.createElement(BpFileInput, {}));
            expect(container).toBeDefined();
        });

        it("renders with fill prop", () => {
            const { container } = render(React.createElement(BpFileInput, { fill: true }));
            expect(container).toBeDefined();
        });

        it("renders with text prop", () => {
            const { container } = render(React.createElement(BpFileInput, { text: "Choose file..." }));
            expect(container).toBeDefined();
        });

        it("renders with buttonText prop", () => {
            const { container } = render(React.createElement(BpFileInput, { buttonText: "Browse" }));
            expect(container).toBeDefined();
        });
    });
});
