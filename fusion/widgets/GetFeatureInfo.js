/**
 * Fusion.Widget.GetFeatureInfo
 *
 * $Id: GetFeatureInfo.js 1377 2008-04-16 19:27:32Z madair $
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

 /********************************************************************
 * Class: Fusion.Widget.GetFeatureInfo
 *
 * A widget that displays a pre-configured search form to the user and then
 * runs the search.  Searches are done on the attributes of specifiedd layers.
 *
 * uses JavaScript Scale Bar for MapServer 
 * (http://mapserver.commenspace.org/tools/scalebar/
 * 
 *  Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Event.GET_FEATURE_INFO_COMPLETE = Fusion.Event.lastEventId++;

Fusion.Widget.GetFeatureInfo = OpenLayers.Class(Fusion.Widget, 
{
    wmsLayers: [],
    isExclusive: true,
    uiClass: Jx.Button,
    
    initializeWidget: function(widgetTag) {
        //console.log('GetFeatureInfo.initialize');
        var json = widgetTag.extension;
        
        var map = this.getMap().oMapOL;
        // create a new event handler for single click query
        this.handler = new OpenLayers.Handler.Click({ 'map': map }, {
            'click': OpenLayers.Function.bind(this.issueRequest, this) }); 
        
        this.registerEventID(Fusion.Event.GET_FEATURE_INFO_COMPLETE);
        this.getMap().registerEventID(Fusion.Event.WMS_LAYER_ADDED);
        this.getMap().registerForEvent(Fusion.Event.WMS_LAYER_ADDED, 
                          OpenLayers.Function.bind(this.layerAdded,this));
        this.cursorNormal = ["url('images/grab.cur'),move", 'grab', '-moz-grab', 'move'];
    },
    
    /**
     * (public) activate()
     *
     * activate the measure tool
     */
    activateTool: function() {
        this.getMap().activateWidget(this);
    },

    activate: function() {
        this.handler.activate();
    },
    
    deactivate: function() {
        this.handler.deactivate();
    },
    
    issueRequest: function(e) {
      if (this.wmsLayers.length < 1) {
        alert("there are no WMS layers to query");
        return;
      }
      
      var map = this.getMap();
      var queryLayer = map.getActiveLayer();
      var layer = null;
      if (queryLayer) {
        for (var i=0; i<this.wmsLayers.length; ++i) {
          if (queryLayer.layerName == this.wmsLayers[i].wms_name) {
            layer = this.wmsLayers[i];
            break;
          }
        }
      }
      if (!layer) {
        alert('Please select a WMS layer by clicking on the layer name in the legend.');
        return;
      }
      
      var infoFormat = 'text/html';
      if (e.shiftKey) {
        infoFormat = 'text/plain';
      } else if (e.ctrlKey) {
        infoFormat = 'text/xml';
      }
      var size = map.oMapOL.getSize();
      var mouseLoc = map.oMapOL.getLonLatFromPixel(e.xy);
      //for (var i=0; i<this.wmsLayers.length; ++i) {
        //var layer = this.wmsLayers[i];
        var params = {
                      REQUEST: "GetFeatureInfo",
                      VERSION: layer.wms_version,
                      SRS: layer.wms_srs,
                      FORMAT: layer.wms_format,
                      STYLES: "",
                      EXCEPTIONS: "application/vnd.ogc.se_xml",
                      BBOX: map.getCurrentExtents().toBBOX(),
                      X: e.xy.x,
                      Y: e.xy.y,
                      INFO_FORMAT: infoFormat,
                      LAYERS: layer.wms_name,
                      QUERY_LAYERS: layer.wms_name,
                      WIDTH: size.w,
                      HEIGHT: size.h};
        var join = (layer.wms_connection.indexOf('?')<0) ? '?' : '&';
        var url = layer.wms_connection + join + OpenLayers.Util.getParameterString(params);
        /*
        var proxy = '/fusion-1.1/ext/coin/php/RemoteQuery.php?rawoutput=true&remoteUrl=';
        url = proxy + url;
        var infoDialog = new Jx.Dialog({
            contentURL: url,
            modal: false,
            title: 'Feature information for '+layer.wms_name,
            resizable: true
        });
        infoDialog.open();
        */
        //console.log(url);
        window.open(url);
        /*
        OpenLayers.Request.GET({
            url: layer.wms_connection, 
            params: params,
            success: OpenLayers.Function.bind(this.displayResults, this), 
            failure: OpenLayers.Function.bind(this.getFeatureInfoFailed, this), 
            scope: this
        });
        */
      //}
      OpenLayers.Event.stop(e);
    },
    
    displayResults: function(arg1, arg2) {
    },
    
    getFeatureInfoFailed: function(arg1, arg2) {
    },
    
    layerAdded: function(eventId, layers) {
      for (var i=0; i<layers.length; ++i) {
        this.wmsLayers.push(layers[i]);
      }
    }
});

