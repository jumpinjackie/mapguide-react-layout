const webpackConfig = require('./webpack.config');
const assign = require('object-assign');

const mergedExternals = assign({}, {
    'cheerio': 'window',
    'jsdom': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
}, webpackConfig.externals);

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/**/*.spec.ts',
            'test/**/*.spec.tsx'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/**/*.spec.{ts,tsx}': ['webpack']
        },
        webpack: assign(webpackConfig, {
            externals: mergedExternals,
            loaders: webpackConfig.module.loaders.concat([
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ])
        }),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
}