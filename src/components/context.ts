/**
 * context.ts
 * 
 * This module holds various React component contexts and validation maps
 */
import * as React from "react";
import { MapLayer, MapGroup } from "../api/contracts/runtime-map";
import { IMapGuideClient } from "../api/request-builder";

export interface IMapView {
    x: number;
    y: number;
    scale: number;
}

export interface IApplicationContext {
    getClient(): IMapGuideClient;
}

export const APPLICATION_CONTEXT_VALIDATION_MAP: React.ValidationMap<any> = {
    getClient: React.PropTypes.func.isRequired
};

export interface ILegendContext {
    getStdIcon(iconRelPath: string): string;
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

export const LEGEND_CONTEXT_VALIDATION_MAP: React.ValidationMap<any> = {
    getStdIcon: React.PropTypes.func.isRequired,
    getIconMimeType: React.PropTypes.func.isRequired,
    getChildren: React.PropTypes.func.isRequired,
    getCurrentScale: React.PropTypes.func.isRequired,
    getTree: React.PropTypes.func.isRequired,
    getGroupVisibility: React.PropTypes.func.isRequired,
    getLayerVisibility: React.PropTypes.func.isRequired,
    setGroupVisibility: React.PropTypes.func.isRequired,
    setLayerVisibility: React.PropTypes.func.isRequired,
    getLayerSelectability: React.PropTypes.func.isRequired,
    setLayerSelectability: React.PropTypes.func.isRequired,
    getGroupExpanded: React.PropTypes.func.isRequired,
    setGroupExpanded: React.PropTypes.func.isRequired,
    getLayerExpanded: React.PropTypes.func.isRequired,
    setLayerExpanded: React.PropTypes.func.isRequired
};