import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Circle from "ol/geom/Circle";
import Polygon, { fromCircle } from "ol/geom/Polygon";
import LinearRing from "ol/geom/LinearRing";
import MultiLineString from "ol/geom/MultiLineString";
import MultiPoint from "ol/geom/MultiPoint";
import MultiPolygon from "ol/geom/MultiPolygon";
import Geometry from "ol/geom/Geometry";
import GeometryCollection from "ol/geom/GeometryCollection";

import Overlay, { Options as OverlayOptions } from "ol/Overlay";
import * as olExtent from "ol/extent";
import * as olProj from "ol/proj";
import Projection, { Options as ProjectionOptions } from "ol/proj/Projection";

import { Options as VectorLayerOptions } from "ol/layer/BaseVector";
import VectorLayer from "ol/layer/Vector";
import VectorSource, { Options as VectorOptions } from "ol/source/Vector";

import Collection from "ol/Collection";
import Feature from "ol/Feature";

import ExtentInteraction, { Options as ExtentOptions } from "ol/interaction/Extent";
import SnapInteraction, { Options as SnapOptions } from "ol/interaction/Snap";
import DrawInteraction, { Options as DrawOptions } from "ol/interaction/Draw";
import TranslateInteraction, { Options as TranslateOptions } from "ol/interaction/Translate";
import ModifyInteraction, { Options as ModifyOptions } from "ol/interaction/Modify";
import SelectInteraction, { Options as SelectOptions } from "ol/interaction/Select";

import GeoJSONFormat, { Options as GeoJSONOptions } from "ol/format/GeoJSON";
import WKTFormat, { Options as WKTOptions } from "ol/format/WKT";

import Style, { Options as StyleOptions } from "ol/style/Style";
import IconStyle, { Options as IconOptions } from "ol/style/Icon";
import RegularShapeStyle, { Options as RegularShapeOptions } from "ol/style/RegularShape";
import TextStyle, { Options as TextOptions } from "ol/style/Text";
import FillStyle, { Options as FillOptions } from "ol/style/Fill";
import StrokeStyle, { Options as StrokeOptions } from "ol/style/Stroke";
import CircleStyle, { Options as CircleOptions } from "ol/style/Circle";
import { Bounds, Coordinate2D } from './common';
import { ProjectionLike } from 'ol/proj';
import { OLVectorLayer, OLVectorLayerOptions } from "./ol-types";

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @interface IOLFactory
 */
export interface IOLFactory {
    /**
     * 
     * @param options 
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyle(options?: StyleOptions): Style;
    /**
     * 
     * @param options 
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleFill(options?: FillOptions): FillStyle;
    /**
     * 
     * @param options 
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleStroke(options?: StrokeOptions): StrokeStyle;
    /**
     * 
     * @param options 
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleCircle(options?: CircleOptions): CircleStyle;
    /**
     * @since 0.12.6
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleIcon(options?: IconOptions): IconStyle;
    /**
     * @since 0.12.6
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleRegularShape(options: RegularShapeOptions): RegularShapeStyle;
    /**
     * @since 0.12.6
     * @deprecated Will be removed in favor of the IVectorFeatureStyle as that better integrates with the external layer manager component
     */
    createStyleText(options?: TextOptions): TextStyle;
    createFeatureCollection(): Collection<Feature<Geometry>>;
    extentContainsXY(extent: Bounds, x: number, y: number): boolean;
    extendExtent(extent: Bounds, other: Bounds): Bounds;
    createProjection(options: ProjectionOptions): Projection;
    transformCoordinateFromLonLat(lonlat: Coordinate2D, proj?: ProjectionLike): Coordinate2D;
    transformCoordinate(coordinate: Coordinate2D, source: ProjectionLike, target: ProjectionLike): Coordinate2D;
    transformExtent(extent: Bounds, source: ProjectionLike, target: ProjectionLike): Bounds;
    createGeomPoint(coordinates: Coordinate2D): Point;
    createGeomLineString(coordinates: Coordinate2D[]): LineString;
    createGeomCircle(center: Coordinate2D, radius: number | undefined): Circle;
    createGeomLinearRing(coordinates: Coordinate2D[]): LinearRing;
    createGeomPolygon(coordinates: Coordinate2D[][]): Polygon;
    createGeomPolygonFromCircle(circle: Circle): Polygon;
    createGeomMultiLineString(coordinates: Coordinate2D[][]): MultiLineString;
    createGeomMultiPoint(coordinates: Coordinate2D[]): MultiPoint;
    createGeomMultiPolygon(coordinates: Coordinate2D[][][]): MultiPolygon;
    createGeomCollection(geometries: Geometry[]): GeometryCollection;
    createVectorSource(options?: VectorOptions): VectorSource;
    createVectorLayer(options?: OLVectorLayerOptions | undefined): OLVectorLayer;
    createOverlay(options: OverlayOptions): Overlay;
    createInteractionDraw(options: DrawOptions): DrawInteraction;
    /**
     * 
     * @since 0.11
     * @param {ModifyOptions} options 
     * @returns {ModifyInteraction} 
     * @memberof IOLFactory
     */
    createInteractionModify(options: ModifyOptions): ModifyInteraction;
    /**
     * 
     * @since 0.11
     * @param {SelectOptions} options 
     * @returns {SelectInteraction} 
     * @memberof IOLFactory
     */
    createInteractionSelect(options: SelectOptions): SelectInteraction;
    createInteractionExtent(options: ExtentOptions): ExtentInteraction;
    createInteractionSnap(options: SnapOptions): SnapInteraction;
    createInteractionTranslate(options: TranslateOptions): TranslateInteraction;
    createFeature(geomOrProps?: Geometry | { [key: string]: any }): Feature<Geometry>;
    createFormatGeoJSON(options?: GeoJSONOptions | undefined): GeoJSONFormat;
    createFormatWKT(options?: WKTOptions | undefined): WKTFormat;
}

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @class OLFactory
 * @implements {IOLFactory}
 */
