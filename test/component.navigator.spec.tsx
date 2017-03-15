import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { Navigator, PanDirection, ZoomDirection } from "../src/components/navigator";

type PanFunc = (direction: PanDirection) => void;
type ZoomFunc = (direction: ZoomDirection) => void;

describe("components/navigator", () => {
    it("renders spinner shown when busy", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={true} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).toHaveLength(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).toBe("visible");
    });
    it("renders spinner hidden when not busy", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        expect(wrapper.find("img.navigator-spinner")).toHaveLength(1);
        expect((wrapper.find("img.navigator-spinner").props() as any).style.visibility).toBe("hidden");
    });
    it("clicking right raises pan east", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(0).simulate("click");
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.East);
    });
    it("clicking left raises pan west", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(1).simulate("click");
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.West);
    });
    it("clicking down raises pan south", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(2).simulate("click");
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.South);
    });
    it("clicking up raises pan north", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(3).simulate("click");
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.North);
    });
    it("clicking - raises zoom out", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(4).simulate("click");
        expect(onZoom.mock.calls).toHaveLength(1);
        expect(onZoom.mock.calls[0]).toHaveLength(1);
        expect(onZoom.mock.calls[0][0]).toBe(ZoomDirection.Out);
    });
    it("clicking + raises zoom in", () => {
        const onPan = jest.fn();
        const onRequestZoomToScale = jest.fn();
        const onZoom = jest.fn();
        const wrapper = shallow(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        wrapper.find("area").at(5).simulate("click");
        expect(onZoom.mock.calls).toHaveLength(1);
        expect(onZoom.mock.calls[0]).toHaveLength(1);
        expect(onZoom.mock.calls[0][0]).toBe(ZoomDirection.In);
    });
});
