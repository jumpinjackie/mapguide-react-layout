import { IInitAsyncOptions } from './init';
import { ReduxDispatch, Dictionary, CommandTarget, ActiveMapTool } from '../api/common';
import { IInitAppActionPayload, MapInfo } from './defs';
import { ICommandSpec, ToolbarConf, PreparedSubMenuSet, isFlyoutSpec, convertFlexLayoutUIItems, parseWidgetsInAppDef } from '../api/registry/command-spec';
import { makeUnique } from '../utils/array';
import { ApplicationDefinition, MapConfiguration } from '../api/contracts/fusion';
import { strIsNullOrEmpty } from '../utils/string';
import { SPRITE_INVOKE_URL, SPRITE_INVOKE_SCRIPT } from '../constants/assets';
import { warn, info } from '../utils/logger';
import { registerCommand } from '../api/registry/command';
import { tr, registerStringBundle, DEFAULT_LOCALE } from '../api/i18n';
import { WEBLAYOUT_CONTEXTMENU, WEBLAYOUT_TASKMENU } from "../constants";
import * as shortid from 'shortid';
import { Client } from '../api/client';
import { ActionType } from '../constants/actions';
import { ensureParameters } from '../utils/url';
import { MgError } from '../api/error';

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
        if (k.startsWith("Meta_")) {
            const sk = k.substring("Meta_".length);
            ext[sk] = extension[k];
        }
    }
    return ext;
}

export function getMapDefinitionsFromFlexLayout(appDef: ApplicationDefinition): MapToLoad[] {
    const configs = getMapGuideConfiguration(appDef);
    if (configs.length > 0) {
        return configs.map(c => ({ 
            name: c[0],
            mapDef: c[1].Extension.ResourceId,
            metadata: tryExtractMapMetadata(c[1].Extension)
        }));
    }
    throw new MgError("No Map Definition found in Application Definition");
}

export type MapToLoad = { name: string, mapDef: string, metadata: any };

export function isStateless(appDef: ApplicationDefinition) {
    // This appdef is stateless if:
    //
    //  1. It has a Stateless extension property set to "true" (ie. The author has opted-in to this feature)
    //  2. No MapGuide Map Definitions were found in the appdef
    if (appDef.Extension?.Stateless == "true")
        return true;

    try {
        return getMapDefinitionsFromFlexLayout(appDef).length == 0;
    } catch (e) {
        return true;
    }
}

export interface IViewerInitCommand {
    attachClient(client: Client): void;
    runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload>;
}

export abstract class ViewerInitCommand<TSubject> implements IViewerInitCommand {
    constructor(protected readonly dispatch: ReduxDispatch) { }
    public abstract attachClient(client: Client): void;
    public abstract runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload>;
    protected abstract establishInitialMapNameAndSession(mapsByName: Dictionary<TSubject>): [string, string];
    protected abstract setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<TSubject>, config: any, warnings: string[]): Dictionary<MapInfo>;
    protected async initLocaleAsync(options: IInitAsyncOptions): Promise<void> {
        //English strings are baked into this bundle. For non-en locales, we assume a strings/{locale}.json
        //exists for us to fetch
        const { locale } = options;
        if (locale != DEFAULT_LOCALE) {
            const r = await fetch(`strings/${locale}.json`);
            if (r.ok) {
                const res = await r.json();
                registerStringBundle(locale, res);
                // Dispatch the SET_LOCALE as it is safe to change UI strings at this point
                this.dispatch({
                    type: ActionType.SET_LOCALE,
                    payload: locale
                });
                info(`Registered string bundle for locale: ${locale}`);
            } else {
                //TODO: Push warning to init error/warning reducer when we implement it
                warn(`Failed to register string bundle for locale: ${locale}`);
            }
        }
    }
    protected getExtraProjectionsFromFlexLayout(appDef: ApplicationDefinition): string[] {
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
        return makeUnique(epsgs);
    }
    protected prepareSubMenus(tbConf: Dictionary<ToolbarConf>): [PreparedSubMenuSet, boolean] {
        const prepared: PreparedSubMenuSet = {
            toolbars: {},
            flyouts: {}
        };
        let bFoundContextMenu = false;
        for (const key in tbConf) {
            if (key == WEBLAYOUT_CONTEXTMENU) {
                bFoundContextMenu = true;
            }

            //Special cases: Task pane and Context Menu. Transfer all to flyout
            if (key == WEBLAYOUT_TASKMENU || key == WEBLAYOUT_CONTEXTMENU) {
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
                    if (isFlyoutSpec(item) && key != WEBLAYOUT_CONTEXTMENU) {
                        const flyoutId = `${item.label}_${shortid.generate()}`;
                        prepared.toolbars[key].items.push({
                            label: item.label,
                            tooltip: item.tooltip,
                            icon: item.icon,
                            spriteClass: item.spriteClass,
                            flyoutId: flyoutId
                        } as ICommandSpec);
                        prepared.flyouts[flyoutId] = {
                            children: item.children
                        }
                    } else {
                        prepared.toolbars[key].items.push(item);
                    }
                }
            }
        }
        return [prepared, bFoundContextMenu]
    }
    protected async initFromAppDefCoreAsync(appDef: ApplicationDefinition, options: IInitAsyncOptions, mapsByName: Dictionary<TSubject>, warnings: string[]): Promise<IInitAppActionPayload> {
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
        
        //Now build toolbar layouts
        for (const widgetSet of appDef.WidgetSet) {
            for (const cont of widgetSet.Container) {
                let tbName = cont.Name;
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

        const maps = this.setupMaps(appDef, mapsByName, config, warnings);

        

        if (appDef.Title) {
            document.title = appDef.Title || document.title;
        }

        const [firstMapName, firstSessionId] = this.establishInitialMapNameAndSession(mapsByName);
        const [tb, bFoundContextMenu] = this.prepareSubMenus(tbConf);
        if (!bFoundContextMenu) {
            warnings.push(tr("INIT_WARNING_NO_CONTEXT_MENU", locale, { containerName: WEBLAYOUT_CONTEXTMENU }));
        }
        return {
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
            initialActiveTool: ActiveMapTool.Pan
        };
    }
}
