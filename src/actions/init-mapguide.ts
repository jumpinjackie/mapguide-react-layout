import { ApplicationDefinition } from '../api/contracts/fusion';
import { MapGroup, MapLayer, RuntimeMap } from '../api/contracts/runtime-map';
import { Dictionary, IExternalBaseLayer, ReduxDispatch, ActiveMapTool, IMapView } from '../api/common';
import { MapInfo, IInitAppActionPayload, IGenericSubjectMapLayer, GenericSubjectLayerType } from './defs';
import { tr, DEFAULT_LOCALE, registerStringBundle } from '../api/i18n';
import { isResourceId, strEndsWith, strIsNullOrEmpty } from '../utils/string';
import { Client } from '../api/client';
import { applyInitialBaseLayerVisibility, IInitAsyncOptions, normalizeInitPayload, processLayerInMapGroup } from './init';
import { ICreateRuntimeMapOptions, IDescribeRuntimeMapOptions, RuntimeMapFeatureFlags } from '../api/request-builder';
import { info, debug, warn } from '../utils/logger';
import { MgError } from '../api/error';
import { resolveProjectionFromEpsgCodeAsync } from '../api/registry/projections';
import { register } from 'ol/proj/proj4';
import proj4 from "proj4";
import { buildSubjectLayerDefn, getExtraProjectionsFromFlexLayout, getMapDefinitionsFromFlexLayout, isMapDefinition, isStateless, parseComparisonPairs, parseMapGroupCoordinateFormat, MapToLoad } from './init-command';
import { WebLayout } from '../api/contracts/weblayout';
import { convertFlexLayoutUIItems, convertWebLayoutUIItems, parseCommandsInWebLayout, parseWidgetsInAppDef, prepareSubMenus, ToolbarConf } from '../api/registry/command-spec';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU, WEBLAYOUT_TOOLBAR } from "../constants";
import { registerCommand } from '../api/registry/command';
import { ensureParameters } from '../utils/url';
import { assertIsDefined } from '../utils/assert';
import { MapDefinition } from '../api/contracts/map-definition';
import { TileSetDefinition } from '../api/contracts/tile-set-definition';
import { AsyncLazy } from '../api/lazy';
import { SiteVersionResponse } from '../api/contracts/common';
import { isRuntimeMap } from '../utils/type-guards';
import { tryParseArbitraryCs } from '../utils/units';
import { ScopedId } from '../utils/scoped-id';
import { canUseQueryMapFeaturesV4, parseSiteVersion } from '../utils/site-version';
import { supportsWebGL } from '../utils/browser-support';
import { isAppDef, isWebLayout } from '../api/builders/de-arrayify-guards';
import { ActionType } from '../constants/actions';

const TYPE_SUBJECT = "SubjectLayer";
const TYPE_EXTERNAL = "External";

const scopedId = new ScopedId();

/**
 * @since 0.14
 */
export type SubjectLayerType = RuntimeMap | IGenericSubjectMapLayer;

/**
 * Returns whether the supplied runtime map uses an arbitrary coordinate system.
 */
export function isArbitraryCoordSys(subject: SubjectLayerType | undefined) {
    if (subject) {
        if (isRuntimeMap(subject)) {
            const arbCs = tryParseArbitraryCs(subject.CoordinateSystem.MentorCode);
            return arbCs != null;
        }
    }
    return false;
}
/**
 * Finds the first runtime map entry and returns its map name and session id.
 */
export function establishInitialMapNameAndSession(mapsByName: Dictionary<SubjectLayerType>): [string, string] {
    let firstMapName = "";
    let firstSessionId = "";
    for (const mapName in mapsByName) {
        if (!firstMapName && !firstSessionId) {
            const map = mapsByName[mapName];
            if (isRuntimeMap(map)) {
                firstMapName = map.Name;
                firstSessionId = map.SessionId;
                break;
            }
        }
    }
    return [firstMapName, firstSessionId];
}
/**
 * Loads and registers the localized string bundle when a non-default locale is requested.
 */
