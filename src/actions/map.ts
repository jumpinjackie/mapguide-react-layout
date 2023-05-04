import {
    ActiveMapTool,
    ICommand,
    IMapView,
    ReduxThunkedAction,
    getCurrentView,
    getRuntimeMap,
    getSelectionSet,
    UnitOfMeasure,
    ILayerInfo,
    ReduxDispatch
} from "../api/common";
import { getViewer } from "../api/runtime";
import { getFiniteScaleIndexForScale } from '../utils/number';
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet, SelectedFeature, SelectedFeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions, QueryFeaturesSet } from '../api/request-builder';
import { buildSelectionXml } from '../api/builders/deArrayify';
import { ActionType } from '../constants/actions';
import {
    IMapSetBusyCountAction,
    IMapSetBaseLayerAction,
    IMapSetScaleAction,
    IMapSetMouseCoordinatesAction,
    IMapSetLayerTransparencyAction,
    IMapSetViewSizeUnitsAction,
    IMapPreviousViewAction,
    IMapNextViewAction,
    ISetActiveMapToolAction,
    ISetActiveMapAction,
    ISetManualFeatureTooltipsEnabledAction,
    ISetFeatureTooltipsEnabledAction,
    IMapSetViewRotationAction,
    IMapSetViewRotationEnabledAction,
    IShowSelectedFeatureAction,
    IMapSetSelectionAction,
    IMapResizedAction,
    IAddedLayerAction,
    IRemoveLayerAction,
    ISetLayerIndexAction,
    ISetLayerOpacityAction,
    ISetLayerVisibilityAction,
    ISetMapLayerVectorStyle,
    IAddMapLayerBusyWorkerAction,
    IRemoveMapLayerBusyWorkerAction,
    IAddClientSelectedFeatureAction,
    IClearClientSelectionAction,
    ISetHeatmapLayerBlurAction,
    ISetHeatmapLayerRadiusAction,
    IEnableSelectDragPanAction
} from './defs';
import { persistSelectionSetToLocalStorage } from '../api/session-store';
import { getSiteVersion, canUseQueryMapFeaturesV4 } from '../utils/site-version';
import { areViewsCloseToEqual } from '../utils/viewer-state';
import { IVectorLayerStyle, VectorStyleSource } from '../api/ol-style-contracts';
import { ClientSelectionFeature } from "../api/contracts/common";
import xor from "lodash.xor";
import xorby from "lodash.xorby";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { debug } from "../utils/logger";

function combineSelectedFeatures(oldRes: SelectedFeature[], newRes: SelectedFeature[]): SelectedFeature[] {
    // This function won't be called if we're using QUERYMAPFEATURES older than v4.0.0 (because we won't request
    // attributes on the first QUERYMAPFEATURES call and use the save merged selection XML QUERYMAPFEATURES call as an 
    // opportunity to get back the full attribute set of the merged selection), but if we ever do hit here we are totally
    // assuming a v4 QUERYMAPFEATURES response and the selected features will be having a SelectionKey set so we can easily 
    // xorby the 2 arrays
    return xorby(oldRes, newRes, f => f.SelectionKey);
}

function combineSelectedFeatureSets(oldRes: SelectedFeatureSet | undefined, newRes: SelectedFeatureSet | undefined): SelectedFeatureSet | undefined {
    if (oldRes == null) {
        return newRes;
    }
    const merged: SelectedFeatureSet = {
        SelectedLayer: []
    };
    for (const layer of oldRes.SelectedLayer) {
        merged.SelectedLayer.push(layer);
    }
    if (newRes) {
        for (const layer of newRes.SelectedLayer) {
            const layerId = layer["@id"];
            const layerName = layer["@name"];
            const existing = merged.SelectedLayer.filter(l => l["@id"] == layerId && l["@name"] == layerName);
            if (existing.length == 0) {
                merged.SelectedLayer.push(layer);
            } else {
                existing[0].Feature = combineSelectedFeatures(existing[0].Feature, layer.Feature);
            }
        }
    }
    return merged;
}

