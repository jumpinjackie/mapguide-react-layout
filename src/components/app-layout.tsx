import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from "openlayers";
import { RuntimeMapFeatureFlags, IMapGuideClient } from "../api/request-builder";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { TaskPane } from "./task-pane";
import { MapViewer, IMapViewer, ActiveMapTool, IExternalBaseLayer } from "./map-viewer";
import { Legend, MapElementChangeFunc } from "./legend";
import { ClientContext, ClientKind } from "../api/client";
import { IMapView, IApplicationContext, APPLICATION_CONTEXT_VALIDATION_MAP } from "./context";
import { AjaxViewerShim } from "../api/ajax-viewer-shim";
import { SelectionPanel } from "./selection-panel";
import { Toolbar, DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR, IItem, IMenu } from "./toolbar";
import { buildSelectionXml } from "../api/builders/deArrayify";
import { FormFrameShim } from "./form-frame-shim";
import { MouseCoordinates } from "./mouse-coordinates";
import { PoweredByMapGuide } from "./pbmg";
import { SelectedFeatureCount } from "./selected-feature-count";
import assign = require("object-assign");

export interface IApplicationProps {
    /**
     * Agent configuration 
     * 
     * @type {{
     *         uri: string,
     *         kind?: ClientKind
     *     }}
     */
    agent: {
        uri: string,
        kind?: ClientKind
    },
    /**
     * A resource id to a Map Definition or Application Definition. If passing a Map Definition,
     * a default viewer layout will be created 
     * 
     * @type {string}
     */
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
}

const SIDEBAR_WIDTH = 250;
const LEGEND_HEIGHT = 350;

/**
 * Application is the root component of a MapGuide viewer application
 */
