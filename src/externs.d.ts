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

declare module "object-assign" {
    function assign(target: any, ...objectsToMerge: any[]);
    export = assign;
}

declare module "react-dimensions" {
    import * as React from "react";
    function Dimensions<TProps>(options?: any): (componentClass: React.ComponentClass<TProps>) => React.ComponentClass<TProps>;
    export = Dimensions;
}