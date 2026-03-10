import { describe, it, expect } from "vitest";
import { bootstrap } from "../../src/api/bootstrap";

describe("api/bootstrap", () => {
    it("bootstrap function exists and can be called without error", () => {
        expect(() => bootstrap()).not.toThrow();
    });
});
