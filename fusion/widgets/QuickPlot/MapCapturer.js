/**
 * Copyright (C) 2010 Autodesk, Inc. All rights reserved.
 */
 
/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Handler/Drag.js
 * @requires OpenLayers/Handler/Feature.js
 */

/**
 * Class: OpenLayers.Control.MapCapturer
 * The MapCapturer control shows a box on the map to illustrate the area that will be captured.
 * Normally the capture information will be used to print the map. If the MapCapturer is configured not
 * show the capture box, then the current viewport will be used as the capture area.
 * 
 * The user can move or rotate the capture box to change the area he'd like to capture.
 * And the user can hold SHIFT key to snapp to a certain angle when he is rotating the capture box
 *
 * Inherits From:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.MapCapturer = OpenLayers.Class(OpenLayers.Control, {
    /**
     * Property: layer
     * {<OpenLayers.Layer.Vector>}
     */
    layer: null,
    
    /**
     * Property: feature. The active feature which is repsonding to mouse action
     * {<OpenLayers.Feature.Vector>}
     */
    feature: null,

    /**
     * Property: captureBox. It's the feature represnting the capture area
     * {<OpenLayers.Feature.Vector>}
     */
    captureBox: null,
    
    /**
     * Property: rotateHandle. It's the feature representing a rotate handle
     * (<OpenLayers.Feature.Vector)
     */
    rotateHandle: null,
    
    /**
     * Property: rotateHandleStart. It's the feature representing the center point of capture box.
     * And it's also the start point of the rotate handle.
     * (<OpenLayers.Feature.Vector>)
     */
    rotateHandleStart: null,
    
    /**
     * Property: rotateHandleEnd. It's the feature responding to the rotate command.
     * (<OpenLayers.Feature.Vector>)
     */
    rotateHandleEnd: null,

    /**
     * Property: snappingLine. It's the feature indicating a certain angle to snap to. It shows up in the rotate process
     * (<OpenLayers.Feature.Vector>)
     */
    snappingLine: null,
    
    /**
     * Property: rotation. The rotation of the capture box
     * {float}
     */	
    rotation: 0.0,
    
    /**
     * Property: rotateHandleLength. Defines the length of the rotate handle 
     * in pixel. default is 30 pixels
     * {int}
     */	
    rotateHandleLength: 30,
    
    /**
     * Property: captureBoxStyle. Style for the capture box
     * {<OpenLayers.Style>}
     */	
    captureBoxStyle: null,
    
    /**
     * Property: rotateHandleStyle. Style for the rotate handle
     * (<OpenLayers.Style>)
     */
    rotateHandleStyle: null,
    
    /**
     * Property: rotateHandlePointStyle. Style for the snap handle's start and end points
     * (<OpenLayers.Style>)
     */
    rotateHandlePointStyle: null,
    
    /**
     * Property: snappingLineStyle. Style for the snapping line
     * (<OpenLayers.Style>)
     */
    snappingLineStyle: null,

    /**
     * Indicates if the capture box is enabled. An enabled capture box will show up on the map
     * {bool}
     */	
    enabled: false,
    
    /**
     * Property: warningMessage. The warning message when the capture box cannot display completely in current zoom level
     * (string)
     */
    warningMessage: OpenLayers.i18n("quickPlotResolutionWarning"),
    
    /**
     * Property: rotateSnappingStep. Defines the rotate snapping angle step. In degrees
     * (int)
     */
    rotateSnappingStep: 45,
    
    /**
     * Property: rotateSnappingTolerance. Defines the rotate snapping tolerance. In degress
     */
    rotateSnappingTolerance: 2,
    
    /**
     * Property: lastPixel. The last position the mouse action was responded
     * {<OpenLayers.Pixel>}
     */
    lastPixel: null,

    /**
     * Constructor: OpenLayers.Control.DragFeature
     * Create a new control to drag features.
     *
     * Parameters:
     * map - The widget map which encapsulates an OpenLayers.Map
     *
     * options - {Object} Optional object whose properties will be set on the control.
     */
    initialize: function(map, options) 
    {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        
        // Initialize the styles
        this.captureBoxStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
        this.captureBoxStyle.fillOpacity    = 0.8;
        this.captureBoxStyle.fillColor      = "#476387";
        this.captureBoxStyle.strokeColor    = "#39506F";
        
        this.rotateHandleStyle              = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
        this.rotateHandleStyle.strokeColor  = "#39506F";
        this.rotateHandlePointStyle             = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
        this.rotateHandlePointStyle.strokeColor = "#39506F";
        this.rotateHandlePointStyle.fillOpacity = 1.0;
        this.rotateHandlePointStyle.fillColor   = "#476387";
        this.rotateHandlePointStyle.pointRadius = 4;
        
        this.snappingLineStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
        this.snappingLineStyle.strokeOpacity   = 0.8;
        this.snappingLineStyle.strokeColor     = "black";
        this.snappingLineStyle.strokeDashstyle = "dot";

        
        // The cursor styles
        this.cursorMove   = "move";
        this.cursorRotate = "url(../../../Widgets/QuickPlot/rotate.cur), default";
        
        // The widget map
        this.wMap = map;
        
        // Create a new layer to show the capture box
        this.layer  = new OpenLayers.Layer.Vector("Map Capturer Layer");
        map.oMapOL.addLayer(this.layer);
        
        // Create the features
        this.captureBox        = new OpenLayers.Feature.Vector(null, null, this.captureBoxStyle);
        this.rotateHandle      = new OpenLayers.Feature.Vector(null, null, this.rotateHandleStyle);
        this.rotateHandleStart = new OpenLayers.Feature.Vector(null, null, this.rotateHandlePointStyle);
        this.rotateHandleEnd   = new OpenLayers.Feature.Vector(null, null, this.rotateHandlePointStyle);
        this.snappingLine      = new OpenLayers.Feature.Vector(null, null, this.snappingLineStyle);
        
        // Add the features into the layer
        this.layer.addFeatures([this.captureBox, this.rotateHandle, this.rotateHandleStart, this.rotateHandleEnd, this.snappingLine]);

        this.handlers = 
        {
            drag: new OpenLayers.Handler.Drag(
                this, OpenLayers.Util.extend({
                    down: this.downFeature,
                    up: this.upFeature,
                    out: this.cancel,
                    done: this.doneDragging
                }, this.dragCallbacks)),
            feature: new OpenLayers.Handler.Feature(
                this, this.layer, OpenLayers.Util.extend({
                    over: this.overFeature,
                    out: this.outFeature
                }, this.featureCallbacks),
                {geometryTypes: this.geometryTypes}
            )
        };

        // List to the mouse move event
        this.handlers.drag.move = this.mouseMove.bind(this);
        
        // Listen to MAP_EXTENTS_CHANGED event to refresh the outer box because the 'delta' is fixed regardless current scale
        var oMap = this.wMap.oMapOL;
        oMap.events.register("zoomend", this, this.drawFeatures.bind(this));
    },
    
    /**
     * APIMethod: destroy
     * Take care of things that are not handled in superclass
     */
    destroy: function() 
    {
        this.layer = null;
        OpenLayers.Control.prototype.destroy.apply(this, []);
    },

    /**
     * APIMethod: activate
     * Activate the control and the feature handler.
     * 
     * Returns:
     * {Boolean} Successfully activated the control and feature handler.
     */
    activate: function() 
    {
        return (this.handlers.feature.activate() &&
                OpenLayers.Control.prototype.activate.apply(this, arguments));
    },

    /**
     * APIMethod: deactivate
     * Deactivate the control and all handlers.
     * 
     * Returns:
     * {Boolean} Successfully deactivated the control.
     */
    deactivate: function() {
        // The return from the handlers is unimportant in this case
        this.handlers.feature.deactivate();
        this.handlers.drag.deactivate();
        this.feature   = null;
        this.dragging  = false;
        this.lastPixel = null;

        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },

    /**
     * Method: overFeature
     * Called when the feature handler detects a mouse-over on a feature.
     *     This enables the drag control if the event target is the outer polygon,
     *		and the rotate control will be activated if the event target is the inner polygon
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The selected feature.
     */
    overFeature: function(feature) 
    {
        // The feature that the cursor stops on
        this.stopFeature = feature;
        
        if(!this.handlers.drag.dragging) 
        {
            this.feature = feature;
            this.handlers.drag.activate();
            this.over = true;
            
            this.setCursor(); 
        } 
        else 
        {
            if(this.captureBox.id == feature.id || this.rotateHandleEnd.id == feature.id) 
            {
                this.over = true;
            } 
            else 
            {
                this.over = false;
            }
        }
    },
    
    /**
     * Method: isDragging
     * Check if it's currently in dragging to move mode
     */
    isDragging: function() 
    {
        if (this.feature && this.captureBox)
        {
            return this.feature.id == this.captureBox.id || this.feature.id == this.rotateHandleStart.id;
        }
        
        return false;
    },
    
    /**
     * Method: isRotating
     * Check if it's currently in rotatiing mode
     */
    isRotating: function() 
    {
        return this.feature && this.rotateHandleEnd && this.feature.id == this.rotateHandleEnd.id;
    },

    /**
     * Method: downFeature
     * Called when the drag handler detects a mouse-down.
     *
     * Parameters:
     * pixel - {<OpenLayers.Pixel>} Location of the mouse event.
     */
    downFeature: function(pixel) 
    {
        this.setCursor();
        this.lastPixel = pixel;
    },
    
    /**
     * Method: setCursor
     * Set the cursor according to current action: moving or rotating
     */
    setCursor: function() 
    {
        if (this.isDragging())
        {
            this.wMap.setCursor(this.cursorMove);
        }
        else if (this.isRotating())
        {
            this.wMap.setCursor(this.cursorRotate);
        }
    },
    /**
     * Method: moveFeature
     * Called when the drag handler detects a mouse-move.  Also calls the
     *     optional onDrag method.
     */
    mouseMove: function(evt) 
    {
        if (this.isDragging()) 
        {
            this.moveFeature(evt);
        }
        else if (this.isRotating()) 
        {
            this.rotateFeature(evt);
        }
    },
    
    /**
     * Method: moveFeature
     *  Move the feature according to the mouse-move
     */
    moveFeature: function(evt) 
    {
        pixel     = evt.xy;
        var res   = this.wMap.getResolution();
        var delta = {x:res * (pixel.x - this.lastPixel.x), y:res * (this.lastPixel.y - pixel.y)};
        
        var features = this.layer.features;
        for (var i = 0; i < features.length; ++i)
        {
            // Don't touch the snapping line
            if (features[i].geometry != null && features[i].id != this.snappingLine.id)
            {
                features[i].geometry.move(delta.x, delta.y);
                this.layer.drawFeature(features[i]);
            }
        }
        
        this.lastPixel = pixel;
    },
    
    /**
     * Method: moveFeature
     * Called when the drag handler detects a mouse-move.  Also calls the
     *     optional onDrag method.
     */
    rotateFeature: function(evt)
    {
        pixel = evt.xy;
        var centroid   = this.captureBox.geometry.getCentroid();
        var origin     = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(centroid.x, centroid.y));
        var angle      = this.calculateAngle(pixel, origin);
        var rotation   = this.rotation + angle;

        if (evt.shiftKey)
        {
            var a = rotation % this.rotateSnappingStep;
            var b = Math.round(rotation / this.rotateSnappingStep);
            var targetRotation = rotation;
            
            if (Math.abs(a) <= this.rotateSnappingTolerance || Math.abs(a)>= this.rotateSnappingStep - this.rotateSnappingTolerance)
            {
                targetRotation = b * this.rotateSnappingStep;
                
                // Draw the snapping guide
                if (this.snappingLine.geometry == null)
                {
                    this.drawSnappingHint(targetRotation);
                }
            }
            else
            {
                this.clearSnappingHint();
            }
            
            angle = targetRotation - this.rotation;
        }
        else
        {
            this.clearSnappingHint();
        }
        
        this.rotation += angle;
        
        var features = this.layer.features;
        for (var i = 0; i < features.length; ++i)
        {
            // Don't touch the snapping line here because the snapping line is controlled only by drawSnappingHint
            if (features[i].geometry != null && features[i].id != this.snappingLine.id)
            {
                features[i].geometry.rotate(angle, centroid);
                this.layer.drawFeature(features[i]);
            }
        }

        this.lastPixel = angle == 0 ? this.lastPixel : pixel;
    },
    
    /**
     * Method: drawSnappingHint
     * Draw the snapping line
     */
    drawSnappingHint: function(angle)
    {
        var viewSize = this.wMap.getCurrentExtents().getSize();
        var length   = Math.sqrt(Math.pow(viewSize.w, 2) + Math.pow(viewSize.h, 2));
        var origin   = this.captureBox.geometry.getCentroid();
        
        var points   = [];
        points.push(new OpenLayers.Geometry.Point(origin.x - length, origin.y));
        points.push(new OpenLayers.Geometry.Point(origin.x + length, origin.y));
        var hint     = new OpenLayers.Geometry.LineString(points);
        
        hint.rotate(angle + 90, origin);
        
        this.snappingLine.geometry = hint;
        this.layer.drawFeature(this.snappingLine);
    },
    
    /**
     * Method: clearSnappingHint
     * Clear the snapping line
     */
    clearSnappingHint: function()
    {
        if (this.snappingLine != null && this.snappingLine.geometry != null)
        {
            this.layer.eraseFeatures([this.snappingLine]);
            this.snappingLine.geometry = null;
        }
    },
    
    /**
     * Method: calculateAngle
     * Calculates the rotate angle, in degree and counterclockwise
     */
    calculateAngle: function(pixel, origin)
    {
        var angle1 = Math.atan2(pixel.y - origin.y, pixel.x - origin.x);
        var angle2 = Math.atan2(this.lastPixel.y - origin.y, this.lastPixel.x - origin.x);
        return (angle2 - angle1) * 180 / Math.PI;
    },

    /**
     * Method: upFeature
     * Called when the drag handler detects a mouse-up.
     * 
     * Parameters:
     * pixel - {<OpenLayers.Pixel>} Location of the mouse event.
     */
    upFeature: function(pixel) 
    {
        if(!this.over) 
        {
            this.handlers.drag.deactivate();
        }
        else
        {
            // Set the last-stop feature to be the active one
            this.feature = this.stopFeature;
            // Set the correct cursor
            this.setCursor();
        }
        
        this.clearSnappingHint();
    },

    /**
     * Method: outFeature
     * Called when the feature handler detects a mouse-out on a feature.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The feature that the mouse left.
     */
    outFeature: function(feature) 
    {
        if(!this.handlers.drag.dragging) 
        {
            this.over = false;
            this.handlers.drag.deactivate();
            this.wMap.setCursor("auto");            
            this.feature = null;
        } 
        else 
        {
            if(this.feature.id == feature.id) 
            {
                this.over = false;
            }
        }
    },
        
    /**
     * Method: cancel
     * Called when the drag handler detects a mouse-out (from the map viewport).
     */
    cancel: function() 
    {
        this.handlers.drag.deactivate();
        this.over = false;
    },

    /**
     * Method: setMap
     * Set the map property for the control and all handlers.
     *
     * Parameters: 
     * map - {<OpenLayers.Map>} The control's map.
     */
    setMap: function(map) 
    {
        this.handlers.drag.setMap(map);
        this.handlers.feature.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

    /**
     * Method: setRegion
     * Set the size of the capture box. Then the box will be redrawn on the map
     *
     * Parameters: 
     * paperSize - {<OpenLayers.Size>} The paper size, in mm
     * scaleDenominator - The denominator of target scale
     */
    setSize: function(paperSize, scaleDenominator) 
    {
        this.paperSize        = paperSize;
        this.scaleDenominator = scaleDenominator;
        this.drawFeatures();
        // Active the handler
        this.activate();
    },
    
    /**
     * Method: drawFeatures
     * Draw the capture box, rotate handle etc. on the map
     */
    drawFeatures: function()
    {
        // The paper size is not set yet, so don't draw the features
        if (!this.paperSize)
        {
            return;
        }
        
        // Clear the previous drawn features
        this.clearFeatures();
                
        this.createCaptureBox();
        this.createRotateHandle();
        
        // Draw the box only when control is enabled and the resolution is valid
        if (this.enabled) 
        {
            if (this.validateResolution())
            {
                this.layer.features.each(function(item){
                    item.layer.drawFeature(item);
                });
                if(this.wMap.message){
                   this.wMap.message.hide();
                }
            }
            else
            {
                this.wMap.message.warn(this.warningMessage);
            }
        }
    },
    
    /**
     * Method: clearFeatures:
     * Clear the capture box, rotate handle etc. from the map
     */
    clearFeatures: function()
    {
        // Clear the previous drawn features
        var features = this.layer.features;
        var toErase  = [];
        var feature  = null;
        
        for (var i = 0; i < features.length; ++i)
        {
            feature = features[i];
            if (feature.geometry != null)
            {
                toErase.push(feature);
            }
        }
        
        this.layer.eraseFeatures(toErase);
    },
    
    /**
     * Method: createCaptureBox
     * Create the capture box feature
     */
    createCaptureBox: function()
    {
        var origin   = null;
        var rotation = 0;
        
        if (this.captureBox.geometry != null)
        {
            origin   = this.captureBox.geometry.getCentroid();
            rotation = this.rotation;
        }
        else
        {
            origin   = this.wMap.getCurrentCenter();
        }
        
        var factor = this.scaleDenominator / (this.wMap.getMetersPerUnit() * 1000 * 2);
        
        //TODO: If legend is enabled, should draw another box on the LHS of the box to indicate the region that would be cropped
        //out by the legend
        
        var pointList = [];
        pointList.push(new OpenLayers.Geometry.Point(origin.x - this.paperSize.w * factor, origin.y - this.paperSize.h * factor));
        pointList.push(new OpenLayers.Geometry.Point(origin.x + this.paperSize.w * factor, origin.y - this.paperSize.h * factor));
        pointList.push(new OpenLayers.Geometry.Point(origin.x + this.paperSize.w * factor, origin.y + this.paperSize.h * factor));
        pointList.push(new OpenLayers.Geometry.Point(origin.x - this.paperSize.w * factor, origin.y + this.paperSize.h * factor));
        pointList.push(pointList[0]);
        
        var box = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(pointList));
        
        if (rotation != 0)
        {
            box.rotate(rotation, box.getCentroid());
        }
        
        this.captureBox.geometry = box;
    },

    /**
     * Method: createRotateHandle
     * Create the rotate handle feature
     */
    createRotateHandle: function()
    {
        var box        = this.captureBox.geometry.clone();
        var startPoint = box.getCentroid();
        
        if (this.rotation != 0)
        {
            box.rotate(-this.rotation, startPoint);
        }
        
        var length = this.rotateHandleLength * this.wMap.getResolution();
        
        var endPoint   = new OpenLayers.Geometry.Point(startPoint.x, startPoint.y + box.getBounds().getHeight() / 2 + length);
        var line       = new OpenLayers.Geometry.LineString([startPoint.clone(), endPoint.clone()]);
        
        if (this.rotation != 0)
        {
            endPoint.rotate(this.rotation, startPoint);
            line.rotate(this.rotation, startPoint);
        }
        
        this.rotateHandle.geometry      = line;
        this.rotateHandleStart.geometry = startPoint;
        this.rotateHandleEnd.geometry   = endPoint;
    },
    
    /**
     * Method: validateResolution
     * Check if the capture box could display completely on current screen view port.
     * If it cannot, then an warning message will show up to warn the user. Then the user could zoom out to get
     * the box back
     * 
     * Returns:
     * (Boolean) True if the box can display completely, otherwise false.
     *
     */
    validateResolution: function() 
    {
        if (this.captureBox)
        {
            var screenSize = this.map.getExtent().getSize();
            var boxSize    = this.captureBox.geometry.getBounds().getSize();
            
            if (boxSize.w < screenSize.w || boxSize.h < screenSize.h)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    
    /**
     * Method: getCaptureBox
     * Get the capture area.
     */
    getCaptureBox: function()
    {
        var geometry;
        // The capture box is not enabled, so just use the current viewport as capture box
        if (!this.enabled)
        {
            geometry = this.wMap.getCurrentExtents().toGeometry(); 
        }
        else
        {
            geometry = this.captureBox.geometry;
        }
        
        var info     = "";
        var vertices = geometry.getVertices();
        var vertex   = null;
        
        for (var i = 0; i < vertices.length; ++i)
        {
            vertex = vertices[i];
            info += vertex.x + "," + vertex.y + ",";
        }
        
        // Remove the last ","
        info = info.substr(0, info.length - 1);
        
        return {geometry:geometry, params:info};
    },
    
    /**
     * Method: getNormalizedCapture
     * Get the normalized capture box
     */
    getNormalizedCapture: function()
    {
        var info   = "";
        var geometry = null;
        if (!this.enabled)
        {
            geometry = this.wMap.getCurrentExtents().toGeometry();
            // Calculate the scale denominator
            
        }
        else
        {
            geometry = this.captureBox.geometry.clone();
            geometry.rotate(-this.rotation, geometry.getCentroid());
        }
        
        var vertices = geometry.getVertices();
        var vertex   = null;
        
        for (var i = 0; i < vertices.length; ++i)
        {
            vertex = vertices[i];
            info += vertex.x + "," + vertex.y + ",";
        }
        
        // Remove the last ","
        info = info.substr(0, info.length - 1);
        
        return {geometry:geometry, params:info};
    },
    
    /**
     * Method: getCaptureRotation
     * Get the capture rotation
     */
    getCaptureRotation: function()
    {
        if (this.enabled)
        {
            return this.rotation;
        }
        else
        {
            return 0.0;
        }
    },
    
    /**
     * Method: enable
     * Enable the capture box to display it on the map
     */
    enable: function()
    {
        // Reset everything first
        this.disable();
        this.enabled = true;
    },
    
    /**
     * Method: disable
     * Disable the capture box. Then the capture box will not show up on the Map,
     * 		and the current view port is treated as the capture area
     */
    disable: function()
    {
        this.enabled  = false;
        if(this.wMap.message){
           this.wMap.message.hide();
        }
        this.clearFeatures();
        this.rotation = 0;
        
        var features = this.layer.features;
        for (var i = 0; i < features.length; ++i)
        {
            features[i].geometry = null;
        }
    },
    
    /**
     * Property: CLASS_NAME. The class name
     */
    CLASS_NAME: "OpenLayers.Control.MapCapturer"
});

