import * as React from "react";
import * as Runtime from "../api/runtime";
import { tr } from "../api/i18n";
import {
    ILayerInfo, Bounds
} from "../api/common";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";
import { Tabs, Tab, Icon } from '@blueprintjs/core';
import { useViewerLocale, useActiveMapName } from './hooks';
import olVectorLayer from "ol/layer/Vector";
import { transformExtent } from "ol/proj";

interface ILayerManagerProps {
    locale: string;
    activeMapName: string | undefined;
    layers: ILayerInfo[];
}

/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerProps
 */
export interface IAddManageLayersContainerProps {

}

const AddManageLayersContainer = () => {
    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const [layers, setLayers] = React.useState<ILayerInfo[]>([]);
    const updateLayersFromViewer = () => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const lyrs = viewer.getLayerManager().getLayers();
            setLayers(lyrs);
        }
    };
    React.useEffect(updateLayersFromViewer, []);
    React.useEffect(updateLayersFromViewer, [activeMapName]);
    const removeHandler = (layerName: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const removed = viewer.getLayerManager().removeLayer(layerName);
            if (removed) {
                viewer.toastSuccess("success", tr("REMOVED_LAYER", locale, { name: layerName }));
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const upHandler = (layerName: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveUp(layerName) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const downHandler = (layerName: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveDown(layerName) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const zoomToBounds = (layerName: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layer = viewer.getLayerManager().getLayer(layerName);
            if (layer instanceof olVectorLayer) {
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
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layer = viewer.getLayerManager().getLayer(layerName);
            if (layer) {
                layer.setVisible(visible);
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const setOpacity = (layerName: string, value: number) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layer = viewer.getLayerManager().getLayer(layerName);
            if (layer) {
                layer.setOpacity(value);
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    return <Tabs id="tabs" renderActiveTabPanelOnly={true}>
        <Tab id="add_layer" title={<span><Icon icon="new-layer" iconSize={Icon.SIZE_STANDARD} /> {tr("ADD_LAYER", locale)}</span>} panel={<AddLayer onLayerAdded={updateLayersFromViewer} locale={locale} />} />
        <Tab id="manage_layers" title={<span><Icon icon="layers" iconSize={Icon.SIZE_STANDARD} /> {tr("MANAGE_LAYERS", locale)}</span>} panel={<ManageLayers layers={layers}
            locale={locale}
            onSetOpacity={setOpacity}
            onSetVisibility={setVisibility}
            onZoomToBounds={zoomToBounds}
            onMoveLayerDown={downHandler}
            onMoveLayerUp={upHandler}
            onRemoveLayer={removeHandler} />} />
    </Tabs>;
};

export default AddManageLayersContainer;