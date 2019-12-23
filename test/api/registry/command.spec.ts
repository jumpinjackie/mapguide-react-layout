import { CommandConditions, mergeInvokeUrlParameters, reduceAppToToolbarState } from "../../../src/api/registry/command";
import { createInitialState, createMap, createSelectionSet } from "../../../test-data";

describe("api/registry/command", () => {
    describe("mergeInvokeUrlParameters", () => {
        it("returns itself if no extra parameters", () => {
            const p = [
                { name: "MAPNAME", value: "Sheboygan" }
            ];
            const merged = mergeInvokeUrlParameters(p);
            expect(merged).toHaveLength(p.length);
            expect(merged[0]).toStrictEqual(p[0]);
        });
        it("appends extra parameters", () => {
            const p = [
                { name: "MAPNAME", value: "Sheboygan" }
            ];
            const merged = mergeInvokeUrlParameters(p, { foo: "bar", baz: 1 });
            expect(merged).toHaveLength(3);
            const p1 = merged.filter(pr => pr.name == "MAPNAME")[0];
            const p2 = merged.filter(pr => pr.name == "foo")[0];
            const p3 = merged.filter(pr => pr.name == "baz")[0];
            expect(p1).not.toBeUndefined();
            expect(p2).not.toBeUndefined();
            expect(p3).not.toBeUndefined();
            expect(p1).not.toBeNull();
            expect(p2).not.toBeNull();
            expect(p3).not.toBeNull();
            expect(p1.value).toBe("Sheboygan");
            expect(p2.value).toBe("bar");
            expect(p3.value).toBe(1);
        });
        it("overwrites existing parameters if specified in extra", () => {
            const p = [
                { name: "MAPNAME", value: "Sheboygan" }
            ];
            const merged = mergeInvokeUrlParameters(p, { MAPNAME: "bar", baz: 1 });
            expect(merged).toHaveLength(2);
            const p1 = merged.filter(pr => pr.name == "MAPNAME")[0];
            const p2 = merged.filter(pr => pr.name == "baz")[0];
            expect(p1).not.toBeUndefined();
            expect(p2).not.toBeUndefined();
            expect(p1).not.toBeNull();
            expect(p2).not.toBeNull();
            expect(p1.value).toBe("bar");
            expect(p2.value).toBe(1);
        })
    });
    describe("CommandConditions", () => {
        it("isNotBusy", () => {
            const state = createInitialState();
            state.viewer = { ...state.viewer, ... { busyCount: 1 }};
            let result = CommandConditions.isNotBusy(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            state.viewer = { ...state.viewer, ... { busyCount: 0 }};
            result = CommandConditions.isNotBusy(reduceAppToToolbarState(state));
            expect(result).toBe(true);
        });
        it("disabledIfEmptySelection", () => {
            const state = createInitialState();
            //No selection
            let result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), {});
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: false });
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: "false" });
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: true });
            expect(result).toBe(true);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: "true" });
            expect(result).toBe(true);
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
                    selectionSet: {
                        SelectedFeatures: createSelectionSet()
                    },
                    layerTransparency: {},
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: [],
                    activeSelectedFeature: undefined,
                    layers: []
                }
            }
            state.mapState = { ...state.mapState, ...ms };
            state.config = { ...state.config, ...{ activeMapName: "Foo" } };
            //Now with selection
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: false });
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: "false" });
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: true });
            expect(result).toBe(false);
            result = CommandConditions.disabledIfEmptySelection(reduceAppToToolbarState(state), { DisableIfSelectionEmpty: "true" });
            expect(result).toBe(false);
        })
        it("hasSelection", () => {
            const state = createInitialState();
            let result = CommandConditions.hasSelection(reduceAppToToolbarState(state));
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
                    layerTransparency: {},
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: [],
                    activeSelectedFeature: undefined,
                    layers: []
                }
            }
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasSelection(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            state.config = { ...state.config, ...{ activeMapName: "Foo" } };
            result = CommandConditions.hasSelection(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            state.mapState["Foo"].selectionSet = {
                SelectedFeatures: createSelectionSet()
            };
            result = CommandConditions.hasSelection(reduceAppToToolbarState(state));
            expect(result).toBe(true);
            state.config = { ...state.config, ...{ activeMapName: undefined } };
            result = CommandConditions.hasSelection(reduceAppToToolbarState(state));
            expect(result).toBe(false);
        });
        it("hasPreviousView", () => {
            const state = createInitialState();
            let result = CommandConditions.hasPreviousView(reduceAppToToolbarState(state));
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
                    layerTransparency: {},
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: [],
                    activeSelectedFeature: undefined,
                    layers: []
                }
            };
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasPreviousView(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            state.mapState["Foo"].historyIndex = 3;
            result = CommandConditions.hasPreviousView(reduceAppToToolbarState(state));
            expect(result).toBe(true);
        });
        it("hasNextView", () => {
            const state = createInitialState();
            let result = CommandConditions.hasNextView(reduceAppToToolbarState(state));
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
                    layerTransparency: {},
                    layerIndex: -1,
                    featureIndex: -1,
                    showGroups: [],
                    showLayers: [],
                    hideGroups: [],
                    hideLayers: [],
                    activeSelectedFeature: undefined,
                    layers: []
                }
            };
            state.mapState = { ...state.mapState, ...ms };
            result = CommandConditions.hasNextView(reduceAppToToolbarState(state));
            expect(result).toBe(false);
            state.mapState["Foo"].historyIndex = 1;
            state.mapState["Foo"].history = [
                { x: 1, y: 1, scale: 1 },
                { x: 1, y: 1, scale: 1 },
                { x: 1, y: 1, scale: 1 },
            ]
            result = CommandConditions.hasNextView(reduceAppToToolbarState(state));
            expect(result).toBe(true);
        });
    });
});