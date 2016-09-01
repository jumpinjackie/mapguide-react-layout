import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { connect } from "react-redux";
import * as Constants from "../constants";

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

const SidebarHeader = (props) => {
    const sbHeaderStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        right: 0,
        height: 40,
        left: 0,
        margin: 0
    };
    sbHeaderStyle.paddingLeft = 10;
    return <h1 style={sbHeaderStyle} className="sidebar-header">
        {props.text}
        <span className="sidebar-close" onClick={props.onCloseClick}><i className="icon-left-open"></i></span>
    </h1>;
};

interface ISidebarProps {
    taskpane: boolean;
    legend: boolean;
    selection: boolean;
    toolbar: boolean;
    busy: boolean;
    position: "left" | "right";
    lastAction?: any;
}

class Sidebar extends React.Component<ISidebarProps, any> {
    private fnClickExpand: (e) => void;
    private fnClickCollapse: (e) => void;
    private fnActivateTasks: (e) => void;
    private fnActivateLegend: (e) => void;
    private fnActivateSelection: (e) => void;
    constructor(props) {
        super(props);
        this.fnClickCollapse = this.onClickCollapse.bind(this);
        this.fnClickExpand = this.onClickExpand.bind(this);
        this.fnActivateTasks = this.onActivateTasks.bind(this);
        this.fnActivateLegend = this.onActivateLegend.bind(this);
        this.fnActivateSelection = this.onActivateSelection.bind(this);
        this.state = {
            collapsed: true,
            activeTab: "tasks"
        };
    }
    componentWillReceiveProps(nextProps: ISidebarProps) {
        const lastAction = nextProps.lastAction;
        if (lastAction != this.props.lastAction) {
            switch (lastAction.type) {
                case Constants.CMD_INVOKE_URL:
                    {
                        this.setState({
                            collapsed: false,
                            activeTab: "tasks"
                        });
                    }
                    break;
                case Constants.MAP_SET_SELECTION:
                    break;
            }
        }
    }
    onActivateTasks(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "tasks"
        });
        return false;
    }
    onActivateLegend(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "legend"
        });
        return false;
    }
    onActivateSelection(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "selection"
        });
        return false;
    }
    onClickCollapse(e) {
        e.preventDefault();
        this.setState({
            collapsed: true
        });
        return false;
    }
    onClickExpand(e) {
        e.preventDefault();
        this.setState({
            collapsed: false
        });
        return false;
    }
    render(): JSX.Element {
        const { position, busy } = this.props;
        const { collapsed, activeTab } = this.state;
        
        return <div className={`sidebar ${collapsed ? "collapsed" : ""} sidebar-${position}`}>
            <div className="sidebar-tabs">
                <ul role="tablist">
                    <li>
                        {(() => {
                            if (busy === true) {
                                return <a><i className="icon-spin3 animate-spin" /></a>;
                            } else {
                                if (collapsed) {
                                    return <a onClick={this.fnClickExpand}><i className="icon-menu" /></a>;
                                } else {
                                    return <a onClick={this.fnClickCollapse}><i className="icon-left-open" /></a>;
                                }
                            }
                        })()}
                    </li>
                    {(() => {
                        if (this.props.taskpane) {
                            return <li className={collapsed == false && activeTab == "tasks" ? "active" : ""}>
                                <a onClick={this.fnActivateTasks} title="Open Task Pane" role="tab"><i className="icon-window"></i></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.legend) {
                            return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                                <a onClick={this.fnActivateLegend} title="Open Legend" role="tab"><i className="icon-buffer"></i></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.selection) {
                            return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                                <a onClick={this.fnActivateSelection} title="Open Selection Panel" role="tab"><i className="icon-list"></i></a>
                            </li>;
                        }
                    })()}
                    <li className="sidebar-separator"></li>
                </ul>
                {(() => {
                    if (this.props.toolbar) {
                        let top = 170;
                        if (!this.props.selection) {
                            top -= 40;
                        }
                        if (!this.props.legend) {
                            top -= 40;
                        }
                        if (!this.props.taskpane) {
                            top -= 40;
                        }
                        return <div id="toolbar-region" style={{ top: top }}>
                            <ToolbarContainer id="main" vertical={true} containerStyle={{ position: "absolute", left: 5, right: 6, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
                        </div>;
                    }
                })()}
            </div>
            <div className="sidebar-content">
                {(() => {
                    if (this.props.taskpane) {
                        return <div className={`sidebar-pane ${activeTab == "tasks" ? "active" : ""}`}>
                            <SidebarHeader text="Task Pane" onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.legend) {
                        return <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                            <SidebarHeader text="Legend" onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.Legend} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.selection) {
                        return <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                            <SidebarHeader text="Selection" onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} />
                            </div>
                        </div>;
                    }
                })()}
            </div>
        </div>;
    }
}

interface ISidebarLayoutState {
    viewer?: any;
    capabilities?: any;
    lastaction?: any;
}

function mapStateToProps(state): ISidebarLayoutState {
    return {
        viewer: state.map.viewer,
        capabilities: state.config.capabilities,
        lastaction: state.lastaction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

type SidebarLayoutProps = ISidebarLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class SidebarLayout extends React.Component<SidebarLayoutProps, any> {
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
            <Sidebar position="left" 
                     busy={this.props.viewer.busyCount > 0}
                     legend={hasLegend}
                     selection={hasSelectionPanel}
                     toolbar={hasToolbar}
                     taskpane={hasTaskPane}
                     lastAction={this.props.lastaction} />
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
            <PlaceholderComponent id={DefaultComponentNames.Map} />
            <AjaxViewerShim />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} componentProps={PBMG_PROPS} />
        </div>;
    }
}