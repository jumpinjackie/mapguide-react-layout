/**
 * Fusion.Layers.MapGuide
 *
 * $Id: MapGuide.js 2961 2016-10-06 18:31:15Z jng $
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
* Class: Fusion.Layers.MapGuide
*
* Implements the map widget for MapGuide Open Source services.
*/

Fusion.Layers.MapGuide = OpenLayers.Class(Fusion.Layers, {
    arch: 'MapGuide',
    session: [null],
    aShowLayers: null,
    aHideLayers: null,
    aShowGroups: null,
    aHideGroups: null,
    aRefreshLayers: null,
    sActiveLayer: null,
    selectionType: 'INTERSECTS',
    bSelectionOn: false,
    oSelection: null,
    //Specifies how long to delay a map redraw (in ms) upon a layer/group toggle. 
    //This allows for rapid layer/group toggling without having a redraw made for each individual toggle
    //as long as each toggle is done within the time period defined here. If the delay is 0 or less, the
    //draw is immediate like before.
    drawDelay: 0,
    nCmsScaleTolerance: 2.0,  //When checking the scale list of a tiled map to determine if it is compatible with commercial layers, this value determines how much leeway a given scale can have to be considered equal
    bUsesCommercialLayerScaleList: false,
    //This is the CMS scale list as defined by MG Studio and interpreted by OpenLayers
    aCmsScales: [
        1128.49722, 2256.99444, 4513.98888, 9027.977761000002, 18055.95552,
        36111.91104, 72223.82208999999, 144447.6442, 288895.2884, 577790.5767000001, 
        1155581.153, 2311162.307, 4622324.614, 9244649.227, 18489298.45, 
        36978596.91, 73957193.82, 147914387.6, 295828775.3, 591657550.5
    ],
    defaultTileSize: [300,300],
    bUseNativeServices: false,
    bHasTileSetSupport: false,
    selectionAsOverlay: true,
    useAsyncOverlay: false,
    defaultFormat: 'PNG',
    oLayersOLTile: null,      //a list of baselayers
    oLayerOLDynamic: false,   //a layer object for tiled maps that also contains dynamic layers
    supports: {
      query: true,
      edit: true
    },
    alternateHostNames: null, //a comma-delimited list of alternate host names to use
    jsonParser: null,

    initialize: function(map, mapTag, isMapWidgetLayer) {
        // console.log('MapGuide.initialize');
        Fusion.Layers.prototype.initialize.apply(this, arguments);

        var newTheme = Fusion.getQueryParam('theme');
        if (newTheme != '') {
          this.sMapResourceId = newTheme;
          //clear the query param after it has been used once 
          Fusion.queryParams['theme'] = null;
        }
        this.jsonParser = new OpenLayers.Format.JSON();
        this.registerEventID(Fusion.Event.MAP_SESSION_CREATED);

        this.mapInfo = mapTag.mapInfo;
        this.imageFormat = mapTag.extension.ImageFormat ? mapTag.extension.ImageFormat[0] : this.defaultFormat;
        this.selectionType = mapTag.extension.SelectionType ? mapTag.extension.SelectionType[0] : 'INTERSECTS';
        this.selectionColor = mapTag.extension.SelectionColor ? mapTag.extension.SelectionColor[0] : '';
        this.selectionFormat = mapTag.extension.SelectionFormat ? mapTag.extension.SelectionFormat[0] : 'PNG';
        if (mapTag.extension.SelectionAsOverlay && mapTag.extension.SelectionAsOverlay[0] == 'false') {
          this.selectionAsOverlay = false;
        }
        if (!this.bIsMapWidgetLayer) {
          this.selectionAsOverlay = false;
        }
        
        if (mapTag.extension.DrawDelay) {
          this.drawDelay = parseInt(mapTag.extension.DrawDelay[0]);
          //console.log("Draw delay set to: " + this.drawDelay + "ms");
        }

        //add in the handler for CTRL-click actions for the map, not an overviewmap
        if (this.bIsMapWidgetLayer) {
          var ctrlClickEnabled = true;
          if (mapTag.extension.DisableCtrlClick && mapTag.extension.DisableCtrlClick[0] == 'true') {
              ctrlClickEnabled = false;
          }
          if (ctrlClickEnabled) {
            this.map = this.mapWidget.oMapOL;
            this.handler = new OpenLayers.Handler.Click(this,
                {click: OpenLayers.Function.bind(this.mouseUpCRTLClick, this)},
                {keyMask: OpenLayers.Handler.MOD_CTRL});
            this.handler.activate();
            this.nTolerance = 2; //pixels, default pixel tolernace for a point click; TBD make this configurable
          }
        }
        
        //Store the list of alternate host names
        if (mapTag.layerOptions.AlternateHostNames) {
            this.alternateHostNames = mapTag.layerOptions.AlternateHostNames;
        }
        
        rootOpts = {
          displayInLegend: this.bDisplayInLegend,
          expandInLegend: this.bExpandInLegend,
          legendLabel: this._sMapname,
          uniqueId: 'layerRoot',
          groupName: 'layerRoot',
          visible: true,
          actuallyVisible: true
          //TODO: set other opts for group initialization as required
        };
        this.layerRoot = new Fusion.Layers.Group(rootOpts,this);

        this.keepAliveInterval = parseInt(mapTag.extension.KeepAliveInterval ? mapTag.extension.KeepAliveInterval[0] : 300);
        this.noCache = true;
        this.oLayersOLTile = [];
        
        if (Fusion.siteVersion) {
            this.siteVersion = Fusion.siteVersion;
            this.checkNativeServiceSupport();
        }
        var sid = Fusion.sessionId;
        if (sid) {
            this.session[0] = sid;
            this.mapSessionCreated();
        } else {
            this.createSession();
        }
    },

    createSession: function() {
        if (!this.session[0]) {
            this.session[0] = this;
            var sl = Fusion.getScriptLanguage();
            var scriptURL = 'layers/' + this.arch + '/' + sl + '/CreateSession.' + sl;
            var options = {onSuccess: OpenLayers.Function.bind(this.createSessionCB, this)};
            Fusion.ajaxRequest(scriptURL, options);
        }
        if (this.session[0] instanceof Fusion.Layers.MapGuide) {
            // console.log('register for event');
            this.session[0].registerForEvent(Fusion.Event.MAP_SESSION_CREATED,
                OpenLayers.Function.bind(this.mapSessionCreated, this));
        } else {
            this.mapSessionCreated();
        }
    },

    checkNativeServiceSupport: function() {
        //NOTE: Using native services may cause a slight (but not too much) delay in any requests to PHP scripts 
        //that use layer property mappings as they will be lazy loaded due to us not calling LoadMap.php, which 
        //would've pre-cached such information. but we get much better map init performance
        this.bUseNativeServices = false;
        this.bHasTileSetSupport = false;
        var vMajor = this.siteVersion[0];
        var vMinor = this.siteVersion[1];
        if (vMajor > 2) { // 3.0 or higher
            this.bUseNativeServices = true;
            this.bHasTileSetSupport = true;
        } else {
            if (vMajor == 2) { // 2.x
                if (vMinor >= 6) { // >= 2.6
                    this.bUseNativeServices = true;
                }
            }
        }
    },

    createSessionCB: function(xhr) {
        if (xhr.status == 200) {
            var o = Fusion.parseJSON(xhr.responseText);
            if (o.success === false) {
                Fusion.reportFatalError(o.message);
            } else {
                var version = o.siteVersion;
                var bits = version.split('.');
                this.siteVersion = new Array(parseInt(bits[0]),
                                             parseInt(bits[1]),
                                             parseInt(bits[2]),
                                             parseInt(bits[3])
                );
                this.checkNativeServiceSupport();
                this.session[0] = o.sessionId;
                
                if (!Fusion.siteVersion)
                    Fusion.siteVersion = this.siteVersion;
                if (!Fusion.sessionId)
                    Fusion.sessionId = o.sessionId;
                
                var acceptLang = o.acceptLanguage.split(',');
                //IE - en-ca,en-us;q=0.8,fr;q=0.5,fr-ca;q=0.3
                for (var i=0; i<acceptLang.length; ++i) {
                  var locale = acceptLang[i].split(";");
                  Fusion.initializeLocale(locale[0]);
                  break;
                }
                this.triggerEvent(Fusion.Event.MAP_SESSION_CREATED);
            }
        }
    },

    mapSessionCreated: function() {
        if (this.sMapResourceId != '') {
          var options = {};
          if (this.bIsMapWidgetLayer) {
            var showlayers = Fusion.getQueryParam('showlayers');
            Fusion.queryParams['showlayers'] = null;
            var hidelayers = Fusion.getQueryParam('hidelayers');
            Fusion.queryParams['hidelayers'] = null;
            var showgroups = Fusion.getQueryParam('showgroups');
            Fusion.queryParams['showgroups'] = null;
            var hidegroups = Fusion.getQueryParam('hidegroups');
            Fusion.queryParams['hidegroups'] = null;
            var options = {
              showlayers: showlayers == '' ? [] : showlayers.split(','),
              hidelayers: hidelayers == '' ? [] : hidelayers.split(','),
              showgroups: showgroups == '' ? [] : showgroups.split(','),
              hidegroups: hidegroups == '' ? [] : hidegroups.split(',')
            };
        }
          this.loadMap(this.sMapResourceId, options);
        }
        this.keepAliveTimer = window.setInterval(OpenLayers.Function.bind(this.pingServer, this), this.keepAliveInterval * 1000);
    },

    sessionReady: function() {
        return (typeof this.session[0] == 'string');
    },

    getSessionID: function() {
        return this.session[0];
    },

    calcMapName: function(resourceId, bAppendUniqueId) {
        var slIdx = resourceId.lastIndexOf("/") + 1;
        var dIdx = resourceId.lastIndexOf(".");
        var name = resourceId.substring(slIdx, dIdx);
        if (bAppendUniqueId)
            name += (new Date()).getTime();
        return name;
    },

    loadMap: function(resourceId, options) {
        this.bMapLoaded = false;
        
        if (!this.sessionReady()) {
            this.sMapResourceId = resourceId;
            return;
        }

        this.triggerEvent(Fusion.Event.LAYER_LOADING);
        this.mapWidget._addWorker();

        this._fScale = -1;

        options = options || {};

        this.aShowLayers = options.showlayers || [];
        this.aHideLayers = options.hidelayers || [];
        this.aShowGroups = options.showgroups || [];
        this.aHideGroups = options.hidegroups || [];
        this.aRefreshLayers = options.refreshlayers || [];
        this.aLayers = [];

        this.oSelection = null;
        this.aSelectionCallbacks = [];
        this._bSelectionIsLoading = false;
        
        if (this.bUseNativeServices) {
            var features = (1 | 2 | 4); //We want the whole lot
            var r = new Fusion.Lib.MGRequest.MGCreateRuntimeMap(resourceId, features, 25);
            if (this.bHasTileSetSupport) {
                r.setParams({ version: "3.0.0" });
            }
            var mapName = this.calcMapName(resourceId, true);
            r.setParams({ 
                targetMapName: mapName,
                iconFormat: "GIF"
            });
            if (this.session.length == 1)
                r.setParams({ session: this.session[0] });
            Fusion.oBroker.dispatchRequest(r, OpenLayers.Function.bind(this.onRuntimeMapCreated, this));
        } else {
            var sl = Fusion.getScriptLanguage();
            var loadmapScript = 'layers/' + this.arch + '/' + sl  + '/LoadMap.' + sl;

            var sessionid = this.getSessionID();

            var params = {'mapid': resourceId, "session": sessionid};
            var options = {onSuccess: OpenLayers.Function.bind(this.mapLoaded,this),
                           parameters:params};
            Fusion.ajaxRequest(loadmapScript, options);
        }
    },
    /**
     * Re-shapes the CREATERUNTIMEMAP response to match the structure that our
     * existing initialization code is expecting
     */
    convertResponse: function(o) {
        var rt = o.RuntimeMap;
        
        //LoadMap.php response
        var lm = {
            backgroundColor: ("#" + rt.BackgroundColor[0].substring(2)),
            siteVersion: rt.SiteVersion[0],
            mapId: rt.MapDefinition[0],
            mapName: rt.Name[0],
            mapTitle: rt.Name[0],
            //backgroundColor: rt.BackgroundColor[0],
            metersPerUnit: rt.CoordinateSystem[0].MetersPerUnit ? parseFloat(rt.CoordinateSystem[0].MetersPerUnit[0]) : 1,
            wkt: rt.CoordinateSystem[0].Wkt ? rt.CoordinateSystem[0].Wkt[0] : "",
            epsg: rt.CoordinateSystem[0].EpsgCode ? parseInt(rt.CoordinateSystem[0].EpsgCode[0]) : 4326,
            extent: [
                parseFloat(rt.Extents[0].LowerLeftCoordinate[0].X[0]),
                parseFloat(rt.Extents[0].LowerLeftCoordinate[0].Y[0]),
                parseFloat(rt.Extents[0].UpperRightCoordinate[0].X[0]),
                parseFloat(rt.Extents[0].UpperRightCoordinate[0].Y[0])
            ],
            hasBaseMapLayers: false,
            hasDynamicLayers: false,
            FiniteDisplayScales: [],
            groups: [],
            layers: []
        };
        if (rt.FiniteDisplayScale) {
            for (var i = 0; i < rt.FiniteDisplayScale.length; i++) {
                lm.FiniteDisplayScales.push(parseFloat(rt.FiniteDisplayScale[i]));
            }
        }
        if (rt.Group) {
            for (var i = 0; i < rt.Group.length; i++) {
                var grp = rt.Group[i];
                var cg = {
                    groupName: grp.Name[0],
                    legendLabel: (grp.LegendLabel ? grp.LegendLabel[0] : ""),
                    uniqueId: grp.ObjectId[0],
                    displayInLegend: (grp.DisplayInLegend[0] == "true"),
                    expandInLegend: (grp.ExpandInLegend[0] == "true"), 
                    parentUniqueId: grp.ParentId ? grp.ParentId[0] : "",
                    visible: (grp.Visible[0] == "true"),
                    actuallyVisible: (grp.ActuallyVisible[0] == "true"),
                    isBaseMapGroup: (grp.Type[0] == "2" || grp.Type[0] == "3")
                };
                if (cg.isBaseMapGroup)
                    lm.hasBaseMapLayers = true;
                else
                    lm.hasDynamicLayers = true;
                lm.groups.push(cg);
            }
        }
        //LoadScaleRanges.php response
        var lsr = {
            layers: []
        };
        if (rt.Layer) {
            for (var i = 0; i < rt.Layer.length; i++) {
                var lyr = rt.Layer[i];
                var cl = {
                    uniqueId: lyr.ObjectId[0],
                    layerName: lyr.Name[0],
                    layerTypes: [],
                    resourceId: lyr.LayerDefinition[0],
                    parentGroup: lyr.ParentId ? lyr.ParentId[0] : "",
                    selectable: (lyr.Selectable[0] == "true"),
                    visible: (lyr.Visible[0] == "true"),
                    actuallyVisible: (lyr.ActuallyVisible[0] == "true"),
                    editable: false,
                    isBaseMapLayer: (lyr.Type[0] == "2"),
                    legendLabel: (lyr.LegendLabel ? lyr.LegendLabel[0] : ""),
                    displayInLegend: (lyr.DisplayInLegend[0] == "true"),
                    expandInLegend: (lyr.ExpandInLegend[0] == "true")
                };
                if (lyr.Type[0] != "2" && !lm.hasDynamicLayers)
                    lm.hasDynamicLayers = true;
                lm.layers.push(cl);
                
                var clsr = {
                    uniqueId: cl.uniqueId,
                    scaleRanges: []
                };
                
                var ltypes = {};
                
                var minScale = 1.0e10;
                var maxScale = 0;
                
                if (lyr.ScaleRange) {
                    for (var j = 0; j < lyr.ScaleRange.length; j++) {
                        var sr = lyr.ScaleRange[j];
                        var csr = {
                            isCompressed: false,
                            maxScale: sr.MaxScale[0],
                            minScale: sr.MinScale[0],
                            styles: []
                        };
                        
                        minScale = Math.min(minScale, sr.MinScale[0]);
                        maxScale = Math.max(maxScale, sr.MaxScale[0]);
                        
                        if (sr.FeatureStyle) {
                            for (var f = 0; f < sr.FeatureStyle.length; f++) {
                                var fts = sr.FeatureStyle[f];
                                for (var k = 0; k < fts.Rule.length; k++) {
                                    var rule = fts.Rule[k];
                                    var cr = {
                                        categoryIndex: k,
                                        filter: rule.Filter ? rule.Filter[0] : "",
                                        geometryType: parseInt(fts.Type[0]),
                                        legendLabel: rule.LegendLabel ? rule.LegendLabel[0] : ""
                                    };
                                    if (typeof(ltypes[cr.geometryType]) == 'undefined')
                                        ltypes[cr.geometryType] = cr.geometryType;
                                    //One single absence of an icon is enough to hint that it's compressed
                                    if (!rule.Icon) {
                                        csr.isCompressed = true;
                                    } else {
                                        cr.imageData = "data:" + rt.IconMimeType[0] + ";base64," + rule.Icon[0];
                                    }
                                    csr.styles.push(cr);
                                }
                            }
                        }
                        clsr.scaleRanges.push(csr);
                    }
                } else {
                    //For a drawing layer which doesn't have scale ranges, we need add a dummy scale range for it.
                    //Otherwise, the legend tree will not display correctly.
                    minScale = 0;
                    maxScale = 1.0e10;
                    clsr.scaleRanges.push(new Fusion.Layers.ScaleRange({
                        minScale: 0,
                        maxScale: 1.0e10}, 
                        Fusion.Constant.LAYER_DWF_TYPE, {label:lyr.layerName}));
                }

                for (var lt in ltypes)
                    cl.layerTypes.push(lt);
                
                cl.minScale = minScale;
                cl.maxScale = maxScale;
                
                lsr.layers.push(clsr);
            }
        }
        return {
            LoadMap: lm,
            LoadScaleRanges: lsr
        };
    },
    initLoadMapResponse: function(o) {
        this._sResourceId = o.mapId;
        this._sMapname = o.mapName;
        this._sMapTitle = o.mapTitle;
        
        // Fix defect that background color in overview map will affect background color in main map.
        // We'll first check if the loaded map is the one shown in main map.
        var currentMaps = this.mapWidget.mapGroup.maps;
        var isInMapWidget = false;
        for(var index = 0, len = currentMaps.length; index < len; index++) {
            var mapInMaps = currentMaps[index];
            if(mapInMaps.resourceId == this._sResourceId) {
                isInMapWidget = this;
                break;
            }
        }
        if(isInMapWidget) {
            this.mapWidget.setMetersPerUnit(o.metersPerUnit);
            this.mapWidget.setBackgroundColor(o.backgroundColor);
        }

        this.mapTag.layerOptions.maxExtent = OpenLayers.Bounds.fromArray(o.extent);

        this.layerRoot.clear();
        this.layerRoot.legendLabel = this._sMapTitle;
        this.layerRoot.displayInLegend = true;
        this.layerRoot.expandInLegend = true;

        this.parseMapLayersAndGroups(o);

        this.minScale = 1.0e10;
        this.maxScale = 0;
        for (var i=0; i<this.aLayers.length; i++) {
          this.minScale = Math.min(this.minScale, this.aLayers[i].minScale);
          this.maxScale = Math.max(this.maxScale, this.aLayers[i].maxScale);
        }
        //a scale value of 0 is undefined
        if (this.minScale <= 0) {
          this.minScale = 1.0;
        }

        for (var i=0; i<this.aShowLayers.length; i++) {
            var layer =  this.layerRoot.findLayerByAttribute('layerName', this.aShowLayers[i]);
            if (layer) {
                this.aShowLayers[i] = layer.uniqueId;
            } else {
                this.aShowLayers[i] = '';
            }
        }
        for (var i=0; i<this.aHideLayers.length; i++) {
            var layer =  this.layerRoot.findLayerByAttribute('layerName', this.aHideLayers[i]);
            if (layer) {
                this.aHideLayers[i] = layer.uniqueId;
            } else {
                this.aHideLayers[i] = '';
            }
        }

        for (var i=0; i<this.aShowGroups.length; i++) {
            var group =  this.layerRoot.findGroupByAttribute('groupName', this.aShowGroups[i]);
            if (group) {
                this.aShowGroups[i] = group.uniqueId;
            } else {
                this.aShowGroups[i] = '';
            }
        }

        for (var i=0; i<this.aHideGroups.length; i++) {
            var group =  this.layerRoot.findGroupByAttribute('groupName', this.aHideGroups[i]);
            if (group) {
                this.aHideGroups[i] = group.uniqueId;
            } else {
                this.aHideGroups[i] = '';
            }
        }

        if (o.hasBaseMapLayers && this.bIsMapWidgetLayer) {	//Use tile if there is base layer and in main map
            this.bSingleTile = false;
        }

        //set projection units and code if supplied
        var wktProj;
        if (o.wkt && o.wkt.length > 0){
            //Proj4js prefers EPSG codes over raw WKT. So if an EPSG code exists, use that over the WKT
            if (o.epsg != 0) {
                wktProj = new OpenLayers.Projection("EPSG:" + o.epsg);
                this.mapTag.layerOptions.projection = "EPSG:" + o.epsg;
            } else {
                wktProj = new OpenLayers.Projection(o.wkt);
            }
        } 
        if (!wktProj || (wktProj && wktProj.proj && !wktProj.proj.readyToUse)) {
            if (o.epsg != 0) {
                wktProj = new OpenLayers.Projection("EPSG:" + o.epsg);
                this.mapTag.layerOptions.projection = "EPSG:" + o.epsg;
            } else {
                //default to the local non-projected system if not otherwise specified
                o.wkt = "LOCAL_CS[\"Non-Earth (Meter)\",LOCAL_DATUM[\"Local Datum\",0],UNIT[\"Meter\", 1],AXIS[\"X\",EAST],AXIS[\"Y\",NORTH]]";
                wktProj = new OpenLayers.Projection(o.wkt);
            }
        }
        //TODO: consider passing the metersPerUnit value into the framework
        //to allow for scaling that doesn't match any of the pre-canned units
        this.mapTag.layerOptions.units = Fusion.getClosestUnits(o.metersPerUnit);

        //add in scales array if supplied
        if (o.FiniteDisplayScales && o.FiniteDisplayScales.length>0) {
            this.scales = o.FiniteDisplayScales;
            this.mapWidget.fractionalZoom = false;
            this.mapWidget.oMapOL.fractionalZoom = false;
        }
            
        if (!this.bSingleTile) {
            if (o.groups.length >0) {
                var tiledLayerIndex = 0;
                this.noCache = false;
                this.mapWidget.registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.mapExtentsChanged, this));
                
                for (var i=0; i<o.groups.length; i++) {
                    if(o.groups[i].isBaseMapGroup) {
                        this.oLayersOLTile[tiledLayerIndex] = this.createOLLayer(this._sMapname + "_Tiled[" + tiledLayerIndex + "]", false, 2, false, o.groups[i].groupName);              
                        tiledLayerIndex++;
                     }
                }
            } else {
                this.bSingleTile = true;
            }
        }
 
        //remove this layer if it was already created
        if (this.oLayerOL) {
            this.oLayerOL.events.unregister("loadstart", this, this.loadStart);
            this.oLayerOL.events.unregister("loadend", this, this.loadEnd);
            this.oLayerOL.events.unregister("loadcancel", this, this.loadEnd);
            this.oLayerOL.destroy();
        }

        if (this.oLayersOLTile.length != 0) {
            this.oLayerOL = this.oLayersOLTile[this.oLayersOLTile.length-1]; // The last baselayer at the bottom.
        } else {
            this.oLayerOL = this.createOLLayer(this._sMapname, this.bSingleTile, 2, false, "");
        }
        
        if (wktProj && wktProj.proj && wktProj.proj.readyToUse) {
          this.oLayerOL.projection = wktProj;
          this.oLayerOL.projection.proj.units = this.mapTag.layerOptions.units;
        }
        this.oLayerOL.events.register("loadstart", this, this.loadStart);
        this.oLayerOL.events.register("loadend", this, this.loadEnd);
        this.oLayerOL.events.register("loadcancel", this, this.loadEnd);

        
        //remove the dynamic overlay layer if it was already created
        if (this.oLayerOL2) {
            this.oLayerOL2.destroy();
        }

        //this is to distinguish between a regular map and an overview map
        this.bMapLoaded = true;
        if (this.bIsMapWidgetLayer) {
            this.mapWidget.addMap(this);
            
            if(this.oLayersOLTile.length > 1) {
                for(var i=this.oLayersOLTile.length-2; i>=0; i--) {
                    // Workaround to make multiple baselayers display. 
                    // Openlayers only supports single baselayer.
                    this.oLayersOLTile[i].isBaseLayer = false; 
                    this.mapWidget.oMapOL.addLayer(this.oLayersOLTile[i]);
                }                               
            }
            
            //if we have a tiled map that also contains dynamic layers, we need to create
            //an additional overlay layer to render them on top of the tiles
            if(!this.bSingleTile) {
                this.oLayerOL2 = this.createOLLayer(this._sMapname + "_DynamicOverlay",true,2,true, "");
                this.mapWidget.oMapOL.addLayer(this.oLayerOL2);
                this.oLayerOL2.setVisibility(true);
            }
        }
        
        //Fix Defect: the Base Layer Group should be invisible when the "initially visiable in map" is set to false
        var i = 0;
        var j = 0;
        for(i = 0;i < this.layerRoot.groups.length; i++){  
            if(this.layerRoot.groups[i].isBaseMapGroup && !this.layerRoot.groups[i].initiallyVisible){
                for(j = 0; j<this.oLayersOLTile.length; j++) {
                    if(this.oLayersOLTile[j].params.basemaplayergroupname === this.layerRoot.groups[i].name) {
                        this.oLayersOLTile[j].setVisibility(false);
                    }
                }    
            }   
        }
    },
    /**
     * Callback function from a LoadMap.php request
     */
    mapLoaded: function(r) {
        if (r.status == 200) {
            var o = Fusion.parseJSON(r.responseText);
            this.initLoadMapResponse(o);
        }
        this.mapWidget._removeWorker();
        this.triggerEvent(Fusion.Event.LAYER_LOADED);

    },
    convertAndLoadMapResponse: function(o) {
        var co = this.convertResponse(o);
        if (this.bHasTileSetSupport && o.RuntimeMap.TileSetDefinition) {
            //Override default tile size based on what's in the 
            if (o.RuntimeMap.TileWidth && o.RuntimeMap.TileHeight) {
                this.defaultTileSize = [
                    parseInt(o.RuntimeMap.TileWidth[0]),
                    parseInt(o.RuntimeMap.TileHeight[0])
                ];
            }
            this._tileSetId = o.RuntimeMap.TileSetDefinition[0];
        }
        this.initLoadMapResponse(co.LoadMap);
        return co;
    },
    /**
     * Callback function from a CREATERUNTIMEMAP request
     */
    onRuntimeMapCreated: function(r) {
        if (r.status == 200) {
            var o = Fusion.parseJSON(r.responseText);
            var co = this.convertAndLoadMapResponse(o);
            //Need to wait for the right event to trigger loadScaleRanges, so stash our
            //prepared result for when it comes
            this._initScaleRanges = co.LoadScaleRanges;
        }
        this.mapWidget._removeWorker();
        this.triggerEvent(Fusion.Event.LAYER_LOADED);
    },
