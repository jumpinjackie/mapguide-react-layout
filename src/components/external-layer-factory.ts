import { MgError } from "../api/error";
import { Dictionary, IExternalBaseLayer, ILayerInfo, LayerProperty } from "../api/common";
import { IGenericSubjectMapLayer, IInitialExternalLayer, GenericSubjectLayerType } from '../actions/defs';
import olSource from "ol/source/Source";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import TileDebug from "ol/source/TileDebug";
import Stamen from "ol/source/Stamen";
import BingMaps from "ol/source/BingMaps";
import UTFGrid from "ol/source/UTFGrid";
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import LayerBase from "ol/layer/Base";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ClusterSource from 'ol/source/Cluster';
import VectorTileSource from 'ol/source/VectorTile';
import VectorTileLayer from 'ol/layer/VectorTile';
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from '../api/layer-manager/csv-driver';
import KML from 'ol/format/KML';
import GeoJSON from "ol/format/GeoJSON";
import MVT from 'ol/format/MVT';
import type { Options as MVTOptions } from 'ol/format/MVT';
import { ExternalLayerFactoryRegistry } from '../api/registry/external-layer';
import { strIsNullOrEmpty } from '../utils/string';
import { setOLVectorLayerStyle } from '../api/ol-style-helpers';
import { DEFAULT_VECTOR_LAYER_STYLE } from '../api/ol-style-contracts';
import VectorTile from "ol/VectorTile";
import Feature from "ol/Feature";
import { OLVectorLayer, OLVectorSource } from "../api/ol-types";
import geojsonvt from 'geojson-vt';
import Projection from "ol/proj/Projection";
import { ProjectionLike, get, equivalent } from "ol/proj";
import { AsyncLazy } from "../api/lazy";
import { debug } from "../utils/logger";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

function sameProjectionAs(proj1: ProjectionLike, proj2: ProjectionLike) {
    const nproj1 = get(proj1);
    const nproj2 = get(proj2);
    if (nproj1 && nproj2)
        return equivalent(nproj1, nproj2);
    else
        return true; // null == null, so yeah
}

// Converts geojson-vt data to GeoJSON
const geoJsonVt2GeoJSON = (key: string, value: any) => {
    if (value.geometry) {
        let type;
        const rawType = value.type;
        let geometry = value.geometry;

        if (rawType === 1) {
            type = 'MultiPoint';
            if (geometry.length == 1) {
                type = 'Point';
                geometry = geometry[0];
            }
        } else if (rawType === 2) {
            type = 'MultiLineString';
            if (geometry.length == 1) {
                type = 'LineString';
                geometry = geometry[0];
            }
        } else if (rawType === 3) {
            type = 'Polygon';
            if (geometry.length > 1) {
                type = 'MultiPolygon';
                geometry = [geometry];
            }
        }

        return {
            'type': 'Feature',
            'geometry': {
                'type': type,
                'coordinates': geometry,
            },
            'properties': value.tags,
        };
    } else {
        return value;
    }
};

async function getRawGeoJson(defn: IGenericSubjectMapLayer) {
    const { url } = defn.sourceParams;
    if (typeof (url) == 'string') {
        debug(`Fetching url: ${url}`);
        const resp = await fetch(url);
        let json = await resp.json();
        return json;
    } else if (typeof (url) == 'object' && !strIsNullOrEmpty(url.var_source)) {
        if (!window[url.var_source]) {
            throw new Error(`No such global var (${url.var_source})`);
        }
        return window[url.var_source];
    } else {
        throw new Error("Don't know how to process URL source");
    }
}

function createGeoJsonVectorSource(defn: IGenericSubjectMapLayer, mapProjection: ProjectionLike) {
    const { url, attributions } = defn.sourceParams;
    if (typeof (url) == 'string') {
        const source = new VectorSource({
            url: url,
            format: new GeoJSON(),
            attributions: attributions
        });
        return source;
    } else if (typeof (url) == 'object' && !strIsNullOrEmpty(url.var_source)) {
        if (!window[url.var_source]) {
            throw new Error(`No such global var (${url.var_source})`);
        }
        const vectorSource = new VectorSource({
            loader: (_extent, _resolution, projection) => {
                const format = new GeoJSON({
                    dataProjection: defn.meta?.projection,
                    featureProjection: mapProjection
                });
                const features = format.readFeatures(window[url.var_source]);
                vectorSource.addFeatures(features);
            },
            attributions: attributions
        });
        return vectorSource;
    } else {
        throw new Error("Don't know how to process URL source");
    }
}

