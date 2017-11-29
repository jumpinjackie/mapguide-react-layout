/**
 * Fusion.Widget.Legend
 *
 * $Id: Legend.js 2932 2016-04-18 11:52:40Z jng $
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
 * Class: Fusion.Widget.Legend
 *
 * A widget to display a legend of all layers.
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.Legend = OpenLayers.Class(Fusion.Widget,  {

    /**
     * Constant: defaultLayerDWFIcon
     * {String} The default image for DWF layer
     */
    defaultLayerDWFIcon: 'images/icons/legend-DWF.png',
    
    /**
     * Constant: defaultLayerRasterIcon
     * {String} The default image for Raster layer
     */
    defaultLayerRasterIcon: 'images/icons/legend-raster.png',
    
    /**
     * Constant: defaultLayerThemeIcon
     * {String} The default image for layers that are currently themed.
     */
    defaultLayerThemeIcon: 'images/icons/legend-theme.png',

    /**
     * Constant: defaultDisabledLayerIcon
     * {String} The default image for layers that are out of scale.
     */
    defaultDisabledLayerIcon: 'images/icons/legend-layer.png',

    /**
     * Constant: defaultRootFolderIcon
     * {String} The default image for the root folder
     */
    defaultRootFolderIcon: 'images/icons/legend-map.png',
    
    /**
     * Constant: defaultLayerInfoIcon
     * {String} The default image for layer info
     */
    defaultLayerInfoIcon: 'images/icons/layer-info.png',
    
    /**
     * Constant: defaultGroupInfoIcon
     * {String} The default image for groupd info
     */
    defaultGroupInfoIcon: 'images/icons/group-info.png',
    
    /**
     * Constant: outOfRangeIcon
     * {String}: The default image for layers outside the current visible scale range
     */
    outOfRangeIcon: 'images/icons/out-of-range.png',
    
    initializeWidget: function(widgetTag) {
        // TODO: maybe it's a good idea to do a function like Fusion.Widget.BindRenderer.. for limit the code
        // duplication if we plan to apply this pattern to others widgets
        Fusion.addWidgetStyleSheet(widgetTag.location + 'Legend/Legend.css');
        
        // TODO: maybe it's a good idea to do a function like Fusion.Widget.BindRenderer.. for limit the code
        //       duplication if we plan to apply this pattern to others widgets
        var json = widgetTag.extension;
        if (json.LegendRenderer)
        {
            var renderer = eval(json.LegendRenderer[0]);
            if (renderer && renderer.prototype.CLASS_NAME
                && renderer.prototype.CLASS_NAME == "Fusion.Widget.Legend.LegendRenderer") {
                this.renderer = new renderer(this, widgetTag);
            } else if (typeof renderer == "function") {
                var renderFunction = renderer;
                this.renderer = new Fusion.Widget.Legend.LegendRenderer(this);
                this.renderer.mapLoaded = renderFunction;
                this.renderer.mapReloaded = renderFunction;
                this.renderer.mapLoading = false;
            } else {
                this.renderer = new Fusion.Widget.Legend.LegendRendererDefault(this, widgetTag);
            }
        } else {
            this.renderer = new Fusion.Widget.Legend.LegendRendererDefault(this, widgetTag);
        }

        if (this.renderer.mapReloaded)
            this.getMap().registerForEvent(Fusion.Event.MAP_RELOADED,
                                           OpenLayers.Function.bind(this.renderer.mapReloaded, this.renderer));
        if (this.renderer.mapLoading)
            this.getMap().registerForEvent(Fusion.Event.MAP_LOADING,
                                           OpenLayers.Function.bind(this.renderer.mapLoading,this.renderer));
        if (this.renderer.mapLoaded)
            this.getMap().registerForEvent(Fusion.Event.MAP_LOADED,
                                           OpenLayers.Function.bind(this.renderer.mapLoaded, this.renderer));
        if (this.renderer.scaleRangesLoaded)
            this.getMap().registerForEvent(Fusion.Event.MAP_SCALE_RANGE_LOADED,
                                           OpenLayers.Function.bind(this.renderer.scaleRangesLoaded, this.renderer));
    }
});

/* Class: Fusion.Widget.Legend.LegendRenderer
 * This is a class designed to help users to create their own renderer
 * for customize the legend.
 */
