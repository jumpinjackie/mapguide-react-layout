/**
 * Broad selector coverage for src/containers/hooks.ts.
 */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const stateRef = vi.hoisted(() => ({
   value: {} as any,
}));

const equalityFns = vi.hoisted(() => [] as Array<(left: any, right: any) => boolean>);

const reduceToolbarStateMock = vi.hoisted(() => ({
   reduceAppToToolbarState: vi.fn(),
}));

vi.mock("../../src/components/map-providers/context", () => ({
   useAppState: (selector: (state: any) => any, equalityFn?: (left: any, right: any) => boolean) => {
      if (equalityFn) {
         equalityFns.push(equalityFn);
      }
      return selector(stateRef.value);
   },
}));

vi.mock("../../src/api/registry/command", () => ({
   reduceAppToToolbarState: reduceToolbarStateMock.reduceAppToToolbarState,
}));

import {
   getActiveMapBranch,
   usePrevious,
   useActiveMapName,
   useActiveMapInitialExternalLayers,
   useActiveMapLayers,
   useNamedMapLayers,
   useViewerLocale,
   useActiveMapView,
   useActiveMapWidth,
   useActiveMapHeight,
   useViewerSizeUnits,
   useCurrentMouseCoordinates,
   useViewerFlyouts,
   useInitWarnings,
   useInitError,
   useInitErrorStack,
   useInitErrorOptions,
   useActiveMapBranch,
   useActiveMapSelectionSet,
   useCustomAppSettings,
   useActiveMapClientSelectionSet,
   useActiveMapInitialView,
   useAvailableMaps,
   useViewerBusyCount,
   useViewerViewRotation,
   useViewerActiveTool,
   useViewerViewRotationEnabled,
   useConfiguredCoordinateProjection,
   useConfiguredCoordinateDecimals,
   useConfiguredCoordinateFormat,
   useConfiguredAgentUri,
   useConfiguredAgentKind,
   useIsContextMenuOpen,
   useViewerIsStateless,
   useViewerImageFormat,
   useViewerSelectionImageFormat,
   useViewerSelectionColor,
   useViewerActiveFeatureSelectionColor,
   useViewerPointSelectionBuffer,
   useViewerFeatureTooltipsEnabled,
   useViewerSelectCanDragPan,
   useConfiguredManualFeatureTooltips,
   useConfiguredLoadIndicatorPositioning,
   useConfiguredLoadIndicatorColor,
   useConfiguredCancelDigitizationKey,
   useConfiguredUndoLastPointKey,
   useConfiguredCapabilities,
   useTemplateLegendVisible,
   useTemplateTaskPaneVisible,
   useTemplateSelectionVisible,
   useTemplateInitialInfoPaneWidth,
   useTemplateInitialTaskPaneWidth,
   useTemplateCustomData,
   useTaskPaneInitialUrl,
   useTaskPaneNavigationIndex,
   useTaskPaneLastUrlPushed,
   useTaskPaneNavigationStack,
   useLastDispatchedAction,
   useReducedToolbarAppState,
} from "../../src/containers/hooks";

function PreviousProbe(props: { value: string }) {
   const previous = usePrevious(props.value);
   return <div data-testid="previous">{previous ?? ""}</div>;
}

