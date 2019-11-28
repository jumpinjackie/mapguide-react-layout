import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    INameValuePair,
    IApplicationState,
    PropType
} from "../api/common";
import { MapMenu } from "../components/map-menu";
import * as MapActions from "../actions/map";

interface MMCState {
    locale: string;
    activeMapName: string;
    availableMaps: INameValuePair[];
}

interface MMCDispatch {
    setActiveMap: (mapName: string) => void;
}

const MapMenuContainer = () => {
    const dispatch = useDispatch();
    const { locale, activeMapName, availableMaps } = useSelector<IApplicationState, MMCState>(state => {
        return {
            locale: state.config.locale,
            activeMapName: state.config.activeMapName,
            availableMaps: state.config.availableMaps
        } as MMCState;
    });
    const setActiveMap: PropType<MMCDispatch, "setActiveMap"> = (mapName: string) => dispatch(MapActions.setActiveMap(mapName));
    const onActiveMapChanged = (mapName: string) => setActiveMap(mapName);
    if (locale && activeMapName && availableMaps) {
        //TODO: Should use MapGroup id has label. For now, use map name for both
        const entries = availableMaps.map(m => {
            return { label: m.name, mapName: m.value };
        });
        return <MapMenu onActiveMapChanged={onActiveMapChanged} selectedMap={activeMapName} maps={entries} locale={locale} />;
    } else {
        return <noscript />;
    }
}

export default MapMenuContainer;