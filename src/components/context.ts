/**
 * context.ts
 *
 * This module holds various React component contexts and validation maps
 */
import * as React from "react";
import { IDOMElementMetrics } from "../api/common";
import { MapLayer, MapGroup } from "../api/contracts/runtime-map";
import { DEFAULT_LOCALE } from '../api/i18n';
import { STR_EMPTY } from '../utils/string';

const VOID_NOOP = () => {}

/**
 * @since 0.14.9
 */
export type LegendNodeExtraHTMLProps<T> = {
    /**
     * The item (group or layer)
     */
    item: T;
    /**
     * The map name
     */
    mapName: string;
    /**
     * The current session id
     */
    session: string;
    /**
     * The size of the node (height and width). Use this as guidelines for constraining your custom content
     */
    elementSize: number;
    /**
     * A function that helps sanitize the given HTML content
     * 
     * @param html The HTML content to sanitize
     * @returns A sanitized version of the given HTML
     */
    sanitize: (html: string) => string;
}


export interface IApplicationContext {
    /**
     * Gets whether to display HTML property values in the selection panel (provided via mount option)
     * 
     * @since 0.11
     * @memberof IApplicationContext
     */
    allowHtmlValuesInSelection: () => boolean;
    /**
     * Gets a HTML sanitization function (if provided via mount option)
     * 
     * @since 0.11
     * @memberof IApplicationContext
     */
    getHTMLCleaner: () => (((value: string) => string) | undefined);
    /**
     * Provide extra HTML elements to insert before a layer name in a layer legend node
     * 
     * @param options
     * @since 0.14.9
     */
    getLegendLayerExtraIconsProvider: (options: LegendNodeExtraHTMLProps<MapLayer>) => string[];
    /**
     * Provide extra HTML elements to insert before a group name in a group legend node
     * 
     * @param options
     * @since 0.14.9
     */
    getLegendGroupExtraIconsProvider: (options: LegendNodeExtraHTMLProps<MapGroup>) => string[];
}

export const AppContext = React.createContext<IApplicationContext>({
    allowHtmlValuesInSelection: () => false,
    getHTMLCleaner: () => v => v,
    getLegendLayerExtraIconsProvider: () => [],
    getLegendGroupExtraIconsProvider: () => []
});

export interface ILegendContext {
    stateless: boolean;
    isFiltering(): boolean;
    getMapName(): string | undefined;
    /**
     * @since 0.14.9
     */
    getSessionId(): string | undefined;
    getFilterText(): string;
    getLocale(): string;
    getBaseIconSize(): number;
    getIconMimeType(): string | undefined;
    getChildren(objectId: string): (MapLayer | MapGroup)[];
    getCurrentScale(): number;
    getTree(): any;
    getLayerVisibility(layer: MapLayer): boolean;
    getGroupVisibility(group: MapGroup): boolean;
    setGroupVisibility(groupId: string, visible: boolean): void;
    setLayerVisibility(layerId: string, visible: boolean): void;
    getLayerSelectability(layerId: string): boolean;
    setLayerSelectability(layerId: string, selectable: boolean): void;
    getGroupExpanded(groupId: string): boolean;
    setGroupExpanded(groupId: string, expanded: boolean): void;
    getLayerExpanded(layerId: string): boolean;
    setLayerExpanded(layerId: string, expanded: boolean): void;
    /**
     * Provide extra HTML elements to insert before a layer name in a layer legend node
     * 
     * @param options
     * @since 0.14.9
     */
    provideExtraLayerIconsHtml?: (options: LegendNodeExtraHTMLProps<MapLayer>) => string[];
    /**
     * Provide extra HTML elements to insert before a group name in a group legend node
     * 
     * @param options
     * @since 0.14.9
     */
    provideExtraGroupIconsHtml?: (options: LegendNodeExtraHTMLProps<MapGroup>) => string[];
}

export const LegendContext = React.createContext<ILegendContext>({
    stateless: false,
    getMapName: () => undefined,
    getSessionId: () => undefined,
    isFiltering: () => false,
    getFilterText: () => STR_EMPTY,
    getLocale: () => DEFAULT_LOCALE,
    getBaseIconSize: () => 0,
    getIconMimeType: () => STR_EMPTY,
    getChildren: () => [],
    getCurrentScale: () => -1,
    getTree: VOID_NOOP,
    getLayerVisibility: () => false,
    getGroupVisibility: () => false,
    setGroupVisibility: VOID_NOOP,
    setLayerVisibility: VOID_NOOP,
    getLayerSelectability: () => false,
    setLayerSelectability: () => false,
    getGroupExpanded: () => false,
    setGroupExpanded: VOID_NOOP,
    getLayerExpanded: () => false,
    setLayerExpanded: VOID_NOOP,
    provideExtraGroupIconsHtml: () => [],
    provideExtraLayerIconsHtml: () => []
});

export interface IToolbarContext {
    openFlyout(id: string, metrics: IDOMElementMetrics): void;
    closeFlyout(id: string): void;
    openComponent(id: string, metrics: IDOMElementMetrics, name: string, props?: any): void;
    closeComponent(id: string): void;
}

export const ToolbarContext = React.createContext<IToolbarContext>({
    openFlyout: VOID_NOOP,
    closeFlyout: VOID_NOOP,
    openComponent: VOID_NOOP,
    closeComponent: VOID_NOOP
});