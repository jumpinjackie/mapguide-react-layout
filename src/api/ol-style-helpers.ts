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
    type: "Circle";
    fill: IBasicFill;
    radius: number;
    stroke: IBasicStroke;
}

/**
 * Point icon style settings
 * @since 0.13
 */
export interface IPointIconStyle {
    type: "Icon";
    anchor: [number, number],
    src: string;
    //size: [number, number];
    rotateWithView: boolean;
    rotation: number;
    //opacity: number;
    scale: number;
}

/**
 * Point style settings
 * @since 0.13
 */
export type IBasicVectorPointStyle = IBasicPointCircleStyle | IPointIconStyle;

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
export function olStyleMapToVectorStyle(os: IOlStyleMap): IVectorFeatureStyle {
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
            anchor: pi.getAnchor() as [number, number],
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

/**
 * Converts a vector style to an OpenLayers style map
 * 
 * @export
 * @param {IVectorFeatureStyle} style
 * @returns {IOlStyleMap}
 * @since 0.13
 */
export function vectorStyleToStyleMap(style: IVectorFeatureStyle): IOlStyleMap {
    const ptStyle = style.point ?? DEFAULT_POINT_CIRCLE_STYLE;
    const pts = new Style({
        image: ptStyle.type == "Circle" ? (new CircleStyle({
            radius: ptStyle.radius,
            fill: new Fill({
                color: toOLColor(ptStyle.fill.color, ptStyle.fill.alpha)
            }),
            stroke: new Stroke({
                color: toOLColor(ptStyle.stroke.color, ptStyle.stroke.alpha),
                width: ptStyle.stroke.width
            })
        })) : (new IconStyle({
            ...ptStyle,
            //opacity: ptStyle.opacity / 255,
            rotation: deg2rad(ptStyle.rotation)
        }))
    });
    const lnStyle = style.line ?? DEFAULT_LINE_STYLE;
    const lns = new Style({
        stroke: new Stroke({
            color: toOLColor(lnStyle.color, lnStyle.alpha),
            width: lnStyle.width
        })
    });
    const plStyle = style.polygon ?? DEFAULT_POLY_STYLE;
    const pls = new Style({
        stroke: new Stroke({
            color: toOLColor(plStyle.stroke.color, plStyle.stroke.alpha),
            width: plStyle.stroke.width
        }),
        fill: new Fill({
            color: toOLColor(plStyle.fill.color, plStyle.fill.alpha)
        })
    });
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
    }
}

/**
 * Sets the vector style for the given OpenLayers vector layer
 * 
 * @since 0.13
 */
export function setOLVectorLayerStyle(layer: VectorLayer, style: IVectorFeatureStyle) {
    const ols = vectorStyleToStyleMap(style);
    layer.set(LayerProperty.VECTOR_STYLE, ols);
    const layerStyleFunc = function (feature: Feature<Geometry>) {
        const gt = feature.getGeometry().getType();
        const st = this[gt];
        return st;
    }.bind(ols);
    layer.setStyle(layerStyleFunc);
}