<?php
/**
 * Query
 *
 * $Id: SetLayers.php 2847 2014-06-17 11:56:07Z jng $
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

/*****************************************************************************
 * Purpose: create a new selection based on one or more attribute filters and
 *          a spatial filter
 *****************************************************************************/


header('Content-type: application/json');
header('X-JSON: true');
echo "{";

try {
    /* set up the session */
    include ("Common.php");
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorText();
        exit;
    }
    include('../../../common/php/Utilities.php');
    include('Utilities.php');

    /* the name of the layer in the map to query */
    if ($_REQUEST['layerindex'] != '') {
        $layers = explode(',',$_REQUEST['layerindex']);
    } else {
        $layers = array();
    }

    /* open the map from the session using the provided map name.  The map was
       previously created by calling LoadMap. */
    $map = new MgMap($siteConnection);
    $map->Open($mapName);
    $mapLayers = $map->GetLayers();


    $nIndex = count($layers);
    $nLayers = $mapLayers->GetCount();
    for ($i=0; $i<$nLayers; $i++) {
        if ($layers[$i] == $i) {
            continue;
        }
        $found = -1;
        for ($j=$i+1; $j<$nIndex; ++$j) {
            if ($layers[$j] == $i) {
                $found = $j;
                break;
            }
        }
        if ($found >= 0) {
            $layerToMove = $mapLayers->GetItem($i);
            //$layerDef = $layerToMove->GetLayerDefinition();
            //$mapLayers->Insert($found, new MgLayerBase($layerDef,$resourceService));
            $mapLayers->RemoveAt($i);
            $mapLayers->Insert($found, $layerToMove);
        } else {
            $mapLayers->RemoveAt($i);
        }
        break;
    }
    /*
    $nLayers = count($layers);
    $layerDefs = array();
    for ($i=0; $i<$nLayers; $i++) {
        $layer = $mapLayers->GetItem($layers[$i]);
        array_push($layerDefs, $layer->GetLayerDefinition() );
    }
    $mapLayers->Clear();

    $nLayers = count($layerDefs);
    for ($i=0; $i<$nLayers; $i++) {
        $layer = new MgLayer(new MgResourceIdentifier($layerDefs[$i]), $resourceService);
        $mapLayers->Add($layer);
    }
    */

    $map->Save();
    echo "success: true";
}
catch (MgException $e)
{
  echo "ERROR: '" . $e->GetExceptionMessage() . "\n";
  echo $e->GetDetails() . "\n";
  echo $e->GetStackTrace() . "',\n";
  echo "success: false, layerindex: [".$_REQUEST['layerindex']."]";
}

echo "}";
?>
