import * as React from "react";
import { connect } from "react-redux";
import { IMapView } from "../components/context";
import { ActiveMapTool, MapViewerBase } from "../components/map-viewer-base";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as MapActions from "../actions/map";

interface IMapViewerContainerProps {
    
}

interface IMapViewerContainerState {
    config?: any;
    map?: RuntimeMap;
    view?: any;
    viewer?: any;
}

interface IMapViewerContainerDispatch {
    setCurrentView?: (view) => void;
    setSelection?: (selectionSet) => void;
    setBusyCount?: (count) => void;
}

function mapStateToProps(state): IMapViewerContainerState {
    return {
        config: state.config,
        view: state.view,
        map: state.map.state,
        viewer: state.map.viewer
    };
}

function mapDispatchToProps(dispatch): IMapViewerContainerDispatch {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view)),
        setSelection: (selectionSet) => dispatch(MapActions.setSelection(selectionSet)),
        setBusyCount: (count) => dispatch(MapActions.setBusyCount(count))
    };
}

type MapViewerContainerProps = IMapViewerContainerProps & IMapViewerContainerState & IMapViewerContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class MapViewerContainer extends React.Component<MapViewerContainerProps, any> {
    private fnViewChanged: (view: IMapView) => void;
    private fnSelectionChanged: (selectionSet: any) => void;
    private fnRequestSelectableLayers: () => string[];
    private fnBusyLoading: (busyCount) => void;
    constructor(props) {
        super(props);
        this.fnViewChanged = this.onViewChanged.bind(this);
        this.fnSelectionChanged = this.onSelectionChanged.bind(this);
        this.fnRequestSelectableLayers = this.onRequestSelectableLayers.bind(this);
        this.fnBusyLoading = this.onBusyLoading.bind(this);
    }
    private onViewChanged(view: IMapView): void {
        this.props.setCurrentView(view);
    }
    private onSelectionChanged(selectionSet: any): void {
        this.props.setSelection(selectionSet);
    }
    private onRequestSelectableLayers(): string[] {
        //TODO: Eventually this should combine with override selectable layers that should be in the redux store
        const { map } = this.props;
        return map.Layer.map(layer => layer.Name);
    }
    private onBusyLoading(busyCount) {
        this.props.setBusyCount(busyCount);
    }
    render(): JSX.Element {
        const { map, config, viewer, view } = this.props;
        if (map != null && config != null && view != null && viewer != null) {
            return <MapViewerBase map={map} 
                                  agentUri={config.agentUri}
                                  agentKind={config.agentKind}
                                  imageFormat={config.imageFormat}
                                  externalBaseLayers={config.externalLayers}
                                  selectionColor={config.selectionColor}
                                  tool={viewer.tool}
                                  featureTooltipsEnabled={viewer.featureTooltipsEnabled}
                                  layerGroupVisibility={viewer.layerGroupVisibility}
                                  view={view.current}
                                  onBusyLoading={this.fnBusyLoading}
                                  onRequestSelectableLayers={this.fnRequestSelectableLayers}
                                  onSelectionChange={this.fnSelectionChanged}
                                  onViewChanged={this.fnViewChanged} />;
        } else {
            return <div>Loading Map ...</div>;
        }
    }
}