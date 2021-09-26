import { ApplicationDefinition } from '../api/contracts/fusion';
import { MapGroup, MapLayer, RuntimeMap } from '../api/contracts/runtime-map';
import { Dictionary, IExternalBaseLayer, ReduxDispatch, ActiveMapTool, IMapView } from '../api/common';
import { MapInfo, IInitAppActionPayload, IRestoredSelectionSets, IGenericSubjectMapLayer } from './defs';
import { tr, DEFAULT_LOCALE } from '../api/i18n';
import { isResourceId, strEndsWith, strIsNullOrEmpty } from '../utils/string';
import { Client } from '../api/client';
import { applyInitialBaseLayerVisibility, IInitAsyncOptions, processLayerInMapGroup } from './init';
import { RuntimeMapFeatureFlags } from '../api/request-builder';
import { info, debug } from '../utils/logger';
import { MgError } from '../api/error';
import { resolveProjectionFromEpsgIoAsync } from '../api/registry/projections';
import { register } from 'ol/proj/proj4';
import proj4 from "proj4";
import { buildSubjectLayerDefn, getMapDefinitionsFromFlexLayout, isStateless, MapToLoad, ViewerInitCommand } from './init-command';
import { WebLayout } from '../api/contracts/weblayout';
import { convertWebLayoutUIItems, parseCommandsInWebLayout, ToolbarConf } from '../api/registry/command-spec';
import { clearSessionStore, retrieveSelectionSetFromLocalStorage } from '../api/session-store';
import * as shortid from 'shortid';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU, WEBLAYOUT_TOOLBAR } from "../constants";
import { registerCommand } from '../api/registry/command';
import { ensureParameters } from '../utils/url';
import { assertIsDefined } from '../utils/assert';
import { MapDefinition } from '../api/contracts/map-definition';
import { TileSetDefinition } from '../api/contracts/tile-set-definition';
import { AsyncLazy } from '../api/lazy';
import { SiteVersionResponse } from '../api/contracts/common';
import { isRuntimeMap } from '../utils/type-guards';

const TYPE_SUBJECT = "SubjectLayer";
const TYPE_EXTERNAL = "External";

/**
 * @since 0.14
 */
export type SubjectLayerType = RuntimeMap | IGenericSubjectMapLayer;

/**
 * Default viewer init commmand
 * 
 * @since 0.14
 */
