/**
 * Fusion.Widget.SelectPolygon
 *
 * $Id: SelectPolygon.js 2807 2013-11-13 05:27:56Z jng $
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
 * Class: Fusion.Widget.SelectPolygon
 *
 * perform a selection using a polygon
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.SelectPolygon = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,
    bActiveOnly: false, //only select feature(s) on the active layer?
    selectionType: 'INTERSECTS',
    nTolerance: 3, //default pixel tolernace for a point click
    
    initializeWidget: function(widgetTag) {
        this.asCursor = ['auto'];

        var json = widgetTag.extension;
        
        this.selectionType = json.SelectionType ? json.SelectionType[0] : 'INTERSECTS';
        if (json.Tolerance && (parseInt(json.Tolerance[0]) > 0)) {
            nTolerance = parseInt(json.Tolerance[0]);
        }
        
        this.bActiveOnly = (json.QueryActiveLayer &&
                           (json.QueryActiveLayer[0] == 'true' ||
                            json.QueryActiveLayer[0] == '1')) ? true : false;

        this.bComputeMetadata = (json.ComputeMetadata &&
                           (json.ComputeMetadata[0] == 'true' ||
                            json.ComputeMetadata[0] == '1')) ? true : false;
        
        //add in the OL Polygon handler
        var mapWidget = this.getMap();
        this.map = mapWidget.oMapOL;
        this.handlerOptions = {};
        this.handler = new OpenLayers.Handler.Polygon(this, {done: this.execute}, this.handlerOptions);
        mapWidget.handlers.push(this.handler);
        
        this.keyHandler = OpenLayers.Function.bind(this.onKeyPress, this);
    },
    
    onKeyPress: function(e) {
        var charCode = (e.charCode ) ? e.charCode : ((e.keyCode) ? e.keyCode : e.which);
        if (charCode == OpenLayers.Event.KEY_ESC) {
            this.deactivate();
        }
    },
    
    shouldActivateWith: function(widget) {
        return (widget instanceof Fusion.Widget.SelectPolygon &&
                widget.widgetUniqueId == this.widgetUniqueId);
    },
    
    /**
     * activate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     */
    activate: function() {
        OpenLayers.Event.observe(document,"keypress",this.keyHandler);
        this.handler.activate();
        var map = this.getMap();
        var msg = map.message;
        msg.info(OpenLayers.i18n("selectPolygonPrompt") + ' <a id="abortSelectPolygonLink" href="javascript:void(0)">' + OpenLayers.i18n("stop") + '</a>');
        var link = msg.container.ownerDocument.getElementById("abortSelectPolygonLink");
        //Wire the anchor click
        link.onclick = OpenLayers.Function.bind(this.deactivate, this);
        map.setCursor(this.asCursor);
        map.supressContextMenu(true);
        map.isDigitizing = true;
        map.triggerEvent(Fusion.Event.MAP_DIGITIZER_ACTIVATED);
    },

    /**
     * deactivate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     **/
    deactivate: function() {
        OpenLayers.Event.stopObserving(document,"keypress",this.keyHandler);
        this.handler.deactivate();
        var map = this.getMap();
        map.message.clear();
        map.setCursor('auto');
        map.supressContextMenu(false);
        map.isDigitizing = false;
        map.triggerEvent(Fusion.Event.MAP_DIGITIZER_DEACTIVATED);
    },
    
    /**
     *  
     **/
    execute: function(geom) {
        var options = {};
        var points = geom.getVertices();
        if (points.length < 3) {
            return;
        }
        options.geometry = geom.toString();
        options.selectionType = this.selectionType;
        options.computed = this.bComputeMetadata;
        
        if (this.handler.evt.ctrlKey) {
            options.extendSelection = true;
        }

        if (this.bActiveOnly) {
            var layer = this.getMap().getActiveLayer();
            if (layer) {
                options.layers = layer.layerName;
            } else {
                return;
            }
        }
        
        this.getMap().query(options);
        this.deactivate();
        return false;
    },
    
    setParameter: function(param, value) {
        if (param == "Tolerance" && value > 0) {
            this.nTolerance = value;
        }
        if (param == 'SelectionType') {
            this.selectionType = value;
        }
    }
});
