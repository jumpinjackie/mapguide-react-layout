import { ActiveSelectedFeature, LayerTransparencySet, getRuntimeMap } from '../api/common';
import { getActiveMapBranch } from './hooks';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { useAppState } from '../components/map-providers/context';
import { tryParseArbitraryCs } from '../utils/units';

/**
 * @since 0.14.3
 */
export function useActiveMapIsArbitraryCoordSys() {
    return useAppState<boolean>(state => {
        let arbCs=  false;
        if (state.config.activeMapName) {
            const ms = state.mapState[state.config.activeMapName];
            if (ms.mapguide?.runtimeMap) {
                arbCs = tryParseArbitraryCs(ms.mapguide.runtimeMap.CoordinateSystem.MentorCode) != null
            }
        }
        return arbCs;
    });
}

export function useActiveMapMetersPerUnit() {
    return useAppState<number | undefined>(state => {
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
    return useAppState<string | undefined>(state => {
        let proj;
        if (state.config.activeMapName) {
            const map = state.mapState[state.config.activeMapName].mapguide?.runtimeMap;
            const subject = state.mapState[state.config.activeMapName].generic?.subject;
            if (map) {
                proj = `EPSG:${map.CoordinateSystem.EpsgCode}`;
            } else if (subject) {
                proj = subject.meta?.projection;
            }
        }
        return proj;
    });
}

export function useActiveMapExpandedGroups() {
    return useAppState<string[]>(state => getActiveMapBranch(state)?.mapguide?.expandedGroups);
}

export function useActiveMapSelectableLayers() {
    return useAppState<any>(state => getActiveMapBranch(state)?.mapguide?.selectableLayers);
}

export function useActiveMapShowGroups() {
    return useAppState<string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.showGroups);
}

export function useActiveMapShowLayers() {
    return useAppState<string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.showLayers);
}

export function useActiveMapHideGroups() {
    return useAppState<string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.hideGroups);
}

export function useActiveMapHideLayers() {
    return useAppState<string[] | undefined>(state => getActiveMapBranch(state)?.mapguide?.hideLayers);
}

export function useActiveMapLayerTransparency() {
    return useAppState<LayerTransparencySet | undefined>(state => getActiveMapBranch(state)?.mapguide?.layerTransparency);
}

export function useActiveMapActiveSelectedFeature() {
    return useAppState<ActiveSelectedFeature | undefined>(state => getActiveMapBranch(state)?.mapguide?.activeSelectedFeature);
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
    return useAppState<string | undefined>(state => getRuntimeMap(state)?.SessionId);
}

export function useActiveMapFiniteScales() {
    return useAppState<number[] | undefined>(state => {
        const map = getRuntimeMap(state);
        return map != null ? map.FiniteDisplayScale : undefined;
    });
}

export function useActiveMapState() {
    return useAppState<RuntimeMap | undefined>(state => getRuntimeMap(state));
}
