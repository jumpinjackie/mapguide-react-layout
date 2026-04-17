import { describe, expect, it, vi } from "vitest";
import { DefaultViewerInitCommand } from "../../src/actions/init-mapguide";
import { AsyncLazy } from "../../src/api/lazy";

function makeRuntimeMap(name: string, sessionId: string, mentorCode: string = "LL84"): any {
    return {
        Name: name,
        SessionId: sessionId,
        CoordinateSystem: {
            MentorCode: mentorCode,
            EpsgCode: "4326",
        },
        Extents: {
            MinX: 0,
            MinY: 0,
            MaxX: 10,
            MaxY: 10,
        },
        BackgroundColor: "#FFFFFF",
        MapDefinition: "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
        DisplayDpi: 96,
    };
}

function makeMapDefinition(withTileSet: boolean): any {
    return {
        CoordinateSystem: "WKT-CS",
        Extents: {
            MinX: 1,
            MinY: 2,
            MaxX: 3,
            MaxY: 4,
        },
        BackgroundColor: "FF112233",
        MapLayerGroup: [
            {
                Name: "Dynamic Group",
                ShowInLegend: true,
                LegendLabel: "Dynamic Group",
                ExpandInLegend: true,
                Visible: true,
                Group: "",
            },
        ],
        MapLayer: [
            {
                Name: "Dynamic Layer",
                ResourceId: "Library://Maps/Layers/Dynamic.LayerDefinition",
                Selectable: true,
                ShowInLegend: true,
                LegendLabel: "Dynamic Layer",
                ExpandInLegend: true,
                Visible: true,
                Group: "Dynamic Group",
            },
        ],
        TileSetSource: withTileSet
            ? {
                ResourceId: "Library://Tiles/Test.TileSetDefinition",
            }
            : undefined,
    };
}

function makeTileSetDefinition(provider: "Default" | "XYZ"): any {
    return {
        Extents: {
            MinX: 1,
            MinY: 2,
            MaxX: 3,
            MaxY: 4,
        },
        TileStoreParameters: {
            TileProvider: provider,
            Parameter: [
                { Name: "TileWidth", Value: "512" },
                { Name: "TileHeight", Value: "512" },
            ],
        },
        BaseMapLayerGroup: [
            {
                Name: "Base Group",
                Visible: true,
                ShowInLegend: true,
                ExpandInLegend: true,
                LegendLabel: "Base Group",
                BaseMapLayer: [
                    {
                        Name: "Base Layer",
                        ResourceId: "Library://Maps/Layers/Base.LayerDefinition",
                        Selectable: false,
                        ShowInLegend: true,
                        LegendLabel: "Base Layer",
                        ExpandInLegend: true,
                    },
                ],
            },
        ],
    };
}

