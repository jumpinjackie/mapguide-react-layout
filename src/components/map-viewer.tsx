import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from "openlayers";
import * as Contracts from '../api/contracts';
import Dimensions = require("react-dimensions");

export interface IMapViewerProps {
    map: Contracts.RtMap.RuntimeMap;
    agentUri: string;
    imageFormat: "PNG" | "PNG8" | "JPG" | "GIF";
}

class MapViewerBase extends React.Component<IMapViewerProps, any> {
    private _map: ol.Map;
    constructor(props) {
        super(props);
        this._map = null;
    }
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
            projection = "EPSG:" + map.CoordinateSystem.EpsgCode;
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
        
        const overlay = new ol.layer.Image({
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
        layers.push(overlay);
        /*
        console.log("Draw Order:");
        for (var i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get("name"));
        }
        */
        var view = null;
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
        view.on("change:resolution", (e) => {
            this.updateScale(view.getResolution() * dpi * inPerUnit);
        });
        this.updateScale(view.getResolution() * dpi * inPerUnit);
    }
    updateScale(scale) {
        console.log(`Scale: ${scale}`);
    }
    componentWillUnmount() {
        
    }
    private getTileUrlFunctionForGroup(resourceId, groupName, zOrigin) {
        const urlTemplate = `${this.props.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL={x}&TILEROW={y}&SCALEINDEX={z}`;
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
}

export const MapViewer = Dimensions<IMapViewerProps>({elementResize: true, className: 'react-dimensions-wrapper'})(MapViewerBase);