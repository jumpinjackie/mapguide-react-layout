<?php

    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    
    header('Content-type: application/json');
    header('X-JSON: true');
    
    global $initializationErrorMessage;
    if(InitializationErrorOccurred())
    {
        echo "{success: false, refreshMap: false, message:'".$initializationErrorMessage."'}";
        exit;
    }
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . 'JSON.php';
    require_once 'classes/defaultstyle.php';
    require_once 'classes/markupmanager.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    $errorMsg = null;
    $errorDetail = null;

    SetLocalizedFilesPath(GetLocalizationPath());
    if(isset($_REQUEST['LOCALE'])) {
        $locale = $_REQUEST['LOCALE'];
    } else {
        $locale = GetDefaultLocale();
    }

    $responseJson = null;
    try
    {
        $args["MARKUPNAME"] = array_key_exists("NEWLAYERNAME", $args) ? $args["NEWLAYERNAME"] : "RedlineLayer";
        
        $args["MARKERCOLOR"] = DefaultStyle::MARKER_COLOR;
        $args["MARKERTYPE"] = DefaultStyle::MARKER_TYPE;
        $args["MARKERSIZEUNITS"] = DefaultStyle::MARKER_SIZE_UNITS;
        $args["MARKERSIZE"] = DefaultStyle::MARKER_SIZE;
        $args["LINECOLOR"] = DefaultStyle::LINE_COLOR;
        $args["LINEPATTERN"] = DefaultStyle::LINE_PATTERN;
        $args["LINESIZEUNITS"] = DefaultStyle::LINE_SIZE_UNITS;
        $args["LINETHICKNESS"] = DefaultStyle::LINE_THICKNESS;
        $args["FILLPATTERN"] = DefaultStyle::FILL_PATTERN;
        $args["FILLTRANSPARENCY"] = DefaultStyle::FILL_TRANSPARENCY;
        $args["FILLFORECOLOR"] = DefaultStyle::FILL_FORE_COLOR;
        $args["FILLBACKCOLOR"] = DefaultStyle::FILL_BACK_COLOR;
        $args["FILLBACKTRANS"] = DefaultStyle::FILL_BACK_TRANS;
        $args["BORDERPATTERN"] = DefaultStyle::BORDER_PATTERN;
        $args["BORDERSIZEUNITS"] = DefaultStyle::BORDER_SIZE_UNITS;
        $args["BORDERCOLOR"] = DefaultStyle::BORDER_COLOR;
        $args["BORDERTHICKNESS"] = DefaultStyle::BORDER_THICKNESS;
        $args["LABELSIZEUNITS"] = DefaultStyle::LABEL_SIZE_UNITS;
        $args["LABELFONTSIZE"] = DefaultStyle::LABEL_FONT_SIZE;
        
        //Omission is considered false, which is the default. If you ever change
        //the default style values, uncomment the matching "true" values
        //$args["LABELBOLD"] = DefaultStyle::LABEL_BOLD;
        //$args["LABELITALIC"] = DefaultStyle::LABEL_ITALIC;
        //$args["LABELUNDERLINE"] = DefaultStyle::LABEL_UNDERLINE;
        
        $args["LABELFORECOLOR"] = DefaultStyle::LABEL_FORE_COLOR;
        $args["LABELBACKCOLOR"] = DefaultStyle::LABEL_BACK_COLOR;
        $args["LABELBACKSTYLE"] = DefaultStyle::LABEL_BACK_STYLE;
        
        $markupManager = new MarkupManager($args);
        $layerDef = $markupManager->CreateMarkup();
        
        $resId = new MgResourceIdentifier($layerDef);
        $layerName = $resId->GetName();
        $markupManager->SetArgument("MARKUPLAYER", $layerDef);
        $markupManager->OpenMarkup();
        $responseJson = "{ success: true, refreshMap: true, layerDefinition: '$layerDef', layerName: '$layerName' }";
    }
    catch (MgException $mge)
    {
        $errorMsg = $mge->GetExceptionMessage();
        $errorDetail = $mge->GetDetails();
        $stackTrace = $mge->GetStackTrace();
        $responseJson = "{success: false, refreshMap: false, message:'$errorMsg\nDetail: $errorDetail\nStack Trace: $stackTrace'}";
    }
    catch (Exception $e)
    {
        $errorMsg = $e->GetMessage();
        $responseJson = "{success: false, refreshMap: false, message:'$errorMsg'}";
    }
    
    $responseJson = str_replace("\n", "\\n", $responseJson);
    echo $responseJson;

?>