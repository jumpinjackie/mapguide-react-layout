/**
 * Tests for LayerSetGroupBase swipe-mode methods:
 *   - getSwipeableLayers()
 *   - transferLayerOut()
 *   - transferLayerIn()
 *   - apply() filtering (secondary layers on OL map must not corrupt primary's apply)
 *
 * These tests document the expected state transitions when adding layers in swipe mode,
 * where a layer is added via the primary viewer (via viewer.getLayerManager()) and then
 * optionally transferred to the secondary layer set group.
 *
 * @since 0.15
 */
import { describe, it, expect } from "vitest";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/Tile";
import Collection from "ol/Collection";
import LayerBase from "ol/layer/Base";
import type { ProjectionLike } from "ol/proj";
import type { Bounds } from "../../src/api/common";
import { LayerProperty } from "../../src/api/common";
import { LayerSetGroupBase } from "../../src/api/layer-set-group-base";
import type { ILayerSetOL, IImageLayerEvents } from "../../src/api/layer-set-contracts";
import type { RefreshMode } from "../../src/api/common";
import type { IExternalBaseLayer, LayerTransparencySet, Size } from "../../src/api/common";
import ImageWMSSource from "ol/source/ImageWMS";
import TileWMSSource from "ol/source/TileWMS";

// ---------------------------------------------------------------------------
// Minimal mock of ILayerSetOL so we can control getLayers() in tests
// ---------------------------------------------------------------------------
function makeLayerSet(layers: LayerBase[]): ILayerSetOL {
    return {
        view: new View({ center: [0, 0], zoom: 4 }),
        extent: [0, 0, 100, 100] as Bounds,
        dpi: 96,
        projection: "EPSG:3857" as ProjectionLike,
        scaleToResolution: () => 0,
        resolutionToScale: () => 0,
        refreshMap: (_mode: RefreshMode) => {},
        getMetersPerUnit: () => 1,
        getLayers: () => layers,
        getSourcesForProgressTracking: () => [],
        updateExternalBaseLayers: (_layers: IExternalBaseLayer[]) => {},
        updateTransparency: (_trans: LayerTransparencySet) => {},
        showActiveSelectedFeature: (_mapExtent: Bounds, _size: Size, _uri: string) => {},
        update: (_showGroups: string[] | undefined, _showLayers: string[] | undefined, _hideGroups: string[] | undefined, _hideLayers: string[] | undefined) => {},
        updateSelectionColor: (_color: string) => {}
    };
}

const mockImageLayerEvents: IImageLayerEvents = {
    addImageLoading: () => {},
    addImageLoaded: () => {},
    onImageError: () => {},
    getLocale: () => undefined,
    getBaseTileLoaders: () => ({}),
    getTileLoaders: () => ({}),
    getImageLoaders: () => ({})
};

// ---------------------------------------------------------------------------
// Concrete test double for the abstract class
// ---------------------------------------------------------------------------
class TestLayerSetGroup extends LayerSetGroupBase {
    constructor(mainLayers: LayerBase[] = []) {
        super(mockImageLayerEvents);
        this.mainSet = makeLayerSet(mainLayers);
        this.overviewSet = makeLayerSet([]);
    }
    public tryGetWmsSource(): [LayerBase, (ImageWMSSource | TileWMSSource)] | undefined {
        return undefined;
    }
}

// Helper: create an OL VectorLayer with a given name
function makeLayer(name: string): VectorLayer<VectorSource> {
    const l = new VectorLayer({ source: new VectorSource() });
    l.set(LayerProperty.LAYER_NAME, name);
    l.set(LayerProperty.IS_EXTERNAL, true);
    return l;
}

// ---------------------------------------------------------------------------
// Minimal OL Map stub – avoids the ResizeObserver / DOM requirement of the
// real OL Map while still providing the addLayer / removeLayer / getLayers API
// that LayerSetGroupBase.addLayer() depends on.
// ---------------------------------------------------------------------------
interface IMapStub {
    addLayer(layer: LayerBase): void;
    removeLayer(layer: LayerBase): void;
    getLayers(): Collection<LayerBase>;
}

