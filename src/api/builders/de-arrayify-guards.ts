import type { ApplicationDefinition } from "../contracts/fusion";
import type { QueryMapFeaturesResponse } from "../contracts/query";
import type { RuntimeMap } from "../contracts/runtime-map";
import type { SiteVersionResponse } from "../contracts/common";
import type { TileSetDefinition } from "../contracts/tile-set-definition";
import type { MapDefinition } from "../contracts/map-definition";
import type { WebLayout } from "../contracts/weblayout";

export type DeArrayifiedResult = RuntimeMap | QueryMapFeaturesResponse | WebLayout | ApplicationDefinition | MapDefinition | TileSetDefinition | SiteVersionResponse;

export function isWebLayout(arg: DeArrayifiedResult): arg is WebLayout {
   return (arg as any).CommandSet != null
      && (arg as any).ContextMenu != null
      && (arg as any).Map != null;
}

export function isAppDef(arg: DeArrayifiedResult): arg is ApplicationDefinition {
   return (arg as any).WidgetSet != null;
}

export function isMapDef(arg: DeArrayifiedResult): arg is MapDefinition {
   return (arg as any).Extents != null
      && (arg as any).BackgroundColor != null
      && (arg as any).CoordinateSystem != null
      && (arg as any).MapLayer != null
      && (arg as any).MapLayerGroup != null;
}

export function isTileSet(arg: DeArrayifiedResult): arg is TileSetDefinition {
   return (arg as any).Extents != null
      && (arg as any).TileStoreParameters != null
      && (arg as any).BaseMapLayerGroup != null;
}

export function isSiteVersion(arg: DeArrayifiedResult): arg is SiteVersionResponse {
   return (arg as any).Version != null;
}

export function isQueryMapFeaturesResponse(arg: DeArrayifiedResult): arg is QueryMapFeaturesResponse {
   return (arg as any).FeatureSet != null
      || (arg as any).Hyperlink != null
      || (arg as any).InlineSelectionImage != null
      || (arg as any).SelectedFeatures != null
      || (arg as any).Tooltip != null;
}
