import { describe, it, expect, vi, beforeEach } from "vitest";

const stateRef = vi.hoisted(() => ({
   value: {} as any,
}));

vi.mock("../../src/components/map-providers/context", () => ({
   useAppState: (selector: (state: any) => any) => selector(stateRef.value),
}));

import {
   useActiveMapIsArbitraryCoordSys,
   useActiveMapMetersPerUnit,
   useActiveMapProjection,
   useActiveMapProjectionUnits,
   useActiveMapSessionId,
   useActiveMapCoordinateFormat,
} from "../../src/containers/hooks-mapguide";
import { useActiveMapSubjectLayer } from "../../src/containers/hooks-generic";
import {
   getActiveMapBranch,
   useActiveMapInitialExternalLayers,
   useIsContextMenuOpen,
} from "../../src/containers/hooks";

describe("hooks-mapguide and hooks-generic", () => {
   beforeEach(() => {
      stateRef.value = {
         config: {
            activeMapName: "Map1",
         },
         mapState: {
            Map1: {
               coordinateFormat: "DMS",
               initialExternalLayers: [{ name: "initial-layer" }],
               generic: {
                  subject: {
                     name: "subject",
                     meta: {
                        projection: "XY-FT",
                     },
                  },
               },
               mapguide: {
                  runtimeMap: {
                     SessionId: "ABC123",
                     CoordinateSystem: {
                        MentorCode: "XY-M",
                        EpsgCode: 3857,
                        MetersPerUnit: 1,
                     },
                  },
               },
            },
         },
         toolbar: {
            flyouts: {},
         },
      };
   });

   it("returns active map branch and subject layer", () => {
      const branch = getActiveMapBranch(stateRef.value);
      expect(branch).toBeTruthy();
      expect(branch?.coordinateFormat).toBe("DMS");

      const subject = useActiveMapSubjectLayer();
      expect(subject?.name).toBe("subject");
   });

   it("returns mapguide projection and meters-per-unit values", () => {
      expect(useActiveMapProjection()).toBe("EPSG:3857");
      expect(useActiveMapMetersPerUnit()).toBe(1);
      expect(useActiveMapSessionId()).toBe("ABC123");
      expect(useActiveMapCoordinateFormat()).toBe("DMS");
   });

   it("resolves arbitrary coordinate system flags and units", () => {
      expect(useActiveMapIsArbitraryCoordSys()).toBe(true);
      expect(useActiveMapProjectionUnits()).toBeDefined();
   });

   it("falls back to generic subject projection when runtime map is absent", () => {
      stateRef.value.mapState.Map1.mapguide = undefined;
      expect(useActiveMapProjection()).toBe("XY-FT");
      expect(useActiveMapProjectionUnits()).toBeDefined();
      expect(useActiveMapIsArbitraryCoordSys()).toBe(true);
   });

   it("returns defaults when there is no active map", () => {
      stateRef.value.config.activeMapName = undefined;
      expect(getActiveMapBranch(stateRef.value)).toBeUndefined();
      expect(useActiveMapSubjectLayer()).toBeUndefined();
      expect(useActiveMapProjection()).toBeUndefined();
      expect(useActiveMapCoordinateFormat()).toBeUndefined();
      expect(useActiveMapIsArbitraryCoordSys()).toBe(false);
      expect(useActiveMapInitialExternalLayers()).toEqual([]);
   });

   it("reports context menu open/closed based on toolbar flyout state", () => {
      expect(useIsContextMenuOpen()).toBe(false);
      stateRef.value.toolbar.flyouts["MapContextMenu"] = { open: true };
      expect(useIsContextMenuOpen()).toBe(true);
   });
});
