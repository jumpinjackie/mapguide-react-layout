import * as React from "react";
import {
    GenericEvent,
    WmsCapabilitiesDocument,
    WMSLayerStyle,
    LayerProperty,
    SourceProperty
} from "../../api/common";
import { tr } from "../../api/i18n";
import { Error } from "../error";
import * as Runtime from "../../api/runtime";
import { Client } from "../../api/client";
import { WmsCapabilitiesPanel } from "./wms-capabilities-panel";
import olWmsParser from "ol/format/WMSCapabilities";
import olTileLayer from "ol/layer/Tile";
import olImageLayer from "ol/layer/Image";
import olWmsSource from "ol/source/ImageWMS";
import olTiledWmsSource from "ol/source/TileWMS";
import { Spinner, NonIdealState, Intent, ControlGroup, InputGroup, Button } from '@blueprintjs/core';
import { strIsNullOrEmpty } from "../../utils/string";
import { IAddLayerContentProps } from './add-layer';
import { getLayerInfo } from '../../api/layer-manager';

/**
 * @hidden
 */
export const AddWmsLayer = (props: IAddLayerContentProps) => {
    const { locale } = props;
    const [wmsUrl, setWmsUrl] = React.useState("");
    const [loadingCapabilities, setLoadingCapabilities] = React.useState(false);
    const [caps, setCaps] = React.useState<WmsCapabilitiesDocument | undefined>(undefined);
    const [error, setError] = React.useState<Error | string | undefined>(undefined);
    const onAddLayer = (name: string, selectable: boolean, isTiled: boolean, style: WMSLayerStyle | undefined) => {
        const viewer = Runtime.getViewer();
        if (caps && viewer) {
            const params: any = {
                LAYERS: name
            };
            if (style) {
                params.STYLE = style.Name;
            }
            if (isTiled) {
                params.TILED = true;
            }
            let layer;
            let source: olTiledWmsSource | olWmsSource;
            if (isTiled) {
                source = new olTiledWmsSource({
                    url: caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource,
                    params: params
                });
                layer = new olTileLayer({
                    source: source
                });
            } else {
                source = new olWmsSource({
                    url: caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource,
                    params: params
                });
                layer = new olImageLayer({
                    source: source
                });
            }
            layer.set(LayerProperty.LAYER_TYPE, "WMS");
            layer.set(LayerProperty.IS_SELECTABLE, selectable);
            layer.set(LayerProperty.IS_EXTERNAL, true);
            layer.set(LayerProperty.IS_GROUP, false);
            if (style) {
                const legendUrl = style.LegendURL?.[0]?.OnlineResource;
                if (!strIsNullOrEmpty(legendUrl)) {
                    layer.set(LayerProperty.HAS_WMS_LEGEND, true);
                }
            }
            // Suppress automatic load event handling for this as we need our own
            source.set(SourceProperty.SUPPRESS_LOAD_EVENTS, true);
            const started = () => {
                viewer.addImageLoading();
                props.onAddLayerBusyWorker(name);
            };
            const finished = () => {
                viewer.addImageLoaded();
                props.onRemoveLayerBusyWorker(name);
            };
            if (source instanceof olTiledWmsSource) {  
                source.on("tileloadstart", started);
                source.on("tileloadend", finished);
                source.on("tileloaderror", finished);
            } else if (source instanceof olWmsSource) {
                source.on("imageloadstart", started);
                source.on("imageloadend", finished);
                source.on("imageloaderror", finished);
            }

            viewer.getLayerManager().addLayer(name, layer);
            viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name: name }));
            props.onLayerAdded(getLayerInfo(layer, true));
        }
    };
    const onLoadCaps = () => {
        setCaps(undefined);
        setLoadingCapabilities(true);
        const client = new Client("", "mapagent");
        client.getText(wmsUrl).then(s => {
            const parser = new olWmsParser();
            const caps: WmsCapabilitiesDocument = parser.read(s);
            if (caps.version != "1.3.0") {
                setLoadingCapabilities(false);
                setCaps(undefined);
                setError(tr("WMS_UNSUPPORTED_VERSION", locale, { version: caps.version }));
            } else {
                setLoadingCapabilities(false);
                setCaps(caps);
                setError(undefined);
            }
        }).catch(err => {
            setLoadingCapabilities(false);
            setCaps(undefined);
            setError(err);
        });
    };
    const onWmsUrlChange = (e: GenericEvent) => {
        setWmsUrl(e.target.value);
    };
    return <div>
        <ControlGroup fill>
            <InputGroup leftIcon="geosearch"
                placeholder={tr("ADD_WMS_LAYER_URL", locale)}
                value={wmsUrl}
                onChange={onWmsUrlChange}
                readOnly={loadingCapabilities}
                rightElement={<Button intent={Intent.PRIMARY} icon="arrow-right" onClick={onLoadCaps} disabled={loadingCapabilities} />} />
        </ControlGroup>
        <br />
        <div>
            {(() => {
                if (loadingCapabilities) {
                    return <NonIdealState
                        icon={<Spinner intent={Intent.NONE} size={Spinner.SIZE_LARGE} />}
                        title={tr("ADD_WMS_LAYER_LOADING", locale)}
                        description={tr("ADD_WMS_LAYER_LOADING_DESC", locale)} />;
                } else {
                    if (caps) {
                        return <WmsCapabilitiesPanel onAddLayer={onAddLayer} capabilities={caps} locale={locale} />;
                    } else if (error) {
                        return <Error error={error} />;
                    } else {
                        return <NonIdealState
                            icon="issue"
                            title={tr("ADD_WMS_LAYER_NO_LAYERS", locale)}
                            description={tr("WMS_NO_LAYER_DESCRIPTION", locale)} />;
                    }
                }
            })()}
        </div>
    </div>;
}