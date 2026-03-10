import { ExprOr, isEvaluatable, IVectorLabelSettings, IBasicStroke, IBasicFill } from "./ol-style-contracts";
import TextStyle, { Options as TextStyleOptions } from "ol/style/Text";
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { asArray } from 'ol/color';
import { OLFeature } from "./ol-types";
import { buildExpression, newEvaluationContext } from 'ol/expr/cpu';
import { newParsingContext, AnyType } from 'ol/expr/expression';

function toOLColor(color: string, alpha: number | undefined) {
    const c = asArray(color);
    if (typeof (alpha) != 'undefined') {
        c[3] = (alpha / 255);
    }
    return c;
}

/**
 * Evaluates an `ExprOr<T>` value. If the value is a literal it is returned as-is.
 * If it is an `IEvaluatable` (OL encoded expression), the expression is evaluated against
 * the provided feature's properties using OL's CPU expression evaluator.
 * Returns `undefined` when the expression cannot be evaluated (e.g. no feature provided).
 *
 * @hidden
 * @since 0.15
 */
export function evalFeature<T>(expr: ExprOr<T>, feat: OLFeature | undefined): any | undefined {
    if (!isEvaluatable(expr)) {
        return expr;
    }
    if (!feat) {
        return undefined;
    }
    try {
        const parsingCtx = newParsingContext();
        const evaluator = buildExpression(expr.expr, AnyType, parsingCtx);
        const evalCtx = newEvaluationContext();
        evalCtx.properties = feat.getProperties();
        evalCtx.featureId = feat.getId() ?? null;
        return evaluator(evalCtx);
    } catch (e) {
        return undefined;
    }
}

function setIfNotUndefined<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {
    if (typeof (value) != 'undefined') {
        obj[prop] = value;
    }
}

/**
 * @hidden
 */
export function buildStroke(stroke: IBasicStroke, feat: OLFeature | undefined): Stroke {
    return new Stroke({
        color: toOLColor(evalFeature(stroke.color, feat), evalFeature(stroke.alpha, feat)),
        width: evalFeature(stroke.width, feat)
    })
}

/**
 * @hidden
 */
export function buildFill(fill: IBasicFill, feat: OLFeature | undefined): Fill {
    return new Fill({
        color: toOLColor(evalFeature(fill.color, feat), evalFeature(fill.alpha, feat))
    });
}

/**
 * @hidden
 */
export function tryBuildTextStyle(style: IVectorLabelSettings, feat: OLFeature | undefined): TextStyle | undefined {
    const { label } = style;
    if (label) {
        const textOpts: TextStyleOptions = {};
        setIfNotUndefined(textOpts, "font", evalFeature(label.font, feat));
        setIfNotUndefined(textOpts, "maxAngle", evalFeature(label.maxAngle, feat));
        setIfNotUndefined(textOpts, "offsetX", evalFeature(label.offsetX, feat));
        setIfNotUndefined(textOpts, "offsetY", evalFeature(label.offsetY, feat));
        setIfNotUndefined(textOpts, "overflow", evalFeature(label.overflow, feat));
        setIfNotUndefined(textOpts, "placement", evalFeature(label.placement, feat));
        setIfNotUndefined(textOpts, "rotateWithView", evalFeature(label.rotateWithView, feat));
        setIfNotUndefined(textOpts, "rotation", evalFeature(label.rotation, feat));
        setIfNotUndefined(textOpts, "scale", evalFeature(label.scale, feat));
        const txt = evalFeature(label.text, feat);
        if (typeof (txt) != 'undefined') {
            textOpts.text = `${txt}`; //Need to stringify this
        }
        setIfNotUndefined(textOpts, "textAlign", evalFeature(label.textAlign, feat));
        setIfNotUndefined(textOpts, "textBaseline", evalFeature(label.textBaseline, feat));
        const text = new TextStyle(textOpts);
        if (label.padding) {
            text.setPadding(label.padding);
        }
        if (label.fill) {
            const f = buildFill(label.fill, feat);
            text.setFill(f);
        }
        if (label.backgroundFill) {
            const f = buildFill(label.backgroundFill, feat);
            text.setBackgroundFill(f);
        }
        if (label.stroke) {
            const s = buildStroke(label.stroke, feat);
            text.setStroke(s);
        }
        if (label.backgroundStroke) {
            const s = buildStroke(label.backgroundStroke, feat);
            text.setBackgroundStroke(s);
        }
        return text;
    }
    return undefined;
}