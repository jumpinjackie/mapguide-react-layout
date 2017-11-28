<?php
/**
 * Query
 *
 * $Id: Query.php 2399 2011-06-03 18:56:58Z madair $
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
include ("Utilities.php");
include('../../../common/php/Utilities.php');

header('Content-type: application/json');
header('X-JSON: true');

/* the name of the layer in the map to query */
if ($_REQUEST['layers'] != '') {
    $layers = explode(',',$_REQUEST['layers']);
} else {
    $layers = array();
}

//echo "<!--";
//print_r($_REQUEST);
//echo "-->";

/* selection variant if set */
$variant = 'intersects';
if (isset($_REQUEST['variant'])) {
    if (strcasecmp($_REQUEST['variant'],'contains') == 0) {
        $variant = 'contains';
    } else if (strcasecmp($_REQUEST['variant'],'inside') == 0) {
        $variant = 'inside';
    }
}
/* a filter expression to apply, in the form of an MapServer expression statement */
$filter = isset($_REQUEST['filter']) ? html_entity_decode(urldecode( $_REQUEST['filter'])) : false;
$filterItem = isset($_REQUEST['filterItem']) ? html_entity_decode(urldecode( $_REQUEST['filterItem'])) : false;
//echo "<!-- filter: $filter -->\n";
/* a spatial filter in the form on a WKT geometry */
$spatialFilter = (isset($_REQUEST['spatialfilter']) && $_REQUEST['spatialfilter'] != '') ? urldecode($_REQUEST['spatialfilter']) : false;
//echo "spatial filter is $spatialFilter<BR>";

if (!isset($mapName)) {
    die('mapname not set');
}
if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
}

//extension of query template changed as of v5.2.2
$msVersion = ms_GetVersion();
//MapServer version 5.0.2 OUTPUT=GIF OUTPUT=PNG OUTPUT=JPEG OUTPUT=WBMP OUTPUT=PDF OUTPUT=SWF OUTPUT=SVG SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=SOS_SERVER SUPPORTS=FASTCGI SUPPORTS=THREADS SUPPORTS=GEOS INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE
$versArray = explode(" ",$msVersion);
$versNumber = $versArray[2];
$versParts = explode(".", $versNumber);
$queryTemplate = "query.qy";
//convert to an integer value to make the comparison easier
$versValue = $versParts[0]*100 + $versParts[1]*10 + $versParts[2];
if ($versValue >= 522) {
  $queryTemplate = "query.qy";
}

/* add the spatial filter if provided.  It is expected to come as a
   WKT string, so we need to convert it to a shape */
if ($spatialFilter !== false ) {
    $oSpatialFilter = ms_shapeObjFromWkt($spatialFilter);
}

/* if extending the current selection */
$bExtendSelection = isset($_REQUEST['extendselection']) && strcasecmp($_REQUEST['extendselection'], 'true') == 0;
if ($bExtendSelection) {
    //TODO figure out how to load an existing selection here
    $oMap->loadquery(getSessionSavePath()."query.qy");
}

$bComputedProperties = isset($_REQUEST['computed']) && strcasecmp($_REQUEST['computed'], 'true') == 0; 
	
$bAllLayers = false;
$nLayers = count($layers);
$nSelections = 0;

$result = NULL;
$result->hasSelection = false;
$result->layers = array();

/* ==================================================================== */
/*      Get the list of raster layers that are on. We will use it       */
/*      when doing raster query. Turn them off here. Return them on     */
/*      before the raster query. bug #73                                 */
/* ==================================================================== */
$aRasterLayerIndiceOn = array();
$aRasterLayerIndiceDefault = array();

for ($i=0;  $i<$oMap->numlayers; $i++)
  {
    $oLayer = $oMap->GetLayer($i);        
    if($oLayer->type ==  MS_LAYER_RASTER)
      {
        if ($oLayer->status == MS_ON)
          array_push($aRasterLayerIndiceOn, $i);
        else if ($oLayer->status ==  MS_DEFAULT)
          array_push($aRasterLayerIndiceDefault, $i);

        $oLayer->set("status", MS_OFF);
      }
  }

