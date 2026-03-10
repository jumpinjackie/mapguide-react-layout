import { describe, it, expect, beforeEach } from "vitest";
import { setFusionRoot, getFusionRoot } from "../../src/api/runtime";

describe("api/runtime", () => {
    beforeEach(() => {
        // Reset to default state by setting an undefined-like value
        setFusionRoot("../fusion");
    });

    describe("getFusionRoot", () => {
        it("returns default value when not set", () => {
            // Reset to default
            const root = getFusionRoot();
            expect(root).toBeDefined();
        });

        it("returns set value after setFusionRoot is called", () => {
            setFusionRoot("/my/fusion/root");
            expect(getFusionRoot()).toBe("/my/fusion/root");
        });
    });

    describe("setFusionRoot", () => {
        it("sets the fusion root correctly", () => {
            setFusionRoot("/custom/fusion");
            expect(getFusionRoot()).toBe("/custom/fusion");
        });

        it("overwrites previous value", () => {
            setFusionRoot("/first");
            setFusionRoot("/second");
            expect(getFusionRoot()).toBe("/second");
        });
    });
});
