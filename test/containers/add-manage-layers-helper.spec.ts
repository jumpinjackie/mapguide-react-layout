import { describe, it, expect, vi } from "vitest";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { zoomToLayerExtents } from "../../src/containers/add-manage-layers";

describe("zoomToLayerExtents", () => {
   it("zooms to transformed WGS84 bounds when layer has bbox metadata", () => {
      const zoomToExtent = vi.fn();
      const layer = {
         get: vi.fn(() => [-72, 45, -71, 46]),
      };
      const viewer = {
         getLayerManager: () => ({ getLayer: () => layer }),
         getProjection: () => "EPSG:3857",
         zoomToExtent,
      } as any;

      zoomToLayerExtents("LayerA", viewer);
      expect(zoomToExtent).toHaveBeenCalled();
   });

   it("warns instead of zooming when vector source extent is invalid", () => {
      const zoomToExtent = vi.fn();
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
      const vector = new VectorLayer({
         source: new VectorSource(),
      });
      const viewer = {
         getLayerManager: () => ({ getLayer: () => vector }),
         getProjection: () => "EPSG:3857",
         zoomToExtent,
      } as any;

      zoomToLayerExtents("EmptyVector", viewer);
      expect(zoomToExtent).not.toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
   });
});
