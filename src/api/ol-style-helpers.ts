import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import TextStyle, { Options as TextStyleOptions } from "ol/style/Text";
import CircleStyle from "ol/style/Circle";
import IconStyle from "ol/style/Icon";
import { Color, asString, asArray } from "ol/color";
import { ColorLike } from "ol/colorlike";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Feature from "ol/Feature";
import { LayerProperty } from './common';
import * as shortid from "shortid";
import { MAP_MARKER_ICON } from '../constants/assets';
import { rad2deg, deg2rad } from '../utils/number';
import Geometry from 'ol/geom/Geometry';
import { Expression } from 'expr-eval';
import { strReplaceAll } from '../utils/string';
const Parser = require('expr-eval').Parser;

/**
 * Defines a style for a vector layer
 */
export interface IVectorLayerStyle {
    /**
     * The vector style for the given filter
     */
    [filter: string]: IVectorFeatureStyle;
    /**
     * The default vector style
     */
    default: IVectorFeatureStyle;
}

/**
 * @since 0.14
 */
export type TextPlacement = "point" | "line";

/**
 * @since 0.14
 */
export type TextBaseline = "bottom" | "top" | "middle" | "alphabetic" | "hanging" | "ideographic";

/**
 * @since 0.14
 */
export interface IEvaluatable {
    expr: string;
}

/**
 * @since 0.14
 */
export type ExprOr<T> = IEvaluatable | T;

/**
 * @since 0.14
 */
export function isEvaluatable<T>(arg: any): arg is IEvaluatable {
    return typeof (arg?.expr) == 'string';
}

/**
 * Label settings
 * @since 0.14
 */
export interface ILabelSettings {
    font?: ExprOr<string>;
    maxAngle?: ExprOr<number>;
    offsetX?: ExprOr<number>;
    offsetY?: ExprOr<number>;
    overflow?: ExprOr<boolean>;
    placement?: TextPlacement;
    scale?: ExprOr<number>;
    rotateWithView?: ExprOr<boolean>;
    rotation?: ExprOr<number>;
    text?: ExprOr<string>;
    textAlign?: ExprOr<string>;
    textBaseline?: ExprOr<string>;
    fill?: IBasicFill;
    stroke?: IBasicStroke;
    backgroundFill?: IBasicFill;
    backgroundStroke?: IBasicStroke;
    padding?: [number, number, number, number];
}

/**
 * Defines label settings for a vector layer
 * @since 0.14
 */
export interface IVectorLabelSettings {
    label?: ILabelSettings;
}

/**
 * Defines a style for vector features
 * @since 0.13
 */
export interface IVectorFeatureStyle {
    /**
     * @since 0.14
     */
    label?: string;
    point?: IBasicVectorPointStyle;
    line?: IBasicVectorLineStyle;
    polygon?: IBasicVectorPolygonStyle;
}

/**
 * Point circle style settings
 * @since 0.13
 */
export interface IBasicPointCircleStyle extends IVectorLabelSettings {
    type: "Circle";
    fill: IBasicFill;
    radius: ExprOr<number>;
    stroke: IBasicStroke;
}

/**
 * Point icon style settings
 * @since 0.13
 */
export interface IPointIconStyle extends IVectorLabelSettings {
    type: "Icon";
    anchor: [number, number],
    src: ExprOr<string>;
    //size: [number, number];
    rotateWithView: ExprOr<boolean>;
    rotation: ExprOr<number>;
    //opacity: ExprOr<number>;
    scale: ExprOr<number>;
}

/**
 * Point style settings
 * @since 0.13
 */
export type IBasicVectorPointStyle = (IBasicPointCircleStyle | IPointIconStyle) & IVectorLabelSettings;

/**
 * Line style settings
 * @since 0.13
 */
export type IBasicVectorLineStyle = IBasicStroke & IVectorLabelSettings;

/**
 * Polygon style settings
 * @since 0.13
 */
export interface IBasicVectorPolygonStyle extends IVectorLabelSettings {
    fill: IBasicFill;
    stroke: IBasicStroke;
}

/**
 * Line stroke settings
 * @since 0.13
 */
export interface IBasicStroke {
    color: ExprOr<string>;
    alpha: ExprOr<number>;
    width: ExprOr<number>;
}

/**
 * Color fill settings
 * @since 0.13
 */
export interface IBasicFill {
    color: ExprOr<string>;
    alpha: ExprOr<number>;
}

/**
 * The default style for point features
 * @since 0.13
 */
export const DEFAULT_POINT_CIRCLE_STYLE: IBasicPointCircleStyle = {
    type: "Circle",
    fill: {
        color: "#ff0000",
        alpha: 255
    },
    radius: 5,
    stroke: {
        color: "#0000ff",
        alpha: 255,
        width: 1
    }
};

