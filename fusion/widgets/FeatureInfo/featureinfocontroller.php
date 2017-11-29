<?php

//
//  Copyright (C) 2004-2006  Autodesk, Inc.
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of version 2.1 of the GNU Lesser
//  General Public License as published by the Free Software Foundation.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//

    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorText();
        exit;
    }
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . 'JSON.php';
    require_once 'classes/featureinfo.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

    try {
        $responseType = 'text/plain';
        $response = '';

        $site = new MgSiteConnection();
        $site->Open(new MgUserInformation($args['SESSION']));

        $resourceService = $site->CreateService(MgServiceType::ResourceService);
        $featureService =
            $site->CreateService(MgServiceType::FeatureService);

        $layerName = $args['LAYERNAME'];
        $mapName = $args['MAPNAME'];
        $map = new MgMap($site);
        $map->Open($mapName);

        $layer = $map->GetLayers()->GetItem($layerName);
        $className = $layer->GetFeatureClassName();

        $selection = new MgSelection($map);
        $selection->Open($resourceService, $mapName);

        $properties = new stdClass();

        if ($selection->Contains($layer, $className)) {
            $featureReader = $selection->GetSelectedFeatures($layer, $className, new MgStringCollection());

            /* Get the map SRS - we use this to convert distances */
            $srsFactory = new MgCoordinateSystemFactory();
            //safely get an SRS ... (in Utilities)
            $srsDefMap = GetMapSRS($map);
            $srsMap = $srsFactory->Create($srsDefMap);
            $featureResId = new MgResourceIdentifier($layer->GetFeatureSourceId());

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
              $properties = BuildSelectionArray($featureReader, $layerName, $properties, true, $srsLayer, $bNeedsTransform, $layer, false);

        }

        $response = json_encode($properties);

    } catch (MgException $e) {
        echo "ERROR: " . $e->GetExceptionMessage() . "\n";
        echo $e->GetDetails() . "\n";
        echo $e->GetStackTrace() . "\n";
    }

    header('Content-Type: ' . $responseType);
    echo trim($response);
?>
