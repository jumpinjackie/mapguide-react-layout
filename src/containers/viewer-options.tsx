import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState,
    LayerTransparencySet,
    IExternalBaseLayer
} from "../api/common";
import * as MapActions from "../actions/map";
import { tr } from "../api/i18n";
import { Slider } from "@blueprintjs/core";
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY } from "../constants/index";

export interface IViewerOptionsProps {

}

export interface IViewerOptionsState {
    viewer: IViewerReducerState;
    config: IConfigurationReducerState;
    layerTransparency: LayerTransparencySet;
    externalBaseLayers: IExternalBaseLayer[];
    mapName: string;
}

export interface IViewerOptionsDispatch {
    toggleMapTips: (enabled: boolean) => void;
    setLayerTransparency: (mapName: string, id: string, opacity: number) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IViewerOptionsProps): Partial<IViewerOptionsState> {
    let layerTransparency;
    let mapName = state.config.activeMapName;
    let externalBaseLayers;
    if (mapName) {
        const branch = state.mapState[mapName];
        layerTransparency = branch.layerTransparency;
        externalBaseLayers = state.mapState[mapName].externalBaseLayers;
    }
    return {
        viewer: state.viewer,
        config: state.config,
        mapName: mapName,
        layerTransparency: layerTransparency,
        externalBaseLayers: externalBaseLayers
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IViewerOptionsDispatch> {
    return {
        toggleMapTips: (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled)),
        setLayerTransparency: (mapName, id, opacity) => dispatch(MapActions.setLayerTransparency(mapName, id, opacity))
    };
}

export type ViewerOptionsProps = IViewerOptionsProps & Partial<IViewerOptionsState> & Partial<IViewerOptionsDispatch>;

export class ViewerOptions extends React.Component<ViewerOptionsProps, any> {
    private fnFeatureTooltipsChanged: GenericEventHandler;
    private fnBaseOpacityChanged: (value: number) => void;
    private fnMgOpacityChanged: (value: number) => void;
    private fnMgSelOpacityChanged: (value: number) => void;
    constructor(props: ViewerOptionsProps) {
        super(props);
        this.fnFeatureTooltipsChanged = this.onFeatureTooltipsChanged.bind(this);
        this.fnBaseOpacityChanged = this.onBaseOpacityChanged.bind(this);
        this.fnMgOpacityChanged = this.onMgOpacityChanged.bind(this);
        this.fnMgSelOpacityChanged = this.onMgSelOpacityChanged.bind(this);
    }
    private onBaseOpacityChanged(value: number) {
        const { setLayerTransparency, mapName } = this.props;
        if (mapName && setLayerTransparency) {
            setLayerTransparency(mapName, LAYER_ID_BASE, value);
        }
    }
    private onMgOpacityChanged(value: number) {
        const { setLayerTransparency, mapName } = this.props;
        if (mapName && setLayerTransparency) {
            setLayerTransparency(mapName, LAYER_ID_MG_BASE, value);
        }
    }
    private onMgSelOpacityChanged(value: number) {
        const { setLayerTransparency, mapName } = this.props;
        if (mapName && setLayerTransparency) {
            setLayerTransparency(mapName, LAYER_ID_MG_SEL_OVERLAY, value);
        }
    }
    private onFeatureTooltipsChanged(e: GenericEvent) {
        const { toggleMapTips } = this.props;
        if (toggleMapTips) {
            toggleMapTips(e.target.checked);
        }
    }
    render(): JSX.Element {
        const { viewer, config, layerTransparency, externalBaseLayers } = this.props;
        const locale = config ? config.locale : "en";
        let opBase = 1.0;
        let opMgBase = 1.0;
        let opMgSelOverlay = 1.0;
        if (layerTransparency) {
            if (LAYER_ID_BASE in layerTransparency) {
                opBase = layerTransparency[LAYER_ID_BASE];
            }
            if (LAYER_ID_MG_BASE in layerTransparency) {
                opMgBase = layerTransparency[LAYER_ID_MG_BASE];
            }
            if (LAYER_ID_MG_SEL_OVERLAY in layerTransparency) {
                opMgSelOverlay = layerTransparency[LAYER_ID_MG_SEL_OVERLAY];
            }
        }
        return <div className="component-viewer-options">
            <h5>{tr("VIEWER_OPTIONS", locale)}</h5>
            <hr />
            {(() => {
                if (viewer) {
                    return <label className="pt-control pt-switch">
                        <input type="checkbox" checked={viewer.featureTooltipsEnabled} onChange={this.fnFeatureTooltipsChanged} />
                        <span className="pt-control-indicator"></span>
                        {tr("FEATURE_TOOLTIPS", locale)}
                    </label>;
                }
            })()}
            <fieldset>
                <legend>{tr("LAYER_TRANSPARENCY", locale)}</legend>
                {(() => {
                    if (externalBaseLayers) {
                        return <label className="pt-label noselect">
                            {tr("LAYER_ID_BASE", locale)}
                            <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                                <Slider min={0} max={1.0} stepSize={0.01} value={opBase} onChange={this.fnBaseOpacityChanged} />
                            </div>
                        </label>;
                    }
                })()}
                <label className="pt-label noselect">
                    {tr("LAYER_ID_MG_BASE", locale)}
                    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                        <Slider min={0} max={1.0} stepSize={0.01} value={opMgBase} onChange={this.fnMgOpacityChanged} />
                    </div>
                </label>
                <label className="pt-label noselect">
                    {tr("LAYER_ID_MG_SEL_OVERLAY", locale)}
                    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                        <Slider min={0} max={1.0} stepSize={0.01} value={opMgSelOverlay} onChange={this.fnMgSelOpacityChanged} />
                    </div>
                </label>
            </fieldset>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerOptions);