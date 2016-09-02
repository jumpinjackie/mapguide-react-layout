import * as React from "react";

import { LegendContainer } from "../containers/legend";
import { MapViewerContainer } from "../containers/map-viewer";
import { MouseCoordinatesContainer } from "../containers/mouse-coordinates";
import { NavigatorContainer } from "../containers/navigator";
import { ScaleDisplayContainer } from "../containers/scale-display";
import { SelectedFeatureCountContainer } from "../containers/selected-feature-count";
import { SelectionPanelContainer } from "../containers/selection-panel";
import { TaskPaneContainer } from "../containers/task-pane";
import { PoweredByMapGuide } from "../components/pbmg";
import { About } from "../components/about";

import { registerComponentFactory, DefaultComponentNames } from "../api/registry/component";

export function registerDefaultComponents(): void {
    registerComponentFactory(DefaultComponentNames.Map, (props) => <MapViewerContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.Legend, (props) => <LegendContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.SelectionPanel, (props) => <SelectionPanelContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.Navigator, (props) => <NavigatorContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.MouseCoordinates, (props) => <MouseCoordinatesContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ScaleDisplay, (props) => <ScaleDisplayContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.SelectedFeatureCount, (props) => <SelectedFeatureCountContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.PoweredByMapGuide, (props) => <PoweredByMapGuide {...props} />);
    registerComponentFactory(DefaultComponentNames.TaskPane, (props) => <TaskPaneContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.About, (props) => <About {...props} />);
}