if ($nLayers == 0) {
    $nLayers = $oMap->numlayers;
    $bAllLayers = true;
    
    if ($spatialFilter !== false ) {
      if (@$oMap->queryByShape($oSpatialFilter) == MS_SUCCESS) {
	  $result->hasSelection = true;
      }
    }
    
} else {
	for ($i=0; $i<$nLayers; $i++) {
	    if (!$bAllLayers) {
		$oLayer = $oMap->GetLayerByName($layers[$i]);
	    } else {
		$oLayer = $oMap->GetLayer($i);
	    }
	    $oLayer->set('tolerance', 0);
	    if ($oLayer->type ==  MS_LAYER_RASTER || $oLayer->type == MS_LAYER_QUERY ||
		$oLayer->type ==  MS_LAYER_CIRCLE ||  $oLayer->type == MS_LAYER_CHART) {
		continue;            
	    }
	    if ($spatialFilter !== false ) {
	      if (@$oLayer->queryByShape($oSpatialFilter) == MS_SUCCESS) {
		  $result->hasSelection = true;
		  $layerName = $oLayer->name;
		  array_push($result->layers, $layerName);
		  $result->$layerName->featureCount = $oLayer->getNumResults();
		  //TODO: dump out the extents of the selection
	      }
	    }
	    if ($filter !== false ) {
	      if ($oLayer->connectiontype == MS_POSTGIS && $filterItem != '') {
		$f = $filter;
		$filter = $filterItem . ' IN (' . $filter . ')';
	      }
	      if (@$oLayer->queryByAttributes($filterItem,$filter,MS_MULTIPLE) == MS_SUCCESS) {
	      //if (@$oLayer->queryByAttributes($filterItem,'([REG_CODE] eq 61)',MS_MULTIPLE) == MS_SUCCESS) {
	      //if (@$oLayer->queryByAttributes('NAME_E','/.*Buffalo.*/gi',MS_MULTIPLE) == MS_SUCCESS) {
		  $result->hasSelection = true;
		  $layerName = $oLayer->name;
		  array_push($result->layers, $layerName);
		  $result->$layerName->featureCount = $oLayer->getNumResults();
		  //TODO: dump out the extents of the selection
	      }
	      if ($oLayer->connectiontype == MS_POSTGIS && $filterItem != '') {
		$filter = $f;
	      }
	    }
	
	    if ($bExtendSelection) {
	    } else {
	    }
	}
}
if ($bExtendSelection) {
}

/************************************************************************/
/*         Save the query file here before doing any raster queries     */
/************************************************************************/
if ($result->hasSelection) {
    $oMap->savequery(getSessionSavePath()."query.qy");
    $result->queryFile = getSessionSavePath()."query.qy";
 }

/* ==================================================================== */
/*      resttoe raster layer status #73                                 */
/* ==================================================================== */
for ($i=0; $i<count($aRasterLayerIndiceOn); $i++)
  {
    $oLayer = $oMap->getlayer($aRasterLayerIndiceOn[$i]);
    $oLayer->set("status", MS_ON);
  }

for ($i=0; $i<count($aRasterLayerIndiceDefault); $i++)
  {
    $oLayer = $oMap->getlayer($aRasterLayerIndiceDefault[$i]);
    $oLayer->set("status", MS_DEFAULT);
  }


