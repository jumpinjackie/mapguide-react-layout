/**
 * Fusion.Layers.Generic
 *
 * $Id: Generic.js 1590 2008-10-10 14:01:27Z madair $
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/***************************************************************************
* Class: Fusion.Layers.Generic
*
* Implements the map layer for Generic mapping services.
*/

Fusion.Layers.Generic = OpenLayers.Class(Fusion.Layers, {
    arch: 'Generic',
    sActiveLayer: null,
    selectionType: 'INTERSECTS',
    bSelectionOn: false,
    oSelection: null,
    
    initialize: function(map, mapTag, isMapWidgetLayer) {
        // console.log('Generic.initialize');
        Fusion.Layers.prototype.initialize.apply(this, arguments);
        this.registerEventID(Fusion.Event.MAP_SESSION_CREATED);
        
        if (mapTag.extension.LayerType) {
          this.layerType = mapTag.extension.LayerType[0];
        }

        this._sMapname = mapTag.layerOptions['name'] ? mapTag.layerOptions['name'] : 'generic layer';
        this._sMapTitle = this._sMapname;
        
        this.bSingleTile = mapTag.singleTile;
        
        this.minScale = mapTag.layerOptions.minScale ? mapTag.layerOptions.minScale : 1;
        this.maxScale = mapTag.layerOptions.maxScale ? mapTag.layerOptions.maxScale : 'auto';
        if (isMapWidgetLayer) {
            this.loadMap(this.sMapResourceId);            
        }
    },

    loadMap: function(resourceId) {
        this.bMapLoaded = false;

        this.triggerEvent(Fusion.Event.LAYER_LOADING);
        
        this.internalLoadMap(resourceId);
        
        //this.triggerEvent(Fusion.Event.LAYER_LOADED);
        window.setTimeout(OpenLayers.Function.bind(this.asyncTrigger, this),1);
    },

    internalLoadMap: function(resourceId) {
        if (this.bIsMapWidgetLayer) {
          this.mapWidget._addWorker();
        }
        
        //remove this layer if it was already created
        if (this.oLayerOL) {
            this.oLayerOL.events.unregister("loadstart", this, this.loadStart);
            this.oLayerOL.events.unregister("loadend", this, this.loadEnd);
            this.oLayerOL.events.unregister("loadcancel", this, this.loadEnd);
            this.oLayerOL.destroy();
            this.oLayerOL = null;
        }
        
        if (typeof this.mapTag.layerOptions.sphericalMercator == 'undefined') {
            this.mapTag.layerOptions.sphericalMercator = true;
        }
        if (this.mapTag.layerOptions.sphericalMercator) {
          if (!this.mapTag.layerOptions.maxExtent) {
              this.mapTag.layerOptions.maxExtent = new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892);
          }
          this.mapTag.layerOptions.units = "m";
          this.mapTag.layerOptions.projection = "EPSG:900913";
        } else {
          if (!this.mapTag.layerOptions.maxExtent) {
              this.mapTag.layerOptions.maxExtent = new OpenLayers.Bounds(-180,-90,180,90);
          }
          this.mapTag.layerOptions.units = "dd";
          this.mapTag.layerOptions.projection = "EPSG:4326";
        }
        if (typeof this.mapTag.layerOptions.numZoomLevels == 'undefined') {
            this.mapTag.layerOptions.numZoomLevels = 20;
        }
    

        switch (this.layerType) {
          case 'Google':
            switch (this.mapTag.layerOptions.type) {   //Google layer types are actual objects
              case 'G_PHYSICAL_MAP':              //defined by gmap, not a string
              case 'TERRAIN':
                this.mapTag.layerOptions.type = google.maps.MapTypeId.TERRAIN;
                break;
              case 'G_HYBRID_MAP':
              case 'HYBRID':
                this.mapTag.layerOptions.type = google.maps.MapTypeId.HYBRID;
                break;
              case 'G_SATELLITE_MAP':
              case 'SATELLITE':
                this.mapTag.layerOptions.type = google.maps.MapTypeId.SATELLITE;
                break;
              case 'G_NORMAL_MAP':
              case 'ROADMAP':
                this.mapTag.layerOptions.type = google.maps.MapTypeId.ROADMAP;
              default:
                // For the re-loaded Google layers
                if(this.mapTag.layerOptions.type == google.maps.MapTypeId.TERRAIN)
                  this.mapTag.layerOptions.type = google.maps.MapTypeId.TERRAIN;
                else if(this.mapTag.layerOptions.type == google.maps.MapTypeId.HYBRID)
                  this.mapTag.layerOptions.type = google.maps.MapTypeId.HYBRID;
                else if(this.mapTag.layerOptions.type == google.maps.MapTypeId.SATELLITE)
                  this.mapTag.layerOptions.type = google.maps.MapTypeId.SATELLITE;
                else 
                  this.mapTag.layerOptions.type = google.maps.MapTypeId.ROADMAP;
                break;
            }
            break;
         case 'VirtualEarth':
             this.mapTag.layerOptions.animationEnabled = false;
             switch (this.mapTag.layerOptions.type) {   //VE layer types are enumerated values
               case 'Aerial':              //defined in VEMapStyle from the VE api
               case 'a':
                 this.mapTag.layerOptions.type = VEMapStyle.Aerial;
                 break;
               case 'Shaded':
               case 's':
                 this.mapTag.layerOptions.type = VEMapStyle.Shaded;
                 break;
               case 'Hybrid':
               case 'h':
                 this.mapTag.layerOptions.type = VEMapStyle.Hybrid;
                 break;
               default:
                 this.mapTag.layerOptions.type = VEMapStyle.Road;
                 break;
             }
             break;
         case 'Yahoo':
            switch (this.mapTag.layerOptions.type) {   //Yahoo is similar to google
              case 'YAHOO_MAP_SAT':              //defined by YMap, not a string
              case 'YAHOO_SAT':
                this.mapTag.layerOptions.type = YAHOO_MAP_SAT;
                break;
              case 'YAHOO_MAP_HYB':
              case 'YAHOO_HYB':
                this.mapTag.layerOptions.type = YAHOO_MAP_HYB;
                break;
              case 'YAHOO_MAP_REG':
              case "YAHOO_REG":
              default:
                this.mapTag.layerOptions.type = YAHOO_MAP_REG;
                break;
            }
            break;
         case 'OpenStreetMap':
         case 'OSM':
            if (this.mapTag.layerOptions.type) {
                this.mapTag.layerOptions.type = this.mapTag.layerOptions.type;
            }
            else {
                this.mapTag.layerOptions.type = 'Mapnik';
            }
            break;
         case 'Stamen':
            this.oLayerOL = new OpenLayers.Layer[this.layerType](this.mapTag.layerOptions.type);
            break;
         case 'XYZ':
            this.oLayerOL = new OpenLayers.Layer[this.layerType](
                                  this.getMapName(), 
                                  this.sMapResourceId, 
                                  this.mapTag.layerOptions );
            break;
          default:
            this.oLayerOL = new OpenLayers.Layer[this.layerType](
                                  this.getMapName(), 
                                  this.sMapResourceId, 
                                  this.mapTag.layerParams, 
                                  this.mapTag.layerOptions );

            break;
        }
       
        if (!this.oLayerOL) {
            if(this.layerType == 'OpenStreetMap' || this.layerType == 'OSM') {
                //Test OSM sub-type before falling back to OpenLayers.Layer.OSM
                if (typeof(OpenLayers.Layer.OSM[this.mapTag.layerOptions.type]) != 'undefined') { 
                    this.oLayerOL = new OpenLayers.Layer.OSM[this.mapTag.layerOptions.type](this.getMapName(), null, this.mapTag.layerOptions );
                } else {
                    this.oLayerOL = new OpenLayers.Layer.OSM(this.getMapName(), null, this.mapTag.layerOptions );
                }
            }
            else {
                this.oLayerOL = new OpenLayers.Layer[this.layerType](this.getMapName(), this.mapTag.layerOptions );
                //fractionalZoom not permitted with tiled base layers regardless
                this.mapWidget.fractionalZoom = false;
                this.mapWidget.oMapOL.setOptions({fractionalZoom: false});
            }
        }
        
        this.oLayerOL.events.register("loadstart", this, this.loadStart);
        this.oLayerOL.events.register("loadend", this, this.loadEnd);
        this.oLayerOL.events.register("loadcancel", this, this.loadEnd);
        
        var parentGroup = null;
        var scaleRange = new Fusion.Layers.ScaleRange({
            minScale: this.minScale,
            maxScale: this.maxScale}, 
            Fusion.Constant.LAYER_RASTER_TYPE,{label:this._sMapname});
        
        rootOpts = {
          layerName: this._sMapname,
          resourceId: this.sMapResourceId,
          selectable: false,
          editable: false,
          layerTypes: [Fusion.Constant.LAYER_RASTER_TYPE],
          minScale: this.minScale,          
          maxScale: this.maxScale,
          scaleRanges: [scaleRange],
          parentGroup: this.mapWidget.layerRoot,
          displayInLegend: this.bDisplayInLegend,
          expandInLegend: this.bExpandInLegend,
          legendLabel: this._sMapname,
          uniqueId: 'layerRoot',
          visible: true,
          actuallyVisible: true
          //TODO: set other opts for group initialization as required
        };
        
        if (this.layerRoot) {
          parentGroup = this.mapWidget.layerRoot;
          var oldLayer = parentGroup.findLayerByAttribute("layerName", this.layerRoot.layerName);
          if (oldLayer)
            parentGroup.deleteLayer(oldLayer.uniqueId);
        }
        this.layerRoot = new Fusion.Layers.Layer(rootOpts,this);
        if (parentGroup) {
          parentGroup.addLayer(this.layerRoot);
        }
        
        //this is to distinguish between a regular map and an overview map
        if (this.bIsMapWidgetLayer) {
          this.mapWidget.addMap(this);
          this.mapWidget._removeWorker();
        }
    },
    
    asyncTrigger: function() {
        this.aLayers = new Array();
        this.aLayers[0] = new Fusion.Layers.Layer({
          layerName: this.getMapName(),
          legendLabel: this.getMapName(),
          displayInLegend: true,
          expandInLegend: true,
          actuallyVisible: true,
          visible: true,
          initiallyVisible: true,
          selectable: false
        }, this);
        this.bMapLoaded = true;
        this.triggerEvent(Fusion.Event.LAYER_LOADED);
    },
    
    //TBD: this function not yet converted for OL    
    reloadMap: function() {
        this.bMapLoaded = false;
        
        this.internalLoadMap(this.sResourceId);
        this.mapWidget.triggerEvent(Fusion.Event.MAP_RELOADED);
        this.drawMap();
        
        this.bMapLoaded = true;
    },
    
    drawMap: function() {
        if (!this.bMapLoaded) {
            return;
        }
        this.oLayerOL.mergeNewParams(params);
    },

    showLayer: function( layer, noDraw ) {
        this.processLayerEvents(layer, true);
        if (!noDraw) {
            this.oLayerOL.setVisibility(true);
        }
    },
    
    hideLayer: function( layer, noDraw ) {
        this.processLayerEvents(layer, false);
        if (!noDraw) {
            this.oLayerOL.setVisibility(false);
        }
    },
    
    showGroup: function( group, noDraw ) {
        this.processGroupEvents(group, true);
    },
    
    hideGroup: function( group, noDraw ) {
        this.processGroupEvents(group, false);
    },
    
    refreshLayer: function( layer ) {
        this.drawMap();
    },
    
    getLegendImageURL: function(fScale, layer, style,defaultIcon) {
      //var url = null; //TODO: provide a generic icon url 
      return defaultIcon;
    },
    
    getSessionID: function() {
        return '';
    },
    
    getLinkParams: function() {
      var queryParams = {};
      queryParams.layerType = this.layerType; //need this? and one for this.mapTag.layerOptions.type?

      return queryParams;
    }    

});
