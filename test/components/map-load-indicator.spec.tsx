import { render } from "@testing-library/react";
import React from "react";
import { MapLoadIndicator, IMapLoadIndicatorProps } from "../../src/components/map-load-indicator";
import type { MapLoadIndicatorPositioning } from "../../src/api/common";

describe("MapLoadIndicator", () => {
    const baseProps: IMapLoadIndicatorProps = {
        loading: 10,
        loaded: 5,
        color: "#ff0000",
        position: "top" as MapLoadIndicatorPositioning
    };

    test("renders with correct width and color when loading", () => {
        const { container } = render(<MapLoadIndicator {...baseProps} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div).toBeInTheDocument();
        expect(div.style.width).toBe("50.0%");
        expect(div.style.background).toBe("rgb(255, 0, 0)"); // #ff0000 in rgb
        expect(div.style.visibility).toBe("visible");
        expect(div.style.position).toBe("absolute");
        expect(div.style.height).toBe("5px");
        expect(div.style.top).toBe("0px");
        expect(div.style.bottom).toBe("");
    });

    test("hides indicator when loaded equals loading", () => {
        const props = { ...baseProps, loaded: 10, loading: 10 };
        const { container } = render(<MapLoadIndicator {...props} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.style.visibility).toBe("hidden");
        expect(div.style.width).toBe("0px");
    });

    test("hides indicator when loaded exceeds loading", () => {
        const props = { ...baseProps, loaded: 15, loading: 10 };
        const { container } = render(<MapLoadIndicator {...props} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.style.visibility).toBe("hidden");
        expect(div.style.width).toBe("0px");
    });

    test("renders at bottom when position is 'bottom'", () => {
        const props = { ...baseProps, position: "bottom" as MapLoadIndicatorPositioning };
        const { container } = render(<MapLoadIndicator {...props} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.style.bottom).toBe("0px");
        expect(div.style.top).toBe("");
    });

    test("renders with 0% width when loading is 0", () => {
        const props = { ...baseProps, loaded: 0, loading: 0 };
        const { container } = render(<MapLoadIndicator {...props} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.style.width).toBe("0px");
        expect(div.style.visibility).toBe("hidden");
    });

    test("renders with minimum width 0% when loaded is 0 and loading > 0", () => {
        const props = { ...baseProps, loaded: 0, loading: 10 };
        const { container } = render(<MapLoadIndicator {...props} />);
        const div = container.firstChild as HTMLDivElement;
        expect(div.style.width).toBe("0.0%");
        expect(div.style.visibility).toBe("visible");
    });
});