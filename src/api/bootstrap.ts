import proj from "ol/proj";
import proj4 from "proj4";

/**
 * Sets up key dependencies needed by the viewer:
 *
 *  - proj4js
 *  - polyfill for Promise
 *  - polyfill for fetch
 *
 * You must call this function if rolling your own viewer bundle. This is automatically
 * called in the default viewer bundle
 *
 * @export
 */
export function bootstrap() {
    require("es6-promise").polyfill();
    require('whatwg-fetch');
    proj.setProj4(proj4);
}