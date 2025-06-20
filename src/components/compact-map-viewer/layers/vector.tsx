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

export type VectorLayerProps = CommonLayerProps & {
    fitInitialViewToThisLayer?: boolean;
    initialFeatures?: GeoJSONFeatureCollection;
    initialFeatureProjection?: string;
    features?: Collection<Feature>;
};

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
    return <noscript />;
};