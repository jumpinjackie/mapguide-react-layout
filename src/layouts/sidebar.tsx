import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
import * as Constants from "../constants";
import {
    GenericEvent,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState,
    IViewerCapabilities,
    ITemplateReducerState
} from "../api/common";
import InitWarningDisplay from "../containers/init-warning-display";
import { ActionType } from '../constants/actions';

const SIDEBAR_WIDTH = 250;

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

export type SidebarTab = "legend" | "tasks" | "selection";

interface ISidebarProps {
    taskpane: boolean;
    legend: boolean;
    selection: boolean;
    busy: boolean;
    locale: string;
    position: "left" | "right";
    collapsed: boolean;
    activeTab: string;
    onExpand: () => void;
    onCollapse: () => void;
    onActivateTab: (tab: SidebarTab, collapsed?: boolean) => void;
    lastAction?: any;
}

class Sidebar extends React.Component<ISidebarProps, {}> {
    constructor(props: ISidebarProps) {
        super(props);
    }
    componentDidUpdate(prevProps: ISidebarProps) {
        const nextProps = this.props;
        const lastAction = nextProps.lastAction;
        if (lastAction != prevProps.lastAction) {
            switch (lastAction.type) {
                case ActionType.TASK_INVOKE_URL:
                    {
                        nextProps.onActivateTab("tasks", false);
                    }
                    break;
                case ActionType.MAP_SET_SELECTION:
                    break;
            }
        }
    }
    private onActivateTasks = (e: GenericEvent) => {
        const { onActivateTab } = this.props;
        e.preventDefault();
        onActivateTab("tasks");
        return false;
    }
    private onActivateLegend = (e: GenericEvent) => {
        const { onActivateTab } = this.props;
        e.preventDefault();
        onActivateTab("legend");
        return false;
    }
    private onActivateSelection = (e: GenericEvent) => {
        const { onActivateTab } = this.props;
        e.preventDefault();
        onActivateTab("selection");
        return false;
    }
    private onClickCollapse = (e: GenericEvent) => {
        const { onCollapse } = this.props;
        e.preventDefault();
        onCollapse();
        return false;
    }
    private onClickExpand = (e: GenericEvent) => {
        const { onExpand } = this.props;
        e.preventDefault();
        onExpand();
        return false;
    }
    render(): JSX.Element {
        const { position, busy, collapsed, activeTab } = this.props;
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
                                    return <a onClick={this.onClickExpand}><span className="standard menu-open" /></a>;
                                } else {
                                    return <a onClick={this.onClickCollapse}><span className="standard menu-closed" /></a>;
                                }
                            }
                        })()}
                    </li>
                    {(() => {
                        if (this.props.taskpane) {
                            return <li className={collapsed == false && activeTab == "tasks" ? "active" : ""}>
                                <a onClick={this.onActivateTasks} title={tr("TPL_SIDEBAR_OPEN_TASKPANE", this.props.locale)} role="tab"><span className="standard application" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.legend) {
                            return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                                <a onClick={this.onActivateLegend} title={tr("TPL_SIDEBAR_OPEN_LEGEND", this.props.locale)} role="tab"><span className="standard layers" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.selection) {
                            return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                                <a onClick={this.onActivateSelection} title={tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", this.props.locale)} role="tab"><span className="standard th" /></a>
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
                            <SidebarHeader text={tr("TPL_TITLE_TASKPANE", this.props.locale)} onCloseClick={this.onClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={this.props.locale} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.legend) {
                        return <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_TITLE_LEGEND", this.props.locale)} onCloseClick={this.onClickCollapse} />
                            <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0, overflow: "auto" }}>
                                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={this.props.locale} componentProps={{ inlineBaseLayerSwitcher: true }} />
                            </div>
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.props.selection) {
                        return <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                            <SidebarHeader text={tr("TPL_TITLE_SELECTION_PANEL", this.props.locale)} onCloseClick={this.onClickCollapse} />
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
    viewer: IViewerReducerState;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
    templateState: ITemplateReducerState;
    lastaction: any;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ISidebarLayoutState> {
    return {
        viewer: state.viewer,
        config: state.config,
        capabilities: state.config.capabilities,
        lastaction: state.lastaction,
        templateState: state.template
    };
}

function mapDispatchToProps() {
    return {

    };
}

export type SidebarLayoutProps = Partial<ISidebarLayoutState>;

export interface SidebarLayoutState {
    collapsed: boolean;
    activeTab: SidebarTab;
}

export class SidebarLayout extends React.Component<SidebarLayoutProps, Partial<SidebarLayoutState>> {
    constructor(props: SidebarLayoutProps) {
        super(props);
        const { templateState } = props;
        let collapsed = false;
        let activeTab: SidebarTab = "tasks";
        if (templateState) {
            collapsed = !(templateState.legendVisible || templateState.selectionPanelVisible || templateState.taskPaneVisible);
            if (templateState.legendVisible) {
                activeTab = "legend";
            } else if (templateState.selectionPanelVisible) {
                activeTab = "selection";
            }
        }
        this.state = {
            collapsed: collapsed,
            activeTab: activeTab
        };
    }
    private onCollapse = () => {
        this.setState({
            collapsed: true
        });
    }
    private onExpand = () => {
        this.setState({
            collapsed: false
        });
    }
    private onActivateTab = (tab: SidebarTab, collapsed?: boolean) => {
        if (typeof(collapsed) != 'undefined') {
            this.setState({
                activeTab: tab,
                collapsed: collapsed
            });
        } else {
            this.setState({
                activeTab: tab
            });
        }
    }
    render(): JSX.Element {
        const { collapsed, activeTab } = this.state;
        const { viewer, capabilities, config } = this.props;
        if (!viewer || !capabilities || !config) {
            return <div />;
        }
        const {
            hasTaskPane,
            hasStatusBar,
            hasNavigator,
            hasSelectionPanel,
            hasLegend,
            hasViewSize,
            hasToolbar
        } = capabilities;

        return <div style={{ width: "100%", height: "100%" }}>
            <Sidebar position="left"
                     busy={viewer.busyCount > 0}
                     legend={hasLegend}
                     selection={hasSelectionPanel}
                     taskpane={hasTaskPane}
                     locale={config.locale}
                     collapsed={collapsed || false}
                     activeTab={activeTab || "tasks"}
                     onCollapse={this.onCollapse}
                     onActivateTab={this.onActivateTab}
                     onExpand={this.onExpand}
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
                        <ToolbarContainer id={Constants.WEBLAYOUT_TOOLBAR} containerClass="sidebar-toolbar" vertical={true} hideVerticalLabels={true} containerStyle={{ position: "absolute", left: 4, right: 6, zIndex: 100 }} />
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
                if (hasViewSize) {
                    return <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={config.locale} />;
                }
            })()}
            {(() => {
                if (hasStatusBar) {
                    return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={config.locale} />;
                }
            })()}
            <PlaceholderComponent id={DefaultComponentNames.Map} locale={config.locale} />
            <ViewerApiShim />
            <ModalLauncher />
            <FlyoutRegionContainer />
            <InitWarningDisplay />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={config.locale} />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(SidebarLayout);