export async function initLocaleAsync(dispatch: ReduxDispatch, options: IInitAsyncOptions): Promise<void> {
    const { locale } = options;
    if (locale != DEFAULT_LOCALE) {
        const r = await fetch(`strings/${locale}.json`);
        if (r.ok) {
            const res = await r.json();
            registerStringBundle(locale, res);
            dispatch({
                type: ActionType.SET_LOCALE,
                payload: locale
            });
            info(`Registered string bundle for locale: ${locale}`);
        } else {
            warn(`Failed to register string bundle for locale: ${locale}`);
        }
    }
}
/**
 * Builds the normalized init payload from an ApplicationDefinition and map state.
 */
async function initFromAppDefCoreAsync(appDef: ApplicationDefinition, options: IInitAsyncOptions, mapsByName: Dictionary<SubjectLayerType | IGenericSubjectMapLayer>, warnings: string[], pendingMapDefs?: Dictionary<MapToLoad>): Promise<IInitAppActionPayload> {
    const {
        taskPane,
        hasTaskBar,
        hasStatus,
        hasNavigator,
        hasSelectionPanel,
        hasLegend,
        viewSize,
        widgetsByKey,
        isStateless,
        initialTask
    } = parseWidgetsInAppDef(appDef, registerCommand);
    const { locale, featureTooltipsEnabled } = options;
    const config: any = {};
    config.isStateless = isStateless;
    const tbConf: Dictionary<ToolbarConf> = {};

    for (const widgetSet of appDef.WidgetSet) {
        for (const cont of widgetSet.Container) {
            const tbName = cont.Name;
            tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless, cont.Item, widgetsByKey, locale) };
        }
        for (const w of widgetSet.Widget) {
            if (w.Type == "CursorPosition") {
                config.coordinateProjection = w.Extension.DisplayProjection;
                config.coordinateDecimals = w.Extension.Precision;
                config.coordinateDisplayFormat = w.Extension.Template;
            }
        }
    }

    const mapsDict: any = mapsByName;
    const maps = setupMaps(appDef, mapsDict, config, warnings, locale, pendingMapDefs);
    if (appDef.Title) {
        document.title = appDef.Title || document.title;
    }
    const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsDict);
    const [tb, bFoundContextMenu] = prepareSubMenus(tbConf);
    if (!bFoundContextMenu) {
        warnings.push(tr("INIT_WARNING_NO_CONTEXT_MENU", locale, { containerName: WEBLAYOUT_CONTEXTMENU }));
    }
    const settings: Record<string, string> = {};
    if (Array.isArray(appDef.Extension?.ViewerSettings?.Setting)) {
        for (const s of appDef.Extension.ViewerSettings.Setting) {
            const [sn] = s["@name"];
            const [sv] = s["@value"];
            settings[sn] = sv;
        }
    }
    const comparisonPairs = parseComparisonPairs(appDef);
    return normalizeInitPayload({
        appSettings: settings,
        activeMapName: firstMapName,
        initialUrl: ensureParameters(initialTask, firstMapName, firstSessionId, locale),
        featureTooltipsEnabled: featureTooltipsEnabled,
        locale: locale,
        maps: maps,
        config: config,
        capabilities: {
            hasTaskPane: (taskPane != null),
            hasTaskBar: hasTaskBar,
            hasStatusBar: hasStatus,
            hasNavigator: hasNavigator,
            hasSelectionPanel: hasSelectionPanel,
            hasLegend: hasLegend,
            hasToolbar: (Object.keys(tbConf).length > 0),
            hasViewSize: (viewSize != null)
        },
        toolbars: tb,
        warnings: warnings,
        initialActiveTool: ActiveMapTool.Pan,
        comparisonPairs,
        mapSwipePairs: comparisonPairs
    }, options.layout);
}
/**
 * Derives a stable target runtime map name from a map definition resource id.
 */
function getDesiredTargetMapName(mapDef: string) {
    const lastSlash = mapDef.lastIndexOf("/");
    const lastDot = mapDef.lastIndexOf(".");
    if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) {
        return `${mapDef.substring(lastSlash + 1, lastDot)}`;
    } else {
        return `Map_${scopedId.next()}`;
    }
}
/**
 * Initializes viewer payload from a WebLayout document.
 */
