const path = require("path");
const { mergeConfig } = require("vite");

/**
 * Creates a Vite plugin that loads Markdown files as raw string modules.
 *
 * @returns {{name: string, transform(source: string, id: string): string | undefined}}
 */
const createMarkdownRawPlugin = () => ({
    name: "storybook-markdown-raw",
    transform(source, id) {
        if (/\.md$/i.test(id)) {
            return `export default ${JSON.stringify(source)};`;
        }
        return undefined;
    }
});

module.exports = {
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    stories: ["../src/stories/*.stories.tsx"],
    typescript: {
        reactDocgen: false
    },
    core: {
        disableTelemetry: true
    },

    staticDirs: ['../src/stories/static'],

    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-knobs",
        "@storybook/addon-viewport",
        "@storybook/addon-links",
        "@storybook/addon-actions"
    ],

    docs: {
        autodocs: true
    },

    viteFinal: async (config, { configType }) => {
        return mergeConfig(config, {
            assetsInclude: ["**/*.cur"],
            define: {
                __DEV__: JSON.stringify(configType !== "PRODUCTION"),
                __VERSION__: JSON.stringify(process.env.APPVEYOR_BUILD_VERSION || ""),
                __COMMITHASH__: JSON.stringify(process.env.APPVEYOR_REPO_COMMIT || ""),
                __BRANCH__: JSON.stringify(process.env.APPVEYOR_REPO_BRANCH || "master")
            },
            resolve: {
            },
            build: {
                target: "es2020"
            },
            plugins: [createMarkdownRawPlugin()]
        });
    }
};