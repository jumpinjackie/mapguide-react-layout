import * as React from "react";
import { Error } from "../../components/error";
import { tr } from "../i18n";

/**
 * The default set of component names
 *
 * @export
 * @class DefaultComponentNames
 */
export class DefaultComponentNames {
    public static get Legend(): string { return "Legend"; }
    public static get SelectionPanel(): string { return "SelectionPanel"; }
    public static get Map(): string { return "Map"; }
    public static get Navigator(): string { return "Navigator"; }
    public static get MouseCoordinates(): string { return "MouseCoordinates"; }
    public static get ScaleDisplay(): string { return "ScaleDisplay"; }
    public static get SelectedFeatureCount(): string { return "SelectedFeatureCount"; }
    public static get PoweredByMapGuide(): string { return "PoweredByMapGuide"; }
    public static get TaskPane(): string { return "TaskPane"; }
    public static get About(): string { return "About"; }
    public static get SessionExpired(): string { return "SessionExpired"; }
    public static get Measure(): string { return "Measure"; }
    public static get ViewerOptions(): string { return "ViewerOptions"; }
    public static get QuickPlot(): string { return "QuickPlot"; }
    public static get BaseMapSwitcher(): string { return "BaseMapSwitcher"; }
    public static get MapMenu(): string { return "MapMenu"; }
}

/**
 * A react component factory function signature
 */
export type ComponentFactory = (props: any) => JSX.Element;

const components: { [id: string]: ComponentFactory } = {};

/**
 * Registers a react component factory function for the given component id
 *
 * @export
 * @param {string} id
 * @param {ComponentFactory} factory
 */
export function registerComponentFactory(id: string, factory: ComponentFactory): void {
    components[id] = factory;
}

/**
 * Gets the registered component factory function for the given component id
 *
 * @export
 * @param {string} id
 * @returns {ComponentFactory}
 */
export function getComponentFactory(id: string): ComponentFactory | undefined {
    return components[id];
}

/**
 * Placeholder component properties
 *
 * @export
 * @interface IPlaceholderComponentProps
 */
export interface IPlaceholderComponentProps {
    /**
     * The id of the component this placeholder is for
     *
     * @type {string}
     * @memberOf IPlaceholderComponentProps
     */
    id: string;
    /**
     * The locale
     *
     * @type {string}
     * @memberOf IPlaceholderComponentProps
     */
    locale?: string;
    /**
     * The props of the underlying component
     *
     * @type {*}
     * @memberOf IPlaceholderComponentProps
     */
    componentProps?: any;
}

/**
 * A component placeholder
 *
 * @export
 * @class PlaceholderComponent
 * @extends {React.Component<IPlaceholderComponentProps, any>}
 */
export class PlaceholderComponent extends React.Component<IPlaceholderComponentProps, any> {
    constructor(props: IPlaceholderComponentProps) {
        super(props);
    }
    render(): JSX.Element {
        const { id, componentProps } = this.props;
        const factory = getComponentFactory(id);
        if (factory) {
            return factory(componentProps);
        } else {
            return <Error error={tr("ERR_UNREGISTERED_COMPONENT", this.props.locale, { componentId: id })} />;
        }
    }
}