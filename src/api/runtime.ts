/**
 * runtime.ts
 * 
 * This represents a runtime environment where components can interact with the map viewer
 * in the traditional way. This module is mainly for servicing the AJAX viewer API emulation. 
 *
 * Where possible, use actions instead of this module
 */
import { isBounds, Bounds, IMapViewer } from "../components/map-viewer-base";
import { IMapView } from "../components/context";

let _viewer: IMapViewer = null;

/**
 * Sets the viewer instance. Called by the map viewer component when it has mounted.
 * 
 * @export
 * @param {IMapViewer} viewer
 */
export function setViewer(viewer: IMapViewer): void {
    _viewer = viewer;
}

/**
 * Gets whether the runtime environment is ready 
 * 
 * @export
 * @returns {boolean}
 */
export function isReady(): boolean {
    return _viewer != null;
}

/**
 * Gets the map viewer in this runtime environment 
 * 
 * @export
 * @returns {IMapViewer}
 */
export function getViewer(): IMapViewer {
    return _viewer;
}

/**
 * Gets the current scale for the given view or bounds
 * 
 * @export
 * @param {(IMapView|Bounds)} view
 * @returns {number}
 */
export function getCurrentScale(view: IMapView|Bounds): number {
    let scale;
    if (isBounds(view)) {
        if (_viewer != null) {
            scale = _viewer.getScaleForExtent(view);
        }
    } else {
        scale = view.scale; 
    }
    return scale;
}