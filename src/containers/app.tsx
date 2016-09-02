import * as React from "react";
import { connect } from "react-redux";
import { ClientKind } from "../api/client";
import { getLayout } from "../api/registry/layout";
import { IExternalBaseLayer } from "../components/map-viewer-base";
import { initWebLayout } from "../actions/init";

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export interface IAppProps {
    layout: string;
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
    initWebLayout?: (args) => void;
}

function mapStateToProps(state): IAppState {
    return {

    };
}

function mapDispatchToProps(dispatch): IAppDispatch {
    return {
        initWebLayout: (args) => dispatch(initWebLayout(args))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<IAppProps & IAppState & IAppDispatch, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { initApp, initWebLayout, agent, resourceId, externalBaseLayers } = this.props;
        if (endsWith(resourceId, "WebLayout")) {
            initWebLayout({
                resourceId: resourceId,
                externalBaseLayers: externalBaseLayers
            });
        }
    }
    render(): JSX.Element {
        const { layout } = this.props;
        const layoutEl = getLayout(layout);
        if (layoutEl) {
            return layoutEl();
        } else {
            return <div>ERROR: No layout named ({layout}) registered</div>;
        }
    }
}