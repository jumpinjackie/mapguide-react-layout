import * as React from "react";
import { tr } from "../api/i18n";
import { ILayerInfo, Bounds, LayerProperty, IMapViewer, IMapView } from "../api/common";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";
import { useViewerLocale, useActiveMapName } from './hooks';
import olVectorLayer from "ol/layer/Vector";
import olClusterSource from "ol/source/Cluster";
import { transformExtent } from "ol/proj";
import { mapLayerAdded, addMapLayerBusyWorker, removeMapLayerBusyWorker, removeMapLayer, setMapLayerIndex, setMapLayerVisibility, setMapLayerOpacity, setMapLayerVectorStyle, setHeatmapLayerBlur, setHeatmapLayerRadius } from '../actions/map';
import { IVectorLayerStyle, VectorStyleSource } from '../api/ol-style-contracts';
import { useMapProviderContext, useReduxDispatch, useAppState } from "../components/map-providers/context";
import { TabSetProps, useElementContext } from "../components/elements/element-context";
import { useMapSwipeInfo, useIsMapSwipeActive } from "../components/map-viewer-swipe";

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
    const viewer = useMapProviderContext();
    const swipeInfo = useMapSwipeInfo();
    const isSwipeActive = useIsMapSwipeActive();

    // When swipe is active, the user can select which map's layers to manage/add to.
    // Default to the primary (active) map; reset to active map when swipe ends.
    const [selectedMapForLayers, setSelectedMapForLayers] = React.useState<string | undefined>(activeMapName);
    React.useEffect(() => {
        if (!isSwipeActive) {
            setSelectedMapForLayers(activeMapName);
        }
    }, [isSwipeActive, activeMapName]);

    // The map targeted for both Add Layer and Manage Layers operations.
    // When swipe is active, this follows the dropdown selection.
    const targetMapName = isSwipeActive ? (selectedMapForLayers ?? activeMapName) : activeMapName;

    // The layer manager for the target map. When swipe is active and the secondary map is
    // selected, use the secondary map's layer manager so that layers are added directly to
    // the secondary's layer set (avoiding the "layer name already exists" collision that would
    // occur if a layer with the same name was already added to the primary side).
    const targetLayerManager = React.useMemo(() => {
        if (isSwipeActive && targetMapName && targetMapName !== activeMapName) {
            return viewer.getLayerManager(targetMapName);
        }
        return undefined; // undefined means AddLayer will fall back to the active map's layer manager
    }, [isSwipeActive, targetMapName, activeMapName, viewer]);

    // Primary map layers — used as the ready-gate. Until these are defined the map hasn't
    // finished initialising and we should not render the UI at all.
    const primaryLayers = useAppState<ILayerInfo[] | undefined>(state => {
        if (activeMapName && state.mapState[activeMapName]) {
            return state.mapState[activeMapName].layers;
        }
        return undefined;
    });

    // Layers for the "Manage Layers" tab (selected map). Falls back to an empty array so the
    // tab renders even when the secondary map hasn't been visited yet.
    const manageLayers = useAppState<ILayerInfo[]>(state => {
        if (targetMapName && state.mapState[targetMapName]?.layers) {
            return state.mapState[targetMapName].layers;
        }
        return [];
    });

    const view = useAppState<IMapView | undefined>(state => {
        if (targetMapName && state.mapState[targetMapName]) {
            return state.mapState[targetMapName].currentView;
        }
        return undefined;
    });

    const getLayerIndex = (layerName: string) => {
        if (manageLayers) {
            for (let i = 0; i < manageLayers.length; i++) {
                if (manageLayers[i].name === layerName) {
                    return i;
                }
            }
        }
        return -1;
    };
    const onLayerAdded = (layer: ILayerInfo) => {
        if (targetMapName) {
            dispatch(mapLayerAdded(targetMapName, layer));
        }
        // After adding a layer while swipe is active, refresh the swipe clips so the new layer
        // is correctly clipped to its target side (primary = left, secondary = right).
        if (isSwipeActive) {
            viewer.refreshSwipeClips();
        }
    };
    const onAddLayerBusyWorker = (name: string) => {
        if (targetMapName) {
            dispatch(addMapLayerBusyWorker(targetMapName, name));
        }
    }
    const onRemoveLayerBusyWorker = (name: string) => {
        if (targetMapName) {
            dispatch(removeMapLayerBusyWorker(targetMapName, name));
        }
    };
    const removeHandler = (layerName: string) => {
        if (targetMapName) {
            dispatch(removeMapLayer(targetMapName, layerName));
        }
    };
    const upHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (targetMapName && newIndex >= 0) {
            dispatch(setMapLayerIndex(targetMapName, layerName, newIndex - 1));
        }
    };
    const downHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (manageLayers && targetMapName && newIndex < manageLayers.length - 1) {
            dispatch(setMapLayerIndex(targetMapName, layerName, newIndex + 1));
        }
    };
    const zoomToBounds = (layerName: string) => {
        if (viewer.isReady()) {
            zoomToLayerExtents(layerName, viewer);
        }
    };
    const setVisibility = (layerName: string, visible: boolean) => {
        if (targetMapName) {
            dispatch(setMapLayerVisibility(targetMapName, layerName, visible));
        }
    };
    const setOpacity = (layerName: string, value: number) => {
        if (targetMapName) {
            dispatch(setMapLayerOpacity(targetMapName, layerName, value));
        }
    };
    const setHeatmapBlur = (layerName: string, value: number) => {
        if (targetMapName) {
            dispatch(setHeatmapLayerBlur(targetMapName, layerName, value));
        }
    };
    const setHeatmapRadius = (layerName: string, value: number) => {
        if (targetMapName) {
            dispatch(setHeatmapLayerRadius(targetMapName, layerName, value));
        }
    };
    const updateVectorStyle = (layerName: string, value: IVectorLayerStyle, which: VectorStyleSource) => {
        if (targetMapName) {
            dispatch(setMapLayerVectorStyle(targetMapName, layerName, value, which));
        }
    }

    // When swipe is active, render a map selector dropdown ABOVE both tabs so the user always
    // knows which map they are targeting for both adding and managing layers.
    const selectorContainerStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 };
    const selectorLabelStyle: React.CSSProperties = { whiteSpace: "nowrap" };
    const selectorSelectStyle: React.CSSProperties = { flex: 1 };
    const swipeMapSelector = isSwipeActive && swipeInfo ? (
        <div style={selectorContainerStyle}>
            <label style={selectorLabelStyle}>{tr("MAP_SWIPE_LAYER_MANAGER_FOR", locale)}</label>
            <select
                value={selectedMapForLayers ?? activeMapName ?? ""}
                onChange={e => setSelectedMapForLayers(e.target.value)}
                style={selectorSelectStyle}
            >
                <option value={swipeInfo.pair.primaryMapName}>
                    {swipeInfo.pair.primaryLabel ?? tr("MAP_SWIPE_PRIMARY_LABEL", locale)} ({swipeInfo.pair.primaryMapName})
                </option>
                <option value={swipeInfo.pair.secondaryMapName}>
                    {swipeInfo.pair.secondaryLabel ?? tr("MAP_SWIPE_SECONDARY_LABEL", locale)} ({swipeInfo.pair.secondaryMapName})
                </option>
            </select>
        </div>
    ) : null;

    if (primaryLayers) {
        const tabProps: TabSetProps = {
            id: "tabs",
            tabs: [
                {
                    id: "add_layer",
                    title: <span><Icon icon="new-layer" /> {tr("ADD_LAYER", locale)}</span>,
                    content: <AddLayer onLayerAdded={onLayerAdded}
                        onAddLayerBusyWorker={onAddLayerBusyWorker}
                        onRemoveLayerBusyWorker={onRemoveLayerBusyWorker}
                        targetLayerManager={targetLayerManager}
                        locale={locale} />
                },
                {
                    id: "manage_layers",
                    title: <span><Icon icon="layers" /> {tr("MANAGE_LAYERS", locale)}</span>,
                    content: <ManageLayers layers={manageLayers}
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
            {swipeMapSelector}
            <TabSet {...tabProps} />
        </div>;
    } else {
        return <></>;
    }
};

