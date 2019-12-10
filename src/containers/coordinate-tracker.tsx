import * as React from "react";
import { tr } from "../api/i18n";
import * as olProj from "ol/proj";
import { Callout, Intent } from '@blueprintjs/core';
import { useViewerLocale, useCurrentMouseCoordinates, useActiveMapProjection } from './hooks';

export interface ICoordinateTrackerContainerProps {
    projections: string[];
}


const CoordinateTrackerContainer = (props: ICoordinateTrackerContainerProps) => {
    const { projections } = props;
    const locale = useViewerLocale();
    const mouse = useCurrentMouseCoordinates();
    const proj = useActiveMapProjection();
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