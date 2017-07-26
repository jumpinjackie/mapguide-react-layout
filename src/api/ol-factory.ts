import olPoint from "ol/geom/point";
import olLineString from "ol/geom/linestring";
import olCircle from "ol/geom/circle";
import olPolygon from "ol/geom/polygon";
import olLinearRing from "ol/geom/linearring";
import olMultiLineString from "ol/geom/multilinestring";
import olMultiPoint from "ol/geom/multipoint";
import olMultiPolygon from "ol/geom/multipolygon";
import olGeometry from "ol/geom/geometry";
import olGeometryCollection from "ol/geom/geometrycollection";

import olLayerBase from "ol/layer/base";
import olOverlay from "ol/overlay";
import olExtent from "ol/extent";
import olProj from "ol/proj";
import olProjection from "ol/proj/projection";

import olVectorLayer from "ol/layer/vector";
import olVectorSource from "ol/source/vector";

import olFeature from "ol/feature";

import olInteractionExtent from "ol/interaction/extent";
import olInteractionSnap from "ol/interaction/snap";
import olInteractionDraw from "ol/interaction/draw";

import olFormatGeoJSON from "ol/format/geojson";
import olFormatWKT from "ol/format/wkt";

import olStyle from "ol/style/style";
import olStyleFill from "ol/style/fill";
import olStyleStroke from "ol/style/stroke";
import olStyleCircle from "ol/style/circle";

export type olProjectionLike = string | olProjection;

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @interface IOLFactory
 */
export interface IOLFactory {
    createStyle(options?: olx.style.StyleOptions): olStyle;
    createStyleFill(options?: olx.style.FillOptions): olStyleFill;
    createStyleStroke(options?: olx.style.StrokeOptions): olStyleStroke;
    createStyleCircle(options?: olx.style.CircleOptions): olStyleCircle;
    extentContainsXY(extent: [number, number, number, number], x: number, y: number): boolean;
    extendExtent(extent: [number, number, number, number], other: [number, number, number, number]): [number, number, number, number];
    createProjection(options: olx.ProjectionOptions): olProjection;
    transformCoordinateFromLonLat(lonlat: [number, number], proj?: olProjectionLike): [number, number];
    transformCoordinate(coordinate: [number, number], source: olProjectionLike, target: olProjectionLike): [number, number];
    transformExtent(extent: [number, number, number, number], source: olProjectionLike, target: olProjectionLike): [number, number, number, number];
    createGeomPoint(coordinates: [number, number]): olPoint;
    createGeomLineString(coordinates: [number, number][]): olLineString;
    createGeomCircle(center: [number, number], radius: number | undefined): olCircle;
    createGeomLinearRing(coordinates: [number, number][]): olLinearRing;
    createGeomPolygon(coordinates: [number, number][][]): olPolygon;
    createGeomPolygonFromCircle(circle: olCircle): olPolygon;
    createGeomMultiLineString(coordinates: [number, number][][]): olMultiLineString;
    createGeomMultiPoint(coordinates: [number, number][]): olMultiPoint;
    createGeomMultiPolygon(coordinates: [number, number][][][]): olMultiPolygon;
    createGeomCollection(geometries: olGeometry[]): olGeometryCollection;
    createVectorSource(options?: olx.source.VectorOptions): olVectorSource;
    createVectorLayer(options?: olx.layer.VectorOptions | undefined): olVectorLayer;
    createOverlay(options: olx.OverlayOptions): olOverlay;
    createInteractionDraw(options: olx.interaction.DrawOptions): olInteractionDraw;
    createInteractionExtent(options: olx.interaction.ExtentOptions): olInteractionExtent;
    createInteractionSnap(options: olx.interaction.SnapOptions): olInteractionSnap;
    createFeature(geomOrProps?: olGeometry | { [key: string]: any }): olFeature;
    createFormatGeoJSON(options?: olx.format.GeoJSONOptions | undefined): olFormatGeoJSON;
    createFormatWKT(options?: olx.format.WKTOptions | undefined): olFormatWKT;
}

