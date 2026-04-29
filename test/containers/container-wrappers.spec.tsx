/**
 * Coverage tests for container wrappers under src/containers.
 */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const hooksMock = vi.hoisted(() => ({
   useActiveMapName: vi.fn(),
   useViewerLocale: vi.fn(),
   useActiveMapExternalBaseLayers: vi.fn(),
   useCurrentMouseCoordinates: vi.fn(),
   useReducedToolbarAppState: vi.fn(),
   useViewerFlyouts: vi.fn(),
   useInitWarnings: vi.fn(),
   useActiveMapView: vi.fn(),
   useViewerBusyCount: vi.fn(),
   useAvailableMaps: vi.fn(),
   useActiveMapSelectionSet: vi.fn(),
   useActiveMapClientSelectionSet: vi.fn(),
   useTaskPaneInitialUrl: vi.fn(),
   useTaskPaneLastUrlPushed: vi.fn(),
   useTaskPaneNavigationIndex: vi.fn(),
   useTaskPaneNavigationStack: vi.fn(),
   useConfiguredCapabilities: vi.fn(),
   useActiveMapBranch: vi.fn(),
   useViewerIsStateless: vi.fn(),
   useActiveMapLayers: vi.fn(),
   useConfiguredCoordinateProjection: vi.fn(),
   useConfiguredCoordinateDecimals: vi.fn(),
   useConfiguredCoordinateFormat: vi.fn(),
}));

const hooksMapGuideMock = vi.hoisted(() => ({
   useActiveMapProjection: vi.fn(),
   useActiveMapCoordinateFormat: vi.fn(),
   useActiveMapState: vi.fn(),
   useActiveMapShowGroups: vi.fn(),
   useActiveMapShowLayers: vi.fn(),
   useActiveMapHideGroups: vi.fn(),
   useActiveMapHideLayers: vi.fn(),
   useActiveMapExpandedGroups: vi.fn(),
   useActiveMapSelectableLayers: vi.fn(),
   useActiveMapFiniteScales: vi.fn(),
}));

const mapProviderMock = vi.hoisted(() => ({
   useReduxDispatch: vi.fn(),
   useMapProviderContext: vi.fn(),
   useAppState: vi.fn(),
}));

const actionMapMock = vi.hoisted(() => ({
   setBaseLayer: vi.fn(),
   activateMap: vi.fn(),
   setScale: vi.fn(),
   invokeCommand: vi.fn(),
}));

const actionLegendMock = vi.hoisted(() => ({
   setGroupVisibility: vi.fn(),
   setLayerVisibility: vi.fn(),
   setLayerSelectable: vi.fn(),
   setGroupExpanded: vi.fn(),
   refresh: vi.fn(),
}));

const actionFlyoutMock = vi.hoisted(() => ({
   closeFlyout: vi.fn(),
   openFlyout: vi.fn(),
   openComponent: vi.fn(),
   closeComponent: vi.fn(),
}));

const actionTaskPaneMock = vi.hoisted(() => ({
   goHome: vi.fn(),
   goForward: vi.fn(),
   goBack: vi.fn(),
   pushUrl: vi.fn(),
}));

const actionInitMock = vi.hoisted(() => ({
   acknowledgeInitWarnings: vi.fn(),
}));

const componentsMock = vi.hoisted(() => ({
   BaseLayerSwitcher: vi.fn(),
   FlyoutRegion: vi.fn(),
   MapMenu: vi.fn(),
   ScaleDisplay: vi.fn(),
   Navigator: vi.fn(),
   SelectedFeatureCount: vi.fn(),
   TaskPane: vi.fn(),
   Toolbar: vi.fn(),
   Legend: vi.fn(),
   MouseCoordinates: vi.fn(),
}));

const selectionCountMock = vi.hoisted(() => ({
   countSelection: vi.fn(),
}));

