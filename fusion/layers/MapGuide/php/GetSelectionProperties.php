<?php
/**
 * SetSelection
 *
 * $Id: SetSelection.php 1664 2008-11-12 21:41:00Z madair $
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

include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include('../../../common/php/Utilities.php');
include('Utilities.php');

    $selText = "";
    GetRequestParameters();

    try
    {
        //load the map runtime state
        //
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        // Create the selection set
        $selection = new MgSelection($map);
        if($selText != "") {
            $selection->FromXml($selText);
        }

        //now return a data struture which is the same as Query.php
        $featureService = $siteConnection->CreateService(MgServiceType::FeatureService);

        /* Get the map SRS - we use this to convert distances */
        $srsFactory = new MgCoordinateSystemFactory();
        //safely get an SRS ... (in Utilities)
        $srsDefMap = GetMapSRS($map);
        $srsMap = $srsFactory->Create($srsDefMap);

        /*holds selection array*/
        $properties = new stdClass();
        $properties->layers = array();

        //process
        header('Content-type: application/json');
        header('X-JSON: true');
        $layers = $selection->GetLayers();
        $result = new stdClass();
        if ($layers != null)
        {
            $nLayers = $layers->GetCount();
            // echo "/* nLayers:".$nLayers."*/";
            for ($i=0; $i<$nLayers; $i++) {
                $oLayer = $layers->GetItem($i);
                $featureResId = new MgResourceIdentifier($oLayer->GetFeatureSourceId());
                /* the class that is used for this layer will be used to select  features */
                $class = $oLayer->GetFeatureClassName();

                /* select the features */
                $queryOptions = new MgFeatureQueryOptions();
                $geomName = $oLayer->GetFeatureGeometryName();
                //TODO : seems that property mapping breaks the selection ????
                //could it be that $selection->AddFeatures($layerObj, $featureReader, 0) is
                //the one causing a problem when the properies are limited ?
                if (isset($_SESSION['property_mappings']) && isset($_SESSION['property_mappings'][$oLayer->GetObjectId()])) {
                    $mappings = $_SESSION['property_mappings'][$oLayer->GetObjectId()];
                } else {
                    //This is normally pre-stashed by LoadMap.php, but if the client is using the new
                    //CREATERUNTIMEMAP shortcut, this information does not exist yet, so fetch and stash
                    $mappings = GetLayerPropertyMappings($resourceService, $oLayer);
                    $_SESSION['property_mappings'][$oLayer->GetObjectId()] = $mappings;
                }
                if (count($mappings) > 0) {
                    foreach($mappings as $name => $value) {
                        if ($geomName != $name) {
                            $queryOptions->AddFeatureProperty($name);
                            //echo "$name $value <br>\n";
                        }
                    }
                }

                //Add geometry property in all cases.
                $queryOptions->AddFeatureProperty($geomName);

                $filter = $selection->GenerateFilter($oLayer, $class);
                $queryOptions->SetFilter($filter);
                $featureReader = $featureService->SelectFeatures($featureResId, $class, $queryOptions);
                //$featureReader = $selection->GetSelectedFeatures($oLayer, $class, true );//this doesn't seem to work but would replace much of the above code

                $layerName = $oLayer->GetName();
                array_push($properties->layers, $layerName);

                // TODO: Check if computed properties are needed?
                $bComputedProperties = false;
                $bNeedsTransform = false;
                $srsLayer = NULL;
                if ($bComputedProperties)
                {
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
                    if (($bLayerSrsIsArbitrary != $bMapSrsIsArbitrary) ||
                        ($bLayerSrsIsArbitrary && ($srsLayer->GetUnits() != $srsMap->GetUnits()))) {
                        $bComputedProperties = false;
                    } else {
                        $srsTarget = null;
                        $srsXform = null;
                        $bNeedsTransform = ($srsLayer->GetUnitScale() != 1.0);
                    }
                }

                $properties = BuildSelectionArray($featureReader, $layerName, $properties,
                                                  $bComputedProperties,
                                                  $srsLayer, $bNeedsTransform, $oLayer, true);
                $featureReader->Close();
            }

            $result->hasSelection = false;
            if ($layers && $layers->GetCount() >= 0)
            {
                $result->hasSelection = true;
                $oExtents = $selection->GetExtents($featureService);
                if ($oExtents)
                {
                    $oMin = $oExtents->GetLowerLeftCoordinate();
                    $oMax = $oExtents->GetUpperRightCoordinate();
                    $result->extents = new stdClass();
                    $result->extents->minx = $oMin->GetX();
                    $result->extents->miny = $oMin->GetY();
                    $result->extents->maxx = $oMax->GetX();
                    $result->extents->maxy = $oMax->GetY();

                    /*keep the full extents of the selection when saving the selection in the session*/
                    $properties->extents = new stdClass();
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
                    $result->$layerName = new stdClass();
                    $result->$layerName->featureCount = $selection->GetSelectedFeaturesCount($layer, $layerClassName);
                }

                /*save selection in the session*/
                $_SESSION['selection_array'] = $properties;
            }
        } else {
            $result->hasSelection = false;
        }
        echo var2json($result);
    } catch(MgException $e) {
        echo "ERROR: " . $e->GetDetails() . "\n";
    }

function GetParameters($params)
{
    global $selText;

    $selText = UnescapeMagicQuotes($params['selection']);
}


function UnescapeMagicQuotes($str)
{
    if(ini_get("magic_quotes_sybase") == "1")
        return str_replace("''", "'", $str);
    else if(get_magic_quotes_gpc() == "1")
    {
        //Unescape double quotes
        $str = str_replace('\\"', '"', $str);

        //remove additional backslash
        return str_replace("\\", "", $str);
    }
    return $str;
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}
?>
