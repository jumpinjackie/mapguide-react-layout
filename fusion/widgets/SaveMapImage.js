/**
 * Fusion.Widget.SaveMapImage
 *
 * $Id: About.js 1656 2008-11-08 21:44:26Z madair $
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
* Class: Fusion.Widget.SaveMapImage
*
* SaveMapImage widget to display a pop-up window with an image of the map
* that can be saved to the users disk
*
* Inherits from:
*  - <Fusion.Widget>
* **********************************************************************/

Fusion.Widget.SaveMapImage = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    
/*
 * Constructor: SaveMapImage
 *
 * Parameters:
 *
 * widgetTag - JSON node for this widget from the Application definition
 *
 */
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        //this.enable();
    },

    /**
     * Function: execute
     *
     * opens a pop-up window with the about information when invoked
     * 
     */
    activate: function() {
      var map = this.oMap.oMapOL;
      var imageUrl = null;
      if (map.baseLayer.singleTile) {
        var imageUrl = map.baseLayer.grid[0][0].url;
      } //TODO: how to get tiled and overlay images??
      
      if (imageUrl) {
        window.open(imageUrl,'','');
      }
    }
});
