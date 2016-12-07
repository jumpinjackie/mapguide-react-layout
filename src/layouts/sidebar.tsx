import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
import * as Constants from "../constants";
import {
    ReduxDispatch,
    IApplicationState,
    IMapViewerReducerState,
    IConfigurationReducerState,
    IViewerCapabilities
} from "../api/common";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

const SidebarHeader = (props: any) => {
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
    private fnClickExpand: GenericEventHandler;
    private fnClickCollapse: GenericEventHandler;
    private fnActivateTasks: GenericEventHandler;
    private fnActivateLegend: GenericEventHandler;
    private fnActivateSelection: GenericEventHandler;
    constructor(props: ISidebarProps) {
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
    onActivateTasks(e: GenericEvent) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "tasks"
        });
        return false;
    }
    onActivateLegend(e: GenericEvent) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "legend"
        });
        return false;
    }
    onActivateSelection(e: GenericEvent) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "selection"
        });
        return false;
    }
    onClickCollapse(e: GenericEvent) {
        e.preventDefault();
        this.setState({
            collapsed: true
        });
        return false;
    }
    onClickExpand(e: GenericEvent) {
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
                                return <a>
                                    <div className="pt-spinner pt-small pt-intent-warning">
                                        <div className="pt-spinner-svg-container">
                                            <svg viewBox="0 0 100 100">
                                                <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                                <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </a>;
                            } else {
                                if (collapsed) {
                                    return <a onClick={this.fnClickExpand}><span className="pt-icon-standard pt-icon-menu-open" /></a>;
                                } else {
                                    return <a onClick={this.fnClickCollapse}><span className="pt-icon-standard pt-icon-menu-closed" /></a>;
                                }
                            }
                        })()}
                    </li>
                    {(() => {
                        if (this.props.taskpane) {
                            return <li className={collapsed == false && activeTab == "tasks" ? "active" : ""}>
                                <a onClick={this.fnActivateTasks} title={tr("TPL_SIDEBAR_OPEN_TASKPANE", this.props.locale)} role="tab"><span className="pt-icon-standard pt-icon-application" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.legend) {
                            return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                                <a onClick={this.fnActivateLegend} title={tr("TPL_SIDEBAR_OPEN_LEGEND", this.props.locale)} role="tab"><span className="pt-icon-standard pt-icon-layers" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.selection) {
                            return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                                <a onClick={this.fnActivateSelection} title={tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", this.props.locale)} role="tab"><span className="pt-icon-standard pt-icon-th" /></a>
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
                            <SidebarHeader text={tr("TPL_TITLE_TASKPANE", this.props.locale)} onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={this.props.locale} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.legend) {
                        return <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_TITLE_LEGEND", this.props.locale)} onCloseClick={this.fnClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0, overflow: "auto" }}>
                                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={this.props.locale} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.selection) {
                        return <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_TITLE_SELECTION_PANEL", this.props.locale)} onCloseClick={this.fnClickCollapse} />
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

export interface ISidebarLayoutState {
    viewer?: IMapViewerReducerState;
    config?: IConfigurationReducerState;
    capabilities?: IViewerCapabilities;
    lastaction?: any;
}

function mapStateToProps(state: IApplicationState): ISidebarLayoutState {
    return {
        viewer: state.map.viewer,
        config: state.config,
        capabilities: state.config.capabilities,
        lastaction: state.lastaction
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type SidebarLayoutProps = ISidebarLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class SidebarLayout extends React.Component<SidebarLayoutProps, any> {
    constructor(props: SidebarLayoutProps) {
        super(props);
    }
    render(): JSX.Element {
        const { viewer, capabilities, config } = this.props;
        if (!viewer || !capabilities || !config) {
            return <div />;
        }
        const {
            hasTaskPane,
            hasTaskBar,
            hasStatusBar,
            hasNavigator,
            hasSelectionPanel,
            hasLegend,
            hasToolbar
        } = capabilities;
        let sbWidth = SIDEBAR_WIDTH;
        let tpWidth = SIDEBAR_WIDTH;
        return <div style={{ width: "100%", height: "100%" }}>
            <Sidebar position="left" 
                     busy={viewer.busyCount > 0}
                     legend={hasLegend}
                     selection={hasSelectionPanel}
                     taskpane={hasTaskPane}
                     locale={config.locale}
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
                        <ToolbarContainer id="main" containerClass="sidebar-toolbar" vertical={true} containerStyle={{ position: "absolute", left: 4, right: 6, zIndex: 100 }} />
                    </div>;
                }
            })()}
            {(() => {
                if (hasNavigator) {
                    return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={config.locale} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={config.locale} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={config.locale} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={config.locale} />;
                }
            })()}
            <PlaceholderComponent id={DefaultComponentNames.Map} locale={config.locale} />
            <AjaxViewerShim />
            <ModalLauncher />
            <FlyoutRegionContainer />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={config.locale} />
        </div>;
    }
}