async function initFromWebLayoutAsync(client: Client | undefined, options: IInitAsyncOptions, webLayout: WebLayout, session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    const [mapsByName, , warnings] = await createRuntimeMapsAsync(client, options, session, webLayout, false, wl => [{ name: getDesiredTargetMapName(wl.Map.ResourceId), mapDef: wl.Map.ResourceId, metadata: {} }], () => [], sessionWasReused);
    const { locale, featureTooltipsEnabled, externalBaseLayers } = options;
    const cmdsByKey = parseCommandsInWebLayout(webLayout, registerCommand);
    const mainToolbar = (webLayout.ToolBar.Visible
        ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, locale)
        : []);
    const taskBar = (webLayout.TaskPane.TaskBar.Visible
        ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, locale, false)
        : []);
    const contextMenu = (webLayout.ContextMenu.Visible
        ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, locale, false)
        : []);
    const config: any = {};
    if (webLayout.SelectionColor != null) {
        config.selectionColor = webLayout.SelectionColor;
    }
    if (webLayout.MapImageFormat != null) {
        config.imageFormat = webLayout.MapImageFormat;
    }
    if (webLayout.SelectionImageFormat != null) {
        config.selectionImageFormat = webLayout.SelectionImageFormat;
    }
    if (webLayout.PointSelectionBuffer != null) {
        config.pointSelectionBuffer = webLayout.PointSelectionBuffer;
    }
    let initialView: IMapView | null = null;
    if (webLayout.Map.InitialView != null) {
        initialView = {
            x: webLayout.Map.InitialView.CenterX,
            y: webLayout.Map.InitialView.CenterY,
            scale: webLayout.Map.InitialView.Scale
        };
    }

    if (webLayout.Title != "") {
        document.title = webLayout.Title || document.title;
    }

    const maps: any = {};
    const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsByName);

    for (const mapName in mapsByName) {
        const map = mapsByName[mapName];
        maps[mapName] = {
            mapGroupId: mapName,
            map: map,
            externalBaseLayers: options.externalBaseLayers ?? [],
            initialView: initialView
        };
    }

    const menus: Dictionary<ToolbarConf> = {};
    menus[WEBLAYOUT_TOOLBAR] = {
        items: mainToolbar
    };
    menus[WEBLAYOUT_TASKMENU] = {
        items: taskBar
    };
    menus[WEBLAYOUT_CONTEXTMENU] = {
        items: contextMenu
    };

    const tb = prepareSubMenus(menus)[0];
    return {
        activeMapName: firstMapName,
        featureTooltipsEnabled: featureTooltipsEnabled,
        initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", firstMapName, firstSessionId, locale),
        initialTaskPaneWidth: webLayout.TaskPane.Width,
        initialInfoPaneWidth: webLayout.InformationPane.Width,
        maps: maps,
        locale: locale,
        config: config,
        capabilities: {
            hasTaskPane: webLayout.TaskPane.Visible,
            hasTaskBar: webLayout.TaskPane.TaskBar.Visible,
            hasStatusBar: webLayout.StatusBar.Visible,
            hasNavigator: webLayout.ZoomControl.Visible,
            hasSelectionPanel: webLayout.InformationPane.Visible && webLayout.InformationPane.PropertiesVisible,
            hasLegend: webLayout.InformationPane.Visible && webLayout.InformationPane.LegendVisible,
            hasToolbar: webLayout.ToolBar.Visible,
            hasViewSize: webLayout.StatusBar.Visible
        },
        toolbars: tb,
        warnings: warnings,
        initialActiveTool: ActiveMapTool.Pan
    };
}
/**
 * Creates a runtime map using the API variant supported by the current site version.
 */
export async function createRuntimeMap(client: Client, options: ICreateRuntimeMapOptions, siteVersion: AsyncLazy<SiteVersionResponse>): Promise<RuntimeMap> {
    let map: RuntimeMap;
    const sv = await siteVersion.getValueAsync();
    if (canUseQueryMapFeaturesV4(parseSiteVersion(sv.Version))) {
        map = await client.createRuntimeMap_v4(options);
    } else {
        map = await client.createRuntimeMap(options);
    }
    return map;
}
/**
 * Describes an existing runtime map using the API variant supported by the current site version.
 */