function combineFeatureSets(oldRes: FeatureSet | undefined, newRes: FeatureSet | undefined): FeatureSet | undefined {
    if (oldRes == null) {
        return newRes;
    }
    const merged: FeatureSet = {
        Layer: []
    };
    for (const layer of oldRes.Layer) {
        merged.Layer.push(layer);
    }
    if (newRes) {
        for (const layer of newRes.Layer) {
            const layerId = layer["@id"];
            const existing = merged.Layer.filter(l => l["@id"] == layerId);
            if (existing.length == 0) {
                merged.Layer.push(layer);
            } else {
                existing[0].Class.ID = xor(existing[0].Class.ID, layer.Class.ID);
            }
        }
    }
    return merged;
}

/**
 * @hidden Exported just to be unit testable
 */
export function combineSelections(oldRes: QueryMapFeaturesResponse | undefined, newRes: QueryMapFeaturesResponse): QueryMapFeaturesResponse {
    if (oldRes) {
        const merged: QueryMapFeaturesResponse = {
            SelectedFeatures: combineSelectedFeatureSets(oldRes.SelectedFeatures, newRes.SelectedFeatures),
            FeatureSet: combineFeatureSets(oldRes.FeatureSet, newRes.FeatureSet),
            Hyperlink: undefined,
            InlineSelectionImage: undefined
        };
        return merged;
    } else {
        return newRes;
    }
}

/**
 * Options for map querying
 *
 * @export
 * @interface QueryMapFeatureActionOptions
 */
export interface QueryMapFeatureActionOptions {
    /**
     * The main set of map querying options
     *
     * @type {IQueryMapFeaturesOptions}
     * @memberof QueryMapFeatureActionOptions
     */
    options: IQueryMapFeaturesOptions;
    /**
     * If true, the selection changes will be appended to the current selection set. False otherwise
     *
     * @type {boolean}
     * @memberof QueryMapFeatureActionOptions
     */
    append?: boolean;
    /**
     * An optional callback to invoke on successful operation
     *
     * @memberof QueryMapFeatureActionOptions
     */
    callback?: (res: QueryMapFeaturesResponse) => void;
    /**
     * An optional callback to invoke on failure
     *
     * @memberof QueryMapFeatureActionOptions
     */
    errBack?: (err: any) => void;
}

async function queryMapFeaturesHelper(map: RuntimeMap,
    client: Client,
    opts: QueryMapFeatureActionOptions,
    selectionSet: QueryMapFeaturesResponse | undefined,
    dispatch: ReduxDispatch
) {
    const mapName = map.Name;
    //We want v4.0.0 QUERYMAPFEATURES if available
    const sv = getSiteVersion(map);
    const isV4 = canUseQueryMapFeaturesV4(sv);
    const queryOp = isV4
        ? (opts: IQueryMapFeaturesOptions) => client.queryMapFeatures_v4(opts)
        : (opts: IQueryMapFeaturesOptions) => client.queryMapFeatures(opts);

    const isAppendingWithAttributesOnOldMapGuide = !isV4
        && opts.append === true
        && opts.options.persist === 1
        && opts.options.requestdata !== undefined
        && (opts.options.requestdata & QueryFeaturesSet.Attributes);

    if (isAppendingWithAttributesOnOldMapGuide) {
        debug("Not asking for attributes in first QUERYMAPFEATURES");
        // Momentarily stop requesting for attributes
        opts.options.requestdata! &= ~QueryFeaturesSet.Attributes;
    }

    const res = await queryOp(opts.options);
    if (opts.options.persist === 1) {
        if (opts.append === true) {
            let combined = combineSelections(selectionSet, res);
            const mergedXml = buildSelectionXml(combined.FeatureSet);
            // Need to update the server-side selection with the merged result
            const opts2: IQueryMapFeaturesOptions = {
                session: map.SessionId,
                mapname: map.Name,
                persist: 1,
                featurefilter: mergedXml
            };
            // If appending with attributes, we can now also include attributes of the merged result
            if (isAppendingWithAttributesOnOldMapGuide) {
                debug("Now asking for attributes in second QUERYMAPFEATURES");
                opts2.requestdata = QueryFeaturesSet.Attributes;
            }
            const res2 = await queryOp(opts2);
            // If appending with attributes, res2 represents the attributes of the merged result, so accept
            // it as the new combined without having to do any stitching
            if (isAppendingWithAttributesOnOldMapGuide) {
                debug("Accepting second QUERYMAPFEATURES as new combined selection response");
                combined = res2;
            }
            persistSelectionSetToLocalStorage(map.SessionId, mapName, combined); // set and forget
            dispatch(setSelection(mapName, combined));
            return combined;
        } else {
            persistSelectionSetToLocalStorage(map.SessionId, mapName, res); // set and forget
            dispatch(setSelection(mapName, res));
            return res;
        }
    } else {
        return res;
    }
}

