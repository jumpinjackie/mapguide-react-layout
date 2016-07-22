import * as React from "react";
import { SelectedFeatureSet, SelectedFeature, LayerMetadata } from "../api/contracts/query";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_HEIGHT } from "./toolbar";

export interface ISelectionPanelProps {
    selection: SelectedFeatureSet;
    onRequestZoomToFeature: (feat: SelectedFeature) => void;
}

export class SelectionPanel extends React.Component<ISelectionPanelProps, any> {
    fnSelectedLayerChanged: (e) => void;
    constructor(props) {
        super(props);
        this.fnSelectedLayerChanged = this.onSelectedLayerChanged.bind(this);
        this.state = {
            selectedLayerIndex: -1,
            featureIndex: -1
        };
    }
    setDefaultSelection(props: ISelectionPanelProps) {
        const { selection } = props;
        if (selection != null) {
            if ((selection.SelectedLayer || []).length > 0) {
                this.setState({ selectedLayerIndex: 0, featureIndex: 0 });
            }
        }
    }
    componentDidMount() {
        this.setDefaultSelection(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setDefaultSelection(nextProps);
    }
    onSelectedLayerChanged(e) {
        this.setState({ selectedLayerIndex: e.target.value, featureIndex: 0 });
    }
    render(): JSX.Element {
        const { selection } = this.props;
        let feat: SelectedFeature = null;
        let meta: LayerMetadata = null;
        if (selection != null && this.state.selectedLayerIndex >= 0 && this.state.featureIndex >= 0) {
            const selLayer = selection.SelectedLayer[this.state.selectedLayerIndex];
            feat = selLayer.Feature[this.state.featureIndex];
            meta = selLayer.LayerMetadata;
        }
        return <div style={{ width: "100%", height: "100%", fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            {(() => {
                if (selection != null && selection.SelectedLayer != null && selection.SelectedLayer.length > 0) {
                    return <select value={this.state.selectedLayerIndex} style={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_HEIGHT }}>
                        {selection.SelectedLayer.map((layer: any, index) => {
                            return <option key={`selected-layer-${layer["@id"]}`} value={index}>{layer["@name"]}</option>
                        })}
                    </select>;
                }
            })()}
            <Toolbar childItems={[]} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
            <div style={{ position: "absolute", top: DEFAULT_TOOLBAR_HEIGHT, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                {(() => {
                    if (feat != null && meta != null) {
                        return <table>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Property</th>
                                    <th style={{ textAlign: "left" }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                            {feat.Property.map(prop => {
                                return <tr key={prop.Name}>
                                    <td>{prop.Name}</td>
                                    <td>{prop.Value}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>;
                    } else if (selection == null || (selection.SelectedLayer || []).length == 0) {
                        return <p>No features selected</p>;
                    }
                })()}
            </div>
        </div>;
    }
}