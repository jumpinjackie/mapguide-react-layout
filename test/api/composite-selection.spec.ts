/**
 * composite-selection.spec.ts
 *
 * Tests for CompositeSelection and CompositeSelectionLayer
 */
import { describe, it, expect } from "vitest";
import { CompositeSelection, CompositeSelectionLayer } from "../../src/api/composite-selection";
import type { SelectedLayer, SelectedFeatureSet } from "../../src/api/contracts/query";
import type { ClientSelectionLayer, ClientSelectionSet } from "../../src/api/contracts/common";
import type { Bounds } from "../../src/api/common";

// -------------------------------------------------------------------------
// Helper factories
// -------------------------------------------------------------------------

function makeSelectedLayer(overrides: Partial<SelectedLayer> = {}): SelectedLayer {
    return {
        "@id": "layer-id-1",
        "@name": "ParcelLayer",
        Feature: [
            {
                Bounds: "0 0 10 10",
                Property: [{ Name: "Owner", Value: "Alice" }]
            }
        ],
        ...overrides
    };
}

function makeClientSelectionLayer(overrides: Partial<ClientSelectionLayer> = {}): ClientSelectionLayer {
    return {
        name: "VectorLayer",
        features: [
            {
                bounds: [0, 0, 10, 10] as Bounds,
                properties: { color: "red" }
            }
        ],
        ...overrides
    };
}

// -------------------------------------------------------------------------
// CompositeSelectionLayer – SelectedLayer (MapGuide server-side) input
// -------------------------------------------------------------------------

