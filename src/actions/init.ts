import { Client } from "../api/client";
import { ReduxDispatch, IMapView, Dictionary } from "../api/common";
import {
    ApplicationDefinition,
    MapConfiguration
} from "../api/contracts/fusion";
import {
    IExternalBaseLayer,
    ReduxThunkedAction,
    IMapViewer
} from "../api/common";
import { strIsNullOrEmpty, strReplaceAll } from "../utils/string";
import { IAcknowledgeStartupWarningsAction, IInitAppActionPayload } from './defs';
import { ActionType } from '../constants/actions';
import { tr } from '../api/i18n';
import { IViewerInitCommand } from './init-command';
import { getLayoutCapabilities } from "../api/registry/layout";
import { debug } from "../utils/logger";
import { IMapProviderContext } from "../components/map-providers/base";

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
    resourceId: string | (() => Promise<ApplicationDefinition>);
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
     * When set, indicates whether the session in `session` was a pre-existing session
     * that the caller is reusing (true) or a freshly-created session (false). Used to
     * control whether selection-set recovery should run.
     *
     * @since 0.15
     */
    sessionWasReused?: boolean;
}

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
 * Applies viewer-mount overrides and appSettings merging onto an already-built
 * {@link IInitAppActionPayload}. Mutates `payload` in place.
 *
 * @hidden
 * @since 0.15
 */
export function applyInitPayloadOverrides(payload: IInitAppActionPayload, opts: IInitAsyncOptions): void {
    if (opts.initialView) {
        payload.initialView = { ...opts.initialView };
    }
    if (opts.initialActiveMap) {
        payload.activeMapName = opts.initialActiveMap;
    }
    payload.initialHideGroups = opts.initialHideGroups;
    payload.initialHideLayers = opts.initialHideLayers;
    payload.initialShowGroups = opts.initialShowGroups;
    payload.initialShowLayers = opts.initialShowLayers;
    payload.featureTooltipsEnabled = opts.featureTooltipsEnabled;
    // Merge in appSettings from loaded appDef. Any setting already specified at
    // viewer mount will be overwritten by the appDef value.
    const appSettings = opts.appSettings ?? {};
    const inAppSettings = payload.appSettings ?? {};
    for (const k in inAppSettings) {
        appSettings[k] = inAppSettings[k];
    }
    payload.appSettings = appSettings;
}

/**
 * Thunked action that initialises the viewer from a pre-loaded
 * {@link ApplicationDefinition}.
 *
 * Given an already-fetched `appDef`, `cmd`, `options`, and `viewer`, this action
 * assembles the full {@link IInitAppActionPayload} (handling locale, session management,
 * runtime-map creation, toolbar/widget parsing, etc.) and dispatches `INIT_APP`.
 *
 * This is the canonical initialisation path for ApplicationDefinition-based viewers.
 * Callers that hold a prepared `appDef` (e.g. after calling
 * {@link IViewerInitCommand.loadResourceAsync}) can dispatch this action directly,
 * enabling deterministic testing of the full init payload without needing to exercise
 * the fetch infrastructure.
 *
 * @param {IViewerInitCommand} cmd
 * @param {IInitAppLayout} options
 * @param {ApplicationDefinition} appDef
 * @param {IMapProviderContext} viewer
 * @returns {ReduxThunkedAction}
 *
 * @since 0.15
 */
export function initAppFromAppDef(cmd: IViewerInitCommand, options: IInitAppLayout, appDef: ApplicationDefinition, viewer: IMapProviderContext): ReduxThunkedAction {
    return (dispatch, getState) => {
        const args = getState().config;
        const opts: IInitAsyncOptions = { ...options };
        if (args.agentUri && args.agentKind) {
            cmd.attachClient(new Client(args.agentUri, args.agentKind));
        }
        return cmd.runFromAppDefAsync(appDef, opts).then(payload => {
            applyInitPayloadOverrides(payload, opts);
            dispatch({
                type: ActionType.INIT_APP,
                payload
            });
            if (opts.onInit && viewer) {
                opts.onInit(viewer);
            }
        }).catch(err => {
            processAndDispatchInitError(err, false, dispatch, opts);
        });
    };
}

export function acknowledgeInitWarnings(): IAcknowledgeStartupWarningsAction {
    return {
        type: ActionType.INIT_ACKNOWLEDGE_WARNINGS
    }
}