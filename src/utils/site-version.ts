import { RuntimeMap } from '../api/contracts/runtime-map';

/**
 * Type alias for a MapGuide site version
 * @since 0.12.1
 */
export type SiteVersion = [number, number, number, number];

/**
 * Gets the MapGuide site version from the runtime map response
 * @param map 
 * @since 0.12
 */
export function getSiteVersion(map: RuntimeMap): SiteVersion {
    const [sMaj, sMin, sPatch, sRev] = map.SiteVersion.split(".");
    const vMaj = parseInt(sMaj, 10);
    const vMin = parseInt(sMin, 10);
    const vPatch = parseInt(sPatch, 10);
    const vRev = parseInt(sRev, 10);
    return [vMaj, vMin, vPatch, vRev];
}

/**
 * Tests if QUERYMAPFEATURES 4.0.0 API can be used with this version of MapGuide
 * @param version The site version
 * @since 0.12.1
 */
export function canUseQueryMapFeaturesV4(version: SiteVersion): boolean {
    const [vMaj, vMin, vPatch, vRev] = version;
    if (vMaj >= 4) {
        //Allow a 4.0 trunk/branch build
        if (vMaj == 4 && vMin == 0 && vPatch == 0 && vRev == 0) {
            return true;
        }
        //Test for > 4.0 preview 1
        if (vMaj == 4 && vMin == 0 && vPatch == 0) {
            return vRev > 9592; //This is the rev of preview 1
        }
        return true;
    }
    return false;
}