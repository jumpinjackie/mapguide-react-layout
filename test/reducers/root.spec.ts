import { describe, it, expect } from "vitest";
import { rootReducer } from "../../src/reducers/root";

describe("reducers/root", () => {
    it("should have all expected reducer keys", () => {
        expect(rootReducer).toHaveProperty("initError");
        expect(rootReducer).toHaveProperty("config");
        expect(rootReducer).toHaveProperty("template");
        expect(rootReducer).toHaveProperty("mapState");
        expect(rootReducer).toHaveProperty("viewer");
        expect(rootReducer).toHaveProperty("toolbar");
        expect(rootReducer).toHaveProperty("taskpane");
        expect(rootReducer).toHaveProperty("modal");
        expect(rootReducer).toHaveProperty("mouse");
        expect(rootReducer).toHaveProperty("lastaction");
    });
});
