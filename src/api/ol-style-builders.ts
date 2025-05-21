import { ExprOr, isEvaluatable, IVectorLabelSettings, IBasicStroke, IBasicFill, IEvaluatable } from "./ol-style-contracts";
import { ExprEvalContext } from "./expr-eval-context";
import TextStyle, { Options as TextStyleOptions } from "ol/style/Text";
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { asArray } from 'ol/color';
import { OLFeature } from "./ol-types";

function toOLColor(color: string, alpha: number | undefined) {
    const c = asArray(color);
    if (typeof (alpha) != 'undefined') {
        c[3] = (alpha / 255);
    }
    return c;
}

/**
 * @hidden
 */
export function evalFeature<T>(expr: ExprOr<T>, feat: OLFeature | undefined, context: ExprEvalContext | undefined): any | undefined {
    if (!isEvaluatable(expr)) {
        return expr;
    } else if (feat && context) {
        try {
            return context.evaluate(expr.expr, feat);
        } catch (e) {
            return undefined;
        }
    } else {
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
export function buildStroke(stroke: IBasicStroke, feat: OLFeature | undefined, context: ExprEvalContext | undefined): Stroke {
    return new Stroke({
        color: toOLColor(evalFeature(stroke.color, feat, context), evalFeature(stroke.alpha, feat, context)),
        width: evalFeature(stroke.width, feat, context)
    })
}

/**
 * @hidden
 */
export function buildFill(fill: IBasicFill, feat: OLFeature | undefined, context: ExprEvalContext | undefined): Fill {
    return new Fill({
        color: toOLColor(evalFeature(fill.color, feat, context), evalFeature(fill.alpha, feat, context))
    });
}

/**
 * @hidden
 */
export function tryBuildTextStyle(style: IVectorLabelSettings, feat: OLFeature | undefined, context: ExprEvalContext | undefined): TextStyle | undefined {
    const { label } = style;
    if (label) {
        const textOpts: TextStyleOptions = {};
        setIfNotUndefined(textOpts, "font", evalFeature(label.font, feat, context));
        setIfNotUndefined(textOpts, "maxAngle", evalFeature(label.maxAngle, feat, context));
        setIfNotUndefined(textOpts, "offsetX", evalFeature(label.offsetX, feat, context));
        setIfNotUndefined(textOpts, "offsetY", evalFeature(label.offsetY, feat, context));
        setIfNotUndefined(textOpts, "overflow", evalFeature(label.overflow, feat, context));
        setIfNotUndefined(textOpts, "placement", evalFeature(label.placement, feat, context));
        setIfNotUndefined(textOpts, "rotateWithView", evalFeature(label.rotateWithView, feat, context));
        setIfNotUndefined(textOpts, "rotation", evalFeature(label.rotation, feat, context));
        setIfNotUndefined(textOpts, "scale", evalFeature(label.scale, feat, context));
        const txt = evalFeature(label.text, feat, context);
        if (typeof (txt) != 'undefined') {
            textOpts.text = `${txt}`; //Need to stringify this
        }
        setIfNotUndefined(textOpts, "textAlign", evalFeature(label.textAlign, feat, context));
        setIfNotUndefined(textOpts, "textBaseline", evalFeature(label.textBaseline, feat, context));
        const text = new TextStyle(textOpts);
        if (label.padding) {
            text.setPadding(label.padding);
        }
        if (label.fill) {
            const f = buildFill(label.fill, feat, context);
            text.setFill(f);
        }
        if (label.backgroundFill) {
            const f = buildFill(label.backgroundFill, feat, context);
            text.setBackgroundFill(f);
        }
        if (label.stroke) {
            const s = buildStroke(label.stroke, feat, context);
            text.setStroke(s);
        }
        if (label.backgroundStroke) {
            const s = buildStroke(label.backgroundStroke, feat, context);
            text.setBackgroundStroke(s);
        }
        return text;
    }
    return undefined;
}