//TBD: this function not yet converted for OL
    reloadMap: function() {

        this.mapWidget._addWorker();
        //console.log('loadMap: ' + resourceId);
        this.aShowLayers = [];
        this.aHideLayers = [];
        this.aShowGroups = [];
        this.aHideGroups = [];
        this.aRefreshLayers = [];
        this.layerRoot.clear();
        var oldLayers = $A(this.aLayers);
        this.aLayers = [];

        if (this.bUseNativeServices) {
            var features = (1 | 2 | 4); //We want the whole lot
            var r = new Fusion.Lib.MGRequest.MGDescribeRuntimeMap(this._sMapname, features, 25);
            r.setParams({
                iconFormat: "GIF",
                session: this.getSessionID()
            });
            Fusion.oBroker.dispatchRequest(r, OpenLayers.Function.bind(this.onRuntimeMapReloaded, this, oldLayers));
        } else {
            var sl = Fusion.getScriptLanguage();
            var loadmapScript = 'layers/' + this.arch + '/' + sl  + '/LoadMap.' + sl;

            var sessionid = this.getSessionID();

            var params = {'mapname': this._sMapname, 'session': sessionid};
            var options = {
                  onSuccess: OpenLayers.Function.bind(this.mapReloaded,this,oldLayers),
                  onException: OpenLayers.Function.bind(this.reloadFailed, this),
                  parameters: params};
            Fusion.ajaxRequest(loadmapScript, options);
        }
    },

    reloadFailed: function(r) {
        this.mapWidget._removeWorker();
        Fusion.reportFatalError(OpenLayers.i18n('mapLoadError', {'error':r.transport.responseText}));
    },

    /**
     * Function: loadScaleRanges
     *
     * This function should be called after the map has loaded. It
     * loads the scsle ranges for each layer. I tis for now only
     * used by the legend widget.
     */

    loadScaleRanges: function() {
        if (this.bUseNativeServices && this._initScaleRanges) {
            this.initLoadScaleRangeResponse(this._initScaleRanges);
            delete this._initScaleRanges;
        } else {
            var sl = Fusion.getScriptLanguage();
            var loadmapScript = 'layers/' + this.arch + '/' + sl  + '/LoadScaleRanges.' + sl;

            //IE7 or lower: No pre-caching for you!
            var preCacheIcons = !(Browser.Engine.trident4 || Browser.Engine.trident5);
            //console.log("Layer icon pre-caching enabled: " + preCacheIcons);
            var sessionid = this.getSessionID();

            var params = {'mapname': this._sMapname, "session": sessionid, "preCacheIcons": preCacheIcons};
            var options = {onSuccess: OpenLayers.Function.bind(this.scaleRangesLoaded,this),
                           parameters:params};
            Fusion.ajaxRequest(loadmapScript, options);
        }
    },

    initLoadScaleRangeResponse: function(o) {
        if (o.layers && o.layers.length > 0) {
            var iconOpt = {
                url: o.icons_url || null,
                width: o.icons_width || 16,
                height: o.icons_height || 16
            };
            for (var i=0; i<o.layers.length; i++)  {
                var oLayer = this.getLayerById(o.layers[i].uniqueId);
                if (oLayer) {
                    oLayer.scaleRanges = [];
                    for (var j=0; j<o.layers[i].scaleRanges.length; j++) {
                        var scaleRange = new Fusion.Layers.ScaleRange(o.layers[i].scaleRanges[j],
                                                                             oLayer.layerType, iconOpt);
                        oLayer.scaleRanges.push(scaleRange);
                    }
                }
            }
        }
        this.mapWidget.triggerEvent(Fusion.Event.MAP_SCALE_RANGE_LOADED);
    },

    scaleRangesLoaded: function(r)
    {
        if (r.status == 200) {
            var o = Fusion.parseJSON(r.responseText);
            this.initLoadScaleRangeResponse(o);
        }
    },
    
    onRuntimeMapReloaded: function(oldLayers, r) {
        if (r.status == 200) {
            var json = Fusion.parseJSON(r.responseText);
            var co = this.convertResponse(json);
            var o = co.LoadMap;
            this.parseMapLayersAndGroups(o);
            //Need to wait for the right event to trigger loadScaleRanges, so stash our
            //prepared result for when it comes
            this._initScaleRanges = co.LoadScaleRanges;
            for (var i=0; i<this.aLayers.length; ++i) {
              var newLayer = this.aLayers[i];
              for (var j=0; j<oldLayers.length; ++j){
                if (oldLayers[j].uniqueId == newLayer.uniqueId) {
                  newLayer.selectedFeatureCount = oldLayers[j].selectedFeatureCount;
                  newLayer.noCache = oldLayers[j].noCache;
                  break;
                }
              }
            }
            this.mapWidget.triggerEvent(Fusion.Event.MAP_RELOADED);
            this.drawMap();
        }
        this.mapWidget._removeWorker();
    },
    
