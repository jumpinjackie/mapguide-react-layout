import { describe, it, expect } from "vitest";
import olMapGuideSource from "ol/source/ImageMapGuide";
import { isMapGuideImageSource, createMapGuideSource } from "../../src/api/ol-mapguide-source-factory";

describe("api/ol-mapguide-source-factory", () => {
    describe("isMapGuideImageSource", () => {
        it("returns true for objects with updateParams method", () => {
            const source = { updateParams: () => {} };
            expect(isMapGuideImageSource(source)).toBe(true);
        });

        it("returns false for objects without updateParams", () => {
            const notSource = { someMethod: () => {} };
            expect(isMapGuideImageSource(notSource)).toBe(false);
        });
    });

    describe("createMapGuideSource", () => {
        it("creates a MapGuide image source instance", () => {
            const source = createMapGuideSource({
                url: "http://localhost/mapguide/mapagent/mapagent.fcgi?"
            });
            expect(source).toBeInstanceOf(olMapGuideSource);
        });
    });
});
