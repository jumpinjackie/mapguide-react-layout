import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { Navigator, PanDirection, ZoomDirection } from "../src/components/navigator";
import td = require("testdouble");

type PanFunc = (direction: PanDirection) => void;
type ZoomFunc = (direction: ZoomDirection) => void;

describe("components/navigator", () => {
    it("renders spinner shown when busy", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={true} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).to.have.length(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).to.be.equal("visible");
    });
    it("renders spinner hidden when not busy", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).to.have.length(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).to.be.equal("hidden");
    });
    it("clicking right raises pan east", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(0).simulate("click");
        td.verify(onPan(PanDirection.East));
    });
    it("clicking left raises pan west", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(1).simulate("click");
        td.verify(onPan(PanDirection.West));
    });
    it("clicking down raises pan south", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(2).simulate("click");
        td.verify(onPan(PanDirection.South));
    });
    it("clicking up raises pan north", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(3).simulate("click");
        td.verify(onPan(PanDirection.North));
    });
    it("clicking - raises zoom out", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(4).simulate("click");
        td.verify(onZoom(ZoomDirection.Out));
    });
    it("clicking + raises zoom in", () => {
        const onPan = td.function<PanFunc>();
        const onRequestZoomToScale = td.function<any>();
        const onZoom = td.function<ZoomFunc>();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(5).simulate("click");
        td.verify(onZoom(ZoomDirection.In));
    });
});
