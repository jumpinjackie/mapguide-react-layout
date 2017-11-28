<?php

include "../../layers/MapServer/php/Common.php";
include "../../common/php/Utilities.php";

isset($_GET["wmsservicetitle"])?$gwmsServiceTitle = $_GET["wmsservicetitle"] : $wmsservicetitle = NULL;


if (!isset($mapName)) {
    die('mapname not set');
}

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    
     switch($_REQUEST["action"]){
        case "listLayersWMS":{
            $szObject = getLayerListFromWMS($_REQUEST["server"]);
            break;
        }
        case "addLayer":{
            $szObject = addLayer($_REQUEST["value"]);
            break;
        }    
    }

$szJsonData =  var2json($szObject);

header('Content-type: text/plain');
header('X-JSON: true');
echo $szJsonData;

}

function getLayerListFromWMS($szServerName){
    include ('wms-parser.php');
    global $gszWMSServerName;
    global $gwmsServiceTitle;
    
    // add serverName as a global
    $gszWMSServerName = $szServerName;
    
    //$wmsServer = "http://atlas.gc.ca/cgi-bin/atlaswms_en?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS";
    $join = strpos($szServerName,'?')?'&':'?';
    $getCapRequest = $join."VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS";
    //$xmlData = readData($gszWMSServerName.$getCapRequest);
    //echo "issuing request -:".$gszWMSServerName.$getCapRequest;
    $xmlData = file_get_contents($gszWMSServerName.$getCapRequest);
    //echo $xmlData;
    
    if ($xmlData) {
      //check that it is a valid WMS capabiltities response
      $check = stripos($xmlData, 'WMT_MS_Capabilities');

      if ($check !== false) {
        $xmlParse = simplexml_load_string($xmlData);
        if ($xmlParse) {
          $gwmsServiceTitle = $xmlParse->Service->Title;
          $szGetCapabilities = new CapabilitiesParser();
          $szGetCapabilities->parse($xmlData);
          $szGetCapabilities->free_parser();
          $oReturn = prepareWMS($szGetCapabilities);
        } else {
          $oReturn->error = 'Error with GetCapabilities request: '.$gszWMSServerName.$getCapRequest;
          $oReturn->message = 'Response is not valid XML: \n'.$xmlData;
        }
      } else {
        $oReturn->error = 'Error with GetCapabilities request: '.$gszWMSServerName.$getCapRequest;
        $oReturn->message = 'Response is not a WMS capabilities document: \n'.$xmlData;
      }
    } else {
      $oReturn->error = 'Error with GetCapabilities request: '.$gszWMSServerName.$getCapRequest;
      $oReturn->message = 'No response from server';
    }
    
    return $oReturn;
}

function prepareWMS($szObj){
    global $gszWMSServerName;
    global $gwmsServiceTitle;
    $nCount=0;

      //print_r($szObj);
    foreach($szObj->layers as $key=>$value){
      if ( isset($value["Name"]) && $value["layer_id"]>0 ) {
        $oTmp = NULL;
        $oTmp->layertype     = 'wms';

        $oTmp->wmsservicetitle = strval($gwmsServiceTitle[0]);
        $oTmp->name         = $value["Name"];
        $oTmp->owstitle     = $value["Title"];
        $oTmp->srs            = $value["SRS"];
        $oTmp->group         = "null";
        // setting to image/png for now should be looked into upon later.
        $oTmp->imageformat  = "image/png";
        $oTmp->servername   = $gszWMSServerName;
        $oTmp->queryable    = $value["queryable"]?$value["queryable"]:"0";
        $bbox         = $value["LatLonBoundingBox"];
        $oTmp->minx   = $bbox["minx"];
        $oTmp->miny   = $bbox["miny"];
        $oTmp->maxx   = $bbox["maxx"];
        $oTmp->maxy   = $bbox["maxy"];
        $oTmp->metadataurl = $value["MetadataURL"]?$value["MetadataURL"]:"";
        
        $oReturn[$nCount++] = $oTmp;
      }
    }

return $oReturn;
}

function addLayer($szValue){
    global $mapName;
    global $gwmsServiceTitle;
    
    $szReturn->addedLayer = false;
    
    // adding a layer from the atlas
    if($_REQUEST["layertype"]== 'atlas'){
        $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
        $oCatalogMapFile = ms_newMapObj(APP_LAYER_CATALOG);
        
         for($i = 0; $i < $oCatalogMapFile->numlayers; $i++){
            $oLayer = $oCatalogMapFile->getLayer( $i );
            
            if($oLayer->name == $_REQUEST["layername"] && $oLayer->group == $_REQUEST["group"]){
                //found layer clone it.
                ms_newLayerObj( $oMap, $oLayer );
                $szReturn->addedLayer = true;
                }
            }
        // save map file.
        $oMap->save($_SESSION['maps'][$mapName]);    
        }
        
    // adding a layer from a wms server
    if($_REQUEST["layertype"]== 'wms'){
        $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
        $oLayer = ms_newLayerObj($oMap);
        
        if ($_REQUEST["metadataurl"]) {
          $metadataurl = $_REQUEST["metadataurl"];
        } else {
          $join = strpos($_REQUEST["servername"],"?")?"&":"?";
          $metadataurl = $_REQUEST["servername"].$join."request=GetCapabilities&service=WMS&version=1.1.1";
        }

        $oLayer->set("name",$_REQUEST["layername"]);
        $oLayer->set("status", MS_ON );
        //$oLayer->set("connectiontype",MS_WMS);
        // in mapserver 5.4 we need to set the connection type with the method "setConnectionType"
        $oLayer->setConnectionType(MS_WMS);
        $oLayer->set("connection", $_REQUEST["servername"]);
        $oLayer->set("type",MS_LAYER_RASTER);
        $oLayer->setMetaData("legendLabel",$_REQUEST["owstitle"]);
        
        $aSRS = explode(" ",$_REQUEST["srs"]);
        
        $oLayer->setMetaData("ows_name",$_REQUEST["layername"]);
        $oLayer->setMetaData("ows_format",$_REQUEST["imageFormat"]);
        $oLayer->setMetaData("ows_server_version","1.1.1");
        $oLayer->setMetaData("ows_srs",$aSRS[0]);
        $oLayer->setMetaData("wms_metadataurl_href", $metadataurl);
        $oLayer->setMetaData("selectable",$_REQUEST["queryable"]=='1'?'true':'false');
        
        $oLayer->setprojection("+init=".strtolower($aSRS[0]));
        
        $oMap->save($_SESSION['maps'][$mapName]);    
        
        $szReturn->wms_connection = $_REQUEST["servername"];
        $szReturn->wms_format = $_REQUEST["imageFormat"];
        $szReturn->wms_name = $_REQUEST["layername"];
        $szReturn->wms_title = $_REQUEST["owstitle"];
        $szReturn->wms_version = "1.1.1";
        $szReturn->wms_srs =$aSRS[0];
        $szReturn->wmsservicetitle = $gwmsServiceTitle;

        $szReturn->addedLayer = true;
        }
        
    return $szReturn;
    }
    
?>
