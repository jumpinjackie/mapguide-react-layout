import "@testing-library/jest-dom/vitest";

(global as any).__DEV__ = true;
(global as any).__COMMITHASH__ = "abcd1234";

if (typeof globalThis.ResizeObserver === "undefined") {
	class ResizeObserverMock {
		public observe(): void {
			// No-op mock for jsdom-based tests.
		}

		public unobserve(): void {
			// No-op mock for jsdom-based tests.
		}

		public disconnect(): void {
			// No-op mock for jsdom-based tests.
		}
	}

	(globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver = ResizeObserverMock;
}