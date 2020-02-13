import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { tr } from "../api/i18n";
import { GenericEvent, ITemplateReducerState } from "../api/common";
import InitWarningDisplay from "../containers/init-warning-display";
import { ActionType } from '../constants/actions';
import { IElementState, ViewerAction } from '../actions/defs';
import { Spinner, Intent, Icon } from '@blueprintjs/core';
import { useViewerBusyCount, useLastDispatchedAction, useReducedToolbarAppState } from '../containers/hooks';
import { useCommonTemplateState } from './hooks';
import { isElementState } from '../reducers/template';
import { NBSP, WEBLAYOUT_TOOLBAR } from "../constants";
import isMobile from "ismobilejs";
import { setElementStates } from '../actions/template';

function sidebarTemplateReducer(origState: ITemplateReducerState, state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
    switch (action.type) {
        case ActionType.MAP_SET_SELECTION:
            {
                //This is the only template that does not conform to the selection/legend/taskpane is a mutually
                //exclusive visible set. We take advantage of the custom template reducer function to apply the
                //correct visibility state against the *original state* effectively discarding whatever the root
                //template reducer has done against this action.
                const { selection } = action.payload;
                if (selection && selection.SelectedFeatures) {
                    const extraState: any = {};
                    let autoExpandSelectionPanel = origState.autoDisplaySelectionPanelOnSelection;
                    const ism = isMobile(navigator.userAgent);
                    if (ism.phone) {
                        return origState; //Take no action on mobile
                    }
                    if (selection.SelectedFeatures.SelectedLayer.length && autoExpandSelectionPanel) {
                        return {
                            ...origState,
                            ...{ selectionPanelVisible: true, taskPaneVisible: false, legendVisible: false }
                        }
                    }
                }
                return state; //No action taken: Return "current" state
            }
        case ActionType.FUSION_SET_LEGEND_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
                    } else {
                        state1 = { legendVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
                    } else {
                        state1 = { selectionPanelVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.TASK_INVOKE_URL:
            {
                let state1: Partial<ITemplateReducerState> = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
                return { ...state, ...state1 };
            }
        case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
                    } else {
                        state1 = { taskPaneVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_ELEMENT_STATE:
            {
                const data = action.payload;
                if (isElementState(data)) {
                    return { ...state, ...data };
                }
            }
    }
    return state;
}


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
    hasSelection: boolean;
    busy: boolean;
    locale: string;
    position: "left" | "right";
    collapsed: boolean;
    activeTab: string;
    onExpand: () => void;
    onCollapse: () => void;
    onActivateTab: (tab: SidebarTab, collapsed?: boolean) => void;
}

const Sidebar = (props: ISidebarProps) => {
    const onActivateTasks = (e: GenericEvent) => {
        const { onActivateTab } = props;
        e.preventDefault();
        onActivateTab("tasks");
        return false;
    };
    const onActivateLegend = (e: GenericEvent) => {
        const { onActivateTab } = props;
        e.preventDefault();
        onActivateTab("legend");
        return false;
    };
    const onActivateSelection = (e: GenericEvent) => {
        const { onActivateTab } = props;
        e.preventDefault();
        onActivateTab("selection");
        return false;
    };
    const onClickCollapse = (e: GenericEvent) => {
        const { onCollapse } = props;
        e.preventDefault();
        onCollapse();
        return false;
    };
    const onClickExpand = (e: GenericEvent) => {
        const { onExpand } = props;
        e.preventDefault();
        onExpand();
        return false;
    };
    const lastAction = useLastDispatchedAction();
    React.useEffect(() => {
        switch (lastAction.type) {
            case ActionType.TASK_INVOKE_URL:
                {
                    props.onActivateTab("tasks", false);
                }
                break;
            case ActionType.MAP_SET_SELECTION:
                break;
        }
    }, [lastAction]);
    const { position, busy, collapsed, activeTab } = props;
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
                                return <a onClick={onClickExpand}><Icon icon="menu-open" /></a>;
                            } else {
                                return <a onClick={onClickCollapse}><Icon icon="menu-closed" /></a>;
                            }
                        }
                    })()}
                </li>
                {(() => {
                    if (props.taskpane) {
                        return <li className={collapsed == false && activeTab == "tasks" ? "active" : ""}>
                            <a onClick={onActivateTasks} title={tr("TPL_SIDEBAR_OPEN_TASKPANE", props.locale)} role="tab"><Icon icon="application" /></a>
                        </li>;
                    }
                })()}
                {(() => {
                    if (props.legend) {
                        return <li className={collapsed == false && activeTab == "legend" ? "active" : ""}>
                            <a onClick={onActivateLegend} title={tr("TPL_SIDEBAR_OPEN_LEGEND", props.locale)} role="tab"><Icon icon="layers" /></a>
                        </li>;
                    }
                })()}
                {(() => {
                    if (props.selection) {
                        return <li className={collapsed == false && activeTab == "selection" ? "active" : ""}>
                            <a onClick={onActivateSelection} title={tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", props.locale)} role="tab"><Icon icon="th" /></a>
                            {props.hasSelection && <div className="sidebar-has-selection-badge">{NBSP}</div>}
                        </li>;
                    }
                })()}
                <li className="sidebar-separator"></li>
            </ul>
        </div>
        <div className="sidebar-content">
            {(() => {
                if (props.taskpane) {
                    return <div className={`sidebar-pane ${activeTab == "tasks" ? "active" : ""}`}>
                        <SidebarHeader text={tr("TPL_TITLE_TASKPANE", props.locale)} onCloseClick={onClickCollapse} />
                        <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                            <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={props.locale} />
                        </div>
                    </div>;
                }
            })()}
            {(() => {
                if (props.legend) {
                    return <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                        <SidebarHeader text={tr("TPL_TITLE_LEGEND", props.locale)} onCloseClick={onClickCollapse} />
                        <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0, overflow: "auto" }}>
                            <PlaceholderComponent id={DefaultComponentNames.Legend} locale={props.locale} componentProps={{ inlineBaseLayerSwitcher: true }} />
                        </div>
                    </div>;
                }
            })()}
            {(() => {
                if (props.selection) {
                    return <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                        <SidebarHeader text={tr("TPL_TITLE_SELECTION_PANEL", props.locale)} onCloseClick={onClickCollapse} />
                        <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                            <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={props.locale} />
                        </div>
                    </div>;
                }
            })()}
        </div>
    </div>;
}

