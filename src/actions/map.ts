import * as Constants from "../constants";
import { IMapView } from "../components/context";
import { ICommand } from "../api/registry/command";
import { getViewer } from "../api/runtime";
import { areViewsCloseToEqual } from "../components/map-viewer-base";
import { areNumbersEqual } from '../utils/number';

export function setCurrentView(view: IMapView) {
    return (dispatch, getState) => {
        // HACK-y:
        //
        // We don't want to dispatch SET_VIEW actions with redundant view
        // states if the one we're about to dispatch is the same as the
        // previous one
        const currentView: IMapView = getState().view.current;
        let dispatchThis = true;
        if (currentView != null && view != null) {
            if (areViewsCloseToEqual(currentView, view)) {
                dispatchThis = false;
            }
        }
        if (dispatchThis) {
            dispatch({
                type: Constants.MAP_SET_VIEW,
                payload: view
            });
        }
    };
}

export function setSelection(selectionSet) {
    return {
        type: Constants.MAP_SET_SELECTION,
        payload: selectionSet
    };
}

export function invokeCommand(cmd: ICommand) {
    return (dispatch, getState) => {
        return cmd.invoke(dispatch, getState, getViewer());
    };
}

export function setBusyCount(busyCount) {
    return {
        type: Constants.MAP_SET_BUSY_COUNT,
        payload: busyCount
    };
}

export function setBaseLayer(layerName: string) {
    return {
        type: Constants.MAP_SET_BASE_LAYER,
        payload: layerName
    };
}

export function setScale(scale: number) {
    return {
        type: Constants.MAP_SET_SCALE,
        payload: scale
    };
}

export function setMouseCoordinates(coord) {
    return {
        type: Constants.UPDATE_MOUSE_COORDINATES,
        payload: coord
    };
}

export function previousView() {
    return {
        type: Constants.MAP_PREVIOUS_VIEW
    };
}

export function nextView() {
    return {
        type: Constants.MAP_NEXT_VIEW
    };
}