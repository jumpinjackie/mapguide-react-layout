import { describe, it, expect, vi } from "vitest";
import { AsyncLazy, Lazy } from "../../src/api/lazy";

describe("api/lazy", () => {
    it("lazy", () => {
        const fetchProxy = vi.fn();
        const lazy = new Lazy<number>(() => {
            fetchProxy();
            return 42;
        });
        let val = lazy.getValue();
        expect(val).toBe(42);
        expect(fetchProxy.mock.calls).toHaveLength(1);

        for (let i = 0; i < 10; i++) {
            val = lazy.getValue();
            expect(val).toBe(42);
            expect(fetchProxy.mock.calls).toHaveLength(1);
        }
    });
    it("async lazy", async () => {
        const fetchProxy = vi.fn();
        const lazy = new AsyncLazy<number>(() => {
            fetchProxy();
            return Promise.resolve(42);
        });
        let val = await lazy.getValueAsync();
        expect(val).toBe(42);
        expect(fetchProxy.mock.calls).toHaveLength(1);

        for (let i = 0; i < 10; i++) {
            val = await lazy.getValueAsync();
            expect(val).toBe(42);
            expect(fetchProxy.mock.calls).toHaveLength(1);
        }
    });
});