import proj from "ol/proj";
import proj4 from "proj4";

export function bootstrap() {
    require("es6-promise").polyfill();
    require('whatwg-fetch');
    proj.setProj4(proj4);
}