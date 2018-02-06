import * as React from "react";
import { IMapMenuEntry } from "../api/common";
import { STR_EMPTY, strIsNullOrEmpty } from "../utils/string";
import { tr } from "../api/i18n";

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
        const selected = props.maps.filter(entry => entry.mapName === props.selectedMap);
    }
    private onActiveMapChanged = (e: any) => {
        const { onActiveMapChanged } = this.props;
        const value = e.currentTarget.value;
        this.setState({ selected: value });
        if (onActiveMapChanged) {
            onActiveMapChanged(value);
        }
    }
    render(): JSX.Element {
        const { locale } = this.props;
        return <div>
            {this.props.maps.map(layer => {
                return <div className="map-menu-item-container" key={`base-layer-${layer.mapName}`}>
                    <label className="pt-control pt-radio">
                        <input className="map-menu-option" type="radio" value={layer.mapName} checked={layer.mapName === this.props.selectedMap} onChange={this.onActiveMapChanged} />
                        <span className="pt-control-indicator" />
                        {layer.label}
                    </label>
                </div>;
            })}
        </div>;
    }
}