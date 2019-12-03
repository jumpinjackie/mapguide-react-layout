import * as React from "react";
import { UnitOfMeasure } from "../api/common";
import { ViewSize } from "../components/view-size";
import { useActiveMapWidth, useActiveMapHeight, useViewerSizeUnits, useActiveMapMetersPerUnit, useActiveMapView, useViewerLocale } from './hooks';

export interface IViewSizeContainerProps { }

const ViewSizeContainer = () => {
    const width = useActiveMapWidth();
    const height = useActiveMapHeight();
    const sizeUnits = useViewerSizeUnits();
    const metersPerUnit = useActiveMapMetersPerUnit();
    const view = useActiveMapView();
    const locale = useViewerLocale();
    if (width && height && metersPerUnit && view) {
        return <ViewSize locale={locale} width={width} height={height} view={view} metersPerUnit={metersPerUnit} units={sizeUnits || UnitOfMeasure.Unknown} />;
    } else {
        return <noscript />;
    }
};

export default ViewSizeContainer;