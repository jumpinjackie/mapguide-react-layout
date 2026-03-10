import { DEFAULT_STYLE_KEY } from './ol-style-helpers';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { DynamicStyleMap, IOlStyleMap, IVectorLayerStyle, IVectorFeatureStyle, DEFAULT_POINT_CIRCLE_STYLE, DEFAULT_LINE_STYLE, DEFAULT_POLY_STYLE, isEvaluatable, IVectorLabelSettings, IBasicVectorPointStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IClusterSettings, ClusterClickAction, IBasicFill, IBasicStroke } from './ol-style-contracts';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import { buildFill, buildStroke, tryBuildTextStyle, evalFeature } from './ol-style-builders';
import IconStyle from "ol/style/Icon";
import { deg2rad } from '../utils/number';
import { ScopedId } from '../utils/scoped-id';
import type { FlatStyle, Rule } from 'ol/style/flat';
import { asArray } from 'ol/color';
import { buildExpression, newEvaluationContext } from 'ol/expr/cpu';
import { newParsingContext, AnyType } from 'ol/expr/expression';

const scopedId = new ScopedId();

// ─── Helpers for converting ExprOr values to OL flat style expressions ──────

/**
 * Converts an `ExprOr<T>` to a value suitable for an OL flat style property.
 * - Literal values are returned as-is.
 * - `IEvaluatable` values expose their embedded OL expression array.
 */
function toFlatExpr<T>(val: T | { expr: any[] }): any {
    if (isEvaluatable(val)) {
        return (val as { expr: any[] }).expr;
    }
    return val;
}

/**
 * Converts a colour + alpha pair to an OL flat style colour expression.
 * Handles the three cases:
 *  - both static   → pre-computed RGBA `number[]`
 *  - colour is OL expression, alpha static → use colour expression (alpha embedded by caller)
 *  - alpha is OL expression, colour static → `['color', r, g, b, alphaExpr / 255]`
 *  - both OL expressions → use colour expression only
 */
function toFlatColorExpr(color: any, alpha: any): any {
    const colorIsExpr = isEvaluatable(color);
    const alphaIsExpr = isEvaluatable(alpha);

    if (!colorIsExpr && !alphaIsExpr) {
        // Both static — combine into RGBA array
        const c = asArray(color as string).slice() as [number, number, number, number];
        c[3] = (alpha as number) / 255;
        return c;
    }
    if (colorIsExpr && !alphaIsExpr) {
        // Dynamic colour (expected to carry its own alpha if needed)
        return (color as { expr: any[] }).expr;
    }
    if (!colorIsExpr && alphaIsExpr) {
        // Static colour, dynamic alpha — use OL ['color', r, g, b, alphaExpr / 255]
        const c = asArray(color as string);
        return ['color', c[0], c[1], c[2], ['/', (alpha as { expr: any[] }).expr, 255]];
    }
    // Both dynamic — fall back to colour expression
    return (color as { expr: any[] }).expr;
}

// ─── Flat style builder ──────────────────────────────────────────────────────

function buildFlatTextProps(labelSettings: IVectorLabelSettings): Partial<FlatStyle> {
    const { label } = labelSettings;
    if (!label) return {};

    const props: Record<string, any> = {};
    if (label.text !== undefined) props['text-value'] = toFlatExpr(label.text);
    if (label.font !== undefined) props['text-font'] = toFlatExpr(label.font);
    if (label.maxAngle !== undefined) props['text-max-angle'] = toFlatExpr(label.maxAngle);
    if (label.offsetX !== undefined) props['text-offset-x'] = toFlatExpr(label.offsetX);
    if (label.offsetY !== undefined) props['text-offset-y'] = toFlatExpr(label.offsetY);
    if (label.overflow !== undefined) props['text-overflow'] = toFlatExpr(label.overflow);
    if (label.placement !== undefined) props['text-placement'] = label.placement;
    if (label.scale !== undefined) props['text-scale'] = toFlatExpr(label.scale);
    if (label.rotateWithView !== undefined) props['text-rotate-with-view'] = toFlatExpr(label.rotateWithView);
    if (label.rotation !== undefined) props['text-rotation'] = toFlatExpr(label.rotation);
    if (label.textAlign !== undefined) props['text-align'] = toFlatExpr(label.textAlign);
    if (label.textBaseline !== undefined) props['text-baseline'] = toFlatExpr(label.textBaseline);
    if (label.padding !== undefined) props['text-padding'] = label.padding;
    if (label.fill) props['text-fill-color'] = toFlatColorExpr(label.fill.color, label.fill.alpha);
    if (label.backgroundFill) props['text-background-fill-color'] = toFlatColorExpr(label.backgroundFill.color, label.backgroundFill.alpha);
    if (label.stroke) {
        props['text-stroke-color'] = toFlatColorExpr(label.stroke.color, label.stroke.alpha);
        props['text-stroke-width'] = toFlatExpr(label.stroke.width);
    }
    if (label.backgroundStroke) {
        props['text-background-stroke-color'] = toFlatColorExpr(label.backgroundStroke.color, label.backgroundStroke.alpha);
        props['text-background-stroke-width'] = toFlatExpr(label.backgroundStroke.width);
    }
    return props as Partial<FlatStyle>;
}

