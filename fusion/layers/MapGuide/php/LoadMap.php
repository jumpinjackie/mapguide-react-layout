<?php
/**
 * LoadMap
 *
 * $Id: LoadMap.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: get map initial information
 *****************************************************************************/

include(dirname(__FILE__).'/../../../common/php/Utilities.php');
include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include('Utilities.php');


$mapObj = new stdClass();
try
{
    $mappingService = $siteConnection->CreateService(MgServiceType::MappingService);
    $featureService = $siteConnection->CreateService(MgServiceType::FeatureService);

    // Get a runtime map from a map definition
    if (isset($_REQUEST['mapid']))
    {
        $mapid = $_REQUEST['mapid'];
        $resourceID = new MgResourceIdentifier($mapid);
        $map = new MgMap($siteConnection);
        $mapTitle = $resourceID->GetName();

        $map->Create($resourceID, $mapTitle);

        $mapName = uniqid($mapTitle);
        $mapStateId = new MgResourceIdentifier("Session:" . $sessionID . "//" . $mapName . "." . MgResourceType::Map);


        //create an empty selection object and store it in the session repository
        $sel = new MgSelection($map);
        $sel->Save($resourceService, $mapName);


        $map->Save($resourceService, $mapStateId);
    } else {
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        $mapTitle = $map->GetName();
        $mapid = $map->GetMapDefinition()->ToString();
    }

    $extents = $map->GetMapExtent();
    @$oMin = $extents->GetLowerLeftCoordinate();
    @$oMax = $extents->GetUpperRightCoordinate();

    @$srs = $map->GetMapSRS();
    $epsgCode = "";
    if($srs != "")
    {
      @$csFactory = new MgCoordinateSystemFactory();
      @$cs = $csFactory->Create($srs);
      @$metersPerUnit = $cs->ConvertCoordinateSystemUnitsToMeters(1.0);
      try {
        $epsgCode = $csFactory->ConvertWktToEpsgCode($srs);

        // Convert EPSG code 3857 to the equivalent code 900913 that is understood by OpenLayers
        if($epsgCode == 3857)
        {
            $epsgCode = 900913;
            // We need to set the srs code to null because OpenLayers doesn't know the srs code.
            $srs = "";
        }

      } catch (MgException $e) {
        //just catch the exception and set epsgCode to empty string
      }


      //  $unitsType = $cs->GetUnits();
    }
    else
    {
      $metersPerUnit = 1.0;
      //$unitsType = "Meters";
    }


    header('Content-type: application/json');
    header('X-JSON: true');

    $mapObj->sessionId = $sessionID;
    $mapObj->mapId = $mapid;
    $mapObj->metadata = NULL;
    $mapObj->metersPerUnit = $metersPerUnit;
    $mapObj->wkt = $srs;
    $mapObj->epsg = $epsgCode;

    $mapObj->mapTitle = $mapTitle;

    $mapObj->mapName = $mapName;
    
    //Any code that may need the map definition xml document can use $mdfDoc
    $mapContent = $resourceService->GetResourceContent(new MgResourceIdentifier($mapid));
    $mdfDoc = new DOMDocument();
    $mdfDoc->loadXML(ByteReaderToString($mapContent));
    
    $mapObj->backgroundColor = getMapBackgroundColor($map, $mdfDoc);

    $mapObj->extent = array($oMin->GetX(), $oMin->GetY(), $oMax->GetX(), $oMax->GetY());

    $layers=$map->GetLayers();

    //layers
    $mapObj->layers = array();
    $layerDefinitionIds = new MgStringCollection();
    $featureSourceIds = new MgStringCollection();
    for($i=0;$i<$layers->GetCount();$i++)
    {
        $layer = $layers->GetItem($i);
        $lid = $layer->GetLayerDefinition();
        $layerDefinitionIds->Add($lid->ToString());
        $featureSourceIds->Add($layer->GetFeatureSourceId());
    }
    
    //Get the layer contents in a single batch
    $layerDefinitionContents = $resourceService->GetResourceContents($layerDefinitionIds, null);
    $featureSourceContents = $resourceService->GetResourceContents($featureSourceIds, null);
    $layerDocs = array();
    $fsDocs = array();
    for($i=0;$i<$layers->GetCount();$i++)
    {
        $ldfContent = $layerDefinitionContents->GetItem($i);
        $ldfdoc = new DOMDocument();
        $ldfdoc->loadXML($ldfContent);
        array_push($layerDocs, $ldfdoc);
        $fsContent = $featureSourceContents->GetItem($i);
        $fsDoc = new DOMDocument();
        $fsDoc->loadXML($fsContent);
        array_push($fsDocs, $fsDoc);
    }
    
    for($i=0;$i<$layers->GetCount();$i++)
    {
        //only output layers that are part of the 'Normal Group' and
        //not the base map group used for tile maps.  (Where is the test for that Y.A.???)

        $layer=$layers->GetItem($i);
        $layerContent = $layerDocs[$i];
        $fsContent = $fsDocs[$i];
        $layerObj = new stdClass();
        $mappings = GetLayerPropertyMappings($resourceService, $layer, $layerContent);
        $_SESSION['property_mappings'][$layer->GetObjectId()] = $mappings;

        $layerObj->uniqueId = $layer->GetObjectId();
        $layerObj->layerName = $layer->GetName();

        //$aLayerTypes = GetLayerTypes($featureService, $layer);
        $aLayerTypes = GetLayerTypesFromResourceContent($layer, $layerContent);
        $layerObj->layerTypes = $aLayerTypes;

        $layerObj->resourceId = $layerDefinitionIds->GetItem($i);
        $layerObj->parentGroup = $layer->GetGroup() ? $layer->GetGroup()->GetObjectId() : '';

        $layerObj->selectable = $layer->GetSelectable();
        $layerObj->visible = $layer->GetVisible();
        $layerObj->actuallyVisible = $layer->isVisible();
        $layerObj->editable = IsLayerEditable($resourceService, $layer, $fsContent);

        $isBaseMapLayer = ($layer->GetLayerType() == MgLayerType::BaseMap);
        $layerObj->isBaseMapLayer = $isBaseMapLayer;
        if($isBaseMapLayer)
        {
            $mapObj->hasBaseMapLayers = true;
        }
        else
        {
            $mapObj->hasDynamicLayers = true;
        }

        $layerObj->legendLabel = $layer->GetLegendLabel();
        $layerObj->displayInLegend = $layer->GetDisplayInLegend();
        $layerObj->expandInLegend = $layer->GetExpandInLegend();

        $oScaleRanges = buildScaleRanges($layer, $layerContent);
        $_SESSION['scale_ranges'][$layer->GetObjectId()] = $oScaleRanges;
        //$layerObj->scaleRanges = $oScaleRanges;
        /*get the min/max scale for the layer*/
        $nCount = count($oScaleRanges);
        $layerObj->minScale = $oScaleRanges[0]->minScale;
        $layerObj->maxScale = $oScaleRanges[0]->maxScale;
        for ($j=1; $j<$nCount; $j++)
        {
            $layerObj->minScale = min($layerObj->minScale, $oScaleRanges[$j]->minScale);
            $layerObj->maxScale = max($layerObj->maxScale, $oScaleRanges[$j]->maxScale);
        }
        array_push($mapObj->layers, $layerObj);
    }

    //Get layer groups as xml
    $groups = $map->GetLayerGroups();
    $mapObj->groups = array();
    for($i=0;$i<$groups->GetCount();$i++)
    {
        $group=$groups->GetItem($i);
        array_push($mapObj->groups, OutputGroupInfo($group));
    }

    $mapObj->FiniteDisplayScales = array();
    //FiniteDisplayScales for tiled maps
    for ($i=0; $i<$map->GetFiniteDisplayScaleCount(); $i++)
    {
        array_push($mapObj->FiniteDisplayScales, $map->GetFiniteDisplayScaleAt($i));
    }
    echo var2json($mapObj);
}
catch (MgException $e)
{
  echo "ERROR: " . $e->GetExceptionMessage() . "\n";
  echo $e->GetDetails() . "\n";
  echo $e->GetStackTrace() . "\n";
}

