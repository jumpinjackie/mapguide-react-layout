import * as React from "react";
import { connect } from "react-redux";
import { Legend, MapElementChangeFunc } from "../components/legend";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import {
    IMapView,
    IApplicationState,
    ReduxDispatch,
    IConfigurationReducerState,
    ILegendReducerState,
    IMapViewerReducerState
} from "../api/common";
import { tr } from "../api/i18n";

export interface ILegendContainerProps {
    maxHeight?: number;
    inlineBaseLayerSwitcher?: boolean;
}

export interface ILegendContainerState {
    view: IMapView | null;
    config: IConfigurationReducerState;
    map: RuntimeMap | null;
    legend: ILegendReducerState;
    viewer: IMapViewerReducerState;
}

export interface ILegendContainerDispatch {
    setBaseLayer: (layerName: string) => void;
    setGroupVisibility: (options: { id: string, value: boolean }) => void;
    setLayerVisibility: (options: { id: string, value: boolean }) => void;
    setLayerSelectable: (options: { id: string, value: boolean }) => void;
    setGroupExpanded: (options: { id: string, value: boolean }) => void;
}

function mapStateToProps(state: IApplicationState): ILegendContainerState {
    return {
        view: state.view.current,
        viewer: state.map.viewer,
        config: state.config,
        map: state.map.state,
        legend: state.legend
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): ILegendContainerDispatch {
    return {
        setBaseLayer: (layerName: string) => dispatch(MapActions.setBaseLayer(layerName)),
        setGroupVisibility: (options) => dispatch(LegendActions.setGroupVisibility(options)),
        setLayerVisibility: (options) => dispatch(LegendActions.setLayerVisibility(options)),
        setLayerSelectable: (options) => dispatch(LegendActions.setLayerSelectable(options)),
        setGroupExpanded: (options) => dispatch(LegendActions.setGroupExpanded(options))
    };
}

export type LegendContainerProps = ILegendContainerProps & Partial<ILegendContainerState> & Partial<ILegendContainerDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class LegendContainer extends React.Component<LegendContainerProps, any> {
    private fnBaseLayerChanged: (baseLayerName: string) => void;
    private fnGroupVisibilityChanged: MapElementChangeFunc;
    private fnLayerVisibilityChanged: MapElementChangeFunc;
    private fnLayerSelectabilityChanged: (id: string, selectable: boolean) => void;
    private fnGroupExpansionChanged: (id: string, selectable: boolean) => void;
    constructor(props: LegendContainerProps) {
        super(props);
        this.fnGroupVisibilityChanged = this.onGroupVisibilityChanged.bind(this);
        this.fnLayerVisibilityChanged = this.onLayerVisibilityChanged.bind(this);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
        this.fnLayerSelectabilityChanged = this.onLayerSelectabilityChanged.bind(this);
        this.fnGroupExpansionChanged = this.onGroupExpansionChanged.bind(this);
    }
    private onLayerSelectabilityChanged(id: string, selectable: boolean) {
        if (this.props.setLayerSelectable) {
            this.props.setLayerSelectable({ id: id, value: selectable });
        }
    }
    private onGroupExpansionChanged(id: string, expanded: boolean) {
        if (this.props.setGroupExpanded) {
            this.props.setGroupExpanded({ id: id, value: expanded });
        }
    }
    private onGroupVisibilityChanged(groupId: string, visible: boolean) {
        if (this.props.setGroupVisibility) {
            this.props.setGroupVisibility({ id: groupId, value: visible });
        }
    }
    private onLayerVisibilityChanged(layerId: string, visible: boolean) {
        if (this.props.setLayerVisibility) {
            this.props.setLayerVisibility({ id: layerId, value: visible });
        }
    }
    private onBaseLayerChanged(layerName: string) {
        if (this.props.setBaseLayer) {
            this.props.setBaseLayer(layerName);
        }
    }
    render(): JSX.Element {
        //overrideSelectableLayers?: any;
        //overrideExpandedItems?: any;
        const { map, config, view, viewer, legend, maxHeight, inlineBaseLayerSwitcher } = this.props;
        let locale: string | undefined;
        if (map != null && config != null && view != null && legend != null) {
            locale = config.locale;
            let scale = view.scale;
            const showLayers = [] as string[];
            const showGroups = [] as string[];
            const hideLayers = [] as string[];
            const hideGroups = [] as string[];
            if (viewer != null && viewer.layerGroupVisibility != null) {
                showLayers.push(...(viewer.layerGroupVisibility.showLayers || []));
                showGroups.push(...(viewer.layerGroupVisibility.showGroups || []));
                hideLayers.push(...(viewer.layerGroupVisibility.hideLayers || []));
                hideGroups.push(...(viewer.layerGroupVisibility.hideGroups || []));
            }
            if (scale) {
                return <Legend map={map}
                               maxHeight={maxHeight}
                               currentScale={scale}
                               showLayers={showLayers}
                               showGroups={showGroups}
                               hideLayers={hideLayers}
                               hideGroups={hideGroups}
                               locale={config.locale}
                               inlineBaseLayerSwitcher={!!inlineBaseLayerSwitcher}
                               externalBaseLayers={config.externalBaseLayers} 
                               onBaseLayerChanged={this.fnBaseLayerChanged}
                               overrideSelectableLayers={legend.selectableLayers}
                               overrideExpandedItems={legend.expandedGroups}
                               onLayerSelectabilityChanged={this.fnLayerSelectabilityChanged}
                               onGroupExpansionChanged={this.fnGroupExpansionChanged}
                               onGroupVisibilityChanged={this.fnGroupVisibilityChanged}
                               onLayerVisibilityChanged={this.fnLayerVisibilityChanged} />;
            } else {
                return <div>{tr("LOADING_MSG", locale)}</div>;
            }
        } else {
            return <div>{tr("LOADING_MSG", locale)}</div>;
        }
    }
}