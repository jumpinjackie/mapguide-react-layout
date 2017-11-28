/**
 * Fusion.Widget.Theme
 *
 * $Id: Theme.js 1523 2008-09-11 19:30:43Z pagameba $
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
 * Class: Fusion.Widget.Theme
 *
 * The Theme widget prompts the user for some inputs and then creates a
 * new themed layer based on one of the existing map layers.
 *
 * If the Target property points to TaskPane widget, the task will be listed in
 * the menu list of the TaskPane and loaded there.
 * Otherwise if the target is an existing IFrame in the page it will be loaded
 * there, otherwise it will open a new window with that name.
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Theme = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,
    sFeatures : 'menubar=no,location=no,resizable=no,status=no',

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.sTarget = json.Target ? json.Target[0] : "ThemeWindow";
        this.sBaseUrl = Fusion.getFusionURL() + 'widgets/Theme/thememain.php';
    },

    activate: function() {
        var url = this.sBaseUrl;
        //add in other parameters to the url here

        var widgetLayer = this.getMapLayer();
        var taskPaneTarget = Fusion.getWidgetById(this.sTarget);
        var pageElement = $(this.sTarget);

        var params = [];
        params.push('LOCALE='+Fusion.locale);
        params.push('SESSION='+widgetLayer.getSessionID());
        params.push('MAPNAME='+widgetLayer.getMapName());
        if (taskPaneTarget || pageElement) {
          params.push('POPUP=false');
        } else {
          params.push('POPUP=true');
        }

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
