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
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . 'JSON.php';
    require_once 'classes/theme.php';

    SetLocalizedFilesPath(GetLocalizationPath());
    if(isset($_REQUEST['LOCALE'])) {
        $locale = $_REQUEST['LOCALE'];
    } else {
        $locale = GetDefaultLocale();
    }

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    $errorMsg = null;
    $errorDetail = null;

    $titleLocal = GetLocalizedString('THEMETITLE', $locale );
    $selectLayerLocal = GetLocalizedString('THEMESELECTLAYER', $locale );
    $layerLocal = GetLocalizedString('THEMELAYER', $locale );
    $nameLocal = GetLocalizedString('THEMENAME', $locale );
    $conditionLocal = GetLocalizedString('THEMECONDITIONS', $locale );
    $propertyLocal = GetLocalizedString('THEMEPROPERTY', $locale );
    $minLocal = GetLocalizedString('THEMEMIN', $locale );
    $maxLocal = GetLocalizedString('THEMEMAX', $locale );
    $distributionLocal = GetLocalizedString('THEMEDISTRIBUTION', $locale );
    $ruleLocal = GetLocalizedString('THEMERULE', $locale );
    $scaleRangeLocal = GetLocalizedString('THEMESCALERANGE', $locale );
    $styleRampLocal = GetLocalizedString('THEMESTYLERAMP', $locale );
    $fillTransparencyLocal = GetLocalizedString('THEMEFILLTRANS', $locale );
    $fillColorLocal = GetLocalizedString('THEMEFILLCOLOR', $locale );
    $fromLocal = GetLocalizedString('THEMEFROM', $locale );
    $toLocal = GetLocalizedString('THEMETO', $locale );
    $borderColorLocal = GetLocalizedString('THEMEBORDERCOLOR', $locale );
    $applyLocal = GetLocalizedString('THEMEAPPLY', $locale );
    $errorLocal = GetLocalizedString('THEMEERROR', $locale );
    $individualLocal = GetLocalizedString('THEMEINDIVIDUAL', $locale );
    $equalLocal = GetLocalizedString('THEMEEQUAL', $locale );
    $standardDeviationLocal = GetLocalizedString('THEMESTANDARD', $locale );
    $quantileLocal = GetLocalizedString('THEMEQUANTILE', $locale );
    $jenksLocal = GetLocalizedString('THEMEJENKS', $locale );

    try
    {
        //MgInitializeWebTier($configFilePath);

        $theme = new Theme($args);

        $layerNames = $theme->GetMapLayerNames();
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

    <script language="javascript">
        var READY_STATE_UNINITIALIZED     = 0;
        var READY_STATE_LOADING         = 1;
        var READY_STATE_LOADED             = 2;
        var READY_STATE_INTERACTIVE     = 3;
        var READY_STATE_COMPLETE         = 4;

        var NOT_BUSY_IMAGE = "../../common/images/loader_inactive.gif";
        var BUSY_IMAGE = "../../common/images/loader_pulse.gif";

        var SET_FILL_FROM_COLOR     = 1;
        var SET_FILL_TO_COLOR         = 2;
        var SET_LINE_FROM_COLOR     = 3;
        var SET_LINE_TO_COLOR        = 4;

        var fillFromColor = "FF0000";
        var fillToColor = "0000FF";
        var lineFromColor = "000000";
        var lineToColor = "000000";

        var session = '<?= $args['SESSION'] ?>';
        var mapName = '<?= $args['MAPNAME'] ?>';

        var distNameArray = ['<?= $individualLocal ?>', '<?= $equalLocal ?>', '<?= $standardDeviationLocal ?>', '<?= $quantileLocal  ?>', '<?= $jenksLocal ?>'];
        var distValueArray = '<?php $json = new Services_JSON(); echo $json->encode($theme->distValueArray) ?>'.parseJSON();

        var themeReqHandler = null;
        var layerInfo = null;

        var featureCount = 0;
        var ruleCount = 8;

        function OnLayerChange()
        {
            var layerSelect = document.getElementById("layerSelect");

            if(layerSelect.value == ""){
                return;
            }

            var propertySelect = document.getElementById("propertySelect");
            var scaleSelect = document.getElementById("scaleSelect");

            reqParams = "COMMAND=GETLAYERINFO";
            reqParams += "&SESSION=" + encodeURIComponent(session);
            reqParams += "&MAPNAME=" + encodeURIComponent(mapName);
            reqParams += "&LAYERNAME=" + encodeURIComponent(layerSelect.value);

            if (msie)
                reqHandler = new ActiveXObject("Microsoft.XMLHTTP");
            else
                reqHandler = new XMLHttpRequest();

            reqHandler.open("POST", "themecontroller.php", false);
            reqHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            reqHandler.send(reqParams);
            layerInfo = reqHandler.responseText.parseJSON();

            propertySelect.options.length = 0;
            for (var i = 0; i < layerInfo.properties.length; i++)
            {
                propertySelect.options[i] = new Option(layerInfo.properties[i].name, i, false, false);
            }
            OnPropertyChange();

            scaleSelect.options.length = 0;
            for (var i = 0; i < layerInfo.scaleRanges.length; i++)
            {
                scaleSelect.options[i] = new Option(layerInfo.scaleRanges[i], i, false, false);
            }
        }

        function OnPropertyChange()
        {
            var propertySelect = document.getElementById("propertySelect");
            var distroSelect = document.getElementById("distroSelect");

            PopulateMinMaxCount(propertySelect.value);

            distroSelect.options.length = 0;
            if (propertySelect.selectedIndex >= 0)
            {
                for (var i = 0; i < layerInfo.properties[propertySelect.value].distroTypes.length; i++)
                {
                    distroSelect.options[i] = new Option(distNameArray[layerInfo.properties[propertySelect.value].distroTypes[i]], distValueArray[layerInfo.properties[propertySelect.value].distroTypes[i]], false, false);
                }
            }
            OnDistroChange();
        }

        function OnDistroChange()
        {
            var distroSelect = document.getElementById("distroSelect");
            var numRules = document.getElementById("numRules");

            if (distroSelect.value == distValueArray[0])
            {
                numRules.disabled = true;
                numRules.value = featureCount;
            }
            else
            {
                numRules.disabled = false;
                numRules.value = ruleCount;
            }
        }

        function PopulateMinMaxCount(propertyIndex)
        {
            var layerSelect = document.getElementById("layerSelect");

            reqParams = "COMMAND=GETPROPERTYMINMAXCOUNT";
            reqParams += "&SESSION=" + encodeURIComponent(session);
            reqParams += "&MAPNAME=" + encodeURIComponent(mapName);
            reqParams += "&LAYERNAME=" + encodeURIComponent(layerSelect.value);
            reqParams += "&PROPERTYNAME=" + encodeURIComponent(layerInfo.properties[propertyIndex].name);

            if (msie)
                themeReqHandler = new ActiveXObject("Microsoft.XMLHTTP");
            else
                themeReqHandler = new XMLHttpRequest();

            themeReqHandler.onreadystatechange = OnGetMinMaxCountReadyStateChange;
            themeReqHandler.open("POST", "themecontroller.php", true);
            themeReqHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            document.getElementById("busyImg").src = BUSY_IMAGE;

            DisableControls(['layerSelect', 'propertySelect'], true);

            themeReqHandler.send(reqParams);
        }

        function OnGetMinMaxCountReadyStateChange()
        {
            var ready = themeReqHandler.readyState;

            if (ready == READY_STATE_COMPLETE)
            {
                minMaxCount = themeReqHandler.responseText.parseJSON();

                document.getElementById("minValue").value = minMaxCount[0];
                document.getElementById("maxValue").value = minMaxCount[1];
                featureCount = minMaxCount[2];

                OnDistroChange();

                DisableControls(['layerSelect', 'propertySelect'], false);
                document.getElementById("busyImg").src = NOT_BUSY_IMAGE;
                themeReqHandler = null;
            }
        }

        function DisableControls(ids, enable)
        {
            for (var i = 0; i < ids.length; i++)
            {
                document.getElementById(ids[i]).disabled = enable;
            }
        }

        function PickColor(whichColor, allowTransparency, transparent)
        {
            var clr;
            setColor = whichColor;

            if (setColor == SET_FILL_FROM_COLOR)
                clr = fillFromColor;
            else if (setColor == SET_FILL_TO_COLOR)
                clr = fillToColor;
            else if (setColor == SET_LINE_FROM_COLOR)
                clr = lineFromColor;
            else if (setColor == SET_LINE_TO_COLOR)
                clr = lineToColor;
           else
                return;

            height = allowTransparency? 470: 445;
            w = window.open("../../layers/MapGuide/php/ColorPicker.php?LOCALE=<?=$locale?>&CLR=" + clr + "&ALLOWTRANS=" + (allowTransparency? "1":"0") + "&TRANS=" + (transparent?"1":"0"), "colorPicker", "toolbar=no,status=no,width=355,height=" + height);
            w.focus();
        }

        function OnColorPicked(clr, trans)
        {
            if (setColor == SET_FILL_FROM_COLOR)
                fillFromColor = clr;
            else if (setColor == SET_FILL_TO_COLOR)
                fillToColor = clr;
            else if (setColor == SET_LINE_FROM_COLOR)
                lineFromColor = clr;
            else if (setColor == SET_LINE_TO_COLOR)
                lineToColor = clr;
           else
                return;

            UpdateColors();
        }

        function UpdateColors()
        {
            var elt;

            elt = document.getElementById("fillFromSwatch").style;
            elt.backgroundColor = "#" + fillFromColor;
            elt.color = "#" + fillFromColor;

            elt = document.getElementById("fillToSwatch").style;
            elt.backgroundColor = "#" + fillToColor;
            elt.color = "#" + fillToColor;

            elt = document.getElementById("lineFromSwatch").style;
            elt.backgroundColor = "#" + lineFromColor;
            elt.color = "#" + lineFromColor;

            elt = document.getElementById("lineToSwatch").style;
            elt.backgroundColor = "#" + lineToColor;
            elt.color = "#" + lineToColor;
        }

        function ApplyTheme()
        {
            var layerSelect = document.getElementById("layerSelect");
            var propertySelect = document.getElementById("propertySelect");

            reqParams = "COMMAND=APPLYTHEME";
            reqParams += "&SESSION=" + encodeURIComponent(session);
            reqParams += "&MAPNAME=" + encodeURIComponent(mapName);
            reqParams += "&LAYERNAME=" + encodeURIComponent(layerSelect.value);
            reqParams += "&THEMENAME=" + encodeURIComponent(document.getElementById("themeName").value);
            reqParams += "&PROPERTYNAME=" + encodeURIComponent(layerInfo.properties[propertySelect.value].name);
            reqParams += "&DATATYPE=" + encodeURIComponent(layerInfo.properties[propertySelect.value].dataType);
            reqParams += "&MINVALUE=" + encodeURIComponent(document.getElementById("minValue").value);
            reqParams += "&MAXVALUE=" + encodeURIComponent(document.getElementById("maxValue").value);
            reqParams += "&DISTRO=" + encodeURIComponent(document.getElementById("distroSelect").value);
            reqParams += "&NUMRULES=" + encodeURIComponent(document.getElementById("numRules").value);
            reqParams += "&SCALERANGEINDEX=" + encodeURIComponent(document.getElementById("scaleSelect").value);
            reqParams += "&FILLTRANS=" + encodeURIComponent(document.getElementById("fillTrans").value);
            reqParams += "&FILLFROM=" + encodeURIComponent(fillFromColor);
            reqParams += "&FILLTO=" + encodeURIComponent(fillToColor);
            reqParams += "&LINEFROM=" + encodeURIComponent(lineFromColor);
            reqParams += "&LINETO=" + encodeURIComponent(lineToColor);

            if (msie)
                themeReqHandler = new ActiveXObject("Microsoft.XMLHTTP");
            else
                themeReqHandler = new XMLHttpRequest();

            themeReqHandler.onreadystatechange = OnApplyThemeReadyStateChange;
            themeReqHandler.open("POST", "themecontroller.php", true);
            themeReqHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            document.getElementById("busyImg").src = BUSY_IMAGE;

            DisableControls(['layerSelect', 'propertySelect'], true);

            themeReqHandler.send(reqParams);
        }

        function OnApplyThemeReadyStateChange()
        {
            var ready = themeReqHandler.readyState;

            if (ready == READY_STATE_COMPLETE)
            {
                DisableControls(['layerSelect', 'propertySelect'], false);
                document.getElementById("busyImg").src = NOT_BUSY_IMAGE;
                themeReqHandler = null;

                var fWin = GetFusionWindow().Fusion;
                var map = fWin.getWidgetById('Map');
                map.reloadMap();

            }
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
        
        function OnLoad()
        {
            OnLayerChange();
            UpdateColors();
            
            AdjustTextInputWidth();
        }
        
        function OnResize()
        {
           AdjustTextInputWidth();
        }
        
        //fix the defects in IE9 beta, it is a workaround for IE9beta,
        //it is because  style="width: 100%" doesn't work in IE9 beta for input type="text" under the frame, its length will be 0 when you input anything
        //if in the final release of IE9 doesn't have this problem, maybe we can remove this fix
        function AdjustTextInputWidth()
        {
            document.getElementById("themeName").style.width = (document.body.clientWidth-8)+"px";
            document.getElementById("minValue").style.width = (document.body.clientWidth-8)+"px";
            document.getElementById("maxValue").style.width = (document.body.clientWidth-8)+"px";
            document.getElementById("fillTrans").style.width = (document.body.clientWidth-23)+"px";
        }
        
    </script>

</head>

<body onLoad="OnLoad();" OnResize="OnResize();" marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>

<?php if ($errorMsg == null) { ?>

<table class="RegText" border="0" cellspacing="0" width="100%">
    <tr><td colspan="2" class="Title"><img id="busyImg" src="../../common/images/loader_pulse.gif" style="vertical-align:bottom">&nbsp;<?php echo $titleLocal ?><hr></td></tr>
    <tr><td colspan="2" class="SubTitle"><?php echo $selectLayerLocal ?></td></tr>
    <tr><td colspan="2"><?php echo $layerLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
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
    <tr><td colspan="2"><?php echo $nameLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <input type="Text" maxlength="100" id="themeName" class="Ctrl"/>
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td colspan="2" class="SubTitle"><?php echo $conditionLocal ?></td></tr>
    <tr><td colspan="2"><?php echo $propertyLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <select size="1" class="Ctrl" id="propertySelect" onChange="OnPropertyChange()" style="width: 100%">
              </select>
        </td>
    </tr>
    <tr><td colspan="2"><?php echo $minLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <input type="Text" maxlength="100" class="Ctrl" id="minValue"/>
        </td>
    </tr>
    <tr><td colspan="2"><?php echo $maxLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <input type="Text" maxlength="100" class="Ctrl" id="maxValue">
        </td>
    </tr>
    <tr><td colspan="2"><?php echo $distributionLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <select size="1" class="Ctrl" id="distroSelect" onChange="OnDistroChange()" style="width: 100%">
              </select>
        </td>
    </tr>
    <tr><td colspan="2"><?php echo $ruleLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <input maxlength="10" class="Ctrl" id="numRules" value="8" style="width: 100%">
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td colspan="2" class="SubTitle"><?php echo $scaleRangeLocal ?></td></tr>
    <tr>
        <td colspan="2" class="RegText">
            <select size="1" class="Ctrl" id="scaleSelect" style="width: 100%">
              </select>
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td colspan="2" class="SubTitle"><?php echo $styleRampLocal ?></td></tr>
    <tr><td><?php echo $fillTransparencyLocal ?></td></tr>
    <tr>
        <td  colspan="2" class="RegText">
            <input class="Ctrl" id="fillTrans" type="text"  maxlength="3" value="0"/>&nbsp;%
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td><?php echo $fillColorLocal ?></td></tr>
    <tr>
        <td valign="top">
            &nbsp;&nbsp;&nbsp;<?php echo $fromLocal ?><br>
            &nbsp;&nbsp;&nbsp;<span class="Swatch" id="fillFromSwatch" style="color: #FF0000; background-color: #FF0000">&nbsp;transpar&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_FILL_FROM_COLOR,false,false)">
        </td>
        <td valign="top">
            &nbsp;&nbsp;&nbsp;<?php echo $toLocal ?><br>
            &nbsp;&nbsp;&nbsp;<span class="Swatch" id="fillToSwatch" style="color: #0000FF; background-color: #0000FF">&nbsp;transpar&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_FILL_TO_COLOR,false,false)">
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td><?php echo $borderColorLocal ?></td></tr>
    <tr>
        <td valign="top">
            &nbsp;&nbsp;&nbsp;<?php echo $fromLocal ?><br>
            &nbsp;&nbsp;&nbsp;<span class="Swatch" id="lineFromSwatch" style="color: #000000; background-color: #000000">&nbsp;transpar&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_LINE_FROM_COLOR,false,false)">
        </td>
        <td valign="top">
            &nbsp;&nbsp;&nbsp;<?php echo $toLocal ?><br>
            &nbsp;&nbsp;&nbsp;<span class="Swatch" id="lineToSwatch" style="color: #000000; background-color: #000000">&nbsp;transpar&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_LINE_TO_COLOR,false,false)">
        </td>
    </tr>
    <tr><td colspan="2" class="Spacer"></td></tr>
    <tr><td colspan="2" ><hr></td></tr>
    <tr><td colspan="2" align="right"><input class="Ctrl" type="button" value="<?php echo $applyLocal ?>" style="width: 60px;" onClick="ApplyTheme()"></td></tr>
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