<?php
/**
 * SearchPrompt
 *
 * $Id: SearchPrompt.php 2940 2016-05-04 16:54:12Z jng $
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }

    $locale = GetDefaultLocale();
    $popup = 0;
    $mapName = "";
    $sessionId = "";
    $widgetName = "";
    $pointZoomLevel = 500.0;

    GetRequestParameters();

    $templ = file_get_contents("./SearchPrompt.templ");
    SetLocalizedFilesPath(GetLocalizationPath());
    $templ = Localize($templ, $locale, GetClientOS());
    $vpath = GetSurroundVirtualPath();
    print sprintf($templ, $popup, $properties, $propNames, $title, $prompt, $target, $filter, $layer, $limit, $vpath."Search.php", $mapName, $sessionId, $locale, $pointZoomLevel);



function GetParameters($params)
{
    global $popup, $locale;
    global $mapName, $sessionId;
    global $title, $prompt, $target, $filter, $layer, $limit;
    global $propNames, $properties;
    global $pointZoomLevel;

    if(isset($params['locale'])) {
        $locale = $params['locale'];
    }
    $popup = $params['popup'];
    $mapName = $params['mapname'];
    $sessionId = $params['session'];
    $propNames = $params['propNames'];
    $properties = $params['properties'];
    $title = $params['title'];
    $prompt = $params['prompt'];
    $target = $params['target'];
    $filter = $params['filter'];
    $layer = $params['layer'];
    $limit = $params['limit'];
    if (isset($params['pointZoomLevel'])) {
        $pointZoomLevel = $params['pointZoomLevel'];
    }
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}

?>
