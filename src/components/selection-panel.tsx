import * as React from "react";
import { SelectedFeatureSet, SelectedFeature, LayerMetadata, SelectedLayer, FeatureProperty } from "../api/contracts/query";
import { Toolbar, IItem, IInlineMenu, DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import { tr as xlate, DEFAULT_LOCALE } from "../api/i18n";
import { NOOP, GenericEvent, GenericEventHandler } from "../api/common";
import {
    SPRITE_CONTROL,
    SPRITE_CONTROL_180,
    SPRITE_ICON_ZOOMSELECT
} from "../constants/assets";
import { safePropAccess } from '../utils/safe-prop';

export interface ISelectedFeatureProps {
    selectedFeature: SelectedFeature;
    selectedLayer: LayerMetadata;
    locale: string;
    allowHtmlValues: boolean;
    cleanHTML?: (html: string) => string;
}

const DefaultSelectedFeature = (props: ISelectedFeatureProps) => {
    const { selectedFeature, selectedLayer, locale, allowHtmlValues, cleanHTML } = props;
    const featureProps = [] as FeatureProperty[];
    for (const lp of selectedLayer.Property) {
        const matches = selectedFeature.Property.filter(fp => fp.Name === lp.DisplayName);
        if (matches.length === 1) {
            featureProps.push(matches[0]);
        }
    }
    return <table className="selection-panel-property-grid pt-table pt-condensed pt-bordered">
        <thead>
            <tr>
                <th>{xlate("SELECTION_PROPERTY", locale)}</th>
                <th>{xlate("SELECTION_VALUE", locale)}</th>
            </tr>
        </thead>
        <tbody>
        {featureProps.map(prop => {
            return <tr key={prop.Name}>
                <td>{prop.Name}</td>
                {(() => {
                    let value = prop.Value;
                    if (allowHtmlValues) {
                        if (cleanHTML) {
                            value = cleanHTML(value);
                        }
                        return <td dangerouslySetInnerHTML={{ __html: value }} />
                    } else {
                        return <td>{prop.Value}</td>;
                    }
                })()}
            </tr>;
        })}
        </tbody>
    </table>;
};

/**
 * SelectionPanel component props
 *
 * @export
 * @interface ISelectionPanelProps
 */
export interface ISelectionPanelProps {
    locale?: string;
    selection: SelectedFeatureSet;
    onRequestZoomToFeature: (feat: SelectedFeature) => void;
    onShowSelectedFeature: (layerId: string, featureIndex: number) => void;
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
    allowHtmlValues: boolean;
    cleanHTML?: (html: string) => string;
}

interface ISelectionPanel {
    locale: string;
    canGoPrev(): boolean;
    canGoNext(): boolean;
    prevFeature(): void;
    nextFeature(): void;
    canZoomSelectedFeature(): boolean;
    zoomSelectedFeature(): void;
}

function buildToolbarItems(selPanel: ISelectionPanel): IItem[] {
    return [
        {
            iconClass: SPRITE_CONTROL_180,
            tooltip: xlate("SELECTION_PREV_FEATURE", selPanel.locale),
            enabled: () => selPanel.canGoPrev(),
            invoke: () => selPanel.prevFeature()
        },
        {
            iconClass: SPRITE_CONTROL,
            tooltip: xlate("SELECTION_NEXT_FEATURE", selPanel.locale),
            enabled: () => selPanel.canGoNext(),
            invoke: () => selPanel.nextFeature()
        },
        { isSeparator: true },
        {
            iconClass: SPRITE_ICON_ZOOMSELECT,
            tooltip: xlate("SELECTION_ZOOMTO_FEATURE", selPanel.locale),
            enabled: () => selPanel.canZoomSelectedFeature(),
            invoke: () => selPanel.zoomSelectedFeature()
        }
    ];
}

const SELECTION_TOOLBAR_STYLE = { float: "right", height: DEFAULT_TOOLBAR_SIZE };
const SELECTION_PANEL_TOOLBAR_STYLE = { height: DEFAULT_TOOLBAR_SIZE, backgroundColor: TOOLBAR_BACKGROUND_COLOR };
const LAYER_COMBO_STYLE = { float: "left", height: DEFAULT_TOOLBAR_SIZE };
const FloatClear = (props: any) => <div style={{ clear: "both" }} />;

/**
 * Displays attributes of selected features with the ability to zoom in on selected features
 *
 * @export
 * @class SelectionPanel
 * @extends {React.Component<ISelectionPanelProps, any>}
 */
export class SelectionPanel extends React.Component<ISelectionPanelProps, any> {
    private selectionToolbarItems: IItem[];
    constructor(props: ISelectionPanelProps) {
        super(props);
        this.state = {
            selectedLayerIndex: -1,
            featureIndex: -1
        };
        this.selectionToolbarItems = buildToolbarItems({
            locale: props.locale || DEFAULT_LOCALE,
            canGoPrev: this.canGoPrev.bind(this),
            canGoNext: this.canGoNext.bind(this),
            prevFeature: this.prevFeature.bind(this),
            nextFeature: this.nextFeature.bind(this),
            canZoomSelectedFeature: this.canZoomSelectedFeature.bind(this),
            zoomSelectedFeature: this.zoomSelectedFeature.bind(this)
        });
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
    private canGoPrev(): boolean {
        return this.state.featureIndex > 0;
    }
    private canGoNext(): boolean {
        const layer = this.getCurrentLayer();
        if (layer != null) {
            return this.state.featureIndex + 1 < layer.Feature.length;
        }
        return false;
    }
    private canZoomSelectedFeature(): boolean {
        const feat = this.getCurrentFeature();
        return feat != null && feat.Bounds != null;
    }
    private prevFeature() {
        const newIndex = this.state.featureIndex - 1;
        this.setState({ featureIndex: newIndex });
        const layer = this.getCurrentLayer();
        if (layer) {
            const layerId = layer["@id"];
            safePropAccess(this.props, "onShowSelectedFeature", func => func(layerId, newIndex));
        }
    }
    private nextFeature() {
        const newIndex = this.state.featureIndex + 1;
        this.setState({ featureIndex: newIndex });
        const layer = this.getCurrentLayer();
        if (layer) {
            const layerId = layer["@id"];
            safePropAccess(this.props, "onShowSelectedFeature", func => func(layerId, newIndex));
        }
    }
    private zoomSelectedFeature() {
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
    private onSelectedLayerChanged = (e: GenericEvent) => {
        this.setState({ selectedLayerIndex: e.target.value, featureIndex: 0 });
    }
    render(): JSX.Element {
        const { selection, selectedFeatureRenderer, allowHtmlValues, cleanHTML } = this.props;
        let locale = this.props.locale || DEFAULT_LOCALE;
        let feat: SelectedFeature | undefined;
        let meta: LayerMetadata | undefined;
        if (selection != null && this.state.selectedLayerIndex >= 0 && this.state.featureIndex >= 0) {
            const selLayer = selection.SelectedLayer[this.state.selectedLayerIndex];
            feat = selLayer.Feature[this.state.featureIndex];
            meta = selLayer.LayerMetadata;
        }
        let selBodyStyle: React.CSSProperties | undefined;
        if (this.props.maxHeight) {
            selBodyStyle = {
                overflowY: "auto",
                maxHeight: this.props.maxHeight - DEFAULT_TOOLBAR_SIZE
            };
        } else {
            selBodyStyle = {
                overflow: "auto",
                position: "absolute",
                top: DEFAULT_TOOLBAR_SIZE,
                bottom: 0,
                right: 0,
                left: 0
            }
        }
        return <div>
            {(() => {
                if (selection != null && selection.SelectedLayer != null && selection.SelectedLayer.length > 0) {
                    return <div className="selection-panel-toolbar" style={SELECTION_PANEL_TOOLBAR_STYLE}>
                        <div className="pt-select selection-panel-layer-selector">
                            <select value={this.state.selectedLayerIndex} style={LAYER_COMBO_STYLE} onChange={this.onSelectedLayerChanged}>
                                {selection.SelectedLayer.map((layer: SelectedLayer, index: number) => {
                                    return <option key={`selected-layer-${layer["@id"]}`} value={`${index}`}>{layer["@name"]}</option>
                                })}
                            </select>
                        </div>
                        <Toolbar childItems={this.selectionToolbarItems} containerStyle={SELECTION_TOOLBAR_STYLE} />
                        <FloatClear />
                    </div>;
                }
            })()}
            <div className="selection-panel-body" style={selBodyStyle}>
                {(() => {
                    if (feat && meta) {
                        if (selectedFeatureRenderer) {
                            return selectedFeatureRenderer({ selectedFeature: feat, cleanHTML: cleanHTML, allowHtmlValues: allowHtmlValues, selectedLayer: meta, locale: locale });
                        } else {
                            return <DefaultSelectedFeature selectedFeature={feat} cleanHTML={cleanHTML} allowHtmlValues={allowHtmlValues} selectedLayer={meta} locale={locale} />;
                        }
                    } else if (selection == null || (selection.SelectedLayer || []).length == 0) {
                        return <div className="pt-callout pt-intent-primary pt-icon-info-sign">
                            <p className="selection-panel-no-selection">{xlate("NO_SELECTED_FEATURES", locale)}</p>
                        </div>;
                    }
                })()}
            </div>
        </div>;
    }
}