import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ScaleDisplay } from "../../src/components/scale-display";
import {
    IMapView
} from "../../src/api/common";

const FINITE_SCALES = [
    100.25,
    180.375,
    300.025,
    400.2,
    600,
    900,
    2000
];

type SetScaleFunc = (scale: number) => void;

describe("containers/scale-display", () => {
    it("Renders a select with finite scale list if found on map", () => {
        const func = jest.fn();
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const { container } = render(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = container.getElementsByTagName("select");
        const num = container.getElementsByTagName("input");
        expect(sel).toHaveLength(1);
        expect(num).toHaveLength(0);
        const opts = sel[0].getElementsByTagName("option");
        expect(opts).toHaveLength(FINITE_SCALES.length);
    });
    it("Renders a numeric textbox if no finite scale list on map", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = jest.fn();
        const { container } = render(<ScaleDisplay locale="en" view={view} onScaleChanged={func} />);
        const sel = container.getElementsByTagName("select");
        const num = container.getElementsByTagName("input");
        expect(sel).toHaveLength(0);
        expect(num).toHaveLength(1);
    });
    it("dispatches set scale on fractional scale with preserved decimals", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = jest.fn();
        const { container } = render(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = container.getElementsByTagName("select");
        expect(sel).toHaveLength(1);
        fireEvent.change(sel[0], { target: { value: "180.375" } });
        expect(func.mock.calls).toHaveLength(1);
        expect(func.mock.calls[0]).toHaveLength(1);
        expect(func.mock.calls[0][0]).toBe(180.375);
    });
    it("dispatches set scale on whole scale with no decimals", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = jest.fn();
        const { container } = render(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = container.querySelectorAll("select");
        expect(sel).toHaveLength(1);
        fireEvent.change(sel[0], { target: { value: "900" } });
        expect(func.mock.calls).toHaveLength(1);
        expect(func.mock.calls[0]).toHaveLength(1);
        expect(func.mock.calls[0][0]).toBe(900);
    });
    it("snaps to the closest finite scale if view scale has no exact match", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 600.000000003
        };
        const func = jest.fn();
        const { container } = render(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = container.querySelectorAll("select");
        expect((sel[0] as HTMLSelectElement).value).toBe("600");
    });
});