const SidebarLayout = () => {
    const {
        dispatch,
        locale,
        capabilities,
        showSelection,
        showLegend,
        showTaskPane,
    } = useCommonTemplateState(sidebarTemplateReducer);
    const tbState = useReducedToolbarAppState();
    const setElementStatesAction = (states: IElementState) => dispatch(setElementStates(states));
    //console.log(`leg: ${showLegend}, sel: ${showSelection}, task: ${showTaskPane}`);
    const {
        hasTaskPane,
        hasStatusBar,
        hasNavigator,
        hasSelectionPanel,
        hasLegend,
        hasViewSize,
        hasToolbar
    } = capabilities;
    const busyCount = useViewerBusyCount();
    let defaultActiveTab: SidebarTab = "tasks";
    if (showLegend) {
        defaultActiveTab = "legend";
    } else if (showSelection) {
        defaultActiveTab = "selection";
    }
    const [activeTab, setActiveTab] = React.useState(defaultActiveTab);
    // Need to apply an effect to update active tab from element states in the redux store
    React.useEffect(() => {
        let tab: SidebarTab = "tasks";
        if (showLegend) {
            tab = "legend";
        } else if (showSelection) {
            tab = "selection";
        }
        setActiveTab(tab);
    }, [showLegend, showSelection, showTaskPane]);
    const onCollapse = () => {
        setElementStatesAction({
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
            setElementStatesAction(est);
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
            setElementStatesAction(est);
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
            hasSelection={tbState.hasSelection}
            locale={locale}
            collapsed={collapsed || false}
            activeTab={activeTab || "tasks"}
            onCollapse={onCollapse}
            onActivateTab={onActivateTab}
            onExpand={onExpand} />
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
                    <ToolbarContainer id={WEBLAYOUT_TOOLBAR} containerClass="sidebar-toolbar" vertical={true} hideVerticalLabels={true} containerStyle={{ position: "absolute", left: 4, right: 6, zIndex: 100 }} />
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