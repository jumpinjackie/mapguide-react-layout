import * as React from "react";
import { IComponentFactory, getComponentFactory } from "../api/component-registry";

interface IComponentPlaceholderProps {
    componentId: string;
    componentProps: any;
}

export class ComponentPlaceholder extends React.Component<IComponentPlaceholderProps, any> {
    factory: IComponentFactory;
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    componentDidMount() {
        try {
            this.factory = getComponentFactory(this.props.componentId);
        } catch (e) {
            this.setState({ error: e });
        }
    }
    render(): JSX.Element {
        if (this.state.error != null) {
            return <div>
            {this.state.error}
            </div>;
        } else {
            const component = this.factory.render(this.props.componentProps);
            return component;
        }
    }
}