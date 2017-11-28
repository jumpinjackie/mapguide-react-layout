/**
 * Fusion.Widget.ZoomToSelection
 *
 * $Id: ZoomToSelection.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ZoomToSelection
 *
 * Zoom to the current selection, if any
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.ZoomToSelection = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    
    initializeWidget: function(widgetTag) {

        var json = widgetTag.extension;
        this.maxDimension = json.MaximumZoomDimension ? json.MaximumZoomDimension[0] : -1;
        this.zoomFactor = json.ZoomFactor ? json.ZoomFactor[0] : 2;
 
        this.enable = Fusion.Widget.ZoomToSelection.prototype.enable;
        
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_ON, OpenLayers.Function.bind(this.enable, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_OFF, OpenLayers.Function.bind(this.disable, this));
    },

     /**
      * Function: activate
      * 
      * get the selection from the map (which may not be loaded yet).
      * zoomToSelection is called when the selection is ready.
      * 
      * Returns:
      * 
      *   return description
      */
    activate: function() {
        this.getMap().getSelection(OpenLayers.Function.bind(this.zoomToSelection, this));
    },

     /**
      * Function: zoomToSelection
      * 
      * set the extents of the map based on the pixel coordinates
      * passed
      * 
      * Parameters:
      * 
      *   selection - the active selection, or null if there is none
      * 
      */
    zoomToSelection: function(selection) {
        var aMaps = this.getMap().getAllMaps();
        var bounds = new OpenLayers.Bounds();
        for (var i=0; i<aMaps.length; ++i) {
          var mapName = aMaps[i].getMapName()
          if (selection[mapName]) {
            var ll = selection[mapName].getLowerLeftCoord();//make this an OL Pixel
            bounds.extend(new OpenLayers.LonLat(ll.x,ll.y));
            var ur = selection[mapName].getUpperRightCoord();
            bounds.extend(new OpenLayers.LonLat(ur.x,ur.y));
          }
        }
        var zoom_size = this.zoomFactor * Math.max( Math.abs(bounds.getWidth()), Math.abs(bounds.getHeight())) / 2;
        var center = bounds.getCenterLonLat();
        llx = center.lon - zoom_size;
        urx = center.lon + zoom_size;
        lly = center.lat - zoom_size;
        ury = center.lat + zoom_size;
        this.getMap().setExtents(new OpenLayers.Bounds(llx,lly,urx,ury));
    },
    
    enable: function() {
        if (this.oMap && this.oMap.hasSelection()) {
            Fusion.Widget.prototype.enable.apply(this, []);
        } else {
            this.disable();
        }
    }

});
