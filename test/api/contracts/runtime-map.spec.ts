import { describe, it, expect } from "vitest";
import { FeatureStyleType, LayerType, GroupType } from "../../../src/api/contracts/runtime-map";

describe("api/contracts/runtime-map", () => {
    describe("FeatureStyleType enum", () => {
        it("has expected values", () => {
            expect(FeatureStyleType.Point).toBe(1);
            expect(FeatureStyleType.Line).toBe(2);
            expect(FeatureStyleType.Area).toBe(3);
            expect(FeatureStyleType.Composite).toBe(4);
        });
    });

    describe("LayerType enum", () => {
        it("has expected values", () => {
            expect(LayerType.Dynamic).toBe(1);
            expect(LayerType.BaseMap).toBe(2);
        });
    });

    describe("GroupType enum", () => {
        it("has expected values", () => {
            expect(GroupType.Normal).toBe(1);
            expect(GroupType.BaseMap).toBe(2);
            expect(GroupType.BaseMapFromTileSet).toBe(3);
        });
    });
});
