import * as React from "react";

export interface IAppLayoutProps {

}

export class AppLayout extends React.Component<IAppLayoutProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <div>Hello World</div>;
    }
}