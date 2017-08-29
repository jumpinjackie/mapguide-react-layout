/**
 * externs.d.ts
 *
 * This file contains type definitions for external libraries where:
 *
 *  a. No such typings exist
 *  b. The typings are for a version of a library that is out of date
 *  c. The typings are poor quality or unusable
 */

// Stamped by webpack
declare const __DEV__: boolean;

declare module "ismobilejs" {
    var isMobile: any;
    export = isMobile;
}

declare module "proj4";

// Monkey patching Array.filter to support type narrowing
// https://github.com/Microsoft/TypeScript/issues/7657
interface Array<T> {
    filter<U extends T>(pred: (a: T) => a is U): U[];
}

// Types for various development options.

// A hack for the Redux DevTools Chrome extension.
interface Window {
    devToolsExtension?: () => void;
}

// webpack-hot-loader sets some extra attributes on node's `module`if that
// module has been hot-loaded in the browser.
interface NodeModule {
    hot: { accept: Function };
}