export class DefaultViewerInitCommand extends ViewerInitCommand<SubjectLayerType> {
    private client: Client | undefined;
    private options: IInitAsyncOptions;
    constructor(dispatch: ReduxDispatch) {
        super(dispatch);
    }
    public attachClient(client: Client): void {
        this.client = client;
    }
    /**
     * @override
     * @protected
     * @param {Dictionary<RuntimeMap>} mapsByName
     * @memberof MgViewerInitCommand
     */
    protected establishInitialMapNameAndSession(mapsByName: Dictionary<SubjectLayerType>): [string, string] {
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
    private getDesiredTargetMapName(mapDef: string) {
        const lastSlash = mapDef.lastIndexOf("/");
        const lastDot = mapDef.lastIndexOf(".");
        if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) {
            return `${mapDef.substring(lastSlash + 1, lastDot)}`;
        } else {
            return `Map_${shortid.generate()}`;
        }
    }
    private async initFromWebLayoutAsync(webLayout: WebLayout, session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
        const [mapsByName, warnings] = await this.createRuntimeMapsAsync(session, webLayout, false, wl => [{ name: this.getDesiredTargetMapName(wl.Map.ResourceId), mapDef: wl.Map.ResourceId, metadata: {} }], () => [], sessionWasReused);
        const { locale, featureTooltipsEnabled, externalBaseLayers } = this.options;
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
        const [firstMapName, firstSessionId] = this.establishInitialMapNameAndSession(mapsByName);

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

        const tb = this.prepareSubMenus(menus)[0];
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
    private async tryDescribeRuntimeMapAsync(mapName: string, session: AsyncLazy<string>, mapDef: string) {
        assertIsDefined(this.client);
        try {
            const map = await this.client.describeRuntimeMap({
                mapname: mapName,
                requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                session: await session.getValueAsync()
            });
            return map;
        } catch (e) {
            if (e.message === "MgResourceNotFoundException") {
                const map = await this.client.createRuntimeMap({
                    mapDefinition: mapDef,
                    requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                    session: await session.getValueAsync(),
                    targetMapName: mapName
                });
                return map;
            }
            throw e;
        }
    }
    private isMapDefinition(arg: MapToLoad | IGenericSubjectMapLayer): arg is MapToLoad {
        return (arg as any).mapDef != null;
    }
    private async createRuntimeMapsAsync<TLayout>(session: AsyncLazy<string>, res: TLayout, isStateless: boolean, mapDefSelector: (res: TLayout) => (MapToLoad | IGenericSubjectMapLayer)[], projectionSelector: (res: TLayout) => string[], sessionWasReused: boolean): Promise<[Dictionary<SubjectLayerType>, string[]]> {
        const mapDefs = mapDefSelector(res);
        const mapPromises: Promise<RuntimeMap>[] = [];
        const warnings = [] as string[];
        const { locale } = this.options;
        const subjectLayers: Dictionary<IGenericSubjectMapLayer> = {};
        if (isStateless) {
            // We use an AsyncLazy because we only want to fetch the site version *iff* we encounter a MG map defn
            const siteVersion = new AsyncLazy<SiteVersionResponse>(async () => {
                assertIsDefined(this.client);
                const sv = await this.client.getSiteVersion();
                return sv;
            });
            for (const m of mapDefs) {
                if (this.isMapDefinition(m)) {
                    const siteVer = await siteVersion.getValueAsync();
                    assertIsDefined(this.client);
                    mapPromises.push(this.describeRuntimeMapStateless(this.client, siteVer.Version, m));
                }
            }
        } else {
            for (const m of mapDefs) {
                if (this.isMapDefinition(m)) {
                    //sessionWasReused is a hint whether to create a new runtime map, or recover the last runtime map state from the given map name
                    if (sessionWasReused) {
                        //FIXME: If the map state we're recovering has a selection, we need to re-init the selection client-side
                        info(`Session ID re-used. Attempting recovery of map state of: ${m.name}`);
                        mapPromises.push(this.tryDescribeRuntimeMapAsync(m.name, session, m.mapDef));
                    } else {
                        info(`Creating runtime map state (${m.name}) for: ${m.mapDef}`);
                        assertIsDefined(this.client);
                        mapPromises.push(this.client.createRuntimeMap({
                            mapDefinition: m.mapDef,
                            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                            session: await session.getValueAsync(),
                            targetMapName: m.name
                        }));
                    }
                }
            }
        }
        const maps = await Promise.all(mapPromises);
        const fetchEpsgs: { epsg: string, mapDef: string }[] = [];
        //All must be non-zero
        for (const m of maps) {
            const epsg = m.CoordinateSystem.EpsgCode;
            const mapDef = m.MapDefinition;
            if (epsg == "0") {
                throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", locale || DEFAULT_LOCALE, { mapDefinition: mapDef }));
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
        const epsgs = await Promise.all(fetchEpsgs.map(f => resolveProjectionFromEpsgIoAsync(f.epsg, locale, f.mapDef)));

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
            if (!this.isMapDefinition(gs)) {
                mapsByName[gs.name] = gs;
            }
        }
        return [mapsByName, warnings];
    }
    private async describeRuntimeMapStateless(client: Client, siteVersion: string, m: MapToLoad): Promise<RuntimeMap> {
        const { name, mapDef, metadata } = m;
        const mdf = await this.client?.getResource<MapDefinition>(mapDef, { username: "Anonymous" });
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
     * @override
     * @protected
     * @param {ApplicationDefinition} appDef
     * @param {Dictionary<SubjectLayerType>} mapsByName
     * @param {*} config
     * @param {string[]} warnings
     * @returns {Dictionary<MapInfo>}
     * @memberof MgViewerInitCommand
     */
    protected setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<SubjectLayerType>, config: any, warnings: string[]): Dictionary<MapInfo> {
        const dict: Dictionary<MapInfo> = {};
        if (appDef.MapSet) {
            for (const mGroup of appDef.MapSet.MapGroup) {
                let mapName: string | undefined;
                //Setup external layers
                const initExternalLayers = [] as IGenericSubjectMapLayer[];
                const externalBaseLayers = [] as IExternalBaseLayer[];
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
                                break;
                            }
                        }
                    } else if (map.Type == TYPE_SUBJECT) {
                        mapName = mGroup["@id"];
                    } else {
                        if (map.Type == TYPE_EXTERNAL) {
                            initExternalLayers.push(buildSubjectLayerDefn(map.Extension.layer_name, map));
                        } else {
                            processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
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
                    dict[mapName] = {
                        mapGroupId: mGroup["@id"],
                        map: mapsByName[mapName],
                        initialView: initialView,
                        externalBaseLayers: externalBaseLayers,
                        initialExternalLayers: initExternalLayers
                    };
                }
            }
        }
        return dict;
    }
    private async initFromAppDefAsync(appDef: ApplicationDefinition, session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
        const [mapsByName, warnings] = await this.createRuntimeMapsAsync(session, appDef, isStateless(appDef), fl => getMapDefinitionsFromFlexLayout(fl), fl => this.getExtraProjectionsFromFlexLayout(fl), sessionWasReused);
        return await this.initFromAppDefCoreAsync(appDef, this.options, mapsByName, warnings);
    }
    private async sessionAcquiredAsync(session: AsyncLazy<string>, sessionWasReused: boolean): Promise<IInitAppActionPayload> {
        const { resourceId, locale } = this.options;
        if (!resourceId) {
            throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
        } else {
            if (typeof (resourceId) == 'string') {
                if (strEndsWith(resourceId, "WebLayout")) {
                    assertIsDefined(this.client);
                    const wl = await this.client.getResource<WebLayout>(resourceId, { SESSION: await session.getValueAsync() });
                    return await this.initFromWebLayoutAsync(wl, session, sessionWasReused);
                } else if (strEndsWith(resourceId, "ApplicationDefinition")) {
                    assertIsDefined(this.client);
                    const fl = await this.client.getResource<ApplicationDefinition>(resourceId, { SESSION: await session.getValueAsync() });
                    return await this.initFromAppDefAsync(fl, session, sessionWasReused);
                } else {
                    if (isResourceId(resourceId)) {
                        throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: resourceId }));
                    } else {
                        //Assume URL to a appdef json document
                        let fl: ApplicationDefinition;
                        if (!this.client) {
                            // This wasn't set up with a mapagent URI (probably a non-MG viewer template), so make a new client on-the-fly
                            const cl = new Client("", "mapagent");
                            fl = await cl.get<ApplicationDefinition>(resourceId);
                        } else {
                            fl = await this.client.get<ApplicationDefinition>(resourceId);
                        }
                        return await this.initFromAppDefAsync(fl, session, sessionWasReused);
                    }
                }
            } else {
                const fl = await resourceId();
                return await this.initFromAppDefAsync(fl, session, sessionWasReused);
            }
        }
    }
    public async runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload> {
        this.options = options;
        await this.initLocaleAsync(this.options);
        let sessionWasReused = false;
        let session: AsyncLazy<string>;
        if (!this.options.session) {
            session = new AsyncLazy<string>(async () => {
                assertIsDefined(this.client);
                const sid = await this.client.createSession("Anonymous", "");
                return sid;
            });
        } else {
            info(`Re-using session: ${this.options.session}`);
            sessionWasReused = true;
            session = new AsyncLazy<string>(() => Promise.resolve(this.options.session!));
        }
        const payload = await this.sessionAcquiredAsync(session, sessionWasReused);
        if (sessionWasReused) {
            let initSelections: IRestoredSelectionSets = {};
            for (const mapName in payload.maps) {
                const sset = await retrieveSelectionSetFromLocalStorage(session, mapName);
                if (sset) {
                    initSelections[mapName] = sset;
                }
            }
            payload.initialSelections = initSelections;
            try {
                //In the interest of being a responsible citizen, clean up all selection-related stuff from
                //session store
                await clearSessionStore();
            } catch (e) {

            }
        }

        return payload;
    }
}