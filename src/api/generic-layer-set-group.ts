import { LayerSetGroupBase } from './layer-set-group-base';
import { IGenericSubjectMapLayer } from '../actions/defs';
import { GenericLayerSetOL } from './generic-layer-set';
import { createExternalSource } from '../components/external-layer-factory';
import { tr } from './i18n';
import { IExternalBaseLayer, LayerProperty, MG_BASE_LAYER_GROUP_NAME, Bounds } from './common';
import View from 'ol/View';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import { get } from "ol/proj";

const DEFAULT_BOUNDS_3857: Bounds = [
    -20026376.39,
    -20048966.10,
    20026376.39,
    20048966.10
];
const DEFAULT_BOUNDS_4326: Bounds = [-180, -90, 180, 90];
const DEFAULT_MPU_4326 = 111319.49079327358;

function getMetersPerUnit(projection: string) {
    const proj = get(projection);
    return proj.getMetersPerUnit();
}

export class GenericLayerSetGroup extends LayerSetGroupBase {
    constructor(subject: IGenericSubjectMapLayer | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        locale: string | undefined) {
        super();
        this.mainSet = this.createLayerSetOL(subject, externalBaseLayers, locale);
        this.overviewSet = this.createLayerSetOL(subject, externalBaseLayers, locale);
    }
    private createExternalBaseLayer(ext: IExternalBaseLayer) {
        const extSource = createExternalSource(ext);
        const options: any = {
            title: ext.name,
            type: "base",
            visible: ext.visible === true,
            source: extSource
        };
        const tl = new TileLayer(options);
        tl.set(LayerProperty.LAYER_TYPE, ext.kind);
        tl.set(LayerProperty.LAYER_NAME, ext.name);
        tl.set(LayerProperty.IS_EXTERNAL, false);
        tl.set(LayerProperty.IS_GROUP, false);
        return tl;
    }
    private createLayerSetOL(subject: IGenericSubjectMapLayer | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        locale: string | undefined): GenericLayerSetOL {
        let projection = subject?.meta?.projection;
        let bounds: Bounds | undefined;
        let externalBaseLayersGroup: LayerGroup | undefined;
        if (externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", locale),
                layers: externalBaseLayers.map(ext => {
                    const tl = this.createExternalBaseLayer(ext);
                    return tl;
                })
            };
            externalBaseLayersGroup = new LayerGroup(groupOpts);
            externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
            externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
            externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
            projection = "EPSG:3857";
            bounds = DEFAULT_BOUNDS_3857;
        }
        let subjectLayer;
        if (subject?.meta) {
            projection = subject.meta.projection;
            bounds = subject.meta.extents;
        }
        if (!projection && !bounds) {
            projection = "EPSG:4326";
            bounds = DEFAULT_BOUNDS_4326;
        }
        const metersPerUnit = getMetersPerUnit(projection!);
        const view = new View({
            projection: projection
        });
        return new GenericLayerSetOL(view, subjectLayer, bounds!, externalBaseLayersGroup, projection!, metersPerUnit);
    }
}
