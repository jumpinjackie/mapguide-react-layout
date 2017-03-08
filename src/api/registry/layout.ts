import * as React from "react";

/**
 * A react layout template component factory function signature
 */
export type LayoutFactory = (() => JSX.Element);

const layouts: { [key: string]: LayoutFactory } = {};

/**
 * Register the given react layout template component factory function for the given
 * template name
 *
 * @export
 * @param {string} name
 * @param {LayoutFactory} factory
 */
export function registerLayout(name: string, factory: LayoutFactory) {
    layouts[name] = factory;
}

/**
 * Gets the registerd react layout template component factory function for the given
 * template name
 *
 * @export
 * @param {string} name
 * @returns {LayoutFactory}
 */
export function getLayout(name: string): LayoutFactory {
    return layouts[name];
}