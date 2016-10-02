import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import td = require("testdouble");
import { IExternalBaseLayer } from "../src/api/common";
import { BaseLayerSwitcher } from "../src/components/base-layer-switcher";

type LayerSwitchFunc = (name: string) => void;

describe("components/base-layer-switcher", () => {
    it("Renders no items on empty base layer array", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} />);
        expect(wrapper.find(".base-layer-item-container")).to.have.length(0);
    });
    it("Renders items on non-empty base layer array", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM",  visible: true },
            { name: "Stamen - Toner", kind: "Stamen" }
        ];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} />);
        expect(wrapper.find(".base-layer-switcher-item-container")).to.have.length(2, "Expected 2 items");
        expect(wrapper.find(".base-layer-switcher-option")).to.have.length(2, "Expected 2 radios");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).value).to.be.equal("OpenStreetMap");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).checked).to.be.true;
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).value).to.be.equal("Stamen - Toner");
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).checked).to.be.false;
    });
    it("Renders no checked items on non-empty base layer array where more than one layer is set visible", () => {
        const onBaseLayerChanged = td.function<LayerSwitchFunc>();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", visible: true },
            { name: "Stamen - Toner", kind: "Stamen", visible: true }
        ];
        const wrapper = mount(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} />);
        expect(wrapper.find(".base-layer-switcher-item-container")).to.have.length(2, "Expected 2 items");
        expect(wrapper.find(".base-layer-switcher-option")).to.have.length(2, "Expected 2 radios");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).value).to.be.equal("OpenStreetMap");
        expect((wrapper.find(".base-layer-switcher-option").at(0).props() as any).checked).to.be.false;
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).value).to.be.equal("Stamen - Toner");
        expect((wrapper.find(".base-layer-switcher-option").at(1).props() as any).checked).to.be.false;
    });
});