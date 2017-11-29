/**
 * Fusion.Layers
 *
 * $Id: MapGuide.js 1590 2008-10-10 14:01:27Z madair $
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

/**
 * Constant: Fusion.Event.MAP_LAYER_TOGGLED
 */
Fusion.Event.MAP_LAYER_TOGGLED = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.MAP_LAYER_ORDER_CHANGED
 */
Fusion.Event.MAP_LAYER_ORDER_CHANGED = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_LOADED
 */
Fusion.Event.LAYER_LOADED = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_LOADING
 */
Fusion.Event.LAYER_LOADING = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_START_EDIT
 */
Fusion.Event.LAYER_START_EDIT = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_STOP_EDIT
 */
Fusion.Event.LAYER_STOP_EDIT = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_DATA_FILTER
 */
Fusion.Event.LAYER_DATA_FILTER = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_DATA_RELOAD
 */
Fusion.Event.LAYER_DATA_RELOAD = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_DATA_ADD
 */
Fusion.Event.LAYER_DATA_ADD = Fusion.Event.lastEventId++;
/**
 * Constant: Fusion.Event.LAYER_DATA_DELETE
 */
Fusion.Event.LAYER_DATA_DELETE = Fusion.Event.lastEventId++;

/**
 * Class: Fusion.Layers
 * 
 * Implements Layers for Fusion
 * 
 * Inherits from:
 * 
 *  - <Fusion.Lib.EventMgr>
 */
