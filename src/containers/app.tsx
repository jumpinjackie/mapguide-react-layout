import * as React from "react";
import { getLayout, LayoutCapabilities } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    IBranchedMapSubState,
    ClientKind,
    InitError,
    IMapViewer,
    Dictionary
} from "../api/common";
import { type IInitAppLayout, initLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { getAssetRoot } from "../utils/asset";
import { setFusionRoot } from "../api/runtime";
import { AppContextProvider, LegendNodeExtraHTMLProps } from "../components/context";
import type { IElementState } from '../actions/defs';
import { useInitError, useInitErrorStack, useInitErrorOptions, useViewerLocale, useActiveMapBranch, useActiveMapName, useViewerFeatureTooltipsEnabled, useCustomAppSettings } from './hooks';
import { areStatesEqual, getStateFromUrl, type IAppUrlState, updateUrl } from './url-state';
import { debug } from '../utils/logger';
import { setElementStates } from '../actions/template';
import type { IViewerInitCommand } from '../actions/init-command';
import { ApplicationDefinition } from '../api/contracts/fusion';
import { useMapProviderContext, useReduxDispatch } from "../components/map-providers/context";
import DOMPurify from "dompurify";
import { MapGroup, MapLayer } from "../api/contracts/runtime-map";
import { useElementContext } from "../components/elements/element-context";
import type { ISelectedFeatureProps } from "../components/selection-panel";

/**
 * The app setting key used to specify URL props to ignore.
 * The value should be a comma-separated list of URL parameter names.
 *
 * @example
 * To ignore `x`, `y`, and `scale` URL parameters, set this app setting in your appdef's ViewerSettings:
 * ```xml
 * <Setting name="urlPropsIgnore" value="x,y,scale" />
 * ```
 *
 * @since 0.15
 */
export const APP_SETTING_URL_PROPS_IGNORE = "urlPropsIgnore";

/**
 * Gets the effective list of URL props to ignore, combining the `urlPropsIgnore` prop value
 * with any value specified in the app settings under the {@link APP_SETTING_URL_PROPS_IGNORE} key.
 *
 * This allows `urlPropsIgnore` to be configured via an app setting in the loaded Application
 * Definition, without requiring modification of the viewer HTML template.
 *
 * @param propIgnore The `urlPropsIgnore` prop value
 * @param settingsValue The value of the `urlPropsIgnore` app setting (comma-separated)
 * @returns The combined list of URL props to ignore, or undefined if both are empty
 *
 * @example
 * // Merging a prop value with a settings string
 * getEffectiveUrlPropsIgnore(["scale"], "x,y"); // returns ["scale", "x", "y"]
 *
 * // Settings-only configuration
 * getEffectiveUrlPropsIgnore(undefined, "x,y,scale"); // returns ["x", "y", "scale"]
 *
 * @since 0.15
 * @hidden
 */
export function getEffectiveUrlPropsIgnore(propIgnore: string[] | undefined, settingsValue: string | undefined): string[] | undefined {
    const normalizeIgnoreProp = (value: string) => value.trim().toLowerCase();
    const fromProps = propIgnore?.map(normalizeIgnoreProp).filter(s => s.length > 0) ?? [];
    const fromSettings = settingsValue?.split(",").map(normalizeIgnoreProp).filter(s => s.length > 0) ?? [];
    const merged = [...new Set([...fromProps, ...fromSettings])];
    return merged.length > 0 ? merged : undefined;
}

/**
 * Returns a copy of the given URL state with the specified keys omitted.
 * Used to strip ignored keys before equality comparison so that changes
 * to ignored fields do not trigger unnecessary URL updates.
 */
function omitIgnoredStateKeys(state: IAppUrlState, ignoreProps: string[]): IAppUrlState {
    const ignoreSet = new Set(ignoreProps.map(k => k.toLowerCase()));
    const result: IAppUrlState = {};
    for (const k in state) {
        if (!ignoreSet.has(k.toLowerCase())) {
            (result as any)[k] = (state as any)[k];
        }
    }
    return result;
}

const AppLoadingPlaceholder: React.FC<{ locale: string }> = ({ locale }) => {
    const { NonIdealState, Spinner } = useElementContext();
    return <NonIdealState
        icon={<Spinner sizePreset="large" />}
        title={tr("INIT", locale)}
        description={tr("INIT_DESC", locale)} />;
}

export interface SelectionOptions {
    allowHtmlValues?: boolean;
    cleanHtml?: ISelectedFeatureProps["cleanHTML"];
    /**
     * An optional function for formatting/transforming a property value before it is displayed.
     * This function is called for all property values regardless of the allowHtmlValues setting,
     * making it the preferred hook for transforming plain text values such as decimal numbers.
     *
     * @since 0.15
     */
    formatPropertyValue?: ISelectedFeatureProps["formatPropertyValue"];
}

/**
 * @since 0.14.9
 */
export interface LegendOptions {
    /**
     * Provide extra HTML elements to insert before a layer name in a layer legend node
     * 
     * Please note: If the HTML returned by this function would contain potentially untrusted input, you 
     * are responsible for sanitizing the HTML content. The given options contains a sanitize function for
     * you to sanitize untrusted parts of the HTML content being assembled.
     * 
     * @param options
     */
    provideExtraLayerIconsHtml?: (options: LegendNodeExtraHTMLProps<MapLayer>) => string[];
    /**
     * Provide extra HTML elements to insert before a group name in a group legend node
     * 
     * Please note: If the HTML returned by this function would contain potentially untrusted input, you 
     * are responsible for sanitizing the HTML content. The given options contains a sanitize function for
     * you to sanitize untrusted parts of the HTML content being assembled.
     * 
     * @param options
     */
    provideExtraGroupIconsHtml?: (options: LegendNodeExtraHTMLProps<MapGroup>) => string[];
}

/**
 * @since 0.14.9 Extracted out to separate interface
 */
export interface IInitialElementVisibility {
    taskpane: boolean;
    legend: boolean;
    selection: boolean;
}

/**
 * MapGuide-specific application options
 *
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
     */
    agentUri: string;
    /**
     * The agent kind
     *
     * @type {ClientKind}
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
     * Settings that control the legend (if provided by the template)
     */
    legendSettings?: LegendOptions;
    /**
     * Defines initial element visibility
     */
    initialElementVisibility: IInitialElementVisibility;
}

