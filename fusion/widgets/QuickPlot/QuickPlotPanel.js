/**
 * Copyright (C) 2010 Autodesk, Inc. All rights reserved.
 */

function panelUnloaded()
{
    var mapCapturer = getParent().Fusion.getWidgetsByType("QuickPlot")[0].mapCapturer;
    mapCapturer.disable();
}

function panelLoaded()
{
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    
    //set the legal notice from the quick plot widget info
    var disclaimer = widget.disclaimer;
    document.getElementById("legalNotice").value = disclaimer;
    
    //If there's no disclaimer, then this checkbox is useless, so hide it if that's the case
    if (!disclaimer || disclaimer == "" || !widget.allowDisclaimerToggle)
        document.getElementById("DisclaimerCtrl").style.display = "none";
    
    //Apply initial UI state    
    document.getElementById("ShowLegendCheckBox").checked = widget.showLegend;
    document.getElementById("ShowNorthArrowCheckBox").checked = widget.showNorthArrow;
    document.getElementById("ShowCoordinatesCheckBox").checked = widget.showCoordinates;
    document.getElementById("ShowScaleBarCheckBox").checked = widget.showScaleBar;
    document.getElementById("ShowDisclaimerCheckBox").checked = widget.showLegalDisclaimer;
    
    //set the paper list from the quick plot widget info
    if (widget.paperList.length > 0)
    {
        var paperList = document.getElementById("PaperList");
        paperList.options.length = 0;
        
        var i;
        for (i = 0; i < widget.paperList.length; i++) {
            var elOpt = document.createElement("option");
            var name = getParent().Fusion.trim(widget.paperList[i].name);
            
            //users may set the page size as 279.4,215.9 which make the height before width
            //we should always set width before height
            //and also make sure the paper size name is right, otherwise will result in error
            var sizeArray = widget.paperList[i].size.split(",");
            var width = parseFloat(sizeArray[0]);
            var height = parseFloat(sizeArray[1]);
            
            var paperSizeFormatString = (width < height)? (width + "," + height + "," + name) : (height + "," + width + "," + name);
            
            elOpt.text = name;
            elOpt.value = paperSizeFormatString;
            try {
                paperList.add(elOpt, null);
            }catch (ex) {
                paperList.add(elOpt); //IE
            }
        }
    }
    
    //set the scale list from the quick plot widget info
    if (widget.scaleList.length > 0)
    {
        var scaleList = document.getElementById("ScalingList");
        scaleList.options.length = 0;
        
        for (i = 0; i < widget.scaleList.length; i++) {
            var scaleOpt = document.createElement("option");
            scaleOpt.text = widget.scaleList[i].name;
            scaleOpt.value = widget.scaleList[i].scale;
            try {
                scaleList.add(scaleOpt, null);
            }catch (ex) {
                scaleList.add(scaleOpt); //IE
            }
        }
    }
    
    //set the margin from the quick plot widget info
    if(!!widget.margin)
    {
        var margin = widget.margin;
        document.getElementById("margin").value = margin.top + "," + margin.buttom + "," +margin.left + "," + margin.right ; 
    }

    restoreUI();
}

function restoreUI()
{
    setAdvancedOptionsUI(false);
    
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    if (widget.persistPlotOptions)
    {
        // Read the last used options
        var lastPaperSize   = getParent().Cookie.read("QuickPlotLastUsedPaperSize");
        var lastScale       = getParent().Cookie.read("QuickPlotLastUsedScaling");
        var lastDPI         = getParent().Cookie.read("QuickPlotLastUsedDPI");
        var lastOrientation = getParent().Cookie.read("QuickPlotLastUsedOrientation");

        if (lastPaperSize != null){
            document.getElementById("PaperList").value = lastPaperSize;
        }
        
        if (lastScale != null){
            document.getElementById("ScalingList").value = lastScale;
        }
        
        if (lastDPI != null){
            document.getElementById("DPIList").value = lastDPI;
        }
        
        if (lastOrientation != null){
            document.getElementById("OrientationList").value = lastOrientation;
        }
    }
    
    if (widget.defaultDpi){
        document.getElementById("DPICtrl").style.display = "none";
        document.getElementById("DPILabel").style.display = "none";
    }else{
        document.getElementById("DPICtrl").style.display = "block";
        document.getElementById("DPILabel").style.display = "block";
    }
    
    if (widget.showSubTitle){
        document.getElementById("SubTitleCtrl").style.display = "block";
        document.getElementById("SubTitleLabel").style.display = "block";
    }else{
        document.getElementById("SubTitleCtrl").style.display = "none";
        document.getElementById("SubTitleLabel").style.display = "none";
    }
}

function setAdvancedOptionsUI(enabled)
{
    document.getElementById("ScalingList").disabled     = !enabled;
    document.getElementById("DPIList").disabled         = !enabled;
    
    var mapCapturer = getParent().Fusion.getWidgetsByType("QuickPlot")[0].mapCapturer;
    
    if (enabled){
        mapCapturer.enable();
        drawCaptureBox();
    }else{
        mapCapturer.disable();
    }
}

