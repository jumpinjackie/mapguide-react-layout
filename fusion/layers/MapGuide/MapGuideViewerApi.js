/**
 * Fusion API AjaxViewer API layer
 *
 * $Id: MapGuideViewerApi.js 2788 2013-09-19 06:01:58Z jng $
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
* This is a simple API layer to mimick the MapGuide ajaxviewer API
*/
var mgApiMapWidgetId = 'Map';
var MainFusionWindow = GetFusionWindow();
var OpenLayers = MainFusionWindow.OpenLayers;
var Fusion = MainFusionWindow.Fusion;
var Class = MainFusionWindow.Class;
var Object = MainFusionWindow.Object;

//Polygon circle approximation borrowed from the AJAX viewer
var simulateCirclePoints = [];
var simulateCircleHalfPointNumber = 40;
(function () {
    for (var index = 0; index < 2 * simulateCircleHalfPointNumber + 1; index++) {
        simulateCirclePoints[2 * index] = Math.cos(Math.PI * index / simulateCircleHalfPointNumber);
        simulateCirclePoints[2 * index + 1] = Math.sin(Math.PI * index / simulateCircleHalfPointNumber);
    }
})();

function Refresh() {
    //var Fusion = window.top.Fusion;
    var mapWidget = GetFusionMapWidget();
    if (mapWidget && mapWidget.isMapLoaded()) {
        mapWidget.redraw();
    }
}

function SetSelectionXML(selectionXml, bDoNotZoom) {
    //var Fusion = window.top.Fusion;
    var mapWidget = GetFusionMapWidget();
    if (mapWidget && mapWidget.isMapLoaded()) {
        mapWidget.setSelection(selectionXml, !(bDoNotZoom || false));
    }
}

function ZoomToView(x, y, scale, refresh) {
    //var Fusion = window.top.Fusion;
    var mapWidget = GetFusionMapWidget();
    if (mapWidget && mapWidget.isMapLoaded()) {
        var extent = mapWidget.getExtentFromPoint(x, y, scale);
        mapWidget.setExtents(extent);
    }
}

function DigitizePoint(handler) {
    GetFusionMapWidget().digitizePoint({}, function(olGeom) { 
        mgApiCallHandler(olGeom, 'point', handler); 
    });
}

function DigitizeLine(handler) {
    GetFusionMapWidget().digitizeLine({}, function(olGeom) { 
        mgApiCallHandler(olGeom, 'line', handler); 
    });
}

function DigitizeLineString(handler) {
    GetFusionMapWidget().digitizeLineString({}, function(olGeom) { 
        mgApiCallHandler(olGeom, 'linestr', handler); 
    });
}

function DigitizeRectangle(handler) {
    GetFusionMapWidget().digitizeRectangle({}, function(olGeom) { 
        mgApiCallHandler(olGeom, 'rect', handler); 
    });
}

function DigitizePolygon(handler) {
    GetFusionMapWidget().digitizePolygon({}, function(olGeom) { 
        mgApiCallHandler(olGeom, 'polygon', handler); 
    });
}

function DigitizeCircle(handler) {
    GetFusionMapWidget().digitizeCircle({}, function(circle) {
        mgApiCallHandler(circle, 'circle', handler);
    });
}

function ClearDigitization(bCancelHandler) {
    GetFusionMapWidget().cancelDigitization();
}

//Theses are the Geometry classes used in the MapGuide Viewer API
function Point(x, y) {
    this.X = x;
    this.Y = y;
}

function LineString()
{
    this.points = new Array();
    this.Count = 0;

    this.AddPoint = function(pt)
    {
        this.points.push(pt);
        this.Count ++;
    }

    this.Point = function(i)
    {
        if(i < 0 || i >= this.points.length)
            return null;
        return this.points[i];
    }
}

function Circle()
{
    this.Center = null;
    this.Radius = 0;

    this.SetRadius = function(pt)
    {
        dx = pt.X - this.Center.X;
        dy = pt.Y - this.Center.Y;
        this.Radius = Math.sqrt(dx*dx + dy*dy);
    }
}

function Rectangle(p1, p2)
{
    this.Point1 = p1;
    this.Point2 = p2;
}

function Polygon()
{
    this.LineStringInfo = LineString;
    this.LineStringInfo();
}

//---------------------- Private API ------------------------ //

//This function converts the digitized OL geometry into the AJAX viewer geometry model
function mgApiCallHandler(geom, geomType, handler) {
    var apiGeom = null;
    if (geomType == 'rect') {
        var v = geom.getVertices();
        apiGeom = new Rectangle(new Point(v[0].x, v[0].y), new Point(v[2].x, v[2].y));
    } else if (geomType == 'circle') {
        apiGeom = new Circle();
        apiGeom.Center = new Point(geom.x, geom.y);
        apiGeom.Radius = geom.r;
    } else {
        switch (geom.CLASS_NAME) {
            case 'OpenLayers.Geometry.Point':
                apiGeom = new Point(geom.x, geom.y);
                break;
            case 'OpenLayers.Geometry.LineString':
                apiGeom = new LineString();
                var v = geom.getVertices();
                for (var i=0; i<v.length; ++i) {
                    apiGeom.AddPoint(new Point(v[i].x, v[i].y));
                }
                break;
            case 'OpenLayers.Geometry.Polygon':
                apiGeom = new LineString();
                var v = geom.getVertices();
                for (var i=0; i<v.length; ++i) {
                    apiGeom.AddPoint(new Point(v[i].x, v[i].y));
                }
                break;
        }      
    }
    handler(apiGeom);
    return false;
}

/* locate the Fusion window */
function GetFusionWindow() {
    var curWindow = window;
    while (!curWindow.Fusion) {
        if (curWindow.parent && curWindow != curWindow.parent) {
            curWindow = curWindow.parent;
        } else if(curWindow.opener) {
            curWindow = curWindow.opener;
        } else {
            alert('Could not find Fusion instance');
            break;
        }
    }
    return curWindow;
}

function GetFusionMapWidget() {
    return Fusion.getWidgetById(mgApiMapWidgetId);
}
