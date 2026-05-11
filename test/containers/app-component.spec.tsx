import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { App } from "../../src/containers/app";

const hooksMock = vi.hoisted(() => ({
   useInitError: vi.fn(),
   useInitErrorStack: vi.fn(),
   useInitErrorOptions: vi.fn(),
   useViewerLocale: vi.fn(),
   useActiveMapBranch: vi.fn(),
   useActiveMapName: vi.fn(),
   useViewerFeatureTooltipsEnabled: vi.fn(),
   useCustomAppSettings: vi.fn(),
   useConfiguredAgentUri: vi.fn(),
   useConfiguredAgentKind: vi.fn(),
}));

const urlStateMock = vi.hoisted(() => ({
   getStateFromUrl: vi.fn(),
   areStatesEqual: vi.fn(),
   updateUrl: vi.fn(),
}));

const mapProviderMock = vi.hoisted(() => ({
   useReduxDispatch: vi.fn(),
   useMapProviderContext: vi.fn(),
}));

const initActionsMock = vi.hoisted(() => ({
   initAppFromAppDef: vi.fn(),
   applyInitPayloadOverrides: vi.fn(),
   processAndDispatchInitError: vi.fn(),
}));

const templateActionsMock = vi.hoisted(() => ({
   setElementStates: vi.fn(),
}));

const layoutRegistryMock = vi.hoisted(() => ({
   getLayout: vi.fn(),
}));

const runtimeMock = vi.hoisted(() => ({
   setFusionRoot: vi.fn(),
}));

const i18nMock = vi.hoisted(() => ({
   tr: vi.fn(),
   DEFAULT_LOCALE: "en",
}));

const assetMock = vi.hoisted(() => ({
   getAssetRoot: vi.fn(),
}));

const loggerMock = vi.hoisted(() => ({
   debug: vi.fn(),
}));

