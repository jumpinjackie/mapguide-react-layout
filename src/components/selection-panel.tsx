import * as React from "react";
import { SelectedFeatureSet, SelectedFeature, LayerMetadata, SelectedLayer } from "../api/contracts/query";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import { tr as xlate } from "../api/i18n";

export interface ISelectionPanelProps {
    locale?: string;
    selection: SelectedFeatureSet;
    onRequestZoomToFeature: (feat: SelectedFeature) => void;
}

function buildToolbarItems(selPanel: SelectionPanel): IItem[] {
    return [
        {
            icon: "control-180.png",
            tooltip: xlate("SELECTION_PREV_FEATURE", selPanel.props.locale),
            enabled: () => selPanel.canGoPrev(),
            invoke: () => selPanel.prevFeature()
        },
        {
            icon: "control.png",
            tooltip: xlate("SELECTION_NEXT_FEATURE", selPanel.props.locale),
            enabled: () => selPanel.canGoNext(),
            invoke: () => selPanel.nextFeature()
        },
        { isSeparator: true },
        {
            icon: "icon_zoomselect.gif",
            tooltip: xlate("SELECTION_ZOOMTO_FEATURE", selPanel.props.locale),
            enabled: () => selPanel.canZoomSelectedFeature(),
            invoke: () => selPanel.zoomSelectedFeature()
        }
    ];
}

export class SelectionPanel extends React.Component<ISelectionPanelProps, any> {
    selectionToolbarItems: IItem[];
    fnSelectedLayerChanged: GenericEventHandler;
    constructor(props: ISelectionPanelProps) {
        super(props);
        this.fnSelectedLayerChanged = this.onSelectedLayerChanged.bind(this);
        this.state = {
            selectedLayerIndex: -1,
            featureIndex: -1
        };
        this.selectionToolbarItems = buildToolbarItems(this);
    }
    private getCurrentLayer() {
        if (this.props.selection == null)
            return null;
        return this.props.selection.SelectedLayer[this.state.selectedLayerIndex];
    }
    private getCurrentFeature() {
        const layer = this.getCurrentLayer();
        if (layer != null) {
            return layer.Feature[this.state.featureIndex];
        }
        return null;
    }
    canGoPrev(): boolean {
        return this.state.featureIndex > 0;
    }
    canGoNext(): boolean {
        const layer = this.getCurrentLayer();
        if (layer != null) {
            return this.state.featureIndex + 1 < layer.Feature.length;
        }
        return false;
    }
    canZoomSelectedFeature(): boolean {
        const feat = this.getCurrentFeature();
        return feat != null && feat.Bounds != null;
    }
    prevFeature() {
        this.setState({ featureIndex: this.state.featureIndex - 1 });
    }
    nextFeature() {
        this.setState({ featureIndex: this.state.featureIndex + 1 });
    }
    zoomSelectedFeature() {
        const feat = this.getCurrentFeature();
        if (feat) {
            this.props.onRequestZoomToFeature(feat);
        }
    }
    private setDefaultSelection(props: ISelectionPanelProps) {
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
    componentWillReceiveProps(nextProps: ISelectionPanelProps) {
        if (this.props.selection != nextProps.selection) {
            this.setDefaultSelection(nextProps);
        }
    }
    onSelectedLayerChanged(e: GenericEvent) {
        this.setState({ selectedLayerIndex: e.target.value, featureIndex: 0 });
    }
    render(): JSX.Element {
        const { selection } = this.props;
        let feat: SelectedFeature | null | undefined;
        let meta: LayerMetadata | null | undefined = null;
        if (selection != null && this.state.selectedLayerIndex >= 0 && this.state.featureIndex >= 0) {
            const selLayer = selection.SelectedLayer[this.state.selectedLayerIndex];
            feat = selLayer.Feature[this.state.featureIndex];
            meta = selLayer.LayerMetadata;
        }
        return <div style={{ width: "100%", height: "100%" }}>
            {(() => {
                if (selection != null && selection.SelectedLayer != null && selection.SelectedLayer.length > 0) {
                    return <div className="selection-panel-toolbar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: DEFAULT_TOOLBAR_SIZE, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                        <select className="selection-panel-layer-selector" value={this.state.selectedLayerIndex} style={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_SIZE, maxWidth: 180 }} onChange={this.fnSelectedLayerChanged}>
                            {selection.SelectedLayer.map((layer: SelectedLayer, index: number) => {
                                return <option key={`selected-layer-${layer["@id"]}`} value={`${index}`}>{layer["@name"]}</option>
                            })}
                        </select>
                        <Toolbar childItems={this.selectionToolbarItems} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_SIZE }} />
                    </div>;
                }
            })()}
            <div style={{ position: "absolute", top: DEFAULT_TOOLBAR_SIZE, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                {(() => {
                    if (feat && meta) {
                        return <table className="selection-panel-property-grid">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left" }}>{xlate("SELECTION_PROPERTY", this.props.locale)}</th>
                                    <th style={{ textAlign: "left" }}>{xlate("SELECTION_VALUE", this.props.locale)}</th>
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
                        return <p className="selection-panel-no-selection">{xlate("NO_SELECTED_FEATURES", this.props.locale)}</p>;
                    }
                })()}
            </div>
        </div>;
    }
}