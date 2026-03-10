import { describe, it, expect } from "vitest";
import { getIconNames } from "../../src/components/icon-names";

describe("components/icon-names", () => {
    describe("getIconNames", () => {
        it("returns an array of icon name strings", () => {
            const names = getIconNames();
            expect(Array.isArray(names)).toBe(true);
            expect(names.length).toBeGreaterThan(0);
        });

        it("all entries are strings", () => {
            const names = getIconNames();
            for (const name of names) {
                expect(typeof name).toBe("string");
            }
        });

        it("contains expected common icon names", () => {
            const names = getIconNames();
            expect(names).toContain("error");
            expect(names).toContain("edit");
            expect(names).toContain("trash");
            expect(names).toContain("layers");
        });
    });
});
