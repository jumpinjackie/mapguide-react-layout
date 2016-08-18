import * as React from "react";
import { connect } from "react-redux";
import { IMapView } from "../components/context";
import {
    IMapViewer,
    ActiveMapTool,
    MapViewerBase, 
    RefreshMode,
    DigitizerCallback
} from "../components/map-viewer-base";
import * as Runtime from "../api/runtime";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as MapActions from "../actions/map";

interface IMapViewerContainerProps {
    
}

interface IMapViewerContainerState {
    config?: any;
    map?: RuntimeMap;
    view?: any;
    viewer?: any;
}

interface IMapViewerContainerDispatch {
    setCurrentView?: (view) => void;
    setSelection?: (selectionSet) => void;
    setBusyCount?: (count) => void;
}

function mapStateToProps(state): IMapViewerContainerState {
    return {
        config: state.config,
        view: state.view,
        map: state.map.state,
        viewer: state.map.viewer
    };
}

function mapDispatchToProps(dispatch): IMapViewerContainerDispatch {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view)),
        setSelection: (selectionSet) => dispatch(MapActions.setSelection(selectionSet)),
        setBusyCount: (count) => dispatch(MapActions.setBusyCount(count))
    };
}

type MapViewerContainerProps = IMapViewerContainerProps & IMapViewerContainerState & IMapViewerContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class MapViewerContainer extends React.Component<MapViewerContainerProps, any>
    implements IMapViewer {
    private fnMapViewerMounted: (component) => void;
    private inner: MapViewerBase;
    private fnViewChanged: (view: IMapView) => void;
    private fnSelectionChanged: (selectionSet: any) => void;
    private fnRequestSelectableLayers: () => string[];
    private fnBusyLoading: (busyCount) => void;
    constructor(props) {
        super(props);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnViewChanged = this.onViewChanged.bind(this);
        this.fnSelectionChanged = this.onSelectionChanged.bind(this);
        this.fnRequestSelectableLayers = this.onRequestSelectableLayers.bind(this);
        this.fnBusyLoading = this.onBusyLoading.bind(this);
    }
    private onMapViewerMounted(component) {
        this.inner = component;
    }
    private onViewChanged(view: IMapView): void {
        this.props.setCurrentView(view);
    }
    private onSelectionChanged(selectionSet: any): void {
        this.props.setSelection(selectionSet);
    }
    private onRequestSelectableLayers(): string[] {
        //TODO: Eventually this should combine with override selectable layers that should be in the redux store
        const { map } = this.props;
        return map.Layer.map(layer => layer.Name);
    }
    private onBusyLoading(busyCount) {
        this.props.setBusyCount(busyCount);
    }
    componentDidMount() {
        Runtime.setViewer(this);
    }
    render(): JSX.Element {
        const { map, config, viewer, view } = this.props;
        if (map != null && config != null && view != null && viewer != null) {
            return <MapViewerBase ref={this.fnMapViewerMounted}
                                  map={map} 
                                  agentUri={config.agentUri}
                                  agentKind={config.agentKind}
                                  imageFormat={config.imageFormat}
                                  externalBaseLayers={config.externalBaseLayers}
                                  selectionColor={config.selectionColor}
                                  tool={viewer.tool}
                                  featureTooltipsEnabled={viewer.featureTooltipsEnabled}
                                  layerGroupVisibility={viewer.layerGroupVisibility}
                                  view={view.current}
                                  onBusyLoading={this.fnBusyLoading}
                                  onRequestSelectableLayers={this.fnRequestSelectableLayers}
                                  onSelectionChange={this.fnSelectionChanged}
                                  onViewChanged={this.fnViewChanged} />;
        } else {
            return <div>Loading Map ...</div>;
        }
    }
    // ----------------- IMapViewer --------------------- //
    getCurrentExtent(): number[] {
        return this.inner.getCurrentExtent();
    }
    zoomToView(x: number, y: number, scale: number): void {
        this.onViewChanged({ x: x, y: y, scale: scale });
    }
    setSelectionXml(xml: string): void {
        this.inner.setSelectionXml(xml);
    }
    refreshMap(mode?: RefreshMode): void {
        this.inner.refreshMap(mode);
    }
    getMetersPerUnit(): number {
        return this.inner.getMetersPerUnit();
    }
    setActiveTool(tool: ActiveMapTool): void {
        this.setState({ tool: tool });
    }
    getActiveTool(): ActiveMapTool {
        return this.state.tool;
    }
    initialView(): void {
        this.inner.initialView();
    }
    clearSelection(): void {
        this.inner.clearSelection();
    }
    zoomDelta(delta: number): void {
        this.inner.zoomDelta(delta);
    }
    isDigitizing(): boolean {
        return this.isDigitizing();
    }
    digitizePoint(handler: DigitizerCallback<ol.geom.Point>, prompt?: string): void {
        this.inner.digitizePoint(handler, prompt);
    }
    digitizeLine(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        this.inner.digitizeLine(handler, prompt);
    }
    digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        this.inner.digitizeLineString(handler, prompt);
    }
    digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>, prompt?: string): void {
        this.inner.digitizeCircle(handler, prompt);
    }
    digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        this.inner.digitizeRectangle(handler, prompt);
    }
    digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        this.inner.digitizePolygon(handler, prompt);
    }
    selectByGeometry(geom: ol.geom.Geometry): void {
        this.inner.selectByGeometry(geom);
    }
    zoomToExtent(extent: number[]): void {
        this.inner.zoomToExtent(extent);
    }
    isFeatureTooltipEnabled(): boolean {
        return this.state.featureTooltipsEnabled;
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        this.setState({ featureTooltipsEnabled: enabled });
    }
    getView(): IMapView {
        return this.props.view.current;
    }
}