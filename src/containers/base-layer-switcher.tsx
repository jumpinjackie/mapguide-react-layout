import * as React from "react";
import { useDispatch } from "react-redux";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import { useActiveMapName, useViewerLocale, useActiveMapExternalBaseLayers } from './hooks';
import { setBaseLayer } from '../actions/map';

export interface IBaseLayerSwitcherContainerProps {

}

const BaseLayerSwitcherContainer = () => {
    const mapName = useActiveMapName();
    const locale = useViewerLocale();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const dispatch = useDispatch();
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

export default BaseLayerSwitcherContainer;