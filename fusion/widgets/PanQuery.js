/**
 * Fusion.Widget.PanQuery
 *
 * $Id: PanQuery.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.PanQuery
 *
 * A widget that combines pan and query functionality.  If the mouse is moved
 * before being released, a pan is performedd, otherwise a query is executed.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

//Fusion.require('widgets/Pan.js');

Fusion.Widget.PanQuery = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,
    selectionType: 'INTERSECTS',
    nTolerance: 3,
    bActiveOnly: false,
    initializeWidget: function(widgetTag) {
        this.control = new OpenLayers.Control.DragPan();
        this.getMap().oMapOL.addControl(this.control);
        //TODO figure out how to set the mouseup via handlerOptions
        this.control.handler.up = OpenLayers.Function.bind(this.mouseUp, this);
        
        var json = widgetTag.extension;
        
        this.nTolerance = json.Tolerance ? Math.abs(parseInt(json.Tolerance)) : 3;
        this.bComputeMetadata = (json.ComputeMetadata &&
                           (json.ComputeMetadata[0] == 'true' ||
                            json.ComputeMetadata[0] == '1')) ? true : false;
        

        var activeOnly = json.QueryActiveLayer ? json.QueryActiveLayer[0] : 'false';
        this.bActiveOnly = (activeOnly == 'true' || activeOnly == '1') ? true : false;
        
        this.cursorNormal = ['auto'];
        this.cursorDrag = ["url('images/grabbing.cur'),move", 'grabbing', '-moz-grabbing', 'move'];
    },

    /**
     * (private) gPan.MouseUp(e)
     *
     * handle mouseup events on the mapObj
     *
     * @param e Event the event that happened on the mapObj
     */
    mouseUp: function(e) {
        //this.getMap().setCursor(this.cursorNormal);
        var handler = this.control.handler;
        
        var p = {x:Event.pointerX(e), y:Event.pointerY(e)};    

        var dx = handler.start.x - handler.last.x;
        var dy = handler.start.y - handler.last.y;
        
        if (Math.abs(dx) < this.nTolerance && Math.abs(dy) < this.nTolerance) {
            //execute query
            var pos = this.getMap().pixToGeo(handler.last.x, handler.last.y);
            var options = {};
            var dfGeoTolerance = this.getMap().pixToGeoMeasure(this.nTolerance);
            var minx = pos.x-dfGeoTolerance; 
            var miny = pos.y-dfGeoTolerance; 
            var maxx = pos.x+dfGeoTolerance; 
            var maxy = pos.y+dfGeoTolerance;
            options.geometry = 'POLYGON(('+ minx + ' ' + miny + ', ' + maxx + ' ' + miny + ', ' + maxx + ' ' + maxy + ', ' + minx + ' ' + maxy + ', ' + minx + ' ' + miny + '))';
            options.selectionType = "INTERSECTS";
            options.computed = this.bComputeMetadata;

            if (this.bActiveOnly) {
                var layer = this.getMap().getActiveLayer();
                if (layer) {
                    options.layers = layer.layerName;
                } else {
                    return;
                }
            }

            if (e.shiftKey) {
                options.extendSelection = true;
            }

            this.getMap().query(options);
        }
        Event.stop(e);
    },    
    activate : function() {
        this.control.activate();
        this.getMap().setCursor(this.cursorNormal);
    },
    
    deactivate: function() {
        /*console.log('Pan.deactivate');*/
        this.control.deactivate();
        this.getMap().setCursor('auto');
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