const path = require("path");
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = ({ config }) => {
    config.plugins.push(gitRevisionPlugin);
    config.plugins.push(new webpack.DefinePlugin({
        __DEV__: process.env.BUILD_MODE !== 'production',
        __VERSION__: JSON.stringify(gitRevisionPlugin.version()),
        __COMMITHASH__: JSON.stringify(gitRevisionPlugin.commithash()),
        __BRANCH__: JSON.stringify(gitRevisionPlugin.branch())
    }));
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve("ts-loader"),
                options: {
                    configFile: path.resolve(__dirname, "..", "tsconfig.json")
                }
            }/*,
            {
                loader: require.resolve("react-docgen-typescript-loader")
            }*/
        ]
    });
    config.resolve.extensions.push(".ts", ".tsx")
    return config
}