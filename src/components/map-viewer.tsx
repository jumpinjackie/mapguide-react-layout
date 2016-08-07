import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from "openlayers";
import {
    IApplicationContext,
    IMapViewerContext,
    IMapView,
    APPLICATION_CONTEXT_VALIDATION_MAP,
    MAP_VIEWER_CONTEXT_VALIDATION_MAP
} from "./context";
import * as Contracts from '../api/contracts';
import debounce = require("lodash.debounce");
import { areNumbersEqual } from '../utils/number';
import * as logger from '../utils/logger';
import { MgError } from '../api/error';

export interface IExternalBaseLayer {
    name: string;
    kind: string;
    visible?: boolean;
    options?: any;
}

export interface IMapViewerProps {
    map: Contracts.RtMap.RuntimeMap;
    agentUri: string;
    imageFormat: "PNG" | "PNG8" | "JPG" | "GIF";
    stateChangeDebounceTimeout?: number;
    onViewChanged?: (view: IMapView) => void;
    onRequestSelectedLayers?: () => string[];
    onSelectionChange?: (selectionSet: any) => void;
    pointSelectionBuffer?: number;
    externalBaseLayers?: IExternalBaseLayer[];
}

export enum RefreshMode {
    LayersOnly = 1,
    SelectionOnly = 2
}

export type DigitizerCallback<T extends ol.geom.Geometry> = (geom: T) => void;

export interface IMapViewer extends IMapViewerContext {
    zoomToView(x: number, y: number, scale: number): void;
    setSelectionXml(xml: string): void;
    refreshMap(mode?: RefreshMode): void;
    getMetersPerUnit(): number;
    setActiveTool(tool: ActiveMapTool): void;
    getActiveTool(): ActiveMapTool;
    initialView(): void;
    clearSelection(): void;
    zoomDelta(delta: number): void;
    isDigitizing(): boolean;
    digitizePoint(handler: DigitizerCallback<ol.geom.Point>): void;
    digitizeLine(handler: DigitizerCallback<ol.geom.LineString>): void;
    digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>): void;
    digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>): void;
    digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>): void;
    digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>): void;
    selectByGeometry(geom: ol.geom.Geometry): void;
}

export enum ActiveMapTool {
    Zoom,
    Select,
    Pan,
    None
}

