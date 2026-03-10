import { describe, it, expect, vi } from "vitest";
import { promiseMiddleware } from "../../src/store/promise-middleware";

describe("store/promise-middleware", () => {
    describe("promiseMiddleware", () => {
        it("passes non-promise actions through to next", () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const action = { type: "SIMPLE_ACTION", payload: { data: "foo" } };
            handler(action);
            expect(next).toHaveBeenCalledWith(action);
            expect(dispatch).not.toHaveBeenCalled();
        });

        it("passes null payload actions through to next", () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const action = { type: "NULL_PAYLOAD", payload: null };
            handler(action);
            expect(next).toHaveBeenCalledWith(action);
        });

        it("dispatches PENDING then FULFILLED for successful promise", async () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const resolvedValue = { data: "success" };
            const promise = Promise.resolve(resolvedValue);
            const action = {
                type: "ASYNC_ACTION",
                payload: { promise },
                types: ["PENDING", "FULFILLED", "REJECTED"]
            };
            await handler(action);
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: "PENDING" });
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: "FULFILLED",
                payload: resolvedValue,
                meta: undefined
            });
        });

        it("dispatches PENDING then REJECTED for failed promise", async () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const error = new Error("failure");
            const promise = Promise.reject(error);
            const action = {
                type: "ASYNC_ACTION",
                payload: { promise },
                types: ["PENDING", "FULFILLED", "REJECTED"]
            };
            await handler(action);
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: "PENDING" });
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: "REJECTED",
                payload: error,
                meta: undefined
            });
        });

        it("includes data in PENDING dispatch when payload has data", async () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const promise = Promise.resolve("result");
            const action = {
                type: "ASYNC_WITH_DATA",
                payload: { promise, data: { key: "value" } },
                types: ["PENDING", "FULFILLED", "REJECTED"]
            };
            await handler(action);
            expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: "PENDING",
                payload: { key: "value" }
            });
        });

        it("includes meta in dispatch when action has meta", async () => {
            const dispatch = vi.fn();
            const next = vi.fn();
            const middleware = promiseMiddleware({ dispatch });
            const handler = middleware(next);

            const promise = Promise.resolve("result");
            const meta = { extra: "info" };
            const action = {
                type: "ASYNC_WITH_META",
                payload: { promise },
                types: ["PENDING", "FULFILLED", "REJECTED"],
                meta
            };
            await handler(action);
            expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: "PENDING",
                meta
            });
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: "FULFILLED",
                payload: "result",
                meta
            });
        });
    });
});