/*raster query: limit the result to 100 if it is not already set in the map file*/
for ($i=0; $i<$nLayers; $i++) {
    if (!$bAllLayers) {
        $oLayer = $oMap->GetLayerByName($layers[$i]);
    } else {
        $oLayer = $oMap->GetLayer($i);
    }
    $oLayer->set('tolerance', 0);
    if ($oLayer->type != MS_LAYER_RASTER) {
        continue;
    }
    

    $aProcessings = $oLayer->getprocessing();

    $nCount = count($aProcessings);
    $bRasterMaxSet = 0;
    for ($j=0;$j<$nCount; $j++)
    {
        $aKeyVal = explode("=", $aProcessings[$j]);
        if (count($aKeyVal) == 2 && 
            strcasecmp(trim($aKeyVal[0]), "RASTER_QUERY_MAX_RESULT") == 0)
        {
            $bRasterMaxSet = 1;
            break;
        }
    }

    if (!$bRasterMaxSet) {
      $oLayer->setprocessing("RASTER_QUERY_MAX_RESULT=100");
    }

    /*are we doing a point query? In that case maxfeatures was set to 1*/
    /*this is not ideal but It is better to use querybypoint when we do point query and
      a query by shape when we do other type of queries*/
    if (isset($_REQUEST['maxfeatures']) && $_REQUEST['maxfeatures'] == '1')
    {
        $oCenterPoint = ms_newpointobj();
        $oPoint = $oSpatialFilter->getCentroid();
        $status = @$oLayer->queryByPoint($oPoint, MS_SINGLE, -1);
    }
    else {
      $status = @$oLayer->queryByShape($oSpatialFilter);
    }

    if ($status == MS_SUCCESS) {
        $result->hasSelection = true;
        $layerName = $oLayer->name;
        array_push($result->layers, $layerName);
        $result->$layerName->featureCount = $oLayer->getNumResults();
        //TODO: dump out the extents of the selection
    }

    if ($bExtendSelection) {
    } else {
    }
}

