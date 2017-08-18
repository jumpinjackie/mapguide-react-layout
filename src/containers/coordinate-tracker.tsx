import * as React from "react";
import { connect } from "react-redux";
import {
    Coordinate,
    ReduxDispatch,
    IApplicationState,
    ICoordinateConfiguration
} from "../api/common";
import { tr } from "../api/i18n";
import olProj from "ol/proj";

export interface ICoordinateTrackerContainerProps {
    projections: string[];
}

export interface ICoordinateTrackerContainerState { 
    mouse: Coordinate | undefined;
    locale: string;
    proj: string;
}

export interface ICoordinateTrackerContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ICoordinateTrackerContainerState> {
    let proj;
    if (state.config.activeMapName) {
        const map = state.mapState[state.config.activeMapName].runtimeMap;
        if (map) {
            proj = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }
    }
    return {
        mouse: state.mouse.coords,
        locale: state.config.locale,
        proj: proj
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ICoordinateTrackerContainerDispatch> {
    return { };
}

export type CoordinateTrackerContainerProps = ICoordinateTrackerContainerProps & Partial<ICoordinateTrackerContainerState> & Partial<ICoordinateTrackerContainerDispatch>;

class CoordinateTrackerContainer extends React.Component<CoordinateTrackerContainerProps, any> {
    constructor(props: CoordinateTrackerContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { locale, projections, mouse, proj } = this.props;
        if (projections && projections.length) {
            return <div style={{ margin: 8 }}>
                <h5>{tr("COORDTRACKER", locale)}</h5>
                {projections.map(p => {
                    let x = NaN;
                    let y = NaN;
                    if (mouse && proj) {
                        try {
                            [x, y] = olProj.transform(mouse, proj, p);
                        } catch (e) {

                        }
                    }
                    return <fieldset key={p}>
                        <legend>{p}</legend>
                        <p><strong>X:</strong> {x}</p>
                        <p><strong>Y:</strong> {y}</p>
                    </fieldset>;
                })}
            </div>;
        } else {
            return <div>
                <div className="pt-callout pt-intent-danger">
                    <h5>{tr("ERROR", locale)}</h5>
                    {tr("COORDTRACKER_NO_PROJECTIONS", locale)}
                </div>
            </div>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoordinateTrackerContainer);