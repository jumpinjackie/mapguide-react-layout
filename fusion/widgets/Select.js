/**
 * Fusion.Widget.Select
 *
 * $Id: Select.js 2807 2013-11-13 05:27:56Z jng $
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
 * Class: Fusion.Widget.Select
 *
 * perform a selection on map features
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/


Fusion.Widget.Select = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,
    selectionType: 'INTERSECTS',
    nTolerance: 3,     //default pixel tolerance for a point click
    bActiveOnly: false, //only select feature(s) on the active layer?
    maxFeatures: 0,     //default of 0 selects all features (i.e. no maximum)
    pointClickSingleSelect: true, //default of true causes a point click always to select only a single feature

    initializeWidget: function(widgetTag) {
        this.asCursor = ['auto'];

        this.enable = Fusion.Widget.Select.prototype.enable;

        var json = widgetTag.extension;

        this.selectionType = json.SelectionType ? json.SelectionType[0] : 'INTERSECTS';

        if (json.Tolerance && (parseInt(json.Tolerance[0]) > 0)) {
            this.nTolerance = parseInt(json.Tolerance[0]);
        }

        if (json.MaxFeatures) {
            this.maxFeatures = parseInt(json.MaxFeatures[0]);
        }

        if(json.PointClickSingleSelect) {
            this.pointClickSingleSelect = (json.PointClickSingleSelect[0] != 'false');
        }

        this.bActiveOnly = (json.QueryActiveLayer &&
                           (json.QueryActiveLayer[0] == 'true' ||
                            json.QueryActiveLayer[0] == '1')) ? true : false;

        this.bComputeMetadata = (json.ComputeMetadata &&
                           (json.ComputeMetadata[0] == 'true' ||
                            json.ComputeMetadata[0] == '1')) ? true : false;

        if (this.bActiveOnly) {
            this.getMap().registerForEvent(Fusion.Event.MAP_ACTIVE_LAYER_CHANGED, OpenLayers.Function.bind(this.enable, this));
        }

        var mapWidget = this.getMap();
        this.map = mapWidget.oMapOL;
        this.handler = new OpenLayers.Handler.Box(this,{done: this.execute});
        //this.shiftHandler = new OpenLayers.Handler.Box(this,{done: this.extend},
        //                                {keyMask:OpenLayers.Handler.MOD_SHIFT});
        mapWidget.handlers.push(this.handler);
        //mapWidget.handlers.push(this.shiftHandler);

    },

    shouldActivateWith: function(widget) {
        return (widget instanceof Fusion.Widget.SelectPolygon &&
                widget.widgetUniqueId == this.widgetUniqueId);
        
    },
    
    enable: function() {
        if (this.bActiveOnly) {
            var layer = this.getMap().getActiveLayer();
            if (layer && layer.selectable) {
                Fusion.Widget.prototype.enable.apply(this, []);
            } else {
                this.disable();
            }
        } else {
            Fusion.Widget.prototype.enable.apply(this,[]);
        }
    },

    /**
       * activate the widget (listen to mouse events and change cursor)
       * This function should be defined for all functions that register
       * as a widget in the map
       */
    activate: function() {
        this.handler.activate();
        //this.shiftHandler.activate();
        this.getMap().setCursor(this.asCursor);
    },

    /**
       * deactivate the widget (listen to mouse events and change cursor)
       * This function should be defined for all functions that register
       * as a widget in the map
       **/
    deactivate: function() {
        this.handler.deactivate();
        //this.shiftHandler.deactivate();
        this.getMap().setCursor('auto');
    },

    /**
       *  set the extants of the map based on the pixel coordinates
       * passed
       *
       * Parameters:
        *   position will be either an instance of OpenLayers.Bounds when the mouse has
        *   moved, or an OpenLayers.Pixel for click without dragging on the map
        **/
    execute : function(position, extend) {
        if (this.getMap().isDigitizing) {
            //console.log("Currently digitizing. Doing nothing");
            return;
        }
    
        //ctrl click is used to launch a URL defined on the feature. See ClickCTRL widget
        if (this.keyModifiers & OpenLayers.Handler.MOD_CTRL) {
          //return;
        }

        var nRight, nTop;
        var nLeft = position.left;
        var nBottom = position.bottom;
        var maxFeaturesToSelect = this.maxFeatures;

        if (position instanceof OpenLayers.Bounds) {
          nRight = position.right;
          nTop = position.top;
        } else { // it's a pixel
          nRight = nLeft = position.x;
          nTop = nBottom = position.y;
          if(this.pointClickSingleSelect) {
              maxFeaturesToSelect = 1;
          }
        }

        var sMin = this.getMap().pixToGeo(nLeft,nBottom);
        var sMax = this.getMap().pixToGeo(nRight,nTop);
        var nXDelta = Math.abs(nLeft-nRight);
        var nYDelta = Math.abs(nBottom- nTop);

        var options = {};
        if (nXDelta <=this.nTolerance && nYDelta <=this.nTolerance) {
            var dfGeoTolerance = this.getMap().pixToGeoMeasure(this.nTolerance);
            sMin.x = sMin.x-dfGeoTolerance;
            sMin.y = sMin.y-dfGeoTolerance;
            sMax.x = sMax.x+dfGeoTolerance;
            sMax.y = sMax.y+dfGeoTolerance;
        }

        options.geometry = 'POLYGON(('+ sMin.x + ' ' +  sMin.y + ', ' +  sMax.x + ' ' +  sMin.y + ', ' + sMax.x + ' ' +  sMax.y + ', ' + sMin.x + ' ' +  sMax.y + ', ' + sMin.x + ' ' +  sMin.y + '))';
        options.selectionType = this.selectionType;
        options.maxFeatures = maxFeaturesToSelect;
        options.computed = this.bComputeMetadata;

        if (this.bActiveOnly) {
            var layer = this.getMap().getActiveLayer();
            if (layer) {
                options.layers = layer.layerName;
            } else {
                return;
            }
        }

        if (this.handler.dragHandler.evt.shiftKey) {
            options.extendSelection = true;
        }

        this.getMap().query(options);
    },

    /**
        * handler for extending the selection when the shift key is pressed
        *
        * Parameters:
        * evt - the OpenLayers.Event object that is being responded to
        */
    extend: function(position) {
        this.execute(position, true);
    },

    /**
        * calculate the keyboard modifier mask for this event
        *
        * Parameters:
        * evt - the OpenLayers.Event object that is being responded to
        */
    setModifiers: function(evt) {
        this.keyModifiers =
            (evt.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) |
            (evt.ctrlKey  ? OpenLayers.Handler.MOD_CTRL  : 0) |
            (evt.altKey   ? OpenLayers.Handler.MOD_ALT   : 0);
    },

    /**
        * clears the keyboard modifier mask for this event
        *
        * Parameters:
        * evt - the OpenLayers.Event object that is being responded to
        */
    clearModifiers: function(evt) {
      this.keyModifiers = 0;
    },

    /**
        * allows run-time setting of widget parameters
        *
        * Parameters:
        * param - the widget parameter name to set; for the Select widget these may be:
        *               'Tolerance' and 'SelectionType'
        * value - the value to sue for the parameter
        */
    setParameter : function(param, value) {
        if (param == "Tolerance" && value > 0) {
            this.nTolerance = value;
        }
        if (param == 'SelectionType') {
            this.selectionType = value;
        }
    }
});
