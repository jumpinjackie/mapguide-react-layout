import { describe, it, expect, vi } from "vitest";
import { fmt, tr } from "../../src/api/i18n";

describe("api/i18n", () => {
    describe("fmt", () => {
        it("No args should return original format string", () => {
            expect(fmt("foo")).toBe("foo");
        });
        it("Passing invalid args should return original format string", () => {
            expect(fmt("foo {bar}", { foo: "bar" })).toBe("foo {bar}");
        });
        it("Passing incomplete args should return as much of the formatted string as possible", () => {
            expect(fmt("foo {bar} {foo}", { foo: "bar" })).toBe("foo {bar} bar");
        });
        it("Args can have { } placeholders", () => {
            expect(fmt("foo {bar} {foo}", { foo: "{bar}" })).toBe("foo {bar} {bar}");
        });
    });
    describe("tr", () => {
        it("locale should default to en if not specified", () => {
            expect(tr("MEASUREMENT", "en")).toBe("Measurement");
            expect(tr("SESSION_EXPIRED", "en")).toBe("Session Expired");
            expect(tr("SELECTION_PROPERTY", "en")).toBe("Property");
            expect(tr("ABOUT", "en")).toBe("About");
            expect(tr("QUICKPLOT_HEADER", "en")).toBe("Quick Plot");
        });
        it("locale with unregistered locale should return original localization key", () => {
            const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
            expect(tr("MEASURE", "dk")).toBe("MEASURE");
            expect(tr("SESSION_EXPIRED", "dk")).toBe("SESSION_EXPIRED");
            expect(tr("SELECTION_PROPERTY", "dk")).toBe("SELECTION_PROPERTY");
            expect(tr("ABOUT", "dk")).toBe("ABOUT");
            expect(tr("QUICKPLOT_HEADER", "dk")).toBe("QUICKPLOT_HEADER");
            expect(spy).toHaveBeenCalledTimes(5); //One warning per tr()
            spy.mockReset();
        });
    });
});