/**
 * runtime.ts
 *
 * This represents a runtime environment where components can interact with the map viewer
 * in the traditional way. This module is mainly for servicing the AJAX viewer API emulation.
 *
 * Where possible, use actions instead of this module
 */
import { debug } from '../utils/logger';

let _fusionRoot: string | undefined;

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