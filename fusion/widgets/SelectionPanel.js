/**
 * Fusion.Widget.SelectionPanel
 *
 * $Id: SelectionPanel.js 2683 2013-03-28 10:07:16Z jng $
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
 * Class: Fusion.Widget.SelectionPanel
 *
 * A widget to display information about the currently selected set of features.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Widget.SelectionPanel = OpenLayers.Class(Fusion.Widget, {
    /**
     * Property: previousIcon
     * {String} The default image for Previous page button.
     */
    previousIcon: 'images/icon_back.gif',

    /**
     * Property: nextIcon
     * {String} The default image for Previous page button.
     */    
    nextIcon: 'images/icon_forward.gif',
    
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        if (json.PreviousImageUrl) this.previousIcon = json.PreviousImageUrl;
        if (json.NextImageUrl) this.nextIcon = json.NextImageUrl;
        this.iResultsPerPage = json.ResultsPerPage ? json.ResultsPerPage[0] : 0;
        this.iResultsPerPage = parseInt(this.iResultsPerPage);
        if (isNaN(this.iResultsPerPage) || (this.iResultsPerPage < 0))
            this.iResultsPerPage = 0;

        if (json.SelectionRenderer)
        {
            var renderer = eval(json.SelectionRenderer[0]);
            if (renderer && renderer.prototype.CLASS_NAME && renderer.prototype.CLASS_NAME == "Fusion.Widget.SelectionPanel.SelectionRenderer") {
                this.renderer = new renderer(this);
            } else if (typeof renderer == "function") {
                var renderFunction = renderer;
                this.renderer = new Fusion.Widget.SelectionPanel.SelectionRenderer(this);
                this.renderer.updateSelection = function() {
                    this.getMap().getSelection(
                        OpenLayers.Function.bind(renderFunction));
                };
                this.renderer.clearSelection = false;
            } else {
                this.renderer = new Fusion.Widget.SelectionPanel.SelectionRendererDefault(this);
            }
        } else {
            this.renderer = new Fusion.Widget.SelectionPanel.SelectionRendererDefault(this);
        }
        this.iResultsPerPage = null; // handled by the renderer
        
        if (this.renderer.updateSelection) {
            this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_ON,
                                           OpenLayers.Function.bind(this.renderer.updateSelection, this.renderer));
        }
        
        if (this.renderer.clearSelection) {
            this.getMap().registerForEvent(Fusion.Event.MAP_SELECTION_OFF,
                                           OpenLayers.Function.bind(this.renderer.clearSelection, this.renderer));
        }
    }
});

/* Class: Fusion.Widget.SelectionPanel.SelectionRenderer
 * This is a class designed to help users to create their own renderer
 * for customize display results. 
 */
