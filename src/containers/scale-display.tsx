import * as React from "react";
import { useDispatch } from "react-redux";
import { ScaleDisplay } from "../components/scale-display";
import { useActiveMapView, useActiveMapName, useViewerLocale } from './hooks';
import { setScale } from '../actions/map';
import { useActiveMapFiniteScales } from './hooks-mapguide';

export interface IScaleDisplayContainerProps {
    style?: React.CSSProperties;
}

export const ScaleDisplayContainer = (props: IScaleDisplayContainerProps) => {
    const { style } = props;
    const dispatch = useDispatch();
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const view = useActiveMapView();
    const finiteScales = useActiveMapFiniteScales();
    const setScaleAction = (mapName: string, scale: number) => dispatch(setScale(mapName, scale))
    const onScaleChanged = (scale: number) => {
        if (activeMapName) {
            setScaleAction(activeMapName, scale);
        }
    };
    if (view) {
        return <ScaleDisplay onScaleChanged={onScaleChanged}
            view={view}
            style={style}
            finiteScales={finiteScales}
            locale={locale} />;
    } else {
        return <noscript />;
    }
};