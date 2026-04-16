import { describe, it, expect } from "vitest";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Circle from "ol/geom/Circle";
import Polygon from "ol/geom/Polygon";
import LinearRing from "ol/geom/LinearRing";
import MultiLineString from "ol/geom/MultiLineString";
import MultiPoint from "ol/geom/MultiPoint";
import MultiPolygon from "ol/geom/MultiPolygon";
import GeometryCollection from "ol/geom/GeometryCollection";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay";
import DrawInteraction from "ol/interaction/Draw";
import ExtentInteraction from "ol/interaction/Extent";
import TranslateInteraction from "ol/interaction/Translate";
import SnapInteraction from "ol/interaction/Snap";
import ModifyInteraction from "ol/interaction/Modify";
import SelectInteraction from "ol/interaction/Select";
import Feature from "ol/Feature";
import GeoJSONFormat from "ol/format/GeoJSON";
import WKTFormat from "ol/format/WKT";
import Style from "ol/style/Style";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
import CircleStyle from "ol/style/Circle";
import { OLFactory } from "../../src/api/ol-factory";
import type { Bounds } from "../../src/api/common";

describe("api/ol-factory", () => {
    const factory = new OLFactory();

    describe("geometry creators", () => {
        it("createGeomPoint creates a Point geometry", () => {
            const point = factory.createGeomPoint([1, 2]);
            expect(point).toBeInstanceOf(Point);
        });

        it("createGeomLineString creates a LineString geometry", () => {
            const line = factory.createGeomLineString([[0, 0], [1, 1]]);
            expect(line).toBeInstanceOf(LineString);
        });

        it("createGeomCircle creates a Circle geometry", () => {
            const circle = factory.createGeomCircle([0, 0], 10);
            expect(circle).toBeInstanceOf(Circle);
        });

        it("createGeomLinearRing creates a LinearRing geometry", () => {
            const ring = factory.createGeomLinearRing([[0, 0], [1, 0], [1, 1], [0, 0]]);
            expect(ring).toBeInstanceOf(LinearRing);
        });

        it("createGeomPolygon creates a Polygon geometry", () => {
            const poly = factory.createGeomPolygon([[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]);
            expect(poly).toBeInstanceOf(Polygon);
        });

        it("createGeomPolygonFromCircle creates a Polygon from a Circle", () => {
            const circle = factory.createGeomCircle([0, 0], 5);
            const poly = factory.createGeomPolygonFromCircle(circle);
            expect(poly).toBeInstanceOf(Polygon);
        });

        it("createGeomMultiLineString creates a MultiLineString geometry", () => {
            const multi = factory.createGeomMultiLineString([[[0, 0], [1, 1]], [[2, 2], [3, 3]]]);
            expect(multi).toBeInstanceOf(MultiLineString);
        });

        it("createGeomMultiPoint creates a MultiPoint geometry", () => {
            const multi = factory.createGeomMultiPoint([[0, 0], [1, 1]]);
            expect(multi).toBeInstanceOf(MultiPoint);
        });

        it("createGeomMultiPolygon creates a MultiPolygon geometry", () => {
            const multi = factory.createGeomMultiPolygon([[[[0, 0], [1, 0], [1, 1], [0, 0]]]]);
            expect(multi).toBeInstanceOf(MultiPolygon);
        });

        it("createGeomCollection creates a GeometryCollection", () => {
            const point = factory.createGeomPoint([0, 0]);
            const collection = factory.createGeomCollection([point]);
            expect(collection).toBeInstanceOf(GeometryCollection);
        });
    });

    describe("layer and source creators", () => {
        it("createVectorSource creates a VectorSource", () => {
            const source = factory.createVectorSource();
            expect(source).toBeInstanceOf(VectorSource);
        });

        it("createVectorLayer creates a VectorLayer", () => {
            const layer = factory.createVectorLayer();
            expect(layer).toBeInstanceOf(VectorLayer);
        });
    });

    describe("feature creators", () => {
        it("createFeature creates a Feature", () => {
            const feature = factory.createFeature();
            expect(feature).toBeInstanceOf(Feature);
        });

        it("createFeature creates a Feature with geometry", () => {
            const point = factory.createGeomPoint([0, 0]);
            const feature = factory.createFeature(point);
            expect(feature).toBeInstanceOf(Feature);
            expect(feature.getGeometry()).toBeDefined();
        });

        it("createFeatureCollection creates a Collection of Features", () => {
            const collection = factory.createFeatureCollection();
            expect(collection).toBeDefined();
            expect(collection.getLength()).toBe(0);
        });
    });

    describe("format creators", () => {
        it("createFormatGeoJSON creates a GeoJSONFormat", () => {
            const format = factory.createFormatGeoJSON();
            expect(format).toBeInstanceOf(GeoJSONFormat);
        });

        it("createFormatWKT creates a WKTFormat", () => {
            const format = factory.createFormatWKT();
            expect(format).toBeInstanceOf(WKTFormat);
        });
    });

    describe("style creators", () => {
        it("createStyle creates a Style", () => {
            const style = factory.createStyle();
            expect(style).toBeInstanceOf(Style);
        });

        it("createStyleFill creates a FillStyle", () => {
            const fill = factory.createStyleFill();
            expect(fill).toBeInstanceOf(FillStyle);
        });

        it("createStyleStroke creates a StrokeStyle", () => {
            const stroke = factory.createStyleStroke();
            expect(stroke).toBeInstanceOf(StrokeStyle);
        });

        it("createStyleCircle creates a CircleStyle", () => {
            const circle = factory.createStyleCircle({ radius: 5 });
            expect(circle).toBeInstanceOf(CircleStyle);
        });
    });

    describe("extent helpers", () => {
        it("extentContainsXY returns true when point is inside extent", () => {
            const extent: Bounds = [0, 0, 10, 10];
            expect(factory.extentContainsXY(extent, 5, 5)).toBe(true);
        });

        it("extentContainsXY returns false when point is outside extent", () => {
            const extent: Bounds = [0, 0, 10, 10];
            expect(factory.extentContainsXY(extent, 15, 15)).toBe(false);
        });

        it("extendExtent extends the given extent", () => {
            const extent1: Bounds = [0, 0, 10, 10];
            const extent2: Bounds = [5, 5, 20, 20];
            const extended = factory.extendExtent(extent1, extent2);
            expect(extended[0]).toBe(0);
            expect(extended[1]).toBe(0);
            expect(extended[2]).toBe(20);
            expect(extended[3]).toBe(20);
        });
    });

    describe("projection and coordinate transforms", () => {
        it("createProjection creates a Projection object", () => {
            const Projection = require("ol/proj/Projection").default;
            const proj = factory.createProjection({ code: "EPSG:4326" });
            expect(proj).toBeInstanceOf(Projection);
        });

        it("transformCoordinateFromLonLat transforms lon/lat to default projection", () => {
            const result = factory.transformCoordinateFromLonLat([0, 0]);
            expect(result).toHaveLength(2);
            expect(typeof result[0]).toBe("number");
            expect(typeof result[1]).toBe("number");
        });

        it("transformCoordinate transforms between projections", () => {
            const result = factory.transformCoordinate([0, 0], "EPSG:4326", "EPSG:3857");
            expect(result).toHaveLength(2);
        });

        it("transformExtent transforms an extent between projections", () => {
            const extent: Bounds = [-180, -85, 180, 85];
            const result = factory.transformExtent(extent, "EPSG:4326", "EPSG:3857");
            expect(result).toHaveLength(4);
        });
    });

    describe("overlay", () => {
        it("createOverlay creates an Overlay", () => {
            const Overlay = require("ol/Overlay").default;
            const overlay = factory.createOverlay({ element: document.createElement("div") });
            expect(overlay).toBeInstanceOf(Overlay);
        });
    });

    describe("interactions", () => {
        it("createInteractionDraw creates a DrawInteraction", () => {
            const DrawInteraction = require("ol/interaction/Draw").default;
            const source = factory.createVectorSource();
            const interaction = factory.createInteractionDraw({ source, type: "Point" });
            expect(interaction).toBeInstanceOf(DrawInteraction);
        });

        it("createInteractionExtent creates an ExtentInteraction", () => {
            const ExtentInteraction = require("ol/interaction/Extent").default;
            const interaction = factory.createInteractionExtent({});
            expect(interaction).toBeInstanceOf(ExtentInteraction);
        });

        it("createInteractionTranslate creates a TranslateInteraction", () => {
            const TranslateInteraction = require("ol/interaction/Translate").default;
            const interaction = factory.createInteractionTranslate({});
            expect(interaction).toBeInstanceOf(TranslateInteraction);
        });

        it("createInteractionSnap creates a SnapInteraction", () => {
            const SnapInteraction = require("ol/interaction/Snap").default;
            const source = factory.createVectorSource();
            const interaction = factory.createInteractionSnap({ source });
            expect(interaction).toBeInstanceOf(SnapInteraction);
        });

        it("createInteractionModify creates a ModifyInteraction", () => {
            const ModifyInteraction = require("ol/interaction/Modify").default;
            const source = factory.createVectorSource();
            const interaction = factory.createInteractionModify({ source });
            expect(interaction).toBeInstanceOf(ModifyInteraction);
        });

        it("createInteractionSelect creates a SelectInteraction", () => {
            const SelectInteraction = require("ol/interaction/Select").default;
            const interaction = factory.createInteractionSelect({});
            expect(interaction).toBeInstanceOf(SelectInteraction);
        });
    });

    describe("styles (extended)", () => {
        it("createStyleIcon creates an IconStyle", () => {
            const IconStyle = require("ol/style/Icon").default;
            const icon = factory.createStyleIcon({ src: "icon.png" });
            expect(icon).toBeInstanceOf(IconStyle);
        });

        it("createStyleRegularShape creates a RegularShapeStyle", () => {
            const RegularShapeStyle = require("ol/style/RegularShape").default;
            const shape = factory.createStyleRegularShape({ points: 4, radius: 10, angle: Math.PI / 4 });
            expect(shape).toBeInstanceOf(RegularShapeStyle);
        });

        it("createStyleText creates a TextStyle", () => {
            const TextStyle = require("ol/style/Text").default;
            const text = factory.createStyleText({ text: "hello" });
            expect(text).toBeInstanceOf(TextStyle);
        });
    });
});
