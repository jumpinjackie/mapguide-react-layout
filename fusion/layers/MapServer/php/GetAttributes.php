<?php
/**
 * GetAttributes
 *
 * $Id: GetAttributes.php 1972 2009-11-11 20:47:47Z pagameba $
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

/* set up the session */
include ("Common.php");
include('../../../common/php/Utilities.php');

//header('Content-type: application/json');
//header('X-JSON: true');

/* the name of the layer in the map to query */
if (isset($_REQUEST['layers']) && $_REQUEST['layers'] != '') {
    $layers = explode(',',$_REQUEST['layers']);
} else {
    $layers = array();
}

//echo "<!--";
//print_r($_REQUEST);
//echo "-->";

if (!isset($mapName)) {
    die('mapname not set');
}
if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
}

$bAllLayers = false;
$nLayers = count($layers);
if ($nLayers == 0) {
    $nLayers = $oMap->numlayers;
    $bAllLayers = true;
}

/*holds selection array*/
$properties = NULL;
$properties->layers = array();
    echo "/* nLayers: ".$nLayers." */";

for ($i=0; $i<$nLayers; $i++) {
    if (!$bAllLayers) {
        $oLayer = $oMap->GetLayerByName($layers[$i]);
    } else {
        $oLayer = $oMap->GetLayer($i);
    }
    
    $selectable = strtolower($oLayer->getMetaData('selectable'));
    if ( $selectable == 'true' ) {
       
       
      $oLayer->open();
      $layerName = $oLayer->name != "" ? $oLayer->name : "Layer_".$i; 
      echo "/* layername: ".$layerName." */";
      
      array_push($properties->layers, $layerName);
  
      $properties->$layerName->propertynames = array();
      $properties->$layerName->propertyvalues = array();
      $properties->$layerName->propertytypes = array();
  
      /*get first shape to get the attributes*/
      //$oRes = $oLayer->getResult(0);
      //$oShape = $oLayer->getShape($oRes->tileindex,$oRes->shapeindex);
      $oShape = $oLayer->getFeature(0);
      if ($oShape) {
        while ( list($key,$val) = each($oShape->values) ) {
                array_push($properties->$layerName->propertynames, $key);
                //TODO : we should define away to give alias to field names
                array_push($properties->$layerName->propertyvalues, $key);
                //TODO we do not know the types of the attributes in MS. Just output 0
                //we shouls possibly use OGR to get the attributes
                array_push($properties->$layerName->propertytypes, 0);
        }
      }
      
      $oLayer->close();
    }
/*
	if(isset($_SESSION['selection_array']->$layerName)){
		if(isset($_SESSION['selection_array']->$layerName->values)){
			$properties->$layerName->values = $_SESSION['selection_array']->$layerName->values;
		}
	}
*/
}

/*save selection in the session*/
//$_SESSION['selection_array'] = $properties; 

echo var2json($properties);

?>
