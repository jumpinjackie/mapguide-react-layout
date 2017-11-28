<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . 'JSON.php';
    require_once 'classes/markupcommand.php';
    require_once 'classes/defaultstyle.php';
    require_once 'classes/markupmanager.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;
    $markupManager = new MarkupManager($args);
    
    //Get the layer style and feature source for this Layer Definition. The whole UI is initialized from the values found here
    $style = $markupManager->GetLayerStyle($args["EDITMARKUPLAYER"]);
    $editFeatureSource = $markupManager->GetFeatureSource($args["EDITMARKUPLAYER"]);

    $isAdvanced = (strcmp($args["REDLINESTYLIZATION"], "ADVANCED") == 0);

    $errorMsg = null;
    $errorDetail = null;
    $defaultFormat = null;
    $defaultGeomType = null;

    if (array_key_exists("REDLINEFORMAT", $args) && array_key_exists("REDLINEGEOMTYPE", $args)) {
        if (strcmp($args["REDLINEFORMAT"], "SDF") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultGeomType = $args["REDLINEGEOMTYPE"];
        } else if (strcmp($args["REDLINEFORMAT"], "SHP") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultGeomType = $args["REDLINEGEOMTYPE"];
        } else if (strcmp($args["REDLINEFORMAT"], "SQLite") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultGeomType = $args["REDLINEGEOMTYPE"];
        }
    }
    
    SetLocalizedFilesPath(GetLocalizationPath());
    if(isset($_REQUEST['LOCALE'])) {
        $locale = $_REQUEST['LOCALE'];
    } else {
        $locale = GetDefaultLocale();
    }
    
    $editLayerStyleLocal = GetLocalizedString('REDLINEEDITLAYERSTYLE', $locale );
    $layerSettingsLocal = GetLocalizedString('REDLINELAYERSETTINGS', $locale );
    $nameLocal = GetLocalizedString('REDLINENAME', $locale );
    $pointStyleLocal = GetLocalizedString('REDLINEPOINTSTYLE', $locale );
    $markerStyleLocal = GetLocalizedString('REDLINEMARKERTYPE', $locale );
    $squareLocal = GetLocalizedString('REDLINEMARKERSQUARE', $locale );
    $circleLocal = GetLocalizedString('REDLINEMARKERCIRCLE', $locale );
    $triangleLocal = GetLocalizedString('REDLINEMARKERTRIANGLE', $locale );
    $starLocal = GetLocalizedString('REDLINEMARKERSTAR', $locale );
    $crossLocal = GetLocalizedString('REDLINEMARKERCROSS', $locale );
    $xLocal = GetLocalizedString('REDLINEMARKERX', $locale );
    $unitsPtLocal = GetLocalizedString('REDLINEUNITSPT', $locale );
    $unitsInLocal = GetLocalizedString('REDLINEUNITSIN', $locale );
    $unitsMmLocal = GetLocalizedString('REDLINEUNITSMM', $locale );
    $unitsCmLocal = GetLocalizedString('REDLINEUNITSCM', $locale );
    $unitsMLocal = GetLocalizedString('REDLINEUNITSM', $locale );
    $markerSizeLocal = GetLocalizedString('REDLINEMARKERSIZE', $locale );
    $markerColorLocal = GetLocalizedString('REDLINEMARKERCOLOR', $locale );
    $lineStyleLocal = GetLocalizedString('REDLINELINESTYLE', $locale );
    $linePatternLocal = GetLocalizedString('REDLINELINEPATTERN', $locale );
    $solidLocal = GetLocalizedString('REDLINEPATTERNSOLID', $locale );
    $dashLocal = GetLocalizedString('REDLINEPATTERNDASH', $locale );
    $dotLocal = GetLocalizedString('REDLINEPATTERNDOT', $locale );
    $dashDotLocal = GetLocalizedString('REDLINEPATTERNDASHDOT', $locale );
    $dashDotDotLocal = GetLocalizedString('REDLINEPATTERNDASHDOTDOT', $locale );
    $railLocal = GetLocalizedString('REDLINEPATTERNRAIL', $locale );
    $borderLocal = GetLocalizedString('REDLINEPATTERNBORDER', $locale );
    $divideLocal = GetLocalizedString('REDLINEPATTERNDIVIDE', $locale );
    $fenceLineLocal = GetLocalizedString('REDLINEPATTERNFENCELINE', $locale );
    $netLocal = GetLocalizedString('REDLINEPATTERNNET', $locale );
    $lineLocal = GetLocalizedString('REDLINEPATTERNLINE', $locale );
    $line45Local = GetLocalizedString('REDLINEPATTERNLINE45', $locale );
    $line90Local = GetLocalizedString('REDLINEPATTERNLINE90', $locale );
    $line135Local = GetLocalizedString('REDLINEPATTERNLINE135', $locale );
    $squareLocal = GetLocalizedString('REDLINEPATTERNSQUARE', $locale );
    $boxLocal = GetLocalizedString('REDLINEPATTERNBOX', $locale );
    $crossLocal = GetLocalizedString('REDLINEPATTERNCROSS', $locale );
    $dolmitLocal = GetLocalizedString('REDLINEPATTERNDOLMIT', $locale );
    $hexLocal = GetLocalizedString('REDLINEPATTERNHEX', $locale );
    $sacncrLocal = GetLocalizedString('REDLINEPATTERNSACNCR', $locale );
    $steelLocal = GetLocalizedString('REDLINEPATTERNSTEEL', $locale );
    $sizeUnitsLocal = GetLocalizedString('REDLINESIZEUNITS', $locale );
    $thicknessLocal = GetLocalizedString('REDLINELINETHICKNESS', $locale );
    $lineColorLocal = GetLocalizedString('REDLINELINECOLOR', $locale );
    $transparentLocal = GetLocalizedString('REDLINETRANSPARENT', $locale );
    $polygonStyleLocal = GetLocalizedString('REDLINEPOLYGONSTYLE', $locale );
    $fillPatternLocal = GetLocalizedString('REDLINEFILLPATTERN', $locale );
    $fillTransparencyLocal = GetLocalizedString('REDLINEFILLTRANSPARENCY', $locale );
    $foregroundLocal = GetLocalizedString('REDLINEFOREGROUND', $locale );
    $backgroundLocal = GetLocalizedString('REDLINEBACKGROUND', $locale );
    $borderPatternLocal = GetLocalizedString('REDLINEBORDERPATTERN', $locale );
    $borderColorLocal = GetLocalizedString('REDLINEBORDERCOLOR', $locale );
    $labelStyleLocal = GetLocalizedString('REDLINELABELSTYLE', $locale );
    $labelSizeUnitsLocal = GetLocalizedString('REDLINELABELSIZEUNITS', $locale );
    $borderThicknessLocal = GetLocalizedString('REDLINEBORDERTHICKNESS', $locale );
    $fontSizeLocal = GetLocalizedString('REDLINELABELFONTSIZE', $locale );
    $boldLocal = GetLocalizedString('REDLINEFONTBOLD', $locale );
    $italicLocal = GetLocalizedString('REDLINEFONTITALIC', $locale );
    $underlineLocal = GetLocalizedString('REDLINEFONTUNDERLINE', $locale );
    $labelColorLocal = GetLocalizedString('REDLINELABELCOLOR', $locale );
    $labelBackgroundStyleLocal = GetLocalizedString('REDLINELABELBACKGROUNDSTYLE', $locale );
    $ghostedLocal = GetLocalizedString('REDLINELABELGHOSTED', $locale );
    $opaqueLocal = GetLocalizedString('REDLINELABELOPAQUE', $locale );
