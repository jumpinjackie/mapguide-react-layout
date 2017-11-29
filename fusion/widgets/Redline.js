/**
 * Fusion.Widget.Redline
 *
 * $Id: Redline.js 1736 2009-01-14 15:42:24Z madair $
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

// This event could be emitted by the Redline widget
Fusion.Event.REDLINE_FEATURE_ADDED = Fusion.Event.lastEventId++;

/* ********************************************************************
* Class: Fusion.Widget.Redline
*
* Allows the user to create a temporary OpenLayers Vector layer and
* draw POINT, LINE and POLYGON features on that layer.
*
* Inherits from:
*  - <Fusion.Widget>
**********************************************************************/
Fusion.Widget.Redline = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,

    // Fusion map widget
    mapWidget: null,

    // a reference to a redline taskPane
    taskPane: null,

    // Indicates whether to autogenerate redline layer names or to prompt the user for one.
    autogenerateLayerNames: true,

    // Indicates whether to use the MapMessage component to display digitization prompts
    mapMessagePrompt: true,
    
    // Indicates the default redline data store to create
    defaultDataStoreFormat: null,
    
    // Indicates the default geometry types the user can record
    defaultRedlineGeometryTypes: 0,
    
    // If we have a redline data store and geom format specified, auto-create the data store and go to the
    // edit redline page 
    bCreateOnStartup: false,
    
    // Determines whether redline features will be rendered with basic or advanced stylization. Advanced Stylization
    // allows for always visible labels for line/area redline features.
    bUseAdvancedStylization: true,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.mapWidget = Fusion.getWidgetById('Map');

        if (json.AutogenerateLayerNames)
            this.autogenerateLayerNames = (json.AutogenerateLayerNames[0] == "true");

        if (json.UseMapMessagePrompt)
            this.mapMessagePrompt = (json.UseMapMessagePrompt[0] == "true");
        
        if (json.StylizationType)
            this.bUseAdvancedStylization = (json.StylizationType[0] == "advanced");
        
        if (json.DataStoreFormat && json.RedlineGeometryFormat) {
            if (json.DataStoreFormat[0] == "SDF" ||
                json.DataStoreFormat[0] == "SHP" ||
                json.DataStoreFormat[0] == "SQLite") {
                
                var geomTypes = parseInt(json.RedlineGeometryFormat[0]);
                if (json.DataStoreFormat[0] == "SHP") {
                    //Only accept if geometry type is singular
                    if (geomTypes == 1 || geomTypes == 2 || geomTypes == 4) {
                        this.defaultDataStoreFormat = json.DataStoreFormat[0];
                        this.defaultRedlineGeometryType = geomTypes;
                        if (json.AutoCreateOnStartup)
                            this.bCreateOnStartup = (json.AutoCreateOnStartup[0] == "true");
                    }
                } else {
                    this.defaultDataStoreFormat = json.DataStoreFormat[0];
                    this.defaultRedlineGeometryType = geomTypes;
                    if (json.AutoCreateOnStartup)
                        this.bCreateOnStartup = (json.AutoCreateOnStartup[0] == "true");
                }
            }
        }

        // register Redline specific events
        this.registerEventID(Fusion.Event.REDLINE_FEATURE_ADDED);

        this.sTarget = json.Target ? json.Target[0] : "";
        if (this.sTarget)
            this.taskPane = new Fusion.Widget.Redline.DefaultTaskPane(this, widgetTag.location);
    },

    getSessionID: function() {
        return this.getMapLayer().getSessionID();
    },

    getMapName: function() {
        return this.getMapLayer().getMapName();
    },

    // activate the redline widget
    activate: function() {
        if (this.taskPane) {
            this.taskPane.loadDisplayPanel();
        }
    },

    // deactivate the redline widget
    deactivate: function() {
        if (this.taskPane) {
            this.taskPane.abortActiveDigitization();
        }
        if (this.mapMessagePrompt)
            this.mapWidget.message.clear(); //Clear digization prompts
    }
});


Fusion.Widget.Redline.DefaultTaskPane = OpenLayers.Class(
{
    // a reference to the redline widget
    widget: null,

    // the the task pane windows
    taskPaneWin: null,

    // the panel url
    panelUrl:  'widgets/Redline/markupmain.php',

    initialize: function(widget,widgetLocation) {
        this.widget = widget;
        this.widget.registerForEvent(Fusion.Event.REDLINE_FEATURE_ADDED, OpenLayers.Function.bind(this.featureAdded, this));
    },

    loadDisplayPanel: function() {
        var url = Fusion.getFusionURL() + this.panelUrl;
        var params = [];

        // Add any additional params here
        params.push('LOCALE='+Fusion.locale);
        params.push('MAPNAME='+this.widget.getMapName());
        params.push('SESSION='+this.widget.getSessionID());
        
        if (this.widget.defaultDataStoreFormat != null && this.widget.defaultRedlineGeometryType > 0) {
            params.push('REDLINEFORMAT=' + this.widget.defaultDataStoreFormat);
            params.push('REDLINEGEOMTYPE=' + this.widget.defaultRedlineGeometryType);
            params.push('AUTOCREATE=' + (this.widget.bCreateOnStartup ? "1" : "0"));
        }
        params.push("REDLINESTYLIZATION=" + (this.widget.bUseAdvancedStylization ? "ADVANCED" : "BASIC"));

        if (url.indexOf('?') < 0) {
            url += '?';
        } else if (url.slice(-1) != '&') {
            url += '&';
        }
        url += params.join('&');

        var taskPaneTarget = Fusion.getWidgetById(this.widget.sTarget);
        var outputWin = window;

        if ( taskPaneTarget ) {
            if(!taskPaneTarget.isSameWithLast(url))
            {
                taskPaneTarget.setContent(url);
            }
            outputWin = taskPaneTarget.iframe.contentWindow;
        } else {
            outputWin = window.open(url, this.widget.sTarget, this.widget.sWinFeatures);
        }
        //outputWin.parent = window;
        this.taskPaneWin = outputWin;
    },

    abortActiveDigitization: function() {
        //This function exists if MapGuideViewerApi.js was included in
        if (this.taskPaneWin.ClearDigitization)
            this.taskPaneWin.ClearDigitization(true);
    }
});
