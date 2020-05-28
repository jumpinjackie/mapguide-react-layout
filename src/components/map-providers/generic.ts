import { BaseMapProviderContext, IMapProviderState, IMapProviderStateExtras } from './base';
import { GenericLayerSetGroup } from "../../api/generic-layer-set-group";
import { areViewsCloseToEqual } from '../../utils/viewer-state';
import View from 'ol/View';
import { debug } from '../../utils/logger';
import { assertIsDefined } from '../../utils/assert';
import { IGenericSubjectMapLayer } from '../../actions/defs';
import { useActiveMapSubjectLayer } from '../../containers/hooks-generic';
import { useConfiguredLoadIndicatorPositioning, useConfiguredLoadIndicatorColor, useViewerActiveTool, useActiveMapView, useViewerViewRotation, useViewerViewRotationEnabled, useActiveMapName, useViewerLocale, useActiveMapExternalBaseLayers, useConfiguredCancelDigitizationKey, useConfiguredUndoLastPointKey, useActiveMapLayers, useActiveMapInitialExternalLayers } from '../../containers/hooks';
import { useDispatch } from 'react-redux';

function useGenericMapViewerState() {
    const activeTool = useViewerActiveTool();
    const view = useActiveMapView();
    const viewRotation = useViewerViewRotation();
    const viewRotationEnabled = useViewerViewRotationEnabled();
    const mapName = useActiveMapName();
    const locale = useViewerLocale();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const cancelDigitizationKey = useConfiguredCancelDigitizationKey();
    const undoLastPointKey = useConfiguredUndoLastPointKey();
    const layers = useActiveMapLayers();
    const initialExternalLayers = useActiveMapInitialExternalLayers();
    const dispatch = useDispatch();
    // ================ Generic-specific =================== //
    const subject = useActiveMapSubjectLayer();

    const nextState: IGenericMapProviderState & IMapProviderStateExtras = {
        activeTool,
        view,
        viewRotation,
        viewRotationEnabled,
        mapName,
        locale,
        externalBaseLayers,
        cancelDigitizationKey,
        undoLastPointKey,
        initialExternalLayers,
        // ========== IMapProviderStateExtras ========== //
        isReady: true,
        bgColor: undefined,
        layers,
        // ================ Generic-specific =================== //
        subject
    };
    return nextState;
}

export interface IGenericMapProviderState extends IMapProviderState {
    subject: IGenericSubjectMapLayer | undefined;
}

export class GenericMapProviderContext extends BaseMapProviderContext<IGenericMapProviderState, GenericLayerSetGroup> {
    constructor() {
        super();
    }
    /**
     * @override
     */
    public getHookFunction(): () => IMapProviderState & IMapProviderStateExtras {
        return useGenericMapViewerState;
    }
    protected getInitialProviderState(): Omit<IGenericMapProviderState, keyof IMapProviderState> {
        return {
            subject: undefined
        };
    }
    protected onProviderMapClick(px: [number, number]): void { }
    protected initLayerSet(nextState: IGenericMapProviderState): GenericLayerSetGroup {
        const { mapName } = nextState;
        assertIsDefined(mapName);
        const layerSet = new GenericLayerSetGroup({
            getImageLoaders: () => super.getImageSourceLoaders(mapName),
            getTileLoaders: () => super.getTileSourceLoaders(mapName),
            getLocale: () => this._state.locale,
            addImageLoading: () => this._comp?.addImageLoading(),
            addImageLoaded: () => this._comp?.addImageLoaded(),
            onImageError: (e) => this.onImageError(e)
        }, nextState.subject, nextState.externalBaseLayers, nextState.locale);
        this._layerSetGroups[mapName] = layerSet;
        return layerSet;
    }
    public getProviderName(): string { return "Generic"; }
    public setProviderState(nextState: IGenericMapProviderState): void {
        // If viewer not mounted yet, just accept the next state and bail
        if (!this._comp || !this._map) {
            this._state = nextState;
            return;
        }
        //
        // React (no pun intended) to prop changes
        //
        let bChangedView = false;
        //map
        if (nextState.mapName != this._state.mapName && this._map && this._ovMap) {
            this.hideAllPopups();
            const oldLayerSet = this.getLayerSetGroup(this._state.mapName);
            const newLayerSet = this.ensureAndGetLayerSetGroup(nextState);
            oldLayerSet?.detach(this._map, this._ovMap);
            newLayerSet.attach(this._map, this._ovMap);
            //This would happen if we switch to a map we haven't visited yet
            if (!nextState.view) {
                newLayerSet.fitViewToExtent();
                bChangedView = true;
            } else {
                const layerSet = this.getLayerSetGroup(nextState.mapName);
                if (layerSet) {
                    this.applyView(layerSet, nextState.view);
                }
            }
        }
        //externalBaseLayers
        if (nextState.externalBaseLayers != null &&
            nextState.externalBaseLayers.length > 0) {
            const layerSet = this.getLayerSetGroup(nextState.mapName);
            layerSet?.updateExternalBaseLayers(nextState.externalBaseLayers);
        }
        //view
        if (!areViewsCloseToEqual(nextState.view, this._state.view)) {
            const vw = nextState.view;
            if (vw != null && !bChangedView) {
                const layerSet = this.getLayerSetGroup(nextState.mapName);
                if (layerSet) {
                    this.applyView(layerSet, vw);
                }
            } else {
                debug(`Skipping zoomToView as next/current views are close enough or target view is null`);
            }
        }
        //overviewMapElement
        if (nextState.overviewMapElementSelector) {
            this.updateOverviewMapElement(nextState.overviewMapElementSelector);
        }
        //viewRotation
        if (this._state.viewRotation != nextState.viewRotation) {
            this.getOLView().setRotation(nextState.viewRotation);
        }
        //viewRotationEnabled
        if (this._state.viewRotationEnabled != nextState.viewRotationEnabled) {
            if (this._map) {
                const view = this.getOLView();
                const newView = new View({
                    enableRotation: nextState.viewRotationEnabled,
                    rotation: nextState.viewRotation,
                    center: view.getCenter(),
                    resolution: view.getResolution(),
                    resolutions: view.getResolutions(),
                    minResolution: view.getMinResolution(),
                    maxResolution: view.getMaxResolution(),
                    maxZoom: view.getMaxZoom(),
                    minZoom: view.getMinZoom(),
                    //constrainRotation: view.constrainRotation(),
                    projection: view.getProjection(),
                    zoom: view.getZoom()
                });
                this._map.setView(newView);
            }
        }
        this._state = nextState;
    }
}