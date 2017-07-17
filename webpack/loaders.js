'use strict';
/*
exports.tslint = {
  test: /\.tsx?$/,
  loader: 'tslint',
  exclude: /node_modules/
};
*/
exports.tsx = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /(node_modules|test-utils|\.test\.ts$)/
};

exports.html = {
  test: /\.html$/,
  loader: 'raw-loader',
  exclude: /node_modules/
};

exports.less = {
  test: /\.less$/,
  loader: 'less-loader!css-loader',
  exclude: /node_modules/
};

exports.css = {
  test: /\.css$/,
  loader: 'style-loader!css-loader'/*,
  exclude: /node_modules/ */
};

exports.image = {
  test: /\.(png|gif)$/,
  loader: "file-loader",
  options: {
    name: "[path][name].[ext]",
    publicPath: "./dist/"
  }
};

exports.cursors = {
  test: /\.cur$/,
  loader: "file-loader",
  options: {
    name: "[path][name].[ext]",
    publicPath: "./dist/"
  }
};

exports.fonts = {
  test: /\.(woff|woff2|ttf|eot|svg)$/,
  loader: "file-loader",
  options: {
    name: "stdassets/fonts/[name].[ext]",
    publicPath: "./dist/"
  }
};

exports.sourcemap = {
  test: /\.js$/,
  loader: "source-map-loader",
  include: /@blueprintjs/,
  enforce: "pre"
};