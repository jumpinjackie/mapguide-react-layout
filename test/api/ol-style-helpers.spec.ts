import { describe, it, expect, vi } from "vitest";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { isClusteredFeature, getClusterSubFeatures, getOLStyleFunction } from "../../src/api/ol-style-helpers";
import type { OLFeature } from "../../src/api/ol-types";
import type { IVectorLayerStyle } from "../../src/api/ol-style-contracts";

const SIMPLE_STYLE: IVectorLayerStyle = {
    default: {
        point: {
            type: "Circle",
            radius: 5,
            fill: { color: "#ff0000", alpha: 128 },
            stroke: { color: "#000000", width: 1, alpha: 255 }
        }
    }
};

describe("api/ol-style-helpers", () => {
    describe("getClusterSubFeatures", () => {
        it("returns undefined when feature has no cluster sub-features", () => {
            const feature = new Feature(new Point([0, 0])) as OLFeature;
            const subFeatures = getClusterSubFeatures(feature);
            expect(subFeatures).toBeUndefined();
        });

        it("returns cluster sub-features when set", () => {
            const feature = new Feature(new Point([0, 0])) as OLFeature;
            const subFeature1 = new Feature(new Point([1, 1])) as OLFeature;
            const subFeature2 = new Feature(new Point([2, 2])) as OLFeature;
            feature.set("features", [subFeature1, subFeature2]);
            const subFeatures = getClusterSubFeatures(feature);
            expect(subFeatures).toHaveLength(2);
        });
    });

    describe("isClusteredFeature", () => {
        it("returns false for a regular feature", () => {
            const feature = new Feature(new Point([0, 0])) as OLFeature;
            expect(isClusteredFeature(feature)).toBe(false);
        });

        it("returns false for a feature with empty features array", () => {
            const feature = new Feature(new Point([0, 0])) as OLFeature;
            feature.set("features", []);
            expect(isClusteredFeature(feature)).toBe(false);
        });

        it("returns true for a clustered feature", () => {
            const feature = new Feature(new Point([0, 0])) as OLFeature;
            const subFeature = new Feature(new Point([1, 1])) as OLFeature;
            feature.set("features", [subFeature]);
            expect(isClusteredFeature(feature)).toBe(true);
        });
    });

    describe("getOLStyleFunction", () => {
        it("returns a tuple of [flatRules, OLStyleMapSet]", () => {
            const [flatRules, styleMapSet] = getOLStyleFunction(SIMPLE_STYLE, undefined);
            expect(Array.isArray(flatRules)).toBe(true);
            expect(styleMapSet).toBeDefined();
        });

        it("flat rules array has at least the default else-rule", () => {
            const [flatRules] = getOLStyleFunction(SIMPLE_STYLE, undefined);
            expect(flatRules.length).toBeGreaterThanOrEqual(1);
            const lastRule = flatRules[flatRules.length - 1];
            expect(lastRule.else).toBe(true);
        });
    });
});
