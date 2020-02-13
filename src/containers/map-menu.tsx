import * as React from "react";
import { useDispatch } from "react-redux";
import { MapMenu } from "../components/map-menu";
import { useViewerLocale, useActiveMapName, useAvailableMaps } from './hooks';
import { setActiveMap } from '../actions/map';

const MapMenuContainer = () => {
    const dispatch = useDispatch();
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const availableMaps = useAvailableMaps();
    const setActiveMapAction = (mapName: string) => dispatch(setActiveMap(mapName));
    const onActiveMapChanged = (mapName: string) => setActiveMapAction(mapName);
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