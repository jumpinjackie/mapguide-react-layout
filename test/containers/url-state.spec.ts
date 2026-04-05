// Tests for URL state synchronization behavior when ignored URL properties are configured.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateUrl } from "../../src/containers/url-state";

describe("updateUrl", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        const params = new URLSearchParams({
            resource: "Library://Samples/Sheboygan/Layouts/SheboyganAsp.WebLayout",
            foo: "bar",
            x: "1"
        });
        window.history.replaceState({}, "", `/?${params.toString()}`);
    });

    it("preserves existing non-ignored params when ignore props are configured", () => {
        updateUrl({ x: 2, y: 3, scale: 1000 }, undefined, ["x", "y"]);
        vi.runAllTimers();

        const params = new URL(window.location.href).searchParams;
        expect(params.get("resource")).toBe("Library://Samples/Sheboygan/Layouts/SheboyganAsp.WebLayout");
        expect(params.get("foo")).toBe("bar");
        expect(params.get("x")).toBeNull();
        expect(params.get("y")).toBeNull();
        expect(params.get("scale")).toBe("1000");
    });

    it("leaves existing params alone when no ignore props are configured", () => {
        updateUrl({ x: 2, y: 3, scale: 1000 });
        vi.runAllTimers();

        const params = new URL(window.location.href).searchParams;
        expect(params.get("resource")).toBe("Library://Samples/Sheboygan/Layouts/SheboyganAsp.WebLayout");
        expect(params.get("foo")).toBe("bar");
        expect(params.get("x")).toBe("2");
        expect(params.get("y")).toBe("3");
        expect(params.get("scale")).toBe("1000");
    });
});
