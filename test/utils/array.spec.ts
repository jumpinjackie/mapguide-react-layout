import { makeUnique, areArraysDifferent } from "../../src/utils/array";

describe("utils/array", () => {
    describe("makeUnique", () => {
        it ("works as advertised", () => {
            expect(makeUnique([]).join("")).toBe("");
            expect(makeUnique(["a", "b", "b", "c"]).join("")).toBe("abc");
            expect(makeUnique(["a", "B", "b", "c"]).join("")).toBe("aBbc");
        });
    });
    describe("areArraysDifferent", () => {
        it ("works as advertised", () => {
            expect(areArraysDifferent(undefined, undefined)).toBe(true);
            expect(areArraysDifferent([1, 2], [1, 3, 2])).toBe(true);
            expect(areArraysDifferent([1, 2, null], [1, 2])).toBe(true);
            expect(areArraysDifferent([1, 2, undefined], [1, 2])).toBe(true);
            expect(areArraysDifferent([1, 2, 3], [1, 3, 2])).toBe(true);
            expect(areArraysDifferent([1, 2, 3], [1, 2, 3])).toBe(false);
            expect(areArraysDifferent([], [])).toBe(false);
            expect(areArraysDifferent([1, 2, 3], [1, "2", 3])).toBe(true);
            expect(areArraysDifferent([1, 2, 3], [1, "2", 3], (left, right) => left == right)).toBe(false);
        });
    })
});