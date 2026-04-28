import * as React from "react";
import { IExternalBaseLayer, isVisualBaseLayer } from "../api/common";
import { STR_EMPTY, strIsNullOrEmpty } from "../utils/string";
import { tr } from "../api/i18n";
import { useElementContext } from "./elements/element-context";

/**
 * BaseLayersSwitcher component props
 *
 * @interface IBaseLayerSwitcherProps
 */
export interface IBaseLayerSwitcherProps {
    locale: string | undefined;
    externalBaseLayers: IExternalBaseLayer[];
    onBaseLayerChanged?: (name: string) => void;
}

/**
 * The BaseLayerSwitcher component provides a user interface for switching the active external
 * base layer of the current map
 * @param props 
 */
export const BaseLayerSwitcher = (props: IBaseLayerSwitcherProps) => {
    const { Radio } = useElementContext();
    const { locale, externalBaseLayers } = props;
    const visLayers = externalBaseLayers.filter(layer => layer.visible === true);
    const [selected, setSelected] = React.useState(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
    const onBaseLayerChanged = (e: any) => {
        const value = e.currentTarget.value;
        setSelected(value);
        props.onBaseLayerChanged?.(value);
    }
    React.useEffect(() => {
        setSelected(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
    }, [visLayers]);
    return <div>
        <div className="base-layer-switcher-item-container">
            <Radio value={STR_EMPTY} checked={strIsNullOrEmpty(selected)} onChange={onBaseLayerChanged} label={tr("NONE", locale)} />
        </div>
        {externalBaseLayers.filter(ebl => isVisualBaseLayer(ebl)).map(layer => {
            return <div className="base-layer-switcher-item-container" key={`base-layer-${layer.name}`}>
                <Radio value={layer.name} checked={layer.name === selected} onChange={onBaseLayerChanged} label={layer.name} />
            </div>;
        })}
    </div>;
}