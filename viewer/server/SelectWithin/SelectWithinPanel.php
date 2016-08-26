<?php
/**
 * SelectWithinPanel
 *
 * $Id: SelectWithinPanel.php 2942 2016-05-04 17:36:08Z jng $
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
    $popup = "";
    $mapName = "";
    $sessionId = "";
    $bOmitInvisibleLayers = false;

    GetRequestParameters();

    $templ = file_get_contents("./SelectWithinPanel.templ");
    SetLocalizedFilesPath(GetLocalizationPath());
    $templ = Localize($templ, $locale, GetClientOS());
    print sprintf($templ, $popup, "./widgets/SelectWithin/SelectWithin.php", $mapName, $sessionId, ($bOmitInvisibleLayers ? "true" : "false"));


function GetParameters($params)
{
    global $mapName, $sessionId, $locale, $popup, $bOmitInvisibleLayers;

    if (isset($params['locale']))
        $locale = $params['locale'];
    $mapName = $params['mapname'];
    $sessionId = $params['session'];
    $popup = $params['popup'];
    if (isset($params['omit_invisible_layers']))
        $bOmitInvisibleLayers = ($params['omit_invisible_layers'] == "1");
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}
?>
