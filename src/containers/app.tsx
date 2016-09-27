import * as React from "react";
import { connect } from "react-redux";
import { ClientKind } from "../api/client";
import { getLayout } from "../api/registry/layout";
import { IExternalBaseLayer } from "../components/map-viewer-base";
import { initLayout } from "../actions/init";
import { Error } from "../components/error";
import { tr } from "../api/i18n";

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
    config?: any;
}

interface IAppDispatch {
    initApp?: (args) => void;
    initLayout?: (args) => void;
}

function mapStateToProps(state): IAppState {
    return {
        config: state.config
    };
}

function mapDispatchToProps(dispatch): IAppDispatch {
    return {
        initLayout: (args) => dispatch(initLayout(args))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<IAppProps & IAppState & IAppDispatch, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { initApp, initLayout, agent, resourceId, externalBaseLayers } = this.props;
        if (initLayout) {
            initLayout({
                resourceId: resourceId,
                externalBaseLayers: externalBaseLayers
            });
        }
    }
    render(): JSX.Element {
        const { layout, config } = this.props;
        const layoutEl = getLayout(layout);
        //NOTE: Locale may not have been set at this point, so use default
        const locale = config.locale || "en";
        if (layoutEl) {
            return layoutEl();
        } else {
            return <Error error={tr("ERR_UNREGISTERED_LAYOUT", locale, { layout: layout })} />;
        }
    }
}