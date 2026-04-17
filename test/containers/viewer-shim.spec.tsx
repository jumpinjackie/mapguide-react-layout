/**
 * Tests for the Fusion API compatibility shim in viewer-shim.tsx.
 *
 * Verifies that `setExtents` (via `resolveSetExtentsBounds`) normalises all
 * three supported calling conventions into the same `[minx, miny, maxx, maxy]`
 * tuple and that the result is passed to the underlying `viewer.zoomToExtent`:
 *
 *  1. `setExtents(boundsObject)` – OL2/Fusion-style `{ left, bottom, right, top }`
 *  2. `setExtents([minx, miny, maxx, maxy])` – 4-element number array
 *  3. `setExtents(minx, miny, maxx, maxy)` – four individual number arguments
 *
 * The `resolveSetExtentsBounds` helper is also tested in isolation to confirm
 * its normalisation logic is correct independently of the React component.
 *
 * @since 0.15
 */
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Circle from "ol/geom/Circle";
import LineString from "ol/geom/LineString";
import Point from "ol/geom/Point";
import Polygon from "ol/geom/Polygon";
import { MapProviderContextProvider } from "../../src/components/map-providers/context";
import { configureStore } from "../../src/store/configure-store";
import { UnitOfMeasure, type IApplicationState } from "../../src/api/common";
import type { IMapProviderContext } from "../../src/components/map-providers/base";
import * as commandRegistry from "../../src/api/registry/command";
import { setFusionRoot } from "../../src/api/runtime";
import {
    ViewerApiShim,
    resolveSetExtentsBounds,
    enableRedlineMessagePrompt,
    AjaxViewerLineStringOrPolygon,
    AjaxViewerMapActionCode,
} from "../../src/containers/viewer-shim";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cleanupLegacyGlobals() {
    delete (window as any).Fusion;
    delete (window as any).OpenLayers;
    delete (window as any).GetMapFrame;
    delete (window as any).mapFrame;
    delete (window as any).formFrame;
    delete (window as any).ExecuteMapAction;
    delete (window as any).Refresh;
    delete (window as any).SetSelectionXML;
    delete (window as any).ZoomToView;
    delete (window as any).GotoHomePage;
    delete (window as any).GetViewerInterface;
    delete (window as any).RegisterSelectionHandler;
    delete (window as any).UnregisterSelectionHandler;
}

/**
 * Creates a minimal mock IMapProviderContext whose only responsibility is to
 * stand in for the real viewer during setExtents tests. Only `isReady` and
 * `zoomToExtent` need real implementations; everything else can be a no-op.
 */
function makeViewer(overrides?: any): IMapProviderContext {
    return {
        isReady: () => true,
        zoomToExtent: vi.fn(),
        getCurrentView: () => ({ x: 10, y: 20, scale: 500 }),
        getSize: () => [800, 600],
        getMetersPerUnit: () => 1,
        scaleToResolution: () => 2,
        getResolution: () => 0.5,
        refreshMap: vi.fn(),
        zoomToView: vi.fn(),
        screenToMapUnits: () => [100, 200],
        cancelDigitization: vi.fn(),
        toastPrimary: vi.fn()
            .mockReturnValueOnce("toast-1")
            .mockReturnValueOnce("toast-2")
            .mockReturnValueOnce("toast-3"),
        dismissToast: vi.fn(),
        getOLFactory: () => ({
            extendExtent: (left: [number, number, number, number], right: [number, number, number, number]) => ([
                Math.min(left[0], right[0]),
                Math.min(left[1], right[1]),
                Math.max(left[2], right[2]),
                Math.max(left[3], right[3]),
            ]),
        }),
        getViewForExtent: () => ({ x: 50, y: 60, scale: 700 }),
        isDigitizing: () => true,
        digitizePoint: (handler: (point: any) => void) => handler(new Point([7, 8])),
        digitizeLine: (handler: (line: any) => void) => handler(new LineString([[1, 2], [3, 4]])),
        digitizeLineString: (handler: (line: any) => void) => handler(new LineString([[10, 20], [30, 40]])),
        digitizePolygon: (handler: (polygon: any) => void) => handler(new Polygon([[[1, 2], [3, 4], [5, 6], [1, 2]]])),
        digitizeCircle: (handler: (circle: any) => void) => handler(new Circle([5, 6], 12)),
        digitizeRectangle: (handler: (rect: any) => void) => handler(new Polygon([[[11, 12], [13, 12], [13, 14], [11, 14], [11, 12]]])),
        mapguideSupport: () => ({
            clearSelection: vi.fn(),
            getSelection: () => undefined,
            setSelectionXml: vi.fn(),
        }),
        ...overrides,
    } as Partial<IMapProviderContext> as IMapProviderContext;
}

