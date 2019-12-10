/**
 * context.ts
 *
 * This module holds various React component contexts and validation maps
 */
import * as React from "react";
import { IDOMElementMetrics } from "../api/common";
import { MapLayer, MapGroup } from "../api/contracts/runtime-map";
import { STR_EMPTY } from '../utils';

const VOID_NOOP = () => {}

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
}

export const AppContext = React.createContext<IApplicationContext>({
    allowHtmlValuesInSelection: () => false,
    getHTMLCleaner: () => v => v
});

export interface ILegendContext {
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
}

export const LegendContext = React.createContext<ILegendContext>({
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