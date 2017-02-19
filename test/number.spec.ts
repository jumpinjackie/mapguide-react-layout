import { scaleRangeBetween, getFiniteScaleIndexForScale, getClosestScaleIndex } from "../src/utils/number";

const SCALES = [390.625, 781.25, 1562.5, 3125, 6250, 12500, 25000, 50000, 100000, 200000];

describe("utils/number", () => {
    describe("scaleRangeBetween", () => {
        it("between should be inclusive", () => {
            expect(scaleRangeBetween(1.5, 1, 2)).toBe(true);
        });
        it("boundary min should be inclusive", () => {
            expect(scaleRangeBetween(1, 1, 2)).toBe(true);
        });
        it("boundary max should not be inclusive", () => {
            expect(scaleRangeBetween(2, 1, 2)).toBe(false);
        });
        it("below min should not be inclusive", () => {
            expect(scaleRangeBetween(0, 1, 2)).toBe(false);
        });
        it("above max should not be inclusive", () => {
            expect(scaleRangeBetween(3, 1, 2)).toBe(false);
        });
    });
    describe("getFiniteScaleIndexForScale", () => {
        it("returns first for scale lte lowest scale", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 1)).toBe(0);
            expect(getFiniteScaleIndexForScale(SCALES, 390.625)).toBe(0);
        });
        it("returns last for scale gte greatest scale", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 200000)).toBe(9);
            expect(getFiniteScaleIndexForScale(SCALES, 200001)).toBe(9);
        });
        it("will snap to the nearest scale if in between", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 400)).toBe(0);
            expect(getFiniteScaleIndexForScale(SCALES, 780)).toBe(1);
            expect(getFiniteScaleIndexForScale(SCALES, 24999)).toBe(6);
        });
    });
    describe("getClosestScaleIndex", () => {
        it("Returns lower when scale is closest to lower", () => {
            expect(getClosestScaleIndex([1, 5], 2)).toBe(0);
        });
        it("Returns upper when scale is closest to upper", () => {
            expect(getClosestScaleIndex([1, 5], 4)).toBe(1);
        });
    });
});