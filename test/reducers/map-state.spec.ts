import { setBaseLayer } from "../../src/actions/map";
import { IMapView } from "../../src/api/common";
import { mapStateReducer } from "../../src/reducers/map-state";
import { createMap, createInitAction, createInitialState } from "../../test-data";

describe("reducers/config", () => {
    describe("INIT_APP", () => {
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
    describe("MAP_SET_BASE_LAYER", () => {
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
});