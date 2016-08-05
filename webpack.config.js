'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');

const baseAppEntries = [
    './src/entries/library.tsx',
];

const devAppEntries = [
//   'webpack-hot-middleware/client?reload=true',
];

const appEntries = baseAppEntries.concat(process.env.NODE_ENV === 'development' ? devAppEntries : []);
const vendorEntries = [
    'react',
    'react-dom',
    'openlayers'
];

const basePlugins = [
    new webpack.ProvidePlugin({
        "proj4": "proj4"
    }),
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })/*,
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].js'),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body'
  })*/
];

const devPlugins = [
    new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin()
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
        path: path.join(__dirname, 'dist'),
        //filename: '[name].[hash].js',
        filename: '[name].js',
        publicPath: '/',
        //sourceMapFilename: '[name].[hash].js.map',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    devtool: 'source-map',

    resolve: {
        modulesDirectories: [
            'node_modules'
        ],
        extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },

    plugins: plugins,

    devServer: {
        historyApiFallback: { index: '/' },
        proxy: proxy(),
    },

    module: {
        preLoaders: [
            loaders.tslint,
        ],
        loaders: [
            loaders.tsx,
            loaders.html,
            loaders.css,
            loaders.less,
            loaders.svg,
            loaders.eot,
            loaders.woff,
            loaders.woff2,
            loaders.ttf,
            loaders.image
        ]
    }
};