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
    require_once 'classes/markupeditor.php';
    require_once 'classes/editcommand.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    $refreshMap = false;
    $errorMsg = null;
    $errorDetail = null;
    $allowPoint = false;
    $allowLine = false;
    $allowPoly = false;
    $markupFeatures = array();
    
    $defaultFormat = null;
    $defaultGeomType = null;
    $checkState = "";

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

    try
    {
        $markupEditor = new MarkupEditor($args);
        if (array_key_exists('EDITCOMMAND', $args))
        {
            $cmd = $args['EDITCOMMAND'];
            switch ($cmd) {
            case EditCommand::AddPoint:
                $markupEditor->AddPoint();
                $refreshMap = true;
                break;
            case EditCommand::AddLine:
            case EditCommand::AddLineString:
                $markupEditor->AddLineString();
                $refreshMap = true;
                break;
            case EditCommand::AddCircle:
            case EditCommand::AddRectangle:
            case EditCommand::AddPolygon:
                $markupEditor->AddPolygon();
                $refreshMap = true;
                break;
            case EditCommand::Delete:
                $markupEditor->DeleteMarkup();
                $refreshMap = true;
                break;
            case EditCommand::Update:
                $markupEditor->UpdateMarkup();
                $refreshMap = true;
                break;

            }
        }

        $markupFeatures = $markupEditor->GetMarkupFeatures();
        $clsDef = $markupEditor->GetClassDefinition();
        $clsProps = $clsDef->GetProperties();
        if ($clsProps->IndexOf($clsDef->GetDefaultGeometryPropertyName()) >= 0)
        {
            $geomProp = $clsProps->GetItem($clsDef->GetDefaultGeometryPropertyName());
            $geomTypes = $geomProp->GetGeometryTypes();

            if ($geomTypes & MgFeatureGeometricType::Point)
                $allowPoint = true;
            if ($geomTypes & MgFeatureGeometricType::Curve)
                $allowLine = true;
            if ($geomTypes & MgFeatureGeometricType::Surface)
                $allowPoly = true;
        }

        $editLocal = GetLocalizedString('REDLINEEDIT', $locale );
        $defaultHelpLocal = GetLocalizedString('REDLINEEDITDEFAULTHELP', $locale );
        $pointHelpLocal = GetLocalizedString('REDLINEEDITPOINTHELP', $locale );
        $lineHelpLocal = GetLocalizedString('REDLINEEDITLINEHELP', $locale );
        $lineStringHelpLocal = GetLocalizedString('REDLINEEDITLINESTRINGHELP', $locale );
        $rectangleHelpLocal = GetLocalizedString('REDLINEEDITRECTANGLEHELP', $locale );
        $polygonHelpLocal = GetLocalizedString('REDLINEEDITPOLYGONHELP', $locale );
        $circleHelpLocal = GetLocalizedString('REDLINEEDITCIRCLEHELP', $locale );
        $addLocal = GetLocalizedString('REDLINEADD', $locale );
        $digitizeLocal = GetLocalizedString('REDLINEDIGITIZE', $locale );
        $pointLocal = GetLocalizedString('REDLINEOBJECTPOINT', $locale );
        $circleLocal = GetLocalizedString('REDLINEOBJECTCIRCLE', $locale );
        $lineLocal = GetLocalizedString('REDLINEOBJECTLINE', $locale );
        $lineStringLocal = GetLocalizedString('REDLINEOBJECTLINESTRING', $locale );
        $rectangleLocal = GetLocalizedString('REDLINEOBJECTRECTANGLE', $locale );
        $polygonLocal = GetLocalizedString('REDLINEOBJECTPOLYGON', $locale );
        $modifyLocal = GetLocalizedString('REDLINEMODIFY', $locale );
        $selectLocal = GetLocalizedString('REDLINESELECTOBJECT', $locale );
        $deleteLocal = GetLocalizedString('REDLINEDELETEOBJECT', $locale );
        $updateLocal = GetLocalizedString('REDLINEUPDATETEXT', $locale );
        $closeLocal = GetLocalizedString('REDLINEEDITCLOSE', $locale );
        $promptLabelLocal = GetLocalizedString('REDLINEPROMPTLABEL', $locale);
        $promptRedlineLabelsLocal = GetLocalizedString('REDLINEPROMPTFORLABELS', $locale);
        $noTextLocal = GetLocalizedString('REDLINENOTEXT', $locale);
        $multiHelpLocal = GetLocalizedString('REDLINEMULTISELECTHELP', $locale);
        
        if (array_key_exists("REDLINEPROMPT", $args) && strcmp($args["REDLINEPROMPT"], "on") == 0) {
            $checkState = " checked='checked'";
        }
    }
    catch (MgException $e)
    {
        $errorMsg = $e->GetExceptionMessage();
        $errorDetail = $e->GetDetails();
    }
    catch (Exception $e)
    {
        $errorMsg = $e->getMessage();
        $errorDetail = $e->__toString();
    }