export async function describeRuntimeMap(client: Client, options: IDescribeRuntimeMapOptions, siteVersion: AsyncLazy<SiteVersionResponse>): Promise<RuntimeMap> {
    let map: RuntimeMap;
    const sv = await siteVersion.getValueAsync();
    if (canUseQueryMapFeaturesV4(parseSiteVersion(sv.Version))) {
        map = await client.describeRuntimeMap_v4(options);
    } else {
        map = await client.describeRuntimeMap(options);
    }
    return map;
}
/**
 * Attempts to describe an existing runtime map and creates it if the resource does not exist.
 */
export async function tryDescribeRuntimeMapAsync(client: Client, mapName: string, session: AsyncLazy<string>, mapDef: string, siteVersion: AsyncLazy<SiteVersionResponse>) {
    try {
        const map = await describeRuntimeMap(client, {
            mapname: mapName,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            session: await session.getValueAsync()
        }, siteVersion);
        return map;
    } catch (e) {
        if ((e as any).message === "MgResourceNotFoundException") {
            const map = await createRuntimeMap(client, {
                mapDefinition: mapDef,
                requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                session: await session.getValueAsync(),
                targetMapName: mapName
            }, siteVersion);
            return map;
        }
        throw e;
    }
}
/**
 * Creates and/or recovers runtime maps and collects pending lazy maps for deferred creation.
 */
async function createRuntimeMapsAsync<TLayout>(client: Client | undefined, options: IInitAsyncOptions, session: AsyncLazy<string>, res: TLayout, isStateless: boolean, mapDefSelector: (res: TLayout) => (MapToLoad | IGenericSubjectMapLayer)[], projectionSelector: (res: TLayout) => string[], sessionWasReused: boolean): Promise<[Dictionary<SubjectLayerType>, Dictionary<MapToLoad>, string[]]> {
    const mapDefs = mapDefSelector(res);
    const mapPromises: Promise<RuntimeMap>[] = [];
    const warnings = [] as string[];
    const { locale } = options;
    const subjectLayers: Dictionary<IGenericSubjectMapLayer> = {};
    const fetchEpsgs: { epsg: string, mapDef: string }[] = [];
    const pendingMapDefs: Dictionary<MapToLoad> = {};
    // We use an AsyncLazy because we only want to fetch the site version *iff* we are required to
    const siteVersion = new AsyncLazy<SiteVersionResponse>(async () => {
        assertIsDefined(client);
        const sv = await client.getSiteVersion();
        return sv;
    });
    // Collect only the MapDefinition entries for lazy-load eligibility check
    const mapDefItems = mapDefs.filter(isMapDefinition);
    // Lazy creation only applies when: not stateless and there are multiple MapGuide maps.
    // Note: We intentionally do NOT exclude sessionWasReused here. Even on a browser refresh
    // (where the session is reused), non-active maps should still be deferred because they may
    // never have been created in the previous session (the user may not have switched to them).
    // These deferred maps will be lazily initialized via activateMap() when the user switches
    // to them, which now tries to describe the existing map first before creating a new one.
    const canLazyLoad = !isStateless && mapDefItems.length > 1;
    // When the session is reused (browser refresh), use initialActiveMap from the URL (?map=)
    // to identify which map to eagerly recover. If the URL param doesn't match any map in the
    // appdef (or is absent), fall back to the first map by position.
    const initialActiveMapName = options.initialActiveMap;
    const activeMapExistsInAppDef = !!initialActiveMapName && mapDefItems.some(mi => mi.name === initialActiveMapName);
    if (isStateless) {
        for (const m of mapDefs) {
            if (isMapDefinition(m)) {
                const siteVer = await siteVersion.getValueAsync();
                assertIsDefined(client);
                mapPromises.push(describeRuntimeMapStateless(client, siteVer.Version, m));
            } else {
                const proj = m.meta?.projection;
                if (!strIsNullOrEmpty(proj)) {
                    //Must be registered to proj4js if not 4326 or 3857
                    const [_, epsg] = proj.split(':');
                    if (!proj4.defs[`EPSG:${epsg}`]) {
                        fetchEpsgs.push({ epsg: epsg, mapDef: m.name });
                    }
                }
            }
        }
    } else {
        let isFirstMapDef = true;
        for (const m of mapDefs) {
            if (isMapDefinition(m)) {
                // Determine if this is the "primary" map to eagerly load/recover.
                // - For new sessions: the primary is always the first map in the appdef.
                // - For reused sessions (browser refresh): the primary is the map the user was
                //   viewing, identified via initialActiveMap (from the ?map= URL param). If the
                //   URL param is absent or does not match any map, fall back to first-by-position.
                const isPrimaryMap = (sessionWasReused && activeMapExistsInAppDef)
                    ? m.name === initialActiveMapName
                    : isFirstMapDef;
                if (canLazyLoad && !isPrimaryMap) {
                    // Defer non-primary maps in a multi-map layout to avoid loading them upfront.
                    // This applies regardless of whether the session is being reused.
                    info(`Deferring lazy creation of runtime map (${m.name}) for: ${m.mapDef}`);
                    pendingMapDefs[m.name] = m;
                } else if (sessionWasReused) {
                    //FIXME: If the map state we're recovering has a selection, we need to re-init the selection client-side
                    info(`Session ID re-used. Attempting recovery of map state of: ${m.name}`);
                    assertIsDefined(client);
                    mapPromises.push(tryDescribeRuntimeMapAsync(client, m.name, session, m.mapDef, siteVersion));
                } else {
                    info(`Creating runtime map state (${m.name}) for: ${m.mapDef}`);
                    assertIsDefined(client);
                    mapPromises.push(createRuntimeMap(client, {
                        mapDefinition: m.mapDef,
                        requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                        session: await session.getValueAsync(),
                        targetMapName: m.name
                    }, siteVersion));
                }
                isFirstMapDef = false;
            }
        }
    }
    const maps = await Promise.all(mapPromises);
    //All must be non-zero
    for (const m of maps) {
        const epsg = m.CoordinateSystem.EpsgCode;
        const mapDef = m.MapDefinition;
        const arbCs = tryParseArbitraryCs(m.CoordinateSystem.MentorCode);
        if (!arbCs) {
            if (epsg == "0") {
                throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", locale || DEFAULT_LOCALE, { mapDefinition: mapDef }));
            }
            //Must be registered to proj4js if not 4326 or 3857
            if (!proj4.defs[`EPSG:${epsg}`]) {
                fetchEpsgs.push({ epsg: epsg, mapDef: mapDef });
            }
        }
    }
    const extraEpsgs = projectionSelector(res);
    for (const e of extraEpsgs) {
        if (!proj4.defs[`EPSG:${e}`]) {
            fetchEpsgs.push({ epsg: e, mapDef: "" });
        }
    }
    const epsgs = await Promise.all(fetchEpsgs.filter(fe => !strIsNullOrEmpty(fe.epsg)).map(f => resolveProjectionFromEpsgCodeAsync(f.epsg, locale, f.mapDef)));

    //Previously, we register proj4 with OpenLayers on the bootstrap phase way before this init
    //process is started. This no longer works for OL6 where it doesn't seem to pick up the extra
    //projections we've registered with proj4 after linking proj4 to OpenLayers. So that registration
    //step has been relocated here, after all the custom projections have been fetched and registered
    //with proj4
    debug(`Register proj4 with OpenLayers`);
    register(proj4);

    //Build the Dictionary<MgSubjectLayerType> from loaded maps
    const mapsByName: Dictionary<SubjectLayerType> = {};
    for (const map of maps) {
        mapsByName[map.Name] = map;
    }
    for (const gs of mapDefs) {
        if (!isMapDefinition(gs)) {
            mapsByName[gs.name] = gs;
        }
    }
    return [mapsByName, pendingMapDefs, warnings];
}
/**
 * Builds a synthetic runtime map from a MapDefinition for stateless map operation.
 */
export async function describeRuntimeMapStateless(client: Client, siteVersion: string, m: MapToLoad): Promise<RuntimeMap> {
    const { name, mapDef, metadata } = m;
    const mdf = await client.getResource<MapDefinition>(mapDef, { username: "Anonymous" });
    if (!mdf)
        throw new Error("Failed to fetch map def");

    const rt: RuntimeMap = {
        SessionId: "",
        Extents: {
            LowerLeftCoordinate: {
                X: mdf.Extents.MinX,
                Y: mdf.Extents.MinY
            },
            UpperRightCoordinate: {
                X: mdf.Extents.MaxX,
                Y: mdf.Extents.MaxY
            }
        },
        SiteVersion: siteVersion,
        Name: name,
        DisplayDpi: 96,
        BackgroundColor: mdf.BackgroundColor,
        MapDefinition: mapDef,
        CoordinateSystem: {
            // We are assuming the app def specifies this data in each <Map> entry as extension properties
            // beginning with "Meta_" (eg. Meta_MentorCode, Meta_EpsgCode, etc)
            MentorCode: metadata.MentorCode,
            EpsgCode: metadata.EpsgCode,
            MetersPerUnit: metadata.MetersPerUnit,
            Wkt: mdf.CoordinateSystem
        },
        IconMimeType: "image/png",
    };

    const groups = [] as MapGroup[];
    const layers = [] as MapLayer[];

    if (mdf.TileSetSource) {
        rt.TileSetDefinition = mdf.TileSetSource.ResourceId;
        const tsd = await client.getResource<TileSetDefinition>(mdf.TileSetSource.ResourceId);
        if (tsd.TileStoreParameters.TileProvider == "Default") {
            const sTileWidth = tsd.TileStoreParameters.Parameter.find(p => p.Name == "TileWidth")?.Value;
            const sTileHeight = tsd.TileStoreParameters.Parameter.find(p => p.Name == "TileHeight")?.Value;
            if (!strIsNullOrEmpty(sTileWidth) && !strIsNullOrEmpty(sTileHeight)) {
                rt.TileWidth = parseInt(sTileWidth, 10);
                rt.TileHeight = parseInt(sTileHeight, 10);
            }
        } else if (tsd.TileStoreParameters.TileProvider == "XYZ") {
            rt.TileHeight = 256;
            rt.TileHeight = 256;
        }

        for (const bg of tsd.BaseMapLayerGroup) {
            groups.push({
                Name: bg.Name,
                DisplayInLegend: bg.ShowInLegend,
                LegendLabel: bg.LegendLabel,
                ObjectId: bg.Name,
                ExpandInLegend: bg.ExpandInLegend,
                Visible: bg.Visible,
                ActuallyVisible: bg.Visible,
                Type: 3 /* BaseMapFromTileSet */
            });

            for (const lyr of bg.BaseMapLayer) {
                layers.push({
                    Name: lyr.Name,
                    DisplayInLegend: lyr.ShowInLegend,
                    // We don't have stateless QUERYMAPFEATURES (yet), so there is no point actually respecting this flag
                    Selectable: false, //lyr.Selectable,
                    LegendLabel: lyr.LegendLabel,
                    ExpandInLegend: lyr.ExpandInLegend,
                    Visible: true,
                    ParentId: bg.Name,
                    ActuallyVisible: true,
                    LayerDefinition: lyr.ResourceId,
                    ObjectId: lyr.Name,
                    Type: 2 /* BaseMap */
                });
            }
        }
    }

    for (const grp of mdf.MapLayerGroup) {
        groups.push({
            Name: grp.Name,
            DisplayInLegend: grp.ShowInLegend,
            LegendLabel: grp.LegendLabel,
            ObjectId: grp.Name,
            ExpandInLegend: grp.ExpandInLegend,
            Visible: grp.Visible,
            ActuallyVisible: grp.Visible,
            Type: 1 /* Normal */
        });
    }

    for (const lyr of mdf.MapLayer) {
        layers.push({
            Name: lyr.Name,
            DisplayInLegend: lyr.ShowInLegend,
            // We don't have stateless QUERYMAPFEATURES (yet), so there is no point actually respecting this flag
            Selectable: false, // lyr.Selectable,
            LegendLabel: lyr.LegendLabel,
            ExpandInLegend: lyr.ExpandInLegend,
            Visible: true,
            ParentId: lyr.Group,
            ActuallyVisible: true,
            LayerDefinition: lyr.ResourceId,
            ObjectId: lyr.Name,
            Type: 1 /* Dynamic */
        })
    }

    rt.Group = groups;
    rt.Layer = layers;

    return rt;
}
/**
 * Converts AppDef map groups into viewer map entries with runtime map and layer metadata.
 */
