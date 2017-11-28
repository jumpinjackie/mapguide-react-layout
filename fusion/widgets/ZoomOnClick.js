/**
 * Fusion.Widget.ZoomOnClick
 *
 * $Id: ZoomOnClick.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ZoomOnClick
 *
 * Zoom the map by a fixed amount when a button is clicked
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/
Fusion.Widget.ZoomOnClick = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    factor: 4,
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.factor = parseFloat(json.Factor ? json.Factor[0] : this.factor);
    },

    /**
     * called when the button is clicked by the Fusion.Widget widget
     */
    activate: function() {
        var center = this.getMap().getCurrentCenter();
        this.getMap().zoom(center.x, center.y, this.factor);
    },

    setParameter: function(param, value) {
        if (param == "Factor" && value > 0) {
            this.factor = value;
        }
    }
});
