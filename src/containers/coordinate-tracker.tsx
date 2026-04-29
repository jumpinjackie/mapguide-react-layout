import * as React from "react";
import { tr } from "../api/i18n";
import * as olProj from "ol/proj";
import { useViewerLocale, useCurrentMouseCoordinates } from './hooks';
import { useActiveMapProjection } from './hooks-mapguide';
import { useElementContext } from "../components/elements/element-context";

export interface ICoordinateTrackerContainerProps {
    projections: string | string[];
}


export const CoordinateTrackerContainer = (props: ICoordinateTrackerContainerProps) => {
    const { Callout, Card, Heading } = useElementContext();
    const { projections } = props;
    const aProjections = Array.isArray(projections) ? projections : [projections];
    const locale = useViewerLocale();
    const mouse = useCurrentMouseCoordinates();
    const proj = useActiveMapProjection();
    if (aProjections && aProjections.length) {
        return <div style={{ margin: 8 }}>
            <Heading level={4}>{tr("COORDTRACKER", locale)}</Heading>
            {aProjections.map(p => {
                let x = NaN;
                let y = NaN;
                if (mouse && proj) {
                    try {
                        [x, y] = olProj.transform(mouse, proj, p);
                    } catch (e) {

                    }
                }
                return <Card key={p} style={{ marginBottom: 10 }}>
                    <Heading level={5}><a href="#">{p}</a></Heading>
                    <p><strong>{tr("COORDTRACKER_X", locale)}</strong> {x}</p>
                    <p><strong>{tr("COORDTRACKER_Y", locale)}</strong> {y}</p>
                </Card>;
            })}
        </div>;
    } else {
        return <Callout variant="danger" title={tr("ERROR", locale)} icon="error">
            {tr("COORDTRACKER_NO_PROJECTIONS", locale)}
        </Callout>;
    }
}