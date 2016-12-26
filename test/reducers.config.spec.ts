import { expect } from 'chai';
import * as Constants from "../src/constants";
import { IView } from "../src/api/contracts/common";
import { IApplicationState } from "../src/api/common";
import { RuntimeMap } from "../src/api/contracts/runtime-map";
import thunk from 'redux-thunk';
import { createMap, createInitAction, createInitialState } from "./test-data";
import { configReducer } from "../src/reducers/config";

describe("reducers/config", () => {
    describe("INIT_APP", () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view, "en");
            const state = configReducer(initialState.config, action as any);

            expect(state).to.not.be.null;
            expect(state.viewer).to.not.be.null;
            expect(state.viewer.imageFormat).to.be.equal(action.payload.config.imageFormat);
            expect(state.viewer.selectionImageFormat).to.be.equal(action.payload.config.selectionImageFormat);
            expect(state.viewer.selectionColor).to.be.equal(action.payload.config.selectionColor);
            expect(state.locale).to.be.equal("en");
            expect(state.externalBaseLayers).to.have.length(0);
            expect(state.capabilities.hasTaskPane).to.be.true;
            expect(state.capabilities.hasTaskBar).to.be.true;
            expect(state.capabilities.hasStatusBar).to.be.true;
            expect(state.capabilities.hasNavigator).to.be.true;
            expect(state.capabilities.hasSelectionPanel).to.be.true;
            expect(state.capabilities.hasLegend).to.be.true;
            expect(state.capabilities.hasToolbar).to.be.false;
        });
    });
    describe("MAP_SET_BASE_LAYER", () => {
        it("updates", () => {
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
            expect(state).to.not.be.null;
            expect(state.externalBaseLayers).to.have.length(4);
            const visible = state.externalBaseLayers.filter(l => l.visible);
            expect(visible).to.have.length(1);
            expect(visible[0].name).to.be.equal("OSM");
        });
    });
});