export function setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<SubjectLayerType>, config: any, warnings: string[], locale: string, pendingMapDefs?: Dictionary<MapToLoad>): Dictionary<MapInfo> {
    const dict: Dictionary<MapInfo> = {};
    if (appDef.MapSet) {
        for (const mGroup of appDef.MapSet.MapGroup) {
            let mapName: string | undefined;
            //Setup external layers
            const initExternalLayers = [] as IGenericSubjectMapLayer[];
            const externalBaseLayers = [] as IExternalBaseLayer[];
            let subject: SubjectLayerType | undefined;
            //Need to do this in 2 passes. 1st pass to try and get the MG map
            for (const map of mGroup.Map) {
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
                        const mapDef = mapsByName[name];
                        if (isRuntimeMap(mapDef) && mapDef.MapDefinition == map.Extension.ResourceId) {
                            mapName = name;
                            subject = mapDef;
                            break;
                        }
                    }
                    // If not found in the eagerly-loaded maps, check if it is a pending lazy map
                    if (!mapName && pendingMapDefs) {
                        const groupId = mGroup["@id"];
                        if (pendingMapDefs[groupId]) {
                            mapName = groupId;
                            // subject remains undefined for pending maps
                        }
                    }
                }
            }
            const isArbitrary = isArbitraryCoordSys(subject);
            //2nd pass to process non-MG maps
            for (const map of mGroup.Map) {
                if (map.Type == "MapGuide") {
                    continue;
                }
                if (map.Type == TYPE_SUBJECT) {
                    mapName = mGroup["@id"];
                } else {
                    if (isArbitrary) {
                        warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_INCOMPATIBLE_LAYER", locale, { mapId: mGroup["@id"], type: map.Type }));
                    } else {
                        if (map.Type == TYPE_EXTERNAL) {
                            const layer = buildSubjectLayerDefn(map.Extension.layer_name, map);
                            if (layer.type == GenericSubjectLayerType.GeoTIFF && !supportsWebGL()) {
                                warnings.push(tr("INIT_WARNING_WEBGL_UNSUPPORTED", locale));
                            }
                            initExternalLayers.push(layer);
                        } else {
                            processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
                        }
                    }
                }
            }

            if (isArbitrary) {
                //Check for incompatible widgets
                for (const wset of appDef.WidgetSet) {
                    for (const widget of wset.Widget) {
                        switch (widget.Type) {
                            case "CoordinateTracker":
                                warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_UNSUPPORTED_WIDGET", locale, { mapId: mGroup["@id"], widget: widget.Type }));
                                break;
                        }
                    }
                }
            }

            applyInitialBaseLayerVisibility(externalBaseLayers);

            //Setup initial view
            let initialView: IMapView | undefined;
            if (mGroup.InitialView) {
                initialView = {
                    x: mGroup.InitialView.CenterX,
                    y: mGroup.InitialView.CenterY,
                    scale: mGroup.InitialView.Scale
                };
            }

            if (mapName) {
                const coordinateFormat = parseMapGroupCoordinateFormat(mGroup);
                const pendingEntry = pendingMapDefs?.[mapName];
                dict[mapName] = {
                    mapGroupId: mGroup["@id"],
                    map: mapsByName[mapName],
                    initialView: initialView,
                    externalBaseLayers: externalBaseLayers,
                    initialExternalLayers: initExternalLayers,
                    coordinateFormat: coordinateFormat,
                    // If this map is pending lazy creation, store the mapDef for later use
                    ...(pendingEntry ? { mapDef: pendingEntry.mapDef, metadata: pendingEntry.metadata } : {})
                };
            }
        }
    }
    return dict;
}
/**
 * Initializes viewer payload from an ApplicationDefinition document.
 */