function makeState(overrides?: any): any {
    return {
        config: {
            activeMapName: "Map1",
            agentKind: "mapguide-rest" as any,
            viewSizeUnits: UnitOfMeasure.Meters,
            viewer: {
                isStateless: false,
                imageFormat: "PNG",
                selectionImageFormat: "PNG8",
                selectionColor: "#00ff00",
                activeSelectedFeatureColor: "#ff0000",
                pointSelectionBuffer: 5,
                loadIndicatorPositioning: "top",
                loadIndicatorColor: "#ffffff",
            },
        },
        mapState: {
            Map1: {
                currentView: { x: 10, y: 20, scale: 500 },
                mapguide: {
                    runtimeMap: {
                        Name: "Map1",
                        SessionId: "S1",
                        Layer: [
                            { ObjectId: "L1", Name: "Parcels", LegendLabel: "Parcels Legend", Visible: true, Selectable: true },
                            { ObjectId: "L2", Name: "Roads", LegendLabel: "Roads Legend", Visible: false, Selectable: true },
                            { ObjectId: "L3", Name: "Buildings", LegendLabel: "Buildings Legend", Visible: true, Selectable: false },
                        ],
                    },
                    selectionSet: {
                        FeatureSet: {
                            Layer: [
                                { "@id": "L1", "@name": "Parcels", Class: { ID: ["1", "2"] } },
                                { "@id": "L2", "@name": "Roads", Class: { ID: ["3"] } },
                            ],
                        },
                        SelectedFeatures: {
                            SelectedLayer: [{
                                "@name": "Parcels",
                                Feature: [
                                    {
                                        Bounds: "1 2 3 4",
                                        Property: [{ Name: "ID", Value: "1" }],
                                    },
                                    {
                                        Bounds: "0 1 2 5",
                                        Property: [{ Name: "ID", Value: "2" }],
                                    },
                                ],
                            }],
                        },
                    },
                },
            },
        },
        viewer: {
            busyCount: 0,
            size: [800, 600],
            tool: 0,
            featureTooltipsEnabled: true,
        },
        taskpane: {
            initialUrl: "http://example.test/taskpane-home",
            navIndex: 0,
            lastUrlPushed: false,
            navigation: ["http://example.test/taskpane-home"],
        },
        toolbar: {
            flyouts: {},
            toolbars: {},
        },
        ...overrides,
    };
}

/**
 * Mounts a `ViewerApiShim` component, which installs `window.Fusion` on
 * mount. Returns the unmount function.
 */
function mountShim(options?: { state?: any; viewer?: IMapProviderContext }) {
    cleanupLegacyGlobals();
    const store = configureStore(options?.state ?? makeState());
    const viewer = options?.viewer ?? makeViewer();

    return render(
        <Provider store={store}>
            <MapProviderContextProvider value={viewer}>
                <ViewerApiShim />
            </MapProviderContextProvider>
        </Provider>
    );
}

// ---------------------------------------------------------------------------
// Tests: resolveSetExtentsBounds (unit)
// ---------------------------------------------------------------------------

