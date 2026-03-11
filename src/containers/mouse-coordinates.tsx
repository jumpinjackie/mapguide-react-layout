import * as React from "react";
import {
    Coordinate2D,
    UnitOfMeasure
} from "../api/common";
import { MouseCoordinates } from "../components/mouse-coordinates";
import * as olProj from "ol/proj";
import { getUnitOfMeasure } from "../utils/units";
import { useViewerLocale, useCurrentMouseCoordinates, useConfiguredCoordinateProjection, useConfiguredCoordinateDecimals, useConfiguredCoordinateFormat } from './hooks';
import { useActiveMapProjection, useActiveMapCoordinateFormat } from './hooks-mapguide';

export interface IMouseCoordinatesContainerProps {
    style?: React.CSSProperties;
}

export const MouseCoordinatesContainer = (props: IMouseCoordinatesContainerProps) => {
    const { style } = props;
    const mapProjection = useActiveMapProjection();
    const projection = useConfiguredCoordinateProjection();
    const decimals = useConfiguredCoordinateDecimals();
    const format = useConfiguredCoordinateFormat();
    const mapCoordinateFormat = useActiveMapCoordinateFormat();
    const mouse = useCurrentMouseCoordinates();
    const locale = useViewerLocale();
    if (mouse) {
        const prj = olProj.get(projection ?? mapProjection);
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
        let coords: Coordinate2D = [mouse[0], mouse[1]];
        if (projection && mapProjection) {
            try {
                coords = olProj.transform(coords, mapProjection, projection) as Coordinate2D;
            } catch (e) {

            }
        }
        // Use the per-map coordinate format override when no global display projection is
        // configured (i.e., coordinates are shown in the map's native CRS). This ensures
        // that non-geographic maps (e.g. meters-based) show X/Y labels instead of Lon/Lat.
        const effectiveFormat = (!projection && mapCoordinateFormat) ? mapCoordinateFormat : format;
        return <MouseCoordinates units={units} coords={coords} style={style} decimals={decimals} format={effectiveFormat} />;
    } else {
        return <div />;
    }
};