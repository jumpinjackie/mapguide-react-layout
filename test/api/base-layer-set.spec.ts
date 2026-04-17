/**
 * Tests for BaseLayerSetOL helpers and external base layer synchronization.
 */

import { describe, expect, it } from "vitest";
import Collection from "ol/Collection";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import type Source from "ol/source/Source";
import { BaseLayerSetOL } from "../../src/api/base-layer-set";
import type { Bounds, LayerTransparencySet, Size } from "../../src/api/common";

class TestBaseLayerSet extends BaseLayerSetOL {
    public getLayers() {
        return [] as any[];
    }

    public getSourcesForProgressTracking(): Source[] {
        return [];
    }

    public updateTransparency(_trans: LayerTransparencySet): void {
        // no-op test implementation
    }

    public showActiveSelectedFeature(_mapExtent: Bounds, _size: Size, _uri: string): void {
        // no-op test implementation
    }

    public update(_showGroups: string[] | undefined, _showLayers: string[] | undefined, _hideGroups: string[] | undefined, _hideLayers: string[] | undefined): void {
        // no-op test implementation
    }

    public updateSelectionColor(_color: string): void {
        // no-op test implementation
    }
}

function createSubject(group?: LayerGroup) {
    return new TestBaseLayerSet(
        group,
        "EPSG:3857",
        96,
        [0, 0, 100, 100],
        39.37,
        new View({ center: [0, 0], zoom: 2 })
    );
}

describe("api/base-layer-set", () => {
    it("converts inches-per-unit to meters-per-unit", () => {
        const subject = createSubject();
        expect(subject.getMetersPerUnit()).toBeCloseTo(1, 8);
    });

    it("scaleToResolution and resolutionToScale are inverse operations", () => {
        const subject = createSubject();
        const scale = 25000;
        const resolution = subject.scaleToResolution(scale);

        expect(resolution).toBeGreaterThan(0);
        expect(subject.resolutionToScale(resolution)).toBeCloseTo(scale, 8);
    });

    it("does nothing when there is no external base layer group", () => {
        const subject = createSubject(undefined);
        expect(() => subject.updateExternalBaseLayers([{ name: "Roads", visible: true } as any])).not.toThrow();
    });

    it("updates external base layer visibility by matching layer title", () => {
        const roads = new TileLayer();
        roads.set("title", "Roads");
        roads.setVisible(false);
        const imagery = new TileLayer();
        imagery.set("title", "Imagery");
        imagery.setVisible(true);
        const group = new LayerGroup({
            layers: new Collection([roads, imagery])
        });
        const subject = createSubject(group);

        subject.updateExternalBaseLayers([
            { name: "Roads", visible: true } as any,
            { name: "Imagery", visible: false } as any
        ]);

        expect(roads.getVisible()).toBe(true);
        expect(imagery.getVisible()).toBe(false);
    });

    it("hides unmatched and duplicate-matched layer titles", () => {
        const roads = new TileLayer();
        roads.set("title", "Roads");
        roads.setVisible(true);
        const group = new LayerGroup({
            layers: new Collection([roads])
        });
        const subject = createSubject(group);

        subject.updateExternalBaseLayers([
            { name: "Roads", visible: true } as any,
            { name: "Roads", visible: true } as any
        ]);
        expect(roads.getVisible()).toBe(false);

        subject.updateExternalBaseLayers([{ name: "Other", visible: true } as any]);
        expect(roads.getVisible()).toBe(false);
    });
});
