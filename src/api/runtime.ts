/**
 * runtime.ts
 *
 * This represents a runtime environment where components can interact with the map viewer
 * in the traditional way. This module is mainly for servicing the AJAX viewer API emulation.
 *
 * Where possible, use actions instead of this module
 */
import { IMapViewer } from "../api/common";
import { debug } from '../utils/logger';

let _fusionRoot: string | undefined;
let _viewer: IMapViewer | undefined;

/**
 * Sets the Fusion base URL
 *
 *
 * @param {string} root
 */
export function setFusionRoot(root: string): void {
    _fusionRoot = root;
    debug(`Fusion root set to: ${root}. Access to Fusion backend services and widget content will be relative to this value`);
}

/**
 * Gets the Fusion base URL
 *
 *
 * @returns {string}
 */
export function getFusionRoot(): string {
    return _fusionRoot || "../fusion";
}

/**
 * Sets the viewer instance. Called by the map viewer component when it has mounted.
 *
 * DO NOT CALL DIRECTLY
 *
 * @hidden
 * @param {IMapViewer} viewer
 */
export function setViewer(viewer: IMapViewer): void {
    _viewer = viewer;
}

/**
 * Gets whether the runtime environment is ready
 *
 *
 * @returns {boolean}
 */
export function isReady(): boolean {
    return _viewer != null;
}

/**
 * Gets the map viewer in this runtime environment
 *
 *
 * @returns {IMapViewer}
 * @deprecated You should be using the map provider context accessed via the {@link components/map-providers/context!useMapProviderContext} hook where possible
 */
export function getViewer(): IMapViewer | undefined {
    return _viewer;
}