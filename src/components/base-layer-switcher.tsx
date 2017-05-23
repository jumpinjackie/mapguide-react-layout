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

/**
 * The BaseLayerSwitcher component provides a user interface for switching the active external
 * base layer of the current map
 *
 * @export
 * @class BaseLayerSwitcher
 * @extends {React.Component<IBaseLayerSwitcherProps, any>}
 */
export class BaseLayerSwitcher extends React.Component<IBaseLayerSwitcherProps, any> {
    private fnBaseLayerChanged: (e: any) => void;
    constructor(props: IBaseLayerSwitcherProps) {
        super(props);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
        const selected = props.externalBaseLayers.filter(layer => layer.visible === true);
        this.state = {
            selected: (selected.length == 1 ? selected[0].name : null)
        };
    }
    private onBaseLayerChanged(e: any): void {
        const { onBaseLayerChanged } = this.props;
        const value = e.currentTarget.value;
        this.setState({ selected: value });
        if (onBaseLayerChanged) {
            onBaseLayerChanged(value);
        }
    }
    render(): JSX.Element {
        const { locale } = this.props;
        return <div>
            <div className="base-layer-switcher-item-container">
                <label className="pt-control pt-radio">
                    <input className="base-layer-switcher-option" type="radio" value={STR_EMPTY} checked={strIsNullOrEmpty(this.state.selected)} onChange={this.fnBaseLayerChanged} />
                    <span className="pt-control-indicator" /> {tr("NONE", locale)}
                </label>
            </div>
            {this.props.externalBaseLayers.map(layer => {
                return <div className="base-layer-switcher-item-container" key={`base-layer-${layer.name}`}>
                    <label className="pt-control pt-radio">
                        <input className="base-layer-switcher-option" type="radio" value={layer.name} checked={layer.name === this.state.selected} onChange={this.fnBaseLayerChanged} />
                        <span className="pt-control-indicator" />
                        {layer.name}
                    </label>
                </div>;
            })}
        </div>;
    }
}