describe("resolveSetExtentsBounds", () => {
    const expected: [number, number, number, number] = [-123, 45, -122, 46];

    it("converts an OL2Bounds-compatible object (left/bottom/right/top)", () => {
        expect(resolveSetExtentsBounds({ left: -123, bottom: 45, right: -122, top: 46 })).toEqual(expected);
    });

    it("passes through a 4-element number array unchanged", () => {
        expect(resolveSetExtentsBounds([-123, 45, -122, 46])).toEqual(expected);
    });

    it("converts four individual number arguments (minx, miny, maxx, maxy)", () => {
        expect(resolveSetExtentsBounds(-123, 45, -122, 46)).toEqual(expected);
    });
});

// ---------------------------------------------------------------------------
// Tests: setExtents → viewer.zoomToExtent (integration via mounted shim)
// ---------------------------------------------------------------------------

describe("FusionWidgetApiShim.setExtents calls viewer.zoomToExtent", () => {
    const expectedExtent: [number, number, number, number] = [-123, 45, -122, 46];
    let viewer: IMapProviderContext;
    let unmount: () => void;
    let fusionWidget: any;

    beforeEach(() => {
        viewer = makeViewer({ zoomToExtent: vi.fn() });
        unmount = mountShim({ viewer }).unmount;
        fusionWidget = (window as any).Fusion.getWidgetById("Map");
    });

    afterEach(() => {
        unmount();
        cleanupLegacyGlobals();
    });

    it("calls zoomToExtent when passed an OL2Bounds-compatible object", () => {
        fusionWidget.setExtents({ left: -123, bottom: 45, right: -122, top: 46 });
        expect(viewer.zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });

    it("calls zoomToExtent when passed a 4-element number array", () => {
        fusionWidget.setExtents([-123, 45, -122, 46]);
        expect(viewer.zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });

    it("calls zoomToExtent when passed four individual number arguments", () => {
        fusionWidget.setExtents(-123, 45, -122, 46);
        expect(viewer.zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });

    it("installs legacy globals in window on mount", () => {
        expect((window as any).Fusion).toBeDefined();
        expect((window as any).OpenLayers).toBeDefined();
        expect(typeof (window as any).GetMapFrame).toBe("function");
        expect(typeof (window as any).ExecuteMapAction).toBe("function");
        expect(typeof (window as any).GotoHomePage).toBe("function");
    });

    it("reflects redline prompt setting via mapWidget.message.mapMessagePrompt", () => {
        enableRedlineMessagePrompt(true);
        expect(fusionWidget.mapMessagePrompt).toBe(true);

        enableRedlineMessagePrompt(false);
        expect(fusionWidget.mapMessagePrompt).toBe(false);
    });
});

describe("ViewerApiShim legacy map frame API", () => {
    beforeEach(() => {
        setFusionRoot("/fusion");
    });

    afterEach(() => {
        window.status = "";
        cleanupLegacyGlobals();
    });

    it("exposes map frame getters, digitizers and passthrough viewer operations", () => {
        const clearSelection = vi.fn();
        const setSelectionXml = vi.fn();
        const refreshMap = vi.fn();
        const zoomToView = vi.fn();
        const viewer = makeViewer({
            refreshMap,
            zoomToView,
            mapguideSupport: () => ({
                clearSelection,
                setSelectionXml,
                getSelection: () => ({
                    SelectedFeatures: {
                        SelectedLayer: [{
                            "@name": "Parcels",
                            Feature: [{
                                Bounds: "2 3 4 5",
                                Property: [{ Name: "ID", Value: "123" }],
                            }],
                        }],
                    },
                }),
            }),
        });

        const { unmount } = mountShim({ viewer, state: makeState() });
        const mapFrame = (window as any).GetMapFrame();

        expect(mapFrame.mapInit).toBe(true);
        expect(mapFrame.GetCenter()).toEqual({ X: 10, Y: 20 });
        expect(mapFrame.GetLayers(true, false)).toEqual([{ legend: "Parcels Legend", name: "Parcels", objectid: "L1" }]);
        expect(mapFrame.GetLayers(false, true)).toEqual([
            { legend: "Parcels Legend", name: "Parcels", objectid: "L1" },
            { legend: "Roads Legend", name: "Roads", objectid: "L2" },
        ]);
        expect(mapFrame.GetSelectedLayers()).toEqual([
            { legend: "Parcels Legend", name: "Parcels", objectid: "L1" },
            { legend: "Roads Legend", name: "Roads", objectid: "L2" },
        ]);
        expect(mapFrame.GetSelectionXML()).toContain("FeatureSet");
        expect(mapFrame.GetSessionId()).toBe("S1");
        expect(mapFrame.GetMapName()).toBe("Map1");
        expect(mapFrame.GetScale()).toBe(500);
        expect(mapFrame.GetMapWidth()).toBe(800);
        expect(mapFrame.GetMapHeight()).toBe(600);
        expect(mapFrame.GetMapUnitsType()).toBeTruthy();
        expect(mapFrame.GetMetersPerUnit()).toBe(1);
        expect(mapFrame.GetSelectedBounds()).toEqual({ minx: 0, miny: 1, maxx: 3, maxy: 5 });
        expect(mapFrame.GetSelectedCount()).toBe(3);
        expect(mapFrame.GetSelectedFeatures()).toEqual({
            Parcels: [{
                zoom: { minx: 2, miny: 3, maxx: 4, maxy: 5 },
                values: [{ name: "ID", value: "123" }],
            }],
        });
        expect(mapFrame.ScreenToMapUnits(10, 15)).toEqual({ X: 100, Y: 200 });
        expect(mapFrame.IsDigitizing()).toBe(true);
        expect(mapFrame.IsEnglishUnits()).toBe(true);

        mapFrame.SetEnglishUnits(false);
        mapFrame.SetLatLongDisplayUnits();
        expect(mapFrame.IsEnglishUnits()).toBe(false);
        expect(mapFrame.IsLatLongDisplayUnits()).toBe(true);

        const pointHandler = vi.fn();
        const lineHandler = vi.fn();
        const lineStringHandler = vi.fn();
        const polygonHandler = vi.fn();
        const rectangleHandler = vi.fn();
        const circleHandler = vi.fn();
        mapFrame.DigitizePoint(pointHandler);
        mapFrame.DigitizeLine(lineHandler);
        mapFrame.DigitizeLineString(lineStringHandler);
        mapFrame.DigitizePolygon(polygonHandler);
        mapFrame.DigitizeRectangle(rectangleHandler);
        mapFrame.DigitizeCircle(circleHandler);

        expect(pointHandler).toHaveBeenCalledWith({ X: 7, Y: 8 });
        expect(lineHandler.mock.calls[0][0].Count).toBe(2);
        expect(lineStringHandler.mock.calls[0][0].Point(1)).toEqual({ X: 30, Y: 40 });
        expect(polygonHandler.mock.calls[0][0].Point(2)).toEqual({ X: 5, Y: 6 });
        expect(rectangleHandler).toHaveBeenCalledWith({ Point1: { X: 11, Y: 12 }, Point2: { X: 13, Y: 14 } });
        expect(circleHandler).toHaveBeenCalledWith({ Center: { X: 5, Y: 6 }, Radius: 12 });

        mapFrame.SetSelectionXML("<FeatureSet />");
        mapFrame.ClearSelection();
        mapFrame.Refresh();
        mapFrame.ZoomToView(1, 2, 300);
        mapFrame.ZoomToScale(900);
        mapFrame.SetStatusMsg("working");

        expect(setSelectionXml).toHaveBeenCalledWith("<FeatureSet />");
        expect(clearSelection).toHaveBeenCalled();
        expect(refreshMap).toHaveBeenCalled();
        expect(zoomToView).toHaveBeenCalledWith(1, 2, 300);
        expect(zoomToView).toHaveBeenCalledWith(10, 20, 900);
        expect(window.status).toBe("working");

        unmount();
    });

    it("fires selection and busy callbacks across prop updates", () => {
        const viewer = makeViewer();
        const initialSelection = {
            FeatureSet: { Layer: [] },
            SelectedFeatures: { SelectedLayer: [] },
        };
        const nextSelection = {
            FeatureSet: { Layer: [{ "@id": "L1", "@name": "Parcels", Class: { ID: ["1"] } }] },
            SelectedFeatures: {
                SelectedLayer: [{
                    "@name": "Parcels",
                    Feature: [{ Bounds: "1 1 2 2", Property: [{ Name: "ID", Value: "1" }] }],
                }],
            },
        };

        const first = mountShim({
            viewer,
            state: makeState({
                viewer: { busyCount: 0 },
                mapState: {
                    Map1: {
                        currentView: { x: 10, y: 20, scale: 500 },
                        mapguide: {
                            runtimeMap: makeState().mapState?.Map1?.mapguide?.runtimeMap,
                            selectionSet: initialSelection,
                        },
                    },
                },
            }),
        });

        const selectionHandler = vi.fn();
        const selectionOn = vi.fn();
        const selectionOff = vi.fn();
        const busyChanged = vi.fn();

        (window as any).RegisterSelectionHandler(selectionHandler);
        (window as any).Fusion.registerForEvent((window as any).Fusion.Event.MAP_SELECTION_ON, selectionOn);
        (window as any).Fusion.registerForEvent((window as any).Fusion.Event.MAP_SELECTION_OFF, selectionOff);
        (window as any).Fusion.registerForEvent((window as any).Fusion.Event.MAP_BUSY_CHANGED, busyChanged);

        first.rerender(
            <Provider store={configureStore(makeState({
                viewer: { busyCount: 1 },
                mapState: {
                    Map1: {
                        currentView: { x: 10, y: 20, scale: 500 },
                        mapguide: {
                            runtimeMap: makeState().mapState?.Map1?.mapguide?.runtimeMap,
                            selectionSet: nextSelection,
                        },
                    },
                },
            }))}>
                <MapProviderContextProvider value={viewer}>
                    <ViewerApiShim />
                </MapProviderContextProvider>
            </Provider>
        );

        expect(selectionHandler).toHaveBeenCalledWith("Map1", nextSelection);
        expect(selectionOn).toHaveBeenCalled();
        expect(busyChanged).toHaveBeenCalled();

        (window as any).UnregisterSelectionHandler(selectionHandler);
        first.rerender(
            <Provider store={configureStore(makeState({
                viewer: { busyCount: 1 },
                mapState: {
                    Map1: {
                        currentView: { x: 10, y: 20, scale: 500 },
                        mapguide: {
                            runtimeMap: makeState().mapState?.Map1?.mapguide?.runtimeMap,
                            selectionSet: initialSelection,
                        },
                    },
                },
            }))}>
                <MapProviderContextProvider value={viewer}>
                    <ViewerApiShim />
                </MapProviderContextProvider>
            </Provider>
        );

        expect(selectionHandler).toHaveBeenCalledTimes(1);
        expect(selectionOff).toHaveBeenCalled();

        first.unmount();
    });

    it("covers fusion widget helpers, OpenLayers helpers and command bridging", async () => {
        const dismissToast = vi.fn();
        const toastPrimary = vi.fn()
            .mockReturnValueOnce("toast-info")
            .mockReturnValueOnce("toast-warn")
            .mockReturnValueOnce("toast-error");
        const clearSelection = vi.fn();
        const setSelectionXml = vi.fn((_xml: string, _opts?: any, cb?: (selection: any) => void) => {
            if (cb) {
                cb({
                    SelectedFeatures: {
                        SelectedLayer: [{
                            "@name": "Parcels",
                            Feature: [
                                { Bounds: "1 2 3 4", Property: [{ Name: "ID", Value: "1" }] },
                                { Bounds: "0 1 2 5", Property: [{ Name: "ID", Value: "2" }] },
                            ],
                        }],
                    },
                });
            }
        });
        const zoomToView = vi.fn();
        const refreshMap = vi.fn();
        const cancelDigitization = vi.fn();
        const invoke = vi.fn();
        const getCommandSpy = vi.spyOn(commandRegistry, "getCommand").mockReturnValue({ invoke } as any);

        const viewer = makeViewer({
            dismissToast,
            toastPrimary,
            zoomToView,
            refreshMap,
            cancelDigitization,
            mapguideSupport: () => ({
                clearSelection,
                getSelection: () => ({
                    SelectedFeatures: {
                        SelectedLayer: [{
                            "@name": "Parcels",
                            Feature: [{ Bounds: "2 3 4 5", Property: [{ Name: "ID", Value: "123" }] }],
                        }],
                    },
                }),
                setSelectionXml,
            }),
        });

        const { unmount } = mountShim({
            viewer,
            state: makeState({
                viewer: { ...makeState().viewer, busyCount: 2 },
                config: {
                    ...makeState().config,
                    activeMapName: "Map1",
                    agentKind: "mapguide-rest" as any,
                    agentUri: "http://example.test/mapagent",
                    viewSizeUnits: UnitOfMeasure.Meters,
                    viewer: {
                        ...(makeState().config?.viewer ?? {}),
                        isStateless: true,
                    },
                },
            }),
        });

        const fusion = (window as any).Fusion;
        const mapFrame = (window as any).GetMapFrame();
        const mapWidget = fusion.getWidgetById("Map");
        const taskPaneWidget = fusion.getWidgetById("TaskPane");
        const redlineWidgets = fusion.getWidgetsByType("Redline");
        const mapByName = fusion.getMapByName("Map1");
        const activeLayerChanged = vi.fn();
        const boundTarget = { value: 41, add(this: any, delta: number) { return this.value + delta; } };

        expect(mapWidget).toBeTruthy();
        expect(taskPaneWidget).toBeTruthy();
        expect(redlineWidgets).toHaveLength(1);
        expect(mapByName).toBeTruthy();
        expect(fusion.getMapByName("Unknown")).toBeUndefined();
        expect((window as any).OpenLayers.Function.bind(boundTarget.add, boundTarget)(1)).toBe(42);

        const parsedJson = vi.fn();
        fusion.xml2json(parsedJson, { responseText: "{\"ok\":true}" }, true);
        expect(parsedJson).toHaveBeenCalledWith({ ok: true });

        const ajaxRequestSpy = vi.spyOn(fusion, "ajaxRequest").mockImplementation(() => undefined);
        fusion.xml2json(parsedJson, { responseText: "<xml />" }, false);
        expect(ajaxRequestSpy).toHaveBeenCalledWith("common/php/Xml2JSON.php", expect.objectContaining({
            method: "POST",
        }));
        ajaxRequestSpy.mockRestore();

        const getClientSpy = vi.spyOn(mapFrame, "getClient").mockReturnValue({} as any);
        const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
            .mockResolvedValueOnce({ ok: true, text: async () => "ok-get" } as Response)
            .mockResolvedValueOnce({ ok: true, text: async () => "ok-post" } as Response)
            .mockResolvedValueOnce({ ok: false, statusText: "Bad Request", text: async () => "bad" } as Response);
        const onSuccess = vi.fn();
        const onFailure = vi.fn();
        await fusion.ajaxRequest("service/get", { parameters: "a=1", onSuccess });
        await Promise.resolve();
        expect(onSuccess).toHaveBeenCalledWith({ responseText: "ok-get" });

        await fusion.ajaxRequest("service/post", { parameters: { a: 1 }, onSuccess });
        await Promise.resolve();
        expect(onSuccess).toHaveBeenCalledWith({ responseText: "ok-post" });

        await fusion.ajaxRequest("service/fail", { parameters: "b=2", onFailure });
        await Promise.resolve();
        expect(onFailure).toHaveBeenCalled();
        expect(fetchSpy.mock.calls[0][0]).toBe("/fusion/service/get?a=1");

        fusion.registerForEvent(fusion.Event.MAP_ACTIVE_LAYER_CHANGED, activeLayerChanged);
        mapWidget.registerForEvent(fusion.Event.MAP_ACTIVE_LAYER_CHANGED, activeLayerChanged);
        mapWidget.setActiveLayer({ layerName: "Parcels" });
        expect(mapWidget.getActiveLayer()).toEqual({ layerName: "Parcels" });
        expect(activeLayerChanged).toHaveBeenCalledTimes(2);
        mapWidget.deregisterForEvent(fusion.Event.MAP_ACTIVE_LAYER_CHANGED, activeLayerChanged);
        mapWidget.setActiveLayer({ layerName: "Roads" });
        expect(activeLayerChanged).toHaveBeenCalledTimes(2);

        expect(mapWidget.mapWidget).toBe(mapWidget);
        expect(mapWidget.container).toBe(mapWidget);
        expect(mapWidget.message).toBe(mapWidget);
        expect(mapWidget.layerRoot).toBe(mapWidget);
        expect(mapWidget.ownerDocument).toBe(document);
        expect(mapWidget.getSelectableLayers()).toEqual([
            { layerName: "Parcels", legendLabel: "Parcels Legend" },
            { layerName: "Roads", legendLabel: "Roads Legend" },
        ]);
        expect(mapWidget.getSelectedLayers()).toEqual([
            { layerName: "Parcels", legendLabel: "Parcels Legend" },
            { layerName: "Roads", legendLabel: "Roads Legend" },
        ]);
        expect(mapWidget.findLayerByAttribute("layerName", "Roads")).toEqual({ layerName: "Roads" });
        expect(mapWidget.findLayerByAttribute("layerName", "Missing")).toBeNull();
        expect(mapWidget.isBusy()).toBe(true);
        expect(mapWidget.isMapLoaded()).toBe(true);
        expect(mapWidget.pixToGeoMeasure(5)).toBe(2.5);

        const extent = mapWidget.getExtentFromPoint(10, 20, 200);
        expect(extent).toEqual(expect.objectContaining({ left: -790, bottom: -580, right: 810, top: 620 }));

        const pointDigitized = vi.fn();
        const lineDigitized = vi.fn();
        const lineStringDigitized = vi.fn();
        const rectDigitized = vi.fn();
        const polygonDigitized = vi.fn();
        const circleDigitized = vi.fn();
        mapWidget.digitizePoint({}, pointDigitized);
        mapWidget.digitizeLine({}, lineDigitized);
        mapWidget.digitizeLineString({}, lineStringDigitized);
        mapWidget.digitizeRectangle({}, rectDigitized);
        mapWidget.digitizePolygon({}, polygonDigitized);
        mapWidget.digitizeCircle({}, circleDigitized);

        expect(pointDigitized.mock.calls[0][0].CLASS_NAME).toBe("OpenLayers.Geometry.Point");
        expect(pointDigitized.mock.calls[0][0].x).toBe(7);
        expect(pointDigitized.mock.calls[0][0].y).toBe(8);
        expect(lineDigitized.mock.calls[0][0].CLASS_NAME).toBe("OpenLayers.Geometry.LineString");
        expect(lineDigitized.mock.calls[0][0].getVertices()).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
        expect(lineStringDigitized.mock.calls[0][0].getVertices()).toEqual([{ x: 10, y: 20 }, { x: 30, y: 40 }]);
        expect(rectDigitized.mock.calls[0][0].getVertices()).toEqual([{ x: 11, y: 12 }, undefined, { x: 13, y: 14 }]);
        expect(polygonDigitized.mock.calls[0][0].CLASS_NAME).toBe("OpenLayers.Geometry.Polygon");
        expect(circleDigitized).toHaveBeenCalledWith({ x: 5, y: 6, r: 12 });

        mapWidget.query({
            selectionType: "INTERSECTS",
            maxFeatures: 0,
            geometry: "GEOM",
            layers: ["Parcels"],
        });
        expect(setSelectionXml).toHaveBeenCalledWith("", expect.objectContaining({
            mapname: "Map1",
            session: "S1",
            selectionvariant: "INTERSECTS",
            maxfeatures: -1,
            geometry: "GEOM",
            layernames: ["Parcels"],
        }));

        mapWidget.setSelection("<FeatureSet />", true);
        expect(setSelectionXml).toHaveBeenCalledWith("<FeatureSet />", { layerattributefilter: 0 }, expect.any(Function));
        expect(zoomToView).toHaveBeenCalledWith(50, 60, 700);

        mapWidget.processFeatureInfo({ responseText: JSON.stringify({ Message: "warning text" }) });
        mapWidget.processFeatureInfo({ responseText: JSON.stringify({ FeatureInformation: true, FeatureSet: { Layer: [] } }) });
        expect(setSelectionXml).toHaveBeenCalledWith(expect.stringContaining("FeatureSet"), { layerattributefilter: 0 }, expect.any(Function));

        toastPrimary.mockReset()
            .mockReturnValueOnce("toast-info")
            .mockReturnValueOnce("toast-warn")
            .mockReturnValueOnce("toast-error");
        dismissToast.mockClear();
        mapWidget.info("hello");
        mapWidget.warn("careful");
        mapWidget.error("bad");
        mapWidget.clear();
        expect(toastPrimary).toHaveBeenNthCalledWith(1, "info-sign", expect.any(Object));
        expect(toastPrimary).toHaveBeenNthCalledWith(2, "warning-sign", expect.any(Object));
        expect(toastPrimary).toHaveBeenNthCalledWith(3, "error", expect.any(Object));
        expect(dismissToast).toHaveBeenCalledWith("toast-error");

        mapWidget.clearSelection();
        mapWidget.cancelDigitization();
        mapWidget.redraw();
        mapWidget.reloadMap();
        mapWidget.drawMap();
        expect(clearSelection).toHaveBeenCalled();
        expect(cancelDigitization).toHaveBeenCalled();
        expect(refreshMap).toHaveBeenCalledTimes(3);

        mapWidget.goHome();
        expect(typeof (window as any).GotoHomePage).toBe("function");

        (window as any).ExecuteMapAction(AjaxViewerMapActionCode.ZoomIn);
        expect(getCommandSpy).toHaveBeenCalledWith(commandRegistry.DefaultCommands.ZoomIn);
        expect(invoke).toHaveBeenCalled();

        expect(() => (window as any).GetMapFrame().MapUnitsToLatLon()).toThrow();

        fetchSpy.mockRestore();
        getClientSpy.mockRestore();
        getCommandSpy.mockRestore();
        unmount();
    });
});

describe("AjaxViewerLineStringOrPolygon", () => {
    it("reports coordinate count and indexed point values", () => {
        const geom = new AjaxViewerLineStringOrPolygon([
            { X: 1, Y: 2 },
            { X: 3, Y: 4 },
        ]);

        expect(geom.Count).toBe(2);
        expect(geom.Point(0)).toEqual({ X: 1, Y: 2 });
        expect(geom.Point(1)).toEqual({ X: 3, Y: 4 });
    });
});

describe("AjaxViewerMapActionCode enum", () => {
    it("exposes expected numeric command codes", () => {
        expect(AjaxViewerMapActionCode.ZoomIn).toBe(7);
        expect(AjaxViewerMapActionCode.ZoomOut).toBe(8);
        expect(AjaxViewerMapActionCode.ClearSelection).toBe(19);
    });
});

