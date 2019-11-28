import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Legend } from "../components/legend";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import {
    IMapView,
    IApplicationState,
    IConfigurationReducerState,
    IExternalBaseLayer,
    getExternalBaseLayers,
    PropType
} from "../api/common";
import { tr } from "../api/i18n";

export interface ILegendContainerProps {
    maxHeight?: number;
    inlineBaseLayerSwitcher?: boolean;
}

interface LCState {
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

interface LCDispatch {
    setBaseLayer: (mapName: string, layerName: string) => void;
    setGroupVisibility: (mapName: string, options: { id: string, value: boolean }) => void;
    setLayerVisibility: (mapName: string, options: { id: string, value: boolean }) => void;
    setLayerSelectable: (mapName: string, options: { id: string, value: boolean }) => void;
    setGroupExpanded: (mapName: string, options: { id: string, value: boolean }) => void;
}

const LegendContainer = (props: ILegendContainerProps) => {
    const { maxHeight, inlineBaseLayerSwitcher } = props;
    const dispatch = useDispatch();
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
        externalBaseLayers
    } = useSelector<IApplicationState, LCState>(state => {
        let view;
        let runtimeMap;
        let selectableLayers;
        let expandedGroups;
        let showGroups;
        let showLayers;
        let hideGroups;
        let hideLayers;
        if (state.config.activeMapName) {
            const branch = state.mapState[state.config.activeMapName];
            view = branch.currentView;
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
        } as LCState;
    });
    const setBaseLayer: PropType<LCDispatch, "setBaseLayer"> = (mapName: string, layerName: string) => dispatch(MapActions.setBaseLayer(mapName, layerName));
    const setGroupVisibility: PropType<LCDispatch, "setGroupVisibility"> = (mapName: string, options) => dispatch(LegendActions.setGroupVisibility(mapName, options));
    const setLayerVisibility: PropType<LCDispatch, "setLayerVisibility"> = (mapName: string, options) => dispatch(LegendActions.setLayerVisibility(mapName, options));
    const setLayerSelectable: PropType<LCDispatch, "setLayerSelectable"> = (mapName: string, options) => dispatch(LegendActions.setLayerSelectable(mapName, options));
    const setGroupExpanded: PropType<LCDispatch, "setGroupExpanded"> = (mapName: string, options) => dispatch(LegendActions.setGroupExpanded(mapName, options));

    const onLayerSelectabilityChanged = (id: string, selectable: boolean) => {
        if (config?.activeMapName) {
            setLayerSelectable?.(config.activeMapName, { id: id, value: selectable });
        }
    };
    const onGroupExpansionChanged = (id: string, expanded: boolean) => {
        if (setGroupExpanded && config && config.activeMapName) {
            setGroupExpanded(config.activeMapName, { id: id, value: expanded });
        }
    };
    const onGroupVisibilityChanged = (groupId: string, visible: boolean) => {
        if (setGroupVisibility && config && config.activeMapName) {
            setGroupVisibility(config.activeMapName, { id: groupId, value: visible });
        }
    };
    const onLayerVisibilityChanged = (layerId: string, visible: boolean) => {
        if (setLayerVisibility && config && config.activeMapName) {
            setLayerVisibility(config.activeMapName, { id: layerId, value: visible });
        }
    };
    const onBaseLayerChanged = (layerName: string) => {
        if (setBaseLayer && config && config.activeMapName) {
            setBaseLayer(config.activeMapName, layerName);
        }
    };
    //overrideSelectableLayers?: any;
    //overrideExpandedItems?: any;
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
                onBaseLayerChanged={onBaseLayerChanged}
                overrideSelectableLayers={selectableLayers}
                overrideExpandedItems={expandedGroups}
                onLayerSelectabilityChanged={onLayerSelectabilityChanged}
                onGroupExpansionChanged={onGroupExpansionChanged}
                onGroupVisibilityChanged={onGroupVisibilityChanged}
                onLayerVisibilityChanged={onLayerVisibilityChanged} />;
        } else {
            return <div>{tr("LOADING_MSG", locale)}</div>;
        }
    } else {
        return <div>{tr("LOADING_MSG", locale)}</div>;
    }
}

export default LegendContainer;