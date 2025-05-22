import { describe, it, expect } from "vitest";
import { isModalDisplayOptions } from "../../src/utils/type-guards";

describe("utils/type-guards", () => {
    it("isModalDisplayOptions returns true for object with url", () => {
        expect(isModalDisplayOptions({ url: "foo" })).toBe(true);
    });
    it("isModalDisplayOptions returns false for object without url", () => {
        expect(isModalDisplayOptions({})).toBe(false);
        expect(isModalDisplayOptions(undefined)).toBe(false);
        expect(isModalDisplayOptions(null)).toBe(false);
    });
});
