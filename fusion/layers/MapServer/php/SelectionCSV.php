<?php
/**
 * Selection
 *
 * $Id: Selection.php 1806 2009-03-04 20:38:53Z pdeschamps $
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

//next 3 lines required for this to work in IE
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header('Content-disposition: attachment; filename=selection.csv');
header('Content-type: text/csv');

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
}

$result = NULL;
$result->layers = array();

if (isset($_REQUEST['queryfile']) && $_REQUEST['queryfile'] != "")
{
    $oMap->loadquery($_REQUEST['queryfile']);


    if (isset($_SESSION['selection_array']))
    {
        //print_r($_SESSION['selection_array']);
        $bAllLayers = 1;
        $aLayers = array();
        if (isset($_REQUEST['layers']) && $_REQUEST['layers'] !='')
        {
            $aLayers = split(",", $_REQUEST['layers']);
            $bAllLayers = 0;
        }

        $properties = $_SESSION['selection_array'];
        $aSelectedLayers = $properties->layers;
        if (count($aSelectedLayers) > 0)
        {
            for ($i=0; $i<count($aSelectedLayers); $i++)
            {
                $layerName =  $aSelectedLayers[$i];
                echo "Layer: ".$layerName."\n";
                if (($bAllLayers || in_array($layerName, $aLayers)) &&
                    $properties->$layerName->numelements > 0)
                {
                    echo implode(",",$properties->$layerName->propertyvalues)."\n";
                    for ($j=0; $j<count($properties->$layerName->values); $j++)
                    {
                      echo implode(",",$properties->$layerName->values[$j])."\n";
                    }
                }
            }
        }
    }
}

?>
