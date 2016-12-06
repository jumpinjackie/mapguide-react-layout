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

const SIDEBAR_WIDTH = 250;
const TOP_BAR_HEIGHT = 35;

export interface ITurquoiseYellowTemplateLayoutState {
    map?: RuntimeMap | null;
    config?: IConfigurationReducerState;
    capabilities?: IViewerCapabilities;
}

function mapStateToProps(state: IApplicationState): ITurquoiseYellowTemplateLayoutState {
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

export type TurquoiseYellowLayoutTemplateProps = any;

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
        const locale = this.getLocale();
        const sbWidth = SIDEBAR_WIDTH;
        const tabPanelStyle: React.CSSProperties = {
            position: "absolute",
            top: TOP_BAR_HEIGHT,
            left: 0,
            right: 0,
            bottom: 0
        };
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: TOP_BAR_HEIGHT, bottom: 0, width: sbWidth }}>
                <Tabs>
                    <TabList>
                        <Tab>Tasks</Tab>
                        <Tab>Legend</Tab>
                        <Tab>Selection</Tab>
                    </TabList>
                    <TabPanel>
                        <div style={tabPanelStyle}>
                            <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div style={tabPanelStyle}>
                            <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div style={tabPanelStyle}>
                            <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <ToolbarContainer id="FileMenu" containerClass="turquoise-yellow-file-menu" containerStyle={{ position: "absolute", left: sbWidth, top: 0, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="Toolbar" containerClass="turquoise-yellow-toolbar" containerStyle={{ position: "absolute", left: sbWidth, top: TOP_BAR_HEIGHT, zIndex: 100, right: 0 }} />
            <ToolbarContainer id="ToolbarVertical" containerClass="turquoise-yellow-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: sbWidth, top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), zIndex: 100, bottom: 0 }} />
            <div style={{ position: "absolute", left: (sbWidth + DEFAULT_TOOLBAR_SIZE), top: (TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE), bottom: 0, right: 0 }}>
                {(() => {
                    //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                    //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                    //call to fix
                    if (this.props.map != null) {
                        return <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
                    }
                })()}
            </div>
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
            <AjaxViewerShim />
            <ModalLauncher />
            <FlyoutRegionContainer />
        </div>;
    }
}