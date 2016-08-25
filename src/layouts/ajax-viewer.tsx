import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

const NAVIGATOR_PROPS = {
    style: { position: "absolute", zIndex: 1000, width: 51, height: 204, cursor: "pointer", right: 10, top: 10 }
};
const MOUSE_COORDINATE_PROPS = {
    style: { position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SCALE_DISPLAY_PROPS = {
    style: { position: "absolute", bottom: 0, right: 340, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SELECTED_FEATURE_COUNT_PROPS = {
    style: { position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const PBMG_PROPS = {
    style: { position: "absolute", bottom: 0, right: 0, zIndex: 100 }
};

export const AjaxViewerLayout = (props) => {
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
            <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: LEGEND_HEIGHT, overflow: "auto" }}>
                <PlaceholderComponent id={DefaultComponentNames.Legend} />
            </div>
            <div style={{ position: "absolute", left: 0, bottom: 0, right: 0, top: LEGEND_HEIGHT }}>
                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} />
            </div>
        </div>
        <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, bottom: 0, right: SIDEBAR_WIDTH }}>
            <ToolbarContainer id="main" containerStyle={{ position: "absolute", left: 10, top: 10, height: DEFAULT_TOOLBAR_HEIGHT, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
            <PlaceholderComponent id={DefaultComponentNames.Map} />
            <PlaceholderComponent id={DefaultComponentNames.Navigator} componentProps={NAVIGATOR_PROPS} />
            <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} componentProps={MOUSE_COORDINATE_PROPS} />
            <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} componentProps={SCALE_DISPLAY_PROPS} />
            <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} componentProps={SELECTED_FEATURE_COUNT_PROPS} />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} componentProps={PBMG_PROPS} />
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDEBAR_WIDTH }}>
            <PlaceholderComponent id={DefaultComponentNames.TaskPane} />
        </div>
        <AjaxViewerShim />
    </div>;
};