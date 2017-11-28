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

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

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

    try
    {
        $uploadTitleLocal = GetLocalizedString('REDLINEUPLOAD', $locale );
        $uploadFileLocal = GetLocalizedString('REDLINEDATAFILE', $locale );
        $uploadNoteLocal = GetLocalizedString('REDLINEUPLOADNOTE', $locale );
        $uploadLocal = GetLocalizedString('REDLINEUPLOADTEXT', $locale );
        $uploadFileRequiredLocal = GetLocalizedString('REDLINEUPLOADREQUIRED', $locale);
        $closeLocal = GetLocalizedString('REDLINEUPLOADCLOSE', $locale );
    }
    catch (MgException $e)
    {
        $errorMsg = $e->GetMessage();
        $errorDetail = $e->GetDetails();
    }
?>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title><?=$uploadTitleLocal?></title>
    <link rel="stylesheet" href="Redline.css" type="text/css">
    <script language="javascript" src="../../layers/MapGuide/MapGuideViewerApi.js"></script>
    <script language="javascript" src="../../common/browserdetect.js"></script>
    <script language="javascript">
        var session = '<?= $args['SESSION'] ?>';
        var mapName = '<?= $args['MAPNAME'] ?>';
        
        function CheckFileName()
        {
            if (document.getElementById("uploadFile").value.length > 0)
                return true;
                
            alert("<?= $uploadFileRequiredLocal ?>");
            return false;
        }
        
        function CloseUpload()
        {
            var uploadForm = document.getElementById("uploadForm");
            document.getElementById("cmdType").value = "";
            uploadForm.action = "markupmain.php";
            
            uploadForm.submit();
        }
    </script>
</head>

<body marginwidth=5 marginheight=5 leftmargin=5 topmargin=5 bottommargin=5 rightmargin=5>

<?php if ($errorMsg == null) { ?>

<form action="markupmain.php" method="post" enctype="multipart/form-data" id="uploadForm" target="_self">
<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
<table class="RegText" border="0" cellspacing="0" width="100%">
    <tr>
        <td colspan="2" class="Title"><?= $uploadTitleLocal ?><hr></td>
    </tr>
    <tr>
        <td colspan="2" class="SubTitle"><?= $uploadFileLocal ?></td>
    </tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" id="uploadFile" name="UPLOADFILE" type="file" style="width:100%"><br></td>
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr>
        <td colspan="2">
            <input class="Ctrl" name="" type="submit" onClick="return CheckFileName()" value="<?=$uploadLocal?>" style="width:85px">
            <input class="Ctrl" name="" type="button" onClick="CloseUpload()" value="<?=$closeLocal?>" style="width:85px">
            <input type="hidden" name="MARKUPCOMMAND" id="cmdType" value="<?= MarkupCommand::Upload ?>" />
            <input type="hidden" name="MAPNAME" id="MAPNAME" value="<?= $args["MAPNAME"] ?>" />
            <input type="hidden" name="SESSION" id="SESSION" value="<?= $args["SESSION"] ?>" />
            <?php if ($defaultFormat != null && $defaultGeomType != null) { ?>
            <input name="REDLINEFORMAT" type="hidden" value="<?= $defaultFormat ?>" />
            <input name="REDLINEGEOMTYPE" type="hidden" value="<?= $defaultGeomType ?>" />
            <?php } ?>
            <input name="REDLINESTYLIZATION" type="hidden" value="<?= $args['REDLINESTYLIZATION'] ?>">
        </td>
    </tr>
    <tr><td colspan="2" height="2px"></td></tr>
    <tr><td colspan="2"><strong><?= $uploadNoteLocal ?></strong></td></tr>
</table>
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
