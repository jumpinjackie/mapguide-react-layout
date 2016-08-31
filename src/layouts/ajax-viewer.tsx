import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { connect } from "react-redux";

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

interface IAjaxViewerLayoutState {
    map?: any;
    capabilities?: any;
}

function mapStateToProps(state): IAjaxViewerLayoutState {
    return {
        map: state.map.state,
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

type AjaxViewerLayoutProps = IAjaxViewerLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class AjaxViewerLayout extends React.Component<AjaxViewerLayoutProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const {
            hasTaskPane,
            hasTaskBar,
            hasStatusBar,
            hasNavigator,
            hasSelectionPanel,
            hasLegend,
            hasToolbar
        } = this.props.capabilities;
        let sbWidth = SIDEBAR_WIDTH;
        let tpWidth = SIDEBAR_WIDTH;
        return <div style={{ width: "100%", height: "100%" }}>
            {(() => {
                const lgStyle: React.CSSProperties = { position: "absolute", left: 0, top: 0, bottom: 0, right: 0 };
                const selStyle: React.CSSProperties = { position: "absolute", left: 0, bottom: 0, right: 0 };
                if (hasLegend) {
                    if (hasSelectionPanel) {
                        lgStyle.height = LEGEND_HEIGHT;
                    }
                }
                if (hasSelectionPanel) {
                    if (hasLegend) {
                        selStyle.top = LEGEND_HEIGHT;
                    } else {
                        selStyle.top = 0;
                    }
                }
                if (hasLegend || hasSelectionPanel) {
                    return <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: sbWidth }}>
                        {(() => {
                            if (hasLegend) {
                                return <div style={lgStyle}>
                                    <PlaceholderComponent id={DefaultComponentNames.Legend} />
                                </div>;
                            }
                        })()}
                        {(() => {
                            if (hasSelectionPanel) {
                                return <div style={selStyle}>
                                    <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} />
                                </div>;
                            }
                        })()}
                    </div>;
                }
            })()}
            {(() => {
                let left = 0;
                let right = 0;
                if (hasLegend || hasSelectionPanel) {
                    left = sbWidth;
                }
                if (hasTaskPane) {
                    right = tpWidth;
                }
                return <div style={{ position: "absolute", left: left, top: 0, bottom: 0, right: right }}>
                    {(() => {
                        if (hasToolbar) {
                            return <ToolbarContainer id="main" containerStyle={{ position: "absolute", left: 10, top: 10, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />;
                        }
                    })()}
                    {(() => {
                        //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                        //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                        //call to fix
                        if (this.props.map != null) {
                            return <PlaceholderComponent id={DefaultComponentNames.Map} />;
                        }
                    })()}
                    {(() => {
                        if (hasNavigator) {
                            return <PlaceholderComponent id={DefaultComponentNames.Navigator} componentProps={NAVIGATOR_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} componentProps={MOUSE_COORDINATE_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} componentProps={SCALE_DISPLAY_PROPS} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} componentProps={SELECTED_FEATURE_COUNT_PROPS} />;
                        }
                    })()}
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} componentProps={PBMG_PROPS} />
                </div>
            })()}
            {(() => {
                if (hasTaskPane) {
                    return <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: tpWidth }}>
                        <PlaceholderComponent id={DefaultComponentNames.TaskPane} />
                    </div>;
                }
            })()}
            <AjaxViewerShim />
        </div>;
    }
}