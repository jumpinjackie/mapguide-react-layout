import * as Constants from "../constants";
import {
    ActiveMapTool,
    ICommand,
    IMapView,
    ReduxAction,
    ReduxThunkedAction,
    getCurrentView,
    getRuntimeMap,
    getSelectionSet
} from "../api/common";
import { getViewer } from "../api/runtime";
import { areViewsCloseToEqual } from "../components/map-viewer-base";
import { areNumbersEqual } from '../utils/number';
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

function combineSelectedFeatureSets(oldRes: SelectedFeatureSet | null | undefined, newRes: SelectedFeatureSet | null | undefined): SelectedFeatureSet | null | undefined {
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

function combineFeatureSets(oldRes: FeatureSet | null | undefined, newRes: FeatureSet | null | undefined): FeatureSet | null | undefined {
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
            Hyperlink: null,
            InlineSelectionImage: null
        };
        return merged;
    } else {
        return newRes;
    }
}

export interface QueryMapFeatureActionOptions {
    options: IQueryMapFeaturesOptions;
    append?: boolean;
    callback?: (res: QueryMapFeaturesResponse) => void;
    errBack?: (err: any) => void;
}

/**
 * Queries map features
 *
 * @export
 * @param {string} mapName
 * @param {QueryMapFeatureActionOptions} opts
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
 * Sets the current view
 *
 * @export
 * @param {IMapView} view
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
        const mapName = state.config.activeMapName;
        let dispatchThis = true;
        if (currentView != null && view != null) {
            if (areViewsCloseToEqual(currentView, view)) {
                dispatchThis = false;
            }
        }
        if (dispatchThis) {
            dispatch({
                type: Constants.MAP_SET_VIEW,
                payload: {
                    mapName,
                    view
                }
            });
        }
    };
}

/**
 * Sets the selection set for the given map
 *
 * @export
 * @param {string} mapName
 * @param {*} selectionSet
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
 * @returns {ReduxThunkedAction}
 */
export function invokeCommand(cmd: ICommand): ReduxThunkedAction {
    return (dispatch, getState) => {
        return cmd.invoke(dispatch, getState, getViewer());
    };
}

/**
 * Sets the busy count of the viewer
 *
 * @export
 * @param {number} busyCount
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
 * @param {string} mapName
 * @param {string} layerName
 * @returns
 */
export function setBaseLayer(mapName: string, layerName: string) {
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
 * @param {string} mapName
 * @param {number} scale
 * @returns
 */
export function setScale(mapName: string, scale: number) {
    return {
        type: Constants.MAP_SET_SCALE,
        payload: {
            mapName,
            scale
        }
    };
}

export function setMouseCoordinates(mapName: string, coord: any) {
    return {
        type: Constants.UPDATE_MOUSE_COORDINATES,
        payload: {
            mapName,
            coord
        }
    };
}

export function previousView(mapName: string) {
    return {
        type: Constants.MAP_PREVIOUS_VIEW,
        payload: {
            mapName
        }
    };
}

export function nextView(mapName: string) {
    return {
        type: Constants.MAP_NEXT_VIEW,
        payload: {
            mapName
        }
    };
}

export function setActiveTool(tool: ActiveMapTool) {
    return {
        type: Constants.MAP_SET_ACTIVE_TOOL,
        payload: tool
    };
}

export function setActiveMap(mapName: string) {
    return {
        type: Constants.MAP_SET_ACTIVE_MAP,
        payload: mapName
    };
}