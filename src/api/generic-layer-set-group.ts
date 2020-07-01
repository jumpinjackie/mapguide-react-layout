import { LayerSetGroupBase } from './layer-set-group-base';
import { IGenericSubjectMapLayer } from '../actions/defs';
import { GenericLayerSetOL } from './generic-layer-set';
import { createExternalSource, createOLLayerFromSubjectDefn } from '../components/external-layer-factory';
import { tr } from './i18n';
import { IExternalBaseLayer, LayerProperty, MG_BASE_LAYER_GROUP_NAME, Bounds, SourceProperty } from './common';
import View from 'ol/View';
import LayerBase from "ol/layer/Base";
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import { get } from "ol/proj";
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import { IImageLayerEvents } from './layer-set-contracts';
import ImageLayer from "ol/layer/Image";
import UrlTile from 'ol/source/UrlTile';

const DEFAULT_BOUNDS_3857: Bounds = [
    -20026376.39,
    -20048966.10,
    20026376.39,
    20048966.10
];
const DEFAULT_BOUNDS_4326: Bounds = [-180, -90, 180, 90];

function getMetersPerUnit(projection: string) {
    const proj = get(projection);
    return proj.getMetersPerUnit();
}

export class GenericLayerSetGroup extends LayerSetGroupBase {
    constructor(callback: IImageLayerEvents,
        subject: IGenericSubjectMapLayer | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        locale: string | undefined) {
        super(callback);
        this.mainSet = this.createLayerSetOL(subject, externalBaseLayers, locale, callback);
        this.overviewSet = this.createLayerSetOL(subject, externalBaseLayers, locale, callback);
        const progressNotifySources = this.mainSet.getSourcesForProgressTracking();
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get(LayerProperty.LAYER_NAME));
        }
        */
        for (const src of progressNotifySources) {
            const suppress: boolean | undefined = src.get(SourceProperty.SUPPRESS_LOAD_EVENTS);
            if (!(suppress == true))
                this.registerSourceEvents(src);
        }
    }
    /**
     * @override
     * @returns {(LayerBase | undefined)}
     * @memberof GenericLayerSetGroup
     */
    public tryGetSubjectLayer(): LayerBase | undefined {
        const gl = this.mainSet as GenericLayerSetOL;
        return gl.subjectLayer;
    }
    public tryGetWmsSource(): [LayerBase, (ImageWMS | TileWMS)] | undefined {
        const mainLayer = this.mainSet as GenericLayerSetOL;
        const { subjectLayer } = mainLayer;
        if (subjectLayer instanceof ImageLayer || subjectLayer instanceof TileLayer) {
            const source = subjectLayer.getSource();
            if (source instanceof ImageWMS || source instanceof TileWMS) {
                return [subjectLayer, source];
            }
        }
        return undefined;
    }
    private createExternalBaseLayer(ext: IExternalBaseLayer, callback: IImageLayerEvents) {
        const extSource = createExternalSource(ext);
        if (extSource instanceof UrlTile) {
            const loaders = callback.getBaseTileLoaders();
            if (loaders[ext.name])
                extSource.setTileLoadFunction(loaders[ext.name]);
        }
        const options: any = {
            title: ext.name,
            type: "base",
            visible: ext.visible === true,
            source: extSource
        };
        const tl = new TileLayer(options);
        tl.set(LayerProperty.LAYER_TYPE, ext.kind);
        tl.set(LayerProperty.LAYER_NAME, ext.name);
        tl.set(LayerProperty.LAYER_DISPLAY_NAME, ext.name);
        tl.set(LayerProperty.IS_EXTERNAL, false);
        tl.set(LayerProperty.IS_GROUP, false);
        return tl;
    }
    private createLayerSetOL(subject: IGenericSubjectMapLayer | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        locale: string | undefined,
        callback: IImageLayerEvents): GenericLayerSetOL {
        let projection = subject?.meta?.projection;
        let bounds: Bounds | undefined;
        let externalBaseLayersGroup: LayerGroup | undefined;
        if (externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", locale),
                layers: externalBaseLayers.map(ext => {
                    const tl = this.createExternalBaseLayer(ext, callback);
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
        if (subject) {
            subjectLayer = createOLLayerFromSubjectDefn(subject, false);
            if (subject.meta) {
                projection = subject.meta.projection;
                bounds = subject.meta.extents;
            }
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
