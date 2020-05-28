import * as React from "react";
import { tr } from "../api/i18n";
import * as olProj from "ol/proj";
import { useViewerLocale, useCurrentMouseCoordinates } from './hooks';
import { useActiveMapProjection } from './hooks-mapguide';
import Panel, { PanelTitle, PanelText } from 'calcite-react/Panel';
import styled from 'styled-components';
import Alert, { AlertTitle, AlertMessage } from 'calcite-react/Alert';

export interface ICoordinateTrackerContainerProps {
    projections: string[];
}

const CoordinateTrackerPanel = styled(Panel)`
    margin-bottom: 10px;
`;

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
                return <CoordinateTrackerPanel>
                    <PanelTitle>{p}</PanelTitle>
                    <PanelText>
                        <p><strong>X:</strong> {x}</p>
                        <p><strong>Y:</strong> {y}</p>
                    </PanelText>
                </CoordinateTrackerPanel>;
            })}
        </div>;
    } else {
        return <Alert red showIcon>
            <AlertTitle>{tr("ERROR", locale)}</AlertTitle>
            <AlertMessage>{tr("COORDTRACKER_NO_PROJECTIONS", locale)}</AlertMessage>
        </Alert>;
    }
}

export default CoordinateTrackerContainer;