export class Application extends React.Component<IApplicationProps, any> implements IApplicationContext {
    private fnLegendMounted: (component) => void;
    private fnMapViewerMounted: (component) => void;
    private fnTaskPaneMounted: (component) => void;
    private fnFormFrameMounted: (component) => void;
    private fnMouseCoordsMounted: (component) => void;
    private fnBaseLayerChanged: (baseLayerName) => void;
    private fnGroupVisibilityChanged: MapElementChangeFunc;
    private fnLayerVisibilityChanged: MapElementChangeFunc;
    private fnViewChanged: (view: IMapView) => void;
    private fnSelectionChange: (selectionSet: any) => void;
    private fnZoomToSelectedFeature: (feature: any) => void;
    private fnRequestSelectableLayers: () => string[];
    private fnMouseCoordinatesChanged: (coords) => void;
    private _viewer: any;
    private _legend: Legend;
    private _taskpane: TaskPane;
    private _formFrame: FormFrameShim;
    private _coords: MouseCoordinates;
    private commands: (IItem|IMenu)[]; 
    private clientContext: ClientContext;
    static childContextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;
    constructor(props) {
        super(props);
        this.fnLegendMounted = this.onLegendMounted.bind(this);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnTaskPaneMounted = this.onTaskPaneMounted.bind(this);
        this.fnViewChanged = this.onViewChanged.bind(this);
        this.fnFormFrameMounted = this.onFormFrameMounted.bind(this);
        this.fnGroupVisibilityChanged = this.onGroupVisibilityChanged.bind(this);
        this.fnLayerVisibilityChanged = this.onLayerVisibilityChanged.bind(this);
        this.fnSelectionChange = this.onSelectionChange.bind(this);
        this.fnZoomToSelectedFeature = this.onZoomToSelectedFeature.bind(this);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
        this.fnRequestSelectableLayers = this.onRequestSelectableLayers.bind(this);
        this.fnMouseCoordinatesChanged = this.onMouseCoordinatesChanged.bind(this);
        this.fnMouseCoordsMounted = this.onMouseCoordsMounted.bind(this);
        this.state = {
            selection: null,
            runtimeMap: null,
            error: null,
            externalBaseLayers: (props.externalBaseLayers || []).map(l => { return { name: l.name, visible: l.visible === true }; }),
        };
        this.commands = [
            { 
                icon: "select.png",
                tooltip: "Select",
                selected: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        return viewer.getActiveTool() === ActiveMapTool.Select;
                    }
                    return false;
                },
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.setActiveTool(ActiveMapTool.Select);
                    }
                }
            },
            { 
                icon: "pan.png",
                tooltip: "Pan",
                selected: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        return viewer.getActiveTool() === ActiveMapTool.Pan;
                    }
                    return false;
                },
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.setActiveTool(ActiveMapTool.Pan);
                    }
                }
            },
            { 
                icon: "zoom-in.png",
                tooltip: "Zoom",
                selected: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        return viewer.getActiveTool() === ActiveMapTool.Zoom;
                    }
                    return false;
                },
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.setActiveTool(ActiveMapTool.Zoom);
                    }
                }
            },
            { isSeparator: true },
            {
                label: "Zoom",
                childItems: [
                    { 
                        icon: "zoom-in-fixed.png",
                        label: "Zoom In",
                        tooltip: "Zoom In",
                        invoke: () => {
                            const viewer = this.getViewer();
                            if (viewer) {
                                viewer.zoomDelta(1);
                            }
                        } 
                    },
                    { 
                        icon: "zoom-out-fixed.png",
                        label: "Zoom Out",
                        tooltip: "Zoom Out",
                        invoke: () => {
                            const viewer = this.getViewer();
                            if (viewer) {
                                viewer.zoomDelta(-1);
                            }
                        } 
                    }
                ]
            },
            { isSeparator: true },
            {
                icon: "maptip.png",
                label: "Feature Tooltips",
                tooltip: "Feature Tooltips",
                selected: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        return viewer.isFeatureTooltipEnabled();
                    }
                    return false;
                },
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        return viewer.setFeatureTooltipEnabled(!viewer.isFeatureTooltipEnabled());
                    }
                }
            },
            { 
                icon: "select-radius.png",
                //label: "Select Radius",
                tooltip: "Select Radius",
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.digitizeCircle(circle => {
                            const geom = ol.geom.Polygon.fromCircle(circle);
                            viewer.selectByGeometry(geom);
                        });
                    }
                } 
            },
            { 
                icon: "select-polygon.png",
                //label: "Select Polygon",
                tooltip: "Select Polygon",
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.digitizePolygon(geom => {
                            viewer.selectByGeometry(geom);
                        });
                    }
                } 
            },
            { 
                icon: "zoom-full.png",
                //label: "Zoom Extents",
                tooltip: "Zoom Extents",
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.initialView();
                    }
                } 
            },
            { 
                icon: "select-clear.png",
                //label: "Clear Selection",
                tooltip: "Clear Selection",
                invoke: () => {
                    const viewer = this.getViewer();
                    if (viewer) {
                        viewer.clearSelection();
                    }
                }
            },
            { icon: "buffer.png", tooltip: "Buffer", invoke: () => this._taskpane.loadUrl("/mapguide/mapviewernet/bufferui.aspx") },
            { icon: "measure.png", tooltip: "Measure", invoke: () => this._taskpane.loadUrl("/mapguide/mapviewernet/measureui.aspx") },
            { icon: "print.png", tooltip: "Quick Plot", invoke: () => this._taskpane.loadUrl("/mapguide/mapviewernet/quickplotpanel.aspx") }
        ];
    }
    getChildContext(): IApplicationContext {
        return {
            getClient: this.getClient.bind(this),
            getSession: this.getSession.bind(this),
            getMapName: this.getMapName.bind(this),
            getLocale: this.getLocale.bind(this)
        };
    }
    //-------- IApplicationContext --------//
    getClient(): IMapGuideClient {
        return this.clientContext.agent;
    }
    getSession(): string {
        const runtimeMap: RuntimeMap = this.state.runtimeMap;
        if (runtimeMap != null) {
            return runtimeMap.SessionId;
        }
        return null;
    }
    getMapName(): string {
        const runtimeMap: RuntimeMap = this.state.runtimeMap;
        if (runtimeMap != null) {
            return runtimeMap.Name;
        }
        return null;
    }
    getLocale(): string {
        return "en";
    }
    //-------------------------------------//
    componentDidMount() {
        const { agent } = this.props;
        this.clientContext = new ClientContext(agent.uri, agent.kind);
        this.clientContext.agent.createRuntimeMap({
            mapDefinition: this.props.resourceId,
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
            username: "Anonymous"
        }).then(res => {
            this.setState({ runtimeMap: res });
        }).catch(err => {
            this.setState({ runtimeMap: null, error: err });
        });
    }
    render(): JSX.Element {
        const { runtimeMap, selection } = this.state;
        if (runtimeMap) {
            const sel = selection ? selection.SelectedFeatures : null;
            const externalLayers = this.getActiveExternalBaseLayerState();
            return <div style={{ width: "100%", height: "100%" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
                    <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: LEGEND_HEIGHT, overflow: "auto" }}>
                        <Legend ref={this.fnLegendMounted}
                                map={this.state.runtimeMap}
                                externalBaseLayers={externalLayers}
                                onBaseLayerChanged={this.fnBaseLayerChanged}
                                onGroupVisibilityChanged={this.fnGroupVisibilityChanged}
                                onLayerVisibilityChanged={this.fnLayerVisibilityChanged} />
                    </div>
                    <div style={{ position: "absolute", left: 0, bottom: 0, right: 0, top: LEGEND_HEIGHT }}>
                        <SelectionPanel selection={sel}
                                        onRequestZoomToFeature={this.fnZoomToSelectedFeature} />
	                </div>
                </div>
                <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, bottom: 0, right: SIDEBAR_WIDTH }}>
                    <Toolbar childItems={this.commands} containerStyle={{ position: "absolute", left: 10, top: 10, height: DEFAULT_TOOLBAR_HEIGHT, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR, fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }} />
                    <MapViewer ref={this.fnMapViewerMounted}
                               map={this.state.runtimeMap} 
                               agentUri={this.props.agent.uri}
                               onViewChanged={this.fnViewChanged}
                               onSelectionChange={this.fnSelectionChange}
                               onRequestSelectableLayers={this.fnRequestSelectableLayers}
                               externalBaseLayers={externalLayers}
                               onMouseCoordinateChanged={this.fnMouseCoordinatesChanged}
                               imageFormat="PNG" />
                    <MouseCoordinates ref={this.fnMouseCoordsMounted} decimals={6} style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
                    {(() => {
                        if (selection != null && selection.FeatureSet != null && selection.FeatureSet.Layer.length > 0) {
                            return <SelectedFeatureCount style={{ position: "absolute", bottom: 0, right: 140, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} selection={selection.FeatureSet} />;
                        }
                    })()}
                    <PoweredByMapGuide style={{ position: "absolute", bottom: 0, right: 0, zIndex: 100 }} />
                </div>
                <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDEBAR_WIDTH }}>
                {/* <TaskPane ref={this.fnTaskPaneMounted} initialUrl="/mapguide/localized/help/en/mapguide_viewer_command_list.htm" /> */}
                    <TaskPane ref={this.fnTaskPaneMounted} initialUrl="/mapguide/phpsamples/index.php" />
                </div>
                <FormFrameShim ref={this.fnFormFrameMounted} />
            </div>;
        } else {
            if (this.state.error != null) {
                return <div>
                    <h3>An error occurred while loading this application</h3>
                    <pre>
                        {this.state.error.message}
                    </pre>
                </div>;
            } else {
                return <div>Loading Map ...</div>;
            }
        }
    }
    public getSelectionXml(): string {
        const { selection } = this.state;
        if (!selection || !selection.FeatureSet) {
            return "";
        } else {
            return buildSelectionXml(selection.FeatureSet);
        }
    }
    public getViewer(): IMapViewer {
        var viewer = this._viewer; //.refs['wrappedInstance'];
        return viewer;
    }
    public submitForm(url: string, params: string[], frameTarget: string) {
        if (this._formFrame) {
            this._formFrame.submit(url, params, frameTarget);
        }
    }
    public getTaskPane(): TaskPane {
        return this._taskpane;
    }
    private getActiveExternalBaseLayerState(): IExternalBaseLayer[] {
        const layers: IExternalBaseLayer[] = [];
        if (this.props.externalBaseLayers != null) {
            for (const layer of this.props.externalBaseLayers) {
                const match = (this.state.externalBaseLayers || []).filter(l => l.name === layer.name);
                layers.push(assign({}, layer, { visible: (match.length == 1 ? match[0].visible : false) }));
            }
        }
        return layers;
    }
    private onBaseLayerChanged(layerName: string) {
        const layers = this.state.externalBaseLayers;
        //Clear selection state
        layers.forEach(l => l.visible = false);
        const matches = layers.filter(l => l.name === layerName);
        //Should only be one result here
        matches.forEach(l => l.visible = true);
        //Pass back to state
        this.setState({ externalBaseLayers: layers });
    }
    private onRequestSelectableLayers(): string[] {
        if (this._legend) {
            return this._legend.getSelectableLayers();
        }
        return null;
    }
    private onZoomToSelectedFeature(feature: any) {
        const viewer = this.getViewer();
        if (viewer != null) {
            const bbox: number[] = feature.Bounds.split(" ").map(s => parseFloat(s));
            viewer.zoomToExtent(bbox);
        }
    }
    private onSelectionChange(selectionSet: any) {
        this.setState({ selection: selectionSet });
    }
    private onLegendMounted(legend: Legend) {
        this._legend = legend;
    }
    private onMapViewerMounted(component) {
        this._viewer = component;
    }
    private onTaskPaneMounted(component) {
        this._taskpane = component;
    }
    private onFormFrameMounted(component) {
        this._formFrame = component;
    }
    private onMouseCoordsMounted(component) {
        this._coords = component;
    }
    private onGroupVisibilityChanged(groupId: string, visible: boolean) {
        const viewer = this.getViewer();
        if (viewer != null)
            viewer.setGroupVisibility(groupId, visible);
    }
    private onLayerVisibilityChanged(layerId: string, visible: boolean) {
        const viewer = this.getViewer();
        if (viewer != null)
            viewer.setLayerVisibility(layerId, visible);
    }
    private onViewChanged(view: IMapView) {
        if (this._legend != null)
            this._legend.setState({ currentScale: view.scale });
    }
    private onMouseCoordinatesChanged(coords) {
        if (this._coords) {
            this._coords.setState({ coords: coords });
        }
    }
}

/**
 * This is the entry point to the Application component
 */
export class ApplicationViewModel {
    constructor() {

    }
    public mount(node: Element, props: IApplicationProps) {
        const app: Application = ReactDOM.render(<Application {...props}/>, node) as Application;
        const win: any = window;
        AjaxViewerShim.install(win, app);
    }
}