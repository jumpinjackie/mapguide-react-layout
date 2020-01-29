import proj4 from "proj4";
import * as logger from "../../utils/logger";
import { MgError } from '../error';
import { tr } from '../i18n';
import { strIsNullOrEmpty } from '../../utils/string';
import { register } from 'ol/proj/proj4';

/**
 * Performs a projection definiiton lookup at epsg.io for the given EPSG code
 *
 * @export
 * @param {string | number} epsg
 * @param {string} locale
 * @param {string} mapDef
 * @returns {Promise<any>}
 * @since 0.13
 */
export async function resolveProjectionFromEpsgIoAsync(epsg: string | number, locale: string, mapDef: string): Promise<any> {
    const r = await fetch(`//epsg.io?format=json&q=${epsg}`);
    const resp = await r.json();
    if (resp.results && resp.results.length > 0) {
        proj4.defs(`EPSG:${epsg}`, resp.results[0].proj4);
        logger.debug(`Registered projection EPSG:${epsg} from epsg.io`);
        return proj4.defs[`EPSG:${epsg}`];
    } else {
        throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", locale, { epsg: epsg, mapDefinition: mapDef }));
    }
}

/**
 * Ensures the given projection (by EPSG code) exists and if not invokes the given factory function (or does an epsg.io lookup)
 * to fetch the definition to be registered.
 * 
 * Once registered, it will update the projection set within OpenLayers
 * 
 * @export
 * @param {number} epsgCode
 * @param {() => Promise<string>} [factoryIfNotFound] A custom factory function to provide the required proj4js string for this projection. If not specified, a lookup to epsg.io will be done instead
 * @param {string} alias
 * @returns {Promise<string>}
 * @since 0.13
 */
export async function ensureProjection(epsgCode: number, locale: string, alias?: string, factoryIfNotFound?: () => Promise<string>): Promise<[number, string]> {
    let resolvedName: string;
    let bAdded = false;
    const name = `EPSG:${epsgCode}`;
    if (proj4.defs[name]) {
        resolvedName = name;
    } else {
        if (factoryIfNotFound) {
            proj4.defs[name] = factoryIfNotFound();
            bAdded = true;
            resolvedName = name;
        } else {
            await resolveProjectionFromEpsgIoAsync(epsgCode, locale, "");
            resolvedName = name;
        }
    }
    //Register the alias if specified
    if (!strIsNullOrEmpty(alias) && !proj4.defs[alias]) {
        proj4.defs[alias] = proj4.defs[resolvedName];
        bAdded = true;
    }
    //Need to call re-register if proj4.defs got changed so OL can pick it up
    if (bAdded) {
        register(proj4);
    }
    return [epsgCode, resolvedName];
}