?>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
<?php if ($errorMsg == null) { ?>
    <title><?=$editLocal?></title>
    <link rel="stylesheet" href="Redline.css" type="text/css">
    <script language="javascript" src="../../layers/MapGuide/MapGuideViewerApi.js"></script>
    <script language="javascript" src="../../common/browserdetect.js"></script>
    <script language="javascript">
        var session = '<?= $args['SESSION'] ?>';
        var mapName = '<?= $args['MAPNAME'] ?>';

        var CMD_ADD_POINT		= <?= EditCommand::AddPoint ?>;
        var CMD_ADD_LINE 		= <?= EditCommand::AddLine ?>;
        var CMD_ADD_LINESTRING 	= <?= EditCommand::AddLineString ?>;
        var CMD_ADD_RECTANGLE 	= <?= EditCommand::AddRectangle ?>;
        var CMD_ADD_POLYGON 	= <?= EditCommand::AddPolygon ?>;
        var CMD_ADD_CIRCLE      = <?= EditCommand::AddCircle ?>;
        var CMD_DELETE 			= <?= EditCommand::Delete ?>;
        var CMD_UPDATE 			= <?= EditCommand::Update ?>;

        var EDIT_DEFAULT_HELP = "<?=$defaultHelpLocal?>";
        var EDIT_POINT_HELP = "<?=$pointHelpLocal?>";
        var EDIT_LINE_HELP = "<?=$lineHelpLocal?>";
        var EDIT_LINESTRING_HELP = "<?=$lineStringHelpLocal?>";
        var EDIT_RECTANGLE_HELP = "<?=$rectangleHelpLocal?>";
        var EDIT_POLYGON_HELP = "<?=$polygonHelpLocal?>";
        var EDIT_CIRCLE_HELP = "<?=$circleHelpLocal?>";

        function SetDigitizeInfo(text)
        {
            var digitizeInfo = document.getElementById("digitizeInfo");
            digitizeInfo.innerHTML = text;
            var widget = Fusion.getWidgetsByType("Redline")[0];
            if (widget.mapMessagePrompt) {
                var map = Fusion.getMapByName(mapName).mapWidget;
                var msg = map.message;
                //It's a digitization prompt
                if (text != EDIT_DEFAULT_HELP) {
                    msg.info(text + ' <a id="abortDigitizationLink" href="javascript:void(0)">' + OpenLayers.i18n("stop") + '</a>');
                    var link = msg.container.ownerDocument.getElementById("abortDigitizationLink");
                    //Wire the anchor click
                    link.onclick = function() {
                        msg.clear();
                        PromptAndSetMarkupText();
                    };
                } else {
                    msg.info(text);
                }
            }
        }

        function SubmitCommand(cmd)
        {
            var commandInput = document.getElementById("commandInput");
            commandInput.value = cmd;

            var editForm = document.getElementById("editForm");
            editForm.submit();
        }

        function AddPoint()
        {
            SetDigitizeInfo(EDIT_POINT_HELP);
            DigitizePoint(OnPointDigitized);
        }
        
        function AddCircle()
        {
            SetDigitizeInfo(EDIT_CIRCLE_HELP);
            DigitizeCircle(OnCircleDigitized);
        }

        function AddLine()
        {
            SetDigitizeInfo(EDIT_LINE_HELP);
            DigitizeLine(OnLineStringDigitized);
        }

        function AddLineString()
        {
            SetDigitizeInfo(EDIT_LINESTRING_HELP);
            DigitizeLineString(OnLineStringDigitized);
        }

        function AddRectangle()
        {
            SetDigitizeInfo(EDIT_RECTANGLE_HELP);
            DigitizeRectangle(OnRectangleDigitized);
        }

        function AddPolygon()
        {
            SetDigitizeInfo(EDIT_POLYGON_HELP);
            DigitizePolygon(OnPolyonDigitized);
        }
        
        function PromptForRedlineLabels()
        {
            return document.getElementById("chkPromptForRedlineLabels").checked;
        }

        function PromptAndSetMarkupText()
        {
            var widget = Fusion.getWidgetsByType("Redline")[0];
            if (PromptForRedlineLabels()) {
                var textInput = document.getElementById("textInput");

                textLabel = window.prompt("<?=$promptLabelLocal?>", "");
                textInput.value = (textLabel != null) ? textLabel : "";
            }
            ClearDigitization(true);
        }

        function OnPointDigitized(point)
        {
            PromptAndSetMarkupText();

            var geometryInput = document.getElementById("geometryInput");
            geometryInput.value = point.X + "," + point.Y;

            SubmitCommand(CMD_ADD_POINT);
        }
        
        function OnCircleDigitized(circle)
        {
            PromptAndSetMarkupText();
            var geometryInput = document.getElementById("geometryInput");
            var x = circle.Center.X;
            var y = circle.Center.Y;
            var r = circle.Radius;
            
            var coords = [];
            for (var index = 0; index < 2 * simulateCircleHalfPointNumber + 1; index++) {
                coords.push(x + r * simulateCirclePoints[2 * index]);
                coords.push(y + r * simulateCirclePoints[2 * index + 1]);
            }
            geometryInput.value = (coords.length / 2) + "," + coords.join(",");
            SubmitCommand(CMD_ADD_CIRCLE);
        }

        function OnLineStringDigitized(lineString)
        {
            PromptAndSetMarkupText();

            var geomText = lineString.Count;
            for (var i = 0; i < lineString.Count; i++)
            {
                geomText += "," + lineString.Point(i).X + "," + lineString.Point(i).Y;
            }

            var geometryInput = document.getElementById("geometryInput");
            geometryInput.value = geomText;

            SubmitCommand(CMD_ADD_LINESTRING);
        }

        function OnRectangleDigitized(rectangle)
        {
            PromptAndSetMarkupText();

            var geometryInput = document.getElementById("geometryInput");
            geometryInput.value = "5,"
                + rectangle.Point1.X + "," + rectangle.Point1.Y + ","
                + rectangle.Point2.X + "," + rectangle.Point1.Y + ","
                + rectangle.Point2.X + "," + rectangle.Point2.Y + ","
                + rectangle.Point1.X + "," + rectangle.Point2.Y + ","
                + rectangle.Point1.X + "," + rectangle.Point1.Y;

            SubmitCommand(CMD_ADD_RECTANGLE);
        }

        function OnPolyonDigitized(polygon)
        {
            if(polygon.Count < 3)
            {
                // invalid polygon
                ClearDigitization(true);

                return;
            }

            PromptAndSetMarkupText();

            var geomText = polygon.Count;
            for (var i = 0; i < polygon.Count; i++)
            {
                geomText += "," + polygon.Point(i).X + "," + polygon.Point(i).Y;
            }

            var geometryInput = document.getElementById("geometryInput");
            geometryInput.value = geomText;

            SubmitCommand(CMD_ADD_POLYGON);
        }

        function TrimString(str)
        {
            return (typeof String.prototype.trim == 'undefined') ? str.replace(/^\s+|\s+$/g, '') : str.trim();
        }

        function GetSelectedMarkupIds(mkEl)
        {
            var ids = [];
            for (var i = 0; i < mkEl.options.length; i++) {
                if (mkEl.options[i].selected) {
                    ids.push(mkEl.options[i].value);
                }
            }
            return ids;
        }

        function SelectMarkup()
        {
            markupFeatures = document.getElementById("markupFeatures");
            var featIds = GetSelectedMarkupIds(markupFeatures);
            reqParams = "MAPNAME=" + encodeURIComponent(mapName);
            reqParams += "&SESSION=" + encodeURIComponent(session);
            reqParams += "&OPENMARKUP=" + encodeURIComponent('<?= $args['OPENMARKUP']; ?>');
            //reqParams += "&MARKUPFEATURE=" + markupFeatures.value;
            for (var i = 0; i < featIds.length; i++) {
                reqParams += "&MARKUPFEATURE[]=" + featIds[i];
            }

            if(msie)
                reqHandler = new ActiveXObject("Microsoft.XMLHTTP");
            else
                reqHandler = new XMLHttpRequest();

            reqHandler.open("POST", "getselectionxml.php", false);
            reqHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            reqHandler.send(reqParams);
            if(reqHandler.responseXML)
            {
                SetSelectionXML(reqHandler.responseText, true /*bDoNotZoom*/);
            }
        }

        function DeleteMarkup()
        {
            SubmitCommand(CMD_DELETE);
        }

        function UpdateMarkup()
        {
            SubmitCommand(CMD_UPDATE);
        }

        function CloseEditor()
        {
            ClearDigitization(true);
            var map = Fusion.getMapByName(mapName).mapWidget;
            map.message.clear();

            var editForm = document.getElementById("editForm");
            editForm.action = "markupmain.php";

            editForm.submit();
        }

        function OnMarkupFeatureChange()
        {
            var markupFeatures = document.getElementById("markupFeatures");
            var updateTextInput = document.getElementById("updateTextInput");
            var selectBtn = document.getElementById("selectBtn");
            var deleteBtn = document.getElementById("deleteBtn");
            var updateBtn = document.getElementById("updateBtn");

            if (markupFeatures.selectedIndex >= 0)
            {
                value = markupFeatures.options[markupFeatures.selectedIndex].text;
                if (value.indexOf('[<?= $noTextLocal ?>]') < 0) {
                    var tokens = value.split(":");
                    if (tokens.length == 2) {
                        updateTextInput.value = TrimString(tokens[1]);
                    } else {
                        updateTextInput.value = value;
                    }
                } else {
                    updateTextInput.value = '';
                }

                selectBtn.disabled = false;
                deleteBtn.disabled = false;
                updateBtn.disabled = false;
            }
            else
            {
                updateTextInput.value = '';
                selectBtn.disabled = true;
                deleteBtn.disabled = true;
                updateBtn.disabled = true;
            }
        }

        function OnLoad()
        {
            OnMarkupFeatureChange();

        <?php if ($refreshMap) { ?>
            var map = parent.Fusion.getMapByName(mapName);
            map.drawMap();
        <?php } ?>
            SetDigitizeInfo(EDIT_DEFAULT_HELP);
        }
        
        function OnUnload()
        {
            ClearDigitization(true);
            var map = Fusion.getMapByName(mapName).mapWidget;
            map.message.clear();
        }
    </script>
</head>

<body onLoad="OnLoad()" onUnload="OnUnload()" marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>
<form action="editmarkup.php" method="post" enctype="application/x-www-form-urlencoded" id="editForm" target="_self">
<table class="RegText" border="0" cellspacing="0" width="100%">
    <tr>
        <td colspan="2" class="Title"><?= $editLocal ?> - <?= $markupEditor->GetMarkupName() ?><hr></td>
    </tr>

    <tr>
        <td colspan="2" class="SubTitle"><?= $addLocal ?></td>
    </tr>
    <tr>
        <td colspan="2"><?=$digitizeLocal?></td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" id="pointBtn" type="button" onClick="AddPoint()" value="<?=$pointLocal?>" style="width:85px" <?= $allowPoint ? '' : 'disabled="disabled"' ?> />
            <input class="Ctrl" id="circleBtn" type="button" onClick="AddCircle()" value="<?=$circleLocal?>" style="width:85px" <?= $allowPoly ? '' : 'disabled="disabled"' ?> />
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" id="lineBtn" type="button" onClick="AddLine()" value="<?=$lineLocal?>" style="width:85px" <?= $allowLine ? '' : 'disabled="disabled"'  ?> />
            <input class="Ctrl" id="lineStringBtn" type="button" onClick="AddLineString()" value="<?=$lineStringLocal?>" style="width:85px" <?= $allowLine ? '' : 'disabled="disabled"'  ?> />
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" id="rectangleBtn" type="button" onClick="AddRectangle()" value="<?=$rectangleLocal?>" style="width:85px" <?= $allowPoly ? '' : 'disabled="disabled"'  ?> />
            <input class="Ctrl" id="polygonBtn" type="button" onClick="AddPolygon()" value="<?=$polygonLocal?>" style="width:85px" <?= $allowPoly ? '' : 'disabled="disabled"'  ?> />
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td colspan="2">
            <input type="checkbox" class="Ctrl" id="chkPromptForRedlineLabels" name="REDLINEPROMPT" <?= $checkState ?> /> <?= $promptRedlineLabelsLocal ?>
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td class="InfoText" colspan="2" id="digitizeInfo"></td>
    </tr>
    <tr><td colspan="2"></td></tr>
    <tr>
        <td colspan="2" class="SubTitle"><?=$modifyLocal?></td>
    </tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" name="UPDATETEXT" type="text" id="updateTextInput" maxlength="255" style="width:100%"><br></td>
        </td>
    </tr>
    <tr>
        <td class="RegText">
            <select name="MARKUPFEATURE[]" size="15" class="Ctrl" id="markupFeatures" onChange="OnMarkupFeatureChange()" multiple="multiple" style="width: 100%">
                <?php
                    $selected = 'selected';
                    foreach($markupFeatures as $markupId => $markupText) {
                ?>
                <option value="<?= $markupId ?>" <?=$selected ?> ><?= (strlen($markupText) > 0) ? "$markupId: ".htmlentities($markupText, ENT_COMPAT, 'UTF-8') : "$markupId: [$noTextLocal]" ?></option>
                <?php
                        $selected = '';
                    }
                ?>
            </select>
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td class="InfoText" colspan="2"><?= $multiHelpLocal ?></td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" id="selectBtn" type="button" onClick="SelectMarkup()" value="<?=$selectLocal?>" style="width:85px">
            <input class="Ctrl" id="deleteBtn" type="button" onClick="DeleteMarkup()" value="<?=$deleteLocal?>" style="width:85px">
            <input class="Ctrl" id="updateBtn" type="button" onClick="UpdateMarkup()" value="<?=$updateLocal?>" style="width:85px">
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>

    <tr>
        <td colspan="2" align="right">
            <hr>
            <input class="Ctrl" name="" type="button" onClick="CloseEditor()" value="<?=$closeLocal?>" style="width:85px">
        </td>
    </tr>

</table>
<input name="SESSION" type="hidden" value="<?= $args['SESSION'] ?>">
<input name="MAPNAME" type="hidden" value="<?= $args['MAPNAME'] ?>">
<input name="OPENMARKUP" type="hidden" value="<?= $args['OPENMARKUP'] ?>">
<input name="EDITCOMMAND" type="hidden" value="" id="commandInput">
<input name="GEOMETRY" type="hidden" value="" id="geometryInput">
<input name="TEXT" type="hidden" value="" id="textInput">
<?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
<input name="REDLINEFORMAT" type="hidden" value="<?= $defaultFormat ?>" />
<input name="REDLINEGEOMTYPE" type="hidden" value="<?= $defaultGeomType ?>" />
<?php } ?>
<input name="REDLINESTYLIZATION" type="hidden" value="<?= $args['REDLINESTYLIZATION'] ?>">
</form>
<?php } else { ?>
</head>
<body>
<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td class="Title">Error<hr></td></tr>
    <tr><td><?= $errorMsg ?></td></tr>
    <tr><td><?= $errorDetail ?></td></tr>
</table>

<?php } ?>

</body>

</html>
