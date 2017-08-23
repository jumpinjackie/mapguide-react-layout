import * as Constants from "../constants";
import {
    ActiveMapTool,
    ICommand,
    IMapView,
    ReduxAction,
    ReduxThunkedAction,
    getCurrentView,
    getRuntimeMap,
    getSelectionSet,
    UnitOfMeasure
} from "../api/common";
import { getViewer } from "../api/runtime";
import { areViewsCloseToEqual } from "../components/map-viewer-base";
import { areNumbersEqual, getFiniteScaleIndexForScale } from '../utils/number';
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet, SelectedFeature, SelectedFeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { buildSelectionXml } from '../api/builders/deArrayify';
import uniq = require("lodash.uniq");

function combineSelectedFeatures(oldRes: SelectedFeature[], newRes: SelectedFeature[]): SelectedFeature[] {
    const merged: SelectedFeature[] = [];
    for (const feat of oldRes) {
        merged.push(feat);
    }
    for (const feat of newRes) {
        //NOTE: Due to lack of identity property information, we have to
        //check all property values
        const matches = merged.filter(f => {
            for (const p of f.Property) {
                for (const np of feat.Property) {
                    if (p.Name == np.Name) {
                        if (p.Value != np.Value) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
        if (matches.length == 0) {
            merged.push(feat);
        }
    }
    return merged;
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
                existing[0].Class.ID = uniq(existing[0].Class.ID.concat(layer.Class.ID));
            }
        }
    }
    return merged;
}

function combineSelections(oldRes: QueryMapFeaturesResponse | undefined, newRes: QueryMapFeaturesResponse): QueryMapFeaturesResponse {
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
            client.queryMapFeatures(opts.options).then(res => {
                if (opts.options.persist === 1) {
                    if (opts.append === true) {
                        const combined = combineSelections(selectionSet, res);
                        const mergedXml = buildSelectionXml(combined.FeatureSet);
                        //Need to update the server-side selection with the merged result
                        client.queryMapFeatures({
                            session: map.SessionId,
                            mapname: map.Name,
                            persist: 1,
                            featurefilter: mergedXml
                        }).then(r => {
                            dispatch(setSelection(mapName, combined));
                            success(combined);
                        });
                    } else {
                        dispatch(setSelection(mapName, res));
                        success(res);
                    }
                } else {
                    success(res);
                }
            }).catch(failure);
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
            if (mapState.runtimeMap && 
                mapState.runtimeMap.FiniteDisplayScale &&
                mapState.runtimeMap.FiniteDisplayScale.length > 0) {

                const fi = getFiniteScaleIndexForScale(mapState.runtimeMap.FiniteDisplayScale, newView.scale);
                newView.scale = mapState.runtimeMap.FiniteDisplayScale[fi];
            }
            if (areViewsCloseToEqual(currentView, newView)) {
                dispatchThis = false;
            }
        }
        if (dispatchThis) {
            dispatch({
                type: Constants.MAP_SET_VIEW,
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
 * @returns {ReduxAction} 
 */
export function mapResized(width: number, height: number): ReduxAction {
    return {
        type: Constants.MAP_RESIZED,
        payload: {
            width,
            height
        }
    }
}

/**
 * Sets the selection set for the given map
 *
 * @export
 * @param {string} mapName The name of the current runtime map
 * @param {*} selectionSet The selection set to apply
 * @returns {ReduxAction}
 */
export function setSelection(mapName: string, selectionSet: any): ReduxAction {
    return {
        type: Constants.MAP_SET_SELECTION,
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
 * @returns {ReduxAction}
 */
export function setBusyCount(busyCount: number): ReduxAction {
    return {
        type: Constants.MAP_SET_BUSY_COUNT,
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
export function setBaseLayer(mapName: string, layerName: string): ReduxAction {
    return {
        type: Constants.MAP_SET_BASE_LAYER,
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
export function setScale(mapName: string, scale: number): ReduxAction {
    const viewer = getViewer();
    let resolution;
    if (viewer) {
        resolution = viewer.scaleToResolution(scale);
    }
    return {
        type: Constants.MAP_SET_SCALE,
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
export function setMouseCoordinates(mapName: string, coord: any): ReduxAction {
    return {
        type: Constants.UPDATE_MOUSE_COORDINATES,
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
export function setLayerTransparency(mapName: string, layerName: string, opacity: number): ReduxAction {
    return {
        type: Constants.MAP_SET_LAYER_TRANSPARENCY,
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
 * @returns {ReduxAction} 
 */
export function setViewSizeUnits(unit: UnitOfMeasure): ReduxAction {
    return {
        type: Constants.MAP_SET_VIEW_SIZE_UNITS,
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
export function previousView(mapName: string): ReduxAction {
    return {
        type: Constants.MAP_PREVIOUS_VIEW,
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
export function nextView(mapName: string): ReduxAction {
    return {
        type: Constants.MAP_NEXT_VIEW,
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
export function setActiveTool(tool: ActiveMapTool): ReduxAction {
    return {
        type: Constants.MAP_SET_ACTIVE_TOOL,
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
export function setActiveMap(mapName: string): ReduxAction {
    return {
        type: Constants.MAP_SET_ACTIVE_MAP,
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
export function setFeatureTooltipsEnabled(enabled: boolean): ReduxAction {
    return {
        type: Constants.MAP_SET_MAPTIP,
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
export function setViewRotation(rotation: number): ReduxAction {
    return {
        type: Constants.MAP_SET_VIEW_ROTATION,
        payload: rotation
    };
}

/**
 * Sets whether view rotation is enabled or not
 * 
 * @export
 * @param {boolean} enabled 
 */
export function setViewRotationEnabled(enabled: boolean): ReduxAction {
    return {
        type: Constants.MAP_SET_VIEW_ROTATION_ENABLED,
        payload: enabled
    };
}