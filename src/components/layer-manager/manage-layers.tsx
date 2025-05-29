import * as React from "react";
import { tr } from "../../api/i18n";
import { ILayerInfo } from "../../api/common";
import { strIsNullOrEmpty } from "../../utils/string";
import { IVectorLayerStyle, VectorStyleSource } from '../../api/ol-style-contracts';
import { VectorLayerStyleEditor } from '../vector-style-editor';
import { BlueprintSvgIconNames } from '../../constants/assets';
import { ElementGroup, useElementContext } from "../elements/element-context";

function isBoundsZoomable(layer: ILayerInfo) {
    //TODO: See if WGS84_BBOX [is/can be] surfaced to ILayerInfo
    if (layer.metadata?.geojson_as_vt === true) {
        return false;
    }
    return layer.type != "WMS";
}

interface IManageLayerItemProps {
    layer: ILayerInfo;
    locale: string;
    currentResolution?: number;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onSetOpacity: (name: string, value: number) => void;
    onSetHeatmapBlur: (name: string, value: number) => void;
    onSetHeatmapRadius: (name: string, value: number) => void;
    onSetVisibility: (name: string, visible: boolean) => void;
    onZoomToBounds: (name: string) => void;
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
    onVectorStyleChanged: (name: string, style: IVectorLayerStyle, which: VectorStyleSource) => void;
}

enum OpenPanel {
    None,
    MoreLayerOptions,
    EditVectorStyle,
    WmsLegend
}

const HEATMAP_SLIDER_RAMP = [0, 10, 20, 30, 40, 50];

const LAYER_SWITCH_STYLE: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

const ManageLayerItem = (props: IManageLayerItemProps) => {
    const { Card, Button, Collapsible, Slider, Icon, Spinner, Switch, FormGroup } = useElementContext();
    const {
        layer,
        locale,
        canMoveUp,
        canMoveDown,
        currentResolution,
        onSetOpacity,
        onSetHeatmapBlur,
        onSetHeatmapRadius,
        onRemoveLayer,
        onMoveLayerUp,
        onMoveLayerDown,
        onZoomToBounds,
        onSetVisibility,
        onVectorStyleChanged
    } = props;
    const [wmsLegendUrl, setWmsLegendUrl] = React.useState<string | undefined>(undefined);
    const [openPanel, setOpenPanel] = React.useState(OpenPanel.None);
    const onToggleWmsLegend = (action: (res?: number) => string) => {
        if (wmsLegendUrl) {
            setWmsLegendUrl(undefined);
            setOpenPanel(OpenPanel.None);
        } else {
            const url = action(currentResolution);
            setWmsLegendUrl(url);
            setOpenPanel(OpenPanel.WmsLegend);
        }
    };
    const toggleOpenPanel = (panel: OpenPanel) => {
        let p = OpenPanel.None;
        switch (panel) {
            case OpenPanel.EditVectorStyle:
            case OpenPanel.MoreLayerOptions:
            case OpenPanel.WmsLegend:
                p = (panel == openPanel) ? OpenPanel.None : panel;
                break;
        }
        setOpenPanel(p);
    };
    const isBusy = (layer.busyWorkerCount > 0);
    if (isBusy) {
        return <Card>
            <Spinner sizePreset="small" />
            <p style={{ textAlign: "center", marginTop: 5 }}>{tr("LOADING_LAYER", locale, { name: layer.name })}</p>
        </Card>;
    }
    const canZoom = isBoundsZoomable(layer);
    let iconName: BlueprintSvgIconNames = "layer";
    if (layer.type == "WMS") {
        iconName = "media";
    }
    const extraActions = [] as JSX.Element[];
    const { extensions } = layer;
    let isWms = false;
    if (extensions) {
        switch (extensions.type) {
            case "WMS":
                {
                    isWms = true;
                    if (extensions.getLegendUrl) {
                        extraActions.push(<Button key="toggle-wms-legend" variant="success" icon="info-sign" onClick={() => onToggleWmsLegend(extensions.getLegendUrl as any)} />)
                    }
                }
        }
    }

    if (layer.vectorStyle) {
        if (layer.type != "KML" && layer.heatmap == null) {
            extraActions.push(<Button key="edit-vector-style" title={tr("LAYER_MANAGER_TT_EDIT_STYLE", locale)} variant="primary" icon="edit" onClick={() => toggleOpenPanel(OpenPanel.EditVectorStyle)} />)
        }
    }
    extraActions.push(<Button key="more-layer-options" title={tr("LAYER_MANAGER_TT_MORE_OPTIONS", locale)} variant="primary" icon="cog" onClick={() => toggleOpenPanel(OpenPanel.MoreLayerOptions)} />)
    const isWmsLegendOpen = !strIsNullOrEmpty(wmsLegendUrl);
    const layerLabel = layer.displayName ?? layer.name;
    const theVectorStyle = layer.cluster?.style ?? layer.vectorStyle;
    let which: VectorStyleSource;
    if (theVectorStyle == layer.vectorStyle) {
        which = VectorStyleSource.Base;
    } else if (theVectorStyle == layer.cluster?.style) {
        which = VectorStyleSource.Cluster;
    }
    let enableLine = false;
    let enablePoint = false;
    let enablePolygon = false;
    for (const k in theVectorStyle) {
        if (theVectorStyle[k].point) {
            enablePoint = true;
        }
        if (theVectorStyle[k].line) {
            enableLine = true;
        }
        if (theVectorStyle[k].polygon) {
            enablePolygon = true;
        }
    }
    return <Card key={layer.name}>
        <Switch style={LAYER_SWITCH_STYLE} checked={layer.visible} onChange={() => onSetVisibility(layer.name, !layer.visible)} labelElement={<span title={layerLabel}><Icon icon={iconName} /> {layerLabel}</span>} />
        <ElementGroup>
            <Button disabled={!canMoveUp} title={tr("LAYER_MANAGER_TT_MOVE_UP", locale)} variant="primary" icon="caret-up" onClick={() => onMoveLayerUp(layer.name)} />
            <Button disabled={!canMoveDown} title={tr("LAYER_MANAGER_TT_MOVE_DOWN", locale)} variant="primary" icon="caret-down" onClick={() => onMoveLayerDown(layer.name)} />
            <Button disabled={!canZoom} title={tr("LAYER_MANAGER_TT_ZOOM_EXTENTS", locale)} variant="success" icon="zoom-to-fit" onClick={() => onZoomToBounds(layer.name)} />
            <Button title={tr("LAYER_MANAGER_TT_REMOVE", locale)} variant="danger" icon="trash" onClick={() => onRemoveLayer(layer.name)} />
            {extraActions}
        </ElementGroup>
        <Collapsible isOpen={openPanel == OpenPanel.MoreLayerOptions}>
            <Card>
                <h5 className="bp3-heading"><a href="#">{tr("MORE_LAYER_OPTIONS", locale)}</a></h5>
                <FormGroup label={tr("LAYER_OPACITY", locale)}>
                    <Slider min={0} max={1.0} stepSize={0.01} value={layer.opacity} onChange={e => onSetOpacity(layer.name, e)} />
                </FormGroup>
                {layer.heatmap && <>
                    <FormGroup label={tr("LAYER_HEATMAP_BLUR", locale)}>
                        <Slider min={1} max={50} stepSize={1} labelValues={HEATMAP_SLIDER_RAMP} value={layer.heatmap.blur} onChange={e => onSetHeatmapBlur(layer.name, e)} />
                    </FormGroup>
                    <FormGroup label={tr("LAYER_HEATMAP_RADIUS", locale)}>
                        <Slider min={1} max={50} stepSize={1} labelValues={HEATMAP_SLIDER_RAMP} value={layer.heatmap.radius} onChange={e => onSetHeatmapRadius(layer.name, e)} />
                    </FormGroup>
                </>}
            </Card>
        </Collapsible>
        {isWms && <Collapsible isOpen={isWmsLegendOpen}>
            <Card>
                <h5 className="bp3-heading"><a href="#">{tr("WMS_LEGEND", locale)}</a></h5>
                <img src={wmsLegendUrl} />
            </Card>
        </Collapsible>}
        {theVectorStyle && <Collapsible isOpen={openPanel == OpenPanel.EditVectorStyle}>
            <div style={{ padding: 5 }}>
                <h5 className="bp3-heading"><a href="#">{tr("VECTOR_LAYER_STYLE", locale)}</a></h5>
                <VectorLayerStyleEditor onChange={st => onVectorStyleChanged(layer.name, st, which)}
                    locale={locale}
                    style={theVectorStyle}
                    enablePoint={enablePoint}
                    enableLine={enableLine}
                    enablePolygon={enablePolygon} />
            </div>
        </Collapsible>}
    </Card>;
}

