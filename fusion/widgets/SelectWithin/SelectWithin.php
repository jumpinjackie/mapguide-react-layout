<?php
/**
 * SelectWithin
 *
 * $Id: SelectWithin.php 2951 2016-07-27 12:53:56Z jng $
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

  $fusionMGpath = '../../layers/MapGuide/php/';
  include $fusionMGpath . 'Common.php';
  if(InitializationErrorOccurred())
  {
      DisplayInitializationErrorText();
      exit;
  }
  include $fusionMGpath . 'Utilities.php';
  include('../../common/php/Utilities.php');

  $mapName = "";
  $sessionId = "";
  $layers = null;
  $queryInfo = false;   //seemed to be always set to true in MG version

  GetRequestParameters();

  try {
    ob_start();
    $featureSrvc = $siteConnection->CreateService(MgServiceType::FeatureService);
    $renderingSrvc = $siteConnection->CreateService(MgServiceType::RenderingService);

    //load the map runtime state
    $map = new MgMap($siteConnection);
    $map->Open($mapName);

    //object to hold response
    $result = new stdClass();
    $result->hasSelection = false;

    /*holds selection array*/
    $properties = new stdClass();
    $properties->layers = array();

    $layers = explode(",", $layers);
    if (count($layers) > 0) {

      $layerNames = new MgStringCollection();
      for ($i = 0; $i < count($layers); $i++) {
        $layerNames->Add($layers[$i]);
      }

      // create a multi-polygon or a multi-geometry containing the input selected features
      $inputGeom = MultiGeometryFromSelection($featureSrvc, $resourceService, $map, $mapName);
      if ($inputGeom) {
        // Query all the features belonging the the layer list that intersects with the input geometries
        $fi = $renderingSrvc->QueryFeatures($map, $layerNames, $inputGeom, MgFeatureSpatialOperations::Intersects, -1);
        if ($fi) {
          $resultSel = $fi->GetSelection();
          if( $resultSel) {
            $resultSel->Save($resourceService, $mapName);

            //this needs to be re-opened for some reason
            $resultSel = new MgSelection($map);
            $resultSel->Open($resourceService, $mapName);

            $layers = $resultSel->GetLayers();
            if ($layers && $layers->GetCount() >= 0) {
              $result->hasSelection = true;

              //set the extents for the selection object
              $oExtents = $resultSel->GetExtents($featureSrvc);
              if ($oExtents) {
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
              } else { echo "<Message>no extents</Message>"; }

              //get properties for individual features
              $result->layers = array();
              for ($i=0; $i<$layers->GetCount(); $i++) {
                $layer = $layers->GetItem($i);
                $layerName = $layer->GetName();
                $clsDef = $layer->GetClassDefinition();
                $layerClassName = $layer->GetFeatureClassName();
                $options = BuildFeatureQueryOptions($clsDef);
                $options->SetFilter($resultSel->GenerateFilter($layer, $layerClassName));
                $resourceId = new MgResourceIdentifier($layer->GetFeatureSourceId());
                $featureReader = $featureSrvc->SelectFeatures($resourceId, $layerClassName, $options);
                $properties = BuildSelectionArray($featureReader, $layerName, $properties, false, NULL, false, $layer, true);
                $featureReader->Close();
                array_push($result->layers, $layerName);
                array_push($properties->layers, $layerName);
                $count = $resultSel->GetSelectedFeaturesCount($layer, $layerClassName);
                $result->$layerName = new stdClass();
                $result->$layerName->featureCount = $count;
              }

              /*save selection in the session*/
              $_SESSION['selection_array'] = $properties;
              echo str_replace("</FeatureSet>", "</FeatureSet></FeatureInformation>", str_replace("<FeatureSet", "<FeatureInformation><FeatureSet", $resultSel->ToXml()));
            } else { echo "<Message>layers false or 0</Message>"; }
          } else { echo "<Message>no resultsel</Message>"; }
        } else { echo "<Message>no fi</Message>"; }
      } else { echo "<Message>no multi geom</Message>"; }
    } else { echo "<Message>no layers</Message>"; }

    //return XML
    header("Content-type: text/xml");
    ob_end_flush();
  } catch(MgException $e) {
    ob_end_clean();
    echo "\nException: " . $e->GetDetails();
    return;
  } catch(Exception $ne) {
    ob_end_clean();
    return;
  }