function generatePlot()
{
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    if(!!widget){
        var map = widget.getMapLayer();
        var mapCapturer = widget.mapCapturer; 
    }
  
    //params
    if(map){
        var sessionID = map.getSessionID();
        var mapName = map.getMapName();
    }
    
    if(mapCapturer){
        var capture = mapCapturer.getCaptureBox();
        if(capture){
            var box = capture.params;
        }
        
        var rotation = mapCapturer.rotation;
        var normalizedCapture = mapCapturer.getNormalizedCapture();

        if(!!normalizedCapture){
            var normalized_box = normalizedCapture.params;//normalized_box            
        }
    }
    //get params and assign the value of hidden input
    var printSize = getPrintSize();
    getPrintDpi();
    getScale();
    getPaperType();
    getOrientation();

    document.getElementById("sessionId").value = sessionID;
    document.getElementById("mapName").value = mapName;
    document.getElementById("normalizedBox").value = normalized_box;
    document.getElementById("printSize").value = printSize.w + "," + printSize.h;
    document.getElementById("rotation").value = rotation;
    document.getElementById("box").value = box;
    					     
    if (widget.persistPlotOptions) {
        // Save the advanced options to a cookie
        var cookieDuration = 365;
        getParent().Cookie.write("QuickPlotLastUsedPaperSize", document.getElementById("PaperList").value, {duration:cookieDuration});
        getParent().Cookie.write("QuickPlotLastUsedScaling", document.getElementById("ScalingList").value, {duration:cookieDuration});
        getParent().Cookie.write("QuickPlotLastUsedDPI", document.getElementById("DPIList").value, {duration:cookieDuration});
        getParent().Cookie.write("QuickPlotLastUsedOrientation", document.getElementById("OrientationList").value, {duration:cookieDuration});
    }
    
    //update param
    var form = document.getElementById("Form1");
    form.target = "_blank";//windowName;
    
    //use a random print id to avoid the browser cache problem
    var vNum = Math.random() * 1000;
    var randomId = "printId=" + vNum;
    
    var actiontarget;
    if ( form.action.indexOf("?") != -1)//form.action include "?"
    {
        actiontarget = form.action.slice(0,form.action.indexOf("?"));
    }
    else
    {
        actiontarget = form.action;
    }
    form.action = actiontarget + "?" + randomId;
    form.submit();
}

function advancedOptionsOn()
{
    var o = document.getElementById("AdvancedOptionsCheckBox");
    if (o && o.checked){
        return true;
    }
    return false;
}

function getMargin()
{
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    var margin;
    
    if(!!widget.margin){
         margin = widget.margin;
    }else{
        //the default margin
        margin = {top: 25.4, buttom: 12.7, left: 12.7, right: 12.7};
    }
    return margin;
}

function getOrientation()
{
    document.getElementById("orientation").value = document.getElementById("OrientationList").value;   
    return document.getElementById("OrientationList").value;   
}

function getPaperType()
{
    var value = document.getElementById("PaperList").value.split(",");
    return value[2];
}

function getPrintSize()
{
    var value = document.getElementById("PaperList").value.split(",");
    var size;
    var orientation = getOrientation();
    if (orientation  === "P" ){
        size = {w: parseFloat(value[0]), h: parseFloat(value[1])};
    }else if (orientation === "L"){
        size = {w: parseFloat(value[1]), h: parseFloat(value[0])};
    }
    
    if (!advancedOptionsOn())
    {
        // Calculate the paper size to make sure it has a same ratio with the viweport
        var map        = getParent().Fusion.getWidgetById("Map");
        var paperRatio = size.w / size.h;
        var viewSize   = map.getSize();
        var vs;
        if (orientation === "P") {
            vs = {
                w: viewSize.h,
                h: viewSize.w
            };
        }
        if (orientation === "L") {
            vs = {
                w: viewSize.w,
                h: viewSize.h
            };
        }
        var viewRatio  = vs.w / vs.h;

        if (paperRatio > viewRatio){
            size.w     = size.h * viewRatio;
        }else{
            size.h     = size.w / viewRatio;
        } 
    }
    
    var margins = getMargin();
    size.h = size.h - margins.top - margins.buttom;
    size.w = size.w - margins.left - margins.right;
    
    document.getElementById("paperSize").value = document.getElementById("PaperList").value;
    return size;
}

function getScale()
{
    var scale = 0;
    if (advancedOptionsOn()){
        scale = document.getElementById("ScalingList").value;
    }else{
        var map = getParent().Fusion.getWidgetById("Map");
        scale = map.getScale();
    }

    scale = parseInt(scale);
    // Set the value to a hidden field so that it could be sent by POST method
    // We cannot rely on the ScalingList.value because we have to handle also the viewport print 
    document.getElementById("scaleDenominator").value = scale;
    
    return scale;
}

function getPrintDpi()
{
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    if (widget.defaultDpi){
        document.getElementById("dpi").value = widget.defaultDpi;
        return widget.defaultDpi;
    }else{
        document.getElementById("dpi").value = document.getElementById("DPIList").value;
        return document.getElementById("DPIList").value;
    }
}

function drawCaptureBox()
{
    var mapCapturer = getParent().Fusion.getWidgetsByType("QuickPlot")[0].mapCapturer;
    mapCapturer.setSize( getPrintSize() , getScale() );
}
