import olPoint from "ol/geom/Point";
import olLineString from "ol/geom/LineString";
import olCircle from "ol/geom/Circle";
import olPolygon, { fromCircle } from "ol/geom/Polygon";
import olLinearRing from "ol/geom/LinearRing";
import olMultiLineString from "ol/geom/MultiLineString";
import olMultiPoint from "ol/geom/MultiPoint";
import olMultiPolygon from "ol/geom/MultiPolygon";
import olGeometry from "ol/geom/Geometry";
import olGeometryCollection from "ol/geom/GeometryCollection";

import olOverlay, { Options as OverlayOptions } from "ol/Overlay";
import * as olExtent from "ol/extent";
import * as olProj from "ol/proj";
import olProjection, { Options as ProjectionOptions } from "ol/proj/Projection";

import { Options as VectorLayerOptions } from "ol/layer/BaseVector";
import olVectorLayer from "ol/layer/Vector";
import olVectorSource, { Options as VectorOptions } from "ol/source/Vector";

import olCollection from "ol/Collection";
import olFeature from "ol/Feature";

import olInteractionExtent, { Options as ExtentOptions } from "ol/interaction/Extent";
import olInteractionSnap, { Options as SnapOptions } from "ol/interaction/Snap";
import olInteractionDraw, { Options as DrawOptions } from "ol/interaction/Draw";
import olInteractionTranslate, { Options as TranslateOptions } from "ol/interaction/Translate";
import olInteractionModify, { Options as ModifyOptions } from "ol/interaction/Modify";
import olInteractionSelect, { Options as SelectOptions } from "ol/interaction/Select";

import olFormatGeoJSON, { Options as GeoJSONOptions } from "ol/format/GeoJSON";
import olFormatWKT, { Options as WKTOptions } from "ol/format/WKT";

import olStyle, { Options as StyleOptions } from "ol/style/Style";
import olStyleIcon, { Options as IconOptions } from "ol/style/Icon";
import olStyleRegularShape, { Options as RegularShapeOptions } from "ol/style/RegularShape";
import olStyleText, { Options as TextOptions } from "ol/style/Text";
import olStyleFill, { Options as FillOptions } from "ol/style/Fill";
import olStyleStroke, { Options as StrokeOptions } from "ol/style/Stroke";
import olStyleCircle, { Options as CircleOptions } from "ol/style/Circle";
import { Bounds, Coordinate2D } from './common';
import { ProjectionLike } from 'ol/proj';

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @interface IOLFactory
 */
export interface IOLFactory {
    createStyle(options?: StyleOptions): olStyle;
    createStyleFill(options?: FillOptions): olStyleFill;
    createStyleStroke(options?: StrokeOptions): olStyleStroke;
    createStyleCircle(options?: CircleOptions): olStyleCircle;
    /**
     * @since 0.12.6
     */
    createStyleIcon(options?: IconOptions): olStyleIcon;
    /**
     * @since 0.12.6
     */
    createStyleRegularShape(options: RegularShapeOptions): olStyleRegularShape;
    /**
     * @since 0.12.6
     */
    createStyleText(options?: TextOptions): olStyleText;
    createFeatureCollection(): olCollection<olFeature>;
    extentContainsXY(extent: Bounds, x: number, y: number): boolean;
    extendExtent(extent: Bounds, other: Bounds): Bounds;
    createProjection(options: ProjectionOptions): olProjection;
    transformCoordinateFromLonLat(lonlat: Coordinate2D, proj?: ProjectionLike): Coordinate2D;
    transformCoordinate(coordinate: Coordinate2D, source: ProjectionLike, target: ProjectionLike): Coordinate2D;
    transformExtent(extent: Bounds, source: ProjectionLike, target: ProjectionLike): Bounds;
    createGeomPoint(coordinates: Coordinate2D): olPoint;
    createGeomLineString(coordinates: Coordinate2D[]): olLineString;
    createGeomCircle(center: Coordinate2D, radius: number | undefined): olCircle;
    createGeomLinearRing(coordinates: Coordinate2D[]): olLinearRing;
    createGeomPolygon(coordinates: Coordinate2D[][]): olPolygon;
    createGeomPolygonFromCircle(circle: olCircle): olPolygon;
    createGeomMultiLineString(coordinates: Coordinate2D[][]): olMultiLineString;
    createGeomMultiPoint(coordinates: Coordinate2D[]): olMultiPoint;
    createGeomMultiPolygon(coordinates: Coordinate2D[][][]): olMultiPolygon;
    createGeomCollection(geometries: olGeometry[]): olGeometryCollection;
    createVectorSource(options?: VectorOptions): olVectorSource;
    createVectorLayer(options?: VectorLayerOptions | undefined): olVectorLayer;
    createOverlay(options: OverlayOptions): olOverlay;
    createInteractionDraw(options: DrawOptions): olInteractionDraw;
    /**
     * 
     * @since 0.11
     * @param {ModifyOptions} options 
     * @returns {olInteractionModify} 
     * @memberof IOLFactory
     */
    createInteractionModify(options: ModifyOptions): olInteractionModify;
    /**
     * 
     * @since 0.11
     * @param {SelectOptions} options 
     * @returns {olInteractionSelect} 
     * @memberof IOLFactory
     */
    createInteractionSelect(options: SelectOptions): olInteractionSelect;
    createInteractionExtent(options: ExtentOptions): olInteractionExtent;
    createInteractionSnap(options: SnapOptions): olInteractionSnap;
    createInteractionTranslate(options: TranslateOptions): olInteractionTranslate;
    createFeature(geomOrProps?: olGeometry | { [key: string]: any }): olFeature;
    createFormatGeoJSON(options?: GeoJSONOptions | undefined): olFormatGeoJSON;
    createFormatWKT(options?: WKTOptions | undefined): olFormatWKT;
}

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @class OLFactory
 * @implements {IOLFactory}
 */
