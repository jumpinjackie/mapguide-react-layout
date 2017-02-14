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
    IConfigurationReducerState,
    IViewerCapabilities,
    getRuntimeMap
} from "../api/common";
import { Tabs, TabList, Tab, TabPanel } from "@blueprintjs/core";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_PADDING = 3;
const TOP_BAR_HEIGHT = 35;
const TAB_BAR_HEIGHT = 30;
const STATUS_BAR_HEIGHT = 18;

export interface ITurquoiseYellowTemplateLayoutState {
    map: RuntimeMap;
    config: IConfigurationReducerState;
    capabilities: IViewerCapabilities;
}

function mapStateToProps(state: IApplicationState): Partial<ITurquoiseYellowTemplateLayoutState> {
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

export type TurquoiseYellowLayoutTemplateProps = Partial<ITurquoiseYellowTemplateLayoutState>;

@connect(mapStateToProps, mapDispatchToProps)
export class TurquoiseYellowLayoutTemplate extends React.Component<TurquoiseYellowLayoutTemplateProps, any> {
    constructor(props: TurquoiseYellowLayoutTemplateProps) {
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
        return <div style={{ width: "100%", height: "100%" }}>
            <div className="turquoise-yellow-sidebar" style={{ position: "absolute", left: SIDEBAR_PADDING, top: TOP_BAR_HEIGHT, bottom: (bottomOffset + SIDEBAR_PADDING), width: (sbWidth - (SIDEBAR_PADDING * 2)) }}>
                <Tabs>
                    <TabList>
                        {(() => {
                            if (hasTaskPane) {
                                return <Tab>Tasks</Tab>;
                            }
                        })()}
                        {(() => {
                            if (hasLegend) {
                                return <Tab>Legend</Tab>;
                            }
                        })()}
                        {(() => {
                            if (hasSelectionPanel) {
                                return <Tab>Selection</Tab>;
                            }
                        })()}
                    </TabList>
                    {(() => {
                        if (hasTaskPane) {
                            return <TabPanel>
                                <div style={tabPanelStyle}>
                                    <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} />
                                </div>
                            </TabPanel>;
                        }
                    })()}
                    {(() => {
                        if (hasLegend) {
                            const p1 = { overflow: "auto" };
                            return <TabPanel>
                                <div style={{ ...tabPanelStyle, ...p1 }}>
                                    <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={{ inlineBaseLayerSwitcher: false }} />
                                </div>
                            </TabPanel>;
                        }
                    })()}
                    {(() => {
                        if (hasSelectionPanel) {
                            return <TabPanel>
                                <div style={tabPanelStyle}>
                                    <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                                </div>
                            </TabPanel>;
                        }
                    })()}
                </Tabs>
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