const commandRegistryMock = vi.hoisted(() => ({
   mapToolbarReference: vi.fn(),
   getCommand: vi.fn(),
   DefaultCommands: {
      ZoomIn: "ZoomIn",
      ZoomOut: "ZoomOut",
      PanRight: "PanRight",
      PanLeft: "PanLeft",
      PanUp: "PanUp",
      PanDown: "PanDown",
   },
}));

const menuUtilsMock = vi.hoisted(() => ({
   processMenuItems: vi.fn(),
}));

const i18nMock = vi.hoisted(() => ({
   tr: vi.fn(),
}));

const unitMock = vi.hoisted(() => ({
   getUnitOfMeasure: vi.fn(),
}));

const urlMock = vi.hoisted(() => ({
   areUrlsSame: vi.fn(),
   ensureParameters: vi.fn(),
}));

const olProjMock = vi.hoisted(() => ({
   get: vi.fn(),
   transform: vi.fn(),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/hooks-mapguide", () => hooksMapGuideMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderMock);

vi.mock("../../src/actions/map", () => actionMapMock);
vi.mock("../../src/actions/legend", () => actionLegendMock);
vi.mock("../../src/actions/flyout", () => actionFlyoutMock);
vi.mock("../../src/actions/taskpane", () => actionTaskPaneMock);
vi.mock("../../src/actions/init", () => actionInitMock);

vi.mock("../../src/components/base-layer-switcher", () => ({
   BaseLayerSwitcher: (props: any) => {
      componentsMock.BaseLayerSwitcher(props);
      return <button data-testid="base-layer-switcher" onClick={() => props.onBaseLayerChanged("BaseA")} />;
   },
}));
vi.mock("../../src/components/flyout-region", () => ({
   FlyoutRegion: (props: any) => {
      componentsMock.FlyoutRegion(props);
      return <button data-testid="flyout-region" onClick={() => props.onCloseFlyout("f1")} />;
   },
}));
vi.mock("../../src/components/map-menu", () => ({
   MapMenu: (props: any) => {
      componentsMock.MapMenu(props);
      return <button data-testid="map-menu" onClick={() => props.onActiveMapChanged("MapB")} />;
   },
}));
vi.mock("../../src/components/scale-display", () => ({
   ScaleDisplay: (props: any) => {
      componentsMock.ScaleDisplay(props);
      return <button data-testid="scale-display" onClick={() => props.onScaleChanged(9000)} />;
   },
}));
vi.mock("../../src/components/navigator", async () => {
   const actual = await vi.importActual<any>("../../src/components/navigator");
   return {
      ...actual,
      Navigator: (props: any) => {
         componentsMock.Navigator(props);
         return (
            <div>
               <button data-testid="nav-zoom-in" onClick={() => props.onZoom(actual.ZoomDirection.In)} />
               <button data-testid="nav-pan-east" onClick={() => props.onPan(actual.PanDirection.East)} />
               <button data-testid="nav-scale" onClick={() => props.onRequestZoomToScale(777)} />
            </div>
         );
      },
   };
});
vi.mock("../../src/components/selected-feature-count", () => ({
   SelectedFeatureCount: (props: any) => {
      componentsMock.SelectedFeatureCount(props);
      return <div data-testid="selected-feature-count" />;
   },
}));
vi.mock("../../src/components/task-pane", () => ({
   TASK_PANE_OVERLAY_BGCOLOR: "rgba(0,0,0,0.1)",
   TaskPane: (props: any) => {
      componentsMock.TaskPane(props);
      return <button data-testid="task-pane" onClick={() => props.onUrlLoaded("http://changed")}/>;
   },
}));
vi.mock("../../src/components/toolbar", () => ({
   DEFAULT_TOOLBAR_SIZE: 36,
   Toolbar: (props: any) => {
      componentsMock.Toolbar(props);
      return <div data-testid="toolbar" />;
   },
}));
vi.mock("../../src/components/legend", () => ({
   Legend: (props: any) => {
      componentsMock.Legend(props);
      return (
         <div>
            <button data-testid="legend-base" onClick={() => props.onBaseLayerChanged("BaseX")} />
            <button data-testid="legend-group-visible" onClick={() => props.onGroupVisibilityChanged("G1", true)} />
         </div>
      );
   },
}));
vi.mock("../../src/components/mouse-coordinates", () => ({
   MouseCoordinates: (props: any) => {
      componentsMock.MouseCoordinates(props);
      return <div data-testid="mouse-coordinates" />;
   },
}));

vi.mock("../../src/api/selection-count", () => selectionCountMock);
vi.mock("../../src/api/registry/command", () => commandRegistryMock);
vi.mock("../../src/utils/menu", () => menuUtilsMock);
vi.mock("../../src/api/i18n", () => i18nMock);
vi.mock("../../src/utils/units", () => unitMock);
vi.mock("../../src/utils/url", () => urlMock);
vi.mock("ol/proj", () => olProjMock);

vi.mock("../../src/components/context", () => ({
   AppContext: React.createContext({
      getLegendLayerExtraIconsProvider: () => [],
      getLegendGroupExtraIconsProvider: () => [],
   }),
}));

vi.mock("../../src/components/elements/element-context", () => ({
   useElementContext: () => ({
      Button: ({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) => <button data-testid="ctx-btn" onClick={onClick}>{children}</button>,
      Callout: ({ children, title }: React.PropsWithChildren<{ title?: string }>) => <div data-testid="callout">{title}{children}</div>,
      Card: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="card">{children}</div>,
      Heading: ({ children, level }: React.PropsWithChildren<{ level: number }>) => React.createElement(`h${level}`, {}, children),
      NonIdealState: ({ description }: { description?: string }) => <div data-testid="non-ideal-state">{description}</div>,
      Dialog: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="dialog">{children}</div>,
      DialogBody: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="dialog-body">{children}</div>,
      DialogFooter: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="dialog-footer">{children}</div>,
      DialogFooterActions: ({ children }: React.PropsWithChildren<{}>) => <div data-testid="dialog-footer-actions">{children}</div>,
   }),
}));

import { BaseLayerSwitcherContainer } from "../../src/containers/base-layer-switcher";
import { CoordinateTrackerContainer } from "../../src/containers/coordinate-tracker";
import { FlyoutRegionContainer } from "../../src/containers/flyout-region";
import { InitWarningDisplay } from "../../src/containers/init-warning-display";
import { LegendContainer } from "../../src/containers/legend";
import { MapMenuContainer } from "../../src/containers/map-menu";
import { MouseCoordinatesContainer } from "../../src/containers/mouse-coordinates";
import { NavigatorContainer } from "../../src/containers/navigator";
import { ScaleDisplayContainer } from "../../src/containers/scale-display";
import { SelectedFeatureCountContainer } from "../../src/containers/selected-feature-count";
import { Subscriber } from "../../src/containers/subscriber";
import { TaskPaneContainer } from "../../src/containers/task-pane";
import { ToolbarContainer } from "../../src/containers/toolbar";

describe("container wrappers", () => {
   beforeEach(() => {
      vi.clearAllMocks();

      const dispatch = vi.fn();
      mapProviderMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderMock.useMapProviderContext.mockReturnValue({ id: "viewer" });
      mapProviderMock.useAppState.mockImplementation((selector: (s: any) => any) => selector({
         toolbar: {
            flyouts: { f1: { open: true, metrics: { x: 1, y: 2 } } },
            toolbars: {
               Main: {
                  items: [{ id: "ZoomIn" }],
               },
            },
         },
      }));

      hooksMock.useActiveMapName.mockReturnValue("Map1");
      hooksMock.useViewerLocale.mockReturnValue("en");
      hooksMock.useActiveMapExternalBaseLayers.mockReturnValue([{ name: "BaseA" }]);
      hooksMock.useCurrentMouseCoordinates.mockReturnValue([1, 2]);
      hooksMock.useReducedToolbarAppState.mockReturnValue({});
      hooksMock.useViewerFlyouts.mockReturnValue({
         f1: { open: true, metrics: { x: 10, y: 20 } },
      });
      hooksMock.useInitWarnings.mockReturnValue(["w1"]);
      hooksMock.useActiveMapView.mockReturnValue({ scale: 1000 });
      hooksMock.useViewerBusyCount.mockReturnValue(0);
      hooksMock.useAvailableMaps.mockReturnValue([{ name: "Map A", value: "MapA" }]);
      hooksMock.useActiveMapSelectionSet.mockReturnValue({ FeatureSet: {} });
      hooksMock.useActiveMapClientSelectionSet.mockReturnValue(null);
      hooksMock.useTaskPaneInitialUrl.mockReturnValue("http://home");
      hooksMock.useTaskPaneLastUrlPushed.mockReturnValue("http://last");
      hooksMock.useTaskPaneNavigationIndex.mockReturnValue(0);
      hooksMock.useTaskPaneNavigationStack.mockReturnValue(["http://home"]);
      hooksMock.useConfiguredCapabilities.mockReturnValue({ hasTaskBar: true });
      hooksMock.useActiveMapBranch.mockReturnValue({ mapguide: { runtimeMap: { SessionId: "S1", Name: "Map1" } } });
      hooksMock.useViewerIsStateless.mockReturnValue(false);
      hooksMock.useActiveMapLayers.mockReturnValue([]);
      hooksMock.useConfiguredCoordinateProjection.mockReturnValue("EPSG:4326");
      hooksMock.useConfiguredCoordinateDecimals.mockReturnValue(3);
      hooksMock.useConfiguredCoordinateFormat.mockReturnValue("XY");

      hooksMapGuideMock.useActiveMapProjection.mockReturnValue("EPSG:3857");
      hooksMapGuideMock.useActiveMapCoordinateFormat.mockReturnValue(undefined);
      hooksMapGuideMock.useActiveMapState.mockReturnValue({ id: "map" });
      hooksMapGuideMock.useActiveMapShowGroups.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapShowLayers.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapHideGroups.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapHideLayers.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapExpandedGroups.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapSelectableLayers.mockReturnValue([]);
      hooksMapGuideMock.useActiveMapFiniteScales.mockReturnValue([500, 1000]);

      actionMapMock.setBaseLayer.mockImplementation((m: string, l: string) => ({ type: "SET_BASE", payload: { m, l } }));
      actionMapMock.activateMap.mockImplementation((m: string) => ({ type: "ACTIVATE_MAP", payload: m }));
      actionMapMock.setScale.mockImplementation((v: unknown, m: string, s: number) => ({ type: "SET_SCALE", payload: { v, m, s } }));
      actionMapMock.invokeCommand.mockImplementation((c: unknown) => ({ type: "INVOKE", payload: c }));

      actionLegendMock.setGroupVisibility.mockImplementation(() => ({ type: "LEGEND_GROUP_VIS" }));
      actionLegendMock.setLayerVisibility.mockImplementation(() => ({ type: "LEGEND_LAYER_VIS" }));
      actionLegendMock.setLayerSelectable.mockImplementation(() => ({ type: "LEGEND_LAYER_SEL" }));
      actionLegendMock.setGroupExpanded.mockImplementation(() => ({ type: "LEGEND_GROUP_EXP" }));
      actionLegendMock.refresh.mockImplementation(() => ({ type: "LEGEND_REFRESH" }));

      actionFlyoutMock.closeFlyout.mockImplementation((id: string) => ({ type: "CLOSE_FLYOUT", payload: id }));
      actionFlyoutMock.openFlyout.mockImplementation((id: string) => ({ type: "OPEN_FLYOUT", payload: id }));
      actionFlyoutMock.openComponent.mockImplementation((id: string) => ({ type: "OPEN_COMPONENT", payload: id }));
      actionFlyoutMock.closeComponent.mockImplementation((id: string) => ({ type: "CLOSE_COMPONENT", payload: id }));

      actionTaskPaneMock.goHome.mockImplementation(() => ({ type: "GO_HOME" }));
      actionTaskPaneMock.goForward.mockImplementation(() => ({ type: "GO_FORWARD" }));
      actionTaskPaneMock.goBack.mockImplementation(() => ({ type: "GO_BACK" }));
      actionTaskPaneMock.pushUrl.mockImplementation((u: string) => ({ type: "PUSH_URL", payload: u }));

      actionInitMock.acknowledgeInitWarnings.mockImplementation(() => ({ type: "ACK_WARNINGS" }));

      commandRegistryMock.mapToolbarReference.mockImplementation((tb: any) => ({ ...tb, mapped: true }));
      commandRegistryMock.getCommand.mockImplementation((name: string) => ({ name }));
      menuUtilsMock.processMenuItems.mockImplementation((items: any[]) => items);

      i18nMock.tr.mockImplementation((key: string) => key);
      selectionCountMock.countSelection.mockReturnValue({ layers: 1, features: 2 });
      unitMock.getUnitOfMeasure.mockReturnValue({ abbreviation: () => "m" });
      urlMock.areUrlsSame.mockImplementation((a: string, b: string) => a === b);
      urlMock.ensureParameters.mockImplementation((u: string) => u);

      olProjMock.get.mockReturnValue({ getUnits: () => "m" });
      olProjMock.transform.mockImplementation((coords: [number, number]) => coords);
   });

   it("covers BaseLayerSwitcherContainer wiring", () => {
      render(<BaseLayerSwitcherContainer />);
      fireEvent.click(screen.getByTestId("base-layer-switcher"));
      expect(actionMapMock.setBaseLayer).toHaveBeenCalledWith("Map1", "BaseA");
   });

   it("covers CoordinateTrackerContainer projection and error branch", () => {
      const { rerender } = render(<CoordinateTrackerContainer projections={["EPSG:4326"]} />);
      expect(screen.getAllByTestId("card").length).toBe(1);

      rerender(<CoordinateTrackerContainer projections={[]} />);
      expect(screen.getByTestId("callout").textContent).toContain("COORDTRACKER_NO_PROJECTIONS");
   });

   it("covers FlyoutRegionContainer preparation and close callback", () => {
      hooksMock.useViewerFlyouts.mockReturnValue({
         f1: { open: true, metrics: { x: 1, y: 2 } },
         f2: { componentName: "Custom", open: false },
      });
      render(<FlyoutRegionContainer />);
      fireEvent.click(screen.getByTestId("flyout-region"));
      expect(actionFlyoutMock.closeFlyout).toHaveBeenCalledWith("f1");
      expect(commandRegistryMock.mapToolbarReference).toHaveBeenCalled();
   });

   it("covers InitWarningDisplay dialog and no-warning branch", () => {
      const { container, rerender } = render(<InitWarningDisplay />);
      expect(screen.getByTestId("dialog")).toBeTruthy();
      fireEvent.click(screen.getAllByTestId("ctx-btn")[0]);
      expect(actionInitMock.acknowledgeInitWarnings).toHaveBeenCalled();

      hooksMock.useInitWarnings.mockReturnValue([]);
      rerender(<InitWarningDisplay />);
      expect(container.querySelector("noscript")).toBeTruthy();
   });

   it("covers LegendContainer render and callback dispatch", () => {
      render(<LegendContainer inlineBaseLayerSwitcher maxHeight={400} />);
      fireEvent.click(screen.getByTestId("legend-base"));
      fireEvent.click(screen.getByTestId("legend-group-visible"));
      expect(actionMapMock.setBaseLayer).toHaveBeenCalledWith("Map1", "BaseX");
      expect(actionLegendMock.setGroupVisibility).toHaveBeenCalled();
   });

   it("covers MapMenuContainer mapping and callback", () => {
      render(<MapMenuContainer />);
      fireEvent.click(screen.getByTestId("map-menu"));
      expect(actionMapMock.activateMap).toHaveBeenCalledWith("MapB");
      expect(componentsMock.MapMenu).toHaveBeenCalledWith(expect.objectContaining({
         selectedMap: "Map1",
         locale: "en",
         maps: [{ label: "Map A", mapName: "MapA" }],
      }));
   });

   it("covers MouseCoordinatesContainer render and empty branch", () => {
      const { rerender } = render(<MouseCoordinatesContainer style={{ width: 10 }} />);
      expect(screen.getByTestId("mouse-coordinates")).toBeTruthy();

      hooksMock.useCurrentMouseCoordinates.mockReturnValue(undefined);
      rerender(<MouseCoordinatesContainer />);
      expect(screen.queryByTestId("mouse-coordinates")).toBeNull();
   });

   it("covers NavigatorContainer command and scale dispatch", async () => {
      const { ZoomDirection, PanDirection } = await import("../../src/components/navigator");
      render(<NavigatorContainer style={{ width: 20 }} />);
      const navProps = componentsMock.Navigator.mock.calls[0][0];
      navProps.onZoom(ZoomDirection.In);
      navProps.onPan(PanDirection.East);
      navProps.onRequestZoomToScale(777);
      expect(actionMapMock.invokeCommand).toHaveBeenCalled();
      expect(actionMapMock.setScale).toHaveBeenCalledWith({ id: "viewer" }, "Map1", 777);
   });

   it("covers ScaleDisplayContainer render and noscript branch", () => {
      const { container, rerender } = render(<ScaleDisplayContainer />);
      fireEvent.click(screen.getByTestId("scale-display"));
      expect(actionMapMock.setScale).toHaveBeenCalledWith({ id: "viewer" }, "Map1", 9000);

      hooksMock.useActiveMapView.mockReturnValue(undefined);
      rerender(<ScaleDisplayContainer />);
      expect(container.querySelector("noscript")).toBeTruthy();
   });

   it("covers SelectedFeatureCountContainer summary and empty branch", () => {
      const { rerender } = render(<SelectedFeatureCountContainer />);
      expect(screen.getByTestId("selected-feature-count")).toBeTruthy();

      selectionCountMock.countSelection.mockReturnValue(undefined);
      rerender(<SelectedFeatureCountContainer />);
      expect(screen.queryByTestId("selected-feature-count")).toBeNull();
   });

   it("covers Subscriber effect and rendered marker", () => {
      mapProviderMock.useAppState.mockReturnValue(123);
      const onNewState = vi.fn();
      const { container } = render(
         <Subscriber
            name="sub1"
            appStateSelector={(s: any) => s.value}
            onNewState={onNewState}
         />
      );
      expect(onNewState).toHaveBeenCalledWith(123);
      expect(container.querySelector("noscript")?.getAttribute("data-subscriber-name")).toBe("sub1");
   });

   it("covers TaskPaneContainer render, URL push and noscript branch", () => {
      const { container, rerender } = render(<TaskPaneContainer maxHeight={100} isResizing={true} />);
      fireEvent.click(screen.getByTestId("task-pane"));
      expect(actionTaskPaneMock.pushUrl).toHaveBeenCalledWith("http://changed", undefined);

      hooksMock.useTaskPaneNavigationStack.mockReturnValue([]);
      hooksMock.useTaskPaneNavigationIndex.mockReturnValue(0);
      rerender(<TaskPaneContainer />);
      expect(container.querySelector("noscript")).toBeTruthy();
   });

   it("covers ToolbarContainer render and empty branch", () => {
      const { rerender } = render(<ToolbarContainer id="Main" />);
      expect(screen.getByTestId("toolbar")).toBeTruthy();

      mapProviderMock.useAppState.mockImplementation((selector: (s: any) => any) => selector({
         toolbar: { flyouts: {}, toolbars: {} },
      }));
      rerender(<ToolbarContainer id="Main" />);
      expect(screen.queryByTestId("toolbar")).toBeNull();
   });
});
