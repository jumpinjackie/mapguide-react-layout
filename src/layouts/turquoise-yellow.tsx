import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { Toolbar, IItem, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
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

function turquoiseYellowTemplateReducer(state: ITemplateReducerState, action: ReduxAction): ITemplateReducerState {
    const data: boolean | TemplateActions.IElementState | undefined = action.payload;
    switch (action.type) {
        case Constants.FUSION_SET_LEGEND_VISIBILITY:
            {
                if (typeof(data) == "boolean") {
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
                if (typeof(data) == "boolean") {
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
                if (typeof(data) == "boolean") {
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
    private fnActiveTabChanged: (id: string) => void;
    constructor(props: TurquoiseYellowTemplateLayoutProps) {
        super(props);
        this.fnActiveTabChanged = this.onActiveTabChanged.bind(this);
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
    }
    private onActiveTabChanged(id: string): void {
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
        return <div style={{ width: "100%", height: "100%" }}>
            <div className="turquoise-yellow-sidebar" style={{ position: "absolute", left: SIDEBAR_PADDING, top: TOP_BAR_HEIGHT, bottom: (bottomOffset + SIDEBAR_PADDING), width: (sbWidth - (SIDEBAR_PADDING * 2)) }}>
                <Tabs2 id="SidebarTabs" onChange={this.fnActiveTabChanged} {...extraTabsProps}>
                    {(() => {
                        if (hasTaskPane) {
                            const panel = <div style={tabPanelStyle}>
                                <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} />
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
            </div>
            <ToolbarContainer id="FileMenu" containerClass="turquoise-yellow-file-menu" containerStyle={{ position: "absolute", left: sbWidth, top: (TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE), zIndex: 100, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="turquoise-yellow-toolbar" containerStyle={{ position: "absolute", left: sbWidth, top: TOP_BAR_HEIGHT, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="ToolbarVertical" containerClass="turquoise-yellow-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: sbWidth, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: 100, bottom: (bottomOffset + SIDEBAR_PADDING) }} />
            <div style={{ position: "absolute", left: (sbWidth + DEFAULT_TOOLBAR_SIZE), top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), bottom: (bottomOffset + SIDEBAR_PADDING), right: 0 }}>
                {(() => {
                    //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                    //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                    //call to fix
                    if (this.props.map != null) {
                        return <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
                    }
                })()}
                {(() => {
                    if (hasNavigator) {
                        return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                    }
                })()}
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