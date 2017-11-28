/**
 * Fusion.Widget.LayerManager
 *
 * $Id: LayerManager.js 2579 2012-09-07 09:20:12Z jng $
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

 /***************************************************************************
 * Class: Fusion.Widget.LayerManager
 * 
 * Displays a LayerManager of all the layers in the map as a collapsable tree.
 *
 * ShowRootFolder (boolean, optional)
 *
 * This controls whether the tree will have a single root node that
 * contains the name of the map as its label.  By default, the root
 * node does not appear.  Set to "true" or "1" to make the root node
 * appear.
 *
 * RootFolderIcon: (string, optional)
 *
 * The url to an image to use for the root folder.  This only has an
 * affect if ShowRootFolder is set to show the root folder.
 *
 * LayerThemeIcon: (string, optional)
 *
 * The url to an image toTopography use for layers that are currently themed.
 *
 * DisabledLayerIcon: (string, optional)
 *
 * The url to an image to use for layers that are out of scale.
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.LayerManager = OpenLayers.Class(Fusion.Widget,  {
    currentNode: null,
    bIsDrawn: false,
    map: null, 
    defTemplate: '<li id="{id}" class="jxListItemContainer jxLmanLayer"><a class="jxListItem lmanLabel" href="javascript:void(0);" alt="{label}" title="{label}"><input type="checkbox" class="lmanVisCheck" {visSelect}><img class="lmanLayerIcon" src="'+Jx.aPixel.src+'" style="background-image: url({icon}); background-position: {iconOffset}; width:16px; height:16px;"><span class="lmanLayerLabel">{label}</span><img src="{delIcon}" class="lmanDelIcon"><img src="{infoIcon}" class="lmanInfoIcon"></a></li>',
    
    initializeWidget: function(widgetTag) {
        //console.log("initializeWidget");
        var json = widgetTag.extension;
        this.delIconSrc = json.DeleteIcon ? json.DeleteIcon[0] : 'images/icons/select-delete.png';
        this.infoIconSrc = json.LayerInfoIcon ? json.LayerInfoIcon[0] : 'images/icons/tree_layer_info.png';
        this.template = json.Template ? json.Template[0] : this.defTemplate;
    
        Fusion.addWidgetStyleSheet(widgetTag.location + 'LayerManager/LayerManager.css');
        this.cursorNormal = ["url('images/grab.cur'),move", 'grab', '-moz-grab', 'move'];
        this.cursorDrag = ["url('images/grabbing.cur'),move", 'grabbing', '-moz-grabbing', 'move'];
        this.map = this.getMap();
        this.map.registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.mapLoaded, this));
        this.map.registerForEvent(Fusion.Event.MAP_RELOADED, OpenLayers.Function.bind(this.mapReLoaded, this));
        this.map.registerForEvent(Fusion.Event.MAP_SCALE_RANGE_LOADED, OpenLayers.Function.bind(this.scaleRangeLoaded, this));
        // update changes to the legend in this widget
        this.getMapLayer().registerForEvent(Fusion.Event.LAYER_PROPERTY_CHANGED, OpenLayers.Function.bind(this.layerChanged,this));
    },
    
    scaleRangeLoaded: function() {
        this.draw();
    },
    mapLoaded: function() {
        //this.draw();
    },
    
    layerChanged: function(eventId, layer) {
        this.updateLayer(this.getMapLayer());
        this.updateSessionMapFile();
    },
    mapReLoaded: function(){
        this.draw();
   },
   
   /**
     * remove the dom objects representing the legend layers and groups
     */
    clear: function(node) {
        //console.log("clear");
        while (node.childNodes.length > 0) {
          this.clear(node.childNodes[0]);
            node.removeChild(node.childNodes[0]);
        }
    },
  
    /**
     * Draws the layer manager
     *
     * @param r Object the reponse xhr object
     */
    draw: function(r) {
        //console.log("draw");
      //clear the domOBj
      var contents = this.domObj.getChildren();
      for (var i=0; i<contents.length; ++i) {
        contents[i].destroy();
      }
      
      //this processes the OL layers
      var map = this.getMap();

      for (var i=0; i<map.aMaps.length; ++i) {
        
        var mapBlock = new Element('div', {
            //'class': 'jxLmanHandle',
            id: 'mapBlock_'+i
        });
        mapBlock.map = map;
        var mapHandle = new Element('a', {
            html: map.aMaps[i]._sMapTitle,
            'class': 'jxLmanHandle jxListItem'
        });
        
        mapBlock.adopt(mapHandle);
        this.processMapBlock(mapBlock, map.aMaps[i]);
        this.domObj.adopt(mapBlock);
      }
      
      //create the sortables for re-arranging whole maps
      //TODO: not yet working
      /*
      if (map.aMaps.length >1) {
        var sortableOptions = {
            constrain: true,
            clone: false,
            revert: true,
            onComplete: OpenLayers.Function.bind(this.updateMapBlock, this, map)
        };
        var mySortables = new Sortables(new Elements(this.domObj.getChildren()), sortableOptions);
      }
      */
    },

    processMapBlock: function(mapBlock, map) {
      //console.log("processMapBlock");
      map.layerList = new Jx.ListView({
          'class': 'jxLmanSet',
          'id': 'fusionLayerManager_'+map.getMapName()
      }).addTo(mapBlock);
      
      map.layerPrefix = 'layer_';   //TODO make this unique for each block
      //this process all layers within an OL layer
      var layers = map.aLayers;
      for (var i=0; i<layers.length; ++i) {
        var listItem = this.createItem(layers[i]);
        listItem.addTo(map.layerList);
      }

      var sortableOptions = {
          constrain: true,
          clone: false,
          revert: true,
          onComplete: OpenLayers.Function.bind(this.updateLayer, this, map)
      };
      var mySortables = new Sortables(map.layerList, sortableOptions);
    },
   
    createItem: function(layer) {
      var scale = layer.oMap.getScale();
      var range = layer.getScaleRange(scale);
      var iconUrl = Jx.aPixel.src;
      var iconOffset = '0px 0px';
      var label = layer.legendLabel;
      if (range && range.styles.length>0) {
          var style = range.styles[0];//TODO: handle multiple styles?
          var iconX = 0;
          var iconY = 0;
          if (style && style.iconX >= 0 && style.iconY >= 0) {
              iconX = -1 * (style.iconX);
              iconY = -1 * (style.iconY);
          }
          iconUrl = style.iconOpt.url;
          iconOffset = iconX + 'px ' + iconY + 'px';
          if (style.legendLabel) {
            label = style.legendLabel;
          }
      }
      
      var templStr = this.template.substitute({
        'id': 'layer_'+layer.uniqueId,
        'label': label,
        'icon': iconUrl,
        'iconOffset': iconOffset,
        'delIcon': this.delIconSrc,
        'infoIcon': this.infoIconSrc,
        'visSelect': layer.visible? 'CHECKED': ''
      });
    
    var listItem = new Jx.ListItem({template: templStr });
    
    var icons = listItem.domObj.getElements('img');
    var infoIcon = icons[2];
    var delIcon = icons[1];
    
    var layerInfo = layer.oMap.getLayerInfoUrl(layer.layerName);
    if (!layerInfo) {
        infoIcon.style.display = "none";
    }

    OpenLayers.Event.observe(infoIcon, 'click', OpenLayers.Function.bind(this.showLayerInfo, this, layer));
    OpenLayers.Event.observe(delIcon, 'click', OpenLayers.Function.bind(this.deleteLayer, this, layer));
    OpenLayers.Event.observe(listItem.domObj.getElement('input'), 'click', OpenLayers.Function.bind(this.visChanged, this, layer));
    
    OpenLayers.Event.observe(listItem.domObj, 'mouseover', OpenLayers.Function.bind(this.setGrabCursor, this));
    OpenLayers.Event.observe(listItem.domObj, 'mousedown', OpenLayers.Function.bind(this.setDragCursor, this));
    OpenLayers.Event.observe(listItem.domObj, 'mouseout', OpenLayers.Function.bind(this.setNormalCursor, this));
    
    OpenLayers.Event.observe(listItem.domObj, 'mouseover', OpenLayers.Function.bind(this.setHandleVis, this, delIcon, infoIcon));
    OpenLayers.Event.observe(listItem.domObj, 'mouseout', OpenLayers.Function.bind(this.setHandleHide, this, delIcon, infoIcon));
    
    return listItem;
  },
  
  setHandleVis: function(delIcon, infoIcon) {
    delIcon.style.visibility = 'visible';
    infoIcon.style.visibility = 'visible';
  },
  
  setHandleHide: function(delIcon, infoIcon) {
    delIcon.style.visibility = 'hidden';
    infoIcon.style.visibility = 'hidden';
  },
  
  setGrabCursor: function(ev) {
    var targetLI = (new Event(ev)).target;
    this.setCursor(this.cursorDrag, targetLI);
  },
  
  setDragCursor: function(ev) {
    var targetLI = (new Event(ev)).target;
   this.setCursor(this.cursorDrag, targetLI);
  },
  
  setNormalCursor: function(ev) {
    var targetLI = (new Event(ev)).target;
    this.setCursor('auto', targetLI);
  },
  
  setCursor: function(cursor, domObj) {
      this.cursor = cursor;
      if (cursor && cursor.length && typeof cursor == 'object') {
          for (var i = 0; i < cursor.length; i++) {
              domObj.style.cursor = cursor[i];
              if (domObj.style.cursor == cursor[i]) {
                  break;
              }
          }
      } else if (typeof cursor == 'string') {
          domObj.style.cursor = cursor;
      } else {
          domObj.style.cursor = 'auto';  
      }
  },
  
  updateLayer: function(map) {
   //console.log("updateLayer");
    //reorder the layers in the client as well as the session
    var aLayerIndex = [];
    var aIds = [];
    var layerList = map.layerList.listObj.getChildren();
    var nLayers = layerList.length;
    for (var i=0; i<nLayers; ++i) {
      aIds[i] = layerList[i].id.split('_');
      var index = parseInt(aIds[i].pop());
      aLayerIndex.push(index);
      layerList[i].id = '';
    }
    
    //reset the ID's on the LI elements to be in order
    for (var i=0; i<layerList.length; ++i) {
      var node = layerList[i];
      aIds[i].push(i);
      node.id = aIds[i].join('_');
      //node.childNodes[2].checked = node.layer.isVisible();
    }
    
    //check tos ee if the layer indexes have been modified
    var indexModified = false;
    if (aLayerIndex.length == map.aLayers.length) {
      for (var i=0; i<aLayerIndex.length; ++i) {
        if (aLayerIndex[i] != i) {
          indexModified = true;
          break;
        }
      }
    } else {
      indexModified = true;
    }

    if (indexModified) {
        map.reorderLayers(aLayerIndex);
    }
  },
   
  updateMapBlock: function(map) {
    //reorder the OL layers and the <Map> elements in AppDef
  },
  
  deleteLayer: function(layer, ev) {
   // console.log("deleteLayer");
    var targetLI = (new Event(ev)).target.parentNode.parentNode;
    $(targetLI).dispose();
    layer.oMap.layerList.remove(targetLI);
    
    this.oMap.layerRoot.deleteLayer(layer.uniqueId);
    this.updateLayer(layer.oMap);
  },
  
  showLayerInfo: function(layer, ev) {
    var layerInfoUrl = layer.oMap.getLayerInfoUrl(layer.layerName);
    if (layerInfoUrl) {
      window.open(layerInfoUrl);
    }
  },
  
  visChanged: function(layer, ev) {
    var target = (new Event(ev)).target;
    if (target.checked) {
      layer.show();
    } else {
      layer.hide();
    }
  },
  
  updateSessionMapFile: function(){
   // console.log("updateSessionMapFile");
    var widgetLayer = this.getMapLayer();
    var sessionId = widgetLayer.getSessionID();

    // get all layers
    var oLayers = widgetLayer.aLayers;
    var aLayerNames = [];
    var visibleLayers = [];
    for(var i=0;i<oLayers.length;i++){
        aLayerNames.push(oLayers[i].layerName);
        if(oLayers[i].visible == true){
            visibleLayers.push(oLayers[i].layerName);
        }
    }

    // prepare ajax req
    var params =  '&session='+sessionId+'&mapname='+ widgetLayer.getMapName()+'&visLayers='+visibleLayers+'&layers='+aLayerNames;
    var options = {parameters: params};

    // fire the request no need to return
    var url = 'layers/' + widgetLayer.arch + '/' + Fusion.getScriptLanguage() + "/updateSessionMapFile." + Fusion.getScriptLanguage()
    Fusion.ajaxRequest(url, options);
  }

});
