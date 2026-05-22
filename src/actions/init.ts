import { Client } from "../api/client";
import { ReduxDispatch, IMapView, Dictionary } from "../api/common";
import {
    ApplicationDefinition,
    MapConfiguration
} from "../api/contracts/fusion";
import { WebLayout } from '../api/contracts/weblayout';
import {
    IExternalBaseLayer,
    ReduxThunkedAction,
    IMapViewer
} from "../api/common";
import { isResourceId, strEndsWith, strIsNullOrEmpty, strReplaceAll } from "../utils/string";
import { IAcknowledgeStartupWarningsAction, IInitAppActionPayload, IRestoredSelectionSets } from './defs';
import { ActionType } from '../constants/actions';
import { tr } from '../api/i18n';
import { getLayoutCapabilities } from "../api/registry/layout";
import { debug } from "../utils/logger";
import { AsyncLazy } from '../api/lazy';
import { isAppDef, isWebLayout } from '../api/builders/de-arrayify-guards';
import { MgError } from '../api/error';
import { initLocaleAsync, sessionAcquiredAsync } from './init-mapguide';
import { clearSessionStore, retrieveSelectionSetFromLocalStorage } from '../api/session-store';

export function applyInitialBaseLayerVisibility(externalBaseLayers: IExternalBaseLayer[]) {
    if (externalBaseLayers.length > 0) {
        // First visual base layer, first served
        const firstBase = externalBaseLayers.find(bl => bl.kind != "UTFGrid");
        if (firstBase) {
            firstBase.visible = true;
        }
        // Make all non-visual base layers (ie. UTFGrid) visible
        const nonVisuals = externalBaseLayers.filter(bl => bl.kind == "UTFGrid");
        for (const nv of nonVisuals) {
            nv.visible = true;
        }
    }
}

export function processAndDispatchInitError(error: Error, includeStack: boolean, dispatch: ReduxDispatch, opts: IInitAsyncOptions): void {
    if (error.stack) {
        dispatch({
            type: ActionType.INIT_ERROR,
            payload: {
                error: {
                    message: error.message,
                    stack: (error.stack || "").split("\n")
                },
                includeStack: includeStack,
                options: opts
            }
        });
    } else {
        dispatch({
            type: ActionType.INIT_ERROR,
            payload: {
                error: {
                    message: error.message,
                    stack: []
                },
                includeStack: includeStack,
                options: opts
            }
        });
    }
}

export interface IInitAppLayout {
    locale: string;
    resourceId: string | (() => Promise<ApplicationDefinition | WebLayout>);
    externalBaseLayers?: IExternalBaseLayer[];
    session?: string;
    initialView?: IMapView;
    /**
     * 
     * @since 0.11
     * @type {string}
     *
     */
    initialActiveMap?: string;
    /**
     * 
     * @since 0.11
     * @type {string[]}
     *
     */
    initialShowLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     *
     */
    initialShowGroups?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     *
     */
    initialHideLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     *
     */
    initialHideGroups?: string[];
    onInit?: (viewer: IMapViewer) => void;
    /**
     * Sets whether feature tooltips should be initially enabled
     * 
     * @since 0.13
     */
    featureTooltipsEnabled?: boolean;
    /**
     * @since 0.14
     */
    layout?: string;
    /**
     * @since 0.14.8
     */
    appSettings?: Dictionary<string> | undefined;
}

/**
 * @hidden
 */
export function normalizeInitPayload(payload: IInitAppActionPayload, layout: string | undefined): IInitAppActionPayload {
    if (!strIsNullOrEmpty(layout)) {
        const caps = getLayoutCapabilities(layout);
        if (caps) {
            if (!caps.hasTaskPane) {
                debug("Overriding hasTaskPane capability to false");
                payload.capabilities.hasTaskPane = false;
            }
        }
    }
    return payload;
}

export interface IInitAsyncOptions extends IInitAppLayout {
    locale: string;
    /**
     * @hidden Internal hint for distinguishing browser refresh session reuse
     * from a fresh init path that may still provide a pre-created session id.
     */
    sessionWasReused?: boolean;
}

export type IInitAppFromDocumentOptions = Omit<IInitAsyncOptions, "resourceId" | "session" | "onInit">;

/**
 * @hidden
 * @since 0.15
 */
export interface IInitDocumentResult {
    document: ApplicationDefinition | WebLayout;
    session: AsyncLazy<string>;
    sessionWasReused: boolean;
}

/**
 * Builds an INIT_APP payload from a pre-fetched init document.
 *
 * @hidden
 * @since 0.15
 */
