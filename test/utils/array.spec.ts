import { makeUnique } from "../../src/utils/array";

describe("utils/array", () => {
    describe("makeUnique", () => {
        it ("works as advertised", () => {
            expect(makeUnique([]).join("")).toBe("");
            expect(makeUnique(["a", "b", "b", "c"]).join("")).toBe("abc");
            expect(makeUnique(["a", "B", "b", "c"]).join("")).toBe("aBbc");
        })
        
    });
});