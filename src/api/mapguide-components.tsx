import * as React from "react";

import LegendContainer from "../containers/legend";
import SelectedFeatureCountContainer from "../containers/selected-feature-count";
import SelectionPanelContainer from "../containers/selection-panel";
import { PoweredByMapGuide } from "../components/pbmg";
import { SessionExpired } from "../components/session-expired";
import ViewerOptions from "../containers/viewer-options";
import QuickPlotContainer from "../containers/quick-plot";
import { registerComponentFactory, DefaultComponentNames } from "../api/registry/component";

export function registerMapGuideComponents() {
    registerComponentFactory(DefaultComponentNames.Legend, (props) => <LegendContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.SelectionPanel, (props) => <SelectionPanelContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.SelectedFeatureCount, (props) => <SelectedFeatureCountContainer {...props} />);
    registerComponentFactory(DefaultComponentNames.PoweredByMapGuide, (props) => <PoweredByMapGuide {...props} />);
    registerComponentFactory(DefaultComponentNames.SessionExpired, (props) => <SessionExpired {...props} />);
    registerComponentFactory(DefaultComponentNames.ViewerOptions, (props) => <ViewerOptions {...props} />);
    registerComponentFactory(DefaultComponentNames.QuickPlot, (props) => <QuickPlotContainer {...props} />);
}