# React 18 minimum peer dependency; drop React 17 support

We will require React 18+ (`>=18.0.0 <20.0.0`) as a peer dependency for the npm package, replacing the current bundled React 17 dependency. The viewer bundle (standalone HTML) is unaffected because it bundles React inline.

We chose React 18 as the floor because:

1. `ReactDOM.render()` is removed in React 19. Switching to `createRoot()` is required for forward compatibility, and `createRoot()` exists in React 18+.
2. React 17 does not have `createRoot()`, so maintaining React 17 support would require a runtime version-detect shim at every `ReactDOM.render` call site. This is brittle and masks the real constraint.
3. The `@testing-library/react` 12.x test stack is pinned to React 17 and blocks upgrades to `@testing-library/react` 16.x, `react-test-renderer` 18.x, etc. React 18 unblocks the entire testing stack.
4. `DONOTUPGRADE.md` already identified React 18 as the safest upgrade target and React 17 as the blocker for multiple ecosystem packages.

**Breaking change for npm consumers:** Consumers on React 17 must upgrade to React 18+ to use future versions of this package. The viewer bundle (standalone `viewer.zip`) is unaffected — React is bundled inline and the viewer owns its own React version.

**Considered and rejected:** targeting React 18 with a `>=17.0.0 <20.0.0` peer range and a `createRoot` / `render` shim. This would silently allow React 17 consumers to install the package but crash at runtime when `mount()` is called, since `createRoot` does not exist in React 17.

**Considered and rejected:** targeting React 19 directly. Multiple ecosystem dependencies (`react-hot-toast`, `react-tiny-popover`, `react-rnd`) have unknown React 19 compatibility. React 18 gives the broadest ecosystem support while still using `createRoot()`.

**Outcome:** React and ReactDOM become peer dependencies (`>=18.0.0 <20.0.0`) plus dev dependencies. All `ReactDOM.render()` calls are replaced with `createRoot()`. The testing stack is upgraded to `@testing-library/react` 16.x and `react-test-renderer` 18.x. `DONOTUPGRADE.md` entries for React and `@testing-library` are removed.
