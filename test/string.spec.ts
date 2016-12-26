import { expect } from 'chai';
import { strEndsWith } from '../src/utils/string';

describe("utils/string", () => {
    describe("strEndsWith", () => {
        it("Does end with", () => {
            expect(strEndsWith("abcd1234", "1234")).to.be.true;
            expect(strEndsWith("abcd1234", "d1234")).to.be.true;
            expect(strEndsWith("abcd1234", "cd1234")).to.be.true;
            expect(strEndsWith("abcd1234", "abcd1234")).to.be.true;
        });
        it("Does not end with", () => {
            expect(strEndsWith("abcd1234", "123")).to.be.false;
            expect(strEndsWith("abcd1234", "C1234")).to.be.false;
            expect(strEndsWith("abcd1234", "Bc1234")).to.be.false;
        });
        it("Properly handles empty string args", () => {
            expect(strEndsWith("", "abcd1234")).to.be.false;
            expect(strEndsWith("abcd1234", "")).to.be.true;
            expect(strEndsWith("", "")).to.be.true;
        });
    });
});