Fusion.Widget.SelectionPanel.SelectionRenderer = OpenLayers.Class(
{
    /**
     * Property: oSelectionPanel
     * {<Fusion.Widget.SelectionPanel>} The parent widget that uses
     *                                  the renderer.
     */
    oSelection: null,

    /**
     * Property: aiCurrentIndex
     * {Array(int)} The index of the current position for pagination.
     *
     */
    aiCurrentIndex: null,
    
    /**
     * Property: iResultsPerPage
     * {int} The number of results per page for pagination.
     */
    iResultsPerPage: 0,

    /* Constructor: Fusion.Widget.SelectionPanel.SelectionRenderer
     * Constructor for a new <Fusion.Widget.SelectionPanel.SelectionRenderer> instance.
     * 
     * Parameters:
     * selectionPanel - {<Fusion.Widget.SelectionPanel>} The parent widget that uses 
     *                                                   the renderer.
     */   
    initialize: function(selectionPanel) {
        this.oSelectionPanel = selectionPanel;
        this.iResultsPerPage = selectionPanel.iResultsPerPage;
        this.aiCurrentIndex = new Array();
    },
    
    /**
     * Method: updateSelectionObject
     * Helper method to update the aiCurrentIndex array for pagination.
     *
     */
    updatePageIndexes: function() {
        var nLayers = this.oSelection.getNumLayers();
        for (var i=0; i<nLayers; i++) {
            this.aiCurrentIndex[this.oSelection.getLayer(i).getName()] = 0;
        }
    },

    /**
     * Method: getNextPage
     * Get the next batches of features. Wrapper of the getPage() method.
     * This method calcul the startIndex/endIndex of the next batch.
     *
     * Parameters:
     * selectionLayer - {<Fusion.SelectionObject.Layer>} The layer that contains 
     *                                                   the set of features.
     *
     * Returns:
     * {Array(Array)} An array of all features with their properties.
     */
    getNextPage: function(selectionLayer) {
        if (selectionLayer && (this.iResultsPerPage != 0)) {
            var layerName = selectionLayer.getName();
            if (this.aiCurrentIndex[layerName] >= selectionLayer.getNumElements()) {
                this.aiCurrentIndex[layerName] = this.aiCurrentIndex[layerName] - this.iResultsPerPage;
            }
            var iTotalElement = selectionLayer.getNumElements();
            var startIndex = this.aiCurrentIndex[layerName];
            var endIndex = startIndex + this.iResultsPerPage;
            if (endIndex >= iTotalElement) {
                endIndex = iTotalElement;
            }
      
            if (startIndex < 0) {
                startIndex = 0;
            }
            this.aiCurrentIndex[layerName] = endIndex;
            
            // if the last page doesn't contains "iResultsPerPage" elements. Fix the current index for the next getPreviousPage() call.
            var diff = (endIndex - startIndex); 
            if ( diff != this.iResultsPerPage) {
                this.aiCurrentIndex[layerName] = this.aiCurrentIndex[layerName] + (this.iResultsPerPage - diff);
            }
            
            return this.getPage(selectionLayer, startIndex, endIndex);
        }
        return this.getPage(selectionLayer);
    },

    /**
     * Method: getPreviousPage
     * Get the previous batches of features. Wrapper of the getPage() method.
     * This method calcul the startIndex/endIndex of the previous batch.
     *
     * Parameters:
     * selectionLayer - {<Fusion.SelectionObject.Layer>} The layer that contains 
     *                                                   the set of features.
     *
     * Returns:
     * {Array(Array)} An array of all features with their properties.
     */
    getPreviousPage: function(selectionLayer) {
        var layerName = selectionLayer.getName();
        if (selectionLayer && (this.aiCurrentIndex[layerName] != 0) && (this.iResultsPerPage != 0)) {
            
            var iTotalElement = selectionLayer.getNumElements();
            var startIndex = this.aiCurrentIndex[layerName] - (this.iResultsPerPage * 2);
            var endIndex = this.aiCurrentIndex[layerName]  - this.iResultsPerPage;
            if (startIndex < 0) {
                startIndex = 0;
                endIndex = (iTotalElement < this.iResultsPerPage) ? iTotalElement : this.iResultsPerPage;
            }
            
            this.aiCurrentIndex[layerName] = endIndex;
            return this.getPage(selectionLayer, startIndex, endIndex);
        }
        return this.getPage(selectionLayer);
    },

    /**
     * Method: getMap
     * Helper method to obtains the map.
     *
     * Returns:
     * {<Fusion.Maps>} The map that uses the SelectionPanel Widget.
     */
    getMap: function() {
        return this.oSelectionPanel.getMap();
    },

    /**
     * Method: getPage
     * Get a batches of features in a selection.
     *
     * Parameters:
     * selectionLayer - {<Fusion.SelectionObject.Layer>} The layer that contains 
     *                                                   the set of features.
     * startIndex - {int} The index of the first element.
     * endIndex   - {int} The index of the last element.
     *
     * Returns:
     * {Array(Array)} An array of all features with their properties.
     */
    getPage: function(selectionLayer, startIndex, endIndex) {
        var page = false;
        if (selectionLayer) {
            page = new Array();
            startIndex = startIndex ? startIndex : 0;
            endIndex = endIndex ? endIndex : selectionLayer.getNumElements();
            var propNames = selectionLayer.getPropertyNames();
            var index =0;
            for (var i=startIndex; i<endIndex; i++, index++) {
                page[index] = new Array();
                for (var j=0; j<propNames.length; j++) {
                    page[index][j] = selectionLayer.getElementValue(i, j);
                }
            }
        }
        return page;
    },

    /**
     * Method: updateSelection
     * Abstract method that handle the event: Fusion.Event.MAP_SELECTION_ON. This method
     *     should be implemented by all concrete class.
     */
    updateSelection: function() {},
    
    /**
     * Method: clearSelection
     * Abstract method that handle the event: Fusion.Event.MAP_SELECTION_OFF. This method
     *     should be implemented by all concrete class.
     */
    clearSelection: function() {},

    CLASS_NAME: "Fusion.Widget.SelectionPanel.SelectionRenderer"
});

/* Class: Fusion.Widget.SelectionPanel.SelectionRendererDefault
 * This class provide a default behavior for the selection panel.
 * 
 */
