import { describe, it, expect, vi } from "vitest";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import TextStyle from "ol/style/Text";
import { evalFeature, evalOLExpr, buildStroke, buildFill, tryBuildTextStyle } from "../../src/api/ol-style-builders";
import type { OLFeature } from "../../src/api/ol-types";
import type { IBasicStroke, IBasicFill, IVectorLabelSettings } from "../../src/api/ol-style-contracts";

describe("api/ol-style-builders", () => {
    describe("evalFeature", () => {
        it("returns literal value when not evaluatable", () => {
            const result = evalFeature("#ff0000", undefined);
            expect(result).toBe("#ff0000");
        });

        it("returns undefined when feature is missing but expression is evaluatable", () => {
            const expr = { expr: ['get', 'VALUE'] };
            const result = evalFeature(expr, undefined);
            expect(result).toBeUndefined();
        });

        it("evaluates OL expression against feature when feature provided", () => {
            const feature = new Feature({ geometry: new Point([0, 0]), VALUE: 42 }) as OLFeature;
            const expr = { expr: ['get', 'VALUE'] };
            const result = evalFeature(expr, feature);
            expect(result).toBe(42);
        });

        it("returns undefined when evaluation throws (unknown expression)", () => {
            const feature = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
            const expr = { expr: ['nonexistent-op', 'VALUE'] };
            const result = evalFeature(expr, feature);
            expect(result).toBeUndefined();
        });

        it("returns undefined when getProperties throws", () => {
            const feature = new Feature({ geometry: new Point([0, 0]) }) as OLFeature;
            const spy = vi.spyOn(feature, 'getProperties').mockImplementation(() => { throw new Error('properties error'); });
            try {
                const expr = { expr: ['get', 'VALUE'] };
                const result = evalFeature(expr, feature);
                expect(result).toBeUndefined();
            } finally {
                spy.mockRestore();
            }
        });
    });

    describe("buildStroke", () => {
        it("creates a Stroke instance from basic stroke settings", () => {
            const stroke: IBasicStroke = { color: "#000000", width: 2, alpha: 255 };
            const result = buildStroke(stroke, undefined);
            expect(result).toBeInstanceOf(Stroke);
        });

        it("creates a Stroke with correct color", () => {
            const stroke: IBasicStroke = { color: "#ff0000", width: 1, alpha: 255 };
            const result = buildStroke(stroke, undefined);
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
            const result = buildFill(fill, undefined);
            expect(result).toBeInstanceOf(Fill);
        });

        it("creates a Fill with correct color", () => {
            const fill: IBasicFill = { color: "#00ff00", alpha: 255 };
            const result = buildFill(fill, undefined);
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
            const result = tryBuildTextStyle(style, undefined);
            expect(result).toBeUndefined();
        });

        it("returns a TextStyle when label is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Hello",
                    font: "12px sans-serif"
                }
            };
            const result = tryBuildTextStyle(style, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets fill on the text style when label.fill is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    fill: { color: "#ff0000", alpha: 255 }
                }
            };
            const result = tryBuildTextStyle(style, undefined);
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
            const result = tryBuildTextStyle(style, undefined);
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
            const result = tryBuildTextStyle(style, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets backgroundStroke when label.backgroundStroke is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    backgroundStroke: { color: "#cccccc", width: 1, alpha: 255 }
                }
            };
            const result = tryBuildTextStyle(style, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("sets padding when label.padding is defined", () => {
            const style: IVectorLabelSettings = {
                label: {
                    text: "Test",
                    padding: [2, 4, 2, 4]
                }
            };
            const result = tryBuildTextStyle(style, undefined);
            expect(result).toBeInstanceOf(TextStyle);
        });

        it("evaluates dynamic label text from feature property", () => {
            const feature = new Feature({ geometry: new Point([0, 0]), NAME: "hello" }) as OLFeature;
            const style: IVectorLabelSettings = {
                label: { text: { expr: ['get', 'NAME'] } }
            };
            const result = tryBuildTextStyle(style, feature);
            expect(result).toBeInstanceOf(TextStyle);
            expect(result?.getText()).toBe("hello");
        });
    });

    describe("evalOLExpr", () => {
        it("returns a plain non-array value as-is", () => {
            expect(evalOLExpr(42, {})).toBe(42);
            expect(evalOLExpr("hello", {})).toBe("hello");
        });

        it("['literal', v] returns v", () => {
            expect(evalOLExpr(['literal', 7], {})).toBe(7);
        });

        it("['get', prop] retrieves a property value", () => {
            expect(evalOLExpr(['get', 'foo'], { foo: 99 })).toBe(99);
        });

        it("['get', prop] returns undefined for missing property", () => {
            expect(evalOLExpr(['get', 'missing'], {})).toBeUndefined();
        });

        it("['get', outer, inner] accesses nested property", () => {
            expect(evalOLExpr(['get', 'arr', 'length'], { arr: [1, 2, 3] })).toBe(3);
        });

        it("['get', ...] propagates null midway", () => {
            expect(evalOLExpr(['get', 'a', 'b'], { a: null })).toBeUndefined();
        });

        it("'+' sums two expressions", () => {
            expect(evalOLExpr(['+', 3, 4], {})).toBe(7);
        });

        it("'-' subtracts two expressions", () => {
            expect(evalOLExpr(['-', ['get', 'n'], 2], { n: 10 })).toBe(8);
        });

        it("'*' multiplies two expressions", () => {
            expect(evalOLExpr(['*', 3, 3], {})).toBe(9);
        });

        it("'/' divides two expressions", () => {
            expect(evalOLExpr(['/', ['get', 'n'], 4], { n: 20 })).toBe(5);
        });

        it("['clamp'] clamps to min", () => {
            expect(evalOLExpr(['clamp', -5, 0, 10], {})).toBe(0);
        });

        it("['clamp'] clamps to max", () => {
            expect(evalOLExpr(['clamp', 15, 0, 10], {})).toBe(10);
        });

        it("['clamp'] returns value when in range", () => {
            expect(evalOLExpr(['clamp', 5, 0, 10], {})).toBe(5);
        });

        it("'==' returns true when equal", () => {
            expect(evalOLExpr(['==', ['get', 'x'], 1], { x: 1 })).toBe(true);
        });

        it("'==' returns false when not equal", () => {
            expect(evalOLExpr(['==', ['get', 'x'], 2], { x: 1 })).toBe(false);
        });

        it("'!=' returns true when not equal", () => {
            expect(evalOLExpr(['!=', ['get', 'x'], 2], { x: 1 })).toBe(true);
        });

        it("'!=' returns false when equal", () => {
            expect(evalOLExpr(['!=', ['get', 'x'], 1], { x: 1 })).toBe(false);
        });

        it("'>' comparison", () => {
            expect(evalOLExpr(['>', ['get', 'n'], 5], { n: 10 })).toBe(true);
            expect(evalOLExpr(['>', ['get', 'n'], 10], { n: 5 })).toBe(false);
        });

        it("'>=' comparison", () => {
            expect(evalOLExpr(['>=', ['get', 'n'], 5], { n: 5 })).toBe(true);
            expect(evalOLExpr(['>=', ['get', 'n'], 6], { n: 5 })).toBe(false);
        });

        it("'<' comparison", () => {
            expect(evalOLExpr(['<', ['get', 'n'], 10], { n: 5 })).toBe(true);
            expect(evalOLExpr(['<', ['get', 'n'], 5], { n: 10 })).toBe(false);
        });

        it("'<=' comparison", () => {
            expect(evalOLExpr(['<=', ['get', 'n'], 5], { n: 5 })).toBe(true);
            expect(evalOLExpr(['<=', ['get', 'n'], 4], { n: 5 })).toBe(false);
        });

        it("unknown operator returns undefined", () => {
            expect(evalOLExpr(['unknown-op', 1], {})).toBeUndefined();
        });
    });
});
