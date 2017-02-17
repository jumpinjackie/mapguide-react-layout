import { strEndsWith } from '../src/utils/string';

describe("utils/string", () => {
    describe("strEndsWith", () => {
        it("Does end with", () => {
            expect(strEndsWith("abcd1234", "1234")).toBe(true);
            expect(strEndsWith("abcd1234", "d1234")).toBe(true);
            expect(strEndsWith("abcd1234", "cd1234")).toBe(true);
            expect(strEndsWith("abcd1234", "abcd1234")).toBe(true);
        });
        it("Does not end with", () => {
            expect(strEndsWith("abcd1234", "123")).toBe(false);
            expect(strEndsWith("abcd1234", "C1234")).toBe(false);
            expect(strEndsWith("abcd1234", "Bc1234")).toBe(false);
        });
        it("Properly handles empty string args", () => {
            expect(strEndsWith("", "abcd1234")).toBe(false);
            expect(strEndsWith("abcd1234", "")).toBe(true);
            expect(strEndsWith("", "")).toBe(true);
        });
    });
});