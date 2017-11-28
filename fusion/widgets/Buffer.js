/**
 * Fusion.Widget.Buffer
 *
 * $Id: Buffer.js 2670 2013-03-22 15:33:22Z jng $
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
 * Class: Fusion.Widget.Buffer
 *
 * The Buffer widget prompts the user for some inputs and then creates a buffer
 * around the current selection based on those inputs.
 *
 * NOTE: This version of the widget is not currently being used.  
 * Use BufferPanel instead. The 2 widgets will be merged eventually.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **************************************************************************/

Fusion.Widget.Buffer = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    isExclusive: false,
    layerName: null,
    layerNameInput: null,
    bufferDistance: null,
    bufferDistanceInput: null,
    bufferUnits: null,
    bufferUnitsInput: null,
    borderColor: null,
    borderColorInput: null,
    fillColor: null,
    fillColorInput: null,
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        /* pick up default values */
        this.layerName = json.LayerName ? json.LayerName[0] : '';
        this.layerNameInput = json.LayerNameInput ? json.LayerNameInput[0] : null;
        this.bufferDistance = json.BufferDistance ? parseFloat(json.BufferDistance[0]) : '';
        this.bufferDistanceInput = json.BufferDistanceInput ? json.BufferDistanceInput[0] : null;
        this.bufferUnits = Fusion.unitFromName(json.BufferUnits ? json.BufferUnits[0] : 'meters');
        this.bufferUnitsInput = json.BufferUnitsInput ? json.BufferUnitsInput[0] : null;
        this.borderColor = json.BorderColor ? json.BorderColor[0] :'00000000';
        this.borderColorInput = json.BorderColorInput ? json.BorderColorInput[0] : null;
        this.fillColor = json.FillColor ? json.FillColor[0] : '00000000';
        this.fillColorInput = json.FillColorInput ? json.FillColorInput[0] : null;
        
        /* initialize inputs with defaults */
        if (this.layerNameInput) {
            this.layerNameInput = $(this.layerNameInput);
            this.setValue(this.layerNameInput, this.layerName);
        }
        if (this.bufferDistanceInput) {
            this.bufferDistanceInput = $(this.bufferDistanceInput);
            this.setValue(this.bufferDistanceInput, this.bufferDistance);
        }
        if (this.bufferUnitsInput) {
            this.bufferUnitsInput = $(this.bufferUnitsInput);
            this.setValue(this.bufferUnitsInput, this.bufferUnits);
        }
        if (this.borderColorInput) {
            this.borderColorInput = $(this.borderColorInput);
            this.setValue(this.borderColorInput, this.borderColor);
        }
        if (this.fillColorInput) {
            this.fillColorInput = $(this.fillColorInput);
            this.setValue(this.fillColorInput, this.fillColor);
        }
        
        /* override selection behaviour */
        this.enable = Fusion.Widget.Buffer.prototype.enable;
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_ON, OpenLayers.Function.bind(this.enable, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_OFF, OpenLayers.Function.bind(this.disable, this));
    },
    
    setValue: function(input, value) {
        if (input.tagName.toLowerCase() == "input") {
            switch(input.type) {
                case 'radio':
                case 'checkbox':
                    for (var i=0; i<input.length; i++) {
                        if (input[i].value == value) {
                            input[i].checked = true;
                        }
                    }
                    break;
                case 'file':
                    break;
                case 'button':
                case 'hidden':
                case 'image':
                case 'password':
                case 'reset':
                case 'submit':
                case 'text':
                    input.value = value;
                    break;
                default:
            }
        }
        if (input.tagName.toLowerCase() == 'textarea') {
            input.value = value;
        }
        if (input.tagName.toLowerCase() == 'select') {
            for (var i=0; i<input.options.length; i++) {
                if (input.options[i].value == value) {
                    input.options[i].selected = true;
                    break;
                }
            }
        }
    },
    
    getValue: function(input) {
        if (input.tagName.toLowerCase() == "input") {
            switch(input.type) {
                case 'radio':
                case 'checkbox':
                    return input.value;
                    break;
                case 'file':
                case 'button':
                case 'hidden':
                case 'image':
                case 'password':
                case 'reset':
                case 'submit':
                case 'text':
                    return input.value;
                    break;
                default:
            }
        }
        if (input.tagName.toLowerCase() == 'textarea') {
            return input.value;
        }
        if (input.tagName.toLowerCase() == 'select') {
            return input.options[input.selectedIndex].value;
        }
    },
    
    enable: function() {
        if (this.oMap && this.oMap.hasSelection()) {
            Fusion.Widget.prototype.enable.apply(this, []);
        } else {
            this.disable();
        }
    },
    
    execute: function() {
        if (this.layerNameInput) {
            this.layerName = this.getValue(this.layerNameInput);
        }
        var layer = '&layer=' + this.layerName;
        
        var d;
        if (this.bufferDistanceInput) {
            d = this.getValue(this.bufferDistanceInput);
        } else {
            d = this.bufferDistance;
        }
        
        var du;
        if (this.bufferUnitsInput) {
            du = this.getValue(this.bufferUnitsInput);
        } else {
            du = this.bufferUnits;
        }
        
        /* convert distance to meters client side */
        var distance = '&distance='+Fusion.toMeter(Fusion.unitFromName(du), d);
        
        var borderColor = '&bordercolor=';
        if (this.borderColorInput) {
            borderColor += this.getValue(this.borderColorInput);
        } else {
            borderColor += this.borderColor;
        }
        
        var fillColor = '&fillcolor=';
        if (this.fillColorInput) {
            fillColor += this.getValue(this.fillColorInput);
        } else {
            fillColor += this.fillColor;
        }
        
        var mapWidget = this.getMap();
        var widgetLayer = this.getMapLayer();        
        var s = widgetLayer.arch + '/' + Fusion.getScriptLanguage() + "/Buffer." + Fusion.getScriptLanguage();
        var params = {};
        params.parameters = 'locale='+Fusion.locale +
                            '&merge=1' +
                            '&session='+widgetLayer.getSessionID() +
                            '&mapname='+ widgetLayer.getMapName()+
                            layer+distance+borderColor+fillColor; 
        params.onComplete = OpenLayers.Function.bind(this.bufferCreated, this);
        Fusion.ajaxRequest(s, params);
    },
    
    bufferCreated: function() {
        var widgetLayer = this.getMapLayer();        
        var layer = widgetLayer.getLayerByName(this.layerName);
        if (layer) {
          layer.noCache = true;
        }
        widgetLayer.reloadMap();
        widgetLayer.drawMap();
    }
});
