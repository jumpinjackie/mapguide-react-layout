const path = require("path");
const webpack = require('webpack');

module.exports = ({ config }) => {
    config.plugins.push(new webpack.DefinePlugin({
        __DEV__: process.env.BUILD_MODE !== 'production'
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
    })
    config.resolve.extensions.push(".ts", ".tsx")
    return config
}