import * as React from "react";
import { tr } from "../../api/i18n";
import { WmsCapabilitiesDocument, WMSPublishedLayer, WMSLayerStyle } from "../../api/common";
import { ButtonGroup } from '@blueprintjs/core';
import { useElementContext } from "../elements/element-context";

type WMSLayerStylePair = [WMSPublishedLayer, WMSLayerStyle[]];

/**
 * Extracts WMS layers from the given parsed capabilities document
 * 
 * @hidden
 * @param caps 
 * @returns 
 */
export function extractWmsLayers(caps: WmsCapabilitiesDocument): WMSLayerStylePair[] {
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


export interface IWmsCapabilitiesPanelProps {
    capabilities: WmsCapabilitiesDocument;
    locale: string;
    onAddLayer: (name: string, queryable: boolean, isTiled: boolean, style: WMSLayerStyle | undefined, getLegendUrl?: string) => void;
}

export const WmsCapabilitiesPanel = (props: IWmsCapabilitiesPanelProps) => {
    const { Card, Button, Icon } = useElementContext();
    const { locale, onAddLayer } = props;
    const { capabilities: caps } = props;
    const layers = extractWmsLayers(caps);
    return <>
        <Card>
            <h5 className="bp3-heading"><a href="#">{tr("WMS_SERVICE_INFO", locale)}</a></h5>
            <p>{tr("WMS_VERSION", locale, { version: caps.version })}</p>
            <p>{tr("OWS_SERVICE_NAME", locale, { name: caps.Service.Name })}</p>
            <p>{tr("OWS_SERVICE_TITLE", locale, { title: caps.Service.Title })}</p>
            <p>{tr("OWS_SERVICE_ABSTRACT", locale, { abstract: caps.Service.Abstract })}</p>
        </Card>
        <Card style={{ marginBottom: 10 }}>
            <h5 className="bp3-heading"><a href="#">{tr("WMS_AVAILABLE_LAYERS", locale)}</a></h5>
            {layers.map(([layer, styles]) => {
                const otherActions = <></>;
                return <Card key={layer.Name} style={{ padding: 15, paddingTop: 5 }}>
                    <h4><Icon icon="layer" /> {layer.Name}</h4>
                    <p>{tr("OWS_LAYER_TITLE", locale, { title: layer.Title })}</p>
                    {/*<p>{tr("OWS_LAYER_ABSTRACT", locale, { abstract: layer.Abstract })}</p>*/}
                    {(() => {
                        if (styles.length) {
                            return styles.map(st => <ButtonGroup key={st.Name} vertical fill alignText="left">
                                <Button onClick={() => onAddLayer(layer.Name, layer.queryable, false, st, st.LegendURL?.[0]?.OnlineResource)} variant="primary" icon="new-layer">{tr("ADD_LAYER_WITH_WMS_STYLE", locale, { style: st.Name })}</Button>
                                <Button onClick={() => onAddLayer(layer.Name, layer.queryable, true, st, st.LegendURL?.[0]?.OnlineResource)} variant="primary" icon="new-layer">{tr("ADD_LAYER_WITH_WMS_STYLE_TILED", locale, { style: st.Name })}</Button>
                                {otherActions}
                            </ButtonGroup>);
                        } else {
                            return <ButtonGroup vertical fill alignText="left">
                                <Button onClick={() => onAddLayer(layer.Name, layer.queryable, false, undefined)} variant="primary" icon="new-layer">{tr("ADD_LAYER", locale)}</Button>
                                <Button onClick={() => onAddLayer(layer.Name, layer.queryable, true, undefined)} variant="primary" icon="new-layer">{tr("ADD_LAYER_TILED", locale)}</Button>
                                {otherActions}
                            </ButtonGroup>;
                        }
                    })()}
                </Card>
            })}
        </Card>
    </>
}