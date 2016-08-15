import * as Constants from "../constants";
import { IMapView } from "../components/context";
import { ICommand } from "../api/command-registry";

export function setCurrentView(view: IMapView) {
    return {
        type: Constants.MAP_SET_VIEW,
        payload: view
    }
}

export function setSelection(selectionSet) {
    return {
        type: Constants.MAP_SET_SELECTION,
        payload: selectionSet
    };
}

export function invokeCommand(cmd: ICommand) {
    return (dispatch, getState) => {
        return cmd.invoke(dispatch, getState, null);
    }
}