/**
 * Describes an ad-hoc layout template
 * 
 * @since 0.14
 */
export type AdHocLayoutTemplate = {
    factory: (() => React.ReactNode);
    capabilities: LayoutCapabilities;
}

/**
 * App component properties
 *
 * @interface IAppProps
 */
export interface IAppProps {
    /**
     * The command that will carry out viewer initialization
     *
     * @type {IViewerInitCommand}
     *
     * @since 0.14
     */
    initCommand: IViewerInitCommand;
    /**
     * The layout to use
     * @since 0.14 type changed to include AdHocLayoutTemplate
     */
    layout: string | AdHocLayoutTemplate;
    /**
     * A resource id to a Web Layout or Application Definition or a function that will fetch the required Application Definition. 
     *
     *
     */
    resourceId: string | (() => Promise<ApplicationDefinition>);
    /**
     * The list of external base layers
     *
     * @type {IExternalBaseLayer[]}
     *
     * 
     * @remarks This option is for when you are passing in a Web Layout to the viewer, but you still want to provide external 
     * base layers. If passing in an Application Definition, this option is redundant as the Application Definition itself can
     * define the set of external base layers
     */
    externalBaseLayers?: IExternalBaseLayer[];
    /**
     * If specified, tells the application to not sync the following URL params to the URL, and to skip
     * reading these params when initializing/refreshing.
     *
     * @type {string[]}
     *
     * @since 0.14
     */
    urlPropsIgnore?: string[];
    /**
     * A callback function that will be called when the viewer has finished initializing
     */
    onInit?: (viewer: IMapViewer) => void;
    /**
     * The locale to use
     */
    locale?: string;
    /**
     * MapGuide-specific options
     *
     * @type {IMapGuideAppProps}
     *
     * @since 0.14
     */
    mapguide?: IMapGuideAppProps;
    /**
     * @since 0.14.8
     */
    appSettings?: Dictionary<string> | undefined;
}

/**
 * App component state
 *
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
 * @interface IAppDispatch
 */
export interface IAppDispatch {
    initLayout: (cmd: IViewerInitCommand, args: IInitAppLayout) => void;
    setElementVisibility: (states: IElementState) => void;
}

type AppInnerProps = IAppProps & IAppState & IAppDispatch;

const AppInitError: React.FC<React.PropsWithChildren<{ locale: string }>> = (props) => {
    const { Callout } = useElementContext();
    return <Callout variant="danger" title={tr("INIT_ERROR_TITLE", props.locale)} icon="error">
        {props.children}
    </Callout>;
}

