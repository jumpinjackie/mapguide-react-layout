import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IExternalBaseLayer,
    IApplicationState,
    PropType
} from "../api/common";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import * as MapActions from "../actions/map";

export interface IBaseLayerSwitcherContainerProps {

}

interface BLSState {
    mapName: string;
    locale: string;
    externalBaseLayers: IExternalBaseLayer[];
}

interface BLSDispatch {
    setBaseLayer: (mapName: string, layerName: string) => void;
}

const BaseLayerSwitcherContainer = () => {
    const { mapName, locale, externalBaseLayers } = useSelector<IApplicationState, BLSState>(state => {
        let externalBaseLayers;
        if (state.config.activeMapName) {
            externalBaseLayers = state.mapState[state.config.activeMapName].externalBaseLayers;
        }
        return {
            mapName: state.config.activeMapName,
            locale: state.config.locale,
            externalBaseLayers: externalBaseLayers
        } as BLSState;
    });
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