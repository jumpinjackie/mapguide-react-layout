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
import olWmsParser from "ol/format/wmscapabilities";
import olTileLayer from "ol/layer/tile";
import olImageLayer from "ol/layer/image";
import olWmsSource from "ol/source/imagewms";
import olTiledWmsSource from "ol/source/tilewms";
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
export class AddWmsLayer extends React.Component<IAddWmsLayerProps, any> {
    constructor(props: IAddWmsLayerProps) {
        super(props);
        this.state = {
            wmsUrl: "",
            loadingCapabilities: false,
            caps: null,
            error: null
        };
    }
    private onAddLayer = (name: string, style: WMSLayerStyle | undefined) => {
        const bTiled = true;
        const { locale } = this.props;
        const caps: WmsCapabilitiesDocument = this.state.caps;
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
            viewer.toastSuccess("icon-success", tr("ADDED_LAYER", locale, { name: name }));
        }
    }
    private onLoadCaps = () => {
        const { wmsUrl } = this.state;
        this.setState({
            caps: null,
            loadingCapabilities: true
        });
        const client = new Client("", "mapagent");
        client.getText(wmsUrl).then(s => {
            const parser = new olWmsParser();
            const caps = parser.read(s);
            if (caps.version != "1.3.0") {
                this.setState({
                    loadingCapabilities: false,
                    caps: null,
                    error: `Unsupported WMS version: ${caps.version}`
                });
            }
            else {
                this.setState({
                    loadingCapabilities: false,
                    caps: caps,
                    error: null
                });
            }
        }).catch(err => {
            this.setState({
                loadingCapabilities: false,
                caps: null,
                error: err
            });
        });
    }
    private onWmsUrlChange = (e: GenericEvent) => {
        this.setState({ wmsUrl: e.target.value });
    }
    render(): JSX.Element {
        const { locale } = this.props;
        const { wmsUrl, loadingCapabilities, caps, error } = this.state;
        return <div>
            <ControlGroup fill>
                <InputGroup leftIcon="geosearch"
                    placeholder={tr("ADD_WMS_LAYER_URL", locale)}
                    value={wmsUrl}
                    onChange={this.onWmsUrlChange}
                    readOnly={loadingCapabilities}
                    rightElement={<Button intent={Intent.PRIMARY} icon="arrow-right" onClick={this.onLoadCaps} disabled={loadingCapabilities} />} />
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
                            return <WmsCapabilitiesTree onAddLayer={this.onAddLayer} capabilities={caps} locale={locale} />;
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
}