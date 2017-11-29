<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }

    $locale = GetDefaultLocale();
    $popup = "false";

    GetRequestParameters();

    $templ = file_get_contents("GoogleStreetView.templ");
    SetLocalizedFilesPath(GetLocalizationPath());
    $templ = Localize($templ, $locale, GetClientOS());

    print sprintf($templ, $popup);

function GetParameters($params)
{
    global $locale, $popup;

    $locale    = $params['locale'];
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