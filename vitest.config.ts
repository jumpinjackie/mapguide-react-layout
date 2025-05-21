import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '.storybook/**',
                'src/entries/**',
                'src/stories/**',
                'docs_output/**',
                'e2e/**',
                'mocks/**',
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
        alias: {
            "\\.(jpg|jpeg|png|gif|cur|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
            "\\.(css|less)$": "<rootDir>/mocks/styleMock.js"
        },
        setupFiles: ['./vitest-setup.ts'],
        globals: true,
        environment: 'jsdom'
    }
})