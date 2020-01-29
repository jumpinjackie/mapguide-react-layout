import olLayerVector from "ol/layer/Vector";
import olStyle from "ol/style/Style";
import olCircleStyle from "ol/style/Circle";
import { Color, asString, asArray } from "ol/color";
import { ColorLike } from "ol/colorlike";
import olStroke from "ol/style/Stroke";
import olFill from "ol/style/Fill";
import olFeature from "ol/Feature";
import { LayerProperty } from './common';
import * as shortid from "shortid";

/**
 * Defines a style for a vector layer
 * @since 0.13
 */
export interface IVectorFeatureStyle {
    point?: IBasicVectorPointStyle;
    line?: IBasicVectorLineStyle;
    polygon?: IBasicVectorPolygonStyle;
}

/**
 * Point circle style settings
 * @since 0.13
 */
export interface IBasicPointCircleStyle {
    fill: IBasicFill;
    radius: number;
    stroke: IBasicStroke;
}

/**
 * Point style settings
 * @since 0.13
 */
export type IBasicVectorPointStyle = IBasicPointCircleStyle;

/**
 * Line style settings
 * @since 0.13
 */
export type IBasicVectorLineStyle = IBasicStroke;

/**
 * Polygon style settings
 * @since 0.13
 */
export interface IBasicVectorPolygonStyle {
    fill: IBasicFill;
    stroke: IBasicStroke;
}

/**
 * Line stroke settings
 * @since 0.13
 */
export interface IBasicStroke {
    color: string;
    alpha: number;
    width: number;
}

/**
 * Color fill settings
 * @since 0.13
 */
export interface IBasicFill {
    color: string;
    alpha: number;
}

/**
 * The default style for point features
 * @since 0.13
 */
export const DEFAULT_POINT_STYLE: IBasicVectorPointStyle = {
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
 * An OpenLayers style map
 * 
 * @export
 * @interface IOlStyleMap
 * @since 0.13
 */
export interface IOlStyleMap {
    id: string;
    "Point": olStyle;
    "LineString": olStyle;
    "MultiLineString": olStyle;
    "MultiPoint": olStyle;
    "MultiPolygon": olStyle;
    "Polygon": olStyle;
    "GeometryCollection": olStyle;
    "Circle": olStyle;
}

function lpad(inStr: string | number, len: number,  padChar: string = '0') {
    return (new Array(len || 2).join( padChar) + inStr).slice(-len)
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

function toBasicFill(f: olFill): IBasicFill {
    const [c, alpha] = toHtmlColor(f.getColor());
    const fi: IBasicFill = {
        color: c,
        alpha: (alpha ?? 0) * 255
    };
    return fi;
}

function toBasicStroke(s: olStroke): IBasicStroke {
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
export function olStyleMapToVectorStyle(os: IOlStyleMap): IVectorFeatureStyle {
    const style: IVectorFeatureStyle = {};
    const pi = os.Point.getImage();
    if (pi instanceof olCircleStyle) {
        style.point = {
            fill: toBasicFill(pi.getFill()),
            radius: pi.getRadius(),
            stroke: toBasicStroke(pi.getStroke())
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

/**
 * Converts a vector style to an OpenLayers style map
 * 
 * @export
 * @param {IVectorFeatureStyle} style
 * @returns {IOlStyleMap}
 * @since 0.13
 */
export function vectorStyleToOLStyleMap(style: IVectorFeatureStyle): IOlStyleMap {
    const ptStyle = style.point ?? DEFAULT_POINT_STYLE;
    const pts = new olStyle({
        image: new olCircleStyle({
            radius: ptStyle.radius,
            fill: new olFill({
                color: toOLColor(ptStyle.fill.color, ptStyle.fill.alpha)
            }),
            stroke: new olStroke({
                color: toOLColor(ptStyle.stroke.color, ptStyle.stroke.alpha),
                width: ptStyle.stroke.width
            })
        })
    });
    const lnStyle = style.line ?? DEFAULT_LINE_STYLE;
    const lns = new olStyle({
        stroke: new olStroke({
            color: toOLColor(lnStyle.color, lnStyle.alpha),
            width: lnStyle.width
        })
    });
    const plStyle = style.polygon ?? DEFAULT_POLY_STYLE;
    const pls = new olStyle({
        stroke: new olStroke({
            color: toOLColor(plStyle.stroke.color, plStyle.stroke.alpha),
            width: plStyle.stroke.width
        }),
        fill: new olFill({
            color: toOLColor(plStyle.fill.color, plStyle.fill.alpha)
        })
    });
    //For GeometryCollection, combine point and polygon styles
    const cpts = pts.clone();
    const cpls = pls.clone();
    const gcs = new olStyle({
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
    }
}

/**
 * Sets the vector style for the given OpenLayers vector layer
 * 
 * @since 0.13
 */
export function setOLVectorLayerStyle(layer: olLayerVector, style: IVectorFeatureStyle) {
    const ols = vectorStyleToOLStyleMap(style);
    layer.set(LayerProperty.VECTOR_STYLE, ols);
    const layerStyleFunc = function (feature: olFeature) {
        const gt = feature.getGeometry().getType();
        const st = this[gt];
        return st;
    }.bind(ols);
    layer.setStyle(layerStyleFunc);
}