import * as React from "react";
import { useSelector } from "react-redux";
import {
    Coordinate,
    IApplicationState
} from "../api/common";
import { tr } from "../api/i18n";
import olProj from "ol/proj";
import { Callout, Intent } from '@blueprintjs/core';

export interface ICoordinateTrackerContainerProps {
    projections: string[];
}

interface CTState {
    mouse: Coordinate | undefined;
    locale: string;
    proj: string;
}

const CoordinateTrackerContainer = (props: ICoordinateTrackerContainerProps) => {
    const { projections } = props;
    const { locale, mouse, proj } = useSelector<IApplicationState, CTState>(state => {
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
        } as CTState;
    })
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
        return <Callout intent={Intent.DANGER} title={tr("ERROR", locale)} icon="error">
            {tr("COORDTRACKER_NO_PROJECTIONS", locale)}
        </Callout>;
    }
}

export default CoordinateTrackerContainer;