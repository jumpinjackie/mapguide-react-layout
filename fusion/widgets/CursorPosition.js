/**
 * Fusion.Widget.CursorPosition
 *
 * $Id: CursorPosition.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.CursorPosition
 *
 * Displays the geographic position of the cursor when it is over the map.
 *
 * Precision (integer, optional)
 *
 * The number of digits to round the output to.  The geographic location
 * is calculated with arbitrary precision and is often not necessary. A
 * value of less than 0 means no rounding (the default if parameter is
 * missing).
 *
 * Template (string, optional) 
 *
 * The format of the output string.  Use {x} and {y} as placeholders for
 * the x and y location.  The default template is:
 *
 * x: {x}, y: {y}
 *
 * You can embed HTML in the template, but you must escape any characters
 * that result in illegal HTML.  This would include:
 *
 * < is &lt;
 * > is &gt;
 * & is &amp;
 *
 * So a two-line display would be:
 *
 * x: {x}&lt;br/&gt;y: {y}
 * 
 *  Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.CursorPosition = OpenLayers.Class(Fusion.Widget, {
    defaultTemplate: 'x: {x}, y: {y}',
    domSpan: null,
    
    /* the units to display distances in */
    units: Fusion.UNKNOWN,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        this.template = json.Template ? json.Template[0] : this.defaultTemplate;
        this.precision = json.Precision ? parseInt(json.Precision[0]) : -1;
        this.units = json.Units ? Fusion.unitFromName(json.Units[0]) : Fusion.UNKOWN;

        this.domSpan = document.createElement('span');
        this.domSpan.className = 'spanCursorPosition';
        this.domSpan.innerHTML = this.emptyText;
        this.emptyText = json.EmptyText ? json.EmptyText[0] : 
            (this.domObj ? this.domObj.innerHTML : '');
        if (this.domObj) {
            this.domObj.innerHTML = '';
            this.domObj.appendChild(this.domSpan);
        } 
        this.displayProjection = json.DisplayProjection ? new OpenLayers.Projection(json.DisplayProjection[0]) : null;
        
        this.control = new OpenLayers.Control.MousePosition({
        		div: this.domSpan,
        		formatOutput: OpenLayers.Function.bind(this.formatHTML, this),
        		emptyString: this.emptyText,
        		displayProjection: this.displayProjection
        });
        this.getMap().oMapOL.addControl(this.control);

        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.setUnits, this));
        this.registerParameter('Units');
        
        Fusion.addWidgetStyleSheet(widgetTag.location + '/CursorPosition/CursorPosition.css');
        
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.prototype.setUiObject.apply(this, [uiObj]);
        if (this.uiObj.domObj) {
            this.uiObj.domObj.appendChild(this.domSpan);
        } else {
            this.uiObj.appendChild(this.domSpan);
        }
    },
    
    formatHTML: function(p) {
        if (!this.displayProjection) {
            var mapProj = this.getMap().projection;
            var mapUnit = mapProj.getUnits();

            // convertion from linear units to degree unit.
            if(this.units == Fusion.DEGREES && mapUnit != 'dd' && mapUnit != 'degrees' ) {
                // coordinate transformation from map CS to EPSG:4326.
                var dest = new OpenLayers.Projection("GEOGCS[\"LL84\",DATUM[\"WGS84\",SPHEROID[\"WGS84\",6378137.000,298.25722293]],PRIMEM[\"Greenwich\",0],UNIT[\"Degree\",0.01745329251994]]");
                p = p.transform(this.getMap().projection, dest);
            }
            //else
            //{
                // TODO: convertion from degree unit to linear units
            //}
            
            /* old code for converting between units */
            else if (this.units != Fusion.UNKNOWN) {
                var convFactor = this.getMap().getMetersPerUnit();
                p.lon = Fusion.fromMeter(this.units, p.lon * convFactor);
                p.lat = Fusion.fromMeter(this.units, p.lat * convFactor);
            }
            
            if (this.precision >= 0) {
                var factor = Math.pow(10,this.precision);
                p.lon = Math.round(p.lon * factor)/factor;
                p.lat = Math.round(p.lat * factor)/factor;
            }
        }
        var unitAbbr = Fusion.unitAbbr(this.units);
        var innerHTML = this.template.replace('{x}',p.lon.toFixed(this.precision));
        innerHTML = innerHTML.replace('{y}',p.lat.toFixed(this.precision));
        innerHTML = innerHTML.replace('{units}', unitAbbr).replace('{units}', unitAbbr);
        return innerHTML;
    },

    setUnits: function() {
                if (this.units == Fusion.UNKNOWN) {
                    this.setParameter('Units',this.getMap().getUnits());
                }
    },

    setParameter: function(param, value) {
        if (param == 'Units') {
            var unitName = value;
            if (this.displayProjection) {
                unitName = this.displayProjection.getUnits();
            }
          this.units = Fusion.unitFromName(unitName);
        }
    }
});
