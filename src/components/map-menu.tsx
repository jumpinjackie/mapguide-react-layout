import * as React from "react";
import { IMapMenuEntry } from "../api/common";

/**
 * MapMenu component props
 *
 * @export
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
 *
 * @export
 * @class MapMenu
 * @extends {React.Component<IMapMenuProps, any>}
 */
export class MapMenu extends React.Component<IMapMenuProps, any> {
    constructor(props: IMapMenuProps) {
        super(props);
    }
    private onActiveMapChanged = (e: any) => {
        const value = e.currentTarget.value;
        this.setState({ selected: value });
        this.props.onActiveMapChanged?.(value);
    }
    render(): JSX.Element {
        return <div>
            {this.props.maps.map(layer => {
                return <div className="map-menu-item-container" key={`base-layer-${layer.mapName}`}>
                    <label className="bp3-control bp3-radio">
                        <input className="map-menu-option" type="radio" value={layer.mapName} checked={layer.mapName === this.props.selectedMap} onChange={this.onActiveMapChanged} />
                        <span className="bp3-control-indicator" />
                        {layer.label}
                    </label>
                </div>;
            })}
        </div>;
    }
}