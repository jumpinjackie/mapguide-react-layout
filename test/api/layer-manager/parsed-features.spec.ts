import { describe, it, expect } from "vitest";
import { ParsedFeatures } from "../../../src/api/layer-manager/parsed-features";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";

describe("ParsedFeatures", () => {
    it("get distinct values", async () => {
        const getFeatures = () => Promise.resolve([
            new Feature({
                id: 1,
                name: "Foo",
                geometry: new Point([0, 0])
            }),
            new Feature({
                id: 2,
                name: "Bar",
                geometry: new Point([0, 0])
            }),
            new Feature({
                id: 3,
                name: "Baz",
                geometry: new Point([0, 0])
            }),
            new Feature({
                id: 4,
                name: "Foo",
                geometry: new Point([0, 0])
            }),
        ]);
        const features = new ParsedFeatures("test", -1, getFeatures, true, ["Point"], ["name"], null);
        const values = await features.getDistinctValues("name");
        expect(values).toHaveLength(3);
        expect(values).toContain("Foo");
        expect(values).toContain("Bar");
        expect(values).toContain("Baz");
    });
    it("addTo with transform", async () => {
        const getFeatures = () => Promise.resolve([
            new Feature({
                id: 1,
                name: "Foo",
                geometry: new Point([0, 0])
            }),
            new Feature({
                id: 2,
                name: "Bar",
                geometry: new Point([1, 1])
            }),
            new Feature({
                id: 3,
                name: "Baz",
                geometry: new Point([2, 2])
            }),
            new Feature({
                id: 4,
                name: "Foo",
                geometry: new Point([3, 3])
            }),
        ]);
        const features = new ParsedFeatures("test", -1, getFeatures, true, ["Point"], ["name"], null);
        const source = new VectorSource();

        await features.addTo(source, "EPSG:3857", "EPSG:4326");
        const dstFeatures = source.getFeatures();
        expect(dstFeatures).toHaveLength(4);

        const f1 = dstFeatures.find(f => f.get("id") == 1);
        expect(f1).not.toBeUndefined();
        expect(f1).not.toBeNull();
        const f1g = f1?.getGeometry() as Point;
        expect(f1g).not.toBeUndefined();
        const f1coords = f1g.getCoordinates();
        // Null island is the same in EPSG:3857
        expect(f1coords[0]).toBeCloseTo(0);
        expect(f1coords[1]).toBeCloseTo(0);
        
        const f2 = dstFeatures.find(f => f.get("id") == 2);
        expect(f2).not.toBeUndefined();
        expect(f2).not.toBeNull();
        const f2g = f2?.getGeometry() as Point;
        expect(f2g).not.toBeUndefined();
        const f2coords = f2g.getCoordinates();
        expect(f2coords[0]).not.toBe(1);
        expect(f2coords[1]).not.toBe(1);
        
        const f3 = dstFeatures.find(f => f.get("id") == 3);
        expect(f3).not.toBeUndefined();
        expect(f3).not.toBeNull();
        const f3g = f3?.getGeometry() as Point;
        expect(f3g).not.toBeUndefined();
        const f3coords = f3g.getCoordinates();
        expect(f3coords[0]).not.toBe(2);
        expect(f3coords[1]).not.toBe(2);
        
        const f4 = dstFeatures.find(f => f.get("id") == 4);
        expect(f4).not.toBeUndefined();
        expect(f4).not.toBeNull();
        const f4g = f4?.getGeometry() as Point;
        expect(f4g).not.toBeUndefined();
        const f4coords = f4g.getCoordinates();
        expect(f4coords[0]).not.toBe(2);
        expect(f4coords[1]).not.toBe(2);
    });
})