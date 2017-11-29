/**
 * Fusion.Widget.AddWMSLayer
 *
 * $Id: Print.js 1906 2009-09-23 22:07:49Z chrisclaydon $
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
 * Class: Fusion.Widget.AddWMSLayer
 *
 * Opens a dialog box with a list of layers from a WMS server that can be added
 * to the map.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.AddWMSLayer = OpenLayers.Class(Fusion.Widget, {
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        
        this.template = json.Template ? json.Template[0] : '<li id="{id}" class="jxListItemContainer"><a class="jxListItem" href="javascript::void(0)" alt="{layerTitle}" title="{layerTitle}">{layerTitle}</a></li>';
        this.serviceURL = json.ServiceURL ? json.ServiceURL : [];
        
        this.dialogContentURL = Fusion.getFusionURL() + widgetTag.location + 'AddWMSLayer/AddWMSLayer.html';
        this.addWMSLayerURL = widgetTag.location + 'AddWMSLayer/AddWMSLayer.php';
        Fusion.addWidgetStyleSheet(widgetTag.location + 'AddWMSLayer/AddWMSLayer.css');
        
        this.draw();
    },
    
    draw: function() {
      var form = new Jx.Form({
        name: 'addWMSLayer',
        formClass: 'jxFormBlock'
      }).addTo(this.domObj);
      
    // First Fieldset
    
      var fieldSet1 = new Jx.Fieldset({
        legend: 'Show WMS layers from:',
        id: 'serviceURLFieldset',
        fieldsetClass: 'jxFormInlineblock'
      }).addTo(form);
      
      var serviceURLs = [];
      for (var i=0; i<this.serviceURL.length; ++i) {
        serviceURLs.push({label: this.serviceURL[i]}); 
      }
      this.serviceList = new Jx.Field.Combo({
        id: 'serviceURL',
        name: 'serviceURL',
        label: 'Server URL',
        readonly: false,
        items: serviceURLs
      }).addTo(fieldSet1);
    
      var button = new Jx.Field.Button({
        buttonOptions:{
          id: 'listButton',
          name: 'listButton',
          label: 'List Layers',
          onClick: function() {
            console.log('Go!');
          }
        },
        defaultAction: true
      }).addTo(fieldSet1);
      button.addEvent('click', OpenLayers.Function.bind(this.initializeWMS, this));
      
      this.outputDiv = new Element('div', {
          id: 'layerList',
          'class': 'layerList'
      });
      this.domObj.adopt(this.outputDiv);
    },
    
    initializeWMS: function() {
        this.listLayersWait();
        //prep the server URL to remove WMS params
        var serverURL = this.serviceList.getValue();
        if (serverURL.length >0) {
          var newParams = [];
          var urlParams = serverURL.split('?')
          if (urlParams.length > 1) {
            var params = urlParams[1].split('&');
            for (var j=0; j<params.length; ++j) {
              if (params[j].toLowerCase().indexOf('request')!=-1) continue;
              if (params[j].toLowerCase().indexOf('version')!=-1) continue;
              newParams.push(params[j]);
            }
            urlParams[1] = newParams.join('&');
          }
          serverURL = urlParams.join('?');
          
          var map = this.getMapLayer(); 
          var opts = {
              parameters: {
                  session: map.getSessionID(),
                  mapname: map._sMapname,
                  action: 'listLayersWMS',
                  server: serverURL
              }, 
              onComplete: OpenLayers.Function.bind(this.wmsListLayers, this)
          };
          Fusion.ajaxRequest(this.addWMSLayerURL, opts);
        }
    },
    
/* 
function catalogListLayers - CB from catalogManagerInitialize() with object create the html
                             required to add the layers to the map. clicking on image spawns
                             addCatalogLayer which inturn add's the clicked layer to the map.
*/    
    wmsListLayers: function(r) {
      if (r.responseText) {
        var gCatalogLayersObj;
        try {
          gCatalogLayersObj = Fusion.parseJSON(r.responseText);
        } catch (e) {
          gCatalogLayersObj = {'error': e.stack};
        }
        if (gCatalogLayersObj) {
        
          this.outputDiv.set('html','');
            
          if (gCatalogLayersObj.error) {
            this.outputDiv.set('html', gCatalogLayersObj.error + '<br>' + gCatalogLayersObj.message);
            return;
          }
            
          var layerList = new Jx.ListView({
            'id': 'catalogListLayerUL'
          }).addTo(this.outputDiv); 
          
          for(var i=0;i<gCatalogLayersObj.length;i++){
              var szOwsTitle = gCatalogLayersObj[i].owstitle;
              if (szOwsTitle.length < 1) {
                szOwsTitle = gCatalogLayersObj[i].name;
              }
              
              var templStr = this.template.substitute({
                  'id': gCatalogLayersObj[i].name,
                  'layerTitle':szOwsTitle
              });
              var listItem = new Jx.ListItem({template: templStr });
              listItem.addTo(layerList);
              OpenLayers.Event.observe(listItem.domObj, 'click', OpenLayers.Function.bind(this.addWMSLayer, this, gCatalogLayersObj[i]));
          }
        }
      }
    },
    
    listLayersWait: function() {
        this.outputDiv.set('html', 'Request in progress...');
    },
    
    /* 
    function addWMSLayer - adds the clicked layer from the interface created by catalogListLayers
                               then loads browseCatalog.php to add the clicked layer to the current 
                               session map file. calls addCatalogLayerCB for a return response.
    
    */    
    addWMSLayer: function(cb){
        var map = this.getMapLayer();
        var supportedSRS = cb.srs.toUpperCase();
        var sourceSrs = map.mapWidget.oMapOL.baseLayer.projection.projCode;  //first try the code of the base map
        if (supportedSRS.indexOf(sourceSrs) < 0 ) {
          sourceSrs = "EPSG:4326";  //default to use 4326
          if (supportedSRS.indexOf(sourceSrs) < 0 ) {
            sourceSrs = supportedSRS.split(" ").shift();//just pick the first one
          }
        }
        
        //prep the servername to remove existing WMS params
        var params = {
            session: map.getSessionID(),
            mapname: map._sMapname,
            action: 'addLayer',
            layertype: cb.layertype,
            layername: cb.name,
            group: cb.group,
            owstitle: cb.owstitle,
            srs: sourceSrs,
            imageFormat: cb.imageformat,
            servername: cb.servername,
            wmsservicetitle: cb.wmsservicetitle,
            queryable: cb.queryable,
            metadataurl: cb.metadataurl ? cb.metadataurl : ''
        }
        
        // switch image to a different src.
        //cb.src = 'images/icons/legend-layer.png';
        var opts = {parameters: params, onComplete: OpenLayers.Function.bind(this.addWMSLayerCB, this)};
        Fusion.ajaxRequest(this.addWMSLayerURL, opts);
    },
    
    /* 
    function addWMSLayerCB - CB func from addWMSLayer. The Layer is now added to mapfile, 
                                 if o.addedLayer = true else something when wrong.
    */    
    addWMSLayerCB: function(r) {
        var o = Fusion.parseJSON(r.responseText);    

        if(o.addedLayer == true){
          var map = this.oMap; 
          map.triggerEvent(Fusion.Event.WMS_LAYER_ADDED, new Array(o));
          this.getMapLayer().reloadMap();
        } else {
           // d.log('addCatalogLayerCB:could not add layer');
        }
    }
    
});
