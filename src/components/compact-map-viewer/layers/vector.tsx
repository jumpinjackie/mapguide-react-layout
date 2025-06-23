import React from "react";
import { useOLMap } from "../context";
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { CommonLayerProps } from "./contracts";
import OLGeoJsonFormat, { type GeoJSONFeatureCollection } from "ol/format/GeoJSON";
import { useMapMessage } from "../messages";
import { useLayerState } from "./common";
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';

/**
 * Vector layer component props
 * 
 * @since 0.15
 */
export type VectorLayerProps = CommonLayerProps & {
    /**
     * If true, will try to fit the map's initial view to the extents of this layer. Really needs this
     * layer to have an initial set of features via initialFeatures or to be assigned 
     */
    fitInitialViewToThisLayer?: boolean;
    /**
     * An initial set of features to load into this layer
     */
    initialFeatures?: GeoJSONFeatureCollection;
    /**
     * The projection of these features
     */
    initialFeatureProjection?: string;
    /**
     * The backing observable collection of features. If not specified, this layer will maintain its
     * own internal copy. The reason you may want an externally managed feature collection is to share
     * this layer state with interaction components so they can operate on this layer's features
     */
    features?: Collection<Feature>;
};

/**
 * A layer component that displays vector features
 * 
 * @since 0.15
 */
export const VectorLayer: React.FC<VectorLayerProps> = ({ name, isHidden, extent, features, initialFeatures, initialFeatureProjection, fitInitialViewToThisLayer }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<OLVectorLayer>(name, isHidden, extent);
    React.useEffect(() => {
        messages.addInfo("add vector layer");
        const vecSource = new OLVectorSource({
            features
        });
        const vecLayer = new OLVectorLayer({
            extent,
            source: vecSource
        });
        vecLayer.set("name", name);
        if (initialFeatures) {
            const format = new OLGeoJsonFormat();
            const features = format.readFeatures(initialFeatures, {
                featureProjection: map.getView().getProjection(),
                dataProjection: initialFeatureProjection ?? "EPSG:4326"
            });
            vecSource.addFeatures(features);
        }
        layer.current = vecLayer;
        map.addLayer(vecLayer);
        if (fitInitialViewToThisLayer) {
            const e = vecSource.getExtent();
            if (e) {
                map.getView().fit(e);
            }
        }
        return () => {
            map.removeLayer(vecLayer);
            messages.addInfo("removed vector layer");
        }
    }, []);
    // DOM breadcrumb so you know this component was indeed mounted
    return <noscript data-map-component="VectorLayer" />;
};