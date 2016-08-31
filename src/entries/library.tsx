import * as React from "react";
import * as ReactDOM from "react-dom";
import { initDefaultCommands } from "../api/default-commands";
import { ApplicationViewModel } from "./application";
import { AjaxViewerLayout } from "../layouts/ajax-viewer";
import { SidebarLayout } from "../layouts/sidebar";
import { registerLayout } from "../api/registry/layout";
import { registerCommand } from "../api/registry/command";
import { registerComponentFactory } from "../api/registry/component";
import { registerDefaultComponents } from "../api/default-components";
import "../styles/index.css";
import * as ol from "openlayers"; 
const proj4 = require("proj4");
require("es6-promise").polyfill();
require('isomorphic-fetch');
ol.proj.setProj4(proj4);

registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
initDefaultCommands();
registerDefaultComponents();

export = {
    __DEV__: __DEV__,
    Layouts: {
        register: registerLayout
    },
    Commands: {
        register: registerCommand
    },
    Components: {
        register: registerComponentFactory
    },
    Application: ApplicationViewModel,
    Externals: {
        ol: ol,
        proj4: proj4,
        React: React,
        ReactDOM: ReactDOM
    }
};