Fusion.Widget.Legend.LegendRenderer = OpenLayers.Class(
{
     /**
     * Property: oLegend
     * {<Fusion.Widget.Legend>} The parent widget that uses
     *                                  the renderer.
     */
    oLegend: null,

    /**
     * Property: layerRoot
     * {Groups} The groups of all layers.
     *
     */
    layerRoot: null,

    initialize: function(legend) {
        this.oLegend = legend;
        this.layerRoot = this.getMap().layerRoot;
    },

    /**
     * Method: renderLegend
     * Abstract method that have the main purpose to draw the legend. This method
     * should be implemented by all concrete class.
     *
     */
    renderLegend: function() {},
    
    /**defaultDisabledLayerIcon
     * Method: mapLoading
     * Abstract method that handle the event: Fusion.Event.MAP_LOADING. This method
     * is optional.
     *
     */
    mapLoading: function() {},

    /**
     * Method: mapLoaded
     * Abstract method that handle the event: Fusion.Event.MAP_LOADED. This method
     * occur only at the first load of the map and should be implemented by all concrete class.
     *
     */
    mapLoaded: function() {},

     /**
     * Method: mapReloaded
     * Abstract method that handle the event: Fusion.Event.MAP_RELOADED. This method
     * should be implemented by all concrete class.
     *
     */
    mapReloaded: function() {},

     /**
     * Method: mapRefresh
     * Abstract method that handle the event: Fusion.Event.MAP_LAYER_ORDER_CHANGED. This method
     * should be implemented by all concrete class.
     *
     */
    mapRefresh: function() {},

    /**
     * Method: getMap
     * Helper method to obtains the map.
     *
     * Returns:
     * {<Fusion.Maps>} The map that uses the SelectionPanel Widget.
     */
    getMap: function() {
        return this.oLegend.getMap();
    },

    CLASS_NAME: "Fusion.Widget.Legend.LegendRenderer"
});


/* Class: Fusion.Widget.Legend.LegendRendererDefault
 * This class provide a default legend as a collapsable tree.
 *
 */

