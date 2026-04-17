// Tests for URL state synchronization behavior when ignored URL properties are configured.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { updateUrl, getStateFromUrl, areStatesEqual } from "../../src/containers/url-state";

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

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
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

    it("encodes feature tooltip and layer/group arrays when writing URL", () => {
        updateUrl({ ft: true, sl: ["A", "B"], hl: ["C"], sg: ["G1"], hg: ["G2"] });
        vi.runAllTimers();

        const params = new URL(window.location.href).searchParams;
        expect(params.get("ft")).toBe("1");
        expect(params.get("sl")).toBe("A_B");
        expect(params.get("hl")).toBe("C");
        expect(params.get("sg")).toBe("G1");
        expect(params.get("hg")).toBe("G2");
    });

    it("parses URL params into typed state and honours ignore keys", () => {
        window.history.replaceState({}, "", "/?x=1.5&y=2.5&scale=1000&ft=0&sl=L1_L2&foo=bar");
        const parsed = getStateFromUrl(["foo"]);

        expect(parsed.x).toBe(1.5);
        expect(parsed.y).toBe(2.5);
        expect(parsed.scale).toBe(1000);
        expect(parsed.ft).toBe(false);
        expect(parsed.sl).toEqual(["L1", "L2"]);
        expect((parsed as any).foo).toBeUndefined();
    });

    it("compares url state equality across scalar and array fields", () => {
        const a = {
            x: 1,
            y: 2,
            scale: 100,
            locale: "en",
            map: "Map1",
            resource: "Library://Map",
            session: "S1",
            ft: true,
            sl: ["L1"],
            hl: ["L2"],
            sg: ["G1"],
            hg: ["G2"],
        };
        const b = { ...a };
        expect(areStatesEqual(a, b)).toBe(true);

        const c = { ...a, sl: ["L9"] };
        expect(areStatesEqual(a, c)).toBe(false);
    });
});