export class OLFactory implements IOLFactory {
    public createStyle(options?: StyleOptions): Style {
        return new Style(options);
    }
    public createStyleFill(options?: FillOptions): FillStyle {
        return new FillStyle(options);
    }
    public createStyleStroke(options?: StrokeOptions): StrokeStyle {
        return new StrokeStyle(options);
    }
    public createStyleCircle(options?: CircleOptions): CircleStyle {
        return new CircleStyle(options);
    }
    public createFeatureCollection(): Collection<Feature<Geometry>> {
        return new Collection<Feature<Geometry>>();
    }
    public extentContainsXY(extent: Bounds, x: number, y: number): boolean {
        return olExtent.containsXY(extent, x, y);
    }
    public extendExtent(extent: Bounds, other: Bounds): Bounds {
        return olExtent.extend(extent, other) as Bounds;
    }
    public createProjection(options: ProjectionOptions): Projection {
        return new Projection(options);
    }
    public transformCoordinateFromLonLat(lonlat: Coordinate2D, proj?: ProjectionLike): Coordinate2D {
        return olProj.fromLonLat(lonlat, proj) as Coordinate2D;
    }
    public transformCoordinate(coordinate: Coordinate2D, source: ProjectionLike, target: ProjectionLike): Coordinate2D {
        return olProj.transform(coordinate, source, target) as Coordinate2D;
    }
    public transformExtent(extent: Bounds, source: ProjectionLike, target: ProjectionLike): Bounds {
        return olProj.transformExtent(extent, source, target) as Bounds;
    }
    public createGeomPoint(coordinates: Coordinate2D): Point {
        return new Point(coordinates);
    }
    public createGeomLineString(coordinates: Coordinate2D[]): LineString {
        return new LineString(coordinates);
    }
    public createGeomCircle(center: Coordinate2D, radius: number | undefined): Circle {
        return new Circle(center, radius);
    }
    public createGeomLinearRing(coordinates: Coordinate2D[]): LinearRing {
        return new LinearRing(coordinates);
    }
    public createGeomPolygon(coordinates: Coordinate2D[][]): Polygon {
        return new Polygon(coordinates);
    }
    public createGeomPolygonFromCircle(circle: Circle): Polygon {
        return fromCircle(circle);
    }
    public createGeomMultiLineString(coordinates: Coordinate2D[][]): MultiLineString {
        return new MultiLineString(coordinates);
    }
    public createGeomMultiPoint(coordinates: Coordinate2D[]): MultiPoint {
        return new MultiPoint(coordinates);
    }
    public createGeomMultiPolygon(coordinates: Coordinate2D[][][]): MultiPolygon {
        return new MultiPolygon(coordinates);
    }
    public createGeomCollection(geometries: Geometry[]): GeometryCollection {
        return new GeometryCollection(geometries);
    }
    public createVectorSource(options?: VectorOptions): VectorSource {
        return new VectorSource(options);
    }
    public createVectorLayer(options?: OLVectorLayerOptions | undefined): OLVectorLayer {
        return new VectorLayer(options);
    }
    public createOverlay(options: OverlayOptions): Overlay {
        return new Overlay(options);
    }
    public createInteractionDraw(options: DrawOptions): DrawInteraction {
        return new DrawInteraction(options);
    }
    public createInteractionExtent(options: ExtentOptions): ExtentInteraction {
        return new ExtentInteraction(options);
    }
    public createInteractionTranslate(options: TranslateOptions): TranslateInteraction {
        return new TranslateInteraction(options);
    }
    public createInteractionSnap(options: SnapOptions): SnapInteraction {
        return new SnapInteraction(options);
    }
    public createInteractionModify(options: ModifyOptions): ModifyInteraction {
        return new ModifyInteraction(options);
    }
    public createInteractionSelect(options: SelectOptions): SelectInteraction {
        return new SelectInteraction(options);
    }
    public createFeature(geomOrProps?: Geometry | { [key: string]: any }): Feature<Geometry> {
        return new Feature(geomOrProps);
    }
    public createFormatGeoJSON(options?: GeoJSONOptions | undefined): GeoJSONFormat {
        return new GeoJSONFormat(options);
    }
    public createFormatWKT(options?: WKTOptions | undefined): WKTFormat {
        return new WKTFormat(options);
    }

    /**
     * @since 0.12.6
     */
    public createStyleIcon(options?: IconOptions | undefined): IconStyle {
        return new IconStyle(options);
    }
    /**
     * @since 0.12.6
     */
    public createStyleRegularShape(options: RegularShapeOptions): RegularShapeStyle {
        return new RegularShapeStyle(options);
    }
    /**
     * @since 0.12.6
     */
    public createStyleText(options?: TextOptions | undefined): TextStyle {
        return new TextStyle(options);
    }
}