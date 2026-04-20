/**
 * Coverage tests for neo-map-viewer and quick-plot containers.
 */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";

const hooksMock = vi.hoisted(() => ({
   useActiveMapClientSelectionSet: vi.fn(),
   useConfiguredLoadIndicatorColor: vi.fn(),
   useConfiguredLoadIndicatorPositioning: vi.fn(),
   useCustomAppSettings: vi.fn(),
   useNamedMapLayers: vi.fn(),
   useViewerFlyouts: vi.fn(),
   useViewerSelectCanDragPan: vi.fn(),
   useActiveMapName: vi.fn(),
   useActiveMapView: vi.fn(),
   useActiveMapExternalBaseLayers: vi.fn(),
   useViewerLocale: vi.fn(),
   useAvailableMaps: vi.fn(),
   usePrevious: vi.fn(),
}));

const hooksMapGuideMock = vi.hoisted(() => ({
   useActiveMapState: vi.fn(),
}));

const mapProviderCtxMock = vi.hoisted(() => ({
   useMapProviderContext: vi.fn(),
   useReduxDispatch: vi.fn(),
}));

const mapProviderBaseMock = vi.hoisted(() => ({
   useViewerSideEffects: vi.fn(),
}));

const actionFlyoutMock = vi.hoisted(() => ({
   closeContextMenu: vi.fn(),
   openContextMenu: vi.fn(),
}));

const actionMapMock = vi.hoisted(() => ({
   setViewRotation: vi.fn(),
   setViewRotationEnabled: vi.fn(),
}));

const runtimeMock = vi.hoisted(() => ({
   getFusionRoot: vi.fn(),
}));

const loggerMock = vi.hoisted(() => ({
   debug: vi.fn(),
}));

const mapCapturerMock = vi.hoisted(() => ({
   MapCapturerContext: vi.fn().mockImplementation(() => ({
      getMapName: () => "Map1",
      activate: vi.fn(),
      updateBox: vi.fn(),
      deactivate: vi.fn(),
   })),
}));

