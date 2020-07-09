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
declare const __VERSION__: string;
declare const __COMMITHASH__: string;
declare const __BRANCH__: string;

// To allow file imports (that webpack will transform)
declare module "*.png";
declare module "*.cur";
declare module "*.gif";

declare module "papaparse";

declare module "stickybits";

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

declare module "ismobilejs";

declare module "proj4";

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