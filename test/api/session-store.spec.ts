import { describe, it, expect, beforeEach, vi } from "vitest";
import { clearSessionStore, persistSelectionSetToLocalStorage, retrieveSelectionSetFromLocalStorage } from "../../src/api/session-store";
import { AsyncLazy } from "../../src/api/lazy";
import type { QueryMapFeaturesResponse } from "../../src/api/contracts/query";

// Use a minimal valid QueryMapFeaturesResponse
const makeMockResponse = (): QueryMapFeaturesResponse => ({
    FeatureSet: undefined,
    Hyperlink: undefined,
    InlineSelectionImage: undefined,
    SelectedFeatures: undefined,
    Tooltip: undefined
} as unknown as QueryMapFeaturesResponse);

describe("api/session-store", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe("persistSelectionSetToLocalStorage", () => {
        it("stores a selection set in localStorage", async () => {
            const sessionId = "sess123";
            const mapName = "TestMap";
            const response = makeMockResponse();
            await persistSelectionSetToLocalStorage(sessionId, mapName, response);
            const stored = localStorage.getItem(`selection_${sessionId}_${mapName}`);
            expect(stored).not.toBeNull();
            expect(JSON.parse(stored!)).toMatchObject({});
        });
    });

    describe("retrieveSelectionSetFromLocalStorage", () => {
        it("returns undefined when nothing is stored", async () => {
            const sessionId = new AsyncLazy(() => Promise.resolve("nokey"));
            const result = await retrieveSelectionSetFromLocalStorage(sessionId, "NoMap");
            expect(result).toBeUndefined();
        });

        it("returns the stored selection set", async () => {
            const sessionId = "sess456";
            const mapName = "RetrieveMap";
            const response = makeMockResponse();
            await persistSelectionSetToLocalStorage(sessionId, mapName, response);

            const lazySessionId = new AsyncLazy(() => Promise.resolve(sessionId));
            const result = await retrieveSelectionSetFromLocalStorage(lazySessionId, mapName);
            expect(result).toBeDefined();
        });
    });

    describe("clearSessionStore", () => {
        it("removes only selection_* keys from localStorage", async () => {
            localStorage.setItem("selection_foo", "bar");
            localStorage.setItem("other_key", "should_stay");
            await clearSessionStore();
            expect(localStorage.getItem("selection_foo")).toBeNull();
            expect(localStorage.getItem("other_key")).toBe("should_stay");
        });

        it("handles localStorage errors gracefully", async () => {
            const originalRemoveItem = localStorage.removeItem;
            vi.spyOn(localStorage, "removeItem").mockImplementation(() => {
                throw new Error("Storage error");
            });
            // Should not throw
            await expect(clearSessionStore()).resolves.toBeUndefined();
            vi.spyOn(localStorage, "removeItem").mockRestore();
        });
    });
});
