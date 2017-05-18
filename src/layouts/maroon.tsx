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
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IViewerCapabilities,
    getRuntimeMap
} from "../api/common";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../components/accordion";

export interface IMaroonTemplateLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IMaroonTemplateLayoutState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {

    };
}

export type MaroonLayoutTemplateProps = Partial<IMaroonTemplateLayoutState>;

const SIDEBAR_WIDTH = 250;
const TOP_BAR_HEIGHT = 35;
const STATUS_BAR_HEIGHT = 18;
const SIDEBAR_PADDING = 0;
const OUTER_PADDING = 3;

export class MaroonTemplateLayout extends React.Component<MaroonLayoutTemplateProps, any> {
    constructor(props: MaroonLayoutTemplateProps) {
        super(props);
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
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
        const locale = this.getLocale();
        const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
        const topOffset = (DEFAULT_TOOLBAR_SIZE * 2) + OUTER_PADDING;
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
                contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.TaskPane}
                                                 locale={locale} />
                    </div>;
                }
            }
        ];
        return <div style={{ width: "100%", height: "100%" }}>
            <Accordion style={{ position: "absolute", top: OUTER_PADDING, bottom: bottomOffset, right: OUTER_PADDING, width: SIDEBAR_WIDTH }}  panels={panels} />
            <ToolbarContainer id="FileMenu" containerClass="maroon-file-menu" containerStyle={{ position: "absolute", left: OUTER_PADDING, top: OUTER_PADDING, right: SIDEBAR_WIDTH + OUTER_PADDING, zIndex: 100 }} />
            <ToolbarContainer id="Toolbar" containerClass="maroon-toolbar" containerStyle={{ position: "absolute", left: OUTER_PADDING, top: DEFAULT_TOOLBAR_SIZE + OUTER_PADDING, right: SIDEBAR_WIDTH + OUTER_PADDING, zIndex: 100 }} />
            <ToolbarContainer id="ToolbarVertical" containerClass="maroon-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: OUTER_PADDING, top: topOffset, bottom: bottomOffset, zIndex: 100, right: 0 }} />
            <div style={{ position: "absolute", left: OUTER_PADDING + DEFAULT_TOOLBAR_SIZE, right: SIDEBAR_WIDTH + OUTER_PADDING, top: topOffset, bottom: bottomOffset }}>
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
                    return <div className="maroon-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                    </div>;
                }
            })()}
            <ViewerApiShim />
            <ModalLauncher />
            <FlyoutRegionContainer />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaroonTemplateLayout);