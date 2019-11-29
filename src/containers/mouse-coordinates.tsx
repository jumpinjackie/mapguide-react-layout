import * as React from "react";
import { useSelector } from "react-redux";
import {
    Coordinate,
    IApplicationState,
    ICoordinateConfiguration,
    UnitOfMeasure
} from "../api/common";
import { MouseCoordinates } from "../components/mouse-coordinates";
import olProj from "ol/proj";
import { getUnitOfMeasure } from "../utils/units";

export interface IMouseCoordinatesContainerProps {
    style: React.CSSProperties;
}

const MouseCoordinatesContainer = (props: IMouseCoordinatesContainerProps) => {
    const { style } = props;
    const mapProjection = useSelector<IApplicationState, string | undefined>(state => {
        let mp;
        if (state.config.activeMapName) {
            const map = state.mapState[state.config.activeMapName].runtimeMap;
            if (map) {
                mp = `EPSG:${map.CoordinateSystem.EpsgCode}`;
            }
        }
        return mp;
    });
    const config = useSelector<IApplicationState, ICoordinateConfiguration>(state => state.config.coordinates);
    const mouse = useSelector<IApplicationState, Coordinate | undefined>(state => state.mouse.coords);
    const locale = useSelector<IApplicationState, string>(state => state.config.locale);
    if (config && mouse) {
        const prj = olProj.get(config.projection || mapProjection);
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
        if (config.projection && mapProjection) {
            try {
                coords = olProj.transform(coords, mapProjection, config.projection);
            } catch (e) {

            }
        }
        return <MouseCoordinates units={units} coords={coords} style={style} decimals={config.decimals} format={config.format} />;
    } else {
        return <div />;
    }
};

export default MouseCoordinatesContainer;