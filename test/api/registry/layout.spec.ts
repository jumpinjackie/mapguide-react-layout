import { describe, it, expect } from "vitest";
import { registerLayout, getLayout, getLayoutCapabilities } from "../../../src/api/registry/layout";
import type { LayoutFactory, LayoutCapabilities } from "../../../src/api/registry/layout";

describe("api/registry/layout", () => {
    describe("registerLayout / getLayout", () => {
        it("registers a layout and retrieves it by name", () => {
            const factory: LayoutFactory = () => null as any;
            const caps: LayoutCapabilities = { hasTaskPane: true };
            registerLayout("testLayout", factory, caps);
            expect(getLayout("testLayout")).toBe(factory);
        });

        it("returns undefined for unregistered layout", () => {
            expect(getLayout("nonExistentLayout")).toBeUndefined();
        });
    });

    describe("getLayoutCapabilities", () => {
        it("returns capabilities for a registered layout", () => {
            const factory: LayoutFactory = () => null as any;
            const caps: LayoutCapabilities = { hasTaskPane: false };
            registerLayout("testLayout2", factory, caps);
            const result = getLayoutCapabilities("testLayout2");
            expect(result).toBeDefined();
            expect(result?.hasTaskPane).toBe(false);
        });

        it("returns undefined for unregistered layout", () => {
            expect(getLayoutCapabilities("noSuchLayout")).toBeUndefined();
        });

        it("reflects registered capabilities correctly for layout with task pane", () => {
            const factory: LayoutFactory = () => null as any;
            const caps: LayoutCapabilities = { hasTaskPane: true };
            registerLayout("layoutWithTaskPane", factory, caps);
            const result = getLayoutCapabilities("layoutWithTaskPane");
            expect(result?.hasTaskPane).toBe(true);
        });
    });
});
