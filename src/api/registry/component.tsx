import * as React from "react";
import { Error } from "../../components/error";

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
}

export type ComponentFactory = (props) => JSX.Element; 

const components: { [id: string]: ComponentFactory } = {};

export function registerComponentFactory(id: string, factory: ComponentFactory): void {
    components[id] = factory;
}

export function getComponentFactory(id: string): ComponentFactory {
    return components[id];
}

export interface IPlaceholderComponentProps {
    id: string;
    componentProps?: any;
}

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
            return <Error error={`ERROR: Component (${id}) not registered. Ensure the component has been registered in the component registry with an id of: ${id}`} />;
        }
    }
}