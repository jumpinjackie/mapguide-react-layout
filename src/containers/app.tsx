import * as React from "react";
import { connect } from "react-redux";
import * as logger from "../utils/logger";
import { getLayout } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IBranchedMapSubState,
    ClientKind,
    InitError,
    IMapViewer
} from "../api/common";
import { initLayout, IInitAppLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as TemplateActions from "../actions/template";
import { getAssetRoot } from "../utils/asset";
import { setFusionRoot } from "../api/runtime";
import { IApplicationContext, APPLICATION_CONTEXT_VALIDATION_MAP } from "../components/context";
import { safePropAccess } from '../utils/safe-prop';
import { UrlValueChangeCallback, IAppUrlStateProps, urlPropsQueryConfig } from './url-state';
import { addUrlProps } from 'react-url-query';
import { IElementState } from '../actions/defs';

/**
 * Callback interface for propagating changes to URL state
 */
export interface IAppUrlStateCallback {
    onChangeUrlX: UrlValueChangeCallback;
    onChangeUrlY: UrlValueChangeCallback;
    onChangeUrlScale: UrlValueChangeCallback;
    onChangeUrlSession: UrlValueChangeCallback;
    onChangeUrlMap: UrlValueChangeCallback;
    onChangeUrlShowLayers: UrlValueChangeCallback;
    onChangeUrlHideLayers: UrlValueChangeCallback;
    onChangeUrlShowGroups: UrlValueChangeCallback;
    onChangeUrlHideGroups: UrlValueChangeCallback;
}

export interface SelectionOptions {
    allowHtmlValues?: boolean;
    cleanHtml?: (value: string) => string;
}

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
    /**
     * Settings that control the selection panel (if provided by the template)
     */
    selectionSettings?: SelectionOptions;
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
}

/**
 * App component action dispatchers
 *
 * @export
 * @interface IAppDispatch
 */