Fusion.Widget.Legend.LegendRendererDefault = OpenLayers.Class(Fusion.Widget.Legend.LegendRenderer,
{
    /**
     * Property: showRootFolder
     * {Boolean} This controls whether the tree will have a single root node that
     * contains the name of the map as its label.  By default, the root node does
     * not appear.  Set to "true" or "1" to make the root node appear.
     */
    showRootFolder: false,

    /**
     * Property: currentNode
     * {Jx.TreeNode} The current selected node.
     */
    currentNode: null,
    
    /**
     * Property: bIsDrawn
     * {Boolean} Determine if the map is drawn.
     */
    bIsDrawn: false,

    /**
     * Property: updateDelay
     * {Integer} number of milliseconds to delay the update of legend
     */
    updateDelay: 500,

    /**
     * Property: targetFolder
     * {Jx.TreeFolder} The current TreeFolder that the mouse will interact with.
     */
    targetFolder: null,

    /**
     * Property: bIncludeVisToggle
     * {Boolean} Determine if non-visible layer must be draw in the legend.
     */
    bIncludeVisToggle: true,
    offsetsCalculated: false,
   
    initialize: function(legend, widgetTag) {   
        Fusion.Widget.Legend.LegendRenderer.prototype.initialize.apply(this, [legend]);

        var json = widgetTag.extension;
        this.imgLayerDWFIcon = json.LayerDWFIcon ? json.LayerDWFIcon[0] : this.oLegend.defaultLayerDWFIcon;
        this.imgLayerRasterIcon = json.LayerRasterIcon ? json.LayerRasterIcon[0] : this.oLegend.defaultLayerRasterIcon;
        this.imgLayerThemeIcon = json.LayerThemeIcon ? json.LayerThemeIcon[0] : this.oLegend.defaultLayerThemeIcon;
        this.imgDisabledLayerIcon = json.DisabledLayerIcon ? json.DisabledLayerIcon[0] : this.oLegend.defaultDisabledLayerIcon;
        this.imgLayerInfoIcon = json.LayerInfoIcon ? json.LayerInfoIcon[0] : this.oLegend.defaultLayerInfoIcon;
        this.imgGroupInfoIcon = json.GroupInfoIcon ? json.GroupInfoIcon[0] : this.oLegend.defaultGroupInfoIcon;

        //not used?
        //this.layerInfoURL = json.LayerInfoURL ? json.LayerInfoURL[0] : '';
        this.selectedLayer = null;
        
        this.selection = new Jx.Selection({
            onSelect: function(item) {
                var treeItem = item.retrieve('jxTreeItem');
                var data = treeItem.options.data;
                if (data instanceof Fusion.Layers.Group) {
                    this.getMap().setActiveLayer(null);
                } else {
                    this.getMap().setActiveLayer(data);
                }
            }.bind(this)
        });
       
        this.oTree = new Jx.Tree({
            template: '<ul class="jxTreeRoot fusionLegendTreeRoot"></ul>',
            selection:this.selection
        }).addTo(this.oLegend.domObj);
       
        this.hideInvisibleLayers = (json.HideInvisibleLayers && json.HideInvisibleLayers[0]) == 'true' ? true : false;
        //don't show the root folder by default
        this.showRootFolder = (json.ShowRootFolder && json.ShowRootFolder[0] == 'true') ? true:false;
        //do show the map folder by default
        this.showMapFolder = (json.ShowMapFolder && json.ShowMapFolder[0] == 'false') ? false:true;
        
        if (!this.showRootFolder) {
            //console.log('supressing root folder');
            this.oRoot = this.oTree;
        } else {
           // console.log('showing root folder');
            var opt = {
                label: OpenLayers.i18n('defaultMapTitle'),
                // contextMenu: this.getContextMenu(),
                open: true
            };
            this.oRoot = new Jx.TreeFolder(opt);
            this.oTree.add(this.oRoot);
            // this.oRoot.options.contextMenu.add([
            //     new Jx.Menu.Item({
            //         label: OpenLayers.i18n('collapse'),
            //         onClick: OpenLayers.Function.bind(this.collapseBranch, this, this.oRoot)
            //     }),
            //     new Jx.Menu.Item({
            //         label: OpenLayers.i18n('expand'),
            //         onClick: OpenLayers.Function.bind(this.expandBranch, this, this.oRoot)
            //     })]
            // );
        }
        
        this.extentsChangedWatcher = this.update.bind(this);
    },
    
    getContextMenu: function() {
        return new Jx.Menu.Context(this.name).add([
            new Jx.Menu.Item({
                label: OpenLayers.i18n('refresh'),
                onClick: OpenLayers.Function.bind(this.update, this)
            }),
            new Jx.Menu.Item({
                label: OpenLayers.i18n('collapseAll'),
                onClick: OpenLayers.Function.bind(this.collapseAll, this)
            }),
            new Jx.Menu.Item({
                label: OpenLayers.i18n('expandAll'),
                onClick: OpenLayers.Function.bind(this.expandAll, this)
            })]
        );
    },
    
    expandAll: function(folder) {
        this.oTree.items().each(function(item){
            if (item instanceof Jx.TreeFolder) {
                this.recurseTree('expand', item);
            }
        },this);
        if (this.showRootFolder) {
          this.oRoot.expand();
        }
    },
    
    collapseAll: function(folder) {
        this.oTree.items().each(function(item){
            if (item instanceof Jx.TreeFolder) {
                this.recurseTree('collapse', item);
            }
        },this);
        if (this.showRootFolder) {
          this.oRoot.collapse();
        }
    },
    
    collapseBranch: function(folder) {
        folder.collapse();
    },
    
    expandBranch: function(folder) {
        folder.expand();
    },
    
  /**
     * recursively descend the tree applying the request operation which is either 'collapse' or 'expand'
     *
     * @param op the operation to execute
     * @param the folder to operate on
     */
    recurseTree: function(op, folder) {
        folder.items().each(function(item){
            if (item instanceof Jx.TreeFolder) {
                this.recurseTree(op, item);
                item[op]();
            }
        },this);
    },
   
    scaleRangesLoaded: function() {
        this.layerRoot = this.getMap().layerRoot;
        this.renderLegend();
    },
    
    mapLoading: function() {
        this.getMap().deregisterForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, this.extentsChangedWatcher);
        this.clear();
    },
   
    mapLoaded: function() {
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, this.extentsChangedWatcher);
        var baseLayer = this.oLegend.getMapLayer(); 
        baseLayer.registerForEvent(Fusion.Event.MAP_LAYER_ORDER_CHANGED, OpenLayers.Function.bind(this.mapRefresh, this));
        this.layerRoot = this.getMap().layerRoot;
        //this.renderLegend();
    },
    
    mapReloaded: function() {
        this.layerRoot = this.getMap().layerRoot;
        this.renderLegend();
    },
    
    mapRefresh: function() {
        var baseLayer = this.oLegend.getMapLayer();
        baseLayer.parseLayers();
        this.layerRoot = this.getMap().layerRoot;
        this.renderLegend();
    },
    
    /**
     * Callback for legend XML response. Creates a list of layers and sets up event
     * handling. Create groups if applicable.
     * TODO: error handling
     *
     * @param r Object the reponse xhr object
     */
    renderLegend: function(r) {
        this.bIsDrawn = false;
        this.clear();
        if (this.showRootFolder) {
            this.oRoot.setLabel(this.getMap().mapGroup.mapId);
        }
        
        var startGroup = this.layerRoot;
        if (!this.showMapFolder)
            startGroup = this.layerRoot.groups[0];
        
        if (!startGroup.legend) {
            startGroup.legend = {};
            startGroup.legend.treeItem = this.oRoot;
        }
        
        if (this.layerRoot.groups.length > 1) { //Multi-map
            if (this.showMapFolder) {
                for (var i = 0; i < this.layerRoot.groups.length; i++) {
                    this.processMapGroup(this.layerRoot.groups[i], this.oRoot);
                }
            } else {
                for (var i = 0; i < this.layerRoot.groups.length; i++) {
                    var mapRoot = this.layerRoot.groups[i];
                    if (!mapRoot.legend) {
                        mapRoot.legend = {};
                        mapRoot.legend.treeItem = this.oRoot;
                    }
                    for (var j = 0; j < mapRoot.groups.length; j++) {
                        this.processMapGroup(mapRoot.groups[j], this.oRoot);
                    }
                    for (var j = 0; j < mapRoot.layers.length; j++) {
                        this.processMapLayer(mapRoot.layers[j], this.oRoot);
                    }
                }
            }
        } else { //Single-map
            if (!startGroup.legend) {
                startGroup.legend = {};
                startGroup.legend.treeItem = this.oRoot;
            }
            for (var i = 0; i < startGroup.groups.length; i++) {
                this.processMapGroup(startGroup.groups[i], this.oRoot);
            }
            for (var i = 0; i < startGroup.layers.length; i++) {
                this.processMapLayer(startGroup.layers[i], this.oRoot);
            }
        }
        
        this.bIsDrawn = true;
        this.update();
    },

    processMapGroup: function(group, folder) {
        if (group.displayInLegend) {
            /* make a 'namespace' on the group object to store legend-related info */
            group.legend = {};
            var opt = {
                label: group.legendLabel,
                open: group.expandInLegend,
                // contextMenu: this.getContextMenu(),
                checked: group.visible
            };
            var treeItem = new Fusion.Widget.Legend.TreeFolder(opt);
            treeItem.options.data = group;
            group.legend.treeItem = treeItem;
            // treeItem.options.contextMenu.add(
            //     new Jx.Menu.Item({
            //         label: OpenLayers.i18n('collapse'),
            //         onClick: OpenLayers.Function.bind(this.collapseBranch, this, treeItem)
            //     }),
            //     new Jx.Menu.Item({
            //         label: OpenLayers.i18n('expand'),
            //         onClick: OpenLayers.Function.bind(this.expandBranch, this, treeItem)
            //     })
            // );

            folder.add(treeItem);
            var groupInfo = group.oMap.getGroupInfoUrl(group.groupName);
            if (groupInfo) {
                treeItem.setGroupInfo(groupInfo, this.imgGroupInfoIcon);
            }
            for (var i=0; i<group.groups.length; i++) {
                this.processMapGroup(group.groups[i], treeItem);
            }
            for (var i=0; i<group.layers.length; i++) {
                this.processMapLayer(group.layers[i], treeItem);
            }
        }
    },
   
    processMapLayer: function(layer, folder) {
        /* make a 'namespace' on the layer object to store legend-related info */
        layer.legend = {};
        layer.legend.parentItem = folder;
        layer.legend.currentRange = null;
        layer.oMap.registerForEvent(Fusion.Event.LAYER_PROPERTY_CHANGED, OpenLayers.Function.bind(this.layerPropertyChanged, this));
    },
   
    layerPropertyChanged: function(eventID, layer) {
        layer.legend.treeItem.check(layer.isVisible());
    },

    updateTimer: null,
    update: function() {
        if (this.bIsDrawn) {
          if (this.updateTimer) {
            window.clearTimeout(this.updateTimer);
            this.updateTimer = null;
          }
          this.updateTimer = window.setTimeout(OpenLayers.Function.bind(this._update, this), this.updateDelay);
        }
    },
   
    /**
     * update the tree when the map scale changes
     */
    _update: function() {
        this.oTree.freeze();
        this.updateTimer = null;
        var map = this.getMap();
        var currentScale = map.getScale();
        for (var i=0; i<map.layerRoot.groups.length; i++) {
            this.updateGroupLayers(map.layerRoot.groups[i], currentScale);
        }
        //Loop reversed. See addLayerTreeItem() for why we do this
        for (var i=map.layerRoot.layers.length-1; i>=0; i--) {
            this.updateLayer(map.layerRoot.layers[i], currentScale);
        }
        this.oTree.thaw();
    },
   
    /**
     * remove the dom objects representing the legend layers and groups
     */
    clear: function() {
        //console.log('clear legend');
        var map = this.getMap();
        for (var i=0; i<map.layerRoot.groups.length; i++) {
            this.clearGroup(map.layerRoot.groups[i]);
        }
        for (var i=0; i<map.layerRoot.layers.length; i++) {
          if (map.layerRoot.layers[i].legend) {
            map.layerRoot.layers[i].legend.treeItem = null;
            map.layerRoot.layers[i].legend.checkbox = null;
            map.layerRoot.layers[i].legend.currentRange = null;
          }
        }
        this.oRoot.empty();
    },
    
    clearGroup: function(group) {
      for (var i=0; i<group.groups.length; i++) {
        this.clearGroup(group.groups[i]);
      }
      for (var i=0; i<group.layers.length; i++) {
        if (group.layers[i].legend) {
          group.layers[i].legend.treeItem = null;
          group.layers[i].legend.currentRange = null;
        }
      }
    },
    addLayerStyleTreeItems: function(treeItem, items) {
        treeItem.tree.freeze();
        treeItem.add(items);
        treeItem.tree.thaw();
    },
    addLayerTreeItem: function(treeItem, layerTreeItem) {
        //Here's the problem: The layers are being iterated in the correct draw order, but they are
        //being appended *after* groups at any particular level due to the out-of-order tree node rendering
        //setup between group and layer nodes (groups are drawn first before layers). 
        //
        //To do this in a way that preserves draw order, but makes sure thes layer nodes are always 
        //before group nodes at any particular level. We have to do 2 things:
        //
        // 1. Prepend this item instead of appending
        // 2. Ensure the outermost loop that calls updateLayer() (that calls this method), is iterating
        //    in *reverse* order.
        //
        //This allows for layers to be added in correct draw order *before* the group nodes at any
        //particular level.
        //
        //updateLayer() is the only method that calls this method, so the above contract is satisified.
        //If this is no longer the case, please re-read what I just wrote to make sure the two points
        //above are still valid.
        treeItem.add(layerTreeItem, 0);
    },
    updateGroupLayers: function(group, fScale) {
        for (var i=0; i<group.groups.length; i++) {
            this.updateGroupLayers(group.groups[i], fScale);
        }
        //Loop reversed. See addLayerTreeItem() for why we do this
        for (var i=group.layers.length-1 ; i >= 0; i--) {
            this.updateLayer(group.layers[i], fScale);
        }
    },
    updateLayer: function(layer, fScale) {
        /* no need to do anything if we are hiding the layer */
        if (!layer.displayInLegend || !layer.legend) {
            return;
        }
        /* check the layer's current scale range against the previous one
         * if the range hasn't changed, don't do anything
         */
        var range = layer.getScaleRange(fScale);
        if (range == layer.legend.currentRange && layer.legend.treeItem) {
            return;
        }
        
        /* remember the range we are now representing for the next update */
        layer.legend.currentRange = range;
        
        /* if layer is in range */
        if (range != null && range.styles) {
            /* if it has more than one style, we represent it as a folder
             * with classes as items in it
             */
            if (range.styles.length > 1) {
                //tree item needs to be a folder
                if (!layer.legend.treeItem) {
                    layer.legend.treeItem = this.createFolderItem(layer);
                    this.addLayerTreeItem(layer.parentGroup.legend.treeItem, layer.legend.treeItem);
                } else if (layer.legend.treeItem instanceof Fusion.Widget.Legend.TreeItem ||
                           layer.legend.treeItem instanceof Jx.TreeItem) {
                    this.clearTreeItem(layer);
                    layer.legend.treeItem = this.createFolderItem(layer);
                    this.addLayerTreeItem(layer.parentGroup.legend.treeItem, layer.legend.treeItem);
                } else {
                    layer.legend.treeItem.empty();
                }
                //This style range has the compression flag set. This would have been set server-side
                //if it contains more than a pre-defined number of style rules (see LoadScaleRanges.php for
                //more information)
                if (range.isCompressed) {
                    //Attach required data for theme expansion later on
                    layer.legend.treeItem.layer = layer;
                    layer.legend.treeItem.range = range;
                    layer.legend.treeItem.scale = fScale;
                    layer.legend.treeItem.hasDecompressedTheme = false;
                    //console.assert(range.styles.length > 2);
                    var children = [];
                    children.push(this.createTreeItem(layer, range.styles[0], fScale, false));
                    children.push(this.createThemeCompressionItem(range.styles.length - 2, layer.legend.treeItem));
                    children.push(this.createTreeItem(layer, range.styles[range.styles.length-1], fScale, false));
                    this.addLayerStyleTreeItems(layer.legend.treeItem, children);
                } else {
                    var children = [];
                    for (var i=0; i<range.styles.length; i++) {
                        children.push(this.createTreeItem(layer, range.styles[i], fScale, false));
                    }
                    this.addLayerStyleTreeItems(layer.legend.treeItem, children);
                }
            /* if there is only one style or no style, we represent it as a tree item */
            } else {
                var style = range.styles[0];
                if (style && !style.legendLabel) {
                    style.legendLabel = layer.legendLabel;
                }
                if (!layer.legend.treeItem) {
                    layer.legend.treeItem = this.createTreeItem(layer, style, fScale, !layer.isBaseMapLayer);
                    this.addLayerTreeItem(layer.parentGroup.legend.treeItem, layer.legend.treeItem);
                } else if (layer.legend.treeItem instanceof Fusion.Widget.Legend.TreeFolder ||
                           layer.legend.treeItem instanceof Jx.TreeFolder) {
                    this.clearTreeItem(layer);
                    layer.legend.treeItem = this.createTreeItem(layer, style, fScale, !layer.isBaseMapLayer);
                    this.addLayerTreeItem(layer.parentGroup.legend.treeItem, layer.legend.treeItem);
                } else {
                    if (range.styles.length > 0) {
                        var url;
                        if(style.iconOpt && style.iconOpt.url){
                            url = style.iconOpt.url;
                            var img = layer.legend.treeItem.elements.get('jxTreeIcon');
                            var iconX = -1 * style.iconX;
                            var iconY = -1 * style.iconY;
                            img.style.backgroundPosition = iconX + 'px ' + iconY + 'px';
                        }else{
                            url = layer.oMap.getLegendImageURL(fScale, layer, style);
                        }
                        layer.legend.treeItem.setImage(url);
                        layer.legend.treeItem.enable(true);
                    } else {
                        layer.legend.treeItem.enable(false);
                    }
                }
            }
        } else {
            /* the layer is to be displayed but is not visible in the map
             * at the current map scale so disable it and display as a tree
             * item or hide it altogether if necessary;
             */
            if (this.hideInvisibleLayers) {
                if (layer.legend.treeItem) {
                    layer.parentGroup.legend.treeItem.remove(layer.legend.treeItem);
                    layer.legend.treeItem = null;
                }
            } else {
                var newTreeItem = this.createTreeItem(layer, {legendLabel: layer.legendLabel, iconOpt: { url: this.oLegend.outOfRangeIcon } }, null, !layer.isBaseMapLayer);
                if (layer.legend.treeItem) {
                    layer.parentGroup.legend.treeItem.replace(layer.legend.treeItem, newTreeItem);
                    layer.legend.treeItem.finalize();
                } else {
                    this.addLayerTreeItem(layer.parentGroup.legend.treeItem, newTreeItem);
                }
                layer.legend.treeItem = newTreeItem;
            }
        }
        if (layer.legend.treeItem) {
            layer.legend.treeItem.options.data = layer;
            if (!layer.isBaseMapLayer) //Tiled layers don't have a checkbox so there's nothing to check
                layer.legend.treeItem.check(layer.visible);
        }
    },
    getThemeExpandContextMenu: function(node) {
        return new Jx.Menu.Context(this.name).add([
            new Jx.Menu.Item({
                label: OpenLayers.i18n('expandTheme'),
                onClick: OpenLayers.Function.bind(function() { this.expandTheme(node); }, this)
            })]
        );
    },
    expandTheme: function(node) {
        if (node.hasDecompressedTheme !== true && confirm(OpenLayers.i18n('expandCompressedThemeConfirmation'))) {
            var range = node.range;
            var layer = node.layer;
            var fScale = node.scale;
            node.empty();
            //FIXME: JxLib really needs an API to add these in a single batch that doesn't hammer
            //the DOM (if it's even possible)
            for (var i = 0; i < range.styles.length; i++) {
                var item = this.createTreeItem(layer, range.styles[i], fScale, false);
                node.add(item);
            }
            node.hasDecompressedTheme = true;
        }
    },
    createThemeCompressionItem: function(number, node) {
        var opt = {
            label: OpenLayers.i18n('otherThemeItems', { count: number }),
            draw: this.renderItem,
            contextMenu: this.getThemeExpandContextMenu(node),
            image: this.imgBlankIcon
        };
        var item = new Jx.TreeItem(opt);
        return item;
    },
    createFolderItem: function(layer) {
        var opt = {
            label: layer.legendLabel == '' ? '&nbsp;' : layer.legendLabel,
            open: layer.expandInLegend,
            // contextMenu: this.getContextMenu(),
            image: this.imgLayerThemeIcon
        };
        if (layer.metadata) {
          opt.selectable = !layer.metadata.jxUnselectable || (layer.metadata.jxUnselectable && layer.metadata.jxUnselectable != 'true');
        } else {
          opt.selectable = false;
        }
        var folder;
        if (!layer.isBaseMapLayer) {
            folder = new Fusion.Widget.Legend.TreeFolder(opt);
            /* only need to add layer info if it has a check box too */
            var layerInfo = layer.oMap.getLayerInfoUrl(layer.layerName);
            if (layerInfo) {
                folder.setLayerInfo(layerInfo, this.imgLayerInfoIcon);
            }
        }  else {
            opt.selectable = false;
            folder = new Jx.TreeFolder(opt);
        }
        var img = folder.elements.get('jxTreeIcon');
        img.style.backgroundPosition = '0px 0px';
        // folder.options.contextMenu.add([
        //     new Jx.Menu.Item({
        //         label: OpenLayers.i18n('collapse'),
        //         onClick: OpenLayers.Function.bind(this.collapseBranch, this, folder)
        //     }),
        //     new Jx.Menu.Item({
        //         label: OpenLayers.i18n('expand'),
        //         onClick: OpenLayers.Function.bind(this.expandBranch, this, folder)
        //     })]
        // );
       
        return folder;
    },
    
    createTreeItem: function(layer, style, scale, checkbox) {
        var opt = {};
        opt.statusIsDefault = layer.statusDefault;
        var range = layer.legend.currentRange;
        //Set the label. Use style label IFF there are more than one style rule.
        //Otherwise layer's legend label takes precedence
        if (style && range && range.styles.length > 1) {
            opt.label = style.legendLabel == '' ? '&nbsp;' : style.legendLabel;
        } else {
            opt.label = layer.legendLabel == '' ? '&nbsp;' : layer.legendLabel;
        }
        
        if (layer.metadata) {
          opt.selectable = !layer.metadata.jxUnselectable || (layer.metadata.jxUnselectable && layer.metadata.jxUnselectable != 'true');
        } else {
          opt.selectable = false;
        }

        var LAYER_RASTER = 4;
        var LAYER_DWF = 5;

        if (!style) {
            //This could be a DWF or Raster layer
            if (layer.layerTypes.length == 1) {
                if (layer.layerTypes[0] == LAYER_RASTER) {
                    opt.image = this.imgLayerRasterIcon;
                } else if (layer.layerTypes[0] == LAYER_DWF) {
                    opt.image = this.imgLayerDWFIcon;
                } else {
                    opt.image = this.imgDisabledLayerIcon;
                    opt.enabled = false;
                }
            } else {
                opt.image = this.imgDisabledLayerIcon;
                opt.enabled = false;
            }
        } else {
            if(style.iconOpt && style.iconOpt.url){
                opt.image = style.iconOpt.url;
            }else{
                opt.image = layer.oMap.getLegendImageURL(scale, layer, style);
            }
        }

        var item;
        if (!layer.isBaseMapLayer&&checkbox) {
            // opt.contextMenu = this.getContextMenu();
            item = new Fusion.Widget.Legend.TreeItem(opt);
            /* only need to add layer info if it has a check box too */
            var layerInfo = layer.oMap.getLayerInfoUrl(layer.layerName);
            if (layerInfo) {
                item.setLayerInfo(layerInfo, this.imgLayerInfoIcon);
            }
        }  else {
            opt.selectable = false;
            item = new Jx.TreeItem(opt);
        }
        
        var iconX = 0;
        var iconY = 0;
        var img = item.elements.get('jxTreeIcon');
        if (style && style.iconX >= 0 && style.iconY >= 0) {
            /* calculate the size of the image that holds the icon
             * only once and cache the values as it is an expensive operation
             * We use the size to center the class/layer icon as a background
             * image inside the image that holds it so that if the icon is
             * not the same size it is represented in a reasonable way
             */
            if (!this.offsetsCalculated) {
                var parent = img.parentNode;
                var sibling = img.getPrevious();
                var d = new Element('div', {'class':'fusionLegendTreeRoot'});
                img.setStyle('visiblity','hidden');
                img.inject(d);
                //TODO: img.getStyle doesn't seem to work for IE, need another solution here
                var w = 16;//img.getStyle('width').toInt();
                var h = 16;//img.getStyle('height').toInt();
                if (!sibling) {
                    img.inject(parent,'top');
                } else {
                    img.inject(sibling, 'after');
                }
                img.setStyle('visibility','visible');
                this.iconWidth = ((style.iconOpt?style.iconOpt.width:16) - w)/2;
                this.iconHeight = ((style.iconOpt?style.iconOpt.height:16) - h)/2;
                //alert(w+":"+h);
                this.offsetsCalculated = true;
            }
            iconX = -1 * (style.iconX + this.iconWidth);
            iconY = -1 * (style.iconY + this.iconHeight);
            img.style.backgroundPosition = iconX + 'px ' + iconY + 'px';
        }
        
        return item;
    },
    clearTreeItem: function(layer) {
        if (layer.legend.treeItem && layer.legend.treeItem.owner) {
            layer.legend.treeItem.owner.remove(layer.legend.treeItem);
            // layer.legend.treeItem.finalize();
            layer.legend.treeItem.destroy();
            layer.legend.treeItem = null;
        }
    }
});

