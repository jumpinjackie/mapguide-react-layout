<?php
/**
 * SetSelection
 *
 * $Id: SetSelection.php 1664 2008-11-12 21:41:00Z madair $
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

include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include('../../../common/php/Utilities.php');
include('Utilities.php');

    $selText = "";
    $getExtents = false;

    GetRequestParameters();

    try
    {
        //load the map runtime state
        //
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        // Create the selection set and save it
        $selection = new MgSelection($map);
        if($selText != "") {
            $selection->FromXml($selText);
        }
        $selection->Save($resourceService, $mapName);

        //now return a data struture which is the same as Query.php

        //process
        header('Content-type: application/json');
        header('X-JSON: true');
        $layers = $selection->GetLayers();

        $result = new stdClass();
        $result->hasSelection = false;
        if ($layers && $layers->GetCount() >= 0)
        {
            $result->hasSelection = true;
            $result->extents = new stdClass();
            if($getExtents)
            {
                $featureService = $siteConnection->CreateService(MgServiceType::FeatureService);
                $oExtents = $selection->GetExtents($featureService);
                if ($oExtents)
                {
                    $oMin = $oExtents->GetLowerLeftCoordinate();
                    $oMax = $oExtents->GetUpperRightCoordinate();
                    $result->extents->minx = $oMin->GetX();
                    $result->extents->miny = $oMin->GetY();
                    $result->extents->maxx = $oMax->GetX();
                    $result->extents->maxy = $oMax->GetY();
                }
            }
            $result->layers = array();
            for ($i=0; $i<$layers->GetCount(); $i++)
            {
                $layer = $layers->GetItem($i);
                $layerName = $layer->GetName();
                array_push($result->layers, $layerName);
                $layerClassName = $layer->GetFeatureClassName();
                $result->$layerName = new stdClass();
                $result->$layerName->featureCount = $selection->GetSelectedFeaturesCount($layer, $layerClassName);
            }
        }

        echo var2json($result);


    } catch(MgException $e) {
        echo "ERROR: " . $e->GetDetails() . "\n";
    }

function GetParameters($params)
{
    global $selText;
    global $getExtents;

    $selText = UnescapeMagicQuotes($params['selection']);
    $getExtents = ($params['getextents'] == "true") ? true : false;
}


function UnescapeMagicQuotes($str)
{
    if(ini_get("magic_quotes_sybase") == "1")
        return str_replace("''", "'", $str);
    else if(get_magic_quotes_gpc() == "1")
    {
        //Unescape double quotes
        $str = str_replace('\\"', '"', $str);

        //remove additional backslash
        return str_replace("\\", "", $str);
    }
    return $str;
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}
?>
