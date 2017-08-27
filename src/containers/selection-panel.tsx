import * as React from "react";
import { connect } from "react-redux";
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

export interface ISelectionPanelContainerProps {
    maxHeight?: number;
    selectedFeatureRenderer?: (props: ISelectedFeatureProps) => JSX.Element;
}

export interface ISelectionPanelContainerState {
    config: IConfigurationReducerState,
    selection: QueryMapFeaturesResponse;
}

export interface ISelectionPanelContainerDispatch {
    setCurrentView: (view: IMapView) => void;
    showSelectedFeature: (mapName: string, layerId: string, featureIndex: number) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: ISelectionPanelContainerProps): Partial<ISelectionPanelContainerState> {
    return {
        config: state.config,
        selection: getSelectionSet(state)
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ISelectionPanelContainerDispatch> {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view)),
        showSelectedFeature: (mapName, layerId, featureIndex) => dispatch(MapActions.showSelectedFeature(mapName, layerId, featureIndex))
    };
}

export type SelectionPanelContainerProps = ISelectionPanelContainerProps & Partial<ISelectionPanelContainerState> & Partial<ISelectionPanelContainerDispatch>;

export class SelectionPanelContainer extends React.Component<SelectionPanelContainerProps, any> {
    private fnZoomToSelectedFeature: (feature: SelectedFeature) => void;
    private fnShowSelectedFeature: (layerId: string, featureIndex: number) => void;
    constructor(props: SelectionPanelContainerProps) {
        super(props);
        this.fnZoomToSelectedFeature = this.onZoomToSelectedFeature.bind(this);
        this.fnShowSelectedFeature = this.onShowSelectedFeature.bind(this);
    }
    private onZoomToSelectedFeature(feature: SelectedFeature) {
        const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
        const viewer = getViewer();
        if (viewer && this.props.setCurrentView) {
            const view = viewer.getViewForExtent(bbox);
            this.props.setCurrentView(view);
        }
    }
    private onShowSelectedFeature(layerId: string, featureIndex: number) {
        const { showSelectedFeature, config } = this.props;
        if (showSelectedFeature && config && config.activeMapName) {
            showSelectedFeature(config.activeMapName, layerId, featureIndex);
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    render(): JSX.Element {
        const { selection, config, maxHeight } = this.props;
        const locale = this.getLocale();
        if (selection != null &&
            selection.SelectedFeatures != null) {
            return <SelectionPanel locale={locale} 
                                   selection={selection.SelectedFeatures}
                                   onRequestZoomToFeature={this.fnZoomToSelectedFeature}
                                   onShowSelectedFeature={this.fnShowSelectedFeature}
                                   selectedFeatureRenderer={this.props.selectedFeatureRenderer}
                                   maxHeight={maxHeight} />;
        } else {
            return <div className="pt-callout pt-intent-primary pt-icon-info-sign">
                <p className="selection-panel-no-selection">{tr("NO_SELECTED_FEATURES", locale)}</p>
            </div>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPanelContainer);