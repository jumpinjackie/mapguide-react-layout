import * as React from "react";
import { IMapMenuEntry } from "../api/common";
import { useElementContext } from "./elements/element-context";

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
    const { Radio } = useElementContext();
    const [selected, setSelected] = React.useState(undefined);
    const onActiveMapChanged = (e: any) => {
        const value = e.currentTarget.value;
        setSelected(value);
        props.onActiveMapChanged?.(value);
    };
    return <div>
        {props.maps.map(layer => {
            return <div className="map-menu-item-container" key={`base-layer-${layer.mapName}`}>
                <Radio value={layer.mapName} checked={layer.mapName === props.selectedMap} onChange={onActiveMapChanged} label={layer.label} />
            </div>;
        })}
    </div>;
}