describe("api/composite-selection", () => {
    describe("CompositeSelectionLayer with SelectedLayer", () => {
        it("getName returns layer name", () => {
            const layer = makeSelectedLayer({ "@name": "Roads" });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getName()).toBe("Roads");
        });

        it("getLayerId returns layer id", () => {
            const layer = makeSelectedLayer({ "@id": "road-layer-id" });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getLayerId()).toBe("road-layer-id");
        });

        it("getFeatureCount returns the correct count", () => {
            const layer = makeSelectedLayer({
                Feature: [
                    { Bounds: "0 0 5 5", Property: [] },
                    { Bounds: "5 5 10 10", Property: [] },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getFeatureCount()).toBe(2);
        });

        it("getFeatureAt returns the feature at the given index", () => {
            const layer = makeSelectedLayer({
                Feature: [
                    { Bounds: "0 0 5 5", Property: [{ Name: "Foo", Value: "Bar" }] },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const f = csl.getFeatureAt(0);
            expect(f?.Property[0].Name).toBe("Foo");
        });

        it("getBounds returns combined bounds from all features", () => {
            const layer = makeSelectedLayer({
                Feature: [
                    { Bounds: "0 0 5 5", Property: [] },
                    { Bounds: "3 3 10 10", Property: [] },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const bounds = csl.getBounds();
            expect(bounds).toBeDefined();
            expect(bounds![0]).toBe(0);
            expect(bounds![1]).toBe(0);
            expect(bounds![2]).toBe(10);
            expect(bounds![3]).toBe(10);
        });

        it("getBounds returns undefined when no features have bounds", () => {
            const layer = makeSelectedLayer({
                Feature: [
                    { Property: [] } // no Bounds
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getBounds()).toBeUndefined();
        });

        it("getLayerMetadata returns the layer metadata if set", () => {
            const layer = makeSelectedLayer({
                LayerMetadata: {
                    Property: [{ DisplayName: "Owner", Name: "OWNER", Type: 9 }]
                }
            });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getLayerMetadata()).toBeDefined();
            expect(csl.getLayerMetadata()!.Property[0].Name).toBe("OWNER");
        });

        it("getLayerMetadata returns undefined when no metadata", () => {
            const layer = makeSelectedLayer({ LayerMetadata: undefined });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getLayerMetadata()).toBeUndefined();
        });
    });

    // -------------------------------------------------------------------------
    // CompositeSelectionLayer – ClientSelectionLayer (client-side vector) input
    // -------------------------------------------------------------------------

    describe("CompositeSelectionLayer with ClientSelectionLayer", () => {
        it("getName returns the layer name", () => {
            const layer = makeClientSelectionLayer({ name: "MyVectorLayer" });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getName()).toBe("MyVectorLayer");
        });

        it("getLayerId returns undefined for client selection layer", () => {
            const layer = makeClientSelectionLayer();
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getLayerId()).toBeUndefined();
        });

        it("getLayerMetadata returns undefined for client selection layer", () => {
            const layer = makeClientSelectionLayer();
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getLayerMetadata()).toBeUndefined();
        });

        it("getFeatureCount returns the correct count", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { bounds: [0, 0, 5, 5] as Bounds, properties: { a: 1 } },
                    { bounds: [5, 5, 10, 10] as Bounds, properties: { a: 2 } },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getFeatureCount()).toBe(2);
        });

        it("getFeatureAt returns the feature at the given index with correct properties", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { bounds: [0, 0, 5, 5] as Bounds, properties: { color: "blue", size: "large" } },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const f = csl.getFeatureAt(0);
            expect(f).toBeDefined();
            // Client feature properties (key/value object) are converted to FeatureProperty[]
            // with Name and Value fields to match the MapGuide SelectedFeature contract
            const colorProp = f!.Property.find(p => p.Name === "color");
            expect(colorProp?.Value).toBe("blue");
            const sizeProp = f!.Property.find(p => p.Name === "size");
            expect(sizeProp?.Value).toBe("large");
        });

        it("getBounds returns combined bounds from all features with bounds", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { bounds: [0, 0, 5, 5] as Bounds, properties: {} },
                    { bounds: [3, 3, 12, 12] as Bounds, properties: {} },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const bounds = csl.getBounds();
            expect(bounds).toBeDefined();
            expect(bounds![0]).toBe(0);
            expect(bounds![1]).toBe(0);
            expect(bounds![2]).toBe(12);
            expect(bounds![3]).toBe(12);
        });

        it("getBounds returns undefined when no features have bounds", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { properties: {} } // no bounds
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            expect(csl.getBounds()).toBeUndefined();
        });

        it("getFeatureAt Bounds reflects client feature bounds", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { bounds: [1, 2, 3, 4] as Bounds, properties: {} },
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const f = csl.getFeatureAt(0);
            expect(f?.Bounds).toBe("1 2 3 4");
        });

        it("getFeatureAt Bounds is undefined when feature has no bounds", () => {
            const layer = makeClientSelectionLayer({
                features: [
                    { properties: { x: 1 } }
                ]
            });
            const csl = new CompositeSelectionLayer(layer);
            const f = csl.getFeatureAt(0);
            expect(f?.Bounds).toBeUndefined();
        });
    });

    // -------------------------------------------------------------------------
    // CompositeSelection
    // -------------------------------------------------------------------------

    describe("CompositeSelection", () => {
        it("empty CompositeSelection has 0 layers", () => {
            const cs = new CompositeSelection();
            expect(cs.getLayerCount()).toBe(0);
        });

        it("CompositeSelection with MapGuide selection has correct layer count", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    makeSelectedLayer({ "@name": "Roads" }),
                    makeSelectedLayer({ "@name": "Parcels" })
                ]
            };
            const cs = new CompositeSelection(mgSel);
            expect(cs.getLayerCount()).toBe(2);
        });

        it("CompositeSelection with client selection has correct layer count", () => {
            const clientSel: ClientSelectionSet = {
                layers: [makeClientSelectionLayer({ name: "VectorLayer1" })]
            };
            const cs = new CompositeSelection(undefined, clientSel);
            expect(cs.getLayerCount()).toBe(1);
        });

        it("CompositeSelection combines MapGuide and client layers", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [makeSelectedLayer({ "@name": "Roads" })]
            };
            const clientSel: ClientSelectionSet = {
                layers: [makeClientSelectionLayer({ name: "VectorLayer1" })]
            };
            const cs = new CompositeSelection(mgSel, clientSel);
            expect(cs.getLayerCount()).toBe(2);
        });

        it("getLayers returns all layers", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [makeSelectedLayer({ "@name": "Roads" })]
            };
            const cs = new CompositeSelection(mgSel);
            const layers = cs.getLayers();
            expect(layers).toHaveLength(1);
            expect(layers[0].getName()).toBe("Roads");
        });

        it("getLayerAt returns the layer at the given index", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    makeSelectedLayer({ "@name": "Roads" }),
                    makeSelectedLayer({ "@name": "Parcels" })
                ]
            };
            const cs = new CompositeSelection(mgSel);
            expect(cs.getLayerAt(0).getName()).toBe("Roads");
            expect(cs.getLayerAt(1).getName()).toBe("Parcels");
        });

        it("getFeatureAt returns correct feature", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    makeSelectedLayer({
                        Feature: [{ Bounds: "0 0 5 5", Property: [{ Name: "Test", Value: "42" }] }]
                    })
                ]
            };
            const cs = new CompositeSelection(mgSel);
            const f = cs.getFeatureAt(0, 0);
            expect(f).toBeDefined();
            expect(f!.Property[0].Value).toBe("42");
        });

        it("getFeatureAt returns undefined for out-of-range layer index", () => {
            const cs = new CompositeSelection();
            expect(cs.getFeatureAt(99, 0)).toBeUndefined();
        });

        it("getBounds returns undefined for empty selection", () => {
            const cs = new CompositeSelection();
            expect(cs.getBounds()).toBeUndefined();
        });

        it("getBounds returns combined bounds of all layers", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    makeSelectedLayer({
                        Feature: [{ Bounds: "0 0 5 5", Property: [] }]
                    }),
                    makeSelectedLayer({
                        "@id": "l2",
                        "@name": "Parcels",
                        Feature: [{ Bounds: "3 3 10 10", Property: [] }]
                    })
                ]
            };
            const cs = new CompositeSelection(mgSel);
            const bounds = cs.getBounds();
            expect(bounds).toBeDefined();
            expect(bounds![0]).toBe(0);
            expect(bounds![1]).toBe(0);
            expect(bounds![2]).toBe(10);
            expect(bounds![3]).toBe(10);
        });

        it("getBounds returns undefined when all layers have no feature bounds", () => {
            const mgSel: SelectedFeatureSet = {
                SelectedLayer: [
                    makeSelectedLayer({
                        Feature: [{ Property: [] }] // no Bounds
                    })
                ]
            };
            const cs = new CompositeSelection(mgSel);
            expect(cs.getBounds()).toBeUndefined();
        });
    });
});