Fusion.Widget.Legend.TreeItem = new Class({
    Extends: Jx.TreeItem,
    options: {
        template: '<li class="jxTreeContainer jxTreeLeaf"><img class="jxTreeImage" src="'+Jx.aPixel.src+'" alt="" title=""><span class="fusionLegendCheckboxContainer"><input type="checkbox" class="fusionLegendCheckboxInput"></span><a class="fusionLayerInfo" target="_blank"><img class="fusionLayerInfoIcon" src="'+Jx.aPixel.src+'"></a><a class="jxTreeItem fusionCheckboxItem" href="javascript:void(0);"><img class="jxTreeIcon" src="'+Jx.aPixel.src+'" alt="" title=""><span class="jxTreeLabel" alt="" title=""></span></a></li>'
    },
    classes: new Hash({
        domObj: 'jxTreeContainer', 
        domA: 'jxTreeItem', 
        domImg: 'jxTreeImage', 
        domIcon: 'jxTreeIcon',
        domLabel: 'jxTreeLabel',
        checkbox: 'fusionLegendCheckboxInput',
        layerInfo: 'fusionLayerInfo',
        layerInfoIcon: 'fusionLayerInfoIcon'
    }),
    init: function() {
      this.bound.onClick = function(e){
          if (this.options.data) {
              if (e.target.checked && this.options.data.show) {
                  this.options.data.show();
              } else if (!e.target.checked && this.options.data.hide) {
                  this.options.data.hide();
              }
          }
      }.bind(this);
      this.bound.enabled = function() {
          this.checkbox.disabled = false;
      }.bind(this);
      this.bound.disabled = function() {
          this.checkbox.disabled = true;
      }.bind(this);
      this.parent();
    },
    render: function() {
        this.parent();
        this.domLabel.set('alt', this.options.label);
        this.domLabel.set('title', this.options.label);
        if (this.checkbox) {
            if ($defined(this.options.checked)) {
                this.check(this.options.checked);
            }
            this.checkbox.addEvent('click', this.bound.onClick);
            this.addEvents({
              enabled: this.bound.enabled,
              disabled: this.bound.disabled
            });
        }
    },
    cleanup: function() {
      this.removeEvents({
        enabled: this.bound.enabled,
        disabled: this.bound.disabled
      });
      if (this.checkbox) {
        this.checkbox.removeEvent('click', this.bound.onClick);
      }
      this.bound.onClick = null;
      this.bound.enabled = null;
      this.bound.disabled = null;
      this.parent();
    },
    check: function(state) {
        if (this.checkbox) {
            this.checkbox.set('checked', state);
        }
    },
    isChecked: function() {
        return this.checkbox && this.checkbox.checked;
    },
    setLayerInfo: function(url, icon) {
        //change class to make fusionLayerInfo display block
        this.domObj.addClass('fusionShowLayerInfo');
        if (this.layerInfo) {
            this.layerInfo.set('href', url);
        }
        if (this.layerInfoIcon) {
            this.layerInfoIcon.set('src', icon);
        }
    }
});

