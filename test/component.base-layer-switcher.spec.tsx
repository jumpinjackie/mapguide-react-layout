import * as React from "react";
import { shallow, mount, render } from "enzyme";
import td = require("testdouble");
import { IExternalBaseLayer } from "../src/api/common";
import { BaseLayerSwitcher } from "../src/components/base-layer-switcher";
import { STR_EMPTY } from "../src/utils/string";

type LayerSwitchFunc = (name: string) => void;

describe("components/base-layer-switcher", () => {
    it("Renders only NONE on empty base layer array", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        expect(wrapper.find(".base-layer-switcher-item-container")).toHaveLength(1); //, "Expected 1 item");
        expect(wrapper.find(".base-layer-switcher-option")).toHaveLength(1); //, "Expected 1 radio");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).value).toBe(STR_EMPTY);
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).checked).toBe(true);
    });
    it("Renders items on non-empty base layer array", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM",  visible: true },
            { name: "Stamen - Toner", kind: "Stamen" }
        ];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        expect(wrapper.find(".base-layer-switcher-item-container")).toHaveLength(3); //, "Expected 3 items");
        expect(wrapper.find(".base-layer-switcher-option")).toHaveLength(3); //, "Expected 3 radios");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).value).toBe(STR_EMPTY);
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).checked).toBe(false);
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).value).toBe("OpenStreetMap");
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).checked).toBe(true);
        expect((wrapper.find(".base-layer-switcher-option").at(2).props() as any).value).toBe("Stamen - Toner");
        expect((wrapper.find(".base-layer-switcher-option").at(2).props() as any).checked).toBe(false);
    });
    it("Renders NONE as checked item on non-empty base layer array where more than one layer is set visible", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", visible: true },
            { name: "Stamen - Toner", kind: "Stamen", visible: true }
        ];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        expect(wrapper.find(".base-layer-switcher-item-container")).toHaveLength(3); //, "Expected 3 items");
        expect(wrapper.find(".base-layer-switcher-option")).toHaveLength(3); //, "Expected 3 radios");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).value).toBe(STR_EMPTY);
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).checked).toBe(true);
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).value).toBe("OpenStreetMap");
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).checked).toBe(false);
        expect((wrapper.find(".base-layer-switcher-option").at(2).props() as any).value).toBe("Stamen - Toner");
        expect((wrapper.find(".base-layer-switcher-option").at(2).props() as any).checked).toBe(false);
    });
});