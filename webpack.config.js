'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.css' : '[name].css',
        chunkFilename: "[id].css"
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
    { //sourcemap
        test: /\.js$/,
        loader: "source-map-loader",
        include: /@blueprintjs/,
        enforce: "pre"
    },
    { //html
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/
    },
    { //css
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './'
                }
            },
            "css-loader"
        ]
    },
    { //less
        test: /\.less$/,
        loader: 'less-loader!css-loader',
        exclude: /node_modules/
    },
    { //fonts
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: "file-loader",
        options: {
            name: "stdassets/fonts/[name].[ext]"
        }
    },
    { //babel
        test: /\.js$/,
        exclude: /node_modules/,
        /*
        include: [
          path.resolve(__dirname, "../node_modules/history")
        ],*/
        use: {
            loader: "babel-loader",
            options: {
                plugins: ["babel-plugin-transform-object-assign"]
            }
        }
    },
    { //Non-sprite images
        test: /\.(png|gif)$/,
        exclude: /(node_modules|icons\.png)/,
        loader: "file-loader",
        options: {
            name(file) {
                var fidx = file.indexOf("stdassets");
                var relPath = file.substring(fidx).replace(/\\/g, "/");
                if (relPath.startsWith("stdassets/images/icons/")) {
                    return "stdassets/images/icons/[name].[ext]";
                } else if (relPath.startsWith("stdassets/images/res")) {
                    return "stdassets/images/res/[name].[ext]";
                } else {
                    return "[path][name].[ext]";
                }
            },
            publicPath: "./dist"
        }
    },
    { //Image sprite
        test: /icons\.(png|gif)$/,
        loader: "file-loader",
        options: {
            name(file) {
                return "[path][name].[ext]";
            }
        }
    },
    { //Cursors
        test: /\.cur$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
            name(file) {
                return "stdassets/cursors/[name].[ext]";
            },
            publicPath: "./dist"
        }
    },
    { //TypeScript React
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|test-utils|\.test\.ts$)/
    }
];
/*
if (process.env.BUILD_MODE === 'production' || process.env.DEBUG_BUILD === '1') {
    rules.push(loaders.tsx);
} else {
    rules.push(loaders.tsx_multithreaded);
    plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }));
}
*/

const opts = (process.env.BUILD_MODE === 'production')
    ? {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
    : { minimize: false }

module.exports = {
    optimization: opts,
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