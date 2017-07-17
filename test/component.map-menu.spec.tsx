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
        //HACK: (any) band-aid because I'm guessing enzyme typings hasn't caught up?
        const radFooProps: any = radFoo.props();
        expect(radFooProps.value).toBe("Foo");
        expect(radFooProps.checked).toBe(true);
        const radBar = wrapper.find("input.map-menu-option").at(1);
        expect(radBar).not.toBeNull();
        const radBarProps: any = radBar.props();
        expect(radBarProps.value).toBe("Bar");
        expect(radBarProps.checked).toBe(false);
    });
    it("renders no checked radios for bogus selected map", () => {
        const wrapper = mount(<MapMenu selectedMap={"Baz"} maps={EXTERNAL_LAYERS} locale="en" />);
        const radFoo = wrapper.find("input.map-menu-option").at(0);
        expect(radFoo).not.toBeNull();
        //HACK: (any) band-aid because I'm guessing enzyme typings hasn't caught up?
        const radFooProps: any = radFoo.props();
        expect(radFooProps.value).toBe("Foo");
        expect(radFooProps.checked).toBe(false);
        const radBar = wrapper.find("input.map-menu-option").at(1);
        expect(radBar).not.toBeNull();
        const radBarProps: any = radBar.props();
        expect(radBarProps.value).toBe("Bar");
        expect(radBarProps.checked).toBe(false);
    });
});