/**
 * Queries map features
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {QueryMapFeatureActionOptions} opts query options
 * @returns {ReduxThunkedAction}
 */
export function queryMapFeatures(mapName: string, opts: QueryMapFeatureActionOptions): ReduxThunkedAction {
    return (dispatch, getState) => {
        const state = getState();
        const args = state.config;
        const map = getRuntimeMap(state);
        const selectionSet = getSelectionSet(state);
        if (map && args.agentKind && args.agentUri) {
            const client = new Client(args.agentUri, args.agentKind);
            const success = (res: QueryMapFeaturesResponse) => {
                if (opts.callback != null) {
                    opts.callback(res);
                }
            };
            const failure = (err: Error) => {
                if (opts.errBack != null) {
                    opts.errBack(err);
                }
            };
            queryMapFeaturesHelper(map, client, opts, selectionSet, dispatch).then(r => success(r))
                .catch(e => failure(e));
        }
    };
}

/**
 * Sets the current map view.
 *
 * NOTE: Subscribing components are not guaranteed to receive every new view change sent by
 * calling this method. For purposes of optimization, views passed in that are "close enough"
 * to the current view are not dispatched to subscribing components.
 * 
 * @export
 * @param {IMapView} view The map view to set
 * @returns {ReduxThunkedAction}
 */
export function setCurrentView(view: IMapView): ReduxThunkedAction {
    return (dispatch, getState) => {
        // HACK-y:
        //
        // We don't want to dispatch SET_VIEW actions with redundant view
        // states if the one we're about to dispatch is the same as the
        // previous one
        const state = getState();
        const currentView = getCurrentView(state);
        const newView = { ...view };
        const mapName = state.config.activeMapName;
        let dispatchThis = true;
        if (currentView && mapName) {
            //If the current map is tiled (has finite scales), "snap" the view's scale
            //to the closest applicable finite scale then do the test 
            const mapState = state.mapState[mapName];
            const fs = mapState?.mapguide?.runtimeMap?.FiniteDisplayScale;
            if (fs && fs.length > 0) {

                const fi = getFiniteScaleIndexForScale(fs, newView.scale);
                newView.scale = fs[fi];
            }
            if (areViewsCloseToEqual(currentView, newView)) {
                dispatchThis = false;
            }
        }
        if (dispatchThis && mapName) {
            dispatch({
                type: ActionType.MAP_SET_VIEW,
                payload: {
                    mapName,
                    view: newView
                }
            });
        }
    };
}

/**
 * Sends a map resized notification
 * 
 * @export
 * @param {number} width 
 * @param {number} height 
 * @returns {IMapResizedAction} 
 */
export function mapResized(width: number, height: number): IMapResizedAction {
    return {
        type: ActionType.MAP_RESIZED,
        payload: {
            width,
            height
        }
    }
}

/**
 * Sets the selection set for the given map
 * 
 * @param mapName 
 * @param selectionSet 
 * @returns 
 * 
 * @since 0.14 Fixed up the type of selectionSet parameter
 */
export function setSelection(mapName: string, selectionSet: QueryMapFeaturesResponse | undefined): IMapSetSelectionAction {
    return {
        type: ActionType.MAP_SET_SELECTION,
        payload: {
            mapName,
            selection: selectionSet
        }
    };
}

