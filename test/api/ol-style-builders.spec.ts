import { describe, it, expect } from "vitest";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import TextStyle from "ol/style/Text";
import { evalFeature, buildStroke, buildFill, tryBuildTextStyle } from "../../src/api/ol-style-builders";
import { ExprEvalContext } from "../../src/api/expr-eval-context";
import type { OLFeature } from "../../src/api/ol-types";
import type { IBasicStroke, IBasicFill, IVectorLabelSettings } from "../../src/api/ol-style-contracts";

describe("api/ol-style-builders", () => {
    describe("evalFeature", () => {
        it("returns literal value when not evaluatable", () => {
            const result = evalFeature("#ff0000", undefined, undefined);
            expect(result).toBe("#ff0000");
        });

        it("returns undefined when feature is missing but expression is evaluatable", () => {
            const expr = { expr: "VALUE * 2" };
            const result = evalFeature(expr, undefined, undefined);
            expect(result).toBeUndefined();
        });

        it("evaluates expression against feature when feature and context provided", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]), VALUE: 10 }) as OLFeature;
            const expr = { expr: "VALUE * 2" };
            const result = evalFeature(expr, feature, ctx);
            expect(result).toBe(20);
        });

        it("returns undefined when evaluation throws", () => {
            const ctx = new ExprEvalContext();
            const feature = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
            const expr = { expr: "nonexistent_func(VALUE)" };
            const result = evalFeature(expr, feature, ctx);
            expect(result).toBeUndefined();
        });
    });

    describe("buildStroke", () => {
        it("creates a Stroke instance from basic stroke settings", () => {
            const stroke: IBasicStroke = { color: "#000000", width: 2, alpha: 255 };
            const result = buildStroke(stroke, undefined, undefined);
            expect(result).toBeInstanceOf(Stroke);
        });

        it("creates a Stroke with correct color", () => {
            const stroke: IBasicStroke = { color: "#ff0000", width: 1, alpha: 255 };
            const result = buildStroke(stroke, undefined, undefined);
            expect(result).toBeInstanceOf(Stroke);
            const color = result.getColor() as number[];
            expect(color[0]).toBe(255); // red
            expect(color[1]).toBe(0);   // green
            expect(color[2]).toBe(0);   // blue
        });
    });

    describe("buildFill", () => {
        it("creates a Fill instance from basic fill settings", () => {
            const fill: IBasicFill = { color: "#0000ff", alpha: 128 };
            const result = buildFill(fill, undefined, undefined);
            expect(result).toBeInstanceOf(Fill);
        });

        it("creates a Fill with correct color", () => {
            const fill: IBasicFill = { color: "#00ff00", alpha: 255 };
            const result = buildFill(fill, undefined, undefined);
            expect(result).toBeInstanceOf(Fill);
            const color = result.getColor() as number[];
            expect(color[0]).toBe(0);   // red
            expect(color[1]).toBe(255); // green
            expect(color[2]).toBe(0);   // blue
        });
    });

    describe("tryBuildTextStyle", () => {
        it("returns undefined when label is not defined in style", () => {
            const style: IVectorLabelSettings = {};
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeUndefined();
        });

        it("returns a TextStyle when label is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Hello",
                    font: "12px sans-serif"
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets fill on the text style when label.fill is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    fill: { color: "#ff0000", alpha: 255 }
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
            expect(result?.getFill()).toBeDefined();
        });

        it("sets stroke on the text style when label.stroke is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    stroke: { color: "#000000", width: 1, alpha: 255 }
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
            expect(result?.getStroke()).toBeDefined();
        });

        it("sets backgroundFill when label.backgroundFill is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    backgroundFill: { color: "#ffffff", alpha: 200 }
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets backgroundStroke when label.backgroundStroke is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    backgroundStroke: { color: "#cccccc", width: 1, alpha: 255 }
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets padding when label.padding is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    padding: [2, 4, 2, 4]
                }
            };
            const result = tryBuildTextStyle(style, undefined, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });
    });
});