export class MapViewer extends React.Component<IMapViewerProps, any>
    implements IMapViewerContext, IMapViewer {
    /**
     * The internal OpenLayers map instance
     * 
     * @private
     * @type {ol.Map}
     */
    private _map: ol.Map;
    /**
     * The MapGuide overlay image layer
     * 
     * @private
     * @type {ol.layer.Image}
     */
    private _overlay: ol.layer.Image;
    /**
     * The MapGuide selection overlay image layer
     * 
     * @private
     * @type {ol.layer.Image}
     */
    private _selectionOverlay: ol.layer.Image;
    /**
     * The initial map view
     * 
     * @private
     * @type {IMapView}
     */
    private _initialView: IMapView;

    private _wktFormat: ol.format.WKT;

    private _inPerUnit: number;
    private _dpi: number;
    private _extent: ol.Extent;

    private _baseLayerGroup: ol.layer.Group;
    private _zoomSelectBox: ol.interaction.DragBox;

    context: IApplicationContext;
    /**
     * This is a throttled version of _refreshOnStateChange(). Call this on any 
     * modifications to pendingStateChanges 
     * 
     * @private
     */
    private refreshOnStateChange: () => void;
    constructor(props: IMapViewerProps) {
        super(props);
        this._map = null;
        this.state = this.buildInitialState(props);
        this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), props.stateChangeDebounceTimeout || 500);
        this._wktFormat = new ol.format.WKT();
    }
    private buildInitialState(props: IMapViewerProps) {
        const layerMap: any = {};
        const groupMap: any = {};
        for (const layer of props.map.Layer) {
            layerMap[layer.ObjectId] = layer;
        }
        for (const group of props.map.Group) {
            groupMap[group.ObjectId] = group;
        }
        return {
            tool: ActiveMapTool.None,
            map: props.map,
            navigationStack: [],
            pendingStateChanges: {
                showLayers: [],
                showGroups: [],
                hideLayers: [],
                hideGroups: []
            },
            layerMap: layerMap,
            groupMap: groupMap
        };
    }
    /**
     * DO NOT CALL DIRECTLY, call this.refreshOnStateChange() instead, which is a throttled version
     * of this method
     * @private
     */
    private _refreshOnStateChange() {
        const changes = this.state.pendingStateChanges;
        //Send the request
        const imgSource = this._overlay.getSource() as ol.source.ImageMapGuide;
        imgSource.updateParams({
            showlayers: changes.showLayers || [],
            showgroups: changes.showGroups || [],
            hidelayers: changes.hideLayers || [],
            hidegroups: changes.hideGroups || []
        });
        //Reset the pending state changes
        //FIXME: Should only do this on successful refresh. Can we hook in somewhere?
        changes.showLayers = [];
        changes.showGroups = [];
        changes.hideLayers = [];
        changes.hideGroups = [];
        this.setState({ pendingStateChanges: changes });
    }
    static childContextTypes = MAP_VIEWER_CONTEXT_VALIDATION_MAP;
    static contextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;

    private createExternalSource(layer: IExternalBaseLayer) {
        let sourceCtor = ol.source[layer.kind];
        if (typeof(sourceCtor) == 'undefined')
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);

        if (typeof(layer.options) != 'undefined')
            return new sourceCtor(layer.options);
        else
            return new sourceCtor();
    }
    private scaleToResolution(scale: number): number {
        return scale / this._inPerUnit / this._dpi;
    }
    private resolutionToScale(resolution: number): number {
        return resolution * this._dpi * this._inPerUnit;
    }
    private onMapClick(e) {
        if (this.isDigitizing()) {
            return;
        }
        if (this.state.tool === ActiveMapTool.Select) {
            const ptBuffer = this.props.pointSelectionBuffer || 2;
            const ll = this._map.getCoordinateFromPixel([e.pixel[0] - ptBuffer, e.pixel[1] - ptBuffer]);
            const ur = this._map.getCoordinateFromPixel([e.pixel[0] + ptBuffer, e.pixel[1] + ptBuffer]);
            const box = [ll[0], ll[1], ur[0], ur[1]];
            const geom = ol.geom.Polygon.fromExtent(box);
            this.selectByGeometry(geom);
        }
    }
    private onZoomSelectBox(e) {
        const extent = this._zoomSelectBox.getGeometry();
        switch (this.getActiveTool()) {
            case ActiveMapTool.Zoom:
                {
                    this.zoomToExtent(extent.getExtent());
                }
                break;
            case ActiveMapTool.Select:
                {
                    const selLayerNames = (this.props.onRequestSelectedLayers != null)
                        ? this.props.onRequestSelectedLayers()
                        : null;
                    this.sendSelectionQuery(extent, selLayerNames);
                }
                break;
        }
    }
    private sendSelectionQuery(geom, selectedLayerNames, persist = 1) {
        if (selectedLayerNames != null && selectedLayerNames.length == 0) {
            return;
        }
        const reqQueryFeatures = 1 | 2; //Attributes and inline selection
        const wkt = this._wktFormat.writeGeometry(geom);
        const client = this.context.getClient();
        client.queryMapFeatures({
            mapname: this.context.getMapName(),
            session: this.context.getSession(),
            geometry: wkt,
            persist: persist,
            selectionvariant: "INTERSECTS",
            selectioncolor: "0xFF000000",
            selectionformat: "PNG8",
            maxfeatures: -1,
            requestdata: reqQueryFeatures
        }).then(res => {
            this.refreshMap(RefreshMode.SelectionOnly);
            //Only broadcast if persistent change, otherwise it's transient
            //so the current selection set is still the same
            if (persist === 1 && this.props.onSelectionChange != null)
                this.props.onSelectionChange(res);
        });
    }
    private zoomByDelta(delta) {
        const view = this._map.getView();
        if (!view) {
            return;
        }
        const currentResolution = view.getResolution();
        if (currentResolution) {
            this._map.beforeRender(ol.animation.zoom({
                resolution: currentResolution,
                duration: 250,
                easing: ol.easing.easeOut
            }));
            const newResolution = view.constrainResolution(currentResolution, delta);
            view.setResolution(newResolution);
        }
    }
    private updateScale(scale) {
        const view = this.getView();
        this.pushView({ x: view.x, y: view.y, scale: scale });
    }
    private getTileUrlFunctionForGroup(resourceId, groupName, zOrigin) {
        const urlTemplate = this.context.getClient().getTileTemplateUrl(resourceId, groupName, '{x}', '{y}', '{z}');
        return function (tileCoord) {
            return urlTemplate
                .replace('{z}', (zOrigin - tileCoord[0]).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        };
    }
    private _activeDrawInteraction: ol.interaction.Draw;
    private removeActiveDrawInteraction() {
        if (this._activeDrawInteraction != null) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
        }
    }
    private pushDrawInteraction<T extends ol.geom.Geometry>(draw: ol.interaction.Draw, handler: DigitizerCallback<T>): void {
        this.removeActiveDrawInteraction();
        this._activeDrawInteraction = draw;
        this._activeDrawInteraction.once("drawend", (e) => {
            const drawnFeature: ol.Feature = e.feature;
            const geom: T = drawnFeature.getGeometry() as T;
            this.removeActiveDrawInteraction();
            handler(geom);
        })
        this._map.addInteraction(this._activeDrawInteraction);
    }
    // ----------------- React Lifecycle ----------------- //
    componentWillReceiveProps(nextProps) {
        /**
         * React (no pun intended) to the following prop changes:
         * 
         * - Container size changes (call ol.Map.updateSize())
         * - Visiblity change of external base layers
         */
        const props: any = this.props;
        if ((nextProps.containerWidth != props.containerWidth ||
            nextProps.containerHeight != props.containerHeight) &&
            this._map != null) {
            setTimeout(() => this._map.updateSize(), 300);
        }
        if (nextProps.imageFormat != props.imageFormat) {
            console.warn(`Unsupported change of props: imageFormat`);
        }
        if (nextProps.agentUri != props.agentUri) {
            console.warn(`Unsupported change of props: agentUri`);
        }
        if (nextProps.externalBaseLayers != null && 
            nextProps.externalBaseLayers.length > 0 &&
            this._baseLayerGroup != null) {
            const layers = this._baseLayerGroup.getLayers();
            layers.forEach((l: ol.layer.Base) => {
                const match = nextProps.externalBaseLayers.filter(el => el.name === l.get("title"));
                if (match.length == 1) {
                    l.setVisible(match[0].visible);
                } else {
                    l.setVisible(false);
                }
            })
        }
    }
    componentDidMount() {
        const { map, agentUri, imageFormat } = this.props;
        const mapNode = ReactDOM.findDOMNode(this);
        const layers = [];
        this._extent = [
            map.Extents.LowerLeftCoordinate.X,
            map.Extents.LowerLeftCoordinate.Y,
            map.Extents.UpperRightCoordinate.X,
            map.Extents.UpperRightCoordinate.Y
        ];
        const finiteScales = [];
        if (map.FiniteDisplayScale) {
            for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) {
                finiteScales.push(map.FiniteDisplayScale[i]);
            }
        }

        //If a tile set definition is defined it takes precedence over the map definition, this enables
        //this example to work with older releases of MapGuide where no such resource type exists.
        const resourceId = map.TileSetDefinition || map.MapDefinition;
        //On MGOS 2.6 or older, tile width/height is never returned, so default to 300x300
        const tileWidth = map.TileWidth || 300;
        const tileHeight = map.TileHeight || 300;
        const metersPerUnit = map.CoordinateSystem.MetersPerUnit;
        this._dpi = map.DisplayDpi;
        let projection = null;
        const zOrigin = finiteScales.length - 1;
        this._inPerUnit = 39.37 * metersPerUnit;
        const resolutions = new Array(finiteScales.length);
        for (let i = 0; i < finiteScales.length; ++i) {
            resolutions[i] = this.scaleToResolution(finiteScales[i]);
        }

        if (map.CoordinateSystem.EpsgCode.length > 0) {
            projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }

        const tileGrid = new ol.tilegrid.TileGrid({
            origin: ol.extent.getTopLeft(this._extent),
            resolutions: resolutions,
            tileSize: [tileWidth, tileHeight]
        });

        const groupLayers = [];
        for (let i = 0; i < map.Group.length; i++) {
            const group = map.Group[i];
            if (group.Type != 2 && group.Type != 3) { //BaseMap or LinkedTileSet
                continue;
            }
            groupLayers.push(
                new ol.layer.Tile({
                    //name: group.Name,
                    source: new ol.source.TileImage({
                        tileGrid: tileGrid,
                        projection: projection,
                        tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
                        wrapX: false
                    })
                })
            );
        }

        /*
        if (groupLayers.length > 0) {
            groupLayers.push( 
                new ol.layer.Tile({
                    source: new ol.source.TileDebug({
                        tileGrid: tileGrid,
                        projection: projection,
                        tileUrlFunction: function(tileCoord) {
                            return urlTemplate.replace('{z}', (zOrigin - tileCoord[0]).toString())
                                .replace('{x}', tileCoord[1].toString())
                                .replace('{y}', (-tileCoord[2] - 1).toString());
                        },
                        wrapX: false
                    })
                })
            );
        }
        */

        this._overlay = new ol.layer.Image({
            //name: "MapGuide Dynamic Overlay",
            extent: this._extent,
            source: new ol.source.ImageMapGuide({
                projection: projection,
                url: agentUri,
                useOverlay: true,
                metersPerUnit: metersPerUnit,
                params: {
                    MAPNAME: map.Name,
                    FORMAT: 'PNG',
                    SESSION: map.SessionId,
                    BEHAVIOR: 2
                },
                ratio: 2
            })
        });
        this._selectionOverlay = new ol.layer.Image({
            //name: "MapGuide Dynamic Overlay",
            extent: this._extent,
            source: new ol.source.ImageMapGuide({
                projection: projection,
                url: agentUri,
                useOverlay: true,
                metersPerUnit: metersPerUnit,
                params: {
                    MAPNAME: map.Name,
                    FORMAT: 'PNG',
                    SESSION: map.SessionId,
                    BEHAVIOR: 1 | 4 //selected features + include outside current scale
                },
                ratio: 2
            })
        });

        if (this.props.externalBaseLayers != null) {
            const groupOpts: any = {
                title: "External Base Layers",
                layers: this.props.externalBaseLayers.map(ext => {
                    const options: any = {
                        title: ext.name,
                        type: "base",
                        visible: ext.visible === true,
                        source: this.createExternalSource(ext)
                    };
                    return new ol.layer.Tile(options)
                })
            };
            this._baseLayerGroup = new ol.layer.Group(groupOpts);
            layers.push(this._baseLayerGroup);
        }

        for (let i = groupLayers.length - 1; i >= 0; i--) {
            layers.push(groupLayers[i]);
        }
        layers.push(this._overlay);
        layers.push(this._selectionOverlay);
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get("name"));
        }
        */
        let view: ol.View = null;
        if (resolutions.length == 0) {
            view = new ol.View({
                projection: projection
            });
        } else {
            view = new ol.View({
                projection: projection,
                resolutions: resolutions
            });
        }

        this._zoomSelectBox = new ol.interaction.DragBox({
            condition: (e) => this.getActiveTool() === ActiveMapTool.Select || this.getActiveTool() === ActiveMapTool.Zoom
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));

        this._map = new ol.Map({
            target: mapNode,
            layers: layers,
            view: view,
            controls: [
                new ol.control.Attribution()
            ],
            interactions: [
                new ol.interaction.DragRotate(),
                new ol.interaction.DragPan({
                    condition: (e) => this.getActiveTool() === ActiveMapTool.Pan
                }),
                new ol.interaction.PinchRotate(),
                new ol.interaction.PinchZoom(),
                new ol.interaction.KeyboardPan(),
                new ol.interaction.KeyboardZoom(),
                new ol.interaction.MouseWheelZoom(),
                this._zoomSelectBox
            ]
        });
        view.fit(this._extent, this._map.getSize());
        //Set initial view
        const center = view.getCenter();
        this._initialView = { x: center[0], y: center[1], scale: this.resolutionToScale(view.getResolution()) };
        this.setState({ navigationStack: [this._initialView] });
        if (this.props.onViewChanged != null) {
            this.props.onViewChanged(this._initialView);
        }
        //Listen for scale changes

        this._overlay.getSource().on("imageloadend", (e) => {
            const newScale = this.resolutionToScale(view.getResolution());
            const newCenter = view.getCenter();
            this.pushView({ x: newCenter[0], y: newCenter[1], scale: newScale });
        });

        this._map.on("click", this.onMapClick.bind(this));
        /*
        view.on("change:resolution", (e) => {
            const newScale = view.getResolution() * dpi * inPerUnit;
            this.updateScale(newScale);
        });
        view.on("change:center", (e) => {
            const newScale = view.getResolution() * dpi * inPerUnit;
            const newCenter = view.getCenter();
            this.pushView({ x: newCenter[0], y: newCenter[1], scale: newScale });
        });
        */
    }
    render(): JSX.Element {
        return <div style={{ width: "100%", height: "100%" }} />;
    }
    componentWillUnmount() {

    }
    //-------- IMapViewerContext ---------//
    public getView(): IMapView {
        const stack = this.state.navigationStack;
        if (stack && stack.length > 0) {
            return stack[stack.length - 1];
        } else {
            return null;
        }
    }
    public pushView(view: IMapView): void {
        const currentView = this.getView();
        //Short-circuit: Don't bother recording identical or insignificantly different views
        if (currentView != null &&
            areNumbersEqual(view.x, currentView.x) &&
            areNumbersEqual(view.y, currentView.y) &&
            areNumbersEqual(view.scale, currentView.scale)) {
            logger.debug(`New view (${view.x}, ${view.y}, ${view.scale}) is same or near-identical to previous view (${currentView.x}, ${currentView.y}, ${currentView.scale}). Not pushing to nav stack`);
            return;
        }
        const state = this.state;
        state.navigationStack.push(view);
        this.setState(state);
        if (this.props.onViewChanged != null) {
            this.props.onViewChanged(view);
        }
    }
    public popView(): IMapView {
        const state = this.state;
        const view = state.navigationStack.pop();
        this.setState(state);
        return view;
    }
    public setLayerVisibility(layerId: string, visible: boolean): void {
        const changes = this.state.pendingStateChanges;
        if (visible) {
            //Remove from hidelayers if previously set
            changes.hideLayers = changes.hideLayers.filter(id => id != layerId);
            changes.showLayers.push(layerId);
        } else {
            //Remove from showlayers if previously set
            changes.showLayers = changes.showLayers.filter(id => id != layerId);
            changes.hideLayers.push(layerId);
        }
        this.setState({ pendingStateChanges: changes });
        this.refreshOnStateChange();
    }
    public setGroupVisibility(groupId: string, visible: boolean): void {
        const changes = this.state.pendingStateChanges;
        if (visible) {
            //Remove from hideGroups if previously set
            changes.hideGroups = changes.hideGroups.filter(id => id != groupId);
            changes.showGroups.push(groupId);
        } else {
            //Remove from showGroups if previously set
            changes.showGroups = changes.showGroups.filter(id => id != groupId);
            changes.hideGroups.push(groupId);
        }
        this.setState({ pendingStateChanges: changes });
        this.refreshOnStateChange();
    }
    public zoomToView(x: number, y: number, scale: number): void {
        if (this._map) {
            const view = this._map.getView();
            view.setCenter([x, y]);
            view.setResolution(this.scaleToResolution(scale));
        }
    }
    public setSelectionXml(xml: string): void {
        const reqQueryFeatures = 1 | 2; //Attributes and inline selection
        const client = this.context.getClient();
        client.queryMapFeatures({
            mapname: this.context.getMapName(),
            session: this.context.getSession(),
            persist: 1,
            featurefilter: xml,
            selectioncolor: "0xFF000000",
            selectionformat: "PNG8",
            maxfeatures: -1,
            requestdata: reqQueryFeatures
        }).then(res => {
            this.refreshMap(RefreshMode.SelectionOnly);
            if (this.props.onSelectionChange != null)
                this.props.onSelectionChange(res);
        })
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) {
            const imgSource = this._overlay.getSource() as ol.source.ImageMapGuide;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
        if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) {
            const imgSource = this._selectionOverlay.getSource() as ol.source.ImageMapGuide;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
    }
    public getMetersPerUnit(): number {
        return this._inPerUnit / 39.37;
    }
    public getActiveTool(): ActiveMapTool {
        return this.state.tool;
    }
    public setActiveTool(tool: ActiveMapTool): void {
        this.setState({ tool: tool });
    }
    public initialView(): void {
        this.zoomToExtent(this._extent);
    }
    public clearSelection(): void {
        this.setSelectionXml("");
    }
    public zoomDelta(delta: number): void {
        this.zoomByDelta(delta);
    }
    public zoomToExtent(extent: number[]) {
        this._map.getView().fit(extent, this._map.getSize());
    }
    public isDigitizing(): boolean {
        return this._activeDrawInteraction != null;
    }
    public digitizePoint(handler: DigitizerCallback<ol.geom.Point>): void {
        const draw = new ol.interaction.Draw({
            type: "Point"//ol.geom.GeometryType.POINT
        });
        this.pushDrawInteraction(draw, handler);
    }
    public digitizeLine(handler: DigitizerCallback<ol.geom.LineString>): void {
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction(draw, handler);
    }
    public digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>): void {
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2
        });
        this.pushDrawInteraction(draw, handler);
    }
    public digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>): void {
        const draw = new ol.interaction.Draw({
            type: "Circle" //ol.geom.GeometryType.CIRCLE
        });
        this.pushDrawInteraction(draw, handler);
    }
    public digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>): void {
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            maxPoints: 2,
            geometryFunction: (coordinates, geometry) => {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                const start = coordinates[0];
                const end = coordinates[1];
                (geometry as any).setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            }
        });
        this.pushDrawInteraction(draw, handler);
    }
    public digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>): void {
        const draw = new ol.interaction.Draw({
            type: "Polygon" //ol.geom.GeometryType.POLYGON
        });
        this.pushDrawInteraction(draw, handler);
    }
    public selectByGeometry(geom: ol.geom.Geometry): void {
        const selLayerNames = (this.props.onRequestSelectedLayers != null)
            ? this.props.onRequestSelectedLayers()
            : null;
        this.sendSelectionQuery(geom, selLayerNames);
    }
    //------------------------------------//
}