function applyVectorLayerProperties(defn: IGenericSubjectMapLayer | IInitialExternalLayer, layer: LayerBase, isExternal: boolean) {
    layer.set(LayerProperty.LAYER_NAME, defn.name);
    layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
    layer.set(LayerProperty.LAYER_DISPLAY_NAME, defn.displayName);
    layer.set(LayerProperty.LAYER_TYPE, defn.type);
    layer.set(LayerProperty.IS_SELECTABLE, defn.selectable);
    layer.set(LayerProperty.DISABLE_HOVER, defn.disableHover);
    layer.set(LayerProperty.IS_EXTERNAL, isExternal);
    layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
    layer.set(LayerProperty.IS_GROUP, false);
    layer.set(LayerProperty.LAYER_METADATA, defn.meta);
    layer.set(LayerProperty.LAYER_DEFN, defn);
    layer.setVisible(defn.initiallyVisible);
}

const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] as any[] };

export function clusterSourceIfRequired(source: OLVectorSource, def: { cluster?: { distance: number } }): ClusterSource | OLVectorSource {
    if (def.cluster) {
        const cluster = new ClusterSource({
            source: source,
            distance: def.cluster.distance,
            geometryFunction: (feature) => {
                const geometry = feature.getGeometry();
                if (geometry && geometry.getType() == "Point") {
                    return geometry;
                }
                return undefined as any;
            }
        });
        return cluster;
    }
    return source;
}

