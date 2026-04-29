module.exports = {
    framework: "@storybook/react-webpack5",
    stories: ["../src/stories/*.stories.tsx"],
    typescript: {
        reactDocgen: false
    },

    core: {
        builder: "webpack5",
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

    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.md$/,
            type: "asset/source"
        });
        return config;
    }
};