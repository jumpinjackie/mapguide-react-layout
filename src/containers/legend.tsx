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
    IBranchedMapSubState,
    IExternalBaseLayer,
    getExternalBaseLayers
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
    selectableLayers: any;
    expandedGroups: any;
    externalBaseLayers: IExternalBaseLayer[];
    showGroups: string[];
    showLayers: string[];
    hideGroups: string[];
    hideLayers: string[];
}

export interface ILegendContainerDispatch {
    setBaseLayer: (mapName: string, layerName: string) => void;
    setGroupVisibility: (mapName: string, options: { id: string, value: boolean }) => void;
    setLayerVisibility: (mapName: string, options: { id: string, value: boolean }) => void;
    setLayerSelectable: (mapName: string, options: { id: string, value: boolean }) => void;
    setGroupExpanded: (mapName: string, options: { id: string, value: boolean }) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: ILegendContainerProps): Partial<ILegendContainerState> {
    let view;
    let runtimeMap;
    let selectableLayers;
    let expandedGroups;
    let externalBaseLayers;
    let viewer;
    let showGroups;
    let showLayers;
    let hideGroups;
    let hideLayers;
    if (state.config.activeMapName) {
        const branch = state.mapState[state.config.activeMapName];
        view = branch.currentView;
        externalBaseLayers = branch.externalBaseLayers;
        runtimeMap = branch.runtimeMap;
        expandedGroups = branch.expandedGroups;
        selectableLayers = branch.selectableLayers;
        showGroups = branch.showGroups;
        showLayers = branch.showLayers;
        hideGroups = branch.hideGroups;
        hideLayers = branch.hideLayers;
    }
    return {
        view: view,
        showGroups: showGroups,
        showLayers: showLayers,
        hideGroups: hideGroups,
        hideLayers: hideLayers,
        config: state.config,
        map: runtimeMap,
        selectableLayers: selectableLayers,
        expandedGroups: expandedGroups,
        externalBaseLayers: getExternalBaseLayers(state)
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ILegendContainerDispatch> {
    return {
        setBaseLayer: (mapName: string, layerName: string) => dispatch(MapActions.setBaseLayer(mapName, layerName)),
        setGroupVisibility: (mapName: string, options) => dispatch(LegendActions.setGroupVisibility(mapName, options)),
        setLayerVisibility: (mapName: string, options) => dispatch(LegendActions.setLayerVisibility(mapName, options)),
        setLayerSelectable: (mapName: string, options) => dispatch(LegendActions.setLayerSelectable(mapName, options)),
        setGroupExpanded: (mapName: string, options) => dispatch(LegendActions.setGroupExpanded(mapName, options))
    };
}

export type LegendContainerProps = ILegendContainerProps & Partial<ILegendContainerState> & Partial<ILegendContainerDispatch>;

class LegendContainer extends React.Component<LegendContainerProps, any> {
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
        const { config, setLayerSelectable } = this.props;
        if (setLayerSelectable && config && config.activeMapName) {
            setLayerSelectable(config.activeMapName, { id: id, value: selectable });
        }
    }
    private onGroupExpansionChanged(id: string, expanded: boolean) {
        const { config, setGroupExpanded } = this.props;
        if (setGroupExpanded && config && config.activeMapName) {
            setGroupExpanded(config.activeMapName, { id: id, value: expanded });
        }
    }
    private onGroupVisibilityChanged(groupId: string, visible: boolean) {
        const { config, setGroupVisibility } = this.props;
        if (setGroupVisibility && config && config.activeMapName) {
            setGroupVisibility(config.activeMapName, { id: groupId, value: visible });
        }
    }
    private onLayerVisibilityChanged(layerId: string, visible: boolean) {
        const { config, setLayerVisibility } = this.props;
        if (setLayerVisibility && config && config.activeMapName) {
            setLayerVisibility(config.activeMapName, { id: layerId, value: visible });
        }
    }
    private onBaseLayerChanged(layerName: string) {
        const { config, setBaseLayer } = this.props;
        if (setBaseLayer && config && config.activeMapName) {
            setBaseLayer(config.activeMapName, layerName);
        }
    }
    render(): JSX.Element {
        //overrideSelectableLayers?: any;
        //overrideExpandedItems?: any;
        const {
            map,
            config,
            view,
            showGroups,
            showLayers,
            hideGroups,
            hideLayers,
            expandedGroups,
            selectableLayers,
            maxHeight,
            inlineBaseLayerSwitcher,
            externalBaseLayers
        } = this.props;
        let locale: string | undefined;
        if (map && config && view) {
            locale = config.locale;
            let scale = view.scale;
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
                    externalBaseLayers={externalBaseLayers}
                    onBaseLayerChanged={this.fnBaseLayerChanged}
                    overrideSelectableLayers={selectableLayers}
                    overrideExpandedItems={expandedGroups}
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

export default connect(mapStateToProps, mapDispatchToProps)(LegendContainer);