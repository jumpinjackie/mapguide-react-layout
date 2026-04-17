import { beforeAll, describe, expect, it, vi } from "vitest";
import { buildTargetedCommand, initDefaultCommands } from "../../src/api/default-commands";
import { ActionType } from "../../src/constants/actions";
import { ActiveMapTool, RefreshMode } from "../../src/api/common";
import { DefaultCommands, getCommand } from "../../src/api/registry/command";
import { createInitialState } from "../../test-data";

describe("api/default-commands", () => {
    beforeAll(() => {
        initDefaultCommands();
    });

    const configWithTaskPane = {
        capabilities: {
            hasTaskPane: true,
        },
    } as any;

    const configWithoutTaskPane = {
        capabilities: {
            hasTaskPane: false,
        },
    } as any;

    it("defaults to NewWindow when no target parameter is provided", () => {
        expect(buildTargetedCommand(configWithTaskPane)).toEqual({ target: "NewWindow" });
    });

    it("honors TaskPane target", () => {
        expect(buildTargetedCommand(configWithTaskPane, { Target: "TaskPane" })).toEqual({ target: "TaskPane" });
        expect(buildTargetedCommand(configWithoutTaskPane, { Target: "TaskPane" })).toEqual({ target: "TaskPane" });
    });

    it("includes target frame when SpecifiedFrame is requested", () => {
        expect(buildTargetedCommand(configWithTaskPane, {
            Target: "SpecifiedFrame",
            TargetFrame: "details-frame",
        })).toEqual({
            target: "SpecifiedFrame",
            targetFrame: "details-frame",
        });
    });

    it("registers tool commands with selected predicates and dispatches active tool actions", () => {
        const selectCmd = getCommand(DefaultCommands.Select);
        const panCmd = getCommand(DefaultCommands.Pan);
        const zoomCmd = getCommand(DefaultCommands.Zoom);
        const dispatch = vi.fn((action) => action);

        expect(selectCmd).toBeDefined();
        expect(panCmd).toBeDefined();
        expect(zoomCmd).toBeDefined();
        expect(selectCmd?.selected({ activeTool: ActiveMapTool.Select } as any)).toBe(true);
        expect(panCmd?.selected({ activeTool: ActiveMapTool.Pan } as any)).toBe(true);
        expect(zoomCmd?.selected({ activeTool: ActiveMapTool.Zoom } as any)).toBe(true);

        selectCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);
        panCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);
        zoomCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);

        expect(dispatch.mock.calls[0][0]).toEqual({ type: ActionType.MAP_SET_ACTIVE_TOOL, payload: ActiveMapTool.Select });
        expect(dispatch.mock.calls[1][0]).toEqual({ type: ActionType.MAP_SET_ACTIVE_TOOL, payload: ActiveMapTool.Pan });
        expect(dispatch.mock.calls[2][0]).toEqual({ type: ActionType.MAP_SET_ACTIVE_TOOL, payload: ActiveMapTool.Zoom });
    });

    it("registers zoom commands that call viewer.zoomDelta", () => {
        const zoomInCmd = getCommand(DefaultCommands.ZoomIn);
        const zoomOutCmd = getCommand(DefaultCommands.ZoomOut);
        const viewer = { zoomDelta: vi.fn() };

        zoomInCmd?.invoke(vi.fn() as any, () => createInitialState(), viewer as any);
        zoomOutCmd?.invoke(vi.fn() as any, () => createInitialState(), viewer as any);

        expect(viewer.zoomDelta).toHaveBeenNthCalledWith(1, 1);
        expect(viewer.zoomDelta).toHaveBeenNthCalledWith(2, -1);
    });

    it("registers pan commands that dispatch the derived target view", () => {
        const panLeftCmd = getCommand(DefaultCommands.PanLeft);
        const panDownCmd = getCommand(DefaultCommands.PanDown);
        const state = createInitialState();
        state.config.activeMapName = "Main";
        state.mapState = {
            Main: {
                externalBaseLayers: [],
                initialExternalLayers: [],
                currentView: undefined,
                initialView: undefined,
                history: [],
                historyIndex: -1,
                generic: undefined,
                clientSelection: undefined,
                mapguide: undefined,
                layers: []
            } as any
        };
        const dispatched: any[] = [];
        const dispatch = vi.fn((action) => {
            if (typeof action === "function") {
                return action(dispatch, () => state);
            }
            dispatched.push(action);
            return action;
        });
        const viewer = {
            getCurrentView: () => ({ x: 10, y: 20, scale: 1000 }),
            getCurrentExtent: () => [1, 2, 30, 40]
        };

        panLeftCmd?.invoke(dispatch as any, () => state, viewer as any);
        panDownCmd?.invoke(dispatch as any, () => state, viewer as any);

        expect(dispatched[0]).toEqual({
            type: ActionType.MAP_SET_VIEW,
            payload: {
                mapName: "Main",
                view: { x: 1, y: 20, scale: 1000 }
            }
        });
        expect(dispatched[1]).toEqual({
            type: ActionType.MAP_SET_VIEW,
            payload: {
                mapName: "Main",
                view: { x: 10, y: 2, scale: 1000 }
            }
        });
    });

    it("registers about and help commands that dispatch modal actions", () => {
        const aboutCmd = getCommand(DefaultCommands.About);
        const helpCmd = getCommand(DefaultCommands.Help);
        const dispatch = vi.fn((action) => action);
        const state = createInitialState();

        aboutCmd?.invoke(dispatch as any, () => state, undefined as any);
        helpCmd?.invoke(dispatch as any, () => state, undefined as any);

        expect(dispatch.mock.calls[0][0].type).toBe(ActionType.MODAL_SHOW_COMPONENT);
        expect(dispatch.mock.calls[0][0].payload.name).toBe("About");
        expect(dispatch.mock.calls[1][0]).toEqual(expect.objectContaining({
            type: ActionType.MODAL_SHOW_URL,
            payload: expect.objectContaining({
                name: DefaultCommands.Help,
                url: "help/index.html"
            })
        }));
    });

    it("registers targeted component commands that invoke the task pane", () => {
        const measureCmd = getCommand(DefaultCommands.Measure);
        const coordCmd = getCommand(DefaultCommands.CoordinateTracker);
        const layerMgrCmd = getCommand(DefaultCommands.AddManageLayers);
        const dispatch = vi.fn((action) => action);
        const state = createInitialState();
        state.config.capabilities.hasTaskPane = true;

        measureCmd?.invoke(dispatch as any, () => state, undefined as any, { Target: "TaskPane" });
        coordCmd?.invoke(dispatch as any, () => state, undefined as any, { Target: "TaskPane", Projection: ["EPSG:4326", "EPSG:3857"] });
        layerMgrCmd?.invoke(dispatch as any, () => state, undefined as any, { Target: "TaskPane" });

        expect(dispatch.mock.calls[0][0]).toEqual({
            type: ActionType.TASK_INVOKE_URL,
            payload: { url: "component://Measure" }
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: ActionType.TASK_INVOKE_URL,
            payload: { url: "component://CoordinateTracker?projections=EPSG:4326&projections=EPSG:3857" }
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: ActionType.TASK_INVOKE_URL,
            payload: { url: "component://AddManageLayers" }
        });
    });

    it("registers restore and refresh commands with expected viewer interactions", () => {
        const restoreCmd = getCommand(DefaultCommands.RestoreView);
        const refreshCmd = getCommand(DefaultCommands.RefreshMap);
        const state = createInitialState();
        state.config.activeMapName = "Main";
        state.mapState = {
            Main: {
                externalBaseLayers: [],
                initialExternalLayers: [],
                currentView: undefined,
                initialView: { x: 11, y: 22, scale: 3333 },
                history: [],
                historyIndex: -1,
                generic: undefined,
                clientSelection: undefined,
                mapguide: undefined,
                layers: []
            } as any
        };
        const dispatched: any[] = [];
        const dispatch = vi.fn((action) => {
            if (typeof action === "function") {
                return action(dispatch, () => state);
            }
            dispatched.push(action);
            return action;
        });
        const viewer = {
            zoomToView: vi.fn(),
            initialView: vi.fn(),
            refreshMap: vi.fn()
        };

        restoreCmd?.invoke(dispatch as any, () => state, viewer as any);
        refreshCmd?.invoke(dispatch as any, () => state, viewer as any);

        expect(viewer.zoomToView).toHaveBeenCalledWith(11, 22, 3333);
        expect(viewer.initialView).not.toHaveBeenCalled();
        expect(viewer.refreshMap).toHaveBeenCalledWith(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
    });

    it("registers previous and next view commands that dispatch when an active map exists", () => {
        const previousCmd = getCommand(DefaultCommands.PreviousView);
        const nextCmd = getCommand(DefaultCommands.NextView);
        const dispatch = vi.fn((action) => action);
        const state = createInitialState();
        state.config.activeMapName = "Main";

        previousCmd?.invoke(dispatch as any, () => state, undefined as any);
        nextCmd?.invoke(dispatch as any, () => state, undefined as any);

        expect(dispatch.mock.calls[0][0]).toEqual({ type: ActionType.MAP_PREVIOUS_VIEW, payload: { mapName: "Main" } });
        expect(dispatch.mock.calls[1][0]).toEqual({ type: ActionType.MAP_NEXT_VIEW, payload: { mapName: "Main" } });
    });

    it("registers the map swipe command with primary-map enablement and toggle behavior", () => {
        const swipeCmd = getCommand(DefaultCommands.MapSwipe);
        const toolbarState = {
            mapSwipePairs: [{ primaryMapName: "Main", secondaryMapName: "Inset" }],
            activeMapName: "Main",
            swipeActive: false
        };
        const dispatch = vi.fn((action) => action);
        const state = createInitialState();
        (state.config as any).swipeActive = false;

        expect(swipeCmd?.enabled(toolbarState as any)).toBe(true);
        expect(swipeCmd?.selected(toolbarState as any)).toBe(false);

        swipeCmd?.invoke(dispatch as any, () => state, undefined as any);

        expect(dispatch).toHaveBeenCalledWith({
            type: ActionType.MAP_SET_SWIPE_MODE,
            payload: { active: true }
        });
    });

    it("registers Fusion helper commands that show template panels", () => {
        const showTaskPaneCmd = getCommand("showTaskPane");
        const showLegendCmd = getCommand("showLegend");
        const showSelectionPanelCmd = getCommand("showSelectionPanel");
        const dispatch = vi.fn((action) => action);

        showTaskPaneCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);
        showLegendCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);
        showSelectionPanelCmd?.invoke(dispatch as any, () => createInitialState(), undefined as any);

        expect(dispatch.mock.calls[0][0]).toEqual({ type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY, payload: true });
        expect(dispatch.mock.calls[1][0]).toEqual({ type: ActionType.FUSION_SET_LEGEND_VISIBILITY, payload: true });
        expect(dispatch.mock.calls[2][0]).toEqual({ type: ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY, payload: true });
    });

    it("exposes default selected and enabled predicates for simple commands", () => {
        const simpleCommands = [
            DefaultCommands.ZoomIn,
            DefaultCommands.ZoomOut,
            DefaultCommands.PanLeft,
            DefaultCommands.PanRight,
            DefaultCommands.PanUp,
            DefaultCommands.PanDown,
            DefaultCommands.About,
            DefaultCommands.Help,
            DefaultCommands.Measure,
            DefaultCommands.RestoreView,
            DefaultCommands.ZoomExtents,
            DefaultCommands.CoordinateTracker,
            DefaultCommands.AddManageLayers,
            DefaultCommands.Print
        ];
        const busyAwareCommands = ["showTaskPane", "showLegend", "showSelectionPanel"];

        for (const name of simpleCommands) {
            const cmd = getCommand(name);
            expect(cmd).toBeDefined();
            expect(cmd?.selected({} as any)).toBe(false);
            expect(cmd?.enabled({} as any)).toBe(true);
        }
        for (const name of busyAwareCommands) {
            const cmd = getCommand(name);
            expect(cmd).toBeDefined();
            expect(cmd?.selected({} as any)).toBe(false);
            expect(cmd?.enabled({ busyWorkerCount: 0 } as any)).toBe(true);
        }
    });

    it("registers zoom extents and restore view fallback commands that call viewer.initialView", () => {
        const restoreCmd = getCommand(DefaultCommands.RestoreView);
        const zoomExtentsCmd = getCommand(DefaultCommands.ZoomExtents);
        const state = createInitialState();
        const viewer = {
            initialView: vi.fn(),
            zoomToView: vi.fn()
        };

        restoreCmd?.invoke(vi.fn() as any, () => state, viewer as any);
        zoomExtentsCmd?.invoke(vi.fn() as any, () => state, viewer as any);

        expect(viewer.initialView).toHaveBeenCalledTimes(2);
        expect(viewer.zoomToView).not.toHaveBeenCalled();
    });

    it("registers geolocation command that zooms and shows success toast for coordinates inside the map", () => {
        const geolocationCmd = getCommand(DefaultCommands.Geolocation);
        const state = createInitialState();
        state.config.activeMapName = "Main";
        state.mapState = {
            Main: {
                externalBaseLayers: [],
                initialExternalLayers: [],
                currentView: { x: 1, y: 2, scale: 3000 },
                initialView: undefined,
                history: [],
                historyIndex: -1,
                generic: undefined,
                clientSelection: undefined,
                mapguide: {
                    runtimeMap: {
                        CoordinateSystem: { EpsgCode: 4326 },
                        Extents: {
                            LowerLeftCoordinate: { X: 0, Y: 0 },
                            UpperRightCoordinate: { X: 100, Y: 100 }
                        }
                    }
                },
                layers: []
            } as any
        };
        const viewer = {
            getProjection: vi.fn(() => "EPSG:3857"),
            getOLFactory: vi.fn(() => ({
                transformCoordinateFromLonLat: vi.fn((_coord, _proj) => [12, 34]),
                extentContainsXY: vi.fn(() => true)
            })),
            zoomToView: vi.fn(),
            toastSuccess: vi.fn(),
            toastWarning: vi.fn(),
            toastError: vi.fn()
        };
        const geolocation = {
            getCurrentPosition: vi.fn((success, _error, options) => {
                success({ coords: { longitude: 10, latitude: 20 } } as GeolocationPosition);
                expect(options).toEqual({ enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 });
            })
        };
        Object.defineProperty(navigator, "geolocation", {
            configurable: true,
            value: geolocation
        });
        const geoSpy = vi.spyOn(geolocation, "getCurrentPosition");

        geolocationCmd?.invoke(vi.fn() as any, () => state, viewer as any, {
            ZoomLevel: "1234",
            EnableHighAccuracy: "true",
            Timeout: "5000",
            MaximumAge: "1000"
        });

        expect(viewer.zoomToView).toHaveBeenCalledWith(12, 34, 1234);
        expect(viewer.toastSuccess).toHaveBeenCalledTimes(1);
        expect(viewer.toastWarning).not.toHaveBeenCalled();
        expect(viewer.toastError).not.toHaveBeenCalled();
        geoSpy.mockRestore();
    });
});