import * as React from "react";
import { connect } from "react-redux";
import { getLayout } from "../api/registry/layout";
import { IExternalBaseLayer, ReduxDispatch, IApplicationState, ClientKind } from "../api/common";
import { initLayout } from "../actions/init";
import { Error } from "../components/error";
import { tr } from "../api/i18n";

function endsWith(str: string, suffix: string): boolean {
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

export interface IAppState {
    config?: any;
}

export interface IInitAppLayout {
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
}

export interface IAppDispatch {
    initApp?: (args: any) => void;
    initLayout?: (args: IInitAppLayout) => void;
}

function mapStateToProps(state: IApplicationState): IAppState {
    return {
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IAppDispatch {
    return {
        initLayout: (args) => dispatch(initLayout(args))
    };
}

export type AppProps = IAppProps & IAppState & IAppDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
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