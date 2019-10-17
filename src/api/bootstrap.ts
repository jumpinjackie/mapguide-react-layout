import proj from "ol/proj";
import proj4 from "proj4";
import { configureUrlQuery } from 'react-url-query';
const createHistory = require("history").createBrowserHistory;

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
    const history = createHistory();
    configureUrlQuery({ history });
}