async function initFromAppDefAsync(client: Client | undefined, options: IInitAsyncOptions, appDef: ApplicationDefinition, session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    if (Array.isArray(appDef.Extension?.CustomProjections?.Projection)) {
        for (const pd of appDef.Extension.CustomProjections.Projection) {
            let k, v;
            if (typeof (pd.epsg) === 'string' && typeof (pd.text) === 'string') { // appdef json form
                k = pd.epsg;
                v = pd.text;
            } else { // appdef xml translated form
                const [epsg] = pd["@epsg"];
                const [projStr] = pd["#text"];
                k = epsg;
                v = projStr;
            }
            if (!strIsNullOrEmpty(k) && !strIsNullOrEmpty(v)) {
                proj4.defs(`EPSG:${k}`, v);
                debug(`Registered proj4 defn from appdef for EPSG:${k}`, v);
            }
        }
        register(proj4);
    }
    const [mapsByName, pendingMapDefs, warnings] = await createRuntimeMapsAsync(client, options, session, appDef, isStateless(appDef), fl => getMapDefinitionsFromFlexLayout(fl), fl => getExtraProjectionsFromFlexLayout(fl), sessionWasReused);
    return await initFromAppDefCoreAsync(appDef, options, mapsByName, warnings, pendingMapDefs);
}
/**
 * Resolves the init document source and returns the normalized viewer init payload.
 */
export async function sessionAcquiredAsync(client: Client | undefined, options: IInitAsyncOptions, session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
    const { resourceId, locale } = options;
    if (!resourceId) {
        //Try assumed default location of appdef.json that we are assuming sits in the same place as the viewer html files
        const cl = new Client("", "mapagent");
        try {
            const fl = await cl.get<ApplicationDefinition>("appdef.json");
            return await initFromAppDefAsync(client, options, fl, session, sessionWasReused);
        } catch (e) { //The appdef.json doesn't exist at the assumed default location?
            throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
        }
    } else {
        if (typeof (resourceId) == 'string') {
            if (strEndsWith(resourceId, "WebLayout")) {
                assertIsDefined(client);
                const wl = await client.getResource<WebLayout>(resourceId, { SESSION: await session.getValueAsync() });
                return await initFromWebLayoutAsync(client, options, wl, session, sessionWasReused);
            } else if (strEndsWith(resourceId, "ApplicationDefinition")) {
                assertIsDefined(client);
                const fl = await client.getResource<ApplicationDefinition>(resourceId, { SESSION: await session.getValueAsync() });
                return await initFromAppDefAsync(client, options, fl, session, sessionWasReused);
            } else {
                if (isResourceId(resourceId)) {
                    throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: resourceId }));
                } else {
                    //Assume URL to a appdef json document
                    let fl: ApplicationDefinition;
                    if (!client) {
                        // This wasn't set up with a mapagent URI (probably a non-MG viewer template), so make a new client on-the-fly
                        const cl = new Client("", "mapagent");
                        fl = await cl.get<ApplicationDefinition>(resourceId);
                    } else {
                        fl = await client.get<ApplicationDefinition>(resourceId);
                    }
                    return await initFromAppDefAsync(client, options, fl, session, sessionWasReused);
                }
            }
        } else {
            const doc = await resourceId();
            if (isWebLayout(doc as any)) {
                const wl = doc as WebLayout;
                return await initFromWebLayoutAsync(client, options, wl, session, sessionWasReused);
            }
            if (isAppDef(doc as any)) {
                const appDef = doc as ApplicationDefinition;
                return await initFromAppDefAsync(client, options, appDef, session, sessionWasReused);
            }
            throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
        }
    }
}