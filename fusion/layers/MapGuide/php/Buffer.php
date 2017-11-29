<?php
/**
 * Buffer
 *
 * $Id: Buffer.php 2951 2016-07-27 12:53:56Z jng $
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
 * Purpose: Buffer selected features
 *****************************************************************************/

include ('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}

include ('Utilities.php');

try {
    header('content-type: text/xml');
    if (!isset($_REQUEST['session']) ||
        !isset($_REQUEST['mapname']) ||
        !isset($_REQUEST['layer']) ||
        !isset($_REQUEST['fillcolor']) ||
        !isset($_REQUEST['bordercolor']) ||
        !isset($_REQUEST['distance'])) {
        echo "<Error>Arguments missing </Error>";
        exit;
    }

    /* if merge is set, buffer the entire selection as one instead of creating buffers
           * on each selected feature
           */
    $merge = ((isset($_REQUEST['merge'])) && $_REQUEST['merge'] == 1)?true:false;
    $layerName = $_REQUEST['layer'];
    $distance = $_REQUEST['distance'];
    $fillColor = $_REQUEST['fillcolor'];
    $borderColor = $_REQUEST['bordercolor'];

    $schemaName = 'BufferSchema';

    $map = new MgMap($siteConnection);
    $map->Open($mapName);

    /* Get the map SRS - we use this to convert distances */
    $srsFactory = new MgCoordinateSystemFactory();
    //safely get an SRS ... (in Utilities)
    $srsDefMap = GetMapSRS($map);
    $mapSrsUnits = "";
    $srsMap = $srsFactory->Create($srsDefMap);
    $arbitraryMapSrs = ($srsMap->GetType() == MgCoordinateSystemType::Arbitrary);
    if($arbitraryMapSrs)
        $mapSrsUnits = $srsMap->GetUnits();

    $featureService = $siteConnection->CreateService(MgServiceType::FeatureService);
    $agfRW = new MgAgfReaderWriter();

    $layers = $map->GetLayers();
    try {
        /* if the layer already exists, we'll clear the existing features
         * from it and reset the content
         */
        $bValidLayer = false;
        $j = 2;
        while(!$bValidLayer) {
            $layer = $layers->GetItem($layerName);
            $featureClassName = $layer->GetFeatureClassName();
            if ($featureClassName != $schemaName.':'.$layerName) {
                $layerName = $layerName . ' (' . $j . ')';
            } else {
                $bValidLayer = true;
            }
        }
        $layerId = $layer->GetLayerDefinition();
        $featureSourceName = $layer->GetFeatureSourceId();
        $featureSourceId = new MgResourceIdentifier($featureSourceName);
        ClearFeatureSource($featureService, $featureSourceId, $featureClassName);
        BuildLayerContent($resourceService, $layerId,
                          $featureSourceName, $schemaName,
                          $layerName, $fillColor, $borderColor);

    } catch (MgObjectNotFoundException $nfe) {
        $featureSourceName = "Session:".$sessionID."//".$layerName.".FeatureSource";
        $featureSourceId = new MgResourceIdentifier($featureSourceName);
        CreateFeatureSource($map, $featureSourceId, $layerName, $featureService,
                            MgFeatureGeometricType::Surface, $schemaName);

        //create the output layer definition of poylgon type
        $layerDefinition = "Session:".$sessionID."//". $layerName.".LayerDefinition";
        $layerId = new MgResourceIdentifier($layerDefinition);

        BuildLayerContent($resourceService, $layerId,
                          $featureSourceName, $schemaName,
                          $layerName, $fillColor, $borderColor);

        $layer = new MGLayer($layerId, $resourceService);
        $layer->SetName($layerName);
        $layer->SetLegendLabel($layerName);
        $layer->SetDisplayInLegend(true);
        $layer->SetSelectable(true);
        $layers->Insert(0, $layer);
    }

    //loop through the selection of the input layer. If no selection, select all features
    $selection = new MgSelection($map);
    $selection->Open($resourceService, $mapName);
    $selLayers = $selection->GetLayers();

    /* if we are merging, put all the geometries into
       a single geometry collection */
    $inputGeometries = new MgGeometryCollection();

    /* store the insert commands for creating buffers */
    $oCommandsColl = new MgFeatureCommandCollection();

    $nCount = $selLayers->GetCount();
    for ($i=0; $i<$nCount; $i++) {
        $selLayer = $selLayers->GetItem($i);
        $featureClassName = $selLayer->GetFeatureClassName();
        $filter = $selection->GenerateFilter($selLayer, $featureClassName);
        if ($filter == '') {
            continue;
        }
        $clsDef = $selLayer->GetClassDefinition();
        $queryOptions = BuildFeatureQueryOptions($clsDef);
        $queryOptions->SetFilter($filter);
        $featureSource = new MgResourceIdentifier($selLayer->GetFeatureSourceId());
        $featureReader = $featureService->SelectFeatures($featureSource, $featureClassName, $queryOptions);

        $classDef = $featureReader->GetClassDefinition();
        $geomPropName = $classDef->GetDefaultGeometryPropertyName();

        /* figure out the layer SRS - taken from buffer.php in
         * original mapguide ajax viewer
         *
         * The layer may be excluded if it doesn't meet some specific
         * needs ... commented inline below
         */

        $spatialContext = $featureService->GetSpatialContexts($featureSource, true);
        $layerSrsWkt = "";
        if($spatialContext != null) {
            $spatialContext->ReadNext();
            $layerSrsWkt = $spatialContext->GetCoordinateSystemWkt();
            /* skip this layer if the srs is empty */
            if($layerSrsWkt == "") {
                continue;
            }
        } else {
            /* skip this layer if there is no spatial context at all */
            continue;
        }

        /* create a coordinate system from the layer's SRS wkt */
        $layerCs = $srsFactory->Create($layerSrsWkt);
        $arbitraryDsSrs = ($layerCs->GetType() == MgCoordinateSystemType::Arbitrary);
        $dsSrsUnits = "";

        if($arbitraryDsSrs) {
            $dsSrsUnits = $srsDs->GetUnits();
        }
        // exclude layer if:
        //  the map is non-arbitrary and the layer is arbitrary or vice-versa
        //     or
        //  layer and map are both arbitrary but have different units
        //
        if(($arbitraryDsSrs != $arbitraryMapSrs) || ($arbitraryDsSrs && ($dsSrsUnits != $mapSrsUnits)))
        {
            continue;
        }

        // calculate distance in the data source SRS units
        //
        $dist = $layerCs->ConvertMetersToCoordinateSystemUnits($distance);

        // calculate great circle unless data source srs is arbitrary
        $verMajor = subStr(GetSiteVersion(), 0,1);
        if(!$arbitraryDsSrs) {
            if ($verMajor == '1') {
              $measure = new MgCoordinateSystemMeasure($layerCs);
            } else {
              $measure = $layerCs->GetMeasure();
            }
        } else {
            $measure = null;
        }

        // create a SRS transformer if necessary.
        if($layerSrsWkt != $srsDefMap) {
            if ($verMajor == '1') {
              $srsXform = new MgCoordinateSystemTransform($layerCs, $srsMap);
            } else {
              $srsXform = $srsFactory->GetTransform($layerCs, $srsMap);
            }
        } else {
            $srsXform = null;
        }
        while ($featureReader->ReadNext()) {
            $oGeomAgf = $featureReader->GetGeometry($geomPropName);
            $oGeom = $agfRW->Read($oGeomAgf);

            $wktReaderWriter = new MgWktReaderWriter();
            $agfTextPoint = $wktReaderWriter->Write($oGeom);

            //echo "<!-- wkt: ".$agfTextPoint." -->\n";
            if (!$merge) {
                /* use measure to accomodate differences in SRS */
                $oNewGeom = $oGeom->Buffer($dist, $measure);

                $geomProp = new MgGeometryProperty("GEOM", $agfRW->Write($oNewGeom));
                $oPropertyColl = new MgPropertyCollection();

                $oPropertyColl->Add($geomProp);
                $oCommandsColl->Add(new MgInsertFeatures($schemaName.':'.$layerName, $oPropertyColl));
            } else {
                if ($srsXform == null) {
                    $oNewGeom = $oGeom;
                } else {
                    $oNewGeom = $oGeom->Transform($srsXform);
                }
                $inputGeometries->Add($oNewGeom);
            }
        }
        $featureReader->Close();
    }
    if($merge) {
        if($inputGeometries->GetCount() > 0) {
            $dist = $srsMap->ConvertMetersToCoordinateSystemUnits($distance);
            if(!$arbitraryMapSrs) {
                $verMajor = subStr(GetSiteVersion(), 0,1);
                if ($verMajor == '1') {
                    $measure = new MgCoordinateSystemMeasure($srsMap);
                } else {
                    $measure = $srsMap->GetMeasure();
                }
            } else {
                $measure = null;
            }
            $geomFactory = new MgGeometryFactory();
            $oGeom = $geomFactory->CreateMultiGeometry($inputGeometries);
            $oNewGeom = $oGeom->Buffer($dist, $measure);
            $geomProp = new MgGeometryProperty("GEOM", $agfRW->Write($oNewGeom));
            $oPropertyColl = new MgPropertyCollection();

            $oPropertyColl->Add($geomProp);
            $oCommandsColl->Add(new MgInsertFeatures($schemaName.':'.$layerName, $oPropertyColl));
        }
    }
    $result = $featureService->UpdateFeatures($featureSourceId, $oCommandsColl, false);
    $layer->ForceRefresh();
    $map->Save();
    echo "<Buffer>";
    echo "<Layer>".$layerId->ToString();
    echo "</Layer>";
    echo "</Buffer>";
} catch (MgException $e) {
    echo "last error";
    echo "ERROR: " . $e->GetExceptionMessage() . "\n";
    echo $e->GetDetails() . "\n";
    echo $e->GetStackTrace() . "\n";
}

function BuildLayerContent($resourceService, $layerId, $featureSourceName, $schemaName, $layerName, $fillColor, $borderColor) {
    $layerContent = '<?xml version="1.0" encoding="UTF-8"?>
        <LayerDefinition version="1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:noNamespaceSchemaLocation="LayerDefinition-1.0.0.xsd">
        <VectorLayerDefinition>
          <ResourceId>%s</ResourceId>
          <FeatureName>%s:%s</FeatureName>
          <FeatureNameType>FeatureClass</FeatureNameType>
          <Geometry>GEOM</Geometry>
          <VectorScaleRange>
            <AreaTypeStyle>
              <AreaRule>
                <LegendLabel/>
                <AreaSymbolization2D>
                  <Fill>
                    <FillPattern>Solid</FillPattern>
                    <ForegroundColor>%s</ForegroundColor>
                    <BackgroundColor>FF000000</BackgroundColor>
                  </Fill>
                  <Stroke>
                    <LineStyle>Solid</LineStyle>
                    <Thickness>0</Thickness>
                    <Color>%s</Color>
                    <Unit>Points</Unit>
                  </Stroke>
                </AreaSymbolization2D>
              </AreaRule>
            </AreaTypeStyle>
          </VectorScaleRange>
        </VectorLayerDefinition>
        </LayerDefinition>
        ';
    $layerContent = sprintf($layerContent,
                        $featureSourceName,
                        $schemaName,
                        $layerName,
                        $fillColor,
                        $borderColor);
    $oByteSource = new MGByteSource($layerContent, strlen($layerContent));
    $resourceService->SetResource($layerId, $oByteSource->GetReader(), null);
}

?>

