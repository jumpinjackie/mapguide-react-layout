import { describe, it, expect } from "vitest";
import { IMapView, LayerTransparencySet } from "../../src/api/common";
import { areMapsSame, areViewsCloseToEqual, layerTransparencyChanged } from "../../src/utils/viewer-state";

describe("utils/viewer-state", () => {
    it("areViewsCloseToEqual", () => {
        const view1: IMapView = {
            x: 12.34,
            y: 34.56,
            scale: 1000
        };
        const view2: IMapView = {
            x: 12.34,
            y: 34.56,
            scale: 1000
        };
        expect(areViewsCloseToEqual(view1, view2)).toBe(true);
        expect(areViewsCloseToEqual(undefined, view2)).toBe(false);
        expect(areViewsCloseToEqual(view1, undefined)).toBe(false);
        expect(areViewsCloseToEqual(undefined, undefined)).toBe(false);
    });
    it("areMapsSame", () => {
        const map1: any = {
            Name: "Foo"
        };
        const map2: any = {
            Name: "Foo"
        };
        const map3: any = {
            Name: "Bar"
        };
        expect(areMapsSame(map1, map2)).toBe(true);
        expect(areMapsSame(map1, map1)).toBe(true);
        expect(areMapsSame(map1, map3)).toBe(false);
        expect(areMapsSame(map2, map3)).toBe(false);
    });
    it("layerTransparencyChanged", () => {
        const set1: LayerTransparencySet = {};
        const set2: LayerTransparencySet = {};

        expect(layerTransparencyChanged(set1, undefined)).toBe(true);
        expect(layerTransparencyChanged(undefined, set1)).toBe(true);
        expect(layerTransparencyChanged(set1, set2)).toBe(false);
        expect(layerTransparencyChanged(undefined, undefined)).toBe(false);

        set1["Foo"] = 1234;
        set2["Foo"] = 1234;
        expect(layerTransparencyChanged(set1, set2)).toBe(false);
        set1["Foo"] = 2345;
        expect(layerTransparencyChanged(set1, set2)).toBe(true);
        delete set1["Foo"];
        set1["Bar"] = 2345;
        expect(layerTransparencyChanged(set1, set2)).toBe(true);
    });
});