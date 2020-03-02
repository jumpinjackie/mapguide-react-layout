import * as React from "react";
import { tr } from "../api/i18n";
import * as olProj from "ol/proj";
import { Callout, Intent, Card } from '@blueprintjs/core';
import { useViewerLocale, useCurrentMouseCoordinates } from './hooks';
import { useActiveMapProjection } from './hooks-mapguide';

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
            <h4 className="bp3-heading">{tr("COORDTRACKER", locale)}</h4>
            {projections.map(p => {
                let x = NaN;
                let y = NaN;
                if (mouse && proj) {
                    try {
                        [x, y] = olProj.transform(mouse, proj, p);
                    } catch (e) {

                    }
                }
                return <Card style={{ marginBottom: 10 }}>
                    <h5 className="bp3-heading"><a href="#">{p}</a></h5>
                    <p><strong>X:</strong> {x}</p>
                    <p><strong>Y:</strong> {y}</p>
                </Card>;
            })}
        </div>;
    } else {
        return <Callout intent={Intent.DANGER} title={tr("ERROR", locale)} icon="error">
            {tr("COORDTRACKER_NO_PROJECTIONS", locale)}
        </Callout>;
    }
}

export default CoordinateTrackerContainer;