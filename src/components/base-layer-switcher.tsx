import * as React from "react";
import { IExternalBaseLayer } from "./map-viewer";

interface IBaseLayerSwitcherProps {
    externalBaseLayers: IExternalBaseLayer[];
    onBaseLayerChanged: (name: string) => void;
}

export class BaseLayerSwitcher extends React.Component<any, any> {
    private fnBaseLayerChanged: (e) => void;
    constructor(props) {
        super(props);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
        const selected = props.externalBaseLayers.filter(layer => layer.visible === true);
        this.state = {
            selected: (selected.length == 1 ? selected[0].name : null)
        };
    }
    onBaseLayerChanged(e) {
        const { onBaseLayerChanged } = this.props;
        const value = e.currentTarget.value;
        this.setState({ selected: value });
        onBaseLayerChanged(value);
    }
    render(): JSX.Element {
        return <div>
            {this.props.externalBaseLayers.map(layer => {
                return <div key={`base-layer-${layer.name}`}>
                    <label>
                        <input type="radio" value={layer.name} checked={layer.name === this.state.selected} onChange={this.fnBaseLayerChanged} /> {layer.name}
                    </label>
                </div>;
            })}
            <hr />
        </div>;
    }
}