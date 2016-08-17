import * as React from "react";
import * as ReactDOM from "react-dom";
import { initDefaultCommands } from "../api/default-commands";
import { ApplicationViewModel } from "./application";
import "../styles/index.css";
import * as ol from "openlayers"; 
const proj4 = require("proj4");
require("es6-promise").polyfill();
require('isomorphic-fetch');
ol.proj.setProj4(proj4);

initDefaultCommands();

export = {
    __DEV__: __DEV__,
    Application: ApplicationViewModel,
    Externals: {
        ol: ol,
        proj4: proj4,
        React: React,
        ReactDOM: ReactDOM
    }
};