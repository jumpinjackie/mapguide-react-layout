/**
 * Fusion.Widget.LinkToView
 *
 * $Id: LinkToView.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.LinkToView
 *
 * A widget that displays a link to the currently displayedd map view.
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/


Fusion.Widget.LinkToView = OpenLayers.Class(Fusion.Widget,  {
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?';

        //remove any existing extent param
        var join = '';
        for (var param in Fusion.queryParams) {
          if (typeof Fusion.queryParams[param] == 'string') {
            if (param == 'extent' ||
                param == 'filter' ||
                param == 'spatialfilter' ||
                param == 'variant' ||
                param == 'theme' ||
                param == 'selectlayer' ||
                param == 'showlayers' ||
                param == 'hidelayers' ||
                param == 'showgroups' ||
                param == 'hidegroups' ) {
                continue;
            }
            this.baseUrl += join + param + '=' + Fusion.queryParams[param];
            join = '&';
          }
        }
        this.anchorLabel = json.Label ? json.Label[0] : (this.domObj ? (this.domObj.innerHTML ? this.domObj.innerHTML : 'Link to View') : 'Link to View');

        Fusion.addWidgetStyleSheet(widgetTag.location + 'LinkToView/LinkToView.css');
        this.anchor = document.createElement('input');
        this.anchor.className = 'anchorLinkToView';
        this.anchor.value = this.baseUrl;
        this.anchor.title = json.Tooltip ? json.Tooltip[0] : 'Right-click to copy or bookmark link to current view';
        this.anchor.onfocus = OpenLayers.Function.bind(this.selectAnchorValue, this);
        
        if(this.domObj){
            this.domObj.innerHTML = '';
            this.domObj.appendChild(this.anchor);
        }
        
        this.getMap().oMapOL.events.register("addlayer", this, this.setListener);
        this.enable();                   
    },
    
    setUiObject: function(uiObj) {
        Fusion.Widget.prototype.setUiObject.apply(this, [uiObj]);
        if (this.uiObj.domObj) {
            this.uiObj.domObj.appendChild(this.anchor);
        } else {
            this.uiObj.appendChild(this.anchor);
        }
    },
    
    selectAnchorValue: function() {
        this.anchor.select();
    },
    
    setListener: function(evt) {
        var layer = evt.layer;
        //register on the OL loadend event to update the link because this event
        //is fired whenever the layers are redrawn
        layer.events.register("loadend", this, this.updateLink);
    },
    
    updateLink: function() {
        var join = (this.baseUrl.indexOf('?')==this.baseUrl.length-1)?'':'&';
        var queryStr = this.getMap().getLinkParams();
        this.anchor.value = this.baseUrl + join + queryStr;
        //this.anchor.select();
    }
});
