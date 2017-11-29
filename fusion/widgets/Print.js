/**
 * Fusion.Widget.Print
 *
 * $Id: Print.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.Print
 *
 * Print the current map.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Print = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        var showPrintUI = json.ShowPrintUI ? json.ShowPrintUI[0] : 'false';
        this.showPrintUI = (showPrintUI.toLowerCase() == 'true' || showPrintUI == '1');
        
        var showTitle = json.ShowTitle ? json.ShowTitle[0] : 'false';
        this.showTitle = (showTitle.toLowerCase() == 'true' || showTitle == '1');

        this.pageTitle = json.PageTitle ? json.PageTitle[0] : '';
        
        this.resultsLayer = json.ResultsLayer ? json.ResultsLayer[0] : null;

        var showLegend = json.ShowLegend ? json.ShowLegend[0] : 'false';
        this.showLegend = (showLegend.toLowerCase() == 'true' || showLegend == '1');
        
        var showNorthArrow =json.ShowNorthArrow ? json.ShowNorthArrow[0] : 'false';
        this.showNorthArrow = (showNorthArrow.toLowerCase() == 'true' || showNorthArrow == '1');
        
        this.imageBaseUrl = json.ImageBaseUrl ? json.ImageBaseUrl[0] : null;
        
        this.dialogContentURL = Fusion.getFusionURL() + widgetTag.location + 'Print/Print.html';
        this.printablePageURL = Fusion.getFusionURL() + widgetTag.location + 'Print/printablepage.php';
        Fusion.addWidgetStyleSheet(widgetTag.location + 'Print/Print.css');
        
        /*
         * TODO: this is bad, why did we do this?
         this.getMap().registerForEvent(Fusion.Event.SELECTION_COMPLETE, OpenLayers.Function.bind(this.getSelection, this));
         */
        
    },
    /**
     * load an interface that builds a printable version of
     * the current map view
     */
    activate: function() {
        if (this.showPrintUI) {
            this.openPrintUI();
        } else {
            this.openPrintable();
        }
    },
    
    openPrintUI: function() {
        if (!this.dialog) {

            var toolbar = new Jx.Toolbar({position: 'bottom'});
            var o = {
                label: OpenLayers.i18n('printTitle'),
                id: 'printablePage',
                content : '<div class="PrintDialogForm">' +
                              '<fieldset class="PrintDialogOptions">' +
                                  '<legend>' + OpenLayers.i18n("printOptions") +'</legend>' +
                                    '<label class="block" for="dialogPrintShowtitle"><input name="dialogPrintShowtitle" id="dialogPrintShowtitle" type="checkbox" value="showtitle" checked>' +
                                         OpenLayers.i18n("printShowTitle") +'</label>' +
                                    '<label class="block" for="dialogPrintTitle">' + OpenLayers.i18n("printTitleText") + '</label>' +
                                    '<input name="dialogPrintTitle" id="dialogPrintTitle" type="text" class="inputText" />' +
                                    '<label class="block" for="dialogPrintShowlegend"><input name="dialogPrintShowlegend" id="dialogPrintShowlegend" type="checkbox" value="showlegend" checked>' +
                                         OpenLayers.i18n("printShowLegend") + '</label>' +
                                    '<label class="block" for="dialogPrintShowNorthArrow"><input name="dialogPrintShowNorthArrow" id="dialogPrintShowNorthArrow" type="checkbox" value="shownortharrow" checked>' +
                                         OpenLayers.i18n("printShowNorthArrow") + '</label>' +
                              '</fieldset>' +
                            '</div>',
                width: 350,
                height: 250,
                resize: true,
                toolbars: [toolbar]
            };
            var d = new Jx.Dialog(o);
			d.addEvent("contentLoaded", this.contentLoaded.bind(this));
            toolbar.add(
                new Jx.Button({
                    label: OpenLayers.i18n('printGenerate'),
                    onClick: OpenLayers.Function.bind(this.generate, this)
                }),
                new Jx.Button({
                    label: OpenLayers.i18n('printCancel'),
                    onClick: function() {
                        d.close();
                    }
                })
            );
            this.dialog = d;
            
        }
        this.dialog.show();
    },
    
    setParameter: function(param, value) {
        switch (param) {
            case 'Print_ShowTitle':
            this.showTitle = value;
            break;
            case 'Print_Title':
            this.pageTitle = value;
            break;
            case 'Print_ShowLegend':
            this.showLegend = value;
            break;
            case 'Print_ShowNorthArrow':
            this.showNorthArrow = value;
            break;
        }
    },
    
    contentLoaded: function(dialog) {
        dialog.content.getElementById('dialogPrintShowtitle').checked = this.showTitle;
        dialog.content.getElementById('dialogPrintTitle').value = this.pageTitle;
        dialog.content.getElementById('dialogPrintTitle').disabled = !this.showTitle;
        dialog.content.getElementById('dialogPrintShowlegend').checked = this.showLegend;
        dialog.content.getElementById('dialogPrintShowNorthArrow').checked = this.showNorthArrow;
        
         OpenLayers.Event.observe(dialog.content.getElementById('dialogPrintShowtitle'), 'click', OpenLayers.Function.bind(this.controlTitle, this));
    },
    
    controlTitle: function() {
        this.dialog.content.getElementById('dialogPrintTitle').disabled = !this.dialog.content.getElementById('dialogPrintShowtitle').checked;
        
    },
    
    generate: function() {
        this.showTitle = this.dialog.content.getElementById('dialogPrintShowtitle').checked;
        this.pageTitle = this.dialog.content.getElementById('dialogPrintTitle').value;
        this.showLegend = this.dialog.content.getElementById('dialogPrintShowlegend').checked;
        this.showNorthArrow = this.dialog.content.getElementById('dialogPrintShowNorthArrow').checked;
        this.openPrintable();
    },
    
    openPrintable: function() {
        var mainMap = this.getMap();
        var url = this.printablePageURL+'?';
        var extents = mainMap.getCurrentExtents();
        var centerX = (extents.left + extents.right)/ 2;
        var centerY = (extents.top + extents.bottom)/ 2;
        var dpi = mainMap._nDpi;
        var scale = mainMap.getScale();
        var widgetLayer = this.getMapLayer();
        url = url + 'MAPNAME=' + widgetLayer.getMapName();
        url = url + '&SESSION=' + widgetLayer.getSessionID();
        url = url + '&CENTERX='+centerX;
        url = url + '&CENTERY='+centerY;
        url = url + '&DPI='+dpi;
        url = url + '&SCALE='+scale;
        url = url + '&ISTITLE=' + (this.showTitle != '' ? '1' : '0');
        url = url + '&ISLEGEND=' + (this.showLegend ? '1' : '0');
        url = url + '&ISARROW=' + (this.showNorthArrow ? '1' : '0');
        if (this.pageTitle != '') {
            url = url + '&TITLE='+this.pageTitle;
        }
        
        window.open(url, 'printablepage', '');
        
    }
});
