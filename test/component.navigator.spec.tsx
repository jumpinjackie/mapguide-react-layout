import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { Navigator } from "../src/components/navigator";
import td = require("testdouble");

describe("components/navigator", () => {
    it("renders spinner shown when busy", () => {
        const onPan = td.function<any>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<any>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={true} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).to.have.length(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).to.be.equal("visible");
    });
    it("renders spinner hidden when not busy", () => {
        const onPan = td.function<any>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<any>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).to.have.length(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).to.be.equal("hidden");
    });
});
