import * as React from "react";
import { DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";

import { PoweredByMapGuide } from "../components/pbmg";

import { MapViewerContainer } from "../containers/map-viewer";
import { LegendContainer } from "../containers/legend";
import { SelectionPanelContainer } from "../containers/selection-panel";
import { NavigatorContainer } from "../containers/navigator";
import { SelectedFeatureCountContainer } from "../containers/selected-feature-count";
import { MouseCoordinatesContainer } from "../containers/mouse-coordinates";
import { TaskPaneContainer } from "../containers/task-pane";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ScaleDisplayContainer } from "../containers/scale-display";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

export const AjaxViewerLayout = (props) => {
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
            <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: LEGEND_HEIGHT, overflow: "auto" }}>
                <LegendContainer />
            </div>
            <div style={{ position: "absolute", left: 0, bottom: 0, right: 0, top: LEGEND_HEIGHT }}>
                <SelectionPanelContainer />
            </div>
        </div>
        <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, bottom: 0, right: SIDEBAR_WIDTH }}>
            <ToolbarContainer id="main" containerStyle={{ position: "absolute", left: 10, top: 10, height: DEFAULT_TOOLBAR_HEIGHT, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
            <MapViewerContainer />
            <NavigatorContainer style={{ position: "absolute", zIndex: 1000, width: 51, height: 204, cursor: "pointer", right: 10, top: 10 }} />
            <MouseCoordinatesContainer style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
            <ScaleDisplayContainer style={{ position: "absolute", bottom: 0, right: 340, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
            <SelectedFeatureCountContainer style={{ position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
            <PoweredByMapGuide style={{ position: "absolute", bottom: 0, right: 0, zIndex: 100 }} />
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDEBAR_WIDTH }}>
            <TaskPaneContainer />
        </div>
        <AjaxViewerShim />
    </div>;
};