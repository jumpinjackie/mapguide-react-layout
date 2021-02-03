import { IVectorLayerStyle, IClusterSettings } from './ol-style-contracts';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { OLStyleMapSet } from './ol-style-map-set';
import Geometry from 'ol/geom/Geometry';
import { LayerProperty } from './common';
import VectorTileLayer from 'ol/layer/VectorTile';

/**
 * @since 0.14
 */
export const DEFAULT_STYLE_KEY = "default";

export function isClusteredFeature(feature: Feature): boolean {
    if (getClusterSubFeatures(feature)?.length) {
        return true;
    }
    return false;
}

export function getClusterSubFeatures(feature: Feature): Feature[] {
    return feature.get("features");
}

/**
 * Sets the vector layer style for the given OpenLayers vector layer
 * 
 * @since 0.13
 * @since 0.14 style now takes IVectorLayerStyle instead of IVectorFeatureStyle and accepts an optional cluster style 
 * and layer can be either a vector layer or a vector tile layer
 */
export function setOLVectorLayerStyle(layer: VectorLayer | VectorTileLayer, style: IVectorLayerStyle, clusterStyle: IClusterSettings | undefined) {
    const olstyles = new OLStyleMapSet(style, clusterStyle);
    layer.set(LayerProperty.VECTOR_STYLE, olstyles);
    const layerStyleFunc = function (feature: Feature<Geometry>) {
        //TODO: Perf opportunity, cache styles by type_filter|default. Of course, if we ever
        //decide to go for fully dynamic styles (where any property could be an expression to evaluate)
        //such styles are not candidates for caching.
        const sset: OLStyleMapSet = this;
        return sset.evaluateStyle(feature);
    }.bind(olstyles);
    layer.setStyle(layerStyleFunc);
}