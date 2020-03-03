import { ViewerInitCommand } from './init-command';
import { Client } from '../api/client';
import { ReduxDispatch, Dictionary, IExternalBaseLayer, IMapView } from '../api/common';
import { IInitAsyncOptions, processLayerInMapGroup } from './init';
import { IInitAppActionPayload, IGenericSubjectMapLayer, MapInfo } from './defs';
import { ApplicationDefinition } from '../api/contracts/fusion';
import { MgError } from '../api/error';
import { STR_EMPTY } from '../utils/string';

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
                for (const map of mGroup.Map) {
                    if (map.Type != "OLGeneric") {
                        processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
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
                    externalBaseLayers: externalBaseLayers
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
                    if (map.Type == "OLGeneric") {
                        const name = mGroup["@id"];
                        const st = map.Extension.source_type;
                        const sp: any = {};
                        const meta: any = {};
                        const keys = Object.keys(map.Extension);
                        for (const k of keys) {
                            const spidx = k.indexOf("source_param_");
                            const midx = k.indexOf("meta_");
                            if (spidx == 0) {
                                const kn = k.substring("source_param_".length);
                                sp[kn] = map.Extension[k];
                            } else if (midx == 0) {
                                const kn = k.substring("meta_".length);
                                meta[kn] = map.Extension[k];
                            }
                        }
                        mapsByName[name] = {
                            name: name,
                            type: st,
                            sourceParams: sp,
                            meta: (Object.keys(meta).length > 0 ? meta : undefined) 
                        } as IGenericSubjectMapLayer;
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