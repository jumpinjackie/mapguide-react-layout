import type Map from 'ol/Map';
import type { FeatureLike } from 'ol/Feature';
import { extendCoordinate, isEmpty, type Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import Point from 'ol/geom/Point';

/**
 * Handles the zoom-to action when a clustered feature is clicked.
 * 
 * If the clicked feature represents a cluster (i.e., contains multiple features),
 * this function calculates the combined extent of all features in the cluster and
 * animates the map view to fit that extent with padding.
 *
 * @param map - The OpenLayers Map instance to operate on.
 * @param fs - An array of features, where the first feature is expected to be a cluster
 *             containing a 'features' property with the clustered features.
 * 
 * @since 0.15
 */
export function handleClusterZoomToClick(map: Map, fs: FeatureLike[], onBeforeZoom?: () => void): void {
    // Get clustered Coordinates
    const features = fs[0].get('features') as FeatureLike[] | undefined;
    if (features) {
        if (features.length > 1) {
            const coords: Coordinate[] = [];
            for (const f of features) {
                const fg = f.getGeometry();
                if (fg && fg instanceof Point) {
                    coords.push(fg.getCoordinates());
                }
            }
            if (coords.length > 0) {
                const extent: Extent = [coords[0][0], coords[0][1], coords[0][0], coords[0][1]];
                for (let i = 1; i < coords.length; i++) {
                    extendCoordinate(extent, coords[i]);
                }
                if (extent && !isEmpty(extent)) {
                    map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
                }
            }
        }
    }
}
