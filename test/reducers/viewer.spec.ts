import { describe, it, expect } from "vitest";
import { enableSelectDragPan, mapResized, setActiveTool, setBusyCount, setFeatureTooltipsEnabled } from "../../src/actions/map";
import { ActiveMapTool, IMapView } from "../../src/api/common";
import { ActionType } from "../../src/constants/actions";
import { viewerReducer } from "../../src/reducers/viewer";
import { createInitialState, createInitAction, createMap } from "../../test-data";

describe("reducers/viewer", () => {
    describe(ActionType.INIT_APP, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view);
            action.payload.initialActiveTool = ActiveMapTool.Zoom;
            action.payload.featureTooltipsEnabled = true;
            const state = viewerReducer(initialState.viewer, action);

            expect(state.featureTooltipsEnabled).toBe(action.payload.featureTooltipsEnabled);
            expect(state.tool).toBe(action.payload.initialActiveTool);
        });
    });
    describe(ActionType.MAP_SET_ACTIVE_TOOL, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = setActiveTool(ActiveMapTool.Pan);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.tool).toBe(action.payload);
        });
    });
    describe(ActionType.MAP_SET_MAPTIP, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = setFeatureTooltipsEnabled(true);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.featureTooltipsEnabled).toBe(action.payload);
        });
    });
    describe(ActionType.MAP_SET_BUSY_COUNT, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = setBusyCount(1234);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.busyCount).toBe(action.payload);
        });
    });
    describe(ActionType.MAP_RESIZED, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const action = mapResized(640, 480);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.size).not.toBeUndefined();
            expect(state.size![0]).toBe(action.payload.width);
            expect(state.size![1]).toBe(action.payload.height);
        });
    });
    describe(ActionType.MAP_ENABLE_SELECT_DRAGPAN, () => {
        it("updates selectCanDragPan when enabled", () => {
            const initialState = createInitialState();
            const action = enableSelectDragPan(true);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.selectCanDragPan).toBe(true);
        });
        it("updates selectCanDragPan when disabled", () => {
            const initialState = createInitialState();
            const action = enableSelectDragPan(false);
            const state = viewerReducer(initialState.viewer, action);
            expect(state.selectCanDragPan).toBe(false);
        });
    });
});