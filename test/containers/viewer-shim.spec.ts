/**
 * Tests for the Fusion API compatibility shim in viewer-shim.tsx.
 *
 * Specifically verifies that `setExtents` (via `resolveSetExtentsBounds`)
 * normalises all three supported calling conventions into the same
 * `[minx, miny, maxx, maxy]` tuple:
 *
 *  1. `setExtents(boundsObject)` – OL2/Fusion-style `{ left, bottom, right, top }`
 *  2. `setExtents([minx, miny, maxx, maxy])` – 4-element number array
 *  3. `setExtents(minx, miny, maxx, maxy)` – four individual number arguments
 *
 * @since 0.15
 */
import { describe, it, expect } from "vitest";
import { resolveSetExtentsBounds } from "../../src/containers/viewer-shim";

describe("resolveSetExtentsBounds", () => {
    const expected: [number, number, number, number] = [-123, 45, -122, 46];

    it("converts an OL2Bounds-compatible object (left/bottom/right/top)", () => {
        const result = resolveSetExtentsBounds({ left: -123, bottom: 45, right: -122, top: 46 });
        expect(result).toEqual(expected);
    });

    it("passes through a 4-element number array unchanged", () => {
        const result = resolveSetExtentsBounds([-123, 45, -122, 46]);
        expect(result).toEqual(expected);
    });

    it("converts four individual number arguments (minx, miny, maxx, maxy)", () => {
        const result = resolveSetExtentsBounds(-123, 45, -122, 46);
        expect(result).toEqual(expected);
    });
});
