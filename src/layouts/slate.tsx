import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as Runtime from "../api/runtime";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IViewerCapabilities,
    ITemplateReducerState,
    getRuntimeMap
} from "../api/common";
import * as TemplateActions from "../actions/template";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../components/accordion";
import { setCustomTemplateReducer, isElementState } from "../reducers/template";
import InitWarningDisplay from "../containers/init-warning-display";
import SplitterLayout from "react-splitter-layout";
import { ActionType } from '../constants/actions';
import { IElementState, ViewerAction } from '../actions/defs';

function slateTemplateReducer(state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
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

export interface ISlateTemplateLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
    showLegend: boolean;
    showTaskPane: boolean;
    showSelection: boolean;
    initWarnings: string[];
}

export interface ISlateTemplateLayoutDispatch {
    setElementStates: (states: IElementState) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ISlateTemplateLayoutState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        capabilities: state.config.capabilities,
        showLegend: state.template.legendVisible,
        showTaskPane: state.template.taskPaneVisible,
        showSelection: state.template.selectionPanelVisible,
        initWarnings: state.initError.warnings
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ISlateTemplateLayoutDispatch> {
    return {
        setElementStates: (states: IElementState) => dispatch(TemplateActions.setElementStates(states))
    };
}

export type SlateLayoutTemplateProps = Partial<ISlateTemplateLayoutState> & Partial<ISlateTemplateLayoutDispatch>;

const SIDEBAR_WIDTH = 250;
const STATUS_BAR_HEIGHT = 18;

export class SlateTemplateLayout extends React.Component<SlateLayoutTemplateProps, any> {
    constructor(props: SlateLayoutTemplateProps) {
        super(props);
        this.state = { isResizing: false };
    }
    private onDragStart = () => {
        this.setState({ isResizing: true });
    }
    private onDragEnd = () => {
        this.setState({ isResizing: false });
    }
    private onSplitterChanged = () => {
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
    private onActivePanelChanged = (id: string) => {
        const { setElementStates } = this.props;
        if (setElementStates) {
            const states: IElementState = {
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
        setCustomTemplateReducer(slateTemplateReducer);
    }
    render(): JSX.Element {
        const { capabilities } = this.props;
        const { isResizing } = this.state;
        let hasStatusBar = false;
        let hasNavigator = false;
        if (capabilities) {
            hasStatusBar = capabilities.hasStatusBar;
            hasNavigator = capabilities.hasNavigator;
        }
        const locale = this.getLocale();
        const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
        const topOffset = (DEFAULT_TOOLBAR_SIZE * 3);
        const panels: IAccordionPanelSpec[] = [
            {
                id: "Legend",
                title: tr("TPL_TITLE_LEGEND", locale),
                contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.Legend}
                            locale={locale}
                            componentProps={{ inlineBaseLayerSwitcher: false }} />
                    </div>;
                }
            },
            {
                id: "Selection",
                title: tr("TPL_TITLE_SELECTION_PANEL", locale),
                contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.SelectionPanel}
                            locale={locale} />
                    </div>;
                }
            },
            {
                id: "TaskPane",
                title: tr("TPL_TITLE_TASKPANE", locale),
                contentRenderer: (dim: IAccordionPanelContentDimensions, isResizing?: boolean) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.TaskPane}
                            locale={locale}
                            componentProps={{ isResizing: isResizing }} />
                    </div>;
                }
            }
        ];
        let activeId;
        const states = [
            { id: "Selection", visible: this.props.showSelection },
            { id: "TaskPane", visible: this.props.showTaskPane },
            { id: "Legend", visible: this.props.showLegend }
        ];
        const active = states.filter(st => st.visible);
        if (active.length == 1) {
            activeId = active[0].id;
        }
        const TB_Z_INDEX = 0;
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }}>
                <SplitterLayout customClassName="slate-splitter" primaryIndex={1} secondaryInitialSize={SIDEBAR_WIDTH} onSecondaryPaneSizeChange={this.onSplitterChanged} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    {(() => {
                        if (this.props.showSelection || this.props.showTaskPane || this.props.showLegend) {
                            return <div>
                                <Accordion style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} onActivePanelChanged={this.onActivePanelChanged} activePanelId={activeId} panels={panels} isResizing={isResizing} />
                            </div>;
                        }
                    })()}
                    <div>
                        <ToolbarContainer id="FileMenu" containerClass="slate-file-menu" containerStyle={{ position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 }} />
                        <ToolbarContainer id="Toolbar" containerClass="slate-toolbar" containerStyle={{ position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 }} />
                        <ToolbarContainer id="ToolbarSecondary" containerClass="slate-toolbar-secondary" containerStyle={{ position: "absolute", left: 0, top: (DEFAULT_TOOLBAR_SIZE * 2), zIndex: TB_Z_INDEX, right: 0 }} />
                        <div style={{ position: "absolute", left: 0, right: 0, top: topOffset, bottom: 0 }}>
                            <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                            {(() => {
                                if (hasNavigator) {
                                    return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                                }
                            })()}
                        </div>
                        <ViewerApiShim />
                    </div>
                </SplitterLayout>
            </div>
            {(() => {
                if (hasStatusBar) {
                    return <div className="slate-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                    </div>;
                }
            })()}
            <ModalLauncher />
            <FlyoutRegionContainer />
            <InitWarningDisplay />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(SlateTemplateLayout);