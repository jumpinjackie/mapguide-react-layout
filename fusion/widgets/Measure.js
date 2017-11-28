/**
 * Fusion.Widget.Measure
 *
 * $Id: Measure.js 2686 2013-04-05 11:44:39Z jng $
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

 /* ********************************************************************
 * Class: Fusion.Widget.Measure
 *
 * The Measure widget allows the user to measure distances or areas on the map
 * in one or more segments. Area is positive if measured clockwise.
 *
 * Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Constant.MEASURE_TYPE_DISTANCE = 1;
Fusion.Constant.MEASURE_TYPE_AREA = 2;

Fusion.Event.MEASURE_SEGMENT_UPDATE = Fusion.Event.lastEventId++;
Fusion.Event.MEASURE_CLEAR = Fusion.Event.lastEventId++;
Fusion.Event.MEASURE_COMPLETE = Fusion.Event.lastEventId++;

Fusion.Widget.Measure = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,

    //distance of each segment
    distances: null,
    distanceMarkers: null,
    areaMarker: null,

    /* the units to display distances in */
    units: Fusion.UNKNOWN,

    /* Type of measure: values = disance, area or both, default: both*/
    measureType: null,

    /* Precision of the distance displayed */
    distPrecision: 4,

    /* Precision of the area displayed */
    areaPrecision: 4,

    /* Style for the distance line used for distance draw */
    distanceNormalStyle: null,

    /* Style for the polygon used for area draw */
    fillStyle: null,

    /* set to false for local coordinate systems */   
    geodesic: true,

    /* Style for the polygon line used for area draw */
    areaStyle: null,
    segmentLabels: true,
    
    /* maintain measurements for other widgets to read */
    totalLength: 0,
    totalArea: 0,
    
    initializeWidget: function(widgetTag) {
        this.asCursor = ['crosshair'];
        var json = widgetTag.extension;
        this.units = (json.Units && (json.Units[0] != '')) ?  Fusion.unitFromName(json.Units[0]): this.units;
        this.distPrecision = json.DistancePrecision ? parseInt(json.DistancePrecision[0]) : 4;
        this.areaPrecision = json.AreaPrecision ? parseInt(json.AreaPrecision[0]) : 4;
        if(json.SegmentLabels){
            this.segmentLabels = (json.SegmentLabels[0].toLowerCase() == "true" && json.SegmentLabels[0]) ? true : false;
        }
        if(json.Geodesic){
            this.geodesic = (json.Geodesic[0].toLowerCase == "false") ? false : true;
        }
        this.sTarget = json.Target ? json.Target[0] : "";
        this.sBaseUrl = Fusion.getFusionURL() + 'widgets/Measure/Measure.php';

        //init measure type
        this.measureType = 0;
        if (json.Type) {
            switch(json.Type[0].toLowerCase()) {
                case 'distance':
                    this.measureType |= Fusion.Constant.MEASURE_TYPE_DISTANCE;
                    break;
                case 'area':
                    this.measureType |= Fusion.Constant.MEASURE_TYPE_AREA;
                    break;
                case 'both':
                    this.measureType |= Fusion.Constant.MEASURE_TYPE_DISTANCE;
                    this.measureType |= Fusion.Constant.MEASURE_TYPE_AREA;
                    break;
                default:
                    break;
            }
        }

        //Here are the canvas style definition
        var fillStyle = json.FillStyle ? json.FillStyle[0] : 'rgba(0,0,255, 0.3)';
        var lineStyleWidth = json.LineStyleWidth ? json.LineStyleWidth[0] : 2;
        var lineStyleColor = json.LineStyleColor ? json.LineStyleColor[0] : 'rgba(0,0,255,0.3)';
        this.distanceMarkers = [];
        this.distances = [];

        this.registerEventID(Fusion.Event.MEASURE_SEGMENT_UPDATE);
        this.registerEventID(Fusion.Event.MEASURE_CLEAR);
        this.registerEventID(Fusion.Event.MEASURE_COMPLETE);

        var mapWidget = this.getMap();
        this.keyHandler = OpenLayers.Function.bind(this.onKeyPress, this);
        Fusion.addWidgetStyleSheet(widgetTag.location + 'Measure/Measure.css');

        mapWidget.registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.setUnits, this, this.units));
        this.registerParameter('Units');

            // style the sketch fancy
        this.sketchSymbolizers = {
                "Point": {
                    pointRadius: 4,
                    graphicName: "square",
                    fillColor: "white",
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeOpacity: 1,
                    strokeColor: "#333333"
                },
                "Line": {
                    strokeWidth: 3,
                    strokeOpacity: 1,
                    strokeColor: "#666666"
                },
                "Polygon": {
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    strokeColor: "#666666",
                    fillColor: "white",
                    fillOpacity: 0.3
                }
        };
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: this.sketchSymbolizers})
        ]);
        var styleMap = new OpenLayers.StyleMap({"default": style});

        //add in the OL Polygon handler
        this.map = mapWidget.oMapOL;
        var handlerOptions = {
            style: "default", // this forces default render intent
            layerOptions: {styleMap: styleMap}
        };
        var handler = OpenLayers.Handler.Path;
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
            handler = OpenLayers.Handler.Polygon;
        }

        var controlOptions = {
            persist: true,
            handlerOptions: handlerOptions,
            partialDelay: 600,
            callbacks: {
                'modify': OpenLayers.Function.bind(this.measurePartial, this),
                'cancel': OpenLayers.Function.bind(this.resetMeasure, this)
            }
        };
        this.control = new OpenLayers.Control.Measure(handler, controlOptions);
        this.getMap().oMapOL.addControl(this.control);

        this.control.events.on({
            measure: this.measure,
            scope: this
        });
        
        //add in the clear button if required
        if(json.ClearButtonContainer) {
          var clearButtonText = json.ClearButtonText? json.ClearButtonText[0] : 'Clear';
          this.clearButton = new Jx.Button({
            label: clearButtonText,
            onClick: OpenLayers.Function.bind(this.clearMeasure, this)
          }).addTo(json.ClearButtonContainer[0]);
          this.registerForEvent(Fusion.Event.MEASURE_CLEAR, OpenLayers.Function.bind(this.toggleClearButton, this, false));
          this.registerForEvent(Fusion.Event.MEASURE_SEGMENT_UPDATE, OpenLayers.Function.bind(this.toggleClearButton, this, true));
          this.clearButton.setEnabled(false);
        }

        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.extentsChangedCB, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.extentsChangedCB, this));

    },
    
    clearMeasure: function() {
        this.control.cancel();
    },

    toggleClearButton: function(enabled) {
        this.clearButton.setEnabled(enabled);
    },

    extentsChangedCB: function() {
        var olControl = this.control;
        if(olControl && olControl.active)
        {
            var poly = olControl.handler;
            var geom = poly.getGeometry();
            if(geom)
            {
                this.updateMarkers(geom);
            }
        }
    },

    updateMarkers: function(geom) {
        var v = geom.getVertices();
        for(var i = 0; i < this.distanceMarkers.length; i++)
        {
            if (i + 1 >= v.length)
                break;

            var seg =  new OpenLayers.Geometry.LineString();
            seg.addPoint(v[i].clone());
            seg.addPoint(v[i+1].clone());
            this.updateMarker(this.distanceMarkers[i], seg);
        }
        this.updateDistances(geom);
        this.updateArea(geom);
    },

    shouldActivateWith: function(widget) {
        return (widget instanceof Fusion.Widget.SelectPolygon &&
                widget.widgetUniqueId == this.widgetUniqueId);
        
    },
    

    measure: function(stats) {
        this.hasMeasure = true;
        /* rebuild distance markers */
        var geom = stats.geometry;
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_DISTANCE) {
            var v = geom.getVertices();
            while(this.distanceMarkers.length > v.length-1) {
                this.distanceMarkers.pop().destroy();
            }
            var vFirst = v0 = v[0];
            for (var i=1; i<v.length; i++) {
                v1 = v[i];
                if (this.distanceMarkers[i-1]) {
                    var m = this.distanceMarkers[i-1];
                    m.label = i + ': ';
                } else {
                    m = new Fusion.Widget.Measure.Marker(this.units, this.distPrecision, i + ': ');
                }
                var seg = new OpenLayers.Geometry.LineString();
                seg.addPoint(v0.clone());
                seg.addPoint(v1.clone());
                this.updateMarker(m,seg);
                v0 = v1;
            }
            if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
                seg = new OpenLayers.Geometry.LineString();
                seg.addPoint(vFirst);
                seg.addPoint(v0);
                this.lastMarker.label = i+ ': ';
                this.updateMarker(this.lastMarker, seg);
            }
        }
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
            this.updateArea(geom);
        }
        this.triggerEvent(Fusion.Event.MEASURE_COMPLETE);
    },

    measurePartial: function(point, sketch) {
        var geom = sketch.geometry;
        var v = geom.getVertices();
        if (this.hasMeasure) {
            if(v.length != 1)
            {
                this.resetMeasure();
                this.hasMeasure = false;
            }
        }
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_DISTANCE) {
            this.updateDistances(geom);
        }
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
            this.updateArea(geom);
        }
        this.triggerEvent(Fusion.Event.MEASURE_SEGMENT_UPDATE);
    },

    updateDistances: function(geom) {
        var v = geom.getVertices();
        var last = v.length - 1;
        if (last > 0) {
            var lastSeg =  new OpenLayers.Geometry.LineString();
            lastSeg.addPoint(v[last - 1].clone());
            lastSeg.addPoint(v[last].clone());
            var marker;
            if (this.distanceMarkers.length < last) {
                marker = new Fusion.Widget.Measure.Marker(this.units, this.distPrecision, last + ': ');
                this.distanceMarkers.push(marker);
            } else {
                marker = this.distanceMarkers[last-1];
            }
            this.updateMarker(marker, lastSeg);
            if ( last > 1 && geom.CLASS_NAME.indexOf('LineString') == -1) {
                lastSeg = new OpenLayers.Geometry.LineString();
                lastSeg.addPoint(v[0].clone());
                lastSeg.addPoint(v[last].clone());
                if (!this.lastMarker) {
                    this.lastMarker = new Fusion.Widget.Measure.Marker(this.units, this.distPrecision, '');
                }
                this.lastMarker.label = v.length + ': ';
                this.updateMarker(this.lastMarker, lastSeg);
            }
        }
    },

    updateArea: function(geom) {
        if (!this.areaMarker) {
            this.areaMarker = new Fusion.Widget.Measure.Marker(this.units, this.areaPrecision, '', true);
        }
        this.updateMarker(this.areaMarker, geom);
    },

    delayUpdate: function(marker, geom) {
        this.delayUpdateTimer = null;
        this.updateMarker(marker, geom);
    },

    updateMarker: function(marker, geom) {
        if (!marker) {
            return;
        }
        var quantity, from, to;
        var v = geom.getVertices();
        var map = this.getMap();
        var proj = map.oMapOL.baseLayer.projection;
        var at = null;
        var pixQuantity = 0;
        if (geom.CLASS_NAME.indexOf('LineString') != -1) {
            from = this.getMap().geoToPix(v[0].x,v[0].y);
            to = this.getMap().geoToPix(v[1].x,v[1].y);
            at = {x: (from.x + to.x) / 2, y: (from.y + to.y) / 2};
            if (this.geodesic) {
              quantity = geom.getGeodesicLength(proj);
            } else {
              quantity = geom.getLength();
            }

            //calculate the length in pixels
            pixQuantity = Math.sqrt((to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y));

            measureUnits = Fusion.METERS;
            if (measureUnits != this.units) {
              quantity = Fusion.convert(measureUnits, this.units, quantity);
            }
        } else {
            if(geom.getArea() == 0)
                return;

            var cg = geom.getCentroid();
            at = this.getMap().geoToPix(cg.x, cg.y);
            if (this.geodesic) {
              quantity = geom.getGeodesicArea(proj);
            } else {
              quantity = geom.getArea();
            }
            var resolution = this.getMap().getResolution();

            measureUnits = Fusion.METERS;
            if (measureUnits != this.units) {
                var rate = Fusion.convert(measureUnits, this.units, 1);
                quantity = quantity * rate * rate;
                resolution = resolution * rate;
            }
            this.areaMarker.quantity = quantity;

            //calculate the area in square pixels
            pixQuantity = quantity / (resolution*resolution);

        }

        if (pixQuantity > 1) {
            marker.setQuantity(quantity);
            this.positionMarker(marker, at);
        }
    },

    positionMarker: function(marker, at) {
        var oDomElem =  this.getMap().getDomObj();
        if (!marker.domObj.parentNode ||
            marker.domObj.parentNode != oDomElem) {
            oDomElem.appendChild(marker.domObj);
        }
        var size = marker.getSize();
        var t = at.y - size.height/2 ;
        var l = at.x - size.width/2;
        if (!isNaN(t) && !isNaN(l)) {
            marker.domObj.style.top = t + 'px';
            marker.domObj.style.left = l + 'px';
            if(this.segmentLabels === true){
                marker.domObj.style.display = 'block';
            }
        } else {
            if(this.segmentLabels === true){
                marker.domObj.style.display = 'none';
            }
        }
    },

    onKeyPress: function(e) {
        var charCode = (e.charCode ) ? e.charCode : ((e.keyCode) ? e.keyCode : e.which);
        if (charCode == OpenLayers.Event.KEY_ESC) {
            this.deactivate();
            this.activate();
        }
    },

    /**
     * (public) initVars()
     *
     * reset area and/or distance vars
     */
    initVars: function() {
        this.cumulativeDistance = 0;
        this.lastDistance = 0;
        this.cumulativeArea = 0;
        this.lastArea = 0;
        this.aAreaFirstPoint = null;
    },

    activate: function() {
        this.loadDisplayPanel();
        this.startMeasurement();
    },
    
    startMeasurement: function() {
        this.control.activate();
        //We add a stub "stop" link to the MapMessage, then wire it up to stopMeasurement() by fetching the
        //anchor element through its DOM
        var msg = this.getMap().message;
        msg.info(OpenLayers.i18n("measureInProgress") + " <a id='measureMsgDismiss' href='javascript:void(0)'>" + OpenLayers.i18n("stop") + "</a>");
        var link = msg.container.ownerDocument.getElementById("measureMsgDismiss");
        //Wire the anchor click
        link.onclick = OpenLayers.Function.bind(this.stopMeasurement, this);
        
        OpenLayers.Event.observe(document,"keypress",this.keyHandler);
        this.getMap().supressContextMenu(true);
        this.updateButtonStates();
        //This is digitization, so trigger the necessary event
        this.getMap().triggerEvent(Fusion.Event.MAP_DIGITIZER_ACTIVATED);
    },
    
    stopMeasurement: function() {
        OpenLayers.Event.stopObserving(document, 'keypress', this.keyHandler);
        this.control.deactivate();
        this.control.cancel();
        this.getMap().message.clear();
        this.getMap().supressContextMenu(false);
        this.updateButtonStates();
        //This is digitization, so trigger the necessary event
        this.getMap().triggerEvent(Fusion.Event.MAP_DIGITIZER_DEACTIVATED);
    },
    
    updateButtonStates: function() {
        if (this.startButton != null && this.stopButton != null) {
            this.stopButton.disabled = !this.control.active;
            this.startButton.disabled = this.control.active;
        }
    },
    
    setButtons: function(stopBtn, startBtn) {
        this.startButton = startBtn;
        this.stopButton = stopBtn;
        this.updateButtonStates();
    },
    
    initManualControls: function(outputWin) {
        this.startButton = null;
        this.stopButton = null;
        
        var timer;
        var that = this;
        var watch = function() {
            try {
                if (outputWin.domInit) {
                    doc = outputWin.document;
                    clearInterval(timer);
                    outputWin.SetWidget(that); //Hook the widget for auto-deactivation
                }
            } catch (e) {
            }
        };
        timer = setInterval(watch, 200);
    },

    loadDisplayPanel: function() {
        if (this.sTarget) {
            var url = this.sBaseUrl;
            var queryStr = 'locale='+Fusion.locale;
            if (url.indexOf('?') < 0) {
                url += '?';
            } else if (url.slice(-1) != '&') {
                url += '&';
            }
            url += queryStr + '&type='+this.measureType;

            var taskPaneTarget = Fusion.getWidgetById(this.sTarget);
            var outputWin = window;
            if ( taskPaneTarget ) {
                if(!taskPaneTarget.isSameWithLast(url))
                {
                    taskPaneTarget.setContent(url);
                }
                outputWin = taskPaneTarget.iframe.contentWindow;
            } else {
                outputWin = window.open(url, this.sTarget, this.sWinFeatures);
            }
            this.initManualControls(outputWin);
            this.registerForEvent(Fusion.Event.MEASURE_CLEAR, OpenLayers.Function.bind(this.clearDisplay, this, outputWin));
            this.registerForEvent(Fusion.Event.MEASURE_SEGMENT_UPDATE, OpenLayers.Function.bind(this.updateDisplay, this, outputWin));
            this.registerForEvent(Fusion.Event.MEASURE_COMPLETE, OpenLayers.Function.bind(this.updateDisplay, this, outputWin));
        } else {
          if (this.measureType & Fusion.Constant.MEASURE_TYPE_DISTANCE) {
              this.totalDistanceMarker = new Fusion.Widget.Measure.Marker(this.units, this.distPrecision, 'Total:');
              var oDomElem =  this.getMap().getDomObj();
              if (!this.totalDistanceMarker.domObj.parentNode ||
                  this.totalDistanceMarker.domObj.parentNode != oDomElem) {
                  oDomElem.appendChild(this.totalDistanceMarker.domObj);
              }
              this.totalDistanceMarker.domObj.addClass('divMeasureTotal');
              this.totalDistanceMarker.domObj.style.display = 'none';
              this.registerForEvent(Fusion.Event.MEASURE_CLEAR, OpenLayers.Function.bind(this.clearTotalDistance, this));
              this.registerForEvent(Fusion.Event.MEASURE_SEGMENT_UPDATE, OpenLayers.Function.bind(this.updateTotalDistance, this));
              this.registerForEvent(Fusion.Event.MEASURE_COMPLETE, OpenLayers.Function.bind(this.updateTotalDistance, this));
          }
        }
    },

    /**
     * (public) deactivate()
     *
     * deactivate the ruler tool
     */
    deactivate: function() {
        this.stopMeasurement();
    },

    resetMeasure: function() {
        this.initVars();
        for (var i=0; i<this.distanceMarkers.length; i++)  {
            this.distanceMarkers[i].destroy();
        }
        this.distanceMarkers = [];
        if (this.areaMarker) {
            this.areaMarker.destroy();
            this.areaMarker = null;
        }
        if (this.lastMarker) {
            this.lastMarker.destroy();
            this.lastMarker = null;
        }
        this.triggerEvent(Fusion.Event.MEASURE_CLEAR, this);
    },

    remoteMeasureSegment: function(marker, from, to, geom) {
        var mapWidget = this.getMap();
        var widgetLayer = this.getMapLayer();
        var s = 'layers/' + widgetLayer.arch + '/' + Fusion.getScriptLanguage() + "/Measure." + Fusion.getScriptLanguage();
        var fromGeo = mapWidget.pixToGeo(from.x, from.y);
        var toGeo = mapWidget.pixToGeo(to.x, to.y);
        var options = {
            parameters: {
                'session': widgetLayer.getSessionID(),
                'locale': Fusion.locale,
                'mapname': mapWidget.getMapName(),
                'x1': fromGeo.x,
                'y1': fromGeo.y,
                'x2': toGeo.x,
                'y2': toGeo.y
            },
            'onComplete': OpenLayers.Function.bind(this.remoteMeasureCompleted, this, from, to, marker)
        };
        Fusion.ajaxRequest(s, options);
    },

    remoteMeasureCompleted: function(from, to, marker, r) {
        if (r.status == 200) {
            var o = Fusion.parseJSON(r.responseText);
            if (o.distance) {
              /* distance returned is always in meters*/
              //var mapUnits = Fusion.unitFromName(this.getMap().getUnits());
              //if (mapUnits == Fusion.DEGREES || Fusion.DECIMALDEGREES)
              mapUnits = Fusion.METERS;

              if (mapUnits != this.units) {
                o.distance = Fusion.convert(mapUnits, this.units, o.distance);
              }

              marker.setQuantity(o.distance);
              this.positionMarker(marker, from, to);
              this.triggerEvent(Fusion.Event.MEASURE_SEGMENT_UPDATE);
            }
        }
    },

    /*
     * updates the summary display if it is loaded in a window somewhere
     */
    updateDisplay: function(outputWin) {
        var outputDoc = outputWin.document;
        var resolution = this.getMap().getResolution();
        this.clearDisplay(outputWin);
        var units = Fusion.unitAbbr(this.units);
        var value;
        var distPrecision = this.distPrecision;
        var createEntry = function(idx, distance, resolution) {
            if (distance / resolution < 1) {
                return;
            }
            var tr = outputDoc.createElement('tr');
            var td = outputDoc.createElement('td');
            td.innerHTML = OpenLayers.i18n('segment',{'seg':idx});
            tr.appendChild(td);
            td = outputDoc.createElement('td');
            if (distPrecision == 0) {
              value = Math.floor(distance);
            }
            else {
              value = distance.toPrecision(distPrecision);
            }
            td.innerHTML = value + ' ' + units;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_DISTANCE) {
            var tbody = outputDoc.getElementById('segmentTBody');
            var totalDistance = 0;
            if (tbody) {
                for (var i=0; i<this.distanceMarkers.length; i++) {
                    var distance = this.distanceMarkers[i].getQuantity();
                    totalDistance += distance;
                    createEntry(i+1, distance, resolution);
                }
                if (this.lastMarker) {
                    totalDistance += this.lastMarker.getQuantity();
                    createEntry(i+1, this.lastMarker.getQuantity(), resolution);
                }
                var tDist = outputDoc.getElementById('totalDistance');
                if (this.distPrecision == 0) {
                      value = Math.floor(totalDistance);
                }
                else {
                  value = totalDistance.toPrecision(this.distPrecision);
                }
                tDist.innerHTML = value + ' ' + units;
            }
        }
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
            var tArea = outputDoc.getElementById('totalArea');
            if (tArea) {
                value = this.areaMarker.getQuantity();
                if (this.areaPrecision == 0) {
                    value = Math.floor(value);
                } else {
                    value = value.toPrecision(this.areaPrecision);
                }
                tArea.innerHTML = value + ' ' + units + '<sup>2</sup>';
            }
        }
    },

    /*
     * updates the summary display if it is loaded in a window somewhere
     */
    updateTotalDistance: function() {
      	var totalDistance = 0;
        var units = Fusion.unitAbbr(this.units);
        for (var i=0; i<this.distanceMarkers.length; i++) {
            var distance = this.distanceMarkers[i].getQuantity();
            totalDistance += distance;
        }
        if (this.lastMarker) {
            var lastDist = this.lastMarker.getQuantity();
            //only add this in if it's a multi-point geometry
            if (lastDist != totalDistance) {
                totalDistance += lastDist;
            }
        }
        this.totalDistanceMarker.domObj.style.display = 'block';
        this.totalDistanceMarker.setQuantity(totalDistance);
        
        if (this.distPrecision == 0) {
          totalDistance = Math.floor(totalDistance);
        } else {
          totalDistance = totalDistance.toPrecision(this.distPrecision);
        }
        this.totalLength = totalDistance;
        if (this.measureType & Fusion.Constant.MEASURE_TYPE_AREA) {
          var value = this.areaMarker.getQuantity();
          if (this.areaPrecision == 0) {
            value = Math.floor(value);
          } else {
            value = value.toPrecision(this.areaPrecision);
          }
          this.totalArea = value;
        }
    },

  /*
      *clears the summary display if it is loaded in a window somewhere
      */
    clearDisplay: function(outputWin) {
        var outputDoc = outputWin.document;
        var tbody = outputDoc.getElementById('segmentTBody');
        if (tbody) {
          while(tbody.firstChild) {
              tbody.firstChild.marker = null;
              tbody.removeChild(tbody.firstChild);
          }
          var tDist = outputDoc.getElementById('totalDistance');
          tDist.innerHTML = '';
          var tArea = outputDoc.getElementById('totalArea');
          if(tArea){
              tArea.innerHTML = '';
          }
        }
    },

  /*
      *clears the summary display if it is loaded in a window somewhere
      */
    clearTotalDistance: function() {
      this.totalDistanceMarker.domObj.style.display = 'none';
      this.totalLength = 0;
    },

  /*
     * Callback method for the MAP_LOADED event
     * Set the units to whatever is specified in the AppDef, or the mapUnits if not specified
     * Subsequent calls from a ViewOptions widget would override the value specified.
     */
    setUnits: function(units) {
      var map = this.getMap();
      units = (units == Fusion.UNKNOWN)?Fusion.unitFromName(map.getUnits()):units;
      this.setParameter('Units', Fusion.unitName(units));
      if (map.oMapOL.baseLayer.projection.proj && map.oMapOL.baseLayer.projection.proj.localCS) {
        this.geodesic = false;
      }
    },

    setParameter: function(param, value) {
      //console.log('setParameter: ' + param + ' = ' + value);
        if (param == 'Units') {
            this.units = Fusion.unitFromName(value);
            for (var i=0; i<this.distanceMarkers.length; i++) {
                this.distanceMarkers[i].setUnits(this.units);
            }
            if (this.totalDistanceMarker) {
              this.totalDistanceMarker.setUnits(this.units);
            }
        }
    }
});

