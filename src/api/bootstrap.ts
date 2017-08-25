import proj from "ol/proj";
import proj4 from "proj4";

/**
 * Sets up key dependencies needed by the viewer:
 *
 *  - proj4js
 *  - polyfill for fetch
 *
 * You must call this function if rolling your own viewer bundle. This is automatically
 * called in the default viewer bundle
 *
 * @export
 */
export function bootstrap() {
    require('whatwg-fetch');
    proj.setProj4(proj4);

    // For our little blue friend from Redmond
    if (typeof ((Object as any).assign) != 'function') {
        (Object as any).assign = function (target: any, varArgs: any) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            let to = { ...target };

            for (var index = 1; index < arguments.length; index++) {
                const nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    to = { ...to, ...nextSource };
                }
            }
            return to;
        };
    }
}