//TBD: this function not yet converted for OL
    mapReloaded: function(oldLayers,r) {
        if (r.status == 200) {
            var o = Fusion.parseJSON(r.responseText);
            this.parseMapLayersAndGroups(o);
            for (var i=0; i<this.aLayers.length; ++i) {
              var newLayer = this.aLayers[i];
              for (var j=0; j<oldLayers.length; ++j){
                if (oldLayers[j].uniqueId == newLayer.uniqueId) {
                  newLayer.selectedFeatureCount = oldLayers[j].selectedFeatureCount;
                  newLayer.noCache = oldLayers[j].noCache;
                  break;
                }
              }
            }
            this.mapWidget.triggerEvent(Fusion.Event.MAP_RELOADED);
            this.drawMap();
        }
        this.mapWidget._removeWorker();
    },

    reorderLayers: function(aLayerIndex) {
        var sl = Fusion.getScriptLanguage();
        var loadmapScript = 'layers/' + this.arch + '/' + sl  + '/SetLayers.' + sl;

        var params = {
            'mapname': this._sMapname,
            'session': this.getSessionID(),
            'layerindex': aLayerIndex.join()
        };

        var options = {
            onSuccess: OpenLayers.Function.bind(this.mapLayersReset, this, aLayerIndex),
            parameters: params};
        Fusion.ajaxRequest(loadmapScript, options);
    },

    mapLayersReset: function(aLayerIndex,r) {
      if (r.status == 200) {
        var o = Fusion.parseJSON(r.responseText);
            if (o.success) {
                var layerCopy = $A(this.aLayers);
                this.aLayers = [];
                this.aVisibleLayers = [];
          for (var i=0; i<aLayerIndex.length; ++i) {
            this.aLayers.push( layerCopy[ aLayerIndex[i] ] );
            if (this.aLayers[i].visible) {
                this.aVisibleLayers.push(this.aLayers[i].layerName);
            }
          }

                this.drawMap();
                this.triggerEvent(Fusion.Event.MAP_LAYER_ORDER_CHANGED);
            } else {
                alert(OpenLayers.i18n('setLayersError', {'error':o.layerindex}));
            }
        }
    },

    parseMapLayersAndGroups: function(o) {
        for (var i=0; i<o.groups.length; i++) {
            var group = new Fusion.Layers.Group(o.groups[i], this);
            var parent;
            if (group.parentUniqueId != '') {
                parent = this.layerRoot.findGroupByAttribute('uniqueId', group.parentUniqueId);
            } else {
                parent = this.layerRoot;
            }
            parent.addGroup(group, this.bLayersReversed);
        }

        for (var i=0; i<o.layers.length; i++) {
            var layer = new Fusion.Layers.Layer(o.layers[i], this);
            var parent;
            if (layer.parentGroup != '') {
                parent = this.layerRoot.findGroupByAttribute('uniqueId', layer.parentGroup);
            } else {
                parent = this.layerRoot;
            }
            parent.addLayer(layer, this.bLayersReversed);
            this.aLayers.push(layer);
        }
    },

    _drawMapInternal: function() {
        var params = {
            ts : (new Date()).getTime(),  //add a timestamp to prevent caching on the server
            showLayers : this.aShowLayers.length > 0 ? this.aShowLayers.toString() : null,
            hideLayers : this.aHideLayers.length > 0 ? this.aHideLayers.toString() : null,
            showGroups : this.aShowGroups.length > 0 ? this.aShowGroups.toString() : null,
            hideGroups : this.aHideGroups.length > 0 ? this.aHideGroups.toString() : null,
            refreshLayers : this.aRefreshLayers.length > 0 ? this.aRefreshLayers.toString() : null
        };

        this.aShowLayers = [];
        this.aHideLayers = [];
        this.aShowGroups = [];
        this.aHideGroups = [];
        this.aRefreshLayers = [];

        if (this.oLayerOL2) {
            this.oLayerOL2.mergeNewParams(params);
        } else {
            this.oLayerOL.mergeNewParams(params);
        }
        //console.log("Draw call completed");
        this.drawTimeout = null;
    },

    drawMap: function() {
        if (!this.bMapLoaded) {
            return;
        }
        if (this.drawDelay <= 0) { //No delay, draw immediately
            //console.log("Draw immediate");
            this._drawMapInternal();
        } else {
            //Check if we have a pending draw call and re-schedule if there is one
            if (this.drawTimeout) {
                //console.log("Delay pending draw");
                clearTimeout(this.drawTimeout);
                this.drawTimeout = null;
            }
            this.drawTimeout = setTimeout(OpenLayers.Function.bind(this._drawMapInternal, this), this.drawDelay);
            //console.log("Schedule draw in " + this.drawDelay + "ms");
        }
    },

    drawSelection: function() {
        if (this.queryLayer) {
            this.queryLayer.redraw(true);
        } else {
            this.drawMap();
        }
    },

    /**
     * Function: createOLLayer
     *
     * Returns an OpenLayers MapGuide layer object
     */
    createOLLayer: function(layerName, bSingleTile, behavior, forceAsOverlay, baselayerGroupName) {
      /* prevent the useOverlay flag based on MapGuide config element */
      this.useAsyncOverlay = Fusion.getConfigurationItem('mapguide', 'useAsyncOverlay');
      if (!this.useAsyncOverlay) {          //v2.0.1 or earlier
        this.selectionAsOverlay = false;
      }
      
      var layerOptions = {
        maxResolution: 'auto',
        useOverlay: this.selectionAsOverlay,
        useAsyncOverlay: this.useAsyncOverlay,
        ratio: this.ratio,
        transitionEffect: 'resize'
      };

      //add in scales array if supplied
      if (this.scales && this.scales.length>0) {
        layerOptions.scales = this.scales;
      }
      if (this.maxScale != Infinity) {
        layerOptions.minScale = this.maxScale;    //OL interpretation of min/max scale is reversed from Fusion
      } else {
        if (this.mapWidget.minScale) {
          layerOptions.minScale = this.mapWidget.maxScale;
        }// otherwise minscale is set automatically by OL
      }
      //only set both max and min scale when not using scales array
      if (!this.mapWidget.oMapOL.scales && !this.scales) {
        layerOptions.maxScale = this.minScale;
      }

      layerOptions.displayOutsideMaxExtent = true;
      layerOptions.singleTile = bSingleTile;
      OpenLayers.Util.extend(layerOptions, this.mapTag.layerOptions);

      var params = {};
      if ( bSingleTile ) {
        params = {        //single tile params
          session: this.getSessionID(),
          mapname: this._sMapname,
          format: this.imageFormat,
          behavior: behavior,
          clientagent: this.clientAgent
        };
        params.showLayers = this.aShowLayers.length > 0 ? this.aShowLayers.toString() : null;
        params.hideLayers = this.aHideLayers.length > 0 ? this.aHideLayers.toString() : null;
        params.showGroups = this.aShowGroups.length > 0 ? this.aShowGroups.toString() : null;
        params.hideGroups = this.aHideGroups.length > 0 ? this.aHideGroups.toString() : null;
        params.refreshLayers = this.aRefreshLayers.length > 0 ? this.aRefreshLayers.toString() : null;

        if (behavior == 5) {
          params.selectioncolor = this.selectionColor;
          params.format = this.selectionFormat;
        }
        
        if(forceAsOverlay)
        {
            layerOptions.isBaseLayer = false;
        }

      } else {
        params = {      //tiled version
          mapdefinition: this._tileSetId || this._sResourceId,
          basemaplayergroupname: baselayerGroupName, 
          session: this.getSessionID(),
          clientagent: this.clientAgent
        };
      }
      
      //Fix for IE6 PNG transparency
      if (params.format && params.format.toLowerCase().indexOf('png') >= 0) {
        layerOptions.alpha = true;
      }

      var url;
      if ( !bSingleTile && layerOptions.useHttpTile) {
        url = Fusion.getConfigurationItem('mapguide', 'tileCacheUrl');
      } else {
        url = Fusion.getConfigurationItem('mapguide', 'mapAgentUrl');
      }
      
      if (this.alternateHostNames)
      {
        var hosts = this.alternateHostNames.split(",");
        var httpIndex = url.indexOf("http://") + 7;
        if (httpIndex < 7) {
            httpIndex = url.indexOf("https://") + 8;
        }
        var proto = url.substring(0, httpIndex);
        var relIndex = url.indexOf("/", httpIndex+1);
        var relPath = url.substring(relIndex);
        
        layerOptions.alternateUrls = [];
        
        for (var i = 0; i < hosts.length; i++) {
            var altUrl = proto + hosts[i] + relPath;
            layerOptions.alternateUrls.push(altUrl);
        }
      }
      
      if (!bSingleTile)
        layerOptions.defaultSize = new OpenLayers.Size(this.defaultTileSize[0], this.defaultTileSize[1]);
      
      var oNewLayerOL = new OpenLayers.Layer.MapGuide( layerName, url, params, layerOptions );
      if (!bSingleTile) {
        if (oNewLayerOL.scales.length == this.aCmsScales.length) { 
            //NOTE: This is not a property of OpenLayers.Layer.MapGuide, it is something we've bolted on
            oNewLayerOL.bUsesCommercialLayerScaleList = false;
            for (var i = 0; i < this.aCmsScales.length; i++) {
                if (!this.scalesAreApproximate(oNewLayerOL.scales[i], this.aCmsScales[i]))
                {
                    return oNewLayerOL; //Doesn't match. Nothing more to do here
                }
            }
            oNewLayerOL.bUsesCommercialLayerScaleList = true;
            this.bUsesCommercialLayerScaleList = true;
        }
      }
      return oNewLayerOL;
    },
    
    scalesAreApproximate: function(scale1, scale2) {
        return Math.abs(scale1 - scale2) < this.nCmsScaleTolerance;
    },
    
    applyZoomOffset: function(offset) {
        //console.log("Applying zoom offset of: " + offset);
        //We need to redraw to prevent potential mismatch after switching of commerical layers
        //TODO: This is called for each commerical layer in the basemap switcher widget, do
        //redraw() calls at this point result in redundant requests?
        if (this.oLayerOL && this.oLayerOL.bUsesCommercialLayerScaleList === true) {
            this.oLayerOL.zoomOffset = offset;
            this.oLayerOL.redraw();
        }
        if (this.oLayerOL2 && this.oLayerOL2.bUsesCommercialLayerScaleList === true) {
            this.oLayerOL2.zoomOffset = offset;
            this.oLayerOL2.redraw();
        }
        if (this.oLayersOLTile) {
            for (var i = 0; i < this.oLayersOLTile.length; i++) {
                if (this.oLayersOLTile[i].bUsesCommercialLayerScaleList === true) {
                    this.oLayersOLTile[i].zoomOffset = offset;
                    this.oLayersOLTile[i].redraw();
                }
            }
        }
    },

    /**
     * Function: getLayerByName
     *
     * Returns the MapGuide layer object as identified by the layer name
     */
    getLayerByName : function(name)
    {
        var oLayer = null;
        for (var i=0; i<this.aLayers.length; i++)
        {
            if (this.aLayers[i].layerName == name)
            {
                oLayer = this.aLayers[i];
                break;
            }
        }
        return oLayer;
    },

    /**
     * Function: getLayerById
     *
     * Returns the MapGuide layer object as identified by the layer unique id
     */
    getLayerById : function(id)
    {
        var oLayer = null;
        for (var i=0; i<this.aLayers.length; i++)
        {
            if (this.aLayers[i].uniqueId == id)
            {
                oLayer = this.aLayers[i];
                break;
            }
        }
        return oLayer;
    },

    getSelectionCB: function(userFunc, r) {
      if (r.status == 200) {
          var o = Fusion.parseJSON(r.responseText);
          var oSelection = new Fusion.SelectionObject(o);
          userFunc(oSelection);
      }
    },

    /**
     * advertise a new selection is available
     */
    newSelection: function() {
        if (this.oSelection) {
            this.oSelection = null;
        }
        this.bSelectionOn = true;
        this.triggerEvent(Fusion.Event.MAP_SELECTION_ON);
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedFeatureCount: function() {
      var total = 0;
      for (var j=0; j<this.aLayers.length; ++j) {
        total += this.aLayers[j].selectedFeatureCount;
      }
      return total;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedLayers: function() {
      var layers = [];
      for (var j=0; j<this.aLayers.length; ++j) {
        if (this.aLayers[j].selectedFeatureCount>0) {
          layers.push(this.aLayers[j]);
        }
      }
      return layers;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectableLayers: function() {
      var layers = [];
      for (var j=0; j<this.aLayers.length; ++j) {
        if (this.aLayers[j].selectable) {
          layers.push(this.aLayers[j]);
        }
      }
      return layers;
    },

    /**
     * Updates the current map selection with the provided XML selection string.
     * Optionally zooms to the new selection on the map, if zoomTo is set to true.
     */
    setSelection: function (selText, zoomTo) {

        //TODO Update this.previousSelection when the selection is set using
        //this API to allow the selection to be extended with a shift-click.

        if(selText != "" && selText != null) {
            if (this.bUseNativeServices) {
                this.updateMapSelection(selText, zoomTo, false, true);
            } else {
                this.updateSelection(selText, zoomTo, false);
            }
        }
        else {
            this.clearSelection();
        }
    },

    updateSelection: function (selText, zoomTo, extendSelection) {
        this.updateMapSelection(selText, zoomTo);
        this.getSelectedFeatureProperties(selText);
    },


    getSelectedFeatureProperties: function (selText) {
      this.mapWidget._addWorker();
      var sl = Fusion.getScriptLanguage();
      var getPropertiesScript = 'layers/' + this.arch + '/' + sl  + '/GetSelectionProperties.' + sl;
      var params = {
          'mapname': this.getMapName(),
          'session': this.getSessionID(),
          'selection': selText,
          'seq': Math.random()
      };
      var options = {onSuccess: OpenLayers.Function.bind(this.processSelectedFeatureProperties, this),
                     parameters:params};
      Fusion.ajaxRequest(getPropertiesScript, options);
    },

    updateMapSelection: function (selText, zoomTo, mergeSelection, returnAttributes) {
        this.mapWidget._addWorker();
        if (this.bUseNativeServices) {
            var reqData = 4; //hyperlinks only
            if (returnAttributes == true) {
                reqData |= 1; //Attributes
            }
            //NOTE: 
            // This code path assumes our "2.6" or above MapGuide Server is assumed to have this particular 
            // issue fixed: http://trac.osgeo.org/mapguide/changeset/8288
            // This will be true for MapGuide Open Source 2.6 Final. This may not be true for AIMS 2015.
            var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures2(this.getSessionID(),
                                                                 this._sMapname,
                                                                 null, //geometry
                                                                 -1, //max features
                                                                 1, //persist
                                                                 this.selectionType,
                                                                 selText,
                                                                 null,
                                                                 0, //All layers
                                                                 reqData,
                                                                 this.selectionColor,
                                                                 this.selectionImageFormat);
            var callback = OpenLayers.Function.bind(this.onNativeSelectionUpdate, this, zoomTo, returnAttributes);
            // use 'post' because selText could be a long string.
            var method = Fusion.oBroker.method;
            Fusion.oBroker.method = 'post';
            r.options.contentType = 'application/x-www-form-urlencoded';
            Fusion.oBroker.dispatchRequest(r, callback);
            Fusion.oBroker.method = method;
        } else {
            var sl = Fusion.getScriptLanguage();
            var updateSelectionScript = 'layers/' + this.arch + '/' + sl  + '/SaveSelection.' + sl;
            var params = {
              'mapname': this.getMapName(),
              'session': this.getSessionID(),
              'selection': selText,
              'seq': Math.random(),
              'getextents' : zoomTo ? 'true' : 'false'
            };
            var options = {onSuccess: OpenLayers.Function.bind(this.renderSelection, this, zoomTo),
                         parameters:params};
            Fusion.ajaxRequest(updateSelectionScript, options);
        }
    },



     /**
     * asynchronously load the current selection.  When the current
     * selection changes, the selection is not loaded because it
     * could be a lengthy process.  The user-supplied function will
     * be called when the selection is available.
     *
     * @param userFunc {Function} a function to call when the
     *        selection has loaded
     *
     * @param layers {string} Optional parameter.  A comma separated
     *        list of layer names (Roads,Parcels). If it is not
     *        given, all the layers that have a selection will be used
     *
     * @param startcount {string} Optional parameter.  A comma separated
     *        list of a statinh index and the number of features to be retured for
     *        each layer given in the layers parameter. Index starts at 0
     *        (eg: 0:4,2:6 : return 4 elements for the first layers starting at index 0 and
     *         six elements for layer 2 starting at index 6). If it is not
     *        given, all the elemsnts will be returned.
     */
    getSelection: function(userFunc, layers, startcount) {
        /*for now always go back to server to fetch selection */
        if (userFunc)
        {
            if (this.previousAttributes) {
                userFunc(new Fusion.SelectionObject(this.previousAttributes));
            } else {
                //this.aSelectionCallbacks.push(userFunc);
                //this.mapWidget._addWorker();
                // this._bSelectionIsLoading = true;
                var s = 'layers/' + this.arch + '/' + Fusion.getScriptLanguage() + "/Selection." + Fusion.getScriptLanguage() ;
                var options = {
                    parameters: {
                        'session': this.getSessionID(),
                        'mapname': this._sMapname,
                        'layers': layers,
                        'startcount': startcount
                    },
                    onSuccess: OpenLayers.Function.bind(this.getSelectionCB, this, userFunc)
                };
                Fusion.ajaxRequest(s, options);
            }
        }
    },

    /**
       Call back function when selection is cleared
    */
    selectionCleared: function()
    {
        //clear the selection count for the layers
        for (var j=0; j<this.aLayers.length; ++j) {
          this.aLayers[j].selectedFeatureCount = 0;
        }

        this.bSelectionOn = false;
        if (this.queryLayer) {
          this.queryLayer.setVisibility(false);
        }
        this.triggerEvent(Fusion.Event.MAP_SELECTION_OFF);
        this.drawMap();
        this.oSelection = null;
    },

    /**
       Utility function to clear current selection
    */
    clearSelection: function() {
      if (this.hasSelection()) {
          var s = 'layers/' + this.arch + '/' + Fusion.getScriptLanguage() + "/ClearSelection." + Fusion.getScriptLanguage() ;
          var options = {
              parameters: {'session': this.getSessionID(),
                          'mapname': this._sMapname},
              onSuccess: OpenLayers.Function.bind(this.selectionCleared, this)
          };
          Fusion.ajaxRequest(s, options);
      }
      if (this.previousSelection != null)
      {
          this.previousSelection.clear();
      }
    },

    /**
       removes the queryLayer from the map
    */
    removeQueryLayer: function() {
      if (this.queryLayer) {
        this.queryLayer.destroy();
        this.queryLayer = null;
      }
    },

    /**
       Call back function when select functions are called (eg queryRect)
    */
    processQueryResults: function(zoomTo, r) {
        this.renderSelection(zoomTo, r);
        this.processSelectedFeatureProperties(r);
    },

    processSelectedFeaturePropertiesNode: function(oNode) {
        if (oNode.hasSelection) {
            this.newSelection();
        } else {
            this.clearSelection();
        }
    },

    /**
       Call back function when select functions are called (eg queryRect)
       to handle feature attributes
    */
    processSelectedFeatureProperties: function(r) {
        this.mapWidget._removeWorker();
        if (r.responseText) {   //TODO: make the equivalent change to MapServer.js
            var oNode = Fusion.parseJSON(r.responseText);
            this.processSelectedFeaturePropertiesNode(oNode);
        }
    },

    onNativeSelectionUpdate: function(zoomTo, returnAttributes, r) {
        //Set up the expected response text for renderSelection()
        if (returnAttributes) { //This update requires a client-side update of selection and attribute info
            var o = Fusion.parseJSON(r.responseText);
            var sel = new Fusion.SimpleSelectionObject(o);
            var attributes = this.convertExtendedFeatureInfo(o);
            this.previousSelection = sel;
            this.previousAttributes = attributes;
        }
        var sel = this.previousSelection;
        var resp = {
            hasSelection: false,
            layers: [],
            extents: null
        };
        for (var i = 0; i < sel.getNumLayers(); i++) {
            var layer = sel.getLayer(i);
            var nFeatures = layer.getNumFeatures();
            if (nFeatures > 0) {
                resp.hasSelection = true;
                var layerId = layer.getName();
                var oLayer = this.getLayerById(layerId);
                resp.layers.push(oLayer.layerName);
                resp[oLayer.layerName] = {
                    featureCount: nFeatures
                };
            }
        }
        if (this.previousAttributes) {
            resp.extents = this.previousAttributes.extents;
        }
        r.responseText = this.jsonParser.write(resp);
        this.renderSelection(zoomTo, r);
        this.processSelectedFeaturePropertiesNode(this.previousAttributes);
    },

    /**
       Call back function when select functions are called (eg queryRect)
       to render the selection
    */
    renderSelection: function(zoomTo, r) {
        this.mapWidget._removeWorker();
        if (r.responseText) {   //TODO: make the equivalent change to MapServer.js
            var oNode = Fusion.parseJSON(r.responseText);

            if (oNode.hasSelection) {
              if (this.selectionAsOverlay) {
                if (!this.queryLayer) {
                  this.queryLayer = this.createOLLayer("query layer", true, 5, true, "");
                  this.mapWidget.oMapOL.addLayer(this.queryLayer);
                  this.mapWidget.registerForEvent(Fusion.Event.MAP_LOADING,
                        OpenLayers.Function.bind(this.removeQueryLayer, this));
                } else {
                  this.queryLayer.setVisibility(true);
                }
              }

              //Fix Ticket #1145.
              //When the user invokes the setSelection() function to update the selection,
              //clear the selection count for all layers before proceeding
              for (var j=0; j<this.aLayers.length; ++j) {
                this.aLayers[j].selectedFeatureCount = 0;
              }

              // set the feature count on each layer making up this map
              for (var i=0; i<oNode.layers.length; ++i) {
                var layerName = oNode.layers[i];
                for (var j=0; j<this.aLayers.length; ++j) {
                  if (layerName == this.aLayers[j].layerName) {
                    this.aLayers[j].selectedFeatureCount = oNode[layerName].featureCount;
                  }
                }
              }

              if (zoomTo) {
                var ext = oNode.extents;
                if (ext != null) {
                  var extents = new OpenLayers.Bounds(ext.minx, ext.miny, ext.maxx, ext.maxy);
                  this.mapWidget.setExtents(extents);
                }
              }
              this.drawSelection();
            } else {
              this.clearSelection();
              return;
            }
        }
    },

    /**
       Do a query on the map
    */
    query: function(options) {
        this.mapWidget._addWorker();

        //clear the selection count for the layers
        for (var j=0; j<this.aLayers.length; ++j) {
          this.aLayers[j].selectedFeatureCount = 0;
        }

        var persist = 1;
        var layerAttributeFilter = 3;
        var maxFeatures = options.maxFeatures;
        if(maxFeatures == null || maxFeatures == 0)
        {
            maxFeatures = -1;
        }
        if(options.filter == null)
        {
            options.filter = '';
        }
        
        if (this.bUseNativeServices) {
            var reqData = 1; //attributes
            //TODO: Can't use inline selection image yet as we'll have to modify OpenLayers to accept an inline selection
            //over doing a GETDYNAMICMAPOVERLAYIMAGE request. When we can, or the value of 2 into the mask for inline 
            //selection as well
            var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures2(this.getSessionID(),
                                                                this._sMapname,
                                                                options.geometry,
                                                                maxFeatures,
                                                                persist,
                                                                options.selectionType || this.selectionType,
                                                                options.filter,
                                                                options.layers,
                                                                layerAttributeFilter,
                                                                reqData,
                                                                this.selectionColor,
                                                                this.selectionImageFormat);
            var callback = (options.extendSelection == true) ? OpenLayers.Function.bind(this.processAndMergeExtendedFeatureInfo, this) : OpenLayers.Function.bind(this.processExtendedFeatureInfo, this);
            Fusion.oBroker.dispatchRequest(r, callback);
        } else {
            var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures(this.getSessionID(),
                                                                this._sMapname,
                                                                options.geometry,
                                                                maxFeatures,
                                                                persist,
                                                                options.selectionType || this.selectionType,
                                                                options.filter,
                                                                options.layers,
                                                                layerAttributeFilter);
            var callback = (options.extendSelection == true) ? OpenLayers.Function.bind(this.processAndMergeFeatureInfo, this) : OpenLayers.Function.bind(this.processFeatureInfo, this);
            Fusion.oBroker.dispatchRequest(r, callback);
            //Uncomment below lines (and comment line above) if QUERYMAPFEATURES does not support JSON output (http://trac.osgeo.org/mapguide/ticket/2090)
            //Fusion.oBroker.dispatchRequest(r, 
            //    OpenLayers.Function.bind(Fusion.xml2json, this, 
            //        callback));
        }
    },

    showLayer: function( layer, noDraw ) {
        this.processLayerEvents(layer, true);
        this.aShowLayers.push(layer.uniqueId);
        //A layer cannot be both hidden and shown, which can be the case if there is a draw
        //delay and the user has toggled on/off the same layer in quick succession before the
        //delay has elapsed
        if (this.drawDelay > 0) {
            this.aHideLayers.erase(layer.uniqueId);
        }
        if (!noDraw) {
            this.drawMap();
        }
    },

    hideLayer: function( layer, noDraw ) {
        this.processLayerEvents(layer, false);
        this.aHideLayers.push(layer.uniqueId);
        //A layer cannot be both hidden and shown, which can be the case if there is a draw
        //delay and the user has toggled on/off the same layer in quick succession before the
        //delay has elapsed
        if (this.drawDelay > 0) {
            this.aShowLayers.erase(layer.uniqueId);
        }
        if (!noDraw) {
            this.drawMap();
        }
    },

    showGroup: function( group, noDraw ) {
        this.processGroupEvents(group, true);
        if (group.groupName == 'layerRoot') {
            this.oLayerOL.setVisibility(true);
            if (this.oLayerOL2) this.oLayerOL2.setVisibility(true);
        } else if (group.isBaseMapGroup) {
            for(var i=0; i<this.oLayersOLTile.length; i++) {
                if(this.oLayersOLTile[i].params.basemaplayergroupname == group.name) {
                    this.oLayersOLTile[i].setVisibility(true);
                }
            }
        } else {
            this.aShowGroups.push(group.uniqueId);
            //A group cannot be both hidden and shown, which can be the case if there is a draw
            //delay and the user has toggled on/off the same group in quick succession before the
            //delay has elapsed
            if (this.drawDelay > 0) {
                this.aHideGroups.erase(group.uniqueId);
            }
            if (!noDraw) {
                this.drawMap();
            }
        }
    },
    hideGroup: function( group, noDraw ) {
        this.processGroupEvents(group, false);
        if (group.groupName == 'layerRoot') {
            this.oLayerOL.setVisibility(false);
            if (this.oLayerOL2) this.oLayerOL2.setVisibility(false);
        } else if (group.isBaseMapGroup) {
            for(var i=0; i<this.oLayersOLTile.length; i++) {
                if(this.oLayersOLTile[i].params.basemaplayergroupname == group.name) {
                    this.oLayersOLTile[i].setVisibility(false);
                }
            }
        } else {
            this.aHideGroups.push(group.uniqueId);
            //A group cannot be both hidden and shown, which can be the case if there is a draw
            //delay and the user has toggled on/off the same group in quick succession before the
            //delay has elapsed
            if (this.drawDelay > 0) {
                this.aShowGroups.erase(group.uniqueId);
            }
            if (!noDraw) {
                this.drawMap();
            }
        }
    },
    refreshLayer: function( layer ) {
        this.aRefreshLayers.push(layer.uniqueId);
        this.drawMap();
    },

    /**
     * called when there is a click on the map holding the CTRL key: query features at that postion.
     **/
    mouseUpCRTLClick: function(evt) {
      if (evt.ctrlKey) {
        var min = this.mapWidget.pixToGeo(evt.xy.x-this.nTolerance, evt.xy.y-this.nTolerance);
        var max = this.mapWidget.pixToGeo(evt.xy.x+this.nTolerance, evt.xy.y+this.nTolerance);
        if (!min) {
          return;
        }
        var sGeometry = 'POLYGON(('+ min.x + ' ' +  min.y + ', ' +  min.x + ' ' +  max.y + ', ' + max.x + ' ' +  max.y + ', ' + max.x + ' ' +  min.y + ', ' + min.x + ' ' +  min.y + '))';
        //var sGeometry = 'POINT('+ min.x + ' ' +  min.y + ')';

        var maxFeatures = 1;
        var persist = 0;
        var selection = 'INTERSECTS';
        var filter = '';
        var layerNames = '';
        var layerAttributeFilter = 3;
        var sep = '';
        for (var i=0; i<this.aLayers.length; ++i) {
          layerNames += sep + this.aLayers[i].layerName;
          sep = ',';
        }
        var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures(this.getSessionID(),
                                                            this._sMapname,
                                                            sGeometry,
                                                            maxFeatures, persist, selection, filter, layerNames,
                                                            layerAttributeFilter);
        var callback = OpenLayers.Function.bind(this.crtlClickDisplay, this);
        Fusion.oBroker.dispatchRequest(r, callback);
      }
    },

    /**
     * open a window if a URL is defined for the feature.
     **/
    crtlClickDisplay: function(xhr) {
        //console.log('ctrlclcik  _display');
        if (xhr.status == 200) {
            var o = Fusion.parseJSON(xhr.responseText);
            var h = o['FeatureInformation']['Hyperlink'];
            if (h) {
                window.open(h[0], "");
            }
        }
    },

    //GETVISIBLEMAPEXTENT must be called for tiled maps whenever the extents
    //are changed so that tooltips will work properly
    mapExtentsChanged: function() {
      if (!this.singleTile) {
          var center = this.mapWidget.oMapOL.getCenter();
          var display = this.mapWidget.oMapOL.getSize();
          
          var r = new Fusion.Lib.MGRequest.MGGetVisibleMapExtent(this.getSessionID(),
                                                              this._sMapname,
                                                              center.lon, center.lat,
                                                              this.mapWidget.oMapOL.getScale(),
                                                              null,
                                                              this._nDpi,
                                                              display.w, display.h);
          Fusion.oBroker.dispatchRequest(r);
      }
    },

    pingServer: function() {
        var s = 'layers/' + this.arch + '/' + Fusion.getScriptLanguage() + "/Common." + Fusion.getScriptLanguage() ;
        var params = {onSuccess: OpenLayers.Function.bind(this.checkPingResponse, this)};
        params.parameters = {'session': this.getSessionID()};
        Fusion.ajaxRequest(s, params);
    },
    
    checkPingResponse: function(xhr) {
        if (xhr.responseText) {
            var o = Fusion.parseJSON(xhr.responseText);
            if (!o.success) {
                clearInterval(this.keepAliveTimer);
                Fusion.reportFatalError(o.message);
            }
        }
    },

    getLinkParams: function() {
      var queryParams = {};
      queryParams.theme = this.sMapResourceId;

      //determine which layers have been toggled
      var showLayers = [];
      var hideLayers = [];
      for (var i=0; i<this.aLayers.length; ++i) {
        var layer = this.aLayers[i];
        if (layer.visible && !layer.initiallyVisible) {  //layer was turned on
          showLayers.push(layer.layerName);
        }
        if (!layer.visible && layer.initiallyVisible) {  //layer was turned off
          hideLayers.push(layer.layerName);
        }
      }
      queryParams.showlayers = showLayers.join(',');
      queryParams.hidelayers = hideLayers.join(',');

      //determine which groups have been toggled
      var showGroups = [];
      var hideGroups = [];
      for (var i=0; i<this.layerRoot.groups.length; ++i) {
        var group = this.layerRoot.groups[i];
        if (group.visible && !group.initiallyVisible) {  //layer was turned on
          showGroups.push(group.groupName);
        }
        if (!group.visible && group.initiallyVisible) {  //layer was turned off
          hideGroups.push(group.groupName);
        }
      }
      queryParams.showgroups = showGroups.join(',');
      queryParams.hidegroups = hideGroups.join(',');

      return queryParams;
    },
    
    getMapTip: function(mapTipWidget) {
      //console.log('showMaptip');
        var oBroker = Fusion.oBroker;
        var x = mapTipWidget.oCurrentPosition.x;
        var y = mapTipWidget.oCurrentPosition.y;
        var min = this.mapWidget.pixToGeo(x-mapTipWidget.nTolerance, y-mapTipWidget.nTolerance);
        var max = this.mapWidget.pixToGeo(x+mapTipWidget.nTolerance, y+mapTipWidget.nTolerance);
        //this can fail if no map is loaded
        if (!min) {
            return;
        }
        var sGeometry = 'POLYGON(('+ min.x + ' ' +  min.y + ', ' +  min.x + ' ' +  max.y + ', ' + max.x + ' ' +  max.y + ', ' + max.x + ' ' +  min.y + ', ' + min.x + ' ' +  min.y + '))';

        //var sGeometry = 'POINT('+ min.x + ' ' +  min.y + ')';

        var maxFeatures = 1;
        var persist = 0;
        var selection = 'INTERSECTS';
        var filter = '';
        // only select visible layers with maptips defined (1+4)
        var layerAttributeFilter = 5;
        //TODO: possibly make the layer names configurable?
        var layerNames = mapTipWidget.aLayers.toString();
        if (this.bUseNativeServices) {
            var reqData = (4 | 8); //Tooltips and hyperlinks
            var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures2(this.getSessionID(),
                                            this._sMapname,
                                            sGeometry,
                                            maxFeatures, persist, selection, filter, layerNames,
                                            layerAttributeFilter,
                                            reqData,
                                            this.selectionColor,
                                            this.selectionImageFormat);
            oBroker.dispatchRequest(r, OpenLayers.Function.bind(this.parseMapTip, this));
        } else {
            var r = new Fusion.Lib.MGRequest.MGQueryMapFeatures(this.getSessionID(),
                                            this._sMapname,
                                            sGeometry,
                                            maxFeatures, persist, selection, filter, layerNames,
                                            layerAttributeFilter);
            oBroker.dispatchRequest(r, OpenLayers.Function.bind(this.parseMapTip, this));
            //Uncomment below lines (and comment line above) if QUERYMAPFEATURES does not support JSON output (http://trac.osgeo.org/mapguide/ticket/2090)
            //oBroker.dispatchRequest(r, 
            //    OpenLayers.Function.bind(Fusion.xml2json, this, 
            //        OpenLayers.Function.bind(this.parseMapTip, this)));
        }
    },
    
    parseMapTip: function(xhr) {
        var o;
        var tooltip = Fusion.parseJSON(xhr.responseText);
        this.oMaptip = {t:"",h:""};
        var t = tooltip['FeatureInformation']['Tooltip'];
        if (t) {
          this.oMaptip.t = t[0].replace(/\\n/g, "<br>");
        }
        var h = tooltip['FeatureInformation']['Hyperlink'];
        if (h) {
          this.oMaptip.h = h[0];
        }
        this.mapWidget.triggerEvent(Fusion.Event.MAP_MAPTIP_REQ_FINISHED, this.oMaptip);
    },
    
    getLegendImageURL: function(fScale, layer, style,defaultIcon) {
        if(layer.layerTypes[0] == 4){
            return defaultIcon;
        }
        else
        {
            if (style.iconOpt && style.iconOpt.url)
            {
                //if (style.iconOpt.url.indexOf("data:image") >= 0)
                //    console.log("Fetching pre-cached icon");
                return style.iconOpt.url;
            }
                
            var origUrl = Fusion.getConfigurationItem('mapguide', 'mapAgentUrl');
            var altUrl = null;
            if (this.oLayerOL && this.oLayerOL.alternateUrls && this.oLayerOL.alternateUrls.length > 0) {
                altUrl = this.oLayerOL.getNextAltURL();
            }
            var url = (altUrl == null) ? origUrl : altUrl;
            
            url += "?OPERATION=GETLEGENDIMAGE&SESSION=" + layer.oMap.getSessionID();
            url += "&VERSION=1.0.0&SCALE=" + fScale;
            op = /\(/g; cp = /\)/g; 
            url += "&LAYERDEFINITION=" + encodeURIComponent(layer.resourceId).replace(op, "%28").replace(cp, "%29");
            url += "&THEMECATEGORY=" + style.categoryIndex;
            url += "&TYPE=" + style.geometryType;
            url += "&CLIENTAGENT=" + encodeURIComponent(this.clientAgent);
            if (this.noCache) {
                url += "&TS=" + (new Date()).getTime();
            }
            return url;
        }
    },
    
    typeNameToValue: function(name) {
        switch(name) { //Values from MgPropertyType
            case "byte":
                return 2;
            case "boolean":
                return 1;
            case "blob":
                return 10;
            case "clob":
                return 11;
            case "datetime":
                return 3;
            case "double":
                return 5;
            case "int16":
                return 6;
            case "int32":
                return 7;
            case "int64":
                return 8;
            case "single":
                return 4;
            case "string":
                return 9;
        }
        return -1;
    },
    
    convertExtendedFeatureInfo: function(efi) {
        var bHasSelection = false;
        var result = {};
        var layerNames = [];
        var featuresByLayer = {};
        if (efi.FeatureInformation.SelectedFeatures) {
            var selLayers = efi.FeatureInformation.SelectedFeatures[0].SelectedLayer;
            bHasSelection = (selLayers.length > 0);
            var box = new OpenLayers.Bounds();
            
            for (var i = 0; i < selLayers.length; i++) {
                var selLayer = selLayers[i];
                var selFeatures = selLayer.Feature || [];
                var layerName = selLayer["@name"];
                if (!result[layerName]) {
                    if (selLayer.LayerMetadata) {
                        var layerMeta = selLayer.LayerMetadata[0];
                        var pnames = [];
                        var ptypes = [];
                        var pvals = [];
                        for (var j = 0; j < layerMeta.Property.length; j++) {
                            var metaProp = layerMeta.Property[j];
                            pnames.push(metaProp.Name[0]);
                            ptypes.push(metaProp.Type[0]);
                            pvals.push(metaProp.DisplayName[0]);
                        }
                    }
                    result[layerName] = {
                        metadata: [],  //NOTE: Probably a defect, but regular code path is putting blank string arrays here too
                        metadatanames: ["dimension", "bbox", "center", "area", "length"],
                        numelements: selFeatures.length,
                        propertynames: pnames,
                        propertytypes: ptypes,
                        propertyvalues: pvals,
                        values: []
                    };
                    layerNames.push(layerName);
                }
                
                for (var j = 0; j < selFeatures.length; j++) {
                    var feat = selFeatures[j];
                    var featVals = [];
                    if (feat.Property) {
                        //If we have layer metadata, its order of properties we must follow
                        if (selLayer.LayerMetadata) {
                            for (var p = 0; p < selLayer.LayerMetadata[0].Property.length; p++) {
                                var name = selLayer.LayerMetadata[0].Property[p].DisplayName[0];
                                //Find matching property value
                                for (var fp = 0; fp < feat.Property.length; fp++) {
                                    var featProp = feat.Property[fp];
                                    if (featProp.Name[0] == name) {
                                        //Fusion represents null as empty string. Don't think that's right but we'll run with whatever
                                        //the old code path produces
                                        featVals.push(featProp.Value == null ? "" : featProp.Value[0]);
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (var k = 0; k < feat.Property.length; k++) {
                                //Fusion represents null as empty string. Don't think that's right but we'll run with whatever
                                //the old code path produces
                                featVals.push(feat.Property[k].Value == null ? "" : feat.Property[k].Value[0]);
                            }
                        }
                    }
                    result[layerName].values.push(featVals);
                    //NOTE: Probably a defect, but regular code path is putting blank string arrays here too, so let's do the same
                    result[layerName].metadata.push(["","","","",""]);
                    if (feat.Bounds) {
                        var bounds = feat.Bounds[0].split(" "); //minx miny maxx maxy
                        box.extend(new OpenLayers.LonLat(parseFloat(bounds[0]), parseFloat(bounds[1])));
                        box.extend(new OpenLayers.LonLat(parseFloat(bounds[2]), parseFloat(bounds[3])));
                    }
                }
            }
            return OpenLayers.Util.extend(result, {
                hasSelection: bHasSelection,
                extents: {
                    minx: box.left,
                    miny: box.bottom,
                    maxx: box.right,
                    maxy: box.top
                },
                layers: layerNames
            });
        } else {
            result.hasSelection = false;
            return result;
        }
    },

    processAndMergeExtendedFeatureInfo: function(r) {
        this.processSelectedExtendedFeatureInfo(r, true);
        //this.processSelectedFeatureInfo(r, true);
    },
    
    processExtendedFeatureInfo: function(r) {
        this.processSelectedExtendedFeatureInfo(r, false);
        //this.processSelectedFeatureInfo(r, false);
    },
    
    mergeAttributes: function(attributes, prevAttributes) {
        if (!prevAttributes) {
            //Nothing to merge, return original
            return attributes;
        }
        //Start off with prevAttributes as the base
        var merged = {};
        merged.hasSelection = prevAttributes.hasSelection;
        merged.extents = prevAttributes.extents;
        merged.layers = prevAttributes.layers;
        for (var i = 0; i < merged.layers.length; i++) {
            var layerName = merged.layers[i][0];
            merged[layerName] = prevAttributes[layerName];
        }
        //Expand extents
        if (!merged.extents && attributes.extents) {
            merged.extents = attributes.extents;
        } else {
            if (attributes.extents) {
                if (attributes.extents.minx < merged.extents.minx)
                    merged.extents.minx = attributes.extents.minx;
                if (attributes.extents.miny < merged.extents.miny)
                    merged.extents.miny = attributes.extents.miny;
                if (attributes.extents.maxx > merged.extents.maxx)
                    merged.extents.maxx = attributes.extents.maxx;
                if (attributes.extents.maxy > merged.extents.maxy)
                    merged.extents.maxy = attributes.extents.maxy;
            }
        }
        //Bring in attributes
        for (var i = 0; i < attributes.layers.length; i++) {
            var layerName = attributes.layers[i][0];
            if (typeof(merged[layerName]) == 'undefined') {
                merged[layerName] = attributes[layerName];
            } else {
                var newValues = attributes[layerName].values;
                for (var v = 0; v < newValues.length; v++) {
                    merged[layerName].values.push(newValues[v]);
                    merged[layerName].numelements++;
                }
            }
        }
        return merged;
    },
    
    processSelectedExtendedFeatureInfo: function(r, mergeSelection) {
        var o = Fusion.parseJSON(r.responseText);
        var sel = new Fusion.SimpleSelectionObject(o);
        var attributes = this.convertExtendedFeatureInfo(o);
        if (mergeSelection == true)
        {
            sel.merge(this.previousSelection);
            attributes = this.mergeAttributes(attributes, this.previousAttributes);
        }
        var selText = sel.getSelectionXml();
        this.previousSelection = sel;
        //Because the QUERYMAPFEATURES 2.6.0 response contains mostly everything we need, we cut down
        //on lots of async request ping-pong. So we can just update the selection image and notify any
        //interested parties of the new selection attributes
        if (selText != "" && selText != null) {
            this.previousAttributes = attributes;
            this.updateMapSelection(selText, false, mergeSelection);
        } else {
            //Only clear if we're not merging an empty selection
            if (mergeSelection == false) {
                this.previousAttributes = null;
                this.clearSelection();
            }
        }
        this.mapWidget._removeWorker();
    },
    
    processAndMergeFeatureInfo: function (r) {
        this.processSelectedFeatureInfo(r, true);
    },

    processFeatureInfo: function (r) {
        this.processSelectedFeatureInfo(r, false);
    },

    processSelectedFeatureInfo: function (r, mergeSelection) {
        var o = Fusion.parseJSON(r.responseText);

        var newSelection = new Fusion.SimpleSelectionObject(o);
        if(mergeSelection == true)
        {
            newSelection.merge(this.previousSelection);
        }
        this.previousSelection = newSelection;

        var selText = newSelection.getSelectionXml();
        this.setSelection(selText, false);
        this.mapWidget._removeWorker();
    }

});

Fusion.SimpleSelectionObject = OpenLayers.Class({
    aLayers : null,
    nLayers : 0,

    initialize: function(featureInfoResponse)
    {
        this.aLayers = [];
        this.nLayers = 0;
        try
        {
            var layers = featureInfoResponse.FeatureInformation.FeatureSet[0].Layer;
            if (layers != null)
            {
                for(var i = 0; i < layers.length; i++)
                {
                    var layerId = layers[i]['@id'][0];

                    var classElt = layers[i]['Class'][0];
                    var className = layers[i]['Class'][0]['@id'][0];

                    var layer = new Fusion.SimpleSelectionObject.Layer(layerId, className);

                    this.addLayer(layer);

                    var features = classElt.ID;
                    for(var j=0; j < features.length; j++)
                    {
                        layer.addFeature(features[j]);
                    }
                }
            }
        }
        catch(e) {}

    },

    addLayer: function(layer)
    {
        this.aLayers[this.nLayers] = layer;
        this.nLayers++;
    },

    getNumLayers : function()
    {
        return this.nLayers;
    },

    getLayerByName : function(name)
    {
        var oLayer = null;
        for (var i=0; i<this.nLayers; i++)
        {
            if (this.aLayers[i].getName() == name)
            {
                oLayer = this.aLayers[i];
                break;
            }
        }
        return oLayer;
    },

    getLayer : function(iIndice)
    {
        if (iIndice >=0 && iIndice < this.nLayers)
        {
            return this.aLayers[iIndice];
        }
        else
        {
            return null;
        }
    },

    getSelectionXml : function()
    {
        var xmlSelection = "";
        if(this.nLayers > 0)
        {
            xmlSelection = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<FeatureSet>\n";
            for(var i = 0; i < this.nLayers; i++)
            {
                var layer = this.aLayers[i];
                xmlSelection += "<Layer id=\"" + layer.getName() + "\">\n";
                xmlSelection += "<Class id=\"" + layer.getClassName() + "\">\n";
                for(var j = 0; j < layer.getNumFeatures(); j++)
                {
                    var featId = layer.featIds[j];
                    xmlSelection += "<ID>" +  featId + "</ID>\n";
                }
                xmlSelection += "</Class>\n</Layer>\n";
            }
            xmlSelection += "</FeatureSet>\n";
        }
        return xmlSelection;
    },

    merge : function(previousSelection)
    {
        if (previousSelection != null && previousSelection.nLayers > 0)
        {
            for (var prevSelIndex = 0; prevSelIndex < previousSelection.nLayers; prevSelIndex++)
            {
                var prevSelLayer = previousSelection.aLayers[prevSelIndex];

                // find the previously selected layer name in the current selection
                var currentLayer = this.getLayerByName(prevSelLayer.getName());
                if (currentLayer != null)
                {
                    // add the previously selected features for this layer
                    for (var j = 0; j < prevSelLayer.getNumFeatures(); j++)
                    {
                        var prevSelFeatureIndexes = currentLayer.featIds.find(prevSelLayer.featIds[j]);
                        if (prevSelFeatureIndexes == null)
                        {
                            currentLayer.addFeature(prevSelLayer.featIds[j]);
                        }
                        else
                        {
                            // the feature was previously selected, so toggle it off when selected again
                            currentLayer.removeFeatures(prevSelFeatureIndexes);
                        }
                    }
                    if (currentLayer.featIds.length == 0)
                    {
                        this.clear();
                    }
                }
                else
                {
                    // the current selection does not include this previously selected layer

                    // need to add this previously selected layer and its features
                    var missingLayer = new Fusion.SimpleSelectionObject.Layer(prevSelLayer.getName(), prevSelLayer.getClassName());
                    for (var k = 0; k < prevSelLayer.getNumFeatures(); k++)
                    {
                        missingLayer.addFeature(prevSelLayer.featIds[k]);
                    }
                    this.addLayer(missingLayer);
                }
            }
        }
    },

    clear: function()
    {
        this.aLayers = [];
        this.nLayers = 0;
    }
});

Fusion.SimpleSelectionObject.Layer = OpenLayers.Class({
    name: "",
    className: "",
    featIds: null,
    nFeatures: 0,

    initialize: function(layerName, className)
    {
        this.name =  layerName;
        this.className = className;
        this.nFeatures = 0;
        this.featIds =  [];
    },

    addFeature : function (featId)
    {
        this.featIds[this.nFeatures] = featId;
        this.nFeatures++;
    },

    getName : function()
    {
        return this.name;
    },

    getClassName : function()
    {
        return this.className;
    },

    getNumFeatures : function()
    {
        return this.nFeatures;
    },

    removeFeatures : function (featureIndexes)
    {
        var numIndexes = featureIndexes.length;
        for (var featIndex = 0; featIndex < numIndexes; featIndex++)
        {
            this.featIds.remove(featureIndexes[featIndex]);
            this.nFeatures--;
        }
    }
});

Array.prototype.find = function(searchStr) {
  var returnArray = null;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
};

Array.prototype.remove = function(indexToRemove) {
    this.splice(indexToRemove, 1);
};