import * as React from "react";
import { render } from "@testing-library/react";
import { IExternalBaseLayer } from "../../src/api/common";
import { BaseLayerSwitcher } from "../../src/components/base-layer-switcher";
import { STR_EMPTY } from "../../src/utils/string";

describe("components/base-layer-switcher", () => {
    it("Renders only NONE on empty base layer array", () => {
        const onBaseLayerChanged = jest.fn();
        const layers: IExternalBaseLayer[] = [];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const cnt = container.querySelectorAll(".base-layer-switcher-item-container");
        expect(cnt).toHaveLength(1); //, "Expected 1 item");
        const radio = container.querySelectorAll(".base-layer-switcher-option");
        expect(radio).toHaveLength(1); //, "Expected 1 radio");
        expect((radio[0] as HTMLInputElement).value).toBe(STR_EMPTY);
        expect((radio[0] as HTMLInputElement).checked).toBe(true);
    });
    it("Renders items on non-empty base layer array", () => {
        const onBaseLayerChanged = jest.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM",  visible: true },
            { name: "Stamen - Toner", kind: "Stamen" }
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const cnt = container.querySelectorAll(".base-layer-switcher-item-container");
        expect(cnt).toHaveLength(3); //, "Expected 3 items");
        const radio = container.querySelectorAll(".base-layer-switcher-option");
        expect(radio).toHaveLength(3); //, "Expected 3 radios");
        expect((radio[0] as HTMLInputElement).value).toBe(STR_EMPTY);
        expect((radio[0] as HTMLInputElement).checked).toBe(false);
        expect((radio[1] as HTMLInputElement).value).toBe("OpenStreetMap");
        expect((radio[1] as HTMLInputElement).checked).toBe(true);
        expect((radio[2] as HTMLInputElement).value).toBe("Stamen - Toner");
        expect((radio[2] as HTMLInputElement).checked).toBe(false);
    });
    it("Renders NONE as checked item on non-empty base layer array where more than one layer is set visible", () => {
        const onBaseLayerChanged = jest.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", visible: true },
            { name: "Stamen - Toner", kind: "Stamen", visible: true }
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const cnt = container.querySelectorAll(".base-layer-switcher-item-container");
        expect(cnt).toHaveLength(3); //, "Expected 3 items");
        const radio = container.querySelectorAll(".base-layer-switcher-option");
        expect(radio).toHaveLength(3); //, "Expected 3 radios");
        expect((radio[0] as HTMLInputElement).value).toBe(STR_EMPTY);
        expect((radio[0] as HTMLInputElement).checked).toBe(true);
        expect((radio[1] as HTMLInputElement).value).toBe("OpenStreetMap");
        expect((radio[1] as HTMLInputElement).checked).toBe(false);
        expect((radio[2] as HTMLInputElement).value).toBe("Stamen - Toner");
        expect((radio[2] as HTMLInputElement).checked).toBe(false);
    });
});