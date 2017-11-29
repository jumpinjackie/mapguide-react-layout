import * as React from "react";
import { connect } from "react-redux";
import * as logger from "../utils/logger";
import { getLayout } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IInitErrorReducerState,
    IBranchedMapSubState,
    ClientKind,
    InitError,
    IMapViewer
} from "../api/common";
import { initLayout, IInitAppLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import Auth from "../components/auth";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as TemplateActions from "../actions/template";
import * as AuthActions from "../actions/auth";
import { getAssetRoot } from "../utils/asset";
import { setFusionRoot } from "../api/runtime";

/**
 * App component properties
 *
 * @export
 * @interface IAppProps
 */
export interface IAppProps {
    layout: string;
    /**
     * A session id to init this viewer with
     */
    session?: string;
    isAuth: any;
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
     * Defines initial element visibility
     *
     * @type {{
     *         taskpane: boolean;
     *         legend: boolean;
     *         selection: boolean;
     *     }}
     */
    initialElementVisibility: {
        taskpane: boolean;
        legend: boolean;
        selection: boolean;
    }
    /**
     * A resource id to a Map Definition or Application Definition. If passing a Map Definition,
     * a default viewer layout will be created
     *
     * @type {string}
     */
    resourceId: string;
    /**
     * The base URL for fusion. Used to determine the paths to the PHP backends for servicing tools like buffer/theme/featureinfo/redline/theme/etc
     */
    fusionRoot: string;
    externalBaseLayers?: IExternalBaseLayer[];
    onInit?: (viewer: IMapViewer) => void;
    locale?: string;
}

/**
 * App component state
 *
 * @export
 * @interface IAppState
 */
export interface IAppState {
    error: InitError;
    includeStack: boolean;
    initOptions: any;
    config: IConfigurationReducerState;
    map: IBranchedMapSubState;
    isAuth: any;
}

/**
 * App component action dispatchers
 *
 * @export
 * @interface IAppDispatch
 */
export interface IAppDispatch {
    initLayout: (args: IInitAppLayout) => void;
    setElementVisibility: (states: TemplateActions.IElementState) => void;
    checkUserIsAuthenticated: () => void;
    signIn: (login: string, password: string) => void | undefined;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IAppProps): Partial<IAppState> {
    let map;
    if (state.config.activeMapName) {
        map = state.mapState[state.config.activeMapName];
    }
    return {
        error: state.initError.error,
        includeStack: state.initError.includeStack,
        initOptions: state.initError.options,
        config: state.config,
        map: map,
        isAuth: state.auth.isAuth,
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IAppDispatch> {
    return {
        initLayout: (args) => dispatch(initLayout(args)),
        setElementVisibility: (state) => dispatch(TemplateActions.setElementStates(state)),
        checkUserIsAuthenticated: () => dispatch(AuthActions.checkUserIsAuthenticated()),
        signIn: (login, password) => dispatch(AuthActions.signIn( login, password )),
    };
}

export type AppProps = IAppProps & Partial<IAppState> & Partial<IAppDispatch>;

export class App extends React.Component<any, any> {
    private fnErrorRenderer: (err: Error) => JSX.Element;
    constructor(props: AppProps) {
        super(props);
        this.fnErrorRenderer = this.initErrorRenderer.bind(this);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        const {
            onInit,
            setElementVisibility,
            initialElementVisibility,
            initLayout,
            agent,
            locale,
            session,
            fusionRoot,
            resourceId,
            externalBaseLayers,
            checkUserIsAuthenticated
        } = this.props;

        if(checkUserIsAuthenticated) checkUserIsAuthenticated();

        if (setElementVisibility && initialElementVisibility) {
            const { taskpane, legend, selection } = initialElementVisibility;
            const states: TemplateActions.IElementState = {
                taskPaneVisible: typeof (taskpane) != 'undefined' ? taskpane : true,
                legendVisible: typeof (legend) != 'undefined' ? legend : true,
                selectionPanelVisible: typeof (selection) != 'undefined' ? selection : true
            };
            setElementVisibility(states);
        }
        logger.debug(`Asset root is: ${getAssetRoot()}`);
        if (fusionRoot) {
            setFusionRoot(fusionRoot);
        }
        if (initLayout) {
            initLayout({
                resourceId: resourceId,
                locale: locale,
                externalBaseLayers: externalBaseLayers,
                session: session,
                onInit: onInit
            });
        }
    }
    componentWillReceiveProps(nextProps: AppProps) {
        if (nextProps.map != null && this.props.map != nextProps.map) {
            this.setState({ isLoading: false });
        }
    }
    private renderErrorMessage(err: Error | InitError, locale: string, args: any): JSX.Element {
        const msg = err.message;
        switch (msg) {
            case "MgConnectionFailedException":
                {
                    const arg = { __html: tr("INIT_ERROR_NO_CONNECTION", locale) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgResourceNotFoundException":
                {
                    const arg = { __html: tr("INIT_ERROR_RESOURCE_NOT_FOUND", locale, { resourceId: args.resourceId }) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgSessionExpiredException":
                {
                    const arg = { __html: tr("INIT_ERROR_EXPIRED_SESSION", locale, { sessionId: args.session }) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            default:
                {
                    const arg = { __html: msg };
                    const stack = normalizeStack(err);
                    return <div>
                        <div dangerouslySetInnerHTML={arg} />
                        {(() => {
                            if (this.props.includeStack === true && stack.length > 0) {
                                return <div>
                                    <p>Stack Trace</p>
                                    <ul>
                                        {stack.map((ln, i) => <li key={`stack-line-${i}`}>{ln}</li>)}
                                    </ul>
                                </div>;
                            }
                        })()}
                    </div>;
                }
        }
    }
    private initErrorRenderer(err: Error | InitError): JSX.Element {
        const { config, initOptions } = this.props;
        let locale = config ? (config.locale || DEFAULT_LOCALE) : DEFAULT_LOCALE;
        if (initOptions && initOptions.locale) {
            locale = initOptions.locale;
        }
        //Not showing stack as the error cases are well-defined here and we know where they
        //originate from
        return <div className="pt-callout pt-intent-danger">
            <h5>{tr("INIT_ERROR_TITLE", locale)}</h5>
            {this.renderErrorMessage(err, locale, initOptions || {})}
        </div>;
    }
    render(): JSX.Element {
        const { layout, config, error, map, isAuth, signIn } = this.props;
        const { isLoading } = this.state;
        if (error) {
            return <Error error={error} errorRenderer={this.fnErrorRenderer} />
        } else if(!isAuth) {
            return <Auth signIn={signIn} />
        } else {
            //NOTE: Locale may not have been set at this point, so use default
            const locale = config ? (config.locale || DEFAULT_LOCALE) : DEFAULT_LOCALE;
            if (isLoading) {
                return <div className="pt-non-ideal-state">
                    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                        <div className="pt-spinner pt-large">
                            <div className="pt-spinner-svg-container">
                                <svg viewBox="0 0 100 100">
                                    <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                    <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h4 className="pt-non-ideal-state-title">{tr("INIT", locale)}</h4>
                    <div className="pt-non-ideal-state-description">{tr("INIT_DESC", locale)}</div>
                </div>;
            } else {
                const layoutEl = getLayout(layout);
                if (layoutEl) {
                    return layoutEl();
                } else {
                    return <Error error={tr("ERR_UNREGISTERED_LAYOUT", locale, { layout: layout })} />;
                }
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);