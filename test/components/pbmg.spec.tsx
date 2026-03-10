import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PoweredByMapGuide } from "../../src/components/pbmg";

describe("components/pbmg", () => {
    it("renders with the expected CSS class", () => {
        const { container } = render(<PoweredByMapGuide />);
        const el = container.querySelector(".status-bar-component.component-pbmg");
        expect(el).not.toBeNull();
    });

    it("passes extra props to the root div", () => {
        const { container } = render(<PoweredByMapGuide id="pbmg-test" />);
        const el = container.querySelector("#pbmg-test");
        expect(el).not.toBeNull();
    });
});
