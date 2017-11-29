Fusion.require("lib/SymbolLayer.js");

/********************************************************************
* Class: Fusion.Widget.GoogleStreetViewer
*
* GoogleStreetViewer widget to display google street.
* 
*  Inherits from:
*  - <Fusion.Widget>
* **********************************************************************/

Fusion.Widget.GoogleStreetViewer = OpenLayers.Class(Fusion.Widget, {
    isExclusive: false,
    uiClass: Jx.Button,
    windowFeatures: "menubar=no,location=no,resizable=no,status=no,width=500,height=400",
    targetWindow: null,
    GoogleSVPage: null,
    targetCs: null,
    additionalParameters: null,
    activated: false,
    symbolLayerName: "GoogleStreetViewerSymbolLayer",
    symbolLayer: null,
    symbolStyle: {
        externalGraphic: Fusion.getFusionURL() + "widgets/GoogleStreetViewer/navigator.png",
        graphicHeight: 32,
        graphicWidth: 48,
        graphicOpacity: 1,
        rotation: 0
    },
    symbolRadius: 16,        // Min(graphicHeight/2, graphicWidth/2)
    showDirection: true,
    directionStyle: {
        fillColor: "black",
        fillOpacity: 0.4,
        strokeColor: "black",
        strokeOpacity: 1,
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeDashstyle: "dash",
        hoverStrokeColor: "black",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2
    },
    directionLength: 22,
    csTransformErrorMessage: null,
    serviceUnavailableMessage: null,
    googleBaseMapErrorMessage: null,

    /*
    * Constructor: GoogleStreetViewer
    *
    * Parameters:
    *
    * widgetTag - JSON node for this widget from the Application definition
    *
    */
    initializeWidget: function (widgetTag) {
        Fusion.Widget.GoogleStreetViewer.hasGSV = true;
        this.csTransformErrorMessage = OpenLayers.i18n("googleSteetViewCSTransformError");
        this.serviceUnavailableMessage = OpenLayers.i18n("googleSteetViewNotAvailableError");
        this.googleBaseMapErrorMessage = OpenLayers.i18n("googleBaseMapNotOnError");
        this.targetCs = new OpenLayers.Projection("EPSG:4326");
        var json = widgetTag.extension;
        this.targetWindow = json.Target ? json.Target[0] : "TaskPane";

        if (json.SymbolLayerName != null && json.SymbolLayerName[0].length != 0) {
            this.symbolLayerName = json.SymbolLayerName[0];
        }

        if (json.ShowDirection != null && json.ShowDirection[0] != null) {
            this.showDirection = (json.ShowDirection[0].toLowerCase() === "false") ? false : true;
        }

        if (json.DirectionLength != null && json.DirectionLength[0] != null && json.DirectionLength[0] != "") {
            try {
                var length = parseInt(json.DirectionLength[0]);
                this.directionLength = length;
            } catch (e) {
            }
        }

        this.additionalParameters = [];

        if (json.AdditionalParameter) {
            for (var i = 0; i < json.AdditionalParameter.length; i++) {
                var p = json.AdditionalParameter[i];
                var k = p.Key[0];
                var v = p.Value[0];
                this.additionalParameters.push(k + '=' + encodeURIComponent(v));
            }
        }

        if (!Fusion.Widget.GoogleStreetViewer.prototype.enable)
            this.disable();

        this.getMap().oMapOL.events.register("changebaselayer",this, this.baseMapChanged);
    },
    
    baseMapChanged: function (layer){
        if(!this.isGoogleBaseMapOn()) {
            if(this.activated){
                this.deactivate();
                alert(this.googleBaseMapErrorMessage);
            }
        }
    },
    
    isGoogleBaseMapOn: function(){
        var maps = this.getMap().aMaps;

        for(var i=0; i < maps.length; i++){
            if(maps[i].oLayerOL === this.getMap().oMapOL.baseLayer){
                if(maps[i].layerType === "Google"){  
                    return true;   
                }  
            }     
        }

        return false;
    },

    activate: function() {
        if(!this.isGoogleBaseMapOn()) {
            if (this.activated) {
                this.deactivate();
            }
            alert(this.googleBaseMapErrorMessage);
            return;
        }

        if (this.activated) return;

        //it seems this does nothing
        this.setGoogleSVPage(null);

        if (!this.symbolLayer) {
            this.symbolLayer = Fusion.SymbolLayer.CreateOrGet(this.symbolLayerName, {
                map: this.getMap().oMapOL,
                symbolStyle: this.symbolStyle,
                symbolRadius: this.symbolRadius,
                showDirection: this.showDirection,
                directionStyle: this.directionStyle,
                directionLength: this.directionLength
            });
        }

        this.symbolLayer.registerListener(this);
        this.symbolLayer.activateDragControl();
        this.activated = true;
        var url = Fusion.getFusionURL() + 'widgets/GoogleStreetViewer/GoogleStreetView.php';
        var aimTarget = Fusion.getWidgetById(this.targetWindow);
        var pageElement = $(this.targetWindow);

        var params = [];
        params.push('ts=' + new Date().getTime());
        params.push('locale=' + Fusion.locale);

        if (aimTarget || pageElement) {
            params.push("popup=false");
        }
        else {
            params.push("popup=true");
        }

        params = params.concat(this.additionalParameters);

        if (url.indexOf('?') < 0) {
            url += '?';
        }
        else if (url.slice(-1) != '&') {
            url += '&';
        }

        url += params.join('&');

        if (aimTarget) {
            aimTarget.setContent(url);
        }
        else if (pageElement) {
            pageElement.src = url;
        }
        else {
            window.open(url, this.targetWindow, this.windowFeatures);
        }
    },

    deactivate: function () {
        if (!this.activated) return;

        this.activated = false;

        if(this.symbolLayer != null) {
            this.symbolLayer.deregisterListener(this);
        }

        this.hideMessage(this.csTransformErrorMessage);
        this.hideMessage(this.serviceUnavailableMessage);
        this.hideMessage(this.googleBaseMapErrorMessage);

        if(this.GoogleSVPage != null) {
            this.GoogleSVPage.deregisterViewChangeListener(this);
            this.GoogleSVPage.hidePage();
        }
    },

    onSymbolChanged: function (position) {
        if (!this.GoogleSVPage || !this.symbolLayer || !position) {
            return;
        }

        var lonlat = new OpenLayers.LonLat(position.x, position.y);
        var targetLonLat = new OpenLayers.LonLat(position.targetX, position.targetY);
        var mapProj = this.getMap().projection;

        //Goolge Street View always use the CS EPSG:4326,
        //The Symbol layer always use the same CS as the map
        //must consider if the transform is not correct
        try {
            lonlat.transform(mapProj, this.targetCs);
            targetLonLat.transform(mapProj, this.targetCs);

            this.hideMessage(this.csTransformErrorMessage);

            // Transform Z
            var unitsPerMeter = this.getUnitsPerMeter(this.targetCs);
            var unitsPerMeterInMap = this.getUnitsPerMeter(mapProj);

            this.GoogleSVPage.setView(lonlat.lon, lonlat.lat, position.z * unitsPerMeter / unitsPerMeterInMap,
            targetLonLat.lon, targetLonLat.lat, position.targetZ * unitsPerMeter / unitsPerMeterInMap);

        } catch (e) {
            this.showMessage(this.csTransformErrorMessage);
        }
    },

    getUnitsPerMeter: function (cs) {
        if (cs.proj == null) return 1;
        // This is because Proj4js has a defect about unit. 
        // If CS doesn't include a unit and it has an angular unit, the angular unit will be set to CS unit.
        var unitIndex = cs.proj.unitIndex;
        if (unitIndex == null) {
            var unit = cs.proj.units;
            if (!unit) return 1;    // No units
            unitIndex = Fusion.unitFromName(unit);
            cs.proj.unitIndex = unitIndex;
        }
        return Fusion.fromMeter(unitIndex, 1);
    },

    onStreetViewChange: function (position) {
        if (!this.activated || !this.GoogleSVPage || !position) {
            return;
        }

        var x = position.x;
        var y = position.y;
        var z = position.z;

        var targetX = position.targetX;
        var targetY = position.targetY;
        var targetZ = position.targetZ;

        var source = new OpenLayers.LonLat(x, y);
        var target = new OpenLayers.LonLat(targetX, targetY);
        var mapProj = this.getMap().projection;

        //Goolge Street View always use the CS EPSG:4326,
        //The Symbol layer always use the same CS as the map
        //must consider if the transform is not correct
        try {
            source.transform(this.targetCs, mapProj);
            target.transform(this.targetCs, mapProj);

            this.hideMessage(this.csTransformErrorMessage);

            x = source.lon;
            y = source.lat;
            targetX = target.lon;
            targetY = target.lat;
            // Transform Z
            var unitsPerMeter = this.getUnitsPerMeter(this.targetCs);
            var unitsPerMeterInMap = this.getUnitsPerMeter(mapProj);
            z = z * unitsPerMeterInMap / unitsPerMeter;
            targetZ = targetZ * unitsPerMeterInMap / unitsPerMeter;

            if (!this.getMap().getCurrentExtents().contains(x, y)) {
                this.getMap().zoom(x, y, 1);
            }

            this.symbolLayer.updateSymbolPosition(x, y, z, targetX, targetY, targetZ, this);

        } catch (e) {
            this.showMessage(this.csTransformErrorMessage);
        }
    },

    setGoogleSVPage: function (GoogleSVWindow) {
        if (this.GoogleSVPage != null) {
            this.GoogleSVPage.deregisterViewChangeListener(this);
        }

        this.GoogleSVPage = GoogleSVWindow;

        if (GoogleSVWindow != null) {

            this.GoogleSVPage.registerViewChangeListener(this);

            if (this.GoogleSVPage.camera) {
                this.onStreetViewChange(this.GoogleSVPage.camera);
            }
            else if (!this.symbolLayer && !this.symbolLayer.position) {
                this.onSymbolChanged(this.symbolLayer.position);
            }
            else {
                var currentCenter = this.getMap().getCurrentCenter();
                var viewCenter = this.getMap().geoToPix(currentCenter.x, currentCenter.y);
                var aboveCenter = this.getMap().pixToGeo(viewCenter.x, viewCenter.y - 10);
                //this only happens in the pageload phase of the GoogleSVPage
                //and should initialize both the Street View location and the Symbol Layer location
                this.symbolLayer.updateSymbolPosition(currentCenter.x, currentCenter.y, 0, aboveCenter.x, aboveCenter.y, 0, null);
            }
        }
        else if (this.activated) {
            var instances = Fusion.Widget.uiInstances[this.type];
            for (var i = 0; i < instances.length; i++) {
                var instance = instances[i];
                if (instance.shouldActivateWith(this)) {
                    instance.deactivate();
                }
            }
            this.deactivate();
        }
    },
    showMessage: function (message) {
        this.getMap().message.warn(message);
    },
    hideMessage: function (message) {
        if (this.getMap().message) {
            this.getMap().message.hideDesignatedMessage(message);
        }
    }
});

if (typeof(Proj4js) != 'undefined') {
    Proj4js.reportError = function (msg) {
        if(Fusion.Widget.GoogleStreetViewer.hasGSV) throw msg;
        //console.log(msg);
    };
}

