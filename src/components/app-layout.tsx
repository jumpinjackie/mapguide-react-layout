import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapViewer } from "./map-viewer";

export interface IAppLayoutProps {

}

export class AppLayout extends React.Component<IAppLayoutProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <MapViewer />;
    }
}

/**
 * This is the entry point to the AppLayout component
 */
export class AppLayoutViewModel {
    constructor() {

    }
    public mount(node: Element, props: IAppLayoutProps) {
        ReactDOM.render(<AppLayout {...props}/>, node);
    }
}