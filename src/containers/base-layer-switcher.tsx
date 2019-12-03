import * as React from "react";
import { useDispatch } from "react-redux";
import {
    PropType
} from "../api/common";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import * as MapActions from "../actions/map";
import { useActiveMapName, useViewerLocale, useActiveMapExternalBaseLayers } from './hooks';

export interface IBaseLayerSwitcherContainerProps {

}

interface BLSDispatch {
    setBaseLayer: (mapName: string, layerName: string) => void;
}

const BaseLayerSwitcherContainer = () => {
    const mapName = useActiveMapName();
    const locale = useViewerLocale();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const dispatch = useDispatch();
    const setBaseLayer: PropType<BLSDispatch, "setBaseLayer"> = (mapName: string, layerName: string) => dispatch(MapActions.setBaseLayer(mapName, layerName));
    const onBaseLayerChanged = (layerName: string) => {
        if (mapName) {
            setBaseLayer?.(mapName, layerName);
        }
    }
    if (locale && externalBaseLayers) {
        return <BaseLayerSwitcher onBaseLayerChanged={onBaseLayerChanged} externalBaseLayers={externalBaseLayers} locale={locale} />;
    } else {
        return <noscript />;
    }
}

export default BaseLayerSwitcherContainer;