describe("actions/init-mapguide", () => {
    it("establishes initial map name/session from the first runtime map", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const genericSubject = {
            name: "GenericSubject",
            meta: {
                projection: "EPSG:4326",
            },
        } as any;

        const mapsByName: any = {
            GenericSubject: genericSubject,
            MapA: makeRuntimeMap("MapA", "SESSION_A"),
            MapB: makeRuntimeMap("MapB", "SESSION_B"),
        };

        expect((cmd as any).establishInitialMapNameAndSession(mapsByName)).toEqual(["MapA", "SESSION_A"]);
    });

    it("returns empty map/session when no runtime map exists", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const mapsByName: any = {
            GenericOnly: {
                name: "GenericOnly",
                meta: {
                    projection: "EPSG:3857",
                },
            },
        };

        expect((cmd as any).establishInitialMapNameAndSession(mapsByName)).toEqual(["", ""]);
    });

    it("detects arbitrary coordinate systems only for runtime maps", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);

        expect((cmd as any).isArbitraryCoordSys(makeRuntimeMap("MapArb", "S1", "XY-M"))).toBe(true);
        expect((cmd as any).isArbitraryCoordSys(makeRuntimeMap("MapStd", "S2", "LL84"))).toBe(false);
        expect((cmd as any).isArbitraryCoordSys({ name: "GenericSubject" })).toBe(false);
        expect((cmd as any).isArbitraryCoordSys(undefined)).toBe(false);
    });

    it("derives target map name from resource id or generates one", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);

        expect((cmd as any).getDesiredTargetMapName("Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition")).toBe("Sheboygan");
        expect((cmd as any).getDesiredTargetMapName("InvalidMapDefName")).toMatch(/^Map_\d+$/);
    });

    it("createRuntimeMap uses v3 and v4 client methods based on site version", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const createRuntimeMap = vi.fn().mockResolvedValue(makeRuntimeMap("MapV3", "S3"));
        const createRuntimeMap_v4 = vi.fn().mockResolvedValue(makeRuntimeMap("MapV4", "S4"));

        cmd.attachClient({
            createRuntimeMap,
            createRuntimeMap_v4,
        } as any);

        const options: any = {
            mapDefinition: "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
            requestedFeatures: 7,
            session: "SESSION",
            targetMapName: "Map1",
        };

        const mapV3 = await (cmd as any).createRuntimeMap(
            options,
            new AsyncLazy(async () => ({ Version: "3.1.0.0" }))
        );
        expect(mapV3.Name).toBe("MapV3");
        expect(createRuntimeMap).toHaveBeenCalledWith(options);
        expect(createRuntimeMap_v4).not.toHaveBeenCalled();

        const mapV4 = await (cmd as any).createRuntimeMap(
            options,
            new AsyncLazy(async () => ({ Version: "4.0.0.0" }))
        );
        expect(mapV4.Name).toBe("MapV4");
        expect(createRuntimeMap_v4).toHaveBeenCalledWith(options);
    });

    it("describeRuntimeMap uses v3 and v4 client methods based on site version", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const describeRuntimeMap = vi.fn().mockResolvedValue(makeRuntimeMap("MapV3", "S3"));
        const describeRuntimeMap_v4 = vi.fn().mockResolvedValue(makeRuntimeMap("MapV4", "S4"));

        cmd.attachClient({
            describeRuntimeMap,
            describeRuntimeMap_v4,
        } as any);

        const options: any = {
            mapname: "Map1",
            requestedFeatures: 7,
            session: "SESSION",
        };

        const mapV3 = await (cmd as any).describeRuntimeMap(
            options,
            new AsyncLazy(async () => ({ Version: "3.0.0.0" }))
        );
        expect(mapV3.Name).toBe("MapV3");
        expect(describeRuntimeMap).toHaveBeenCalledWith(options);
        expect(describeRuntimeMap_v4).not.toHaveBeenCalled();

        const mapV4 = await (cmd as any).describeRuntimeMap(
            options,
            new AsyncLazy(async () => ({ Version: "4.0.0.9593" }))
        );
        expect(mapV4.Name).toBe("MapV4");
        expect(describeRuntimeMap_v4).toHaveBeenCalledWith(options);
    });

    it("tryDescribeRuntimeMapAsync falls back to createRuntimeMap for missing map resources", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const describeRuntimeMap = vi.fn().mockRejectedValue({ message: "MgResourceNotFoundException" });
        const createRuntimeMap = vi.fn().mockResolvedValue(makeRuntimeMap("RecoveredMap", "S5"));

        cmd.attachClient({
            describeRuntimeMap,
            createRuntimeMap,
        } as any);

        const result = await (cmd as any).tryDescribeRuntimeMapAsync(
            "RecoveredMap",
            new AsyncLazy(async () => "SESSION"),
            "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
            new AsyncLazy(async () => ({ Version: "3.0.0.0" }))
        );

        expect(result.Name).toBe("RecoveredMap");
        expect(describeRuntimeMap).toHaveBeenCalledTimes(1);
        expect(createRuntimeMap).toHaveBeenCalledTimes(1);
    });

    it("tryDescribeRuntimeMapAsync rethrows non-recoverable errors", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const describeRuntimeMap = vi.fn().mockRejectedValue(new Error("Unexpected failure"));

        cmd.attachClient({
            describeRuntimeMap,
        } as any);

        await expect(
            (cmd as any).tryDescribeRuntimeMapAsync(
                "Map1",
                new AsyncLazy(async () => "SESSION"),
                "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
                new AsyncLazy(async () => ({ Version: "3.0.0.0" }))
            )
        ).rejects.toThrow("Unexpected failure");
    });

    it("describeRuntimeMapStateless throws when map definition retrieval fails", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const getResource = vi.fn().mockResolvedValue(undefined);
        cmd.attachClient({ getResource } as any);

        await expect(
            (cmd as any).describeRuntimeMapStateless(
                { getResource: vi.fn() } as any,
                "4.0.0.0",
                {
                    name: "StatelessMap",
                    mapDef: "Library://Maps/Stateless.MapDefinition",
                    metadata: {
                        MentorCode: "WGS84.PseudoMercator",
                        EpsgCode: "3857",
                        MetersPerUnit: 1,
                    },
                }
            )
        ).rejects.toThrow("Failed to fetch map def");
        expect(getResource).toHaveBeenCalledWith("Library://Maps/Stateless.MapDefinition", { username: "Anonymous" });
    });

    it("describeRuntimeMapStateless composes runtime map with default tile provider data", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const getMapDef = vi.fn().mockResolvedValue(makeMapDefinition(true));
        const getTileSet = vi.fn().mockResolvedValue(makeTileSetDefinition("Default"));
        cmd.attachClient({ getResource: getMapDef } as any);

        const result = await (cmd as any).describeRuntimeMapStateless(
            { getResource: getTileSet } as any,
            "4.0.0.0",
            {
                name: "StatelessMap",
                mapDef: "Library://Maps/Stateless.MapDefinition",
                metadata: {
                    MentorCode: "WGS84.PseudoMercator",
                    EpsgCode: "3857",
                    MetersPerUnit: 1,
                },
            }
        );

        expect(result.Name).toBe("StatelessMap");
        expect(result.SiteVersion).toBe("4.0.0.0");
        expect(result.Extents.LowerLeftCoordinate).toEqual({ X: 1, Y: 2 });
        expect(result.Extents.UpperRightCoordinate).toEqual({ X: 3, Y: 4 });
        expect(result.TileSetDefinition).toBe("Library://Tiles/Test.TileSetDefinition");
        expect(result.TileWidth).toBe(512);
        expect(result.TileHeight).toBe(512);
        expect(result.CoordinateSystem).toMatchObject({
            MentorCode: "WGS84.PseudoMercator",
            EpsgCode: "3857",
            MetersPerUnit: 1,
            Wkt: "WKT-CS",
        });

        const groupTypes = result.Group.map((g: any) => g.Type);
        const layerTypes = result.Layer.map((l: any) => l.Type);
        expect(groupTypes).toContain(3);
        expect(groupTypes).toContain(1);
        expect(layerTypes).toContain(2);
        expect(layerTypes).toContain(1);

        expect(getTileSet).toHaveBeenCalledWith("Library://Tiles/Test.TileSetDefinition");
    });

    it("describeRuntimeMapStateless handles XYZ tile provider branch", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const getMapDef = vi.fn().mockResolvedValue(makeMapDefinition(true));
        const getTileSet = vi.fn().mockResolvedValue(makeTileSetDefinition("XYZ"));
        cmd.attachClient({ getResource: getMapDef } as any);

        const result = await (cmd as any).describeRuntimeMapStateless(
            { getResource: getTileSet } as any,
            "4.0.0.0",
            {
                name: "StatelessMap",
                mapDef: "Library://Maps/Stateless.MapDefinition",
                metadata: {
                    MentorCode: "WGS84.PseudoMercator",
                    EpsgCode: "3857",
                    MetersPerUnit: 1,
                },
            }
        );

        expect(result.TileHeight).toBe(256);
        expect(result.TileWidth).toBeUndefined();
    });

    it("describeRuntimeMapStateless skips tileset logic when map definition has no tile source", async () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const getMapDef = vi.fn().mockResolvedValue(makeMapDefinition(false));
        const getTileSet = vi.fn();
        cmd.attachClient({ getResource: getMapDef } as any);

        const result = await (cmd as any).describeRuntimeMapStateless(
            { getResource: getTileSet } as any,
            "4.0.0.0",
            {
                name: "StatelessMapNoTiles",
                mapDef: "Library://Maps/StatelessNoTiles.MapDefinition",
                metadata: {
                    MentorCode: "WGS84.PseudoMercator",
                    EpsgCode: "3857",
                    MetersPerUnit: 1,
                },
            }
        );

        expect(result.TileSetDefinition).toBeUndefined();
        expect(result.TileWidth).toBeUndefined();
        expect(result.TileHeight).toBeUndefined();
        expect(result.Group).toHaveLength(1);
        expect(result.Layer).toHaveLength(1);
        expect(getTileSet).not.toHaveBeenCalled();
    });

    // --- setupMaps ---

    const MAP_DEF = "Library://Samples/Maps/Test.MapDefinition";

    function makeAppDef(mapGroups: any[]): any {
        return {
            MapSet: { MapGroup: mapGroups },
            WidgetSet: [],
        };
    }

    function makeMapGroup(id: string, maps: any[], initialView?: any): any {
        const grp: any = { "@id": id, Map: maps };
        if (initialView) {
            grp.InitialView = initialView;
        }
        return grp;
    }

    function makeMapGuideMap(resourceId: string, extra: any = {}): any {
        return {
            Type: "MapGuide",
            Extension: {
                ResourceId: resourceId,
                ...extra,
            },
        };
    }

    it("setupMaps returns empty dict when appDef has no MapSet", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const dict = (cmd as any).setupMaps(
            { WidgetSet: [] } as any,
            {},
            {},
            [],
            "en"
        );
        expect(dict).toEqual({});
    });

    it("setupMaps matches runtime map by MapDefinition and records subject", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const rtMap = makeRuntimeMap("TestMap", "S1");
        rtMap.MapDefinition = MAP_DEF;

        const mapsByName = { TestMap: rtMap };
        const config: any = {};
        const warnings: string[] = [];

        const appDef = makeAppDef([
            makeMapGroup("TestMap", [makeMapGuideMap(MAP_DEF)])
        ]);

        const dict = (cmd as any).setupMaps(appDef, mapsByName, config, warnings, "en");

        expect(dict["TestMap"]).toBeDefined();
        expect(dict["TestMap"].map).toBe(rtMap);
        expect(dict["TestMap"].mapGroupId).toBe("TestMap");
    });

    it("setupMaps extracts config overrides from MapGuide Extension", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const rtMap = makeRuntimeMap("TestMap", "S1");
        rtMap.MapDefinition = MAP_DEF;

        const config: any = {};
        const appDef = makeAppDef([
            makeMapGroup("TestMap", [makeMapGuideMap(MAP_DEF, {
                SelectionColor: "FF0000",
                ImageFormat: "JPG",
                SelectionFormat: "PNG8",
            })])
        ]);

        (cmd as any).setupMaps(appDef, { TestMap: rtMap }, config, [], "en");

        expect(config.selectionColor).toBe("FF0000");
        expect(config.imageFormat).toBe("JPG");
        expect(config.selectionImageFormat).toBe("PNG8");
    });

    it("setupMaps uses pending map when runtime map is not found in mapsByName", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const pending = { name: "LazyMap", mapDef: MAP_DEF, metadata: { EpsgCode: "4326" } };
        const pendingMapDefs = { LazyMap: pending };

        const config: any = {};
        const appDef = makeAppDef([
            makeMapGroup("LazyMap", [makeMapGuideMap(MAP_DEF)])
        ]);

        const dict = (cmd as any).setupMaps(appDef, {}, config, [], "en", pendingMapDefs);

        expect(dict["LazyMap"]).toBeDefined();
        expect(dict["LazyMap"].mapDef).toBe(MAP_DEF);
        expect(dict["LazyMap"].metadata).toEqual({ EpsgCode: "4326" });
    });

    it("setupMaps populates initialView when MapGroup has InitialView", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const rtMap = makeRuntimeMap("TestMap", "S1");
        rtMap.MapDefinition = MAP_DEF;

        const appDef = makeAppDef([
            makeMapGroup("TestMap", [makeMapGuideMap(MAP_DEF)], {
                CenterX: 10.5,
                CenterY: 20.5,
                Scale: 50000,
            })
        ]);

        const dict = (cmd as any).setupMaps(appDef, { TestMap: rtMap }, {}, [], "en");

        expect(dict["TestMap"].initialView).toEqual({ x: 10.5, y: 20.5, scale: 50000 });
    });

    it("setupMaps processes non-MapGuide layers via processLayerInMapGroup", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);
        const rtMap = makeRuntimeMap("TestMap", "S1");
        rtMap.MapDefinition = MAP_DEF;

        const warnings: string[] = [];
        const appDef = makeAppDef([
            makeMapGroup("TestMap", [
                makeMapGuideMap(MAP_DEF),
                {
                    Type: "Google",
                    Extension: {},
                },
            ])
        ]);

        (cmd as any).setupMaps(appDef, { TestMap: rtMap }, {}, warnings, "en");

        // Google map generates a warning via processLayerInMapGroup
        expect(warnings.length).toBeGreaterThanOrEqual(1);
    });

    it("setupMaps skips group without matching map and no pending entry", () => {
        const cmd = new DefaultViewerInitCommand((() => undefined) as any);

        const appDef = makeAppDef([
            makeMapGroup("NoMatchGroup", [makeMapGuideMap(MAP_DEF)])
        ]);

        // mapsByName has a different map definition — no match
        const unrelatedMap = makeRuntimeMap("Other", "S99");
        unrelatedMap.MapDefinition = "Library://Other.MapDefinition";

        const dict = (cmd as any).setupMaps(appDef, { Other: unrelatedMap }, {}, [], "en");

        expect(dict["NoMatchGroup"]).toBeUndefined();
    });
});