import { RefreshMode, IExternalBaseLayer, LayerTransparencySet, Bounds, Size, GenericEvent } from './common';
import { Extent } from 'ol/extent';
import View from 'ol/View';
import Source from 'ol/source/Source';
import LayerBase from "ol/layer/Base";

export interface ILayerSetOL {
    view: View;
    extent: Extent;
    dpi: number;
    projection: string | undefined;
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
}
