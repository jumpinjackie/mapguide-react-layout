import * as React from "react";
import { Error } from "../../components/error";
import { tr } from "../i18n";

/**
 * The default set of component names
 *
 *
 * @class DefaultComponentNames
 */
export enum DefaultComponentNames {
    Legend = "Legend",
    SelectionPanel = "SelectionPanel",
    Map = "Map",
    Navigator = "Navigator",
    MouseCoordinates = "MouseCoordinates",
    ScaleDisplay = "ScaleDisplay",
    SelectedFeatureCount = "SelectedFeatureCount",
    PoweredByMapGuide = "PoweredByMapGuide",
    TaskPane = "TaskPane",
    About = "About",
    SessionExpired = "SessionExpired",
    Measure = "Measure",
    ViewerOptions = "ViewerOptions",
    QuickPlot = "QuickPlot",
    BaseMapSwitcher = "BaseMapSwitcher",
    MapMenu = "MapMenu",
    ViewSize = "ViewSize",
    CoordinateTracker = "CoordinateTracker",
    AddManageLayers = "AddManageLayers",
    ShareLinkToView = "ShareLinkToView"
}

/**
 * A react component factory function signature
 */
export type ComponentFactory = (props: any) => JSX.Element;

const components: { [id: string]: ComponentFactory } = {};

/**
 * Registers a react component factory function for the given component id
 *
 *
 * @param {string} id
 * @param {ComponentFactory} factory
 */
export function registerComponentFactory(id: string, factory: ComponentFactory): void {
    components[id] = factory;
}

/**
 * Gets the registered component factory function for the given component id
 *
 *
 * @param {string} id
 * @returns {ComponentFactory}
 */
export function getComponentFactory(id: string): ComponentFactory | undefined {
    return components[id];
}

/**
 * Placeholder component properties
 *
 *
 * @interface IPlaceholderComponentProps
 */
export interface IPlaceholderComponentProps {
    /**
     * The id of the component this placeholder is for
     *
     * @type {string}
     *
     */
    id: string;
    /**
     * The locale
     *
     * @type {string}
     *
     */
    locale?: string;
    /**
     * The props of the underlying component
     *
     * @type {*}
     *
     */
    componentProps?: any;
}

/**
 * A component placeholder
 *
 * @hidden
 * @param props
 */
export const PlaceholderComponent: React.FC<IPlaceholderComponentProps> = (props) => {
    const { id, componentProps, locale } = props;
    const factory = getComponentFactory(id);
    if (factory) {
        return factory(componentProps);
    } else {
        return <Error error={tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: id })} />;
    }
};