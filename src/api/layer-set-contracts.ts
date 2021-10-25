import { RefreshMode, IExternalBaseLayer, LayerTransparencySet, Bounds, Size, GenericEvent, Dictionary } from './common';
import View from 'ol/View';
import Source from 'ol/source/Source';
import LayerBase from "ol/layer/Base";
import { LoadFunction as TileLoadFunction } from 'ol/Tile';
import { LoadFunction as ImageLoadFunction } from 'ol/Image';
import type { ProjectionLike } from 'ol/proj';

export interface ILayerSetOL {
    view: View;
    extent: Bounds;
    dpi: number;
    projection: ProjectionLike;
    scaleToResolution(scale: number): number;
    resolutionToScale(resolution: number): number;
    refreshMap(mode: RefreshMode): void;
    getMetersPerUnit(): number;
    getLayers(): LayerBase[];
    getSourcesForProgressTracking(): Source[];
    updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]): void;
    updateTransparency(trans: LayerTransparencySet): void;
    // ====== This is MapGuide-specific ======== //
    showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string): void;
    update(showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void;
    updateSelectionColor(color: string): void;
}

export interface IImageLayerEvents {
    addImageLoading(): void;
    addImageLoaded(): void;
    onImageError(e: GenericEvent): void;
    getLocale(): string | undefined;
    getBaseTileLoaders(): Dictionary<TileLoadFunction>;
    getTileLoaders(): Dictionary<TileLoadFunction>;
    getImageLoaders(): Dictionary<ImageLoadFunction>;
}
