/**
 * Tests for custom hooks exported from containers/hooks.ts.
 *
 * Specifically covers:
 *   - useNamedMapLayers(mapName): returns layers for an explicit map name from
 *     Redux state, or undefined when the map name is absent or not found.
 *
 * @since 0.15
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import type { Store } from "redux";
import { configureStore } from "../../src/store/configure-store";
import type { IApplicationState, ILayerInfo } from "../../src/api/common";
import type { ViewerAction } from "../../src/actions/defs";
import { useNamedMapLayers } from "../../src/containers/hooks";
import { MAP_STATE_INITIAL_SUB_STATE } from "../../src/reducers/map-state";
import { setMapLayerVisibility } from "../../src/actions/map";

type AppStore = Store<Readonly<IApplicationState>, ViewerAction>;

// ---------------------------------------------------------------------------
// Helper: minimal Redux store with a named map entry
// ---------------------------------------------------------------------------
function makeStore(mapState: Partial<IApplicationState["mapState"]> = {}) {
    const initState: Partial<IApplicationState> = {
        mapState: mapState as IApplicationState["mapState"]
    };
    return configureStore(initState) as unknown as AppStore;
}

// ---------------------------------------------------------------------------
// Helper: test component that exposes the hook result via data attribute
// ---------------------------------------------------------------------------
function HookHarness({ mapName }: { mapName: string | undefined }) {
    const layers = useNamedMapLayers(mapName);
    return (
        <div
            data-testid="result"
            data-result={layers === undefined ? "undefined" : JSON.stringify(layers)}
        />
    );
}

// ---------------------------------------------------------------------------
// Minimal ILayerInfo factory — only required fields, no excess properties
// ---------------------------------------------------------------------------
function makeLayerInfo(name: string, opacity = 1, visible = true): ILayerInfo {
    return {
        name,
        displayName: name,
        type: "Vector",
        isExternal: true,
        visible,
        selectable: false,
        opacity,
        busyWorkerCount: 0,
    };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("useNamedMapLayers", () => {
    it("returns undefined when mapName is undefined", () => {
        const store = makeStore({});
        const { getByTestId } = render(
            <Provider store={store}>
                <HookHarness mapName={undefined} />
            </Provider>
        );
        expect(getByTestId("result").dataset.result).toBe("undefined");
    });

    it("does not cause spurious re-renders when mapName is undefined and store is updated", () => {
        // Regression: the equality function was calling areArraysDifferent(undefined, undefined)
        // which returned true (different), causing a re-render on every store update.
        // The fix adds a `left === right` short-circuit so undefined === undefined is treated as equal.
        const store = makeStore({
            Sherbrooke: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers: [makeLayerInfo("roads")]
            }
        });

        let renderCount = 0;
        function CountingHarness() {
            renderCount++;
            const layers = useNamedMapLayers(undefined);
            return (
                <div
                    data-testid="result"
                    data-result={layers === undefined ? "undefined" : JSON.stringify(layers)}
                />
            );
        }

        render(
            <Provider store={store}>
                <CountingHarness />
            </Provider>
        );

        const countAfterMount = renderCount;

        // Trigger a store update that does not affect the hook's selected value (still undefined)
        act(() => {
            store.dispatch(setMapLayerVisibility("Sherbrooke", "roads", false));
        });

        // Without the fix, renderCount would have increased because the equality function
        // incorrectly reported undefined !== undefined. With the fix it stays the same.
        expect(renderCount).toBe(countAfterMount);
    });

    it("returns undefined when the named map is not in state", () => {
        const store = makeStore({});
        const { getByTestId } = render(
            <Provider store={store}>
                <HookHarness mapName="NonExistentMap" />
            </Provider>
        );
        expect(getByTestId("result").dataset.result).toBe("undefined");
    });

    it("returns undefined when the named map has no layers property (layers: undefined)", () => {
        const store = makeStore({
            Sherbrooke: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers: undefined
            }
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <HookHarness mapName="Sherbrooke" />
            </Provider>
        );
        expect(getByTestId("result").dataset.result).toBe("undefined");
    });

    it("returns the layers array when the named map exists with layers", () => {
        const layers = [makeLayerInfo("roads"), makeLayerInfo("parcels")];
        const store = makeStore({
            Sherbrooke: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers
            }
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <HookHarness mapName="Sherbrooke" />
            </Provider>
        );
        const result = JSON.parse(getByTestId("result").dataset.result!);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("roads");
        expect(result[1].name).toBe("parcels");
    });

    it("reflects Redux state changes when the store is updated", () => {
        const layers = [makeLayerInfo("roads", 1, true)];
        const store = makeStore({
            Sherbrooke: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers
            }
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <HookHarness mapName="Sherbrooke" />
            </Provider>
        );

        // Initial state: roads layer is visible
        const initial = JSON.parse(getByTestId("result").dataset.result!);
        expect(initial[0].visible).toBe(true);

        // Dispatch SET_LAYER_VISIBILITY to toggle visibility off
        act(() => {
            store.dispatch(setMapLayerVisibility("Sherbrooke", "roads", false));
        });

        // Hook should now reflect the updated layer state
        const updated = JSON.parse(getByTestId("result").dataset.result!);
        expect(updated[0].visible).toBe(false);
    });

    it("is independent of the active map: changing mapName to another map returns that map's layers", () => {
        const store = makeStore({
            Primary: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers: [makeLayerInfo("primaryLayer")]
            },
            Secondary: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                layers: [makeLayerInfo("secondaryLayer"), makeLayerInfo("anotherLayer")]
            }
        });

        const { getByTestId, rerender } = render(
            <Provider store={store}>
                <HookHarness mapName="Primary" />
            </Provider>
        );

        const primaryResult = JSON.parse(getByTestId("result").dataset.result!);
        expect(primaryResult).toHaveLength(1);
        expect(primaryResult[0].name).toBe("primaryLayer");

        rerender(
            <Provider store={store}>
                <HookHarness mapName="Secondary" />
            </Provider>
        );

        const secondaryResult = JSON.parse(getByTestId("result").dataset.result!);
        expect(secondaryResult).toHaveLength(2);
        expect(secondaryResult[0].name).toBe("secondaryLayer");
        expect(secondaryResult[1].name).toBe("anotherLayer");
    });
});
