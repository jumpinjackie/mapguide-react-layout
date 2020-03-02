import * as React from "react";
import { useDispatch } from "react-redux";
import { Legend } from "../components/legend";
import { tr } from "../api/i18n";
import { useActiveMapView, useActiveMapExternalBaseLayers, useActiveMapName, useViewerLocale } from './hooks';
import { setBaseLayer } from '../actions/map';
import { setGroupVisibility, setLayerVisibility, setLayerSelectable, setGroupExpanded } from '../actions/legend';
import { useActiveMapState, useActiveMapShowGroups, useActiveMapShowLayers, useActiveMapHideGroups, useActiveMapHideLayers, useActiveMapExpandedGroups, useActiveMapSelectableLayers } from './hooks-mapguide';

export interface ILegendContainerProps {
    maxHeight?: number;
    inlineBaseLayerSwitcher?: boolean;
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
    const setBaseLayerAction = (mapName: string, layerName: string) => dispatch(setBaseLayer(mapName, layerName));
    const setGroupVisibilityAction = (mapName: string, options: { id: string, value: boolean }) => dispatch(setGroupVisibility(mapName, options));
    const setLayerVisibilityAction = (mapName: string, options: { id: string, value: boolean }) => dispatch(setLayerVisibility(mapName, options));
    const setLayerSelectableAction = (mapName: string, options: { id: string, value: boolean }) => dispatch(setLayerSelectable(mapName, options));
    const setGroupExpandedAction = (mapName: string, options: { id: string, value: boolean }) => dispatch(setGroupExpanded(mapName, options));

    const onLayerSelectabilityChanged = (id: string, selectable: boolean) => {
        if (activeMapName) {
            setLayerSelectableAction?.(activeMapName, { id: id, value: selectable });
        }
    };
    const onGroupExpansionChanged = (id: string, expanded: boolean) => {
        if (setGroupExpandedAction && activeMapName) {
            setGroupExpandedAction(activeMapName, { id: id, value: expanded });
        }
    };
    const onGroupVisibilityChanged = (groupId: string, visible: boolean) => {
        if (setGroupVisibilityAction && activeMapName) {
            setGroupVisibilityAction(activeMapName, { id: groupId, value: visible });
        }
    };
    const onLayerVisibilityChanged = (layerId: string, visible: boolean) => {
        if (setLayerVisibilityAction && activeMapName) {
            setLayerVisibilityAction(activeMapName, { id: layerId, value: visible });
        }
    };
    const onBaseLayerChanged = (layerName: string) => {
        if (setBaseLayerAction && activeMapName) {
            setBaseLayerAction(activeMapName, layerName);
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