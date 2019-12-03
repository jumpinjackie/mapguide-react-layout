import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { SelectionPanel, ISelectedFeatureProps } from "../components/selection-panel";
import { QueryMapFeaturesResponse, SelectedFeature } from "../api/contracts/query";
import * as MapActions from "../actions/map";
import { getViewer } from "../api/runtime";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    getSelectionSet
} from "../api/common";
import { Callout, Intent } from '@blueprintjs/core';
import { AppContext } from '../components/context';
import { useViewerLocale, useActiveMapSelectionSet, useActiveMapName } from './hooks';

export interface ISelectionPanelContainerProps {
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
}

const SelectionPanelContainer = (props: ISelectionPanelContainerProps) => {
    const { maxHeight, selectedFeatureRenderer } = props;
    const locale = useViewerLocale();
    const selection = useActiveMapSelectionSet();
    const dispatch = useDispatch();
    const activeMapName = useActiveMapName();
    const setCurrentView = (view: IMapView) => dispatch(MapActions.setCurrentView(view));
    const showSelectedFeature = (mapName: string, layerId: string, selectionKey: string) => dispatch(MapActions.showSelectedFeature(mapName, layerId, selectionKey));
    const appContext = React.useContext(AppContext);
    const onZoomToSelectedFeature = (feature: SelectedFeature) => {
        const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
        const viewer = getViewer();
        if (viewer) {
            const view = viewer.getViewForExtent(bbox);
            setCurrentView(view);
        }
    }
    const onShowSelectedFeature = (layerId: string, selectionKey: string) => {
        if (activeMapName) {
            showSelectedFeature(activeMapName, layerId, selectionKey);
        }
    }
    if (selection != null && selection.SelectedFeatures != null) {
        return <SelectionPanel locale={locale}
            allowHtmlValues={appContext.allowHtmlValuesInSelection()}
            cleanHTML={appContext.getHTMLCleaner()}
            selection={selection.SelectedFeatures}
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

export default SelectionPanelContainer;