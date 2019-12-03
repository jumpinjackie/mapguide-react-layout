import * as React from "react";
import { useDispatch } from "react-redux";
import * as logger from "../utils/logger";
import { getLayout } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    IBranchedMapSubState,
    ClientKind,
    InitError,
    IMapViewer
} from "../api/common";
import * as InitActions from "../actions/init";
import { IInitAppLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as TemplateActions from "../actions/template";
import { getAssetRoot } from "../utils/asset";
import { setFusionRoot } from "../api/runtime";
import { AppContext } from "../components/context";
import { UrlValueChangeCallback, IAppUrlStateProps, urlPropsQueryConfig } from './url-state';
import { addUrlProps } from 'react-url-query';
import { IElementState } from '../actions/defs';
import { NonIdealState, Spinner, Intent, Callout } from '@blueprintjs/core';
import { useInitError, useInitErrorStack, useInitErrorOptions, useViewerLocale, useActiveMapBranch, useActiveMapName } from './hooks';

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
    error: InitError | undefined;
    includeStack: boolean;
    initOptions: any;
    //config: IConfigurationReducerState;
    configuredLocale: string;
    map: IBranchedMapSubState | undefined;
    activeMapName: string | undefined;
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

type AppInnerProps = IAppProps & IAppState & IAppDispatch & Partial<IAppUrlStateProps> & Partial<IAppUrlStateCallback>;

class AppInner extends React.Component<AppInnerProps, any> {
    constructor(props: AppInnerProps) {
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
    componentDidUpdate(prevProps: AppInnerProps) {
        const nextProps = this.props;
        if (nextProps.map != null && prevProps.map != nextProps.map) {
            this.setState({ isLoading: false });
        }
        if (nextProps.activeMapName) {
            const am = nextProps.activeMapName;
            nextProps.onChangeUrlMap?.(am);
        }
        if (nextProps.map) {
            if (nextProps.map.currentView) {
                const { x, y, scale } = nextProps.map.currentView;
                nextProps.onChangeUrlX?.(`${x}`);
                nextProps.onChangeUrlY?.(`${y}`);
                nextProps.onChangeUrlScale?.(`${scale}`);
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
                nextProps.onChangeUrlShowGroups?.(sg);
                nextProps.onChangeUrlHideGroups?.(hg);
                nextProps.onChangeUrlShowLayers?.(sl);
                nextProps.onChangeUrlHideLayers?.(hl);
                const { SessionId } = nextProps.map.runtimeMap;
                nextProps.onChangeUrlSession?.(SessionId);
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
        const { configuredLocale, initOptions } = this.props;
        let locale = configuredLocale;
        if (initOptions && initOptions.locale) {
            locale = initOptions.locale;
        }
        //Not showing stack as the error cases are well-defined here and we know where they
        //originate from
        return <Callout intent={Intent.DANGER} title={tr("INIT_ERROR_TITLE", locale)} icon="error">
            {this.renderErrorMessage(err, locale, initOptions || {})}
        </Callout>;
    }
    render(): JSX.Element {
        const { layout, configuredLocale, error } = this.props;
        const { isLoading } = this.state;
        if (error) {
            return <Error error={error} errorRenderer={this.initErrorRenderer} />
        } else {
            //NOTE: Locale may not have been set at this point, so use default
            const locale = configuredLocale;
            if (isLoading) {
                return <NonIdealState 
                    icon={<Spinner intent={Intent.NONE} size={Spinner.SIZE_LARGE} />}
                    title={tr("INIT", locale)}
                    description={tr("INIT_DESC", locale)} />;
            } else {
                const layoutEl = getLayout(layout);
                if (layoutEl) {
                    const providerImpl = {
                        allowHtmlValuesInSelection: () => this.allowHtmlValuesInSelection(),
                        getHTMLCleaner: () => this.getHtmlCleaner()
                    };
                    return <AppContext.Provider value={providerImpl}>
                        {layoutEl()}
                    </AppContext.Provider>
                } else {
                    return <Error error={tr("ERR_UNREGISTERED_LAYOUT", locale, { layout: layout })} />;
                }
            }
        }
    }
}

const App = (props: IAppProps) => {
    const error = useInitError();
    const includeStack = useInitErrorStack();
    const initOptions = useInitErrorOptions();
    const configuredLocale = useViewerLocale();
    const map = useActiveMapBranch();
    const activeMapName = useActiveMapName();

    const dispatch = useDispatch();
    const initLayout = (args: InitActions.IInitAppLayout) => dispatch(InitActions.initLayout(args));
    const setElementVisibility = (state: IElementState) => dispatch(TemplateActions.setElementStates(state));

    return <AppInner error={error}
        includeStack={includeStack}
        initOptions={initOptions}
        configuredLocale={configuredLocale}
        map={map}
        activeMapName={activeMapName}
        initLayout={initLayout}
        setElementVisibility={setElementVisibility}
        {...props} />;
}

export default addUrlProps<React.ComponentClass<IAppProps>>({ urlPropsQueryConfig })(App);