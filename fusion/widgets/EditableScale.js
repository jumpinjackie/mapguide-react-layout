/**
 * Fusion.Widget.EditableScale
 *
 * $Id: EditableScale.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.EditableScale
 *
 * The user can manually type in a new scale
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.EditableScale = OpenLayers.Class(Fusion.Widget, {
    precision: 4,
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        this.domPrefix = document.createElement('span');
        this.domPrefix.className = 'inputEditableScalePrefix';
        this.domPrefix.innerHTML = '1: ';
        this.domScale = document.createElement('input');
        this.domScale.className = 'inputEditableScale';
        OpenLayers.Event.observe(this.domScale, 'keypress', 
           OpenLayers.Function.bindAsEventListener(this.keyPressHandler, this));
        this.precision = json.Precision ? parseInt(json.Precision[0]) : this.precision;
        
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.scaleChanged, this));
        
        Fusion.addWidgetStyleSheet(widgetTag.location + '/EditableScale/EditableScale.css');
        
        if (this.domObj) {
            this.domObj.appendChild(this.domPrefix);
            this.domObj.appendChild(this.domScale);
        }
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.prototype.setUiObject.apply(this, [uiObj]);
        if (this.uiObj.domObj) {
            this.uiObj.domObj.appendChild(this.domPrefix);
            this.uiObj.domObj.appendChild(this.domScale);
        } else {
            this.uiObj.appendChild(this.domPrefix);
            this.uiObj.appendChild(this.domScale);
        }
    },
    
    scaleChanged: function() {
        this.domScale.value = this.scaleToString(this.getMap().oMapOL.getScale());
    },
    
    scaleToString: function(scale) {
        scale = Math.abs(parseFloat(scale));
        return "" + Math.round(scale * Math.pow(10,this.precision))/Math.pow(10,this.precision);
    },
    
    keyPressHandler: function(e) {
        if (e.keyCode == OpenLayers.Event.KEY_RETURN) {
            this.zoomToScale();
        }
    },
    
    zoomToScale: function(e) {
        var scale = parseFloat(this.domScale.value);
        if (scale) {
            this.getMap().zoomToScale(scale);
        }
    }
});