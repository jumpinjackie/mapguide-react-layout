import { useSelector } from 'react-redux';
import { IApplicationState, ActiveSelectedFeature, LayerTransparencySet, getRuntimeMap } from '../api/common';
import { getActiveMapBranch } from './hooks';
import { RuntimeMap } from '../api/contracts/runtime-map';

export function useActiveMapMetersPerUnit() {
    return useSelector<IApplicationState, number | undefined>(state => {
        let mpu = 1.0;
        if (state.config.activeMapName) {
            const ms = state.mapState[state.config.activeMapName];
            if (ms.mapguide?.runtimeMap) {
                mpu = ms.mapguide.runtimeMap.CoordinateSystem.MetersPerUnit;
            }
        }
        return mpu;
    });
}

export function useActiveMapProjection() {
    return useSelector<IApplicationState, string | undefined>(state => {
        let proj;
        if (state.config.activeMapName) {
            const map = state.mapState[state.config.activeMapName].mapguide?.runtimeMap;
            if (map) {
                proj = `EPSG:${map.CoordinateSystem.EpsgCode}`;
            }
        }
        return proj;
    });
}

export function useActiveMapExpandedGroups() {
    return useSelector<IApplicationState, string[]>(state => getActiveMapBranch(state)?.mapguide?.expandedGroups);
}

export function useActiveMapSelectableLayers() {
    return useSelector<IApplicationState, any>(state => getActiveMapBranch(state)?.mapguide?.selectableLayers);
}

export function useActiveMapShowGroups() {
    return useSelector<IApplicationState, string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.showGroups);
}

export function useActiveMapShowLayers() {
    return useSelector<IApplicationState, string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.showLayers);
}

export function useActiveMapHideGroups() {
    return useSelector<IApplicationState, string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.hideGroups);
}

export function useActiveMapHideLayers() {
    return useSelector<IApplicationState, string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.hideLayers);
}

export function useActiveMapLayerTransparency() {
    return useSelector<IApplicationState, LayerTransparencySet | undefined>(state => getActiveMapBranch(state)?.mapguide?.layerTransparency);
}

export function useActiveMapActiveSelectedFeature() {
    return useSelector<IApplicationState, ActiveSelectedFeature | undefined>(state => getActiveMapBranch(state)?.mapguide?.activeSelectedFeature);
}

export function useActiveMapSelectableLayerNames() {
    const map = useActiveMapState();
    const selectableLayers = useActiveMapSelectableLayers();
    if (map) {
        const selectableLayerNames = (map.Layer ?? [])
            .filter(layer => layer.Selectable && selectableLayers[layer.ObjectId] !== false)
            .map(layer => layer.Name);
        return selectableLayerNames;
    }
    return [];
}

export function useActiveMapSessionId() {
    return useSelector<IApplicationState, string | undefined>(state => getRuntimeMap(state)?.SessionId);
}

export function useActiveMapFiniteScales() {
    return useSelector<IApplicationState, number[] | undefined>(state => {
        const map = getRuntimeMap(state);
        return map != null ? map.FiniteDisplayScale : undefined;
    });
}

export function useActiveMapState() {
    return useSelector<IApplicationState, RuntimeMap | undefined>(state => getRuntimeMap(state));
}