let _counter = 0;

export function processLayerInMapGroup(map: MapConfiguration, warnings: string[], config: any, appDef: ApplicationDefinition, externalBaseLayers: IExternalBaseLayer[]) {
    switch (map.Type) {
        case "Google":
            warnings.push(tr("INIT_WARNING_UNSUPPORTED_GOOGLE_MAPS", config.locale));
            break;
        case "VirtualEarth":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const { name, type } = map.Extension.Options;
                const sName = Array.isArray(name) ? name[0] : name;
                const sType = Array.isArray(type) ? type[0] : type;
                const options: any = {};
                let bAdd = true;
                switch (sType) {
                    case "Aerial":
                    case "a":
                        options.imagerySet = "Aerial";
                        break;
                    case "AerialWithLabels":
                        options.imagerySet = "AerialWithLabels";
                        break;
                    case "Road":
                        options.imagerySet = "Road";
                        break;
                    default:
                        bAdd = false;
                        warnings.push(tr("INIT_WARNING_BING_UNKNOWN_LAYER", config.locale, { type: type }));
                        break;
                }
                if (appDef.Extension.BingMapKey) {
                    options.key = appDef.Extension.BingMapKey;
                }
                else {
                    bAdd = false;
                    warnings.push(tr("INIT_WARNING_BING_API_KEY_REQD", config.locale));
                }
                if (bAdd) {
                    externalBaseLayers.push({
                        name: sName,
                        kind: "BingMaps",
                        options: options
                    });
                }
            }
            break;
        case "OpenStreetMap":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const { name, type } = map.Extension.Options;
                const sName = Array.isArray(name) ? name[0] : name;
                const sType = Array.isArray(type) ? type[0] : type;
                const options: any = {};
                switch (sType) {
                    case "CycleMap":
                        options.url = "http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
                        break;
                    case "TransportMap":
                        options.url = "http://tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
                        break;
                }
                externalBaseLayers.push({
                    name: sName,
                    kind: "OSM",
                    options: options
                });
            }
            break;
        case "StadiaMaps":
        case "Stamen":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const { name, type } = map.Extension.Options;
                const sName = Array.isArray(name) ? name[0] : name;
                const sType = Array.isArray(type) ? type[0] : type;

                const options: any = {
                    layer: sType
                };
                let bAdd = true;
                if (appDef.Extension?.StadiaMapsKey) {
                    options.key = appDef.Extension.StadiaMapsKey;
                }
                else {
                    bAdd = false;
                    warnings.push(tr("INIT_WARNING_STADIAMAPS_API_KEY_REQD", config.locale));
                }
                if (bAdd) {
                    externalBaseLayers.push({
                        name: sName,
                        kind: map.Type,
                        options: options
                    });
                }
            }
            break;
        case "UTFGrid":
            {
                externalBaseLayers.push({
                    name: `UTFGridSource${_counter++}`,
                    kind: "UTFGrid",
                    options: {
                        tileJSON: {
                            scheme: "xyz",
                            grids: Array.isArray(map.Extension.UrlTemplate) ? [...map.Extension.UrlTemplate] : [map.Extension.UrlTemplate]
                        }
                    }
                })
            }
            break;
        case "XYZDebug":
            //HACK: De-arrayification of arbitrary extension elements
            //is shallow (hence name/type is string[]). Do we bother to fix this?
            const { name } = map.Extension.Options;
            const sName = Array.isArray(name) ? name[0] : name;
            externalBaseLayers.push({
                name: sName,
                kind: "XYZDebug"
            });
            break;
        case "XYZ":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const { name, type, attributions } = map.Extension.Options;
                const sName = Array.isArray(name) ? name[0] : name;
                const sType = Array.isArray(type) ? type[0] : type;
                let tilePixelRatio = 1;
                if (map.Extension.Options.tilePixelRatio) {
                    tilePixelRatio = parseInt(map.Extension.Options.tilePixelRatio[0], 10);
                }
                //NOTE: From a fusion appdef, we're expecting placeholder tokens to be in ${this_format} instead of
                //{this_format} as the primary consumer is the Fusion viewer that is based on OpenLayers 2
                //As we're not using OL2, but OL4+ the expected format is {this_format}, so we need to convert these
                //placeholder tokens
                const urls = (map.Extension.Options.urls || []).map((s: string) => strReplaceAll(s, "${", "{"));
                externalBaseLayers.push({
                    name: sName,
                    kind: "XYZ",
                    options: {
                        layer: sType,
                        urls,
                        attributions,
                        tilePixelRatio
                    }
                });
            }
            break;
    }
}

