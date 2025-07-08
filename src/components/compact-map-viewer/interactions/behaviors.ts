import type Map from 'ol/Map';
import type { FeatureLike } from 'ol/Feature';
import { extendCoordinate, isEmpty, type Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import Point from 'ol/geom/Point';
import { type Feature, type MapBrowserEvent } from 'ol';
import Select from 'ol/interaction/Select';

function tryZoomToCluster(map: Map, fs: FeatureLike[]) {
    if (fs.length === 0) {
		return false; // No features to zoom to
	}
    // Get clustered Coordinates
    const features = fs[0]?.get('features') as FeatureLike[] | undefined;
    if (features) {
        if (features.length > 1) {
            const coords: Coordinate[] = [];
            for (const f of features) {
                const fg = f.getGeometry();
                // NOTE: We cannot build an extent from the extents of every feature as it cannot be reliably determined
                // to be "empty", resulting in potential zooming to unexpected extents. Instead since we can assume the
                // features are points (as this is the only cluster-able feature type), we can just build the final extent
                // from the raw coordinates of the point geometries
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
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Handles the zoom-to action when a clustered feature is clicked.
 *
 * If the clicked feature represents a cluster (i.e., contains multiple features),
 * this function calculates the combined extent of all features in the cluster and
 * animates the map view to fit that extent with padding.
 *
 * @param e - The MapBrowserEvent triggered by the click.
 * @param map - The OpenLayers Map instance to operate on.
 * @param fs - An array of features, where the first feature is expected to be a cluster
 *             containing a 'features' property with the clustered features.
 *
 * @since 0.15
 */
export function handleClusterZoomToClick(e: MapBrowserEvent, map: Map, fs: FeatureLike[]): void {
    tryZoomToCluster(map, fs);
}

export function handleClusterZoomToClickAndSelection(e: MapBrowserEvent, map: Map, fs: FeatureLike[]) {
    const sel = map
        .getInteractions()
        .getArray()
        .find(i => i instanceof Select);
    if (sel instanceof Select) {
        sel.getFeatures().clear();
    }
    const didZoom = tryZoomToCluster(map, fs);
    if (!didZoom) {
        const features = fs[0]?.get('features') as Feature[] | undefined;
        if (features && sel instanceof Select) {
            for (const f of fs) {
                sel.getFeatures().push(f as Feature);
            }
        }
    } else if (isAtLowestPossibleZoom(map) && sel instanceof Select) {
        for (const f of fs) {
            sel.getFeatures().push(f as Feature);
        }
    }
}

function isAtLowestPossibleZoom(map: Map): boolean {
    const view = map.getView();
    const zoom = view.getZoom();
    const maxZoom = view.getMaxZoom();
    return zoom === maxZoom;
}