/**
 * The default icon style for point features
 * @since 0.13
 */
export const DEFAULT_POINT_ICON_STYLE: IPointIconStyle = {
    type: "Icon",
    anchor: [0.5, 0.5],
    src: MAP_MARKER_ICON,
    //size: [24, 24],
    rotateWithView: false,
    rotation: 0,
    //opacity: 255,
    scale: 1
}

/**
 * The default color
 * @since 0.13
 */
export const DEFAULT_COLOR = "#000000";

/**
 * The default style for line features
 * @since 0.13
 */
export const DEFAULT_LINE_STYLE: IBasicVectorLineStyle = {
    color: "#0000ff",
    alpha: 255,
    width: 1
};

/**
 * The default style for polygon features
 * @since 0.13
 */
export const DEFAULT_POLY_STYLE: IBasicVectorPolygonStyle = {
    fill: {
        color: "#00ff00",
        alpha: 255
    },
    stroke: {
        color: DEFAULT_COLOR,
        alpha: 255,
        width: 1
    }
};

/**
 * The default vector layer style
 * @since 0.14
 */
export const DEFAULT_VECTOR_LAYER_STYLE = {
    default: {
        point: DEFAULT_POINT_CIRCLE_STYLE,
        line: DEFAULT_LINE_STYLE,
        polygon: DEFAULT_POLY_STYLE
    }
};

/**
 * An OpenLayers style map
 * 
 * @export
 * @interface IOlStyleMap
 * @since 0.13
 */
export interface IOlStyleMap {
    id: string;
    "Point": Style;
    "LineString": Style;
    "MultiLineString": Style;
    "MultiPoint": Style;
    "MultiPolygon": Style;
    "Polygon": Style;
    "GeometryCollection": Style;
    "Circle": Style;
}

function lpad(inStr: string | number, len: number, padChar: string = '0') {
    return (new Array(len || 2).join(padChar) + inStr).slice(-len)
}

function num2hex(n: number) {
    return lpad(n.toString(16), 2);
}

function toHtmlColor(c: Color | ColorLike): [string, number] {
    if (typeof (c) == 'string') {
        const ca = asArray(c);
        return [`#${num2hex(ca[0])}${num2hex(ca[1])}${num2hex(ca[2])}`, ca[3] ?? 255];
    }
    if (Array.isArray(c)) {
        return [`#${num2hex(c[0])}${num2hex(c[1])}${num2hex(c[2])}`, c[3]];
    }
    return [DEFAULT_COLOR, 0];
}

function toBasicFill(f: Fill): IBasicFill {
    const [c, alpha] = toHtmlColor(f.getColor());
    const fi: IBasicFill = {
        color: c,
        alpha: (alpha ?? 0) * 255
    };
    return fi;
}

function toBasicStroke(s: Stroke): IBasicStroke {
    const [c, alpha] = toHtmlColor(s.getColor());
    const bs: IBasicStroke = {
        color: c,
        width: s.getWidth(),
        alpha: (alpha ?? 0) * 255
    };
    return bs;
}

/**
 * Converts an OpenLayers style map to a vector style
 * 
 * @export
 * @param {IOlStyleMap} os
 * @returns {IVectorFeatureStyle}
 * @since 0.13
 */
function olStyleMapToVectorStyle(os: IOlStyleMap): IVectorFeatureStyle {
    const style: IVectorFeatureStyle = {};
    const pi = os.Point.getImage();
    if (pi instanceof CircleStyle) {
        style.point = {
            type: "Circle",
            fill: toBasicFill(pi.getFill()),
            radius: pi.getRadius(),
            stroke: toBasicStroke(pi.getStroke())
        };
    } else if (pi instanceof IconStyle) {
        style.point = {
            type: "Icon",
            anchor: (pi.getAnchor() ?? [0.5, 0.5]) as [number, number],
            src: pi.getSrc(),
            //size: pi.getSize() as [number, number],
            rotateWithView: pi.getRotateWithView(),
            rotation: rad2deg(pi.getRotation() ?? 0),
            //opacity: (pi.getOpacity() ?? 0) * 255,
            scale: pi.getScale()
        };
    }
    style.line = toBasicStroke(os.LineString.getStroke());
    style.polygon = {
        fill: toBasicFill(os.Polygon.getFill()),
        stroke: toBasicStroke(os.Polygon.getStroke())
    };
    return style;
}

function toOLColor(color: string, alpha: number | undefined) {
    const c = asArray(color);
    if (typeof(alpha) != 'undefined') {
        c[3] = (alpha / 255);
    }
    return c;
}

