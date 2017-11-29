/**
 * Fusion.Widget.SelectRadius
 *
 * $Id: SelectRadius.js 1816 2009-03-11 20:33:51Z pagameba $
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
 * Class: Fusion.Widget.SelectRadius
 *
 * perform a selection by radius from a point
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/
Fusion.Event.RADIUS_WIDGET_ACTIVATED = Fusion.Event.lastEventId++;

Fusion.Widget.SelectAttribute = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,
    drawn: false,
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        if (json.Container) {
          this.container = $(json.Container[0]);
        }
        this.workArea = document.createElement('div');
        this.container.appendChild(this.workArea);
        
        //eventually there will be multiple rows for AND/OR ops on attributes
        this.attrRow = document.createElement('div');
        this.attrRow.className = 'selectAttrInputs';
        this.workArea.appendChild(this.attrRow);
        
        var d = document.createElement('div');
        d.innerHTML = "layer to query:";
        this.layerList = document.createElement('select');
        this.layerList.className = 'layerSelector';
        d.appendChild(this.layerList);
        this.attrRow.appendChild(d);

        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.listLayers, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_RELOADED, OpenLayers.Function.bind(this.listLayers, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_ACTIVE_LAYER_CHANGED, OpenLayers.Function.bind(this.setAttributeOptions, this));
    },
    
    /**
     * populate th list of seletable layers when the map loads
     */
    listLayers: function() {
        //this.layerList.empty();
        this.layerList.innerHTML = '';
        var map = this.getMapLayer(); 
        this.layerList.options[this.layerList.options.length] = new Option('--select--','');
        for (var i=0; i<map.aLayers.length; ++i) {
            var layer = map.aLayers[i];
            if (layer.selectable) {
              this.layerList.options[this.layerList.options.length] = new Option(layer.legendLabel,layer.layerName);
            }
        }
        this.layerList.onchange = OpenLayers.Function.bind(this.activateLayer, this);
        
        var sl = Fusion.getScriptLanguage();
        var queryScript = 'layers/' + map.arch + '/' + sl  + '/GetAttributes.' + sl;
        var params = {
            'mapname': map._sMapname,
            'session': map.getSessionID()
            //'layers': layers,
        };
        var ajaxOptions = {
            onSuccess: OpenLayers.Function.bind(this.setAttributes, this),
            method: 'GET',
            parameters: params
        };
        Fusion.ajaxRequest(queryScript, ajaxOptions);
        
    },
    
    setAttributes: function(xhr) {
      if (xhr.status < 400) {
          this.attrs = Fusion.parseJSON(xhr.responseText);
      }
    },
    
    setAttributeOptions: function(event) {
      if (this.drawn) {
        //this.propsList.empty();
        this.propsList.innerHTML = '';
        var layer = this.layerList[this.layerList.selectedIndex].value;
        var attrs = this.attrs[layer].propertyvalues;
        var props = this.attrs[layer].propertynames;
        for (var i=0; i<attrs.length; ++i) {
            this.propsList.options[this.propsList.options.length] = new Option(attrs[i],props[i]);
        }
      }
    },
    
    activateLayer: function(event) {
      if (this.drawn) {
        var layer = this.layerList[this.layerList.selectedIndex].value;
        var map = this.getMapLayer();
        var mapWidget = this.getMap();
        for (var i=0; i<map.aLayers.length; ++i) {
          if (map.aLayers[i].layerName == layer) {
            mapWidget.setActiveLayer(map.aLayers[i]);
            break;
          }
        }
      }
    },
    
    /**
     * activate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     */
    activate: function() {
        this.container.style.display = 'block';
        
        if (!this.drawn) {
          this.drawn = true;
          this.propsList = document.createElement('select');
          this.propsList.className = 'propsSelector';
          this.attrRow.appendChild(this.propsList);
          
          this.operatorList = document.createElement('select');
          this.operatorList.className = 'operatorSelector';
          this.operatorList.options[this.operatorList.options.length] = new Option("=","eq",true);
          this.operatorList.options[this.operatorList.options.length] = new Option("like","like");
          this.operatorList.options[this.operatorList.options.length] = new Option(">","gt");
          this.operatorList.options[this.operatorList.options.length] = new Option("<","lt");
          this.operatorList.options[this.operatorList.options.length] = new Option("<=","le");
          this.operatorList.options[this.operatorList.options.length] = new Option(">=","ge");
          this.operatorList.options[this.operatorList.options.length] = new Option("!=","ne");
          this.attrRow.appendChild(this.operatorList);
          
          this.attrValue = document.createElement('input');
          this.attrValue.className = 'propsValue';
          this.attrRow.appendChild(this.attrValue);
          
          new Jx.Button({
              label: 'Query',
              onClick: OpenLayers.Function.bind(this.execute, this)
          }).addTo(this.attrRow);
        }
    },

    /**
     * deactivate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     **/
    deactivate: function() {
        this.container.style.display = 'none';
        //this.workArea.style.display = 'none';
    },
    
    /**
     *  set the extants of the map based on the pixel coordinates
     * passed
     * 
     * @param center
     * @param radius
     **/
    execute: function() {
        var propertyName = this.propsList[this.propsList.selectedIndex].value;
        var operator = this.operatorList[this.operatorList.selectedIndex].value;
        var propertyValue = this.attrValue.value;
        var numValue = parseFloat(propertyValue);
        var filter = null;
        if ( isNaN(numValue) ) {
          //we have a string
          if (operator == 'like') {
            filter = "/.*"+propertyValue+".*/gi";
          } else {
            filter = "(["+propertyName+"] "+operator+" '"+propertyValue+"')";
          }
        } else {
          //we have a number
            filter = "(["+propertyName+"] "+operator+" "+propertyValue+")";
        }
        var options = {
          layers: this.layerList[this.layerList.selectedIndex].value,
          filterItem: propertyName,
          filter: filter
        };
        
        this.getMap().query(options);
    }
});
