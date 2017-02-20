import proj from "ol/proj";
const proj4 = require("proj4");

export function bootstrap() {
    require("es6-promise").polyfill();
    require('whatwg-fetch');
    proj.setProj4(proj4);
}