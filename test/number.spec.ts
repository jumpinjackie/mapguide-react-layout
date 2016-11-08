import { expect } from 'chai';
import { scaleRangeBetween } from "../src/utils/number";

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
});