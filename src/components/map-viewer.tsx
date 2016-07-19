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
import Dimensions = require("react-dimensions");
import debounce = require("lodash.debounce");
import { areNumbersEqual } from '../utils/number';
import * as logger from '../utils/logger';

export interface IMapViewerProps {
    map: Contracts.RtMap.RuntimeMap;
    agentUri: string;
    imageFormat: "PNG" | "PNG8" | "JPG" | "GIF";
    stateChangeDebounceTimeout?: number;
    onViewChanged?: (view: IMapView) => void;
}

export interface IMapViewer extends IMapViewerContext {

}

class MapViewerBase extends React.Component<IMapViewerProps, any> 
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
     * The initial map view
     * 
     * @private
     * @type {IMapView}
     */
    private _initialView: IMapView;
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
    }
    buildInitialState(props: IMapViewerProps) {
        const layerMap: any = {};
        const groupMap: any = {};
        for (const layer of props.map.Layer) {
            layerMap[layer.ObjectId] = layer;
        }
        for (const group of props.map.Group) {
            groupMap[group.ObjectId] = group;
        }
        return {
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
    componentWillReceiveProps(nextProps) {
        /**
         * React (no pun intended) to the following prop changes:
         * 
         * - Container size changes (call ol.Map.updateSize())
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
    }
    componentDidMount() {
        const { map, agentUri, imageFormat } = this.props;
        const mapNode = ReactDOM.findDOMNode(this);
        const layers = [];
        const extent = [
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
        const dpi = map.DisplayDpi;
        let projection = null;
        const zOrigin = finiteScales.length - 1;
        const inPerUnit = 39.37 * metersPerUnit;
        const resolutions = new Array(finiteScales.length);
        for (let i = 0; i < finiteScales.length; ++i) {
            resolutions[i] = finiteScales[i] / inPerUnit / dpi;
        }
        
        if (map.CoordinateSystem.EpsgCode.length > 0) {
            projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }
        
        const tileGrid = new ol.tilegrid.TileGrid({
            origin: ol.extent.getTopLeft(extent),
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
            extent: extent,
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
        
        for (var i = groupLayers.length - 1; i >= 0; i--) {
            layers.push(groupLayers[i]);
        }
        layers.push(this._overlay);
        /*
        console.log("Draw Order:");
        for (var i = 0; i < layers.length; i++) {
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
        this._map = new ol.Map({
            target: mapNode,
            layers: layers,
            view: view
        });
        view.fit(extent, this._map.getSize());
        //Set initial view
        const center = view.getCenter();
        this._initialView = { x: center[0], y: center[1], scale: view.getResolution() * dpi * inPerUnit };
        this.setState({ navigationStack: [ this._initialView ] });
        if (this.props.onViewChanged != null) {
            this.props.onViewChanged(this._initialView);
        }
        //Listen for scale changes

        this._overlay.getSource().on("imageloadend", (e) => {
            const newScale = view.getResolution() * dpi * inPerUnit;
            const newCenter = view.getCenter();
            this.pushView({ x: newCenter[0], y: newCenter[1], scale: newScale });
        });
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
    updateScale(scale) {
        const view = this.getView();
        this.pushView({ x: view.x, y: view.y, scale: scale });
    }
    componentWillUnmount() {
        
    }
    private getTileUrlFunctionForGroup(resourceId, groupName, zOrigin) {
        const urlTemplate = this.context.getClient().getTileTemplateUrl(resourceId, groupName, '{x}', '{y}', '{z}');
        return function(tileCoord) {
            return urlTemplate
                .replace('{z}', (zOrigin - tileCoord[0]).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        };
    }
    render(): JSX.Element {
        const props: any = this.props;
        return <div style={{ width: props.containerWidth, height: props.containerHeight }} />;
    }
    //-------- IMapViewerContext ---------//
    getView(): IMapView {
        const stack = this.state.navigationStack;
        if (stack && stack.length > 0) {
            return stack[stack.length - 1];
        } else {
            return null;
        }
    }
    pushView(view: IMapView): void {
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
    popView(): IMapView {
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
    //------------------------------------//
}

export const MapViewer = Dimensions<IMapViewerProps>({elementResize: true, className: 'react-dimensions-wrapper'})(MapViewerBase);