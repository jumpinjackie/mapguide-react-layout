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

declare module "@aneves/react-flyout" {
    import * as React from "react";

    interface IFlyoutWrapperProps {
        id: string;
        open: boolean;
        options?: any;
    }

    export default class FlyoutWrapper extends React.Component<IFlyoutWrapperProps, any> {

    }
}

declare module "query-string" {
    function parse(queryStringOrHash: string): any;
    function stringify(params: any): string; 

    export = {
        parse: parse,
        stringify: stringify
    };
}

declare module "object-assign" {
    function assign(target: any, ...objectsToMerge: any[]);
    export = assign;
}

// lodash is the kitchen sink, lodash.debounce only exports _.debounce
declare module "lodash.debounce" {
    import * as _ from "lodash";
    export = _.debounce;
}

// lodash is the kitchen sink, lodash.uniq only exports _.uniq
declare module "lodash.uniq" {
    import * as _ from "lodash";
    export = _.uniq;
}