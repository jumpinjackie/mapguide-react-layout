import * as React from "react";
import { SelectionPanel, ISelectedFeatureProps } from "../components/selection-panel";
import { FeatureProperty, LayerMetadata, SelectedFeature, SelectedFeatureSet, SelectedLayer } from "../api/contracts/query";
import { getViewer } from "../api/runtime";
import { tr } from "../api/i18n";
import { ICompositeSelection, ICompositeSelectionLayer, IMapView } from "../api/common";
import { Callout, Intent } from '@blueprintjs/core';
import { AppContext } from '../components/context';
import { useViewerLocale, useActiveMapSelectionSet, useActiveMapName, useActiveMapClientSelectionSet } from './hooks';
import { setCurrentView, showSelectedFeature } from '../actions/map';
import { useActiveMapState } from './hooks-mapguide';
import { useReduxDispatch } from "../components/map-providers/context";
import { CompositeSelection } from "../api/composite-selection";

export interface ISelectionPanelContainerProps {
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
}

export const SelectionPanelContainer = (props: ISelectionPanelContainerProps) => {
    const { maxHeight, selectedFeatureRenderer } = props;
    const locale = useViewerLocale();
    const map = useActiveMapState();
    const selection = useActiveMapSelectionSet();
    const clientSelection = useActiveMapClientSelectionSet();
    const dispatch = useReduxDispatch();
    const activeMapName = useActiveMapName();
    const setCurrentViewAction = (view: IMapView) => dispatch(setCurrentView(view));
    const showSelectedFeatureAction = (mapName: string, layerId: string, selectionKey: string) => dispatch(showSelectedFeature(mapName, layerId, selectionKey));
    const appContext = React.useContext(AppContext);
    const onZoomToSelectedFeature = (feature: SelectedFeature) => {
        if (feature.Bounds) {
            const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
            const viewer = getViewer();
            if (viewer) {
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
        if (activeMapName) {
            showSelectedFeatureAction(activeMapName, layerId, selectionKey);
        }
    };
    const compSel = new CompositeSelection(selection?.SelectedFeatures, clientSelection);
    if (selection?.SelectedFeatures != null || clientSelection) {
        return <SelectionPanel locale={locale}
            onResolveLayerLabel={resolveLayerLabel}
            allowHtmlValues={appContext.allowHtmlValuesInSelection()}
            cleanHTML={appContext.getHTMLCleaner()}
            selection={compSel}
            onRequestZoomToFeature={onZoomToSelectedFeature}
            onShowSelectedFeature={onShowSelectedFeature}
            selectedFeatureRenderer={selectedFeatureRenderer}
            maxHeight={maxHeight} />;
    } else {
        return <Callout intent={Intent.PRIMARY} icon="info-sign">
            <p className="selection-panel-no-selection">{tr("NO_SELECTED_FEATURES", locale)}</p>
        </Callout>;
    }
}