exit;


/************************************************************************/
/*                     GetLayerTypesFromResourceContent                 */
/*                                                                      */
/*      Replacement for GetLayerTypes function.                         */
/*      Extract the layer types based on the styling available.         */
/*      GetLayerTypes was costly in time when dealing in DB.            */
/************************************************************************/
function GetLayerTypesFromResourceContent($layer, $xmldoc = NULL)
{
    $aLayerTypes = array();
    global $resourceService;

    try
    {
        $dataSourceId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        if($dataSourceId->GetResourceType() == MgResourceType::DrawingSource)
          array_push($aLayerTypes, '5');// DWF
        else
        {
            if ($xmldoc == NULL) {
                $resID = $layer->GetLayerDefinition();
                $layerContent = $resourceService->GetResourceContent($resID);
                $xmldoc = new DOMDocument();
                $xmldoc->loadXML(ByteReaderToString($layerContent));
            }
            $gridlayers = $xmldoc->getElementsByTagName('GridLayerDefinition');
            if ($gridlayers->length > 0)
              array_push($aLayerTypes, '4');// raster

            $scaleRanges = $xmldoc->getElementsByTagName('VectorScaleRange');
            $typeStyles = array("PointTypeStyle", "LineTypeStyle", "AreaTypeStyle", "CompositeTypeStyle");
            for($sc = 0; $sc < $scaleRanges->length; $sc++)
            {
                $scaleRange = $scaleRanges->item($sc);
                for($ts=0, $count = count($typeStyles); $ts < $count; $ts++)
                {
                    $typeStyle = $scaleRange->getElementsByTagName($typeStyles[$ts]);
                    if ($typeStyle->length > 0)
                      array_push($aLayerTypes, $ts);
                }
            }
        }
    }
    catch (MgException $e)
    {
        echo "ERROR: " . $e->GetExceptionMessage() . "\n";
        echo $e->GetDetails() . "\n";
        echo $e->GetStackTrace() . "\n";
    }

    $aLayerTypes = array_unique($aLayerTypes);

    return $aLayerTypes;
}

