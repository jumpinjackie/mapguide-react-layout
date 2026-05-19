import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "../../src/store/configure-store";
import { CONFIG_INITIAL_STATE } from "../../src/reducers/config";
import { initAppFromDocument } from "../../src/actions/init";
import { AsyncLazy } from "../../src/api/lazy";
import { deArrayify, isAppDef } from "../../src/api/builders/deArrayify";
import legacyAppDef from "../../test-data/init_appdef_legacy";
import cleanAppDef from "../../test-data/init_appdef_clean";

const clientMock = vi.hoisted(() => ({
    createSession: vi.fn(),
    getSiteVersion: vi.fn(),
    getResource: vi.fn(),
    get: vi.fn(),
    createRuntimeMap: vi.fn(),
    createRuntimeMap_v4: vi.fn(),
    describeRuntimeMap: vi.fn(),
    describeRuntimeMap_v4: vi.fn(),
}));

vi.mock("../../src/api/client", () => {
    class Client {
        constructor(_agentUri: string, _kind: string) {
            // no-op
        }

        public createSession = clientMock.createSession;
        public getSiteVersion = clientMock.getSiteVersion;
        public getResource = clientMock.getResource;
        public get = clientMock.get;
        public createRuntimeMap = clientMock.createRuntimeMap;
        public createRuntimeMap_v4 = clientMock.createRuntimeMap_v4;
        public describeRuntimeMap = clientMock.describeRuntimeMap;
        public describeRuntimeMap_v4 = clientMock.describeRuntimeMap_v4;
    }

    return { Client };
});

vi.mock("../../src/api/registry/projections", () => ({
    resolveProjectionFromEpsgCodeAsync: vi.fn().mockResolvedValue("+proj=longlat +datum=WGS84 +no_defs"),
}));

function makeRuntimeMap(name: string, sessionId: string) {
    return {
        Name: name,
        SessionId: sessionId,
        SiteVersion: "4.0.0.0",
        MapDefinition: "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
        DisplayDpi: 96,
        BackgroundColor: "0xFFFFFFFF",
        IconMimeType: "image/png",
        CoordinateSystem: {
            MentorCode: "LL84",
            EpsgCode: "4326",
            MetersPerUnit: 1,
            Wkt: "WKT-CS",
        },
        Extents: {
            LowerLeftCoordinate: { X: -88, Y: 43 },
            UpperRightCoordinate: { X: -87, Y: 44 },
        },
        Group: [
            {
                Type: 1,
                Name: "Infrastructure",
                LegendLabel: "Infrastructure",
                ObjectId: "G1",
                DisplayInLegend: true,
                ExpandInLegend: true,
                Visible: false,
                ActuallyVisible: false,
            },
            {
                Type: 1,
                Name: "Parcels",
                LegendLabel: "Parcels",
                ObjectId: "G2",
                DisplayInLegend: true,
                ExpandInLegend: true,
                Visible: true,
                ActuallyVisible: true,
            },
        ],
        Layer: [
            {
                Type: 1,
                Name: "Parcels Layer",
                LegendLabel: "Parcels Layer",
                ObjectId: "L1",
                ParentId: "G2",
                DisplayInLegend: true,
                ExpandInLegend: true,
                Visible: false,
                ActuallyVisible: false,
                Selectable: true,
                LayerDefinition: "Library://Samples/Sheboygan/Layers/Parcels.LayerDefinition",
                ScaleRange: [],
            },
            {
                Type: 1,
                Name: "Roads Layer",
                LegendLabel: "Roads Layer",
                ObjectId: "L2",
                ParentId: "G1",
                DisplayInLegend: true,
                ExpandInLegend: true,
                Visible: true,
                ActuallyVisible: true,
                Selectable: true,
                LayerDefinition: "Library://Samples/Sheboygan/Layers/RoadCenterLines.LayerDefinition",
                ScaleRange: [],
            },
        ],
    } as any;
}

