import { describe, it, expect } from "vitest";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { ExprEvalContext } from "../../src/api/expr-eval-context";
import type { OLFeature } from "../../src/api/ol-types";

describe("api/expr-eval-context", () => {
    describe("ExprEvalContext constructor", () => {
        it("creates a new instance without throwing", () => {
            expect(() => new ExprEvalContext()).not.toThrow();
        });
    });

    describe("addExpr / evaluate", () => {
        it("evaluates a simple numeric expression against a feature property", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]), VALUE: 42 }) as OLFeature;
            const result = ctx.evaluate("VALUE", feature);
            expect(result).toBe(42);
        });

        it("evaluates an expression that uses a feature property", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]), score: 10 }) as OLFeature;
            const result = ctx.evaluate("score * 2", feature);
            expect(result).toBe(20);
        });

        it("caches an already added expression", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]), x: 5 }) as OLFeature;
            ctx.addExpr("x + 1");
            ctx.addExpr("x + 1"); // add again - should not throw
            const result = ctx.evaluate("x + 1", feature);
            expect(result).toBe(6);
        });
    });

    describe("addFilter / evaluateFilter", () => {
        it("returns matching filter key when feature matches", () => {
            const ctx = new ExprEvalContext();
            ctx.addFilter("CATEGORY == 1");
            const feature = new Feature({ geometry: new Point([0, 0]), CATEGORY: 1 }) as OLFeature;
            const result = ctx.evaluateFilter(feature);
            expect(result).toBe("CATEGORY == 1");
        });

        it("returns undefined when no filter matches", () => {
            const ctx = new ExprEvalContext();
            ctx.addFilter("CATEGORY == 99");
            const feature = new Feature({ geometry: new Point([0, 0]), CATEGORY: 1 }) as OLFeature;
            const result = ctx.evaluateFilter(feature);
            expect(result).toBeUndefined();
        });
    });

    describe("addClusterExpr / addClusterFilter", () => {
        it("caches cluster expressions without throwing", () => {
            const ctx = new ExprEvalContext();
            ctx.addClusterExpr("x + 1");
            ctx.addClusterExpr("x + 1"); // double add should be fine
            expect(true).toBe(true); // no throw
        });

        it("caches cluster filters without throwing", () => {
            const ctx = new ExprEvalContext();
            ctx.addClusterFilter("x > 0");
            ctx.addClusterFilter("x > 0"); // double add should be fine
            expect(true).toBe(true); // no throw
        });
    });

    describe("evaluate with clustered feature", () => {
        it("evaluates cluster expression using cluster cache", () => {
            const ctx = new ExprEvalContext();
            const subFeature = new Feature({ geometry: new Point([1, 1]), score: 5 }) as OLFeature;
            const clusterFeature = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
            clusterFeature.set("features", [subFeature]);
            // agg_sum over cluster sub-features
            const result = ctx.evaluate("arr_size(features)", clusterFeature);
            expect(result).toBe(1);
        });
    });

    describe("property names with spaces", () => {
        it("converts spaces to underscores in property names before evaluation", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]), "OFFICE TYPE": "SALES" }) as OLFeature;
            // Space replaced with underscore
            const result = ctx.evaluate("OFFICE_TYPE", feature);
            expect(result).toBe("SALES");
        });
    });
});