function buildStyleMap(pts: Style, lns: Style, pls: Style) {
    //For GeometryCollection, combine point and polygon styles
    const cpts = pts.clone();
    const cpls = pls.clone();
    const gcs = new Style({
        image: cpts.getImage(),
        stroke: cpls.getStroke(),
        fill: cpls.getFill()
    });
    return {
        id: shortid.generate(),
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

class ExprEvalContext {
    private exprCache: { [expr: string]: Expression };
    private filterCache: { [expr: string]: Expression };
    constructor() {
        this.exprCache = {};
        this.filterCache = {};
    }
    public addFilter(expr: string) {
        if (!this.filterCache[expr]) {
            this.filterCache[expr] = Parser.parse(expr);
        }
    }
    public addExpr(expr: string) {
        if (!this.exprCache[expr]) {
            this.exprCache[expr] = Parser.parse(expr);
        }
    }
    private cleanValues(feat: Feature<Geometry>) {
        const vals = feat.getProperties();
        //UGLY: We have no guarantee that the properties in question will not have
        //spaces in them (that will break evaluation), so force the matter by replacing
        //spaces with underscores. What this means is if we find a property named "OFFICE TYPE", it
        //will be converted to "OFFICE_TYPE"
        const keys = Object.keys(vals);
        const cvals: any = {};
        for (const k of keys) {
            cvals[strReplaceAll(k, " ", "_")] = vals[k];
        }
        return cvals;
    }
    public evaluateFilter(feat: Feature<Geometry>): string | undefined {
        const cvals = this.cleanValues(feat);
        for (const filter in this.filterCache) {
            // Does this feature match an expression?
            if (this.filterCache[filter].evaluate(cvals)) {
                return filter;
            }
        }
        return undefined;
    }
    public evaluate(expr: string, feat: Feature<Geometry>): any {
        this.addExpr(expr);
        const cvals = this.cleanValues(feat);
        return this.exprCache[expr].evaluate(cvals);
    }
}

function evalFeature<T>(expr: ExprOr<T>, feat: Feature | undefined, context: ExprEvalContext | undefined): any | undefined {
    if (!isEvaluatable(expr)) {
        return expr;
    } else if (feat && context) {
        return context.evaluate(expr.expr, feat);
    } else {
        return undefined;
    }
}

function isDynamicStroke(stroke: IBasicStroke | undefined): boolean {
    if (!stroke) {
        return false;
    }
    return isEvaluatable(stroke.alpha)
        || isEvaluatable(stroke.color)
        || isEvaluatable(stroke.width);
}

function isDynamicFill(fill: IBasicFill | undefined): boolean {
    if (!fill) {
        return false;
    }
    return isEvaluatable(fill.alpha)
        || isEvaluatable(fill.color);
}

function isDynamicLabel(labelSettings: IVectorLabelSettings): boolean {
    const { label } = labelSettings;
    if (!label) {
        return false;
    }
    return isDynamicFill(label.backgroundFill)
        || isDynamicStroke(label.backgroundStroke)
        || isDynamicFill(label.fill)
        || isEvaluatable(label.font)
        || isEvaluatable(label.maxAngle)
        || isEvaluatable(label.offsetX)
        || isEvaluatable(label.offsetY)
        || isEvaluatable(label.overflow)
        || isEvaluatable(label.padding)
        || isEvaluatable(label.placement)
        || isEvaluatable(label.rotateWithView)
        || isEvaluatable(label.rotation)
        || isEvaluatable(label.scale)
        || isDynamicStroke(label.stroke)
        || isEvaluatable(label.text)
        || isEvaluatable(label.textAlign)
        || isEvaluatable(label.textBaseline);
}

function isDynamicPointStyle(style: IBasicVectorPointStyle): boolean {
    const apts: any = style;
    const isBaseDynamic = isEvaluatable(apts.radius)
        || isDynamicFill(apts.fill)
        || isDynamicStroke(apts.stroke);
    if (isBaseDynamic) {
        return true;
    }
    return isDynamicLabel(style);
}

function isDynamicLineStyle(style: IBasicVectorLineStyle): boolean {
    return isDynamicStroke(style)
        || isDynamicLabel(style);
}

function isDynamicPolygonStyle(style: IBasicVectorPolygonStyle): boolean {
    return isDynamicStroke(style.stroke)
        || isDynamicFill(style.fill)
        || isDynamicLabel(style);
}

function buildStroke(stroke: IBasicStroke, feat: Feature | undefined, context: ExprEvalContext | undefined): Stroke {
    return new Stroke({
        color: toOLColor(evalFeature(stroke.color, feat, context), evalFeature(stroke.alpha, feat, context)),
        width: evalFeature(stroke.width, feat, context)
    })
}

function buildFill(fill: IBasicFill, feat: Feature | undefined, context: ExprEvalContext | undefined): Fill {
    return new Fill({
        color: toOLColor(evalFeature(fill.color, feat, context), evalFeature(fill.alpha, feat, context))
    });
}

function setIfNotUndefined<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {
    if (typeof(value) != 'undefined') {
        obj[prop] = value;
    }
}

function tryBuildTextStyle(style: IVectorLabelSettings, feat: Feature | undefined, context: ExprEvalContext | undefined): TextStyle | undefined {
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
        if (typeof(txt) != 'undefined') {
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

function vectorStyleToStyleMap(style: IVectorFeatureStyle): IOlStyleMap | DynamicStyleMap {
    const ptStyle = style.point ?? DEFAULT_POINT_CIRCLE_STYLE;
    const lnStyle = style.line ?? DEFAULT_LINE_STYLE;
    const plStyle = style.polygon ?? DEFAULT_POLY_STYLE;

    const builder: DynamicStyleMap = (feat, context) => {
        const pts = new Style();
        if (ptStyle.type == "Circle") {
            pts.setImage(new CircleStyle({
                radius: evalFeature(ptStyle.radius, feat, context),
                fill: buildFill(ptStyle.fill, feat, context),
                stroke: buildStroke(ptStyle.stroke, feat, context)
            }));
        } else {
            pts.setImage(new IconStyle({
                anchor: ptStyle.anchor,
                src: evalFeature(ptStyle.src, feat, context),
                rotateWithView: evalFeature(ptStyle.rotateWithView, feat, context),
                rotation: deg2rad(evalFeature(ptStyle.rotation, feat, context)),
                scale: evalFeature(ptStyle.scale, feat, context)
            }));
        }
        const lns = new Style({
            stroke: buildStroke(lnStyle, feat, context)
        });
        const pls = new Style({
            stroke: buildStroke(plStyle.stroke, feat, context),
            fill: buildFill(plStyle.fill, feat, context)
        });

        const ptText = tryBuildTextStyle(ptStyle, feat, context);
        const lnText = tryBuildTextStyle(lnStyle, feat, context);
        const plsText = tryBuildTextStyle(plStyle, feat, context);
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

    const isDynamic = isDynamicPointStyle(ptStyle)
        || isDynamicLineStyle(lnStyle)
        || isDynamicPolygonStyle(plStyle);

    if (isDynamic) {
        return builder;
    } else {
        return builder(undefined, undefined);
    }
}

/**
 * @since 0.14
 */
export const DEFAULT_STYLE_KEY = "default";

type DynamicStyleMap = (feature: Feature | undefined, context: ExprEvalContext | undefined) => IOlStyleMap;

/**
 * @since 0.14
 */
export class OLStyleMapSet {
    rules: {
        [filter: string]: IOlStyleMap | DynamicStyleMap;
        default: IOlStyleMap | DynamicStyleMap;
    }
    constructor(private readonly origStyleDef: IVectorLayerStyle) {
        this.rules = {
            default: vectorStyleToStyleMap(origStyleDef.default)
        };
        for (const k in origStyleDef) {
            if (k != DEFAULT_STYLE_KEY && origStyleDef[k]) {
                this.rules[k] = vectorStyleToStyleMap(origStyleDef[k]);
            }
        }
    }
    public toVectorLayerStyle(): IVectorLayerStyle {
        return this.origStyleDef;
    }
}

/**
 * Sets the vector layer style for the given OpenLayers vector layer
 * 
 * @since 0.13
 * @since 0.14 style now takes IVectorLayerStyle instead of IVectorFeatureStyle
 */
export function setOLVectorLayerStyle(layer: VectorLayer, style: IVectorLayerStyle) {
    const olstyles = new OLStyleMapSet(style);
    layer.set(LayerProperty.VECTOR_STYLE, olstyles);
    const filters = Object.keys(style).filter(f => f != DEFAULT_STYLE_KEY);
    const exprContext = new ExprEvalContext();
    for (const f of filters) {
        exprContext.addFilter(f);
    }
    const layerStyleFunc = function (feature: Feature<Geometry>) {
        //TODO: Perf opportunity, cache styles by type_filter|default. Of course, if we ever
        //decide to go for fully dynamic styles (where any property could be an expression to evaluate)
        //such styles are not candidates for caching.
        const sset: OLStyleMapSet = this;
        const gt: any = feature.getGeometry().getType();
        const filter = exprContext.evaluateFilter(feature);
        let matchingStyle: IOlStyleMap | DynamicStyleMap;
        if (filter) {
            matchingStyle = sset.rules[filter];
        } else {
            //Fallback to default
            matchingStyle = sset.rules.default;
        }
        if (typeof(matchingStyle) == 'function') {
            const esm = matchingStyle(feature, exprContext);
            return (esm as any)[gt];
        } else {
            return (matchingStyle as any)[gt];
        }
    }.bind(olstyles);
    layer.setStyle(layerStyleFunc);
}