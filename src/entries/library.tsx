import * as React from "react";
import * as ReactDOM from "react-dom";
import { registerStringBundle } from "../api/i18n";
import { initDefaultCommands } from "../api/default-commands";
import { ApplicationViewModel } from "./application";
import { AjaxViewerLayout } from "../layouts/ajax-viewer";
import { SidebarLayout } from "../layouts/sidebar";
import { AquaTemplateLayout } from "../layouts/aqua";
import { TurquoiseYellowLayoutTemplate } from "../layouts/turquoise-yellow";
import { LimeGoldLayoutTemplate } from "../layouts/limegold";
import { SlateTemplateLayout } from "../layouts/slate";
import { MaroonTemplateLayout } from "../layouts/maroon";
import { registerLayout } from "../api/registry/layout";
import { registerCommand } from "../api/registry/command";
import { registerComponentFactory } from "../api/registry/component";
import { registerDefaultComponents } from "../api/default-components";
import * as Common from "../api/common";
import * as Contracts from "../api/contracts";
import "../styles/index.css";
import proj from "ol/proj";
const proj4 = require("proj4");
require("es6-promise").polyfill();
require('whatwg-fetch');

proj.setProj4(proj4);

registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
registerLayout("aqua", () => <AquaTemplateLayout />);
registerLayout("turquoise-yellow", () => <TurquoiseYellowLayoutTemplate />);
registerLayout("limegold", () => <LimeGoldLayoutTemplate />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);
initDefaultCommands();
registerDefaultComponents();

export var __DEV__: boolean;
export class Registry {
    public static registerStringBundle(locale: string, bundle: any) {
        registerStringBundle(locale, bundle);
    }
    public static registerLayout(name: string, factory: () => JSX.Element) {
        registerLayout(name, factory);
    }
    public static registerCommand(name: string, cmdDef: Common.ICommand | Common.IInvokeUrlCommand | Common.ISearchCommand) {
        registerCommand(name, cmdDef);
    }
    public static registerComponentFactory(id: string, factory: (props: any) => JSX.Element) {
        registerComponentFactory(id, factory);
    }
}
export { Common };
export { Contracts };
export const Externals = {
    proj4: proj4,
    React: React,
    ReactDOM: ReactDOM
};
export { ApplicationViewModel as Application } from "./application";