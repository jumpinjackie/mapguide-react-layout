/**
 * Fusion.Widget.ActivityIndicator
 *
 * $Id: ActivityIndicator.js 2579 2012-09-07 09:20:12Z jng $
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

/*****************************************************************************
 * Class: Fusion.Widget.ActivityIndicator
 *
 * AcitivityIndicator is a widget that shows or hides its DOM element
 * based on whether the map widget is busy or not.  The map widget
 * becomes busy when loading maps, reloading maps or redrawing
 * layers.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **************************************************************************/


Fusion.Widget.ActivityIndicator = OpenLayers.Class(Fusion.Widget, {
    element: null,
    initializeWidget: function(widgetTag) {
        this.element = this.domObj;
        var json = widgetTag.extension;
        if (json.ElementId) {
            var elm = $(json.ElementId[0]);
            if (elm && elm != this.domObj) {
                this.domObj.appendChild(elm);
                this.element = elm;
            }
        }
        this.element.style.visibility = 'hidden';
        this.getMap().registerForEvent(Fusion.Event.MAP_BUSY_CHANGED, 
                              OpenLayers.Function.bind(this.busyChanged, this));
    },
    
    busyChanged: function() {
        this.element.style.visibility = this.getMap().isBusy() ? 'visible' : 'hidden';
    }
});
