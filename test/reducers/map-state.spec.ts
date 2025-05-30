import { describe, it, expect, vi } from "vitest";
import { IMapSetViewAction } from "../../src/actions/defs";
import { setGroupExpanded, setGroupVisibility, setLayerSelectable, setLayerVisibility } from "../../src/actions/legend";
import { addClientSelectedFeature, clearClientSelection, nextView, previousView, setBaseLayer, setCurrentView, setScale, setSelection } from "../../src/actions/map";
import { IMapView } from "../../src/api/common";
import { RuntimeMap } from "../../src/api/contracts/runtime-map";
import { ActionType } from "../../src/constants/actions";
import { mapStateReducer } from "../../src/reducers/map-state";
import { createMap, createInitAction, createInitialState, createQueryMapFeaturesResponse } from "../../test-data";

describe("reducers/config", () => {
    describe(ActionType.INIT_APP, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const ms = state[map.Name]!;
            expect(ms).not.toBeUndefined();
            expect(ms.clientSelection).toBeUndefined();
            expect(ms.initialExternalLayers).toHaveLength(0);
            expect(ms.currentView).not.toBeUndefined();
            expect(ms.currentView?.x).toBe(view.x);
            expect(ms.currentView?.y).toBe(view.y);
            expect(ms.currentView?.scale).toBe(view.scale);
        });
    });
    describe(ActionType.MAP_SET_BASE_LAYER, () => {
        it("updates", () => {
            const initialState = JSON.parse(JSON.stringify(createInitialState()));
            const mapName = "Foo";
            initialState.config.activeMapName = mapName;
            initialState.mapState[initialState.config.activeMapName] = {};
            initialState.mapState[initialState.config.activeMapName].externalBaseLayers = [
                { name: "Foo", kind: "Foo", visible: false },
                { name: "Bar", kind: "Bar", visible: false },
                { name: "OSM", kind: "OSM", visible: false },
                { name: "Bing", kind: "Bing", visible: false }
            ];
            const action = setBaseLayer(mapName, "OSM");
            const state = mapStateReducer(initialState.mapState, action);
            const ms = state[mapName]!;
            expect(ms).not.toBeUndefined();
            expect(ms.externalBaseLayers).toHaveLength(4);
            const visible = ms.externalBaseLayers.filter(l => l.visible);
            expect(visible).toHaveLength(1);
            expect(visible[0].name).toBe("OSM");
        });
    });
    describe(ActionType.MAP_SET_SCALE, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const viewer = {
                isReady: () => false,
                scaleToResolution: vi.fn()
            };

            const action2 = setScale(viewer, map.Name, 2000);
            const state2 = mapStateReducer(state, action2);

            const ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.currentView).not.toBeUndefined();
            expect(ms.currentView?.x).toBe(view.x);
            expect(ms.currentView?.y).toBe(view.y);
            expect(ms.currentView?.scale).toBe(2000);

            expect(ms.history).toHaveLength(1);
        });
    });
    describe(ActionType.LEGEND_SET_LAYER_VISIBILITY, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map: RuntimeMap = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const layerId = map.Layer?.find(l => l.Name == "Parcels")?.ObjectId;
            expect(layerId).not.toBeUndefined();
            const action2 = setLayerVisibility(map.Name, {
                id: layerId!,
                value: true
            })
            const state2 = mapStateReducer(state, action2);

            let ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.showLayers).toHaveLength(1);
            expect(ms.mapguide?.showLayers).toContain(layerId);

            const action3 = setLayerVisibility(map.Name, {
                id: layerId!,
                value: false
            });
            const state3 = mapStateReducer(state2, action3);
            ms = state3[map.Name];

            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.showLayers).toHaveLength(0);
            expect(ms.mapguide?.hideLayers).toHaveLength(1);
            expect(ms.mapguide?.hideLayers).toContain(layerId);
        });
    });
    describe(ActionType.LEGEND_SET_GROUP_VISIBILITY, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map: RuntimeMap = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const groupId = map.Group?.find(l => l.Name == "Base Map")?.ObjectId;
            expect(groupId).not.toBeUndefined();
            const action2 = setGroupVisibility(map.Name, {
                id: groupId!,
                value: true
            })
            const state2 = mapStateReducer(state, action2);

            let ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.showGroups).toHaveLength(1);
            expect(ms.mapguide?.showGroups).toContain(groupId);

            const action3 = setGroupVisibility(map.Name, {
                id: groupId!,
                value: false
            });
            const state3 = mapStateReducer(state2, action3);
            ms = state3[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.showGroups).toHaveLength(0);
            expect(ms.mapguide?.hideGroups).toHaveLength(1);
            expect(ms.mapguide?.hideGroups).toContain(groupId);
        });
    });
    describe(ActionType.LEGEND_SET_LAYER_SELECTABLE, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map: RuntimeMap = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const layerId = map.Layer?.find(l => l.Name == "Parcels")?.ObjectId;
            expect(layerId).not.toBeUndefined();
            const action2 = setLayerSelectable(map.Name, {
                id: layerId!,
                value: true
            });

            const state2 = mapStateReducer(state, action2);
            let ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(Object.keys(ms.mapguide?.selectableLayers)).toHaveLength(1);
            expect(ms.mapguide?.selectableLayers[layerId!]).not.toBeUndefined();
            expect(ms.mapguide?.selectableLayers[layerId!]).toBe(true);

            const action3 = setLayerSelectable(map.Name, {
                id: layerId!,
                value: false
            });
            const state3 = mapStateReducer(state2, action3);
            ms = state3[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(Object.keys(ms.mapguide?.selectableLayers)).toHaveLength(1);
            expect(ms.mapguide?.selectableLayers[layerId!]).not.toBeUndefined();
            expect(ms.mapguide?.selectableLayers[layerId!]).toBe(false);
        });
    });
    describe(ActionType.LEGEND_SET_GROUP_EXPANDABLE, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map: RuntimeMap = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const groupId = map.Group?.find(l => l.Name == "Base Map")?.ObjectId;
            expect(groupId).not.toBeUndefined();

            const action2 = setGroupExpanded(map.Name, {
                id: groupId!,
                value: true
            });
            const state2 = mapStateReducer(state, action2);

            let ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(Object.keys(ms.mapguide?.expandedGroups)).toHaveLength(1);
            expect(ms.mapguide?.expandedGroups[groupId!]).not.toBeUndefined();
            expect(ms.mapguide?.expandedGroups[groupId!]).toBe(true);

            const action3 = setGroupExpanded(map.Name, {
                id: groupId!,
                value: false
            });
            const state3 = mapStateReducer(state2, action3);

            ms = state3[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(Object.keys(ms.mapguide?.expandedGroups)).toHaveLength(1);
            expect(ms.mapguide?.expandedGroups[groupId!]).not.toBeUndefined();
            expect(ms.mapguide?.expandedGroups[groupId!]).toBe(false);
        });
    });
    describe(ActionType.MAP_SET_SELECTION, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map: RuntimeMap = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = mapStateReducer(initialState.mapState, action);

            const sel = createQueryMapFeaturesResponse();
            const action2 = setSelection(map.Name, sel);
            const state2 = mapStateReducer(state,action2);

            let ms = state2[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.selectionSet).toBe(sel);

            const action3 = setSelection(map.Name, undefined);
            const state3 = mapStateReducer(state2,action3);

            ms = state3[map.Name];
            expect(ms).not.toBeUndefined();
            expect(ms.mapguide).not.toBeUndefined();
            expect(ms.mapguide?.selectionSet).toBeUndefined();
        });
    });
    it("Client feature selection", () => {
        const initialState = createInitialState();
        const map: RuntimeMap = createMap();
        const view: IMapView = {
            x: -87.72,
            y: 43.74,
            scale: 70000
        };
        const action = createInitAction(map, view, "en");
        const state = mapStateReducer(initialState.mapState, action);

        const action2 = addClientSelectedFeature(map.Name, "Incidents", {
            properties: {
                id: "foo",
                name: "bar"
            }
        });
        const state2 = mapStateReducer(state, action2);
        let ms = state2[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.clientSelection).not.toBeUndefined();
        expect(ms.clientSelection?.layers).toHaveLength(1);
        expect(ms.clientSelection?.layers[0].name).toBe("Incidents");
        expect(ms.clientSelection?.layers[0].features).toHaveLength(1);
        expect(ms.clientSelection?.layers[0].features[0].properties).not.toBeUndefined();
        expect(ms.clientSelection?.layers[0].features[0].properties.id).toBe("foo");
        expect(ms.clientSelection?.layers[0].features[0].properties.name).toBe("bar");

        //Now clear it
        const action3 = clearClientSelection(map.Name);
        const state3 = mapStateReducer(state2, action3);
        ms = state3[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.clientSelection).toBeUndefined();
    });
    it("Basic navigation", () => {
        const initialState = createInitialState();
        const map: RuntimeMap = createMap();
        const view: IMapView = {
            x: -87.72,
            y: 43.74,
            scale: 70000
        };
        const action = createInitAction(map, view, "en");
        const state = mapStateReducer(initialState.mapState, action);

        // Go to a spot
        const view1: IMapView = {
            x: -87.22,
            y: 43.34,
            scale: 60000
        };
        const action2: IMapSetViewAction = {
            type: ActionType.MAP_SET_VIEW,
            payload: {
                mapName: map.Name,
                view: view1
            }
        };
        const state2 = mapStateReducer(state, action2);
        let ms = state2[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(1);
        expect(ms.historyIndex).toBe(0);
        expect(ms.history[ms.historyIndex].x).toBe(view1.x);
        expect(ms.history[ms.historyIndex].y).toBe(view1.y);
        expect(ms.history[ms.historyIndex].scale).toBe(view1.scale);

        // Go to another spot
        const view2: IMapView = {
            x: -87.22,
            y: 43.34,
            scale: 60000
        };
        const action3: IMapSetViewAction = {
            type: ActionType.MAP_SET_VIEW,
            payload: {
                mapName: map.Name,
                view: view1
            }
        };
        const state3 = mapStateReducer(state2, action3);
        ms = state3[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(2);
        expect(ms.historyIndex).toBe(1);
        expect(ms.history[ms.historyIndex].x).toBe(view2.x);
        expect(ms.history[ms.historyIndex].y).toBe(view2.y);
        expect(ms.history[ms.historyIndex].scale).toBe(view2.scale);

        // Go to previous view
        const action4 = previousView(map.Name);
        const state4 = mapStateReducer(state3, action4);
        ms = state4[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(2);
        expect(ms.historyIndex).toBe(0);
        expect(ms.currentView?.x).toBe(view1.x);
        expect(ms.currentView?.y).toBe(view1.y);
        expect(ms.currentView?.scale).toBe(view1.scale);

        // Go to previous view - should no-op
        const action5 = previousView(map.Name);
        const state5 = mapStateReducer(state4, action5);
        ms = state5[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(2);
        expect(ms.historyIndex).toBe(0);
        expect(ms.currentView?.x).toBe(view1.x);
        expect(ms.currentView?.y).toBe(view1.y);
        expect(ms.currentView?.scale).toBe(view1.scale);

        // Go to next view
        const action6 = nextView(map.Name);
        const state6 = mapStateReducer(state5, action6);
        ms = state6[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(2);
        expect(ms.historyIndex).toBe(1);
        expect(ms.currentView?.x).toBe(view2.x);
        expect(ms.currentView?.y).toBe(view2.y);
        expect(ms.currentView?.scale).toBe(view2.scale);

        // Go to next view - should no-op
        const action7 = nextView(map.Name);
        const state7 = mapStateReducer(state6, action7);
        ms = state7[map.Name];
        expect(ms).not.toBeUndefined();
        expect(ms.history).toHaveLength(2);
        expect(ms.historyIndex).toBe(1);
        expect(ms.currentView?.x).toBe(view2.x);
        expect(ms.currentView?.y).toBe(view2.y);
        expect(ms.currentView?.scale).toBe(view2.scale);
    });
});