const swipeMock = vi.hoisted(() => ({
   useIsMapSwipeActive: vi.fn(),
   useMapSwipeInfo: vi.fn(),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/hooks-mapguide", () => hooksMapGuideMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderCtxMock);
vi.mock("../../src/components/map-providers/base", () => mapProviderBaseMock);
vi.mock("../../src/actions/flyout", () => actionFlyoutMock);
vi.mock("../../src/actions/map", () => actionMapMock);
vi.mock("../../src/api/runtime", () => runtimeMock);
vi.mock("../../src/utils/logger", () => loggerMock);
vi.mock("../../src/containers/map-capturer-context", () => mapCapturerMock);

vi.mock("../../src/components/map-load-indicator", () => ({
   MapLoadIndicator: () => <div data-testid="load-indicator" />,
}));
vi.mock("../../src/containers/subscriber", () => ({
   Subscriber: () => <div data-testid="subscriber" />,
}));
vi.mock("../../src/components/map-viewer-swipe", () => ({
   MapSwipeControl: () => <div data-testid="swipe" />,
   useIsMapSwipeActive: swipeMock.useIsMapSwipeActive,
   useMapSwipeInfo: swipeMock.useMapSwipeInfo,
}));
vi.mock("../../src/components/map-providers/mapguide", () => ({
   isMapGuideProviderState: () => false,
}));
vi.mock("../../src/constants/assets", () => ({
   CURSOR_DIGITIZE_POINT: "point.cur",
   CURSOR_DIGITIZE_LINE: "line.cur",
   CURSOR_DIGITIZE_LINESTRING: "line-string.cur",
   CURSOR_DIGITIZE_RECT: "rect.cur",
   CURSOR_DIGITIZE_POLYGON: "poly.cur",
   CURSOR_DIGITIZE_CIRCLE: "circle.cur",
   CURSOR_GRABBING: "grabbing.cur",
   CURSOR_GRAB: "grab.cur",
   CURSOR_ZOOM_IN: "zoom.cur",
}));
vi.mock("../../src/constants", () => ({
   WEBLAYOUT_CONTEXTMENU: "WebLayout.ContextMenu",
}));
vi.mock("@blueprintjs/core", () => ({
   Position: { TOP: "top" },
   Toaster: React.forwardRef((_props: any, _ref: any) => <div data-testid="toaster" />),
}));
vi.mock("../../src/components/elements/element-context", () => ({
   TypedSelect: ({ items, value, onChange }: any) => (
      <select data-testid="typed-select" value={value} onChange={(e) => onChange(e.target.value)}>
         {items.map((i: any) => <option key={i.value} value={i.value}>{i.label}</option>)}
      </select>
   ),
   useElementContext: () => ({
      Slider: ({ value, onChange }: { value?: number; onChange?: (value: number) => void }) => (
         <input
            data-testid="slider"
            type="range"
            value={value}
            onChange={(e) => onChange?.(Number((e.target as HTMLInputElement).value))}
         />
      ),
      Callout: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="callout">{children}</div>,
      Button: ({ children }: React.PropsWithChildren<{}>) => <button>{children}</button>,
      Select: () => <select />,
      Toaster: React.forwardRef((_props: any, _ref: any) => <div data-testid="toaster" />),
   }),
}));
vi.mock("../../src/api/i18n", () => ({
   tr: (key: string) => key,
}));

import { MapViewer } from "../../src/containers/neo-map-viewer";
import { QuickPlotContainer } from "../../src/containers/quick-plot";

describe("neo-map-viewer and quick-plot", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      const dispatch = vi.fn();
      mapProviderCtxMock.useReduxDispatch.mockReturnValue(dispatch);

      hooksMock.useActiveMapClientSelectionSet.mockReturnValue(null);
      hooksMock.useConfiguredLoadIndicatorColor.mockReturnValue("#fff");
      hooksMock.useConfiguredLoadIndicatorPositioning.mockReturnValue("top-left");
      hooksMock.useCustomAppSettings.mockReturnValue({});
      hooksMock.useNamedMapLayers.mockReturnValue(undefined);
      hooksMock.useViewerFlyouts.mockReturnValue({});
      hooksMock.useViewerSelectCanDragPan.mockReturnValue(false);
      hooksMock.useActiveMapName.mockReturnValue("Map1");
      hooksMock.useActiveMapView.mockReturnValue(undefined);
      hooksMock.useActiveMapExternalBaseLayers.mockReturnValue([]);
      hooksMock.useViewerLocale.mockReturnValue("en");
      hooksMock.useAvailableMaps.mockReturnValue([{ name: "Map1", value: "Map1" }]);
      hooksMock.usePrevious.mockReturnValue(false);
      swipeMock.useIsMapSwipeActive.mockReturnValue(false);
      swipeMock.useMapSwipeInfo.mockReturnValue(undefined);

      hooksMapGuideMock.useActiveMapState.mockReturnValue(undefined);

      actionFlyoutMock.openContextMenu.mockImplementation(() => ({ type: "OPEN_CTX" }));
      actionFlyoutMock.closeContextMenu.mockImplementation(() => ({ type: "CLOSE_CTX" }));
      actionMapMock.setViewRotation.mockImplementation(() => ({ type: "SET_ROT" }));
      actionMapMock.setViewRotationEnabled.mockImplementation(() => ({ type: "SET_ROT_ENABLED" }));
      runtimeMock.getFusionRoot.mockReturnValue("/fusion");
   });

   function makeReadyViewerContext(options?: {
      isMouseOverTooltip?: boolean;
      activeTool?: any;
      isDigitizing?: boolean;
   }) {
      const selectedFeaturesClear = vi.fn();
      const apply = vi.fn();
      let apiRef: any;
      const context = {
         getHookFunction: () => () => ({
            isReady: true,
            mapName: "Map1",
            layers: [],
            initialExternalLayers: [],
            bgColor: "#abc",
            locale: "en",
         }),
         isReady: () => true,
         setToasterRef: vi.fn(),
         setProviderState: vi.fn(),
         getSelectedFeatures: () => ({ clear: selectedFeaturesClear }),
         onKeyDown: vi.fn(),
         attachToComponent: vi.fn((_node: HTMLElement, api: any) => { apiRef = api; }),
         detachFromComponent: vi.fn(),
         incrementBusyWorker: vi.fn(),
         decrementBusyWorker: vi.fn(),
         isMouseOverTooltip: () => options?.isMouseOverTooltip === true,
         getActiveTool: () => options?.activeTool,
         isDigitizing: () => options?.isDigitizing === true,
         getLayerManager: vi.fn(() => ({ apply })),
      };
      return { context, selectedFeaturesClear, apply, getApiRef: () => apiRef };
   }

   it("renders loading state for MapViewer when provider state is not ready", () => {
      mapProviderCtxMock.useMapProviderContext.mockReturnValue({
         getHookFunction: () => () => ({
            isReady: false,
            mapName: "Map1",
            layers: [],
            initialExternalLayers: [],
            locale: "en",
         }),
         isReady: () => false,
         setToasterRef: vi.fn(),
         setProviderState: vi.fn(),
         getSelectedFeatures: () => ({ clear: vi.fn() }),
         onKeyDown: vi.fn(),
         attachToComponent: vi.fn(),
         detachFromComponent: vi.fn(),
         incrementBusyWorker: vi.fn(),
         decrementBusyWorker: vi.fn(),
         isMouseOverTooltip: () => false,
         getActiveTool: () => undefined,
         isDigitizing: () => false,
         getLayerManager: () => ({ apply: vi.fn() }),
      });

      render(<MapViewer />);
      expect(screen.getByText("LOADING_MSG")).toBeTruthy();
      expect(mapProviderBaseMock.useViewerSideEffects).toHaveBeenCalled();
   });

   it("renders ready MapViewer, dispatches context menu and supports subscriber API", () => {
      const { context, selectedFeaturesClear, getApiRef } = makeReadyViewerContext({ activeTool: 2 });
      const dispatch = vi.fn();
      mapProviderCtxMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(context);

      const { container, unmount } = render(<MapViewer><div data-testid="child" /></MapViewer>);

      expect(screen.getByTestId("toaster")).toBeTruthy();
      expect(screen.getByTestId("load-indicator")).toBeTruthy();
      expect(screen.getByTestId("swipe")).toBeTruthy();
      expect(screen.getByTestId("child")).toBeTruthy();
      expect(context.attachToComponent).toHaveBeenCalled();
      expect(selectedFeaturesClear).toHaveBeenCalled();

      const viewerEl = container.querySelector(".map-viewer-component") as HTMLDivElement;
      expect(viewerEl).toBeTruthy();
      expect(viewerEl.style.cursor).toContain("grab.cur");

      fireEvent.mouseDown(viewerEl);
      expect(viewerEl.style.cursor).toContain("grabbing.cur");
      fireEvent.mouseUp(viewerEl);

      fireEvent.contextMenu(viewerEl, { clientX: 11, clientY: 22 });
      expect(actionFlyoutMock.openContextMenu).toHaveBeenCalledWith({ x: 11, y: 22 });
      expect(dispatch).toHaveBeenCalledWith({ type: "OPEN_CTX" });

      const api = getApiRef();
      expect(api).toBeTruthy();
      act(() => {
         const added = api.addSubscribers([{ name: "s1", appStateSelector: (s: any) => s, onNewState: () => undefined }]);
         expect(added).toEqual(["s1"]);
      });
      expect(screen.getByTestId("subscriber")).toBeTruthy();
      act(() => {
         api.addImageLoading();
         api.addImageLoaded();
      });
      expect(context.incrementBusyWorker).toHaveBeenCalled();
      expect(context.decrementBusyWorker).toHaveBeenCalled();

      unmount();
      expect(context.detachFromComponent).toHaveBeenCalled();
   });

   it("skips context menu opening when tooltip is active", () => {
      const { context } = makeReadyViewerContext({ isMouseOverTooltip: true });
      const dispatch = vi.fn();
      mapProviderCtxMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(context);

      const { container } = render(<MapViewer />);
      const viewerEl = container.querySelector(".map-viewer-component") as HTMLDivElement;
      fireEvent.contextMenu(viewerEl, { clientX: 1, clientY: 2 });
      expect(actionFlyoutMock.openContextMenu).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalledWith({ type: "OPEN_CTX" });
   });

   it("applies secondary map layers when swipe mode is active", () => {
      swipeMock.useIsMapSwipeActive.mockReturnValue(true);
      swipeMock.useMapSwipeInfo.mockReturnValue({ pair: { secondaryMapName: "Secondary" } });
      hooksMock.useNamedMapLayers.mockReturnValue([{ id: "L1" }]);

      const { context, apply } = makeReadyViewerContext();
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(context);

      render(<MapViewer />);
      expect(context.getLayerManager).toHaveBeenCalledWith("Secondary");
      expect(apply).toHaveBeenCalledWith([{ id: "L1" }]);
   });

   it("renders noscript for QuickPlotContainer when viewer or map/view is unavailable", () => {
      mapProviderCtxMock.useMapProviderContext.mockReturnValue({
         isReady: () => false,
      });
      hooksMapGuideMock.useActiveMapState.mockReturnValue(undefined);
      hooksMock.useActiveMapView.mockReturnValue(undefined);

      const { container } = render(<QuickPlotContainer />);
      expect(container.querySelector("noscript")).toBeTruthy();
   });

   it("renders QuickPlot form and toggles advanced capture mode", () => {
      const dispatch = vi.fn();
      mapProviderCtxMock.useReduxDispatch.mockReturnValue(dispatch);
      const viewer = {
         isReady: () => true,
         getSize: () => [800, 600],
         getCurrentExtent: () => [1, 2, 3, 4],
         toastPrimary: vi.fn(),
      };
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(viewer);
      hooksMapGuideMock.useActiveMapState.mockReturnValue({ SessionId: "S1", Name: "Map1" });
      hooksMock.useActiveMapView.mockReturnValue({ scale: 2500 });
      hooksMock.useActiveMapExternalBaseLayers.mockReturnValue([{ kind: "XYZ" }]);
      hooksMock.useAvailableMaps.mockReturnValue([{ name: "Map1", value: "Map1" }]);
      hooksMock.useActiveMapName.mockReturnValue("Map1");

      const { container, unmount } = render(<QuickPlotContainer />);

      expect(container.querySelector(".component-quick-plot")).toBeTruthy();
      expect(container.querySelector("input[name='sessionId']")?.getAttribute("value")).toBe("S1");
      expect(container.querySelector("input[name='mapName']")?.getAttribute("value")).toBe("Map1");
      expect(screen.getByTestId("callout").textContent).toContain("QUICKPLOT_COMMERCIAL_LAYER_WARNING");

      const adv = container.querySelector("#AdvancedOptionsCheckBox") as HTMLInputElement;
      fireEvent.click(adv);

      expect(mapCapturerMock.MapCapturerContext).toHaveBeenCalled();
      const capInstance = (mapCapturerMock.MapCapturerContext as any).mock.results[0].value;
      expect(capInstance.activate).toHaveBeenCalled();
      expect(capInstance.updateBox).toHaveBeenCalled();
      expect(actionMapMock.setViewRotationEnabled).toHaveBeenCalledWith(false);
      expect(actionMapMock.setViewRotation).toHaveBeenCalledWith(0);
      expect(viewer.toastPrimary).toHaveBeenCalled();

      unmount();
      expect(capInstance.deactivate).toHaveBeenCalled();
   });

   it("applies digitizing and zoom cursor variants", () => {
      const { context, getApiRef } = makeReadyViewerContext({ isDigitizing: true });
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(context);

      const { container, rerender } = render(<MapViewer />);
      const viewerEl = container.querySelector(".map-viewer-component") as HTMLDivElement;
      const api = getApiRef();

      const cursorCases = [
         ["Point", "point.cur"],
         ["Line", "line.cur"],
         ["LineString", "line-string.cur"],
         ["Rectangle", "rect.cur"],
         ["Polygon", "poly.cur"],
         ["Circle", "circle.cur"],
      ] as Array<[string, string]>;
      for (const [shape, cursor] of cursorCases) {
         act(() => {
            api.setDigitizingType(shape);
         });
         expect(viewerEl.style.cursor).toContain(cursor);
      }

      const zoomContext = makeReadyViewerContext({ activeTool: 0 }).context;
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(zoomContext);
      rerender(<MapViewer />);
      expect((container.querySelector(".map-viewer-component") as HTMLDivElement).style.cursor).toContain("zoom.cur");
   });

   it("disables cursor styling when DISABLE_CURSORS app setting is enabled", () => {
      hooksMock.useCustomAppSettings.mockReturnValue({ DISABLE_CURSORS: "1" });
      const { context } = makeReadyViewerContext({ activeTool: 2 });
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(context);

      const { container } = render(<MapViewer />);
      const viewerEl = container.querySelector(".map-viewer-component") as HTMLDivElement;
      expect(viewerEl.style.cursor).toBe("");
   });

   it("handles quick-plot field changes and advanced option updates", async () => {
      const dispatch = vi.fn();
      mapProviderCtxMock.useReduxDispatch.mockReturnValue(dispatch);
      const viewer = {
         isReady: () => true,
         getSize: () => [1024, 768],
         getCurrentExtent: () => [10, 20, 30, 40],
         toastPrimary: vi.fn(),
      };
      mapProviderCtxMock.useMapProviderContext.mockReturnValue(viewer);
      hooksMapGuideMock.useActiveMapState.mockReturnValue({ SessionId: "S1", Name: "Map1" });
      hooksMock.useActiveMapView.mockReturnValue({ scale: 5000 });
      hooksMock.useActiveMapExternalBaseLayers.mockReturnValue([{ kind: "UTFGrid" }]);
      hooksMock.useAvailableMaps.mockReturnValue([{ name: "Map1", value: "Map1" }]);
      hooksMock.useActiveMapName.mockReturnValue("Map1");

      const { container } = render(<QuickPlotContainer />);

      fireEvent.change(container.querySelector("#title") as HTMLInputElement, { target: { value: "My Title" } });
      fireEvent.change(container.querySelector("#subtitle") as HTMLInputElement, { target: { value: "My Subtitle" } });
      expect((container.querySelector("#title") as HTMLInputElement).value).toBe("My Title");
      expect((container.querySelector("#subtitle") as HTMLInputElement).value).toBe("My Subtitle");

      fireEvent.click(container.querySelector("#ShowLegendCheckBox") as HTMLInputElement);
      fireEvent.click(container.querySelector("#ShowNorthArrowCheckBox") as HTMLInputElement);
      fireEvent.click(container.querySelector("#ShowCoordinatesCheckBox") as HTMLInputElement);
      fireEvent.click(container.querySelector("#ShowScaleBarCheckBox") as HTMLInputElement);
      fireEvent.click(container.querySelector("#ShowDisclaimerCheckBox") as HTMLInputElement);

      const advanced = container.querySelector("#AdvancedOptionsCheckBox") as HTMLInputElement;
      fireEvent.click(advanced);

      const selects = screen.getAllByTestId("typed-select");
      fireEvent.change(selects[0], { target: { value: "297.0,420.0,A3" } });
      fireEvent.change(selects[1], { target: { value: "L" } });
      fireEvent.change(selects[2], { target: { value: "1000" } });
      fireEvent.change(selects[3], { target: { value: "300" } });
      fireEvent.change(screen.getByTestId("slider"), { target: { value: "15" } });

      await waitFor(() => {
         expect(actionMapMock.setViewRotationEnabled).toHaveBeenCalledWith(false);
      });
      expect((container.querySelector("#rotation") as HTMLInputElement).value).toBe("-15");
   });
});
