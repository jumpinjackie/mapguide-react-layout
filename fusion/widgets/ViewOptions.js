/**
 * Fusion.Widget.ViewOptions
 *
 * $Id: ViewOptions.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ViewOptions
 *
 * A widget to allow selection of the display units for various widgets
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 ****************************************************************************/

Fusion.Widget.ViewOptions = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Menu,
    displayUnits: false,
    options: {
        'imperial': 'Miles', 
        'metric': 'Meters',
        'deg': 'Degrees'
    },
        
    menuItems: null,
    
    system: null,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;

        this.displayUnits = json.DisplayUnits ? json.DisplayUnits[0] : false;
        this.paramRegister.push("Units");
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.setMapUnits, this));
        this.menuItems = {};
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.prototype.setUiObject.apply(this, [uiObj]);
        var buttonSet = new Jx.ButtonSet();
        //set up the root menu
        for (var key in this.options) {
            var menuItem = new Jx.Menu.Item({
                label: OpenLayers.i18n(key),
                toggle: true,
                onDown: OpenLayers.Function.bind(this.setViewOptions, this, this.options[key])
            });
            buttonSet.add(menuItem);
            this.uiObj.add(menuItem);
            this.menuItems[key] = menuItem;
        }        
    },
    
    setViewOptions: function(units) {
        this.getMap().setViewOptions(units);
    },
    
    setMapUnits: function() {
        var units = this.displayUnits ? this.displayUnits : this.getMap().getUnits();
        this.setViewOptions(units);
        this.system = Fusion.unitSystem(Fusion.unitFromName(units));
        if (this.menuItems[this.system]) {
            this.menuItems[this.system].setActive(true);
        }
    },
    
    setParameter: function(param, value) {
        if (param == 'Units' && this.system != Fusion.unitSystem(Fusion.unitFromName(value))) {
            this.system = Fusion.unitSystem(Fusion.unitFromName(value))
            if (this.menuItems[this.system]) {
                this.menuItems[this.system].setActive(true);
            }
        }
    }
});
