import { describe, it, expect } from "vitest";
import { getAssetPath, getAssetRoot, setAssetRoot, getRelativeIconPath } from "../../src/utils/asset";

describe("utils/asset", () => {
    it("getAssetPath returns the input string", () => {
        expect(getAssetPath("foo.png")).toBe("foo.png");
        expect(getAssetPath(undefined)).toBeUndefined();
    });
    it("getAssetRoot and setAssetRoot work as expected", () => {
        setAssetRoot("/my/assets/");
        expect(getAssetRoot()).toBe("/my/assets/");
    });
    it("getRelativeIconPath returns the correct relative path for an icon name", () => {
        expect(getRelativeIconPath("zoom-in")).toBe("images/icons/zoom-in.png");
        expect(getRelativeIconPath("select")).toBe("images/icons/select.png");
    });
});
