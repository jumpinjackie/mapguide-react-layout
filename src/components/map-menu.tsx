import * as React from "react";
import { IMapMenuEntry } from "../api/common";

/**
 * MapMenu component props
 *
 * @interface IMapMenuProps
 */
export interface IMapMenuProps {
    locale: string | undefined;
    selectedMap: string;
    maps: IMapMenuEntry[];
    onActiveMapChanged?: (name: string) => void;
}

/**
 * The MapMenu component provides the ability to switch between active maps
 * @param props 
 */
export const MapMenu = (props: IMapMenuProps) => {
    const [selected, setSelected] = React.useState(undefined);
    const onActiveMapChanged = (e: any) => {
        const value = e.currentTarget.value;
        setSelected(value);
        props.onActiveMapChanged?.(value);
    };
    return <div>
        {props.maps.map(layer => {
            return <div className="map-menu-item-container" key={`base-layer-${layer.mapName}`}>
                <label className="bp3-control bp3-radio">
                    <input className="map-menu-option" type="radio" value={layer.mapName} checked={layer.mapName === props.selectedMap} onChange={onActiveMapChanged} />
                    <span className="bp3-control-indicator" />
                    {layer.label}
                </label>
            </div>;
        })}
    </div>;
}