function MultiGeometryFromSelection($featureSrvc, $resourceSrvc, $map, $mapName)
{
    $sel = new MgSelection($map);
    $sel->Open($resourceSrvc, $mapName);
    $selLayers = $sel->GetLayers();
    if ($selLayers == null) {
        return null;
    }
    $geomColl = new MgGeometryCollection();
    $agfRW = new MgAgfReaderWriter();
    $simplyPolygonOnly = true;

    for($i = 0; $i < $selLayers->GetCount(); $i++)
    {
        $layer = $selLayers->GetItem($i);
        $filter = $sel->GenerateFilter($layer, $layer->GetFeatureClassName());
        $clsDef = $layer->GetClassDefinition();
        $query = BuildFeatureQueryOptions($clsDef);
        $query->SetFilter($filter);
        $featureSource = new MgResourceIdentifier($layer->GetFeatureSourceId());
        $features = $featureSrvc->SelectFeatures($featureSource, $layer->GetFeatureClassName(), $query);
        if($features)
        {
            $classDef = $features->GetClassDefinition();
            $geomPropName = $classDef->GetDefaultGeometryPropertyName();
            while($features->ReadNext())
            {
                $geomReader = $features->GetGeometry($geomPropName);
                $geom = $agfRW->Read($geomReader);
                $type = $geom->GetGeometryType();
                if($type == MgGeometryType::MultiPolygon || $type == MgGeometryType::CurvePolygon || $type == MgGeometryType::MultiCurvePolygon)
                {
                    $simplyPolygonOnly = false; 
                }
                else if($type != MgGeometryType::Polygon)
                    continue;
                $trans = GetLayerToMapCSTrans($classDef, $geomPropName, $featureSrvc, $featureSource, $map);
                $geomColl->Add($geom->Transform($trans));
            }
            $features->Close();
        }
    }
    if($geomColl->GetCount() == 0)
        return null;

    $gf = new MgGeometryFactory();
    if($simplyPolygonOnly)
    {
        $polyColl = new MgPolygonCollection();
        for($i = 0; $i < $geomColl->GetCount(); $i++)
            $polyColl->Add($geomColl->GetItem($i));
        return $gf->CreateMultiPolygon($polyColl);
    }
    else
        return $gf->CreateMultiGeometry($geomColl);
}

function GetLayerToMapCSTrans($classDef, $geomPropName, $featureSrvc, $fsId, $map)
{
    $props = $classDef->GetProperties();
    $geomProp = $props->GetItem($geomPropName);
    $scAssociation = $geomProp->GetSpatialContextAssociation();
    $csrdr = $featureSrvc->GetSpatialContexts($fsId, false);
    $layerwkt = '';
    
    while($csrdr->ReadNext())
    {
        $csrName = $csrdr->GetName();
        if($csrName == $scAssociation)
        {
            // Match found for the association
            $layerwkt = $csrdr->GetCoordinateSystemWkt();
            break;
        }
    }
    $csrdr->Close();
    $cf = new MgCoordinateSystemFactory();
    $layerCS = $cf->Create($layerwkt);
    $mapCS = $cf->Create($map->GetMapSRS());
    $trans = $cf->GetTransform ($layerCS, $mapCS);
    
    return $trans;
}

function GetParameters($params)
{
    global $layers, $mapName, $sessionId, $queryInfo;

    $mapName = $params['mapname'];
    $sessionId = $params['session'];
    $layers = $params['layers'];
    if(isset($params['queryinfo']))
        $queryInfo = $params['queryinfo'] == "1";
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}
?>
