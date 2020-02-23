
import { areNumbersEqual } from './number';
import { areArraysDifferent } from './array';
import { IMapView, LayerTransparencySet } from '../api/common';
import { RuntimeMap } from '../api/contracts/runtime-map';

/**
 * Determines if the given IMapView instances are equal or close to it
 *
 * @export
 * @param {(IMapView | undefined)} view
 * @param {(IMapView | undefined)} otherView
 * @returns {boolean}
 */
export function areViewsCloseToEqual(view: IMapView | undefined, otherView: IMapView | undefined): boolean {
    if (view && otherView) {
        return areNumbersEqual(view.x, otherView.x) &&
            areNumbersEqual(view.y, otherView.y) &&
            areNumbersEqual(view.scale, otherView.scale);
    } else {
        return false;
    }
}

/**
 * Indicates if the given runtime map instances are the same or have the same name
 *
 * @export
 * @param {RuntimeMap} map
 * @param {RuntimeMap} other
 * @returns {boolean}
 */
export function areMapsSame(map: RuntimeMap, other: RuntimeMap): boolean {
    if (map != other) {
        return map.Name == other.Name;
    }
    return true;
}

/**
 * Indicates if the given layer transparency sets are different
 * @param set 
 * @param other 
 */
export function layerTransparencyChanged(set: LayerTransparencySet, other: LayerTransparencySet): boolean {
    if ((!set && other) || (set && !other)) {
        return true;
    }
    const setLayers = Object.keys(set);
    const otherLayers = Object.keys(other);
    if (areArraysDifferent(setLayers, otherLayers))
        return true;

    for (const name of setLayers) {
        if (set[name] != other[name]) {
            return true;
        }
    }
    return false;
}