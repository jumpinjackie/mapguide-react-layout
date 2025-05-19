import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { About } from "../../src/components/about";

describe("components/about", () => {
    it("renders a <h4> title", () => {
        const { container } = render(<About />);
        const h4 = container.querySelectorAll("h4");
        expect(h4).toHaveLength(1);
        expect(h4[0].innerHTML).toBe("mapguide-react-layout");
    });
    it("renders a <hr>", () => {
        const { container } = render(<About />);
        const hr = container.querySelectorAll("hr");
        expect(hr).toHaveLength(2);
    });
    it("renders 3 <a> links", () => {
        const { container } = render(<About />);
        const anchors = container.querySelectorAll("a");
        expect(anchors).toHaveLength(3);
        expect(anchors[0].innerHTML).toBe("GitHub");
        expect(anchors[1].innerHTML).toBe("Issues");
        expect(anchors[2].innerHTML).toBe("Fugue icon set by Yusuke Kamiyamane");
    });
});