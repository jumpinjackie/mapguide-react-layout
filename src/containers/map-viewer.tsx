import * as React from "react";
import { connect } from "react-redux";
import { IMapView } from "../components/context";
import { MapViewer } from "../components/map-viewer";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as MapActions from "../actions/map";

interface IMapViewerContainerProps {
    
}

interface IMapViewerContainerState {
    config?: any;
    map?: RuntimeMap;
}

interface IMapViewerContainerDispatch {
    setCurrentView?: (view) => void;
}

function mapStateToProps(state): IMapViewerContainerState {
    return {
        config: state.config,
        map: state.map.state
    };
}

function mapDispatchToProps(dispatch): IMapViewerContainerDispatch {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class MapViewerContainer extends React.Component<IMapViewerContainerProps & IMapViewerContainerState & IMapViewerContainerDispatch, any> {
    private fnViewChanged: (view: IMapView) => void;
    constructor(props) {
        super(props);
        this.fnViewChanged = this.onViewChanged.bind(this);
    }
    private onViewChanged(view: IMapView) {
        const { setCurrentView } = this.props;
        setCurrentView(view);
    }
    render(): JSX.Element {
        const { map, config } = this.props;
        if (map != null && config != null) {
            return <MapViewer map={map} 
                              agentUri={config.agentUri}
                              agentKind={config.agentKind}
                              imageFormat={config.imageFormat}
                              externalBaseLayers={config.externalLayers}
                              onViewChanged={this.fnViewChanged} />;
        } else {
            return <div>Loading Map ...</div>;
        }
    }
}