/**
 * Invokes the specified command
 *
 * @export
 * @param {ICommand} cmd
 * @param {*} [parameters]
 * @returns {ReduxThunkedAction}
 */
export function invokeCommand(cmd: ICommand, parameters?: any): ReduxThunkedAction {
    return (dispatch, getState) => {
        return cmd.invoke(dispatch, getState, getViewer(), parameters);
    };
}

/**
 * Sets the busy count of the viewer. A value greater than zero signifies that the viewer is currently
 * busy performing various actions (eg. Loading/Rendering the current map image)
 *
 * @export
 * @param {number} busyCount The current busy count
 * @returns {IMapSetBusyCountAction}
 */
export function setBusyCount(busyCount: number): IMapSetBusyCountAction {
    return {
        type: ActionType.MAP_SET_BUSY_COUNT,
        payload: busyCount
    };
}

/**
 * Set the given external base layer as the active base layer
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {string} layerName The name of the external base layer to set as active
 * @returns
 */
export function setBaseLayer(mapName: string, layerName: string): IMapSetBaseLayerAction {
    return {
        type: ActionType.MAP_SET_BASE_LAYER,
        payload: {
            mapName,
            layerName
        }
    };
}

/**
 * Sets the view scale
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {number} scale The scale to set
 * @returns
 */
export function setScale(mapName: string, scale: number): IMapSetScaleAction {
    const viewer = getViewer();
    let resolution;
    if (viewer) {
        resolution = viewer.scaleToResolution(scale);
    }
    return {
        type: ActionType.MAP_SET_SCALE,
        payload: {
            mapName,
            scale,
            resolution
        }
    };
}

/**
 * Sets the current mouse coordinates
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {*} coord The current mouse coordinates
 * @returns
 */
export function setMouseCoordinates(mapName: string, coord: any): IMapSetMouseCoordinatesAction {
    return {
        type: ActionType.UPDATE_MOUSE_COORDINATES,
        payload: {
            mapName,
            coord
        }
    };
}

/**
 * Set the transparency for the given OL layer
 * 
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {string} layerName The name of the OL layer
 * @param {number} opacity A value between 0 and 1. 1 - Fully Opaque, 0 - Fully Transparent
 * @returns 
 */
export function setLayerTransparency(mapName: string, layerName: string, opacity: number): IMapSetLayerTransparencyAction {
    return {
        type: ActionType.MAP_SET_LAYER_TRANSPARENCY,
        payload: {
            mapName,
            layerName,
            opacity
        }
    };
}

/**
 * Sets the units for the map view size display
 * 
 * @export
 * @param {UnitOfMeasure} unit 
 * @returns {IMapSetViewSizeUnitsAction} 
 */
export function setViewSizeUnits(unit: UnitOfMeasure): IMapSetViewSizeUnitsAction {
    return {
        type: ActionType.MAP_SET_VIEW_SIZE_UNITS,
        payload: unit
    };
}

/**
 * Goes back to the previous view on the navigation stack
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @returns
 */
export function previousView(mapName: string): IMapPreviousViewAction {
    return {
        type: ActionType.MAP_PREVIOUS_VIEW,
        payload: {
            mapName
        }
    };
}

/**
 * Goes to the next view on the navigation stack
 *
 * @export
 * @param {string} mapName The name of the current runtime amp
 * @returns
 */
export function nextView(mapName: string): IMapNextViewAction {
    return {
        type: ActionType.MAP_NEXT_VIEW,
        payload: {
            mapName
        }
    };
}

/**
 * Sets the active map tool
 *
 * @export
 * @param {ActiveMapTool} tool The active map tool command
 * @returns
 */
export function setActiveTool(tool: ActiveMapTool): ISetActiveMapToolAction {
    return {
        type: ActionType.MAP_SET_ACTIVE_TOOL,
        payload: tool
    };
}

/**
 * Sets the active runtime map
 *
 * @export
 * @param {string} mapName The name of the runtime map to set as active
 * @returns
 */
