/**
 * context.ts
 *
 * This module holds various React component contexts and validation maps
 */
import * as React from "react";
import * as PropTypes from "prop-types";
import { IDOMElementMetrics } from "../api/common";
import { MapLayer, MapGroup } from "../api/contracts/runtime-map";
import { IMapGuideClient } from "../api/request-builder";

export interface IApplicationContext {
    getClient(): IMapGuideClient;
}

export const APPLICATION_CONTEXT_VALIDATION_MAP: PropTypes.ValidationMap<any> = {
    getClient: PropTypes.func.isRequired
};

export interface ILegendContext {
    getIconMimeType(): string;
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

export const LEGEND_CONTEXT_VALIDATION_MAP: PropTypes.ValidationMap<any> = {
    getStdIcon: PropTypes.func.isRequired,
    getIconMimeType: PropTypes.func.isRequired,
    getChildren: PropTypes.func.isRequired,
    getCurrentScale: PropTypes.func.isRequired,
    getTree: PropTypes.func.isRequired,
    getGroupVisibility: PropTypes.func.isRequired,
    getLayerVisibility: PropTypes.func.isRequired,
    setGroupVisibility: PropTypes.func.isRequired,
    setLayerVisibility: PropTypes.func.isRequired,
    getLayerSelectability: PropTypes.func.isRequired,
    setLayerSelectability: PropTypes.func.isRequired,
    getGroupExpanded: PropTypes.func.isRequired,
    setGroupExpanded: PropTypes.func.isRequired,
    getLayerExpanded: PropTypes.func.isRequired,
    setLayerExpanded: PropTypes.func.isRequired
};

export interface IToolbarContext {
    openFlyout(id: string, metrics: IDOMElementMetrics): void;
    closeFlyout(id: string): void;
    openComponent(id: string, metrics: IDOMElementMetrics, name: string, props?: any): void;
    closeComponent(id: string): void;
}

export const TOOLBAR_CONTEXT_VALIDATION_MAP: React.ValidationMap<any> = {
    openFlyout: PropTypes.func.isRequired,
    closeFlyout: PropTypes.func.isRequired,
    openComponent: PropTypes.func.isRequired,
    closeComponent: PropTypes.func.isRequired
}