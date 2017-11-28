<?php
/**
 * Maptip
 *

 * Portions copyright (c) 2006, DM Solutions Group Inc.
 * Portions copyright (c) 2008, ENPLAN
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
 * Purpose: duplicate maptip functionality on mapserver
 *****************************************************************************/

/* set up the session */
include(dirname(__FILE__).'/../../../common/php/Utilities.php');
include(dirname(__FILE__).'/Common.php');
include(dirname(__FILE__).'/Utilities.php');



/* The Layer Name*/
if ($_REQUEST['layer'] != '') {
    $aLayer = split(",",$_REQUEST['layer']);
}

/* The Label*/
if ($_REQUEST['label'] != '') {
    $aLabel = split(",",$_REQUEST['label']);
}

/* The Feature Attribute Name used for the text of the map tip */
if ($_REQUEST['textfield'] != '') {
    $aMapTipTextField = split(",",$_REQUEST['textfield']);
}
/* The Feature Attribute Name used for the URL of the map tip */
if ($_REQUEST['customURL'] != '') {
    $aMapTipURL = split(",",$_REQUEST['customURL']);
}
/* The Map Name */
if ($_REQUEST['mapname'] != '') {
    $mapname = $_REQUEST['mapname'];
}
/* selection is intersects only */
$variant = 'intersects';

/* a spatial filter in the form on a WKT geometry */
$spatialFilter = (isset($_REQUEST['spatialfilter']) && $_REQUEST['spatialfilter'] != '') ? urldecode($_REQUEST['spatialfilter']) : false;


header('Content-type: application/json');
header('X-JSON: true');

if (!isset($mapName)) {
    die("{'error':'mapname not set'}");
}
if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);

    /* add the spatial filter if provided.  It is expected to come as a
    WKT string, so we need to convert it to a shape */
    if ($spatialFilter !== false ) {
        $oSpatialFilter = ms_shapeObjFromWkt($spatialFilter);
    }

    $aMapTips = array();
    $aURL = array();
    $aTipLabel = array();
    foreach($aLayer as $key=>$layer){
        if(isLayerVisible($layer) === TRUE){
            $oLayer = @$oMap->GetLayerByName($layer);

            // make sure the layer exists in the map.
            if(is_object($oLayer)){
                $oLayer->set('tolerance', 0);

                if ($oLayer->type ==  MS_LAYER_RASTER || $oLayer->type == MS_LAYER_QUERY ||
                        $oLayer->type ==  MS_LAYER_CIRCLE ||  $oLayer->type == MS_LAYER_CHART) {
                        die("{'error':'maptips are only valid for vector layers'}");
                    }


                if (@$oLayer->queryByShape($oSpatialFilter) == MS_SUCCESS) {

                    $oRes = $oLayer->getResult(0);
                    $oLayer->open();

                    $oShape = $oLayer->getShape($oRes->tileindex,$oRes->shapeindex);

                    $szMapTipText .= $oLayer->name." : ".$oShape->values[$aMapTipTextField[$key]].$szBreak;

                    $szLabels = $aLabel[$key];

                    $szMapTip  = $oShape->values[$aMapTipTextField[$key]];
                    $szURL = buildCustonUrl($oShape->values,$aMapTipURL[$key]);

                    $szMapTip = $szMapTip != "undefined" ? $szMapTip : "";
                    $szURL = $szURL != "undefined" ? $szURL : "";
                    $szLabels = $szLabels != "undefined" ? $szLabels : "";

                    array_push($aMapTips, $szMapTip);
                    array_push($aURL, $szURL);
                    array_push($aTipLabel,$szLabels);

                    $oLayer->close();
                }
            }
        }
    }
    echo "{'maptips':".var2json($aMapTips).",'url':".var2json($aURL).",'label':".var2json($aTipLabel).",'test':'casper'}";
}
else
{
echo "{'maptips':'','url':'','label':''}";
}

function isLayerVisible($szLayerName){
    $aVisLayers = split(",",$_POST["visLayers"]);
    foreach($aVisLayers as $item){
        if(trim($szLayerName) == trim($item)){
            return true;
        }
    }
    return false;
}

function buildCustonUrl($aValues,$url){

    if($url != ""){
        $pattern = "/\[(.+?)\]/";
        preg_match_all($pattern, $url, $values,PREG_PATTERN_ORDER);

        if(is_array($values[0])){
            foreach($values[0] as $key=>$item){
                $url = str_replace($item,$aValues[$values[1][$key]],$url);
            }
        }
        return $url;
    }
    else
    {
    return "";
    }
}

?>
