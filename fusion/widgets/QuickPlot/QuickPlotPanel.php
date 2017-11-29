<?php

    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';

    $locale = GetDefaultLocale();
    $popup = 0;
    $mapName = "";
    $sessionId = "";
    $us = "";
    $popup = "false";
    
    GetRequestParameters();

    $templ = file_get_contents("QuickPlotPanel.templ");
    SetLocalizedFilesPath(GetLocalizationPath());
    $templ = Localize($templ, $locale, GetClientOS());

    $jsPath = "";
    print sprintf($templ, $popup, $jsPath);

function GetParameters($params)
{
    global $mapName, $sessionId, $popup, $us, $locale, $popup;

    $locale    = $params['locale'];
    $mapName   = $params['mapname'];
    $sessionId = $params['session'];
    $popup     = $params['popup'];
    $us        = array_key_exists("us", $params) ? $params['us'] : "";
    $popup     = $params['popup'];
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}

?>