/**
 * @hidden
 */
export interface IManageLayersProps {
    layers: ILayerInfo[];
    locale: string;
    currentResolution?: number;
    onSetOpacity: (name: string, value: number) => void;
    onSetHeatmapBlur: (name: string, value: number) => void;
    onSetHeatmapRadius: (name: string, value: number) => void;
    onSetVisibility: (name: string, visible: boolean) => void;
    onZoomToBounds: (name: string) => void;
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
    onVectorStyleChanged: (name: string, style: IVectorLayerStyle, which: VectorStyleSource) => void;
}

/**
 * @hidden
 */
export const ManageLayers = (props: IManageLayersProps) => {
    const { NonIdealState } = useElementContext();
    const {
        locale,
        currentResolution,
        onSetOpacity,
        onSetHeatmapBlur,
        onSetHeatmapRadius,
        onRemoveLayer,
        onMoveLayerUp,
        onMoveLayerDown,
        onZoomToBounds,
        onSetVisibility,
        onVectorStyleChanged
    } = props;
    const [layers, setLayers] = React.useState(props.layers);
    React.useEffect(() => {
        setLayers(props.layers);
    }, [props.layers]);
    if (layers.length) {
        return <div>
            {layers.map((lyr, i) => {
                const cannotMoveUp = (i == 0 || layers.length <= 1);
                const cannotMoveDown = (i >= layers.length - 1 || layers.length <= 1);
                return <ManageLayerItem
                    key={`manage-layer-${i}`}
                    layer={lyr}
                    locale={locale}
                    canMoveUp={!cannotMoveUp}
                    canMoveDown={!cannotMoveDown}
                    currentResolution={currentResolution}
                    onSetOpacity={onSetOpacity}
                    onSetHeatmapBlur={onSetHeatmapBlur}
                    onSetHeatmapRadius={onSetHeatmapRadius}
                    onRemoveLayer={onRemoveLayer}
                    onMoveLayerUp={onMoveLayerUp}
                    onMoveLayerDown={onMoveLayerDown}
                    onZoomToBounds={onZoomToBounds}
                    onSetVisibility={onSetVisibility}
                    onVectorStyleChanged={onVectorStyleChanged} />;
            })}
        </div>;
    } else {
        return <NonIdealState
            icon="layers"
            title={tr("NO_EXTERNAL_LAYERS", locale)}
            description={tr("NO_EXTERNAL_LAYERS_DESC", locale, { tabName: tr("ADD_LAYER", locale) })} />
    }
}