function getMapBackgroundColor($map, $xmldoc = NULL) {
    global $resourceService;
    if ($xmldoc == NULL) {
        $resId = $map->GetMapDefinition();
        $mapContent = $resourceService->GetResourceContent($resId);
        $xmldoc = new DOMDocument();
        $xmldoc->loadXML(ByteReaderToString($mapContent));
    }
    $bgColor = $xmldoc->getElementsByTagName('BackgroundColor');
    if ($bgColor->length > 0) {
        return '#'.substr($bgColor->item(0)->nodeValue, 2);
    } else {
        return "#FFFFFF";
    }
}

function buildScaleRanges($layer, $xmldoc = NULL)
{
    $aScaleRanges = array();
    global $resourceService;
    if ($xmldoc == NULL) {
        $resID = $layer->GetLayerDefinition();
        $layerContent = $resourceService->GetResourceContent($resID);
        $xmldoc = new DOMDocument();
        $xmldoc->loadXML(ByteReaderToString($layerContent));
    }
    $type = 0;
    $scaleRanges = $xmldoc->getElementsByTagName('VectorScaleRange');
    if($scaleRanges->length == 0) {
        $scaleRanges = $xmldoc->getElementsByTagName('GridScaleRange');
        if($scaleRanges->length == 0) {
            $scaleRanges = $xmldoc->getElementsByTagName('DrawingLayerDefinition');
            if($scaleRanges->length == 0) {
                return;
            }
            $type = 2;
        } else {
            $type = 1;
        }
    }
    $typeStyles = array("PointTypeStyle", "LineTypeStyle", "AreaTypeStyle", "CompositeTypeStyle");
    $ruleNames = array("PointRule", "LineRule", "AreaRule", "CompositeRule");
    for($sc = 0; $sc < $scaleRanges->length; $sc++)
    {
        $scaleRangeObj = new stdClass();
        $scaleRangeObj->styles = array();
        $scaleRange = $scaleRanges->item($sc);
        $minElt = $scaleRange->getElementsByTagName('MinScale');
        $maxElt = $scaleRange->getElementsByTagName('MaxScale');
        $minScale = "0";
        $maxScale = 'infinity';  // as MDF's VectorScaleRange::MAX_MAP_SCALE
        if($minElt->length > 0)
            $minScale = $minElt->item(0)->nodeValue;
        if($maxElt->length > 0)
            $maxScale = $maxElt->item(0)->nodeValue;

        $scaleRangeObj->minScale = $minScale;
        $scaleRangeObj->maxScale = $maxScale;


        if($type != 0) {
            array_push($aScaleRanges, $scaleRangeObj);
            break;
        }


        $styleIndex = 0;
        for($ts=0, $count = count($typeStyles); $ts < $count; $ts++)
        {
            $typeStyle = $scaleRange->getElementsByTagName($typeStyles[$ts]);
            $catIndex = 0;
            for($st = 0; $st < $typeStyle->length; $st++) {

                // We will check if this typestyle is going to be shown in the legend
                $showInLegend = $typeStyle->item($st)->getElementsByTagName("ShowInLegend");
                if($showInLegend->length > 0)
                    if($showInLegend->item(0)->nodeValue == "false")
                        continue;   // This typestyle does not need to be shown in the legend

                $rules = $typeStyle->item($st)->getElementsByTagName($ruleNames[$ts]);
                for($r = 0; $r < $rules->length; $r++) {
                    $rule = $rules->item($r);
                    $label = $rule->getElementsByTagName("LegendLabel");
                    $filter = $rule->getElementsByTagName("Filter");

                    $labelText = $label->length==1? $label->item(0)->nodeValue: "";
                    $filterText = $filter->length==1? $filter->item(0)->nodeValue: "";
                    $styleObj = new stdClass();
                    $styleObj->legendLabel = trim($labelText);
                    $styleObj->filter = trim($filterText);
                    $styleObj->geometryType = ($ts+1);
                    $styleObj->categoryIndex = $catIndex++;
                    array_push($scaleRangeObj->styles, $styleObj);
                }
            }
        }
        array_push($aScaleRanges, $scaleRangeObj);

    }
    return $aScaleRanges;
}



// Converts a boolean to "yes" or "no"
// --from MG Web Tier API Reference
// function BooleanToString($boolean)
// {
//     if (is_bool($boolean))
//         return ($boolean ? "true" : "false");
//     else
//         return "'ERROR in BooleanToString.'";
// }

function OutputGroupInfo($group)
{
    $groupObj = new stdClass();

    $groupObj->groupName = $group->GetName();
    $groupObj->legendLabel = $group->GetLegendLabel();
    $groupObj->uniqueId = $group->GetObjectId();
    $groupObj->displayInLegend = $group->GetDisplayInLegend();
    $groupObj->expandInLegend = $group->GetExpandInLegend();
    $parent = $group->GetGroup();
    $groupObj->parentUniqueId = $parent != null ? $parent->GetObjectId() : '';
    $groupObj->visible = $group->GetVisible();
    $groupObj->actuallyVisible = $group->isVisible();
    $isBaseMapGroup = ($group->GetLayerGroupType() == MgLayerGroupType::BaseMap);
    $groupObj->isBaseMapGroup =  $isBaseMapGroup;

    return $groupObj;
}




?>
