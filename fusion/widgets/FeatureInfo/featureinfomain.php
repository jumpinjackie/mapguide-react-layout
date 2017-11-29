<?php

//
//  Copyright (C) 2004-2006  Autodesk, Inc.
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of version 2.1 of the GNU Lesser
//  General Public License as published by the Free Software Foundation.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//

    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }
    SetLocalizedFilesPath(GetLocalizationPath());
    if(isset($_REQUEST['LOCALE'])) {
        $locale = $_REQUEST['LOCALE'];
    } else {
        $locale = GetDefaultLocale();
    }
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . '/JSON.php';
    require_once 'classes/featureinfo.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    $errorMsg = null;
    $errorDetail = null;

    $titleLocal = GetLocalizedString('FEATUREINFOTITLE', $locale );
    $subtitleLocal = GetLocalizedString('FEATUREINFOSUBTITLE', $locale );
    $layerLocal = GetLocalizedString('FEATUREINFOLAYER', $locale );
    $selectFeatureLocal = GetLocalizedString('FEATUREINFOSELECTFEATURE', $locale );
    $digitizeLocal = GetLocalizedString('FEATUREINFODIGITIZE', $locale );
    $pointLocal = GetLocalizedString('FEATUREINFOPOINT', $locale );
    $rectangleLocal = GetLocalizedString('FEATUREINFORECTANGLE', $locale );
    $polygonLocal = GetLocalizedString('FEATUREINFOPOLYGON', $locale );
    $totalLocal = GetLocalizedString('FEATUREINFOTOTAL', $locale );
    $noSelectedLocal = GetLocalizedString('FEATUREINFONOSELECTED', $locale );
    $errorLocal = GetLocalizedString('FEATUREINFOERROR', $locale );
    $fetchInfoLocal = GetLocalizedString('FEATUREINFOFETCHINFO', $locale );
    $featureSelLocal = GetLocalizedString('FEATUREINFOFEATURESEL', $locale );
    $areaLocal = GetLocalizedString('FEATUREINFOAREA', $locale );
    $areaUndefinedLocal = GetLocalizedString('FEATUREINFOAREAUNDEFINE', $locale );
    $noLayerInfoLocal = GetLocalizedString('FEATUREINFONOINFO', $locale );
    $noFeatureInLocal = GetLocalizedString('FEATUREINFONOFEATUREIN', $locale );
    $featureInfoExtraHelpLocal = GetLocalizedString('FEATUREINFOEXTRAHELP', $locale );

    $drawPointLocal = GetLocalizedString("REDLINEEDITPOINTHELP", $locale );
    $drawRectLocal = GetLocalizedString("REDLINEEDITRECTANGLEHELP", $locale );
    $drawPolyLocal = GetLocalizedString("REDLINEEDITPOLYGONHELP", $locale );
    
    $refreshLocal = GetLocalizedString("FEATUREINFOREFRESH", $locale);
    try
    {
        $featureInfo = new FeatureInfo($args);

        $layerNames = $featureInfo->GetMapLayerNames();
    }
    catch (MgException $mge)
    {
        $errorMsg = $mge->GetExceptionMessage();
        $errorDetail = $mge->GetDetails();
    }
    catch (Exception $e)
    {
        $errorMsg = $e->GetMessage();
    }
