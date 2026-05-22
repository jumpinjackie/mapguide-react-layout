# AGENTS

## Overview
This repository is a React‑based MapGuide viewer.  The following document is intended for autonomous agents that will be reading and modifying the codebase.  It contains the most common commands, linting rules, testing patterns, and style guidelines.

---

## Build / Lint / Test Commands

| Task | Command | Notes |
|------|---------|-------|
| **Clean build artifacts** | `yarn run clean` | Removes `viewer/dist`, `package/`, `lib/`.  Use before a full rebuild.
| **Full production build** | `yarn run build:prod` | Builds with Vite in production mode.  Produces `viewer.zip`.
| **Development build** | `yarn run build:dev` | Builds the viewer bundle with Vite in development mode.
| **Watch dev build** | `yarn run watch:dev` | Rebuilds the viewer bundle with Vite on file changes.
| **Build storybook** | `yarn run build:storybook` | Generates static Storybook at `storybook-static/` and zips it.
| **Lint TS/TSX** | `yarn run lint` | Uses TSLint configured in `tslint.json`.
| **Run all tests** | `yarn run test` | Executes Vitest across the `test/` folder.
| **Run all tests with coverage** | `yarn run test:coverage` | Executes Vitest with coverage collection across the `test/` folder. Coverage results saved to `coverage-report/`
| **Single‑file test** | `vitest run <path/to/file.test.tsx>` | Example: `vitest run test/components/MyComponent.test.tsx`
| **Watch tests** | `yarn run watch:test` | Re‑runs changed tests automatically.
| **Coverage report** | `yarn run test:gha` | Generates lcov and outputs `coverage-report/lcov.info`.

### Running a single Vitest file in CI
```bash
vitest run --config vitest.config.ts <file>
```
This is the same as `yarn run test` but you can specify a path.

---

## Code Style Guidelines

1. **TypeScript** – All source files are `.ts` or `.tsx`.  The project uses strict mode (`strict: true`).  Never use `any`; prefer `unknown` and narrow types explicitly.
2. **Imports** – Order:
   * External packages (alphabetical, case‑insensitive)
   * Internal modules relative to the repo root
   * Type imports (`import type { X } from '…'`) should come last.
3. **Formatting** – `prettier` is not used; rely on TSLint rules in `tslint.json`.  Use 3‑space indentation, double quotes for strings, and end statement with semicolons.
4. **Naming** –
   * Components: PascalCase (`MyComponent`) exported as named.
   * Hooks: `useXxx` prefix.
   * Types/interfaces: `IXXX` is preferred for `interface`s, but discouraged for `type`s; use descriptive names (`UserProps`).
5. **Error handling** – Prefer `try/catch` around async API calls.  Log errors to console with a clear prefix and re‑throw if the caller needs it.
6. **State management** – Redux store lives in `/src/store`.  Use action creators and thunks; avoid direct state mutation.
7. **Testing** –
   * Tests live in `test/` mirroring source structure.
   * Test file should mirror the name of the module but with a `.spec.ts` or `.spec.tsx` extension.
      * For example, `test/components/about.spec.tsx` tests code under `src/components/about.tsx`
   * Each test file should export a default describe block.
   * Use `@testing-library/react` queries (`getByText`, `queryAllByRole`).
8. **Documentation** – 
   * Public APIs have JSDoc comments; private helpers are documented only if non‑obvious.
9. **Linting rules** – See `tslint.json`.  Key rules:
   * `no-console` – allowed only in error handling paths.
   * `variable-name` – camelCase for variables, PascalCase for types/classes.
10. **Cursor / Copilot rules** – No `.cursor/rules/` or `.cursorrules` folder exists.  The repo contains a `.github/copilot-instructions.md` with the following snippet:
```
# Agent instructions
- Never modify `package.json` unless you are adding a dependency.
- Use `yarn run clean` before any build.
- All new files must be added to Git and have a brief comment header.
``` 
Follow these when making changes.

---

## Common Patterns

* **Barrel files** – `src/index.ts` re‑exports public modules.  Keep barrel imports minimal.
* **Redux Thunks** – All async actions end with `Async`.  Example:
  ```ts
  export const fetchDataAsync = () => async (dispatch: Dispatch) => {
    try { … }
    catch (e) { dispatch(errorAction(e)); }
  };
  ```
* **React‑Redux** – Prefer `useSelector` and `useDispatch` hooks over the legacy `<Connect>`.

---

## Testing a Single File Example
```bash
vitest run test/components/Map.test.tsx
```
The output will show only that file’s tests.  For debugging, add `--watch` to re‑run on changes.

---

> **Tip**: If you need a fresh environment, run `yarn install` after pulling new dependencies.
