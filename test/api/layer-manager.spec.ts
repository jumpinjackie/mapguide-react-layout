import { beforeAll, describe, expect, it, vi } from "vitest";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import HeatmapLayer from "ol/layer/Heatmap";
import ImageWMS from "ol/source/ImageWMS";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";
import HeatmapSource from "ol/source/Vector";
import { LayerProperty } from "../../src/api/common";
import { LayerManager, getLayerInfo } from "../../src/api/layer-manager";
import { OLStyleMapSet } from "../../src/api/ol-style-map-set";
import { ClusterClickAction } from "../../src/api/ol-style-contracts";
import { tr } from "../../src/api/i18n";

vi.mock("colorbrewer", () => ({
    default: {
        Blues: {
            3: ["#101010", "#202020", "#303030"],
            4: ["#111111", "#222222", "#333333", "#444444"]
        },
        Reds: {
            3: ["#aa0000", "#bb0000", "#cc0000"]
        }
    }
}));

const SIMPLE_STYLE = {
    default: {
        point: {
            type: "Circle",
            radius: 5,
            fill: { color: "#ff0000", alpha: 255 },
            stroke: { color: "#000000", width: 1, alpha: 255 }
        },
        line: {
            color: "#00ff00",
            width: 2,
            alpha: 255
        },
        polygon: {
            fill: { color: "#0000ff", alpha: 64 },
            stroke: { color: "#ffffff", width: 1, alpha: 255 }
        }
    }
} as any;

function createManager(layerSet: any = {}) {
    const map = {
        getView: () => ({
            getProjection: () => "EPSG:3857"
        })
    } as any;
    return new LayerManager(map, layerSet as any);
}

function cloneStyle<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

