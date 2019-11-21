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
import { APPLICATION_CONTEXT_VALIDATION_MAP, IApplicationContext } from '../index';
import { Callout, Intent } from '@blueprintjs/core';

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
    showSelectedFeature: (mapName: string, layerId: string, selectionKey: string) => void;
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
        showSelectedFeature: (mapName, layerId, selectionKey) => dispatch(MapActions.showSelectedFeature(mapName, layerId, selectionKey))
    };
}

export type SelectionPanelContainerProps = ISelectionPanelContainerProps & Partial<ISelectionPanelContainerState> & Partial<ISelectionPanelContainerDispatch>;

export class SelectionPanelContainer extends React.Component<SelectionPanelContainerProps, any> {
    constructor(props: SelectionPanelContainerProps) {
        super(props);
    }
    static contextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;
    context: IApplicationContext;
    private onZoomToSelectedFeature = (feature: SelectedFeature) => {
        const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
        const viewer = getViewer();
        if (viewer && this.props.setCurrentView) {
            const view = viewer.getViewForExtent(bbox);
            this.props.setCurrentView(view);
        }
    }
    private onShowSelectedFeature = (layerId: string, selectionKey: string) => {
        const { showSelectedFeature, config } = this.props;
        if (showSelectedFeature && config && config.activeMapName) {
            showSelectedFeature(config.activeMapName, layerId, selectionKey);
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    render(): JSX.Element {
        const { selection, config, maxHeight } = this.props;
        const locale = this.getLocale();
        if (selection != null && selection.SelectedFeatures != null) {
            const cleaner = this.context.getHTMLCleaner();
            return <SelectionPanel locale={locale}
                                   allowHtmlValues={this.context.allowHtmlValuesInSelection()}
                                   cleanHTML={cleaner}
                                   selection={selection.SelectedFeatures}
                                   onRequestZoomToFeature={this.onZoomToSelectedFeature}
                                   onShowSelectedFeature={this.onShowSelectedFeature}
                                   selectedFeatureRenderer={this.props.selectedFeatureRenderer}
                                   maxHeight={maxHeight} />;
        } else {
            return <Callout intent={Intent.PRIMARY} icon="info-sign">
                <p className="selection-panel-no-selection">{tr("NO_SELECTED_FEATURES", locale)}</p>
            </Callout>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(SelectionPanelContainer);