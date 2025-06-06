import * as React from "react";
import { tr } from "../api/i18n";
import { ILayerInfo, Bounds, LayerProperty, IMapViewer } from "../api/common";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";
import { useViewerLocale, useActiveMapName, useActiveMapLayers, useActiveMapView } from './hooks';
import olVectorLayer from "ol/layer/Vector";
import olClusterSource from "ol/source/Cluster";
import { transformExtent } from "ol/proj";
import { mapLayerAdded, addMapLayerBusyWorker, removeMapLayerBusyWorker, removeMapLayer, setMapLayerIndex, setMapLayerVisibility, setMapLayerOpacity, setMapLayerVectorStyle, setHeatmapLayerBlur, setHeatmapLayerRadius } from '../actions/map';
import { IVectorLayerStyle, VectorStyleSource } from '../api/ol-style-contracts';
import { useMapProviderContext, useReduxDispatch } from "../components/map-providers/context";
import { TabSetProps, useElementContext } from "../components/elements/element-context";

export function zoomToLayerExtents(layerName: string, viewer: IMapViewer) {
    const layer = viewer.getLayerManager().getLayer(layerName);
    // If the layer has a WGS84 bbox, we'll use that
    const ll_bbox = layer?.get(LayerProperty.WGS84_BBOX);
    if (ll_bbox) {
        const zoomBounds = transformExtent(ll_bbox, "EPSG:4326", viewer.getProjection());
        viewer.zoomToExtent(zoomBounds as Bounds);
    } else if (layer instanceof olVectorLayer) {
        const source = layer.getSource();
        let bounds;
        if (source instanceof olClusterSource) {
            bounds = source.getSource()?.getExtent();
        } else {
            bounds = source.getExtent();
        }
        const sp = source.getProjection();
        const dp = viewer.getProjection();
        if (sp && dp) {
            bounds = transformExtent(bounds, sp, dp);
        }
        if (Number.isFinite(bounds[0]) &&
            Number.isFinite(bounds[1]) &&
            Number.isFinite(bounds[2]) &&
            Number.isFinite(bounds[3])) {
            viewer.zoomToExtent(bounds as Bounds);
        } else {
            console.warn(`Attempted to zoom to invalid bounds for layer: ${layerName}`);
        }
    }
}

/**
 * 
 * @since 0.11
 * @interface IAddManageLayersContainerProps
 */
export interface IAddManageLayersContainerProps {

}

export const AddManageLayersContainer = () => {
    const { TabSet, Icon } = useElementContext();
    const dispatch = useReduxDispatch();
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const layers = useActiveMapLayers();
    const view = useActiveMapView();
    const viewer = useMapProviderContext();
    const getLayerIndex = (layerName: string) => {
        if (layers) {
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].name == layerName) {
                    return i;
                }
            }
        }
        return -1;
    };
    const onLayerAdded = (layer: ILayerInfo) => {
        if (activeMapName) {
            dispatch(mapLayerAdded(activeMapName, layer));
        }
    };
    const onAddLayerBusyWorker = (name: string) => {
        if (activeMapName) {
            dispatch(addMapLayerBusyWorker(activeMapName, name));
        }
    }
    const onRemoveLayerBusyWorker = (name: string) => {
        if (activeMapName) {
            dispatch(removeMapLayerBusyWorker(activeMapName, name));
        }
    };
    const removeHandler = (layerName: string) => {
        if (activeMapName) {
            dispatch(removeMapLayer(activeMapName, layerName));
        }
    };
    const upHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (activeMapName && newIndex >= 0) {
            dispatch(setMapLayerIndex(activeMapName, layerName, newIndex - 1));
        }
    };
    const downHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (layers && activeMapName && newIndex < layers.length - 1) {
            dispatch(setMapLayerIndex(activeMapName, layerName, newIndex + 1));
        }
    };
    const zoomToBounds = (layerName: string) => {
        if (viewer.isReady()) {
            zoomToLayerExtents(layerName, viewer);
        }
    };
    const setVisibility = (layerName: string, visible: boolean) => {
        if (activeMapName) {
            dispatch(setMapLayerVisibility(activeMapName, layerName, visible));
        }
    };
    const setOpacity = (layerName: string, value: number) => {
        if (activeMapName) {
            dispatch(setMapLayerOpacity(activeMapName, layerName, value));
        }
    };
    const setHeatmapBlur = (layerName: string, value: number) => {
        if (activeMapName) {
            dispatch(setHeatmapLayerBlur(activeMapName, layerName, value));
        }
    };
    const setHeatmapRadius = (layerName: string, value: number) => {
        if (activeMapName) {
            dispatch(setHeatmapLayerRadius(activeMapName, layerName, value));
        }
    };
    const updateVectorStyle = (layerName: string, value: IVectorLayerStyle, which: VectorStyleSource) => {
        if (activeMapName) {
            dispatch(setMapLayerVectorStyle(activeMapName, layerName, value, which));
        }
    }
    if (layers) {
        const tabProps: TabSetProps = {
            id: "tabs",
            tabs: [
                {
                    id: "add_layer",
                    title: <span><Icon icon="new-layer" /> {tr("ADD_LAYER", locale)}</span>,
                    content: <AddLayer onLayerAdded={onLayerAdded}
                        onAddLayerBusyWorker={onAddLayerBusyWorker}
                        onRemoveLayerBusyWorker={onRemoveLayerBusyWorker}
                        locale={locale} />
                },
                {
                    id: "manage_layers",
                    title: <span><Icon icon="layers" /> {tr("MANAGE_LAYERS", locale)}</span>,
                    content: <ManageLayers layers={layers}
                        locale={locale}
                        currentResolution={view?.resolution}
                        onSetOpacity={setOpacity}
                        onSetHeatmapBlur={setHeatmapBlur}
                        onSetHeatmapRadius={setHeatmapRadius}
                        onSetVisibility={setVisibility}
                        onZoomToBounds={zoomToBounds}
                        onMoveLayerDown={downHandler}
                        onMoveLayerUp={upHandler}
                        onRemoveLayer={removeHandler}
                        onVectorStyleChanged={updateVectorStyle} />
                }
            ]
        };
        return <div style={{ padding: 8 }}>
            <TabSet {...tabProps} />
        </div>;
    } else {
        return <></>;
    }
};