describe("hooks selectors", () => {
   beforeEach(() => {
      equalityFns.length = 0;
      vi.clearAllMocks();

      reduceToolbarStateMock.reduceAppToToolbarState.mockReturnValue({
         busyWorkerCount: 2,
         hasNextView: true,
         hasPreviousView: false,
         featureTooltipsEnabled: true,
         activeTool: 4,
         hasSelection: false,
         hasClientSelection: false,
      });

      stateRef.value = {
         config: {
            activeMapName: "Map1",
            locale: "en",
            viewSizeUnits: 0,
            coordinates: {
               projection: "EPSG:4326",
               decimals: 4,
               format: "DMS",
            },
            agentUri: "http://example.test/mapagent",
            agentKind: "mapguide",
            viewer: {
               isStateless: false,
               imageFormat: "PNG",
               selectionImageFormat: "PNG8",
               selectionColor: "#00ff00",
               activeSelectedFeatureColor: "#ff0000",
               pointSelectionBuffer: 5,
               loadIndicatorPositioning: "top-left",
               loadIndicatorColor: "#ffffff",
            },
            selectCanDragPan: true,
            manualFeatureTooltips: true,
            cancelDigitizationKey: 27,
            undoLastPointKey: 90,
            capabilities: {
               hasTaskBar: true,
            },
            availableMaps: [{ name: "Main Map", value: "Map1" }],
            appSettings: { custom: "value" },
            viewRotation: 15,
            viewRotationEnabled: true,
         },
         mapState: {
            Map1: {
               initialExternalLayers: [{ name: "Initial Base" }],
               layers: [{
                  name: "Parcels",
                  opacity: 0.8,
                  visible: true,
                  vectorStyle: "default",
                  cluster: false,
                  heatmap: { blur: 8, radius: 12 },
               }],
               currentView: { x: 1, y: 2, scale: 1000 },
               initialView: { x: 3, y: 4, scale: 5000 },
               clientSelection: { layers: [{ id: "client-1" }] },
               mapguide: {
                  selectionSet: {
                     FeatureSet: {
                        Layer: [{ "@id": "L1", Class: { ID: ["1"] } }],
                     },
                  },
               },
            },
            SwipeMap: {
               layers: [{
                  name: "Roads",
                  opacity: 1,
                  visible: false,
                  vectorStyle: "alt",
                  cluster: true,
                  heatmap: { blur: 4, radius: 5 },
               }],
            },
         },
         viewer: {
            size: [800, 600],
            busyCount: 3,
            tool: 7,
            featureTooltipsEnabled: true,
         },
         mouse: {
            coords: [100, 200],
         },
         toolbar: {
            flyouts: {
               MapContextMenu: { open: false },
            },
         },
         initError: {
            warnings: ["warn-1"],
            error: { message: "Boom" },
            includeStack: true,
            options: { retry: true },
         },
         template: {
            legendVisible: true,
            taskPaneVisible: false,
            selectionPanelVisible: true,
            initialInfoPaneWidth: 320,
            initialTaskPaneWidth: 450,
            templateData: {
               banner: "Banner Value",
            },
         },
         taskpane: {
            initialUrl: "http://example.test/home",
            navIndex: 2,
            lastUrlPushed: true,
            navigation: ["a", "b", "c"],
         },
         lastaction: { type: "ANY" },
      };
   });

   it("returns expected values for state-backed selectors", () => {
      expect(getActiveMapBranch(stateRef.value)?.currentView?.scale).toBe(1000);
      expect(useActiveMapName()).toBe("Map1");
      expect(useActiveMapInitialExternalLayers()).toEqual([{ name: "Initial Base" }]);
      expect(useViewerLocale()).toBe("en");
      expect(useActiveMapView()).toEqual({ x: 1, y: 2, scale: 1000 });
      expect(useActiveMapWidth()).toBe(800);
      expect(useActiveMapHeight()).toBe(600);
      expect(useViewerSizeUnits()).toBe(0);
      expect(useCurrentMouseCoordinates()).toEqual([100, 200]);
      expect(useViewerFlyouts()).toEqual({ MapContextMenu: { open: false } });
      expect(useInitWarnings()).toEqual(["warn-1"]);
      expect(useInitError()).toEqual({ message: "Boom" });
      expect(useInitErrorStack()).toBe(true);
      expect(useInitErrorOptions()).toEqual({ retry: true });
      expect(useActiveMapBranch()?.initialView?.scale).toBe(5000);
      expect(useActiveMapSelectionSet()).toEqual(stateRef.value.mapState.Map1.mapguide.selectionSet);
      expect(useCustomAppSettings()).toEqual({ custom: "value" });
      expect(useActiveMapClientSelectionSet()).toEqual({ layers: [{ id: "client-1" }] });
      expect(useActiveMapInitialView()).toEqual({ x: 3, y: 4, scale: 5000 });
      expect(useAvailableMaps()).toEqual([{ name: "Main Map", value: "Map1" }]);
      expect(useViewerBusyCount()).toBe(3);
      expect(useViewerViewRotation()).toBe(15);
      expect(useViewerActiveTool()).toBe(7);
      expect(useViewerViewRotationEnabled()).toBe(true);
      expect(useConfiguredCoordinateProjection()).toBe("EPSG:4326");
      expect(useConfiguredCoordinateDecimals()).toBe(4);
      expect(useConfiguredCoordinateFormat()).toBe("DMS");
      expect(useConfiguredAgentUri()).toBe("http://example.test/mapagent");
      expect(useConfiguredAgentKind()).toBe("mapguide");
      expect(useViewerIsStateless()).toBe(false);
      expect(useViewerImageFormat()).toBe("PNG");
      expect(useViewerSelectionImageFormat()).toBe("PNG8");
      expect(useViewerSelectionColor()).toBe("#00ff00");
      expect(useViewerActiveFeatureSelectionColor()).toBe("#ff0000");
      expect(useViewerPointSelectionBuffer()).toBe(5);
      expect(useViewerFeatureTooltipsEnabled()).toBe(true);
      expect(useViewerSelectCanDragPan()).toBe(true);
      expect(useConfiguredManualFeatureTooltips()).toBe(true);
      expect(useConfiguredLoadIndicatorPositioning()).toBe("top-left");
      expect(useConfiguredLoadIndicatorColor()).toBe("#ffffff");
      expect(useConfiguredCancelDigitizationKey()).toBe(27);
      expect(useConfiguredUndoLastPointKey()).toBe(90);
      expect(useConfiguredCapabilities()).toEqual({ hasTaskBar: true });
      expect(useTemplateLegendVisible()).toBe(true);
      expect(useTemplateTaskPaneVisible()).toBe(false);
      expect(useTemplateSelectionVisible()).toBe(true);
      expect(useTemplateInitialInfoPaneWidth()).toBe(320);
      expect(useTemplateInitialTaskPaneWidth()).toBe(450);
      expect(useTemplateCustomData("banner")).toBe("Banner Value");
      expect(useTaskPaneInitialUrl()).toBe("http://example.test/home");
      expect(useTaskPaneNavigationIndex()).toBe(2);
      expect(useTaskPaneLastUrlPushed()).toBe(true);
      expect(useTaskPaneNavigationStack()).toEqual(["a", "b", "c"]);
      expect(useLastDispatchedAction()).toEqual({ type: "ANY" });
   });

   it("covers active-map layer selectors and their equality functions", () => {
      expect(useActiveMapLayers()?.[0].name).toBe("Parcels");
      expect(useNamedMapLayers("SwipeMap")?.[0].name).toBe("Roads");
      expect(useNamedMapLayers("MissingMap")).toBeUndefined();

      const sameLayerLeft = [{
         name: "Parcels",
         opacity: 0.8,
         visible: true,
         vectorStyle: "default",
         cluster: false,
         heatmap: { blur: 8, radius: 12 },
      }];
      const sameLayerRight = [{
         name: "Parcels",
         opacity: 0.8,
         visible: true,
         vectorStyle: "default",
         cluster: false,
         heatmap: { blur: 8, radius: 12 },
      }];
      const differentLayer = [{
         name: "Parcels",
         opacity: 0.8,
         visible: true,
         vectorStyle: "default",
         cluster: false,
         heatmap: { blur: 9, radius: 12 },
      }];

      expect(equalityFns[0](sameLayerLeft, sameLayerRight)).toBe(true);
      expect(equalityFns[0](sameLayerLeft, differentLayer)).toBe(false);
      expect(equalityFns[1](sameLayerLeft, sameLayerRight)).toBe(true);
      expect(equalityFns[1](sameLayerLeft, differentLayer)).toBe(false);
   });

   it("handles context menu and missing-active-map fallback paths", () => {
      expect(useIsContextMenuOpen()).toBe(false);
      stateRef.value.toolbar.flyouts.MapContextMenu.open = true;
      expect(useIsContextMenuOpen()).toBe(true);

      stateRef.value.config.activeMapName = undefined;
      expect(getActiveMapBranch(stateRef.value)).toBeUndefined();
      expect(useActiveMapInitialExternalLayers()).toEqual([]);
      expect(useActiveMapSelectionSet()).toBeNull();
      expect(useActiveMapClientSelectionSet()).toBeUndefined();
      expect(useActiveMapInitialView()).toBeUndefined();
   });

   it("overrides toolbar selection flags in reduced toolbar state", () => {
      const reduced = useReducedToolbarAppState();
      expect(reduced.hasSelection).toBe(true);
      expect(reduced.hasClientSelection).toBe(true);
      expect(reduced.busyWorkerCount).toBe(2);

      expect(equalityFns[0]({
         busyWorkerCount: 1,
         hasNextView: true,
         hasPreviousView: false,
         featureTooltipsEnabled: true,
         activeTool: 4,
      }, {
         busyWorkerCount: 1,
         hasNextView: true,
         hasPreviousView: false,
         featureTooltipsEnabled: true,
         activeTool: 4,
      })).toBe(true);
      expect(equalityFns[0]({
         busyWorkerCount: 1,
         hasNextView: true,
         hasPreviousView: false,
         featureTooltipsEnabled: true,
         activeTool: 4,
      }, {
         busyWorkerCount: 2,
         hasNextView: true,
         hasPreviousView: false,
         featureTooltipsEnabled: true,
         activeTool: 4,
      })).toBe(false);
   });

   it("tracks previous values across renders", () => {
      const { rerender } = render(<PreviousProbe value="first" />);
      expect(screen.getByTestId("previous").textContent).toBe("");

      rerender(<PreviousProbe value="second" />);
      expect(screen.getByTestId("previous").textContent).toBe("first");

      rerender(<PreviousProbe value="third" />);
      expect(screen.getByTestId("previous").textContent).toBe("second");
   });
});