import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { FakeApp } from "./fake-app";
import { TaskPaneContainer } from "../containers/task-pane";
import { ScaleDisplayContainer } from "../containers/scale-display";
import { NavigatorContainer } from "../containers/navigator";
import { MapMenuContainer } from "../containers/map-menu";
import { BaseLayerSwitcherContainer } from "../containers/base-layer-switcher";
import { CoordinateTrackerContainer } from "../containers/coordinate-tracker";
import { AddManageLayersContainer } from "../containers/add-manage-layers";
import { Card } from "@blueprintjs/core";
import {
  deArrayify,
  isQueryMapFeaturesResponse,
} from "../api/builders/deArrayify";
import { MouseCoordinatesContainer } from "../containers/mouse-coordinates";
import { ViewSizeContainer } from "../containers/view-size";
import { ViewerOptions } from "../containers/viewer-options";
import { MapGuideMockMode } from "../components/mapguide-debug-context";
import { MapStoryFrame } from "./map-story-frame";

//import MeasureContainer from '../containers/measure';

const testSelSheboygan = deArrayify(
  require("./data/test-selection-response-sheboygan.json"),
);

export interface MapDependentContainer {
  includeSelect?: boolean;
  children: React.ReactNode;
}

export function getQueryMapFeaturesResponse(activeMapName: string) {
  switch (activeMapName) {
    case "Sheboygan":
      if (isQueryMapFeaturesResponse(testSelSheboygan)) return testSelSheboygan;
  }
  return {};
}

export default {
  title: "Map and Map Interaction Components",

  decorators: [
    withKnobs,
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
      <FakeApp mgMockMode={MapGuideMockMode.DoNotRender}>
        <MapStoryFrame>{storyFn()}</MapStoryFrame>
      </FakeApp>
    ),
  ],

  excludeStories: ["MapDependentContainer", "getQueryMapFeaturesResponse"],
};

export const MapViewer = () => (
  <Card>
    <h5 className="bp3-heading">
      <a href="#">Map Viewer</a>
    </h5>
    <p>
      This story (and all sibling stories) showcases the map viewer component
      and other components that depend or interact with map viewer state
    </p>
    <p>
      For MapGuide-specific stories, the MapGuide layer has been mocked out with
      a placeholder that shows the mapagent request that would be made
    </p>
    <p>
      Some components require selections to be made. Some fake select tools are
      included to trigger such selection actions
    </p>
  </Card>
);

export const TaskPane = () => <TaskPaneContainer />;

export const MouseCoordinates = () => (
  <>
    <Card>
      <h5 className="bp3-heading">
        <a href="#">Mouse Coordinates</a>
      </h5>
      <p>
        Move the mouse around the map and its geographic coordinates should be
        shown below
      </p>
    </Card>
    <MouseCoordinatesContainer />
  </>
);

export const ViewSize = () => (
  <>
    <Card>
      <h5 className="bp3-heading">
        <a href="#">View Size</a>
      </h5>
      <p>
        Zoom in or out of the map. The physical map size should be shown below
      </p>
    </Card>
    <ViewSizeContainer />
  </>
);

export const ScaleDisplay = () => (
  <>
    <Card>
      <h5 className="bp3-heading">
        <a href="#">Scale Display</a>
      </h5>
      <p>Zoom in or out of the map. The map scale should be shown below</p>
    </Card>
    <ScaleDisplayContainer />
  </>
);

export const Navigator = () => <NavigatorContainer />;
export const MapMenu = () => <MapMenuContainer />;
export const BaseLayerSwitcher = () => <BaseLayerSwitcherContainer />;
export const _ViewerOptions = () => <ViewerOptions />;
export const CoordinateTracker = () => (
  <CoordinateTrackerContainer projections={["EPSG:4326", "EPSG:3857"]} />
);
export const ExternalLayerManager = () => <AddManageLayersContainer />;
