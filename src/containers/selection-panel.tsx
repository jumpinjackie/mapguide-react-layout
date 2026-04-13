import * as React from "react";
import { SelectionPanel, ISelectedFeatureProps } from "../components/selection-panel";
import { SelectedFeature } from "../api/contracts/query";
import { tr } from "../api/i18n";
import { IMapView } from "../api/common";
import { AppContext } from '../components/context';
import { useViewerLocale, useActiveMapName } from './hooks';
import { setCurrentView, showSelectedFeature } from '../actions/map';
import { useAppState, useMapProviderContext, useReduxDispatch } from "../components/map-providers/context";
import { CompositeSelection } from "../api/composite-selection";
import { useElementContext } from "../components/elements/element-context";
import { useIsMapSwipeActive, useMapSwipeInfo } from "../components/map-viewer-swipe";
import type { QueryMapFeaturesResponse } from "../api/contracts/query";
import type { RuntimeMap } from "../api/contracts/runtime-map";
import type { ClientSelectionSet } from "../api/contracts/common";

export interface ISelectionPanelContainerProps {
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
}

/**
 * Container component for the Selection Panel. When the viewer is in split (swipe) mode,
 * an additional dropdown is rendered so the user can choose which map's selection to display.
 *
 * @since 0.15
 * @hidden
 */
export const SelectionPanelContainer = (props: ISelectionPanelContainerProps) => {
    const { Callout } = useElementContext();
    const { maxHeight, selectedFeatureRenderer } = props;
    const locale = useViewerLocale();
    const dispatch = useReduxDispatch();
    const activeMapName = useActiveMapName();
    const isSwipeActive = useIsMapSwipeActive();
    const swipeInfo = useMapSwipeInfo();

    // When swipe is active, the user can choose which map's selection to display.
    // Default to the primary (active) map; reset to the active map when swipe ends.
    const [selectedMapForSelection, setSelectedMapForSelection] = React.useState<string | undefined>(activeMapName);
    React.useEffect(() => {
        if (!isSwipeActive) {
            setSelectedMapForSelection(activeMapName);
        }
    }, [isSwipeActive, activeMapName]);

    const targetMapName = isSwipeActive ? (selectedMapForSelection ?? activeMapName) : activeMapName;

    const map = useAppState<RuntimeMap | undefined>(state => {
        if (targetMapName && state.mapState[targetMapName]) {
            return state.mapState[targetMapName].mapguide?.runtimeMap;
        }
        return undefined;
    });

    const selection = useAppState<QueryMapFeaturesResponse | null>(state => {
        if (targetMapName && state.mapState[targetMapName]) {
            return state.mapState[targetMapName].mapguide?.selectionSet ?? null;
        }
        return null;
    });

    const clientSelection = useAppState<ClientSelectionSet | undefined>(state => {
        if (targetMapName && state.mapState[targetMapName]) {
            return state.mapState[targetMapName].clientSelection;
        }
        return undefined;
    });

    const setCurrentViewAction = (view: IMapView) => dispatch(setCurrentView(view));
    const showSelectedFeatureAction = (mapName: string, layerId: string, selectionKey: string) => dispatch(showSelectedFeature(mapName, layerId, selectionKey));
    const appContext = React.useContext(AppContext);
    const viewer = useMapProviderContext();
    const onZoomToSelectedFeature = (feature: SelectedFeature) => {
        if (feature.Bounds) {
            const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
            if (viewer.isReady()) {
                const view = viewer.getViewForExtent(bbox);
                setCurrentViewAction(view);
            }
        }
    };
    const resolveLayerLabel = (layerId: string, _: string) => {
        const layer = map?.Layer?.filter?.(l => l.ObjectId == layerId)?.[0];
        if (layer) {
            return layer.LegendLabel;
        }
    };
    const onShowSelectedFeature = (layerId: string, selectionKey: string) => {
        if (targetMapName) {
            showSelectedFeatureAction(targetMapName, layerId, selectionKey);
        }
    };

    const selectorContainerStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 };
    const selectorLabelStyle: React.CSSProperties = { whiteSpace: "nowrap" };
    const selectorSelectStyle: React.CSSProperties = { flex: 1 };
    const swipeMapSelector = isSwipeActive && swipeInfo ? (
        <div style={selectorContainerStyle}>
            <label style={selectorLabelStyle}>{tr("MAP_SWIPE_SELECTION_FOR", locale)}</label>
            <select
                value={selectedMapForSelection ?? activeMapName ?? ""}
                onChange={e => setSelectedMapForSelection(e.target.value)}
                style={selectorSelectStyle}
            >
                <option value={swipeInfo.pair.primaryMapName}>
                    {swipeInfo.pair.primaryLabel ?? tr("MAP_SWIPE_PRIMARY_LABEL", locale)} ({swipeInfo.pair.primaryMapName})
                </option>
                <option value={swipeInfo.pair.secondaryMapName}>
                    {swipeInfo.pair.secondaryLabel ?? tr("MAP_SWIPE_SECONDARY_LABEL", locale)} ({swipeInfo.pair.secondaryMapName})
                </option>
            </select>
        </div>
    ) : null;

    const compSel = new CompositeSelection(selection?.SelectedFeatures, clientSelection);
    if (selection?.SelectedFeatures != null || clientSelection) {
        const allowHtmlValues = appContext.allowHtmlValuesInSelection();
        const cleaner = appContext.getHTMLCleaner();
        const formatter = appContext.getPropertyValueFormatter();
        return <div>
            {swipeMapSelector}
            <SelectionPanel locale={locale}
                onResolveLayerLabel={resolveLayerLabel}
                allowHtmlValues={allowHtmlValues}
                cleanHTML={cleaner}
                formatPropertyValue={formatter}
                selection={compSel}
                onRequestZoomToFeature={onZoomToSelectedFeature}
                onShowSelectedFeature={onShowSelectedFeature}
                selectedFeatureRenderer={selectedFeatureRenderer}
                maxHeight={maxHeight} />
        </div>;
    } else {
        return <div>
            {swipeMapSelector}
            <Callout variant="primary" icon="info-sign">
                <span className="selection-panel-no-selection">{tr("NO_SELECTED_FEATURES", locale)}</span>
            </Callout>
        </div>;
    }
}