/**
 * Creates various OpenLayers types used by the viewer
 *
 * @export
 * @class OLFactory
 * @implements {IOLFactory}
 */
export class OLFactory implements IOLFactory {
    public createStyle(options?: olx.style.StyleOptions): olStyle {
        return new olStyle(options);
    }
    public createStyleFill(options?: olx.style.FillOptions): olStyleFill {
        return new olStyleFill(options);
    }
    public createStyleStroke(options?: olx.style.StrokeOptions): olStyleStroke {
        return new olStyleStroke(options);
    }
    public createStyleCircle(options?: olx.style.CircleOptions): olStyleCircle {
        return new olStyleCircle(options);
    }
    public extentContainsXY(extent: [number, number, number, number], x: number, y: number): boolean {
        return olExtent.containsXY(extent, x, y);
    }
    public extendExtent(extent: [number, number, number, number], other: [number, number, number, number]): [number, number, number, number] {
        return olExtent.extend(extent, other);
    }
    public createProjection(options: olx.ProjectionOptions): olProjection {
        return new olProjection(options);
    }
    public transformCoordinateFromLonLat(lonlat: [number, number], proj?: olProjectionLike): [number, number] {
        return olProj.fromLonLat(lonlat, proj)
    }
    public transformCoordinate(coordinate: [number, number], source: olProjectionLike, target: olProjectionLike): [number, number] {
        return olProj.transform(coordinate, source, target);
    }
    public transformExtent(extent: [number, number, number, number], source: olProjectionLike, target: olProjectionLike): [number, number, number, number] {
        return olProj.transformExtent(extent, source, target);
    }
    public createGeomPoint(coordinates: [number, number]): olPoint {
        return new olPoint(coordinates);
    }
    public createGeomLineString(coordinates: [number, number][]): olLineString {
        return new olLineString(coordinates);
    }
    public createGeomCircle(center: [number, number], radius: number | undefined): olCircle {
        return new olCircle(center, radius);
    }
    public createGeomLinearRing(coordinates: [number, number][]): olLinearRing {
        return new olLinearRing(coordinates);
    }
    public createGeomPolygon(coordinates: [number, number][][]): olPolygon {
        return new olPolygon(coordinates);
    }
    public createGeomPolygonFromCircle(circle: olCircle): olPolygon {
        return olPolygon.fromCircle(circle);
    }
    public createGeomMultiLineString(coordinates: [number, number][][]): olMultiLineString {
        return new olMultiLineString(coordinates);
    }
    public createGeomMultiPoint(coordinates: [number, number][]): olMultiPoint {
        return new olMultiPoint(coordinates);
    }
    public createGeomMultiPolygon(coordinates: [number, number][][][]): olMultiPolygon {
        return new olMultiPolygon(coordinates);
    }
    public createGeomCollection(geometries: olGeometry[]): olGeometryCollection {
        return new olGeometryCollection(geometries);
    }
    public createVectorSource(options?: olx.source.VectorOptions): olVectorSource {
        return new olVectorSource(options);
    }
    public createVectorLayer(options?: olx.layer.VectorOptions | undefined): olVectorLayer {
        return new olVectorLayer(options);
    }
    public createOverlay(options: olx.OverlayOptions): olOverlay {
        return new olOverlay(options);
    }
    public createInteractionDraw(options: olx.interaction.DrawOptions): olInteractionDraw {
        return new olInteractionDraw(options);
    }
    public createInteractionExtent(options: olx.interaction.ExtentOptions): olInteractionExtent {
        return new olInteractionExtent(options);
    }
    public createInteractionSnap(options: olx.interaction.SnapOptions): olInteractionSnap {
        return new olInteractionSnap(options);
    }
    public createFeature(geomOrProps?: olGeometry | { [key: string]: any }): olFeature {
        return new olFeature(geomOrProps);
    }
    public createFormatGeoJSON(options?: olx.format.GeoJSONOptions | undefined): olFormatGeoJSON {
        return new olFormatGeoJSON(options);
    }
    public createFormatWKT(options?: olx.format.WKTOptions | undefined): olFormatWKT {
        return new olFormatWKT(options);
    }
}