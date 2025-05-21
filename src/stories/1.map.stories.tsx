import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import { TaskPaneContainer } from '../containers/task-pane';
import { ScaleDisplayContainer } from '../containers/scale-display';
import { NavigatorContainer } from '../containers/navigator';
import { MapMenuContainer } from '../containers/map-menu';
import { BaseLayerSwitcherContainer } from '../containers/base-layer-switcher';
import { CoordinateTrackerContainer } from '../containers/coordinate-tracker';
import { AddManageLayersContainer } from '../containers/add-manage-layers';
import { Card } from '@blueprintjs/core';
import { deArrayify, isQueryMapFeaturesResponse } from '../api/builders/deArrayify';
import { MouseCoordinatesContainer } from '../containers/mouse-coordinates';
import { ViewSizeContainer } from '../containers/view-size';
import { ViewerOptions } from '../containers/viewer-options';
import { MapGuideMockMode } from '../components/mapguide-debug-context';
import { MapStoryFrame } from "./map-story-frame";

//import MeasureContainer from '../containers/measure';

const testSelSheboygan = deArrayify(require("./data/test-selection-response-sheboygan.json"));

export interface MapDependentContainer {
    
    includeSelect?: boolean;
    children: React.ReactNode;
}

export function getQueryMapFeaturesResponse(activeMapName: string) {
    switch (activeMapName) {
        case "Sheboygan":
            if (isQueryMapFeaturesResponse(testSelSheboygan))
                return testSelSheboygan;
    }
    return {};
}

storiesOf("Map and Map Interaction Components", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <FakeApp mgMockMode={MapGuideMockMode.DoNotRender}>
        <MapStoryFrame>
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