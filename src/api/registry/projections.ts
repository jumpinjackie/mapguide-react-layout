import proj4 from "proj4";
import * as logger from "../../utils/logger";
import { MgError } from '../error';
import { tr } from '../i18n';

/**
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
 *
 * @export
 * @param {number} epsgCode
 * @param {() => Promise<string>} [factoryIfNotFound] A custom factory function to provide the required proj4js string for this projection. If not specified, a lookup to epsg.io will be done instead
 * @returns {Promise<string>}
 * @since 0.13
 */
export async function ensureProjection(epsgCode: number, locale: string, factoryIfNotFound?: () => Promise<string>): Promise<[number, string]> {
    let resolvedName: string;
    const name = `EPSG:${epsgCode}`;
    if (proj4.defs[name]) {
        resolvedName = name;
    } else {
        if (factoryIfNotFound) {
            proj4.defs[name] = factoryIfNotFound();
            resolvedName = name;
        } else {
            await resolveProjectionFromEpsgIoAsync(epsgCode, locale, "");
            resolvedName = name;
        }
    }
    return [epsgCode, resolvedName];
}