/**
 * Converts an `IVectorFeatureStyle` to an OL `FlatStyle` object.
 * A single `FlatStyle` covers all geometry types; OL uses the relevant
 * sub-properties (`circle-*`, `stroke-*`, `fill-*`) based on feature geometry.
 *
 * @internal
 * @since 0.15
 */
export function featureStyleToFlatStyle(style: IVectorFeatureStyle): FlatStyle {
    const result: Record<string, any> = {};

    // ── Point ────────────────────────────────────────────────────────────────
    if (style.point) {
        const pt = style.point;
        if (pt.type === 'Circle') {
            result['circle-radius'] = toFlatExpr(pt.radius);
            result['circle-fill-color'] = toFlatColorExpr(pt.fill.color, pt.fill.alpha);
            result['circle-stroke-color'] = toFlatColorExpr(pt.stroke.color, pt.stroke.alpha);
            result['circle-stroke-width'] = toFlatExpr(pt.stroke.width);
        } else {
            // Icon
            result['icon-src'] = toFlatExpr(pt.src);
            result['icon-anchor'] = pt.anchor;
            result['icon-rotate-with-view'] = toFlatExpr(pt.rotateWithView);
            result['icon-rotation'] = isEvaluatable(pt.rotation)
                ? ['/', ['*', (pt.rotation as { expr: any[] }).expr, Math.PI], 180]
                : deg2rad(pt.rotation as number);
            result['icon-scale'] = toFlatExpr(pt.scale);
        }
        Object.assign(result, buildFlatTextProps(pt));
    }

    // ── Line ─────────────────────────────────────────────────────────────────
    if (style.line) {
        const ln = style.line;
        result['stroke-color'] = toFlatColorExpr(ln.color, ln.alpha);
        result['stroke-width'] = toFlatExpr(ln.width);
        Object.assign(result, buildFlatTextProps(ln));
    }

    // ── Polygon ──────────────────────────────────────────────────────────────
    if (style.polygon) {
        const pl = style.polygon;
        result['fill-color'] = toFlatColorExpr(pl.fill.color, pl.fill.alpha);
        result['stroke-color'] = toFlatColorExpr(pl.stroke.color, pl.stroke.alpha);
        result['stroke-width'] = toFlatExpr(pl.stroke.width);
        Object.assign(result, buildFlatTextProps(pl));
    }

    return result as FlatStyle;
}

// ─── Legend helpers (OL Style objects for canvas legend rendering) ────────────

function buildStyleMap(pts: Style, lns: Style, pls: Style) {
    //For GeometryCollection, combine point and polygon styles
    const cpts = pts.clone();
    const cpls = pls.clone();
    const gcs = new Style({
        image: cpts.getImage() ?? undefined,
        stroke: cpls.getStroke() ?? undefined,
        fill: cpls.getFill() ?? undefined
    });
    return {
        id: `${scopedId.next()}`,
        Point: pts,
        MultiPoint: pts,
        LineString: lns,
        MultiLineString: lns,
        Polygon: pls,
        MultiPolygon: pls,
        Circle: pls,
        GeometryCollection: gcs
    };
}

/**
 * Builds an `IOlStyleMap` / `DynamicStyleMap` from an `IVectorFeatureStyle`.
 * Used exclusively for **legend image generation** in the style editor.
 *
 * For layer rendering use {@link OLStyleMapSet.toFlatRules} instead.
 *
 * @internal
 */
