module.exports = {
    stories: ["../src/stories/*.stories.tsx"],
    core: {
        builder: "webpack5"
    },
    addons: [
        "@storybook/addon-knobs",
        "@storybook/addon-viewport",
        "@storybook/addon-links",
        "@storybook/addon-actions"
    ]
};