export const App = (props: IAppProps) => {
    const error = useInitError();
    const includeStack = useInitErrorStack();
    const initOptions = useInitErrorOptions();
    const configuredLocale = useViewerLocale();
    const map = useActiveMapBranch();
    const activeMapName = useActiveMapName();
    const ftEnabled = useViewerFeatureTooltipsEnabled();
    const configuredAppSettings = useCustomAppSettings();

    const dispatch = useReduxDispatch();
    const viewer = useMapProviderContext();
    const initLayoutAction = (cmd: IViewerInitCommand, args: IInitAppLayout) => dispatch(initLayout(cmd, viewer, args));
    const setElementVisibility = (state: IElementState) => dispatch(setElementStates(state));

    const [isLoading, setIsLoading] = React.useState(true);

    // --- Begin logic from AppInner ---
    React.useEffect(() => {
        const {
            onInit,
            mapguide,
            locale,
            resourceId,
            externalBaseLayers,
            initCommand,
            appSettings,
            layout: layoutProp,
            urlPropsIgnore
        } = props;
        const effectiveUrlPropsIgnore = getEffectiveUrlPropsIgnore(urlPropsIgnore, appSettings?.[APP_SETTING_URL_PROPS_IGNORE]);
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
        } = getStateFromUrl(effectiveUrlPropsIgnore);
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
        if (initLayoutAction) {
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
                    onInit: onInit,
                    layout: typeof (layoutProp) == 'string' ? layoutProp : undefined,
                    appSettings: appSettings
                },
                ...(ftArgs ?? {}),
                ...(amArgs ?? {}),
                ...(ivArgs ?? {}),
                ...(slArgs ?? {}),
                ...(hlArgs ?? {}),
                ...(sgArgs ?? {}),
                ...(hgArgs ?? {})
            };
            initLayoutAction(initCommand, args);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        // URL state update logic from componentDidUpdate
        const curUrlState = getStateFromUrl();
        const nextUrlState: IAppUrlState = {
            locale: curUrlState.locale ?? props.locale,
            session: curUrlState.session ?? props.mapguide?.session
        };
        if (typeof (props.resourceId) == 'string') {
            nextUrlState.resource = curUrlState.resource ?? props.resourceId
        }
        if (ftEnabled !== undefined) {
            nextUrlState.ft = ftEnabled;
        }
        if (map != null) {
            setIsLoading(false);
        }
        if (activeMapName) {
            nextUrlState.map = activeMapName;
        }
        if (map) {
            if (map.currentView) {
                const { x, y, scale } = map.currentView;
                nextUrlState.x = x;
                nextUrlState.y = y;
                nextUrlState.scale = scale;
            }
            const mgs = map.mapguide;
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
        const effectiveIgnore = getEffectiveUrlPropsIgnore(props.urlPropsIgnore, configuredAppSettings?.[APP_SETTING_URL_PROPS_IGNORE]);
        const curComparable = effectiveIgnore ? omitIgnoredStateKeys(curUrlState, effectiveIgnore) : curUrlState;
        const nextComparable = effectiveIgnore ? omitIgnoredStateKeys(nextUrlState, effectiveIgnore) : nextUrlState;
        if (!areStatesEqual(curComparable, nextComparable))
            updateUrl(nextUrlState, undefined, effectiveIgnore);
    }, [map, activeMapName, ftEnabled, props, configuredAppSettings]);

    const renderErrorMessage = React.useCallback((err: Error | InitError, locale: string, args: any): JSX.Element => {
        const msg = err.message;
        switch (msg) {
            case "MgConnectionFailedException":
                {
                    const arg = { __html: DOMPurify.sanitize(tr("INIT_ERROR_NO_CONNECTION", locale)) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgResourceNotFoundException":
                {
                    const arg = { __html: DOMPurify.sanitize(tr("INIT_ERROR_RESOURCE_NOT_FOUND", locale, { resourceId: args.resourceId })) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgSessionExpiredException":
                {
                    const arg = { __html: DOMPurify.sanitize(tr("INIT_ERROR_EXPIRED_SESSION", locale, { sessionId: args.session })) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            default:
                {
                    const arg = { __html: DOMPurify.sanitize(msg) };
                    const stack = normalizeStack(err);
                    return <div>
                        <div dangerouslySetInnerHTML={arg} />
                        {(() => {
                            if (includeStack === true && stack.length > 0) {
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
    }, [includeStack]);

    const initErrorRenderer = React.useCallback((err: Error | InitError) => {
        let locale = configuredLocale;
        if (initOptions && initOptions.locale) {
            locale = initOptions.locale;
        }
        return <AppInitError locale={locale}>
            {renderErrorMessage(err, locale, initOptions || {})}
        </AppInitError>;
    }, [configuredLocale, initOptions, renderErrorMessage]);
    // --- End logic from AppInner ---

    const { layout } = props;
    if (error) {
        return <Error error={error} errorRenderer={initErrorRenderer} />
    } else {
        const locale = configuredLocale;
        if (isLoading) {
            return <AppLoadingPlaceholder locale={locale} />;
        } else {
            const layoutEl = typeof (layout) == 'string' ? getLayout(layout) : layout.factory;
            if (layoutEl) {
                return <AppContextProvider mapguide={props.mapguide}>
                    {layoutEl()}
                </AppContextProvider>
            } else {
                return <Error error={tr("ERR_UNREGISTERED_LAYOUT", locale, { layout: layout })} />;
            }
        }
    }
};