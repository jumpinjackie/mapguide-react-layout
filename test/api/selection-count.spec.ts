/**
 * selection-count.spec.ts
 *
 * Tests for the countSelection utility function
 */
import { describe, it, expect } from "vitest";
import { countSelection } from "../../src/api/selection-count";
import type { SelectedFeatureSet, FeatureSet } from "../../src/api/contracts/query";
import type { ClientSelectionSet } from "../../src/api/contracts/common";

describe("api/selection-count", () => {
    it("returns undefined when called with no arguments", () => {
        expect(countSelection()).toBeUndefined();
    });

    it("returns undefined when all arguments are empty/zero", () => {
        const emptyFeatureSet: FeatureSet = { Layer: [] };
        expect(countSelection(emptyFeatureSet)).toBeUndefined();
    });

    describe("with FeatureSet (non-SelectedFeatureSet)", () => {
        it("counts total and layers from a FeatureSet with IDs", () => {
            const featureSet: FeatureSet = {
                Layer: [
                    { "@id": "l1", "@name": "Roads", Class: { "@id": "c1", ID: ["a", "b", "c"] } },
                    { "@id": "l2", "@name": "Parcels", Class: { "@id": "c2", ID: ["x"] } }
                ]
            };
            const result = countSelection(featureSet);
            expect(result).toBeDefined();
            expect(result!.total).toBe(4);
            expect(result!.layerCount).toBe(2);
        });

        it("handles a layer with no IDs (undefined Class.ID)", () => {
            const featureSet: FeatureSet = {
                Layer: [
                    { "@id": "l1", "@name": "Roads", Class: { "@id": "c1", ID: undefined as any } }
                ]
            };
            const result = countSelection(featureSet);
            // total = 0, layerCount = 1 → should return a summary
            expect(result).toBeDefined();
            expect(result!.total).toBe(0);
            expect(result!.layerCount).toBe(1);
        });
    });

    describe("with SelectedFeatureSet", () => {
        it("counts total features and layers from a SelectedFeatureSet", () => {
            const selectedFeatureSet: SelectedFeatureSet = {
                SelectedLayer: [
                    {
                        "@id": "l1",
                        "@name": "Roads",
                        Feature: [
                            { Property: [] },
                            { Property: [] }
                        ]
                    },
                    {
                        "@id": "l2",
                        "@name": "Parcels",
                        Feature: [
                            { Property: [] }
                        ]
                    }
                ]
            };
            const result = countSelection(selectedFeatureSet);
            expect(result).toBeDefined();
            expect(result!.total).toBe(3);
            expect(result!.layerCount).toBe(2);
        });

        it("handles a SelectedLayer with undefined Feature array", () => {
            const selectedFeatureSet: SelectedFeatureSet = {
                SelectedLayer: [
                    {
                        "@id": "l1",
                        "@name": "Roads",
                        Feature: undefined as any
                    }
                ]
            };
            const result = countSelection(selectedFeatureSet);
            // total = 0, layerCount = 1 → should return a summary
            expect(result).toBeDefined();
            expect(result!.total).toBe(0);
            expect(result!.layerCount).toBe(1);
        });
    });

    describe("with ClientSelectionSet", () => {
        it("counts total features and layers from a ClientSelectionSet", () => {
            const clientSel: ClientSelectionSet = {
                layers: [
                    {
                        name: "VectorLayer1",
                        features: [
                            { properties: {} },
                            { properties: {} }
                        ]
                    },
                    {
                        name: "VectorLayer2",
                        features: [
                            { properties: {} }
                        ]
                    }
                ]
            };
            const result = countSelection(undefined, clientSel);
            expect(result).toBeDefined();
            expect(result!.total).toBe(3);
            expect(result!.layerCount).toBe(2);
        });

        it("handles a client layer with undefined features array", () => {
            const clientSel: ClientSelectionSet = {
                layers: [
                    {
                        name: "VectorLayer1",
                        features: undefined as any
                    }
                ]
            };
            const result = countSelection(undefined, clientSel);
            // total = 0, layerCount = 1
            expect(result).toBeDefined();
            expect(result!.total).toBe(0);
            expect(result!.layerCount).toBe(1);
        });

        it("returns undefined when client selection has empty layers array", () => {
            const clientSel: ClientSelectionSet = { layers: [] };
            expect(countSelection(undefined, clientSel)).toBeUndefined();
        });
    });

    describe("combined mg and client selection", () => {
        it("combines both selections and reports total correctly", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    {
                        "@id": "l1",
                        "@name": "Roads",
                        Feature: [{ Property: [] }, { Property: [] }]
                    }
                ]
            };
            const clientSel: ClientSelectionSet = {
                layers: [
                    {
                        name: "VectorLayer1",
                        features: [{ properties: {} }]
                    }
                ]
            };
            const result = countSelection(mgSel, clientSel);
            expect(result).toBeDefined();
            // mg: 2, client: 1 → total 3; layerCount is overwritten by clientSel (last wins)
            expect(result!.total).toBe(3);
        });
    });
});
