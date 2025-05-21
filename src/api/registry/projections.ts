import proj4 from "proj4";
import { MgError } from '../error';
import { tr } from '../i18n';
import { strIsNullOrEmpty } from '../../utils/string';
import { register } from 'ol/proj/proj4';
import { debug } from '../../utils/logger';

/**
 * Performs a projection definititon lookup for the given EPSG code
 *
 * @param {string | number} epsg
 * @param {string} locale
 * @param {string} mapDef
 * @returns {Promise<any>}
 * @since 0.13
 * @since 0.14.10 - Renamed to resolveProjectionFromEpsgCodeAsync from resolveProjectionFromEpsgIoAsync as this no longer hits epsg.io
 */
export async function resolveProjectionFromEpsgCodeAsync(epsg: string | number, locale: string, mapDef: string): Promise<any> {
    const r = await fetch(`https://spatialreference.org/ref/epsg/${epsg}/proj4.txt`);
    if (r.ok) {
        const defn = await r.text();
        proj4.defs(`EPSG:${epsg}`, defn);
        debug(`Registered projection EPSG:${epsg} from spatialreference.org`);
        return proj4.defs[`EPSG:${epsg}`];
    } else {
        throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", locale, { epsg: epsg, mapDefinition: mapDef }));
    }
}

/**
 * Ensures the given projection (by EPSG code) exists and if not invokes the given factory function (or does an epsg lookup)
 * to fetch the definition to be registered.
 * 
 * Once registered, it will update the projection set within OpenLayers
 * 
 * @param {number} epsgCode
 * @param {() => Promise<string>} [factoryIfNotFound] A custom factory function to provide the required proj4js string for this projection. If not specified, an external epsg lookup will be done instead
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
            await resolveProjectionFromEpsgCodeAsync(epsgCode, locale, "");
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