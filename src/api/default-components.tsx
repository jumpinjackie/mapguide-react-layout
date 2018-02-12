import * as React from "react";

import LegendContainer from "../containers/legend";
import MapViewerContainer from "../containers/map-viewer";
import MouseCoordinatesContainer from "../containers/mouse-coordinates";
import NavigatorContainer from "../containers/navigator";
import ScaleDisplayContainer from "../containers/scale-display";
import SelectedFeatureCountContainer from "../containers/selected-feature-count";
import SelectionPanelContainer from "../containers/selection-panel";
import TaskPaneContainer from "../containers/task-pane";
import { PoweredByMapGuide } from "../components/pbmg";
import { About } from "../components/about";
import { SessionExpired } from "../components/session-expired";
import MeasureContainer from "../containers/measure";
import ViewerOptions from "../containers/viewer-options";
import QuickPlotContainer from "../containers/quick-plot";
import BaseLayerSwitcherContainer from "../containers/base-layer-switcher";
import MapMenuContainer from "../containers/map-menu";
import CoordinateTrackerContainer from "../containers/coordinate-tracker";
import AddManageLayersContainer from "../containers/add-manage-layers";

import { registerComponentFactory, DefaultComponentNames } from "../api/registry/component";
import ViewSizeContainer from "../containers/view-size";

/**
 * Registers the default set of components
 *
 * @export
 */
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
    registerComponentFactory(DefaultComponentNames.SessionExpired, (props) => <SessionExpired {...props} />);
    registerComponentFactory(DefaultComponentNames.Measure, (props) => <MeasureContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ViewerOptions, (props) => <ViewerOptions {...props} />);
    registerComponentFactory(DefaultComponentNames.QuickPlot, (props) => <QuickPlotContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.BaseMapSwitcher, (props) => <BaseLayerSwitcherContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.MapMenu, (props) => <MapMenuContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ViewSize, (props) => <ViewSizeContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.CoordinateTracker, (props) => <CoordinateTrackerContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.AddManageLayers, (props) => <AddManageLayersContainer {...props} />);
}