import React from "react"; // Can't use import * as React as wdyr cannot hook into that imported form of React
/*
if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    // react-redux/lib because:
    // https://github.com/welldone-software/why-did-you-render/issues/154#issuecomment-773905769
    const ReactRedux = require("react-redux/lib");
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [[ReactRedux, "useSelector"]]
    });
}
*/
import * as ReactDOM from "react-dom";
import { registerStringBundle } from "../api/i18n";
import { initDefaultCommands } from "../api/default-commands";
import { AjaxViewerLayout } from "../layouts/ajax-viewer";
import { SidebarLayout } from "../layouts/sidebar";
import { AquaTemplateLayout } from "../layouts/aqua";
import { TurquoiseYellowTemplateLayout } from "../layouts/turquoise-yellow";
import { LimeGoldTemplateLayout } from "../layouts/limegold";
import { SlateTemplateLayout } from "../layouts/slate";
import { MaroonTemplateLayout } from "../layouts/maroon";
import { LayoutCapabilities, registerLayout } from "../api/registry/layout";
import { registerCommand } from "../api/registry/command";
import { registerComponentFactory, DefaultComponentNames } from "../api/registry/component";
import { registerDefaultComponents } from "../api/default-components";
import * as Common from "../api/common";
import { bootstrap } from "../api/bootstrap";
import proj4 from "proj4";
import * as MapActions from "../actions/map";
import * as LegendActions from "../actions/legend";
import * as FlyoutActions from "../actions/flyout";
import * as ModalActions from "../actions/modal";
import * as TaskPaneActions from "../actions/taskpane";
import * as TemplateActions from "../actions/template";
import * as AppActions from "../actions/app";
import { registerRequestBuilder } from '../api/builders/factory';
import { MapAgentRequestBuilder } from '../api/builders/mapagent';
import { addFormatDriver } from '../api/layer-manager/driver-registry';
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from '../api/layer-manager/csv-driver';
import { FormatDriver } from '../api/layer-manager/format-driver';
import GeoJSON from "ol/format/GeoJSON";
import TopoJSON from "ol/format/TopoJSON";
import KML from "ol/format/KML";
import GPX from "ol/format/GPX";
import IGC from "ol/format/IGC";
import { initMapGuideCommands } from '../api/mapguide-commands';
import { registerMapGuideComponents } from '../api/mapguide-components';
import { MapViewer } from '../containers/neo-map-viewer';

import "../styles/index.css";
import "ol/ol.css";

import { GenericLayout } from "../layouts/generic";
import { ExternalLayerCreator, ExternalLayerFactoryRegistry } from "../api/registry/external-layer";

bootstrap();
addFormatDriver(new CsvFormatDriver(CSV_COLUMN_ALIASES));
addFormatDriver(new FormatDriver("GeoJSON", new GeoJSON()));
addFormatDriver(new FormatDriver("TopoJSON", new TopoJSON()));
addFormatDriver(new FormatDriver("KML", new KML(), "EPSG:4326"));
addFormatDriver(new FormatDriver("GPX", new GPX(), "EPSG:4326"));
addFormatDriver(new FormatDriver("IGC", new IGC()));
const DEFAULT_CAPS: LayoutCapabilities = {
    hasTaskPane: true
};
registerLayout("ajax-viewer", () => <AjaxViewerLayout />, DEFAULT_CAPS);
registerLayout("sidebar", () => <SidebarLayout />, DEFAULT_CAPS);
registerLayout("aqua", () => <AquaTemplateLayout />, DEFAULT_CAPS);
registerLayout("turquoise-yellow", () => <TurquoiseYellowTemplateLayout />, DEFAULT_CAPS);
registerLayout("limegold", () => <LimeGoldTemplateLayout />, DEFAULT_CAPS);
registerLayout("slate", () => <SlateTemplateLayout />, DEFAULT_CAPS);
registerLayout("maroon", () => <MaroonTemplateLayout />, DEFAULT_CAPS);
registerLayout("generic", () => <GenericLayout />, {
    hasTaskPane: false
});
initDefaultCommands();
initMapGuideCommands();
registerDefaultComponents();
registerMapGuideComponents();

registerComponentFactory(DefaultComponentNames.Map, (props) => <MapViewer {...props} />);

//Register the default mapagent request builder (that can be replaced later on if desired)
registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));

/**
 * Indicates if this library is in development mode. If false, this is in production mode
 *
 * Certain functionality (eg. Logging) is disabled in production mode.
 */
export var __DEV__: boolean;

/**
 * The git version (as generated by "git describe") that this bundle was built from
 * 
 * @since 0.13
 */
export var __VERSION__: string;
/**
 * The git commit hash that this bundle was built from
 * 
 * @since 0.13
 */
export var __COMMITHASH__: string;
/**
 * The git branch that this bundle was built from
 * 
 * @since 0.13
 */
export var __BRANCH__: string;

/**
 * A helper class for use in the browser globals context to register any of the following:
 *  - String bundles
 *  - Layout components
 *  - Custom commands
 *  - Component factories
 *
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
     *
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
     * @param caps Viewer template capabilities
     *
     *
     * @since 0.14 Added required caps parameter
     */
    public static registerLayout(name: string, factory: () => JSX.Element, caps: LayoutCapabilities) {
        registerLayout(name, factory, caps);
    }
    /**
     * Registers the given command with the given name
     *
     * @static
     * @param {string} name The name of the command
     * @param {(Common.ICommand | Common.IInvokeUrlCommand | Common.ISearchCommand)} cmdDef The command to register
     *
     *
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
     *
     */
    public static registerComponentFactory(id: string, factory: (props: any) => JSX.Element) {
        registerComponentFactory(id, factory);
    }

    /**
     * Registers the given external vector layer factory method
     * 
     * @param driverName 
     * @param creator 
     * @since 0.14
     */
    public static registerExternalVectorLayerCreator(driverName: string, creator: ExternalLayerCreator) {
        const reg = ExternalLayerFactoryRegistry.getInstance();
        reg.registerExternalVectorLayerCreator(driverName, creator);
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
export { DefaultViewerInitCommand as MapGuideViewerInitCommand } from "../actions/init-mapguide";

export { updateUrl, getStateFromUrl } from "../containers/url-state";

/**
 * The top-level namespace for all dispatchable actions
 */
export const Actions = {
    Map: MapActions,
    Legend: LegendActions,
    Flyout: FlyoutActions,
    Modal: ModalActions,
    TaskPane: TaskPaneActions,
    Template: TemplateActions,
    App: AppActions
}