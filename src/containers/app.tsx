import * as React from "react";
import { connect } from "react-redux";
import { ClientKind } from "../api/client";
import { IExternalBaseLayer } from "../components/map-viewer-base";
import { initApp } from "../actions/init";
import { DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";

import { PoweredByMapGuide } from "../components/pbmg";

import { MapViewerContainer } from "./map-viewer";
import { LegendContainer } from "./legend";
import { SelectionPanelContainer } from "./selection-panel";
import { NavigatorContainer } from "./navigator";
import { SelectedFeatureCountContainer } from "./selected-feature-count";
import { MouseCoordinatesContainer } from "./mouse-coordinates";
import { TaskPaneContainer } from "./task-pane";
import { ToolbarContainer } from "./toolbar";
import { AjaxViewerShim } from "./ajax-viewer-shim";

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

export interface IAppProps {
    /**
     * Agent configuration 
     * 
     * @type {{
     *         uri: string,
     *         kind?: ClientKind
     *     }}
     */
    agent: {
        uri: string,
        kind?: ClientKind
    },
    /**
     * A resource id to a Map Definition or Application Definition. If passing a Map Definition,
     * a default viewer layout will be created 
     * 
     * @type {string}
     */
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
} 

interface IAppState {

}

interface IAppDispatch {
    initApp?: (args) => void;
}

function mapStateToProps(state): IAppState {
    return {

    };
}

function mapDispatchToProps(dispatch): IAppDispatch {
    return {
        initApp: (args) => dispatch(initApp(args))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<IAppProps & IAppState & IAppDispatch, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { initApp, agent, resourceId, externalBaseLayers } = this.props;
        initApp({
            resourceId: resourceId,
            externalBaseLayers: externalBaseLayers
        });
    }
    render(): JSX.Element {
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
                <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: LEGEND_HEIGHT, overflow: "auto" }}>
                    <LegendContainer />
                </div>
                <div style={{ position: "absolute", left: 0, bottom: 0, right: 0, top: LEGEND_HEIGHT }}>
                    <SelectionPanelContainer />
                </div>
            </div>
            <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, bottom: 0, right: SIDEBAR_WIDTH }}>
                <ToolbarContainer id="main" containerStyle={{ position: "absolute", left: 10, top: 10, height: DEFAULT_TOOLBAR_HEIGHT, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
                <MapViewerContainer />
                <NavigatorContainer style={{ position: "absolute", zIndex: 1000, width: 51, height: 204, cursor: "pointer", right: 10, top: 10 }} />
                <MouseCoordinatesContainer style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
                <SelectedFeatureCountContainer style={{ position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
                <PoweredByMapGuide style={{ position: "absolute", bottom: 0, right: 0, zIndex: 100 }} />
            </div>
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDEBAR_WIDTH }}>
                <TaskPaneContainer />
            </div>
            <AjaxViewerShim />
        </div>;
    }
}