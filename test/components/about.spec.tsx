import * as React from "react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { About } from "../../src/components/about";
import { configureStore } from "../../src/store/configure-store";
import { IApplicationState } from "../../src/api/common";

describe("components/about", () => {
    const makeStore = () => {
        const initState: Partial<IApplicationState> = {};
        return configureStore(initState);
    };
    it("renders a <h4> title", () => {
        const { container } = render(<Provider store={makeStore()}><About /></Provider>);
        const h4 = container.querySelectorAll("h4");
        expect(h4).toHaveLength(1);
        expect(h4[0].innerHTML).toBe("mapguide-react-layout");
    });
    it("renders a <hr>", () => {
        const { container } = render(<Provider store={makeStore()}><About /></Provider>);
        const hr = container.querySelectorAll("hr");
        expect(hr).toHaveLength(2);
    });
    it("renders 3 <a> links", () => {
        const { container } = render(<Provider store={makeStore()}><About /></Provider>);
        const anchors = container.querySelectorAll("a");
        expect(anchors).toHaveLength(3);
        expect(anchors[0].innerHTML).toBe("GitHub");
        expect(anchors[1].innerHTML).toBe("Issues");
        expect(anchors[2].innerHTML).toBe("Fugue icon set by Yusuke Kamiyamane");
    });
});