export interface IAppDispatch {
    initLayout: (args: IInitAppLayout) => void;
    setElementVisibility: (states: IElementState) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IAppState> {
    let map;
    if (state.config.activeMapName) {
        map = state.mapState[state.config.activeMapName];
    }
    return {
        error: state.initError.error,
        includeStack: state.initError.includeStack,
        initOptions: state.initError.options,
        config: state.config,
        map: map
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IAppDispatch> {
    return {
        initLayout: (args) => dispatch(initLayout(args)),
        setElementVisibility: (state) => dispatch(TemplateActions.setElementStates(state))
    };
}

export type AppProps = IAppProps & Partial<IAppState> & Partial<IAppDispatch> & Partial<IAppUrlStateProps> & Partial<IAppUrlStateCallback>;

export class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    private allowHtmlValuesInSelection(): boolean {
        const { selectionSettings } = this.props;
        if (selectionSettings) {
            return selectionSettings.allowHtmlValues || false;
        }
        return false;
    }
    private getHtmlCleaner(): (value: string) => string {
        const { selectionSettings } = this.props;
        if (selectionSettings && selectionSettings.cleanHtml) {
            return selectionSettings.cleanHtml;
        }
        return v => v;
    }
    static childContextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;
    getChildContext(): IApplicationContext {
        return {
            allowHtmlValuesInSelection: () => this.allowHtmlValuesInSelection(),
            getHTMLCleaner: () => this.getHtmlCleaner()
        }
    }
    componentDidMount() {
        const {
            onInit,
            setElementVisibility,
            initialElementVisibility,
            initLayout,
            locale,
            session,
            fusionRoot,
            resourceId,
            externalBaseLayers,
            urlLocale,
            urlResource,
            urlSession,
            urlX,
            urlY,
            urlScale,
            urlMap,
            urlShowLayers,
            urlHideLayers,
            urlShowGroups,
            urlHideGroups
        } = this.props;
        if (setElementVisibility && initialElementVisibility) {
            const { taskpane, legend, selection } = initialElementVisibility;
            const states: IElementState = {
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
            let amArgs: Partial<IInitAppLayout> | undefined;
            if (urlMap) {
                amArgs = {
                    initialActiveMap: urlMap
                };
            }
            let ivArgs: Partial<IInitAppLayout> | undefined;
            if (urlX && urlY && urlScale) {
                ivArgs = {
                    initialView: {
                        x: urlX,
                        y: urlY,
                        scale: urlScale
                    }
                };
            }
            let slArgs: Partial<IInitAppLayout> | undefined;
            if (urlShowLayers) {
                slArgs = {
                    initialShowLayers: [...urlShowLayers]
                };
            }
            let hlArgs: Partial<IInitAppLayout> | undefined;
            if (urlHideLayers) {
                hlArgs = {
                    initialHideLayers: [...urlHideLayers]
                };
            }
            let sgArgs: Partial<IInitAppLayout> | undefined;
            if (urlShowGroups) {
                sgArgs = {
                    initialShowGroups: [...urlShowGroups]
                };
            }
            let hgArgs: Partial<IInitAppLayout> | undefined;
            if (urlHideGroups) {
                hgArgs = {
                    initialHideGroups: [...urlHideGroups]
                };
            }
            const args: IInitAppLayout = {
                ...{
                    resourceId: urlResource || resourceId,
                    locale: urlLocale || locale || DEFAULT_LOCALE,
                    externalBaseLayers: externalBaseLayers,
                    session: urlSession || session,
                    onInit: onInit
                },
                ...(amArgs || {}),
                ...(ivArgs || {}),
                ...(slArgs || {}),
                ...(hlArgs || {}),
                ...(sgArgs || {}),
                ...(hgArgs || {})
            };
            initLayout(args);
        }
    }
    componentDidUpdate(prevProps: AppProps) {
        const nextProps = this.props;
        if (nextProps.map != null && prevProps.map != nextProps.map) {
            this.setState({ isLoading: false });
        }
        if (nextProps.config && nextProps.config.activeMapName) {
            const am = nextProps.config.activeMapName;
            safePropAccess(nextProps, "onChangeUrlMap", func => func!(am));
        }
        if (nextProps.map) {
            if (nextProps.map.currentView) {
                const { x, y, scale } = nextProps.map.currentView;
                safePropAccess(nextProps, "onChangeUrlX", func => func!(`${x}`));
                safePropAccess(nextProps, "onChangeUrlY", func => func!(`${y}`));
                safePropAccess(nextProps, "onChangeUrlScale", func => func!(`${scale}`));
            }
            if (nextProps.map.runtimeMap) {
                const { showGroups, showLayers, hideGroups, hideLayers } = nextProps.map;
                const sg = [] as string[];
                const hg = [] as string[];
                const sl = [] as string[];
                const hl = [] as string[];
                if (nextProps.map.runtimeMap.Group) {
                    for (const g of nextProps.map.runtimeMap.Group) {
                        if (showGroups.indexOf(g.ObjectId) >= 0) {
                            sg.push(g.Name);
                        } else if (hideGroups.indexOf(g.ObjectId) >= 0) {
                            hg.push(g.Name);
                        }
                    }
                }
                if (nextProps.map.runtimeMap.Layer) {
                    for (const l of nextProps.map.runtimeMap.Layer) {
                        if (showLayers.indexOf(l.ObjectId) >= 0) {
                            sl.push(l.Name);
                        } else if (hideLayers.indexOf(l.ObjectId) >= 0) {
                            hl.push(l.Name);
                        }
                    }
                }
                safePropAccess(nextProps, "onChangeUrlShowGroups", func => func!(sg));
                safePropAccess(nextProps, "onChangeUrlHideGroups", func => func!(hg));
                safePropAccess(nextProps, "onChangeUrlShowLayers", func => func!(sl));
                safePropAccess(nextProps, "onChangeUrlHideLayers", func => func!(hl));
                const { SessionId } = nextProps.map.runtimeMap;
                safePropAccess(nextProps, "onChangeUrlSession", func => func!(SessionId));
            }
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
    private initErrorRenderer = (err: Error | InitError) => {
        const { config, initOptions } = this.props;
        let locale = config ? (config.locale || DEFAULT_LOCALE) : DEFAULT_LOCALE;
        if (initOptions && initOptions.locale) {
            locale = initOptions.locale;
        }
        //Not showing stack as the error cases are well-defined here and we know where they
        //originate from
        return <div className="bp3-callout bp3-intent-danger">
            <h5>{tr("INIT_ERROR_TITLE", locale)}</h5>
            {this.renderErrorMessage(err, locale, initOptions || {})}
        </div>;
    }
    render(): JSX.Element {
        const { layout, config, error } = this.props;
        const { isLoading } = this.state;
        if (error) {
            return <Error error={error} errorRenderer={this.initErrorRenderer} />
        } else {
            //NOTE: Locale may not have been set at this point, so use default
            const locale = config ? (config.locale || DEFAULT_LOCALE) : DEFAULT_LOCALE;
            if (isLoading) {
                return <div className="bp3-non-ideal-state">
                    <div className="bp3-non-ideal-state-visual bp3-non-ideal-state-icon">
                        <div className="bp3-spinner bp3-large">
                            <div className="bp3-spinner-svg-container">
                                <svg viewBox="0 0 100 100">
                                    <path className="bp3-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                    <path className="bp3-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h4 className="bp3-non-ideal-state-title">{tr("INIT", locale)}</h4>
                    <div className="bp3-non-ideal-state-description">{tr("INIT_DESC", locale)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(addUrlProps<App>({ urlPropsQueryConfig })(App));