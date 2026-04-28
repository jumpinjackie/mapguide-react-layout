import * as React from "react";
import {
    GenericEvent,
    UnitOfMeasure,
    isVisualBaseLayer
} from "../api/common";
import { tr } from "../api/i18n";
import { getUnitOfMeasure, getUnitsOfMeasure } from "../utils/units";
import { useActiveMapName, useViewerFeatureTooltipsEnabled, useConfiguredManualFeatureTooltips, useViewerSizeUnits, useViewerLocale, useActiveMapExternalBaseLayers, useViewerIsStateless, useViewerSelectCanDragPan } from './hooks';
import { setManualFeatureTooltipsEnabled, setFeatureTooltipsEnabled, setLayerTransparency, setViewSizeUnits, enableSelectDragPan } from '../actions/map';
import { useActiveMapLayerTransparency, useActiveMapState } from './hooks-mapguide';
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_DYNAMIC_OVERLAY, LAYER_ID_MG_SEL_OVERLAY } from '../constants';
import { useReduxDispatch } from "../components/map-providers/context";
import { useElementContext } from "../components/elements/element-context";

export interface IViewerOptionsProps {

}

export const ViewerOptions = () => {
    const { Slider, Select, Heading, Switch, FormGroup } = useElementContext();
    const externalBaseLayers = useActiveMapExternalBaseLayers()?.filter(ebl => isVisualBaseLayer(ebl));
    const mapName = useActiveMapName();
    const layerTransparency = useActiveMapLayerTransparency();
    const featureTooltipsEnabled = useViewerFeatureTooltipsEnabled();
    const selectDragPanEnabled = useViewerSelectCanDragPan();
    const manualFeatureTooltips = useConfiguredManualFeatureTooltips();
    const viewSizeUnits = useViewerSizeUnits();
    const stateless = useViewerIsStateless();
    const map = useActiveMapState();
    const locale = useViewerLocale();
    const dispatch = useReduxDispatch();
    const toggleManualMapTipsAction = (enabled: boolean) => dispatch(setManualFeatureTooltipsEnabled(enabled));
    const toggleMapTipsAction = (enabled: boolean) => dispatch(setFeatureTooltipsEnabled(enabled));
    const toggleSelectDragPanAction = (enabled: boolean) => dispatch(enableSelectDragPan(enabled));
    const setLayerTransparencyAction = (mapName: string, id: string, opacity: number) => dispatch(setLayerTransparency(mapName, id, opacity));
    const setViewSizeDisplayUnitsAction = (units: UnitOfMeasure) => dispatch(setViewSizeUnits(units));
    const onMgLayerOpacityChanged = (mapName: string | undefined, layerId: string, value: number) => {
        if (mapName) {
            setLayerTransparencyAction?.(mapName, layerId, value);
        }
    };
    const onBaseOpacityChanged = (value: number) => {
        onMgLayerOpacityChanged(mapName, LAYER_ID_BASE, value);
    };
    const onMgDynamicOverlayOpacityChanged = (value: number) => {
        onMgLayerOpacityChanged(mapName, LAYER_ID_MG_DYNAMIC_OVERLAY, value);
    }
    const onMgOpacityChanged = (value: number) => {
        onMgLayerOpacityChanged(mapName, LAYER_ID_MG_BASE, value);
    };
    const onMgSelOpacityChanged = (value: number) => {
        onMgLayerOpacityChanged(mapName, LAYER_ID_MG_SEL_OVERLAY, value);
    };
    const onViewSizeUnitsChanged = (value: string | undefined) => {
        if (value !== undefined) {
            setViewSizeDisplayUnitsAction(parseInt(value) as UnitOfMeasure);
        }
    };
    const onFeatureTooltipsChanged = (e: GenericEvent) => {
        toggleMapTipsAction(e.target.checked);
    };
    const onSelectDragPanEnabled = (e: GenericEvent) => {
        toggleSelectDragPanAction(e.target.checked);
    }
    const onManualFeatureTooltipsChanged = (e: GenericEvent) => {
        toggleManualMapTipsAction(e.target.checked);
    };
    const units = getUnitsOfMeasure();
    let opBase = 1.0;
    let opMgBase = 1.0;
    let opMgSelOverlay = 1.0;
    let opMgDynamicOverlay = 1.0;
    if (layerTransparency) {
        if (LAYER_ID_BASE in layerTransparency) {
            opBase = layerTransparency[LAYER_ID_BASE];
        }
        if (LAYER_ID_MG_BASE in layerTransparency) {
            opMgBase = layerTransparency[LAYER_ID_MG_BASE];
        }
        if (LAYER_ID_MG_DYNAMIC_OVERLAY in layerTransparency) {
            opMgDynamicOverlay = layerTransparency[LAYER_ID_MG_DYNAMIC_OVERLAY];
        }
        if (LAYER_ID_MG_SEL_OVERLAY in layerTransparency) {
            opMgSelOverlay = layerTransparency[LAYER_ID_MG_SEL_OVERLAY];
        }
    }
    let hasMgBaseLayers = false;
    let isStateless = stateless;
    if (!map) {
        isStateless = true;
    } else {
        hasMgBaseLayers = (map.FiniteDisplayScale?.length ?? 0) > 0;
    }
    return <div className="component-viewer-options">
        <Heading level={5}>{tr("VIEWER_OPTIONS", locale)}</Heading>
        <hr />
        {!isStateless && <Switch checked={featureTooltipsEnabled} onChange={onFeatureTooltipsChanged} label={tr("FEATURE_TOOLTIPS", locale)} />}
        {(() => {
            if (!isStateless && featureTooltipsEnabled) {
                return <Switch checked={manualFeatureTooltips} onChange={onManualFeatureTooltipsChanged} label={tr("MANUAL_FEATURE_TOOLTIPS", locale)} />;
            }
        })()}
        <Switch checked={selectDragPanEnabled} onChange={onSelectDragPanEnabled} label={tr("ENABLE_SELECT_DRAGPAN", locale)} />
        <fieldset>
            <legend>{tr("LAYER_TRANSPARENCY", locale)}</legend>
            {(() => {
                if (externalBaseLayers) {
                    return <FormGroup label={tr("LAYER_ID_BASE", locale)}>
                        <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                            <Slider min={0} max={1.0} stepSize={0.01} value={opBase} onChange={onBaseOpacityChanged} />
                        </div>
                    </FormGroup>;
                }
            })()}
            {hasMgBaseLayers && <FormGroup label={tr("LAYER_ID_MG_BASE_LAYERS", locale)}>
                <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                    <Slider min={0} max={1.0} stepSize={0.01} value={opMgBase} onChange={onMgOpacityChanged} />
                </div>
            </FormGroup>}
            <FormGroup label={map ? tr("LAYER_ID_MG_BASE", locale) : tr("LAYER_ID_SUBJECT", locale)}>
                <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                    <Slider min={0} max={1.0} stepSize={0.01} value={opMgDynamicOverlay} onChange={onMgDynamicOverlayOpacityChanged} />
                </div>
            </FormGroup>
            {!isStateless && <FormGroup label={tr("LAYER_ID_MG_SEL_OVERLAY", locale)}>
                <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                    <Slider min={0} max={1.0} stepSize={0.01} value={opMgSelOverlay} onChange={onMgSelOpacityChanged} />
                </div>
            </FormGroup>}
        </fieldset>
        <FormGroup label={tr("MAP_SIZE_DISPLAY_UNITS", locale)} labelFor="viewSizeUnitsSelect">
            <Select id="viewSizeUnitsSelect" value={`${viewSizeUnits}`}
                onChange={onViewSizeUnitsChanged}
                items={units.map(uom => ({ value: `${uom}`, label: getUnitOfMeasure(uom).localizedName(locale) }))} />
        </FormGroup>
    </div>;
};