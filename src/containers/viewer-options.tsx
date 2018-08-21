import * as React from "react";
import { connect } from "react-redux";
import {
    GenericEvent,
    ReduxDispatch,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState,
    LayerTransparencySet,
    IExternalBaseLayer,
    UnitOfMeasure
} from "../api/common";
import * as MapActions from "../actions/map";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { Slider } from "@blueprintjs/core";
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY } from "../constants/index";
import { getUnits } from "../utils/units";
import { safePropAccess } from '../utils/safe-prop';

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
    toggleManualMapTips: (enabled: boolean) => void;
    toggleMapTips: (enabled: boolean) => void;
    setLayerTransparency: (mapName: string, id: string, opacity: number) => void;
    setViewSizeDisplayUnits: (units: UnitOfMeasure) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IViewerOptionsState> {
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
        toggleManualMapTips: (enabled) => dispatch(MapActions.setManualFeatureTooltipsEnabled(enabled)),
        toggleMapTips: (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled)),
        setLayerTransparency: (mapName, id, opacity) => dispatch(MapActions.setLayerTransparency(mapName, id, opacity)),
        setViewSizeDisplayUnits: (units) => dispatch(MapActions.setViewSizeUnits(units))
    };
}

export type ViewerOptionsProps = IViewerOptionsProps & Partial<IViewerOptionsState> & Partial<IViewerOptionsDispatch>;

export class ViewerOptions extends React.Component<ViewerOptionsProps, any> {
    constructor(props: ViewerOptionsProps) {
        super(props);
    }
    private onBaseOpacityChanged = (value: number) => {
        safePropAccess(this.props, "mapName", mn => {
            safePropAccess(this.props, "setLayerTransparency", func => func!(mn!, LAYER_ID_BASE, value));
        });
    }
    private onMgOpacityChanged = (value: number) => {
        safePropAccess(this.props, "mapName", mn => {
            safePropAccess(this.props, "setLayerTransparency", func => func!(mn!, LAYER_ID_MG_BASE, value));
        });
    }
    private onMgSelOpacityChanged = (value: number) => {
        safePropAccess(this.props, "mapName", mn => {
            safePropAccess(this.props, "setLayerTransparency", func => func!(mn!, LAYER_ID_MG_SEL_OVERLAY, value));
        });
    }
    private onViewSizeUnitsChanged = (e: GenericEvent) => {
        safePropAccess(this.props, "setViewSizeDisplayUnits", func => func!(e.target.value));
    }
    private onFeatureTooltipsChanged = (e: GenericEvent) => {
        safePropAccess(this.props, "toggleMapTips", func => func!(e.target.checked));
    }
    private onManualFeatureTooltipsChanged = (e: GenericEvent) => {
        safePropAccess(this.props, "toggleManualMapTips", func => func!(e.target.checked));
    }
    render(): JSX.Element {
        const { viewer, config, layerTransparency, externalBaseLayers } = this.props;
        const locale = config ? config.locale : DEFAULT_LOCALE;
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
                        <input type="checkbox" checked={viewer.featureTooltipsEnabled} onChange={this.onFeatureTooltipsChanged} />
                        <span className="pt-control-indicator"></span>
                        {tr("FEATURE_TOOLTIPS", locale)}
                    </label>;
                }
            })()}
            {(() => {
                if (config && viewer && viewer.featureTooltipsEnabled) {
                    return <label className="pt-control pt-switch">
                        <input type="checkbox" checked={config.manualFeatureTooltips} onChange={this.onManualFeatureTooltipsChanged} />
                        <span className="pt-control-indicator"></span>
                        {tr("MANUAL_FEATURE_TOOLTIPS", locale)}
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
                                <Slider min={0} max={1.0} stepSize={0.01} value={opBase} onChange={this.onBaseOpacityChanged} />
                            </div>
                        </label>;
                    }
                })()}
                <label className="pt-label noselect">
                    {tr("LAYER_ID_MG_BASE", locale)}
                    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                        <Slider min={0} max={1.0} stepSize={0.01} value={opMgBase} onChange={this.onMgOpacityChanged} />
                    </div>
                </label>
                <label className="pt-label noselect">
                    {tr("LAYER_ID_MG_SEL_OVERLAY", locale)}
                    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                        <Slider min={0} max={1.0} stepSize={0.01} value={opMgSelOverlay} onChange={this.onMgSelOpacityChanged} />
                    </div>
                </label>
            </fieldset>
            {(() => {
                if (config) {
                    const units = getUnits();
                    return <label className="pt-label">
                        {tr("MAP_SIZE_DISPLAY_UNITS", locale)}
                        <div className="pt-select">
                            <select value={config.viewSizeUnits} onChange={this.onViewSizeUnitsChanged}>
                                {units.map(u => <option key={u[0]} value={u[0]}>{u[1]}</option>)}
                            </select>
                        </div>
                    </label>;
                }
            })()}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(ViewerOptions);