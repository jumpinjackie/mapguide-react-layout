import { describe, it, expect } from "vitest";
import { setGroupVisibility, setLayerVisibility } from "../../src/actions/legend";
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
});
