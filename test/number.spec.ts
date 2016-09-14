import { expect } from 'chai';
import { betweenInclusive } from "../src/utils/number";

describe("utils/number", () => {
    describe("betweenInclusive", () => {
        it("between should be inclusive", () => {
            expect(betweenInclusive(1.5, 1, 2)).to.be.true;
        });
        it("boundary min should be inclusive", () => {
            expect(betweenInclusive(1, 1, 2)).to.be.true;
        });
        it("boundary max should be inclusive", () => {
            expect(betweenInclusive(1, 1, 2)).to.be.true;
        });
        it("below min should not be inclusive", () => {
            expect(betweenInclusive(0, 1, 2)).to.be.false;
        });
        it("above max should not be inclusive", () => {
            expect(betweenInclusive(3, 1, 2)).to.be.false;
        });
    });
});