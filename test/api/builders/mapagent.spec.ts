import { beforeEach, describe, expect, it, vi } from "vitest";
import { MapAgentRequestBuilder } from "../../../src/api/builders/mapagent";

describe("api/builders/mapagent getResource", () => {
   beforeEach(() => {
      vi.restoreAllMocks();
      vi.clearAllMocks();
      (MapAgentRequestBuilder as any).siteVersionCache.clear();
   });

   it("uses GETRESOURCECONTENT VERSION=4.0.0 CLEAN=1 for ApplicationDefinition on 4.0+ and skips de-arrayification", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         // GETSITEVERSION (arrayified)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ SiteVersion: { Version: ["4.0.0.0"] } }),
         } as Response)
         // GETRESOURCECONTENT (clean, already de-arrayified)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               ApplicationDefinition: {
                  Title: "Clean Title",
                  TemplateUrl: "fusion/templates/mapguide/slate/index.html",
                  MapSet: { MapGroup: [] },
                  WidgetSet: [],
                  Extension: {},
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/mapagent.fcgi");
      const appDef = await builder.getResource<any>("Library://Samples/App.ApplicationDefinition", { SESSION: "S1" });

      expect(appDef.Title).toBe("Clean Title");
      expect(appDef.MapSet).toEqual({ MapGroup: [] });
      expect(fetchSpy).toHaveBeenCalledTimes(2);

      const siteVersionUrl = fetchSpy.mock.calls[0][0] as string;
      expect(siteVersionUrl).toContain("OPERATION=GETSITEVERSION");

      const appDefUrl = fetchSpy.mock.calls[1][0] as string;
      expect(appDefUrl).toContain("OPERATION=GETRESOURCECONTENT");
      expect(appDefUrl).toContain("RESOURCEID=Library://Samples/App.ApplicationDefinition");
      expect(appDefUrl).toContain("SESSION=S1");
      expect(appDefUrl).toContain("VERSION=4.0.0");
      expect(appDefUrl).toContain("CLEAN=1");
   });

   it("treats ApplicationDefinition resource id case-insensitively for CLEAN=1 path", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ SiteVersion: { Version: ["4.0.0.10202"] } }),
         } as Response)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               ApplicationDefinition: {
                  Title: "Clean Lowercase",
                  TemplateUrl: "fusion/templates/mapguide/slate/index.html",
                  MapSet: { MapGroup: [] },
                  WidgetSet: [],
                  Extension: {},
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/mapagent.fcgi");
      const appDef = await builder.getResource<any>("Library://Samples/App.applicationdefinition", { SESSION: "S1" });

      expect(appDef.Title).toBe("Clean Lowercase");
      expect(fetchSpy).toHaveBeenCalledTimes(2);
      const appDefUrl = fetchSpy.mock.calls[1][0] as string;
      expect(appDefUrl).toContain("VERSION=4.0.0");
      expect(appDefUrl).toContain("CLEAN=1");
   });

   it("uses legacy GETRESOURCECONTENT parameters for ApplicationDefinition on pre-4.0 servers", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         // GETSITEVERSION (arrayified)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ SiteVersion: { Version: ["3.1.0.0"] } }),
         } as Response)
         // GETRESOURCECONTENT (legacy arrayified appdef)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               ApplicationDefinition: {
                  Title: ["Legacy Title"],
                  TemplateUrl: ["fusion/templates/mapguide/slate/index.html"],
                  MapSet: [{ MapGroup: [] }],
                  WidgetSet: [],
                  Extension: null,
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/mapagent.fcgi");
      const appDef = await builder.getResource<any>("Library://Samples/App.ApplicationDefinition", { SESSION: "S1" });

      expect(appDef.Title).toBe("Legacy Title");
      expect(fetchSpy).toHaveBeenCalledTimes(2);

      const appDefUrl = fetchSpy.mock.calls[1][0] as string;
      expect(appDefUrl).toContain("OPERATION=GETRESOURCECONTENT");
      expect(appDefUrl).toContain("RESOURCEID=Library://Samples/App.ApplicationDefinition");
      expect(appDefUrl).toContain("SESSION=S1");
      expect(appDefUrl).toContain("VERSION=1.0.0");
      expect(appDefUrl).not.toContain("CLEAN=1");
   });

   it("does not probe site version for non-ApplicationDefinition resources", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               WebLayout: {
                  Title: ["WL"],
                  Map: [{ ResourceId: ["Library://Samples/Map.MapDefinition"] }],
                  EnablePingServer: ["false"],
                  SelectionColor: ["0x0000FFAA"],
                  PointSelectionBuffer: ["2"],
                  MapImageFormat: ["PNG"],
                  SelectionImageFormat: ["PNG8"],
                  StartupScript: [""],
                  ToolBar: [{ Visible: ["true"], Button: [] }],
                  InformationPane: [{ Visible: ["true"], Width: ["300"], LegendVisible: ["true"], PropertiesVisible: ["true"] }],
                  ContextMenu: [{ Visible: ["true"], MenuItem: [] }],
                  TaskPane: [{ Visible: ["true"], InitialTask: ["server/TaskPane.html"], Width: ["300"], TaskBar: [{ Visible: ["true"], Home: [{ Name: ["Home"], Tooltip: [""], Description: [""], ImageURL: [""], DisabledImageURL: [""] }], Forward: [{ Name: ["Fwd"], Tooltip: [""], Description: [""], ImageURL: [""], DisabledImageURL: [""] }], Back: [{ Name: ["Back"], Tooltip: [""], Description: [""], ImageURL: [""], DisabledImageURL: [""] }], Tasks: [{ Name: ["Tasks"], Tooltip: [""], Description: [""], ImageURL: [""], DisabledImageURL: [""] }], MenuButton: [] }] }],
                  StatusBar: [{ Visible: ["true"] }],
                  ZoomControl: [{ Visible: ["true"] }],
                  CommandSet: [{ Command: [] }],
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/mapagent.fcgi");
      const wl = await builder.getResource<any>("Library://Samples/App.WebLayout", { SESSION: "S1" });

      expect(wl.Title).toBe("WL");
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const wlUrl = fetchSpy.mock.calls[0][0] as string;
      expect(wlUrl).toContain("OPERATION=GETRESOURCECONTENT");
      expect(wlUrl).toContain("VERSION=1.0.0");
      expect(wlUrl).not.toContain("CLEAN=1");
   });

   it("caches and reuses GETSITEVERSION responses per agent uri", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         .mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ SiteVersion: { Version: ["4.0.0.0"] } }),
         } as Response);

      const builder1 = new MapAgentRequestBuilder("http://example.test/mapagent/cache.fcgi");
      const builder2 = new MapAgentRequestBuilder("http://example.test/mapagent/cache.fcgi");

      await expect(builder1.getSiteVersion()).resolves.toEqual({ Version: "4.0.0.0" });
      await expect(builder2.getSiteVersion()).resolves.toEqual({ Version: "4.0.0.0" });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const siteVersionUrl = fetchSpy.mock.calls[0][0] as string;
      expect(siteVersionUrl).toContain("OPERATION=GETSITEVERSION");
   });

   it("uses clean v4 runtime map creation and skips de-arrayification", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               RuntimeMap: {
                  Name: "Map1",
                  SessionId: "S1",
                  SiteVersion: "4.0.0.0",
                  BackgroundColor: "FF000000",
                  DisplayDpi: 96,
                  CoordinateSystem: { Wkt: "", MentorCode: "", EpsgCode: "4326", MetersPerUnit: 1 },
                  Extents: {
                     LowerLeftCoordinate: { X: 0, Y: 0 },
                     UpperRightCoordinate: { X: 100, Y: 100 },
                  },
                  Group: [],
                  Layer: [],
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/runtime-create.fcgi");
      const map = await builder.createRuntimeMap_v4({ mapDefinition: "Library://Samples/Sheboygan.MapDefinition", targetMapName: "Map1" } as any);

      expect(map.Name).toBe("Map1");
      expect(map.Group).toEqual([]);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const url = fetchSpy.mock.calls[0][0] as string;
      expect(url).toContain("OPERATION=CREATERUNTIMEMAP");
      expect(url).toContain("VERSION=4.0.0");
      expect(url).toContain("CLEAN=1");
   });

   it("uses clean v4 runtime map description and skips de-arrayification", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
         .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
               RuntimeMap: {
                  Name: "Map2",
                  SessionId: "S2",
                  SiteVersion: "4.0.0.0",
                  BackgroundColor: "FF000000",
                  DisplayDpi: 96,
                  CoordinateSystem: { Wkt: "", MentorCode: "", EpsgCode: "4326", MetersPerUnit: 1 },
                  Extents: {
                     LowerLeftCoordinate: { X: 0, Y: 0 },
                     UpperRightCoordinate: { X: 100, Y: 100 },
                  },
                  Group: [],
                  Layer: [],
               },
            }),
         } as Response);

      const builder = new MapAgentRequestBuilder("http://example.test/mapagent/runtime-describe.fcgi");
      const map = await builder.describeRuntimeMap_v4({ mapname: "Map2", requestedFeatures: 7 } as any);

      expect(map.Name).toBe("Map2");
      expect(map.Layer).toEqual([]);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const url = fetchSpy.mock.calls[0][0] as string;
      expect(url).toContain("OPERATION=DESCRIBERUNTIMEMAP");
      expect(url).toContain("VERSION=4.0.0");
      expect(url).toContain("CLEAN=1");
   });
});
