import { Client } from "../api/client";
import { ReduxDispatch, IMapView } from "../api/common";
import {
    ApplicationDefinition,
    MapConfiguration
} from "../api/contracts/fusion";
import {
    IExternalBaseLayer,
    ReduxThunkedAction,
    IMapViewer
} from "../api/common";
import { strReplaceAll } from "../utils/string";
import { IAcknowledgeStartupWarningsAction } from './defs';
import { ActionType } from '../constants/actions';
import { getViewer } from '../api/runtime';
import { tr } from '../api/i18n';
import { IViewerInitCommand } from './init-command';

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

function processAndDispatchInitError(error: Error, includeStack: boolean, dispatch: ReduxDispatch, opts: IInitAsyncOptions): void {
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
     * @memberof IInitAppLayout
     */
    initialActiveMap?: string;
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialShowLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialShowGroups?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialHideLayers?: string[];
    /**
     * 
     * @since 0.11
     * @type {string[]}
     * @memberof IInitAppLayout
     */
    initialHideGroups?: string[];
    onInit?: (viewer: IMapViewer) => void;
    /**
     * Sets whether feature tooltips should be initially enabled
     * 
     * @since 0.13
     */
    featureTooltipsEnabled?: boolean;
}

export interface IInitAsyncOptions extends IInitAppLayout {
    locale: string;
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
                const name = map.Extension.Options.name[0];
                const type = map.Extension.Options.type[0];
                const options: any = {};
                let bAdd = true;
                switch (type) {
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
                        name: name,
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
                const name = map.Extension.Options.name[0];
                const type = map.Extension.Options.type[0];
                const options: any = {};
                switch (type) {
                    case "CycleMap":
                        options.url = "http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
                        break;
                    case "TransportMap":
                        options.url = "http://tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
                        break;
                }
                externalBaseLayers.push({
                    name: name,
                    kind: "OSM",
                    options: options
                });
            }
            break;
        case "Stamen":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const name = map.Extension.Options.name[0];
                const type = map.Extension.Options.type[0];
                externalBaseLayers.push({
                    name: name,
                    kind: "Stamen",
                    options: {
                        layer: type
                    }
                });
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
        case "XYZ":
            {
                //HACK: De-arrayification of arbitrary extension elements
                //is shallow (hence name/type is string[]). Do we bother to fix this?
                const name = map.Extension.Options.name[0];
                const type = map.Extension.Options.type[0];
                const attributions = map.Extension.Options.attributions;
                let tilePixelRatio = 1;
                if (map.Extension.meta_tilePixelRatio) {
                    tilePixelRatio = parseInt(map.Extension.meta_tilePixelRatio, 10);
                }
                //NOTE: From a fusion appdef, we're expecting placeholder tokens to be in ${this_format} instead of
                //{this_format} as the primary consumer is the Fusion viewer that is based on OpenLayers 2
                //As we're not using OL2, but OL4+ the expected format is {this_format}, so we need to convert these
                //placeholder tokens
                const urls = (map.Extension.Options.urls || []).map((s: string) => strReplaceAll(s, "${", "{"));
                externalBaseLayers.push({
                    name: name,
                    kind: "XYZ",
                    options: {
                        layer: type,
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
 * Initializes the viewer
 *
 * @export
 * @param {IViewerInitCommand} cmd
 * @param {IInitAppLayout} options
 * @returns {ReduxThunkedAction}
 */
export function initLayout(cmd: IViewerInitCommand, options: IInitAppLayout): ReduxThunkedAction {
    const opts: IInitAsyncOptions = { ...options };
    return (dispatch, getState) => {
        const args = getState().config;
        //TODO: Fetch and init the string bundle earlier if "locale" is present
        //so the English init messages are seen only for a blink if requesting a
        //non-english string bundle
        if (args.agentUri && args.agentKind) {
            const client = new Client(args.agentUri, args.agentKind);
            cmd.attachClient(client);
        }
        cmd.runAsync(options).then(payload => {
            let initPayload = payload;
            if (opts.initialView) {
                initPayload.initialView = {
                    ...opts.initialView
                };
            }
            if (opts.initialActiveMap) {
                initPayload.activeMapName = opts.initialActiveMap;
            }
            initPayload.initialHideGroups = opts.initialHideGroups;
            initPayload.initialHideLayers = opts.initialHideLayers;
            initPayload.initialShowGroups = opts.initialShowGroups;
            initPayload.initialShowLayers = opts.initialShowLayers;
            initPayload.featureTooltipsEnabled = opts.featureTooltipsEnabled;
            dispatch({
                type: ActionType.INIT_APP,
                payload
            });
            if (options.onInit) {
                const viewer = getViewer();
                if (viewer) {
                    options.onInit(viewer);
                }
            }
        }).catch(err => {
            processAndDispatchInitError(err, false, dispatch, opts);
        })
    };
}

export function acknowledgeInitWarnings(): IAcknowledgeStartupWarningsAction {
    return {
        type: ActionType.INIT_ACKNOWLEDGE_WARNINGS
    }
}