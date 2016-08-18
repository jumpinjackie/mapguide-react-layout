import * as Constants from "../constants";
import { IMapView } from "../components/context";
import { ICommand } from "../api/command-registry";
import { getViewer } from "../api/runtime";
import { Bounds, isBounds, areViewsCloseToEqual } from "../components/map-viewer-base";
import { areNumbersEqual } from '../utils/number';

export function setCurrentView(view: IMapView|Bounds) {
    return (dispatch, getState) => {
        // HACK-y:
        //
        // We don't want to dispatch SET_VIEW actions with redundant view
        // states if the one we're about to dispatch is the same as the
        // previous one
        const currentView: IMapView|Bounds = getState().view.current;
        let dispatchThis = true;
        if (currentView != null && view != null) {
            if (isBounds(currentView) && isBounds(view)) {
                if (areNumbersEqual(currentView[0], view[0]) &&
                    areNumbersEqual(currentView[1], view[1]) &&
                    areNumbersEqual(currentView[2], view[2]) &&
                    areNumbersEqual(currentView[3], view[3])) {
                    dispatchThis = false;
                }
            } else if (!isBounds(currentView) && !isBounds(view)) {
                if (areViewsCloseToEqual(currentView, view)) {
                    dispatchThis = false;
                }
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