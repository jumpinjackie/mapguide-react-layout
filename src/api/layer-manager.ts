import { LayerProperty, ILayerManager, ILayerInfo, IParseFeaturesFromFileOptions, IAddLayerFromParsedFeaturesOptions, SourceProperty, IWmsLayerExtensions, LayerExtensions } from './common';
import olSourceVector from "ol/source/Vector";
import olMap from "ol/Map";
import olLayerBase from "ol/layer/Base";
import { setOLVectorLayerStyle } from './ol-style-helpers';
import olTileLayer from "ol/layer/Tile";
import olImageLayer from "ol/layer/Image";
import olWmsSource from "ol/source/ImageWMS";
import olTileWmsSource from "ol/source/TileWMS";
import olVectorLayer from "ol/layer/Vector";
import { getFormatDrivers } from './layer-manager/driver-registry';
import { IFormatDriver } from './layer-manager/format-driver';
import { tr } from './i18n';
import { IParsedFeatures } from './layer-manager/parsed-features';
import { LayerSetGroupBase } from './layer-set-group-base';
import { IInitialExternalLayer } from '../actions/defs';
import { IVectorLayerStyle, DEFAULT_VECTOR_LAYER_STYLE, IClusterSettings, ClusterClickAction, DEFAULT_CLUSTERED_LAYER_STYLE, IBasicVectorPointStyle, IBasicVectorPolygonStyle, IBasicVectorLineStyle } from './ol-style-contracts';
import { OLStyleMapSet } from './ol-style-map-set';
import { clusterSourceIfRequired } from '../components/external-layer-factory';
import colorbrewer from "colorbrewer";

export const COLOR_BREWER_LIMIT = 9;

function cloneObject<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as T;
}

function clonePointWithFill(baseTemplate: IBasicVectorPointStyle | undefined, fillColor: string) {
    if (!baseTemplate) {
        return undefined;
    }
    const clone = cloneObject(baseTemplate);
    switch (clone.type) {
        case "Circle":
            clone.fill.color = fillColor;
            break;
    }
    return clone;
}
function cloneLineWithFill(baseTemplate: IBasicVectorLineStyle | undefined, fillColor: string) {
    if (!baseTemplate) {
        return undefined;
    }
    const clone = cloneObject(baseTemplate);
    clone.color = fillColor;
    return clone;
}
function clonePolyWithFill(baseTemplate: IBasicVectorPolygonStyle | undefined, fillColor: string) {
    if (!baseTemplate) {
        return undefined;
    }
    const clone = cloneObject(baseTemplate);
    clone.fill.color = fillColor;
    return clone;
}

export function getLayerInfo(layer: olLayerBase, isExternal: boolean): ILayerInfo {
    let vectorStyle: IVectorLayerStyle | undefined;
    let cs: IClusterSettings | undefined;
    let ext: LayerExtensions | undefined;
    if (layer instanceof olImageLayer || layer instanceof olTileLayer) {
        const source = layer.getSource();
        if (layer.get(LayerProperty.HAS_WMS_LEGEND) == true && (source instanceof olWmsSource || source instanceof olTileWmsSource)) {
            ext = {
                type: "WMS",
                getLegendUrl: (res?: number) => source.getLegendUrl(res)
            } as IWmsLayerExtensions;
        }
    }
    if (layer instanceof olVectorLayer) {
        const vs: OLStyleMapSet | undefined = layer.get(LayerProperty.VECTOR_STYLE);
        if (vs) {
            vectorStyle = vs.toVectorLayerStyle();
            cs = vs.toClusterSettings();
        }
    }
    return {
        visible: layer.getVisible(),
        selectable: layer.get(LayerProperty.IS_SELECTABLE) == true,
        name: layer.get(LayerProperty.LAYER_NAME),
        displayName: layer.get(LayerProperty.LAYER_DISPLAY_NAME) ?? layer.get(LayerProperty.LAYER_NAME),
        description: layer.get(LayerProperty.LAYER_DESCRIPTION),
        type: layer.get(LayerProperty.LAYER_TYPE),
        opacity: layer.getOpacity(),
        isExternal: isExternal,
        extensions: ext,
        vectorStyle,
        cluster: cs,
        busyWorkerCount: layer.get(LayerProperty.BUSY_WORKER_COUNT) ?? 0,
        metadata: layer.get(LayerProperty.LAYER_METADATA)
    }
}

