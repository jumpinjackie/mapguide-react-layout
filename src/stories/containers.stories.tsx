import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import { MapDebugContext } from '../components/map-viewer-context';
import LegendContainer from '../containers/legend';
import MapViewerContainer from '../containers/map-viewer';
import TaskPaneContainer from '../containers/task-pane';
import ScaleDisplayContainer from '../containers/scale-display';
import SelectedFeatureCountContainer from '../containers/selected-feature-count';
import SelectionPanelContainer from '../containers/selection-panel';
import NavigatorContainer from '../containers/navigator';
import MapMenuContainer from '../containers/map-menu';
import BaseLayerSwitcherContainer from '../containers/base-layer-switcher';
import CoordinateTrackerContainer from '../containers/coordinate-tracker';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { useReducedToolbarAppState, useActiveMapName } from '../containers/hooks';
import { CommandConditions } from '../api/registry/command';
import * as MapActions from '../actions/map';
import { useDispatch } from 'react-redux';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { deArrayify } from '../api/builders/deArrayify';

const testSelSheboygan: QueryMapFeaturesResponse = deArrayify(require("./data/test-selection-response-sheboygan.json"));
//import MeasureContainer from '../containers/measure';

interface MapDependentContainer {
    includeSelect?: boolean;
    children: React.ReactNode;
}

function getQueryMapFeaturesResponse(activeMapName: string) {
    switch (activeMapName) {
        case "Sheboygan":
            return testSelSheboygan;
    }
    return {};
}

const MapDependentContainer = (props: MapDependentContainer) => {
    const includeTools = !!props.includeSelect;
    const dispatch = useDispatch();
    const state = useReducedToolbarAppState();
    const activeMapName = useActiveMapName();
    const doTestSelect = () => {
        if (activeMapName) {
            const q = MapActions.setSelection(activeMapName, getQueryMapFeaturesResponse(activeMapName));
            dispatch(q);
        }
    }
    const SB_WIDTH = 250;
    return <table>
        <colgroup>
            <col width={SB_WIDTH} />
            <col width="*" />
        </colgroup>
        <tbody>
            {includeTools && <tr>
                <td colSpan={2}>
                    <ButtonGroup>
                        {!!props.includeSelect && <>
                            <Button onClick={() => doTestSelect()}>Test Select</Button>
                            <Button disabled={!CommandConditions.hasSelection(state)}>Clear Selection</Button>
                        </>}
                    </ButtonGroup>
                </td>
            </tr>}
            <tr>
                <td valign="top">
                    <div style={{ position: "absolute", width: SB_WIDTH, height: "100%" }}>
                        {props.children}
                        {false && <div>
                            <p>Active Tool: {state.activeTool}</p>
                            <p>Busy Count: {state.busyWorkerCount}</p>
                            <p>Feature TT enabled: {state.featureTooltipsEnabled ? "true" : "false"}</p>
                            <p>Has Next View: {state.hasNextView ? "true" : "false"}</p>
                            <p>Has Prev View: {state.hasPreviousView ? "true" : "false"}</p>
                            <p>Has Selection: {state.hasSelection ? "true" : "false"}</p>
                        </div>}
                    </div>
                </td>
                <td valign="top">
                    <MapDebugContext.Provider value={{ mock: true }}>
                        <div style={{ width: 640, height: 480 }}>
                            <MapViewerContainer />
                        </div>
                    </MapDebugContext.Provider>
                </td>
            </tr>
        </tbody>
    </table>;
}

storiesOf("Container Components", module)
    .addDecorator(withKnobs)
    .add("Map Viewer", () => <FakeApp>
        <MapDebugContext.Provider value={{ mock: true }}>
            <div style={{ width: 640, height: 480 }}>
                <MapViewerContainer />
            </div>
        </MapDebugContext.Provider>
    </FakeApp>)
    .add("Legend", () => <FakeApp>
        <MapDependentContainer>
            <LegendContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Legend - with base layer switcher", () => <FakeApp>
        <MapDependentContainer>
            <LegendContainer inlineBaseLayerSwitcher={true} />
        </MapDependentContainer>
    </FakeApp>)
    .add("Task Pane", () => <FakeApp>
        <TaskPaneContainer />
    </FakeApp>)
    .add("Scale Display", () => <FakeApp>
        <MapDependentContainer>
            <ScaleDisplayContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Selected Feature Count", () => <FakeApp>
        <MapDependentContainer includeSelect={true}>
            <SelectedFeatureCountContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Selection Panel", () => <FakeApp>
        <MapDependentContainer includeSelect={true}>
            <SelectionPanelContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Navigator", () => <FakeApp>
        <MapDependentContainer>
            <NavigatorContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Map Menu", () => <FakeApp>
        <MapDependentContainer>
            <MapMenuContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Base Layer Switcher", () => <FakeApp>
        <MapDependentContainer>
            <BaseLayerSwitcherContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Coordinate Tracker", () => <FakeApp>
        <MapDependentContainer>
            <CoordinateTrackerContainer projections={["EPSG:4326", "EPSG:3857"]} />
        </MapDependentContainer>
    </FakeApp>);
    /*
.add("Measure", () => <FakeApp>
<MapDependentContainer>
    <MeasureContainer />
</MapDependentContainer>
</FakeApp>);
*/