import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { useDispatch, useSelector } from "react-redux";
import { tr } from "../api/i18n";
import * as Constants from "../constants";
import {
    GenericEvent,
    IApplicationState
} from "../api/common";
import InitWarningDisplay from "../containers/init-warning-display";
import { ActionType } from '../constants/actions';
import { IElementState } from '../actions/defs';
import * as TemplateActions from "../actions/template";
import { Spinner, Intent, Icon } from '@blueprintjs/core';
import { useTemplateLegendVisible, useTemplateSelectionVisible, useTemplateTaskPaneVisible, useConfiguredCapabilities, useViewerBusyCount, useViewerLocale } from '../containers/hooks';


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
                                    <Spinner intent={Intent.WARNING} size={Spinner.SIZE_SMALL} />
                                </a>;
                            } else {
                                if (collapsed) {
                                    return <a onClick={this.onClickExpand}><Icon icon="menu-open" /></a>;
                                } else {
                                    return <a onClick={this.onClickCollapse}><Icon icon="menu-closed" /></a>;
                                }
                            }
                        })()}
                    </li>
                    {(() => {
                        if (this.props.taskpane) {
                            return <li className={collapsed == false && activeTab == "tasks" ? "active" : ""}>
                                <a onClick={this.onActivateTasks} title={tr("TPL_SIDEBAR_OPEN_TASKPANE", this.props.locale)} role="tab"><Icon icon="application" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.legend) {
                            return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                                <a onClick={this.onActivateLegend} title={tr("TPL_SIDEBAR_OPEN_LEGEND", this.props.locale)} role="tab"><Icon icon="layers" /></a>
                            </li>;
                        }
                    })()}
                    {(() => {
                        if (this.props.selection) {
                            return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                                <a onClick={this.onActivateSelection} title={tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", this.props.locale)} role="tab"><Icon icon="th" /></a>
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

const SidebarLayout = () => {
    const dispatch = useDispatch();
    const setElementStates = (states: IElementState) => dispatch(TemplateActions.setElementStates(states));
    const lastaction = useSelector<IApplicationState, any>(state => state.lastaction);
    const locale = useViewerLocale();
    const showLegend = useTemplateLegendVisible();
    const showSelection = useTemplateSelectionVisible();
    const showTaskPane = useTemplateTaskPaneVisible();
    const {
        hasTaskPane,
        hasStatusBar,
        hasNavigator,
        hasSelectionPanel,
        hasLegend,
        hasViewSize,
        hasToolbar
    } = useConfiguredCapabilities();
    const busyCount = useViewerBusyCount();
    let defaultActiveTab: SidebarTab = "tasks";
    if (showLegend) {
        defaultActiveTab = "legend";
    } else if (showSelection) {
        defaultActiveTab = "selection";
    }
    const [activeTab, setActiveTab] = React.useState(defaultActiveTab);
    const onCollapse = () => {
        setElementStates({
            taskPaneVisible: false,
            legendVisible: false,
            selectionPanelVisible: false
        });
    };
    const onExpand = () => {
        const est: IElementState = {
            legendVisible: false,
            selectionPanelVisible: false,
            taskPaneVisible: false
        };
        switch (activeTab) {
            case "legend":
                est.legendVisible = true;
                break;
            case "selection":
                est.selectionPanelVisible = true;
                break;
            case "tasks":
                est.taskPaneVisible = true;
                break;
        }
        if (est.legendVisible || est.selectionPanelVisible || est.taskPaneVisible) {
            setElementStates(est);
        }
    }
    const onActivateTab = (tab: SidebarTab) => {
        const est: IElementState = {
            legendVisible: false,
            selectionPanelVisible: false,
            taskPaneVisible: false
        };
        switch (tab) {
            case "legend":
                est.legendVisible = true;
                break;
            case "selection":
                est.selectionPanelVisible = true;
                break;
            case "tasks":
                est.taskPaneVisible = true;
                break;
        }
        if (est.legendVisible || est.selectionPanelVisible || est.taskPaneVisible) {
            setElementStates(est);
            setActiveTab(tab);
        }
    }
    const collapsed = !(showLegend || showSelection || showTaskPane);
    return <div style={{ width: "100%", height: "100%" }}>
        <Sidebar position="left"
            busy={busyCount > 0}
            legend={hasLegend}
            selection={hasSelectionPanel}
            taskpane={hasTaskPane}
            locale={locale}
            collapsed={collapsed || false}
            activeTab={activeTab || "tasks"}
            onCollapse={onCollapse}
            onActivateTab={onActivateTab}
            onExpand={onExpand}
            lastAction={lastaction} />
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
                return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
            }
        })()}
        {(() => {
            if (hasStatusBar) {
                return <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />;
            }
        })()}
        {(() => {
            if (hasStatusBar) {
                return <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />;
            }
        })()}
        {(() => {
            if (hasViewSize) {
                return <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />;
            }
        })()}
        {(() => {
            if (hasStatusBar) {
                return <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />;
            }
        })()}
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
        <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
    </div>;
};

export default SidebarLayout;