import BaseLayer from "ol/layer/Base";
import React from "react";
import type { CommonLayerProps } from "./contracts";
import { useMapMessage } from "../messages";

/**
 * A hook that synhronizes common state to any OpenLayers layer ref
 * 
 * @since 0.15
 */
export function useLayerState<T extends BaseLayer>(name: CommonLayerProps['name'], isHidden?: CommonLayerProps['isHidden'], extent?: CommonLayerProps['extent']) {
    const messages = useMapMessage();
    const layer = React.useRef<T | undefined>(undefined);
    React.useEffect(() => {
        if (layer.current) {
            const oldName = layer.current.get("name");
            if (oldName !== name) {
                messages.addInfo(`Apply new layer name: ${name}`);
                layer.current.set("name", name);
            }
            const oldVisible = layer.current.getVisible();
            if (oldVisible != !isHidden) {
                messages.addInfo(`Apply new layer visibility: ${!isHidden}`);
                layer.current.setVisible(!isHidden);
            }
            const oldExtent = layer.current.getExtent();
            if (oldExtent != extent) { // Yes, shallow comparison
                messages.addInfo(`Apply new layer extent: ${extent}`);
                layer.current.setExtent(extent);
            }
        }
    }, [name, isHidden, extent]);
    return layer;
}