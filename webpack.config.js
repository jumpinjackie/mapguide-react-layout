'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


const baseAppEntries = [
    './src/entries/library.tsx',
];

const devAppEntries = [
    //   'webpack-hot-middleware/client?reload=true',
];

const appEntries = baseAppEntries.concat(process.env.NODE_ENV === 'development' ? devAppEntries : []);
const vendorEntries = [
    'react',
    'react-dom'
];

const basePlugins = [
    new webpack.ProvidePlugin({
        "proj4": "proj4"
    }),
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
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
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false
    })
];

const plugins = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = {

    entry: {
        viewer: appEntries
        //app: appEntries,
        //vendor: vendorEntries
    },

    output: {
        libraryTarget: "var",
        library: "MapGuide",
        path: path.join(__dirname, 'viewer/dist'),
        //filename: '[name].[hash].js',
        filename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.js' : '[name].js',
        publicPath: '/',
        //sourceMapFilename: '[name].[hash].js.map',
        sourceMapFilename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.js.map' : '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    devtool: 'source-map',

    resolve: {
        alias: {},
        modules: [
            'node_modules'
        ],
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },

    plugins: plugins,

    module: {
        rules: [
            loaders.sourcemap,
            loaders.tsx,
            loaders.html,
            loaders.css,
            loaders.less,
            loaders.fonts,
            /*
            loaders.svg,
            loaders.eot,
            loaders.woff,
            loaders.woff2,
            loaders.ttf,
            */
            loaders.image,
            loaders.cursors
        ]
    }
};