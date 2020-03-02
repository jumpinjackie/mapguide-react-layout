import * as React from "react";

import MouseCoordinatesContainer from "../containers/mouse-coordinates";
import NavigatorContainer from "../containers/navigator";
import ScaleDisplayContainer from "../containers/scale-display";
import TaskPaneContainer from "../containers/task-pane";
import { About } from "../components/about";
import MeasureContainer from "../containers/measure";
import BaseLayerSwitcherContainer from "../containers/base-layer-switcher";
import MapMenuContainer from "../containers/map-menu";
import CoordinateTrackerContainer from "../containers/coordinate-tracker";
import AddManageLayersContainer from "../containers/add-manage-layers";
import { registerComponentFactory, DefaultComponentNames } from "../api/registry/component";
import ViewSizeContainer from "../containers/view-size";
import ShareLinkToViewContainer from '../containers/share-link-to-view';

/**
 * Registers the default set of components
 *
 * @export
 */
export function registerDefaultComponents(): void {
    registerComponentFactory(DefaultComponentNames.Navigator, (props) => <NavigatorContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.MouseCoordinates, (props) => <MouseCoordinatesContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ScaleDisplay, (props) => <ScaleDisplayContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.TaskPane, (props) => <TaskPaneContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.About, (props) => <About {...props} />);
    registerComponentFactory(DefaultComponentNames.Measure, (props) => <MeasureContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.BaseMapSwitcher, (props) => <BaseLayerSwitcherContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.MapMenu, (props) => <MapMenuContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ViewSize, (props) => <ViewSizeContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.CoordinateTracker, (props) => <CoordinateTrackerContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.AddManageLayers, (props) => <AddManageLayersContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.ShareLinkToView, (props) => <ShareLinkToViewContainer {...props} />);
}