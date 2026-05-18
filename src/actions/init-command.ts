import type { IMapSwipePair } from '../api/common';
import { IGenericSubjectMapLayer } from './defs';
import { makeUnique } from '../utils/array';
import { ApplicationDefinition, MapConfiguration, MapSetGroup } from '../api/contracts/fusion';
import { MgError } from '../api/error';
import { strStartsWith } from '../utils/string';
import { IClusterSettings } from '../api/ol-style-contracts';

/**
 * Parses swipe pair declarations from the application definition's MapSet.
 *
 * A swipe pair is declared by adding Extension.SwipePairWith (the paired map group id)
 * and Extension.SwipePrimary ("true" or "false") to a MapGroup element.
 *
 * @since 0.15
 */
export function parseSwipePairs(appDef: ApplicationDefinition): IMapSwipePair[] {
    const pairs: IMapSwipePair[] = [];
    const seen = new Set<string>();
    if (!appDef.MapSet?.MapGroup) {
        return pairs;
    }
    for (const mg of appDef.MapSet.MapGroup) {
        const ext = mg.Extension;
        if (!ext) {
            continue;
        }
        const swipePairWith = ext.SwipePairWith as string | undefined;
        const swipePrimary = ext.SwipePrimary as string | undefined;
        if (swipePairWith && swipePrimary?.toLowerCase() === "true") {
            const primaryId = mg["@id"];
            const pairKey = [primaryId, swipePairWith].sort().join("|");
            if (!seen.has(pairKey)) {
                seen.add(pairKey);
                const primaryLabel = ext.SwipePrimaryLabel as string | undefined;
                const secondaryLabel = ext.SwipeSecondaryLabel as string | undefined;
                pairs.push({
                    primaryMapName: primaryId,
                    secondaryMapName: swipePairWith,
                    ...(primaryLabel ? { primaryLabel } : {}),
                    ...(secondaryLabel ? { secondaryLabel } : {})
                });
            }
        }
    }
    return pairs;
}

/**
 * Parses a map-level mouse coordinate format override from the first map
 * configuration inside a MapGroup.
 *
 * Supported extension key on the first map's Extension object:
 * - MouseCoordinatesFormat
 *
 * @hidden
 * @since 0.15
 */
export function parseMapGroupCoordinateFormat(mapGroup: MapSetGroup): string | undefined {
    const ext = mapGroup.Map?.[0]?.Extension;
    if (!ext) {
        return undefined;
    }
    const candidate = ext.MouseCoordinatesFormat;
    if (typeof candidate === "string" && candidate.trim().length > 0) {
        return candidate;
    }
    return undefined;
}

const TYPE_SUBJECT = "SubjectLayer";
const TYPE_EXTERNAL = "External";

export type SessionInit = {
    session: string;
    sessionWasReused: boolean;
}

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

function tryExtractMapMetadata(extension: any) {
    const ext: any = {};
    for (const k in extension) {
        if (strStartsWith(k, "Meta_")) {
            const sk = k.substring("Meta_".length);
            ext[sk] = extension[k];
        }
    }
    return ext;
}

export function buildSubjectLayerDefn(name: string, map: MapConfiguration): IGenericSubjectMapLayer {
    const st = map.Extension.source_type;
    const initiallyVisible = map.Extension.initially_visible ?? true;
    const sp: any = {};
    const lo: any = {};
    const meta: any = {};
    const keys = Object.keys(map.Extension);
    let popupTemplate = map.Extension.popup_template;
    let selectable: boolean | undefined = map.Extension.is_selectable ?? true;
    let disableHover: boolean | undefined = map.Extension.disable_hover ?? false;
    for (const k of keys) {
        const spidx = k.indexOf("source_param_");
        const loidx = k.indexOf("layer_opt_");
        const midx = k.indexOf("meta_");
        if (spidx == 0) {
            const kn = k.substring("source_param_".length);
            sp[kn] = map.Extension[k];
        } else if (loidx == 0) {
            const kn = k.substring("layer_opt_".length);
            lo[kn] = map.Extension[k];
        } else if (midx == 0) {
            const kn = k.substring("meta_".length);
            meta[kn] = map.Extension[k];
        }
    }
    const sl = {
        name: name,
        description: map.Extension.layer_description,
        displayName: map.Extension.display_name,
        driverName: map.Extension.driver_name,
        type: st,
        layerOptions: lo,
        sourceParams: sp,
        meta: (Object.keys(meta).length > 0 ? meta : undefined),
        initiallyVisible,
        selectable,
        disableHover,
        popupTemplate,
        vectorStyle: map.Extension.vector_layer_style
    } as IGenericSubjectMapLayer;

    if (map.Extension.cluster) {
        sl.cluster = {
            ...map.Extension.cluster
        } as IClusterSettings;
    }
    return sl;
}

export function getMapDefinitionsFromFlexLayout(appDef: ApplicationDefinition): (MapToLoad | IGenericSubjectMapLayer)[] {
    const maps = [] as (MapToLoad | IGenericSubjectMapLayer)[];
    const configs = getMapGuideConfiguration(appDef);
    if (configs.length > 0) {
        for (const c of configs) {
            maps.push({ 
                name: c[0],
                mapDef: c[1].Extension.ResourceId,
                metadata: tryExtractMapMetadata(c[1].Extension)
            });
        }
    }
    if (appDef.MapSet?.MapGroup) {
        for (const mGroup of appDef.MapSet.MapGroup) {
            for (const map of mGroup.Map) {
                if (map.Type == TYPE_SUBJECT) {
                    const name = mGroup["@id"];
                    maps.push(buildSubjectLayerDefn(name, map));
                }
            }
        }
    }
    if (maps.length == 0)
        throw new MgError("No Map Definition or subject layer found in Application Definition");

    return maps;
}

export type MapToLoad = { name: string, mapDef: string, metadata: any };

export function isMapDefinition(arg: MapToLoad | IGenericSubjectMapLayer): arg is MapToLoad {
    return (arg as any).mapDef != null;
}

export function isStateless(appDef: ApplicationDefinition) {
    // This appdef is stateless if:
    //
    //  1. It has a Stateless extension property set to "true" (ie. The author has opted-in to this feature)
    //  2. No MapGuide Map Definitions were found in the appdef
    if (appDef.Extension?.Stateless == "true")
        return true;

    try {
        const maps = getMapDefinitionsFromFlexLayout(appDef);
        for (const m of maps) {
            if (isMapDefinition(m)) {
                return false;
            }
        }
        return true;
    } catch (e) {
        return true;
    }
}

/**
 * @hidden
 * @since 0.15
 */
export function getExtraProjectionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
    // The only widgets we care about are coordinate-related widgets.
    const epsgs: string[] = [];
    for (const ws of appDef.WidgetSet) {
        for (const w of ws.Widget) {
            if (w.Type == "CoordinateTracker") {
                const ps = w.Extension.Projection || [];
                for (const p of ps) {
                    epsgs.push(p.split(':')[1]);
                }
            } else if (w.Type == "CursorPosition") {
                const dp = w.Extension.DisplayProjection;
                if (dp) {
                    epsgs.push(dp.split(':')[1]);
                }
            }
        }
    }
    return makeUnique(epsgs);
}
