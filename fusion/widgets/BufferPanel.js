/**
 * Fusion.Widget.BufferPanel
 *
 * $Id: BufferPanel.js 2670 2013-03-22 15:33:22Z jng $
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
 * Class: Fusion.Widget.BufferPanel
 *
 * The BufferPanel widget prompts the user for some inputs and then creates a 
 * buffer around the current selection based on those inputs.
 *
 * If the Target property points to TaskPane widget, the task will be listed in
 * the menu list of the TaskPane and loaded there.
 * Otherwise if the target is an existing IFrame in the page it will be loaded 
 * there, otherwise it will open a new window with that name.
 * 
 *  Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.BufferPanel = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    sFeatures : 'menubar=no,location=no,resizable=no,status=no',
    isExclusive: false,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.sTarget = json.Target ? json.Target[0] : "BufferPanelWindow";
        this.sBaseUrl = Fusion.getFusionURL() + 'widgets/BufferPanel/BufferPanel.php';
        
        this.bSelectionOnly = (json.DisableIfSelectionEmpty &&
                           (json.DisableIfSelectionEmpty[0] == 'true' ||
                            json.DisableIfSelectionEmpty[0] == '1')) ? true : false;
                            
        this.additionalParameters = [];
        if (json.AdditionalParameter) {
            for (var i=0; i<json.AdditionalParameter.length; i++) {
                var p = json.AdditionalParameter[i];
                var k = p.Key[0];
                var v = p.Value[0];
                this.additionalParameters.push(k+'='+encodeURIComponent(v));
            }
        }
        
        this.enable = Fusion.Widget.BufferPanel.prototype.enable;
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_ON, OpenLayers.Function.bind(this.enable, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_OFF, OpenLayers.Function.bind(this.enable, this));
        this.disable();
    },

    enable: function() {
        var map = this.getMap();
        if (this.bSelectionOnly || !map) {
            if (map && map.hasSelection()) {
                if (this.action) {
                    this.action.setEnabled(true);
                } else {
                    Fusion.Widget.prototype.enable.apply(this,[]);
                }
            } else {
                if (this.action) {
                    this.action.setEnabled(false);
                } else {
                    this.disable();
                }
            }
        } else {
            if (this.action) {
                this.action.setEnabled(true);
            } else {
                Fusion.Widget.prototype.enable.apply(this,[]);
            }
        }
    },
    
    activate: function() {
        var url = this.sBaseUrl;
        //add in other parameters to the url here
        
        var map = this.getMap();
        var widgetLayer = this.getMapLayer();        
        var taskPaneTarget = Fusion.getWidgetById(this.sTarget);
        var pageElement = $(this.sTarget);

        var params = [];
        params.push('locale='+Fusion.locale);
        params.push('session='+widgetLayer.getSessionID());
        params.push('mapname='+widgetLayer.getMapName());
        if (taskPaneTarget || pageElement) {
          params.push('popup=false');
        } else {
          params.push('popup=true');
        }
        params.push('us=0');  //TODO: get displayunits from viewOptions; as it stands. us=1 means miles, anything else is kilometers
        params = params.concat(this.additionalParameters);

        if (url.indexOf('?') < 0) {
            url += '?';
        } else if (url.slice(-1) != '&') {
            url += '&';
        }
        url += params.join('&');
        if ( taskPaneTarget ) {
            if(!taskPaneTarget.isSameWithLast(url))
            {
                taskPaneTarget.setContent(url);
            }
        } else {
            if ( pageElement ) {
                pageElement.src = url;
            } else {
                window.open(url, this.sTarget, this.sWinFeatures);
            }
        }
    }
});
