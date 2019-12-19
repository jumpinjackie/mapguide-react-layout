import * as React from "react";
import {
    GenericEvent,
    WmsCapabilitiesDocument,
    WMSLayerStyle
} from "../../api/common";
import { tr } from "../../api/i18n";
import { Error } from "../error";
import * as Runtime from "../../api/runtime";
import { Client } from "../../api/client";
import { WmsCapabilitiesTree } from "../wms-capabilities-tree";
import olWmsParser from "ol/format/WMSCapabilities";
import olTileLayer from "ol/layer/Tile";
import olImageLayer from "ol/layer/Image";
import olWmsSource from "ol/source/ImageWMS";
import olTiledWmsSource from "ol/source/TileWMS";
import { Spinner, NonIdealState, Intent, ControlGroup, InputGroup, Button } from '@blueprintjs/core';

/**
 * @hidden
 */
export interface IAddWmsLayerProps {
    locale: string | undefined;
}

/**
 * @hidden
 */
const AddWmsLayer = (props: IAddWmsLayerProps) => {
    const { locale } = props;
    const [wmsUrl, setWmsUrl] = React.useState("");
    const [loadingCapabilities, setLoadingCapabilities] = React.useState(false);
    const [caps, setCaps] = React.useState<WmsCapabilitiesDocument | undefined>(undefined);
    const [error, setError] = React.useState<Error | string | undefined>(undefined);
    const onAddLayer = (name: string, style: WMSLayerStyle | undefined) => {
        const bTiled = true;
        const viewer = Runtime.getViewer();
        if (caps && viewer) {
            const params: any = {
                LAYERS: name
            };
            if (style) {
                params.STYLE = style;
            }
            if (bTiled) {
                params.TILED = true;
            }
            let layer;
            if (bTiled) {
                layer = new olTileLayer({
                    source: new olTiledWmsSource({
                        url: caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource,
                        params: params
                    })
                });
            } else {
                layer = new olImageLayer({
                    source: new olWmsSource({
                        url: caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource,
                        params: params
                    })
                });
            }
            layer.set("LAYER_TYPE", "WMS");
            viewer.getLayerManager().addLayer(name, layer);
            viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name: name }));
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
                        return <WmsCapabilitiesTree onAddLayer={onAddLayer} capabilities={caps} locale={locale} />;
                    } else if (error) {
                        return <Error error={error} />;
                    } else {
                        return <NonIdealState
                            icon="issue"
                            title={tr("ADD_WMS_LAYER_NO_LAYERS", locale)}
                            description={tr("WMS_NO_LAYER_DESCRIPITON", locale)} />;
                    }
                }
            })()}
        </div>
    </div>;
}