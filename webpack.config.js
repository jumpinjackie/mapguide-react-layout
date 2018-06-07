'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
//const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseAppEntries = [
    './src/entries/library.tsx',
];

const devAppEntries = [
    //   'webpack-hot-middleware/client?reload=true',
];

const appEntries = baseAppEntries.concat(process.env.BUILD_MODE === 'development' ? devAppEntries : []);

const basePlugins = [
    new webpack.ProvidePlugin({
        "proj4": "proj4"
    }),
    new webpack.DefinePlugin({
        __DEV__: process.env.BUILD_MODE !== 'production'
    })
];

const devPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.WatchIgnorePlugin([
        /\.js$/,
        /\.d\.ts$/
    ])
];

const prodPlugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
            context: __dirname
        }
    })
];

const plugins = basePlugins
    .concat(process.env.BUILD_MODE === 'production' ? prodPlugins : [])
    .concat(process.env.BUILD_MODE === 'development' ? devPlugins : []);

const rules = [
    loaders.sourcemap,
    loaders.html,
    loaders.css,
    loaders.less,
    loaders.fonts,
    loaders.babel,
    /*
    loaders.svg,
    loaders.eot,
    loaders.woff,
    loaders.woff2,
    loaders.ttf,
    */
    loaders.image,
    loaders.cursors,
    loaders.tsx
];
/*
if (process.env.BUILD_MODE === 'production' || process.env.DEBUG_BUILD === '1') {
    rules.push(loaders.tsx);
} else {
    rules.push(loaders.tsx_multithreaded);
    plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }));
}
*/
module.exports = {
    mode: process.env.BUILD_MODE,
    entry: {
        viewer: appEntries
    },
    devtool: 'source-map',
    output: {
        libraryTarget: "var",
        library: "MapGuide",
        path: path.join(__dirname, 'viewer/dist'),
        filename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.js' : '[name].js',
        publicPath: '/',
        sourceMapFilename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.js.map' : '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        alias: {},
        modules: [
            'node_modules'
        ],
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },
    plugins: plugins,
    module: {
        rules: rules
    }
};