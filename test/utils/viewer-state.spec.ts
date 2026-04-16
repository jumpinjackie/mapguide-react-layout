import { describe, it, expect } from "vitest";
import { IMapView, LayerTransparencySet } from "../../src/api/common";
import { areMapsSame, areViewsCloseToEqual, layerTransparencyChanged } from "../../src/utils/viewer-state";

describe("utils/viewer-state", () => {
    describe("areViewsCloseToEqual", () => {
        it("returns true for two views with same x, y, scale", () => {
            const view1: IMapView = { x: 12.34, y: 34.56, scale: 1000 };
            const view2: IMapView = { x: 12.34, y: 34.56, scale: 1000 };
            expect(areViewsCloseToEqual(view1, view2)).toBe(true);
        });
        it("returns false when either view is undefined", () => {
            const view1: IMapView = { x: 12.34, y: 34.56, scale: 1000 };
            expect(areViewsCloseToEqual(undefined, view1)).toBe(false);
            expect(areViewsCloseToEqual(view1, undefined)).toBe(false);
            expect(areViewsCloseToEqual(undefined, undefined)).toBe(false);
        });
        it("returns true when both views have the same resolution", () => {
            const view1: IMapView = { x: 0, y: 0, scale: 500, resolution: 0.001 };
            const view2: IMapView = { x: 0, y: 0, scale: 500, resolution: 0.001 };
            expect(areViewsCloseToEqual(view1, view2)).toBe(true);
        });
        it("returns false when one view has resolution and the other does not", () => {
            const view1: IMapView = { x: 0, y: 0, scale: 500, resolution: 0.001 };
            const view2: IMapView = { x: 0, y: 0, scale: 500 };
            expect(areViewsCloseToEqual(view1, view2)).toBe(false);
            expect(areViewsCloseToEqual(view2, view1)).toBe(false);
        });
        it("returns false when base parts differ", () => {
            const view1: IMapView = { x: 1, y: 2, scale: 500 };
            const view2: IMapView = { x: 9, y: 8, scale: 500 };
            expect(areViewsCloseToEqual(view1, view2)).toBe(false);
        });
        it("returns false when resolutions differ", () => {
            const view1: IMapView = { x: 0, y: 0, scale: 500, resolution: 0.001 };
            const view2: IMapView = { x: 0, y: 0, scale: 500, resolution: 0.002 };
            expect(areViewsCloseToEqual(view1, view2)).toBe(false);
        });
    });

    it("areMapsSame", () => {
        const map1: any = { Name: "Foo" };
        const map2: any = { Name: "Foo" };
        const map3: any = { Name: "Bar" };
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