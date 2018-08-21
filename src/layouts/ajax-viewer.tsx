import * as React from "react";
import * as Constants from "../constants";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import ToolbarContainer from "../containers/toolbar";
import FlyoutRegionContainer from "../containers/flyout-region";
import ViewerApiShim from "../containers/viewer-shim";
import ModalLauncher from "../containers/modal-launcher";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { connect } from "react-redux";
import {
    getRuntimeMap,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IViewerCapabilities
} from "../api/common";
import InitWarningDisplay from "../containers/init-warning-display";
import SplitterLayout from "react-splitter-layout";
import { DEFAULT_LOCALE, tr } from "../api/i18n";
import * as Runtime from "../api/runtime";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

export interface IAjaxViewerLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
    initTaskPaneWidth: number;
    initInfoPaneWidth: number;
    initWarnings: string[];
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IAjaxViewerLayoutState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        capabilities: state.config.capabilities,
        initWarnings: state.initError.warnings,
        initInfoPaneWidth: state.template.initialInfoPaneWidth,
        initTaskPaneWidth: state.template.initialTaskPaneWidth
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {

    };
}

export type AjaxViewerLayoutProps = Partial<IAjaxViewerLayoutState>;

export class AjaxViewerLayout extends React.Component<AjaxViewerLayoutProps, any> {
    constructor(props: AjaxViewerLayoutProps) {
        super(props);
        this.state = { isResizing: false };
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
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
    render(): JSX.Element {
        const { capabilities, initInfoPaneWidth, initTaskPaneWidth } = this.props;
        const { isResizing } = this.state;
        let hasToolbar = false;
        let hasTaskPane = false;
        let hasTaskBar = false;
        let hasStatusBar = false;
        let hasNavigator = false;
        let hasSelectionPanel = false;
        let hasLegend = false;
        let hasViewSize = false;
        if (capabilities) {
            hasToolbar = capabilities.hasToolbar;
            hasTaskPane = capabilities.hasTaskPane;
            hasTaskBar = capabilities.hasTaskBar;
            hasStatusBar = capabilities.hasStatusBar;
            hasNavigator = capabilities.hasNavigator;
            hasSelectionPanel = capabilities.hasSelectionPanel;
            hasLegend = capabilities.hasLegend;
            hasViewSize = capabilities.hasViewSize;
        }
        const locale = this.getLocale();
        const TB_Z_INDEX = 10;
        const topOffset = hasToolbar ? DEFAULT_TOOLBAR_SIZE : 0;
        const bottomOffset = hasStatusBar ? 20 : 0;
        let sbWidth = initInfoPaneWidth || SIDEBAR_WIDTH;
        let tpWidth = initTaskPaneWidth || SIDEBAR_WIDTH;
        const lgStyle = {};
        const selStyle = {};
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: bottomOffset }}>
                <SplitterLayout customClassName="ajax-viewer-splitter" primaryIndex={0} secondaryInitialSize={tpWidth} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    <div>
                        {(() => {
                            if (hasToolbar) {
                                return <ToolbarContainer id={Constants.WEBLAYOUT_TOOLBAR} containerStyle={{ position: "absolute", left: 0, top: 0, right: 0, zIndex: TB_Z_INDEX, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />;
                            }
                        })()}
                        <div style={{ position: "absolute", left: 0, top: topOffset, bottom: 0, right: 0 }}>
                            <SplitterLayout customClassName="ajax-viewer-splitter" primaryIndex={1} secondaryInitialSize={sbWidth} onSecondaryPaneSizeChange={this.onSplitterChanged}>
                                {(() => {
                                    if (hasLegend || hasSelectionPanel) {
                                        return <SplitterLayout customClassName="ajax-viewer-splitter" vertical={true} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                                            {(() => {
                                                if (hasLegend) {
                                                    return <div className="ajax-sidebar-panel" style={lgStyle}>
                                                        <div className="ajax-sidebar-panel-heading">
                                                            <p>{tr("TPL_TITLE_LEGEND", locale)}</p>
                                                        </div>
                                                        <div className="ajax-sidebar-panel-body">
                                                            <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={{ inlineBaseLayerSwitcher: true }} />
                                                        </div>
                                                    </div>;
                                                }
                                            })()}
                                            {(() => {
                                                if (hasSelectionPanel) {
                                                    return <div className="ajax-sidebar-panel" style={selStyle}>
                                                        <div className="ajax-sidebar-panel-heading">
                                                            <p>{tr("TPL_TITLE_SELECTION_PANEL", locale)}</p>
                                                        </div>
                                                        <div className="ajax-sidebar-panel-body">
                                                            <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                                                        </div>
                                                    </div>;
                                                }
                                            })()}
                                        </SplitterLayout>;
                                    }
                                })()}
                                <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
                                    <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                                    {(() => {
                                        if (hasNavigator) {
                                            return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                                        }
                                    })()}
                                </div>
                            </SplitterLayout>
                        </div>
                    </div>
                    {(() => {
                        if (hasTaskPane) {
                            return <PlaceholderComponent locale={locale} id={DefaultComponentNames.TaskPane} componentProps={{ isResizing: isResizing }} />;
                        }
                    })()}
                </SplitterLayout>
            </div>
            {(() => {
                if (hasStatusBar) {
                    return <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: bottomOffset, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
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

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(AjaxViewerLayout);