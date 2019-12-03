import * as React from "react";
import { useDispatch } from "react-redux";
import * as MapActions from "../actions/map";
import { ScaleDisplay } from "../components/scale-display";
import { useActiveMapView, useActiveMapName, useActiveMapFiniteScales, useViewerLocale } from './hooks';

export interface IScaleDisplayContainerProps {
    style?: React.CSSProperties;
}

const ScaleDisplayContainer = (props: IScaleDisplayContainerProps) => {
    const { style } = props;
    const dispatch = useDispatch();
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const view = useActiveMapView();
    const finiteScales = useActiveMapFiniteScales();
    const setScale = (mapName: string, scale: number) => dispatch(MapActions.setScale(mapName, scale))
    const onScaleChanged = (scale: number) => {
        if (activeMapName) {
            setScale(activeMapName, scale);
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

export default ScaleDisplayContainer;