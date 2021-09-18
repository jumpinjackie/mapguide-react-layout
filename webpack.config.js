'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const basePlugins = [
    new webpack.ProvidePlugin({
        "proj4": "proj4"
    }),
    new webpack.DefinePlugin({
        //Needed for blueprint
        'process.env.BLUEPRINT_NAMESPACE': JSON.stringify("bp3"),
        __DEV__: process.env.BUILD_MODE !== 'production',
        __VERSION__: JSON.stringify(process.env.APPVEYOR_BUILD_VERSION || ""),
        __COMMITHASH__: JSON.stringify(process.env.APPVEYOR_REPO_COMMIT || ""),
        __BRANCH__: JSON.stringify(process.env.APPVEYOR_REPO_BRANCH  || "master")
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.css' : '[name].css',
        chunkFilename: "[id].css"
    }),
    // Intercept the BP icon import with our own slimmed down version
    // Ref: https://github.com/palantir/blueprint/issues/2193#issuecomment-453326234
    new webpack.NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.*/,
        path.resolve(__dirname, 'stdassets/bp-icons.js'),
    )
];

const devPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.WatchIgnorePlugin({
        paths: [
            /\.js$/,
            /\.d\.ts$/
        ]
    })
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
        use: [
            'less-loader',
            'css-loader'
        ],
        exclude: /node_modules/
    },
    { //fonts
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: "file-loader",
        options: {
            name: "stdassets/fonts/[name].[ext]"
        }
    },
    { //Non-sprite images
        test: /\.(png|gif)$/,
        exclude: /(node_modules|icons\.png)/,
        loader: "file-loader",
        options: {
            name(file) {
                //console.log(`[file-loader]: Processing: ${file}`);
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

module.exports = {
    mode: (process.env.BUILD_MODE === 'development' ? 'development' : 'production'),
    entry: {
        viewer: {
            import: './src/entries/library.tsx'
        },
        "viewer-generic": {
            import: './src/entries/library-generic.tsx'
        }
    },
    devtool: 'source-map',
    output: {
        libraryTarget: "var",
        library: "MapGuide",
        path: path.join(__dirname, 'viewer/dist'),
        filename: process.env.DEBUG_BUILD === '1' ? '[name]-debug.js' : '[name].js',
        publicPath: '/',
        sourceMapFilename: '[file].map[query]',
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