?>
<html>
<head>
    <title><?php echo $titleLocal ?></title>
    <link rel="stylesheet" href="../../common/mgsamples.css" type="text/css">
    <script language="javascript" src="../../common/browserdetect.js"></script>
    <script language="javascript" src="../../common/json.js"></script>
    <script language="javascript" src="../../layers/MapGuide/MapGuideViewerApi.js"></script>

    <script language="javascript">

        var READY_STATE_UNINITIALIZED   = 0;
        var READY_STATE_LOADING         = 1;
        var READY_STATE_LOADED          = 2;
        var READY_STATE_INTERACTIVE     = 3;
        var READY_STATE_COMPLETE        = 4;

        var NOT_BUSY_IMAGE = "../../common/images/loader_inactive.gif";
        var BUSY_IMAGE = "../../common/images/loader_pulse.gif";

        var session = '<?= $args['SESSION'] ?>';
        var mapName = '<?= $args['MAPNAME'] ?>';

        var DRAW_POINT_HELP = '<?= $drawPointLocal ?>';
        var DRAW_RECT_HELP = '<?= $drawRectLocal ?>';
        var DRAW_POLY_HELP = '<?= $drawPolyLocal ?>';

        var properties = null;
        var results;

        var reqHandler;

        function OnLayerChange() {
            var map = GetFusionMapWidget();
            map.clearSelection();
            var layerSelect = document.getElementById('layerSelect');
            var layer = map.layerRoot.findLayerByAttribute('layerName', layerSelect.value);
            map.setActiveLayer(layer);
        }

        function ActiveLayerChange(evt, layer) {
            var layerSelect = document.getElementById('layerSelect');
            for (var i=0; i<layerSelect.options.length; i++) {
                if (layerSelect.options[i].value == layer.layerName) {
                    layerSelect.options[i].selected = true;
                }
            }
            var map = GetFusionMapWidget();
            map.clearSelection();
        }

        function SetMessage(msg) {
            var map = GetFusionMapWidget();
            if (msg == DRAW_POINT_HELP || msg == DRAW_RECT_HELP || DRAW_POLY_HELP) {
                map.message.info(msg + " <a id='measureMsgDismiss' href='javascript:void(0)'>" + OpenLayers.i18n("stop") + "</a>");
                var link = map.message.container.ownerDocument.getElementById("measureMsgDismiss");
                //Wire the anchor click
                link.onclick = function() {
                    ClearMessage();
                    ClearDigitization(true);
                };
            } else {
                map.message.info(msg);
            }
        }

        function ClearMessage() {
            var map = GetFusionMapWidget();
            map.message.clear();
        }

        function OnDigitizePoint() {
            SetMessage(DRAW_POINT_HELP);
            DigitizePoint(OnPointDigitized);
        }

        function OnPointDigitized(point) {
            ClearMessage();
            var tolerance = GetFusionMapWidget().pixToGeoMeasure(3);
            var min = {x:point.X-tolerance,y:point.Y-tolerance};
            var max = {x:point.X+tolerance,y:point.Y+tolerance};
            var geom = 'POLYGON(('+ min.x + ' ' +  min.y + ', ' +  max.x + ' ' +  min.y + ', ' + max.x + ' ' +  max.y + ', ' + min.x + ' ' +  max.y + ', ' + min.x + ' ' +  min.y + '))';

            SetSpatialFilter(geom);
        }
        function OnDigitizeRectangle() {
            SetMessage(DRAW_RECT_HELP);
            DigitizeRectangle(OnRectangleDigitized);
        }

        function OnRectangleDigitized(rectangle) {
            ClearMessage();
            var min = rectangle.Point1;
            var max = rectangle.Point2;
            var geom = 'POLYGON(('+ min.X + ' ' +  min.Y + ', ' +  max.X + ' ' +  min.Y + ', ' + max.X + ' ' +  max.Y + ', ' + min.X + ' ' +  max.Y + ', ' + min.X + ' ' +  min.Y + '))';

            SetSpatialFilter(geom);
        }

        function OnDigitizePolygon() {
            SetMessage(DRAW_POLY_HELP);
            DigitizePolygon(OnPolyonDigitized);
        }

        function OnPolyonDigitized(polygon) {
            ClearMessage();
            var points = [];
            for (var i = 0; i < polygon.Count; i++) {
                points.push(polygon.Point(i).X+' '+polygon.Point(i).Y);
            }
            
            // Close the polygon if it isn't already closed
            if(polygon.Point(0).X != polygon.Point(polygon.Count - 1).X ||
               polygon.Point(0).Y != polygon.Point(polygon.Count - 1).Y) {
                points.push(polygon.Point(0).X+' '+polygon.Point(0).Y);
            }
            
            var geomText = 'POLYGON(('+points.join(',')+'))';
            
            SetSpatialFilter(geomText);
        }

        function SetSpatialFilter(geomText) {
            ClearDigitization();
            var options = {};
            options.selectionType = 'INTERSECTS';
            options.maxFeatures = 0;
            options.geometry = geomText;
            var layerSelect = document.getElementById("layerSelect");
            options.layers = layerSelect.value;

            GetFusionMapWidget().query(options);
        }

        function SelectionOn() {
            var layerSelect = document.getElementById("layerSelect");
            var reqParams = "SESSION=" + encodeURIComponent(session);
            reqParams += "&MAPNAME=" + encodeURIComponent(mapName);
            reqParams += "&LAYERNAME=" + encodeURIComponent(layerSelect.value);

            if (msie)
                reqHandler = new ActiveXObject("Microsoft.XMLHTTP");
            else
                reqHandler = new XMLHttpRequest();

            reqHandler.onreadystatechange = OnReadyStateChange;
            reqHandler.open("POST", "featureinfocontroller.php", true);
            reqHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            document.getElementById('totalFeatures').innerHTML = '<?php echo $fetchInfoLocal ?>';
            document.getElementById('totalArea').innerHTML = ''
            document.getElementById("layerSelect").disabled = true;
            document.getElementById("pointButton").disabled = true;
            document.getElementById("rectButton").disabled = true;
            document.getElementById("polyButtton").disabled = true;
            document.getElementById("busyImg").src = BUSY_IMAGE;

            reqHandler.send(reqParams);
        }

        function OnReadyStateChange()
        {
            var ready = reqHandler.readyState;

            if (ready == READY_STATE_COMPLETE)
            {
                var results = reqHandler.responseText.parseJSON();
                if (results) {
                    var layerSelect = document.getElementById('layerSelect');

                    var layerInfo = results[layerSelect.value];
                    if (layerInfo) {
                        var areaIdx;
                        for (var i=0; i<layerInfo.metadatanames.length; i++) {
                            if (layerInfo.metadatanames[i] == 'area') {
                                areaIdx = i;
                                break;
                            }
                        }
                        if (typeof areaIdx != 'undefined') {
                            var totalArea = 0;
                            var n = layerInfo.numelements;
                            for (var i=0; i<n; i++) {
                                var metadata = layerInfo.metadata[i];
                                totalArea += metadata[areaIdx];
                            }
                            document.getElementById('totalFeatures').innerHTML = n + '<?php echo $featureSelLocal ?>';
                            document.getElementById('totalArea').innerHTML = '<?php echo $areaLocal ?>' + totalArea + ' m<sup>2</sup>';
                        } else {
                            document.getElementById('totalArea').innerHTML = '<?php echo $areaUndefinedLocal ?>';
                        }
                    } else {
                        document.getElementById('totalArea').innerHTML = '<?php echo $noLayerInfoLocal ?>';
                    }
                } else {
                    document.getElementById('totalFeatures').innerHTML = '<?php echo $noFeatureInLocal ?>';
                }


                document.getElementById("layerSelect").disabled = false;
                document.getElementById("pointButton").disabled = false;
                document.getElementById("rectButton").disabled = false;
                document.getElementById("polyButtton").disabled = false;
                document.getElementById("busyImg").src = NOT_BUSY_IMAGE;
                reqHandler = null;
            }
        }
        function SelectionOff() {
            document.getElementById('totalFeatures').innerHTML = '<?php echo $noSelectedLocal ?>';
            document.getElementById('totalArea').innerHTML = '';
        }

        function OnLoad() {
            var map = GetFusionMapWidget();
            map.registerForEvent(Fusion.Event.MAP_SELECTION_ON, SelectionOn);
            map.registerForEvent(Fusion.Event.MAP_SELECTION_OFF, SelectionOff);
            map.registerForEvent(Fusion.Event.MAP_ACTIVE_LAYER_CHANGED, ActiveLayerChange);
            var layer = map.getActiveLayer();
            if (layer) {
                ActiveLayerChange(null, layer);
            }
            OnLayerChange();
        }

        function OnUnload() {
            ClearDigitization(true);
            var map = GetFusionMapWidget();
            map.deregisterForEvent(Fusion.Event.MAP_SELECTION_ON, SelectionOn);
            map.deregisterForEvent(Fusion.Event.MAP_SELECTION_OFF, SelectionOff);
            map.deregisterForEvent(Fusion.Event.MAP_ACTIVE_LAYER_CHANGED, ActiveLayerChange);
        }

    </script>

