import * as React from "react";
import {
    Coordinate,
    UnitOfMeasure
} from "../api/common";
import { MouseCoordinates } from "../components/mouse-coordinates";
import olProj from "ol/proj";
import { getUnitOfMeasure } from "../utils/units";
import { useViewerLocale, useCurrentMouseCoordinates, useActiveMapProjection, useConfiguredCoordinateProjection, useConfiguredCoordinateDecimals, useConfiguredCoordinateFormat } from './hooks';

export interface IMouseCoordinatesContainerProps {
    style: React.CSSProperties;
}

const MouseCoordinatesContainer = (props: IMouseCoordinatesContainerProps) => {
    const { style } = props;
    const mapProjection = useActiveMapProjection();
    const projection = useConfiguredCoordinateProjection();
    const decimals = useConfiguredCoordinateDecimals();
    const format = useConfiguredCoordinateFormat();
    const mouse = useCurrentMouseCoordinates();
    const locale = useViewerLocale();
    if (mouse) {
        const prj = olProj.get(projection || mapProjection);
        let units;
        if (prj) {
            units = prj.getUnits();
            switch (units) {
                case "degrees":
                    units = getUnitOfMeasure(UnitOfMeasure.Degrees).abbreviation(locale);
                    break;
                case "pixels":
                case "tile-pixels":
                    units = getUnitOfMeasure(UnitOfMeasure.Pixels).abbreviation(locale);
                    break;
                case "m":
                    units = getUnitOfMeasure(UnitOfMeasure.Meters).abbreviation(locale);
                    break;
                case "ft":
                case "us-ft":
                    units = getUnitOfMeasure(UnitOfMeasure.Feet).abbreviation(locale);
                    break;
            }
        }
        let coords: Coordinate = [mouse[0], mouse[1]];
        if (projection && mapProjection) {
            try {
                coords = olProj.transform(coords, mapProjection, projection);
            } catch (e) {

            }
        }
        return <MouseCoordinates units={units} coords={coords} style={style} decimals={decimals} format={format} />;
    } else {
        return <div />;
    }
};

export default MouseCoordinatesContainer;