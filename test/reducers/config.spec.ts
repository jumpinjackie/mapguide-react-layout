import * as Constants from "../../src/constants";
import {
    IApplicationState
} from "../../src/api/common";
import { RuntimeMap } from "../../src/api/contracts/runtime-map";
import thunk from 'redux-thunk';
import { createMap, createInitAction, createInitialState } from "../../test-data";
import { configReducer } from "../../src/reducers/config";

describe("reducers/config", () => {
    describe("INIT_APP", () => {
        it("updates", () => {
            /*
            const initialState = createInitialState();
            const map = createMap();
            const view: IView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = configReducer(initialState.config, action as any);

            expect(state).not.toBeNull();
            expect(state).not.toBeNull();
            let conf;
            if (state.activeMapName) {
                conf = state.viewer[state.activeMapName];
            }
            expect(conf).not.toBeUndefined();
            if (conf) {
                expect(conf.imageFormat).toBe(action.payload.config[map.Name].imageFormat);
                expect(conf.selectionImageFormat).toBe(action.payload.config[map.Name].selectionImageFormat);
                expect(conf.selectionColor).toBe(action.payload.config[map.Name].selectionColor);
            }
            expect(state.locale).toBe("en");
            expect(state.externalBaseLayers).toHaveLength(0);
            expect(state.capabilities.hasTaskPane).toBe(true);
            expect(state.capabilities.hasTaskBar).toBe(true);
            expect(state.capabilities.hasStatusBar).toBe(true);
            expect(state.capabilities.hasNavigator).toBe(true);
            expect(state.capabilities.hasSelectionPanel).toBe(true);
            expect(state.capabilities.hasLegend).toBe(true);
            expect(state.capabilities.hasToolbar).toBe(false);
            */
        });
    });
    describe("MAP_SET_BASE_LAYER", () => {
        it("updates", () => {
            /*
            const initialState = createInitialState();
            initialState.config.externalBaseLayers = [
                { name: "Foo", kind: "Foo", visible: false },
                { name: "Bar", kind: "Bar", visible: false },
                { name: "OSM", kind: "OSM", visible: false },
                { name: "Bing", kind: "Bing", visible: false }
            ];
            const action = {
                type: Constants.MAP_SET_BASE_LAYER,
                payload: "OSM"
            };
            const state = configReducer(initialState.config, action as any);
            expect(state).not.toBeNull();
            expect(state.externalBaseLayers).toHaveLength(4);
            const visible = state.externalBaseLayers.filter(l => l.visible);
            expect(visible).toHaveLength(1);
            expect(visible[0].name).toBe("OSM");
            */
        });
    });
});