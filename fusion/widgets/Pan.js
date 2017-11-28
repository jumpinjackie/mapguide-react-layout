/**
 * Fusion.Widget.Pan
 *
 * $Id: Pan.js 2686 2013-04-05 11:44:39Z jng $
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
 * Class: Fusion.Widget.Pan
 *
 * A widget that allows for naviagtion by panning
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Pan = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,
    initializeWidget: function(widgetTag) {
        this.control = new OpenLayers.Control.DragPan();
        this.getMap().oMapOL.addControl(this.control);
        this.control.handler.keyMask = 0;
        var index = window.location.href.indexOf("?");
        var mainpath = window.location.href.substring(0,index);
        index = mainpath.lastIndexOf("/");
        mainpath = mainpath.substring(0,index+1);
        var grabpath= "url(" + mainpath + "images/grab.cur" + "), move";
        var grabbingpath = "url(" + mainpath + "images/grabbing.cur" + "), move";
        
        this.cursorNormal = [grabpath, 'grab', '-moz-grab', 'move'];
        this.cursorDrag = [grabbingpath, 'grabbing', '-moz-grabbing', 'move'];
        
        //We're interested in these events, because this widget could get in the way
        this.getMap().registerForEvent(Fusion.Event.MAP_DIGITIZER_ACTIVATED, OpenLayers.Function.bind(this.onDigitizerActivated, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_DIGITIZER_DEACTIVATED, OpenLayers.Function.bind(this.onDigitizerDeactivated, this));
    },
    
    onDigitizerActivated: function() {
        this.bRestoreActiveState = this.isActive;
        //TODO: What we really want is to do is filter out the valid mouse buttons for a drag. So we can
        //still pan while digitizing via the middle mouse button.
        //This is an OpenLayers-level limitation (the drag handler is hardcoded to left mouse button)
        this.deactivate();
    },
    
    onDigitizerDeactivated: function() {
        if (this.bRestoreActiveState === true) {
            this.activate();
            this.bRestoreActiveState = false;
        }
    },

    activate : function() {
        //TODO: Why Fusion.Widget has no active state flag? Probably should have one
        this.isActive = true;
        this.control.activate();
        this.getMap().setCursor(this.cursorNormal);
    },
    
    deactivate: function() {
        this.isActive = false;
        /*console.log('Pan.deactivate');*/
        this.control.deactivate();
        this.getMap().setCursor('auto');
    }
});
