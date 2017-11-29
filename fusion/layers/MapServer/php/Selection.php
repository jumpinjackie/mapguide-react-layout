<?php
/**
 * Selection
 *
 * $Id: Selection.php 2249 2010-10-19 14:31:05Z madair $
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
 * Purpose: Get all attribute informations for elements in the 
 * current selection
 *****************************************************************************/

/* set up the session */
include ("Common.php");
include('../../../common/php/Utilities.php');
include ("Utilities.php");

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
}

$result = NULL;
$result->layers = array();
$oMapProjection = $oMap->getProjection();



if ((isset($_REQUEST['queryfile']) && $_REQUEST['queryfile'] != "") ||
    isset($_SESSION['selection_array']))
  
{
    if (isset($_REQUEST['queryfile']) && $_REQUEST['queryfile'] != "")
      $oMap->loadquery($_REQUEST['queryfile']);


    if (isset($_SESSION['selection_array']))
    {
        //print_r($_SESSION['selection_array']);
        $bAllLayers = 1;
        $aLayers = array();
        if (isset($_REQUEST['layers']) && $_REQUEST['layers'] !='')
        {
            $aLayers = explode(",", $_REQUEST['layers']);
            $bAllLayers = 0;
        }

        $aStartCount = array();
        if (isset($_REQUEST['startcount']) && $_REQUEST['startcount'] !='')
        {
            $aStartCount =  explode(",", $_REQUEST['startcount']);
        }

        /* if number of layers and number of startcount should be the same */
        if ( count($aStartCount) > 0 && (count($aLayers) != count($aStartCount)))
        {
            echo "error : number of layers and number of startcount should be the same";
            exit;
        }

        $properties = $_SESSION['selection_array'];
        $aSelectedLayers = $properties->layers;
        if (count($aSelectedLayers) > 0)
        {
            $result->extents = NULL;
            $result->extents->minx = $properties->extents->minx;
            $result->extents->miny = $properties->extents->miny;
            $result->extents->maxx = $properties->extents->maxx;
            $result->extents->maxy = $properties->extents->maxy;

            for ($i=0; $i<count($aSelectedLayers); $i++)
            {
                $layerName =  $aSelectedLayers[$i];
                if (($bAllLayers || in_array($layerName, $aLayers)) &&
                    $properties->$layerName->numelements > 0)
                {
                    array_push($result->layers, $layerName);
                    $result->$layerName->propertynames = $properties->$layerName->propertynames;
                    $result->$layerName->propertyvalues = $properties->$layerName->propertyvalues;
                    $result->$layerName->propertytypes = $properties->$layerName->propertytypes;
                    $result->$layerName->metadatanames = $properties->$layerName->metadatanames;
                    $result->$layerName->bbox = getBBox($layerName);
                    /*if start and count are given, validate them. If valid return the valid elements.
                      if not return all elements. */

                    $start = -1;
                    $count = -1;
                    if (count($aStartCount) > 0)
                    {
                        for ($j=0; $j<count($aLayers); $j++)
                        {
                            if ($aLayers[$j] == $layerName)
                            {
                                $aIndiceCount = explode(':', $aStartCount[$j]);
                                if (count($aIndiceCount) == 2)
                                {
                                    $start = $aIndiceCount[0];
                                    $count = $aIndiceCount[1];
                                }
                                break;
                            }
                        }

                        /*invalid entries*/
                        if ($start < 0 || $count <=0 ||
                            $start >= $properties->$layerName->numelements ||
                            $count > $properties->$layerName->numelements ||
                            ($start + $count) > $properties->$layerName->numelements)
                        {
                            $start = -1;
                            $count = -1;
                        }
                    }

                    /* if invalid return all elements*/
                    if ($start < 0 || $count < 0)
                    {
                        $start =0;
                        $count = $properties->$layerName->numelements;
                    }
                    //print_r($properties->$layerName);
                    $result->$layerName->numelements = $count;

                    $result->$layerName->values = array();
                    $result->$layerName->metadata = array();
                    $iIndice = 0;

                    for ($j=$start; $j<($start+$count); $j++)
                    {
                        $szLayerProjection = getLayerProjection($oMap,$layerName);

                        $oLayerExtents = $result->$layerName->bbox;

                        if($szLayerProjection){
                            if($szLayerProjection != $oMapProjection){

                                $minx = $oLayerExtents->minx;
                                $miny =$oLayerExtents->miny;
                                $maxx = $oLayerExtents->maxx;
                                $maxy =$oLayerExtents->maxy;

                                reprojectPoint( &$minx, &$miny, $szLayerProjection, $oMapProjection );
                                reprojectPoint( &$maxx, &$maxy, $szLayerProjection, $oMapProjection );

                                $result->extents->minx = $minx;
                                $result->extents->miny = $miny;
                                $result->extents->maxx = $maxx;
                                $result->extents->maxy= $maxy;

                            }
                        }

                        $result->$layerName->values[$iIndice] = $properties->$layerName->values[$j];
                        $result->$layerName->metadata[$iIndice] = $properties->$layerName->metadata[$j];
                        $iIndice++;

                    }
                }
            }
        }
    }
}

header('Content-type: application/json');
header('X-JSON: true');
echo var2json($result);

function getBBox($layername){
    global $properties;
    foreach($properties->$layername->metadatanames as $key=>$value){
        if($value == "bbox"){
            $aBBox = explode(",",$properties->$layername->metadata[0][$key]);
            $oBBox->minx = $aBBox[0];
            $oBBox->miny = $aBBox[1];
            $oBBox->maxx = $aBBox[2];
            $oBBox->maxy= $aBBox[3];
            return $oBBox;
        }
    }
    return false;
}

function getLayerProjection($oMap,$szLayerName){
    $oLayer = &$oMap->getLayerByName($szLayerName);
    if($oLayer){
        $szProjection = $oLayer->getProjection();
        if($szProjection){
            return $szProjection;
        }
        else
        {
            return false;
        }
    }
    else
    {
    return false;
    }
}

function reprojectPoint( &$nX, &$nY, $szFrom, $szTo )
{
    //echo "reproject $nX,$nY from $szFrom to $szTo\n";

    //check to see if reprojection is necessary
    if ($szFrom == '' || $szTo == '')
    {
        return;
    }

    if (stristr($szFrom, "epsg") !== false &&
        stristr( $szFrom, "init=") == false)
    {
        $szFrom = "init=".strtolower($szFrom);
    }
    if (stristr($szTo, "epsg") !== false &&
        stristr( $szTo, "init=") == false)
    {
        $szTo = "init=".strtolower($szTo);
    }

    if ($szFrom == $szTo)
    {
        return;
    }

    $oPoint = ms_newPointObj();
    $oPoint->setXY( $nX, $nY );
    $oPoint->project( ms_newProjectionObj( $szFrom ),
                      ms_newProjectionObj( $szTo )
                       );
    $nX = $oPoint->x;
    $nY = $oPoint->y;
    //echo " :".$nX." ,".$nY."<br>";
}
?>