?>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>New Markup Layer</title>
    <link rel="stylesheet" href="Redline.css" type="text/css">
    <script language="javascript">
        var SET_MARKER_COLOR 		= 1;
        var SET_LINE_COLOR 			= 2;
        var SET_FILL_FORE_COLOR 	= 3;
        var SET_FILL_BACK_COLOR		= 4;
        var SET_BORDER_COLOR 		= 5;
        var SET_LABEL_FORE_COLOR 	= 6;
        var SET_LABEL_BACK_COLOR 	= 7;
        var setColor = 0;
    
        var markerColor = "<?= $style->MARKER_COLOR ?>";
        var lineColor = "<?= $style->LINE_COLOR ?>";
        var fillForeColor = "<?= $style->FILL_FORE_COLOR ?>";
        var fillBackColor = "<?= $style->FILL_BACK_COLOR ?>";
        var fillBackTrans = "<?= $style->FILL_BACK_TRANS ?>";
        var borderColor = "<?= $style->BORDER_COLOR ?>";
        var labelForeColor = "<?= $style->LABEL_FORE_COLOR ?>";
        var labelBackColor = "<?= $style->LABEL_BACK_COLOR ?>";
        
        function PickColor(whichColor, allowTransparency, transparent)
        {
            var clr;
            setColor = whichColor;
            
            if (setColor == SET_MARKER_COLOR)
                clr = markerColor;
            else if (setColor == SET_LINE_COLOR)
                clr = lineColor;
            else if (setColor == SET_FILL_FORE_COLOR)
                clr = fillForeColor;
            else if (setColor == SET_FILL_BACK_COLOR)
                clr = fillBackColor;
            else if (setColor == SET_BORDER_COLOR)
                clr = borderColor;
            else if (setColor == SET_LABEL_FORE_COLOR)
                clr = labelForeColor;
            else if (setColor == SET_LABEL_BACK_COLOR)
                clr = labelBackColor;
           else
                return;
                
            height = allowTransparency? 480: 450;
            w = window.open("../../layers/MapGuide/php/ColorPicker.php?LOCALE=en&CLR=" + clr + "&ALLOWTRANS=" + (allowTransparency? "1":"0") + "&TRANS=" + (transparent.value == "true"? "1":"0"), "colorPicker", "toolbar=no,scrollbars=no,status=no,width=355,height=" + height);
            w.focus();
        }

        function OnColorPicked(clr, trans)
        {
            if (setColor == SET_MARKER_COLOR)
                markerColor = clr;
            else if (setColor == SET_LINE_COLOR)
                lineColor = clr;
            else if (setColor == SET_FILL_FORE_COLOR)
                fillForeColor = clr;
            else if (setColor == SET_FILL_BACK_COLOR)
            {
                fillBackColor = clr;
                fillBackTrans = trans;
            }
            else if (setColor == SET_BORDER_COLOR)
                borderColor = clr;
            else if (setColor == SET_LABEL_FORE_COLOR)
                labelForeColor = clr;
            else if (setColor == SET_LABEL_BACK_COLOR)
                labelBackColor = clr;
           else
                return;

            UpdateColors();
        }

        function UpdateColors()
        {
            var elt;
            document.getElementById("markerColor").value = markerColor;
            elt = document.getElementById("markerSwatch").style;
            elt.backgroundColor = "#" + markerColor;
            elt.color = "#" + markerColor;

            document.getElementById("lineColor").value = lineColor;
            elt = document.getElementById("lineSwatch").style;
            elt.backgroundColor = "#" + lineColor;
            elt.color = "#" + lineColor;

            document.getElementById("fillForeColor").value = fillForeColor;
            elt = document.getElementById("fillFgSwatch").style;
            elt.backgroundColor = "#" + fillForeColor;
            elt.color = "#" + fillForeColor;

            document.getElementById("fillBackColor").value = fillBackColor;
            document.getElementById("fillBackTrans").value = fillBackTrans;
            elt = document.getElementById("fillBgSwatch").style;
            elt.backgroundColor = fillBackTrans ? "#FFFFFF" : "#" + fillBackColor;
            elt.color = fillBackTrans ? "#000000" : "#" + fillBackColor;

            document.getElementById("borderColor").value = borderColor;
            elt = document.getElementById("borderSwatch").style;
            elt.backgroundColor = "#" + borderColor;
            elt.color = "#" + borderColor;

            document.getElementById("labelForeColor").value = labelForeColor;
            elt = document.getElementById("labelFgSwatch").style;
            elt.backgroundColor = "#" + labelForeColor;
            elt.color = "#" + labelForeColor;

            document.getElementById("labelBackColor").value = labelBackColor;
            elt = document.getElementById("labelBgSwatch").style;
            elt.backgroundColor = "#" + labelBackColor;
            elt.color = "#" + labelBackColor;
        }
        
        function Cancel()
        {
        <?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
            window.location.href="markupmain.php?SESSION=<?= $args['SESSION']?>&MAPNAME=<?= $args['MAPNAME']?>&REDLINESTYLIZATION=<?= $args['REDLINESTYLIZATION'] ?>&REDLINEFORMAT=<?= $defaultFormat ?>&REDLINEGEOMTYPE=<?= $defaultGeomType ?>";
        <?php } else { ?>
            window.location.href="markupmain.php?SESSION=<?= $args['SESSION']?>&MAPNAME=<?= $args['MAPNAME']?>&REDLINESTYLIZATION=<?= $args['REDLINESTYLIZATION'] ?>";
        <?php } ?>
        }
    </script>
    
