import * as React from "react";
import { connect } from "react-redux";
import { Legend, MapElementChangeFunc } from "../components/legend";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import { IMapView } from "../components/context";

interface ILegendContainerProps {
    
}

interface ILegendContainerState {
    view?: IMapView;
    config?: any;
    map?: RuntimeMap;
}

interface ILegendContainerDispatch {
    setBaseLayer?: (layerName: string) => void;
    setGroupVisibility?: (options) => void;
    setLayerVisibility?: (options) => void;
}

function mapStateToProps(state): ILegendContainerState {
    return {
        view: state.view.current,
        config: state.config,
        map: state.map.state
    };
}

function mapDispatchToProps(dispatch): ILegendContainerDispatch {
    return {
        setBaseLayer: (layerName: string) => dispatch(MapActions.setBaseLayer(layerName)),
        setGroupVisibility: (options) => dispatch(LegendActions.setGroupVisibility(options)),
        setLayerVisibility: (options) => dispatch(LegendActions.setLayerVisibility(options))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class LegendContainer extends React.Component<ILegendContainerProps & ILegendContainerState & ILegendContainerDispatch, any> {
    private fnBaseLayerChanged: (baseLayerName) => void;
    private fnGroupVisibilityChanged: MapElementChangeFunc;
    private fnLayerVisibilityChanged: MapElementChangeFunc;
    constructor(props) {
        super(props);
        this.fnGroupVisibilityChanged = this.onGroupVisibilityChanged.bind(this);
        this.fnLayerVisibilityChanged = this.onLayerVisibilityChanged.bind(this);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
    }
    private onGroupVisibilityChanged(groupId: string, visible: boolean) {
        this.props.setGroupVisibility({ groupId: groupId, visible: visible });
    }
    private onLayerVisibilityChanged(layerId: string, visible: boolean) {
        this.props.setLayerVisibility({ layerId: layerId, visible: visible });
    }
    private onBaseLayerChanged(layerName: string) {
        this.props.setBaseLayer(layerName);
    }
    render(): JSX.Element {
        const { map, config, view } = this.props;
        if (map != null && config != null && view != null) {
            return <Legend map={map}
                           currentScale={view.scale}
                           externalBaseLayers={config.externalBaseLayers} 
                           onBaseLayerChanged={this.fnBaseLayerChanged}
                           onGroupVisibilityChanged={this.fnGroupVisibilityChanged}
                           onLayerVisibilityChanged={this.fnLayerVisibilityChanged} />;
        } else {
            return <div>Loading ...</div>;
        }
    }
}