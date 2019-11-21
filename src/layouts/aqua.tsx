import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import ToolbarContainer from "../containers/toolbar";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import FlyoutRegionContainer from "../containers/flyout-region";
import { RndModalDialog } from "../components/modal-dialog";
import { connect } from "react-redux";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    ITemplateReducerState,
    IViewerCapabilities,
    getRuntimeMap
} from "../api/common";
import * as TemplateActions from "../actions/template";
import { setCustomTemplateReducer } from "../reducers/template";
import InitWarningDisplay from "../containers/init-warning-display";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

function aquaTemplateReducer(state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
    switch (action.type) {
        case ActionType.FUSION_SET_LEGEND_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { legendVisible: data };
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { selectionPanelVisible: data };
                    return { ...state, ...state1 };
                }
            }
        case ActionType.TASK_INVOKE_URL:
            {
                let state1: Partial<ITemplateReducerState> = { taskPaneVisible: true };
                return { ...state, ...state1 };
            }
        case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { taskPaneVisible: data };
                    return { ...state, ...state1 };
                }
            }
    }
    return state;
}

const SIDEBAR_WIDTH = 250;
const SELECTION_DIALOG_HEIGHT = 300;
const LEGEND_DIALOG_HEIGHT = 400;
const TASK_DIALOG_HEIGHT = 500;
const STATUS_BAR_HEIGHT = 18;

export interface IAquaTemplateLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
    lastAction: any;
    showTaskPane: boolean;
    showSelection: boolean;
    showLegend: boolean;
}

export interface IAquaTemplateDispatch {
    hideTaskPane: () => void;
    hideLegend: () => void;
    hideSelection: () => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IAquaTemplateLayoutState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        capabilities: state.config.capabilities,
        lastAction: state.lastaction,
        showLegend: state.template.legendVisible,
        showSelection: state.template.selectionPanelVisible,
        showTaskPane: state.template.taskPaneVisible
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IAquaTemplateDispatch> {
    return {
        hideLegend: () => dispatch(TemplateActions.setLegendVisibility(false)),
        hideSelection: () => dispatch(TemplateActions.setSelectionPanelVisibility(false)),
        hideTaskPane: () => dispatch(TemplateActions.setTaskPaneVisibility(false))
    };
}

export type AquaTemplateLayoutProps = Partial<IAquaTemplateLayoutState> & Partial<IAquaTemplateDispatch>;

export class AquaTemplateLayout extends React.Component<AquaTemplateLayoutProps, any> {
    constructor(props: AquaTemplateLayoutProps) {
        super(props);
        this.state = {};
    }
    private onHideTaskPane = () => {
        const { hideTaskPane } = this.props;
        if (hideTaskPane) {
            hideTaskPane();
        }
    }
    private onHideLegend = () => {
        const { hideLegend } = this.props;
        if (hideLegend) {
            hideLegend();
        }
    }
    private onHideSelection = () => {
        const { hideSelection } = this.props;
        if (hideSelection) {
            hideSelection();
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    componentDidMount() {
        setCustomTemplateReducer(aquaTemplateReducer);
    }
    componentDidUpdate(prevProps: AquaTemplateLayoutProps) {
        const nextProps = this.props;
        const lastAction = nextProps.lastAction;
        if (lastAction != prevProps.lastAction) {
            switch (lastAction.type) {
                case ActionType.TASK_INVOKE_URL:
                    {
                        this.setState({
                            isTaskPaneOpen: true
                        });
                    }
                    break;
                case ActionType.MAP_SET_SELECTION:
                    break;
            }
        }
    }
    render(): JSX.Element {
        const { capabilities, showLegend, showSelection, showTaskPane } = this.props;
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
        const locale = this.getLocale();
        const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
        let left = DEFAULT_TOOLBAR_SIZE;
        let right = 0;
        /*
        if (hasLegend || hasSelectionPanel) {
            left = sbWidth;
        }
        if (hasTaskPane) {
            right = tpWidth;
        }*/
        const TB_Z_INDEX = 0;
        return <div style={{ width: "100%", height: "100%" }}>
            <ToolbarContainer id="FileMenu" containerClass="aqua-file-menu" containerStyle={{ position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="aqua-toolbar" containerStyle={{ position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, height: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 }} />
            <ToolbarContainer id="ToolbarVertical" containerClass="aqua-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: 0, top: ((DEFAULT_TOOLBAR_SIZE * 2) - 1), zIndex: TB_Z_INDEX, bottom: bottomOffset }} />
            <div style={{ position: "absolute", left: left, top: (DEFAULT_TOOLBAR_SIZE * 2), bottom: bottomOffset, right: right }}>
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
                    return <div className="aqua-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                    </div>;
                }
            })()}
            <ViewerApiShim />
            <ModalLauncher>
                {(() => {
                    if (hasSelectionPanel) {
                        return <RndModalDialog
                            icon="th"
                            isOpen={!!showSelection}
                            onClose={this.onHideSelection}
                            title={tr("TPL_TITLE_SELECTION_PANEL", locale)}
                            x={40}
                            y={500}
                            width={SIDEBAR_WIDTH}
                            height={SELECTION_DIALOG_HEIGHT}
                            disableYOverflow={true}
                            enableInteractionMask={true}>
                            {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.SelectionPanel} componentProps={{ maxHeight: h }} />}
                        </RndModalDialog>
                    }
                })()}
                {(() => {
                    if (hasLegend) {
                        return <RndModalDialog
                            icon="layers"
                            isOpen={!!showLegend}
                            onClose={this.onHideLegend}
                            title={tr("TPL_TITLE_LEGEND", locale)}
                            x={40}
                            y={70}
                            width={SIDEBAR_WIDTH}
                            height={LEGEND_DIALOG_HEIGHT}
                            enableInteractionMask={true}>
                            {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.Legend} componentProps={{ inlineBaseLayerSwitcher: false, maxHeight: h }} />}
                        </RndModalDialog>
                    }
                })()}
                {(() => {
                    if (hasTaskPane) {
                        return <RndModalDialog
                            icon="application"
                            isOpen={!!showTaskPane}
                            onClose={this.onHideTaskPane}
                            width={SIDEBAR_WIDTH}
                            height={TASK_DIALOG_HEIGHT}
                            title={tr("TPL_TITLE_TASKPANE", locale)}
                            x={document.body.clientWidth - SIDEBAR_WIDTH - 70}
                            y={80}
                            disableYOverflow={true}
                            enableInteractionMask={false}>
                            {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.TaskPane} componentProps={{ maxHeight: h - 15 /* some height breathing space */ }} />}
                        </RndModalDialog>;
                    }
                })()}
            </ModalLauncher>
            <FlyoutRegionContainer />
            <InitWarningDisplay />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(AquaTemplateLayout);