</head>

<body marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>

<?php if ($errorMsg == null) { ?>

<form action="markupmain.php" method="post" enctype="application/x-www-form-urlencoded" id="newMarkupLayerForm" target="_self">

<input name="SESSION" type="hidden" value="<?= $args['SESSION'] ?>">
<input name="MAPNAME" type="hidden" value="<?= $args['MAPNAME'] ?>">
<input name="MARKUPCOMMAND" type="hidden" value="<?= MarkupCommand::EditStyle ?>">
<input name="EDITMARKUPLAYER" type="hidden" value="<?= $args['EDITMARKUPLAYER'] ?>">
<input name="EDITFEATURESOURCE" type="hidden" value="<?= $editFeatureSource ?>">
<input name="MARKUPLAYERNAME" type="hidden" value="<?= $args['MARKUPLAYERNAME'] ?>">
<input name="REDLINESTYLIZATION" type="hidden" value="<?= $args['REDLINESTYLIZATION'] ?>">

<?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
<input name="REDLINEFORMAT" type="hidden" value="<?= $defaultFormat ?>" />
<input name="REDLINEGEOMTYPE" type="hidden" value="<?= $defaultGeomType ?>" />
<?php } ?>

<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td id="elTitle" colspan="2" class="Title"><?= $editLayerStyleLocal ?><hr></td></tr>
    <tr><td colspan="2" class="SubTitle"><?= $layerSettingsLocal ?></td></tr>
    <tr><td colspan="2"><?= $nameLocal ?></td></tr>
    <tr><td colspan="2"><strong class="Ctrl" style="width:100%" ><?= $args["MARKUPLAYERNAME"] ?></strong><br><br></td></tr>

    <tr><td colspan="2" class="SubTitle"><?= $pointStyleLocal ?></td></tr>
    <tr>
        <td colspan="2">
            <?=$markerStyleLocal?><br>
            <select class="Ctrl" name="MARKERTYPE" size="1">
                <option value="Square" selected="selected"><?=$squareLocal?></option>
                <option value="Circle"><?=$circleLocal?></option>
                <option value="Triangle"><?=$triangleLocal?></option>
                <option value="Star"><?=$starLocal?></option>
                <option value="Cross"><?=$crossLocal?></option>
                <option value="X"><?=$xLocal?></option>
            </select>
        </td>
    </tr>
    <tr>
        <td>
            <?=$sizeUnitsLocal?><br>
            <select class="Ctrl" name="MARKERSIZEUNITS" size="1">
                <option value="Points" selected="selected"><?=$unitsPtLocal?></option>
                <option value="Inches"><?=$unitsInLocal?></option>
                <option value="Millimeters"><?=$unitsMmLocal?></option>
                <option value="Centimeters"><?=$unitsCmLocal?></option>
                <option value="Meters"><?=$unitsMLocal?></option>
            </select>
        </td>
        <td>
            <?=$markerSizeLocal?><br>
            <input class="Ctrl" name="MARKERSIZE" type="text" value="<?= $style->MARKER_SIZE ?>">
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <?=$markerColorLocal?><br>
            <span class="Swatch" id="markerSwatch" style="color: #<?= $style->MARKER_COLOR ?>; background-color: #<?= $style->MARKER_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_MARKER_COLOR,false,false)">
            <br><br>
        </td>
    </tr>

    <tr><td colspan="2" class="SubTitle"><?=$lineStyleLocal?></td></tr>
    <tr>
        <td colspan="2">
            <?=$linePatternLocal?><br>
            <select class="Ctrl" name="LINEPATTERN" size="1">
                <option value="Solid" <?= strcmp($style->LINE_PATTERN, "Solid") == 0 ? 'selected="selected"' : '' ?>><?=$solidLocal?></option>
                <option value="Dash" <?= strcmp($style->LINE_PATTERN, "Dash") == 0 ? 'selected="selected"' : '' ?>><?=$dashLocal?></option>
                <option value="Dot" <?= strcmp($style->LINE_PATTERN, "Dot") == 0 ? 'selected="selected"' : '' ?>><?=$dotLocal?></option>
                <option value="DashDot" <?= strcmp($style->LINE_PATTERN, "DashDot") == 0 ? 'selected="selected"' : '' ?>><?=$dashDotLocal?></option>
                <option value="DashDotDot" <?= strcmp($style->LINE_PATTERN, "DashDotDot") == 0 ? 'selected="selected"' : '' ?>><?=$dashDotDotLocal?></option>
                <option value="Rail" <?= strcmp($style->LINE_PATTERN, "Rail") == 0 ? 'selected="selected"' : '' ?>><?=$railLocal?></option>
                <option value="BORDER" <?= strcmp($style->LINE_PATTERN, "BORDER") == 0 ? 'selected="selected"' : '' ?>><?=$borderLocal?></option>
                <option value="DIVIDE" <?= strcmp($style->LINE_PATTERN, "DIVIDE") == 0 ? 'selected="selected"' : '' ?>><?=$divideLocal?></option>
                <option value="FENCELINE1" <?= strcmp($style->LINE_PATTERN, "FENCELINE1") == 0 ? 'selected="selected"' : '' ?>><?=$fenceLineLocal?></option>
            </select>
        </td>
    </tr>	
    <tr>
        <td width="50%">
            <?=$sizeUnitsLocal?><br>
            <select class="Ctrl" name="LINESIZEUNITS" size="1">
                <option value="Points" <?= strcmp($style->LINE_SIZE_UNITS, "Points") == 0 ? 'selected="selected"' : '' ?>><?=$unitsPtLocal?></option>
                <option value="Inches" <?= strcmp($style->LINE_SIZE_UNITS, "Inches") == 0 ? 'selected="selected"' : '' ?>><?=$unitsInLocal?></option>
                <option value="Millimeters" <?= strcmp($style->LINE_SIZE_UNITS, "Millimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMmLocal?></option>
                <option value="Centimeters" <?= strcmp($style->LINE_SIZE_UNITS, "Centimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsCmLocal?></option>
                <option value="Meters" <?= strcmp($style->LINE_SIZE_UNITS, "Meters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMLocal?></option>
            </select>
        </td>
        <td width="50%">
            <?=$thicknessLocal?><br>
            <input class="Ctrl" name="LINETHICKNESS" type="text" value="<?= $style->LINE_THICKNESS ?>">
        </td>
    </tr>
    <tr>	
        <td colspan="2">
            <?=$lineColorLocal?><br>
            <span class="Swatch" id="lineSwatch" style="color: #<?= $style->LINE_COLOR ?>; background-color: #<?= $style->LINE_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_LINE_COLOR,false,false)">
            <br><br>
        </td>
    </tr>	
    
    
    <tr><td colspan="2" class="SubTitle"><?=$polygonStyleLocal?></td></tr>
    <tr>
        <td width="50%">
            <?=$fillPatternLocal?><br>
            <select class="Ctrl" name="FILLPATTERN" size="1">
                <option value="Solid" <?= strcmp($style->FILL_PATTERN, "Solid") == 0 ? 'selected="selected"' : '' ?>><?=$solidLocal?></option>
                <option value="Net" <?= strcmp($style->FILL_PATTERN, "Net") == 0 ? 'selected="selected"' : '' ?>><?=$netLocal?></option>
                <option value="Line" <?= strcmp($style->FILL_PATTERN, "Line") == 0 ? 'selected="selected"' : '' ?>><?=$lineLocal?></option>
                <option value="Line_45" <?= strcmp($style->FILL_PATTERN, "Line_45") == 0 ? 'selected="selected"' : '' ?>><?=$line45Local?></option>
                <option value="Line_90" <?= strcmp($style->FILL_PATTERN, "Line_90") == 0 ? 'selected="selected"' : '' ?>><?=$line90Local?></option>
                <option value="Line_135" <?= strcmp($style->FILL_PATTERN, "Line_135") == 0 ? 'selected="selected"' : '' ?>><?=$line135Local?></option>
                <option value="Square" <?= strcmp($style->FILL_PATTERN, "Square") == 0 ? 'selected="selected"' : '' ?>><?=$squareLocal?></option>
                <option value="Box" <?= strcmp($style->FILL_PATTERN, "Box") == 0 ? 'selected="selected"' : '' ?>><?=$boxLocal?></option>
                <option value="Cross" <?= strcmp($style->FILL_PATTERN, "Cross") == 0 ? 'selected="selected"' : '' ?>><?=$crossLocal?></option>
                <option value="Dash" <?= strcmp($style->FILL_PATTERN, "Dash") == 0 ? 'selected="selected"' : '' ?>><?=$dashLocal?></option>
                <option value="Dolmit" <?= strcmp($style->FILL_PATTERN, "Dolmit") == 0 ? 'selected="selected"' : '' ?>><?=$dolmitLocal?></option>
                <option value="Hex" <?= strcmp($style->FILL_PATTERN, "Hex") == 0 ? 'selected="selected"' : '' ?>><?=$hexLocal?></option>
                <option value="Sacncr" <?= strcmp($style->FILL_PATTERN, "Sacncr") == 0 ? 'selected="selected"' : '' ?>><?=$sacncrLocal?></option>
                <option value="Steel" <?= strcmp($style->FILL_PATTERN, "Steel") == 0 ? 'selected="selected"' : '' ?>><?=$steelLocal?></option>
            </select>
        </td>
        <td width="50%">
            <?=$fillTransparencyLocal?><br>
            <input class="Ctrl" name="FILLTRANSPARENCY" type="text"  maxlength="3" value="<?php $style->FILL_TRANSPARENCY ?>" style="width:50px">%
        </td>
    </tr>
    <tr>	
        <td width="50%" valign="top">
            <?=$foregroundLocal?><br>
            <span class="Swatch" id="fillFgSwatch" style="color: #<?= $style->FILL_FORE_COLOR ?>; background-color: #<?= $style->FILL_FORE_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_FILL_FORE_COLOR,false,false)">
            <br><br>
        </td>
        <td width="50%" valign="top">
            <?=$backgroundLocal?><br>
            <span class="Swatch" id="fillBgSwatch" style="color: #<?= $style->FILL_BACK_COLOR ?>; background-color: #<?= $style->FILL_BACK_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_FILL_BACK_COLOR,true,fillBackTrans)">
            <br>
        </td>
    </tr>	
    <tr><td colspan="2"><hr></td></tr>
    <tr>
        <td colspan="2">
            <?=$borderPatternLocal?><br>
            <select class="Ctrl" name="BORDERPATTERN" size="1">
                <option value="Solid" <?= strcmp($style->BORDER_PATTERN, "Solid") == 0 ? 'selected="selected"' : '' ?>><?=$solidLocal?></option>
                <option value="Dash" <?= strcmp($style->BORDER_PATTERN, "Dash") == 0 ? 'selected="selected"' : '' ?>><?=$dashLocal?></option>
                <option value="Dot" <?= strcmp($style->BORDER_PATTERN, "Dot") == 0 ? 'selected="selected"' : '' ?>><?=$dotLocal?></option>
                <option value="DashDot" <?= strcmp($style->BORDER_PATTERN, "DashDot") == 0 ? 'selected="selected"' : '' ?>><?=$dashDotLocal?></option>
                <option value="DashDotDot" <?= strcmp($style->BORDER_PATTERN, "DashDotDot") == 0 ? 'selected="selected"' : '' ?>><?=$dashDotDotLocal?></option>
                <option value="Rail" <?= strcmp($style->BORDER_PATTERN, "Rail") == 0 ? 'selected="selected"' : '' ?>><?=$railLocal?></option>
                <option value="BORDER" <?= strcmp($style->BORDER_PATTERN, "BORDER") == 0 ? 'selected="selected"' : '' ?>><?=$borderLocal?></option>
                <option value="DIVIDE" <?= strcmp($style->BORDER_PATTERN, "DIVIDE") == 0 ? 'selected="selected"' : '' ?>><?=$divideLocal?></option>
                <option value="FENCELINE1" <?= strcmp($style->BORDER_PATTERN, "FENCELINE1") == 0 ? 'selected="selected"' : '' ?>><?=$fenceLineLocal?></option>
            </select>
        </td>
    </tr>	
    <tr>
        <td width="50%">
            <?=$sizeUnitsLocal?><br>
            <select class="Ctrl" name="BORDERSIZEUNITS" size="1">
                <option value="Points" <?= strcmp($style->BORDER_SIZE_UNITS, "Points") == 0 ? 'selected="selected"' : '' ?>><?=$unitsPtLocal?></option>
                <option value="Inches" <?= strcmp($style->BORDER_SIZE_UNITS, "Inches") == 0 ? 'selected="selected"' : '' ?>><?=$unitsInLocal?></option>
                <option value="Millimeters" <?= strcmp($style->BORDER_SIZE_UNITS, "Millimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMmLocal?></option>
                <option value="Centimeters" <?= strcmp($style->BORDER_SIZE_UNITS, "Centimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsCmLocal?></option>
                <option value="Meters" <?= strcmp($style->BORDER_SIZE_UNITS, "Meters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMLocal?></option>
            </select>
        </td>
        <td width="50%">
            <?=$borderThicknessLocal?><br>
            <input class="Ctrl" name="BORDERTHICKNESS" type="text" value="<?= $style->BORDER_THICKNESS ?>">
        </td>
    </tr>
    <tr>	
        <td colspan="2">
            <?=$borderColorLocal?><br>
            <span class="Swatch" id="borderSwatch" style="color: #<?= $style->BORDER_COLOR ?>; background-color: #<?= $style->BORDER_COLOR ?>">&nbsp;transparent&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_BORDER_COLOR,false,false)">
            <br><br>
        </td>
    </tr>	

    <tr><td colspan="2" class="SubTitle"><?=$labelStyleLocal?></td></tr>
    <tr>
        <td width="50%">
            <?=$sizeUnitsLocal?><br>
            <select class="Ctrl" name="LABELSIZEUNITS" size="1">
                <option value="Points" <?= strcmp($style->LABEL_SIZE_UNITS, "Points") == 0 ? 'selected="selected"' : '' ?>><?=$unitsPtLocal?></option>
                <option value="Inches" <?= strcmp($style->LABEL_SIZE_UNITS, "Inches") == 0 ? 'selected="selected"' : '' ?>><?=$unitsInLocal?></option>
                <option value="Millimeters" <?= strcmp($style->LABEL_SIZE_UNITS, "Millimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMmLocal?></option>
                <option value="Centimeters" <?= strcmp($style->LABEL_SIZE_UNITS, "Centimeters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsCmLocal?></option>
                <option value="Meters" <?= strcmp($style->LABEL_SIZE_UNITS, "Meters") == 0 ? 'selected="selected"' : '' ?>><?=$unitsMLocal?></option>
            </select>
        </td>
        <td width="50%">
            <?=$fontSizeLocal?><br>
            <input class="Ctrl" name="LABELFONTSIZE" type="text" value="<?= $style->LABEL_FONT_SIZE ?>">
        </td>
    </tr>
    <tr>
        <td colspan="2" valign="middle">
            <input name="LABELBOLD" type="checkbox" value="bold" <?= strcmp(strval($style->LABEL_BOLD), "true") == 0 ? 'checked="checked"' : '' ?>><label><?=$boldLocal?></label>&nbsp;&nbsp;
            <input name="LABELITALIC" type="checkbox" value="italic" <?= strcmp(strval($style->LABEL_ITALIC), "true") == 0 ? 'checked="checked"' : '' ?>><label><?=$italicLocal?></label>&nbsp;&nbsp;
            <input name="LABELUNDERLINE" type="checkbox" value="underline" <?= strcmp(strval($style->LABEL_UNDERLINE), "true") == 0 ? 'checked="checked"' : '' ?>><label><?=$underlineLocal?></label>
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <?=$labelColorLocal?><br>
            <span class="Swatch" id="labelFgSwatch" style="color: #<?= $style->LABEL_FORE_COLOR ?>; background-color: #<?= $style->LABEL_FORE_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_LABEL_FORE_COLOR,false,false)">
            <br><br>
        </td>
        <td width="50%" valign="top">
            <?=$backgroundLocal?><br>
            <span class="Swatch" id="labelBgSwatch" style="color: #<?= $style->LABEL_BACK_COLOR ?>; background-color: #<?= $style->LABEL_BACK_COLOR ?>">&nbsp;<?=$transparentLocal?>&nbsp;</span>&nbsp;&nbsp;
            <input class="Ctrl" type="button" value="..." style="width: 22px;" onClick="PickColor(SET_LABEL_BACK_COLOR,false,false)">
            <br>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <?=$labelBackgroundStyleLocal?><br>
            <select class="Ctrl" name="LABELBACKSTYLE" size="1">
                <option value="Ghosted" <?= strcmp($style->LABEL_BACK_STYLE, "Ghosted") == 0 ? 'selected="selected"' : '' ?>><?=$ghostedLocal?></option>
                <option value="Opaque" <?= strcmp($style->LABEL_BACK_STYLE, "Opaque") == 0 ? 'selected="selected"' : '' ?>><?=$opaqueLocal?></option>
                <option value="Transparent" <?= strcmp($style->LABEL_BACK_STYLE, "Transparent") == 0 ? 'selected="selected"' : '' ?>><?=$transparentLocal?></option>
            </select>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="right">
            <hr>
            <input class="Ctrl" name="" type="submit" value="OK" style="width:85px">
            <input class="Ctrl" type="button" value="Cancel" style="width:85px" onClick="return Cancel()">
        </td>
    </tr>

</table>

<input name="MARKERCOLOR" type="hidden" id="markerColor" value="<?= $style->MARKER_COLOR ?>">
<input name="LINECOLOR" type="hidden" id="lineColor" value="<?= $style->LINE_COLOR ?>">
<input name="FILLFORECOLOR" type="hidden" id="fillForeColor" value="<?= $style->FILL_FORE_COLOR ?>">
<input name="FILLBACKCOLOR" type="hidden" id="fillBackColor" value="<?= $style->FILL_BACK_COLOR ?>">
<input name="FILLBACKTRANS" type="hidden" id="fillBackTrans" value="<?= $style->FILL_BACK_TRANS ?>">
<input name="BORDERCOLOR" type="hidden" id="borderColor" value="<?= $style->BORDER_COLOR ?>">
<input name="LABELFORECOLOR" type="hidden" id="labelForeColor" value="<?= $style->LABEL_FORE_COLOR ?>">
<input name="LABELBACKCOLOR" type="hidden" id="labelBackColor" value="<?= $style->LABEL_BACK_COLOR ?>">

</form>

<?php } else { ?>

<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td class="Title">Error<hr></td></tr>
    <tr><td><?= $errorMsg ?></td></tr>
    <tr><td><?= $errorDetail ?></td></tr>
</table>

<?php } ?>

</body>

</html>
