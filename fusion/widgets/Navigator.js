/**
 * Fusion.Widget.Navigator
 *
 * $Id: Navigator.js 2690 2013-04-24 11:03:56Z jng $
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
 * Class: Fusion.Widget.Navigator
 *
 * A widget that immplements an in-map navigation control with zoom and pan.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Navigator = OpenLayers.Class(Fusion.Widget, {
    bInternalChange: false,
    zoomInFactor: 4,
    zoomOutFactor: 2,
    panAmount: 50,
    initializeWidget: function(widgetTag) {
        this.activeControls = [];

        var m = document.createElement('map');
        m.name = 'Navigator_ImageMap';
        m.id = 'Navigator_ImageMap';

        var a = document.createElement('area');
        a.shape = 'poly';
        a.alt = OpenLayers.i18n('panEast');
        a.title = OpenLayers.i18n('panEast');
        a.coords = '27,176, 27,177, 40,190, 44,182, 44,159';
        var panEast = OpenLayers.Function.bind(this.pan, this, this.panAmount/100, 0);
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(panEast, this));
        m.appendChild(a);

        var a = document.createElement('area');
        a.shape = 'poly';
        a.alt = OpenLayers.i18n('panWest');
        a.title = OpenLayers.i18n('panWest');
        a.coords = '24,177, 24,176, 7,159, 7,182, 11,190';
        var panWest = OpenLayers.Function.bind(this.pan, this, -this.panAmount/100, 0);
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(panWest, this) );
        m.appendChild(a);

        var a = document.createElement('area');
        a.shape = 'poly';
        a.alt = OpenLayers.i18n('panSouth');
        a.title = OpenLayers.i18n('panSouth');
        a.coords = '25,178, 12,191, 21,197, 30,197, 39,191, 26,178';
        var panSouth = OpenLayers.Function.bind(this.pan, this, 0, -this.panAmount/100 );
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(panSouth, this) );
        m.appendChild(a);

        var a = document.createElement('area');
        a.shape = 'poly';
        a.alt = OpenLayers.i18n('panNorth');
        a.title = OpenLayers.i18n('panNorth');
        a.coords = '26,175, 43,158, 8,158, 25,175';
        var panNorth = OpenLayers.Function.bind(this.pan, this, 0, this.panAmount/100 );
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(panNorth, this) );
        m.appendChild(a);

        var a = document.createElement('area');
        a.shape = 'circle';
        a.alt = OpenLayers.i18n('zoomOut');
        a.title = OpenLayers.i18n('zoomOut');
        a.coords = '25,142,8';
        var zoomOut = OpenLayers.Function.bind(this.zoom, this, 1/this.zoomOutFactor);
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(zoomOut, this) );
        m.appendChild(a);

        var a = document.createElement('area');
        a.shape = 'circle';
        a.alt = OpenLayers.i18n('zoomIn');
        a.title = OpenLayers.i18n('zoomIn');
        a.coords = '25,34,8';
        var zoomIn = OpenLayers.Function.bind(this.zoom, this, this.zoomInFactor);
        OpenLayers.Event.observe(a, 'mousedown', OpenLayers.Function.bindAsEventListener(zoomIn, this) );
        m.appendChild(a);

        this.domObj.appendChild(m);

        var sliderBg = document.createElement('img');
        sliderBg.src = Fusion.getFusionURL() + widgetTag.location + 'Navigator/sliderscale.png';
        sliderBg.className = 'png24';
        sliderBg.width = 51;
        sliderBg.height = 201;
        sliderBg.style.position = 'absolute';
        sliderBg.style.left = '0px';
        sliderBg.style.top = '0px';
        sliderBg.useMap = '#Navigator_ImageMap';
        this.domObj.appendChild(sliderBg);

        var handleDiv = document.createElement('div');
        handleDiv.style.position = 'absolute';
        handleDiv.style.top = '6px';
        handleDiv.style.left = '6px';
        handleDiv.style.width = '39px';
        handleDiv.style.height = '16px';
        this.domObj.appendChild(handleDiv);

        var sliderDiv = document.createElement('div');
        sliderDiv.style.position = 'absolute';
        sliderDiv.style.top = '44px';
        sliderDiv.style.left = '0px';
        sliderDiv.style.width = '51px';
        sliderDiv.style.height = '85px';
        this.domObj.appendChild(sliderDiv);

        var sliderHandle = document.createElement('img');
        sliderHandle.src = Fusion.getFusionURL() + widgetTag.location + 'Navigator/slider.png';
        sliderHandle.className = 'png24';
        sliderHandle.width = 29;
        sliderHandle.height = 12;
        sliderHandle.style.position = 'absolute';
        sliderHandle.style.left = '11px';
        sliderHandle.style.top = '49px';
        sliderDiv.appendChild(sliderHandle);

        this.activityIndicator = document.createElement('img');
        this.activityIndicator.src = Fusion.getFusionURL() + widgetTag.location + 'Navigator/spinner.gif';
        this.activityIndicator.width = 18;
        this.activityIndicator.height = 6;
        this.activityIndicator.style.position = 'absolute';
        this.activityIndicator.style.top = '3px';
        this.activityIndicator.style.right = '4px';
        handleDiv.appendChild(this.activityIndicator);

        this.domObj.style.position = 'absolute';
        this.domObj.style.zIndex = 1000;
        this.domObj.style.width = '51px';
        this.domObj.style.height = '204px';
        this.domObj.style.cursor = 'pointer';
        // need to disable active map controls when the mouse is over the navigator
        this.domObj.addEvents({
          mouseenter: OpenLayers.Function.bind(this.mouseEnter,this),
          mouseleave: OpenLayers.Function.bind(this.mouseLeave,this)
        });

        var checkPosition = OpenLayers.Function.bind(this.checkPosition, this);

        //set up the navigator as draggable
        new Drag(this.domObj, {
            handle: handleDiv,
            onComplete: checkPosition,
            preventDefault: true
        });

        this.slider = new Slider(sliderDiv, sliderHandle, {
            mode: 'vertical',
            steps: 81,
            snap: true,
            onComplete: OpenLayers.Function.bind(this.scaleChanged, this)
        });
        // precompute this for efficiency
        this.LN9 = Math.log(9);

        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.updateSlider, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_RESIZED, checkPosition);
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.updateSlider, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_BUSY_CHANGED, OpenLayers.Function.bind(this.busyChanged, this));
    },

    scaleChanged: function(value) {
        var map = this.getMap();
        var activeWidget = null;
        if (map.oActiveWidget) {
          activeWidget = map.oActiveWidget;
          map.deactivateWidget(map.oActiveWidget);
        }
        if (!this.bInternalChange) {
            var olMap = this.getMap().oMapOL;
            var baseLayer = olMap.baseLayer;
            if (baseLayer != null) {
                if (baseLayer.singleTile) {
                    var scale = Math.pow(9,value/9);
                    var resolution = OpenLayers.Util.getResolutionFromScale(scale, baseLayer.units);
                    resolution += baseLayer.minResolution;
                    this.bInternalChange = true;
                    olMap.zoomTo(olMap.getZoomForResolution(resolution));
                    this.bInternalChange = false;
                } else {
                    var zoom = olMap.baseLayer.resolutions.length - value - 1;
                    this.bInternalChange = true;
                    olMap.zoomTo(zoom);
                    this.bInternalChange = false;
                }
            }
        }

        if (activeWidget) {
          map.activateWidget(activeWidget);
        }
        return false;
    },

    checkPosition: function() {
        var nav = this.domObj;
        var pDim = $(nav.parentNode).getContentBoxSize();
        var nLeft, nTop;
        nLeft = parseInt(nav.style.left);
        nTop = parseInt(nav.style.top);
        if (nLeft + nav.getWidth() > pDim.width) {
            nLeft = pDim.width - nav.getWidth();
            nav.style.left = nLeft + 'px';
        }
        if (nTop + nav.getHeight() > pDim.height) {
            nTop = pDim.height - nav.getHeight();
            nav.style.top = nTop + 'px';
        }
        if (nLeft < 0) {
            nav.style.left = '0px';
        }
        if (nTop < 0) {
            nav.style.top = '0px';
        }
    },

    updateSlider: function() {
        var map = this.getMap().oMapOL;
        baseLayer = map.baseLayer
        if (baseLayer.singleTile) {
            this.slider.steps = 81;
            var resolution = map.getResolution() - baseLayer.minResolution;
            var scale = OpenLayers.Util.getScaleFromResolution(resolution, baseLayer.units);
            var position = 9*Math.log(scale)/this.LN9;
            this.bInternalChange = true;
            this.slider.set(position);
            this.bInternalChange = false;
        } else {
            this.slider.steps = map.baseLayer.resolutions.length - 1;
            var position = map.baseLayer.resolutions.length -1 - map.getZoom();
            this.bInternalChange = true;
            this.slider.set(position);
            this.bInternalChange = false;
        }
    },

    pan: function(x,y,e) {
        //console.log('pan by : ' + x + ', ' + y);
        var map = this.getMap();
        var center = map.getCurrentCenter();
        var res = map.oMapOL.getResolution();
        var size = map.oMapOL.getSize();
        map.zoom(center.x + (x * size.w * res), center.y + (y * size.h * res), 1);
        //new Event(e).stop();
        OpenLayers.Event.stop(e);
        return false;
    },

    zoom: function(factor, e) {
        //console.log('zoom by factor: ' + factor);
        var map = this.getMap();
        var center = map.getCurrentCenter();
        map.zoom(center.x, center.y, factor);
        OpenLayers.Event.stop(e);
        return false;
    },

    mouseEnter: function() {
        var mapWidget = this.getMap();
        var mapOL = mapWidget.oMapOL;
        for (var i=0; i<mapOL.controls.length; ++i) {
          var control = mapOL.controls[i];
          if (control.active) {
            control.deactivate();
            this.activeControls.push(control);
          }
        }
        for (var i=0; i<mapWidget.handlers.length; ++i) {
          var handler = mapWidget.handlers[i];
          if (handler.active) {
            if(handler.CLASS_NAME == "OpenLayers.Handler.Box" && handler.zoomBox != undefined){
              handler.removeBox();
            }
            handler.deactivate();
            this.activeControls.push(handler);
          }
        }
    },

    mouseLeave: function() {
        var mapOL = this.getMap().oMapOL;
        while (this.activeControls.length>0) {
          var control = this.activeControls.pop();
          control.activate();
        }
    },

    busyChanged: function() {
        this.activityIndicator.style.visibility = this.getMap().isBusy() ? 'visible' : 'hidden';
    }


});
