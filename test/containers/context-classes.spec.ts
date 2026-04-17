/**
 * Coverage tests for map-capturer-context and measure-context classes.
 */
import { describe, it, expect, vi } from "vitest";
import { MapCapturerContext } from "../../src/containers/map-capturer-context";
import { MeasureContext } from "../../src/containers/measure-context";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Projection } from "ol/proj";

describe("context classes", () => {
   it("covers MapCapturerContext lifecycle", () => {
      const addLayer = vi.fn();
      const removeLayer = vi.fn();
      const addInteraction = vi.fn();
      const removeInteraction = vi.fn();
      const viewer = {
         getMetersPerUnit: () => 1,
         getCurrentView: () => ({ x: 100, y: 200 }),
         addInteraction,
         removeInteraction,
         getLayerManager: () => ({ addLayer, removeLayer }),
      } as any;

      const callback = { updateBoxCoords: vi.fn() };
      const ctx = new MapCapturerContext(viewer, "MapA", 0);
      expect(ctx.getMapName()).toBe("MapA");

      ctx.activate(callback, { w: 100, h: 50 }, 1000, 15);
      expect(addLayer).toHaveBeenCalled();
      expect(addInteraction).toHaveBeenCalled();

      ctx.updateBox({ w: 110, h: 60 }, 1200, 25);
      expect(callback.updateBoxCoords).toHaveBeenCalled();

      ctx.deactivate();
      expect(removeLayer).toHaveBeenCalled();
      expect(removeInteraction).toHaveBeenCalled();
   });

   it("covers MeasureContext map name and activate/deactivate paths", () => {
      const addLayer = vi.fn();
      const removeLayer = vi.fn();
      const addOverlay = vi.fn();
      const removeOverlay = vi.fn();
      const addInteraction = vi.fn();
      const removeInteraction = vi.fn();
      const addHandler = vi.fn();
      const removeHandler = vi.fn();

      const vectorSource = { clear: vi.fn() };
      const vectorLayer = {
         set: vi.fn(),
         setStyle: vi.fn(),
         getSource: () => vectorSource,
      };
      const drawInteraction = {
         on: vi.fn(),
         un: vi.fn(),
      };
      const olFactory = {
         createVectorSource: vi.fn(() => vectorSource),
         createVectorLayer: vi.fn(() => vectorLayer),
         createStyle: vi.fn(() => ({})),
         createStyleFill: vi.fn(() => ({})),
         createStyleStroke: vi.fn(() => ({})),
         createStyleCircle: vi.fn(() => ({})),
         createOverlay: vi.fn(() => ({})),
         createInteractionDraw: vi.fn(() => drawInteraction),
         transformCoordinate: vi.fn((c: [number, number]) => c),
      };

      const viewer = {
         getOLFactory: () => olFactory,
         getProjection: () => "EPSG:3857",
         addOverlay,
         removeOverlay,
         addInteraction,
         removeInteraction,
         addHandler,
         removeHandler,
         getLayerManager: () => ({ addLayer, removeLayer }),
      } as any;

      const parent = {
         getCurrentDrawType: () => "LineString",
         getLocale: () => "en",
      } as any;

      const callback = {
         updateSegments: vi.fn(),
         clearSegments: vi.fn(),
      };

      const ctx = new MeasureContext(viewer, "MapB", parent);
      expect(ctx.getMapName()).toBe("MapB");

      ctx.activate("MapB", callback);
      expect(addLayer).toHaveBeenCalled();

      ctx.startMeasure("LineString");
      expect(addHandler).toHaveBeenCalled();
      expect(addInteraction).toHaveBeenCalled();

      ctx.handleDrawTypeChange("Polygon");
      expect(addInteraction).toHaveBeenCalled();

      ctx.clearMeasurements();
      expect(vectorSource.clear).toHaveBeenCalled();
      expect(callback.clearSegments).toHaveBeenCalled();

      ctx.deactivate("MapB");
      expect(removeLayer).toHaveBeenCalled();
      expect(removeHandler).toHaveBeenCalled();
      expect(removeInteraction).toHaveBeenCalled();
   });

   it("formats line/area measurements for arbitrary and projected branches", () => {
      const vectorSource = { clear: vi.fn() };
      const vectorLayer = {
         set: vi.fn(),
         setStyle: vi.fn(),
         getSource: () => vectorSource,
      };
      const olFactory = {
         createVectorSource: vi.fn(() => vectorSource),
         createVectorLayer: vi.fn(() => vectorLayer),
         createStyle: vi.fn(() => ({})),
         createStyleFill: vi.fn(() => ({})),
         createStyleStroke: vi.fn(() => ({})),
         createStyleCircle: vi.fn(() => ({})),
         createOverlay: vi.fn(() => ({})),
         createInteractionDraw: vi.fn(() => ({ on: vi.fn(), un: vi.fn() })),
         transformCoordinate: vi.fn((c: [number, number]) => c),
      };
      const viewer = {
         getOLFactory: () => olFactory,
         getProjection: () => new Projection({ code: "XY-M", units: "m" }),
         addOverlay: vi.fn(),
         removeOverlay: vi.fn(),
         addInteraction: vi.fn(),
         removeInteraction: vi.fn(),
         addHandler: vi.fn(),
         removeHandler: vi.fn(),
         getLayerManager: () => ({ addLayer: vi.fn(), removeLayer: vi.fn() }),
      } as any;
      const parent = {
         getCurrentDrawType: () => "LineString",
         getLocale: () => "en",
      } as any;

      const ctx = new MeasureContext(viewer, "MapC", parent);
      const line = new LineString([[0, 0], [3, 4]]);
      const [lineOut, lineTotal, lineSegs] = (ctx as any).formatLength(line);
      expect(lineOut).toContain("m");
      expect(lineTotal).toBeGreaterThan(0);
      expect(lineSegs?.length).toBe(1);

      const poly = new Polygon([[[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]]);
      const [areaOut, areaTotal, areaSegs] = (ctx as any).formatArea(poly);
      expect(areaOut).toContain("m");
      expect(areaTotal).toBeGreaterThan(0);
      expect((areaSegs?.length ?? 0)).toBeGreaterThan(0);
   });
});
