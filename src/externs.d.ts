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

// Monkey-patched ol ES2015 module declarations (this is a bug in the jsdoc-typescript-plugin that generated the OL typings)
declare module "ol" {
    export default ol;
}

declare module "ol/events" {
    import olImage from "ol/image";
    class Events {
        static listen(image: olImage, event: string, handler: Function, thisArg: any): void;
    }
    export default Events;
}

declare module "ol/uri" {
    class Uri {
        static appendParams(baseUrl: string, params: any): string;
    }
    export default Uri;
}

declare module "react-splitter-layout" {
    import * as React from "react";

    export interface ISplitterLayoutProps {
        customClassName?: string;
        primaryIndex?: number;
        primaryMinSize?: number;
        secondaryInitialSize?: number;
        onSecondaryPaneSizeChange?: (size: number) => void;
    }
    export default class SplitterLayout extends React.Component<ISplitterLayoutProps, any> {

    }
}

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