function normalizePreDeArrayifiedAppDef(appDef: any) {
    const clone = JSON.parse(JSON.stringify(appDef));
    const normalizeItems = (items: any[]) => {
        for (const item of items || []) {
            if (item.Function === "Flyout") {
                if (!Array.isArray(item.Item)) {
                    item.Item = [];
                }
                normalizeItems(item.Item);
            }
        }
    };
    for (const ws of clone.WidgetSet || []) {
        if (ws.MapWidget && ws.MapWidget["@xsi:type"] && !ws.MapWidget.WidgetType) {
            ws.MapWidget.WidgetType = ws.MapWidget["@xsi:type"];
        }
        for (const widget of ws.Widget || []) {
            if (widget["@xsi:type"] && !widget.WidgetType) {
                widget.WidgetType = widget["@xsi:type"];
            }
        }
        for (const cont of ws.Container || []) {
            if (!Array.isArray(cont.Item)) {
                cont.Item = [];
            }
            normalizeItems(cont.Item);
        }
    }
    return clone;
}

function canonicalizeStateForComparison(input: any): any {
    if (Array.isArray(input)) {
        return input.map(canonicalizeStateForComparison);
    }
    if (input && typeof input === "object") {
        const result: any = {};
        for (const key of Object.keys(input)) {
            let value = canonicalizeStateForComparison(input[key]);
            if (key === "flyoutId" && typeof value === "string") {
                value = value.replace(/(_\d+)+$/, "_<id>");
            }
            if (value === null || typeof value === "undefined") {
                continue;
            }
            const normalizedKey = key.replace(/(_\d+)+$/, "_<id>");
            result[normalizedKey] = value;
        }
        return result;
    }
    return input;
}

async function dispatchInitAndGetState(document: any) {
    const session = new AsyncLazy<string>(async () => "SESSION-BASELINE");

    const store = configureStore({
        config: {
            ...CONFIG_INITIAL_STATE,
            agentUri: "http://example.com/mapagent/mapagent.fcgi",
            agentKind: "mapagent",
        },
    }) as any;

    await store.dispatch(initAppFromDocument({
        document,
        session,
        sessionWasReused: false,
    }, {
        locale: "en",
        initialView: { x: -87.72, y: 43.74, scale: 70000 },
        initialActiveMap: "Sheboygan",
        initialShowLayers: ["Parcels Layer"],
        initialHideLayers: ["Roads Layer"],
        initialShowGroups: ["Infrastructure"],
        initialHideGroups: ["Parcels"],
        featureTooltipsEnabled: false,
        appSettings: {
            baseline: "legacy-appdef",
        },
    }) as any);

    return store.getState();
}

describe("actions/init dispatchable integration", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        clientMock.getSiteVersion.mockResolvedValue({ Version: "4.0.0.0" });
        clientMock.createRuntimeMap_v4.mockImplementation(async (options: any) => {
            return makeRuntimeMap(options.targetMapName, options.session);
        });
        clientMock.createRuntimeMap.mockImplementation(async (options: any) => {
            return makeRuntimeMap(options.targetMapName, options.session);
        });
    });

    it("produces the same redux golden-master state for legacy(de-arrayified) and clean appdefs", async () => {
        const normalized = deArrayify(legacyAppDef as any);
        expect(isAppDef(normalized)).toBe(true);
        if (!isAppDef(normalized)) {
            throw new Error("Expected legacy payload to de-arrayify to an ApplicationDefinition");
        }
        const cleanDocument = normalizePreDeArrayifiedAppDef((cleanAppDef as any).ApplicationDefinition);
        expect(isAppDef(cleanDocument as any)).toBe(true);
        if (!isAppDef(cleanDocument as any)) {
            throw new Error("Expected clean payload to be an ApplicationDefinition");
        }

        const legacyState = await dispatchInitAndGetState(normalized);
        const legacyCanonical = canonicalizeStateForComparison(legacyState);
        expect(legacyCanonical).toMatchSnapshot();

        const cleanState = await dispatchInitAndGetState(cleanDocument);
        const cleanCanonical = canonicalizeStateForComparison(cleanState);
        expect(cleanCanonical).toEqual(legacyCanonical);

        // runtime map bootstrap behavior
        expect(clientMock.getSiteVersion).toHaveBeenCalledTimes(2);
        expect(clientMock.createRuntimeMap_v4).toHaveBeenCalledTimes(2);
        expect(clientMock.createRuntimeMap).not.toHaveBeenCalled();
    });
});
