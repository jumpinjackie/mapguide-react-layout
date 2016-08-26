<?php
/**
 * Query
 *
 * $Id: Query.php 2950 2016-07-27 12:51:00Z jng $
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
    if ($_REQUEST['layers'] != '') {
        $layers = explode(',',$_REQUEST['layers']);
    } else {
        $layers = array();
    }

    $maxFeatures = 0;
    if (isset($_REQUEST['maxfeatures'])) {
      $maxFeatures = $_REQUEST['maxfeatures'];
    }

    // echo "<!--";
    //     print_r($_REQUEST);
    //     echo "-->";

    /* selection variant if set */
    $variant = MgFeatureSpatialOperations::Intersects;
    if (isset($_REQUEST['variant'])) {
        if (strcasecmp($_REQUEST['variant'],'contains') == 0) {
            $variant = MgFeatureSpatialOperations::Contains;
        } else if (strcasecmp($_REQUEST['variant'],'inside') == 0) {
            $variant = MgFeatureSpatialOperations::Inside;
        }
    }
    /* a filter expression to apply, in the form of an FDO SQL statement */
    $filter = isset($_REQUEST['filter']) ? str_replace(array('*', '"'), array('%', "'"),html_entity_decode(urldecode( $_REQUEST['filter']))) : '';
    //echo "<!-- filter: $filter -->\n";
    /* a spatial filter in the form on a WKT geometry */
    $spatialFilter = (isset($_REQUEST['spatialfilter']) && $_REQUEST['spatialfilter'] != '') ? urldecode($_REQUEST['spatialfilter']) : false;
    //echo "spatial filter is $spatialFilter<BR>";
    /* we need a feature service to query the features */
    $featureService = $siteConnection->CreateService(MgServiceType::FeatureService);

    /* open the map from the session using the provided map name.  The map was
       previously created by calling LoadMap. */
    $map = new MgMap($siteConnection);
    $map->Open($mapName);

    /* add the features to the map selection and save it*/
    $selection = new MgSelection($map);

    /* if extending the current selection */
    $bExtendSelection = isset($_REQUEST['extendselection']) && strcasecmp($_REQUEST['extendselection'], 'true') == 0;
    if ($bExtendSelection) {
        $aLayerSelections = array();
        $selection->Open($resourceService, $mapName);
        $aLayers = selectionToArray($selection, array());
    }

    $bComputedProperties = isset($_REQUEST['computed']) && strcasecmp($_REQUEST['computed'], 'true') == 0;
    $bQueryHiddenLayers = isset($_REQUEST['queryHiddenLayers']) && strcasecmp($_REQUEST['queryHiddenLayers'], 'true') == 0;

    /*holds selection array*/
    $properties = NULL;
    $properties->layers = array();

    /* Get the map SRS - we use this to convert distances */
    $srsFactory = new MgCoordinateSystemFactory();
    //safely get an SRS ... (in Utilities)
    $srsDefMap = GetMapSRS($map);
    $srsMap = $srsFactory->Create($srsDefMap);

    $mapLayers = $map->GetLayers();
    $bAllLayers = false;
    $nLayers = count($layers);
    if ($nLayers == 0) {
        $nLayers = $mapLayers->GetCount();
        $bAllLayers = true;
    }

    for ($i=0; $i<$nLayers; $i++) {
        try {
            if (!$bAllLayers) {
                $layerObj = $mapLayers->GetItem($layers[$i]);
            } else {
                $layerObj = $mapLayers->GetItem($i);
            }
            $bVisFlag = $layerObj->IsVisible() || $bQueryHiddenLayers;

            $className = $layerObj->GetFeatureClassName();
            if (!$layerObj->GetSelectable() || !$bVisFlag ||
                $className=='RedlineSchema:Redline' ||
                !$className || $className=='rasters:RasterType' ||$className=='') {
                continue;
            }


            /* get the feature source from the layer */
            $featureResId = new MgResourceIdentifier($layerObj->GetFeatureSourceId());
            $featureGeometryName = $layerObj->GetFeatureGeometryName();

            $queryOptions = new MgFeatureQueryOptions();

            /* the class that is used for this layer will be used to select
               features */
            $class = $layerObj->GetFeatureClassName();

            //only retrieve properties that we actually need
            $mappings = $_SESSION['property_mappings'][$layerObj->GetObjectId()];

            //TODO : seems that property mapping breaks the selection ????
            //could it be that $selection->AddFeatures($layerObj, $featureReader, 0) is
            //the one causing a problem when the properies are limited ?
            if (0 && count($mappings) > 0)
            {
                foreach($mappings as $name => $value) {
                    $queryOptions->AddFeatureProperty($name);
                    //echo "$name $value <br>\n";
                }
                $geomName = $layerObj->GetFeatureGeometryName();
                $queryOptions->AddFeatureProperty($geomName);
            }

            //get the layer filter value if supplied
            $layerReader = $resourceService->GetResourceContent($layerObj->GetLayerDefinition());
            $xmldoc = new DOMDocument();
            $xmldoc->loadXML(ByteReaderToString($layerReader));
            $xpathObj = new domXPath($xmldoc);
            $xpathStr = "/LayerDefinition/VectorLayerDefinition/Filter"; //TODO: need this for DWF or Grid layers?
            $xpathQuery = $xpathObj->query($xpathStr);
            $layerFilter = '';
            if ($xpathQuery->length > 0) {
              $layerFilter = $xpathQuery->item(0)->nodeValue;
            }
            /* create the combined filter value*/
            $combinedFilter = '';
            if ($filter!='' && $layerFilter!='') {
                $combinedFilter = "(".$filter.") AND (".$layerFilter.")";
            } else {
                $combinedFilter = $filter.$layerFilter;
            }
            if ($combinedFilter!='') {
              //echo "/* setting combinedFilter:".$combinedFilter."*/";
              $queryOptions->SetFilter($combinedFilter);
            }

            if ($spatialFilter !== false ) {
                $spatialContext = $featureService->GetSpatialContexts($featureResId, true);
                $srsLayerWkt = false;
                if ($spatialContext != null && $spatialContext->ReadNext() != null) {
                    $srsLayerWkt = $spatialContext->GetCoordinateSystemWkt();
                    /* skip this layer if the srs is empty */
                }
                if ($srsLayerWkt == null) {
                    $srsLayerWkt = $srsDefMap;
                }
                /* create a coordinate system from the layer's SRS wkt */
                $srsLayer = $srsFactory->Create($srsLayerWkt);
                $verMajor = subStr(GetSiteVersion(), 0,1);
                if ($verMajor == '1') {
                  $srsXform = new MgCoordinateSystemTransform($srsMap, $srsLayer);
                } else {
                  $srsXform = $srsFactory->GetTransform($srsMap, $srsLayer);
                }
                $wktRW = new MgWktReaderWriter();
                $geom = $wktRW->Read($spatialFilter, $srsXform);
                $queryOptions->SetSpatialFilter($featureGeometryName, $geom, $variant);
            }

            /* select the features */
            try {
                 $featureReader = $featureService->SelectFeatures($featureResId, $class, $queryOptions);
            } catch (MgException $e) {
                echo "ERROR2: " . $e->GetExceptionMessage() . "\n";
                echo $e->GetDetails() . "\n";
                echo $e->GetStackTrace() . "\n";
            }

            $layerName = $layerObj->GetName();
            array_push($properties->layers, $layerName);

            if ($bExtendSelection) {
                /* possibly toggle features in the map */
                $newSelection = new MgSelection($map);
                $newSelection->AddFeatures($layerObj, $featureReader, $maxFeatures);
                $featureReader->Close();
                $aLayers = selectionToArray($newSelection, $aLayers);
            } else {
                try {
                    $spatialContext = $featureService->GetSpatialContexts($featureResId, true);
                    $srsLayerWkt = false;
                    if($spatialContext != null && $spatialContext->ReadNext() != null) {
                        $srsLayerWkt = $spatialContext->GetCoordinateSystemWkt();
                        /* skip this layer if the srs is empty */
                    }
                    if ($srsLayerWkt == null) {
                        $srsLayerWkt = $srsDefMap;
                    }
                    /* create a coordinate system from the layer's SRS wkt */
                    $srsLayer = $srsFactory->Create($srsLayerWkt);

                    // exclude layer if:
                    //  the map is non-arbitrary and the layer is arbitrary or vice-versa
                    //     or
                    //  layer and map are both arbitrary but have different units
                    //
                    $bLayerSrsIsArbitrary = ($srsLayer->GetType() == MgCoordinateSystemType::Arbitrary);
                    $bMapSrsIsArbitrary = ($srsMap->GetType() == MgCoordinateSystemType::Arbitrary);

                    $bNeedsTransform = false;
                    if (($bLayerSrsIsArbitrary != $bMapSrsIsArbitrary) ||
                        ($bLayerSrsIsArbitrary && ($srsLayer->GetUnits() != $srsMap->GetUnits()))) {
                            $bComputedProperties = false;
                    } else {
                        $srsTarget = null;
                        $srsXform = null;
                        $bNeedsTransform = ($srsLayer->GetUnitScale() != 1.0);
                    }
                } catch (MgException $e) {
                    echo "ERROR: " . $e->GetExceptionMessage() . "\n";
                    echo $e->GetDetails() . "\n";
                    echo $e->GetStackTrace() . "\n";
                }

                /* add the features to the map */
                $selection->AddFeatures($layerObj, $featureReader, $maxFeatures);
                $featureReader->Close();

                $featureReader = $featureService->SelectFeatures($featureResId, $class, $queryOptions);
                $properties = BuildSelectionArray($featureReader, $layerName, $properties,
                                                  $bComputedProperties,
                                                  $srsLayer, $bNeedsTransform, $layerObj, true);
                $featureReader->Close();
            }
        } catch (MgObjectNotFoundException $onfe) {
            //skip layers not in the map?
            echo "Object not found";
            echo "ERROR: " . $onfe->GetExceptionMessage() . "\n";
            echo $onfe->GetDetails() . "\n";
            echo $onfe->GetStackTrace() . "\n";
            if ($featureReader) {
              $featureReader->Close();
            }
        } catch (MgException $e) {
            //what should we do with general exceptions?
            echo "/*general exception:";
            echo "ERROR: " . $e->GetExceptionMessage();
            echo $e->GetDetails() . "*/";
            if ($featureReader) {
              $featureReader->Close();
            }
        }
    }


    if ($bExtendSelection) {
        $selection = new MgSelection($map);
        $layers = $map->GetLayers();
        foreach($aLayers as $szLayer => $aLayer) {
            $oLayer = $layers->GetItem($szLayer);
            foreach($aLayer as $szClass => $aFilter) {
                $clsDef = $oLayer->GetClassDefinition();
                $queryOptions = BuildFeatureQueryOptions($clsDef);

                /* get the feature source from the layer */
                $featureResId = new MgResourceIdentifier($oLayer->GetFeatureSourceId());
                $featureGeometryName = $oLayer->GetFeatureGeometryName();
                $szFilter = implode(' OR ', $aFilter);
                $queryOptions->SetFilter($szFilter);
                /* the class that is used for this layer will be used to select
                   features */
                $class = $oLayer->GetFeatureClassName();

                /* select the features */
                $featureReader = $featureService->SelectFeatures($featureResId, $class, $queryOptions);
                $selection->AddFeatures($oLayer, $featureReader, $maxFeatures);

                $layerName = $oLayer->GetName();
                if (!in_array($layerName, $properties->layers)) {
                  array_push($properties->layers, $layerName);
                }
                $featureReader->Close();
                $featureReader = $featureService->SelectFeatures($featureResId, $class, $queryOptions);

                $spatialContext = $featureService->GetSpatialContexts($featureResId, true);
                $srsLayerWkt = false;
                if($spatialContext != null && $spatialContext->ReadNext() != null) {
                    $srsLayerWkt = $spatialContext->GetCoordinateSystemWkt();
                    /* skip this layer if the srs is empty */
                }
                if ($srsLayerWkt == null) {
                    $srsLayerWkt = $srsDefMap;
                }
                /* create a coordinate system from the layer's SRS wkt */
                $srsLayer = $srsFactory->Create($srsLayerWkt);

                // exclude layer if:
                //  the map is non-arbitrary and the layer is arbitrary or vice-versa
                //     or
                //  layer and map are both arbitrary but have different units
                //
                $bLayerSrsIsArbitrary = ($srsLayer->GetType() == MgCoordinateSystemType::Arbitrary);
                $bMapSrsIsArbitrary = ($srsMap->GetType() == MgCoordinateSystemType::Arbitrary);
                $bNeedsTransform = false;
                if (($bLayerSrsIsArbitrary != $bMapSrsIsArbitrary) ||
                    ($bLayerSrsIsArbitrary && ($srsLayer->GetUnits() != $srsMap->GetUnits()))) {
                    $bComputedProperties = false;
                } else {
                    $srsTarget = null;
                    $srsXform = null;
                    $bNeedsTransform = ($srsLayer->GetUnitScale() != 1.0);
                }

                $properties = BuildSelectionArray($featureReader, $layerName, $properties,
                                                  $bComputedProperties,
                                                  $srsLayer, $bNeedsTransform, $oLayer, true);
                $featureReader->Close();
            }
        }
    }
    $selection->Save($resourceService, $mapName);

    //print_r($properties);
    //echo "/* SelectionXML:".$selection->ToXML()."*/";

    header('Content-type: application/json');
    header('X-JSON: true');
    $layers = $selection->GetLayers();
    $result = NULL;
    $result->hasSelection = false;
    if ($layers && $layers->GetCount() >= 0)
    {
        $result->hasSelection = true;
        $oExtents = $selection->GetExtents($featureService);
        if ($oExtents)
        {
            $oMin = $oExtents->GetLowerLeftCoordinate();
            $oMax = $oExtents->GetUpperRightCoordinate();
            $result->extents = NULL;
            $result->extents->minx = $oMin->GetX();
            $result->extents->miny = $oMin->GetY();
            $result->extents->maxx = $oMax->GetX();
            $result->extents->maxy = $oMax->GetY();

            /*keep the full extents of the selection when saving the selection in the session*/
            $properties->extents = NULL;
            $properties->extents->minx = $oMin->GetX();
            $properties->extents->miny = $oMin->GetY();
            $properties->extents->maxx = $oMax->GetX();
            $properties->extents->maxy = $oMax->GetY();
        }
        $result->layers = array();
        for ($i=0; $i<$layers->GetCount(); $i++) {
          $layer = $layers->GetItem($i);
          $layerName = $layer->GetName();
          array_push($result->layers, $layerName);
          $layerClassName = $layer->GetFeatureClassName();
          $filter = $selection->GenerateFilter($layer, $layerClassName);
          $a = explode('OR', $filter);
          $result->$layerName->featureCount = count($a);
        }

        /*save selection in the session*/
        $_SESSION['selection_array'] = $properties;
    }
    echo var2json($result);



}
catch (MgException $e)
{
  echo "ERROR: " . $e->GetExceptionMessage() . "\n";
  echo $e->GetDetails() . "\n";
  echo $e->GetStackTrace() . "\n";
}

function selectionToArray($selection, $aLayers, $bToggle = true) {
    $layers = $selection->GetLayers();
    if ($layers)
    {
        for ($i = 0; $i < $layers->GetCount(); $i++)
        {
            $layer = $layers->GetItem($i);
            if ($layer)
            {
                $objId = $layer->GetName();
                if (!array_key_exists($objId,$aLayers)) {
                    $aLayers[$objId] = array();
                }
                $layerClassName = $layer->GetFeatureClassName();
                if (!array_key_exists($layerClassName, $aLayers[$objId])) {
                    $aLayers[$objId][$layerClassName] = array();
                }
                $selectionString = $selection->GenerateFilter($layer, $layerClassName);
                $aFilters = explode('OR', $selectionString);
                foreach($aFilters as $filter) {
                    $filter = trim($filter);
                    $key = array_search($filter, $aLayers[$objId][$layerClassName]);
                    if ($key !== false) {
                        unset($aLayers[$objId][$layerClassName][$key]);
                    } else {
                        array_push($aLayers[$objId][$layerClassName], $filter);
                    }
                }
            }
        }
    }
    return $aLayers;
}

?>
