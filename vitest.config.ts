import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '.storybook/**',
                'docs_output/**',
                'e2e/**',
                'node_modules/**',
                'package/**',
                'patches/**',
                'tools/**',
                'test-data/**',
                'stdassets/**',
                'storybook-static/**',
                'viewer/**'
            ],
            reporter: ['lcov', 'html'],
            reportsDirectory: "./coverage-report"
        },
        setupFiles: ['./vitest-setup.ts'],
        globals: true,
        environment: 'jsdom'
    }
})