import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "../../src/store/configure-store";
import { CONFIG_INITIAL_STATE } from "../../src/reducers/config";
import { initAppFromDocument } from "../../src/actions/init";
import { AsyncLazy } from "../../src/api/lazy";
import { deArrayify, isAppDef } from "../../src/api/builders/deArrayify";
import legacyAppDef from "../../test-data/init_appdef_legacy";

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

    it("de-arrayifies legacy appdef, dispatches initAppFromDocument, and produces expected redux baseline state", async () => {
        const normalized = deArrayify(legacyAppDef as any);
        expect(isAppDef(normalized)).toBe(true);
        if (!isAppDef(normalized)) {
            throw new Error("Expected legacy payload to de-arrayify to an ApplicationDefinition");
        }

        const appDef = normalized;
        const session = new AsyncLazy<string>(async () => "SESSION-BASELINE");

        const store = configureStore({
            config: {
                ...CONFIG_INITIAL_STATE,
                agentUri: "http://example.com/mapagent/mapagent.fcgi",
                agentKind: "mapagent",
            },
        }) as any;

        await store.dispatch(initAppFromDocument({
            document: appDef,
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

        const state = store.getState();
        expect(state).toMatchSnapshot();

        // runtime map bootstrap behavior
        expect(clientMock.getSiteVersion).toHaveBeenCalledTimes(1);
        expect(clientMock.createRuntimeMap_v4).toHaveBeenCalledTimes(1);
        expect(clientMock.createRuntimeMap).not.toHaveBeenCalled();
    });
});
