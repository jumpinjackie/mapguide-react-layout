import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { Toolbar, IItem, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    NOOP,
    ReduxAction,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IViewerCapabilities,
    ITemplateReducerState,
    getRuntimeMap
} from "../api/common";
import { Tabs2, Tab2 } from "@blueprintjs/core";
import * as Constants from "../constants";
import * as TemplateActions from "../actions/template";
import { setCustomTemplateReducer, isElementState } from "../reducers/template";
import InitWarningDisplay from "../containers/init-warning-display";
import * as Runtime from "../api/runtime";
import SplitterLayout from "react-splitter-layout";

function turquoiseYellowTemplateReducer(state: ITemplateReducerState, action: ReduxAction): ITemplateReducerState {
    const data: boolean | TemplateActions.IElementState | undefined = action.payload;
    switch (action.type) {
        case Constants.FUSION_SET_LEGEND_VISIBILITY:
            {
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
        case Constants.FUSION_SET_SELECTION_PANEL_VISIBILITY:
            {
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
        case Constants.TASK_INVOKE_URL:
            {
                let state1: ITemplateReducerState = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
                return { ...state, ...state1 };
            }
        case Constants.FUSION_SET_TASK_PANE_VISIBILITY:
            {
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
        case Constants.FUSION_SET_ELEMENT_STATE:
            {
                if (isElementState(data)) {
                    return { ...state, ...data };
                }
            }
    }
    return state;
}

const SIDEBAR_WIDTH = 250;
const SIDEBAR_PADDING = 3;
const TOP_BAR_HEIGHT = 35;
const TAB_BAR_HEIGHT = 30;
const STATUS_BAR_HEIGHT = 18;

export interface ITurquoiseYellowTemplateLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
    showLegend: boolean;
    showTaskPane: boolean;
    showSelection: boolean;
}

export interface ITurquoiseYellowTemplateLayoutDispatch {
    setElementStates: (states: TemplateActions.IElementState) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ITurquoiseYellowTemplateLayoutState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        capabilities: state.config.capabilities,
        showLegend: state.template.legendVisible,
        showTaskPane: state.template.taskPaneVisible,
        showSelection: state.template.selectionPanelVisible
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ITurquoiseYellowTemplateLayoutDispatch> {
    return {
        setElementStates: (states: TemplateActions.IElementState) => dispatch(TemplateActions.setElementStates(states))
    };
}

export type TurquoiseYellowTemplateLayoutProps = Partial<ITurquoiseYellowTemplateLayoutState> & Partial<ITurquoiseYellowTemplateLayoutDispatch>;

export class TurquoiseYellowTemplateLayout extends React.Component<TurquoiseYellowTemplateLayoutProps, any> {
    constructor(props: TurquoiseYellowTemplateLayoutProps) {
        super(props);
        this.state = { isResizing: false };
    }
    private onDragStart = () => {
        this.setState({ isResizing: true });
    }
    private onDragEnd = () => {
        this.setState({ isResizing: false });
    }
    private onSplitterChanged = (size: number) => {
        //With the introduction of the splitter, we can no longer rely on a map 
        //filling 100% of its space without needing to manually call updateSize(),
        //so we do it here
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.updateSize();
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    private onActiveTabChanged = (id: string) => {
        const { setElementStates } = this.props;
        if (setElementStates) {
            const states: TemplateActions.IElementState = {
                legendVisible: false,
                taskPaneVisible: false,
                selectionPanelVisible: false
            };
            switch (id) {
                case "Legend":
                    states.legendVisible = true;
                    break;
                case "TaskPane":
                    states.taskPaneVisible = true;
                    break;
                case "Selection":
                    states.selectionPanelVisible = true;
                    break;
            }
            //One of these must be true
            if (states.legendVisible || states.taskPaneVisible || states.selectionPanelVisible)
                setElementStates(states);
        }
    }
    componentDidMount() {
        setCustomTemplateReducer(turquoiseYellowTemplateReducer);
    }
    render(): JSX.Element {
        const { config, map, capabilities } = this.props;
        const { isResizing } = this.state;
        let hasTaskPane = false;
        let hasTaskBar = false;
        let hasStatusBar = false;
        let hasNavigator = false;
        let hasSelectionPanel = false;
        let hasLegend = false;
        if (capabilities) {
            hasTaskPane = capabilities.hasTaskPane;
            hasTaskBar = capabilities.hasTaskBar;
            hasStatusBar = capabilities.hasStatusBar;
            hasNavigator = capabilities.hasNavigator;
            hasSelectionPanel = capabilities.hasSelectionPanel;
            hasLegend = capabilities.hasLegend;
        }
        const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
        const locale = this.getLocale();
        const sbWidth = SIDEBAR_WIDTH;
        const tabPanelStyle: React.CSSProperties = {
            position: "absolute",
            top: TAB_BAR_HEIGHT,
            left: 0,
            right: 0,
            bottom: 0
        };
        const states = [
            { id: "Selection", visible: this.props.showSelection },
            { id: "TaskPane", visible: this.props.showTaskPane },
            { id: "Legend", visible: this.props.showLegend }
        ];
        const active = states.filter(st => st.visible);
        let extraTabsProps: any = {};
        if (active.length == 1) {
            extraTabsProps.selectedTabId = active[0].id;
        }
        const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
        const legendTitle = tr("TPL_TITLE_LEGEND", locale);
        const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
        const TB_Z_INDEX = 0;
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }}>
                <SplitterLayout customClassName="turquoise-yellow-splitter" primaryIndex={1} secondaryInitialSize={sbWidth} onSecondaryPaneSizeChange={this.onSplitterChanged} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    {(() => {
                        if (this.props.showSelection || this.props.showTaskPane || this.props.showLegend) {
                            return <div className="turquoise-yellow-sidebar" style={{ position: "absolute", left: SIDEBAR_PADDING, top: TOP_BAR_HEIGHT, bottom: SIDEBAR_PADDING, right: 0 }}>
                                <Tabs2 id="SidebarTabs" onChange={this.onActiveTabChanged} {...extraTabsProps}>
                                    {(() => {
                                        if (hasTaskPane) {
                                            const panel = <div style={tabPanelStyle}>
                                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} componentProps={{ isResizing: isResizing }} />
                                            </div>;
                                            return <Tab2 id="TaskPane" title={taskPaneTitle} panel={panel} />;
                                        }
                                    })()}
                                    {(() => {
                                        if (hasLegend) {
                                            const p1: React.CSSProperties = { overflow: "auto" };
                                            const panel = <div style={{ ...tabPanelStyle, ...p1 }}>
                                                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={{ inlineBaseLayerSwitcher: false }} />
                                            </div>;
                                            return <Tab2 id="Legend" title={legendTitle} panel={panel} />;
                                        }
                                    })()}
                                    {(() => {
                                        if (hasSelectionPanel) {
                                            const panel = <div style={tabPanelStyle}>
                                                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                                            </div>;
                                            return <Tab2 id="Selection" title={selectionTitle} panel={panel} />;
                                        }
                                    })()}
                                </Tabs2>
                            </div>;
                        }
                    })()}
                    <div>
                        <ToolbarContainer id="FileMenu" containerClass="turquoise-yellow-file-menu" containerStyle={{ position: "absolute", left: 0, top: (TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE), zIndex: TB_Z_INDEX, right: 0 }} />
                        <ToolbarContainer id="Toolbar" containerClass="turquoise-yellow-toolbar" containerStyle={{ position: "absolute", left: 0, top: TOP_BAR_HEIGHT, zIndex: TB_Z_INDEX, right: 0 }} />
                        <ToolbarContainer id="ToolbarVertical" containerClass="turquoise-yellow-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: 0, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: TB_Z_INDEX, bottom: SIDEBAR_PADDING }} />
                        <div style={{ position: "absolute", left: ( DEFAULT_TOOLBAR_SIZE), top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), bottom: SIDEBAR_PADDING, right: 0 }}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(TurquoiseYellowTemplateLayout);