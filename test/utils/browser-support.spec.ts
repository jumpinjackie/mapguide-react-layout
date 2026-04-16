import { describe, it, expect, vi } from "vitest";
import { supportsTouch, isMobileViewport, supportsWebGL } from "../../src/utils/browser-support";

describe("utils/browser-support", () => {
    it("supportsTouch returns true if ontouchstart in document.documentElement", () => {
        const orig = document.documentElement.ontouchstart;
        // @ts-ignore
        document.documentElement.ontouchstart = () => {};
        expect(supportsTouch()).toBe(true);
        // @ts-ignore
        document.documentElement.ontouchstart = orig;
    });
    it("isMobileViewport returns true if matchMedia matches", () => {
        const spy = vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({ matches: true }) as any);
        expect(isMobileViewport()).toBe(true);
        spy.mockRestore();
    });
    it("isMobileViewport returns false if matchMedia does not match", () => {
        const spy = vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({ matches: false }) as any);
        expect(isMobileViewport()).toBe(false);
        spy.mockRestore();
    });
    it("supportsWebGL returns a boolean", () => {
        // In jsdom, WebGLRenderingContext is not defined; mock it to false to test the path
        const origWebGL = (global as any).WebGLRenderingContext;
        (global as any).WebGLRenderingContext = class WebGLRenderingContext {};
        const result = supportsWebGL();
        expect(typeof result).toBe("boolean");
        (global as any).WebGLRenderingContext = origWebGL;
    });
});