if ($result->hasSelection) {
    /*holds selection array*/
    $properties = NULL;
    $properties->layers = array();

    $totalminx = 0;
    $totalminy = 0;
    $totalmaxx = 0;
    $totalmaxy = 0;
    
    $bFirstElement = 1;
    $nLayers = $oMap->numlayers;
    for ($i=0; $i<$nLayers; $i++) { 
        $oLayer = $oMap->GetLayer($i);
        $numResults = $oLayer->getNumResults();
        if ($numResults == 0){
          continue;
        }
        $oLayer->open();
        $layerName = $oLayer->name != "" ? $oLayer->name : "Layer_".$i; 
        
        array_push($properties->layers, $layerName);
        $properties->$layerName->numelements = $numResults;

        $properties->$layerName->propertynames = array();
        $properties->$layerName->propertyvalues = array();
        $properties->$layerName->propertytypes = array();
        $properties->$layerName->values = array();
        $aQueryItems = array();
        
        $properties->$layerName->metadatanames= array();
        array_push($properties->$layerName->metadatanames, 'dimension');
        array_push($properties->$layerName->metadatanames, 'bbox');
        array_push($properties->$layerName->metadatanames, 'center');
        array_push($properties->$layerName->metadatanames, 'area');
        array_push($properties->$layerName->metadatanames, 'length');

        /*get first shape to get the attributes*/
        $oRes = $oLayer->getResult(0);
        $oShape = $oLayer->getShape($oRes->tileindex,$oRes->shapeindex);
        $selFields = array();
        
        if (isset($_SESSION[$mapName][$layerName]['query_items'])) {
            $aQueryItems = $_SESSION[$mapName][$layerName]['query_items'];
        } else {
            //token separator (for parsing displayed attributes on a query)
            $tokenSeparator = ","; 
            // checking if metadata "query_include_items" is set
            $metadataItems = $oLayer->getMetaData('query_include_items');
            if ( ($metadataItems == "") || ($metadataItems == "all") ) {
                while ( list($key,$val) = each($oShape->values) ) {
                    $aQueryItems[$key]  = NULL;
                }
            } else {
              $token = strtok($metadataItems, $tokenSeparator);
              while ($token !== false) {
                  $aQueryItems[trim($token)] = NULL;
                  $token = strtok($tokenSeparator);
              }
            }

            // checking if metadata "query_exclude_items" is set
            $metadataItems = $oLayer->getMetaData('query_exclude_items');
            if ($metadataItems != "") {
                $token = strtok($metadataItems, $tokenSeparator);
                while ($token !== false) {
                    if (array_key_exists($token, $aQueryItems)) {
                        unset($aQueryItems[$token]);
                    }
                    $token = strtok($tokenSeparator);
                }
            }
            
            // get all alias
            while ( list($key,$val) = each($aQueryItems) ) {
                $keyAlias = $oLayer->getMetaData("query_".$key."_alias");
                trim($keyAlias);
                if ($keyAlias != "") {
                    $aQueryItems[$key] = $keyAlias;
                }
            }
            $_SESSION[$mapName][$layerName]['query_items'] = $aQueryItems;
        }
        
        $oShape = $oLayer->getShape($oRes->tileindex,$oRes->shapeindex);
        while ( list($key,$val) = each($oShape->values) ) {
            if (array_key_exists($key, $aQueryItems)) {
                array_push($selFields, $key);

                //we check if an alias if provided
                if (isset($aQueryItems[$key]) && ($aQueryItems[$key] != "")){
                    $key = $aQueryItems[$key];
                }

                array_push($properties->$layerName->propertynames, $key);
                //TODO : we should define away to give alias to field names
                array_push($properties->$layerName->propertyvalues, $key);

                //TODO we do not know the types of the attributes in MS. Just output 0
                //we shouls possibly use OGR to get the attributes
                array_push($properties->$layerName->propertytypes, 0);
            }
        }
        
        for ($iRes=0; $iRes < $numResults; $iRes++) {
            $properties->$layerName->values[$iRes] = array();
            $properties->$layerName->metadata[$iRes] = array();

            $oRes = $oLayer->getResult($iRes);
            $oShape = $oLayer->getShape($oRes->tileindex,$oRes->shapeindex);
            //TODO : area, length and distance are not set
            $minx =  $oShape->bounds->minx;
            $miny =  $oShape->bounds->miny;
            $maxx =  $oShape->bounds->maxx;
            $maxy =  $oShape->bounds->maxy;

            if ($bFirstElement) {
                $bFirstElement = 0;
                $totalminx =  $minx;
                $totalminy =  $miny;
                $totalmaxx =  $maxx;
                $totalmaxy =  $maxy;
            } else {
                if ($totalminx > $minx) {
                    $totalminx = $minx;
                }
                if ($totalminy > $miny) {
                    $totalminy = $miny;
                }
                if ($totalmaxx < $maxx) {
                    $totalmaxx = $maxx;
                }
                if ($totalmaxy < $maxy) {
                    $totalmaxy = $maxy;
                }
            }

            //metadata : TODO dimension, area, length and distance are not set
            $dimension = 0;
            $center = 0;
            $area = 0;
            $length = 0;
            $bbox = $minx.','.$miny.','.$maxx.','.$maxy;

            array_push($properties->$layerName->metadata[$iRes], $dimension);
            array_push($properties->$layerName->metadata[$iRes], $bbox);
            array_push($properties->$layerName->metadata[$iRes], $center);
            array_push($properties->$layerName->metadata[$iRes], $area);
            array_push($properties->$layerName->metadata[$iRes], $length);

            //field values
            for($iField=0; $iField < count($selFields); $iField++) {
                $value = $oShape->values[$selFields[$iField]];
                //$value = preg_replace( "/\r?\n/", "<br>", $value );
                $value = str_replace("'", "\'", $value);
                array_push($properties->$layerName->values[$iRes], $value);
            }
        }

        $oLayer->close();
    }

    //extents
    $properties->extents = NULL;
    $properties->extents->minx = $totalminx;
    $properties->extents->miny = $totalminy;
    $properties->extents->maxx = $totalmaxx;
    $properties->extents->maxy = $totalmaxy;

    /*save selection in the session*/
    $_SESSION['selection_array'] = $properties; 
}

echo var2json($result);

?>
