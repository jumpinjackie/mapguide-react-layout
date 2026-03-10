import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { useDebugDeps } from "../../src/components/debug-hooks";

describe("components/debug-hooks", () => {
    describe("useDebugDeps", () => {
        it("logs when a dependency changes", () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const TestComponent = ({ count }: { count: number }) => {
                useDebugDeps({ count }, "testEffect");
                return <div>{count}</div>;
            };

            const { rerender } = render(<TestComponent count={0} />);
            // Re-render with a different value to trigger the dependency change log
            rerender(<TestComponent count={1} />);

            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it("does not log when no dependency changes", () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const TestComponent = ({ count }: { count: number }) => {
                useDebugDeps({ count });
                return <div>{count}</div>;
            };

            const { rerender } = render(<TestComponent count={5} />);
            consoleSpy.mockClear();
            // Re-render with the same value - no changes expected
            rerender(<TestComponent count={5} />);

            expect(consoleSpy).not.toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});
