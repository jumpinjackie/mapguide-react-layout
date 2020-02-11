import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import { MapDebugContext, MapGuideMockMode } from '../components/map-viewer-context';
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
import AddManageLayersContainer from '../containers/add-manage-layers';
import { Button, ButtonGroup, Card, Elevation, Intent } from '@blueprintjs/core';
import { useReducedToolbarAppState, useActiveMapName, useActiveMapState } from '../containers/hooks';
import { CommandConditions } from '../api/registry/command';
import * as MapActions from '../actions/map';
import { useDispatch } from 'react-redux';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { deArrayify } from '../api/builders/deArrayify';
import MouseCoordinatesContainer from '../containers/mouse-coordinates';
import ViewSizeContainer from '../containers/view-size';
import ViewerOptions from '../containers/viewer-options';
//import MeasureContainer from '../containers/measure';

const testSelSheboygan: QueryMapFeaturesResponse = deArrayify(require("./data/test-selection-response-sheboygan.json"));

interface MapDependentContainer {
    mgMockMode: MapGuideMockMode;
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

const MapStoryFrame = (props: MapDependentContainer) => {
    const SB_WIDTH = 350;
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
    const doClearSelection = () => {
        if (activeMapName) {
            const q = MapActions.setSelection(activeMapName, {});
            dispatch(q);
        }
    }
    return <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SB_WIDTH, overflowY: "auto" }}>
            {props.children}
        </div>
        <div style={{ position: "absolute", left: SB_WIDTH, top: 0, bottom: 0, right: 0 }}>
            <MapDebugContext.Provider value={{ mock: props.mgMockMode }}>
                <MapViewerContainer />
                <ButtonGroup style={{ position: "absolute", right: 15, top: 15 }}>
                    <Button intent={Intent.PRIMARY} onClick={() => doTestSelect()}>Test Select</Button>
                    <Button intent={Intent.DANGER} onClick={() => doClearSelection()} disabled={!CommandConditions.hasSelection(state)}>Clear Selection</Button>
                </ButtonGroup>
            </MapDebugContext.Provider>
        </div>
    </div>;
}

storiesOf("Map and Map Interaction Components", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <FakeApp>
        <MapStoryFrame mgMockMode={MapGuideMockMode.DoNotRender}>
            {storyFn()}
        </MapStoryFrame>
    </FakeApp>)
    .add("Map Viewer", () => <Card>
        <h5 className="bp3-heading"><a href="#">Map Viewer</a></h5>
        <p>This story (and all sibling stories) showcases the map viewer component and other components that depend or interact with map viewer state</p>
        <p>For MapGuide-specific stories, the MapGuide layer has been mocked out with a placeholder that shows the mapagent request that would be made</p>
        <p>Some components require selections to be made. Some fake select tools are included to trigger such selection actions</p>
    </Card>)
    .add("Task Pane", () => <TaskPaneContainer />)
    .add("Mouse Coordinates", () => <>
        <Card>
            <h5 className="bp3-heading"><a href="#">Mouse Coordinates</a></h5>
            <p>Move the mouse around the map and its geographic coordinates should be shown below</p>
        </Card>
        <MouseCoordinatesContainer />
    </>)
    .add("View Size", () => <>
        <Card>
            <h5 className="bp3-heading"><a href="#">View Size</a></h5>
            <p>Zoom in or out of the map. The physical map size should be shown below</p>
        </Card>
        <ViewSizeContainer />
    </>)
    .add("Scale Display", () => <>
        <Card>
            <h5 className="bp3-heading"><a href="#">Scale Display</a></h5>
            <p>Zoom in or out of the map. The map scale should be shown below</p>
        </Card>
        <ScaleDisplayContainer />
    </>)
    .add("Navigator", () => <NavigatorContainer />)
    .add("Map Menu", () => <MapMenuContainer />)
    .add("Base Layer Switcher", () => <BaseLayerSwitcherContainer />)
    .add("Viewer Options", () => <ViewerOptions />)
    //.add("Measure", () => <MeasureContainer />)
    .add("Coordinate Tracker", () => <CoordinateTrackerContainer projections={["EPSG:4326", "EPSG:3857"]} />)
    .add("External Layer Manager", () => <AddManageLayersContainer />);

storiesOf("Map and Map Interaction Components / MapGuide-specific", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <FakeApp>
        <MapStoryFrame mgMockMode={MapGuideMockMode.RenderPlaceholder}>
            {storyFn()}
        </MapStoryFrame>
    </FakeApp>)
    .add("Legend", () => <LegendContainer />)
    .add("Legend - with base layer switcher", () => <LegendContainer inlineBaseLayerSwitcher={true} />)
    .add("Selected Feature Count", () => <>
        <Card>
            <h5 className="bp3-heading"><a href="#">Selected Feature Count</a></h5>
            <p>Click the test select button to simulate a map selection request. The selection count should display below</p>
        </Card>
        <SelectedFeatureCountContainer />
    </>)
    .add("Selection Panel", () => <SelectionPanelContainer />)