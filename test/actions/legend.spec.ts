import { describe, it, expect } from "vitest";
import { setGroupVisibility, setLayerVisibility, setGroupExpanded, setLayerSelectable } from "../../src/actions/legend";
import { ActionType } from "../../src/constants/actions";

describe("actions/legend", () => {
    it("setGroupVisibility creates correct action", () => {
        const action = setGroupVisibility("Map1", { id: "group1", value: true });
        expect(action.type).toBe(ActionType.LEGEND_SET_GROUP_VISIBILITY);
        expect(action.payload).toEqual({ id: "group1", value: true, mapName: "Map1" });
    });
    it("setLayerVisibility creates correct action", () => {
        const action = setLayerVisibility("Map1", { id: "layer1", value: false });
        expect(action.type).toBe(ActionType.LEGEND_SET_LAYER_VISIBILITY);
        expect(action.payload).toEqual({ id: "layer1", value: false, mapName: "Map1" });
    });
    it("setGroupExpanded creates correct action", () => {
        const action = setGroupExpanded("Map1", { id: "group2", value: true });
        expect(action.type).toBe(ActionType.LEGEND_SET_GROUP_EXPANDABLE);
        expect(action.payload).toEqual({ id: "group2", value: true, mapName: "Map1" });
    });
    it("setGroupExpanded creates correct action when collapsing", () => {
        const action = setGroupExpanded("Map2", { id: "g1", value: false });
        expect(action.type).toBe(ActionType.LEGEND_SET_GROUP_EXPANDABLE);
        expect(action.payload).toEqual({ id: "g1", value: false, mapName: "Map2" });
    });
    it("setLayerSelectable creates correct action", () => {
        const action = setLayerSelectable("Map1", { id: "layer2", value: true });
        expect(action.type).toBe(ActionType.LEGEND_SET_LAYER_SELECTABLE);
        expect(action.payload).toEqual({ id: "layer2", value: true, mapName: "Map1" });
    });
    it("setLayerSelectable creates correct action when disabling", () => {
        const action = setLayerSelectable("Map2", { id: "layer3", value: false });
        expect(action.type).toBe(ActionType.LEGEND_SET_LAYER_SELECTABLE);
        expect(action.payload).toEqual({ id: "layer3", value: false, mapName: "Map2" });
    });
});
