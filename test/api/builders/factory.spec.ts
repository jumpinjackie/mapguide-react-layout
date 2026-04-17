import { describe, it, expect, vi } from "vitest";
import { createRequestBuilder, registerRequestBuilder } from "../../../src/api/builders/factory";

describe("api/builders/factory", () => {
    it("creates a registered request builder", () => {
        const factory = vi.fn(() => ({ kind: "custom" } as any));
        registerRequestBuilder("test-custom" as any, factory);

        const builder = createRequestBuilder("http://example.test/mapagent", "test-custom" as any);
        expect(factory).toHaveBeenCalledWith("http://example.test/mapagent");
        expect(builder).toEqual({ kind: "custom" });
    });

    it("throws for an unregistered client kind", () => {
        expect(() => createRequestBuilder("http://example.test/mapagent", "missing-kind" as any))
            .toThrow("Unknown or unsupported client kind: missing-kind");
    });
});