Fusion.Widget.SelectionPanel.SelectionRendererDefault = OpenLayers.Class(Fusion.Widget.SelectionPanel.SelectionRenderer,
{
    initialize : function(selectionPanel) {
        Fusion.Widget.SelectionPanel.SelectionRenderer.prototype.initialize.apply(this, [selectionPanel]);

        var d = document.createElement('div');

        this.toolbar = document.createElement('div');
        this.toolbar.className = 'selectionPanelToolbar';

        this.layerList = document.createElement('select');
        this.layerList.className = 'layerSelector';
        this.toolbar.appendChild(this.layerList);
        OpenLayers.Event.observe(this.layerList, 'change',
                      OpenLayers.Function.bind(this.renderSelectionFeatures, this));

        this.featureList = document.createElement('select');
        this.featureList.className = 'featureSelector';
        this.toolbar.appendChild(this.featureList);
        OpenLayers.Event.observe(this.featureList, 'change',
                      OpenLayers.Function.bind(this.renderFeature, this));

        this.featureDiv = document.createElement('div');
        this.featureDiv.className = 'selectionPanelContent';
        this.clearSelection();

        d.appendChild(this.toolbar);
        d.appendChild(this.featureDiv);
        
        Fusion.addWidgetStyleSheet(this.oSelectionPanel.getLocation() + 'SelectionPanel/SelectionPanel.css');
        this.oSelectionPanel.domObj.appendChild(d);
    },

    updateSelection: function() {
        this.getMap().getSelection(
            OpenLayers.Function.bind(this.renderSelectionLayers, this));
    },

    clearSelection: function() {
        this.layerList.options.length = 0;
        this.featureList.options.length = 0;
        this.oSelection = null;
        this.featureDiv.className = 'selectionPanelContent noSelection';
        this.featureDiv.innerHTML = OpenLayers.i18n('noSelection');
    },

    renderSelectionLayers: function(oSelection) {
        //TODO: this just gets the first map, we need them all
        this.oSelection = null;
        for (var mapName in oSelection) {
            this.oSelection = oSelection[mapName];
            break;
        }
        
        if (!this.oSelection) {
            return;
        }
 
        //clear the layer list select box of any previous selections
        this.featureDiv.className = 'selectionPanelContent';
        while (this.layerList.length>0) {
          this.layerList.remove(this.layerList.options[0]);
        }
        var nLayers = this.oSelection.getNumLayers();
        for (var i=0; i<nLayers; i++) {
            var layerObj = this.oSelection.getLayer(i);
            
            //find the legend label from the Map layer objects
            //join up all layers from all maps into an array
            var mapLayers = [];
            var map = this.getMap();
            for (j=0; j<map.aMaps.length; ++j) {
              if (map.aMaps[j].aLayers) {
                for (k=0; k<map.aMaps[j].aLayers.length; ++k) {
                  mapLayers.push(map.aMaps[j].aLayers[k]);
                }
              }
            }
            
            var labelName = layerObj.getName();
            for (var j=0; j<mapLayers.length; ++j) {
              if (mapLayers[j].layerName == labelName) {
                labelName = mapLayers[j].legendLabel;
                break;
              }
            }
            var opt = new Option(labelName, i);
            this.layerList.options[i] = opt;
        }
        this.layerList.selectedIndex = 0;
        this.renderSelectionFeatures();
    },

    renderSelectionFeatures: function() {
        var layerIdx = this.layerList.selectedIndex;
        var layerObj = this.oSelection.getLayer(layerIdx);

        //clear the feature list select box of any previous selections
        while (this.featureList.length>0) {
          this.featureList.remove(this.featureList.options[0]);
        }

        var nElements = layerObj.getNumElements();
        for (var i=0; i<nElements; i++) {
            var opt = new Option(i+1, i);
            this.featureList.options[i] = opt;
        }
        this.featureList.selectedIndex = 0;
        this.renderFeature();
    },

    renderFeature: function() {
        var layerIdx = this.layerList.selectedIndex;
        var featureIdx = this.featureList.selectedIndex;
        var layerObj = this.oSelection.getLayer(layerIdx);
        var nProperties = layerObj.getNumProperties();
        var aNames = layerObj.getPropertyNames();

        var table = document.createElement('table');

        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.innerHTML = OpenLayers.i18n('attribute');
        tr.appendChild(th);
        var th = document.createElement('th');
        th.innerHTML = OpenLayers.i18n('value');
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for (var i=0; i<nProperties; i++) {
            var tr = document.createElement('tr');
            if (i%2) {
                tr.className = 'oddRow';
            }
            var th = document.createElement('th');
            th.innerHTML = aNames[i];
            var td = document.createElement('td');
            td.innerHTML = layerObj.getElementValue(featureIdx, i);
            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        this.featureDiv.innerHTML = '';
        this.featureDiv.appendChild(table);
    }
});



// This could be removed from this file if we want to keep only ONE default renderer.

/* Class: Fusion.Widget.SelectionPanel.SelectionRendererHorizontal
 * This class provide a alternate behavior for the selection panel.
 * Generate a table which have one feature per row.
 * 
 */
Fusion.Widget.SelectionPanel.SelectionRendererHorizontal = OpenLayers.Class(Fusion.Widget.SelectionPanel.SelectionRenderer,
{
    initialize : function(selectionPanel) {
        Fusion.Widget.SelectionPanel.SelectionRenderer.prototype.initialize.apply(this, [selectionPanel]);
        
        var d = document.createElement('div');
        this.featureDiv = document.createElement('div');
        this.featureDiv.innerHTML = 'No Selection';
        this.featureDiv.className = 'selectionPanelContent noSelection';
        d.appendChild(this.featureDiv);

        if (this.iResultsPerPage != 0) {
            this.previousButton = document.createElement('img');
            this.previousButton.src = this.oSelectionPanel.previousIcon;
            this.previousButton.style.position = "absolute";
            this.previousButton.style.left = "0px";
            this.previousButton.style.padding = "3px";
            OpenLayers.Event.observe(this.previousButton, 'click',
                          OpenLayers.Function.bind(this.renderLayers, this, 'prev'));
            this.nextButton = document.createElement('img');
            this.nextButton.src = this.oSelectionPanel.nextIcon;
            this.nextButton.style.position = "absolute";
            this.nextButton.style.right = "0px";
            this.nextButton.style.padding = "3px";
            OpenLayers.Event.observe(this.nextButton, 'click',
                          OpenLayers.Function.bind(this.renderLayers, this, 'next'));
            
            d.appendChild(this.previousButton);
            d.appendChild(this.nextButton);
        }

        Fusion.addWidgetStyleSheet(this.oSelectionPanel.getLocation() + 'SelectionPanel/SelectionPanel.css');
        this.oSelectionPanel.domObj.appendChild(d);
    },

    updateSelection: function() {
        this.getMap().getSelection(
            OpenLayers.Function.bind(this.renderSelection, this));
    },

    clearSelection: function() {
        this.oSelection = null;
        this.featureDiv.className = 'selectionPanelContent noSelection';
        this.featureDiv.innerHTML = OpenLayers.i18n('noSelection');
    },
    
    renderSelection: function(oSelection) {
        //TODO: this just gets the first map, we need them all
        this.oSelection = null;
        for (var mapName in oSelection) {
            this.oSelection = oSelection[mapName];
            break;
        }
        this.updatePageIndexes();
        this.renderLayers("next");
    },
    
    renderLayers: function(renderingPage) {
        if (!this.oSelection) {
            return;
        }
        
        $(this.featureDiv).removeClass('noSelection');
        this.featureDiv.innerHTML = '';
        
        var mapWidget = this.getMap();
        var aMaps = mapWidget.getAllMaps();
        var mgLayer = null;
        //NOTE: We are obviously assuming only one Fusion.Layers.MapGuide instance here (if any)
        for (var i = 0; i < aMaps.length; i++) {
            if (aMaps[i].arch == "MapGuide") {
                mgLayer = aMaps[i];
                break;
            }
        }
        
        if (mgLayer == null)
            return;
        
        var nLayers = this.oSelection.getNumLayers();
        for (var i=0; i<nLayers; i++) {
            var table = document.createElement('table');
            table.style.borderLeft = "1px solid #CCCCCC";
            table.style.marginBottom = "10px";
            var layerObj = this.oSelection.getLayer(i);
            var aNames = layerObj.getPropertyNames();
            
            //find the legend label from the Map layer objects
            var mapLayers = mgLayer.aLayers;
            var labelName = layerObj.getName();
            for (var j=0; j<mapLayers.length; ++j) {
                if (mapLayers[j].layerName == labelName) {
                    labelName = mapLayers[j].legendLabel;
                    break;
                }
            }
            
            var thead = document.createElement('thead');
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.innerHTML = labelName;
            th.colSpan=aNames.length;
            th.style.textAlign = "center";
            tr.appendChild(th);
            thead.appendChild(tr);
            tr = document.createElement('tr');
            for (var j=0; j<aNames.length; j++) {
                th = document.createElement('th');
                th.innerHTML = aNames[j];
                th.style.textAlign = "center";
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            table.appendChild(thead);
            var tbody = document.createElement('tbody');
            var page = (renderingPage == 'next') ? this.getNextPage(layerObj): this.getPreviousPage(layerObj);
            this.renderFeatures(page,tbody);
            table.appendChild(tbody);
            this.featureDiv.appendChild(table);
        }

    },

    renderFeatures: function(page, dom) {
        if (!page)
            return;

        for (var i=0; i<page.length; i++) {
            var tr = document.createElement('tr');
            if (i%2) {
                tr.className = 'oddRow';
            }
            for (var j=0; j<page[i].length; j++) {
                var td = document.createElement('td');
                td.innerHTML = page[i][j];
                tr.appendChild(td);
            }
            dom.appendChild(tr);            
        }
    }
});
