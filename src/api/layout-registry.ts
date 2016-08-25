import * as React from "react";

export type LayoutFactory = (() => JSX.Element);

const layouts: { [key: string]: LayoutFactory } = {};

export function registerLayout(name: string, factory: LayoutFactory) {
    layouts[name] = factory;
}

export function getLayout(name: string): LayoutFactory {
    return layouts[name];
}