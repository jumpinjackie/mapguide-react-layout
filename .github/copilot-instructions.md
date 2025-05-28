# Naming Convention and coding style

- Use `PascalCase` for class names and React components.
- Use `camelCase` for variables and function names.
- Use `UPPER_SNAKE_CASE` for constants.
- Use `kebab-case` for file names.
- TypeScript interfaces should be prefixed with `I` (e.g., `IUser`).
- Use `const` for constants and `let` for variables that may change.
- Use `async/await` for asynchronous code.
- Use TypeScript mapped and utility types where possible to avoid creating new types.
- In any exported function or class that is generated, insert a `@hidden` tag in the JSDoc comment to indicate that it is not intended for public use.
   - This tag may be removed at a later time at the author's discretion. Do not re-insert this tag if it is not already present in any JSDoc comments.
- Generated TypeScript test files should be named with a `.spec.ts` or `.spec.tsx` suffix.
- When generating import statements for internal modules, use the most-relative path possible.
   - Avoid importing from relative directories (implying an index.ts or index.tsx barrel module is present there)
   - If an import can be made a type-only import, use `import type` syntax.
- Do not use `import *` syntax for importing any of our modules.

# Story generation for Storybook

- Use `@storybook/react` for React components.
- Use `@storybook/addon-docs` for documentation.
- Use `@storybook/addon-controls` for dynamic controls.
- Use `@storybook/addon-actions` for event handling.
- Use `@storybook/addon-viewport` for responsive design testing.
- Use `@storybook/addon-a11y` for accessibility testing.
- Use `@storybook/addon-backgrounds` for background color testing.
- Use `@storybook/addon-toolbars` for custom toolbars.
- Use `@storybook/addon-links` for linking stories.
- Use `@storybook/addon-knobs` for dynamic props.
- Use `@storybook/addon-essentials` for essential addons.
- Use `@storybook/addon-interactions` for simulating user interactions.
- Use `@storybook/addon-measure` for performance measurement.
- Use `@storybook/addon-outline` for visualizing component outlines.
- Use the following file structure for Storybook stories:
  - Always stories under `src/stories` directory
  - Name the story files with a `.stories.tsx` suffix.
  - Use the same name as the component for the story file (e.g., `MyComponent.stories.tsx`).
  - Use `export default` to define the component and its metadata.
  - Use named exports for each story, following the format `export const [StoryName] = () => <Component />;`.
  - Use `args` to define default props for the component.
  - Use `argTypes` to define controls for the component's props.

# Test Generation

- Use `vitest` as the test framework.
- Use `@testing-library/react` for React component testing.
- Put these test files in the top-level `test` directory with the same relative directory structure as the module under test
   - Ensure that imports for modules under test are relative to the module under test
      - For example, if the module under test is `src/components/MyComponent.tsx`, the test file should be `test/components/MyComponent.spec.tsx`.
      - In this example, the test file should import the module under test using a relative path, like `import MyComponent from '../../src/components/MyComponent';`.
- If it is clear a test case can be parameterized, use `test.each` to create parameterized tests instead of creating individual test cases
- Do not `vi.mock` internal modules unless it is absolutely necessary for the test.
- Do not generate superfluous test cases that do not add value. Examples include:
   - Tests that only check for the existence of a function or class.
   - Tests that only check for the existence of a module or file.
   - If this means that a test file is empty, then it is acceptable to leave the test file empty.
- Do not use `import *` syntax for importing any of our modules under test.
- Do not generate tests for modules that only contains exported types, interfaces or constants.