export function setActiveMap(mapName: string): ISetActiveMapAction {
    return {
        type: ActionType.MAP_SET_ACTIVE_MAP,
        payload: mapName
    };
}

/**
 * Sets whether feature tooltips (aka. Map Tips) are enabled
 *
 * @export
 * @param {boolean} enabled
 * @returns
 */
export function setFeatureTooltipsEnabled(enabled: boolean): ISetFeatureTooltipsEnabledAction {
    return {
        type: ActionType.MAP_SET_MAPTIP,
        payload: enabled
    };
}

/**
 * Sets whether the select tool can pan while dragging
 * 
 * @param enabled 
 * @since 0.14.2
 */
export function enableSelectDragPan(enabled: boolean): IEnableSelectDragPanAction {
    return {
        type: ActionType.MAP_ENABLE_SELECT_DRAGPAN,
        payload: enabled
    }
}

/**
 * Sets whether manual feature tooltips (aka. Map Tips) are enabled
 *
 * @export
 * @param {boolean} enabled
 * @returns
 */
export function setManualFeatureTooltipsEnabled(enabled: boolean): ISetManualFeatureTooltipsEnabledAction {
    return {
        type: ActionType.MAP_SET_MANUAL_MAPTIP,
        payload: enabled
    };
}

/**
 * Sets the rotation of the current view
 * 
 * @export
 * @param {number} rotation 
 * @returns 
 */
export function setViewRotation(rotation: number): IMapSetViewRotationAction {
    return {
        type: ActionType.MAP_SET_VIEW_ROTATION,
        payload: rotation
    };
}

/**
 * Sets whether view rotation is enabled or not
 * 
 * @export
 * @param {boolean} enabled 
 */
export function setViewRotationEnabled(enabled: boolean): IMapSetViewRotationEnabledAction {
    return {
        type: ActionType.MAP_SET_VIEW_ROTATION_ENABLED,
        payload: enabled
    };
}

/**
 * Shows the selected feature on the map
 * 
 * @export
 * @param {string} mapName 
 * @param {string} layerId 
 * @param {string} selectionKey 
 * @returns {IShowSelectedFeatureAction} 
 */
export function showSelectedFeature(mapName: string, layerId: string, selectionKey: string): IShowSelectedFeatureAction {
    return {
        type: ActionType.MAP_SHOW_SELECTED_FEATURE,
        payload: {
            mapName,
            layerId,
            selectionKey
        }
    };
}

/**
 * NOTE: Dispatching this action does not add the layer to the map. This is a means to notify others
 * that a new layer has been added. It is expected to be dispatched by any component that is managing
 * layers
 * 
 * @export
 * @param {string} mapName
 * @param {ILayerInfo} layer
 * @param {IVectorLayerStyle} [defaultStyle]
 * @returns {IAddedLayerAction}
 * @since 0.13
 * @since 0.14 defaultStyle argument changed to IVectorLayerStyle
 */
export function mapLayerAdded(mapName: string, layer: ILayerInfo, defaultStyle?: IVectorLayerStyle): IAddedLayerAction {
    return {
        type: ActionType.LAYER_ADDED,
        payload: {
            mapName,
            layer,
            defaultStyle
        }
    };
}

/**
 * An action that signals the externa layers for the given map name is ready. This action
 * is only dispatched when there is no external layers to initially add
 * 
 * @param mapName 
 * @since 0.14
 */
export function externalLayersReady(mapName: string) {
    return {
        type: ActionType.EXTERNAL_LAYERS_READY,
        payload: {
            mapName
        }
    }
}

/**
 * Removes a given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @returns {IRemoveLayerAction}
 * @since 0.13
 */
export function removeMapLayer(mapName: string, layerName: string): IRemoveLayerAction {
    return {
        type: ActionType.REMOVE_LAYER,
        payload: {
            mapName,
            layerName
        }
    };
}

/**
 * Sets the display order index for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @param {number} index
 * @returns {ISetLayerIndexAction}
 * @since 0.13
 */
export function setMapLayerIndex(mapName: string, layerName: string, index: number): ISetLayerIndexAction {
    return {
        type: ActionType.SET_LAYER_INDEX,
        payload: {
            mapName,
            layerName,
            index
        }
    };
}

