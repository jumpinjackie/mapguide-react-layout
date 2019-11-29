import { IApplicationState, IMapView, UnitOfMeasure, getRuntimeMap, getCurrentView } from '../api/common';
import { useSelector } from 'react-redux';

export function useActiveMapName() {
    return useSelector<IApplicationState, string | undefined>(state => state.config.activeMapName);
}

export function useViewerLocale() {
    return useSelector<IApplicationState, string>(state => state.config.locale);
}

export function useActiveMapView() {
    return useSelector<IApplicationState, IMapView | undefined>(state => {
        return getCurrentView(state);
    });
}

export function useActiveMapWidth() {
    return useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[0]);
}

export function useActiveMapHeight() {
    return useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[1]);
}

export function useViewerSizeUnits() {
    return useSelector<IApplicationState, UnitOfMeasure>(state => state.config.viewSizeUnits);
}

export function useActiveMapMetersPerUnit() {
    return useSelector<IApplicationState, number | undefined>(state => {
        let mpu = 1.0;
        if (state.config.activeMapName) {
            const ms = state.mapState[state.config.activeMapName];
            if (ms.runtimeMap) {
                mpu = ms.runtimeMap.CoordinateSystem.MetersPerUnit;
            }
        }
        return mpu;
    });
}

export function useActiveMapFiniteScales() {
    return useSelector<IApplicationState, number[] | undefined>(state => {
        const map = getRuntimeMap(state);
        return map != null ? map.FiniteDisplayScale : undefined;
    });
}