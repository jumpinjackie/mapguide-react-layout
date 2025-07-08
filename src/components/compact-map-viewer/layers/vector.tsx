import React from 'react';
import { useOLMap } from '../context';
import type Map from 'ol/Map';
import OLVectorLayer, { type Options as OLVectorLayerOptions } from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import type { ClusterSettings, CommonLayerProps } from './contracts';
import OLGeoJsonFormat, { type GeoJSONFeatureCollection } from 'ol/format/GeoJSON';
import { useMapMessage } from '../messages';
import { useLayerState } from './common';
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';
import Cluster from 'ol/source/Cluster';
import { isEmpty } from 'ol/extent';
import { Breadcrumb } from '../breadcrumb';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import type { FeatureLike } from 'ol/Feature';

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
    /**
     * The style of the vector features
     */
    style?: OLVectorLayerOptions['style'];
    /**
     * Clustering settings
     */
    clusterSettings?: ClusterSettings;
    /**
     * An optional handler when features from this layer are clicked
     */
    onFeaturesClicked?: (e: MapBrowserEvent, map: Map, features: FeatureLike[]) => void;
};

/**
 * A layer component that displays vector features
 *
 * @since 0.15
 */
export const VectorLayer: React.FC<VectorLayerProps> = ({
    name,
    isHidden,
    extent,
    features,
    initialFeatures,
    initialFeatureProjection,
    fitInitialViewToThisLayer,
    clusterSettings,
    style,
    onFeaturesClicked
}) => {
    const { map, renderDomBreadcrumbs } = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<OLVectorLayer>(name, isHidden, extent);

    function updateClustering(l: OLVectorLayer, cs?: ClusterSettings) {
        //console.log("updateClustering", l, cs);
        const source = l.getSource();
        if (cs) {
            if (source instanceof Cluster) {
                if (cs.distance !== source.getDistance()) {
                    messages.addInfo('Updating cluster distance');
                    source.setDistance(cs.distance);
                }
                if (cs.minDistance !== source.getMinDistance()) {
                    messages.addInfo('Updating cluster min distance');
                    source.setMinDistance(cs.minDistance ?? 0);
                }
                if (cs.attributions !== source.getAttributions()) {
                    messages.addInfo('Updating cluster attributions');
                    source.setAttributions(cs.attributions);
                }
            } else {
                messages.addInfo('apply clustering to vector layer');
                const clusterSource = new Cluster({
                    distance: cs.distance,
                    minDistance: cs.minDistance ?? 0,
                    attributions: cs.attributions,
                    source: source as OLVectorSource
                });
                l.setSource(clusterSource);
            }
        } else {
            if (source instanceof Cluster) {
                const innerSource = source.getSource();
                messages.addInfo('vector layer has clustering applied, removing it');
                l.setSource(innerSource);
            } else {
                messages.addInfo('vector layer does not have clustering applied, no action needed');
            }
        }
    }

    const featureClickedHandler = React.useRef(onFeaturesClicked);
    React.useEffect(() => {
        featureClickedHandler.current = onFeaturesClicked;
    }, [onFeaturesClicked]);

    React.useEffect(() => {
        if (layer.current) {
            updateClustering(layer.current, clusterSettings);
        }
    }, [clusterSettings, layer]);

    React.useEffect(() => {
        function onMapClick(e: MapBrowserEvent) {
            if (layer.current && featureClickedHandler.current) {
                const clickedFeatures: FeatureLike[] = [];
                map.forEachFeatureAtPixel(e.pixel, (feature, currentLayer) => {
                    if (currentLayer === layer.current) {
                        clickedFeatures.push(feature);
                    }
                });
                featureClickedHandler.current(e, map, clickedFeatures);
            }
        }

        //console.log("VectorLayer mount", name, extent, features, initialFeatures, initialFeatureProjection, fitInitialViewToThisLayer);
        map.on('click', onMapClick);
        if (!layer.current) {
            messages.addInfo('add vector layer');
            const vecSource = new OLVectorSource({
                features: features ?? []
            });
            const vecLayer = new OLVectorLayer({
                extent,
                source: vecSource,
                style
            });
            vecLayer.set('name', name);
            if (initialFeatures) {
                const format = new OLGeoJsonFormat();
                const parsedFeatures = format.readFeatures(initialFeatures, {
                    featureProjection: map.getView().getProjection(),
                    dataProjection: initialFeatureProjection ?? 'EPSG:4326'
                });
                vecSource.addFeatures(parsedFeatures);
            }
            layer.current = vecLayer;
            updateClustering(layer.current, clusterSettings);
            map.addLayer(vecLayer);
            if (fitInitialViewToThisLayer) {
                const e = vecSource.getExtent();
                if (e && !isEmpty(e)) {
                    map.getView().fit(e);
                }
            }
        }
        return () => {
            //console.log("VectorLayer unmount", name, extent, features, initialFeatures, initialFeatureProjection, fitInitialViewToThisLayer);
            map.un('click', onMapClick);
            if (layer.current) {
                map.removeLayer(layer.current);
                messages.addInfo('removed vector layer');
                layer.current.dispose();
                layer.current = undefined;
            }
        };
    }, []);

    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="VectorLayer" />;
    }
    return null;
};
