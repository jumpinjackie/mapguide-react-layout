import * as React from "react";
import { useDispatch } from "react-redux";
import { Legend } from "../components/legend";
import * as LegendActions from "../actions/legend";
import * as MapActions from "../actions/map";
import {
    PropType
} from "../api/common";
import { tr } from "../api/i18n";
import { useActiveMapState, useActiveMapView, useActiveMapShowGroups, useActiveMapShowLayers, useActiveMapHideGroups, useActiveMapHideLayers, useActiveMapExpandedGroups, useActiveMapSelectableLayers, useActiveMapExternalBaseLayers, useActiveMapName, useViewerLocale } from './hooks';

export interface ILegendContainerProps {
    maxHeight?: number;
    inlineBaseLayerSwitcher?: boolean;
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
    const activeMapName = useActiveMapName();
    const locale = useViewerLocale();
    const map = useActiveMapState();
    const view = useActiveMapView();
    const showGroups = useActiveMapShowGroups();
    const showLayers = useActiveMapShowLayers();
    const hideGroups = useActiveMapHideGroups();
    const hideLayers=  useActiveMapHideLayers();
    const expandedGroups = useActiveMapExpandedGroups();
    const selectableLayers = useActiveMapSelectableLayers();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const setBaseLayer: PropType<LCDispatch, "setBaseLayer"> = (mapName: string, layerName: string) => dispatch(MapActions.setBaseLayer(mapName, layerName));
    const setGroupVisibility: PropType<LCDispatch, "setGroupVisibility"> = (mapName: string, options) => dispatch(LegendActions.setGroupVisibility(mapName, options));
    const setLayerVisibility: PropType<LCDispatch, "setLayerVisibility"> = (mapName: string, options) => dispatch(LegendActions.setLayerVisibility(mapName, options));
    const setLayerSelectable: PropType<LCDispatch, "setLayerSelectable"> = (mapName: string, options) => dispatch(LegendActions.setLayerSelectable(mapName, options));
    const setGroupExpanded: PropType<LCDispatch, "setGroupExpanded"> = (mapName: string, options) => dispatch(LegendActions.setGroupExpanded(mapName, options));

    const onLayerSelectabilityChanged = (id: string, selectable: boolean) => {
        if (activeMapName) {
            setLayerSelectable?.(activeMapName, { id: id, value: selectable });
        }
    };
    const onGroupExpansionChanged = (id: string, expanded: boolean) => {
        if (setGroupExpanded && activeMapName) {
            setGroupExpanded(activeMapName, { id: id, value: expanded });
        }
    };
    const onGroupVisibilityChanged = (groupId: string, visible: boolean) => {
        if (setGroupVisibility && activeMapName) {
            setGroupVisibility(activeMapName, { id: groupId, value: visible });
        }
    };
    const onLayerVisibilityChanged = (layerId: string, visible: boolean) => {
        if (setLayerVisibility && activeMapName) {
            setLayerVisibility(activeMapName, { id: layerId, value: visible });
        }
    };
    const onBaseLayerChanged = (layerName: string) => {
        if (setBaseLayer && activeMapName) {
            setBaseLayer(activeMapName, layerName);
        }
    };
    //overrideSelectableLayers?: any;
    //overrideExpandedItems?: any;
    if (map && view) {
        let scale = view.scale;
        if (scale) {
            return <Legend map={map}
                maxHeight={maxHeight}
                currentScale={scale}
                showLayers={showLayers}
                showGroups={showGroups}
                hideLayers={hideLayers}
                hideGroups={hideGroups}
                locale={locale}
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