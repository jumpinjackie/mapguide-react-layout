import * as React from "react";
import { SelectedFeatureSet, SelectedFeature, LayerMetadata, SelectedLayer, FeatureProperty } from "../api/contracts/query";
import { Toolbar, IItem, DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import { tr as xlate, DEFAULT_LOCALE } from "../api/i18n";
import { GenericEvent, ICompositeSelection } from "../api/common";
import { Callout, Intent, HTMLSelect } from '@blueprintjs/core';

export interface ISelectedFeatureProps {
    selectedFeature: SelectedFeature;
    selectedLayer?: LayerMetadata;
    locale: string;
    allowHtmlValues: boolean;
    cleanHTML?: (html: string) => string;
}

const DefaultSelectedFeature = (props: ISelectedFeatureProps) => {
    const { selectedFeature, selectedLayer, locale, allowHtmlValues, cleanHTML } = props;
    const featureProps = [] as FeatureProperty[];
    if (selectedLayer?.Property) {
        for (const lp of selectedLayer.Property) {
            const matches = selectedFeature.Property.filter(fp => fp.Name === lp.DisplayName);
            if (matches.length === 1) {
                featureProps.push(matches[0]);
            }
        }
    } else {
        for (const fp of selectedFeature.Property) {
            featureProps.push(fp);
        }
    }
    return <table className="selection-panel-property-grid bp3-html-table bp3-html-table-condensed bp3-html-table-bordered">
        <thead>
            <tr>
                <th>{xlate("SELECTION_PROPERTY", locale)}</th>
                <th>{xlate("SELECTION_VALUE", locale)}</th>
            </tr>
        </thead>
        <tbody>
            {featureProps.map(prop => {
                return <tr key={prop.Name}>
                    <td className="property-name-cell" data-property-name={prop.Name}>{prop.Name}</td>
                    {(() => {
                        let value = prop.Value;
                        if (allowHtmlValues) {
                            if (cleanHTML) {
                                value = cleanHTML(value);
                            }
                            return <td className="property-value-cell" data-property-value-for={prop.Name} dangerouslySetInnerHTML={{ __html: value }} />
                        } else {
                            return <td className="property-value-cell" data-property-value-for={prop.Name}>{prop.Value}</td>;
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
    /**
     * @since 0.14
     */
    selection: ICompositeSelection;
    onResolveLayerLabel?: (layerId: string, layerName: string) => string | undefined;
    onRequestZoomToFeature: (feat: SelectedFeature) => void;
    onShowSelectedFeature: (layerId: string, selectionKey: string) => void;
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
    /**
     * Controls whether HTML values are allowed be rendered in property values
     * 
     * @since 0.11
     * @type {boolean}
     * @memberof ISelectionPanelProps
     */
    allowHtmlValues: boolean;
    /**
     * If allowHtmlValues = true, defines a custom function for sanitizing the given HTML string
     * to guard against cross-site scripting attacks. You are strongly recommended to provide
     * a santitization function if your HTML property values come from an un-trusted source
     * 
     * @since 0.11
     * @memberof ISelectionPanelProps
     */
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
            bpIconName: "arrow-left",
            tooltip: xlate("SELECTION_PREV_FEATURE", selPanel.locale),
            enabled: () => selPanel.canGoPrev(),
            invoke: () => selPanel.prevFeature()
        },
        {
            bpIconName: "arrow-right",
            tooltip: xlate("SELECTION_NEXT_FEATURE", selPanel.locale),
            enabled: () => selPanel.canGoNext(),
            invoke: () => selPanel.nextFeature()
        },
        { isSeparator: true },
        {
            bpIconName: "path-search",
            tooltip: xlate("SELECTION_ZOOMTO_FEATURE", selPanel.locale),
            enabled: () => selPanel.canZoomSelectedFeature(),
            invoke: () => selPanel.zoomSelectedFeature()
        }
    ];
}

const SELECTION_TOOLBAR_STYLE: React.CSSProperties = { float: "right", height: DEFAULT_TOOLBAR_SIZE };
const SELECTION_PANEL_TOOLBAR_STYLE: React.CSSProperties = { height: DEFAULT_TOOLBAR_SIZE, backgroundColor: TOOLBAR_BACKGROUND_COLOR };
const LAYER_COMBO_STYLE: React.CSSProperties = { float: "left", height: DEFAULT_TOOLBAR_SIZE };
const FloatClear = () => <div style={{ clear: "both" }} />;



/**
 * Displays attributes of selected features with the ability to zoom in on selected features
 * @param props 
 */
export const SelectionPanel = (props: ISelectionPanelProps) => {
    const {
        maxHeight,
        selection,
        selectedFeatureRenderer,
        allowHtmlValues,
        cleanHTML,
        onShowSelectedFeature,
        onRequestZoomToFeature
    } = props;
    const [selectedLayerIndex, setSelectedLayerIndex] = React.useState(-1);
    const [featureIndex, setFeatureIndex] = React.useState(-1);
    React.useEffect(() => {
        if (selection.getLayerCount() > 0) {
            setSelectedLayerIndex(0);
            setFeatureIndex(0);
        }
    }, [selection]);
    const getCurrentLayer = () => {
        return selection.getLayerAt(selectedLayerIndex);
    };
    const getFeatureAt = (index: number) => {
        return selection.getFeatureAt(selectedLayerIndex, index);
    };
    const getCurrentFeature = () => {
        return getFeatureAt(featureIndex);
    };
    const canGoPrev = (): boolean => {
        return featureIndex > 0;
    };
    const canGoNext = (): boolean => {
        const layer = getCurrentLayer();
        if (layer != null) {
            return featureIndex + 1 < layer.getFeatureCount();
        }
        return false;
    };
    const canZoomSelectedFeature = (): boolean => {
        const feat = getCurrentFeature();
        return feat != null && feat.Bounds != null;
    };
    const prevFeature = () => {
        const newIndex = featureIndex - 1;
        setFeatureIndex(newIndex);
        const layer = getCurrentLayer();
        if (layer) {
            const layerId = layer.getLayerId();
            const sKey = getFeatureAt(newIndex)?.SelectionKey;
            if (sKey && layerId) {
                onShowSelectedFeature?.(layerId, sKey);
            }
        }
    };
    const nextFeature = () => {
        const newIndex = featureIndex + 1;
        setFeatureIndex(newIndex);
        const layer = getCurrentLayer();
        if (layer) {
            const layerId = layer.getLayerId();
            const sKey = getFeatureAt(newIndex)?.SelectionKey;
            if (sKey && layerId) {
                onShowSelectedFeature?.(layerId, sKey);
            }
        }
    };
    const zoomSelectedFeature = () => {
        const feat = getCurrentFeature();
        if (feat) {
            onRequestZoomToFeature(feat);
        }
    };
    const onSelectedLayerChanged = (e: GenericEvent) => {
        setSelectedLayerIndex(e.target.value);
        setFeatureIndex(0);
    };
    const locale = props.locale || DEFAULT_LOCALE;
    let feat: SelectedFeature | undefined;
    let meta: LayerMetadata | undefined;
    if (selection != null && selectedLayerIndex >= 0 && featureIndex >= 0) {
        const selLayer = selection.getLayerAt(selectedLayerIndex);
        feat = selLayer.getFeatureAt(featureIndex);
        meta = selLayer.getLayerMetadata();
    }
    let selBodyStyle: React.CSSProperties | undefined;
    if (maxHeight) {
        selBodyStyle = {
            overflowY: "auto",
            maxHeight: maxHeight - DEFAULT_TOOLBAR_SIZE
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
            if (selection?.getLayerCount() > 0) {
                const selectionToolbarItems = buildToolbarItems({
                    locale,
                    canGoPrev,
                    canGoNext,
                    prevFeature,
                    nextFeature,
                    canZoomSelectedFeature,
                    zoomSelectedFeature
                });
                return <div className="selection-panel-toolbar" style={SELECTION_PANEL_TOOLBAR_STYLE}>
                    <div className="bp3-select selection-panel-layer-selector">
                        <HTMLSelect value={selectedLayerIndex} style={LAYER_COMBO_STYLE} onChange={onSelectedLayerChanged}>
                            {selection.getLayers().map((layer, index) => {
                                const lid = layer.getLayerId();
                                const lname = layer.getName();
                                const lkey = lid ?? index;
                                const label = lid ? (props?.onResolveLayerLabel?.(lid, lname) ?? lname)
                                    : lname;
                                return <option key={`selected-layer-${lkey}`} value={`${index}`}>{label}</option>
                            })}
                        </HTMLSelect>
                    </div>
                    <Toolbar childItems={selectionToolbarItems} containerStyle={SELECTION_TOOLBAR_STYLE} />
                    <FloatClear />
                </div>;
            }
        })()}
        <div className="selection-panel-body" style={selBodyStyle}>
            {(() => {
                if (feat) {
                    if (selectedFeatureRenderer) {
                        return selectedFeatureRenderer({ selectedFeature: feat, cleanHTML: cleanHTML, allowHtmlValues: allowHtmlValues, selectedLayer: meta, locale: locale });
                    } else {
                        return <DefaultSelectedFeature selectedFeature={feat} cleanHTML={cleanHTML} allowHtmlValues={allowHtmlValues} selectedLayer={meta} locale={locale} />;
                    }
                } else if (!(selection?.getLayerCount() > 0)) {
                    return <Callout intent={Intent.PRIMARY} icon="info-sign">
                        <p className="selection-panel-no-selection">{xlate("NO_SELECTED_FEATURES", locale)}</p>
                    </Callout>;
                }
            })()}
        </div>
    </div>;
}