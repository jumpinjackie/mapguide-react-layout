import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
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
export interface IBasicPointCircleStyle {
    type: "Circle";
    fill: IBasicFill;
    radius: ExprOr<number>;
    stroke: IBasicStroke;
}

/**
 * Point icon style settings
 * @since 0.13
 */
export interface IPointIconStyle {
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

function toOLColor(color: string, alpha: number) {
    const c = asArray(color);
    c[3] = (alpha / 255);
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
            if (this.filterCache[filter].evaluate<boolean>(cvals)) {
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

function vectorStyleToStyleMap(style: IVectorFeatureStyle): IOlStyleMap | DynamicStyleMap {
    const ptStyle = style.point ?? DEFAULT_POINT_CIRCLE_STYLE;
    const lnStyle = style.line ?? DEFAULT_LINE_STYLE;
    const plStyle = style.polygon ?? DEFAULT_POLY_STYLE;

    const builder: DynamicStyleMap = (feat, context) => {
        const pts = new Style();
        if (ptStyle.type == "Circle") {
            pts.setImage(new CircleStyle({
                radius: evalFeature(ptStyle.radius, feat, context),
                fill: new Fill({
                    color: toOLColor(evalFeature(ptStyle.fill.color, feat, context), evalFeature(ptStyle.fill.alpha, feat, context))
                }),
                stroke: new Stroke({
                    color: toOLColor(evalFeature(ptStyle.stroke.color, feat, context), evalFeature(ptStyle.stroke.alpha, feat, context)),
                    width: evalFeature(ptStyle.stroke.width, feat, context)
                })
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
            stroke: new Stroke({
                color: toOLColor(evalFeature(lnStyle.color, feat, context), evalFeature(lnStyle.alpha, feat, context)),
                width: evalFeature(lnStyle.width, feat, context)
            })
        });
    
        const pls = new Style({
            stroke: new Stroke({
                color: toOLColor(evalFeature(plStyle.stroke.color, feat, context), evalFeature(plStyle.stroke.alpha, feat, context)),
                width: evalFeature(plStyle.stroke.width, feat, context)
            }),
            fill: new Fill({
                color: toOLColor(evalFeature(plStyle.fill.color, feat, context), evalFeature(plStyle.fill.alpha, feat, context))
            })
        });
        return buildStyleMap(pts, lns, pls);
    }

    const apts: any = ptStyle;
    const alns: any = lnStyle;
    const apls: any = plStyle;
    const isDynamic = isEvaluatable(apts.radius)
        || isEvaluatable(apts.fill?.color)
        || isEvaluatable(apts.stroke?.color)
        || isEvaluatable(apts.stroke?.width)
        || isEvaluatable(apts.rotation)
        || isEvaluatable(alns.color)
        || isEvaluatable(alns.width)
        || isEvaluatable(apls.fill?.color)
        || isEvaluatable(apls.stroke?.color)
        || isEvaluatable(apls.stroke?.width);

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
        const gt = feature.getGeometry().getType();
        const filter = exprContext.evaluateFilter(feature);
        let matchingStyle: IOlStyleMap | DynamicStyleMap;
        if (filter) {
            //Use its corresponding style
            matchingStyle = (sset.rules[filter] as any)[gt];
        } else {
            //Fallback to default
            matchingStyle = (sset.rules.default as any)[gt];
        }
        if (typeof(matchingStyle) == 'function') {
            return matchingStyle(feature, exprContext);
        } else {
            return matchingStyle;
        }
    }.bind(olstyles);
    layer.setStyle(layerStyleFunc);
}