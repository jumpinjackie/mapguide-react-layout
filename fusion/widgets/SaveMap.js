/**
 * Fusion.Widget.SaveMap
 *
 * $Id: SaveMap.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.SaveMap
 *
 * Save the current map image on the client's computer
 *
 * usage:
 * DWF format support requires a structure like this in the application
 * definition's widget tag extension:
 *    <Extension>
 *      <Format></Format>
 *      <ResourceId></ResourceId>
 *      <Scale></Scale>
 *    </Extension>
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.SaveMap = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    iframe : null,
    printLayout : null,
    printScale : null,
    imageWidth : null,
    imageHeight : null,
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.format = (json.Format && json.Format[0] != '')?
                       json.Format[0] : 'png';

        //for DWF, parse printLayouts and build menu
        if (this.format == 'DWF' && json.PrintLayout.length) {

            var layouts = json.PrintLayout;
            for (var i = 0; i < layouts.length; i++) {
                var layout = layouts[i];
                var opt = {
                    label: layout.Name[0]
                };
                var data = {rid:layout.ResourceId[0]};
                if (layout.PageHeight) {
                    data.pageHeight = layout.PageHeight[0];
                };
                if (layout.PageWidth) {
                    data.pageWidth = layout.PageWidth[0];
                };
                if (layout.Margins) {
                    data.margins = [layout.Margins[0].Top[0],
                                    layout.Margins[0].Left[0],
                                    layout.Margins[0].Right[0],
                                    layout.Margins[0].Bottom[0]];
                };
                var menuItem = null;
                if (layout.Scale) {
                    //create entries for weblayout specified scales
                    menuItem = new Jx.Menu.SubMenu(opt);
                    data.scales = [];
                    for (var j=0; j < layout.Scale.length; j++) {
                        data.scales.push(layout.Scale[j]);
                        menuItem.add(
                            new Jx.Menu.Item({
                                label:layout.Scale[j],
                                onClick: OpenLayers.Function.bind(this.setLayout, this, data, j)
                            })
                        );
                    }
                    //add an entry for current scale
                    menuItem.add(
                        new Jx.Menu.Item({
                            label:'Current Scale',
                            onClick: OpenLayers.Function.bind(this.setLayout, this, data)
                        })
                    );
                } else {
                    //if there are no scales, the layout is used with current scale
                    opt.onClick = OpenLayers.Function.bind(this.setLayout, this, data);
                    menuItem = new Jx.Menu.Item(opt);
                };
                this.oMenu.add(menuItem);
            }
        } else if(this.format.toLowerCase() == 'dwf') {
            var layout = json;
            if(layout.ResourceId) {
                this.printLayout = layout.ResourceId[0];
            };
            if (layout.PageHeight) {
                this.pageHeight = layout.PageHeight[0];
            };
            if (layout.PageWidth) {
                this.pageWidth = layout.PageWidth[0];
            };
            if (layout.Margins) {
                this.margins = [layout.Margins[0].Top[0],
                                layout.Margins[0].Left[0],
                                layout.Margins[0].Right[0],
                                layout.Margins[0].Bottom[0]];
            };
            if (layout.Scale && layout.Scale != '0') {
                this.printScale = layout.Scale[0];
            };

        } else {
            if (json.Width && json.Width[0] != '') {
                this.imageWidth = json.Width[0];
            }
            if (json.Height && json.Height[0] != '') {
                this.imageHeight = json.Height[0];
            }
        }

        this.enable = Fusion.Widget.SaveMap.prototype.enable;
    },

    enable: function() {
        Fusion.Widget.prototype.enable.apply(this, []);
    },

    setLayout: function(data) {
        this.printLayout = data.rid;
        this.pageHeight = data.pageHeight;
        this.pageWidth = data.pageWidth;
        this.pageMargins = data.margins;
        //when the selected item has a scale, the index into the scales array
        //is passed, otherwise value is reset and current scale is used.
        if (arguments.length == 3){
            this.printScale = parseFloat(data.scales[arguments[1]]);
        } else {
            this.printScale = null;
        }

        this.activateTool();
    },

    /**
     * called when the button is clicked by the Fusion.Widget widget
     * prompts user to save the map.
     */
    activate: function() {
        if (!this.iframe) {
            this.iframe = document.createElement('iframe');
            this.iframe.id = 'w';
            this.iframe.style.visibility = 'hidden';
            document.body.appendChild(this.iframe);
        }
        var szLayout = '';
        var szScale = '';
        var szPageHeight = '';
        var szPageWidth = '';
        var szPageMargins = '';
        if (this.format.toLowerCase() == 'dwf') {
            if (this.printLayout) {
                szLayout = '&layout=' + this.printLayout;
            //} else {
            //    alert('DWF Save is not properly configured.');
            //    return;
            }
            if (this.printScale) {
                szScale = '&scale=' + this.printScale;
            }
            if (this.pageHeight) {
                szPageHeight = '&pageheight=' + this.pageHeight;
            }
            if (this.pageWidth) {
                szPageWidth = '&pagewidth=' + this.pageWidth;
            }
            if (this.pageMargins) {
                szPageMargins = '&margins=' + this.pageMargins.join(',');
            }
        }
        var szHeight = '';
        if (this.imageHeight) {
            szHeight = '&height=' + this.imageHeight;
        }
        var szWidth = '';
        if (this.imageWidth) {
            szWidth = '&width=' + this.imageWidth;
        }
        var m = this.getMapLayer();
        if(navigator.appVersion.match(/\bMSIE\b/)) {
            var url = Fusion.fusionURL + 'layers/' + m.arch + '/' + Fusion.getScriptLanguage() + "/SaveMapFrame." + Fusion.getScriptLanguage() + '?session='+m.getSessionID() + '&mapname=' + m.getMapName() + '&format=' + this.format.toUpperCase() + szLayout + szScale + szWidth + szHeight + szPageHeight + szPageWidth + szPageMargins;
            w = open(url, "Save", 'menubar=no,height=200,width=300');
        } else {
            var s = Fusion.fusionURL + 'layers/' + m.arch + '/' + Fusion.getScriptLanguage() + "/SaveMap." + Fusion.getScriptLanguage() + '?session='+m.getSessionID() + '&mapname=' + m.getMapName() + '&format=' + this.format.toUpperCase() + szLayout + szScale + szWidth + szHeight + szPageHeight + szPageWidth + szPageMargins;

            this.iframe.src = s;
        }
    }
});
