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

    // When swipe is active, the user can select which map's layers to manage.
    // Default to the primary (active) map; reset to active map when swipe ends.
    const [selectedMapForLayers, setSelectedMapForLayers] = React.useState<string | undefined>(activeMapName);
    React.useEffect(() => {
        if (!isSwipeActive) {
            setSelectedMapForLayers(activeMapName);
        }
    }, [isSwipeActive, activeMapName]);

    // "Add Layer" always targets the active (primary) map because the viewer context and its
    // layer manager are bound to the currently active OL map. Using a different map name here
    // would dispatch layers to a different Redux state entry than what the OL canvas tracks,
    // causing the "wires crossed" visual/state mismatch.
    const addLayerTargetMapName = activeMapName;

    // The map whose layer list is displayed in the "Manage Layers" tab.
    const manageTargetMapName = isSwipeActive ? (selectedMapForLayers ?? activeMapName) : activeMapName;

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
        if (manageTargetMapName && state.mapState[manageTargetMapName]?.layers) {
            return state.mapState[manageTargetMapName].layers;
        }
        return [];
    });

    const view = useAppState<IMapView | undefined>(state => {
        if (manageTargetMapName && state.mapState[manageTargetMapName]) {
            return state.mapState[manageTargetMapName].currentView;
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
        if (addLayerTargetMapName) {
            dispatch(mapLayerAdded(addLayerTargetMapName, layer));
        }
    };
    const onAddLayerBusyWorker = (name: string) => {
        if (addLayerTargetMapName) {
            dispatch(addMapLayerBusyWorker(addLayerTargetMapName, name));
        }
    }
    const onRemoveLayerBusyWorker = (name: string) => {
        if (addLayerTargetMapName) {
            dispatch(removeMapLayerBusyWorker(addLayerTargetMapName, name));
        }
    };
    const removeHandler = (layerName: string) => {
        if (manageTargetMapName) {
            dispatch(removeMapLayer(manageTargetMapName, layerName));
        }
    };
    const upHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (manageTargetMapName && newIndex >= 0) {
            dispatch(setMapLayerIndex(manageTargetMapName, layerName, newIndex - 1));
        }
    };
    const downHandler = (layerName: string) => {
        const newIndex = getLayerIndex(layerName);
        if (manageLayers && manageTargetMapName && newIndex < manageLayers.length - 1) {
            dispatch(setMapLayerIndex(manageTargetMapName, layerName, newIndex + 1));
        }
    };
    const zoomToBounds = (layerName: string) => {
        if (viewer.isReady()) {
            zoomToLayerExtents(layerName, viewer);
        }
    };
    const setVisibility = (layerName: string, visible: boolean) => {
        if (manageTargetMapName) {
            dispatch(setMapLayerVisibility(manageTargetMapName, layerName, visible));
        }
    };
    const setOpacity = (layerName: string, value: number) => {
        if (manageTargetMapName) {
            dispatch(setMapLayerOpacity(manageTargetMapName, layerName, value));
        }
    };
    const setHeatmapBlur = (layerName: string, value: number) => {
        if (manageTargetMapName) {
            dispatch(setHeatmapLayerBlur(manageTargetMapName, layerName, value));
        }
    };
    const setHeatmapRadius = (layerName: string, value: number) => {
        if (manageTargetMapName) {
            dispatch(setHeatmapLayerRadius(manageTargetMapName, layerName, value));
        }
    };
    const updateVectorStyle = (layerName: string, value: IVectorLayerStyle, which: VectorStyleSource) => {
        if (manageTargetMapName) {
            dispatch(setMapLayerVectorStyle(manageTargetMapName, layerName, value, which));
        }
    }

    // When swipe is active, render a map selector dropdown above the "Manage Layers" tab so the
    // user can choose which map's layers to display and manage.
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
                        locale={locale} />
                },
                {
                    id: "manage_layers",
                    title: <span><Icon icon="layers" /> {tr("MANAGE_LAYERS", locale)}</span>,
                    content: <>
                        {swipeMapSelector}
                        <ManageLayers layers={manageLayers}
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
                    </>
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

