import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { IMapMenuEntry } from "../src/api/common";
import { MapMenu } from "../src/components/map-menu";

const EXTERNAL_LAYERS: IMapMenuEntry[] = [
    {
        mapName: "Foo",
        label: "Foo"
    },
    {
        mapName: "Bar",
        label: "Bar"
    }
];

describe("components/map-menu", () => {
    it("renders checked radio for selected map", () => {
        const wrapper = mount(<MapMenu selectedMap={"Foo"} maps={EXTERNAL_LAYERS} locale="en" />);
        const radFoo = wrapper.find("input.map-menu-option").at(0);
        expect(radFoo).not.toBeNull();
        expect(radFoo.props().value).toBe("Foo");
        expect(radFoo.props().checked).toBe(true);
        const radBar = wrapper.find("input.map-menu-option").at(1);
        expect(radBar).not.toBeNull();
        expect(radBar.props().value).toBe("Bar");
        expect(radBar.props().checked).toBe(false);
    });
    it("renders no checked radios for bogus selected map", () => {
        const wrapper = mount(<MapMenu selectedMap={"Baz"} maps={EXTERNAL_LAYERS} locale="en" />);
        const radFoo = wrapper.find("input.map-menu-option").at(0);
        expect(radFoo).not.toBeNull();
        expect(radFoo.props().value).toBe("Foo");
        expect(radFoo.props().checked).toBe(false);
        const radBar = wrapper.find("input.map-menu-option").at(1);
        expect(radBar).not.toBeNull();
        expect(radBar.props().value).toBe("Bar");
        expect(radBar.props().checked).toBe(false);
    });
});