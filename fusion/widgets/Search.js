/**
 * Fusion.Widget.Search
 *
 * $Id: Search.js 2940 2016-05-04 16:54:12Z jng $
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
 * Class: Fusion.Widget.Search
 *
 * A widget that displays a pre-configured search form to the user and then
 * runs the search.  Searches are done on the attributes of specifiedd layers.
 *
 * uses JavaScript Scale Bar for MapServer
 * (http://mapserver.commenspace.org/tools/scalebar/
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Search = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    sFeatures : 'menubar=no,location=no,status=no,scrollbars=yes',

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.sTarget = json.Target ? json.Target[0] : "SearchWindow";
        this.sBaseUrl = Fusion.getFusionURL() + 'widgets/Search/SearchPrompt.php';
        this.prompt = json.Prompt ? json.Prompt[0] : "";
        this.layer = json.Layer ? json.Layer[0] : "";
        this.filter = json.Filter ? json.Filter[0] : "";
        this.limit = json.MatchLimit ? json.MatchLimit[0] : 100;
        this.resultColumns = json.ResultColumns ? json.ResultColumns[0].Column : [];
        this.title = json.Title ? json.Title[0] : widgetTag.label;
        this.pointZoomLevel = json.PointZoomLevel ? json.PointZoomLevel[0] : 500.0;
    },

    activate: function() {
        var url = this.sBaseUrl;
        //add in other parameters to the url here

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
        params.push('title='+this.title);
        params.push('prompt='+this.prompt);
        params.push('target='+this.sTarget);
        params.push('filter='+this.filter);
        params.push('layer='+this.layer);
        params.push('limit='+this.limit);
        params.push('pointZoomLevel='+this.pointZoomLevel);
        var names = [];
        var props = [];
        for (var i=0; i<this.resultColumns.length; ++i) {
          names.push(this.resultColumns[i].Name);
          props.push(this.resultColumns[i].Property);
        }
        params.push('properties='+props.join(","));
        params.push('propNames='+names.join(","));

        if (url.indexOf('?') < 0) {
            url += '?';
        } else if (url.slice(-1) != '&') {
            url += '&';
        }
        url += params.join('&');
        if ( taskPaneTarget ) {
            taskPaneTarget.setContent(url);
        } else {
            if ( pageElement ) {
                pageElement.src = url;
            } else {
                window.open(url, this.sTarget, this.sFeatures);
            }
        }
    }
});
