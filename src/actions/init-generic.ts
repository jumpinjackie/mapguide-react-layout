import { ViewerInitCommand } from './init-command';
import { Client } from '../api/client';
import { ReduxDispatch, Dictionary } from '../api/common';
import { IInitAsyncOptions } from './init';
import { IInitAppActionPayload, IGenericSubjectMapLayer, MapInfo } from './defs';
import { ApplicationDefinition } from '../api/contracts/fusion';
import { MgError } from '../api/error';

export class GenericViewerInitCommand extends ViewerInitCommand<IGenericSubjectMapLayer> {
    constructor(dispatch: ReduxDispatch) {
        super(dispatch);
    }
    public attachClient(client: Client): void { }
    protected establishInitialMapNameAndSession(mapsByName: Dictionary<IGenericSubjectMapLayer>): [string, string] {
        throw new Error("Method not implemented.");
    }
    protected setupMaps(appDef: ApplicationDefinition, mapsByName: Dictionary<IGenericSubjectMapLayer>, config: any, warnings: string[]): Dictionary<MapInfo> {
        throw new Error("Method not implemented.");
    }
    private async createRuntimeMapsAsync(res: ApplicationDefinition, projectionSelector: (res: ApplicationDefinition) => string[]): Promise<[Dictionary<IGenericSubjectMapLayer>, string[]]> {
        const warnings = [] as string[];
        const mapsByName: Dictionary<IGenericSubjectMapLayer> = {};
        if (res.MapSet?.MapGroup) {
            for (const mgrp of res.MapSet.MapGroup) {
                for (const map of mgrp.Map) {
                    if (map.Type == "OLGeneric") {
                        const name = mgrp["@id"];
                        const { sourceType, ...rest } = map.Extension;
                        mapsByName[name] = {
                            name: name,
                            type: sourceType,
                            sourceParams: rest
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