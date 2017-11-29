/**
 * Fusion.Widget.ViewSize
 *
 * $Id: ViewSize.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ViewSize
 *
 * Display the size of the current view in user-definable units
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 ****************************************************************************/
Fusion.Widget.ViewSize = OpenLayers.Class(Fusion.Widget, {
    defaultTemplate: 'x: {x}, y: {y}',
    domSpan: null,
    emptyText: '',
    
    /* the units to display distances in */
    units: Fusion.UNKNOWN,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        this.template = json.Template ? json.Template[0] : this.defaultTemplate;
        this.precision = json.Precision ? parseInt(json.Precision[0]) : -1;
        this.units = json.Units ? Fusion.unitFromName(json.Units[0]) : Fusion.UNKOWN;

        this.domSpan = document.createElement('span');
        this.domSpan.className = 'spanViewSize';
        this.domSpan.innerHTML = this.emptyText;
        if (this.domObj) {
            this.emptyText =  this.domObj.innerHTML;
            this.domObj.innerHTML = '';
            this.domObj.appendChild(this.domSpan);
        }
        
        this.getMap().registerForEvent(Fusion.Event.MAP_RESIZED, OpenLayers.Function.bind(this.updateViewSize, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.setUnits, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.updateViewSize, this));
        this.registerParameter('Units');
        
        Fusion.addWidgetStyleSheet(widgetTag.location + '/ViewSize/ViewSize.css');
        
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.prototype.setUiObject.apply(this, [uiObj]);
        if (this.uiObj.domObj) {
            this.uiObj.domObj.appendChild(this.domSpan);
        } else {
            this.uiObj.appendChild(this.domSpan);
        }
    },

    updateViewSize: function(e) {
        var map = this.getMap();
        var p = map.getSize();
        if (this.units != Fusion.PIXELS) {
            var gw = map.pixToGeoMeasure(p.w);
            var gh = map.pixToGeoMeasure(p.h);
            if (this.units != Fusion.UNKNOWN) {
                var convFactor = map.getMetersPerUnit();
                gw = Fusion.fromMeter(this.units, gw * convFactor);
                gh = Fusion.fromMeter(this.units, gh * convFactor);
            }
            if (this.precision >= 0) {
                var factor = Math.pow(10,this.precision);
                gw = Math.round(gw * factor)/factor;
                gh = Math.round(gh * factor)/factor;
            }
        }
        var unitAbbr = Fusion.unitAbbr(this.units);
        this.domSpan.innerHTML = this.template.replace('{w}',gw).replace('{h}',gh).replace('{units}', unitAbbr).replace('{units}', unitAbbr);
    },

    setUnits: function() {
      if (this.units == Fusion.UNKNOWN) {
        this.setParameter('Units',this.getMap().getUnits());
      }
      this.updateViewSize();
    },

    setParameter: function(param, value) {
        if (param == 'Units') {
            this.units = Fusion.unitFromName(value);
            this.updateViewSize();
        }
    }
});
