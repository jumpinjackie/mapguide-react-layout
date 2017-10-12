import * as React from "react";
import { connect } from "react-redux";
import * as Runtime from "../api/runtime";
import { tr } from "../api/i18n";
import { Error } from "../components/error";
import {
    ReduxDispatch,
    IApplicationState,
    GenericEvent,
    GenericEventHandler,
    WmsCapabilitiesDocument,
    WMSLayerStyle
} from "../api/common";
import { Client } from "../api/client";
import { WmsCapabilitiesTree } from "../components/wms-capabilities-tree";
import olWmsParser from "ol/format/wmscapabilities";
import olTileLayer from "ol/layer/tile";
import olImageLayer from "ol/layer/image";
import olWmsSource from "ol/source/imagewms";
import olTiledWmsSource from "ol/source/tilewms";

export interface IAddWmsLayerContainerProps {

}

export interface IAddWmsLayerContainerState {
    locale: string;
}

export interface IAddWmsLayerContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IAddWmsLayerContainerState> {
    return {
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IAddWmsLayerContainerDispatch> {
    return {};
}

export type AddWmsLayerContainerProps = IAddWmsLayerContainerProps & Partial<IAddWmsLayerContainerState> & Partial<IAddWmsLayerContainerDispatch>;

export class AddWmsLayerContainer extends React.Component<AddWmsLayerContainerProps, any> {
    private fnWmsUrlChange: GenericEventHandler;
    private fnLoadCaps: GenericEventHandler;
    private fnAddLayer: (name: string, style: WMSLayerStyle | undefined) => void;
    constructor(props: AddWmsLayerContainerProps) {
        super(props);
        this.fnWmsUrlChange = this.onWmsUrlChange.bind(this);
        this.fnLoadCaps = this.onLoadCaps.bind(this);
        this.fnAddLayer = this.onAddLayer.bind(this);
        this.state = {
            wmsUrl: "",
            loadingCapabilities: false,
            caps: null,
            error: null
        };
    }
    private onAddLayer(name: string, style: WMSLayerStyle | undefined) {
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
            viewer.addLayer(name, layer);
            viewer.toastSuccess("pt-icon-success", tr("ADDED_LAYER", locale, { name: name }));
        }
    }
    private onLoadCaps(e: GenericEvent) {
        const { wmsUrl } = this.state;
        this.setState({
            caps: null,
            loadingCapabilities: true
        });
        const client = new Client("", "mapagent");
        client.getText(wmsUrl).then(s => {
            const parser = new olWmsParser();
            const caps = parser.read(s);
            this.setState({
                loadingCapabilities: false,
                caps: caps,
                error: null
            });
        }).catch(err => {
            this.setState({
                loadingCapabilities: false,
                caps: null,
                error: err
            });
        });
    }
    private onWmsUrlChange(e: GenericEvent) {
        this.setState({ wmsUrl: e.target.value });
    }
    render(): JSX.Element {
        const { locale } = this.props;
        const { wmsUrl, loadingCapabilities, caps, error } = this.state;
        return <div className="component-viewer-options">
            <h5>{tr("ADD_WMS_LAYER", locale)}</h5>
            <hr />
            <div className="pt-input-group">
                <span className="pt-icon pt-icon-geosearch"></span>
                <input type="text" className="pt-input" placeholder={tr("ADD_WMS_LAYER_URL", locale)} value={wmsUrl} onChange={this.fnWmsUrlChange} readOnly={loadingCapabilities} />
                <button className="pt-button pt-minimal pt-intent-primary pt-icon-arrow-right" onClick={this.fnLoadCaps} disabled={loadingCapabilities}></button>
            </div>
            <br />
            <div>
                {(() => {
                    if (loadingCapabilities) {
                        return <div className="pt-non-ideal-state">
                            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                <div className="pt-spinner pt-large">
                                    <div className="pt-spinner-svg-container">
                                        <svg viewBox="0 0 100 100">
                                            <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                            <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h4 className="pt-non-ideal-state-title">{tr("ADD_WMS_LAYER_LOADING", locale)}</h4>
                            <div className="pt-non-ideal-state-description">{tr("ADD_WMS_LAYER_LOADING_DESC", locale)}</div>
                        </div>;
                    } else {
                        if (caps) {
                            return <WmsCapabilitiesTree onAddLayer={this.fnAddLayer} capabilities={caps} locale={locale} />;
                        } else if (error) {
                            return <Error error={error} />;
                        } else {
                            return <div className="pt-non-ideal-state">
                                <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                    <span className="pt-icon pt-icon-issue"></span>
                                </div>
                                <h4 className="pt-non-ideal-state-title">{tr("ADD_WMS_LAYER_NO_LAYERS", locale)}</h4>
                                <div className="pt-non-ideal-state-description">
                                    Enter a WMS Service URL and click the <span className="pt-icon pt-icon-arrow-right" /> button to load available layers
                                </div>
                            </div>;
                        }
                    }
                })()}
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWmsLayerContainer);
