import * as React from "react";
import { useSelector } from "react-redux";
import { IApplicationState, UnitOfMeasure, IMapView } from "../api/common";
import { ViewSize } from "../components/view-size";

export interface IViewSizeContainerProps {

}

const ViewSizeContainer = () => {
    const width = useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[0]);
    const height = useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[1]);
    const sizeUnits = useSelector<IApplicationState, UnitOfMeasure>(state => state.config.viewSizeUnits);
    const metersPerUnit = useSelector<IApplicationState, number | undefined>(state => {
        let mpu = 1.0;
        if (state.config.activeMapName) {
            const ms = state.mapState[state.config.activeMapName];
            if (ms.runtimeMap) {
                mpu = ms.runtimeMap.CoordinateSystem.MetersPerUnit;
            }
        }
        return mpu;
    });
    const view = useSelector<IApplicationState, IMapView | undefined>(state => {
        let view: IMapView | undefined;
        if (state.config.activeMapName) {
            const ms = state.mapState[state.config.activeMapName];
            view = ms.currentView;
        }
        return view;
    });
    const locale = useSelector<IApplicationState, string>(state => state.config.locale);
    if (width && height && metersPerUnit && view) {
        return <ViewSize locale={locale} width={width} height={height} view={view} metersPerUnit={metersPerUnit} units={sizeUnits || UnitOfMeasure.Unknown} />;
    } else {
        return <noscript />;
    }
};

export default ViewSizeContainer;