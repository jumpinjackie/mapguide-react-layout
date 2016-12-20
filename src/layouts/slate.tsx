import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { Toolbar, IItem, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { connect } from "react-redux";
import { tr } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    NOOP,
    ReduxDispatch,
    IApplicationState,
    IMapViewerReducerState,
    IConfigurationReducerState,
    IViewerCapabilities
} from "../api/common";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../components/accordion";

export interface ISlateTemplateLayoutState {
    map?: RuntimeMap | null;
    config?: IConfigurationReducerState;
    capabilities?: IViewerCapabilities;
}

function mapStateToProps(state: IApplicationState): ISlateTemplateLayoutState {
    return {
        config: state.config,
        map: state.map.state,
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type SlateLayoutTemplateProps = ISlateTemplateLayoutState;

const SIDEBAR_WIDTH = 250;
const TOP_BAR_HEIGHT = 35;
const STATUS_BAR_HEIGHT = 18;
const SIDEBAR_PADDING = 3;

@connect(mapStateToProps, mapDispatchToProps)
export class SlateTemplateLayout extends React.Component<SlateLayoutTemplateProps, any> {
    constructor(props: SlateLayoutTemplateProps) {
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
        const topOffset = (TOP_BAR_HEIGHT + (DEFAULT_TOOLBAR_SIZE * 2));
        const panels: IAccordionPanelSpec[] = [
            { 
                id: "Legend",
                title: "Legend",
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
                title: "Selection",
                contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} 
                                              locale={locale} />
                    </div>;
                }
            },
            { 
                id: "TaskPane",
                title: "Task Pane",
                contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                    return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                        <PlaceholderComponent id={DefaultComponentNames.TaskPane} 
                                                 locale={locale} />
                    </div>;
                }
            }
        ];
        return <div style={{ width: "100%", height: "100%" }}>
            <Accordion style={{ position: "absolute", top: 0, bottom: bottomOffset, left: 0, width: SIDEBAR_WIDTH }} panels={panels} />
            <ToolbarContainer id="FileMenu" containerClass="slate-file-menu" containerStyle={{ position: "absolute", left: SIDEBAR_WIDTH, top: ((TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE) / 2), zIndex: 100, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="slate-toolbar" containerStyle={{ position: "absolute", left: SIDEBAR_WIDTH, top: TOP_BAR_HEIGHT, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="ToolbarSecondary" containerClass="slate-toolbar-secondary" containerStyle={{ position: "absolute", left: SIDEBAR_WIDTH, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: 100, right: 0 }} />
            <div style={{ position: "absolute", left: SIDEBAR_WIDTH, right: 0, top: topOffset, bottom: bottomOffset }}>
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
                    return <div className="slate-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                        <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                    </div>;
                }
            })()}
            <AjaxViewerShim />
            <ModalLauncher />
            <FlyoutRegionContainer />
        </div>;
    }
}