import * as Constants from "../constants";
import { IMapView } from "../components/context";

export function setCurrentView(view: IMapView) {
    return {
        type: Constants.MAP_SET_VIEW,
        payload: view
    }
}