Fusion.Layers = OpenLayers.Class(Fusion.Lib.EventMgr, {
    bSingleTile: null,
    bIsBaseLayer: false,     //TODO: set this in AppDef?
    bDisplayInLegend: true,   //TODO: set this in AppDef?
    bExpandInLegend: true,   //TODO: set this in AppDef?
    bMapLoaded: false,
    bIsMapWidgetLayer: true,  //Set this to false for overview map layers
    bLayersReversed: false,     //MGOS returns layers top-most layer first
    sMapResourceId: null,    //pointer to the resource that defines the map (URL, MapFile, MGOS, etc)
    sImageType: 'png',      //TODO: set this in AppDef?
    clientAgent: 'Fusion Viewer',
    noCache: false,
    _sMapTitle: null,
    _sMapname: null,
    supports: {
      query: false,
      edit: false
    },

    initialize: function(map, mapTag, isMapWidgetLayer) {
        // console.log('Fusion.Layers.initialize');

        this.registerEventID(Fusion.Event.MAP_SELECTION_ON);
        this.registerEventID(Fusion.Event.MAP_SELECTION_OFF);
        this.registerEventID(Fusion.Event.MAP_LOADED);
        this.registerEventID(Fusion.Event.LAYER_LOADED);
        this.registerEventID(Fusion.Event.LAYER_LOADING);
        this.registerEventID(Fusion.Event.MAP_LAYER_ORDER_CHANGED);
        this.registerEventID(Fusion.Event.LAYER_PROPERTY_CHANGED);
        this.registerEventID(Fusion.Event.LAYER_START_EDIT);
        this.registerEventID(Fusion.Event.LAYER_STOP_EDIT);
        this.registerEventID(Fusion.Event.LAYER_DATA_FILTER);
        this.registerEventID(Fusion.Event.LAYER_DATA_RELOAD);
        this.registerEventID(Fusion.Event.LAYER_DATA_ADD);
        this.registerEventID(Fusion.Event.LAYER_DATA_DELETE);
        
        this.mapWidget = map;
        this.oSelection = null;
        if (isMapWidgetLayer != null) {
            this.bIsMapWidgetLayer = isMapWidgetLayer;
        }

        this.mapTag = mapTag;
        if (!this.mapTag.layerOptions) {
          this.mapTag.layerOptions = {};
        }
        this.ratio = this.mapTag.layerOptions.MapRatio ? this.extension.MapRatio[0] : 1.0;
        this.bSingleTile = mapTag.singleTile; //this is set in thhe AppDef.Map class
        this.bIsBaseLayer = mapTag.isBaseLayer;
        this.sMapResourceId = mapTag.resourceId ? mapTag.resourceId : '';
        this.mapInfo = mapTag.mapInfo;
        this.layerType = mapTag.type;
        this.id = mapTag.id;
    },

    /**
     * Function: loadScaleRanges
     *
     * This function should be called after the map has loaded. It
     * loads the scsle ranges for each layer. I tis for now only
     * used by the legend widget.
     */

    loadScaleRanges: function(userFunc) {
      if (userFunc) userFunc();
    },

    /**
     * Function: getScale
     * 
     * Gets the current scale of the map widget
     * 
     * Returns:
     * 
     *   The current scale of the map widget
     */
    getScale: function() {
        return this.mapWidget.getScale();
    },

    /**
     * Function: getMapName
     * 
     * Gets the map name of the map widget
     * 
     * Returns:
     * 
     *   The map name
     */
    getMapName: function() {
        return this._sMapname;
    },

    /**
     * Function: getMapTitle
     * 
     * Gets the map title of the map widget
     * 
     * Returns:
     * 
     *   the map title
     */
    getMapTitle: function() {
        return this._sMapTitle;
    },
    
    /**
     * Function: getMetadata
     * 
     * Gets the value for the specified metadata property
     * 
     * Parameters:
     * 
     *   key - {String} the metadata property name
     * 
     * Returns:
     * 
     *   The metadata property value
     */
    getMetadata: function(key) {
        if (this.metadata && typeof this.metadata[key] != 'undefined') {
            return this.metadata[key];
        } else {
            return '';
        }
    },

    /**
     * Function: isMapLoaded
     *
     * Returns true if the Map has been laoded succesfully form the server
     */
    isMapLoaded: function() {
        return this.bMapLoaded;
    },

    getMaxExtent: function() {
      var maxExtent = null;
      if (this.oLayerOL) {
        maxExtent = this.oLayerOL.maxExtent;
      }
      return maxExtent;
    },

    hasSelection: function() {
      return this.bSelectionOn;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedFeatureCount: function() {
      var total = 0;
      return total;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedLayers: function() {
      var layers = [];
      return layers;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectableLayers: function() {
      var layers = [];
      return layers;
    },

    setSelection: function (selText, zoomTo) {
    },


   /**
    * Method: getSelection
    * 
    * asynchronously load the current selection.  When the current
    * selection changes, the selection is not loaded because it
    * could be a lengthy process.  The user-supplied function will
    * be called when the selection is available.
    *
    * Parameters:
    *  userFunc - {Function} a function to call when the
    *        selection has loaded
    *  layers - {string} Optional parameter.  A comma separated
    *        list of layer names (Roads,Parcels). If it is not
    *        given, all the layers that have a selection will be used
    *  startcount - {string} Optional parameter.  A comma separated
    *        list of a statinh index and the number of features to be retured for
    *        each layer given in the layers parameter. Index starts at 0
    *        (eg: 0:4,2:6 : return 4 elements for the first layers starting at index 0 and
    *         six elements for layer 2 starting at index 6). If it is not
    *        given, all the elemsnts will be returned.
    */
    getSelection: function(userFunc, layers, startcount) {
    },

    /**
     * Function: clearSelection
     * 
     * Utility function to clear current selection
     */
    clearSelection: function() {
    },

    /**
     * Function: query
     * 
     * Do a query on the map
     * 
     * Parameters:
     * 
     *   options - Query options
     */
    query: function(options) {
    },

    processLayerEvents: function(layer, isEnabling) {
        if (this.mapInfo && this.mapInfo.mapEvents.layerEvents[layer.layerName]) {
            var layerEvent = this.mapInfo.mapEvents.layerEvents[layer.layerName];
            var events = isEnabling ? layerEvent.onEnable : layerEvent.onDisable;
            for (var i=0; i<events.length; i++) {
                var o = events[i];
                if (o.type == 'layer') {
                    var l = this.layerRoot.findLayer(o.name);
                    if (l) {
                        if (o.enable) {
                            l.show(true);
                        } else {
                            l.hide(true);
                        }
                    }

                } else if (o.type == 'group') {
                    var g = this.layerRoot.findGroupByAttribute('groupName', o.name);
                    if (g) {
                        if (o.enable) {
                            g.show(true);
                        } else {
                            g.hide(true);
                        }
                    }
                }
            }
        }
    },

    processGroupEvents: function(group, isEnabling) {
        if (this.mapInfo && this.mapInfo.mapEvents.groupEvents[group.groupName]) {
            var groupEvent = this.mapInfo.mapEvents.groupEvents[group.groupName];
            var events = isEnabling ? groupEvent.onEnable : groupEvent.onDisable;
            for (var i=0; i<events.length; i++) {
                var o = events[i];
                if (o.type == 'layer') {
                    var l = this.layerRoot.findLayer(o.name);
                    if (l) {
                        if (o.enable) {
                            l.show(true);
                        } else {
                            l.hide(true);
                        }
                    }

                } else if (o.type == 'group') {
                    var g = this.layerRoot.findGroupByAttribute('groupName', o.name);
                    if (g) {
                        if (o.enable) {
                            g.show(true);
                        } else {
                            g.hide(true);
                        }
                    }
                }
            }
        }
    },

    refreshLayer: function( layer ) {
        this.drawMap();
    },

    setParameter: function(param, value) {
        if (param == 'SelectionType') {
            this.selectionType = value;
        }
    },

    loadStart: function() {
      if (this.bIsMapWidgetLayer) {
        this.mapWidget._addWorker();
      }
    },

    loadEnd: function() {
      if (this.bIsMapWidgetLayer) {
        this.mapWidget._removeWorker();
      }
    },

    getGroupInfoUrl: function(groupName) {
        if (this.mapInfo) {
            var groups = this.mapInfo.links.groups;
            for (var i=0; i<groups.length; i++) {
                if (groups[i].name == groupName) {
                    return groups[i].url;
                }
            }
        }
        return null;
    },
    getLayerInfoUrl: function(layerName) {
        if (this.mapInfo) {
            var layers = this.mapInfo.links.layers;
            for (var i=0; i<layers.length; i++) {
                if (layers[i].name == layerName) {
                    return layers[i].url;
                }
            }
        }
        return null;
    },
    
    getMapTip: function(mapTipWidget) {},
    
    startEditing: function() { },

    stopEditing: function() { }
});

/**
 * Constant: Fusion.Event.GROUP_PROPERTY_CHANGED
 */
Fusion.Event.GROUP_PROPERTY_CHANGED = Fusion.Event.lastEventId++;

/**
 * Class: Fusion.Layers.Group
 * 
 * Implements the map layer groups
 * 
 * Inherits from:
 * 
 *  - <Fusion.Lib.EventMgr>
 */
Fusion.Layers.Group = OpenLayers.Class(Fusion.Lib.EventMgr, {
    name: null,
    groups: null,
    layers: null,
    oMap: null,
    initialize: function(o, oMap) {
        this.uniqueId = o.uniqueId;
        this.name = o.groupName;
        this.groups = [];
        this.layers = [];
        this.oMap = oMap;
        this.groupName = o.groupName;
        this.legendLabel = o.legendLabel;
        this.parentUniqueId = o.parentUniqueId;
        this.groupType = o.groupType;
        this.displayInLegend = o.displayInLegend;
        this.expandInLegend = o.expandInLegend;
        this.visible = o.visible;
        this.initiallyVisible = o.visible;
        this.actuallyVisible = o.actuallyVisible;
        this.isBaseMapGroup = o.isBaseMapGroup;
        this.registerEventID(Fusion.Event.GROUP_PROPERTY_CHANGED);
    },

    show: function(noDraw) {
        if (this.visible) {
            return;
        }
        this.oMap.showGroup(this, noDraw ? true : false);
        this.set('visible', true);
        if (this.legend && this.legend.treeItem && this.legend.treeItem.checkBox) {
            this.legend.treeItem.checkBox.checked = true;
        }
    },

    hide: function(noDraw) {
        if (!this.visible) {
            return;
        }
        this.oMap.hideGroup(this, noDraw ? true : false);
        this.set('visible', false);
        if (this.legend && this.legend.treeItem && this.legend.treeItem.checkBox) {
            this.legend.treeItem.checkBox.checked = false;
        }
    },

    isVisible: function() {
        return this.visible;
    },

    clear: function() {
        for (var i=0; i<this.groups.length; i++) {
            this.groups[i].clear();
        }
        for (var i=0; i<this.layers.length; i++) {
            this.layers[i].clear();
        }
        this.groups = [];
        this.layers = [];
    },

    set: function(property, value) {
        this[property] = value;
        this.triggerEvent(Fusion.Event.GROUP_PROPERTY_CHANGED, this);
    },

    addGroup: function(group,reverse) {
        group.parentGroup = this;
        if (reverse) {
          this.groups.unshift(group);
        } else {
          this.groups.push(group);
        }
    },

    addLayer: function(layer,reverse) {
        layer.parentGroup = this;
        if (reverse) {
          this.layers.unshift(layer);
        } else {
          this.layers.push(layer);
        }
    },

    findGroup: function(name) {
        return this.findGroupByAttribute('uniqueId', name);
    },

    findGroupByAttribute: function(attribute, value) {
        if (this[attribute] == value) {
            return this;
        }
        for (var i=0; i<this.groups.length; i++) {
            var group = this.groups[i].findGroupByAttribute(attribute, value);
            if (group) {
                return group;
            }
        }
        return null;
    },

    findLayer: function(name) {
        return this.findLayerByAttribute('name', name);
    },

    findLayerByAttribute: function(attribute, value) {
        for (var i=0; i<this.layers.length; i++) {
            if (this.layers[i][attribute] == value) {
                return this.layers[i];
            }
        }
        for (var i=0; i<this.groups.length; i++) {
            var layer = this.groups[i].findLayerByAttribute(attribute,value);
            if (layer) {
                return layer;
            }
        }
        return null;
    },

    deleteLayer: function(uniqueId) {
        for (var i=0; i<this.layers.length; i++) {
            if (this.layers[i]['uniqueId'] == uniqueId) {
                this.layers.splice(i,1);
            }
        }
        for (var i=0; i<this.groups.length; i++) {
            this.groups[i].deleteLayer(uniqueId);
        }
    }

});

/**
 * Constant: Fusion.Event.LAYER_PROPERTY_CHANGED
 */
Fusion.Event.LAYER_PROPERTY_CHANGED = Fusion.Event.lastEventId++;

/**
 * Variable: Fusion.Layers.Layer
 * 
 * Implements individual map legend layers
 */
Fusion.Layers.Layer = OpenLayers.Class(Fusion.Lib.EventMgr, {

    name: null,
    scaleRanges: null,
    oMap: null,

    initialize: function(o, oMap) {
        this.oMap = oMap;
        this.layerName = o.layerName;
        this.uniqueId = o.uniqueId;
        this.resourceId = o.resourceId;
        this.selectedFeatureCount = 0;
        this.layerTypes = [].concat(o.layerTypes);
        this.legendLabel = o.legendLabel;
        this.displayInLegend = o.displayInLegend;
        this.expandInLegend = o.expandInLegend;
        this.actuallyVisible = o.actuallyVisible;
        this.statusDefault = o.statusdefault;
        this.feature = OpenLayers.Util.extend({},o.feature);
        this.attribute = OpenLayers.Util.extend({},o.attribute);
        this.editable = this.feature.create || 
                        this.feature.update || 
                        this.feature.del || 
                        this.attribute.create || 
                        this.attribute.update || 
                        this.attribute.del;
        this.isEditing = false;
        this.visible = o.visible;
        this.initiallyVisible = o.visible;
        this.selectable = o.selectable;
        this.metadata = o.metadata?o.metadata:{};
        this.isBaseMapLayer = o.isBaseMapLayer;

        //determine the layer type so that the correct icon can be displayed in the legend
        this.layerType = null;
        if (this.supportsType(Fusion.Constant.LAYER_RASTER_TYPE)) {   //raster layers
          this.layerType = Fusion.Constant.LAYER_RASTER_TYPE;
        } else if (this.supportsType(Fusion.Constant.LAYER_DWF_TYPE)) {  //DWF layers
          this.layerType = Fusion.Constant.LAYER_DWF_TYPE;
        }

        this.parentGroup = o.parentGroup;
        this.minScale = o.minScale;
        this.maxScale = o.maxScale;
        if (this.maxScale == 'infinity') {
          this.maxScale = 1000000000000;
        }
        this.scaleRanges = [];

        if (o.scaleRanges)
        {
          for (var i=0; i<o.scaleRanges.length; i++) {
            var scaleRange = new Fusion.Layers.ScaleRange(o.scaleRanges[i],
                                                                 this.layerType);
            this.scaleRanges.push(scaleRange);
          }
        }

        //this.registerEventID(Fusion.Event.LAYER_PROPERTY_CHANGED);
    },

    supportsType: function(type) {
        for (var i=0; i<this.layerTypes.length; i++) {
            if (this.layerTypes[i] == type) {
                return true;
            }
        }
        return false;
    },

    getScaleRange: function(fScale) {
        for (var i=0; i<this.scaleRanges.length; i++) {
            if (this.scaleRanges[i].contains(fScale)) {
                return this.scaleRanges[i];
            }
        }
        return null;
    },

    show: function(noDraw) {
        if (this.visible) {
            return;
        }
        this.set('visible', true);
        this.oMap.showLayer(this, noDraw ? true : false);
        if (this.legend && this.legend.treeItem && this.legend.treeItem.checkBox) { 
            this.legend.treeItem.checkBox.checked = true;
        }
    },

    hide: function(noDraw) {
        if (!this.visible) {
            return;
        }
        this.set('visible',false);
        this.oMap.hideLayer(this, noDraw ? true : false);
        if (this.legend && this.legend.treeItem && this.legend.treeItem.checkBox) { 
            this.legend.treeItem.checkBox.checked = false;
        }
    },

    isVisible: function() {
        return this.visible;
    },

    clear: function() {},

    set: function(property, value) {
        this[property] = value;
        this.oMap.triggerEvent(Fusion.Event.LAYER_PROPERTY_CHANGED, this);
    },
    
    startEditing: function() {
      if (this.oMap.supports.edit && this.editable && !this.isEditing) {
        this.isEditing = true;
        this.oMap.triggerEvent(Fusion.Event.LAYER_START_EDIT, this);
      }
    },
    
    stopEditing: function() {
      if (this.oMap.supports.edit && this.editable && this.isEditing) {
        this.isEditing = false;
        this.oMap.triggerEvent(Fusion.Event.LAYER_STOP_EDIT, this);
      }
    },
    
    hasWFSConnection: function() {
      return this.metadata['wfs_onlineresource'] != undefined && 
             this.metadata.wfs_onlineresource != '';
    },
    
    getWFSConnection: function(callback) {
      var that = this;
      if (this.hasWFSConnection()) {
        if (!this.wfsConnection) {
          var version = this.metadata['wfs_version'] || '1.1.0';
          var typeName = this.metadata['wfs_typename'] || this.name;
          
          OpenLayers.Request.GET({
            url: this.metadata.wfs_onlineresource,
            params: {
              service: 'WFS',
              version: version,
              request: 'GetCapabilities'
            },
            callback: function(gc_response) {
              var gc_parser = new OpenLayers.Format.WFSCapabilities();
              var capabilities = gc_parser.read(gc_response.responseText);
              OpenLayers.Request.GET({
                url: that.metadata.wfs_onlineresource,
                params: {
                  service: 'WFS',
                  version: version,
                  request: 'DescribeFeatureType',
                  typename: typeName
                },
                callback: function(dft_response) {
                  if (dft_response.status == 200) {
                    var dft_parser = new OpenLayers.Format.WFSDescribeFeatureType();
                    var xml = dft_parser.read(dft_response.responseText);
                    if (xml.featureTypes.length) {
                      var props = xml.featureTypes[0].properties;
                      that.metadata.wfs_properties = props;
                      if (!that.metadata['wfs_geometry']) {
                        for (var i=0; i<props.length; i++) {
                          var prop = props[i];
                          if (prop.localType == 'GeometryPropertyType') {
                            that.metadata.wfs_geometry = prop.name;
                            that.metadata.wfs_geometrytype = prop.type;
                            break;
                          }
                        }
                      }
                      that.wfsConnection = new OpenLayers.Protocol.WFS({
                        url: that.metadata.wfs_onlineresource,
                        version: version,
                        featureType: typeName,
                        geometryName: that.metadata.wfs_geometry,
                        srsName: that.oMap.oLayerOL.projection ? that.oMap.oLayerOL.projection.getCode() : '4326'
                      });
                    }
                  }
                  if (callback) {
                    callback.apply(null, [that.wfsConnection]);
                  }
                }
              });
            }
          });
          
          // this.wfsConnection = new OpenLayers.Protocol.WFS({
          //   version: version,
          //   featureType: typeName
          // });
        } else if (callback) {
          callback.apply(null, [this.wfsConnection]);
        }
      }
    }
});

/**
 * Class: Fusion.Layers.ScaleRange
 * 
 * Implements a scale range object
 */
Fusion.Layers.ScaleRange = OpenLayers.Class({
    styles: null,
    initialize: function(o, layerType, iconOpt) {
        this.minScale = o.minScale;
        this.maxScale = o.maxScale;
        this.isCompressed = o.isCompressed;
        if (this.maxScale == 'infinity' || this.maxScale == 'auto') {
          this.maxScale = Infinity;
        }
        this.styles = [];
        if (!o.styles) {
          var styleItem = new Fusion.Layers.StyleItem({legendLabel:iconOpt.label}, layerType, iconOpt);
          this.styles.push(styleItem);
          return;
        }
        var staticIcon = o.styles.length>1 ? false : layerType;
        for (var i=0; i<o.styles.length; i++) {
            var styleItem = new Fusion.Layers.StyleItem(o.styles[i], staticIcon, iconOpt);
            if (o.styles[i].imageData)
            {
                styleItem.iconOpt = {
                    url: o.styles[i].imageData,
                    width: iconOpt.width,
                    height: iconOpt.height
                };
            }
            this.styles.push(styleItem);
        }
    },
    contains: function(fScale) {
        var testScale = Math.round(fScale);
        return testScale >= this.minScale && testScale <= this.maxScale;
    }
});

/**
 * Class: Fusion.Layers.StyleItem
 * 
 * Implements the legend style items to get a legend icon from the server
 */
Fusion.Layers.StyleItem = OpenLayers.Class({
    clientAgent: 'Fusion Viewer',
    initialize: function(o, staticIcon, iconOpt) {
        this.iconOpt = iconOpt;
        this.iconX = o.icon_x || 0;
        this.iconY = o.icon_y || 0;
        this.legendLabel = o.legendLabel;
        this.filter = o.filter;
        this.geometryType = o.geometryType;
        if (this.geometryType == '') {
            this.geometryType = -1;
        }
        this.categoryIndex = o.categoryIndex;
        if (this.categoryindex == '') {
            this.categoryindex = -1;
        }
        this.index = o.index; //TODO: merge this with categoryIndex?
        this.staticIcon = staticIcon;
    }
});
