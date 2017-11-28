/**
 * Fusion.Widget.Maptip
 *
 * $Id: Maptip.js 2765 2013-08-09 06:49:50Z jng $
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
 * Class: Fusion.Widget.Maptip
 *
 * Displays tooltips over the map when the mouse is hovered for some 
 * time.  You must configure tooltips for each layer using Studio
 * or Web Studio by editing the LayerDefinition Settings and
 * specifying an expression for the tooltip.
 *
 *
 * Delay (optional)
 *
 * This is the delay, in milliseconds, that the user must keep the mouse
 * in the same position in order for the maptip to appear.  The default,
 * if not specified, is 350 milliseconds.
 *
 * Layer (optional, multiple)
 *
 * This is the name of a layer from the MapDefinition to get the tooltip
 * from.  If no Layer elements are specified, then all layers will be
 * queried and the top-most one will be displayed.  Multiple Layer tags
 * can be added, allowing tooltips to come from different layers.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/


Fusion.Widget.Maptip = OpenLayers.Class(Fusion.Widget, {
    oCurrentPosition: new OpenLayers.Pixel(0,0),
    oMapTipPosition: null,
    nTimer: null,
    delay: null,
    aLayers: null,
    bOverTip: false,
    sWinFeatures: 'menubar=no,location=no,resizable=no,status=no,scrollbars=yes',
    offset: new OpenLayers.Pixel(2,20),
    szTip: '',
    szHref:'',
    szLabel:'',
    aTextFields: null,
    mapTipFired: false,
    bStartMapTips:false,
    mapTipBtn: null,
    label:'',
    
    
    initializeWidget: function(widgetTag) {
        var index = window.location.href.indexOf("?");
    
        this.label = widgetTag.label;
        var json = widgetTag.extension;
        this.sTarget = json.Target ? json.Target[0] : "MaptipWindow";
        if (json.WinFeatures) {
          this.sWinFeatures = json.WinFeatures[0];
        }
        this.delay = json.Delay ? parseInt(json.Delay[0]) : 350;
        this.nTolerance = json.Tolerance ? parseInt(json.Tolerance[0]) : 2;

        this.aCustomURL =   [];
        this.aTextFields = []; 
        this.aLayers = [];
        this.aLabels = [];
        
        if (json.Maptip) {
            for (var i=0; i<json.Maptip.length; i++) {
                this.aLayers.push(json.Maptip[i].Layer);
                this.aTextFields.push(json.Maptip[i].TextField);
                this.aLabels.push(json.Maptip[i].Label);
                this.aCustomURL.push(json.Maptip[i].CustomURL);
            }
        }

        //prepare the container div for the maptips
        Fusion.addWidgetStyleSheet(widgetTag.location + 'Maptip/Maptip.css');
        if (this.domObj) {
          this.domObj.parentNode.removeChild(this.domObj);
        } else {
          this.domObj = document.createElement('div');
        }
        this.domObj.className = 'maptipContainer';
        this.domObj.style.display = 'none';
        this.domObj.style.top = '0px';
        this.domObj.style.left = '0px';
        
        //create an iframe to stick behind the maptip to prevent clicks being passed through to the map
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'maptipShim';
        this.iframe.scrolling = 'no';
        this.iframe.frameborder = 0;

        this.mouseOverTipFunc = OpenLayers.Function.bind(this.mouseOverTip, this);
        this.mouseOutTipFunc = OpenLayers.Function.bind(this.mouseOutTip, this);
        this.mouseMoveFunc = OpenLayers.Function.bind(this.mouseMove, this);
        this.mouseDownFunc = OpenLayers.Function.bind(this.mouseDown, this);
        this.mouseUpFunc = OpenLayers.Function.bind(this.mouseUp, this);
        this.mouseOutFunc = OpenLayers.Function.bind(this.mouseOut, this);
        this.mapTipReqFinishedFunc = OpenLayers.Function.bind(this._display,this);
        this.mapBusyChangedFunc = this.busyChanged.bind(this);
        this.mapLoaded = this.startMapTips.bind(this);
        
        //Subscribe to digitizer events so we know when not to interfere
        this.getMap().registerForEvent(Fusion.Event.MAP_DIGITIZER_ACTIVATED, OpenLayers.Function.bind(this.onDigitizerActivated, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_DIGITIZER_DEACTIVATED, OpenLayers.Function.bind(this.onDigitizerDeactivated, this));
    },
    
    onDigitizerActivated: function() {
        this.hideMaptip();
        this.bDigitizerActive = true;
    },
    
    onDigitizerDeactivated: function() {
        this.bDigitizerActive = false;
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.uiInstances[this.type].push(this);

        this.mapTipBtn = new Jx.Button({
            id: 'maptipButton',
            image: Fusion.getApplicationURL() + 'images/icons.png',
            imageClass: "maptip",
            label: this.label,
            toggle: true,
            onDown: (function() {
                    var instances = Fusion.Widget.uiInstances[this.type];
                    for (var i=0; i<instances.length; i++) {
                        var instance = instances[i];
                        if (instance.shouldActivateWith(this) &&
                            instance.mapTipBtn && instance.mapTipBtn.setActive) {
                            instance.mapTipBtn.setActive(true);
                        }
                    }
                    if(!Fusion.Widget.Maptip.ActiveInstance)
                    {
                        this.activate();
                        Fusion.Widget.Maptip.ActiveInstance = this;
                    }
                }).bind(this),
            onUp: (function() {
                    var instances = Fusion.Widget.uiInstances[this.type];
                    for (var i=0; i<instances.length; i++) {
                        var instance = instances[i];
                        if (instance.shouldActivateWith(this) &&
                            instance.mapTipBtn && instance.mapTipBtn.setActive) {
                            instance.mapTipBtn.setActive(false);
                        }
                    }
                    if(Fusion.Widget.Maptip.ActiveInstance == this)
                    {
                        this.deactivate();
                        Fusion.Widget.Maptip.ActiveInstance = null;
                    }
                }).bind(this)
        }).addTo(uiObj);
        if (this.widgetTag.tooltip) {
            this.mapTipBtn.setTooltip(this.widgetTag.tooltip);
        }
        if (uiObj.options.active) {
            this.mapTipBtn.setActive(true);
        }

        this.uiObj = uiObj;	
    },
    
    activate : function() {
        this.bStartMapTips = true;
        
        OpenLayers.Event.observe(this.domObj, 'mouseover', this.mouseOverTipFunc);
        OpenLayers.Event.observe(this.domObj, 'mouseout', this.mouseOutTipFunc);
        
        var oDomElem =  this.getMap().getDomObj();
        document.getElementsByTagName('BODY')[0].appendChild(this.domObj);
        
        
        this.getMap().observeEvent('mousemove', this.mouseMoveFunc);
        this.getMap().observeEvent('mousedown', this.mouseDownFunc);
        this.getMap().observeEvent('mouseup', this.mouseUpFunc);
        this.getMap().observeEvent('mouseout', this.mouseOutFunc);

        this.eventListener = false;
        this.getMap().registerForEvent(Fusion.Event.MAP_MAPTIP_REQ_FINISHED,this.mapTipReqFinishedFunc);
        this.getMap().registerForEvent(Fusion.Event.MAP_BUSY_CHANGED, this.mapBusyChangedFunc);
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, this.mapLoaded);
    },
    
    deactivate: function() {
        this.bStartMapTips = false;
        
        OpenLayers.Event.stopObserving(this.domObj, 'mouseover', this.mouseOverTipFunc);
        OpenLayers.Event.stopObserving(this.domObj, 'mouseout', this.mouseOutTipFunc);
        
        this.getMap().stopObserveEvent('mousemove', this.mouseMoveFunc);
        this.getMap().stopObserveEvent('mousedown', this.mouseDownFunc);
        this.getMap().stopObserveEvent('mouseup', this.mouseUpFunc);
        this.getMap().stopObserveEvent('mouseout', this.mouseOutFunc);

        this.eventListener = false;
        this.getMap().deregisterForEvent(Fusion.Event.MAP_MAPTIP_REQ_FINISHED,this.mapTipReqFinishedFunc);
        this.getMap().deregisterForEvent(Fusion.Event.MAP_BUSY_CHANGED, this.mapBusyChangedFunc);
        this.getMap().deregisterForEvent(Fusion.Event.MAP_LOADED, this.mapLoaded);
        
        if(this.domObj != null && this.domObj.parentNode != null) {
            this.domObj.parentNode.removeChild(this.domObj); 
        }
    },
    
    mouseOut: function(e) {
      //console.log('maptip mouseOut:'+this.nTimer+':'+this.nHideTimer);
        if (this.nTimer) {
            window.clearTimeout(this.nTimer);
            if (!this.nHideTimer) {
                /*console.log('mouseOut: set hide timer');*/
                this.nHideTimer = window.setTimeout(OpenLayers.Function.bind(this.hideMaptip, this), 250);
            }
        }
    },

    startMapTips: function(){
        this.bStartMapTips = true;
    },
    
    mouseMove: function(e) {
        if( this.bStartMapTips == true){
            if(!this.eventListener){
                this.eventListener = true;
            }
        //console.log('map tip mouseMove');
            if (this.bOverTip || this.mouseIsDown) {
                return;
            }

            var map = this.getMap();
            this.mapSize = map.getSize();
            this.mapOffset = map._oDomObj.getOffsets();

            var p = map.getEventPosition(e);
            if (p.x == this.oCurrentPosition.x && p.y == this.oCurrentPosition.y ) {
              return;
            }
            this.oCurrentPosition = p;
            this.oMapTipPosition = p;

            if(typeof( this.nTimer) == "number") {
                window.clearTimeout(this.nTimer);
                this.nTimer = null;
            }

            this.nTimer = window.setTimeout(OpenLayers.Function.bind(this.showMaptip, this), this.delay);
            //Event.stop(e);
        } // bStartMapTips 
    },
    
    mouseDown: function() {
        this.mouseIsDown = true;
        this._hide();
    },
    
    mouseUp: function() {
        this.mouseIsDown = false;
    },
    
    _getMapTip: function(oMapTips) {
        var iMgInstances = 0;
        var mapWidget = this.getMap();
        for (var i = mapWidget.aMaps.length - 1; i >= 0; i--) {
            if (mapWidget.aMaps[i].arch == "MapGuide") {
                iMgInstances++;
            }
        }
        if (iMgInstances <= 1) {
            this.getMapLayer().getMapTip(this);
        } else {
            var scale = mapWidget.getScale();
            for (var i = mapWidget.aMaps.length - 1; i >= 0; i--) {
                var mp = mapWidget.aMaps[i];
                if (scale >= mp.minScale && scale <= mp.maxScale && mp.layerRoot.visible) {
                    mp.getMapTip(oMapTips);
                }
            }
        }
    },
    
    showMaptip: function() {
        if (this.bDigitizerActive === true) {
            //console.log("Abort maptip query");
            return;
        }
        this._getMapTip(this);
        this.mapTipFired = true;
    },
    
    _display: function(eventID,oMapTip) {
        if (this.bDigitizerActive === true || typeof(oMapTip) == "undefined" || oMapTip.t == '') {
            //console.log("Abort maptip display");
            return;
        }
        if(this.domObj.style.visibility != 'visible' || oMapTip.t != this.szTip ){
            this.domObj.innerHTML = null;
            var contentDiv = document.createElement('div');
            contentDiv.className = 'maptipContent';
            this.domObj.appendChild(contentDiv);
            var empty = true;
            this.bIsVisible = true;
            
            var tip = oMapTip.t;
            var hyperlink =oMapTip.h;
            var label =oMapTip.l;
            
            this.szTip = tip;
            this.szHref = hyperlink;
            this.label = label;
            
            if(typeof(tip) == "object"){
                for(var i=0;i<tip.length;i++){
                    var t = tip[i];
                    var h = hyperlink[i];
                    var l = label[i];
                    var oLinkDom = this.addMapTipDomObj(h,t);
                    var mapTipContent = document.createElement('DIV');
                    mapTipContent.className = "mapTipContentDIV";
                    // has a label with the maptip
                    if(l != ""){
                        mapTipContent.innerHTML = l+" : ";
                        contentDiv.appendChild(mapTipContent);
                        mapTipContent.appendChild(oLinkDom);
                        empty = false;
                    }
                    else
                    {
                        contentDiv.appendChild(mapTipContent);
                        contentDiv.appendChild(oLinkDom);
                        empty = false;
                    }
                }
            }
            else
            {
                if (tip) {
                    var mapTipContent = document.createElement('DIV');
                    mapTipContent.innerHTML = tip.replace(/\\n/g, "<br>");
                    contentDiv.appendChild(mapTipContent);
                    empty = false;
                }

                if (hyperlink) {
                    var mapTipContent = document.createElement('DIV');
                    hyperlink =  hyperlink.replace(/\\n/g, "<br>");
                    if ( hyperlink.indexOf("href=")>0 ) {
                      mapTipContent.innerHTML = hyperlink
                    } else {
                      var anchor = document.createElement('A');
                      var openLink = OpenLayers.Function.bind(this.openLink, this, hyperlink);
                      anchor.onclick = OpenLayers.Function.bindAsEventListener(openLink, this);
                      anchor.target = "_blank";
                      anchor.href = 'javascript:void(0)';
                      anchor.innerHTML = OpenLayers.i18n('maptipLinkText');
                      mapTipContent.appendChild(anchor);
                    }
                    contentDiv.appendChild(mapTipContent);
                    empty = false;
                }
            }

            
            if (!empty) {
                var size = $(this.domObj).getBorderBoxSize();
                this.oMapTipPosition = this.oMapTipPosition.add(this.mapOffset.x, this.mapOffset.y);
                if (this.oCurrentPosition.x < this.mapSize.w/2) {
                    this.domObj.style.left = (this.oMapTipPosition.x + this.offset.x) + 'px';
                } else {
                    this.domObj.style.left = (this.oMapTipPosition.x - (size.width+this.offset.x)) + 'px';
                }
                if (this.oCurrentPosition.y < this.mapSize.h/2) {
                    this.domObj.style.top = (this.oMapTipPosition.y + this.offset.y) + 'px';
                } else {
                    this.domObj.style.top = (this.oMapTipPosition.y - (size.height+this.offset.y)) + 'px';
                }
                this.domObj.style.visibility = 'hidden';
                this.domObj.style.display = 'block';

                if (!window.opera) {
                    contentDiv.appendChild(this.iframe);
                    var size = $(this.domObj).getContentBoxSize();
                    this.iframe.style.width = size.width + "px";
                    this.iframe.style.height = size.height + "px";
                }

                this.domObj.style.visibility = 'visible';
                //this.hideTimer = window.setTimeout(OpenLayers.Function.bind(this._hide, this),10000);
            } else {
                this.hideMaptip();
            }
        }
        this.mapTipFired = false;
    },

    addMapTipDomObj: function(url,szText){
        if(url == "undefined" || url == typeof("undefined")  || url ==""){
                var linkSpan = document.createElement('SPAN');
                linkSpan.className = "mapTipData";
                linkSpan.innerHTML = szText;
                return linkSpan;
            }
            else
            {
            var a, linkURL;
            var linkSpan = document.createElement('SPAN');
            linkSpan.className = "mapTipData"
            if (url.indexOf('href=') > 0) {   //MGOS allows complete anchor tags as the hyperlink
            linkSpan.innerHTML = url;
            a = linkDiv.firstChild;
            linkURL = a.href;
            } else {
            a = document.createElement('a');
            a.className = "mapTipLink";
            a.innerHTML = szText;
            linkURL = url;
            linkSpan.appendChild(a);
            }
            a.href = 'javascript:void(0)';
            var openLink = OpenLayers.Function.bind(this.openLink, this, linkURL);
            a.onclick = OpenLayers.Function.bindAsEventListener(openLink, this);
            return linkSpan;
            }
    },
    
    hideMaptip: function() {
      //console.log('hideMaptip');
        this.bIsVisible = false;
        this.hideTimer = window.setTimeout(OpenLayers.Function.bind(this._hide, this),10);
    },
    
    _hide: function() {
      //console.log('maptip _hide');
        this.hideTimer = null;
        this.domObj.style.display = 'none';
        this.domObj.style.visibility = '';
        //this.oMapTipPosition = null;
    },
    
    mouseOverTip: function() {
      //console.log('mouseOverTip');
        window.clearTimeout(this.nHideTimer);
        this.nHideTimer = null;
        this.bOverTip = true;
    },
    
    mouseOutTip: function() {
      //console.log('mouseOutTip');
        this.nHideTimer = window.setTimeout(OpenLayers.Function.bind(this.hideMaptip, this), 250);
        this.bOverTip = false;
    },
    
    busyChanged: function() {
        if (this.getMap().isBusy()){
        this.bIsVisible = false;
        this.hideMaptip();
        }
    },

    openLink: function(url, evt) {
        var taskPaneTarget = Fusion.getWidgetById(this.sTarget);
        if ( taskPaneTarget ) {
            taskPaneTarget.setContent(url);
        } else {
            var pageElement = $(this.sTarget);
            if ( pageElement ) {
                pageElement.src = url;
            } else {
                window.open(url, this.sTarget, this.sWinFeatures);
            }
        }
        OpenLayers.Event.stop(evt, true);
        return false;
    }
});
