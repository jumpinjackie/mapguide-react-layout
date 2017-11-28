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
include $fusionMGpath . 'Common.php';
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorHTML();
    exit;
}

    $locale = "en";
    $mapName = "";
    $sessionId = "";
    $isTitle = "";
    $isLegend = "";
    $isArrow = "";
    $title = "";
    $scale = "";
    $centerX = "";
    $centerY = "";
    $dpi = "";

    GetRequestParameters();

    $templ = file_get_contents("printablepage.templ");
    SetLocalizedFilesPath(GetLocalizationPath());
    $templ = Localize($templ, $locale, GetClientOS());
    $agent = GetRootVirtualFolder() . "/mapagent/mapagent.fcgi";
    print sprintf($templ,
                  $title,
                  $agent,
                  $scale,
                  $centerX,
                  $centerY,
                  $dpi,
                  $mapName,
                  $sessionId,
                  $locale,
                  $isTitle,
                  $isLegend,
                  $isArrow,
                  $isTitle == "1"? $title: "",
                  $agent,
                  $mapName,
                  $sessionId
                  );

function GetParameters($params)
{
    global $mapName, $sessionId, $title, $locale;
    global $scale, $centerX, $centerY, $dpi;
    global $isTitle, $isLegend, $isArrow;

    if(isset($params['LOCALE']))
        $locale = $params['LOCALE'];
    $mapName = $params['MAPNAME'];
    $sessionId = $params['SESSION'];
    $isTitle = $params['ISTITLE'];
    $isLegend = $params['ISLEGEND'];
    $isArrow = $params['ISARROW'];
    $title = array_key_exists('TITLE', $params) ? $params['TITLE'] : '';
    $scale = $params['SCALE'];
    $centerX = $params['CENTERX'];
    $centerY = $params['CENTERY'];
    $dpi = $params['DPI'];
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}

?>
