import { describe, it, expect } from "vitest";
import { assertNever } from "../../src/utils/never";

describe("utils/never", () => {
    it("throws when called", () => {
        expect(() => assertNever("unexpected" as never)).toThrow("Should never get here");
    });
});
