import { describe, it, expect } from "vitest";
import { ScopedId } from "../../src/utils/scoped-id";

describe("utils/scoped-id", () => {
    it ("Generates incremental", () => {
        const sid = new ScopedId();
        let last;
        for (let i = 0; i < 1000; i++) {
            const val = sid.next();
            if (last != undefined) {
                expect(val).toBe(last + 1);
            }
            last = val;
        }
    });
});