function makeOLMap(): IMapStub {
    const layers = new Collection<LayerBase>();
    return {
        addLayer(layer: LayerBase) { layers.push(layer); },
        removeLayer(layer: LayerBase) { layers.remove(layer); },
        getLayers() { return layers; }
    };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("LayerSetGroupBase – swipe mode methods", () => {

    // -----------------------------------------------------------------------
    // getSwipeableLayers
    // -----------------------------------------------------------------------
    describe("getSwipeableLayers()", () => {
        it("returns only mainSet layers when there are no custom layers", () => {
            const baseLayer = new TileLayer({});
            const group = new TestLayerSetGroup([baseLayer]);
            expect(group.getSwipeableLayers()).toEqual([baseLayer]);
        });

        it("returns mainSet layers AND custom layers combined", () => {
            const baseLayer = new TileLayer({});
            const group = new TestLayerSetGroup([baseLayer]);

            const map = makeOLMap();
            const customLayer = makeLayer("myVector");
            group.addLayer(map as any, "myVector", customLayer);

            const swipeable = group.getSwipeableLayers();
            expect(swipeable).toContain(baseLayer);
            expect(swipeable).toContain(customLayer);
            expect(swipeable).toHaveLength(2);
        });

        it("returns empty array when mainSet has no layers and there are no custom layers", () => {
            const group = new TestLayerSetGroup([]);
            expect(group.getSwipeableLayers()).toEqual([]);
        });
    });

    // -----------------------------------------------------------------------
    // transferLayerOut / transferLayerIn
    // -----------------------------------------------------------------------
    describe("transferLayerOut()", () => {
        it("removes the layer from _customLayers tracking and returns it", () => {
            const group = new TestLayerSetGroup([]);
            const map = makeOLMap();
            const layer = makeLayer("layerA");
            group.addLayer(map as any, "layerA", layer);

            expect(group.hasLayer("layerA")).toBe(true);
            const returned = group.transferLayerOut("layerA");
            expect(returned).toBe(layer);
            expect(group.hasLayer("layerA")).toBe(false);
        });

        it("does NOT remove the OL layer from the map (layer stays on OL map)", () => {
            const group = new TestLayerSetGroup([]);
            const map = makeOLMap();
            const layer = makeLayer("layerA");
            group.addLayer(map as any, "layerA", layer);

            group.transferLayerOut("layerA");

            // Layer should still be on the OL map even after tracking is removed
            const mapLayers = map.getLayers().getArray();
            expect(mapLayers).toContain(layer);
        });

        it("returns undefined and does nothing when layer name is not found", () => {
            const group = new TestLayerSetGroup([]);
            const result = group.transferLayerOut("nonexistent");
            expect(result).toBeUndefined();
        });
    });

    describe("transferLayerIn()", () => {
        it("registers the layer in _customLayers with the given order", () => {
            const group = new TestLayerSetGroup([]);
            const layer = makeLayer("layerB");
            group.transferLayerIn("layerB", layer, 5);

            expect(group.hasLayer("layerB")).toBe(true);
        });

        it("layer is included in getSwipeableLayers() after transferLayerIn", () => {
            const group = new TestLayerSetGroup([]);
            const layer = makeLayer("layerB");
            group.transferLayerIn("layerB", layer, 0);

            expect(group.getSwipeableLayers()).toContain(layer);
        });
    });

    // -----------------------------------------------------------------------
    // Primary-to-secondary transfer (the swipe layer add scenario)
    // -----------------------------------------------------------------------
    describe("primary-to-secondary transfer scenario", () => {
        it("layer is removed from primary and added to secondary tracking", () => {
            const primaryGroup = new TestLayerSetGroup([new TileLayer({})]);
            const secondaryGroup = new TestLayerSetGroup([new TileLayer({})]);
            const map = makeOLMap();

            // Simulate: user adds layer via viewer.getLayerManager() which always targets primary
            const layer = makeLayer("userLayer");
            primaryGroup.addLayer(map as any, "userLayer", layer);

            expect(primaryGroup.hasLayer("userLayer")).toBe(true);
            expect(secondaryGroup.hasLayer("userLayer")).toBe(false);

            // Simulate: transferLayerToSwipeSecondary logic
            const olLayer = primaryGroup.getLayer("userLayer");
            expect(olLayer).toBeDefined();
            const order = map.getLayers().getArray().indexOf(olLayer!);
            primaryGroup.transferLayerOut("userLayer");
            secondaryGroup.transferLayerIn("userLayer", olLayer!, order);

            // After transfer: primary no longer tracks it, secondary does
            expect(primaryGroup.hasLayer("userLayer")).toBe(false);
            expect(secondaryGroup.hasLayer("userLayer")).toBe(true);

            // getSwipeableLayers() reflects updated state
            const primarySwipeable = primaryGroup.getSwipeableLayers();
            const secondarySwipeable = secondaryGroup.getSwipeableLayers();
            expect(primarySwipeable).not.toContain(layer);
            expect(secondarySwipeable).toContain(layer);
        });

        it("OL layer remains on map throughout the primary-to-secondary transfer", () => {
            const primaryGroup = new TestLayerSetGroup([]);
            const secondaryGroup = new TestLayerSetGroup([]);
            const map = makeOLMap();

            const layer = makeLayer("myLayer");
            primaryGroup.addLayer(map as any, "myLayer", layer);

            // The layer is on the OL map before transfer
            expect(map.getLayers().getArray()).toContain(layer);

            // Transfer
            const olLayer = primaryGroup.getLayer("myLayer")!;
            const order = map.getLayers().getArray().indexOf(olLayer);
            primaryGroup.transferLayerOut("myLayer");
            secondaryGroup.transferLayerIn("myLayer", olLayer, order);

            // The OL layer must still be on the map (it is NOT removed during transfer)
            expect(map.getLayers().getArray()).toContain(layer);
        });
    });

    // -----------------------------------------------------------------------
    // apply() – secondary layers on OL map must not corrupt primary's apply()
    // Bug fix: filter by object identity (layer === _customLayers[name].layer)
    // not just name presence, to prevent same-named layers from causing false
    // size mismatches and incorrect full invalidations.
    // -----------------------------------------------------------------------
    describe("apply() filtering with swipe-active OL map", () => {
        it("does not remove secondary layers from OL map when applying primary layers", () => {
            const primaryGroup = new TestLayerSetGroup([]);
            const secondaryGroup = new TestLayerSetGroup([]);
            const map = makeOLMap();

            // Primary has one custom layer
            const primaryLayer = makeLayer("primaryLayer");
            primaryGroup.addLayer(map as any, "primaryLayer", primaryLayer);

            // Secondary has one custom layer (simulating secondary map's layer during swipe activation)
            // addLayer puts the layer on the OL map AND in secondaryGroup._customLayers (not primaryGroup)
            const secondaryLayer = makeLayer("secondaryLayer");
            secondaryGroup.addLayer(map as any, "secondaryLayer", secondaryLayer);

            // OL map has both layers
            expect(map.getLayers().getArray()).toContain(primaryLayer);
            expect(map.getLayers().getArray()).toContain(secondaryLayer);

            // Apply primary group with its 1 layer in Redux state (no secondary layer)
            const primaryLayerInfo = [
                {
                    name: "primaryLayer",
                    displayName: "primaryLayer",
                    visible: true,
                    opacity: 1,
                    selectable: false,
                    busyWorkerCount: 0,
                    type: "Vector" as any,
                    isExternal: true,
                    order: 0,
                    isSelectable: false
                }
            ];
            // apply() should not throw and should not remove secondaryLayer from OL map
            primaryGroup.apply(map as any, primaryLayerInfo);

            // Secondary layer is still on the OL map after primary's apply()
            expect(map.getLayers().getArray()).toContain(secondaryLayer);
        });

        it("apply() only manages layers that belong to its own _customLayers", () => {
            const primaryGroup = new TestLayerSetGroup([]);
            const secondaryGroup = new TestLayerSetGroup([]);
            const map = makeOLMap();

            // Primary has its own layer
            const primaryLayer = makeLayer("primary-custom");
            primaryGroup.addLayer(map as any, "primary-custom", primaryLayer);

            // Secondary layer is added directly to OL map (simulating secondary layers added during swipe activation)
            const secondaryLayer = makeLayer("secondary-custom");
            map.addLayer(secondaryLayer);
            // Secondary's layer is tracked in secondaryGroup._customLayers, NOT primaryGroup._customLayers

            // OL map has both layers; primary._customLayers only has primaryLayer
            expect(primaryGroup.hasLayer("primary-custom")).toBe(true);
            expect(primaryGroup.hasLayer("secondary-custom")).toBe(false);

            // After apply with primary's Redux layers (just the one primary layer)
            const primaryLayers = [
                {
                    name: "primary-custom",
                    displayName: "primary-custom",
                    visible: true,
                    opacity: 1,
                    selectable: false,
                    busyWorkerCount: 0,
                    type: "Vector" as any,
                    isExternal: true,
                    order: 0,
                    isSelectable: false
                }
            ];
            primaryGroup.apply(map as any, primaryLayers);

            // secondary-custom must NOT be removed from OL map (it doesn't belong to primary group)
            expect(map.getLayers().getArray()).toContain(secondaryLayer);
            // primary-custom must still be on the OL map
            expect(map.getLayers().getArray()).toContain(primaryLayer);
        });

        it("apply() does not cause full invalidation when primary and secondary have same-named layers", () => {
            // This test covers the scenario where:
            // 1. User adds "gisborne.geojson" to primary (layer1 in primary._customLayers)
            // 2. User adds "gisborne.geojson" to secondary (layer2 in secondary._customLayers)
            //    Both layer1 and layer2 are on the primary OL map (in swipe mode)
            // 3. apply() is triggered for primary with primary's Redux layers ([layer1])
            // Before fix: the filter `_customLayers[name] != null` matched BOTH layer1 and layer2
            //   (same name "gisborne") → currentLayers.length=2, layers.length=1 → FULL INVALIDATION
            //   → layer2 (secondary's layer) got REMOVED from OL map → secondary layer invisible
            // After fix: filter uses object identity `_customLayers[name]?.layer === l.layer`
            //   → only layer1 matches → currentLayers.length=1 == layers.length=1 → no invalidation
            const primaryGroup = new TestLayerSetGroup([]);
            const secondaryGroup = new TestLayerSetGroup([]);
            const map = makeOLMap();

            // Primary adds "gisborne.geojson" → layer1 (IS_EXTERNAL=true, added to OL map)
            const layer1 = makeLayer("gisborne.geojson");
            primaryGroup.addLayer(map as any, "gisborne.geojson", layer1);

            // Secondary adds same-named file → layer2 (different OL object, also on same OL map)
            const layer2 = makeLayer("gisborne.geojson");
            secondaryGroup.addLayer(map as any, "gisborne.geojson", layer2);

            // Both layers are on the OL map
            expect(map.getLayers().getArray()).toContain(layer1);
            expect(map.getLayers().getArray()).toContain(layer2);

            // apply() for primary with its own layers (primary Redux state = [layer1])
            const primaryLayerInfo = [
                {
                    name: "gisborne.geojson",
                    displayName: "gisborne.geojson",
                    visible: true,
                    opacity: 1,
                    selectable: false,
                    busyWorkerCount: 0,
                    type: "Vector" as any,
                    isExternal: true,
                    order: 0,
                    isSelectable: false
                }
            ];
            primaryGroup.apply(map as any, primaryLayerInfo);

            // PRIMARY's layer must still be on OL map
            expect(map.getLayers().getArray()).toContain(layer1);
            // SECONDARY's layer must also still be on OL map (must NOT be removed by primary's apply)
            expect(map.getLayers().getArray()).toContain(layer2);
            // Secondary's tracking is unchanged
            expect(secondaryGroup.hasLayer("gisborne.geojson")).toBe(true);
        });
    });

    // -----------------------------------------------------------------------
    // add-to-secondary scenario: layer added to primary then transferred
    // -----------------------------------------------------------------------
    describe("add-layer-to-secondary scenario (end-to-end state checks)", () => {
        it("after adding to primary and transferring to secondary, secondary.getSwipeableLayers includes the new layer", () => {
            const baseOSM = new TileLayer({});
            baseOSM.set(LayerProperty.LAYER_NAME, "OSM");

            const naturalLandmarks = makeLayer("NaturalLandmarks");  // initially appdef layer on secondary

            const primaryGroup = new TestLayerSetGroup([baseOSM]);
            // Secondary mainSet has naturalLandmarks as a "built-in" layer
            const secondaryGroup = new TestLayerSetGroup([naturalLandmarks]);
            const map = makeOLMap();

            // Initial state: secondary swipeable layers = [naturalLandmarks]
            expect(secondaryGroup.getSwipeableLayers()).toEqual([naturalLandmarks]);

            // User adds "userFile" layer (goes to primary via viewer.getLayerManager())
            const userFileLayer = makeLayer("userFile");
            primaryGroup.addLayer(map as any, "userFile", userFileLayer);

            // State check: primary has it, secondary doesn't
            expect(primaryGroup.hasLayer("userFile")).toBe(true);
            expect(secondaryGroup.hasLayer("userFile")).toBe(false);

            // transferLayerToSwipeSecondary logic
            const olLayer = primaryGroup.getLayer("userFile")!;
            const order = map.getLayers().getArray().indexOf(olLayer);
            primaryGroup.transferLayerOut("userFile");
            secondaryGroup.transferLayerIn("userFile", olLayer, order);

            // Expected final state:
            // - Primary swipeable = [baseOSM] (no custom layers)
            expect(primaryGroup.getSwipeableLayers()).toEqual([baseOSM]);
            // - Secondary swipeable = [naturalLandmarks, userFile]
            const secSwipeable = secondaryGroup.getSwipeableLayers();
            expect(secSwipeable).toContain(naturalLandmarks);
            expect(secSwipeable).toContain(userFileLayer);
            expect(secSwipeable).toHaveLength(2);
        });

        it("after adding to primary (primary selected in dropdown), primary.getSwipeableLayers includes the new layer", () => {
            const baseOSM = new TileLayer({});
            const primaryGroup = new TestLayerSetGroup([baseOSM]);
            const map = makeOLMap();

            const userFileLayer = makeLayer("userFile2");
            primaryGroup.addLayer(map as any, "userFile2", userFileLayer);

            // No transfer; refreshSwipeClips would re-activate with primary having the new layer
            const primarySwipeable = primaryGroup.getSwipeableLayers();
            expect(primarySwipeable).toContain(baseOSM);
            expect(primarySwipeable).toContain(userFileLayer);
            expect(primarySwipeable).toHaveLength(2);
        });
    });
});
