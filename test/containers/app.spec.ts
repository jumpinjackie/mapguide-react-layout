import { describe, it, expect } from "vitest";
import { getEffectiveUrlPropsIgnore } from "../../src/containers/app";

describe("getEffectiveUrlPropsIgnore", () => {
    it("returns undefined when both prop and settings value are undefined", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, undefined)).toBeUndefined();
    });

    it("returns the prop value when settings value is undefined", () => {
        expect(getEffectiveUrlPropsIgnore(["x", "y"], undefined)).toEqual(["x", "y"]);
    });

    it("returns parsed settings value when prop is undefined", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, "x,y")).toEqual(["x", "y"]);
    });

    it("merges prop value and parsed settings value", () => {
        expect(getEffectiveUrlPropsIgnore(["scale"], "x,y")).toEqual(["scale", "x", "y"]);
    });

    it("trims whitespace from settings values", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, " x , y ")).toEqual(["x", "y"]);
    });

    it("filters empty entries from settings value", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, "x,,y")).toEqual(["x", "y"]);
    });

    it("returns prop when settings value results in empty list after filtering", () => {
        expect(getEffectiveUrlPropsIgnore(["scale"], ",,")).toEqual(["scale"]);
    });

    it("returns undefined when prop is undefined and settings value results in empty list", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, "  ,,  ")).toBeUndefined();
    });

    it("lowercases all entries from prop", () => {
        expect(getEffectiveUrlPropsIgnore(["X", "Y"], undefined)).toEqual(["x", "y"]);
    });

    it("lowercases all entries from settings value", () => {
        expect(getEffectiveUrlPropsIgnore(undefined, "X,Y,Scale")).toEqual(["x", "y", "scale"]);
    });

    it("deduplicates entries across prop and settings", () => {
        expect(getEffectiveUrlPropsIgnore(["x", "scale"], "x,y")).toEqual(["x", "scale", "y"]);
    });

    it("deduplicates case-insensitively (prop uppercase, settings lowercase)", () => {
        expect(getEffectiveUrlPropsIgnore(["X"], "x,y")).toEqual(["x", "y"]);
    });
});
