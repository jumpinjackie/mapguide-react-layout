import * as React from "react";
import { connect } from "react-redux";
import {
    Coordinate,
    ReduxDispatch,
    IApplicationState,
    ICoordinateConfiguration
} from "../api/common";
import { MouseCoordinates } from "../components/mouse-coordinates";
import olProj from "ol/proj";
import { getUnitOfMeasure } from "../utils/units";
import { UnitOfMeasure } from "../index";

export interface IMouseCoordinatesContainerProps {
    style: React.CSSProperties;
}

export interface IMouseCoordinatesContainerState {
    config: ICoordinateConfiguration;
    mapProjection: string;
    mouse: Coordinate | undefined;
}

export interface IMouseCoordinatesDispatch { }

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IMouseCoordinatesContainerProps): Partial<IMouseCoordinatesContainerState> {
    let mapProjection;
    if (state.config.activeMapName) {
        const map = state.mapState[state.config.activeMapName].runtimeMap;
        if (map) {
            mapProjection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }
    }
    return {
        config: state.config.coordinates,
        mouse: state.mouse.coords,
        mapProjection: mapProjection
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IMouseCoordinatesDispatch> {
    return {

    };
}

export type MouseCoordinatesContainerProps = IMouseCoordinatesContainerProps & Partial<IMouseCoordinatesContainerState> & Partial<IMouseCoordinatesDispatch>;

export class MouseCoordinatesContainer extends React.Component<MouseCoordinatesContainerProps, any> {
    constructor(props: MouseCoordinatesContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { config, style, mouse, mapProjection } = this.props;
        if (config && mouse) {
            const prj = olProj.get(config.projection || mapProjection);
            let units;
            if (prj) {
                units = prj.getUnits();
                switch (units) {
                    case "degrees":
                        units = getUnitOfMeasure(UnitOfMeasure.Degrees).abbreviation();
                        break;
                    case "pixels":
                    case "tile-pixels":
                        units = getUnitOfMeasure(UnitOfMeasure.Pixels).abbreviation();
                        break;
                    case "us-ft":
                        units = getUnitOfMeasure(UnitOfMeasure.Feet).abbreviation();
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(MouseCoordinatesContainer);