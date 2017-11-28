/**
 * Fusion.Widget.SelectRadius
 *
 * $Id: SelectRadius.js 2807 2013-11-13 05:27:56Z jng $
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
 * Class: Fusion.Widget.SelectRadius
 *
 * perform a selection by radius from a point
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/
Fusion.Event.RADIUS_WIDGET_ACTIVATED = Fusion.Event.lastEventId++;

Fusion.Widget.SelectRadius = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,
    selectionType: 'INTERSECTS',
    bActiveOnly: false, //only select feature(s) on the active layer?
    nTolerance: 3, //default pixel tolernace for a point click
    defaultRadius: 20, //this is now in pixels
    
    initializeWidget: function(widgetTag) {
        this.asCursor = ['auto'];

        var json = widgetTag.extension;
        this.selectionType = json.SelectionType ? json.SelectionType[0] : 'INTERSECTS';

        if (json.Tolerance && (parseInt(json.Tolerance[0]) > 0)) {
            nTolerance = parseInt(json.Tolerance[0]);
        }

        this.defaultRadius = json.DefaultRadius ? parseInt(json.DefaultRadius[0]) : this.defaultRadius;
        this.bComputeMetadata = (json.ComputeMetadata &&
                           (json.ComputeMetadata[0] == 'true' ||
                            json.ComputeMetadata[0] == '1')) ? true : false;
        
        this.bActiveOnly = (json.QueryActiveLayer &&
                           (json.QueryActiveLayer[0] == 'true' ||
                            json.QueryActiveLayer[0] == '1')) ? true : false;
        
        var container = json.RadiusTooltipContainer ? json.RadiusTooltipContainer[0] : '';
        if (container != '') {
            this.radiusTip = $(container);
        }
        
        if (this.radiusTip) {
            this.radiusTipType = json.RadiusTooltipType ?
                                 json.RadiusTooltipType[0].toLowerCase() : 'dynamic';
            if (this.radiusTipType == 'dynamic') {
                var oDomElem =  this.getMap().getDomObj();
                oDomElem.appendChild(this.radiusTip);
                this.radiusTip.style.position = 'absolute';
                this.radiusTip.style.display = 'none';
                this.radiusTip.style.top = '0px';
                this.radiusTip.style.left = '0px';
                this.radiusTip.style.zIndex = 101;
            }
        }
        
        this.registerEventID(Fusion.Event.RADIUS_WIDGET_ACTIVATED);
        
        //add in the OL Polygon handler
        var mapWidget = this.getMap();
        this.map = mapWidget.oMapOL;
        this.handlerOptions = {sides: 40};
        this.handler = new OpenLayers.Handler.RegularPolygon(this, {
            interval: 100,
            done: this.execute,
            down: this.mouseDown,
            move: this.mouseMove
            }, this.handlerOptions);
        mapWidget.handlers.push(this.handler);
        
        this.keyHandler = OpenLayers.Function.bind(this.onKeyPress, this);
    },
    
    setRadius: function(r) {
        this.defaultRadius = r;
    },
    
    getRadius: function() {
        if (this.handler.active) {
            return this.handler.radius;
        } else {
            return this.defaultRadius;
        }
    },
    
    onKeyPress: function(e) {
        var charCode = (e.charCode ) ? e.charCode : ((e.keyCode) ? e.keyCode : e.which);
        if (charCode == OpenLayers.Event.KEY_ESC) {
            this.deactivate();
        }
    },
    
    /**
     * activate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     */
    activate: function() {
        OpenLayers.Event.observe(document,"keypress",this.keyHandler);
        var radius = this.getMap().pixToGeoMeasure(this.defaultRadius);
        this.handler.setOptions({radius: radius});
        this.handler.activate();
        var map = this.getMap();
        map.setCursor(this.asCursor);
        /*map units for tool tip*/
        this.units = map.units;
        var msg = map.message;
        msg.info(OpenLayers.i18n("selectRadiusPrompt") + ' <a id="abortSelectRadiusLink" href="javascript:void(0)">' + OpenLayers.i18n("stop") + '</a>');
        var link = msg.container.ownerDocument.getElementById("abortSelectRadiusLink");
        //Wire the anchor click
        link.onclick = OpenLayers.Function.bind(this.deactivate, this);
        map.supressContextMenu(true);
        this.triggerEvent(Fusion.Event.RADIUS_WIDGET_ACTIVATED, true);
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
        /*icon button*/
        this.triggerEvent(Fusion.Event.RADIUS_WIDGET_ACTIVATED, false);
        map.isDigitizing = false;
        map.triggerEvent(Fusion.Event.MAP_DIGITIZER_DEACTIVATED);
    },
    
    /**
     * (public) mouseDown(e)
     *
     * handle the mouse down event
     *
     * @param e Event the event that happened on the mapObj
     */
    mouseDown: function(geom) {
        var evt = this.handler.evt;
        if (OpenLayers.Event.isLeftClick(evt)) {
            this.handler.fixedRadius = false;

            var p = this.getMap().getEventPosition(evt);
            var point = this.getMap().pixToGeo(p.x, p.y);
            var radius = this.getMap().pixToGeoMeasure(this.handler.radius);

            if (this.radiusTip && this.radiusTipType == 'dynamic') {
                this.radiusTip.style.display = 'block';
                var size = $(this.radiusTip).getBorderBoxSize();
                this.radiusTip.style.top = (p.y - size.height*2) + 'px';
                this.radiusTip.style.left = p.x + 'px';
                if (this.units == 'm' || this.units == 'ft') {
                    radius = Math.round(radius * 100)/100;
                }
                this.radiusTip.innerHTML = radius + this.units;
            }
        }
    },

    /**
     * (public) mouseMove(e)
     *
     * handle the mouse move event
     *
     * @param e Event the event that happened on the mapObj
     */
    mouseMove: function(geom) {
        
        var evt = this.handler.evt;
        if (OpenLayers.Event.isLeftClick(evt)) {
            var map = this.getMap();
            var p = map.getEventPosition(evt);
            var point = map.pixToGeo(p.x, p.y);
            //var center = this.circle.center;

            var radius = this.getMap().pixToGeoMeasure(this.handler.radius);//Math.sqrt(Math.pow(center.x-point.x,2) + Math.pow(center.y-point.y,2));

            if (this.radiusTip && this.radiusTipType == 'dynamic') {
                this.radiusTip.style.display = 'block';
                var size = $(this.radiusTip).getBorderBoxSize();
                this.radiusTip.style.top = (p.y - size.height*2) + 'px';
                this.radiusTip.style.left = p.x + 'px';
                if (this.units == 'm' || this.units == 'ft') {
                    radius = Math.round(radius * 100)/100;
                }
                this.radiusTip.innerHTML = radius + this.units;
            }
        }
    },
    
    /**
     *  set the extants of the map based on the pixel coordinates
     * passed
     * 
     * @param center
     * @param radius
     **/
    execute: function(geom) {
        if (this.radiusTip && this.radiusTipType == 'dynamic') {
            this.radiusTip.style.display = 'none';
            this.radiusTip.innerHTML = '';
        }
        if (this.handler.start == this.handler.last) {
            this.handler.clear();
        }

        var options = {};
        options.geometry = geom.toString();
        options.selectionType = this.selectionType;
        options.computed = this.bComputeMetadata;

        if (this.bActiveOnly) {
            var layer = this.getMap().getActiveLayer();
            if (layer) {
                options.layers = layer.layerName;
            } else {
                return;
            }
        }
        
        if (this.handler.evt.shiftKey) {
            options.extendSelection = true;
        }
        
        this.getMap().query(options);
        this.deactivate();
    },
    
    setParameter : function(param, value) {
        if (param == "Tolerance" && value > 0) {
            this.nTolerance = value;
        }
        if (param == 'SelectionType') {
            this.selectionType = value;
        }
    }
});
