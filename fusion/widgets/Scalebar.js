/**
 * Fusion.Widget.Scalebar
 *
 * $Id: Scalebar.js 2675 2013-03-25 03:32:46Z jng $
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
 * Class: Fusion.Widget.Scalebar
 *
 * A dynamically generated cartographic scalebar 
 *
 * uses JavaScript Scale Bar for MapServer 
 * (http://mapserver.commenspace.org/tools/scalebar/
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/


if (typeof(ScaleBarTool)=='undefined') {
    Fusion.require('widgets/scalebar/scalebartool.js');
}

Fusion.Widget.Scalebar = OpenLayers.Class(Fusion.Widget, {
    style: 'thin',
    displaySystem: 'metric',
    minWidth: 100,
    maxWidth: 200,
    divisions: 2,
    subdivisions: 2,
    showMinorMeasures: true,
    abbreviateLabel: true,
    singleLine: false,
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.style = json.Style ? json.Style[0].toLowerCase() : this.style;
        if (this.style != 'fancy' && 
            this.style != 'fat' && 
            this.style != 'thin' && 
            this.style != 'thinner') {
            this.style = 'thin';
        }
        
        this.displaySystem = json.DisplaySystem ? json.DisplaySystem[0] : this.displaySystem;
        this.minWidth = json.MinWidth ? json.MinWidth[0] : this.minWidth;
        this.maxWidth = json.MaxWidth ? json.MaxWidth[0] : this.maxWidth;
        this.divisions = json.Divisions ? json.Divisions[0] : this.divisions;
        this.subdivisions = json.SubDivisions ? json.SubDivisions[0] : this.subdivisions;
        this.showMinorMeasures = (json.ShowMinorMeasures && json.ShowMinorMeasures[0]) == 'false' ? false : true;
        this.abbreviateLabel = (json.AbbreviateLabel && json.AbbreviateLabel[0]) == 'true' ? true : false;
        this.singleLine = (json.SingleLine && json.SingleLine[0]) == 'true' ? true : false;
        
        
        if (document.styleSheets) {
            if (document.styleSheets[0]) {
                var url = Fusion.getFusionURL() + 'widgets/scalebar/scalebar-'+this.style+'.css';
                //console.log(url);
                if (document.styleSheets[0].addImport) {
                    document.styleSheets[0].addImport(url);
                } else {
                    document.styleSheets[0].insertRule('@import url('+url+');',0);
                }
            }
        }

        this.oScaleBar = new ScaleBarTool(1);
        this.oScaleBar.displaySystem = this.displaySystem;
        this.oScaleBar.minWidth = this.minWidth;
        this.oScaleBar.maxWidth = this.maxWidth;
        this.oScaleBar.divisions = this.divisions;
        this.oScaleBar.subdivisions = this.subdivisions;
        this.oScaleBar.showMinorMeasures = this.showMinorMeasures;
        this.oScaleBar.abbreviateLabel = this.abbreviateLabel;
        this.oScaleBar.singleLine = this.singleLine;
        
        //FireFox gives the following error when just calling place
        //but putting it in a timeout seems to fix the problem.  When
        //debugging using firebug, the problem doesn't occur.
        //this.oScaleBar.place(widgetTag.name);
        //A parameter or an operation is not supported by the underlying object"  code: "15
        window.setTimeout(OpenLayers.Function.bind(this.oScaleBar.place, this.oScaleBar, widgetTag.name), 1);

        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.extentsChangedCB, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.extentsChangedCB, this));
    },

    extentsChangedCB : function() {
        this.oScaleBar.update(this.getMap().getScale());
    }
});
