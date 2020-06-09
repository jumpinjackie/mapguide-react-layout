import { MgError } from "../api/error";
import { IExternalBaseLayer, LayerProperty } from "../api/common";
import { IGenericSubjectMapLayer, IInitialExternalLayer, GenericSubjectLayerType } from '../actions/defs';
import olSource from "ol/source/Source";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
import BingMaps from "ol/source/BingMaps";
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import LayerBase from "ol/layer/Base";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ClusterSource from 'ol/source/Cluster';
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from '../api/layer-manager/csv-driver';
import KML from 'ol/format/KML';
import GeoJSON from "ol/format/GeoJSON";
import { ExternalLayerFactoryRegistry } from '../api/registry/external-layer';
import { strIsNullOrEmpty } from '../utils/string';
import GeometryType from 'ol/geom/GeometryType';
import { setOLVectorLayerStyle } from '../api/ol-style-helpers';
import { DEFAULT_VECTOR_LAYER_STYLE } from '../api/ol-style-contracts';

function applyVectorLayerProperties(defn: IGenericSubjectMapLayer | IInitialExternalLayer, layer: LayerBase, isExternal: boolean) {
    layer.set(LayerProperty.LAYER_NAME, defn.name);
    layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
    layer.set(LayerProperty.LAYER_DISPLAY_NAME, defn.displayName);
    layer.set(LayerProperty.LAYER_TYPE, defn.type);
    layer.set(LayerProperty.IS_SELECTABLE, defn.selectable);
    layer.set(LayerProperty.IS_EXTERNAL, isExternal);
    layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
    layer.set(LayerProperty.IS_GROUP, false);
    layer.setVisible(defn.initiallyVisible);
}

const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] as any[] };

function clusterSourceIfRequired(source: VectorSource, def: IGenericSubjectMapLayer): ClusterSource | VectorSource {
    if (def.cluster) {
        const cluster = new ClusterSource({
            source: source,
            distance: def.cluster.distance,
            geometryFunction: (feature) => {
                const geometry = feature.getGeometry();
                if (geometry && geometry.getType() == GeometryType.POINT) {
                    return geometry;
                }
                return undefined as any;
            }
        });
        return cluster;
    }
    return source;
}

export function createOLLayerFromSubjectDefn(defn: IGenericSubjectMapLayer | IInitialExternalLayer, isExternal: boolean): LayerBase {
    switch (defn.type) {
        case GenericSubjectLayerType.GeoJSON_Inline:
            {
                const features = (new GeoJSON()).readFeatures(defn.sourceParams.features ?? EMPTY_GEOJSON);
                const source = new VectorSource({
                    features: features,
                    attributions: defn.sourceParams.attributions
                });
                const layer = new VectorLayer({
                    ...defn.layerOptions,
                    source: clusterSourceIfRequired(source, defn)
                });
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                applyVectorLayerProperties(defn, layer, isExternal);
                return layer;
            }
        case GenericSubjectLayerType.GeoJSON:
            {
                const source = new VectorSource({
                    url: defn.sourceParams.url,
                    format: new GeoJSON(),
                    attributions: defn.sourceParams.attributions
                });
                const layer = new VectorLayer({
                    ...defn.layerOptions,
                    source: clusterSourceIfRequired(source, defn)
                });
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                applyVectorLayerProperties(defn, layer, isExternal);
                return layer;
            }
        case GenericSubjectLayerType.CSV:
            {
                const vectorSource = new VectorSource({
                    loader: (_extent, _resolution, projection) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", defn.sourceParams.url);
                        const onError = () => vectorSource.clear();
                        xhr.onerror = onError;
                        xhr.onload = () => {
                            if (xhr.status == 200) {
                                const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
                                driver.tryParse(xhr.responseText.length, xhr.responseText).then(pf => {
                                    pf.addTo(vectorSource, projection, defn.meta?.projection);
                                }).catch(e => onError());
                            } else {
                                onError();
                            }
                        }
                        xhr.send();
                    },
                    attributions: defn.sourceParams.attributions
                });
                const layer = new VectorLayer({
                    ...defn.layerOptions,
                    source: clusterSourceIfRequired(vectorSource, defn)
                });
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                applyVectorLayerProperties(defn, layer, isExternal);
                return layer;
            }
        case GenericSubjectLayerType.KML:
            {
                const source = new VectorSource({
                    url: defn.sourceParams.url,
                    format: new KML(),
                    attributions: defn.sourceParams.attributions
                });
                const layer = new VectorLayer({
                    ...defn.layerOptions,
                    source: clusterSourceIfRequired(source, defn)
                });
                applyVectorLayerProperties(defn, layer, isExternal);
                return layer;
            }
        case GenericSubjectLayerType.TileWMS:
            {
                const layer = new TileLayer({
                    source: new TileWMS({
                        ...defn.sourceParams
                    })
                });
                layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
                layer.set(LayerProperty.LAYER_TYPE, "WMS");
                layer.set(LayerProperty.IS_SELECTABLE, true); //Let's assume this WMS service is capable of GetFeatureInfo in GeoJSON representation
                layer.set(LayerProperty.IS_EXTERNAL, isExternal);
                layer.set(LayerProperty.IS_GROUP, false);
                layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
                layer.setVisible(defn.initiallyVisible);
                return layer;
            }
        case GenericSubjectLayerType.CustomVector:
            {
                if (strIsNullOrEmpty(defn.driverName)) {
                    throw new Error("Missing required driverName");
                }
                const reg = ExternalLayerFactoryRegistry.getInstance();
                const factory = reg.getExternalVectorLayerCreator(defn.driverName);
                if (!factory) {
                    throw new Error(`Could not resolve an approriate factory for the given driver: ${defn.driverName}`);
                }
                const layer = factory(defn.sourceParams, defn.meta, defn.layerOptions) as VectorLayer;
                const source = clusterSourceIfRequired(layer.getSource(), defn);
                layer.setSource(source);
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                applyVectorLayerProperties(defn, layer, isExternal);
                return layer;
            }
        default:
            throw new Error(`Unknown subject layer type: ${defn.type}`);
    }
}

interface OLSourceCtor {
    new(options?: any): olSource;
}

/**
 * Creates an OpenLayers source based on the given external base layer definition
 *
 * @export
 * @param {IExternalBaseLayer} layer
 * @returns
 */
export function createExternalSource(layer: IExternalBaseLayer): olSource {
    let sourceCtor: OLSourceCtor;

    switch (layer.kind) {
        case "XYZ":
            sourceCtor = XYZ;
            break;
        case "OSM":
            sourceCtor = OSM;
            break;
        case "Stamen":
            sourceCtor = Stamen;
            break;
        case "BingMaps":
            sourceCtor = BingMaps;
            break;
        default:
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
    }
    if (typeof (layer.options) != 'undefined')
        return new sourceCtor(layer.options);
    else
        return new sourceCtor();
}