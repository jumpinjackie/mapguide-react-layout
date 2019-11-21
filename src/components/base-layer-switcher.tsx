import * as React from "react";
import { IExternalBaseLayer } from "../api/common";
import { STR_EMPTY, strIsNullOrEmpty } from "../utils/string";
import { tr } from "../api/i18n";

/**
 * BaseLayersSwitcher component props
 *
 * @export
 * @interface IBaseLayerSwitcherProps
 */
export interface IBaseLayerSwitcherProps {
    locale: string | undefined;
    externalBaseLayers: IExternalBaseLayer[];
    onBaseLayerChanged?: (name: string) => void;
}

function getSelectedLayer(externalBaseLayers: IExternalBaseLayer[]): string | undefined {
    const matches = externalBaseLayers.filter(layer => layer.visible === true);
    if (matches.length == 1) {
        return matches[0].name;
    }
    return undefined;
}

/**
 * The BaseLayerSwitcher component provides a user interface for switching the active external base layer of the current map
 * @param props 
 */
export const BaseLayerSwitcher = (props: IBaseLayerSwitcherProps) => {
    const { locale, externalBaseLayers } = props;
    const [selected, setSelected] = React.useState(getSelectedLayer(props.externalBaseLayers));
    React.useEffect(() => {
        setSelected(getSelectedLayer(props.externalBaseLayers));
    }, [props.externalBaseLayers]);
    const onBaseLayerChanged = (e: any) => {
        const value = e.currentTarget?.value;
        setSelected(value);
        props.onBaseLayerChanged?.(value);
    };
    return <div>
        <div className="base-layer-switcher-item-container">
            <label className="bp3-control bp3-radio">
                <input className="base-layer-switcher-option" type="radio" value={STR_EMPTY} checked={strIsNullOrEmpty(selected)} onChange={onBaseLayerChanged} />
                <span className="bp3-control-indicator" /> {tr("NONE", locale)}
            </label>
        </div>
        {externalBaseLayers.map(layer => {
            return <div className="base-layer-switcher-item-container" key={`base-layer-${layer.name}`}>
                <label className="bp3-control bp3-radio">
                    <input className="base-layer-switcher-option" type="radio" value={layer.name} checked={layer.name === selected} onChange={onBaseLayerChanged} />
                    <span className="bp3-control-indicator" />
                    {layer.name}
                </label>
            </div>;
        })}
    </div>;
}