export function vectorStyleToStyleMap(style: IVectorFeatureStyle): IOlStyleMap | DynamicStyleMap {
    const ptStyle = style.point ?? DEFAULT_POINT_CIRCLE_STYLE;
    const lnStyle = style.line ?? DEFAULT_LINE_STYLE;
    const plStyle = style.polygon ?? DEFAULT_POLY_STYLE;

    const builder: DynamicStyleMap = (feat) => {
        const pts = new Style();
        if (ptStyle.type == "Circle") {
            pts.setImage(new CircleStyle({
                radius: evalFeature(ptStyle.radius, feat),
                fill: buildFill(ptStyle.fill, feat),
                stroke: buildStroke(ptStyle.stroke, feat)
            }));
        } else {
            pts.setImage(new IconStyle({
                anchor: ptStyle.anchor,
                src: evalFeature(ptStyle.src, feat),
                rotateWithView: evalFeature(ptStyle.rotateWithView, feat),
                rotation: deg2rad(evalFeature(ptStyle.rotation, feat)),
                scale: evalFeature(ptStyle.scale, feat)
            }));
        }
        const lns = new Style({
            stroke: buildStroke(lnStyle, feat)
        });
        const pls = new Style({
            stroke: buildStroke(plStyle.stroke, feat),
            fill: buildFill(plStyle.fill, feat)
        });

        const ptText = tryBuildTextStyle(ptStyle, feat);
        const lnText = tryBuildTextStyle(lnStyle, feat);
        const plsText = tryBuildTextStyle(plStyle, feat);
        if (ptText) {
            pts.setText(ptText);
        }
        if (lnText) {
            lns.setText(lnText);
        }
        if (plsText) {
            pls.setText(plsText);
        }
        return buildStyleMap(pts, lns, pls);
    }

    // Check if any property is dynamic (contains an OL expression)
    const isDynamic = (
        isEvaluatable((ptStyle as any).radius)
        || isEvaluatable((ptStyle as any).src)
        || isEvaluatable((ptStyle as any).rotateWithView)
        || isEvaluatable((ptStyle as any).rotation)
        || isEvaluatable((ptStyle as any).scale)
        || isEvaluatable(lnStyle.color)
        || isEvaluatable(lnStyle.alpha)
        || isEvaluatable(lnStyle.width)
        || isEvaluatable(plStyle.fill?.color)
        || isEvaluatable(plStyle.fill?.alpha)
        || isEvaluatable(plStyle.stroke?.color)
        || isEvaluatable(plStyle.stroke?.alpha)
        || isEvaluatable(plStyle.stroke?.width)
    );

    if (isDynamic) {
        return builder;
    }
    return builder(undefined);
}

// ─── OLStyleMapSet ───────────────────────────────────────────────────────────

/**
 * @since 0.14
 * @since 0.15 Reworked to use OL native flat style expressions instead of expr-eval-fork
 */
export class OLStyleMapSet {
    constructor(
        private readonly origStyleDef: IVectorLayerStyle,
        private readonly clusterStyleDef: IClusterSettings | undefined
    ) { }

    public toVectorLayerStyle(): IVectorLayerStyle {
        return this.origStyleDef;
    }

    public toClusterSettings(): IClusterSettings | undefined {
        return this.clusterStyleDef;
    }

    public getClusterClickAction(): ClusterClickAction | undefined {
        return this.clusterStyleDef?.onClick;
    }

    /**
     * Builds an `Array<Rule>` that can be passed directly to `layer.setStyle()`.
     * OL evaluates the embedded filter expressions and flat style property expressions
     * natively at render time — no manual expression evaluation is required.
     *
     * @since 0.15
     */
    public toFlatRules(): Rule[] {
        return buildFlatRules(this.origStyleDef);
    }

    /**
     * Builds OL `Style` objects for a single feature. Used for **legend image generation**.
     * For layer rendering use `toFlatRules()`.
     */
    public evaluateStyle(feature: Feature<Geometry>) {
        try {
            const g = feature.getGeometry();
            if (!g) {
                return null;
            }
            const gt: any = g.getType();
            // Pick the first rule whose filter matches, or fall back to default
            const styleToUse = matchRule(this.origStyleDef, feature);
            const styleMap = vectorStyleToStyleMap(styleToUse);
            if (typeof styleMap === 'function') {
                return (styleMap(feature) as any)[gt];
            }
            return (styleMap as any)[gt];
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Selects the first matching rule style for a feature (for legend/fallback use).
 */
function matchRule(styleDef: IVectorLayerStyle, feature: Feature<Geometry>): IVectorFeatureStyle {
    if (styleDef.rules) {
        for (const rule of styleDef.rules) {
            if (rule.filter) {
                try {
                    const ctx = newParsingContext();
                    const evaluator = buildExpression(rule.filter, AnyType, ctx);
                    const evalCtx = newEvaluationContext();
                    evalCtx.properties = feature.getProperties();
                    evalCtx.featureId = feature.getId() ?? null;
                    if (evaluator(evalCtx)) {
                        return rule.style;
                    }
                } catch {
                    // Filter evaluation failed; skip this rule
                }
            } else if (rule.else) {
                return rule.style;
            }
        }
    }
    return styleDef.default;
}

/**
 * Converts an `IVectorLayerStyle` to an OL `Array<Rule>` for use with `layer.setStyle()`.
 */
function buildFlatRules(styleDef: IVectorLayerStyle): Rule[] {
    const rules: Rule[] = [];

    if (styleDef.rules && styleDef.rules.length > 0) {
        for (const rule of styleDef.rules) {
            rules.push({
                filter: rule.filter,
                else: rule.else,
                style: featureStyleToFlatStyle(rule.style)
            });
        }
    }

    // Default style — always last so it acts as fallback
    rules.push({
        else: true,
        style: featureStyleToFlatStyle(styleDef.default)
    });

    return rules;
}