/**
 * @hidden
 * @since 0.15
 */
export async function fetchInitDocument(options: IInitAsyncOptions, client: Client | undefined): Promise<IInitDocumentResult> {
    const { resourceId, locale } = options;
    let sessionWasReused = false;
    let session: AsyncLazy<string>;
    if (!options.session) {
        session = new AsyncLazy<string>(async () => {
            if (!client) {
                throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
            }
            return await client.createSession("Anonymous", "");
        });
    } else {
        sessionWasReused = true;
        session = new AsyncLazy<string>(() => Promise.resolve(options.session!));
    }

    if (!resourceId) {
        const cl = new Client("", "mapagent");
        try {
            const appDef = await cl.get<ApplicationDefinition>("appdef.json");
            return {
                document: appDef,
                session,
                sessionWasReused
            };
        } catch (e) {
            throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
        }
    }

    if (typeof resourceId === "string") {
        if (strEndsWith(resourceId, "WebLayout")) {
            if (!client) {
                throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
            }
            const wl = await client.getResource<WebLayout>(resourceId, { SESSION: await session.getValueAsync() });
            return {
                document: wl,
                session,
                sessionWasReused
            };
        }
        if (strEndsWith(resourceId, "ApplicationDefinition")) {
            if (!client) {
                throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
            }
            const appDef = await client.getResource<ApplicationDefinition>(resourceId, { SESSION: await session.getValueAsync() });
            return {
                document: appDef,
                session,
                sessionWasReused
            };
        }
        if (isResourceId(resourceId)) {
            throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId }));
        }
        if (client) {
            const appDef = await client.get<ApplicationDefinition>(resourceId);
            return {
                document: appDef,
                session,
                sessionWasReused
            };
        }
        const cl = new Client("", "mapagent");
        const appDef = await cl.get<ApplicationDefinition>(resourceId);
        return {
            document: appDef,
            session,
            sessionWasReused
        };
    }

    const document = await resourceId();
    if (isAppDef(document as any) || isWebLayout(document as any)) {
        return {
            document,
            session,
            sessionWasReused
        };
    }
    throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
}

/**
 * @hidden
 * @since 0.15
 */
export function initAppFromDocument(fetchResult: IInitDocumentResult, options: IInitAppFromDocumentOptions): ReduxThunkedAction {
    return async (dispatch, getState) => {
        const args = getState().config;
        let client: Client | undefined;
        if (args.agentUri && args.agentKind) {
            client = new Client(args.agentUri, args.agentKind);
        }
        const fullOptions: IInitAsyncOptions = {
            ...options,
            resourceId: async () => fetchResult.document
        };
        await initLocaleAsync(dispatch, fullOptions);
        const sessionWasReused = fetchResult.sessionWasReused;
        const payload = await sessionAcquiredAsync(client, fullOptions, fetchResult.session, sessionWasReused);
        payload.sessionWasReused = sessionWasReused;
        if (sessionWasReused) {
            const initSelections: IRestoredSelectionSets = {};
            for (const mapName in payload.maps) {
                const sset = await retrieveSelectionSetFromLocalStorage(fetchResult.session, mapName);
                if (sset) {
                    initSelections[mapName] = sset;
                }
            }
            payload.initialSelections = initSelections;
            try {
                await clearSessionStore();
            } catch (e) {
                // swallow — selection store cleanup is best-effort
            }
        }
        let initPayload = payload;
        if (options.initialView) {
            initPayload.initialView = {
                ...options.initialView
            };
        }
        if (options.initialActiveMap) {
            initPayload.activeMapName = options.initialActiveMap;
        }
        initPayload.initialHideGroups = options.initialHideGroups;
        initPayload.initialHideLayers = options.initialHideLayers;
        initPayload.initialShowGroups = options.initialShowGroups;
        initPayload.initialShowLayers = options.initialShowLayers;
        initPayload.featureTooltipsEnabled = options.featureTooltipsEnabled;
        const appSettings = options.appSettings ?? {};
        const inAppSettings = payload.appSettings ?? {};
        for (const k in inAppSettings) {
            appSettings[k] = inAppSettings[k];
        }
        initPayload.appSettings = appSettings;
        dispatch({
            type: ActionType.INIT_APP,
            payload: initPayload
        });
    };
}

export function acknowledgeInitWarnings(): IAcknowledgeStartupWarningsAction {
    return {
        type: ActionType.INIT_ACKNOWLEDGE_WARNINGS
    }
}