import { ViewerInitCommand } from './init-command';
import { Client } from '../api/client';
import { ReduxDispatch, Dictionary, IExternalBaseLayer, IMapView } from '../api/common';
import { IInitAsyncOptions, processLayerInMapGroup } from './init';
import { IInitAppActionPayload, IGenericSubjectMapLayer, MapInfo, IInitialExternalLayer } from './defs';
import { ApplicationDefinition, MapConfiguration } from '../api/contracts/fusion';
import { MgError } from '../api/error';
import { STR_EMPTY } from '../utils/string';

export const TYPE_SUBJECT = "SubjectLayer";
export const TYPE_EXTERNAL = "External";

function buildSubjectLayerDefn(name: string, map: MapConfiguration): IGenericSubjectMapLayer {
    const st = map.Extension.source_type;
    const initiallyVisible = map.Extension.initially_visible ?? true;
    const sp: any = {};
    const lo: any = {};
    const meta: any = {};
    const keys = Object.keys(map.Extension);
    let popupTemplate = map.Extension.popup_template;
    let selectable: boolean | undefined = map.Extension.is_selectable ?? true;
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
    return {
        name: name,
        displayName: map.Extension.display_name,
        driverName: map.Extension.driver_name,
        type: st,
        layerOptions: lo,
        sourceParams: sp,
        meta: (Object.keys(meta).length > 0 ? meta : undefined),
        initiallyVisible,
        selectable,
        popupTemplate,
        vectorStyle: map.Extension.vector_layer_style
    } as IGenericSubjectMapLayer;
}

export class GenericViewerInitCommand extends ViewerInitCommand<IGenericSubjectMapLayer> {
    constructor(dispatch: ReduxDispatch) {
        super(dispatch);
    }
    public attachClient(_client: Client): void { }
    protected establishInitialMapNameAndSession(mapsByName: Dictionary<IGenericSubjectMapLayer>): [string, string] {
        return [STR_EMPTY, STR_EMPTY];
    }
    protected setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<IGenericSubjectMapLayer>, config: any, warnings: string[]): Dictionary<MapInfo> {
        const dict: Dictionary<MapInfo> = {};
        if (appDef.MapSet) {
            for (const mGroup of appDef.MapSet.MapGroup) {
                const mapName = mGroup["@id"];
                //Setup external layers
                const externalBaseLayers = [] as IExternalBaseLayer[];
                const initialExternalLayers = [] as IInitialExternalLayer[];
                for (const map of mGroup.Map) {
                    if (map.Type != TYPE_SUBJECT) {
                        if (map.Type == TYPE_EXTERNAL) {
                            initialExternalLayers.push(buildSubjectLayerDefn(map.Extension.layer_name, map));
                        } else {
                            processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
                        }
                    }
                }

                //First come, first served
                if (externalBaseLayers.length > 0) {
                    externalBaseLayers[0].visible = true;
                }

                //Setup initial view
                let initialView: IMapView | undefined;
                if (mGroup.InitialView) {
                    initialView = {
                        x: mGroup.InitialView.CenterX,
                        y: mGroup.InitialView.CenterY,
                        scale: mGroup.InitialView.Scale
                    };
                }

                dict[mapName] = {
                    mapGroupId: mapName,
                    map: mapsByName[mapName],
                    initialView: initialView,
                    externalBaseLayers: externalBaseLayers,
                    initialExternalLayers: initialExternalLayers
                }
            }
        }
        return dict;
    }
    private async createRuntimeMapsAsync(res: ApplicationDefinition, projectionSelector: (res: ApplicationDefinition) => string[]): Promise<[Dictionary<IGenericSubjectMapLayer>, string[]]> {
        const warnings = [] as string[];
        const mapsByName: Dictionary<IGenericSubjectMapLayer> = {};
        if (res.MapSet?.MapGroup) {
            for (const mGroup of res.MapSet.MapGroup) {
                for (const map of mGroup.Map) {
                    if (map.Type == TYPE_SUBJECT) {
                        const name = mGroup["@id"];
                        mapsByName[name] = buildSubjectLayerDefn(name, map);
                    }
                }
            }
        }
        return [mapsByName, warnings];
    }
    public async runAsync(options: IInitAsyncOptions): Promise<IInitAppActionPayload> {
        if (typeof(options.resourceId) == 'string') {
            throw new MgError("Must provide a fetcher function for resourceId");
        }
        await this.initLocaleAsync(options);
        const appDef = await options.resourceId();
        const [mapsByName, warnings] = await this.createRuntimeMapsAsync(appDef, fl => this.getExtraProjectionsFromFlexLayout(fl));
        const res = await this.initFromAppDefCoreAsync(appDef, options, mapsByName, warnings);
        return res;
    }
}