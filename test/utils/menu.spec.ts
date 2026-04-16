import { describe, it, expect } from "vitest";
import { processMenuItems, getText } from "../../src/utils/menu";

describe("utils/menu", () => {
    describe("processMenuItems", () => {
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
        it("returns all items when none are null", () => {
            const items = [{ label: "X" }, { label: "Y" }];
            const result = processMenuItems(items as any);
            expect(result).toHaveLength(2);
        });
    });

    describe("getText", () => {
        it("returns the string directly if label is a string", () => {
            expect(getText("Hello")).toBe("Hello");
        });
        it("invokes the function and returns its result if label is a function", () => {
            expect(getText(() => "Dynamic Label")).toBe("Dynamic Label");
        });
        it("returns undefined if label is undefined", () => {
            expect(getText(undefined)).toBeUndefined();
        });
    });
});
