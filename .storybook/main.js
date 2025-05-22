module.exports = {
    framework: "@storybook/react-webpack5",
    stories: ["../src/stories/*.stories.tsx"],

    core: {
        builder: "webpack5",
        disableTelemetry: true
    },

    staticDirs: ['../src/stories/static'],

    addons: [
        "@storybook/addon-knobs",
        "@storybook/addon-viewport",
        "@storybook/addon-links",
        "@storybook/addon-actions"
    ],

    docs: {
        autodocs: true
    }
};