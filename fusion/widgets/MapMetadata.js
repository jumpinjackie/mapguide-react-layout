/**
 * Fusion.Widget.About
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
* Class: Fusion.Widget.MapMetadata
*
* MapMetadata widget to inject map metadata elements into the interface
*
* Inherits from:
*  - <Fusion.Widget>
* **********************************************************************/

Fusion.Widget.MapMetadata = OpenLayers.Class(Fusion.Widget, {
    
    content: 'text',
    layerName: null,
    
/*
 * Constructor: MapMetadata
 *
 * Parameters:
 *
 * widgetTag - JSON node for this widget from the Application definition
 *
 */
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        if (json.MetadataId) {
          this.metadataId =  json.MetadataId[0];
        } else {
          Fusion.reportFatalError( "MetadataId is a required parameter for mapMetadata widget");
        }
        if (json.Content) {
          this.content = json.Content[0];
        }
        if (json.LayerName) {
          this.layerName = json.LayerName[0];
        }
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.showMetadata, this));
    },

    /**
     * Function: showMetadata
     *
     * puts a piece of map metadata into the interface
     * 
     */
    showMetadata: function() {
      var metadataLayer = this.getMapLayer();
      var metadata = metadataLayer.getMetadata(this.metadataId, this.layerName);
      if (metadata) {
        //this.domObj.appendChild(metadata);
        if (this.content == 'markup') {             
          //load in an HTML fragment
          //this isn't working in IE
          var domObj = $(this.domObj);
          domObj.load(metadata);
        } else if ((this.content == 'hyperlink') && this.domObj.tagName == 'A') {
          this.domObj.href = metadata;
        } else {
          this.domObj.innerHTML = metadata;
        }
      }
    }
});
