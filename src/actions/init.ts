import * as Constants from "../constants";
import { Client } from "../api/client";
import * as Runtime from "../api/runtime";
import { ReduxDispatch, Dictionary, ICommand, IMapView, CommandTarget } from "../api/common";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import { registerCommand, DefaultCommands } from "../api/registry/command";
import { DefaultComponentNames } from "../api/registry/component";
import {
    WebLayout,
    CommandDef,
    isBasicCommand,
    isTargetedCommand,
    isSeparatorItem,
    isFlyoutItem,
    isCommandItem,
    isInvokeURLCommand,
    isSearchCommand,
    UIItem
} from "../api/contracts/weblayout";
import {
    ApplicationDefinition,
    Widget,
    UIWidget,
    MapSetGroup,
    MapConfiguration,
    ContainerItem
} from "../api/contracts/fusion";
import {
    IExternalBaseLayer,
    ReduxThunkedAction,
    IMapViewer,
    ReduxAction
} from "../api/common";
import { strEndsWith } from "../utils/string";
import { IView } from "../api/contracts/common";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { tr } from "../api/i18n";
import { MgError } from "../api/error";
import * as logger from "../utils/logger";
import queryString = require("query-string");
import * as shortid from "shortid";
import { registerStringBundle, DEFAULT_LOCALE } from "../api/i18n";
import { assertNever } from "../utils/never";
const parse = require("url-parse");
import proj4 from "proj4";
import uniq = require("lodash.uniq");
import { ensureParameters } from "../utils/url";

interface IInitAppPayload {
    activeMapName: string;
    initialUrl: string;
    locale: string;
    maps: Dictionary<MapInfo>;
    config: any;
    capabilities: {
        hasTaskPane: boolean,
        hasTaskBar: boolean,
        hasStatusBar: boolean,
        hasNavigator: boolean,
        hasSelectionPanel: boolean,
        hasLegend: boolean,
        hasToolbar: boolean,
        hasViewSize: boolean
    },
    toolbars: any;
    warnings: string[]
}

function isUIWidget(widget: any): widget is UIWidget {
    return widget.WidgetType === "UiWidgetType";
}

function convertFlexLayoutUIItems(items: ContainerItem[], widgetsByKey: Dictionary<Widget>, locale: string, noToolbarLabels = false, canSupportFlyouts = true): any[] {
    return items.map(item => {
        switch (item.Function) {
            case "Widget":
                {
                    const widget = widgetsByKey[item.Widget];
                    //TODO: Offload to registry, just like commands and components
                    if (widget && isUIWidget(widget)) {
                        switch (widget.Type) {
                            case "Select":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Select, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Pan":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Pan, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            //case "PanQuery":
                            //case "PanOnClick":
                            case "Zoom":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Zoom, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ZoomOnClick": //Covers in and out. Look at Factor parameter
                                {
                                    const factor = parseFloat(widget.Extension.Factor);
                                    if (factor >= 1.0) {
                                        return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ZoomIn, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                                    } else {
                                        return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ZoomOut, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                                    }
                                }
                            case "InitialMapView":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ZoomExtents, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ZoomToSelection":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ZoomToSelection, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ExtentHistory": //Covers prev and next. Look at Direction parameter
                                {
                                    if (widget.Extension.Direction == "previous") {
                                        return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.PreviousView, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                                    } else {
                                        return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.NextView, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                                    }
                                }
                            //case "CenterSelection":
                            case "About":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.About, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "BufferPanel":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Buffer, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ClearSelection":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ClearSelection, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            //case "ColorPicker":
                            case "CoordinateTracker":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.CoordinateTracker, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "FeatureInfo":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.FeatureInfo, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Geolocation":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Geolocation, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            //case "GoogleStreetViewer":
                            case "Help":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Help, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Maptip":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.MapTip, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "MapMenu":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, componentName: DefaultComponentNames.MapMenu, flyoutId: `${DefaultComponentNames.MapMenu}_${shortid.generate()}`, parameters: widget.Extension };
                            case "Query":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Query, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "QuickPlot":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.QuickPlot, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Redline":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Redline, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "RefreshMap":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.RefreshMap, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            //case "SaveMap":
                            case "InvokeURL": //Commands with this name would've been registered beforehand
                            case "Search":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "SelectPolygon":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.SelectPolygon, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "SelectRadius":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.SelectRadius, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            //case "SelectRadiusValue":
                            case "SelectWithin":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.SelectWithin, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Theme":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Theme, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ViewOptions":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ViewerOptions, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "ZoomToSelection":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.ZoomToSelection, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "Measure":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: DefaultCommands.Measure, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            case "BasemapSwitcher":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, componentName: DefaultComponentNames.BaseMapSwitcher, flyoutId: `${DefaultComponentNames.BaseMapSwitcher}_${shortid.generate()}`, parameters: widget.Extension };
                            case "InvokeScript":
                                return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: (noToolbarLabels ? null : widget.Label), tooltip: widget.Tooltip, parameters: widget.Extension };
                            default:
                                return { error: tr("UNKNOWN_WIDGET", locale, { widget: widget.Type }) }
                        }
                    }
                }
            case "Separator":
                return { isSeparator: true };
            case "Flyout":
                return {
                    label: item.Label,
                    tooltip: item.Tooltip,
                    icon: item.ImageUrl,
                    spriteClass: item.ImageClass,
                    children: convertFlexLayoutUIItems(item.Item, widgetsByKey, locale)
                };
            default:
                assertNever(item);
        }
        return null;
    });
}

