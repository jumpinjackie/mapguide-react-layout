import * as React from "react";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import { useActiveMapName, useViewerLocale, useActiveMapExternalBaseLayers } from './hooks';
import { setBaseLayer } from '../actions/map';
import { useReduxDispatch } from "../components/map-providers/context";

export interface IBaseLayerSwitcherContainerProps {

}

export const BaseLayerSwitcherContainer = () => {
    const mapName = useActiveMapName();
    const locale = useViewerLocale();
    const externalBaseLayers = useActiveMapExternalBaseLayers(false);
    const dispatch = useReduxDispatch();
    const setBaseLayerAction = (mapName: string, layerName: string) => dispatch(setBaseLayer(mapName, layerName));
    const onBaseLayerChanged = (layerName: string) => {
        if (mapName) {
            setBaseLayerAction?.(mapName, layerName);
        }
    }
    if (locale && externalBaseLayers) {
        return <BaseLayerSwitcher onBaseLayerChanged={onBaseLayerChanged} externalBaseLayers={externalBaseLayers} locale={locale} />;
    } else {
        return <noscript />;
    }
}