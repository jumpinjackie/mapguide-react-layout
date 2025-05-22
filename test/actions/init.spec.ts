import { describe, it, expect } from "vitest";
import { applyInitialBaseLayerVisibility } from "../../src/actions/init";

describe("actions/init", () => {
    it("applyInitialBaseLayerVisibility sets first non-UTFGrid visible", () => {
        const layers = [
            { kind: "UTFGrid", visible: false },
            { kind: "OSM", visible: false },
            { kind: "UTFGrid", visible: false }
        ];
        applyInitialBaseLayerVisibility(layers as any);
        expect(layers[1].visible).toBe(true);
        expect(layers[0].visible).toBe(true);
        expect(layers[2].visible).toBe(true);
    });
    it("does nothing if no layers", () => {
        const layers: any[] = [];
        applyInitialBaseLayerVisibility(layers);
        expect(layers).toHaveLength(0);
    });
});
