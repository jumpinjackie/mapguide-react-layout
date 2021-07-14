import Style from 'ol/style/Style';
import { MAP_MARKER_ICON } from '../constants/assets';
import { ExprEvalContext } from './expr-eval-context';
import { OLFeature } from './ol-types';

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
export enum ClusterClickAction {
    ZoomToClusterExtents = "ZoomToClusterExtents",
    ShowPopup = "ShowPopup"
}

/**
 * Point cluster settings
 * 
 * @since 0.14
 */
export interface IClusterSettings {
    /**
     * The clustering distance
     */
    distance: number;
    /**
     * What happens if this cluster is clicked
     */
    onClick: ClusterClickAction;
    /**
     * The style to use for point clusters
     */
    style: IVectorLayerStyle;
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

export type DynamicStyleMap = (feature: OLFeature | undefined, context: ExprEvalContext | undefined) => IOlStyleMap;