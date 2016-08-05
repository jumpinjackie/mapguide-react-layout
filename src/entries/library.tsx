import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "../components/app-layout";
import "../styles/index.css";
import * as ol from "openlayers"; 
const proj4 = require("proj4");
require("es6-promise").polyfill();
require('isomorphic-fetch');
ol.proj.setProj4(proj4);

export = {
    __DEV__: __DEV__,
    Application: App.ApplicationViewModel,
    Externals: {
        ol: ol,
        proj4: proj4,
        React: React,
        ReactDOM: ReactDOM
    }
};