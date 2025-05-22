import { describe, it, expect } from "vitest";
import { assertIsDefined } from "../../src/utils/assert";

describe("utils/assert", () => {
    it("does not throw if value is defined", () => {
        expect(() => assertIsDefined(1)).not.toThrow();
        expect(() => assertIsDefined("foo")).not.toThrow();
        expect(() => assertIsDefined({})).not.toThrow();
    });
    it("throws if value is undefined or null", () => {
        expect(() => assertIsDefined(undefined)).toThrow();
        expect(() => assertIsDefined(null)).toThrow();
    });
});
