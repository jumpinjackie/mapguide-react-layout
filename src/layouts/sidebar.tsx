import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
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
    busy: boolean;
    locale: string;
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
                case Constants.TASK_INVOKE_URL:
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
                                <a onClick={this.fnActivateTasks} title={tr("TPL_SIDEBAR_OPEN_TASKPANE", this.props.locale)} role="tab"><i className="icon-window"></i></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.legend) {
                            return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                                <a onClick={this.fnActivateLegend} title={tr("TPL_SIDEBAR_OPEN_LEGEND", this.props.locale)} role="tab"><i className="icon-buffer"></i></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.selection) {
                            return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                                <a onClick={this.fnActivateSelection} title={tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", this.props.locale)} role="tab"><i className="icon-list"></i></a>
                            </li>;
                        }
                    })()}
                    <li className="sidebar-separator"></li>
                </ul>
            </div>
            <div className="sidebar-content">
                {(() => {
                    if (this.props.taskpane) {
                        return <div className={`sidebar-pane ${activeTab == "tasks" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_SIDEBAR_TITLE_TASKPANE", this.props.locale)} onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={this.props.locale} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.legend) {
                        return <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_SIDEBAR_TITLE_LEGEND", this.props.locale)} onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={this.props.locale} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.selection) {
                        return <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_SIDEBAR_TITLE_SELECTION_PANEL", this.props.locale)} onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={this.props.locale} />
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
    config?: any;
    capabilities?: any;
    lastaction?: any;
}

function mapStateToProps(state): ISidebarLayoutState {
    return {
        viewer: state.map.viewer,
        config: state.config,
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
                     taskpane={hasTaskPane}
                     locale={this.props.config.locale}
                     lastAction={this.props.lastaction} />
            {(() => {
                if (hasToolbar) {
                    let top = 180;
                    if (!hasSelectionPanel) {
                        top -= 40;
                    }
                    if (!hasLegend) {
                        top -= 40;
                    }
                    if (!hasTaskPane) {
                        top -= 40;
                    }
                    return <div id="toolbar-region" style={{ top: top }}>
                        <ToolbarContainer id="main" vertical={true} containerStyle={{ position: "absolute", left: 4, right: 6, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
                    </div>;
                }
            })()}
            {(() => {
                if (hasNavigator) {
                    return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={this.props.config.locale} componentProps={NAVIGATOR_PROPS} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={this.props.config.locale} componentProps={MOUSE_COORDINATE_PROPS} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={this.props.config.locale} componentProps={SCALE_DISPLAY_PROPS} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={this.props.config.locale} componentProps={SELECTED_FEATURE_COUNT_PROPS} />;
                }
            })()}
            <PlaceholderComponent id={DefaultComponentNames.Map} locale={this.props.config.locale} />
            <AjaxViewerShim />
            <ModalLauncher />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={this.props.config.locale} componentProps={PBMG_PROPS} />
        </div>;
    }
}