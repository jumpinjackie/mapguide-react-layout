import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { ViewerApiShim } from "../containers/viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { tr } from "../api/i18n";
import { ITemplateReducerState } from "../api/common";
import { isElementState } from "../reducers/template";
import { InitWarningDisplay } from "../containers/init-warning-display";
import SplitterLayout from "react-splitter-layout";
import { ViewerAction } from '../actions/defs';
import { ActionType } from '../constants/actions';
import { useCommonTemplateState } from './hooks';
import { useTemplateInitialInfoPaneWidth, useTemplateInitialTaskPaneWidth } from '../containers/hooks';
import { TabSetProps, useElementContext } from "../components/elements/element-context";

function turquoiseYellowTemplateReducer(origState: ITemplateReducerState, state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
    switch (action.type) {
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

const SIDEBAR_PADDING = 3;
const TOP_BAR_HEIGHT = 35;
const TAB_BAR_HEIGHT = 30;
const STATUS_BAR_HEIGHT = 18;
const DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: false };

/**
 * A viewer template that resembles the TurquoiseYellow Fusion template
 */
export const TurquoiseYellowTemplateLayout = () => {
    const {
        isResizing,
        locale,
        capabilities,
        showSelection,
        showLegend,
        showTaskPane,
        onDragStart,
        onDragEnd,
        onSplitterChanged,
        onActiveElementChanged,
    } = useCommonTemplateState(turquoiseYellowTemplateReducer);
    const { TabSet } = useElementContext();
    let hasTaskPane = false;
    let hasStatusBar = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasLegend = false;
    if (capabilities) {
        hasTaskPane = capabilities.hasTaskPane;
        hasStatusBar = capabilities.hasStatusBar;
        hasNavigator = capabilities.hasNavigator;
        hasSelectionPanel = capabilities.hasSelectionPanel;
        hasLegend = capabilities.hasLegend;
    }
    const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
    const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
    const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
    const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
    const tabPanelStyle: React.CSSProperties = {
        position: "absolute",
        top: TAB_BAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0
    };
    const states = [
        { id: "Selection", visible: showSelection },
        { id: "TaskPane", visible: showTaskPane },
        { id: "Legend", visible: showLegend }
    ];
    const active = states.filter(st => st.visible);
    let extraTabsProps: Pick<TabSetProps, "activeTabId"> = {};
    if (active.length == 1) {
        extraTabsProps.activeTabId = active[0].id;
    }
    const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
    const legendTitle = tr("TPL_TITLE_LEGEND", locale);
    const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
    const TB_Z_INDEX = 0;
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }}>
            <SplitterLayout customClassName="turquoise-yellow-splitter" primaryIndex={1} secondaryInitialSize={sbWidth} onSecondaryPaneSizeChange={onSplitterChanged} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {(() => {
                    if (showSelection || showTaskPane || showLegend) {
                        const tabProps: TabSetProps = {
                            id: "SidebarTabs",
                            onTabChanged: onActiveElementChanged,
                            className: "turquoise-yellow-sb-tabs",
                            tabs: [],
                            ...extraTabsProps
                        };
                        if (hasTaskPane) {
                            const panel = <div style={tabPanelStyle}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} componentProps={{ isResizing: isResizing }} />
                            </div>;
                            tabProps.tabs.push({
                                id: "TaskPane",
                                title: taskPaneTitle,
                                content: panel
                            });
                        }
                        if (hasLegend) {
                            const p1: React.CSSProperties = { overflow: "auto" };
                            const panel = <div style={{ ...tabPanelStyle, ...p1 }}>
                                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={DEFAULT_LEGEND_COMPONENT_PROPS} />
                            </div>;
                            tabProps.tabs.push({
                                id: "Legend",
                                title: legendTitle,
                                content: panel
                            });
                        }
                        if (hasSelectionPanel) {
                            const panel = <div style={tabPanelStyle}>
                                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                            </div>;
                            tabProps.tabs.push({
                                id: "Selection",
                                title: selectionTitle,
                                content: panel
                            });
                        }
                        return <div className="turquoise-yellow-sidebar" style={{ position: "absolute", left: SIDEBAR_PADDING, top: TOP_BAR_HEIGHT, bottom: SIDEBAR_PADDING, right: 0 }}>
                            <TabSet {...tabProps} />
                        </div>;
                    }
                })()}
                <div>
                    <ToolbarContainer id="FileMenu" containerClass="turquoise-yellow-file-menu" containerStyle={{ position: "absolute", left: 0, top: (TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE), zIndex: TB_Z_INDEX, right: 0 }} />
                    <ToolbarContainer id="Toolbar" containerClass="turquoise-yellow-toolbar" containerStyle={{ position: "absolute", left: 0, top: TOP_BAR_HEIGHT, zIndex: TB_Z_INDEX, right: 0 }} />
                    <ToolbarContainer id="ToolbarVertical" containerClass="turquoise-yellow-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: 0, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: TB_Z_INDEX, bottom: SIDEBAR_PADDING }} />
                    <div style={{ position: "absolute", left: (DEFAULT_TOOLBAR_SIZE), top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), bottom: SIDEBAR_PADDING, right: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                        {(() => {
                            if (hasNavigator) {
                                return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                            }
                        })()}
                    </div>
                </div>
            </SplitterLayout>
        </div>
        {(() => {
            if (hasStatusBar) {
                return <div className="turquoise-yellow-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                    <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                </div>;
            }
        })()}
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>;
}