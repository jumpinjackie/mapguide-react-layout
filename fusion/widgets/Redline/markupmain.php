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
    require_once 'classes/defaultstyle.php';
    require_once 'classes/markupmanager.php';
    require_once 'classes/markupcommand.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    $refreshMap = false;
    $errorMsg = null;
    $errorDetail = null;
    
    $defaultCmd = null;
    $defaultFormat = null;
    $defaultGeomType = null;
    $createOnStartup = false;

    if (array_key_exists("AUTOCREATE", $args)) {
        $createOnStartup = ($args["AUTOCREATE"] == "1");
    }

    if (array_key_exists("REDLINEFORMAT", $args) && array_key_exists("REDLINEGEOMTYPE", $args)) {
        if (strcmp($args["REDLINEFORMAT"], "SDF") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultCmd = MarkupCommand::CreateSdf;
            $defaultGeomType = $args["REDLINEGEOMTYPE"];
        } else if (strcmp($args["REDLINEFORMAT"], "SHP") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultCmd = MarkupCommand::CreateShp;
            $defaultGeomType = $args["REDLINEGEOMTYPE"];
        } else if (strcmp($args["REDLINEFORMAT"], "SQLite") == 0) {
            $defaultFormat = $args["REDLINEFORMAT"];
            $defaultCmd = MarkupCommand::CreateSqlite;
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
        $markupManager = new MarkupManager($args);

        if (array_key_exists('MARKUPCOMMAND', $args))
        {
            $cmd = $args['MARKUPCOMMAND'];
            switch ($cmd) {
            case MarkupCommand::EditStyle:
                $markupManager->CreateMarkup();
                $refreshMap = true;
                break;
            case MarkupCommand::Open:
                $markupManager->OpenMarkup();
                $refreshMap = true;
                break;
            case MarkupCommand::Delete:
                $markupManager->DeleteMarkup();
                break;
            case MarkupCommand::Refresh:
                break;
            case MarkupCommand::Close:
                $markupManager->CloseMarkup();
                $refreshMap = true;
                break;
            case MarkupCommand::Upload:
                $markupManager->UploadMarkup();
                $refreshMap = true;
                break;
            case MarkupCommand::Download:
                $markupManager->DownloadMarkup();
                break;
            case MarkupCommand::DownloadDataFromLayer:
                //The opened markup layer is the one we want to download
                $markupManager->SetArgument("MARKUPLAYER", $args["OPENMARKUP"]);
                $markupManager->DownloadMarkup();
                break;
            case MarkupCommand::DownloadLayerKml:
                //The opened markup layer is the one we want to download
                $markupManager->SetArgument("MARKUPLAYER", $args["OPENMARKUP"]);
                $markupManager->DownloadMarkupAsKml(false);
                break;
            case MarkupCommand::DownloadLayerKmz:
                //The opened markup layer is the one we want to download
                $markupManager->SetArgument("MARKUPLAYER", $args["OPENMARKUP"]);
                $markupManager->DownloadMarkupAsKml(true);
                break;
            }
        }

        $availableMarkup = $markupManager->GetAvailableMarkup();
        $openMarkup = $markupManager->GetOpenMarkup();

        // Remove open markup from the list of available markup.

        $availableMarkup = array_diff($availableMarkup, $openMarkup);

        $manageLocal = GetLocalizedString('REDLINEMANAGE', $locale );
        $availableLayersLocal = GetLocalizedString('REDLINEAVAILABLELAYERS', $locale );
        $loadedLayersLocal = GetLocalizedString('REDLINELOADEDLAYERS', $locale );
        $newSdfLocal = GetLocalizedString('REDLINENEWSDF', $locale );
        $newShpLocal = GetLocalizedString('REDLINENEWSHP', $locale );
        $newSqliteLocal = GetLocalizedString('REDLINENEWSQLITE', $locale );
        $addToMapLocal = GetLocalizedString('REDLINEADDTOMAP', $locale );
        $deleteLocal = GetLocalizedString('REDLINEDELETE', $locale );
        $refreshLocal = GetLocalizedString('REDLINEREFRESH', $locale );
        $addEditLocal = GetLocalizedString('REDLINEEDIT', $locale );
        $removeFromMapLocal = GetLocalizedString('REDLINEREMOVEFROMMAP', $locale );
        $downloadLocal = GetLocalizedString('REDLINEDOWNLOAD', $locale );
        $downloadNativeLocal = GetLocalizedString('REDLINEDOWNLOADNATIVE', $locale );
        $uploadLocal = GetLocalizedString('REDLINEUPLOAD', $locale );
        $editStyleLocal = GetLocalizedString('REDLINEEDITSTYLE', $locale );
        $redlineCreateFailureLocal = GetLocalizedString('REDLINECREATEFAILURE', $locale );
        $redlineLayerNameLocal = GetLocalizedString('REDLINENAME', $locale);
        $newRedlineLayerLocal = GetLocalizedString("REDLINECREATENEW", $locale);
        $pointLocal = GetLocalizedString("REDLINEPOINT", $locale);
        $lineLocal = GetLocalizedString("REDLINELINE", $locale);
        $polyLocal = GetLocalizedString("REDLINEPOLY", $locale);
        $otherOptionsLocal = GetLocalizedString("REDLINEOTHEROPTIONS", $locale);
        $downloadOptionsLocal = GetLocalizedString("REDLINEDOWNLOADOPTIONS", $locale);
        $downloadKmlLocal = GetLocalizedString("REDLINEDOWNLOADKML", $locale);
        $downloadKmzLocal = GetLocalizedString("REDLINEDOWNLOADKMZ", $locale);
    }
    catch (MgException $mge)
    {
        $errorMsg = $mge->GetExceptionMessage();
        $errorDetail = $mge->GetDetails();
        //die("MG ERROR: " . $errorMsg.$errorDetail."\n".$mge->GetStackTrace());
    }
    catch (Exception $e)
    {
        $errorMsg = $e->GetMessage();
        //die("PHP ERROR: " . $errorMsg);
    }
?>
<html>
<head>
    <title>Manage Markups</title>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
<?php if ($errorMsg == null) { ?>
    <link rel="stylesheet" href="Redline.css" type="text/css">
    <script language="javascript" src="../../layers/MapGuide/MapGuideViewerApi.js"></script>
    <script language="javascript" src="../../common/browserdetect.js"></script>
    <script language="javascript">
        var session = '<?= $args['SESSION'] ?>';
        var mapName = '<?= $args['MAPNAME'] ?>';

        var GEOM_POINT  = <?= MgFeatureGeometricType::Point ?>;
        var GEOM_LINE  = <?= MgFeatureGeometricType::Curve ?>;
        var GEOM_POLY  = <?= MgFeatureGeometricType::Surface ?>;

        var CMD_NEW_SDF	= <?= MarkupCommand::CreateSdf ?>;
        var CMD_NEW_SHP = <?= MarkupCommand::CreateShp ?>;
        var CMD_NEW_SQLITE = <?= MarkupCommand::CreateSqlite ?>;
        var CMD_OPEN	= <?= MarkupCommand::Open ?>;
        var CMD_DELETE	= <?= MarkupCommand::Delete ?>;
        var CMD_REFRESH	= <?= MarkupCommand::Refresh ?>;
        var CMD_EDIT	= <?= MarkupCommand::Edit ?>;
        var CMD_CLOSE	= <?= MarkupCommand::Close ?>;
        var CMD_DOWNLOAD = <?= MarkupCommand::Download ?>;
        var CMD_UPLOAD = <?= MarkupCommand::Upload ?>;
        var CMD_EDITSTYLE = <?= MarkupCommand::EditStyle ?>;
        var CMD_DOWNLOAD_LAYER_DATA = <?= MarkupCommand::DownloadDataFromLayer ?>;
        var CMD_DOWNLOAD_KML = <?= MarkupCommand::DownloadLayerKml ?>;
        var CMD_DOWNLOAD_KMZ = <?= MarkupCommand::DownloadLayerKmz ?>;

        function GetGeometryTypes()
        {
        <?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
            return <?= $defaultGeomType ?>;
        <?php } else { ?>
            var geomType = 0;
            var bPoint = document.getElementById("chkPoint").checked;
            var bLine = document.getElementById("chkLine").checked;
            var bPoly = document.getElementById("chkPoly").checked;

            if (bPoint)
                geomType |= GEOM_POINT;
            if (bLine)
                geomType |= GEOM_LINE;
            if (bPoly)
                geomType |= GEOM_POLY;

            return geomType;
        <?php } ?>
        }

        function GetFdoProvider(cmd)
        {
            if (cmd == CMD_NEW_SHP)
                return "OSGeo.SHP";
            else if (cmd == CMD_NEW_SQLITE)
                return "OSGeo.SQLite";
            else
                return "OSGeo.SDF";
        }

        function SubmitCreateCommand(cmd, geomTypes)
        {
            var commandInput = document.getElementById("commandInput");
            commandInput.value = cmd;
            
            if (typeof(geomTypes) == 'undefined') {
                geomTypes = GetGeometryTypes();
            }

            var markupForm = document.getElementById("markupForm");
            
            var widget = Fusion.getWidgetsByType("Redline")[0];
            if (widget.autogenerateLayerNames) {
                Fusion.ajaxRequest("widgets/Redline/newmarkup.php", {
                    onSuccess: OpenLayers.Function.bind(OnMarkupCreated, this),
                    onFailure: OpenLayers.Function.bind(OnMarkupCreateFailure, this),
                    parameters: {
                        SESSION: session,
                        MAPNAME: mapName,
                        MARKUPFDOPROVIDER: GetFdoProvider(cmd),
                        MARKUPGEOMTYPE: geomTypes,
                        REDLINESTYLIZATION: "<?= $args['REDLINESTYLIZATION'] ?>"
                    }
                });
            } else {
                var name = prompt("<?= $redlineLayerNameLocal ?>");
                Fusion.ajaxRequest("widgets/Redline/newmarkup.php", {
                    onSuccess: OpenLayers.Function.bind(OnMarkupCreated, this),
                    onFailure: OpenLayers.Function.bind(OnMarkupCreateFailure, this),
                    parameters: {
                        SESSION: session,
                        MAPNAME: mapName,
                        NEWLAYERNAME: name,
                        MARKUPFDOPROVIDER: GetFdoProvider(cmd),
                        MARKUPGEOMTYPE: geomTypes,
                        REDLINESTYLIZATION: "<?= $args['REDLINESTYLIZATION'] ?>"
                    }
                });
            }
        }
        
        function SubmitCommand(cmd)
        {
            var commandInput = document.getElementById("commandInput");
            commandInput.value = cmd;
            
            if (cmd == CMD_EDIT) {
                markupForm.action = "editmarkup.php";
            } else if (cmd == CMD_UPLOAD) {
                markupForm.action = "uploadmarkup.php";
            } else if (cmd == CMD_EDITSTYLE) {
                markupForm.action = "editmarkupstyle.php";
            }
            else {
                markupForm.action = "markupmain.php";
            }
            markupForm.submit();
        }

        function OnMarkupCreated(response)
        {
            eval("var o = " + response.responseText);
            if (!o.success) {
                var msg = "Error \n" + o.message;
                alert(msg);
            }
            else {
                //Add to markup layers on map
                var layers = document.getElementById("openMarkup");
                var opt = new Option();
                opt.selected = true;
                opt.text = o.layerName;
                opt.value = o.layerDefinition;
                layers.options[layers.options.length] = opt;
                var map = parent.Fusion.getMapByName(mapName);
                map.reloadMap();
                //Go straight to edit mode
                SubmitCommand(CMD_EDIT);
            }
        }

        function OnMarkupCreateFailure()
        {
            alert("Failed to create redline");
        }

        function OnAvailableMarkupChange()
        {
            var availableSelect = document.getElementById("availableMarkup");
            var openBtn = document.getElementById("openBtn");
            var deleteBtn = document.getElementById("deleteBtn");
            var downloadBtn = document.getElementById("downloadBtn");

            if (availableSelect.selectedIndex >= 0)
            {
                openBtn.disabled = false;
                deleteBtn.disabled = false;
                downloadBtn.disabled = false;

                document.getElementById("markupLayerName").value = availableSelect.options[availableSelect.selectedIndex].text;
            }
            else
            {
                openBtn.disabled = true;
                deleteBtn.disabled = true;
                downloadBtn.disabled = true;
            }
        }

        function OnOpenMarkupChange()
        {
            var openSelect = document.getElementById("openMarkup");
            var editBtn = document.getElementById("editBtn");
            var closeBtn = document.getElementById("closeBtn");
            var editStyleBtn = document.getElementById("editStyleBtn");
            var downloadDataBtn = document.getElementById("downloadDataBtn");
            var downloadKmlBtn = document.getElementById("downloadKmlBtn");
            var downloadKmzBtn = document.getElementById("downloadKmzBtn");

            if (openSelect.options.length > 0 && openSelect.selectedIndex >= 0)
            {
                editBtn.disabled = false;
                closeBtn.disabled = false;
                editStyleBtn.disabled = false;
                downloadDataBtn.disabled = false;
                downloadKmlBtn.disabled = false;
                downloadKmzBtn.disabled = false;
            }
            else
            {
                editBtn.disabled = true;
                closeBtn.disabled = true;
                editStyleBtn.disabled = true;
                downloadDataBtn.disabled = true;
                downloadKmlBtn.disabled = true;
                downloadKmzBtn.disabled = true;
            }

            if (openSelect.options.length > 0) {
                var selOpt = openSelect.options[openSelect.selectedIndex];
                document.getElementById("editMarkupLayerId").value = selOpt.value;
                document.getElementById("markupLayerName").value = selOpt.text;
            } else {
                document.getElementById("editMarkupLayerId").value = "";
            }
        }

        function CheckApplicableProviders()
        {
        <?php if ($defaultFormat == null || $defaultGeomType == null) { ?>
            var gt = GetGeometryTypes();
            document.getElementById("newShpBtn").disabled = (gt != GEOM_POINT && gt != GEOM_LINE && gt != GEOM_POLY);
            document.getElementById("newSdfBtn").disabled = (gt == 0);
            document.getElementById("newSqliteBtn").disabled = (gt == 0);
        <?php } ?>
        }

        function OnLoad()
        {
            OnAvailableMarkupChange();
            OnOpenMarkupChange();
            CheckApplicableProviders();

        <?php if ($refreshMap) { ?>
            var map = parent.Fusion.getMapByName(mapName);
            map.reloadMap();
        <?php } ?>
        
        <?php if ($defaultFormat != null && $defaultGeomType != null && $createOnStartup == true) { ?>
            SubmitCreateCommand(<?= $defaultCmd ?>, <?= $defaultGeomType ?>);
        <?php } ?>
        }
    </script>

</head>

<body onLoad="OnLoad()" marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>

<form action="" method="post" enctype="application/x-www-form-urlencoded" id="markupForm" target="_self">
<table class="RegText" border="0" cellspacing="0" width="100%">
    <tr><td class="Title"><?=$manageLocal?><hr></td></tr>
    <tr><td class="SubTitle"><?=$newRedlineLayerLocal?></td></tr>
    <?php if ($defaultCmd != null && $defaultGeomType != null) { ?>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="newBtn" onClick="SubmitCreateCommand(<?= $defaultCmd ?>, <?= $defaultGeomType ?>)" value="<?= $newRedlineLayerLocal ?>" />
        </td>
    </tr>
    <?php } else { ?>
    <tr>
        <td>
            <?=$pointLocal?> <input class="Ctrl" type="checkbox" id="chkPoint" onClick="CheckApplicableProviders()" checked="checked" />
            <?=$lineLocal?> <input class="Ctrl" type="checkbox" id="chkLine" onClick="CheckApplicableProviders()" checked="checked" />
            <?=$polyLocal?> <input class="Ctrl" type="checkbox" id="chkPoly" onClick="CheckApplicableProviders()" checked="checked" />
        </td>
    </tr>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="newSdfBtn" onClick="SubmitCreateCommand(CMD_NEW_SDF)" value="<?=$newSdfLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="newShpBtn" onClick="SubmitCreateCommand(CMD_NEW_SHP)" value="<?=$newShpLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="newSqliteBtn" onClick="SubmitCreateCommand(CMD_NEW_SQLITE)" value="<?=$newSqliteLocal?>" style="width:95px">
        </td>
    </tr>
    <?php } ?>
    <tr><td class="SubTitle"><?=$availableLayersLocal?></td></tr>
    <tr>
        <td class="RegText">
            <select name="MARKUPLAYER" size="7" class="Ctrl" id="availableMarkup" onChange="OnAvailableMarkupChange()" style="width: 100%">
                <?php
                    $selected = 'selected';
                    foreach($availableMarkup as $markupResId => $markupName) {
                ?>
                <option value="<?= $markupResId ?>" <?=$selected ?> ><?= $markupName ?></option>
                <?php
                        $selected = '';
                    }
                ?>
            </select>
        </td>
    </tr>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="openBtn" onClick="SubmitCommand(CMD_OPEN)" value="<?=$addToMapLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="deleteBtn" onClick="SubmitCommand(CMD_DELETE)" value="<?=$deleteLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="downloadBtn" onClick="SubmitCommand(CMD_DOWNLOAD)" value="<?=$downloadLocal?>" style="width:95px">
            <br/><br/>
        </td>
    </tr>
    <tr><td class="SubTitle"><?=$otherOptionsLocal?></td></tr>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="refreshBtn" onClick="SubmitCommand(CMD_REFRESH)" value="<?=$refreshLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="uploadBtn" onClick="SubmitCommand(CMD_UPLOAD)" value="<?=$uploadLocal?>" style="width:95px">
        </td>
    </tr>
    <tr><td class="SubTitle"><?=$loadedLayersLocal?></td></tr>
    <tr>
        <td class="RegText">
            <select name="OPENMARKUP" size="7" class="Ctrl" id="openMarkup" onChange="OnOpenMarkupChange()" style="width: 100%">
                <?php
                    $selected = 'selected';
                    foreach($openMarkup as $markupLayer => $markupName) {
                ?>
                <option value="<?= $markupLayer ?>" <?=$selected ?> ><?= $markupName ?></option>
                <?php
                        $selected = '';
                    }
                ?>
            </select>
        </td>
    </tr>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="editBtn" onClick="SubmitCommand(CMD_EDIT)" value="<?=$addEditLocal?>" style="width:125px">
            <input class="Ctrl" type="button" id="closeBtn" onClick="SubmitCommand(CMD_CLOSE)" value="<?=$removeFromMapLocal?>" style="width:125px">
            <input class="Ctrl" type="button" id="editStyleBtn" onClick="SubmitCommand(CMD_EDITSTYLE)" value="<?=$editStyleLocal?>" style="width:125px">
            <br><br>
        </td>
    </tr>
    <tr><td class="SubTitle"><?=$downloadOptionsLocal?></td></tr>
    <tr>
        <td>
            <input class="Ctrl" type="button" id="downloadDataBtn" onClick="SubmitCommand(CMD_DOWNLOAD_LAYER_DATA)" value="<?=$downloadNativeLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="downloadKmlBtn" onClick="SubmitCommand(CMD_DOWNLOAD_KML)" value="<?=$downloadKmlLocal?>" style="width:95px">
            <input class="Ctrl" type="button" id="downloadKmzBtn" onClick="SubmitCommand(CMD_DOWNLOAD_KMZ)" value="<?=$downloadKmzLocal?>" style="width:95px">
        </td>
    </tr>
</table>
<input name="SESSION" type="hidden" value="<?= $args['SESSION'] ?>">
<input name="MAPNAME" type="hidden" value="<?= $args['MAPNAME'] ?>">
<input name="MARKUPCOMMAND" type="hidden" value="" id="commandInput">
<input name="EDITMARKUPLAYER" type="hidden" value="" id="editMarkupLayerId">
<input name="MARKUPLAYERNAME" type="hidden" value="" id="markupLayerName">
<?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
<input name="REDLINEFORMAT" type="hidden" value="<?= $defaultFormat ?>" />
<input name="REDLINEGEOMTYPE" type="hidden" value="<?= $defaultGeomType ?>" />
<?php } ?>
<input name="REDLINESTYLIZATION" type="hidden" value="<?= $args['REDLINESTYLIZATION'] ?>" />
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
