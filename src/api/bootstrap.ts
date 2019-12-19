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
}