/**
 * Sets the opacity for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @param {number} opacity
 * @returns {ISetLayerOpacityAction}
 * @since 0.13
 */
export function setMapLayerOpacity(mapName: string, layerName: string, opacity: number): ISetLayerOpacityAction {
    return {
        type: ActionType.SET_LAYER_OPACITY,
        payload: {
            mapName,
            layerName,
            opacity
        }
    };
}

/**
 * Sets the heatmap blur for the given external heatmap layer for the given map
 * 
 * @param mapName 
 * @param layerName 
 * @param blur 
 */
export function setHeatmapLayerBlur(mapName: string, layerName: string, blur: number): ISetHeatmapLayerBlurAction {
    return {
        type: ActionType.SET_HEATMAP_LAYER_BLUR,
        payload: {
            mapName,
            layerName,
            blur
        }
    };
}

/**
 * Sets the heatmap radius for the given external heatmap layer for the given map
 * 
 * @param mapName 
 * @param layerName 
 * @param radius 
 */
export function setHeatmapLayerRadius(mapName: string, layerName: string, radius: number): ISetHeatmapLayerRadiusAction {
    return {
        type: ActionType.SET_HEATMAP_LAYER_RADIUS,
        payload: {
            mapName,
            layerName,
            radius
        }
    };
}

/**
 * Sets the visibility for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @param {boolean} visible
 * @returns {ISetLayerVisibilityAction}
 * @since 0.13
 */
export function setMapLayerVisibility(mapName: string, layerName: string, visible: boolean): ISetLayerVisibilityAction {
    return {
        type: ActionType.SET_LAYER_VISIBILITY,
        payload: {
            mapName,
            layerName,
            visible
        }
    };
}

/**
 * Sets the vector style for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @param {IVectorLayerStyle} style
 * @param {VectorStyleSource} which
 * @returns {ISetMapLayerVectorStyle}
 * @since 0.13
 * @since 0.14 style and which arguments changed to IVectorLayerStyle
 */
export function setMapLayerVectorStyle(mapName: string, layerName: string, style: IVectorLayerStyle, which: VectorStyleSource): ISetMapLayerVectorStyle {
    return {
        type: ActionType.SET_LAYER_VECTOR_STYLE,
        payload: {
            mapName,
            layerName,
            style,
            which
        }
    };
}

/**
 * Adds a busy worker for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @returns {IAddMapLayerBusyWorkerAction}
 * @since 0.13
 */
export function addMapLayerBusyWorker(mapName: string, layerName: string): IAddMapLayerBusyWorkerAction {
    return {
        type: ActionType.ADD_LAYER_BUSY_WORKER,
        payload: {
            mapName,
            layerName
        }
    }
}

/**
 * Removes a busy worker for the given external layer for the given map
 * 
 * @export
 * @param {string} mapName
 * @param {string} layerName
 * @returns {IRemoveMapLayerBusyWorkerAction}
 * @since 0.13
 */
export function removeMapLayerBusyWorker(mapName: string, layerName: string): IRemoveMapLayerBusyWorkerAction {
    return {
        type: ActionType.REMOVE_LAYER_BUSY_WORKER,
        payload: {
            mapName,
            layerName
        }
    }
}

/**
 * Adds a feature to the client selection set for the given map
 * 
 * @param mapName 
 * @param layerName 
 * @param feature 
 * @returns 
 * @since 0.14
 */
export function addClientSelectedFeature(mapName: string, layerName: string, feature: ClientSelectionFeature): IAddClientSelectedFeatureAction {
    return {
        type: ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE,
        payload: {
            mapName,
            layerName,
            feature
        }
    }
}

/**
 * Clears the client selection set for the given map
 * 
 * @param mapName 
 * @since 0.14
 */
export function clearClientSelection(mapName: string): IClearClientSelectionAction {
    return {
        type: ActionType.MAP_CLEAR_CLIENT_SELECTION,
        payload: {
            mapName
        }
    }
}