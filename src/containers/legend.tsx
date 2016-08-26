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
    legend?: any;
    viewer?: any;
}

interface ILegendContainerDispatch {
    setBaseLayer?: (layerName: string) => void;
    setGroupVisibility?: (options) => void;
    setLayerVisibility?: (options) => void;
    setLayerSelectable?: (options) => void;
    setGroupExpanded?: (options) => void;
}

function mapStateToProps(state): ILegendContainerState {
    return {
        view: state.view.current,
        viewer: state.map.viewer,
        config: state.config,
        map: state.map.state,
        legend: state.legend
    };
}

function mapDispatchToProps(dispatch): ILegendContainerDispatch {
    return {
        setBaseLayer: (layerName: string) => dispatch(MapActions.setBaseLayer(layerName)),
        setGroupVisibility: (options) => dispatch(LegendActions.setGroupVisibility(options)),
        setLayerVisibility: (options) => dispatch(LegendActions.setLayerVisibility(options)),
        setLayerSelectable: (options) => dispatch(LegendActions.setLayerSelectable(options)),
        setGroupExpanded: (options) => dispatch(LegendActions.setGroupExpanded(options))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class LegendContainer extends React.Component<ILegendContainerProps & ILegendContainerState & ILegendContainerDispatch, any> {
    private fnBaseLayerChanged: (baseLayerName) => void;
    private fnGroupVisibilityChanged: MapElementChangeFunc;
    private fnLayerVisibilityChanged: MapElementChangeFunc;
    private fnLayerSelectabilityChanged: (id, selectable) => void;
    private fnGroupExpansionChanged: (id, selectable) => void;
    constructor(props) {
        super(props);
        this.fnGroupVisibilityChanged = this.onGroupVisibilityChanged.bind(this);
        this.fnLayerVisibilityChanged = this.onLayerVisibilityChanged.bind(this);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
        this.fnLayerSelectabilityChanged = this.onLayerSelectabilityChanged.bind(this);
        this.fnGroupExpansionChanged = this.onGroupExpansionChanged.bind(this);
    }
    private onLayerSelectabilityChanged(id: string, selectable: boolean) {
        this.props.setLayerSelectable({ id: id, value: selectable });
    }
    private onGroupExpansionChanged(id: string, expanded: boolean) {
        this.props.setGroupExpanded({ id: id, value: expanded });
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
        //overrideSelectableLayers?: any;
        //overrideExpandedItems?: any;

        const { map, config, view, viewer, legend } = this.props;
        if (map != null && config != null && view != null && legend != null) {
            let scale = view.scale;
            const showLayers = [];
            const showGroups = [];
            const hideLayers = [];
            const hideGroups = [];
            if (viewer != null && viewer.layerGroupVisibility != null) {
                showLayers.push(...(viewer.layerGroupVisibility.showLayers || []));
                showGroups.push(...(viewer.layerGroupVisibility.showGroups || []));
                hideLayers.push(...(viewer.layerGroupVisibility.hideLayers || []));
                hideGroups.push(...(viewer.layerGroupVisibility.hideGroups || []));
            }
            if (scale) {
                return <Legend map={map}
                               currentScale={scale}
                               showLayers={showLayers}
                               showGroups={showGroups}
                               hideLayers={hideLayers}
                               hideGroups={hideGroups}
                               externalBaseLayers={config.externalBaseLayers} 
                               onBaseLayerChanged={this.fnBaseLayerChanged}
                               overrideSelectableLayers={legend.selectableLayers}
                               overrideExpandedItems={legend.expandedGroups}
                               onLayerSelectabilityChanged={this.fnLayerSelectabilityChanged}
                               onGroupExpansionChanged={this.fnGroupExpansionChanged}
                               onGroupVisibilityChanged={this.fnGroupVisibilityChanged}
                               onLayerVisibilityChanged={this.fnLayerVisibilityChanged} />;
            } else {
                return <div>Loading ...</div>;
            }
        } else {
            return <div>Loading ...</div>;
        }
    }
}