export function createOLLayerFromSubjectDefn(defn: IGenericSubjectMapLayer | IInitialExternalLayer, mapProjection: ProjectionLike, isExternal: boolean, appSettings: Dictionary<string>): LayerBase {
    switch (defn.type) {
        case GenericSubjectLayerType.StaticImage:
            {
                const sourceArgs = {
                    ...defn.sourceParams
                };
                if (!sourceArgs.imageExtent)
                    sourceArgs.imageExtent = defn.meta?.extents;
                const layer = new ImageLayer({
                    source: new Static(sourceArgs)
                });
                layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
                layer.set(LayerProperty.LAYER_TYPE, "StaticImage");
                layer.set(LayerProperty.IS_SELECTABLE, false);
                layer.set(LayerProperty.IS_EXTERNAL, isExternal);
                layer.set(LayerProperty.IS_GROUP, false);
                layer.set(LayerProperty.LAYER_METADATA, defn.meta);
                layer.set(LayerProperty.LAYER_DEFN, defn);
                layer.setVisible(defn.initiallyVisible);
                return layer;
            }
        case GenericSubjectLayerType.XYZ:
            {
                const sourceArgs = {
                    ...defn.sourceParams
                };
                const layer = new TileLayer({
                    source: new XYZ(sourceArgs)
                });
                layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
                layer.set(LayerProperty.LAYER_TYPE, "XYZ");
                layer.set(LayerProperty.IS_SELECTABLE, false);
                layer.set(LayerProperty.IS_EXTERNAL, isExternal);
                layer.set(LayerProperty.IS_GROUP, false);
                layer.set(LayerProperty.LAYER_METADATA, defn.meta);
                layer.set(LayerProperty.LAYER_DEFN, defn);
                layer.setVisible(defn.initiallyVisible);
                return layer;
            }
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
                const isWebM = sameProjectionAs(mapProjection, "EPSG:3857");
                const asVT = defn.meta?.geojson_as_vt == true;
                if (asVT && isWebM) {
                    const lazyTileIndex = new AsyncLazy(async () => {
                        let json = await getRawGeoJson(defn);
                        if (defn.meta?.projection != "EPSG:4326") {
                            const gj = new GeoJSON({
                                dataProjection: defn.meta?.projection,
                                featureProjection: "EPSG:4326"
                            });
                            const features = gj.readFeatures(json);
                            json = gj.writeFeaturesObject(features, {
                                dataProjection: "EPSG:4326"
                            });
                        }
                        const tileIndex = geojsonvt(json, {
                            extent: 4096
                        });
                        return tileIndex;
                    });
                    const format = new GeoJSON({
                        // Data returned from geojson-vt is in tile pixel units
                        dataProjection: new Projection({
                            code: 'TILE_PIXELS',
                            units: 'tile-pixels',
                            extent: [0, 0, 4096, 4096],
                        }),
                    });
                    const vectorSource = new VectorTileSource({
                        projection: mapProjection,
                        tileUrlFunction: (tileCoord) => {
                            // Use the tile coordinate as a pseudo URL for caching purposes
                            return JSON.stringify(tileCoord);
                        },
                        tileLoadFunction: (tile: VectorTile, url) => {
                            const tileCoord = JSON.parse(url);
                            lazyTileIndex.getValueAsync().then(tileIndex => {
                                const data = tileIndex.getTile(
                                    tileCoord[0],
                                    tileCoord[1],
                                    tileCoord[2]
                                );
                                //console.log("Fetching tile", tileCoord, data);
                                const geojson = JSON.stringify(
                                    {
                                        type: 'FeatureCollection',
                                        features: data ? data.features : [],
                                    },
                                    geoJsonVt2GeoJSON
                                );
                                const grid = vectorSource.getTileGrid();
                                if (grid) {
                                    const features = format.readFeatures(geojson, {
                                        extent: grid.getTileCoordExtent(tileCoord),
                                        featureProjection: mapProjection,
                                    });
                                    tile.setFeatures(features);
                                }
                            });
                        }
                    });
                    const vectorLayer = new VectorTileLayer({
                        source: vectorSource,
                    });
                    setOLVectorLayerStyle(vectorLayer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                    applyVectorLayerProperties(defn, vectorLayer, isExternal);
                    return vectorLayer;
                } else {
                    if (asVT) {
                        console.warn("The geojson_as_vt meta option only applies if the MapGuide map or Primary Subject Layer is in EPSG:3857. This layer will be loaded as a regular GeoJSON layer");
                    }
                    const source = createGeoJsonVectorSource(defn, mapProjection);
                    const layer = new VectorLayer({
                        ...defn.layerOptions,
                        source: clusterSourceIfRequired(source, defn)
                    });
                    setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                    applyVectorLayerProperties(defn, layer, isExternal);
                    return layer;
                }
            }
        case GenericSubjectLayerType.MVT:
            {
                const mo: MVTOptions = {
                    idProperty: defn.sourceParams.mvtIdProperty
                };
                switch (defn.sourceParams.mvtFeatureClass) {
                    case "feature":
                        mo.featureClass = Feature;
                        break;
                }
                const source = new VectorTileSource({
                    url: defn.sourceParams.url,
                    format: new MVT(mo),
                    attributions: defn.sourceParams.attributions,
                    tileLoadFunction: function (tile: VectorTile, url) {
                        tile.setLoader(function (extent, resolution, projection) {
                            fetch(url).then(function (response) {
                                if (response.status == 200) {
                                    response.arrayBuffer().then(function (data) {
                                        const format = tile.getFormat() // ol/format/MVT configured as source format
                                        const features = format.readFeatures(data, {
                                            extent: extent,
                                            featureProjection: projection
                                        }).filter(f => f != null);
                                        tile.setFeatures(features as any); //Bug: Typing for setFeatures() should be accepting FeatureLike[]
                                    });
                                }
                            });
                        });
                    }
                });
                const layer = new VectorTileLayer({
                    ...defn.layerOptions,
                    source: source
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
                const sourceArgs = {
                    ...defn.sourceParams
                };
                const layer = new TileLayer({
                    source: new TileWMS(sourceArgs)
                });
                layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
                layer.set(LayerProperty.LAYER_TYPE, "WMS");
                layer.set(LayerProperty.IS_SELECTABLE, true); //Let's assume this WMS service is capable of GetFeatureInfo in GeoJSON representation
                layer.set(LayerProperty.IS_EXTERNAL, isExternal);
                layer.set(LayerProperty.IS_GROUP, false);
                layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
                layer.set(LayerProperty.LAYER_METADATA, defn.meta);
                layer.set(LayerProperty.LAYER_DEFN, defn);
                layer.setVisible(defn.initiallyVisible);
                return layer;
            }
        case GenericSubjectLayerType.WFS:
            {
                const sourceArgs = {
                    ...defn.sourceParams
                };
                const layer = new VectorLayer({
                    ...defn.layerOptions,
                    source: new VectorSource({
                        ...sourceArgs,
                        format: new GeoJSON({
                            dataProjection: defn.meta?.projection,
                            featureProjection: mapProjection
                        })
                    })
                });
                setOLVectorLayerStyle(layer, defn.vectorStyle ?? DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
                applyVectorLayerProperties(defn, layer, isExternal);
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
                const layer = factory(defn.sourceParams, defn.meta, defn.layerOptions, appSettings) as OLVectorLayer;
                const source = clusterSourceIfRequired(layer.getSource()!, defn);
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
        case "XYZDebug":
            sourceCtor = TileDebug;
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
        case "UTFGrid":
            sourceCtor = UTFGrid;
            break;
        default:
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
    }
    if (typeof (layer.options) != 'undefined')
        return new sourceCtor({ crossOrigin: "Anonymous", ...layer.options });
    else
        return new sourceCtor({ crossOrigin: "Anonymous" });
}