function convertWebLayoutUIItems(items: UIItem[] | undefined, cmdsByKey: Dictionary<CommandDef>, locale: string, noToolbarLabels = true, canSupportFlyouts = true): any[] {
    return (items || []).map(item => {
        if (isCommandItem(item)) {
            const cmdDef: CommandDef = cmdsByKey[item.Command];
            if (!cmdDef) {
                logger.warn(`Invalid reference to command: ${item.Command}`);
                return { error: tr("UNKNOWN_COMMAND_REFERENCE", locale, { command: item.Command }) };
            } else if (cmdDef.TargetViewer != "Dwf") {
                const commonParams: any = {};
                if (isTargetedCommand(cmdDef)) {
                    commonParams.Target = cmdDef.Target;
                    commonParams.TargetFrame = cmdDef.TargetFrame;
                }
                if (isBasicCommand(cmdDef)) {
                    let action: string = cmdDef.Action;
                    if (action == "ZoomRectangle") {
                        action = DefaultCommands.Zoom;
                    } else if (action == "FitToWindow") {
                        action = DefaultCommands.ZoomExtents;
                    } else if (action == "Refresh") {
                        action = DefaultCommands.RefreshMap;
                    }
                    return { command: action, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                } else {
                    switch (cmdDef["@xsi:type"]) {
                        case "ViewOptionsCommandType":
                            return { command: DefaultCommands.ViewerOptions, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "MeasureCommandType":
                            return { command: DefaultCommands.Measure, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "HelpCommandType":
                            return { command: DefaultCommands.Help, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "BufferCommandType":
                            return { command: DefaultCommands.Buffer, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "SelectWithinCommandType":
                            return { command: DefaultCommands.SelectWithin, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        case "GetPrintablePageCommandType":
                            return { command: DefaultCommands.QuickPlot, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                        default:
                            return { command: cmdDef.Name, label: (noToolbarLabels ? null : cmdDef.Label), tooltip: cmdDef.Tooltip, parameters: commonParams };
                    }
                }
            }
        } else if (isSeparatorItem(item)) {
            return { isSeparator: true };
        } else if (isFlyoutItem(item)) {
            return {
                label: item.Label,
                tooltip: item.Tooltip,
                children: convertWebLayoutUIItems(item.SubItem, cmdsByKey, locale, false, false)
            };
        } else {
            assertNever(item);
        }
        return null;
    }).filter(item => item != null);
}

function convertToCommandTarget(fusionCmdTarget: string): CommandTarget {
    switch (fusionCmdTarget) {
        case "SearchWindow":
        case "InvokeUrlWindow":
            return "NewWindow";
        case "TaskPane":
            return "TaskPane";
        default:
            return "SpecifiedFrame";
    }
}

function prepareSubMenus(tbConf: any): any {
    const prepared: any = {
        toolbars: {},
        flyouts: {}
    };
    for (const key in tbConf) {
        //Special case: Task pane. Transfer all to flyout
        if (key == Constants.WEBLAYOUT_TASKMENU) {
            const flyoutId = key;
            prepared.flyouts[flyoutId] = {
                children: tbConf[key].items
            }
        } else {
            prepared.toolbars[key] = {
                items: []
            };
            for (const item of tbConf[key].items) {
                //Special case: contextmenu is all inline
                if (item.children && key != Constants.WEBLAYOUT_CONTEXTMENU) {
                    const flyoutId = `${item.label}_${shortid.generate()}`;
                    prepared.toolbars[key].items.push({
                        label: item.label,
                        tooltip: item.tooltip,
                        icon: item.icon,
                        spriteClass: item.spriteClass,
                        flyoutId: flyoutId
                    });
                    prepared.flyouts[flyoutId] = {
                        children: item.children
                    }
                } else {
                    prepared.toolbars[key].items.push(item);
                }
            }
        }
    }
    return prepared;
}

async function resolveProjectionAsync(epsg: string, opts: IInitAsyncOptions, mapDef: string): Promise<any> {
    const r = await fetch(`//epsg.io?format=json&q=${epsg}`);
    const resp = await r.json();
    if (resp.results && resp.results.length > 0) {
        proj4.defs(`EPSG:${epsg}`, resp.results[0].proj4);
        logger.debug(`Registered projection EPSG:${epsg} from epsg.io`);
        return proj4.defs[`EPSG:${epsg}`];
    } else {
        throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", opts.locale, { epsg: epsg, mapDefinition: mapDef }));
    }
}

function getDesiredTargetMapName(mapDef: string) {
    const lastSlash = mapDef.lastIndexOf("/");
    const lastDot = mapDef.lastIndexOf(".");
    if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) {
        return `${mapDef.substring(lastSlash + 1, lastDot)}_${shortid.generate()}`;
    } else {
        return `Map_${shortid.generate()}`;
    }
}

type MapInfo = {
    mapGroupId: string;
    map: RuntimeMap;
    initialView: IMapView | null;
    externalBaseLayers: IExternalBaseLayer[];
}

function setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<RuntimeMap>, config: any, warnings: string[]): Dictionary<MapInfo> {
    const dict: Dictionary<MapInfo> = {};
    const mgGroups: Dictionary<MapSetGroup> = {};
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
                                })
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
                                })
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
            let initialView: IView | null = null;
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

function getMapGuideMapGroup(appDef: ApplicationDefinition): MapSetGroup[] {
    const configs = [] as MapSetGroup[];
    if (appDef.MapSet) {
        for (const mg of appDef.MapSet.MapGroup) {
            for (const map of mg.Map) {
                if (map.Type == "MapGuide") {
                    configs.push(mg);
                }
            }
        }
    }
    return configs;
}

function getMapGuideConfiguration(appDef: ApplicationDefinition): MapConfiguration[] {
    const configs = [] as MapConfiguration[];
    if (appDef.MapSet) {
        for (const mg of appDef.MapSet.MapGroup) {
            for (const map of mg.Map) {
                if (map.Type == "MapGuide") {
                    configs.push(map);
                }
            }
        }
    }
    return configs;
}

function getMapDefinitionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
    const configs = getMapGuideConfiguration(appDef);
    if (configs.length > 0) {
        return configs.map(c => c.Extension.ResourceId);
    }
    throw new MgError("No Map Definition found in Application Definition");
}

function getExtraProjectionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
    //The only widget we care about is the coordinate tracker
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
    return uniq(epsgs);
}

