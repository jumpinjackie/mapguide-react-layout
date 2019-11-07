import * as React from "react";
import * as ReactDOM from "react-dom";
import { registerStringBundle } from "../api/i18n";
import { initDefaultCommands } from "../api/default-commands";
import AjaxViewerLayout from "../layouts/ajax-viewer";
import SidebarLayout from "../layouts/sidebar";
import AquaTemplateLayout from "../layouts/aqua";
import TurquoiseYellowTemplateLayout from "../layouts/turquoise-yellow";
import LimeGoldTemplateLayout from "../layouts/limegold";
import SlateTemplateLayout from "../layouts/slate";
import MaroonTemplateLayout from "../layouts/maroon";
import { registerLayout } from "../api/registry/layout";
import { registerCommand } from "../api/registry/command";
import { registerComponentFactory } from "../api/registry/component";
import { registerDefaultComponents } from "../api/default-components";
import * as Common from "../api/common";
import "../styles/index.css";
import { bootstrap } from "../api/bootstrap";
import proj4 from "proj4";

bootstrap();
registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
registerLayout("aqua", () => <AquaTemplateLayout />);
registerLayout("turquoise-yellow", () => <TurquoiseYellowTemplateLayout />);
registerLayout("limegold", () => <LimeGoldTemplateLayout />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);
initDefaultCommands();
registerDefaultComponents();

/**
 * Indicates if this library is in development mode. If false, this is in production mode
 *
 * Certain functionality (eg. Logging) is disabled in production mode.
 */
export var __DEV__: boolean;

/**
 * A helper class for use in the browser globals context to register any of the following:
 *  - String bundles
 *  - Layout components
 *  - Custom commands
 *  - Component factories
 *
 * @export
 * @class Registry
 */
export class Registry {
    /**
     * Registers the given string bundle under the given locale
     *
     * @static
     * @param {string} locale The locale
     * @param {*} bundle The string bundle
     *
     * @memberof Registry
     */
    public static registerStringBundle(locale: string, bundle: any) {
        registerStringBundle(locale, bundle);
    }
    /**
     * Registers the given JSX element factory for the given viewer template name
     *
     * @static
     * @param {string} name The viewer template name
     * @param {() => JSX.Element} factory The JSX element factory that creates the viewer template component
     *
     * @memberof Registry
     */
    public static registerLayout(name: string, factory: () => JSX.Element) {
        registerLayout(name, factory);
    }
    /**
     * Registers the given command with the given name
     *
     * @static
     * @param {string} name The name of the command
     * @param {(Common.ICommand | Common.IInvokeUrlCommand | Common.ISearchCommand)} cmdDef The command to register
     *
     * @memberof Registry
     */
    public static registerCommand(name: string, cmdDef: Common.ICommand | Common.IInvokeUrlCommand | Common.ISearchCommand) {
        registerCommand(name, cmdDef);
    }
    /**
     * Registers the given JSX element factory for the given component id
     *
     * @static
     * @param {string} id The component id
     * @param {(props: any) => JSX.Element} factory The JSX element factory that creates the component
     *
     * @memberof Registry
     */
    public static registerComponentFactory(id: string, factory: (props: any) => JSX.Element) {
        registerComponentFactory(id, factory);
    }
}
/**
 * The top-level namespace for key external libraries
 */
export const Externals = {
    /**
     * The exported public API for proj4js
     */
    proj4: proj4,
    /**
     * The exported public API for React
     */
    React: React,
    /**
     * The exported public API for ReactDOM
     */
    ReactDOM: ReactDOM
};
export { ApplicationViewModel as Application } from "./application";
export { setAssetRoot } from "../utils/asset";

import * as MapActions from "../actions/map";
import * as LegendActions from "../actions/legend";
import * as FlyoutActions from "../actions/flyout";
import * as ModalActions from "../actions/modal";
import * as TaskPaneActions from "../actions/taskpane";
import * as TemplateActions from "../actions/template";

/**
 * The top-level namespace for all dispatchable actions
 */
export const Actions = {
    Map: MapActions,
    Legend: LegendActions,
    Flyout: FlyoutActions,
    Modal: ModalActions,
    TaskPane: TaskPaneActions,
    Template: TemplateActions
}