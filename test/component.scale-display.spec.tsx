import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { ScaleDisplay } from "../src/components/scale-display";
import td = require("testdouble");
import {
    IMapView
} from "../src/api/common";

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
        const func = td.function<SetScaleFunc>();
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const wrapper = mount(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = wrapper.find("select");
        const num = wrapper.find("input");
        expect(sel).toHaveLength(1);
        expect(num).toHaveLength(0);
        const opts = sel.find("option");
        expect(opts).toHaveLength(FINITE_SCALES.length);
    });
    it("Renders a numeric textbox if no finite scale list on map", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = td.function<SetScaleFunc>();
        const wrapper = mount(<ScaleDisplay locale="en" view={view} onScaleChanged={func} />);
        const sel = wrapper.find("select");
        const num = wrapper.find("input");
        expect(sel).toHaveLength(0);
        expect(num).toHaveLength(1);
    });
    it("dispatches set scale on fractional scale with preserved decimals", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = td.function<SetScaleFunc>();
        const wrapper = mount(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = wrapper.find("select");
        expect(sel).toHaveLength(1);
        sel.simulate("change", { target: { value: "180.375" } });
        td.verify(func(180.375));
    });
    it("dispatches set scale on whole scale with no decimals", () => {
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 2000
        };
        const func = td.function<SetScaleFunc>();
        const wrapper = mount(<ScaleDisplay locale="en" view={view} finiteScales={FINITE_SCALES} onScaleChanged={func} />);
        const sel = wrapper.find("select");
        expect(sel).toHaveLength(1);
        sel.simulate("change", { target: { value: "900" } });
        td.verify(func(900));
    });
});