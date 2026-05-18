import { beforeEach, describe, expect, it, vi } from "vitest";
import { MapAgentRequestBuilder } from "../../../src/api/builders/mapagent";

describe("api/builders/mapagent getResource", () => {
   beforeEach(() => {
      vi.restoreAllMocks();
      vi.clearAllMocks();
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
});
