/**
 * Fusion.Widget.ScalebarDual
 *
 * $Id: ScalebarDual.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ScalebarDual
 *
 * A dynamically generated cartographic scalebar that looks like the Google scalebar
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.ScalebarDual = OpenLayers.Class(Fusion.Widget, {
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        var maxWidth = json.MaxWidth ? parseInt(json.MaxWidth[0]) : 300;
        var topInUnits = json.TopInUnits ? json.TopInUnits[0] : 'ft';
        var topOutUnits = json.TopOutUnits ? json.TopOutUnits[0] : 'mi';
        var bottomInUnits = json.BottomInUnits ? json.BottomInUnits[0] : 'm';
        var bottomOutUnits = json.BottomOutUnits ? json.BottomOutUnits[0] : 'km';
        var options = {   //set these from widgetTag extension
            maxWidth:  maxWidth,
            topInUnits: topInUnits,
            topOutUnits: topOutUnits,
            bottomInUnits: bottomInUnits,
            bottomOutUnits: bottomOutUnits
        };
        if (this.domObj) {
            options.div = this.domObj;
        }
        this.addControl(new OpenLayers.Control.ScaleLine(options));
    }
});
