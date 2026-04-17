import { describe, it, expect } from "vitest";
import { buildSubjectLayerDefn, getMapDefinitionsFromFlexLayout, isMapDefinition, isStateless, parseMapGroupCoordinateFormat, parseSwipePairs } from "../../src/actions/init-command";
import { GenericSubjectLayerType, IGenericSubjectMapLayer } from "../../src/actions/defs";

describe("actions/init-command", () => {
    it("buildSubjectLayerDefn builds correct object", () => {
        const map = {
            Type: "Vector",
            Extension: {
                source_type: "foo",
                display_name: "bar",
                driver_name: "baz",
                layer_description: "desc",
                vector_layer_style: { color: "red" },
                cluster: { distance: 10 },
                is_selectable: false,
                disable_hover: true,
                popup_template: "<div>Popup</div>",
                initially_visible: false,
                source_param_foo: "spfoo",
                layer_opt_bar: "lobar"
            }
        };
        const result = buildSubjectLayerDefn("test", map);
        expect(result.name).toBe("test");
        expect(result.displayName).toBe("bar");
        expect(result.driverName).toBe("baz");
        expect(result.description).toBe("desc");
        expect(result.vectorStyle).toEqual({ color: "red" });
        expect(result.cluster).toEqual({ distance: 10 });
        expect(result.selectable).toBe(false);
        expect(result.disableHover).toBe(true);
        expect(result.popupTemplate).toBe("<div>Popup</div>");
        expect(result.initiallyVisible).toBe(false);
        expect(result.sourceParams.foo).toBe("spfoo");
        expect(result.layerOptions.bar).toBe("lobar");
    });

    it("isMapDefinition type guard works", () => {
        const mapDef = { name: "foo", mapDef: "bar", metadata: {} };
        // Use a minimal IGenericSubjectMapLayer shape for the negative case, with a valid type value
        const subj: IGenericSubjectMapLayer = { name: "foo", type: GenericSubjectLayerType.CustomVector, meta: undefined, layerOptions: {}, sourceParams: {}, initiallyVisible: true, selectable: true };
        expect(isMapDefinition(mapDef)).toBe(true);
        expect(isMapDefinition(subj)).toBe(false);
    });

    it("isStateless returns true if Extension.Stateless is 'true'", () => {
        const appDef = { Extension: { Stateless: "true" } };
        expect(isStateless(appDef as any)).toBe(true);
    });

    it("isStateless returns false if MapDefinition present", () => {
        const appDef = {
            MapSet: {
                MapGroup: [
                    { "@id": "g1", Map: [{ Type: "MapGuide", Extension: { ResourceId: "foo" } }] }
                ]
            }
        };
        expect(isStateless(appDef as any)).toBe(false);
    });

    it("getMapDefinitionsFromFlexLayout returns map definitions with metadata and subject layers", () => {
        const appDef = {
            MapSet: {
                MapGroup: [
                    {
                        "@id": "MainMap",
                        Map: [
                            {
                                Type: "MapGuide",
                                Extension: {
                                    ResourceId: "Library://Samples/Sheboygan.MapDefinition",
                                    Meta_Category: "Operations",
                                    Meta_Order: "1"
                                }
                            },
                            {
                                Type: "SubjectLayer",
                                Extension: {
                                    source_type: "geojson",
                                    display_name: "Cities",
                                    driver_name: "GeoJSON",
                                    initially_visible: true,
                                    source_param_url: "https://example.test/cities.geojson",
                                    meta_projection: "EPSG:4326"
                                }
                            }
                        ]
                    }
                ]
            }
        };

        const maps = getMapDefinitionsFromFlexLayout(appDef as any);
        expect(maps).toHaveLength(2);
        expect(maps[0]).toEqual({
            name: "MainMap",
            mapDef: "Library://Samples/Sheboygan.MapDefinition",
            metadata: {
                Category: "Operations",
                Order: "1"
            }
        });
        expect(isMapDefinition(maps[1] as any)).toBe(false);
        expect((maps[1] as IGenericSubjectMapLayer).displayName).toBe("Cities");
        expect((maps[1] as IGenericSubjectMapLayer).sourceParams.url).toBe("https://example.test/cities.geojson");
        expect((maps[1] as IGenericSubjectMapLayer).meta).toEqual({ projection: "EPSG:4326" });
    });

    it("getMapDefinitionsFromFlexLayout throws when there are no map definitions or subject layers", () => {
        expect(() => getMapDefinitionsFromFlexLayout({ MapSet: { MapGroup: [{ "@id": "Empty", Map: [] }] } } as any))
            .toThrow("No Map Definition or subject layer found in Application Definition");
    });

    describe("parseSwipePairs", () => {
        it("returns empty array when no MapSet", () => {
            const appDef = {};
            expect(parseSwipePairs(appDef as any)).toEqual([]);
        });

        it("returns empty array when no swipe Extension on MapGroups", () => {
            const appDef = {
                MapSet: {
                    MapGroup: [
                        { "@id": "MapA", Map: [] },
                        { "@id": "MapB", Map: [] }
                    ]
                }
            };
            expect(parseSwipePairs(appDef as any)).toEqual([]);
        });

        it("returns empty array when SwipePairWith present but SwipePrimary is not true", () => {
            const appDef = {
                MapSet: {
                    MapGroup: [
                        { "@id": "MapA", Map: [], Extension: { SwipePairWith: "MapB", SwipePrimary: "false" } },
                        { "@id": "MapB", Map: [] }
                    ]
                }
            };
            expect(parseSwipePairs(appDef as any)).toEqual([]);
        });

        it("returns a pair when primary map declares SwipePairWith and SwipePrimary=true", () => {
            const appDef = {
                MapSet: {
                    MapGroup: [
                        { "@id": "MapA", Map: [], Extension: { SwipePairWith: "MapB", SwipePrimary: "true" } },
                        { "@id": "MapB", Map: [] }
                    ]
                }
            };
            const pairs = parseSwipePairs(appDef as any);
            expect(pairs).toHaveLength(1);
            expect(pairs[0].primaryMapName).toBe("MapA");
            expect(pairs[0].secondaryMapName).toBe("MapB");
        });

        it("deduplicates pairs if same pair is declared twice", () => {
            const appDef = {
                MapSet: {
                    MapGroup: [
                        { "@id": "MapA", Map: [], Extension: { SwipePairWith: "MapB", SwipePrimary: "true" } },
                        { "@id": "MapB", Map: [], Extension: { SwipePairWith: "MapA", SwipePrimary: "true" } }
                    ]
                }
            };
            const pairs = parseSwipePairs(appDef as any);
            expect(pairs).toHaveLength(1);
        });

        it("handles case-insensitive SwipePrimary values", () => {
            const appDef = {
                MapSet: {
                    MapGroup: [
                        { "@id": "MapA", Map: [], Extension: { SwipePairWith: "MapB", SwipePrimary: "True" } },
                        { "@id": "MapB", Map: [] }
                    ]
                }
            };
            const pairs = parseSwipePairs(appDef as any);
            expect(pairs).toHaveLength(1);
            expect(pairs[0].primaryMapName).toBe("MapA");
        });
    });

    describe("parseMapGroupCoordinateFormat", () => {
        it("returns undefined when Map array is empty", () => {
            const mapGroup = { "@id": "MapA", Map: [] };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBeUndefined();
        });

        it("returns undefined when the first map has no extension", () => {
            const mapGroup = { "@id": "MapA", Map: [{ Type: "MapGuide" }] };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBeUndefined();
        });

        it("returns MouseCoordinatesFormat from the first map extension", () => {
            const mapGroup = {
                "@id": "MapA",
                Map: [
                    {
                        Type: "MapGuide",
                        Extension: {
                            MouseCoordinatesFormat: "Lng: {x} {units}, Lat: {y} {units}"
                        }
                    }
                ]
            };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBe("Lng: {x} {units}, Lat: {y} {units}");
        });

        it("ignores non-canonical alias keys", () => {
            const mapGroup = {
                "@id": "MapA",
                Map: [
                    {
                        Type: "MapGuide",
                        Extension: {
                            CoordinateFormat: "Easting: {x} {units}, Northing: {y} {units}"
                        }
                    }
                ]
            };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBeUndefined();
        });

        it("returns undefined for blank values", () => {
            const mapGroup = {
                "@id": "MapA",
                Map: [
                    {
                        Type: "MapGuide",
                        Extension: {
                            MouseCoordinatesFormat: "   "
                        }
                    }
                ]
            };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBeUndefined();
        });

        it("only reads from the first map", () => {
            const mapGroup = {
                "@id": "MapA",
                Map: [
                    {
                        Type: "MapGuide",
                        Extension: {}
                    },
                    {
                        Type: "MapGuide",
                        Extension: {
                            MouseCoordinatesFormat: "Easting: {x} {units}, Northing: {y} {units}"
                        }
                    }
                ]
            };
            expect(parseMapGroupCoordinateFormat(mapGroup as any)).toBeUndefined();
        });
    });
});