</head>

<body onLoad="OnLoad();" onUnload="OnUnload();" marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>

<?php if ($errorMsg == null) { ?>

<table class="RegText" border="0" cellspacing="0" width="100%">
    <tr><td class="Title"><img id="busyImg" src="../../common/images/loader_inactive.gif" style="vertical-align:bottom">&nbsp;<?php echo $titleLocal ?><hr></td></tr>
    <tr><td class="SubTitle"><?php echo $subtitleLocal ?> <a href="<?= $_SERVER['REQUEST_URI'] ?>">(<?= $refreshLocal ?>)</a></td></tr>
    <tr><td><?php echo $layerLocal ?></td></tr>
    <tr>
        <td class="RegText">
            <select size="1" class="Ctrl" id="layerSelect" onChange="OnLayerChange()" style="width: 100%">
                <?php
                    $selected = 'selected';
                    foreach($layerNames as $layerName => $layerLabel) {
                ?>
                <option value="<?= $layerName ?>" <?=$selected ?> ><?= $layerLabel ?></option>
                <?php
                        $selected = '';
                    }
                ?>
            </select>
        </td>
    </tr>
    <tr><td class="Spacer"></td></tr>

    <tr><td class="SubTitle"><?php echo $selectFeatureLocal ?></td></tr>
    <tr><td class="InfoText"><?php echo $featureInfoExtraHelpLocal ?></td></tr>
    <tr><td><?php echo $digitizeLocal ?></td></tr>
    <tr>
        <td align="center">
            <input type="button" name="" value="<?php echo $pointLocal ?>" class="Ctrl" id="pointButton" onClick="OnDigitizePoint()" style="width: 30%">
            <input type="button" name="" value="<?php echo $rectangleLocal ?>" class="Ctrl" id="rectButton" onClick="OnDigitizeRectangle()" style="width: 30%">
            <input type="button" name="" value="<?php echo $polygonLocal ?>" class="Ctrl" id="polyButtton" onClick="OnDigitizePolygon()" style="width: 30%">
        </td>
    </tr>
    <tr><td class="Spacer"></td></tr>
    <tr><td class="SubTitle"><?php echo $totalLocal ?></td></tr>
    <tr><td id="totalFeatures"><?php echo $noSelectedLocal ?></td></tr>
    <tr><td id="totalArea"></td></tr>
</table>

<?php } else if ($errorDetail == null || (strlen($errorDetail) - strlen($errorMsg) < 5)) { ?>

<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td class="Title"><?php echo $errorLocal ?><hr></td></tr>
    <tr><td><?= $errorMsg ?></td></tr>
</table>

<?php } else { ?>

<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td class="Title"><?php echo $errorLocal ?><hr></td></tr>
    <tr><td><?= $errorMsg ?></td></tr>
    <tr><td><?= $errorDetail ?></td></tr>
</table>

<?php } ?>

</body>

</html>