function processAndDispatchInitError(error: Error, includeStack: boolean, dispatch: ReduxDispatch, opts: IInitAsyncOptions): void {
    if (error.stack) {
        dispatch({
            type: Constants.INIT_ERROR,
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
            type: Constants.INIT_ERROR,
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
    locale?: string;
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
    session?: string;
    onInit?: (viewer: IMapViewer) => void;
}

interface IInitAsyncOptions extends IInitAppLayout {
    locale: string;
}

async function createRuntimeMapsAsync<TLayout>(client: Client, session: string, opts: IInitAsyncOptions, res: TLayout, mapDefSelector: (res: TLayout) => string[], projectionSelector: (res: TLayout) => string[]): Promise<[Dictionary<RuntimeMap>, string[]]> {
    const mapDefs = mapDefSelector(res);
    const mapPromises: Promise<RuntimeMap>[] = [];
    const warnings = [] as string[];
    for (const mapDef of mapDefs) {
        const promise = client.createRuntimeMap({
            mapDefinition: mapDef,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            session: session,
            targetMapName: `${getDesiredTargetMapName(mapDef)}`
        });
        mapPromises.push(promise);
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
    const epsgs = await Promise.all(fetchEpsgs.map(f => resolveProjectionAsync(f.epsg, opts, f.mapDef)));
    //Build the Dictionary<RuntimeMap> from loaded maps
    const mapsByName: Dictionary<RuntimeMap> = {};
    for (const map of maps) {
        mapsByName[map.Name] = map;
    }
    return [mapsByName, warnings];
}

async function initFromWebLayoutAsync(webLayout: WebLayout, opts: IInitAsyncOptions, session: string, client: Client): Promise<IInitAppPayload> {
    const [mapsByName, warnings] = await createRuntimeMapsAsync(client, session, opts, webLayout, wl => [ wl.Map.ResourceId ], wl => [])
    const cmdsByKey: any = {};
    //Register any InvokeURL and Search commands
    for (const cmd of webLayout.CommandSet.Command) {
        if (isInvokeURLCommand(cmd)) {
            registerCommand(cmd.Name, {
                url: cmd.URL,
                disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
                target: cmd.Target,
                targetFrame: cmd.TargetFrame,
                parameters: (cmd.AdditionalParameter || []).map(p => {
                    return { name: p.Key, value: p.Value };
                })
            });
        } else if (isSearchCommand(cmd)) {
            registerCommand(cmd.Name, {
                layer: cmd.Layer,
                prompt: cmd.Prompt,
                target: cmd.Target,
                targetFrame: cmd.TargetFrame,
                resultColumns: cmd.ResultColumns,
                filter: cmd.Filter,
                matchLimit: cmd.MatchLimit,
                title: cmd.Label,
            });
        }
        cmdsByKey[cmd.Name] = cmd;
    }
    const mainToolbar = (webLayout.ToolBar.Visible
                        ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, opts.locale)
                        : []);
    const taskBar = (webLayout.TaskPane.TaskBar.Visible
                    ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, opts.locale, false)
                    : []);
    const contextMenu = (webLayout.ContextMenu.Visible
                        ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, opts.locale, false)
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
    let initialView: IView | null = null;
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
    let firstMapName = "";
    let firstSessionId = "";
    for (const mapName in mapsByName) {
        if (!firstMapName && !firstSessionId) {
            const map = mapsByName[mapName];
            firstMapName = map.Name;
            firstSessionId = map.SessionId;
            maps[firstMapName] = {
                mapGroupId: map.Name,
                map: map,
                externalBaseLayers: opts.externalBaseLayers,
                initialView: initialView
            };
            break;
        }
    }

    const menus: any = {};
    menus[Constants.WEBLAYOUT_TOOLBAR] = {
        items: mainToolbar
    };
    menus[Constants.WEBLAYOUT_TASKMENU] = {
        items: taskBar
    };
    menus[Constants.WEBLAYOUT_CONTEXTMENU] = {
        items: contextMenu
    };
    
    return {
        activeMapName: firstMapName,
        initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", firstMapName, firstSessionId, opts.locale),
        maps: maps,
        locale: opts.locale,
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
        toolbars: prepareSubMenus(menus),
        warnings: warnings
    };
}

async function initFromAppDefAsync(appDef: ApplicationDefinition, opts: IInitAsyncOptions, session: string, client: Client): Promise<IInitAppPayload> {
    const [mapsByName, warnings] = await createRuntimeMapsAsync(client, session, opts, appDef, fl => getMapDefinitionsFromFlexLayout(fl), fl => getExtraProjectionsFromFlexLayout(fl));
    let initialTask: string;
    let taskPane: Widget|undefined;
    let viewSize: Widget|undefined;
    let hasLegend = false;
    let hasStatus = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasTaskBar = false;
    const config: any = {};
    const tbConf: any = {};
    const widgetsByKey: any = {};
    //Register any InvokeURL and Search commands. Also set capabilities along the way
    for (const widgetSet of appDef.WidgetSet) {
        for (const widget of widgetSet.Widget) {
            const cmd = widget.Extension;
            switch (widget.Type) {
                case "TaskPane":
                    taskPane = widget;
                    break;
                case "ViewSize":
                    viewSize = widget;
                    break;
                case "Legend":
                    hasLegend = true;
                    break;
                case "SelectionPanel":
                    hasSelectionPanel = true;
                    break;
                case "CursorPosition":
                case "SelectionInfo":
                    hasStatus = true;
                    break;
                case "Navigator":
                    hasNavigator = true;
                    break;
                case "Search":
                    registerCommand(widget.Name, {
                        layer: cmd.Layer,
                        prompt: cmd.Prompt,
                        resultColumns: cmd.ResultColumns,
                        filter: cmd.Filter,
                        matchLimit: cmd.MatchLimit,
                        title: cmd.Title,
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target
                    });
                    break;
                case "InvokeURL":
                    registerCommand(widget.Name, {
                        url: cmd.Url,
                        disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
                        target: convertToCommandTarget(cmd.Target),
                        targetFrame: cmd.Target,
                        parameters: (cmd.AdditionalParameter || []).map((p: any) => {
                            return { name: p.Key, value: p.Value };
                        })
                    });
                    break;
            }
            widgetsByKey[widget.Name] = widget;
        }
    }
    //Now build toolbar layouts
    for (const widgetSet of appDef.WidgetSet) {
        for (const cont of widgetSet.Container) {
            let tbName = cont.Name;
            tbConf[tbName] = { items: convertFlexLayoutUIItems(cont.Item, widgetsByKey, opts.locale) };
        }
        for (const w of widgetSet.Widget) {
            if (w.Type == "CursorPosition") {
                config.coordinateProjection = w.Extension.DisplayProjection;
                config.coordinateDecimals = w.Extension.Precision;
            }
        }
    }

    const maps = setupMaps(appDef, mapsByName, config, warnings);

    if (taskPane) {
        hasTaskBar = true; //Fusion flex layouts can't control the visiblity of this
        initialTask = taskPane.Extension.InitialTask || "server/TaskPane.html";
    } else {
        initialTask = "server/TaskPane.html";
    }

    if (appDef.Title) {
        document.title = appDef.Title || document.title;
    }

    let firstMapName = "";
    let firstSessionId = "";
    for (const mapName in mapsByName) {
        if (!firstMapName && !firstSessionId) {
            const map = mapsByName[mapName];
            firstMapName = map.Name;
            firstSessionId = map.SessionId;
            break;
        }
    }
    return {
        activeMapName: firstMapName,
        initialUrl: ensureParameters(initialTask, firstMapName, firstSessionId, opts.locale),
        locale: opts.locale,
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
        toolbars: prepareSubMenus(tbConf),
        warnings: warnings
    };
}

async function sessionAcquiredAsync(opts: IInitAsyncOptions, session: string, client: Client): Promise<IInitAppPayload> {
    if (!opts.resourceId) {
        throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", opts.locale));
    } else if (strEndsWith(opts.resourceId, "WebLayout")) {
        const wl = await client.getResource<WebLayout>(opts.resourceId, { SESSION: session });
        return await initFromWebLayoutAsync(wl, opts, session, client);
    } else if (strEndsWith(opts.resourceId, "ApplicationDefinition")) {
        const fl = await client.getResource<ApplicationDefinition>(opts.resourceId, { SESSION: session });
        return await initFromAppDefAsync(fl, opts, session, client);
    } else {
        throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", opts.locale, { resourceId: opts.resourceId }));
    }
} 

async function initAsync(options: IInitAsyncOptions, client: Client): Promise<IInitAppPayload> {
    //English strings are baked into this bundle. For non-en locales, we assume a strings/{locale}.json
    //exists for us to fetch
    if (options.locale != DEFAULT_LOCALE) {
        const r = await fetch(`strings/${options.locale}.json`);
        if (r.ok) {
            const res = await r.json();
            registerStringBundle(options.locale, res);
            logger.info(`Registered string bundle for locale: ${options.locale}`);
        } else {
            //TODO: Push warning to init error/warning reducer when we implement it
            logger.warn(`Failed to register string bundle for locale: ${options.locale}`);
        }
    }
    let session = options.session;
    if (!session) {
        session = await client.createSession("Anonymous", "");
    }
    return await sessionAcquiredAsync(options, session, client);
}

/**
 * Initializes the viewer
 *
 * @export
 * @param {IInitAppLayout} options
 * @returns {ReduxThunkedAction}
 */
export function initLayout(options: IInitAppLayout): ReduxThunkedAction {
    const parsed = parse(window.location.href);
    const query = queryString.parse(parsed.query);
    const options1 = {
        resourceId: query["resource"] || options.resourceId,
        locale: query["locale"] || options.locale || DEFAULT_LOCALE,
        session: query["session"] || options.session
    };
    const opts: IInitAsyncOptions = { ...options, ...options1 };
    return (dispatch, getState) => {
        const args = getState().config;
        if (args.agentUri && args.agentKind) {
            const client = new Client(args.agentUri, args.agentKind);
            initAsync(opts, client).then(payload => {
                dispatch({
                    type: Constants.INIT_APP,
                    payload
                });
                if (options.onInit) {
                    const viewer = Runtime.getViewer();
                    if (viewer) {
                        options.onInit(viewer);
                    }
                }
            }).catch(err => {
                processAndDispatchInitError(err, false, dispatch, opts);
            })
        }
    };
}

export function acknowledgeInitWarnings(): ReduxAction {
    return {
        type: Constants.INIT_ACKNOWLEDGE_WARNINGS
    }
}