const errorMock = vi.hoisted(() => ({
   Error: vi.fn(),
   normalizeStack: vi.fn(),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/url-state", () => urlStateMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderMock);
vi.mock("../../src/actions/init", () => initActionsMock);
vi.mock("../../src/actions/template", () => templateActionsMock);
vi.mock("../../src/api/registry/layout", () => layoutRegistryMock);
vi.mock("../../src/api/runtime", () => runtimeMock);
vi.mock("../../src/api/i18n", () => i18nMock);
vi.mock("../../src/utils/asset", () => assetMock);
vi.mock("../../src/utils/logger", () => loggerMock);

vi.mock("../../src/components/context", () => ({
   AppContextProvider: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="app-context">{children}</div>,
}));

vi.mock("../../src/components/elements/element-context", () => ({
   useElementContext: () => ({
      NonIdealState: ({ title, description }: { title?: string; description?: string }) => (
         <div data-testid="non-ideal-state">
            <span>{title}</span>
            <span>{description}</span>
         </div>
      ),
      Spinner: () => <div data-testid="spinner" />,
      Callout: ({ title, children }: React.PropsWithChildren<{ title?: string }>) => (
         <div data-testid="callout">
            <span>{title}</span>
            {children}
         </div>
      ),
   }),
}));

vi.mock("dompurify", () => ({
   default: {
      sanitize: (html: string) => html,
   },
}));

vi.mock("../../src/components/error", () => ({
   Error: (props: { error: unknown; errorRenderer?: (err: any) => JSX.Element }) => {
      if (props.errorRenderer && typeof props.error === "object" && props.error != null) {
         return <div data-testid="error-wrapper">{props.errorRenderer(props.error as any)}</div>;
      }
      return <div data-testid="error-wrapper">{String(props.error)}</div>;
   },
   normalizeStack: errorMock.normalizeStack,
}));

function setDefaultHookMocks() {
   hooksMock.useInitError.mockReturnValue(undefined);
   hooksMock.useInitErrorStack.mockReturnValue(false);
   hooksMock.useInitErrorOptions.mockReturnValue(undefined);
   hooksMock.useViewerLocale.mockReturnValue("en");
   hooksMock.useActiveMapBranch.mockReturnValue(undefined);
   hooksMock.useActiveMapName.mockReturnValue(undefined);
   hooksMock.useViewerFeatureTooltipsEnabled.mockReturnValue(undefined);
   hooksMock.useCustomAppSettings.mockReturnValue(undefined);
   hooksMock.useConfiguredAgentUri.mockReturnValue(undefined);
   hooksMock.useConfiguredAgentKind.mockReturnValue(undefined);
}

function makeMinimalInitCommand() {
   return {
      loadResourceAsync: vi.fn().mockResolvedValue({ kind: "appdef", appDef: {}, sessionOptions: {} }),
      attachClient: vi.fn(),
   };
}

describe("App", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      setDefaultHookMocks();

      const state = { config: {} };
      const dispatch = vi.fn((action: any): any => {
         if (typeof action === "function") {
            return action(dispatch, () => state);
         }
         return action;
      });
      mapProviderMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderMock.useMapProviderContext.mockReturnValue({ id: "viewer" });

      initActionsMock.initAppFromAppDef.mockReturnValue({ type: "FAKE_INIT_APP" });
      templateActionsMock.setElementStates.mockImplementation((states: unknown) => ({
         type: "SET_ELEMENT_STATES",
         payload: states,
      }));

      i18nMock.tr.mockImplementation((key: string, _locale?: string, args?: Record<string, unknown>) => {
         if (args?.layout) {
            return `${key}:${String(args.layout)}`;
         }
         if (args?.resourceId) {
            return `${key}:${String(args.resourceId)}`;
         }
         if (args?.sessionId) {
            return `${key}:${String(args.sessionId)}`;
         }
         return key;
      });
      assetMock.getAssetRoot.mockReturnValue("/assets");
      urlStateMock.areStatesEqual.mockReturnValue(false);
      errorMock.normalizeStack.mockReturnValue([]);
      layoutRegistryMock.getLayout.mockReturnValue(() => <div data-testid="layout-content">layout-content</div>);
   });

   it("initializes from URL state, applies element visibility and syncs URL state", async () => {
      const mapState = {
         currentView: { x: 10, y: 20, scale: 5000 },
         mapguide: {
            runtimeMap: {
               SessionId: "runtime-session",
               Group: [
                  { ObjectId: "g1", Name: "VisibleGroup" },
                  { ObjectId: "g2", Name: "HiddenGroup" },
               ],
               Layer: [
                  { ObjectId: "l1", Name: "VisibleLayer" },
                  { ObjectId: "l2", Name: "HiddenLayer" },
               ],
            },
            showGroups: ["g1"],
            hideGroups: ["g2"],
            showLayers: ["l1"],
            hideLayers: ["l2"],
         },
      };
      hooksMock.useActiveMapBranch.mockReturnValue(mapState);
      hooksMock.useActiveMapName.mockReturnValue("MainMap");
      hooksMock.useViewerFeatureTooltipsEnabled.mockReturnValue(true);
      hooksMock.useCustomAppSettings.mockReturnValue({ urlPropsIgnore: "x" });

      urlStateMock.getStateFromUrl
         .mockReturnValueOnce({
            locale: "fr",
            resource: "Library://FromUrl/Layout.WebLayout",
            session: "url-session",
            x: 1,
            y: 2,
            scale: 1000,
            map: "UrlMap",
            ft: false,
            sl: ["LayerA"],
            hl: ["LayerB"],
            sg: ["GroupA"],
            hg: ["GroupB"],
         })
         .mockReturnValue({ locale: "en", session: "existing-session" });

      const onInit = vi.fn();
      const mockAppDef = { WidgetSet: [], MapSet: { MapGroup: [] } };
      const mockInitCommand = {
         loadResourceAsync: vi.fn().mockResolvedValue({ kind: "appdef", appDef: mockAppDef, sessionOptions: {} }),
         attachClient: vi.fn(),
      };

      render(
         <App
            initCommand={mockInitCommand as any}
            layout="test-layout"
            resourceId="Library://FromProps/Layout.WebLayout"
            locale="en"
            appSettings={{ urlPropsIgnore: "x" }}
            urlPropsIgnore={["y"]}
            onInit={onInit}
            mapguide={{
               agentUri: "http://example.com/mapagent",
               fusionRoot: "/fusion",
               initialElementVisibility: {
                  taskpane: false,
                  legend: true,
                  selection: false,
               },
            }}
         />
      );

      await waitFor(() => {
         expect(screen.getByTestId("layout-content")).toBeTruthy();
      });

      expect(runtimeMock.setFusionRoot).toHaveBeenCalledWith("/fusion");
      expect(loggerMock.debug).toHaveBeenCalledWith("Asset root is: /assets");

      expect(templateActionsMock.setElementStates).toHaveBeenCalledWith({
         taskPaneVisible: false,
         legendVisible: true,
         selectionPanelVisible: false,
      });

      // loadResourceAsync is called with the full init options built from URL state + props
      expect(mockInitCommand.loadResourceAsync).toHaveBeenCalledTimes(1);
      expect(mockInitCommand.loadResourceAsync).toHaveBeenCalledWith(expect.objectContaining({
         resourceId: "Library://FromUrl/Layout.WebLayout",
         locale: "fr",
         session: "url-session",
         initialActiveMap: "UrlMap",
         featureTooltipsEnabled: false,
         initialView: { x: 1, y: 2, scale: 1000 },
         initialShowLayers: ["LayerA"],
         initialHideLayers: ["LayerB"],
         initialShowGroups: ["GroupA"],
         initialHideGroups: ["GroupB"],
      }));

      // For an AppDef resource, initAppFromAppDef is dispatched with the loaded appDef
      expect(initActionsMock.initAppFromAppDef).toHaveBeenCalledTimes(1);
      expect(initActionsMock.initAppFromAppDef).toHaveBeenCalledWith(
         mockInitCommand,
         {},             // sessionOptions from loadResourceAsync result
         mockAppDef,
         { id: "viewer" }
      );

      expect(urlStateMock.updateUrl).toHaveBeenCalledTimes(1);
      expect(urlStateMock.updateUrl).toHaveBeenCalledWith(
         expect.objectContaining({
            locale: "en",
            session: "runtime-session",
            map: "MainMap",
            ft: true,
            x: 10,
            y: 20,
            scale: 5000,
            sg: ["VisibleGroup"],
            hg: ["HiddenGroup"],
            sl: ["VisibleLayer"],
            hl: ["HiddenLayer"],
         }),
         undefined,
         ["y", "x"]
      );
   });

   it("renders loading placeholder while map is not ready", () => {
      render(
         <App
            initCommand={makeMinimalInitCommand() as any}
            layout="test-layout"
            resourceId="Library://Samples/Layout.WebLayout"
         />
      );

      expect(screen.getByTestId("non-ideal-state").textContent).toContain("INIT");
      expect(screen.getByTestId("non-ideal-state").textContent).toContain("INIT_DESC");
   });

   it("renders unregistered layout error when requested layout is missing", async () => {
      hooksMock.useActiveMapBranch.mockReturnValue({});
      layoutRegistryMock.getLayout.mockReturnValue(undefined);

      render(
         <App
            initCommand={makeMinimalInitCommand() as any}
            layout="missing-layout"
            resourceId="Library://Samples/Layout.WebLayout"
         />
      );

      await waitFor(() => {
         expect(screen.getByTestId("error-wrapper").textContent).toContain("ERR_UNREGISTERED_LAYOUT:missing-layout");
      });
   });

   it("renders mapped connection error content when init error is present", () => {
      hooksMock.useInitError.mockReturnValue({ message: "MgConnectionFailedException" });

      render(
         <App
            initCommand={makeMinimalInitCommand() as any}
            layout="test-layout"
            resourceId="Library://Samples/Layout.WebLayout"
         />
      );

      expect(screen.getByTestId("callout").textContent).toContain("INIT_ERROR_TITLE");
      expect(screen.getByTestId("callout").textContent).toContain("INIT_ERROR_NO_CONNECTION");
   });

   it("renders stack trace for default init error when includeStack is true", () => {
      hooksMock.useInitError.mockReturnValue({ message: "Unexpected error" });
      hooksMock.useInitErrorStack.mockReturnValue(true);
      errorMock.normalizeStack.mockReturnValue(["line 1", "line 2"]);

      render(
         <App
            initCommand={makeMinimalInitCommand() as any}
            layout="test-layout"
            resourceId="Library://Samples/Layout.WebLayout"
         />
      );

      expect(screen.getByText("Stack Trace")).toBeTruthy();
      expect(screen.getByText("line 1")).toBeTruthy();
      expect(screen.getByText("line 2")).toBeTruthy();
   });
});
