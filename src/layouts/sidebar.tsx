import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { AjaxViewerShim } from "../containers/ajax-viewer-shim";
import { connect } from "react-redux";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

const NAVIGATOR_PROPS = {
    style: { position: "absolute", zIndex: 1000, width: 51, height: 204, cursor: "pointer", right: 10, top: 10 }
};
const MOUSE_COORDINATE_PROPS = {
    style: { position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SCALE_DISPLAY_PROPS = {
    style: { position: "absolute", bottom: 0, right: 340, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const SELECTED_FEATURE_COUNT_PROPS = {
    style: { position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }
};
const PBMG_PROPS = {
    style: { position: "absolute", bottom: 0, right: 0, zIndex: 100 }
};

interface ISidebarProps {
    position: "left" | "right"
}

const SidebarHeader = (props) => {
    const sbHeaderStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        right: 0,
        height: 40,
        left: 0,
        margin: 0
    };
    sbHeaderStyle.paddingLeft = 10;
    return <h1 style={sbHeaderStyle} className="sidebar-header">
        {props.text}
        <span className="sidebar-close" onClick={props.onCloseClick}><i className="fa fa-caret-left"></i></span>
    </h1>;
};

class Sidebar extends React.Component<any, any> {
    private fnClickCollapse: (e) => void;
    private fnActivateTasks: (e) => void;
    private fnActivateLegend: (e) => void;
    private fnActivateSelection: (e) => void;
    constructor(props) {
        super(props);
        this.fnClickCollapse = this.onClickCollapse.bind(this);
        this.fnActivateTasks = this.onActivateTasks.bind(this);
        this.fnActivateLegend = this.onActivateLegend.bind(this);
        this.fnActivateSelection = this.onActivateSelection.bind(this);
        this.state = {
            collapsed: false,
            activeTab: "tasks"
        };
    }
    onActivateTasks(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "tasks"
        });
        return false;
    }
    onActivateLegend(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "legend"
        });
        return false;
    }
    onActivateSelection(e) {
        e.preventDefault();
        this.setState({
            collapsed: false,
            activeTab: "selection"
        });
        return false;
    }
    onClickCollapse(e) {
        this.setState({
            collapsed: true
        });
    }
    render(): JSX.Element {
        const { position } = this.props;
        const { collapsed, activeTab } = this.state;
        
        return <div className={`sidebar ${collapsed ? "collapsed" : ""} sidebar-${position}`}>
            <div className="sidebar-tabs">
                <ul role="tablist">
                    <li><a onClick={this.fnActivateTasks} role="tab"><i className="fa fa-bars"></i></a></li>
                    <li><a onClick={this.fnActivateLegend} role="tab"><i className="fa fa-user"></i></a></li>
                    <li><a onClick={this.fnActivateSelection} role="tab"><i className="fa fa-envelope"></i></a></li>
                </ul>
                <div id="toolbar-region">
                    <ToolbarContainer id="main" vertical={true} containerStyle={{ position: "absolute", left: 5, right: 6, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
                </div>
            </div>
            <div className="sidebar-content">
                <div className={`sidebar-pane ${activeTab == "tasks" ? "active" : ""}`}>
                    <SidebarHeader text="Task Pane" onCloseClick={this.fnClickCollapse} />
                    <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.TaskPane} />
                    </div>
                </div>
                <div className={`sidebar-pane ${activeTab == "legend" ? "active" : ""}`}>
                    <SidebarHeader text="Legend" onCloseClick={this.fnClickCollapse} />
                    <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.Legend} />
                    </div>
                </div>
                <div className={`sidebar-pane ${activeTab == "selection" ? "active" : ""}`}>
                    <SidebarHeader text="Selection" onCloseClick={this.fnClickCollapse} />
                    <div style={{ position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} />
                    </div>
                </div>
            </div>
        </div>;
    }
}

interface ISidebarLayoutState {
    capabilities?: any;
}

function mapStateToProps(state): ISidebarLayoutState {
    return {
        capabilities: state.config.capabilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

type SidebarLayoutProps = ISidebarLayoutState;

@connect(mapStateToProps, mapDispatchToProps)
export class SidebarLayout extends React.Component<SidebarLayoutProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const {
            hasTaskPane,
            hasTaskBar,
            hasStatusBar,
            hasNavigator,
            hasSelectionPanel,
            hasLegend,
            hasToolbar
        } = this.props.capabilities;
        let sbWidth = SIDEBAR_WIDTH;
        let tpWidth = SIDEBAR_WIDTH;
        return <div style={{ width: "100%", height: "100%" }}>
            <Sidebar position="left" />
            <PlaceholderComponent id={DefaultComponentNames.Map} />
            <AjaxViewerShim />
            <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} componentProps={PBMG_PROPS} />
        </div>;
    }
}