export class OLFactory implements IOLFactory {
    public createStyle(options?: StyleOptions): olStyle {
        return new olStyle(options);
    }
    public createStyleFill(options?: FillOptions): olStyleFill {
        return new olStyleFill(options);
    }
    public createStyleStroke(options?: StrokeOptions): olStyleStroke {
        return new olStyleStroke(options);
    }
    public createStyleCircle(options?: CircleOptions): olStyleCircle {
        return new olStyleCircle(options);
    }
    public createFeatureCollection(): olCollection<olFeature> {
        return new olCollection<olFeature>();
    }
    public extentContainsXY(extent: Bounds, x: number, y: number): boolean {
        return olExtent.containsXY(extent, x, y);
    }
    public extendExtent(extent: Bounds, other: Bounds): Bounds {
        return olExtent.extend(extent, other) as Bounds;
    }
    public createProjection(options: ProjectionOptions): olProjection {
        return new olProjection(options);
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
    public createGeomPoint(coordinates: Coordinate2D): olPoint {
        return new olPoint(coordinates);
    }
    public createGeomLineString(coordinates: Coordinate2D[]): olLineString {
        return new olLineString(coordinates);
    }
    public createGeomCircle(center: Coordinate2D, radius: number | undefined): olCircle {
        return new olCircle(center, radius);
    }
    public createGeomLinearRing(coordinates: Coordinate2D[]): olLinearRing {
        return new olLinearRing(coordinates);
    }
    public createGeomPolygon(coordinates: Coordinate2D[][]): olPolygon {
        return new olPolygon(coordinates);
    }
    public createGeomPolygonFromCircle(circle: olCircle): olPolygon {
        return fromCircle(circle);
    }
    public createGeomMultiLineString(coordinates: Coordinate2D[][]): olMultiLineString {
        return new olMultiLineString(coordinates);
    }
    public createGeomMultiPoint(coordinates: Coordinate2D[]): olMultiPoint {
        return new olMultiPoint(coordinates);
    }
    public createGeomMultiPolygon(coordinates: Coordinate2D[][][]): olMultiPolygon {
        return new olMultiPolygon(coordinates);
    }
    public createGeomCollection(geometries: olGeometry[]): olGeometryCollection {
        return new olGeometryCollection(geometries);
    }
    public createVectorSource(options?: VectorOptions): olVectorSource {
        return new olVectorSource(options);
    }
    public createVectorLayer(options?: VectorLayerOptions | undefined): olVectorLayer {
        return new olVectorLayer(options);
    }
    public createOverlay(options: OverlayOptions): olOverlay {
        return new olOverlay(options);
    }
    public createInteractionDraw(options: DrawOptions): olInteractionDraw {
        return new olInteractionDraw(options);
    }
    public createInteractionExtent(options: ExtentOptions): olInteractionExtent {
        return new olInteractionExtent(options);
    }
    public createInteractionTranslate(options: TranslateOptions): olInteractionTranslate {
        return new olInteractionTranslate(options);
    }
    public createInteractionSnap(options: SnapOptions): olInteractionSnap {
        return new olInteractionSnap(options);
    }
    public createInteractionModify(options: ModifyOptions): olInteractionModify {
        return new olInteractionModify(options);
    }
    public createInteractionSelect(options: SelectOptions): olInteractionSelect {
        return new olInteractionSelect(options);
    }
    public createFeature(geomOrProps?: olGeometry | { [key: string]: any }): olFeature {
        return new olFeature(geomOrProps);
    }
    public createFormatGeoJSON(options?: GeoJSONOptions | undefined): olFormatGeoJSON {
        return new olFormatGeoJSON(options);
    }
    public createFormatWKT(options?: WKTOptions | undefined): olFormatWKT {
        return new olFormatWKT(options);
    }

    /**
     * @since 0.12.6
     */
    public createStyleIcon(options?: IconOptions | undefined): olStyleIcon {
        return new olStyleIcon(options);
    }
    /**
     * @since 0.12.6
     */
    public createStyleRegularShape(options: RegularShapeOptions): olStyleRegularShape {
        return new olStyleRegularShape(options);
    }
    /**
     * @since 0.12.6
     */
    public createStyleText(options?: TextOptions | undefined): olStyleText {
        return new olStyleText(options);
    }
}