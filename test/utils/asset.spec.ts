import { describe, it, expect } from "vitest";
import { getAssetPath, getAssetRoot, setAssetRoot } from "../../src/utils/asset";

describe("utils/asset", () => {
    it("getAssetPath returns the input string", () => {
        expect(getAssetPath("foo.png")).toBe("foo.png");
        expect(getAssetPath(undefined)).toBeUndefined();
    });
    it("getAssetRoot and setAssetRoot work as expected", () => {
        setAssetRoot("/my/assets/");
        expect(getAssetRoot()).toBe("/my/assets/");
    });
});
