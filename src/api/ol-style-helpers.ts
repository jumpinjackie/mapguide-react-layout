import { IVectorLayerStyle, IClusterSettings } from './ol-style-contracts';
import { OLStyleMapSet } from './ol-style-map-set';
import { LayerProperty } from './common';
import VectorTileLayer from 'ol/layer/VectorTile';
import { OLFeature, OLVectorLayer } from './ol-types';

/**
 * @since 0.14
 */
export const DEFAULT_STYLE_KEY = "default";

export function isClusteredFeature(feature: OLFeature): boolean {
    if (getClusterSubFeatures(feature)?.length) {
        return true;
    }
    return false;
}

export function getClusterSubFeatures(feature: OLFeature): OLFeature[] {
    return feature.get("features");
}

/**
 * Sets the vector layer style for the given OpenLayers vector layer using OL's
 * native flat style rules. The `IVectorLayerStyle` is converted to `Array<Rule>`
 * and passed directly to `layer.setStyle()` so that OL evaluates all expressions
 * natively at render time.
 *
 * An `OLStyleMapSet` is still stored on the layer under `LayerProperty.VECTOR_STYLE`
 * so that callers can read back the original style definition and cluster settings.
 *
 * @since 0.13
 * @since 0.14 style now takes IVectorLayerStyle instead of IVectorFeatureStyle and accepts an optional cluster style
 * and layer can be either a vector layer or a vector tile layer
 * @since 0.15 uses OL flat style rules instead of a dynamic style function
 */
export function setOLVectorLayerStyle(layer: OLVectorLayer | VectorTileLayer, style: IVectorLayerStyle, clusterStyle: IClusterSettings | undefined) {
    const olstyles = new OLStyleMapSet(style, clusterStyle);
    layer.set(LayerProperty.VECTOR_STYLE, olstyles);
    layer.setStyle(olstyles.toFlatRules() as any);
}

/**
 * Gets the `OLStyleMapSet` for the given style.
 *
 * @since 0.14
 * @since 0.15 No longer returns a dynamic style function tuple; use `setOLVectorLayerStyle`
 * for layer rendering and `OLStyleMapSet.toFlatRules()` for the rules array.
 */
export function getOLStyleFunction(style: IVectorLayerStyle, clusterStyle: IClusterSettings | undefined) {
    const olstyles = new OLStyleMapSet(style, clusterStyle);
    return [olstyles.toFlatRules(), olstyles] as const;
}