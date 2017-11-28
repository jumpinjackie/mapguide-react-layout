<?php
/**
 * Selection
 *
 * $Id: Selection.php 2847 2014-06-17 11:56:07Z jng $
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

include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include('../../../common/php/Utilities.php');
include('Utilities.php');

$result = new stdClass();
$result->layers = array();

if (isset($_SESSION['selection_array']))
{
    $bAllLayers = 1;
    $aLayers = array();
    if (isset($_REQUEST['layers']) && $_REQUEST['layers'] !='')
    {
      $aLayers = split(",", $_REQUEST['layers']);
      $bAllLayers = 0;
    }

    $aStartCount = array();
    if (isset($_REQUEST['startcount']) && $_REQUEST['startcount'] !='')
    {
        $aStartCount =  split(",", $_REQUEST['startcount']);
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
        $result->extents = new stdClass();
        $result->extents->minx = $properties->extents->minx;
        $result->extents->miny = $properties->extents->miny;
        $result->extents->maxx = $properties->extents->maxx;
        $result->extents->maxy = $properties->extents->maxy;

        for ($i=0; $i<count($aSelectedLayers); $i++)
        {
            $layerName =  $aSelectedLayers[$i];
            $layerNameInProperties = GetEncodedLayerName($layerName);
            if (($bAllLayers || in_array($layerName, $aLayers)) &&
                isset($properties->$layerNameInProperties) &&
                $properties->$layerNameInProperties->numelements > 0)
            {
                array_push($result->layers, $layerName);
                $result->$layerName = new stdClass();
                $result->$layerName->propertynames = $properties->$layerNameInProperties->propertynames;
                $result->$layerName->propertyvalues = $properties->$layerNameInProperties->propertyvalues;
                $result->$layerName->propertytypes = $properties->$layerNameInProperties->propertytypes;
                $result->$layerName->metadatanames = $properties->$layerNameInProperties->metadatanames;

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
                            $aIndiceCount = split(':', $aStartCount[$j]);
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
                        $start >= $properties->$layerNameInProperties->numelements ||
                        $count > $properties->$layerNameInProperties->numelements ||
                        ($start + $count) > $properties->$layerNameInProperties->numelements)
                    {
                        $start = -1;
                        $count = -1;
                    }
                }

                /* if invalid return all elements*/
                if ($start < 0 || $count < 0)
                {
                    $start =0;
                    $count = $properties->$layerNameInProperties->numelements;
                }
                //print_r($properties->$layerNameInProperties);
                $result->$layerName->numelements = $count;

                $result->$layerName->values = array();
                $result->$layerName->metadata = array();
                $iIndice = 0;
                for ($j=$start; $j<($start+$count); $j++)
                {
                    $result->$layerName->values[$iIndice] = $properties->$layerNameInProperties->values[$j];
                    $result->$layerName->metadata[$iIndice] = $properties->$layerNameInProperties->metadata[$j];
                    $iIndice++;
                }
            }
        }
    }
}


header('Content-type: application/json');
header('X-JSON: true');
echo var2json($result);


?>
