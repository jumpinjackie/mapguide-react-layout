import * as React from "react";
import * as ReactDOM from "react-dom";
import { CreateRuntimeMapFeatureFlags } from "../api/request-builder";
import { MapViewer } from "./map-viewer";

import { ClientContext, ClientKind } from '../api/client';

export interface IApplicationProps {
    /**
     * Agent configuration 
     * 
     * @type {{
     *         uri: string,
     *         kind?: ClientKind
     *     }}
     */
    agent: {
        uri: string,
        kind?: ClientKind
    },
    /**
     * A resource id to a Map Definition or Application Definition. If passing a Map Definition,
     * a default viewer layout will be created 
     * 
     * @type {string}
     */
    resourceId: string;
}

export interface IApplicationContext {
    
}

export class Application extends React.Component<IApplicationProps, any> {
    clientContext: ClientContext;
    constructor(props) {
        super(props);
        this.state = {
            runtimeMap: null
        };
    }
    componentDidMount() {
        const { agent } = this.props;
        this.clientContext = new ClientContext(agent.uri, agent.kind);
        this.clientContext.agent.createRuntimeMap({
            mapDefinition: this.props.resourceId,
            requestedFeatures: CreateRuntimeMapFeatureFlags.LayerFeatureSources | CreateRuntimeMapFeatureFlags.LayerIcons | CreateRuntimeMapFeatureFlags.LayersAndGroups,
            username: "Anonymous"
        }).then(res => {
            this.setState({ runtimeMap: res });
        });
    }
    render(): JSX.Element {
        if (this.state.runtimeMap) {
            return <MapViewer map={this.state.runtimeMap} agentUri={this.props.agent.uri} imageFormat="PNG" />;
        } else {
            return <div>Loading Map ...</div>;
        }
    }
}

/**
 * This is the entry point to the Application component
 */
export class ApplicationViewModel {
    constructor() {

    }
    public mount(node: Element, props: IApplicationProps) {
        ReactDOM.render(<Application {...props}/>, node);
    }
}