/*
* A class for handling the 'tooltip' for the distance measurement.  Markers also hold the distance
values and all markers are held in an array in the Measure widget for access.
*/
Fusion.Widget.Measure.Marker = OpenLayers.Class(
{
    calculatingImg: null,
    quantity: 0,
    isArea: false,
    initialize: function(units, precision, label, isArea) {
        this.precision = precision;
        this.label = label ? label:'';
        this.isArea = isArea || false;
        this.domObj = new Element('DIV', {});

       this.domObj.className = 'divMeasureMarker';
        this.calculatingImg = document.createElement('img');
        this.calculatingImg.src = Fusion.getFusionURL() + 'widgets/Measure/MeasurePending.gif';
        this.calculatingImg.width = 19;
        this.calculatingImg.height = 4;
        this.setUnits(units);
        this.setCalculating();
    },

    destroy: function() {
      if (this.domObj.parentNode) {
          this.domObj.parentNode.removeChild(this.domObj);
          this.domObj.style.display = 'none'; //Also hide it because Safari leaves the domObj on the page
      }
    },

    setUnits: function(units) {
        this.unit = units;
        this.unitAbbr = Fusion.unitAbbr(units);
    },

    getQuantity: function() {
        return this.quantity;
    },

    getQuantityLabel: function() {
      var value;
      if (this.precision == 0) {
          value = Math.floor(this.quantity);
      } else {
          value = this.quantity.toPrecision(this.precision);
      }
      var sq = '';
      if (this.isArea) {
          sq = '<sup>2<sup>';
      }
      return this.label + ' ' + value + ' ' + this.unitAbbr + sq;
    },

    setQuantity: function(quantity) {
        if (this.calculatingImg.parentNode) {
            this.calculatingImg.parentNode.removeChild(this.calculatingImg);
        }
        this.quantity = quantity;
        this.domObj.innerHTML = this.getQuantityLabel();
    },

    setCalculating: function() {
        if (!this.calculatingImg.parentNode) {
            this.domObj.innerHTML = '';
            this.domObj.appendChild(this.calculatingImg);
        }
    },

    getSize: function() {
        var size =  $(this.domObj).getBorderBoxSize();
        var imgSize = {width:19, height:4};
        if (size.width < imgSize.width) {
            size.width += imgSize.width;
        }
        if (size.height < imgSize.height) {
            size.height += imgSize.height;
        }
        return size;
    }
});
