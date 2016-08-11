import * as Constants from "../constants";

export function setBaseLayer(layerName: string) {
    return {
        type: Constants.LEGEND_SET_BASE_LAYER,
        payload: layerName
    };
}

export function setGroupVisibility(options: { groupId: string, visible: boolean }) {
    return {
        type: Constants.LEGEND_SET_GROUP_VISIBILITY,
        payload: options
    };
}

export function setLayerVisibility(options: { groupId: string, visible: boolean }) {
    return {
        type: Constants.LEGEND_SET_LAYER_VISIBILITY,
        payload: options
    };
}