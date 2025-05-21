/**
 * A react layout template component factory function signature
 */
export type LayoutFactory = (() => JSX.Element);

/**
 * Capabilities of a viewer layout template
 * 
 * @since 0.14
 */
export type LayoutCapabilities = {
    /**
     * Indicates if this viewer layout template has a task pane
     */
    readonly hasTaskPane: boolean;
};

const layouts: { [key: string]: LayoutFactory } = {};
const layoutCaps: { [key: string]: LayoutCapabilities } = {};

/**
 * Gets the capabilities of the given layout template
 * 
 * @param name 
 * @returns 
 * @since 0.14
 */
export function getLayoutCapabilities(name: string): LayoutCapabilities | undefined {
    return layoutCaps[name];
}

/**
 * Register the given react layout template component factory function for the given
 * template name
 *
 * @param {string} name
 * @param {LayoutFactory} factory
 * @param caps The capabilities of this template
 * @since 0.14 
 */
export function registerLayout(name: string, factory: LayoutFactory, caps: LayoutCapabilities) {
    layouts[name] = factory;
    layoutCaps[name] = caps;
}

/**
 * Gets the registerd react layout template component factory function for the given
 * template name
 *
 * @param {string} name
 * @returns {LayoutFactory}
 */
export function getLayout(name: string): LayoutFactory {
    return layouts[name];
}