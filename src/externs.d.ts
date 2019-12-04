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

// To allow file imports (that webpack will transform)
declare module "*.png";
declare module "*.cur";
declare module "*.gif";

declare module "history";

declare module "react-splitter-layout" {
    import * as React from "react";

    export interface ISplitterLayoutProps {
        customClassName?: string;
        vertical?: boolean;
        primaryIndex?: number;
        primaryMinSize?: number;
        secondaryInitialSize?: number;
        onSecondaryPaneSizeChange?: (size: number) => void;
        onDragStart?: Function;
        onDragEnd?: Function;
    }
    export default class SplitterLayout extends React.Component<ISplitterLayoutProps, any> {

    }
}

declare module "ismobilejs" {
    var isMobile: any;
    export = isMobile;
}

declare module "proj4";

declare module "react-url-query" {
    export function replaceInUrlQuery(key: string, value: string): void;
    export function configureUrlQuery(obj: any): void;
    export function addUrlProps<T>(config: any): (component: any) => any;
    export interface UrlQueryParamTypes {
        array: any,
        string: any,
        number: any
    }
    export const UrlQueryParamTypes: UrlQueryParamTypes;
}

declare module "history/createBrowserHistory" {
    function createHistory(): any;
    export = createHistory;
}

// Monkey patching Array.filter to support type narrowing
// https://github.com/Microsoft/TypeScript/issues/7657
interface Array<T> {
    filter<U extends T>(pred: (a: T) => a is U): U[];
}

// Types for various development options.

// A hack for the Redux DevTools Chrome extension.
interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => void;
}

// webpack-hot-loader sets some extra attributes on node's `module`if that
// module has been hot-loaded in the browser.
interface NodeModule {
    hot: { accept: Function };
}
