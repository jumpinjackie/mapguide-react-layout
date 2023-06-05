import * as React from "react";
import { Legend } from "../components/legend";
import { tr } from "../api/i18n";
import { useActiveMapView, useActiveMapExternalBaseLayers, useActiveMapName, useViewerLocale, useViewerIsStateless, useActiveMapLayers } from './hooks';
import { setBaseLayer } from '../actions/map';
import { setGroupVisibility, setLayerVisibility, setLayerSelectable, setGroupExpanded } from '../actions/legend';
import { useActiveMapState, useActiveMapShowGroups, useActiveMapShowLayers, useActiveMapHideGroups, useActiveMapHideLayers, useActiveMapExpandedGroups, useActiveMapSelectableLayers } from './hooks-mapguide';
import { useReduxDispatch } from "../components/map-providers/context";
import { AppContext } from "../components/context";

export interface ILegendContainerProps {
    maxHeight?: number;
    inlineBaseLayerSwitcher?: boolean;
}

export const LegendContainer = (props: ILegendContainerProps) => {
    const { maxHeight, inlineBaseLayerSwitcher } = props;
    const dispatch = useReduxDispatch();
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
    const externalBaseLayers = useActiveMapExternalBaseLayers(false);
    const stateless = useViewerIsStateless();
    const appContext = React.useContext(AppContext);
    const setBaseLayerAction = React.useCallback((mapName: string, layerName: string) => dispatch(setBaseLayer(mapName, layerName)), [dispatch]);
    const setGroupVisibilityAction = React.useCallback((mapName: string, options: { id: string, value: boolean }) => dispatch(setGroupVisibility(mapName, options)), [dispatch]);
    const setLayerVisibilityAction = React.useCallback((mapName: string, options: { id: string, value: boolean }) => dispatch(setLayerVisibility(mapName, options)), [dispatch]);
    const setLayerSelectableAction = React.useCallback((mapName: string, options: { id: string, value: boolean }) => dispatch(setLayerSelectable(mapName, options)), [dispatch]);
    const setGroupExpandedAction = React.useCallback((mapName: string, options: { id: string, value: boolean }) => dispatch(setGroupExpanded(mapName, options)), [dispatch]);
    const layers = useActiveMapLayers();
    const onLayerSelectabilityChanged = React.useCallback((id: string, selectable: boolean) => {
        if (activeMapName) {
            setLayerSelectableAction?.(activeMapName, { id: id, value: selectable });
        }
    }, [setLayerSelectableAction]);
    const onGroupExpansionChanged = React.useCallback((id: string, expanded: boolean) => {
        if (setGroupExpandedAction && activeMapName) {
            setGroupExpandedAction(activeMapName, { id: id, value: expanded });
        }
    }, [setGroupExpandedAction]);
    const onGroupVisibilityChanged = React.useCallback((groupId: string, visible: boolean) => {
        if (setGroupVisibilityAction && activeMapName) {
            setGroupVisibilityAction(activeMapName, { id: groupId, value: visible });
        }
    }, [setGroupVisibilityAction]);
    const onLayerVisibilityChanged = React.useCallback((layerId: string, visible: boolean) => {
        if (setLayerVisibilityAction && activeMapName) {
            setLayerVisibilityAction(activeMapName, { id: layerId, value: visible });
        }
    }, [setLayerVisibilityAction]);
    const onBaseLayerChanged = React.useCallback((layerName: string) => {
        if (setBaseLayerAction && activeMapName) {
            setBaseLayerAction(activeMapName, layerName);
        }
    }, [setBaseLayerAction]);
    if ((map || layers) && view) {
        let scale = view.scale;
        if (scale || layers) {
            return <Legend map={map}
                activeMapName={activeMapName}
                stateless={stateless}
                maxHeight={maxHeight}
                currentScale={scale}
                externalLayers={layers}
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
                onLayerVisibilityChanged={onLayerVisibilityChanged}
                provideExtraLayerIconsHtml={appContext.getLegendLayerExtraIconsProvider}
                provideExtraGroupIconsHtml={appContext.getLegendGroupExtraIconsProvider} />;
        } else {
            return <div>{tr("LOADING_MSG", locale)}</div>;
        }
    } else {
        return <div>{tr("LOADING_MSG", locale)}</div>;
    }
}