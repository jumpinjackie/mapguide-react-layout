import { expect } from 'chai';
import { scaleRangeBetween, getFiniteScaleIndexForScale, getClosestScaleIndex } from "../src/utils/number";

const SCALES = [390.625, 781.25, 1562.5, 3125, 6250, 12500, 25000, 50000, 100000, 200000];

describe("utils/number", () => {
    describe("scaleRangeBetween", () => {
        it("between should be inclusive", () => {
            expect(scaleRangeBetween(1.5, 1, 2)).to.be.true;
        });
        it("boundary min should be inclusive", () => {
            expect(scaleRangeBetween(1, 1, 2)).to.be.true;
        });
        it("boundary max should not be inclusive", () => {
            expect(scaleRangeBetween(2, 1, 2)).to.be.false;
        });
        it("below min should not be inclusive", () => {
            expect(scaleRangeBetween(0, 1, 2)).to.be.false;
        });
        it("above max should not be inclusive", () => {
            expect(scaleRangeBetween(3, 1, 2)).to.be.false;
        });
    });
    describe("getFiniteScaleIndexForScale", () => {
        it("returns first for scale lte lowest scale", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 1)).to.be.equal(0);
            expect(getFiniteScaleIndexForScale(SCALES, 390.625)).to.be.equal(0);
        });
        it("returns last for scale gte greatest scale", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 200000)).to.be.equal(9);
            expect(getFiniteScaleIndexForScale(SCALES, 200001)).to.be.equal(9);
        });
        it("will snap to the nearest scale if in between", () => {
            expect(getFiniteScaleIndexForScale(SCALES, 400)).to.be.equal(0);
            expect(getFiniteScaleIndexForScale(SCALES, 780)).to.be.equal(1);
            expect(getFiniteScaleIndexForScale(SCALES, 24999)).to.be.equal(6);
        });
    });
    describe("getClosestScaleIndex", () => {
        it("Returns lower when scale is closest to lower", () => {
            expect(getClosestScaleIndex([1, 5], 2)).to.be.equal(0);
        });
        it("Returns upper when scale is closest to upper", () => {
            expect(getClosestScaleIndex([1, 5], 4)).to.be.equal(1);
        });
    });
});