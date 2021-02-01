import * as React from "react";
import { useDispatch } from "react-redux";
import { getLayout } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    IBranchedMapSubState,
    ClientKind,
    InitError,
    IMapViewer
} from "../api/common";
import { IInitAppLayout, initLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { getAssetRoot } from "../utils/asset";
import { setFusionRoot } from "../api/runtime";
import { AppContext } from "../components/context";
import { IElementState } from '../actions/defs';
import { NonIdealState, Spinner, Intent, Callout } from '@blueprintjs/core';
import { useInitError, useInitErrorStack, useInitErrorOptions, useViewerLocale, useActiveMapBranch, useActiveMapName, useViewerFeatureTooltipsEnabled } from './hooks';
import { getStateFromUrl, IAppUrlState, updateUrl } from './url-state';
import { debug } from '../utils/logger';
import { setElementStates } from '../actions/template';
import { IViewerInitCommand } from '../actions/init-command';
import { ApplicationDefinition } from '../api/contracts/fusion';

export interface SelectionOptions {
    allowHtmlValues?: boolean;
    cleanHtml?: (value: string) => string;
}

/**
 * MapGuide-specific application options
 *
 * @export
 * @interface IMapGuideAppProps
 * @since 0.14
 */
export interface IMapGuideAppProps {
    /**
     * A session id to init this viewer with
     */
    session?: string;
    /**
     * The mapagent URI
     *
     * @type {string}
     * @memberof IMapGuideAppProps
     */
    agentUri: string;
    /**
     * The agent kind
     *
     * @type {ClientKind}
     * @memberof IMapGuideAppProps
     */
    agentKind?: ClientKind;
    /**
     * The base URL for fusion. Used to determine the paths to the PHP backends for servicing tools like buffer/theme/featureinfo/redline/theme/etc
     */
    fusionRoot: string;
    /**
     * Settings that control the selection panel (if provided by the template)
     */
    selectionSettings?: SelectionOptions;
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
}

/**
 * App component properties
 *
 * @export
 * @interface IAppProps
 */
export interface IAppProps {
    /**
     * The command that will carry out viewer initialization
     *
     * @type {IViewerInitCommand}
     * @memberof IAppProps
     * @since 0.14
     */
    initCommand: IViewerInitCommand;
    layout: string | (() => React.ReactNode);
    /**
     * A resource id to a Map Definition or Application Definition or a function that will fetch the required Application Definition. 
     * 
     * MapGuide-only: If passing a Map Definition, a default viewer layout will be created
     *
     * @memberof IAppProps
     */
    resourceId: string | (() => Promise<ApplicationDefinition>);
    /**
     * The list of external base layers
     *
     * @type {IExternalBaseLayer[]}
     * @memberof IAppProps
     */
    externalBaseLayers?: IExternalBaseLayer[];
    /**
     * If specified, tells the application to not sync the following URL params to the URL, and to skip
     * reading these params when initializing/refreshing.
     *
     * @type {string[]}
     * @memberof IAppProps
     * @since 0.14
     */
    urlPropsIgnore?: string[];
    onInit?: (viewer: IMapViewer) => void;
    locale?: string;
    /**
     * MapGuide-specific options
     *
     * @type {IMapGuideAppProps}
     * @memberof IAppProps
     * @since 0.14
     */
    mapguide?: IMapGuideAppProps;
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
    featureTooltipsEnabled: boolean;
}

/**
 * App component action dispatchers
 *
 * @export
 * @interface IAppDispatch
 */
export interface IAppDispatch {
    initLayout: (cmd: IViewerInitCommand, args: IInitAppLayout) => void;
    setElementVisibility: (states: IElementState) => void;
}

type AppInnerProps = IAppProps & IAppState & IAppDispatch;

class AppInner extends React.Component<AppInnerProps, any> {
    constructor(props: AppInnerProps) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    private allowHtmlValuesInSelection(): boolean {
        return this.props.mapguide?.selectionSettings?.allowHtmlValues ?? false;
    }
    private getHtmlCleaner(): (value: string) => string {
        return this.props.mapguide?.selectionSettings?.cleanHtml ?? (v => v);
    }
    componentDidMount() {
        const {
            onInit,
            setElementVisibility,
            mapguide,
            initLayout,
            locale,
            resourceId,
            externalBaseLayers,
            initCommand
        } = this.props;
        const {
            locale: urlLocale,
            resource: urlResource,
            session: urlSession,
            x: urlX,
            y: urlY,
            ft: urlFeatureTooltip,
            scale: urlScale,
            map: urlMap,
            sl: urlShowLayers,
            hl: urlHideLayers,
            sg: urlShowGroups,
            hg: urlHideGroups
        } = getStateFromUrl(this.props.urlPropsIgnore);
        if (setElementVisibility && mapguide?.initialElementVisibility) {
            const { taskpane, legend, selection } = mapguide.initialElementVisibility;
            const states: IElementState = {
                taskPaneVisible: typeof (taskpane) != 'undefined' ? taskpane : true,
                legendVisible: typeof (legend) != 'undefined' ? legend : true,
                selectionPanelVisible: typeof (selection) != 'undefined' ? selection : true
            };
            setElementVisibility(states);
        }
        debug(`Asset root is: ${getAssetRoot()}`);
        if (mapguide?.fusionRoot) {
            setFusionRoot(mapguide.fusionRoot);
        }
        if (initLayout) {
            let ftArgs: Partial<IInitAppLayout> | undefined;
            if (typeof (urlFeatureTooltip) != 'undefined') {
                ftArgs = {
                    featureTooltipsEnabled: urlFeatureTooltip
                }
            }
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
                    resourceId: urlResource ?? resourceId,
                    locale: urlLocale ?? locale ?? DEFAULT_LOCALE,
                    externalBaseLayers: externalBaseLayers,
                    session: urlSession ?? mapguide?.session,
                    onInit: onInit
                },
                ...(ftArgs ?? {}),
                ...(amArgs ?? {}),
                ...(ivArgs ?? {}),
                ...(slArgs ?? {}),
                ...(hlArgs ?? {}),
                ...(sgArgs ?? {}),
                ...(hgArgs ?? {})
            };
            initLayout(initCommand, args);
        }
    }
    componentDidUpdate(prevProps: AppInnerProps) {
        const nextProps = this.props;
        const curUrlState = getStateFromUrl();
        //Preserve locale/resources/session if already present in url
        const nextUrlState: IAppUrlState = {
            locale: curUrlState.locale ?? this.props.locale,
            session: curUrlState.session ?? this.props.mapguide?.session
        };
        if (typeof(this.props.resourceId) == 'string') {
            nextUrlState.resource = curUrlState.resource ?? this.props.resourceId
        }
        if (nextProps.featureTooltipsEnabled != prevProps.featureTooltipsEnabled) {
            nextUrlState.ft = nextProps.featureTooltipsEnabled;
        }
        if (nextProps.map != null && prevProps.map != nextProps.map) {
            this.setState({ isLoading: false });
        }
        if (nextProps.activeMapName) {
            const am = nextProps.activeMapName;
            nextUrlState.map = am;
        }
        if (nextProps.map) {
            if (nextProps.map.currentView) {
                const { x, y, scale } = nextProps.map.currentView;
                nextUrlState.x = x;
                nextUrlState.y = y;
                nextUrlState.scale = scale;
            }
            const mgs = nextProps.map.mapguide;
            if (mgs) {
                const rtm = mgs.runtimeMap;
                const { showGroups, showLayers, hideGroups, hideLayers } = mgs;
                const sg = [] as string[];
                const hg = [] as string[];
                const sl = [] as string[];
                const hl = [] as string[];
                if (rtm?.Group) {
                    for (const g of rtm.Group) {
                        if (showGroups.indexOf(g.ObjectId) >= 0) {
                            sg.push(g.Name);
                        } else if (hideGroups.indexOf(g.ObjectId) >= 0) {
                            hg.push(g.Name);
                        }
                    }
                }
                if (rtm?.Layer) {
                    for (const l of rtm.Layer) {
                        if (showLayers.indexOf(l.ObjectId) >= 0) {
                            sl.push(l.Name);
                        } else if (hideLayers.indexOf(l.ObjectId) >= 0) {
                            hl.push(l.Name);
                        }
                    }
                }
                if (sg.length > 0)
                    nextUrlState.sg = sg;
                if (hg.length > 0)
                    nextUrlState.hg = hg;
                if (sl.length > 0)
                    nextUrlState.sl = sl;
                if (hl.length > 0)
                    nextUrlState.hl = hl;
                if (rtm) {
                    const { SessionId } = rtm;
                    nextUrlState.session = SessionId;
                }
            }
        }
        updateUrl(nextUrlState);
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
                const layoutEl = typeof (layout) == 'function' ? layout : getLayout(layout);
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

export const App = (props: IAppProps) => {
    const error = useInitError();
    const includeStack = useInitErrorStack();
    const initOptions = useInitErrorOptions();
    const configuredLocale = useViewerLocale();
    const map = useActiveMapBranch();
    const activeMapName = useActiveMapName();
    const ftEnabled = useViewerFeatureTooltipsEnabled();

    const dispatch = useDispatch();
    const initLayoutAction = (cmd: IViewerInitCommand, args: IInitAppLayout) => dispatch(initLayout(cmd, args));
    const setElementVisibility = (state: IElementState) => dispatch(setElementStates(state));
    return <AppInner error={error}
        includeStack={includeStack}
        initOptions={initOptions}
        featureTooltipsEnabled={ftEnabled}
        configuredLocale={configuredLocale}
        map={map}
        activeMapName={activeMapName}
        initLayout={initLayoutAction}
        setElementVisibility={setElementVisibility}
        {...props} />;
}