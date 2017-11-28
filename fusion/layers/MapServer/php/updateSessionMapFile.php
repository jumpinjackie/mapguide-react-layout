<?php
include 'Common.php';

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
    // set visible layers
    setVisibleLayers(explode(",",$_REQUEST["visLayers"]));
    // update the layers list that is in use
    //updateActiveLayers(split(",",$_REQUEST["layers"]));
    
    // save the mapfile
    $oMap->save($_SESSION['maps'][$mapName]);
    for ($i=0;$i<$oMap->numlayers;$i++){
        $oLayer=&$oMap->GetLayer($i);
        }
} else {
  exit;
}
    function setVisibleLayers($aLayers){
    global $oMap;
        for ($i=0;$i<$oMap->numlayers;$i++){
            $oLayer=$oMap->GetLayer($i);
            // turn off layer
            $oLayer->set("status", MS_OFF);
            for($j=0;$j<count($aLayers);$j++){
                if($aLayers[$j] == $oLayer->name ){
                    $oLayer->set("status", MS_ON);
                }
            }
        }
    }

    function updateActiveLayers ($aLayers){
    global $oMap;
        for ($i=0;$i<$oMap->numlayers;$i++){
            $oLayer=&$oMap->GetLayer($i);
            
            $bFoundLayer = false;
            for($j=0;$j<count($aLayers);$j++){
                if($aLayers[$j] == $oLayer->name ){
                    $bFoundLayer = true;
                }
            }
            // layer not found in list delete it
            if($bFoundLayer == false){
                $oLayer->set('status', MS_DELETE); 
            }
        }
    }    
    
?>
