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
import { Tabs, TabList, Tab, TabPanel } from "@blueprintjs/core";
import assign = require("object-assign");

const SIDEBAR_WIDTH = 250;
const SIDEBAR_PADDING = 0;
const TOP_BAR_HEIGHT = 35;
const TAB_BAR_HEIGHT = 30;
const STATUS_BAR_HEIGHT = 18;

export interface ILimeGoldTemplateLayoutState {
    map?: RuntimeMap | null;
    config?: IConfigurationReducerState;
    capabilities?: IViewerCapabilities;
}

function mapStateToProps(state: IApplicationState): ILimeGoldTemplateLayoutState {
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

export type LimeGoldLayoutTemplateProps = ILimeGoldTemplateLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class LimeGoldLayoutTemplate extends React.Component<LimeGoldLayoutTemplateProps, any> {
    constructor(props: LimeGoldLayoutTemplateProps) {
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
        const topOffset = (TOP_BAR_HEIGHT + (DEFAULT_TOOLBAR_SIZE * 2));
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
            <ToolbarContainer id="FileMenu" containerClass="limegold-file-menu" containerStyle={{ position: "absolute", left: 0, top: ((TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE) / 2), zIndex: 100, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="limegold-toolbar" containerStyle={{ position: "absolute", left: 0, top: TOP_BAR_HEIGHT, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="ToolbarSecondary" containerClass="limegold-toolbar-secondary" containerStyle={{ position: "absolute", left: 0, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: 100, right: 0 }} />
            <div style={{ position: "absolute", left: 0, top: topOffset, bottom: (bottomOffset + SIDEBAR_PADDING), right: sbWidth }}>
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
            <div className="limegold-sidebar" style={{ position: "absolute", right: SIDEBAR_PADDING, top: topOffset, bottom: (bottomOffset + SIDEBAR_PADDING), width: (sbWidth - (SIDEBAR_PADDING * 2)) }}>
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
                            return <TabPanel>
                                <div style={assign(tabPanelStyle, { overflow: "auto" })}>
                                    <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} />
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
            {(() => {
                if (hasStatusBar) {
                    return <div className="limegold-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
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