export class LayerManager implements ILayerManager {
    private _olFormats: IFormatDriver[];
    constructor(private map: olMap, private layerSet: LayerSetGroupBase) {
        this._olFormats = getFormatDrivers();
    }
    tryGetSubjectLayer(): olLayerBase | undefined {
        return this.layerSet.tryGetSubjectLayer();
    }
    /**
     * INTERNAL API
     * @param {IInitialExternalLayer} extLayer
     * @returns
     * @memberof LayerManager
     */
    addExternalLayer(extLayer: IInitialExternalLayer, onlyAddIfNotExists: boolean) {
        if (onlyAddIfNotExists && this.hasLayer(extLayer.name)) {
            return undefined;
        }
        return this.layerSet.addExternalLayer(this.map, extLayer);
    }
    getLayers(): ILayerInfo[] {
        return this.layerSet.getCustomLayers(this.map);
    }
    hasLayer(name: string): boolean {
        return this.layerSet.hasLayer(name);
    }
    addLayer<T extends olLayerBase>(name: string, layer: T, allowReplace?: boolean | undefined): ILayerInfo {
        return this.layerSet.addLayer(this.map, name, layer, allowReplace);
    }
    removeLayer(name: string): olLayerBase | undefined {
        return this.layerSet.removeLayer(this.map, name);
    }
    getLayer<T extends olLayerBase>(name: string): T | undefined {
        return this.layerSet.getLayer(name);
    }
    apply(layers: ILayerInfo[]): void {
        this.layerSet.apply(this.map, layers);
    }
    parseFeaturesFromFile(options: IParseFeaturesFromFileOptions): Promise<IParsedFeatures> {
        const { file, name: layerName, locale } = options;
        const that = this;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const handler = async function (e: ProgressEvent<FileReader>) {
                const result = e.target?.result;
                if (result && typeof (result) == 'string') {
                    const formats = that._olFormats;
                    if (formats.length == 0) {
                        reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NO_FORMATS", locale)));
                    }
                    let loadedType: IParsedFeatures | undefined;
                    let bLoaded = false;
                    for (let i = 0, ii = formats.length; i < ii; ++i) {
                        const format = formats[i];
                        try {
                            loadedType = await format.tryParse(file.size, result);
                        } catch (e) {
                            //console.log(e);
                        }
                        if (loadedType && loadedType.hasFeatures()) {
                            loadedType.name = layerName;
                            bLoaded = true;
                            break;
                        }
                    }
                    if (bLoaded && loadedType) {
                        resolve(loadedType);
                    } else {
                        reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE", locale)));
                    }
                } else {
                    reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT", locale)));
                }
            };
            reader.addEventListener("load", handler);
            reader.readAsText(file);
        });
    }
    addLayerFromParsedFeatures(options: IAddLayerFromParsedFeaturesOptions): Promise<ILayerInfo> {
        const { features, projection, defaultStyle, extraOptions } = options;
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                let proj = projection;
                if (!proj) {
                    const view = that.map.getView();
                    proj = view.getProjection();
                }
                const source = new olSourceVector();
                source.set(SourceProperty.SUPPRESS_LOAD_EVENTS, true);

                let csArgs;
                if (extraOptions?.kind == "Cluster") {
                    csArgs = {
                        distance: extraOptions.clusterDistance
                    };
                }
                const layer = new olVectorLayer({
                    source: clusterSourceIfRequired(source, { cluster: csArgs }),
                    className: "external-vector-layer", //This is to avoid false positives for map.forEachLayerAtPixel
                    declutter: true
                });
                features.addTo(source, that.map.getView().getProjection(), proj);
                layer.set(LayerProperty.LAYER_NAME, features.name);
                layer.set(LayerProperty.LAYER_DISPLAY_NAME, features.name);
                layer.set(LayerProperty.LAYER_TYPE, features.type);
                layer.set(LayerProperty.IS_SELECTABLE, true);
                layer.set(LayerProperty.IS_EXTERNAL, true);
                layer.set(LayerProperty.IS_GROUP, false);
                let clusterSettings: IClusterSettings | undefined;
                if (extraOptions?.kind == "Cluster") {
                    clusterSettings = {
                        distance: extraOptions.clusterDistance,
                        onClick: ClusterClickAction.ShowPopup,
                        style: cloneObject(extraOptions.clusterStyle ?? defaultStyle ?? DEFAULT_CLUSTERED_LAYER_STYLE)
                    };
                }
                // Delete irrelevant styles based on geometry types encountered
                const bStyle: IVectorLayerStyle = defaultStyle ?? cloneObject(DEFAULT_VECTOR_LAYER_STYLE);
                if (!features.geometryTypes.includes("Point")) {
                    delete bStyle.default.point;
                    delete clusterSettings?.style.default.point;
                }
                if (!features.geometryTypes.includes("LineString")) {
                    delete bStyle.default.line;
                    delete clusterSettings?.style.default.line;
                }
                if (!features.geometryTypes.includes("Polygon")) {
                    delete bStyle.default.polygon;
                    delete clusterSettings?.style.default.polygon;
                }

                if (extraOptions?.kind == "Theme") {
                    const values = features.getDistinctValues(extraOptions.themeOnProperty);
                    let baseTemplatePoint = bStyle.default.point;
                    let baseTemplateLine = bStyle.default.line;
                    let baseTemplatePoly = bStyle.default.polygon;
                    const ruleCount = Math.min(values.length, COLOR_BREWER_LIMIT);
                    const th = extraOptions.colorBrewerTheme;
                    let ramp = colorbrewer[th];
                    if (!ramp) {
                        ramp = colorbrewer.Blues;
                    }
                    const palette = ramp[ruleCount];
                    for (let i = 0; i < ruleCount; i++) {
                        const v = values[i];
                        const filter = `${extraOptions.themeOnProperty} == '${v}'`;
                        (bStyle as any)[filter] = {
                            label: v,
                            point: clonePointWithFill(baseTemplatePoint, palette[i]),
                            line: cloneLineWithFill(baseTemplateLine, palette[i]),
                            polygon: clonePolyWithFill(baseTemplatePoly, palette[i]),
                        }
                    }
                }

                setOLVectorLayerStyle(layer, bStyle, clusterSettings);
                const layerInfo = that.addLayer(features.name, layer);
                resolve(layerInfo);
            } catch (e) {
                reject(e);
            }
        });
    }
}
