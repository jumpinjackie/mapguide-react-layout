/**
 * external-layer.spec.ts
 *
 * Tests for ExternalLayerFactoryRegistry
 */
import { describe, it, expect, vi } from "vitest";
import { ExternalLayerFactoryRegistry } from "../../../src/api/registry/external-layer";

describe("api/registry/external-layer", () => {
    it("getInstance returns the singleton instance", () => {
        const inst1 = ExternalLayerFactoryRegistry.getInstance();
        const inst2 = ExternalLayerFactoryRegistry.getInstance();
        expect(inst1).toBe(inst2);
    });

    it("registerExternalVectorLayerCreator and getExternalVectorLayerCreator work correctly", () => {
        const registry = ExternalLayerFactoryRegistry.getInstance();
        const creator = vi.fn().mockReturnValue({} as any);
        registry.registerExternalVectorLayerCreator("test-driver", creator);
        const retrieved = registry.getExternalVectorLayerCreator("test-driver");
        expect(retrieved).toBe(creator);
    });

    it("getExternalVectorLayerCreator returns undefined for unknown driver", () => {
        const registry = ExternalLayerFactoryRegistry.getInstance();
        const result = registry.getExternalVectorLayerCreator("unknown-driver-xyz");
        expect(result).toBeUndefined();
    });

    it("constructor throws when called directly (singleton enforcement)", () => {
        expect(() => new (ExternalLayerFactoryRegistry as any)()).toThrow();
    });
});