Fusion.Widget.Legend.TreeFolder = new Class({
    Extends: Jx.TreeFolder,
    options: {
        template: '<li class="jxTreeContainer jxTreeBranch"><img class="jxTreeImage" src="'+Jx.aPixel.src+'" alt="" title=""><span class="fusionLegendCheckboxContainer"><input type="checkbox" class="fusionLegendCheckboxInput"></span><a class="jxTreeItem fusionCheckboxItem" href="javascript:void(0);"><img class="jxTreeIcon" src="'+Jx.aPixel.src+'" alt="" title=""><span class="jxTreeLabel" alt="" title=""></span></a><a class="fusionGroupInfo"><img class="fusionGroupInfoIcon" src="'+Jx.aPixel.src+'"></a><a class="fusionLayerInfo"><img class="fusionLayerInfoIcon" src="'+Jx.aPixel.src+'"></a><ul class="jxTree"></ul></li>'
    },
    classes: new Hash({
        domObj: 'jxTreeContainer', 
        domA: 'jxTreeItem', 
        domImg: 'jxTreeImage', 
        domIcon: 'jxTreeIcon',
        domLabel: 'jxTreeLabel',
        domTree: 'jxTree',
        checkbox: 'fusionLegendCheckboxInput',
        layerInfo: 'fusionLayerInfo',
        layerInfoIcon: 'fusionLayerInfoIcon',
        groupInfo: 'fusionGroupInfo',
        groupInfoIcon: 'fusionGroupInfoIcon'
    }),
    init: function() {
      this.bound.onClick = function(e){
          if (this.options.data) {
              if (e.target.checked && this.options.data.show) {
                  this.options.data.show();
              } else if (!e.target.checked && this.options.data.hide) {
                  this.options.data.hide();
              }
          }
      }.bind(this);
      this.bound.enabled = function() {
          this.checkbox.disabled = false;
      }.bind(this);
      this.bound.disabled = function() {
          this.checkbox.disabled = true;
      }.bind(this);
      this.parent();
    },
    
    render: function() {
        this.parent();
        this.domLabel.set('alt', this.options.label);
        this.domLabel.set('title', this.options.label);
        if (this.checkbox) {
            if ($defined(this.options.checked)) {
                this.check(this.options.checked);
            }
            this.checkbox.addEvent('click', this.bound.onClick);
            this.addEvents({
                enabled: this.bound.enabled,
                disabled: this.bound.disabled
            });
        }
    },
    cleanup: function() {
      this.removeEvents({
        enabled: this.bound.enabled,
        disabled: this.bound.disabled
      });
      if (this.checkbox) {
        this.checkbox.removeEvent('click', this.bound.onClick);
      }
      this.bound.onClick = null;
      this.bound.enabled = null;
      this.bound.disabled = null;
      this.parent();
    },
    check: function(state) {
        if (this.checkbox) {
            this.checkbox.set('checked', state);
        }
    },
    isChecked: function() {
        return this.checkbox && this.checkbox.checked;
    },
    setLayerInfo: function(url, icon) {
        //change class to make fusionLayerInfo display block
        this.domObj.addClass('fusionShowLayerInfo');
        if (this.layerInfo) {
            this.layerInfo.set('href', url);
        }
        if (this.layerInfoIcon) {
            this.layerInfoIcon.set('src', icon);
        }
    },
    setGroupInfo: function(url, icon) {
        //change class to make fusionGroupInfo display block
        this.domObj.addClass('fusionShowGroupInfo');
        if (this.groupInfo) {
            this.groupInfo.set('href', url);
        }
        if (this.groupInfoIcon) {
            this.groupInfoIcon.set('src', icon);
        }
    }
});
