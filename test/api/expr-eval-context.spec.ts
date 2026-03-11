/**
 * Tests for OL expression evaluation via evalFeature.
 * The former ExprEvalContext (expr-eval-fork) was replaced in 0.15 by OL's
 * native CPU expression evaluator.
 */
import { describe, it, expect } from "vitest";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { evalFeature } from "../../src/api/ol-style-builders";
import type { OLFeature } from "../../src/api/ol-types";

describe("api/ol expression evaluation (via evalFeature)", () => {
    it("returns a literal value unchanged", () => {
        expect(evalFeature(42, undefined)).toBe(42);
        expect(evalFeature("hello", undefined)).toBe("hello");
    });

    it("returns undefined for an OL expression when no feature is given", () => {
        const expr = { expr: ['get', 'VALUE'] };
        expect(evalFeature(expr, undefined)).toBeUndefined();
    });

    it("evaluates ['get', prop] against feature properties", () => {
        const feature = new Feature({ geometry: new Point([0, 0]), VALUE: 42 }) as OLFeature;
        expect(evalFeature({ expr: ['get', 'VALUE'] }, feature)).toBe(42);
    });

    it("evaluates arithmetic OL expressions", () => {
        const feature = new Feature({ geometry: new Point([0, 0]), score: 10 }) as OLFeature;
        expect(evalFeature({ expr: ['*', ['get', 'score'], 2] }, feature)).toBe(20);
    });

    it("evaluates ['clamp', ...] expressions", () => {
        const feature = new Feature({ geometry: new Point([0, 0]), n: 30 }) as OLFeature;
        // clamp(30, 0, 25) = 25
        expect(evalFeature({ expr: ['clamp', ['get', 'n'], 0, 25] }, feature)).toBe(25);
        // clamp(5, 0, 25) = 5
        const feature2 = new Feature({ geometry: new Point([0, 0]), n: 5 }) as OLFeature;
        expect(evalFeature({ expr: ['clamp', ['get', 'n'], 0, 25] }, feature2)).toBe(5);
    });

    it("evaluates comparison expressions to boolean", () => {
        const feature = new Feature({ geometry: new Point([0, 0]), CATEGORY: 'A' }) as OLFeature;
        expect(evalFeature({ expr: ['==', ['get', 'CATEGORY'], 'A'] }, feature)).toBe(true);
        expect(evalFeature({ expr: ['==', ['get', 'CATEGORY'], 'B'] }, feature)).toBe(false);
    });

    it("returns undefined when the expression references an unknown operator", () => {
        const feature = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
        const result = evalFeature({ expr: ['nonexistent-op'] }, feature);
        expect(result).toBeUndefined();
    });

    it("accesses nested array properties (cluster features length)", () => {
        const sub1 = new Feature(new Point([1, 1])) as OLFeature;
        const sub2 = new Feature(new Point([2, 2])) as OLFeature;
        const cluster = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
        cluster.set("features", [sub1, sub2]);
        // ['get', 'features', 'length'] accesses the .length of the features array
        expect(evalFeature({ expr: ['get', 'features', 'length'] }, cluster)).toBe(2);
    });
});
