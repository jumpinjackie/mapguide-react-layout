import {
    IMapView
} from "../../src/api/common";
import { createMap, createInitAction, createInitialState } from "../../test-data";
import { configReducer } from "../../src/reducers/config";

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
            const initLocale = "de";
            const initImageFormat = "PNG8";
            const initSelectionImageFormat = "GIF";
            const initSelectionColor = "0x00FF00AA";
            const coordDecimals = "2";
            const coordFormat = "Foo: {x}, Bar: {y} {units}";
            const coordProjection = "EPSG:3857";
            const action = createInitAction(map,
                view,
                initLocale,
                initImageFormat,
                initSelectionImageFormat,
                initSelectionColor,
                coordDecimals,
                coordFormat,
                coordProjection);
            const state = configReducer(initialState.config, action as any);

            expect(state).not.toBeNull();
            expect(state).not.toBeNull();
            expect(state.activeMapName).toBe(map.Name);

            expect(state.viewer).not.toBeUndefined();
            const vw = state.viewer!;

            expect(state.locale).toBe(initLocale);
            expect(vw.imageFormat).toBe(initImageFormat);
            expect(vw.selectionImageFormat).toBe(initSelectionImageFormat);
            expect(vw.selectionColor).toBe(initSelectionColor);
            
            const cs = state.coordinates!;
            expect(cs).not.toBeUndefined();
            expect(cs.decimals).toBe(coordDecimals);
            expect(cs.format).toBe(coordFormat);
            expect(cs.projection).toBe(coordProjection);

            expect(state.capabilities).not.toBeUndefined();
            const caps = state.capabilities!;
            expect(caps.hasTaskPane).toBe(true);
            expect(caps.hasTaskBar).toBe(true);
            expect(caps.hasStatusBar).toBe(true);
            expect(caps.hasNavigator).toBe(true);
            expect(caps.hasSelectionPanel).toBe(true);
            expect(caps.hasLegend).toBe(true);
            expect(caps.hasToolbar).toBe(false);
        });
    });
});