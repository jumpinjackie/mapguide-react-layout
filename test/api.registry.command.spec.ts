import { CommandConditions } from "../src/api/registry/command";
import { IApplicationState } from "../src/api/common";
import { createInitialState, createMap, createSelectionSet } from "../test-data";

describe("api/registry/command", () => {
    describe("CommandConditions", () => {
        it("isNotBusy", () => {
            const state = createInitialState();
            state.viewer = { ...state.viewer, ... { busyCount: 1 }};
            let result = CommandConditions.isNotBusy(state);
            expect(result).toBe(false);
            state.viewer = { ...state.viewer, ... { busyCount: 0 }};
            result = CommandConditions.isNotBusy(state);
            expect(result).toBe(true);
        });
        it("hasSelection", () => {
            const state = createInitialState();
            let result = CommandConditions.hasSelection(state);
            expect(result).toBe(false);
            const ms = {
                ["Foo"]: {
                    externalBaseLayers: [],
                    currentView: undefined,
                    initialView: undefined,
                    history: [],
                    historyIndex: -1,
                    runtimeMap: createMap(),
                    selectableLayers: [],
                    expandedGroups: [],
                    selectionSet: undefined,
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: []
                }
            }
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasSelection(state);
            expect(result).toBe(false);
            state.config = { ...state.config, ...{ activeMapName: "Foo" } };
            result = CommandConditions.hasSelection(state);
            expect(result).toBe(false);
            state.mapState["Foo"].selectionSet = {
                SelectedFeatures: createSelectionSet()
            };
            result = CommandConditions.hasSelection(state);
            expect(result).toBe(true);
            state.config = { ...state.config, ...{ activeMapName: undefined } };
            result = CommandConditions.hasSelection(state);
            expect(result).toBe(false);
        });
        it("hasPreviousView", () => {
            const state = createInitialState();
            let result = CommandConditions.hasPreviousView(state);
            expect(result).toBe(false);
            state.config = { ...state.config, ...{ activeMapName: "Foo" } };
            const ms = {
                ["Foo"]: {
                    externalBaseLayers: [],
                    currentView: undefined,
                    initialView: undefined,
                    history: [],
                    historyIndex: -1,
                    runtimeMap: createMap(),
                    selectableLayers: [],
                    expandedGroups: [],
                    selectionSet: undefined,
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: []
                }
            };
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasPreviousView(state);
            expect(result).toBe(false);
            state.mapState["Foo"].historyIndex = 3;
            result = CommandConditions.hasPreviousView(state);
            expect(result).toBe(true);
        });
        it("hasNextView", () => {
            const state = createInitialState();
            let result = CommandConditions.hasNextView(state);
            expect(result).toBe(false);
            state.config = { ...state.config, ...{ activeMapName: "Foo" } };
            const ms = {
                ["Foo"]: {
                    externalBaseLayers: [],
                    currentView: undefined,
                    initialView: undefined,
                    history: [],
                    historyIndex: -1,
                    runtimeMap: createMap(),
                    selectableLayers: [],
                    expandedGroups: [],
                    selectionSet: undefined,
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: []
                }
            };
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasNextView(state);
            expect(result).toBe(false);
            state.mapState["Foo"].historyIndex = 1;
            state.mapState["Foo"].history = [
                { x: 1, y: 1, scale: 1 },
                { x: 1, y: 1, scale: 1 },
                { x: 1, y: 1, scale: 1 },
            ]
            result = CommandConditions.hasNextView(state);
            expect(result).toBe(true);
        });
    });
});