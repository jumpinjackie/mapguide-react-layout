import * as React from "react";
import { tr } from "../api/i18n";
import { WmsCapabilitiesDocument, WMSPublishedLayer, WMSLayerStyle } from "../api/common";
import * as shortid from "shortid";
import { Tooltip, ITreeNode, Tree, Card, Button, Intent, ButtonGroup, Icon } from '@blueprintjs/core';

type WMSLayerStylePair = [WMSPublishedLayer, WMSLayerStyle[]];

function extractWmsLayers(caps: WmsCapabilitiesDocument): WMSLayerStylePair[] {
    const layers = [] as WMSLayerStylePair[];
    const { Layer, ...rootLayer } = caps.Capability.Layer;
    if (rootLayer.Name) { //Must have name to be considered
        layers.push([rootLayer, rootLayer.Style ?? []]);
    }
    if (caps.Capability.Layer.Layer) {
        for (const layer of caps.Capability.Layer.Layer) {
            layers.push([layer, layer.Style ?? []]);
        }
    }
    return layers;
}

function convertWmsLayerNodes(layers: WMSLayerStylePair[], locale: string | undefined): ITreeNode[] {
    return layers.map(pair => {
        const [l, styles] = pair;
        const tt = <div className="wms-layer-info-tooltip">
            <p>{tr("WMS_LAYER_NAME", locale, { name: l.Name })}</p>
            <p>{tr("WMS_LAYER_TITLE", locale, { title: l.Title })}</p>
            <p>{tr("WMS_LAYER_ABSTRACT", locale, { abstract: l.Abstract })}</p>
            <p>{tr("WMS_ADD_LAYER_PROMPT", locale)}</p>
        </div>;
        return {
            id: l.Name,
            icon: "layer",
            label: <Tooltip content={tt}>{l.Name}</Tooltip>
        } as ITreeNode;
    });
}

export interface IWmsCapabilitiesPanelProps {
    capabilities: WmsCapabilitiesDocument;
    locale: string;
    onAddLayer: (name: string, style: WMSLayerStyle | undefined, getLegendUrl?: string) => void;
}

export const WmsCapabilitiesPanel = (props: IWmsCapabilitiesPanelProps) => {
    const { locale, onAddLayer } = props;
    const { capabilities: caps } = props;
    const layers = extractWmsLayers(caps);
    return <>
        <Card>
            <h5 className="bp3-heading"><a href="#">{tr("WMS_SERVICE_INFO", locale)}</a></h5>
            <p>{tr("WMS_VERSION", locale, { version: caps.version })}</p>
            <p>{tr("WMS_SERVICE_NAME", locale, { name: caps.Service.Name })}</p>
            <p>{tr("WMS_SERVICE_TITLE", locale, { title: caps.Service.Title })}</p>
            <p>{tr("WMS_SERVICE_ABSTRACT", locale, { abstract: caps.Service.Abstract })}</p>
        </Card>
        <Card style={{ marginBottom: 10 }}>
            <h5 className="bp3-heading"><a href="#">{tr("WMS_AVAILABLE_LAYERS", locale)}</a></h5>
            {layers.map(([layer, styles]) => {
                const otherActions = <></>;
                return <Card key={layer.Name} style={{ padding: 15, paddingTop: 5 }}>
                    <h4><Icon icon="layer" /> {layer.Name}</h4>
                    <p>{tr("WMS_SERVICE_TITLE", locale, { title: layer.Title })}</p>
                    <p>{tr("WMS_SERVICE_ABSTRACT", locale, { abstract: layer.Abstract })}</p>
                    {(() => {
                        if (styles.length) {
                            return styles.map(st => <ButtonGroup fill>
                                <Button onClick={() => onAddLayer(layer.Name, st, st.LegendURL?.[0]?.OnlineResource)} intent={Intent.PRIMARY} icon="new-layer">{tr("ADD_LAYER_WITH_WMS_STYLE", locale, { style: st.Name })}</Button>
                                {otherActions}
                            </ButtonGroup>);
                        } else {
                            return <ButtonGroup fill>
                                <Button onClick={() => onAddLayer(layer.Name, undefined)} intent={Intent.PRIMARY} icon="new-layer">{tr("ADD_LAYER", locale)}</Button>
                                {otherActions}
                            </ButtonGroup>;
                        }
                    })()}
                </Card>
            })}
        </Card>
    </>
}