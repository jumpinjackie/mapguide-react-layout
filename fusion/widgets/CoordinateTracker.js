/*********************************************************************
 * Class: Fusion.Widget.CoordinateTracker
 *
 * The CoordinateTracker widget allows the user to view mouse coordinates
 * in various projections. The projections must be in EPSG format
 *
 * Inherits from:
 *  - <Fusion.Widget>
 ***********************************************************************/
 
Fusion.Widget.CoordinateTracker = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,
    
    template: "x: {x}<br/> y: {y}",
    taskPane: null,
    olMapProj: null,
    projections: {},
    sWinFeatures: "menubar=no,location=no,resizable=no,status=no,width=250,height=300",

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        /*
        <Projection>EPSG:4326</Projection>
        <Projection>EPSG:900913</Projection>
        */
        if (json.Projection) {
            for (var i = 0; i < json.Projection.length; i++) {
                var code = json.Projection[i];
                this.projections[code] = new OpenLayers.Projection(code);
            }
        }
        
        this.sTarget = json.Target ? json.Target[0] : "";
        if (this.sTarget)
            this.taskPane = new Fusion.Widget.CoordinateTracker.DefaultTaskPane(this);
    },
    getDomId: function(epsgCode) {
        return epsgCode.replace(":", "_");
    },
    activate: function() {
        if (this.taskPane) {
            this.taskPane.loadDisplayPanel();
        }
    },
    deactivate: function() {
        this.stopListening();
    },
    startListening: function() {
        this.olMapProj = this.getMap().oMapOL.getProjectionObject();
        this.getMap().oMapOL.events.register("mousemove", this.taskPane, this.taskPane.updateCoordinates);
        //console.log("start listening");
    },
    stopListening: function() {
        if (this.olMapProj) {
            this.olMapProj = null;
            this.getMap().oMapOL.events.unregister("mousemove", this.taskPane, this.taskPane.updateCoordinates);
            //console.log("stop listening");
        }
    }
});

Fusion.Widget.CoordinateTracker.DefaultTaskPane = OpenLayers.Class({
    widget: null,
    taskPaneWin: null,
    panelUrl: "widgets/CoordinateTracker/CoordinateTracker.php",
    map: null,
    
    initialize: function(widget) {
        this.widget = widget;
        this.map = this.widget.getMap().oMapOL;
    },
    
    loadDisplayPanel: function() {
        var url = Fusion.getFusionURL() + this.panelUrl;
        var params = [];
        params.push("LOCALE=" + Fusion.locale);
        
        if (url.indexOf("?") < 0) {
            url += "?";
        } else if (url.slice(-1) != "&") {
            url += "&";
        }
        url += params.join("&");
        var taskPaneTarget = Fusion.getWidgetById(this.widget.sTarget);
        var outputWin = window;
        if (taskPaneTarget) {
            taskPaneTarget.setContent(url);
            outputWin = taskPaneTarget.iframe.contentWindow;
        } else {
            outputWin = window.open(url, this.widget.sTarget, this.widget.sWinFeatures);
        }
        
        this.taskPaneWin = outputWin;
        var initFunction = OpenLayers.Function.bind(this.initPanel, this);
        setTimeout(initFunction, 300);
    },
    
    updateCoordinates: function(evt) {
        lonLat = this.map.getLonLatFromPixel(evt.xy);
        if (!lonLat)
            return;
        if (!this.widget.olMapProj)
            return;
        
        for (var code in this.widget.projections) {
            var txLonLat = lonLat.clone();
            txLonLat.transform(this.widget.olMapProj, 
                               this.widget.projections[code]); 
            
            var el = this.taskPaneWin.document.getElementById(this.widget.getDomId(code));
            if (el) {
                var template = this.widget.template.replace("{x}", txLonLat.lon)
                                                   .replace("{y}", txLonLat.lat);
                el.innerHTML = template;
            }
        }
    },
    
    initPanel: function() {
        var bReady = false;
        try {
            bReady = this.taskPaneWin.bReady;
        } catch (e) {
            if (!bReady) {
                var initFunction = OpenLayers.Function.bind(this.initPanel, this);
                setTimeout(initFunction, 300);
                return;
            }
        }
        
        this.taskPaneWin.setWidget(this.widget);
    }
});
