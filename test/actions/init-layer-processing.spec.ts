import { describe, expect, it } from "vitest";
import { processLayerInMapGroup } from "../../src/actions/init";

describe("actions/init processLayerInMapGroup", () => {
    const config: any = { locale: "en" };

    it("adds warning for unsupported Google maps", () => {
        const warnings: string[] = [];
        const externalBaseLayers: any[] = [];

        processLayerInMapGroup({ Type: "Google" } as any, warnings, config, { Extension: {} } as any, externalBaseLayers);

        expect(warnings.length).toBe(1);
        expect(externalBaseLayers).toHaveLength(0);
    });

    it("adds a BingMaps layer for supported VirtualEarth type when key exists", () => {
        const warnings: string[] = [];
        const externalBaseLayers: any[] = [];

        processLayerInMapGroup({
            Type: "VirtualEarth",
            Extension: {
                Options: {
                    name: "BingLayer",
                    type: "Road",
                },
            },
        } as any, warnings, config, {
            Extension: {
                BingMapKey: "BING_KEY",
            },
        } as any, externalBaseLayers);

        expect(warnings).toHaveLength(0);
        expect(externalBaseLayers).toHaveLength(1);
        expect(externalBaseLayers[0]).toMatchObject({
            name: "BingLayer",
            kind: "BingMaps",
            options: {
                imagerySet: "Road",
                key: "BING_KEY",
            },
        });
    });

    it("adds warnings and no layer for unsupported VirtualEarth type without key", () => {
        const warnings: string[] = [];
        const externalBaseLayers: any[] = [];

        processLayerInMapGroup({
            Type: "VirtualEarth",
            Extension: {
                Options: {
                    name: ["BadBing"],
                    type: ["UnknownType"],
                },
            },
        } as any, warnings, config, {
            Extension: {},
        } as any, externalBaseLayers);

        expect(warnings.length).toBeGreaterThanOrEqual(1);
        expect(externalBaseLayers).toHaveLength(0);
    });

    it("creates UTFGrid and XYZ layers with expected option transforms", () => {
        const warnings: string[] = [];
        const externalBaseLayers: any[] = [];

        processLayerInMapGroup({
            Type: "UTFGrid",
            Extension: {
                UrlTemplate: "https://example.test/grids/{z}/{x}/{y}.grid.json",
            },
        } as any, warnings, config, { Extension: {} } as any, externalBaseLayers);

        processLayerInMapGroup({
            Type: "XYZ",
            Extension: {
                Options: {
                    name: "XYZ Layer",
                    type: "Road",
                    urls: ["https://tiles.test/${z}/${x}/${y}.png"],
                    attributions: ["Credits"],
                    tilePixelRatio: ["2"],
                },
            },
        } as any, warnings, config, { Extension: {} } as any, externalBaseLayers);

        expect(warnings).toHaveLength(0);
        expect(externalBaseLayers).toHaveLength(2);
        expect(externalBaseLayers[0].kind).toBe("UTFGrid");
        expect(externalBaseLayers[0].options.tileJSON.grids).toEqual(["https://example.test/grids/{z}/{x}/{y}.grid.json"]);
        expect(externalBaseLayers[1]).toMatchObject({
            name: "XYZ Layer",
            kind: "XYZ",
            options: {
                layer: "Road",
                urls: ["https://tiles.test/{z}/{x}/{y}.png"],
                tilePixelRatio: 2,
            },
        });
    });

    it("creates StadiaMaps layer only when key exists", () => {
        const warningsNoKey: string[] = [];
        const layersNoKey: any[] = [];

        processLayerInMapGroup({
            Type: "StadiaMaps",
            Extension: {
                Options: {
                    name: "Stadia",
                    type: "outdoors",
                },
            },
        } as any, warningsNoKey, config, { Extension: {} } as any, layersNoKey);

        expect(warningsNoKey.length).toBe(1);
        expect(layersNoKey).toHaveLength(0);

        const warningsWithKey: string[] = [];
        const layersWithKey: any[] = [];
        processLayerInMapGroup({
            Type: "StadiaMaps",
            Extension: {
                Options: {
                    name: "Stadia",
                    type: "outdoors",
                },
            },
        } as any, warningsWithKey, config, {
            Extension: {
                StadiaMapsKey: "STADIA_KEY",
            },
        } as any, layersWithKey);

        expect(warningsWithKey).toHaveLength(0);
        expect(layersWithKey).toHaveLength(1);
        expect(layersWithKey[0]).toMatchObject({
            name: "Stadia",
            kind: "StadiaMaps",
            options: {
                layer: "outdoors",
                key: "STADIA_KEY",
            },
        });
    });
});