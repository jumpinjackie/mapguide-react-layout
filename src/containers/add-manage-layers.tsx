import * as React from "react";
import { tr } from "../api/i18n";
import { ILayerInfo, Bounds, LayerProperty } from "../api/common";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";
import { Tabs, Tab, Icon } from '@blueprintjs/core';
import { useViewerLocale, useActiveMapName, useActiveMapLayers, useActiveMapView } from './hooks';
import olVectorLayer from "ol/layer/Vector";
import { transformExtent } from "ol/proj";
import { useDispatch } from 'react-redux';
import { mapLayerAdded, addMapLayerBusyWorker, removeMapLayerBusyWorker, removeMapLayer, setMapLayerIndex, setMapLayerVisibility, setMapLayerOpacity, setMapLayerVectorStyle } from '../actions/map';
import { getViewer } from '../api/runtime';
import { IVectorLayerStyle } from '../api/ol-style-contracts';

/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerProps
 */
export interface IAddManageLayersContainerProps {

}

export const AddManageLayersContainer = () => {
    const dispatch = useDispatch();
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const layers = useActiveMapLayers();
    const view = useActiveMapView();
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
        const viewer = getViewer();
        if (viewer) {
            const layer = viewer.getLayerManager().getLayer(layerName);
            // If the layer has a WGS84 bbox, we'll use that
            const ll_bbox = layer?.get(LayerProperty.WGS84_BBOX);
            if (ll_bbox) {
                const zoomBounds = transformExtent(ll_bbox, "EPSG:4326", viewer.getProjection());
                viewer.zoomToExtent(zoomBounds as Bounds);
            } else if (layer instanceof olVectorLayer) {
                const source = layer.getSource();
                let bounds = source.getExtent();
                const sp = source.getProjection();
                const dp = viewer.getProjection();
                if (sp && dp) {
                    bounds = transformExtent(bounds, sp, dp);
                }
                viewer.zoomToExtent(bounds as Bounds);
            }
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
    const updateVectorStyle = (layerName: string, value: IVectorLayerStyle) => {
        if (activeMapName) {
            dispatch(setMapLayerVectorStyle(activeMapName, layerName, value));
        }
    }
    if (layers) {
        return <div style={{ padding: 8 }}>
            <Tabs id="tabs" renderActiveTabPanelOnly={true}>
                <Tab id="add_layer" title={<span><Icon icon="new-layer" iconSize={Icon.SIZE_STANDARD} /> {tr("ADD_LAYER", locale)}</span>} panel={<AddLayer onLayerAdded={onLayerAdded} onAddLayerBusyWorker={onAddLayerBusyWorker} onRemoveLayerBusyWorker={onRemoveLayerBusyWorker} locale={locale} />} />
                <Tab id="manage_layers" title={<span><Icon icon="layers" iconSize={Icon.SIZE_STANDARD} /> {tr("MANAGE_LAYERS", locale)}</span>} panel={<ManageLayers layers={layers}
                    locale={locale}
                    currentResolution={view?.resolution}
                    onSetOpacity={setOpacity}
                    onSetVisibility={setVisibility}
                    onZoomToBounds={zoomToBounds}
                    onMoveLayerDown={downHandler}
                    onMoveLayerUp={upHandler}
                    onRemoveLayer={removeHandler}
                    onVectorStyleChanged={updateVectorStyle} />} />
            </Tabs>
        </div>;
    } else {
        return <></>;
    }
};