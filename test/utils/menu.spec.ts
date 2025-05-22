import { describe, it, expect } from "vitest";
import { processMenuItems } from "../../src/utils/menu";

describe("utils/menu", () => {
    it("filters out nulls and returns only IItem[]", () => {
        const items = [
            { label: "A" },
            null,
            { label: "B" }
        ];
        const result = processMenuItems(items as any);
        expect(result).toHaveLength(2);
        expect(result[0].label).toBe("A");
        expect(result[1].label).toBe("B");
    });
    it("returns empty array if input is null", () => {
        expect(processMenuItems(null as any)).toHaveLength(0);
    });
});
