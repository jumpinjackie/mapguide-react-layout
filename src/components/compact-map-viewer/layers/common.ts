import BaseLayer from "ol/layer/Base";
import React from "react";
import type { CommonLayerProps } from "./contracts";

export function useLayerState<T extends BaseLayer>(name: CommonLayerProps['name'], isHidden?: CommonLayerProps['isHidden'], extent?: CommonLayerProps['extent']) {
    const layer = React.useRef<T | undefined>(undefined);
    React.useEffect(() => {
        if (layer.current) {
            layer.current.set("name", name);
            layer.current.setVisible(!isHidden);
            layer.current.setExtent(extent);
        }
    }, [name, isHidden, extent]);
    return layer;
}