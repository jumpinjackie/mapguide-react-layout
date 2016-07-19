import * as React from "react";
import * as ReactDOM from "react-dom";
import { CreateRuntimeMapFeatureFlags, IMapGuideClient } from "../api/request-builder";
import { MapViewer, IMapViewer } from "./map-viewer";
import { Legend, MapElementChangeFunc } from "./legend";
import { ClientContext, ClientKind } from "../api/client";
import { IMapView, IApplicationContext, APPLICATION_CONTEXT_VALIDATION_MAP } from "./context";

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

const SIDEBAR_WIDTH = 250;

export class Application extends React.Component<IApplicationProps, any> implements IApplicationContext {
    fnLegendMounted: (component) => void;
    fnMapViewerMounted: (component) => void;
    fnGroupVisibilityChanged: MapElementChangeFunc;
    fnLayerVisibilityChanged: MapElementChangeFunc;
    fnViewChanged: (view: IMapView) => void;
    _viewer: any;
    _legend: Legend;
    clientContext: ClientContext;
    static childContextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;
    constructor(props) {
        super(props);
        this.fnLegendMounted = this.onLegendMounted.bind(this);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnViewChanged = this.onViewChanged.bind(this);
        this.fnGroupVisibilityChanged = this.onGroupVisibilityChanged.bind(this);
        this.fnLayerVisibilityChanged = this.onLayerVisibilityChanged.bind(this);
        this.state = {
            runtimeMap: null
        };
    }
    getChildContext(): IApplicationContext {
        return {
            getClient: this.getClient.bind(this)
        };
    }
    //-------- IApplicationContext --------//
    getClient(): IMapGuideClient {
        return this.clientContext.agent;
    }
    //-------------------------------------//
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
            return <div style={{ width: "100%", height: "100%" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH, overflowY: "auto" }}>
                    <Legend ref={this.fnLegendMounted}
                                    map={this.state.runtimeMap} 
                                    onGroupVisibilityChanged={this.fnGroupVisibilityChanged}
                                    onLayerVisibilityChanged={this.fnLayerVisibilityChanged} />
                </div>
                <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, bottom: 0, right: 0 }}>
                    <MapViewer ref={this.fnMapViewerMounted}
                                       map={this.state.runtimeMap} 
                                       agentUri={this.props.agent.uri}
                                       onViewChanged={this.fnViewChanged}
                                       imageFormat="PNG" />
                </div>
            </div>;
        } else {
            return <div>Loading Map ...</div>;
        }
    }
    private getViewer(): IMapViewer {
        var viewer = this._viewer.refs['wrappedInstance'];
        return viewer;
    }
    onLegendMounted(legend: Legend) {
        this._legend = legend;
    }
    onMapViewerMounted(component) {
        this._viewer = component;
    }
    onGroupVisibilityChanged(groupId: string, visible: boolean) {
        const viewer = this.getViewer();
        if (viewer != null)
            viewer.setGroupVisibility(groupId, visible);
    }
    onLayerVisibilityChanged(layerId: string, visible: boolean) {
        const viewer = this.getViewer();
        if (viewer != null)
            viewer.setLayerVisibility(layerId, visible);
    }
    onViewChanged(view: IMapView) {
        if (this._legend != null)
            this._legend.setState({ currentScale: view.scale });
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