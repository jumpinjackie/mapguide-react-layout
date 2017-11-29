/**
 * Fusion.Widget.Geolocation
 *
 * $Id: About.js 2585 2012-09-07 14:01:25Z jng $
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
* Class: Fusion.Widget.Geolocation
*
* A widget that pans (and optionally zoom) to the user's current geographic location
*
* Inherits from:
*  - <Fusion.Widget>
* **********************************************************************/

Fusion.Widget.Geolocation = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    
    nZoom: null,
    bEnableHighAccuracy: false,
    nTimeout: 5000,
    nMaximumAge: 0,
    geoProj: null,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        var geoOptions = {};
        if (json.ZoomLevel)
            this.nZoom = parseInt(json.ZoomLevel[0]);
        if (json.EnableHighAccuracy)
            geoOptions.enableHighAccuracy = (json.EnableHighAccuracy[0] == "true");
        if (json.Timeout)
            geoOptions.timeout = parseInt(json.Timeout[0]);
        if (json.MaximumAge)
            geoOptions.maximumAge = parseInt(json.MaximumAge[0]);
            
        this.geoOptions = geoOptions;
        
        this.enable();
    },
    
    onPositionError: function(error) {
        //Maybe use MapMessage for non-intrusive error display?
        switch(error.code) {
            case 1: //Permission denied
                this.getMap().message.error(error.message);
            case 2: //Position unavailable
                this.getMap().message.error(error.message);
            case 3: //Timeout
                this.getMap().message.error(error.message);
            default:
                console.error("Error with geolocation: (" + error.code + ") " + error.message);
        }
    },
    
    onPositionRetrieved: function(pos) {
        var mapWidget = this.getMap();
        var olMap = mapWidget.oMapOL;
        
        if (this.geoProj == null)
            this.geoProj = new OpenLayers.Projection("EPSG:4326");
        var mapProj = olMap.projection;
        
        var lonlat = new OpenLayers.LonLat(pos.coords.longitude, pos.coords.latitude);
        lonlat.transform(this.geoProj, mapProj);
        
        var msg = null;
        if (!mapWidget.initialExtents.contains(lonlat)) {
            msg = OpenLayers.i18n("currentPositionOutsideInitialView");
        } else if (!olMap.maxExtent.contains(lonlat)) {
            msg = OpenLayers.i18n("currentPositionOutsideMaxExtent");
        }
        if (msg != null) {
            var msgbar = this.getMap().message;
            msgbar.warn(msg);
            setTimeout(function() { msgbar.hideDesignatedMessage(msg); }, 5000);
        }

        if (this.nZoom == null) {
            olMap.moveTo(lonlat);
        } else {
            var extent = mapWidget.getExtentFromPoint(lonlat.lon, lonlat.lat, this.nZoom);
            mapWidget.setExtents(extent);
        }
    },

    /**
     * Function: activate
     *
     * Pan (and optionally zoom) to the user's current geographic location
     * 
     */
    activate: function() {
        if (typeof(navigator.geolocation) == 'undefined') {
            alert(OpenLayers.i18n("geolocation_unsupported"));
        } else {
            navigator.geolocation.getCurrentPosition(
                OpenLayers.Function.bind(this.onPositionRetrieved, this),
                OpenLayers.Function.bind(this.onPositionError, this),
                this.geoOptions);
        }
    }
});
