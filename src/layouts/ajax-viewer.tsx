import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { connect } from "react-redux";
import {
    ReduxDispatch
} from "../api/common";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

export interface IAjaxViewerLayoutState {
    map?: any;
    config?: any;
    capabilities?: any;
}

function mapStateToProps(state: any): IAjaxViewerLayoutState {
    return {
        config: state.config,
        map: state.map.state,
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type AjaxViewerLayoutProps = IAjaxViewerLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class AjaxViewerLayout extends React.Component<AjaxViewerLayoutProps, any> {
    constructor(props: AjaxViewerLayoutProps) {
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
                const lgStyle: React.CSSProperties = { position: "absolute", left: 0, top: 0, bottom: 0, right: 0, overflowY: "auto" };
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
                                    <PlaceholderComponent id={DefaultComponentNames.Legend} locale={this.props.config.locale} />
                                </div>;
                            }
                        })()}
                        {(() => {
                            if (hasSelectionPanel) {
                                return <div style={selStyle}>
                                    <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={this.props.config.locale} />
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
                            return <ToolbarContainer id="main" containerStyle={{ position: "absolute", left: 10, top: 10, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />;
                        }
                    })()}
                    {(() => {
                        //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                        //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                        //call to fix
                        if (this.props.map != null) {
                            return <PlaceholderComponent id={DefaultComponentNames.Map} locale={this.props.config.locale} />;
                        }
                    })()}
                    {(() => {
                        if (hasNavigator) {
                            return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={this.props.config.locale} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={this.props.config.locale} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={this.props.config.locale} />;
                        }
                    })()}
                    {(() => {
                        if (hasStatusBar) {
                            return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={this.props.config.locale} />;
                        }
                    })()}
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={this.props.config.locale} />
                </div>
            })()}
            {(() => {
                if (hasTaskPane) {
                    return <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: tpWidth }}>
                        <PlaceholderComponent locale={this.props.config.locale} id={DefaultComponentNames.TaskPane} />
                    </div>;
                }
            })()}
            <AjaxViewerShim />
            <ModalLauncher />
        </div>;
    }
}