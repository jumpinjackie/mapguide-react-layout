/**
 * Tests for the Fusion API compatibility shim in viewer-shim.tsx.
 *
 * Verifies that `setExtents` (via `resolveSetExtentsBounds`) normalises all
 * three supported calling conventions into the same `[minx, miny, maxx, maxy]`
 * tuple and that the result is passed to the underlying `viewer.zoomToExtent`:
 *
 *  1. `setExtents(boundsObject)` – OL2/Fusion-style `{ left, bottom, right, top }`
 *  2. `setExtents([minx, miny, maxx, maxy])` – 4-element number array
 *  3. `setExtents(minx, miny, maxx, maxy)` – four individual number arguments
 *
 * The `resolveSetExtentsBounds` helper is also tested in isolation to confirm
 * its normalisation logic is correct independently of the React component.
 *
 * @since 0.15
 */
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MapProviderContextProvider } from "../../src/components/map-providers/context";
import { configureStore } from "../../src/store/configure-store";
import type { IApplicationState } from "../../src/api/common";
import type { IMapProviderContext } from "../../src/components/map-providers/base";
import { ViewerApiShim, resolveSetExtentsBounds } from "../../src/containers/viewer-shim";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a minimal mock IMapProviderContext whose only responsibility is to
 * stand in for the real viewer during setExtents tests. Only `isReady` and
 * `zoomToExtent` need real implementations; everything else can be a no-op.
 */
function makeViewer(zoomToExtent: ReturnType<typeof vi.fn>): IMapProviderContext {
    return {
        isReady: () => true,
        zoomToExtent,
    } as Partial<IMapProviderContext> as IMapProviderContext;
}

/**
 * Mounts a `ViewerApiShim` component, which installs `window.Fusion` on
 * mount. Returns the unmount function.
 */
function mountShim(zoomToExtent: ReturnType<typeof vi.fn>) {
    const initState: Partial<IApplicationState> = {};
    const store = configureStore(initState);
    const viewer = makeViewer(zoomToExtent);

    const { unmount } = render(
        <Provider store={store}>
            <MapProviderContextProvider value={viewer}>
                <ViewerApiShim />
            </MapProviderContextProvider>
        </Provider>
    );
    return unmount;
}

// ---------------------------------------------------------------------------
// Tests: resolveSetExtentsBounds (unit)
// ---------------------------------------------------------------------------

describe("resolveSetExtentsBounds", () => {
    const expected: [number, number, number, number] = [-123, 45, -122, 46];

    it("converts an OL2Bounds-compatible object (left/bottom/right/top)", () => {
        expect(resolveSetExtentsBounds({ left: -123, bottom: 45, right: -122, top: 46 })).toEqual(expected);
    });

    it("passes through a 4-element number array unchanged", () => {
        expect(resolveSetExtentsBounds([-123, 45, -122, 46])).toEqual(expected);
    });

    it("converts four individual number arguments (minx, miny, maxx, maxy)", () => {
        expect(resolveSetExtentsBounds(-123, 45, -122, 46)).toEqual(expected);
    });
});

// ---------------------------------------------------------------------------
// Tests: setExtents → viewer.zoomToExtent (integration via mounted shim)
// ---------------------------------------------------------------------------

describe("FusionWidgetApiShim.setExtents calls viewer.zoomToExtent", () => {
    const expectedExtent: [number, number, number, number] = [-123, 45, -122, 46];
    let zoomToExtent: ReturnType<typeof vi.fn>;
    let unmount: () => void;
    let fusionWidget: any;

    beforeEach(() => {
        zoomToExtent = vi.fn();
        unmount = mountShim(zoomToExtent);
        fusionWidget = (window as any).Fusion.getWidgetById("Map");
    });

    afterEach(() => {
        unmount();
    });

    it("calls zoomToExtent when passed an OL2Bounds-compatible object", () => {
        fusionWidget.setExtents({ left: -123, bottom: 45, right: -122, top: 46 });
        expect(zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });

    it("calls zoomToExtent when passed a 4-element number array", () => {
        fusionWidget.setExtents([-123, 45, -122, 46]);
        expect(zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });

    it("calls zoomToExtent when passed four individual number arguments", () => {
        fusionWidget.setExtents(-123, 45, -122, 46);
        expect(zoomToExtent).toHaveBeenCalledWith(expectedExtent);
    });
});

