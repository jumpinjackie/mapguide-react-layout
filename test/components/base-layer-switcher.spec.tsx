import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { IExternalBaseLayer } from "../../src/api/common";
import { BaseLayerSwitcher } from "../../src/components/base-layer-switcher";
import { STR_EMPTY } from "../../src/utils/string";

describe("components/base-layer-switcher", () => {
    it("Renders only NONE on empty base layer array", () => {
        const onBaseLayerChanged = vi.fn();
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
        const onBaseLayerChanged = vi.fn();
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
        const onBaseLayerChanged = vi.fn();
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
    it("Renders thumbnail grid when at least one layer has thumbnailImageUrl", () => {
        const onBaseLayerChanged = vi.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", visible: true, thumbnailImageUrl: "https://example.com/osm.png" },
            { name: "Stamen - Toner", kind: "Stamen", thumbnailImageUrl: "https://example.com/stamen.png" }
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        // Should render thumbnail container, not radio buttons
        const thumbnailContainer = container.querySelectorAll(".base-layer-switcher-thumbnail-container");
        expect(thumbnailContainer).toHaveLength(1);
        const radio = container.querySelectorAll(".base-layer-switcher-option");
        expect(radio).toHaveLength(0);
        // NONE + 2 layers = 3 thumbnail items
        const items = container.querySelectorAll(".base-layer-switcher-thumbnail-item");
        expect(items).toHaveLength(3);
        // The visible layer (OpenStreetMap) should be selected
        const selectedItems = container.querySelectorAll(".base-layer-switcher-thumbnail-item-selected");
        expect(selectedItems).toHaveLength(1);
        // Should render thumbnail images
        const imgs = container.querySelectorAll(".base-layer-switcher-thumbnail-image");
        expect(imgs).toHaveLength(2);
        expect((imgs[0] as HTMLImageElement).src).toContain("osm.png");
        expect((imgs[1] as HTMLImageElement).src).toContain("stamen.png");
    });
    it("Renders thumbnail grid with NONE selected when multiple layers are visible", () => {
        const onBaseLayerChanged = vi.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", visible: true, thumbnailImageUrl: "https://example.com/osm.png" },
            { name: "Satellite", kind: "BingMaps", visible: true, thumbnailImageUrl: "https://example.com/sat.png" }
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const items = container.querySelectorAll(".base-layer-switcher-thumbnail-item");
        expect(items).toHaveLength(3);
        // NONE item should be selected (first item)
        expect(items[0].classList.contains("base-layer-switcher-thumbnail-item-selected")).toBe(true);
        expect(items[1].classList.contains("base-layer-switcher-thumbnail-item-selected")).toBe(false);
        expect(items[2].classList.contains("base-layer-switcher-thumbnail-item-selected")).toBe(false);
    });
    it("Calls onBaseLayerChanged when a thumbnail item is clicked", () => {
        const onBaseLayerChanged = vi.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", thumbnailImageUrl: "https://example.com/osm.png" },
            { name: "Satellite", kind: "BingMaps", thumbnailImageUrl: "https://example.com/sat.png" }
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const items = container.querySelectorAll(".base-layer-switcher-thumbnail-item");
        // Click the second item (OpenStreetMap)
        fireEvent.click(items[1]);
        expect(onBaseLayerChanged).toHaveBeenCalledWith("OpenStreetMap");
    });
    it("Renders placeholder for layers without thumbnailImageUrl in thumbnail mode", () => {
        const onBaseLayerChanged = vi.fn();
        const layers: IExternalBaseLayer[] = [
            { name: "OpenStreetMap", kind: "OSM", thumbnailImageUrl: "https://example.com/osm.png" },
            { name: "Stamen - Toner", kind: "Stamen" } // no thumbnail
        ];
        const { container } = render(<BaseLayerSwitcher externalBaseLayers={layers} onBaseLayerChanged={onBaseLayerChanged} locale="en" />);
        const thumbnailContainer = container.querySelectorAll(".base-layer-switcher-thumbnail-container");
        expect(thumbnailContainer).toHaveLength(1);
        const imgs = container.querySelectorAll(".base-layer-switcher-thumbnail-image");
        expect(imgs).toHaveLength(1); // only the layer with a URL gets an img
        const placeholders = container.querySelectorAll(".base-layer-switcher-thumbnail-none-placeholder");
        // NONE item placeholder + "Stamen - Toner" placeholder
        expect(placeholders).toHaveLength(2);
    });
});
