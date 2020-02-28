import { ApplicationDefinition, MapConfiguration } from '../api/contracts/fusion';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { Dictionary, IExternalBaseLayer } from '../api/common';
import { MapInfo } from './defs';
import { tr, DEFAULT_LOCALE } from '../api/i18n';
import { IView } from '../api/contracts/common';
import { strReplaceAll } from '../utils/string';
import { Client } from '../api/client';
import { IInitAsyncOptions } from './init';
import { RuntimeMapFeatureFlags } from '../api/request-builder';
import { info, debug } from '../utils/logger';
import { MgError } from '../api/error';
import { resolveProjectionFromEpsgIoAsync } from '../api/registry/projections';
import { register } from 'ol/proj/proj4';
import proj4 from "proj4";

function getMapGuideConfiguration(appDef: ApplicationDefinition): [string, MapConfiguration][] {
    const configs = [] as [string, MapConfiguration][];
    if (appDef.MapSet) {
        for (const mg of appDef.MapSet.MapGroup) {
            for (const map of mg.Map) {
                if (map.Type == "MapGuide") {
                    configs.push([mg["@id"], map]);
                }
            }
        }
    }
    return configs;
}

export function getMapDefinitionsFromFlexLayout(appDef: ApplicationDefinition): MapToLoad[] {
    const configs = getMapGuideConfiguration(appDef);
    if (configs.length > 0) {
        return configs.map(c => ({ name: c[0], mapDef: c[1].Extension.ResourceId }));
    }
    throw new MgError("No Map Definition found in Application Definition");
}

export function setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<RuntimeMap>, config: any, warnings: string[]): Dictionary<MapInfo> {
    const dict: Dictionary<MapInfo> = {};
    if (appDef.MapSet) {
        for (const mgGroup of appDef.MapSet.MapGroup) {
            let mapName: string | undefined;
            //Setup external layers
            const externalBaseLayers = [] as IExternalBaseLayer[];
            for (const map of mgGroup.Map) {
                if (map.Type === "MapGuide") {
                    //TODO: Based on the schema, different MG map groups could have different
                    //settings here and our redux tree should reflect that. Currently the first one "wins"
                    if (!config.selectionColor && map.Extension.SelectionColor != null) {
                        config.selectionColor = map.Extension.SelectionColor;
                    }
                    if (!config.imageFormat && map.Extension.ImageFormat != null) {
                        config.imageFormat = map.Extension.ImageFormat;
                    }
                    if (!config.selectionImageFormat && map.Extension.SelectionFormat != null) {
                        config.selectionImageFormat = map.Extension.SelectionFormat;
                    }

                    //NOTE: Although non-sensical, if the same map definition exists across multiple
                    //MapGroups, we might be matching the wrong one. We just assume such non-sensical
                    //AppDefs won't exist
                    for (const name in mapsByName) {
                        if (mapsByName[name].MapDefinition == map.Extension.ResourceId) {
                            mapName = name;
                            break;
                        }
                    }
                } else {
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
                                switch (type)
                                {
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
                                } else {
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
                        case "XYZ":
                            {
                                //HACK: De-arrayification of arbitrary extension elements
                                //is shallow (hence name/type is string[]). Do we bother to fix this?
                                const name = map.Extension.Options.name[0];
                                const type = map.Extension.Options.type[0];
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
                                        urls: urls
                                    }
                                });
                            }
                            break;
                    }
                }
            }
            //First come, first served
            if (externalBaseLayers.length > 0) {
                externalBaseLayers[0].visible = true;
            }

            //Setup initial view
            let initialView: IView | undefined;
            if (mgGroup.InitialView) {
                initialView = {
                    x: mgGroup.InitialView.CenterX,
                    y: mgGroup.InitialView.CenterY,
                    scale: mgGroup.InitialView.Scale
                };
            }

            if (mapName) {
                dict[mapName] = {
                    mapGroupId: mgGroup["@id"],
                    map: mapsByName[mapName],
                    initialView: initialView,
                    externalBaseLayers: externalBaseLayers
                };
            }
        }
    }
    return dict;
}

export async function tryDescribeRuntimeMapAsync(client: Client, mapName: string, session: string, mapDef: string) {
    try {
        const map = await client.describeRuntimeMap({
            mapname: mapName,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            session: session
        });
        return map;
    } catch (e) {
        if (e.message === "MgResourceNotFoundException") {
            const map = await client.createRuntimeMap({
                mapDefinition: mapDef,
                requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                session: session,
                targetMapName: mapName
            });
            return map;
        }
        throw e;
    }
}

export type MapToLoad = { name: string, mapDef: string };

export async function createRuntimeMapsAsync<TLayout>(client: Client, session: string, opts: IInitAsyncOptions, res: TLayout, mapDefSelector: (res: TLayout) => MapToLoad[], projectionSelector: (res: TLayout) => string[], sessionWasReused: boolean): Promise<[Dictionary<RuntimeMap>, string[]]> {
    const mapDefs = mapDefSelector(res);
    const mapPromises: Promise<RuntimeMap>[] = [];
    const warnings = [] as string[];
    for (const m of mapDefs) {
        //sessionWasReused is a hint whether to create a new runtime map, or recover the last runtime map state from the given map name
        if (sessionWasReused) {
            //FIXME: If the map state we're recovering has a selection, we need to re-init the selection client-side
            info(`Session ID re-used. Attempting recovery of map state of: ${m.name}`);
            mapPromises.push(tryDescribeRuntimeMapAsync(client, m.name, session, m.mapDef));
        } else {
            info(`Creating runtime map state (${m.name}) for: ${m.mapDef}`);
            mapPromises.push(client.createRuntimeMap({
                mapDefinition: m.mapDef,
                requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                session: session,
                targetMapName: m.name
            }));
        }
    }
    const maps = await Promise.all(mapPromises);
    const fetchEpsgs: { epsg: string, mapDef: string }[] = [];
    //All must be non-zero
    for (const m of maps) {
        const epsg = m.CoordinateSystem.EpsgCode;
        const mapDef = m.MapDefinition;
        if (epsg == "0") {
            throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", opts.locale || DEFAULT_LOCALE, { mapDefinition: mapDef }));
        }
        //Must be registered to proj4js if not 4326 or 3857
        if (!proj4.defs[`EPSG:${epsg}`]) {
            fetchEpsgs.push({ epsg: epsg, mapDef: mapDef });
        }
    }
    const extraEpsgs = projectionSelector(res);
    for (const e of extraEpsgs) {
        fetchEpsgs.push({ epsg: e, mapDef: "" });
    }
    const epsgs = await Promise.all(fetchEpsgs.map(f => resolveProjectionFromEpsgIoAsync(f.epsg, opts.locale, f.mapDef)));

    //Previously, we register proj4 with OpenLayers on the bootstrap phase way before this init
    //process is started. This no longer works for OL6 where it doesn't seem to pick up the extra
    //projections we've registered with proj4 after linking proj4 to OpenLayers. So that registration
    //step has been relocated here, after all the custom projections have been fetched and registered
    //with proj4
    debug(`Register proj4 with OpenLayers`);
    register(proj4);

    //Build the Dictionary<RuntimeMap> from loaded maps
    const mapsByName: Dictionary<RuntimeMap> = {};
    for (const map of maps) {
        mapsByName[map.Name] = map;
    }
    return [mapsByName, warnings];
}