import { describe, it, expect } from "vitest";
import {
    isModalDisplayOptions,
    isModalComponentDisplayOptions,
    isError,
    isInitError,
    isMenuRef,
    isComponentFlyout,
    isMenu,
    isLayer,
    isMapView,
    isCoordinate,
    isAction,
    isRuntimeMap
} from "../../src/utils/type-guards";

describe("utils/type-guards", () => {
    describe("isModalDisplayOptions", () => {
        it("returns true for object with url", () => {
            expect(isModalDisplayOptions({ url: "foo" })).toBe(true);
        });
        it("returns false for object without url", () => {
            expect(isModalDisplayOptions({})).toBe(false);
            expect(isModalDisplayOptions(undefined)).toBe(false);
            expect(isModalDisplayOptions(null)).toBe(false);
        });
    });

    describe("isModalComponentDisplayOptions", () => {
        it("returns true for object with component", () => {
            expect(isModalComponentDisplayOptions({ component: "MyComponent" })).toBe(true);
        });
        it("returns false for object without component", () => {
            expect(isModalComponentDisplayOptions({ url: "foo" })).toBe(false);
        });
    });

    describe("isError", () => {
        it("returns true for Error instances", () => {
            expect(isError(new Error("test"))).toBe(true);
        });
        it("returns false for non-Error objects", () => {
            expect(isError({ message: "test" })).toBe(false);
            expect(isError("test")).toBe(false);
            expect(isError(null)).toBe(false);
        });
    });

    describe("isInitError", () => {
        it("returns true for object with message and stack", () => {
            expect(isInitError({ message: "err", stack: ["line1"] })).toBe(true);
        });
        it("returns false for object without message", () => {
            expect(isInitError({ stack: ["line1"] })).toBe(false);
        });
    });

    describe("isMenuRef", () => {
        it("returns true for object with flyoutId", () => {
            expect(isMenuRef({ flyoutId: "myFlyout" })).toBe(true);
        });
        it("returns false for object without flyoutId", () => {
            expect(isMenuRef({ label: "myMenu" })).toBe(false);
        });
    });

    describe("isComponentFlyout", () => {
        it("returns true for object with componentName", () => {
            expect(isComponentFlyout({ componentName: "MyComponent" })).toBe(true);
        });
        it("returns false for object without componentName", () => {
            expect(isComponentFlyout({ label: "test" })).toBe(false);
        });
    });

    describe("isMenu", () => {
        it("returns true for object with childItems", () => {
            expect(isMenu({ childItems: [] })).toBe(true);
        });
        it("returns false for object without childItems", () => {
            expect(isMenu({ label: "test" })).toBe(false);
        });
    });

    describe("isLayer", () => {
        it("returns true for object with LayerDefinition", () => {
            expect(isLayer({ LayerDefinition: "Library://MyLayer.LayerDefinition" })).toBe(true);
        });
        it("returns false for object without LayerDefinition", () => {
            expect(isLayer({ Name: "GroupName" })).toBe(false);
        });
    });

    describe("isMapView", () => {
        it("returns true for object with x, y, scale as numbers", () => {
            expect(isMapView({ x: 1, y: 2, scale: 1000 })).toBe(true);
        });
        it("returns false for object with non-number properties", () => {
            expect(isMapView({ x: "1", y: 2, scale: 1000 })).toBe(false);
            expect(isMapView({ x: 1, y: 2 })).toBe(false);
        });
    });

    describe("isCoordinate", () => {
        it("returns true for a two-element numeric array", () => {
            expect(isCoordinate([1.5, 2.5])).toBe(true);
        });
        it("returns false for non-coordinate values", () => {
            expect(isCoordinate([1, 2, 3])).toBe(false);
            expect(isCoordinate(["1", "2"])).toBe(false);
            expect(isCoordinate("foo")).toBe(false);
            expect(isCoordinate(null)).toBe(false);
        });
    });

    describe("isAction", () => {
        it("returns true for object with type and payload", () => {
            expect(isAction({ type: "MY_ACTION", payload: {} })).toBe(true);
        });
        it("returns false for object without type or payload", () => {
            expect(isAction({ type: "MY_ACTION" })).toBe(false);
            expect(isAction({ payload: {} })).toBe(false);
        });
    });

    describe("isRuntimeMap", () => {
        it("returns true for a well-formed RuntimeMap-like object", () => {
            const map = {
                Extents: { MinX: 0, MinY: 0, MaxX: 100, MaxY: 100 },
                BackgroundColor: "0xffffff",
                CoordinateSystem: { EpsgCode: "4326" },
                MapDefinition: "Library://Test.MapDefinition",
                DisplayDpi: 96
            };
            expect(isRuntimeMap(map as any)).toBe(true);
        });
        it("returns false for an object missing required properties", () => {
            expect(isRuntimeMap({ Name: "TestMap" } as any)).toBe(false);
        });
    });
});
