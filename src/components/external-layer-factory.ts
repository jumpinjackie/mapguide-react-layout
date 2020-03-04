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
import { setOLVectorLayerStyle, DEFAULT_POINT_CIRCLE_STYLE, DEFAULT_LINE_STYLE, DEFAULT_POLY_STYLE } from '../api/ol-style-helpers';
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from '../api/layer-manager/csv-driver';

export function createOLLayerFromSubjectDefn(defn: IGenericSubjectMapLayer | IInitialExternalLayer, isExternal: boolean): LayerBase {
    switch (defn.type) {
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
                    }
                });
                const layer = new VectorLayer({
                    source: vectorSource
                });
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? {
                    point: DEFAULT_POINT_CIRCLE_STYLE,
                    line: DEFAULT_LINE_STYLE,
                    polygon: DEFAULT_POLY_STYLE
                });
                layer.set(LayerProperty.LAYER_NAME, defn.name);
                layer.set(LayerProperty.LAYER_TYPE, defn.type);
                layer.set(LayerProperty.IS_SELECTABLE, true);
                layer.set(LayerProperty.IS_EXTERNAL, true);
                layer.set(LayerProperty.IS_GROUP, false);
                return layer;
            }
        case GenericSubjectLayerType.TileWMS:
            {
                const layer = new TileLayer({
                    source: new TileWMS({
                        ...defn.sourceParams
                    })
                });
                layer.set(LayerProperty.LAYER_TYPE, "WMS");
                layer.set(LayerProperty.IS_SELECTABLE, true); //Let's assume this WMS service is capable of GetFeatureInfo in GeoJSON representation
                layer.set(LayerProperty.IS_EXTERNAL, isExternal);
                layer.set(LayerProperty.IS_GROUP, false);
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