describe("api/layer-manager", () => {
    beforeAll(() => {
        Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
            configurable: true,
            value: () => ({
                createLinearGradient: () => ({
                    addColorStop: () => undefined
                }),
                fillRect: () => undefined,
                getImageData: () => ({ data: [] })
            })
        });
    });

    describe("getLayerInfo", () => {
        it("returns WMS legend extension for image WMS layers", () => {
            const layer = new ImageLayer({
                source: new ImageWMS({ url: "https://example.test/wms", params: { LAYERS: "Parcels" } })
            });
            layer.setVisible(true);
            layer.setOpacity(0.75);
            layer.set(LayerProperty.HAS_WMS_LEGEND, true);
            layer.set(LayerProperty.IS_SELECTABLE, true);
            layer.set(LayerProperty.LAYER_NAME, "Parcels");
            layer.set(LayerProperty.LAYER_TYPE, "WMS");
            layer.set(LayerProperty.LAYER_METADATA, { category: "test" });

            const info = getLayerInfo(layer, true);

            expect(info.name).toBe("Parcels");
            expect(info.displayName).toBe("Parcels");
            expect(info.visible).toBe(true);
            expect(info.opacity).toBe(0.75);
            expect(info.isExternal).toBe(true);
            expect(info.extensions?.type).toBe("WMS");
            expect((info.extensions as any)?.getLegendUrl()).toContain("REQUEST=GetLegendGraphic");
            expect(info.metadata).toEqual({ category: "test" });
        });

        it("returns vector style and cluster settings for vector layers", () => {
            const layer = new VectorLayer({ source: new VectorSource() });
            const styleSet = new OLStyleMapSet(SIMPLE_STYLE, {
                distance: 10,
                onClick: ClusterClickAction.ZoomToClusterExtents,
                style: SIMPLE_STYLE
            });
            layer.set(LayerProperty.VECTOR_STYLE, styleSet);
            layer.set(LayerProperty.LAYER_NAME, "Features");
            layer.set(LayerProperty.LAYER_DISPLAY_NAME, "Features Display");
            layer.set(LayerProperty.LAYER_TYPE, "Vector");

            const info = getLayerInfo(layer, false);

            expect(info.displayName).toBe("Features Display");
            expect(info.vectorStyle).toEqual(styleSet.toVectorLayerStyle());
            expect(info.cluster).toEqual(styleSet.toClusterSettings());
            expect(info.isExternal).toBe(false);
        });

        it("returns scalar heatmap settings for heatmap layers", () => {
            const layer = new HeatmapLayer({ source: new HeatmapSource(), blur: 7, radius: 11 });
            layer.set(LayerProperty.LAYER_NAME, "Heat");
            layer.set(LayerProperty.LAYER_TYPE, "Heatmap");

            const info = getLayerInfo(layer, true);

            expect(info.heatmap).toEqual({ blur: 7, radius: 11 });
        });

        it("ignores heatmap expressions that are arrays", () => {
            const layer = new HeatmapLayer({ source: new HeatmapSource(), blur: 7, radius: 11 });
            vi.spyOn(layer, "getBlur").mockReturnValue(["interpolate"] as any);
            vi.spyOn(layer, "getRadius").mockReturnValue(["interpolate"] as any);
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

            const info = getLayerInfo(layer, true);

            expect(info.heatmap).toBeUndefined();
            expect(warnSpy).toHaveBeenCalledTimes(2);
            warnSpy.mockRestore();
        });

        it("supports tile WMS legend layers", () => {
            const layer = new TileLayer({
                source: new TileWMS({ url: "https://example.test/wms", params: { LAYERS: "Roads" } })
            });
            layer.set(LayerProperty.HAS_WMS_LEGEND, true);

            const info = getLayerInfo(layer, true);

            expect(info.extensions?.type).toBe("WMS");
        });
    });

    describe("LayerManager", () => {
        it("delegates common layer set operations", () => {
            const layer = new VectorLayer({ source: new VectorSource() });
            const layerInfo = { name: "Layer1" } as any;
            const layerSet = {
                tryGetSubjectLayer: vi.fn(() => layer),
                getCustomLayers: vi.fn(() => [layerInfo]),
                hasLayer: vi.fn(() => true),
                addLayer: vi.fn((_map, _name, _layer, _allowReplace) => layerInfo),
                removeLayer: vi.fn(() => layer),
                getLayer: vi.fn(() => layer),
                apply: vi.fn()
            };
            const manager = createManager(layerSet);

            expect(manager.tryGetSubjectLayer()).toBe(layer);
            expect(manager.getLayers()).toEqual([layerInfo]);
            expect(manager.hasLayer("Layer1")).toBe(true);
            expect(manager.addLayer("Layer1", layer, true)).toBe(layerInfo);
            expect(manager.removeLayer("Layer1")).toBe(layer);
            expect(manager.getLayer("Layer1")).toBe(layer);
            manager.apply([layerInfo]);

            expect(layerSet.tryGetSubjectLayer).toHaveBeenCalledTimes(1);
            expect(layerSet.getCustomLayers).toHaveBeenCalledTimes(1);
            expect(layerSet.hasLayer).toHaveBeenCalledWith("Layer1");
            expect(layerSet.addLayer).toHaveBeenCalledWith(expect.anything(), "Layer1", layer, true);
            expect(layerSet.removeLayer).toHaveBeenCalledWith(expect.anything(), "Layer1");
            expect(layerSet.getLayer).toHaveBeenCalledWith("Layer1");
            expect(layerSet.apply).toHaveBeenCalledWith(expect.anything(), [layerInfo]);
        });

        it("does not add external layer when onlyAddIfNotExists is true and layer already exists", () => {
            const layerSet = {
                hasLayer: vi.fn(() => true),
                addExternalLayer: vi.fn()
            };
            const manager = createManager(layerSet);

            const result = manager.addExternalLayer({ name: "Roads" } as any, true, {});

            expect(result).toBeUndefined();
            expect(layerSet.addExternalLayer).not.toHaveBeenCalled();
        });

        it("adds external layer through the layer set when allowed", () => {
            const added = { name: "Roads" } as any;
            const layerSet = {
                hasLayer: vi.fn(() => false),
                addExternalLayer: vi.fn(() => added)
            };
            const manager = createManager(layerSet);

            const result = manager.addExternalLayer({ name: "Roads" } as any, true, { BingMapsApiKey: "key" });

            expect(result).toBe(added);
            expect(layerSet.addExternalLayer).toHaveBeenCalledWith(expect.anything(), { name: "Roads" }, { BingMapsApiKey: "key" });
        });

        it("adds a clustered vector layer from parsed features with labels and metadata", async () => {
            const manager = createManager({});
            const addLayerSpy = vi.spyOn(manager, "addLayer").mockImplementation((_name, layer) => ({
                name: layer.get(LayerProperty.LAYER_NAME),
                type: layer.get(LayerProperty.LAYER_TYPE)
            } as any));
            const features = {
                name: "Imported",
                type: "GeoJSON",
                geometryTypes: ["Point", "LineString"],
                addTo: vi.fn(async () => undefined),
                getDistinctValues: vi.fn(async () => [])
            };

            const result = await manager.addLayerFromParsedFeatures({
                features: features as any,
                labelOnProperty: "Name",
                metadata: { category: "upload" },
                selectedPopupTemplate: { title: "Popup" } as any,
                defn: { id: 1 },
                extraOptions: {
                    kind: "Cluster",
                    clusterDistance: 25,
                    onClusterClickAction: ClusterClickAction.ZoomToClusterExtents
                } as any
            });

            expect(features.addTo).toHaveBeenCalledWith(expect.any(VectorSource), "EPSG:3857", "EPSG:3857");
            expect(result).toEqual({ name: "Imported", type: "GeoJSON" });
            const addedLayer = addLayerSpy.mock.calls[0][1] as VectorLayer<any>;
            expect(addedLayer.get(LayerProperty.IS_SELECTABLE)).toBe(true);
            expect(addedLayer.get(LayerProperty.IS_EXTERNAL)).toBe(true);
            expect(addedLayer.get(LayerProperty.LAYER_METADATA)).toEqual({ category: "upload" });
            expect(addedLayer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION)).toEqual({ title: "Popup" });
            const styleSet = addedLayer.get(LayerProperty.VECTOR_STYLE) as OLStyleMapSet;
            const vectorStyle = styleSet.toVectorLayerStyle();
            expect(vectorStyle.default.polygon).toBeUndefined();
            expect(vectorStyle.default.point?.label?.text).toEqual({ expr: ["get", "Name"] });
            const clusterSettings = styleSet.toClusterSettings();
            expect(clusterSettings?.distance).toBe(25);
            expect(clusterSettings?.onClick).toBe(ClusterClickAction.ZoomToClusterExtents);
            expect(clusterSettings?.style.default.point?.label?.text).toEqual({ expr: ["get", "features", 0, "Name"] });
        });

        it("adds a heatmap layer from parsed features", async () => {
            const manager = createManager({});
            const addLayerSpy = vi.spyOn(manager, "addLayer").mockImplementation((_name, layer) => ({
                name: layer.get(LayerProperty.LAYER_NAME),
                heatmap: layer.get(LayerProperty.IS_HEATMAP)
            } as any));
            const features = {
                name: "Heat layer",
                type: "GeoJSON",
                geometryTypes: ["Point"],
                addTo: vi.fn(async () => undefined),
                getDistinctValues: vi.fn(async () => [])
            };

            const result = await manager.addLayerFromParsedFeatures({
                features: features as any,
                extraOptions: {
                    kind: "Heatmap",
                    weightProperty: "Weight"
                } as any
            });

            expect(result).toEqual({ name: "Heat layer", heatmap: true });
            const addedLayer = addLayerSpy.mock.calls[0][1] as HeatmapLayer;
            expect(addedLayer.get(LayerProperty.IS_HEATMAP)).toBe(true);
            expect(addedLayer.get(LayerProperty.IS_SELECTABLE)).toBeUndefined();
            expect((addedLayer.getSource() as any)).toBeInstanceOf(VectorSource);
        });

        it("adds a themed vector layer with one rule per distinct value", async () => {
            const manager = createManager({});
            const addLayerSpy = vi.spyOn(manager, "addLayer").mockImplementation((_name, layer) => ({
                name: layer.get(LayerProperty.LAYER_NAME),
                type: layer.get(LayerProperty.LAYER_TYPE)
            } as any));
            const values = ["Residential", "Commercial", "Industrial"];
            const features = {
                name: "Zoning",
                type: "GeoJSON",
                geometryTypes: ["Point", "LineString", "Polygon"],
                addTo: vi.fn(async () => undefined),
                getDistinctValues: vi.fn(async () => values)
            };

            const result = await manager.addLayerFromParsedFeatures({
                features: features as any,
                defaultStyle: cloneStyle(SIMPLE_STYLE),
                labelOnProperty: "Name",
                extraOptions: {
                    kind: "Theme",
                    themeOnProperty: "Zone",
                    colorBrewerTheme: "Blues"
                } as any
            });

            expect(features.getDistinctValues).toHaveBeenCalledWith("Zone");
            expect(result).toEqual({ name: "Zoning", type: "GeoJSON" });
            const addedLayer = addLayerSpy.mock.calls[0][1] as VectorLayer<any>;
            const styleSet = addedLayer.get(LayerProperty.VECTOR_STYLE) as OLStyleMapSet;
            const vectorStyle = styleSet.toVectorLayerStyle() as any;
            expect(vectorStyle.rules).toHaveLength(values.length);
            expect(vectorStyle.rules[0].filter).toEqual(["==", ["get", "Zone"], "Residential"]);
            expect(vectorStyle.rules[0].style.point.fill.color).toBe("#101010");
            expect(vectorStyle.rules[1].style.line.color).toBe("#202020");
            expect(vectorStyle.rules[2].style.polygon.fill.color).toBe("#303030");
            expect(vectorStyle.rules[0].style.point.label.text).toEqual({ expr: ["get", "Name"] });
        });

        it("falls back to Blues ramp when an unknown colorbrewer theme is requested", async () => {
            const manager = createManager({});
            const addLayerSpy = vi.spyOn(manager, "addLayer").mockImplementation((_name, layer) => ({
                name: layer.get(LayerProperty.LAYER_NAME)
            } as any));
            const values = ["A", "B", "C"];
            const features = {
                name: "FallbackTheme",
                type: "GeoJSON",
                geometryTypes: ["Polygon"],
                addTo: vi.fn(async () => undefined),
                getDistinctValues: vi.fn(async () => values)
            };

            await manager.addLayerFromParsedFeatures({
                features: features as any,
                defaultStyle: cloneStyle(SIMPLE_STYLE),
                extraOptions: {
                    kind: "Theme",
                    themeOnProperty: "Group",
                    colorBrewerTheme: "NOT_A_REAL_THEME"
                } as any
            });

            const addedLayer = addLayerSpy.mock.calls[0][1] as VectorLayer<any>;
            const styleSet = addedLayer.get(LayerProperty.VECTOR_STYLE) as OLStyleMapSet;
            const vectorStyle = styleSet.toVectorLayerStyle() as any;
            expect(vectorStyle.rules).toHaveLength(values.length);
            expect(vectorStyle.rules[0].style.polygon.fill.color).toBe("#101010");
            expect(vectorStyle.rules[1].style.polygon.fill.color).toBe("#202020");
            expect(vectorStyle.rules[2].style.polygon.fill.color).toBe("#303030");
        });

        describe("parseFeaturesFromFile", () => {
            const OriginalFileReader = globalThis.FileReader;

            function setMockFileReader(result: unknown) {
                class MockFileReader {
                    public result: unknown = null;
                    private loadHandler?: (e: ProgressEvent<FileReader>) => void;

                    addEventListener(event: string, handler: (e: ProgressEvent<FileReader>) => void) {
                        if (event === "load") {
                            this.loadHandler = handler;
                        }
                    }

                    readAsText(_file: File) {
                        this.result = result;
                        if (this.loadHandler) {
                            this.loadHandler({ target: this } as any);
                        }
                    }
                }
                Object.defineProperty(globalThis, "FileReader", {
                    configurable: true,
                    value: MockFileReader
                });
            }

            afterEach(() => {
                Object.defineProperty(globalThis, "FileReader", {
                    configurable: true,
                    value: OriginalFileReader
                });
            });

            it("rejects when no format drivers are available", async () => {
                setMockFileReader("a,b,c");
                const manager = createManager({});
                (manager as any)._olFormats = [];
                const file = new File(["a,b,c"], "data.csv", { type: "text/csv" });

                await expect(manager.parseFeaturesFromFile({ file, name: "Imported", locale: "en" }))
                    .rejects.toThrow(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NO_FORMATS", "en"));
            });

            it("tries all parsers, ignores parser errors, and resolves first parser with features", async () => {
                setMockFileReader("POINT(1 2)");
                const manager = createManager({});
                const failingParser = {
                    tryParse: vi.fn(async () => {
                        throw new Error("bad parser");
                    })
                };
                const parsed = {
                    name: "",
                    hasFeatures: vi.fn(() => true)
                };
                const goodParser = {
                    tryParse: vi.fn(async () => parsed)
                };
                (manager as any)._olFormats = [failingParser, goodParser];
                const file = new File(["POINT(1 2)"], "data.wkt", { type: "text/plain" });

                const result = await manager.parseFeaturesFromFile({ file, name: "ImportedLayer", locale: "en" });

                expect(failingParser.tryParse).toHaveBeenCalledWith(file.size, "POINT(1 2)");
                expect(goodParser.tryParse).toHaveBeenCalledWith(file.size, "POINT(1 2)");
                expect(result).toBe(parsed as any);
                expect(parsed.name).toBe("ImportedLayer");
            });

            it("rejects when all parsers return no features", async () => {
                setMockFileReader("{}\n");
                const manager = createManager({});
                (manager as any)._olFormats = [
                    { tryParse: vi.fn(async () => ({ hasFeatures: () => false })) },
                    { tryParse: vi.fn(async () => undefined) }
                ];
                const file = new File(["{}\n"], "data.json", { type: "application/json" });

                await expect(manager.parseFeaturesFromFile({ file, name: "Nope", locale: "en" }))
                    .rejects.toThrow(tr("ADD_LOCAL_FILE_LAYER_FAILURE", "en"));
            });

            it("rejects when file reader result is not text", async () => {
                setMockFileReader(new ArrayBuffer(8));
                const manager = createManager({});
                (manager as any)._olFormats = [
                    { tryParse: vi.fn(async () => ({ hasFeatures: () => true })) }
                ];
                const file = new File(["binary"], "data.bin", { type: "application/octet-stream" });

                await expect(manager.parseFeaturesFromFile({ file, name: "Binary", locale: "en" }))
                    .rejects.toThrow(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT", "en"));
            });
        });
    });
});